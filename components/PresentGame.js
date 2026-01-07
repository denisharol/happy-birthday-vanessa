"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GIFTS = [
  { 
    name: "Necklace", 
    img: "/presents/Necklase.webp",
    correct: false 
  },
  { 
    name: "Oraimo Spacebuds", 
    img: "/presents/Oraimo spacebuds.webp",
    correct: false 
  },
  { 
    name: "Gift Hamper", 
    img: "/presents/gift hamper.jpg",
    correct: true 
  }
];

export default function PresentGame({ onWin, onLose }) {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 pt-10 pb-20 overflow-hidden">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.h2
            key="intro-text"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-serif text-center leading-tight max-w-2xl px-4"
          >
            For your 22nd you deserve something nice. <br/>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="italic block mt-4 text-zinc-500"
            >
              Guess what we got you?
            </motion.span>
          </motion.h2>
        ) : (
          <motion.div 
            key="game-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-6xl space-y-10"
          >
            <div className="text-center space-y-2">
              <h2 className="text-xl md:text-2xl font-serif italic">Choose Wisely</h2>
              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-zinc-400">
                Select your guess
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              {GIFTS.map((gift, i) => (
                <motion.button
                  key={gift.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15, type: "spring", stiffness: 80 }}
                  onClick={() => gift.correct ? onWin() : onLose()}
                  className="group flex flex-col items-center gap-4"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-zinc-50 dark:bg-zinc-950 border-[1px] border-zinc-200 dark:border-zinc-800 group-active:scale-95 transition-all duration-500 shadow-lg group-hover:shadow-2xl">
                    <img 
                      src={gift.img} 
                      className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" 
                      alt={gift.name} 
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                  </div>
                  <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-300">
                    {gift.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}