"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function MenuViewer({ restaurant, onNext }) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4 space-y-10 md:space-y-16">
      
      <div className="text-center space-y-4">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-serif italic tracking-tighter leading-none"
        >
          The Menu
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-zinc-500 max-w-xs mx-auto leading-relaxed"
        >
          Browse the culinary offerings for your birthday dinner
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-4xl bg-white dark:bg-zinc-950 shadow-2xl rounded-lg border border-zinc-100 dark:border-zinc-900 overflow-visible"
      >
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 z-10 min-h-[400px]">
             <div className="w-5 h-5 border-2 border-zinc-200 border-t-zinc-950 dark:border-t-white rounded-full animate-spin" />
          </div>
        )}

        <img 
          src="/menu/img 1.avif"
          alt="Restaurant Menu"
          className={`w-full h-auto block transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
          onLoad={() => setIsLoaded(true)}
        />
      </motion.div>

      <div className="flex flex-col items-center space-y-8 pb-20 w-full">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xs md:text-sm font-serif italic text-zinc-500"
        >
          Ready to move to the final chapter?
        </motion.p>
        <button 
          onClick={onNext}
          className="w-full md:w-auto px-16 py-5 bg-zinc-950 text-white dark:bg-white dark:text-black uppercase text-[10px] tracking-[0.5em] font-bold active:scale-95 transition-all shadow-xl hover:tracking-[0.6em]"
        >
          Proceed to Video
        </button>
      </div>
    </div>
  );
}