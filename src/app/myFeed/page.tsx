import React from "react";

const SplitScreenFeed = () => {
  const posts = [
    {
      id: 1,
      title: "Exploring the Cosmos",
      content: "Astronomy news and discoveries from the past week.",
      author: "Jane Doe",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      title: "AI in Modern Life",
      content: "How AI is shaping our daily routines.",
      author: "John Smith",
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      title: "Sustainable Living",
      content: "10 tips to make your life more eco-friendly.",
      author: "Emily Green",
      timestamp: "1 day ago",
    },
    {
        id: 3,
        title: "Sustainable Living",
        content: "10 tips to make your life more eco-friendly.",
        author: "Emily Green",
        timestamp: "1 day ago",
      },
      {
        id: 3,
        title: "Sustainable Living",
        content: "10 tips to make your life more eco-friendly.",
        author: "Emily Green",
        timestamp: "1 day ago",
      },
      {
        id: 3,
        title: "Sustainable Living",
        content: "10 tips to make your life more eco-friendly.",
        author: "Emily Green",
        timestamp: "1 day ago",
      },
      {
        id: 3,
        title: "Sustainable Living",
        content: "10 tips to make your life more eco-friendly.",
        author: "Emily Green",
        timestamp: "1 day ago",
      },
      {
        id: 3,
        title: "Sustainable Living",
        content: "10 tips to make your life more eco-friendly.",
        author: "Emily Green",
        timestamp: "1 day ago",
      },
  ];

  const trendingTopics = [
    "AI and Ethics",
    "Space Exploration",
    "Climate Change",
    "Quantum Computing",
    "Renewable Energy",
  ];

  return (
    <div className="flex flex-col mt-24 md:flex-row h-screen">
      {/* Left: Feed */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
        <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-4 mb-4 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="text-gray-600 mt-2">{post.content}</p>
            <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
              <span>By {post.author}</span>
              <span>{post.timestamp}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Right: Sidebar */}
      <div className="w-full md:w-1/3 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-4">Trending Topics</h2>
        <ul className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <li
              key={index}
              className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              {topic}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <h3 className="text-xl font-bold">Subscribe for Updates</h3>
          <form className="mt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full mt-4 p-2 bg-blue-500 hover:bg-blue-600 rounded text-white font-semibold"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SplitScreenFeed;
