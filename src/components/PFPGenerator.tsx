'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaXmark, FaShuffle } from 'react-icons/fa6';
import { useState, useRef, useEffect } from 'react';

interface PFPGeneratorProps {
  onClose: () => void;
}

// Asset collections
const ASSETS = {
  backgrounds: [
    '1 Shade of Grey.png',
    'BackgroundLess.png',
    'Call Me Sol.png',
    'Gradient.png',
    'Midnight.png',
    'musTARD.png',
    'My Gender is Pump.png',
    'Orange Cream.png',
    'PurpleNurp.png',
  ],
  base: 'PumpFun Pepe Base.png',
  clothes: [
    'BlueShirt.png',
    'BlueSuit.png',
    'NoirShirt.png',
    'NoirSuit.png',
    'NotNotNot.png',
    'OrangeShirt.png',
    'PinkShirt.png',
    'PurpleShirt.png',
    'RareSuit.png',
    'RedSuit.png',
    'STOP BEING POOR.png',
  ],
  dotdotdot: [
    'NotNotNot.png',
    'SolSolSol.png',
  ],
  headAccessories: [
    'Blue Trencher.png',
    'Geeky Glasses.png',
    'Green Trencher.png',
    'Grey Trencher.png',
    'Harry I\'m a Pepe.png',
    'Heavenly Pepe.png',
    'Horn(y).png',
    'I am COOL.png',
    'Kippah.png',
    'NotNotNot.png',
    'PumpTrencher.png',
    'Sombrero.png',
    'StrawHat.png',
    'Teal Trencher.png',
  ],
};

type Category = 'background' | 'clothes' | 'dotdotdot' | 'headAccessories';

export default function PFPGenerator({ onClose }: PFPGeneratorProps) {
  const [generatedPFP, setGeneratedPFP] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<Category>('background');
  
  const [selectedBackground, setSelectedBackground] = useState<string>(ASSETS.backgrounds[0]);
  const [selectedClothes, setSelectedClothes] = useState<string>(ASSETS.clothes[0]);
  const [selectedDotdotdot, setSelectedDotdotdot] = useState<string>(ASSETS.dotdotdot[0]);
  const [selectedHeadAccessory, setSelectedHeadAccessory] = useState<string>(ASSETS.headAccessories[0]);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getRandomItem = <T,>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  const generatePFP = async (
    bg: string,
    clothes: string,
    dotdotdot: string,
    headAccessory: string
  ) => {
    setIsGenerating(true);
    
    try {
      // Load all images
      const [bgImage, baseImage, clothesImage, dotdotdotImage, headAccessoryImage] = await Promise.all([
        loadImage(`/Background/${bg}`),
        loadImage(`/Base/${ASSETS.base}`),
        loadImage(`/Clothes/${clothes}`),
        loadImage(`/DotDotDot/${dotdotdot}`),
        loadImage(`/Head Accessories/${headAccessory}`),
      ]);

      // Create canvas and composite images
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size based on base image
      canvas.width = baseImage.width;
      canvas.height = baseImage.height;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Layer images in order
      ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
      ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
      ctx.drawImage(clothesImage, 0, 0, canvas.width, canvas.height);
      ctx.drawImage(dotdotdotImage, 0, 0, canvas.width, canvas.height);
      ctx.drawImage(headAccessoryImage, 0, 0, canvas.width, canvas.height);

      // Convert to data URL
      const dataUrl = canvas.toDataURL('image/png');
      setGeneratedPFP(dataUrl);
    } catch (error) {
      console.error('Error generating PFP:', error);
      alert('Failed to generate PFP. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRandomGenerate = () => {
    const randomBg = getRandomItem(ASSETS.backgrounds);
    const randomClothes = getRandomItem(ASSETS.clothes);
    const randomDotdotdot = getRandomItem(ASSETS.dotdotdot);
    const randomHeadAccessory = getRandomItem(ASSETS.headAccessories);

    setSelectedBackground(randomBg);
    setSelectedClothes(randomClothes);
    setSelectedDotdotdot(randomDotdotdot);
    setSelectedHeadAccessory(randomHeadAccessory);

    generatePFP(randomBg, randomClothes, randomDotdotdot, randomHeadAccessory);
  };

  const handleSelectionChange = (category: Category, value: string) => {
    switch (category) {
      case 'background':
        setSelectedBackground(value);
        generatePFP(value, selectedClothes, selectedDotdotdot, selectedHeadAccessory);
        break;
      case 'clothes':
        setSelectedClothes(value);
        generatePFP(selectedBackground, value, selectedDotdotdot, selectedHeadAccessory);
        break;
      case 'dotdotdot':
        setSelectedDotdotdot(value);
        generatePFP(selectedBackground, selectedClothes, value, selectedHeadAccessory);
        break;
      case 'headAccessories':
        setSelectedHeadAccessory(value);
        generatePFP(selectedBackground, selectedClothes, selectedDotdotdot, value);
        break;
    }
  };

  const downloadPFP = () => {
    if (!generatedPFP) return;
    
    const link = document.createElement('a');
    link.href = generatedPFP;
    link.download = `pumpfun-pepe-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generate initial PFP on mount
  useEffect(() => {
    generatePFP(selectedBackground, selectedClothes, selectedDotdotdot, selectedHeadAccessory);
  }, []);

  const getCategoryAssets = (category: Category) => {
    switch (category) {
      case 'background': return ASSETS.backgrounds;
      case 'clothes': return ASSETS.clothes;
      case 'dotdotdot': return ASSETS.dotdotdot;
      case 'headAccessories': return ASSETS.headAccessories;
    }
  };

  const getSelectedValue = (category: Category) => {
    switch (category) {
      case 'background': return selectedBackground;
      case 'clothes': return selectedClothes;
      case 'dotdotdot': return selectedDotdotdot;
      case 'headAccessories': return selectedHeadAccessory;
    }
  };

  const getCategoryLabel = (category: Category) => {
    switch (category) {
      case 'background': return 'Background';
      case 'clothes': return 'Clothes';
      case 'dotdotdot': return 'Style';
      case 'headAccessories': return 'Head Accessories';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gradient-to-br from-[#0a0e17] to-[#15202b] border-2 border-[#00ff41]/40 rounded-2xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(0,255,65,0.2)]"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Hidden canvas for compositing */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700">
            <div>
              <h2 className="text-3xl font-black text-white mb-1">PFP Generator</h2>
              <p className="text-sm text-gray-400">Create your unique Pumpfun Pepe</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-all duration-200 hover:rotate-90"
            >
              <FaXmark className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Side - Preview */}
            <div className="space-y-4">
              <div className="bg-black/50 border-2 border-[#00ff41]/30 rounded-xl p-6 flex items-center justify-center min-h-[400px] relative overflow-hidden">
                {/* Animated glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00ff41]/5 to-transparent pointer-events-none"></div>
                
                {isGenerating ? (
                  <div className="text-center relative z-10">
                    <div className="w-20 h-20 border-4 border-[#00ff41]/30 border-t-[#00ff41] rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400 font-semibold">Generating...</p>
                  </div>
                ) : generatedPFP ? (
                  <div className="text-center relative z-10">
                    <div className="w-80 h-80 rounded-2xl overflow-hidden border-4 border-[#00ff41] shadow-[0_0_60px_rgba(0,255,65,0.4)] mx-auto mb-4 bg-black/50">
                      <img 
                        src={generatedPFP} 
                        alt="Generated PFP" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 relative z-10">
                    <FaShuffle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Your PFP will appear here</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleRandomGenerate}
                  disabled={isGenerating}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-[#00ff41] to-[#00cc34] text-black font-bold text-lg rounded-xl hover:shadow-[0_0_30px_rgba(0,255,65,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 hover:scale-105"
                >
                  <FaShuffle className="w-5 h-5" />
                  Randomize All
                </button>
                
                {generatedPFP && (
                  <button
                    onClick={downloadPFP}
                    className="px-6 py-4 bg-transparent border-2 border-[#00ff41] text-[#00ff41] font-bold text-lg rounded-xl hover:bg-[#00ff41]/10 transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105"
                  >
                    <FaDownload className="w-5 h-5" />
                    Download
                  </button>
                )}
              </div>

              {/* Stats */}
              <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-gray-700 rounded-xl p-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-[#00ff41]">
                      {(ASSETS.backgrounds.length * ASSETS.clothes.length * ASSETS.dotdotdot.length * ASSETS.headAccessories.length).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Combinations</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#00ff41]">
                      {ASSETS.backgrounds.length + ASSETS.clothes.length + ASSETS.dotdotdot.length + ASSETS.headAccessories.length}
                    </p>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Total Assets</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Customization */}
            <div className="space-y-4">
              {/* Category Tabs */}
              <div className="flex gap-2 p-1 bg-black/50 rounded-xl border border-gray-700">
                {(['background', 'clothes', 'dotdotdot', 'headAccessories'] as Category[]).map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveTab(category)}
                    className={`flex-1 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                      activeTab === category
                        ? 'bg-[#00ff41] text-black shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    {getCategoryLabel(category)}
                  </button>
                ))}
              </div>

              {/* Asset Selection Grid */}
              <div className="bg-black/50 border border-gray-700 rounded-xl p-4 min-h-[500px]">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center justify-between">
                  <span>Select {getCategoryLabel(activeTab)}</span>
                  <span className="text-sm text-gray-400">
                    {getCategoryAssets(activeTab).length} options
                  </span>
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                  {getCategoryAssets(activeTab).map((asset) => (
                    <button
                      key={asset}
                      onClick={() => handleSelectionChange(activeTab, asset)}
                      className={`relative aspect-square rounded-lg border-2 transition-all duration-200 hover:scale-105 overflow-hidden group ${
                        getSelectedValue(activeTab) === asset
                          ? 'border-[#00ff41] shadow-[0_0_20px_rgba(0,255,65,0.5)]'
                          : 'border-gray-700 hover:border-[#00ff41]/50'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
                        <img
                          src={`/${activeTab === 'background' ? 'Background' : activeTab === 'clothes' ? 'Clothes' : activeTab === 'dotdotdot' ? 'DotDotDot' : 'Head Accessories'}/${asset}`}
                          alt={asset.replace('.png', '')}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Selection indicator */}
                      {getSelectedValue(activeTab) === asset && (
                        <div className="absolute inset-0 bg-[#00ff41]/20 flex items-center justify-center">
                          <div className="w-8 h-8 bg-[#00ff41] rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      )}
                      
                      {/* Asset name on hover */}
                      <div className="absolute bottom-0 inset-x-0 bg-black/80 text-white text-xs p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 truncate">
                        {asset.replace('.png', '')}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
