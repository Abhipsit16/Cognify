'use client';

import NavigationBar from '@/components/Indivisual-nav-bar';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Clock, User, Tag, Lock, Link as LinkIcon } from 'lucide-react';
import RequestAccess from '@/components/request';

function Post({ params }: { params: Promise<{ PostID: string }> }) {
  const resolvedParams = React.use(params);
  const PostID = resolvedParams.PostID;
  const { user, isLoaded } = useUser();
  const router = useRouter();

  interface Post {
    heading: string;
    content: string;
    Type: string;
    author: string;
    tags: string[];
    createdAt: string;
    dataSample: string;
    dataLink: { datalink: string; AccessUsers: string[] }[];
    AccessLevel: string;
  }

  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [authorName, setAuthorName] = useState<string>('');
  const [UserID, setUser] = useState<string>('');
  const [tagNames, setTagNames] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch post
        const postResponse = await fetch(`/api/getPostid?PostId=${PostID}`);
        if (!postResponse.ok) throw new Error('Post not found');
        const postData = await postResponse.json();
        setPost(postData);

        // Fetch author details
        const authorResponse = await fetch('/api/getthisuser', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userID: postData.author })
        });
        if (authorResponse.ok) {
          const authorData = await authorResponse.json();
          setAuthorName(authorData.username || 'Unknown Author');
        }

        const UserResponse = await fetch('/api/getcurruser', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userID: user?.id })
        });
        if (UserResponse.ok) {
          const UserData = await UserResponse.json();
          setUser(UserData._id || 'Unknown Author');
        }

        // Fetch tag names
        if (postData.tags?.length) {
          const tagResponse = await fetch('/api/getmytag', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tagIDs: postData.tags })
          });
          if (tagResponse.ok) {
            const tagData = await tagResponse.json();
            setTagNames(tagData.tags);
          }
        }
      } catch (err) {
        setError(err.message);
      }
    }

    fetchData();
  }, [PostID,user?.id]);

  useEffect(() => {
    if (post && isLoaded) {
      if (post.author !== UserID && post.AccessLevel !== 'public') {
        router.push('/');
      }
    }
  }, [post, isLoaded, UserID, router]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar onSearch={() => { /* handle search */ }} />
      <main className="container mx-auto px-4 py-8 mt-20">
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.heading}</h1>
            
            <div className="flex items-center space-x-6 text-gray-500 mb-6">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>{authorName}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                <span>{post.AccessLevel}</span>
              </div>
            </div>

            <div className="prose max-w-none mb-6">
              <p className="text-gray-700 leading-relaxed">{post.content}</p>
            </div>

            {tagNames.length > 0 && (
              <div className="flex items-center space-x-2 mb-6">
                <Tag className="w-4 h-4 text-gray-500" />
                <div className="flex flex-wrap gap-2">
                  {tagNames.map((tag, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {post.dataSample && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">Data Sample</h3>
                {post.dataSample.startsWith('data:image/') ? (
                  <img src={post.dataSample} alt="Data Sample" className="max-w-full h-auto" />
                ) : (
                  <div>
                    <a
                      href={post.dataSample}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 mr-4"
                    >
                      Open
                    </a>
                    <a
                      href={post.dataSample}
                      download="dataSample"
                      className="text-blue-600"
                    >
                      Download
                    </a>
                  </div>
                )}
              </div>
            )}

            {post.dataLink && isLoaded && (
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Data Links
                </h3>
                <div className="space-y-2">
                  {post.dataLink.map((link, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded">
                      {link.AccessUsers.includes(UserID ?? '')? (
                        <a href={link.datalink} 
                           className="text-blue-600 hover:text-blue-800 transition-colors">
                          {link.datalink}
                        </a>
                      ) : (
                        <span className={`filter ${(post.AccessLevel === "private")? "blur-sm": " "} text-gray-500`}>
                          No link
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
        <br />
        <div className="space-y-2">
                  {post.dataLink.map((link, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded">
                      {!link.AccessUsers.includes(UserID ?? '') ? (
                        <RequestAccess postId={PostID} currentUser={UserID} authorId={post.author} />
                      ) : (
                        <span className="">
                        </span>
                      )}
                    </div>
                  ))}
                </div>
        <br />
      </main>
    </div>
  );
}

export default Post;
