"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DoodleStar = ({ className }) => (
  <svg viewBox="0 0 100 100" className={`absolute opacity-40 ${className}`}>
    <path d="M50,5 L65,35 L95,35 L70,55 L80,85 L50,65 L20,85 L30,55 L5,35 L35,35 Z" 
      fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
  </svg>
);

const DoodleHeart = ({ className }) => (
  <svg viewBox="0 0 100 100" className={`absolute opacity-40 ${className}`}>
    <path d="M50,30 Q70,5 90,30 Q100,60 50,90 Q0,60 10,30 Q30,5 50,30" 
      fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export default function Summary({ selections, onReset }) {
  const [isBookletVisible, setBookletVisible] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);

  const handleComplete = () => {
    setBookletVisible(true);
  };

  const toggleBook = (e) => {
    e.stopPropagation();
    setIsBookOpen(!isBookOpen);
  };

  const handleOutsideClick = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 pt-10 pb-20 overflow-hidden">
        <div className="space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-serif italic tracking-tighter uppercase"
          >
            The Ledger
          </motion.h2>
          <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-medium">
            A summary of your 22nd birthday selections
          </p>
        </div>

        <div className="w-full max-w-md py-10 md:py-12 border-y border-zinc-100 dark:border-zinc-800 space-y-8 md:space-y-10 my-8">
          <div>
            <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold">Gift Selection</span>
            <p className="text-2xl md:text-3xl font-serif mt-2 italic text-zinc-900 dark:text-black">
              {selections.gift || "None"} 
              {selections.bonus && <span className="block text-lg md:text-xl opacity-60">+ {selections.bonus}</span>}
            </p>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold">Venue Choice</span>
            <p className="text-2xl md:text-3xl font-serif mt-2 italic text-zinc-900 dark:text-black">
              {selections.restaurant || "None selected"}
            </p>
          </div>
        </div>

        <div className="space-y-8 w-full max-w-sm">
          <p className="text-xs md:text-sm italic font-serif text-zinc-500">
            "Not happy with your selections?"
          </p>
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            <button 
              onClick={onReset} 
              className="text-[10px] uppercase tracking-[0.4em] font-bold hover:text-zinc-400 transition-colors"
            >
              Start Over
            </button>
            <button 
              onClick={handleComplete} 
              className="w-full md:w-auto px-10 py-5 bg-zinc-950 text-white dark:bg-white dark:text-black uppercase text-[10px] tracking-[0.4em] font-bold active:scale-95 transition-all shadow-2xl"
            >
              Complete Experience
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isBookletVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOutsideClick}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 1.5 }}
              className="absolute bottom-10 text-white/40 text-[9px] uppercase tracking-[0.3em] pointer-events-none"
            >
              Tap outside to close & refresh
            </motion.div>

            <div className="relative w-[280px] h-[400px] md:w-[350px] md:h-[500px] perspective-[1500px]">
              <motion.div
                onClick={toggleBook}
                animate={{ 
                  translateX: isBookOpen ? "40%" : "0%"
                }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="relative w-full h-full"
                style={{ transformStyle: 'preserve-3d' }}
              >
                
                <motion.div
                  animate={{ rotateY: isBookOpen ? -180 : 0 }}
                  transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                  style={{ transformOrigin: "left", transformStyle: "preserve-3d" }}
                  className="absolute inset-0 w-full h-full z-20"
                >
                  <div 
                    className="absolute inset-0 bg-zinc-900 rounded-r-lg rounded-l-sm shadow-2xl flex flex-col items-center justify-center border-l-4 border-black backface-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-zinc-700 p-1 mb-8 shadow-inner overflow-hidden">
                      <img 
                        src="/splash/Vanessa-portrait.jpeg" 
                        alt="Vanessa" 
                        className="w-full h-full object-cover rounded-full grayscale" 
                      />
                    </div>
                    <h3 className="font-serif italic text-xl md:text-2xl text-zinc-100/90">For Vanessa</h3>
                    <p className="text-[8px] uppercase tracking-[0.4em] text-zinc-500 mt-2">Strictly Confidential</p>
                  </div>

                  <div 
                    className="absolute inset-0 bg-[#fdfaf0] rounded-l-lg rounded-r-sm shadow-md border-r-4 border-zinc-100 rotate-y-180 backface-hidden flex items-center justify-center"
                    style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                  >
                    <DoodleStar className="w-16 h-16 text-zinc-200" />
                  </div>
                </motion.div>

                <div className="absolute inset-0 bg-[#fffdf7] rounded-r-lg rounded-l-sm shadow-xl z-10 flex flex-col overflow-hidden">
                  <div 
                    className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.15]"
                    style={{
                      backgroundImage: 'linear-gradient(#9ca3af 1px, transparent 1px)',
                      backgroundSize: '100% 1.5rem',
                      marginTop: '2.5rem'
                    }}
                  />
                  
                  <DoodleStar className="top-4 right-4 w-10 h-10 text-zinc-200 rotate-12" />
                  <DoodleHeart className="bottom-6 right-8 w-8 h-8 text-zinc-200 -rotate-12" />

                  <div className="relative z-10 p-6 md:p-10 pt-10 h-full flex flex-col text-left overflow-y-auto">
                    <p className="font-serif text-zinc-400 text-[10px] italic mb-6 text-right">7th January, 2026</p>
                    
                    <div className="font-serif text-zinc-800 leading-[1.5rem] md:leading-[1.8rem] text-sm md:text-base space-y-4">
                      <p>
                        <span className="text-xl font-bold text-zinc-900 mr-1">D</span>ear Vanessa,
                      </p>
                      <p>
                        Happy 22nd Birthday! You are entering a beautiful new chapter, and I've been happy to watch you in this journey every step of the way.
                      </p>
                      <p>
                        I hope this digital journey brought a smile to your face. I'm proud of the resilience you move with.
                      </p>
                      <p>
                        May this year treat you with kindness.
                      </p>
                      <p className="mt-8 font-bold text-zinc-900 text-right leading-tight">
                        With love,<br/>
                        <span className="text-[9px] font-normal text-zinc-500 uppercase tracking-widest">Your Brother</span>
                      </p>
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}