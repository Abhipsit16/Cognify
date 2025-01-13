// 'use client';

import React, { useState, useEffect } from 'react';
import Shortpost from './shortpost';
// import CreatePost from '@/components/CreatePost';
// Example usage:
//   fetchPostsByTags(['javascript', 'mongodb'])
//     .then(posts => console.log(posts))
//     .catch(error => console.error(error));

export default function ShowPost({ tags }: { tags: string[] }) {
  interface Post {
    heading: string;
    Type: string;
    _id: string;
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
    <div className='p-4 bg-cyan-100'>
      <br />

      {/* <h1>User feed</h1>

      <br />
      <br /> */}

      <div className="space-y-4">
        {Posts && Posts.length > 0 ? (
          <ul className="space-y-2">
          {Posts.map((result, index) => (
            <li key={index} className="bg-white p-3 rounded-md shadow-md">
              <Shortpost post={result} />
            </li>
          )).reverse()}
        </ul>
        
        ) : (
          <p>No Posts</p>
        )}
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}



