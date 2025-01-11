'use client';
import React, { useEffect, useState } from 'react';
import NavigationBar from '@/components/Indivisual-nav-bar';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';


interface Request {
  _id: string;
  fromUser: string;
  toUser: string;
  post: string;
  message: string;
  status: string;
}

export default function MyRequestsPage({params}:{params :Promise<{UserID: string}>}) {
  const [received, setReceived] = useState<Request[]>([]);
  const [sent, setSent] = useState<Request[]>([]);
  const [fromUsernames, setFromUsernames] = useState({});
  const [toUsernames, setToUsernames] = useState({});
  const [postTitles, setPostTitles] = useState({});  // Add this state
   const resolvedParams = React.use(params);
   const userID = resolvedParams.UserID;
   const router = useRouter();
   const { user, isLoaded } = useUser();
   const [isAuthorized, setIsAuthorized] = useState(false);

   useEffect(() => {
         if (isLoaded) {
     
           if (!user) {
             router.push('/sign-in');
             return;
           }
           if (user.id !== userID) {
             router.push('/');
             return;
           }
           setIsAuthorized(true);
         }
       }, [isLoaded, user, userID, router]);

  const fetchUserData = async (userID) => {
    
      console.log(userID);
      const response = await fetch('/api/getthisuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID }),
      });
      
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      
      const userData = await response.json();
    return userData;}

  const fetchPostData = async (postId) => {
    const response = await fetch(`/api/getPostid?PostId=${postId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post data');
    }
    const postData = await response.json();
    return postData;
  };

  const handleStartConversation = async (user1 , currentUser1) => {
    // Implement conversation logic
    const response = await fetch('/api/getthisuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userID : currentUser1 }),
    });  
    const userData = await response.json();
    const response1 = await fetch('/api/getthisuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userID : user1 }),
    });  
    const userData1 = await response1.json();

    const chat = await fetch('/api/createChat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user1ClerkId: userData.clerkId, user2ClerkId: userData1.clerkId }),
    });
    const data = await chat.json();
    console.log('Start conversation clicked');
    router.push(`/chat/${data.chatId}`);

};

  useEffect(() => {
    const fetchRequests = async () => {
      const resReceived = await fetch('/api/getRequests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toUser: userID }),
      });
      const dataReceived = await resReceived.json();
      const resSent = await fetch('/api/getRequests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fromUser: userID }),
      });
      const dataSent = await resSent.json();
      
      // Fetch usernames for received requests
      const fromUsers = {};
      for (const req of dataReceived.requests || []) {
        const userData = await fetchUserData(req.fromUser);
        fromUsers[req.fromUser] = userData.username;
      }
      setFromUsernames(fromUsers);

      // Fetch usernames for sent requests
      const toUsers = {};
      for (const req of dataSent.requests || []) {
        const userData = await fetchUserData(req.toUser);
        toUsers[req.toUser] = userData.username;
      }
      setToUsernames(toUsers);

      // Fetch post titles
      const titles = {};
      for (const req of [...dataReceived.requests || [], ...dataSent.requests || []]) {
        const postData = await fetchPostData(req.post);
        titles[req.post] = postData.heading;
      }
      setPostTitles(titles);

      setReceived(dataReceived.requests || []);
      setSent(dataSent.requests || []);
    };
    fetchRequests();
  }, [userID]);

  const handleDecision = async (requestId, decision) => {
    try {
      const status = decision === 'approved' ? 'accepted' : 'rejected';
      // Update request status
      const response = await fetch('/api/changestatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requestId, status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update request status');
      }

      // Find the request object
      const request = received.find(req => req._id === requestId);
      if (!request) {
        throw new Error('Request not found');
      }

      // Update access permissions
      const accessResponse = await fetch('/api/adduseraccess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: request.post,
          userId: request.fromUser,
          action: status === 'accepted' ? 'add' : 'remove'
        }),
      });

      if (!accessResponse.ok) {
        throw new Error('Failed to update access permissions');
      }

      // Update the local state
      setReceived(received.map(req => 
        req._id === requestId ? { ...req, status } : req
      ));

      alert(`Request has been ${status}!`);
    } catch (error) {
      console.error('Error updating request:', error);
      alert('Failed to update request');
    }
  };

  if (!isAuthorized) {
    return <div>Checking authorization...</div>;
  }

  return (
    <div className="container mt-10 px-6 max-w-3xl mx-auto">
        <NavigationBar showSearch={false}/>
        <br />
        <br />
      <div className="flex border-b border-gray-300">
        <button id="receivedTab" onClick={() => showTab('received')}
          className="px-6 py-2 font-semibold border-b-2 border-blue-500 text-blue-500 hover:text-blue-500 focus:text-blue-500 transition duration-300">
          Received
        </button>
        <button id="sentTab" onClick={() => showTab('sent')}
          className="px-6 py-2 font-semibold border-b-2 border-transparent hover:text-blue-500 focus:text-blue-500 transition duration-300">
          Sent
        </button>
      </div>

      <div id="receivedSection" className="mt-8 mb-8">
        <div className="space-y-5">
          {received.map((req) => (
            <div key={req._id} className="p-6 border border-gray-300 rounded-lg shadow-sm flex">
              <div className="ml-4">
                <h3 className="font-semibold text-blue-600"> From : {fromUsernames[req.fromUser] || 'Loading...'}
                </h3>
                <p className="text-gray-600">Requested full data for your post: <a href={`/post/${req.post}/`}>{postTitles[req.post] || 'Loading...'}</a></p>
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                  <h4 className="font-semibold text-blue-700">{req.message}</h4>
                </div>
                <div className="mt-4 flex gap-3">
                  <button onClick={() => handleDecision(req._id, 'approved')}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                    Accept
                  </button>
                  <button onClick={() => handleDecision(req._id, 'rejected')}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition">
                    Decline
                  </button>
                  <a href={`/profile/${req.fromUser}`} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition">
                    View Profile
                  </a>
                  <button onClick={() => handleStartConversation(req.fromUser, req.toUser)}
                  className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition">
                    Start a Conversation
                  </button>
                  <button className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition">
                    Collaborate
                  </button>
                </div>
              </div>
            </div>
          )).reverse()}
        </div>
      </div>

      <div id="sentSection" className="mt-8 hidden mb-8">
        <div className="space-y-5">
          {sent.map((req) => (
            <div key={req._id} className="p-6 border border-gray-300 rounded-lg shadow-sm flex">
              
              <div className="ml-4">
                <h3 className="font-semibold text-blue-600"> To : {toUsernames[req.toUser] || 'Loading...'}
                </h3>
                <p className="text-gray-600">{req.message}  </p>
                <p className="text-blue-600">On post : <a href={`/post/${req.post}/`}>{postTitles[req.post] || 'Loading...'}</a>  </p>
                <div className="mt-4 flex gap-3">
                    <h3  className="bg-blue-500 text-white px-4 py-2 rounded-md">{req.status}</h3>
                  {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                    View Full Data
                  </button> */}
                  
                </div>
              </div>
            </div>
          )).reverse()}
        </div>
      </div>
    </div>
  );
}

function showTab(tab) {
  const receivedSection = document.getElementById('receivedSection');
  const sentSection = document.getElementById('sentSection');
  const receivedTab = document.getElementById('receivedTab');
  const sentTab = document.getElementById('sentTab');

  if (receivedSection && sentSection && receivedTab && sentTab) {
    receivedSection.classList.add('hidden');
    sentSection.classList.add('hidden');
    receivedTab.classList.remove('border-blue-500', 'text-blue-500');
    sentTab.classList.remove('border-blue-500', 'text-blue-500');

    if (tab === 'received') {
      receivedSection.classList.remove('hidden');
      receivedTab.classList.add('border-blue-500', 'text-blue-500');
    } else {
      sentSection.classList.remove('hidden');
      sentTab.classList.add('border-blue-500', 'text-blue-500');
    }
  }
}

// Default tab
showTab('received');
