// "use client"
import { redirect } from 'next/navigation';
import Features from "@/components/features";
import Feedbacks from "@/components/feedbacks";
// import socket from "@/lib/socketClient";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";
// import Finduser from "@/lib/dbqueries/finduser"; // Assuming you have a User mode
// import Tag from "@/lib/models/Tag";
import InterestsForm from "@/components/firstlogin";
// import { useEffect } from "react";
import { currentUser } from "@clerk/nextjs/server";
// import NavigationBar from '@/components/home-nav-bar';

export default async function Home() {

  const user = await currentUser()

  if (user){
  let isNewUser = false;
  let role = 'individual';
  console.log(user.id)

  const getrole = async () => {
    await dbConnect();
    const existingUser = await User.findOne({ clerkId: user.id });
    const role = existingUser.role;
    return role;
  }



  const checkUserInDatabase = async () => {
      
        await dbConnect();
        console.log('here')
        // const existingUser = await Finduser(user.id);
        const existingUser = await User.findOne({ clerkId: user.id });
        // console.log(existingUser)
        if (existingUser == null) {
          console.log('new user')
          return true;   
        }
        else{
        console.log('old user')
        return false;  }
    };

    isNewUser = await checkUserInDatabase();
    console.log(isNewUser)

  if (isNewUser) {
    console.log('new user')
    return <InterestsForm />;
  }
  else {
    role = await getrole();
    if(role == 'individual'){return(
      redirect(`/individual/${user.id}/Home`)
      );}
    else if(role == 'organization'){return(
      redirect(`/organisation/${user.id}/Home`)
    ); 
  }
  }
}
  
  
  // const { user, isLoaded, isSignedIn } = useUser(); // Call useUser at the top level

  // useEffect(() => {
  //   // Make sure the socket connection is established
  //   socket.on('connect', () => {
  //     console.log('Connected to server with socket ID:', socket.id);
  //   });

  //   //Has to be debugged
  //   if (isLoaded && isSignedIn) {
  //     socket.emit('userData', {
  //       email: user.emailAddresses[0], 
  //       username: user.username,
  //       firstName: user.firstName,
  //       lastName: user.lastName,
  //     });
  //   }

  //   // Listen for other events here, like 'message', 'disconnect', etc.
  //   socket.on('message', (data) => {
  //     console.log('Received message:', data);
  //   });

  //   // Clean up socket connections when the component unmounts
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [isLoaded, isSignedIn, user]);
}
