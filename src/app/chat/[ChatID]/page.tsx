'use client';
import React, { useEffect, useState, useRef } from 'react';
import socket from '@/lib/socketClient';
import { useUser } from '@clerk/nextjs';
import NavigationBar from '@/components/Indivisual-nav-bar';

function Chat({params}: {params: Promise<{chatID: string}>}) {
  const resolvedParams = React.use(params);
      // const userID = resolvedParams.UserID;
  const chatId = resolvedParams.chatID;
  const{ user } = useUser();
  const userId = user?.id;
  const [UserID, setUser] = useState('');
  const [messages, setMessages] = useState<{ sender_id: string; message: string }[]>([]);
  const [newMessage, setNewMessage] = useState('');


  useEffect(() => {
    socket.emit('join_chat', chatId);
    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    async function fetchMessages() {
      try {
        // First get the current user's MongoDB ID
        if (userId) {
          const userResponse = await fetch('/api/getcurruser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userID: userId })
          });
          if (userResponse.ok) {
            const userData = await userResponse.json();
            setUser(userData._id);
          }
        }

        // Then fetch messages
        if (!chatId) {
          console.error('Chat ID is undefined');
          setMessages([]);
          return;
        }

        const response = await fetch(`/api/getMessages?chatId=${chatId}`);
        const data = await response.json();
        
        if (data && Array.isArray(data.messages)) {
          setMessages(data.messages);
        } else {
          setMessages([]);
        }
      } catch (error) {
        console.error('Error:', error);
        setMessages([]);
      }
    }

    fetchMessages();
    return () => {
      socket.off('receive_message');
    };
  }, [chatId, userId]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    const message = {
      chatId,
      senderId: userId,
      message: newMessage
    };
    socket.emit('send_message', message);

    try {
      // Call the API to save the message
      const response = await fetch('/api/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // Emit message to the server for real-time updates
      // Clear input
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      // You might want to show an error notification to the user here
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <NavigationBar showSearch={false} />
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Chat Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => {
            // Check if either the MongoDB ID or Clerk ID matches
            const isCurrentUser = msg.sender_id === UserID || msg.sender_id === userId;
            
            return (
              <div 
                key={index}
                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    isCurrentUser
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none shadow'
                  }`}
                >
                  <p>{msg.message}</p>
                  <p className={`text-xs mt-1 ${
                    isCurrentUser ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {new Date().toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white border-t p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white rounded-full px-6 py-2 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;