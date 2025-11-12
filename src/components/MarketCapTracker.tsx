'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CONTRACT_ADDRESS } from '@/lib/config';

interface TokenData {
  price: number;
  marketCap: number;
}

export default function MarketCapTracker() {
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        const response = await fetch(
          `https://api.dexscreener.com/latest/dex/tokens/${CONTRACT_ADDRESS}`
        );
        const data = await response.json();
        
        if (data.pairs && data.pairs.length > 0) {
          const pair = data.pairs[0];
          setTokenData({
            price: parseFloat(pair.priceUsd),
            marketCap: parseFloat(pair.marketCap || pair.fdv || 0),
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching token data:', error);
        setLoading(false);
      }
    };

    fetchTokenData();
    const interval = setInterval(fetchTokenData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1000000) {
      return `$${(marketCap / 1000000).toFixed(2)}M`;
    } else if (marketCap >= 1000) {
      return `$${(marketCap / 1000).toFixed(2)}K`;
    }
    return `$${marketCap.toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="px-2 py-1 sm:px-4 sm:py-2 md:px-6 md:py-2.5 bg-black/50 border border-gray-700 rounded-full backdrop-blur-sm">
        <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm">Loading...</p>
      </div>
    );
  }

  if (!tokenData) {
    return null;
  }

  return (
    <motion.div
      className="px-2 py-1 sm:px-4 sm:py-2 md:px-6 md:py-2.5 bg-black/50 border border-[#00ff41]/50 rounded-full backdrop-blur-sm"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-[#00ff41] font-bold text-[10px] sm:text-sm md:text-base lg:text-lg tracking-wide">
        Market Cap: {formatMarketCap(tokenData.marketCap)}
      </p>
    </motion.div>
  );
}

