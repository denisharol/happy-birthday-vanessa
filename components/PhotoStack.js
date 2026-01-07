"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VANESSA_IMAGES = Array.from({ length: 11 }, (_, i) => 
  `/vanessa/Img ${i + 1}.jpeg`
);

export default function PhotoStack({ onNext }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    VANESSA_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const handleTouchStart = () => {
    timerRef.current = setTimeout(() => {
      setShowSecret(true);
      if (navigator.vibrate) navigator.vibrate(50); 
    }, 2000);
  };

  const handleTouchEnd = () => clearTimeout(timerRef.current);

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row items-start justify-center px-4 overflow-visible pt-0 pb-20 gap-8 md:gap-16">
      
      <div className="w-full md:w-1/3 h-auto md:h-screen flex flex-col justify-center items-center md:items-start sticky top-0 z-30 bg-transparent py-10">
        <div className="space-y-4 text-center md:text-left">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onContextMenu={(e) => e.preventDefault()} 
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="text-5xl md:text-8xl font-serif tracking-tighter leading-none cursor-default select-none"
          >
            All you
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] md:text-sm uppercase tracking-widest text-zinc-400 max-w-[250px] mx-auto md:mx-0 leading-relaxed"
          >
            A curated selection of moments from your journey so far.
          </motion.p>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 pt-4 items-center justify-center md:justify-start">
            {isExpanded && (
              <button 
                onClick={() => {
                  setIsExpanded(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
                className="text-[10px] uppercase tracking-[0.4em] font-bold transition-all hover:text-zinc-500"
              >
                Back to Stack
              </button>
            )}
            <button 
              onClick={onNext} 
              className="px-10 py-4 bg-zinc-900 text-white dark:bg-white dark:text-black uppercase text-[10px] tracking-[0.4em] font-bold active:scale-95 transition-transform"
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      <div className="relative w-full md:w-2/3 flex items-start justify-center min-h-screen overflow-visible pt-10">
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-visible">
              <motion.div 
                key="stacked"
                className="relative cursor-pointer will-change-transform group"
                onClick={() => setIsExpanded(true)}
                animate={{ 
                  scale: [0.9, 0.95, 0.9],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                {VANESSA_IMAGES.slice(0, 7).map((src, i) => (
                  <motion.div
                    key={src}
                    initial={{ y: -1000, opacity: 0, rotate: i * 20 }}
                    animate={{ 
                      y: 0, 
                      opacity: 1, 
                      rotate: i * 4 - 12 
                    }}
                    whileHover={{ 
                      rotate: (i - 3) * 10,
                      x: (i - 3) * 40,
                      y: -15,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 40, 
                      damping: 12, 
                      delay: i * 0.12 
                    }}
                    className="absolute top-0 left-0 w-48 h-64 md:w-64 md:h-80 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl shadow-2xl border-[3px] md:border-4 border-white dark:border-zinc-800 transition-shadow duration-500 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                    style={{ zIndex: 20 - i }}
                  >
                    <img src={src} className="w-full h-full object-cover" alt="Vanessa" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ) : (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="columns-2 gap-3 md:gap-6 w-full max-w-4xl mx-auto space-y-3 md:space-y-6 pt-10"
            >
              {VANESSA_IMAGES.map((src, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="break-inside-avoid"
                >
                  <img 
                    src={src} 
                    className="w-full h-auto object-cover rounded-lg md:rounded-2xl shadow-lg border-2 border-white dark:border-zinc-900" 
                    alt={`Vanessa ${i + 1}`} 
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showSecret && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setShowSecret(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-lg p-6"
          >
            <div className="bg-white p-3 pb-10 shadow-2xl rounded-sm transform rotate-2 max-w-[280px] w-full">
              <img src={VANESSA_IMAGES[10]} className="w-full aspect-square object-cover" />
              <p className="font-serif italic text-black mt-4 text-center text-sm">Found a hidden gem. ✨</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}