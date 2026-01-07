"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Volume2, VolumeX } from 'lucide-react';

import SplashScreen from '@/components/SplashScreen';
import AgeGate from '@/components/AgeGate';
import BirthdayReveal from '@/components/BirthdayReveal';
import PhotoStack from '@/components/PhotoStack';
import SongPage from '@/components/SongPage';
import Oracle from '@/components/Oracle';
import SpotDifference from '@/components/SpotDifference';
import PresentGame from '@/components/PresentGame';
import BonusPresent from '@/components/BonusPresent';
import Disappointment from '@/components/Disappointment';
import RestaurantSelector from '@/components/RestaurantSelector';
import RestaurantDetails from '@/components/RestaurantDetails';
import MenuViewer from '@/components/MenuViewer';
import FinalVideo from '@/components/FinalVideo';
import Summary from '@/components/Summary';

export default function BirthdaySite() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isExternalPlaying, setIsExternalPlaying] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const audioRef = useRef(null);
  
  const [selections, setSelections] = useState({
    gift: null,
    bonus: null,
    restaurant: null
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsExternalPlaying(false);
  }, [step]);

  useEffect(() => {
    if (audioRef.current) {
      if (step === 0 || isMuted || isExternalPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [isMuted, step, isExternalPlaying]);

  if (!mounted) return null;

  const toggleTheme = () => {
    setIsDark(!isDark);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <div className={`${isDark ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-900'} min-h-screen transition-colors duration-700 font-sans selection:bg-zinc-500 selection:text-white`}>
      
      <audio 
        ref={audioRef}
        src="/audio/birthday-song.mp3" 
        loop 
        preload="auto"
      />

      {step > 0 && (
        <header className="fixed top-0 w-full p-6 md:p-8 flex justify-between items-end z-50 mix-blend-difference text-white">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-lg md:text-xl font-serif italic tracking-tighter">The 22nd Edition</h1>
            <p className="text-[8px] md:text-[10px] uppercase tracking-[0.3em]">Volume II / 2026</p>
          </motion.div>
          
          <div className="flex gap-6 md:gap-8 items-center">
            <button onClick={() => setIsMuted(!isMuted)} className="hover:scale-110 transition">
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            
            <div className="flex flex-col items-end gap-2 relative">
              <button onClick={toggleTheme}>
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              
              <AnimatePresence>
                {showMessage && (
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-10 right-0 text-[8px] md:text-[10px] uppercase tracking-widest w-48 md:w-64 text-right pointer-events-none italic"
                  >
                    {isDark 
                      ? "Protecting your eyes" 
                      : "A brighter perspective"}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={step === 0 ? "w-full h-screen" : "pt-32 md:pt-40 pb-20 px-4 md:px-6 max-w-6xl mx-auto"}
        >
          {step === 0 && <SplashScreen onComplete={() => setStep(1)} />}
          {step === 1 && <AgeGate onNext={() => setStep(2)} />}
          {step === 2 && <BirthdayReveal onNext={() => setStep(3)} />} 
          {step === 3 && <PhotoStack onNext={() => setStep(4)} />}
          {step === 4 && <SongPage onNext={() => setStep(5)} muteBackground={() => setIsExternalPlaying(true)} />}
          {step === 5 && <Oracle onNext={() => setStep(6)} />}
          {step === 6 && <SpotDifference onNext={() => setStep(7)} />}
          {step === 7 && (
            <PresentGame 
              onWin={() => {
                setSelections(prev => ({ ...prev, gift: "Gift Hamper" }));
                setStep(8);
              }} 
              onLose={() => setStep(9)} 
            />
          )}
          {step === 8 && (
            <BonusPresent 
              onSelect={(extra) => {
                setSelections(prev => ({ ...prev, bonus: extra }));
                setStep(10);
              }} 
            />
          )}
          {step === 9 && <Disappointment onNext={() => setStep(10)} />}
          {step === 10 && (
            <RestaurantSelector onSelect={(res) => { 
              setSelections(prev => ({ ...prev, restaurant: res.name }));
              setSelectedRestaurant(res); 
              setStep(11); 
            }} />
          )}
          {step === 11 && <RestaurantDetails restaurant={selectedRestaurant} onBack={() => setStep(10)} onConfirm={() => setStep(12)} />}
          {step === 12 && <MenuViewer restaurant={selectedRestaurant} onNext={() => setStep(13)} />}
          {step === 13 && <FinalVideo onNext={() => setStep(14)} muteBackground={() => setIsExternalPlaying(true)} />}
          {step === 14 && (
            <Summary 
              selections={selections} 
              onReset={() => {
                setStep(1);
                setSelections({ gift: null, bonus: null, restaurant: null });
                setIsMuted(true);
              }} 
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}