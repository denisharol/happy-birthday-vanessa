"use client";
import { motion } from 'framer-motion';

const GIFTS = [
  { name: "Necklace", img: "/presents/Necklase.webp" },
  { name: "Oraimo Spacebuds", img: "/presents/Oraimo spacebuds.webp" },
  { name: "Gift Hamper", img: "/presents/gift hamper.jpg" }
];

export default function BonusPresent({ onSelect }) {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 pt-10 pb-20 overflow-hidden">
      <div className="text-center space-y-4 mb-12">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-7xl font-serif italic tracking-tighter"
        >
          I KNEW you'd get it!
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-medium"
        >
          Now pick something extra for your special day
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 w-full max-w-6xl">
        {GIFTS.map((gift, i) => (
          <motion.button
            key={gift.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, type: "spring", stiffness: 80 }}
            onClick={() => onSelect(gift.name)}
            className="group flex flex-col items-center gap-4"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-zinc-50 dark:bg-zinc-950 border-[1px] border-zinc-200 dark:border-zinc-800 shadow-lg group-active:scale-95 transition-all duration-500 group-hover:shadow-2xl">
              <img 
                src={gift.img} 
                className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-700" 
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
    </div>
  );
}