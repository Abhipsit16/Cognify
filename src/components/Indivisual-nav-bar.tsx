'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';


const NavigationBar = ({ 
  onSearch, 
  showSearch = false 
}: { 
  onSearch?: (query: string) => void;
  showSearch?: boolean;
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useUser();
  

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(searchQuery);
    }
  };

  const navItems = [
    { name: 'Home', path: user ? `/individual/${user.id}/Home` : '/sign-in' },
    { name: 'Posts', path: user ? `/individual/${user.id}/posts` : '/sign-in' },
    { name: 'Requests', path: user ? `/individual/${user.id}/myrequests` : '/sign-in' },
    { name: 'Chats', path: user ? `/individual/${user.id}/chats` : '/sign-in' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#040053] shadow-lg">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={48}
            height={48}
            className="rounded-md object-contain"
          />
          <span className="text-white text-xl font-bold">Cognify</span>
        </Link>

        {/* Search Bar */}
        {showSearch && (
          <div className="hidden md:flex items-center gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search..."
              className="px-4 py-2 rounded-md"
            />
            <button
              onClick={() => onSearch && onSearch(searchQuery)}
              className="text-white bg-blue-500 px-4 py-2 rounded-md"
            >
              Search
            </button>
          </div>
        )}

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className="text-white hover:text-[#58a6ff] transition-colors duration-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <UserButton
           
            appearance={{
              elements: {
                userButtonPrimaryIdentifier: {
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "#ffffff",
                  fontFamily: "'Geist Sans', sans-serif",
                  
                  
                },
              },
            }}
          />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white z-50 relative"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black z-40 flex items-center justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col items-center gap-8">
              {navItems.map((item) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={item.path}
                    className="text-white text-2xl hover:text-red-500 transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
              {/* Add UserButton to Mobile Menu */}
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <UserButton showName />
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavigationBar;
