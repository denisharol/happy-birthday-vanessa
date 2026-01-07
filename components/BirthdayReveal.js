"use client";
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

export default function BirthdayReveal({ onNext, logEgg }) {
  const [phase, setPhase] = useState('center');
  const [showButton, setShowButton] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [count, setCount] = useState(0);
  const [isCountDone, setIsCountDone] = useState(false);

  const subtopicText = "Growing a little older than you were each year and I'm happy to have watched you in this journey every step of the way.";

  const handleEgg = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);
    if (newCount >= 5 && logEgg) logEgg();
  };

  useEffect(() => {
    let c = 0;
    const interval = setInterval(() => {
      confetti({ 
        particleCount: 60, 
        spread: 50, 
        origin: { y: 0.7 },
        colors: ['#000000', '#71717a', '#ffffff'] 
      });
      c++;
      if (c >= 3) clearInterval(interval);
    }, 1000);

    const timer = setTimeout(() => setPhase('split'), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase === 'split') {
      const startDelay = setTimeout(() => {
        let current = 0;
        const counterInterval = setInterval(() => {
          current += 1;
          setCount(current);
          if (current === 22) { 
            clearInterval(counterInterval);
            setIsCountDone(true);
          }
        }, 50);
      }, 500);

      return () => clearTimeout(startDelay);
    }
  }, [phase]);

  return (
    <div className="flex items-center justify-center min-h-[90vh] px-4 overflow-hidden pt-10">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-6 md:gap-16 relative">
        
        <motion.div 
          layout
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`relative w-full max-w-[240px] md:max-w-sm aspect-[4/5] rounded-xl shadow-2xl border-[3px] border-white dark:border-zinc-800 z-10 
            ${phase === 'center' ? 'mx-auto' : 'mx-0'}`}
        >
          <img 
            src="/Vanessa/Img 1.jpeg" 
            className="w-full h-full object-cover rounded-lg" 
            alt="Vanessa" 
          />
        </motion.div>
        
        {phase === 'split' && (
          <div className="flex-1 space-y-5 max-w-xl text-center md:text-left pb-12">
            
            <h2 className="text-3xl md:text-6xl font-serif font-bold tracking-tight leading-tight flex flex-col items-center md:items-start">
              <div className="flex items-baseline flex-wrap justify-center md:justify-start">
                <span className="flex mr-2">
                  {"Happy".split("").map((char, i) => (
                    <motion.span 
                      key={i} 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      transition={{ delay: i * 0.04 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>

                <motion.span 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="min-w-[1em] text-center"
                >
                  {count}
                </motion.span>

                {isCountDone && (
                  <span className="flex">
                    {"ND".split("").map((char, i) => (
                      <motion.span 
                        key={i} 
                        initial={{ opacity: 0, x: -5 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ delay: i * 0.1 }} 
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                )}
              </div>

              {isCountDone && (
                <div className="flex flex-wrap items-baseline justify-center md:justify-start mt-1">
                  {"birthday Vanessa.".split(" ").map((word, wIndex) => (
                    <span key={wIndex} className={`flex ${wIndex > 0 ? "ml-2" : ""}`}>
                      {word.split("").map((char, cIndex) => (
                        <motion.span 
                          key={`${wIndex}-${cIndex}`} 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          transition={{ delay: 0.3 + (wIndex * 0.1) + (cIndex * 0.05) }} 
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  ))}
                </div>
              )}
            </h2>

            {isCountDone && (
              <p 
                onClick={handleEgg}
                className="text-sm md:text-lg text-zinc-500 italic font-light cursor-pointer select-none leading-relaxed px-2 md:px-0"
              >
                {subtopicText.split("").map((char, i) => (
                  <motion.span 
                    key={i} 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 1.5 + (i * 0.015) }} 
                    onAnimationComplete={() => {
                      if (i === subtopicText.length - 1) setShowButton(true);
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </p>
            )}
            
            <AnimatePresence>
              {showButton && (
                <motion.button 
                  initial={{ opacity: 0, y: 15 }} 
                  animate={{ opacity: 1, y: 0 }}
                  onClick={onNext}
                  className="w-full md:w-auto mt-4 px-8 py-4 bg-zinc-900 text-white dark:bg-white dark:text-black uppercase text-[10px] tracking-[0.4em] font-bold active:scale-95 transition-all shadow-xl"
                >
                  Proceed to Gallery
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}