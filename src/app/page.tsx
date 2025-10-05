'use client';

import FloatingComment from '@/components/FloatingComment';
import Hero from '@/components/Hero';
import CursorTrail from '@/components/CursorTrail';
import Loader from '@/components/Loader';
import MarketCapTracker from '@/components/MarketCapTracker';
import { useMemo, useState, useEffect } from 'react';

const normieComments = [
  "This sends",
  "dex not paid",
  "farm",
  "dev will rug",
  "next PEPE",
  "HODL",
  "100 mil is possible",
  "Programmed by pumpfun fyi",
  "bond it",
  "70% bundle",
  "SEND IT",
  "4 % trim",
  "Let's go guys",
  "gud tek tbh",
  "Sendor",
  "higher",
  "Rug?",
  "This is bullish and alon posted",
  "FARM",
  "dex paid ?",
  "to the moon",
  "wen lambo",
];

// Generate random 6-character alphanumeric string (like SOL address start)
const generateRandomAddress = () => {
  const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Generate random likes count
const generateRandomLikes = () => {
  return Math.floor(Math.random() * 50) + 1; // 1-50 likes
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Hide loader after 2.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Generate comment props once on mount to avoid hydration issues
  const comments = useMemo(() => {
    // Show fewer comments on mobile
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const commentsToShow = isMobile ? normieComments.slice(0, 10) : normieComments;
    
    return commentsToShow.map((comment, index) => ({
      text: comment,
      username: generateRandomAddress(),
      likes: generateRandomLikes(),
      delay: (index * 1.5) % 15, // Stagger delays
      duration: 8 + Math.random() * 4, // Random duration between 8-12s
      startX: Math.random() * 80 + 5, // Random X position (5-85%)
      startY: Math.random() * 80 + 5, // Random Y position (5-85%)
    }));
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} />
      
      {/* Fixed Whitepaper Button - Top Left */}
      <div className="fixed top-4 left-4 z-50">
        <a
          href="/Pfp Whitepaper.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-transparent border-2 border-[#00ff41] hover:bg-[#00ff41]/10 text-[#00ff41] font-bold rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,65,0.5)] flex items-center gap-2 backdrop-blur-sm"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
          Whitepaper
        </a>
      </div>
      
      {/* Fixed Market Cap Tracker - Top Right */}
      <div className="fixed top-4 right-4 z-50">
        <MarketCapTracker />
      </div>

    <main className="relative w-full min-h-screen overflow-x-hidden overflow-y-auto bg-gradient-to-br from-[#0a0e17] via-[#15202b] to-[#0a0e17]">
      {/* Cursor Trail Effect - Hide on mobile */}
      <div className="hidden md:block">
        <CursorTrail />
      </div>
      
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.05)_1px,transparent_1px)] bg-[size:50px_50px] md:bg-[size:50px_50px] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      
      {/* Floating Comments Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {comments.map((comment, index) => (
          <FloatingComment
            key={index}
            text={comment.text}
            username={comment.username}
            likes={comment.likes}
            delay={comment.delay}
            duration={comment.duration}
            startX={comment.startX}
            startY={comment.startY}
          />
        ))}
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 py-8">
        <Hero />
      </div>

      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-[#00ff41] opacity-10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-[#00ff41] opacity-10 blur-[120px] rounded-full pointer-events-none" />
    </main>
    </>
  );
}
