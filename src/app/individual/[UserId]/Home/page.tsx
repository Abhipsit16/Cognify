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
  const userID = resolvedParams.UserID;
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [tags] = useState(['amine','']);

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
    const fetchUserData = async () => {
      if (!isAuthorized) return;

      try {
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
        setCurrentUser(userData);
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
    <div className="p-4">
      <NavigationBar/>
      <br />
      <br />
   
      <div className="p-4">
        {currentUser ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>
            <div className="space-y-2">
              <p><strong>Username:</strong> {currentUser.username}</p>
              <p><strong>Email:</strong> {currentUser.email}</p>
              <p><strong>Clerk ID:</strong> {currentUser.clerkId}</p>
              {/* Add more user details as needed */}
            </div>
          </div>
        ) : (
          
          <p> <br/>Loading user data...</p>
        )}
      </div> 
      <br />
      <CreatePost />
      <br />
      <br />
      <ShowPost tags={tags} />
      <br />
      <br />
    </div>
  )
}

export default UserHome;
