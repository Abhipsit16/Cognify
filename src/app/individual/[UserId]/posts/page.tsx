'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
// import CreatePost from '@/components/CreatePost';
import NavigationBar from '@/components/Indivisual-nav-bar';

function UserPosts({params}:{params :Promise<{UserID: string}>}) {


  interface User {
    username: string;
    email: string;
    clerkId: string;
  }
  interface Post {
    heading: string;
    Type: string;
  }
  const resolvedParams = React.use(params);
  const userID = resolvedParams.UserID;
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [Posts, setPosts] = useState<[Post] | null>(null);

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
    const fetchUserPosts = async () => {
      if (!isAuthorized) return;
      console.log("Where");
      try {
        const response = await fetch('/api/getmypost', {method: 'POST',
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify({ userID }),});
        
        if (!response.ok) {throw new Error('Failed to fetch user data');}
        const Posts = await response.json();
        setPosts(Posts);}
      catch (error) {console.error('Error fetching user data:', error);}
    };
    
    fetchUserPosts();
  },[userID, isAuthorized]);
console.log("here");

  console.log(Posts);
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (!isAuthorized) {
    return <div>Checking authorization...</div>;
  }
// #############################################################################
  return (
    <div className='p-4'> 
      
      <NavigationBar/>
      <br />
      <br />
      <br />
      <h1>User Posts</h1>
      <p><strong>Username:</strong> {currentUser?.username}</p>

      <br />
      <br />
      <br />
      {/* <h1>{Posts}</h1> */}
      <ul>
         {Posts?Posts.map((result, index) => (
          <li key={index}> {result.heading} , {result.Type} </li>
         )) : <li> No Posts </li>}
         </ul> 
         <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}

export default UserPosts
