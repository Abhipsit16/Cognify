'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import NavigationBar from './home-nav-bar';

function FirstLogin() {
  const [interests, setInterests] = useState('');
  const [role, setRole] = useState('individual'); // New state for role
  const { user } = useUser();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(user){
      try {
        const response = await axios.post('/api/saveUserInterests', { 
          interests,
          role, // Include role in the request
          user: {
            id: user.id,
            email: user.emailAddresses[0].emailAddress,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
          }
        });
        console.log('User interests and role saved:', response.data);
      } catch (error) {
        console.error('Error saving user data:', error);
      }
    }
  };

  return (
    <div>
      <NavigationBar/>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
          <div>
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
              Welcome, {user?.firstName}!
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Tell us about yourself to help us personalize your experience
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select your role
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="individual"
                    checked={role === 'individual'}
                    onChange={(e) => setRole(e.target.value)}
                    className="mr-2"
                  />
                  Individual
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="organization"
                    checked={role === 'organization'}
                    onChange={(e) => setRole(e.target.value)}
                    className="mr-2"
                  />
                  Organization
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What are your interests?
              </label>
              <input
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="e.g., technology, art, music, sports"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
              <p className="mt-2 text-sm text-gray-500">
                Separate multiple interests with commas
              </p>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FirstLogin;
