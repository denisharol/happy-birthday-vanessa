"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TAROT_CARDS = [
  {
    id: 0,
    name: "The Matriarch",
    desc: "As you enter your 22nd year, your role as a sister evolves into a pillar of wisdom. I foresee you leading our family's next chapter with the grace and strength you've cultivated since childhood.",
    color: "from-zinc-900 via-zinc-800 to-black"
  },
  {
    id: 1,
    name: "The Visionary",
    desc: "Your ambition has always inspired me. This year, the professional seeds you've planted will finally bloom. That dream role isn't just a possibility; it is actively seeking your unique perspective.",
    color: "from-blue-900 via-indigo-950 to-black"
  },
  {
    id: 2,
    name: "The Wanderer",
    desc: "There is a specific horizon calling your name. You will find more than just a destination this year; you will find a version of yourself that only reveals itself when you are far from home.",
    color: "from-stone-900 via-neutral-800 to-black"
  }
];

export default function Oracle({ onNext, logEgg }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [shakeCard, setShakeCard] = useState(null); 

  useEffect(() => {
    const handleDevMotion = (e) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;
      if (Math.abs(acc.x) > 20 || Math.abs(acc.y) > 20) {
        if (logEgg) logEgg(); 
        if (navigator.vibrate) navigator.vibrate(200);
      }
    };
    window.addEventListener('devicemotion', handleDevMotion);
    return () => window.removeEventListener('devicemotion', handleDevMotion);
  }, [logEgg]);

  const handleCardClick = (index) => {
    if (selectedCard !== null && selectedCard !== index) {
      setShakeCard(index);
      setTimeout(() => setShakeCard(null), 500);
      return;
    }
    setSelectedCard(index);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] w-full px-4 pt-10 pb-20 overflow-hidden">
      
      <div className="text-center space-y-4 mb-10 md:mb-16">
        <motion.h2 
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, letterSpacing: "-0.02em" }}
          transition={{ duration: 1.5 }}
          className="text-4xl md:text-7xl font-serif italic tracking-tighter"
        >
          Choose Your Fate
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-medium"
        >
          {selectedCard !== null ? "The Oracle has spoken." : "Three sisters of fate. Pick your path."}
        </motion.p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-center w-full max-w-6xl perspective-[1200px]">
        {TAROT_CARDS.map((card, index) => {
          const isSelected = selectedCard === index;
          const isOtherSelected = selectedCard !== null && !isSelected;
          const isShaking = shakeCard === index;

          return (
            <div 
              key={card.id} 
              className={`relative w-full max-w-[280px] h-[420px] md:w-64 md:h-96 cursor-pointer transition-all duration-700 ${isOtherSelected ? 'opacity-20 scale-90 blur-sm' : 'opacity-100'}`} 
              onClick={() => handleCardClick(index)}
            >
              <motion.div
                animate={
                  isShaking ? { x: [-5, 5, -5, 5, 0] } : 
                  isSelected ? { rotateY: 180, scale: 1.05 } : 
                  { y: [0, -12, 0] } 
                }
                transition={
                  isShaking ? { duration: 0.4 } :
                  isSelected ? { duration: 1.2, ease: [0.23, 1, 0.32, 1] } :
                  { duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }
                }
                className="w-full h-full relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                
                <div 
                  className="absolute inset-0 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl overflow-hidden flex flex-col items-center justify-center backface-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]" 
                    style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px' }} 
                  />
                  
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center relative p-1 bg-white dark:bg-black">
                    <div className="absolute inset-0 border border-zinc-400 dark:border-zinc-600 rounded-full animate-ping opacity-10" />
                    <img 
                      src="/splash/Vanessa-portrait.jpeg" 
                      alt="Vanessa" 
                      className="w-full h-full object-cover rounded-full grayscale opacity-40 group-hover:opacity-100 transition-all duration-700" 
                    />
                  </div>
                  
                  <div className="mt-8 flex flex-col items-center">
                    <div className="w-8 h-[1px] bg-zinc-300 dark:bg-zinc-700 mb-2" />
                    <p className="text-[9px] uppercase tracking-[0.5em] text-zinc-400 font-bold">
                      Portal {index + 1}
                    </p>
                  </div>
                </div>

                <div 
                  className={`absolute inset-0 rounded-xl shadow-2xl overflow-hidden flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br ${card.color} text-white border border-white/10 backface-hidden`}
                  style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                >
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
                  
                  <div className="relative z-10 flex flex-col items-center h-full justify-between py-4">
                    <div className="space-y-4">
                      <h3 className="text-xl md:text-2xl font-serif italic tracking-widest uppercase border-b border-white/20 pb-2">{card.name}</h3>
                      <p className="text-sm md:text-base leading-relaxed font-light italic text-zinc-200 px-2">
                        {card.desc}
                      </p>
                    </div>
                    
                    <div className="text-[10px] tracking-[0.3em] uppercase opacity-50">
                      The Sisterhood Arc
                    </div>
                  </div>
                </div>

              </motion.div>
              
              <AnimatePresence>
                {isShaking && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -bottom-14 left-0 right-0 text-center"
                  >
                    <span className="text-[9px] uppercase tracking-widest text-zinc-900 dark:text-white font-bold bg-white/10 backdrop-blur-md px-4 py-2 border border-white/10 rounded-full">
                      The Path is Chosen
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedCard !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 w-full max-w-[280px]"
          >
            <button 
              onClick={onNext}
              className="w-full py-5 bg-zinc-900 text-white dark:bg-white dark:text-black uppercase text-[10px] tracking-[0.5em] font-bold active:scale-95 transition-all shadow-2xl hover:tracking-[0.6em]"
            >
              Accept Destiny
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}