'use client';

import NavigationBar from '@/components/Indivisual-nav-bar';
import React, { useState, useEffect } from 'react';
// import { useUser } from '@clerk/nextjs';
// import { useRouter } from 'next/navigation';

function UserHome({params}: {params: {userID: string}}) {
  interface User {
    username: string;
    email: string;
    clerkId: string;
  }
  console.log(params.userID);

//   // const { user } = useUser();
//   // const router = useRouter();
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   // Check if user is authenticated and matches the URL param
//     // if ( {user}.id !== params.userID) {
//     //   router.push('../../../page.tsx');
//     //   return;
//     // }

 
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch('/api/getcurruser', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ userID: params.userID }),
//         });
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch user data');
//         }
        
//         const userData = await response.json();
//         setCurrentUser(userData);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//       fetchUserData();
//       // if (user.id !== params.userID) {
//       //     router.push('/');


//   // Show loading state while checking authentication
//   if (!currentUser) {
//     return <div>Loading...</div>;
//   }
//   // if () {
//   //   return <div>Loading...</div>;
//   // }

//   return (
//     <div>
//       <NavigationBar/>
//       <br />
//       <br />
//       <div className="p-4">
//         {currentUser ? (
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h1 className="text-2xl font-bold mb-4">User Profile</h1>
//             <div className="space-y-2">
//               <p><strong>Username:</strong> {currentUser.username}</p>
//               <p><strong>Email:</strong> {currentUser.email}</p>
//               <p><strong>Clerk ID:</strong> {currentUser.clerkId}</p>
//               {/* Add more user details as needed */}
//             </div>
//           </div>
//         ) : (
//           <p>Loading user data...</p>
//         )}
//       </div> 

//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//     </div>
//   )
// }

// export default UserHome;
const [currentUser, setCurrentUser] = useState<User | null>(null);
// const { user } = useUser();
  
  // const router = useRouter();
  // useEffect(() => {
  //   const CheckUser = async () => {
  //     if ({user}.id !== params.userID) {
  //       // router.push('/');
  //       console.log('User not authenticated');
  //     }
  //   }
  //   CheckUser();
  // }, [params.userID,{user}.id]);
  const [UserID, setUser] = useState<string>('Nome');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/getcurruser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userID: params.userID }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const userData = await response.json();
        setCurrentUser(userData);
        setUser(params.userID);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
    
    
  }, [params.userID]);
  console.log(currentUser);
  



  return (
    <div>
      <NavigationBar/>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>{UserID}</h1>
      <h1>{params.userID}</h1>
      <h1>{params.userID}</h1>
   
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
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}

export default UserHome;
