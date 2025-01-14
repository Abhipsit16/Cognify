import React, {useEffect, useState} from 'react';

interface Post {
  heading: string;
  Type: string;
  _id: string;
  author: string
}

function Shortpost({ post}: { post: Post}) {
  const [name, setName]=useState("Loading...")
  useEffect(()=>{
    async function fetchDetails(){
      try{

        const authorResponse= await fetch(`/api/getthisuser`,{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({userId: post.author})
        });
        if(authorResponse.ok){
          const authorData= await authorResponse.json();
          const authorName=authorData.username || "Unknown";
          setName(authorName);
        }
      }catch(err){
        console.error(err.message);
      }
    }
    fetchDetails();
  },[]);
  return (

<div className="border border-gray-300 rounded-lg shadow-md p-6 space-y-4 justify-center">

      <div className="flex items-center justify-between border-b border-gray-300 pb-4 mb-4">

  <h3 className="font-semibold">"name"</h3>

  {/* Right Section: Type and Access Level */}
  <div className="flex space-x-4">
    <span className="text-sm bg-green-100 text-green-800 p-2 rounded-full">
      {post.Type}
    </span>
    <span className="text-sm bg-green-100 text-green-800 p-2 rounded-full">
      (post.accessLevel)
    </span>
  </div>
</div>


      {/* Post Content */}
      <div>
        <h2 className="mb-4 font-bold text-xl">{post.heading}</h2>
        <div className="border border-gray-200 rounded-lg p-4 text-sm text-gray-800">
          <p>(post.text-description_only)</p>
        </div>
      </div>

      {/* Post Footer */}
      <div className="flex items-center justify-between border-t border-gray-300 pt-4 mt-4">
        <div className="text-sm text-gray-500 space-x-2">
          <span>Posted on: (post.date)</span>
          <span>|</span>
          <span>(post.time)</span>
        </div>
        <a
          href={`/post/${post._id}/`}
          className="bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          View Full Post
        </a>
      </div>
    </div>
  );
};
    


export default Shortpost
