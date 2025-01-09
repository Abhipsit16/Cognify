'use client';
import React, { useEffect, useState, useRef } from 'react';
import socket from '@/lib/socketClient';

function Chat({params , userId}:{params :{ chatID : string}, userId : string}) {
  const chatId = params.chatID;

  const [messages, setMessages] = useState<{ sender_id: string; message: string }[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Join the chat room when the component is mounted
    socket.emit('join_chat', params.chatID);

    // Listen for new messages
    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Fetch chat history on mount
    async function fetchMessages() {
      const response = await fetch(`/api/getMessages?chatId=${chatId}`);
      const data = await response.json();
      setMessages(data);
    }

    fetchMessages();
  }, [chatId, params.chatID]);

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

    // Emit message to the server
    socket.emit('send_message', message);

    // Clear input
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Chat Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div 
              key={index}
              className={`flex ${msg.sender_id === userId ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  msg.sender_id === userId 
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-white text-gray-800 rounded-bl-none shadow'
                }`}
              >
                <p>{msg.message}</p>
                <p className={`text-xs mt-1 ${
                  msg.sender_id === userId ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {new Date().toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          ))}
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