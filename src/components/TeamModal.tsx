'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaTwitter, FaCode, FaRocket, FaPalette, FaStar } from 'react-icons/fa';
import Image from 'next/image';

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TeamMember {
  name: string;
  role: string;
  twitter: string;
  icon: any;
  color: string;
  isHighlighted?: boolean;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Bakardi',
    role: 'Web Developer',
    twitter: 'https://x.com/bakardii01',
    icon: FaCode,
    color: '#00ff41'
  },
  {
    name: 'Armoski',
    role: 'Deployer and Visionaire',
    twitter: 'https://x.com/Armoskii',
    icon: FaRocket,
    color: '#ff00ff',
    isHighlighted: true
  },
  {
    name: 'Bankai',
    role: 'NFT Artist and Community Manager',
    twitter: 'https://x.com/thesnowman_144',
    icon: FaPalette,
    color: '#00d4ff'
  }
];

export default function TeamModal({ isOpen, onClose }: TeamModalProps) {
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
            className="fixed inset-0 z-[101] flex items-center justify-center p-2 sm:p-4"
          >
            <div className="relative w-full max-w-3xl bg-gradient-to-br from-[#0a0e17] via-[#15202b] to-[#0a0e17] rounded-xl sm:rounded-2xl border-2 border-[#00ff41] shadow-[0_0_50px_rgba(0,255,65,0.3)] overflow-hidden max-h-[95vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-300 hover:scale-110 group"
              >
                <FaTimes className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-[#00ff41]" />
              </button>

              {/* Content */}
              <div className="p-4 sm:p-6 md:p-8">
                {/* Header */}
                <div className="text-center mb-4 sm:mb-6 md:mb-8">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2">
                    Meet The <span className="text-[#00ff41]">Team</span>
                  </h2>
                  <p className="text-gray-400 text-sm sm:text-base md:text-lg">
                    The minds behind Pumpfun Pepe
                  </p>
                </div>

                {/* Team Members Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-4">
                  {teamMembers.map((member, index) => {
                    const Icon = member.icon;
                    const isHighlighted = member.isHighlighted;
                    return (
                      <motion.div
                        key={member.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative group"
                      >
                        {/* Highlighted Badge for Armoski */}
                        {isHighlighted && (
                          <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-1 px-2 sm:px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-lg">
                            <FaStar className="w-2 h-2 sm:w-3 sm:h-3 text-white animate-pulse" />
                            <span className="text-[10px] sm:text-xs font-bold text-white">LEAD</span>
                            <FaStar className="w-2 h-2 sm:w-3 sm:h-3 text-white animate-pulse" />
                          </div>
                        )}
                        
                        <div 
                          className={`bg-black/40 border-2 rounded-xl p-4 sm:p-6 transition-all duration-300 h-full flex flex-col ${
                            isHighlighted 
                              ? 'border-yellow-500 shadow-[0_0_30px_rgba(255,215,0,0.4)] hover:shadow-[0_0_40px_rgba(255,215,0,0.6)] md:scale-105' 
                              : 'border-gray-700 hover:border-[#00ff41] hover:shadow-[0_0_20px_rgba(0,255,65,0.3)]'
                          }`}
                        >
                          {/* Profile Picture */}
                          <div className="flex justify-center mb-3 sm:mb-4">
                            <div 
                              className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden transition-all duration-300 group-hover:scale-110 ${
                                isHighlighted ? 'ring-3 sm:ring-4 ring-yellow-500 shadow-[0_0_20px_rgba(255,215,0,0.5)]' : 'ring-2 ring-gray-600'
                              }`}
                            >
                              <Image 
                                src="/pepeimage.png" 
                                alt={member.name}
                                fill
                                className="object-cover"
                              />
                              {/* Icon Badge */}
                              <div 
                                className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 p-1.5 sm:p-2 rounded-full transition-all duration-300"
                                style={{ 
                                  backgroundColor: `${member.color}`,
                                  boxShadow: `0 0 10px ${member.color}`
                                }}
                              >
                                <Icon 
                                  className="w-3 h-3 sm:w-4 sm:h-4" 
                                  style={{ color: 'black' }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Name */}
                          <h3 className={`text-xl sm:text-2xl font-bold text-center mb-1 sm:mb-2 ${
                            isHighlighted ? 'text-yellow-400' : 'text-white'
                          }`}>
                            {member.name}
                          </h3>

                          {/* Role */}
                          <p className="text-gray-400 text-center text-xs sm:text-sm mb-3 sm:mb-4 flex-grow">
                            {member.role}
                          </p>

                          {/* Twitter Link */}
                          <a
                            href={member.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 font-semibold text-sm sm:text-base ${
                              isHighlighted 
                                ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black'
                                : 'bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white'
                            }`}
                          >
                            <FaTwitter className="w-3 h-3 sm:w-4 sm:h-4" />
                            Follow
                          </a>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="text-center mt-4 sm:mt-6">
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Join us in building the future of PFP culture
                  </p>
                </div>
              </div>

              {/* Decorative glow effects */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#00ff41] opacity-20 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#ff00ff] opacity-20 blur-[100px] rounded-full pointer-events-none" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
