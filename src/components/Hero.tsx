'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaXTwitter, FaCopy, FaCheck, FaImage } from 'react-icons/fa6';
import { useState } from 'react';
import { CONTRACT_ADDRESS, TICKER, PROJECT_NAME, X_COMMUNITY_LINK, DEXTOOLS_LINK, DEXSCREENER_LINK, JUPITER_LINK } from '@/lib/config';
import PFPGenerator from './PFPGenerator';

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const [showPFPGenerator, setShowPFPGenerator] = useState(false);

  const handleCopyCA = async () => {
    await navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4 md:gap-8 max-w-6xl mx-auto">
      {/* Logo/Image */}
      <motion.div
        className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-[#00ff41] shadow-[0_0_40px_rgba(0,255,65,0.3)]"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Image 
          src="/pepeimage.png" 
          alt="Pumpfun Pepe" 
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Title */}
      <motion.div
        className="text-center px-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-2 tracking-tight">
          {PROJECT_NAME}
        </h1>
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#00ff41] tracking-wider">
          {TICKER}
        </p>
      </motion.div>

      {/* Tagline */}
      <motion.p
        className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl text-center px-4 font-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        Every normie who makes an account starts here. <br className="hidden sm:block" />
        <span className="text-gray-400 text-sm sm:text-base md:text-lg">The blank slate. The face of every beginning.</span>
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-col gap-3 md:gap-4 mt-2 md:mt-4 w-full max-w-2xl px-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        {/* Top Row - Main Actions */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full">
          <button
            onClick={handleCopyCA}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-[#00ff41] text-black font-bold text-base sm:text-lg rounded-lg hover:bg-[#00cc34] transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(0,255,65,0.5)] flex items-center justify-center gap-2 sm:gap-3 flex-1"
          >
            {copied ? (
              <>
                <FaCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                COPIED!
              </>
            ) : (
              <>
                <FaCopy className="w-4 h-4 sm:w-5 sm:h-5" />
                COPY CA
              </>
            )}
          </button>

          <button
            onClick={() => setShowPFPGenerator(true)}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-[#00ff41] text-[#00ff41] font-bold text-base sm:text-lg rounded-lg hover:bg-[#00ff41]/10 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 flex-1"
          >
            <FaImage className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="whitespace-nowrap">PFP GENERATOR</span>
          </button>

          <a
            href={X_COMMUNITY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-[#00ff41] text-[#00ff41] font-bold text-base sm:text-lg rounded-lg hover:bg-[#00ff41]/10 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 flex-1"
          >
            <FaXTwitter className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="whitespace-nowrap">JOIN COMMUNITY</span>
          </a>
        </div>

        {/* Bottom Rows - DEX Links */}
        <div className="flex flex-col gap-3 md:gap-4 w-full">
          {/* First Row - 3 buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full">
            <a
              href={JUPITER_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-transparent border-2 border-gray-600 text-white font-semibold text-sm sm:text-base rounded-lg hover:border-[#00ff41] hover:text-[#00ff41] transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group flex-1"
            >
              <div className="relative w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 rounded-full overflow-hidden">
                <Image 
                  src="/jupiterlogo.png" 
                  alt="Jupiter" 
                  fill
                  className="object-cover"
                />
              </div>
              <span>Jupiter</span>
            </a>

            <a
              href={DEXTOOLS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-transparent border-2 border-gray-600 text-white font-semibold text-sm sm:text-base rounded-lg hover:border-[#00ff41] hover:text-[#00ff41] transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group flex-1"
            >
              <div className="relative w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0">
                <Image 
                  src="/dextoolslogo.svg" 
                  alt="DexTools" 
                  fill
                  className="object-contain"
                />
              </div>
              <span>DexTools</span>
            </a>

            <a
              href={DEXSCREENER_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-transparent border-2 border-gray-600 text-white font-semibold text-sm sm:text-base rounded-lg hover:border-[#00ff41] hover:text-[#00ff41] transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group flex-1"
            >
              <div className="relative w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0">
                <Image 
                  src="/dexlogo.jpg" 
                  alt="DexScreener" 
                  fill
                  className="object-contain rounded"
                />
              </div>
              <span>DexScreener</span>
            </a>
          </div>

          {/* Second Row - 3 buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full">
            <a
              href="https://www.coingecko.com/en/coins/pumpfun-pepe"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-transparent border-2 border-gray-600 text-white font-semibold text-sm sm:text-base rounded-lg hover:border-[#00ff41] hover:text-[#00ff41] transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group flex-1"
            >
              <div className="relative w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0">
                <Image 
                  src="/coingeckologo.png" 
                  alt="CoinGecko" 
                  fill
                  className="object-contain"
                />
              </div>
              <span>CoinGecko</span>
            </a>

            <a
              href="https://dex.coinmarketcap.com/token/solana/5TfqNKZbn9AnNtzq8bbkyhKgcPGTfNDc9wNzFrTBpump/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-transparent border-2 border-gray-600 text-white font-semibold text-sm sm:text-base rounded-lg hover:border-[#00ff41] hover:text-[#00ff41] transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group flex-1"
            >
              <div className="relative w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0">
                <Image 
                  src="/cmclogo.jpeg" 
                  alt="CoinMarketCap" 
                  fill
                  className="object-contain"
                />
              </div>
              <span>CMC</span>
            </a>

            <a
              href="https://memedepot.com/d/pumpfun-pepe"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-transparent border-2 border-gray-600 text-white font-semibold text-sm sm:text-base rounded-lg hover:border-[#00ff41] hover:text-[#00ff41] transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group flex-1"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-5 h-5 sm:w-6 sm:h-6" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span>Meme Depot</span>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Contract Address Display */}
      <motion.div
        className="mt-4 md:mt-8 px-4 sm:px-6 py-2.5 sm:py-3 bg-black/50 border border-gray-700 rounded-lg backdrop-blur-sm max-w-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1 text-center">Contract Address</p>
        <p className="text-white font-mono text-xs sm:text-sm md:text-base break-all text-center">
          {CONTRACT_ADDRESS}
        </p>
      </motion.div>

      {/* PFP Generator Modal */}
      {showPFPGenerator && (
        <PFPGenerator onClose={() => setShowPFPGenerator(false)} />
      )}
    </div>
  );
}

