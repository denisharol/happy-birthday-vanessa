"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';

const AURA_RESTAURANT = {
  name: "Aura Restaurant",
  folder: "Aura restaurant",
  images: [
    { name: "img 1.jpg" },
    { name: "img 2.jpg" },
    { name: "img 3.webp" }
  ],
  msg: "A sophisticated atmosphere for a milestone celebration."
};

export default function RestaurantSelector({ onSelect }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 pt-10 pb-20 overflow-hidden">
      <div className="text-center space-y-4 mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-7xl font-serif italic tracking-tighter"
        >
          The Destination
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-medium"
        >
          I've selected the perfect place for your 22nd
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        onClick={() => onSelect(AURA_RESTAURANT)}
        className="group relative w-full max-w-2xl aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl cursor-pointer shadow-2xl border border-zinc-200 dark:border-zinc-800"
      >
        <img 
          src="/Aura restaurant/img 1.jpg" 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
          alt={AURA_RESTAURANT.name}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col items-center justify-end pb-8 px-6">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center space-y-2"
          >
            <h3 className="text-white text-2xl md:text-4xl font-serif italic">{AURA_RESTAURANT.name}</h3>
            <p className="text-white/60 text-[10px] uppercase tracking-[0.3em]">Click to explore the venue</p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12"
      >
        <button 
          onClick={() => onSelect(AURA_RESTAURANT)}
          className="px-12 py-5 bg-zinc-950 text-white dark:bg-white dark:text-black uppercase text-[10px] tracking-[0.5em] font-bold active:scale-95 transition-all shadow-xl hover:tracking-[0.6em]"
        >
          View Details
        </button>
      </motion.div>
    </div>
  );
}