"use client";
import { motion } from 'framer-motion';

export default function RestaurantDetails({ restaurant, onBack, onConfirm }) {
  if (!restaurant) return null;

  return (
    <div className="min-h-screen py-10 max-w-7xl mx-auto px-4 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 border-b border-zinc-100 dark:border-zinc-900 pb-10">
        <div className="space-y-4 text-center md:text-left">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-8xl font-serif italic tracking-tighter"
          >
            {restaurant.name}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-zinc-500 max-w-xl font-light italic text-lg md:text-xl leading-relaxed"
          >
            "{restaurant.msg}"
          </motion.p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <button 
            onClick={onBack} 
            className="px-8 py-4 text-[10px] uppercase tracking-[0.4em] font-bold border border-zinc-200 dark:border-zinc-800 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900"
          >
            Change Place
          </button>
          <button 
            onClick={onConfirm} 
            className="px-10 py-4 bg-zinc-950 text-white dark:bg-white dark:text-black uppercase text-[10px] tracking-[0.4em] font-bold active:scale-95 transition-all shadow-lg"
          >
            Select Aura
          </button>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurant.images.map((img, index) => (
          <motion.div
            key={img.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-xl border border-zinc-100 dark:border-zinc-900"
          >
            <img
              src={`/Aura restaurant/${img.name}`}
              alt={`${restaurant.name} view ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center py-24 space-y-8">
        <div className="w-px h-20 bg-gradient-to-b from-zinc-200 to-transparent dark:from-zinc-800" />
        <button 
          onClick={onConfirm}
          className="group flex flex-col items-center gap-6 uppercase text-[11px] tracking-[0.6em] font-bold transition-all"
        >
          <span className="group-hover:tracking-[0.8em] transition-all duration-500">Confirm Selection</span>
          <div className="w-16 h-[2px] bg-zinc-950 dark:bg-white group-hover:w-32 transition-all duration-700" />
        </button>
      </div>
    </div>
  );
}