// 'use client';
import React, { useState, useEffect } from 'react';
// import CreatePost from '@/components/CreatePost';
// Example usage:
//   fetchPostsByTags(['javascript', 'mongodb'])
//     .then(posts => console.log(posts))
//     .catch(error => console.error(error));

export default function ShowPost({ tags }: { tags: string[] }) {
  interface Post {
    heading: string;
    Type: string;
  }

  const [Posts, setPosts] = useState<[Post] | null>(null);

  useEffect(() => {
    async function fetchPostsByTags(tagNames) {
        const response = await fetch(`/api/findpost?tags=${tagNames.join(',')}`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const Posts = await response.json();
        setPosts(Posts);}
    fetchPostsByTags(tags);
      
   
  },[tags]);

  return (
    <div className='p-4'> 
      <br />
      <br />
      <br />
      <h1>User feed</h1>

      <br />
      <br />

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



