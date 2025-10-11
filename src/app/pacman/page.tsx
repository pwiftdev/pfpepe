'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { FaMobileAlt } from 'react-icons/fa';

export default function PacmanGame() {
  const unityContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scriptLoadedRef = useRef(false);
  const [showMobileWarning, setShowMobileWarning] = useState(false);

  useEffect(() => {
    // Check if user is on mobile device
    const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobileDevice) {
      setShowMobileWarning(true);
      return; // Don't load Unity on mobile
    }

    if (scriptLoadedRef.current) return;
    scriptLoadedRef.current = true;

    // Load the Unity CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/game/TemplateData/style.css';
    document.head.appendChild(link);

    const container = unityContainerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) return;

    const loadingBar = container.querySelector("#unity-loading-bar") as HTMLElement;
    const progressBarFull = container.querySelector("#unity-progress-bar-full") as HTMLElement;
    const fullscreenButton = container.querySelector("#unity-fullscreen-button") as HTMLElement;
    const warningBanner = container.querySelector("#unity-warning") as HTMLElement;

    function unityShowBanner(msg: string, type: string) {
      function updateBannerVisibility() {
        if (warningBanner) {
          warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
        }
      }
      const div = document.createElement('div');
      div.innerHTML = msg;
      warningBanner.appendChild(div);
      if (type === 'error') div.style.cssText = 'background: red; padding: 10px;';
      else {
        if (type === 'warning') div.style.cssText = 'background: yellow; padding: 10px;';
        setTimeout(function() {
          warningBanner.removeChild(div);
          updateBannerVisibility();
        }, 5000);
      }
      updateBannerVisibility();
    }

    const buildUrl = "/game/Build";
    const loaderUrl = buildUrl + "/pumpfun pepe.loader.js";
    const config = {
      dataUrl: buildUrl + "/pumpfun pepe.data",
      frameworkUrl: buildUrl + "/pumpfun pepe.framework.js",
      codeUrl: buildUrl + "/pumpfun pepe.wasm",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "DefaultCompany",
      productName: "PacManUnity",
      productVersion: "1.0",
      showBanner: unityShowBanner,
    };

    // Detect mobile
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      // Mobile device style: fill the whole browser client area with the game canvas
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
      document.getElementsByTagName('head')[0].appendChild(meta);
      
      container.className = "unity-mobile";
      canvas.className = "unity-mobile";
      
      // Set canvas to full viewport
      canvas.style.width = "100%";
      canvas.style.height = "100%";
    } else {
      canvas.style.width = "1280px";
      canvas.style.height = "720px";
    }

    if (loadingBar) loadingBar.style.display = "block";

    // Load Unity loader script
    const script = document.createElement("script");
    script.src = loaderUrl;
    script.onload = () => {
      // @ts-ignore
      if (typeof createUnityInstance !== 'undefined') {
        // @ts-ignore
        createUnityInstance(canvas, config, (progress: number) => {
          if (progressBarFull) {
            progressBarFull.style.width = 100 * progress + "%";
          }
        }).then((unityInstance: any) => {
          if (loadingBar) loadingBar.style.display = "none";
          if (fullscreenButton) {
            fullscreenButton.onclick = () => {
              unityInstance.SetFullscreen(1);
            };
          }
        }).catch((message: string) => {
          alert(message);
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0a0e17] via-[#15202b] to-[#0a0e17] flex flex-col items-center justify-center p-2 sm:p-4">
      {/* Mobile Warning Modal */}
      {showMobileWarning && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="relative max-w-md w-full bg-gradient-to-br from-[#0a0e17] via-[#15202b] to-[#0a0e17] border-2 border-[#00ff41] rounded-2xl shadow-[0_0_50px_rgba(0,255,65,0.3)] p-6 sm:p-8">
            <div className="text-center">
              {/* Icon */}
              <div className="mb-4 flex justify-center">
                <div className="p-4 bg-[#00ff41]/20 rounded-full border-2 border-[#00ff41]">
                  <FaMobileAlt className="w-12 h-12 text-[#00ff41]" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
                Fren, the game is currently available only for desktops!
              </h2>

              {/* Subtitle */}
              <p className="text-xl font-bold text-[#00ff41] mb-6">
                Mobile soon! 🎮
              </p>

              {/* Back Button */}
              <Link
                href="/"
                className="inline-block px-8 py-3 bg-[#00ff41] hover:bg-[#00cc34] text-black font-bold text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(0,255,65,0.5)] hover:scale-105"
              >
                Back to Home
              </Link>
            </div>

            {/* Decorative glow effects */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-[#00ff41] opacity-20 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#00ff41] opacity-20 blur-[100px] rounded-full pointer-events-none" />
          </div>
        </div>
      )}

      {/* Back to Home Button */}
      <Link 
        href="/"
        className="fixed top-2 left-2 sm:top-4 sm:left-4 z-50 px-3 py-2 sm:px-6 sm:py-3 bg-transparent border-2 border-[#00ff41] hover:bg-[#00ff41]/10 text-[#00ff41] font-bold rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,65,0.5)] backdrop-blur-sm text-sm sm:text-base"
      >
        ← Back
      </Link>

      {/* Game Title */}
      <div className="text-center mb-2 sm:mb-4">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-1 sm:mb-2">
          Pumpfun Pepe <span className="text-[#00ff41]">Pacman</span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg hidden sm:block">
          Play the classic game with a Pepe twist!
        </p>
      </div>

      {/* Unity Game Container */}
      <div 
        id="unity-container" 
        className="unity-desktop relative w-full max-w-[1280px]"
        ref={unityContainerRef}
      >
        <canvas 
          id="unity-canvas" 
          width={1280} 
          height={720} 
          tabIndex={-1}
          ref={canvasRef}
          className="w-full h-auto border-2 sm:border-4 border-[#00ff41] rounded-lg shadow-[0_0_30px_rgba(0,255,65,0.3)]"
        />
        <div id="unity-loading-bar">
          <div id="unity-logo"></div>
          <div id="unity-progress-bar-empty">
            <div id="unity-progress-bar-full"></div>
          </div>
        </div>
        <div id="unity-warning"> </div>
        <div id="unity-footer">
          <div id="unity-webgl-logo"></div>
          <div id="unity-fullscreen-button"></div>
          <div id="unity-build-title">PacManUnity</div>
        </div>
      </div>

    </div>
  );
}

