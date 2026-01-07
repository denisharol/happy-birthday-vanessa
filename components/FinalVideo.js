"use client";
import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function FinalVideo({ onNext, muteBackground }) {
  
  useEffect(() => {
    if (muteBackground) muteBackground();
  }, [muteBackground]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 pt-10 pb-20 overflow-hidden space-y-8 md:space-y-12">
      <div className="text-center space-y-4">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-7xl font-serif italic tracking-tighter"
        >
          Final Chapter
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-medium"
        >
          A special message for you
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl aspect-video shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden bg-black border border-zinc-200 dark:border-zinc-800"
      >
        <video 
          controls 
          autoPlay 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/vid 1.mp4" type="video/mp4" />
        </video>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="w-full flex justify-center"
      >
        <button 
          onClick={onNext}
          className="w-full md:w-auto px-16 py-5 bg-zinc-950 text-white dark:bg-white dark:text-black uppercase text-[10px] tracking-[0.5em] font-bold active:scale-95 transition-all shadow-xl"
        >
          Complete Journey
        </button>
      </motion.div>
    </div>
  );
}