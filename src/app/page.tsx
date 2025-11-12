'use client';

import FloatingComment from '@/components/FloatingComment';
import Hero from '@/components/Hero';
import CursorTrail from '@/components/CursorTrail';
import Loader from '@/components/Loader';
import MarketCapTracker from '@/components/MarketCapTracker';
import NFTModal from '@/components/NFTModal';
import TeamModal from '@/components/TeamModal';
import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { FaGamepad } from 'react-icons/fa';

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
  const [showNFTModal, setShowNFTModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);

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
      
      {/* NFT Collection Modal */}
      <NFTModal isOpen={showNFTModal} onClose={() => setShowNFTModal(false)} />
      
      {/* Team Modal */}
      <TeamModal isOpen={showTeamModal} onClose={() => setShowTeamModal(false)} />
      
      {/* Fixed Whitepaper Button - Top Left */}
      <div className="fixed top-2 left-2 sm:top-4 sm:left-4 z-50 w-[120px] sm:w-[180px]">
        <a
          href="/Pfp Whitepaper.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full px-3 py-1.5 sm:px-6 sm:py-3 bg-transparent border-2 border-[#00ff41] hover:bg-[#00ff41]/10 text-[#00ff41] font-bold text-xs sm:text-base rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,65,0.5)] flex items-center justify-center gap-1 sm:gap-2 backdrop-blur-sm"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-3 w-3 sm:h-5 sm:w-5" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
          <span className="hidden sm:inline">Whitepaper</span>
          <span className="sm:hidden">Paper</span>
        </a>
      </div>

      {/* Fixed Play Game Button - Top Left Below Whitepaper */}
      <div className="fixed top-12 left-2 sm:top-20 sm:left-4 z-50 w-[120px] sm:w-[180px]">
        <Link
          href="/pacman"
          className="w-full px-3 py-1.5 sm:px-6 sm:py-3 bg-transparent border-2 border-purple-500 hover:bg-purple-500/10 text-purple-400 font-bold text-xs sm:text-base rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] flex items-center justify-center gap-1 sm:gap-2 backdrop-blur-sm"
        >
          <FaGamepad className="h-3 w-3 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">Play Game</span>
          <span className="sm:hidden">Game</span>
        </Link>
      </div>
      
      {/* Fixed Market Cap Tracker - Top Right */}
      <div className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50">
        <MarketCapTracker />
      </div>

      {/* Fixed Moonshot Button - Top Right Below Market Cap */}
      <a
        href="https://moonshot.com/5TfqNKZbn9AnNtzq8bbkyhKgcPGTfNDc9wNzFrTBpump"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-12 right-2 sm:top-20 sm:right-4 z-50 group"
        title="View on Moonshot"
      >
        <div className="relative px-2 py-1.5 sm:px-4 sm:py-3 h-[28px] sm:h-[44px] bg-gray-800 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(107,114,128,0.6)] flex items-center justify-center gap-1 sm:gap-2">
          <img 
            src="/moonshot_light.png" 
            alt="Moonshot" 
            className="h-3 w-auto sm:h-5"
          />
        </div>
      </a>

      {/* Fixed MEXC Button - Top Right Below Moonshot */}
      <a
        href="https://www.mexc.com/exchange/PFP_USDT"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-[88px] right-2 sm:top-36 sm:right-4 z-50 group"
        title="Trade PFP on MEXC"
      >
        <div className="relative px-2 py-1.5 sm:px-4 sm:py-3 h-[28px] sm:h-[44px] bg-gradient-to-br from-[#00d4ff] to-[#0099cc] rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(0,212,255,0.6)] flex items-center justify-center gap-1 sm:gap-2">
          <img 
            src="/mexclogo.png" 
            alt="MEXC" 
            className="w-3 h-3 sm:w-5 sm:h-5"
          />
          <span className="text-white font-bold text-xs sm:text-sm">MEXC</span>
        </div>
      </a>

      {/* Fixed Team Button - Bottom Left */}
      <button
        onClick={() => setShowTeamModal(true)}
        className="fixed bottom-6 left-6 z-50 group"
        title="Meet the Team"
      >
        <div className="relative px-5 py-3 bg-gradient-to-br from-[#ff00ff] to-[#cc00cc] rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(255,0,255,0.6)] hover:animate-pulse">
          <span className="text-white font-black text-lg">Team</span>
        </div>
      </button>

      {/* Fixed NFT Collection Button - Bottom Right */}
      <a
        href="https://magiceden.io/marketplace/pumpfun_pepe"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
        title="View NFT Collection"
      >
        <div className="relative px-5 py-3 bg-gradient-to-br from-[#00ff41] to-[#00cc34] rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(0,255,65,0.6)] animate-pulse hover:animate-none">
          <span className="text-black font-black text-lg">NFTs</span>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#0a0e17] animate-bounce" />
        </div>
      </a>

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
