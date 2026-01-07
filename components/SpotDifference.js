"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SpotDifference({ onNext }) {
  const [hasSelected, setHasSelected] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 pt-10 pb-20 overflow-hidden">
      <AnimatePresence mode="wait">
        {!hasSelected ? (
          <motion.div 
            key="game-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-10 w-full"
          >
            <div className="text-center space-y-4">
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-7xl font-serif italic tracking-tighter"
              >
                Which Picture Looks Better?
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-medium"
              >
                Click the picture that looks better to you
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 w-full max-w-4xl">
              {[0, 1].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * (i + 1) }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setHasSelected(true)}
                  className="relative cursor-pointer aspect-[4/5] overflow-hidden rounded-xl shadow-2xl bg-zinc-100 border-[6px] md:border-8 border-white dark:border-zinc-900"
                >
                  <img 
                    src="/spot-the-difference/Img 10.jpeg" 
                    alt="Comparison" 
                    className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-black/5 active:bg-transparent transition-colors" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="reveal-message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="flex flex-col items-center gap-10 text-center max-w-xl"
          >
            <p className="text-2xl md:text-4xl font-serif italic leading-relaxed px-4 text-zinc-950 dark:text-black font-bold">
              "Tricked you! There was actually no difference. They're the same picture, both as perfect as the other."
            </p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="w-full"
            >
              <button 
                onClick={onNext}
                className="w-full md:w-auto px-16 py-5 bg-zinc-950 text-white dark:bg-white dark:text-black uppercase text-[10px] tracking-[0.5em] font-bold active:scale-95 transition-all shadow-xl hover:tracking-[0.6em]"
              >
                Proceed
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}