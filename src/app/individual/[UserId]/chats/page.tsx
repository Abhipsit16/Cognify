
import User from "@/lib/models/User"; // Assuming you have a User model
// import Tag from "@/lib/models/Tag"; // Assuming you have a Tag model
import dbConnect from '@/lib/mongodb';
import React from 'react'

async function jaiho(){
  await dbConnect();
  const users = await User.find({}).lean();
  return users 
}

async function UserChats({params}:{params :{ UserID : string}}) {
  const users = await jaiho()
  return (
    
    <div>
      <br />
      <br />
      <br />
      <br />
      <h1>User Chats {params.UserID}</h1>
      <ul>
         {users.map((user,index) => (
          <li key={index}>{user.username}</li>
         ))}
         </ul>  
      

    </div>
  )
}

export default UserChats
