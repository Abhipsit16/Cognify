import React from 'react'

interface Post {
  heading: string;
  Type: string;
  _id: string;
}

function Shortpost({ post }: { post: Post }) {
  return (
    <div>
      <span className="font-semibold">{post.heading}</span> - {post.Type}
      <a href={`/post/${post._id}/`} className="ml-2 text-blue-600 hover:underline">
        View Post
      </a>
    </div>
  )
}

export default Shortpost
