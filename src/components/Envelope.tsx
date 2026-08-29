'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface EnvelopeProps {
  groom: string;
  bride: string;
  date: string;
  churchName?: string;
  imageSrc?: string; // Διαδρομή π.χ. '/invitation.png'
}

export const Envelope: React.FC<EnvelopeProps> = ({
  groom,
  bride,
  date,
  churchName = 'Ι.Ν. Αγίου Δημητρίου',
  imageSrc = '/invitation.png',
}) => {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [isOpening, setIsOpening] = useState(false);

  // Δυναμικά αρχικά για το βουλοκέρι
  const sealInitials = `${groom?.charAt(0) || 'Γ'}&${bride?.charAt(0) || 'Δ'}`;

  const handleOpen = () => {
    if (isOpening || step > 0) return;
    setIsOpening(true);

    // Βήμα 1: Άνοιγμα καπακιού (Rotate Flap)
    setStep(1);

    // Βήμα 2: Ανύψωση κάρτας + Confetti
    setTimeout(() => {
      setStep(2);
      confetti({
        particleCount: 55,
        spread: 70,
        origin: { y: 0.55 },
        colors: ['#c5a880', '#1f3044', '#b08d5b', '#ffffff'],
      });
    }, 750);

    // Βήμα 3: Focus & Μεγέθυνση κάρτας
    setTimeout(() => {
      setStep(3);
    }, 1850);
  };

  const handleReset = () => {
    setStep(0);
    setIsOpening(false);
  };

  return (
    <div className="relative w-full min-h-[720px] flex flex-col items-center justify-center bg-[#faf8f5] overflow-hidden py-10 px-4 select-none">
      
      {/* Main Stage */}
      <div 
        className="relative w-[340px] sm:w-[420px] h-[520px] flex items-center justify-center"
        style={{ perspective: 1400 }}
      >
        {/* ================= CONTAINER ΦΑΚΕΛΟΥ & ΚΑΡΤΑΣ ================= */}
        <div className="relative w-[320px] h-[220px] flex items-center justify-center">

          {/* 1. Πίσω Πλάτη Φακέλου (Z-0) */}
          <motion.div 
            animate={
              step === 3
                ? { opacity: 0, scale: 0.88, y: 40 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-xs shadow-[0_25px_50px_rgba(0,0,0,0.18)] z-0 overflow-hidden pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, #a89d8d 0%, #c4b8a7 100%)',
            }}
          />

          {/* 2. ΚΑΡΤΑ ΠΡΟΣΚΛΗΤΗΡΙΟΥ */}
          <div
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[310px] pointer-events-none ${
              step === 3
                ? 'h-[520px] z-40 overflow-visible'
                : 'h-[460px] z-10 overflow-hidden'
            } flex items-end justify-center`}
          >
            <motion.div
              initial={{ y: 200, opacity: 0, scale: 0.88 }}
              animate={
                step === 0
                  ? { y: 200, opacity: 0, scale: 0.88 }
                  : step === 1
                  ? { y: 130, opacity: 1, scale: 0.92 }
                  : step === 2
                  ? { y: -80, opacity: 1, scale: 0.98 }
                  : { y: 10, opacity: 1, scale: 1.14 }
              }
              transition={{
                duration: step === 1 ? 0.35 : step === 2 ? 0.95 : step === 3 ? 0.85 : 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative w-[280px] sm:w-[300px] h-[375px] bg-[#fffefc] rounded-xs p-6 text-center shadow-[0_20px_45px_rgba(0,0,0,0.14)] border border-[#e8dfd2] flex flex-col justify-between items-center ${
                step === 3 ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
            >
              {/* Διακοσμητικό Luxury Border (Toile Style) */}
              <div className="absolute inset-2 border border-[#c5a880]/35 rounded-xs pointer-events-none" />
              <div className="absolute inset-2.5 border border-[#1f3044]/15 rounded-xs pointer-events-none" />

              {/* Decorative Corner Marks */}
              <div className="absolute top-3.5 left-3.5 text-[8px] text-[#c5a880]/60">✦</div>
              <div className="absolute top-3.5 right-3.5 text-[8px] text-[#c5a880]/60">✦</div>
              <div className="absolute bottom-3.5 left-3.5 text-[8px] text-[#c5a880]/60">✦</div>
              <div className="absolute bottom-3.5 right-3.5 text-[8px] text-[#c5a880]/60">✦</div>

              {/* Header */}
              <div className="space-y-1 z-10 pt-2">
                <span className="font-didot text-[11px] tracking-[0.35em] text-[#a68a56] uppercase">
                  Save The Date
                </span>
                <div className="w-8 h-px bg-[#c5a880]/60 mx-auto mt-1" />
              </div>

              {/* Κεντρικό Περιεχόμενο (Ονόματα & Εκκλησία) */}
              <div className="flex-1 w-full flex flex-col items-center justify-center z-10 py-1">
                {/* Τα ονόματα από το PNG με transparent blend */}
                <div className="w-56 h-36 flex items-center justify-center">
                  <img
                    src={imageSrc}
                    alt={`${groom} & ${bride}`}
                    className="w-full h-full object-contain mix-blend-multiply drop-shadow-xs"
                  />
                </div>

                <p className="font-bodoni italic text-sm tracking-wide text-stone-600 mt-1">
                  {churchName}
                </p>
              </div>

              {/* Ημερομηνία & Τοποθεσία */}
              <div className="w-full pt-2.5 pb-1 border-t border-[#f0e7da] z-10">
                <p className="font-didot text-sm font-semibold tracking-widest text-[#1f3044]">
                  {date}
                </p>
                <p className="font-sans text-[9px] tracking-[0.25em] text-stone-400 uppercase mt-0.5">
                  Αθηνα, Ελλαδα
                </p>
              </div>
            </motion.div>
          </div>

          {/* 3. Μπροστινή Τσέπη Φακέλου (Z-20) */}
          <motion.div 
            animate={
              step === 3
                ? { opacity: 0, scale: 0.88, y: 40 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 z-20 pointer-events-none"
          >
            <svg className="w-full h-full drop-shadow-[0_-3px_12px_rgba(0,0,0,0.06)]" viewBox="0 0 320 220" fill="none">
              <defs>
                <linearGradient id="sideGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ebe4d8" />
                  <stop offset="100%" stopColor="#cbbea9" />
                </linearGradient>
                <linearGradient id="sideGradRight" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#e4dcd0" />
                  <stop offset="100%" stopColor="#c3b6a2" />
                </linearGradient>
                <linearGradient id="bottomFlapGrad" x1="50%" y1="100%" x2="50%" y2="0%">
                  <stop offset="0%" stopColor="#cfc4b2" />
                  <stop offset="100%" stopColor="#e1dacf" />
                </linearGradient>
              </defs>

              <polygon points="0,0 160,115 0,220" fill="url(#sideGradLeft)" />
              <polygon points="320,0 160,115 320,220" fill="url(#sideGradRight)" />
              <polygon points="0,220 160,105 320,220" fill="url(#bottomFlapGrad)" />
              
              <line x1="0" y1="220" x2="160" y2="105" stroke="rgba(255,255,255,0.45)" strokeWidth="1" />
              <line x1="320" y1="220" x2="160" y2="105" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
            </svg>
          </motion.div>

          {/* 4. Πάνω Καπάκι & Βουλοκέρι (Z-30) */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={
              step === 3
                ? { opacity: 0 }
                : step >= 1
                ? { rotateX: -180 }
                : { rotateX: 0 }
            }
            transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
            style={{
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
            className={`absolute top-0 left-0 w-[320px] h-[125px] ${
              step >= 1 ? 'z-0 pointer-events-none' : 'z-30 pointer-events-auto'
            }`}
          >
            <svg className="w-full h-full drop-shadow-[0_6px_14px_rgba(0,0,0,0.16)] pointer-events-none" viewBox="0 0 320 125" fill="none">
              <defs>
                <linearGradient id="topFlap" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#efe9de" />
                  <stop offset="100%" stopColor="#d5caa7" />
                </linearGradient>
              </defs>
              <polygon points="0,0 320,0 160,125" fill="url(#topFlap)" />
              <line x1="0" y1="0" x2="160" y2="125" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
              <line x1="320" y1="0" x2="160" y2="125" stroke="rgba(0,0,0,0.08)" strokeWidth="1.2" />
            </svg>

            {/* Βουλοκέρι (Wax Seal) */}
            <motion.button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleOpen();
              }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              animate={
                step >= 1
                  ? { opacity: 0, scale: 0.2 }
                  : { scale: [1, 1.05, 1] }
              }
              transition={
                step >= 1
                  ? { duration: 0.25 }
                  : { repeat: Infinity, duration: 2.4, ease: 'easeInOut' }
              }
              title="Πατήστε για άνοιγμα"
              className="absolute top-[115px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-[#f5dfa8] via-[#b8934f] to-[#6d4d16] shadow-[0_6px_22px_rgba(0,0,0,0.45),inset_0_2px_4px_rgba(255,255,255,0.75),inset_0_-2px_4px_rgba(0,0,0,0.45)] flex items-center justify-center border-2 border-[#d8b975]/85 cursor-pointer focus:outline-none z-50 pointer-events-auto"
            >
              <div className="w-8 h-8 rounded-full border border-[#f5e6c4]/60 flex items-center justify-center shadow-[inset_0_1px_3px_rgba(0,0,0,0.35)]">
                <span className="font-bodoni italic font-bold text-xs text-[#2b2111] drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)] tracking-tighter select-none">
                  {sealInitials}
                </span>
              </div>
            </motion.button>
          </motion.div>

        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 z-40 h-11 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.button
              key="open-btn"
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onClick={handleOpen}
              className="px-7 py-2.5 rounded-full bg-[#b08d5b] hover:bg-[#9a7848] active:scale-95 text-white font-didot tracking-widest text-xs uppercase shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              Άνοιγμα Προσκλητηρίου
            </motion.button>
          )}

          {step === 3 && (
            <motion.button
              key="close-btn"
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onClick={handleReset}
              className="px-6 py-2 rounded-full border border-stone-300 bg-white/80 backdrop-blur-xs text-stone-600 hover:bg-stone-100 hover:text-stone-800 active:scale-95 font-didot tracking-wider text-xs transition-all duration-200 cursor-pointer shadow-xs"
            >
              Κλείσιμο
            </motion.button>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};