'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaHeart } from 'react-icons/fa6';

interface FloatingCommentProps {
  text: string;
  username: string;
  likes: number;
  delay: number;
  duration: number;
  startX: number;
  startY: number;
}

export default function FloatingComment({ text, username, likes, delay, duration, startX, startY }: FloatingCommentProps) {
  return (
    <motion.div
      className="absolute flex items-start gap-2 sm:gap-3 bg-[#15202b]/80 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-gray-700/50 shadow-xl max-w-[200px] sm:max-w-xs"
      style={{ left: `${startX}%`, top: `${startY}%` }}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        y: [20, 0, 0, -20],
        scale: [0.8, 1, 1, 0.8]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        repeatDelay: 2,
        ease: "easeInOut"
      }}
    >
      <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 rounded-full overflow-hidden border-2 border-gray-600">
        <Image 
          src="/pepeimage.png" 
          alt="Normie Pepe" 
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-gray-400 text-xs font-semibold truncate">{username}</span>
        <p className="text-white text-xs sm:text-sm font-medium mt-1 line-clamp-2">{text}</p>
        <div className="flex items-center gap-2 sm:gap-3 mt-1 sm:mt-2">
          <span className="text-gray-500 text-xs hover:text-gray-400 cursor-pointer">Reply</span>
          <div className="flex items-center gap-1">
            <FaHeart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-500" />
            <span className="text-gray-500 text-xs">{likes}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

