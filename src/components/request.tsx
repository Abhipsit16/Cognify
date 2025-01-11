import React, { useState } from 'react';

export default function RequestAccess({ postId, currentUser, authorId }) {
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleRequest = async () => {
    try {
      // ...existing code...
       await fetch('/api/createRequest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromUser: currentUser,
          toUser: authorId,
          postId,
          message,
        }),
      });
      // ...existing code...
      alert('Request sent!');
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105"
      >
        Request Data
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-2xl transform transition-all duration-300 scale-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Request Access</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <textarea
              placeholder="Enter your request message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-4"
            />
            <button
              onClick={handleRequest}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 ease-in-out"
            >
              Submit Request
            </button>
          </div>
        </div>
      )}
    </>
  );
}
