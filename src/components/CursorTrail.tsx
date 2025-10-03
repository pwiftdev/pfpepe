'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

export default function CursorTrail() {
  const [trail, setTrail] = useState<TrailPoint[]>([]);

  useEffect(() => {
    let idCounter = 0;
    const timeouts: NodeJS.Timeout[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      const id = idCounter++;
      const newPoint: TrailPoint = {
        x: e.clientX,
        y: e.clientY,
        id,
      };

      setTrail((prev) => [...prev, newPoint]);

      // Remove the point after animation completes
      const timeoutId = setTimeout(() => {
        setTrail((prev) => prev.filter((p) => p.id !== id));
      }, 800);
      
      timeouts.push(timeoutId);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {trail.map((point) => (
          <motion.div
            key={point.id}
            className="absolute w-3 h-3 rounded-full bg-[#00ff41]"
            style={{
              left: point.x - 6,
              top: point.y - 6,
            }}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

