'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaTimes, FaPaintBrush, FaGem, FaRocket } from 'react-icons/fa';
import Image from 'next/image';

interface NFTModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NFTModal({ isOpen, onClose }: NFTModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-2xl bg-gradient-to-br from-[#0a0e17] via-[#15202b] to-[#0a0e17] rounded-2xl border-2 border-[#00ff41] shadow-[0_0_50px_rgba(0,255,65,0.3)] overflow-hidden">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-300 hover:scale-110 group"
              >
                <FaTimes className="w-5 h-5 text-gray-400 group-hover:text-[#00ff41]" />
              </button>

              {/* Content */}
              <div className="p-6 sm:p-8">
                {/* Header with Image */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-[#00ff41] shadow-[0_0_30px_rgba(0,255,65,0.4)] mb-4">
                    <Image 
                      src="/pepeimage.png" 
                      alt="Pumpfun Pepe NFT" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-2 flex items-center justify-center gap-3">
                    <FaPaintBrush className="text-[#00ff41]" />
                    Pumpfun Pepe NFTs
                  </h2>
                  
                  <div className="inline-block px-4 py-1 bg-[#00ff41]/20 border border-[#00ff41] rounded-full">
                    <p className="text-[#00ff41] font-bold text-sm">Limited Collection</p>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-4 mb-6">
                  <p className="text-gray-300 text-center text-base sm:text-lg leading-relaxed">
                    A <span className="text-[#00ff41] font-bold">Cult Classic Collection</span> of <span className="text-white font-bold">967 one-of-a-kind</span> PumpFun Pepe NFTs, carefully curated with the community in mind.
                  </p>
                  
                  <div className="bg-[#00ff41]/10 border border-[#00ff41]/30 rounded-lg p-4">
                    <p className="text-white text-center font-semibold flex items-center justify-center gap-2">
                      <FaGem className="text-[#00ff41]" />
                      <span><span className="text-[#00ff41]">95% of sales</span> will be used to fuel the PFP ecosystem!</span>
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  <div className="bg-black/30 border border-gray-700 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-[#00ff41]">967</p>
                    <p className="text-gray-400 text-sm">Unique NFTs</p>
                  </div>
                  <div className="bg-black/30 border border-gray-700 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-[#00ff41]">1/1</p>
                    <p className="text-gray-400 text-sm">Each Unique</p>
                  </div>
                  <div className="bg-black/30 border border-gray-700 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-[#00ff41]">95%</p>
                    <p className="text-gray-400 text-sm">Back to PFP</p>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href="https://magiceden.io/marketplace/pumpfun_pepe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-8 py-4 bg-[#00ff41] hover:bg-[#00cc34] text-black font-bold text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(0,255,65,0.5)] hover:scale-105"
                >
                  <FaRocket />
                  View Collection on Magic Eden
                </a>

                {/* Footer Note */}
                <p className="text-gray-500 text-xs text-center mt-4">
                  Join the community • Be part of the movement
                </p>
              </div>

              {/* Decorative glow effects */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#00ff41] opacity-20 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#00ff41] opacity-20 blur-[100px] rounded-full pointer-events-none" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
