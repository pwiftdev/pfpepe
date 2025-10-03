'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { PROJECT_NAME, TICKER } from '@/lib/config';

interface LoaderProps {
  isLoading: boolean;
}

export default function Loader({ isLoading }: LoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#0a0e17] via-[#15202b] to-[#0a0e17] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Animated Background Grid */}
          <motion.div 
            className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"
            animate={{
              backgroundPosition: ['0px 0px', '50px 50px'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Multiple Rotating Rings */}
          <motion.div
            className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] rounded-full border-2 border-[#00ff41]/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] rounded-full border-2 border-[#00ff41]/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Pulsing Glow Effects */}
          <motion.div
            className="absolute w-96 h-96 bg-[#00ff41] opacity-20 blur-[150px] rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute w-64 h-64 bg-[#00ff41] opacity-30 blur-[100px] rounded-full"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Particle Effects */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#00ff41] rounded-full"
              style={{
                left: '50%',
                top: '50%',
              }}
              animate={{
                x: [0, Math.cos((i / 12) * Math.PI * 2) * 200],
                y: [0, Math.sin((i / 12) * Math.PI * 2) * 200],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeOut"
              }}
            />
          ))}

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Glowing Ring Around Pepe */}
            <div className="relative">
              <motion.div
                className="absolute inset-0 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-4 border-[#00ff41]"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ marginLeft: '-16px', marginTop: '-16px' }}
              />
              
              {/* Rotating Pepe with Pulse */}
              <motion.div
                className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#00ff41] shadow-[0_0_60px_rgba(0,255,65,0.6)]"
                initial={{ scale: 0, rotate: 0 }}
                animate={{ 
                  scale: [0, 1.05, 1],
                  rotate: 360,
                }}
                transition={{
                  scale: { duration: 0.6, ease: "easeOut", times: [0, 0.6, 1] },
                  rotate: { duration: 3, ease: "linear", repeat: Infinity }
                }}
              >
                <motion.div
                  className="w-full h-full"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/pepeimage.png" 
                    alt="Loading" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Glitch Text Animation */}
            <motion.div
              className="text-center relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <motion.h2 
                className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 tracking-tight relative"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(0,255,65,0)',
                    '0 0 20px rgba(0,255,65,0.8)',
                    '0 0 20px rgba(0,255,65,0)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {PROJECT_NAME}
              </motion.h2>
              <motion.p 
                className="text-xl sm:text-2xl font-bold text-[#00ff41] tracking-wider"
                animate={{
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {TICKER}
              </motion.p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div 
              className="w-48 sm:w-64 h-1 bg-gray-800 rounded-full overflow-hidden mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-[#00ff41] to-[#00cc34] rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.3, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Typewriter Loading Text */}
            <motion.div
              className="flex items-center gap-1 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.p
                className="text-[#00ff41] text-sm sm:text-base tracking-widest uppercase font-mono"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                INITIALIZING
              </motion.p>
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="text-[#00ff41] text-xl font-bold"
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                >
                  .
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

