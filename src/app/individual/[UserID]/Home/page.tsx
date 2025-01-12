'use client';

import NavigationBar from '@/components/Indivisual-nav-bar';
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import CreatePost from '@/components/CreatePost';
import ShowPost from '@/components/showpost';

function UserHome({params}: {params: Promise<{UserID: string}>}) {
  interface User {
    username: string;
    email: string;
    clerkId: string;
  }
  const resolvedParams = React.use(params);
  console.log(resolvedParams);
  const userID = resolvedParams.UserID;
  const { user, isLoaded } = useUser();
  // console.log(user);
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [searched, setSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);

  const handleSearch = (query: string) => {
    setTags([query]);
    setSearch(true);
  };

  useEffect(() => {
    if (isLoaded) {

      if (!user) {
        router.push('/');
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
    const fetchUserData = async () => {
      if (!isAuthorized) return;
      console.log(userID);

      try {
        console.log(userID);
        const response = await fetch('/api/getcurruser', {
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

        const tagResponse = await fetch('/api/getmytag', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tagIDs: userData.tags })
        });
        const tagData = await tagResponse.json();
        setCurrentUser(userData);
        setTags(tagData.tags);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    fetchUserData();
  },[userID, isAuthorized]);
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (!isAuthorized) {
    return <div>Checking authorization...</div>;
  }

  return (
    <div>
      <NavigationBar showSearch={true} onSearch={(query) => handleSearch(query)} />
        
     
      {/* Conditionally render user profile */}
      {showProfile && currentUser && (
        
        <div className="bg-white rounded-lg shadow-md p-4 mx-4 mb-4 justify-between items-center mt-20 px-4 p-4">
          <h1 className="text-2xl font-bold mb-4">User Profile</h1>
          <div className="space-y-2">
            <p><strong>Username:</strong> {currentUser.username}</p>
            <p><strong>Email:</strong> {currentUser.email}</p>
            <p><strong>Clerk ID:</strong> {currentUser.clerkId}</p>
            {/* Add more user details as needed */}
          </div>
        </div>
      )}
      {/* Conditionally render create post */}
      {showCreatePost && (
        <div className="mx-4 mb-4 justify-between items-center mt-20 px-4 p-4">
          <CreatePost />
        </div>
      )}
     
      
      {/* New header section with heading and buttons */}
      <div className='p-4'>
      <div className="flex justify-between items-center mt-20 px-4">
        <h2 className="text-3xl font-bold">
          {searched  ? 'Results' : 'Feed'}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowCreatePost(false);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            View Profile
          </button>
          <button
            onClick={() => {
              setShowCreatePost(!showCreatePost);
              setShowProfile(false);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Create Post
          </button>
        </div>
      </div>
      </div>



      {/* Always show feed below the header */}
      <div className="mx-4">
        <ShowPost tags={tags} />
      </div>
    </div>
  )
}

export default UserHome;
