'use client';

import NavigationBar from '@/components/Indivisual-nav-bar';
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

function UserChats({params}: {params: Promise<{UserID: string}>}) {
  const resolvedParams = React.use(params);
  const userID = resolvedParams.UserID;
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isLoaded } = useUser();
  const router = useRouter();
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

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(`/api/getmychats?userId=${userID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch chats');
        }
        const data = await response.json();
        setChats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [userID]);

  if (!isAuthorized) {
    return <div>Checking authorization...</div>;
  }
  if (loading) return <div>Loading chats...</div>;
  if (error) return <div>Error: {error}</div>;
  

  return (
    <div className="p-4">
      <NavigationBar  showSearch={false}/>
      <div className="mt-16">
        <h1 className="text-2xl font-bold mb-4">My Chats</h1>
        <div className="space-y-4">
          {chats.map((chat) => (
            <div key={chat._id} className="border p-4 rounded-lg shadow">
              <div className="font-semibold">
                Participants: {chat.participants.map(p => p.username).join(', ')}
              </div>
              {chat.messages.length > 0 && (
                <div className="text-gray-600 mt-2">
                  Latest message: {chat.messages[chat.messages.length - 1].message}
                </div>
              )}
              <a href= {`/chat/${chat._id}`}>link</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserChats;
