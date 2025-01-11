'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import NavigationBar from '@/components/Indivisual-nav-bar';
import { useRouter } from 'next/navigation';

function Profile({params}: {params: Promise<{UserID: string}>}) {
    interface User {
        username: string;
        email: string;
        clerkId: string;
        role: string;
        createdAt: string;
        tags: Array<{ _id: string, name: string }>;
    }

    const resolvedParams = React.use(params);
    const router = useRouter();
    const userID = resolvedParams.UserID;
    const { user, isLoaded } = useUser();
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [tagNames, setTagNames] = useState<string[]>([]);

    useEffect(() => {
        const fetchUserData = async () => {
            console.log(userID);
            const response = await fetch('/api/getthisuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID }),
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const userData = await response.json();
            setCurrentUser(userData);
            if (userData.tags?.length) {
                const tagResponse = await fetch('/api/getmytag', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ tagIDs: userData.tags })
                });
                if (tagResponse.ok) {
                  const tagData = await tagResponse.json();
                  setTagNames(tagData.tags);
                }
              }
        }

        fetchUserData();
    }, [userID]);

    const handleCollaborate = async () => {
        // Implement collaboration logic
        console.log('Collaborate clicked');
    };

    const handleStartConversation = async () => {
        // Implement conversation logic
        const chat = await fetch('/api/createChat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user1ClerkId: user?.id, user2ClerkId: currentUser?.clerkId }),
        });
        const data = await chat.json();
        console.log('Start conversation clicked');
        router.push(`/chat/${data.chatId}`);

    };

    const handleEditProfile = async () => {
        // Implement edit profile logic
        console.log('Edit profile clicked');
    };

    const handleViewPosts = () => {
        router.push(`/individual/${userID}/posts`);
    };

    if (!currentUser || !isLoaded) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    const isOwnProfile = user?.id === currentUser.clerkId;

    return (
        <div className="min-h-screen bg-background p-8">
            <NavigationBar />
            <br />
            <br />
            <br />
            <div className="max-w-4xl mx-auto bg-card rounded-lg shadow-lg p-6">
                <div className="flex flex-col items-center space-y-4">
                    {/* <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center text-4xl">
                        {/* {currentUser.email[0].toUpperCase()} 
                    </div> */}
                    
                    <h1 className="text-3xl font-bold mt-4">{currentUser.username}</h1>
                    
                    <div className="w-full max-w-2xl space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <p className="text-sm font-semibold text-muted-foreground">Email</p>
                                <p>{currentUser.email}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm font-semibold text-muted-foreground">Role</p>
                                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary">
                                    {currentUser.role}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm font-semibold text-muted-foreground">Member Since</p>
                                <p>{new Date(currentUser.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="space-y-2"> 
                                <p className="text-sm font-semibold text-muted-foreground">Intrests</p>
                                <div className="flex flex-wrap gap-2">
                                    {tagNames?.map((tag) => (
                                        <span key={""}className="px-2 py-1 text-sm rounded-full bg-secondary text-secondary-foreground"> {tag},</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />

                    <div className="flex gap-4 mt-6">
                        {!isOwnProfile ? (
                            <>
                                <button 
                                    onClick={handleCollaborate}
                                    className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                                >
                                    Collaborate
                                </button>
                                <button 
                                    onClick={handleStartConversation}
                                    className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
                                >
                                    Start Conversation
                                </button>
                            </>
                        ) : (
                            <button 
                                onClick={handleEditProfile}
                                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
                            >
                                Edit Profile
                            </button>
                        )}
                        <button 
                            onClick={handleViewPosts}
                            className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors"
                        >
                            View Posts
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;