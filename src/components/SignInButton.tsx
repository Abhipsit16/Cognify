'use client'

import { useState } from 'react'
import { SignIn } from '@clerk/nextjs'

export default function SignInButton() {
  const [showSignIn, setShowSignIn] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowSignIn(true)}
        className="bg-gradient-to-br from-[#2a4f4e] to-[#0a322d] text-white px-8 py-4 rounded-full text-[1.2rem] font-bold uppercase hover:bg-gradient-to-br hover:from-[#1a3354] hover:to-[#191846] transition-all duration-300"
      >
        Sign In / Login
      </button>

      {showSignIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg p-7">
            <button
              onClick={() => setShowSignIn(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <SignIn routing="hash" />
          </div>
        </div>
      )}
    </>
  )
}
