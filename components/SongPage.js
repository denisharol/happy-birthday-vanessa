"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export default function SongPage({ onNext, muteBackground }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    muteBackground();
    setIsPlaying(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 space-y-8 md:space-y-12">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-7xl font-serif italic tracking-tighter text-center leading-tight md:leading-none"
      >
        A song that reminds me of you because you keep playing it
      </motion.h2>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-3xl aspect-video bg-zinc-100 shadow-2xl overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800"
      >
        {!isPlaying ? (
          <div 
            onClick={handlePlay}
            className="absolute inset-0 cursor-pointer group flex items-center justify-center bg-black"
          >
            <img 
              src="https://img.youtube.com/vi/8UVNT4wvIGY/maxresdefault.jpg" 
              alt="Cover" 
              className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity" 
            />
            
            <div className="absolute w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform">
              <Play className="fill-white text-white ml-1" size={28} />
            </div>
          </div>
        ) : (
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/8UVNT4wvIGY?autoplay=1&rel=0" 
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </motion.div>

      <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={onNext}
        className="w-full md:w-auto px-12 py-5 border border-zinc-900 dark:border-white uppercase text-[10px] tracking-[0.4em] active:scale-95 transition-all duration-500"
      >
        Continue
      </motion.button>
    </div>
  );
}