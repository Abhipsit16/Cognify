"use client"

import Features from "@/components/features";
import Feedbacks from "@/components/feedbacks";
import socket from "@/lib/socketClient";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const features = [
    { name: "Data Analysis and Insights", text: "AI-driven insights to help you make smarter decisions." },
    { name: "Data Visualisation", text: "Turn your data into interactive visual trends." },
    { name: "Data Sharing", text: "Seamlessly share data with the world." },
    { name: "Collaboration", text: "Real-time chatrooms to interact with organizations and collaborate on your data." },
  ];

  const reviews = [
    {
      text: '"Cognify revolutionized how we manage our data. It\'s easy, fast, and intuitive!"',
      name: "Priya Sharma",
      designation: "Data Analyst",
    },
    {
      text: '"The AI-driven insights have been a game-changer for our team!"',
      name: "Rahul Kapoor",
      designation: "Product Manager",
    },
    {
      text: '"I love how I can visualize trends and collaborate with ease."',
      name: "Sneha Gupta",
      designation: "Researcher",
    },
  ];
  
  const { user, isLoaded, isSignedIn } = useUser(); // Call useUser at the top level

  useEffect(() => {

    if (isLoaded && isSignedIn) {
      socket.emit('userData', {
        email: user.emailAddresses[0].emailAddress, 
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        socket_id:socket.id
      });
    }

    // Listen for other events here, like 'message', 'disconnect', etc.
    socket.on('message', (data: any) => {
      console.log('Received message:', data);
    });
    // return ()=>{
    //   socket.on("disconnect", ()=>{
    //     console.log("User disconnected");
    //   })
    // }
  }, []);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-self-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="mb-8">
        <h1 className="text-orange-200 text-5xl">
          Empowering Data, Amplifying Insights, Unlocking Potential
        </h1>
        <p className="text-white text-2xl justify-self-center mt-2">
          Leverage AI to organize, analyze, and visualize your data.
        </p>
      </div>
      <div>
        <h2 className="text-orange-400 text-5xl text-center mb-12">Why Cognify?</h2>
        <div className="container mx-auto px-8 py-16">
          <div className="flex flex-wrap gap-12 justify-center">
            {features.map((feature, index) => (
              <Features key={index} name={feature.name} text={feature.text} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-orange-400 text-5xl text-center mb-12">What People Say</h2>
        <div className="container mx-auto px-8 py-16">
          <div className="flex flex-wrap gap-12 justify-center">
            {reviews.map((review, index) => (
              <Feedbacks
                key={index}
                text={review.text}
                name={review.name}
                designation={review.designation}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
