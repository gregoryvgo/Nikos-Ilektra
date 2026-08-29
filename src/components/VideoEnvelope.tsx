'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoEnvelopeProps {
  groom: string;
  bride: string;
  date: string;
  churchName?: string;
  imageSrc?: string;
  videoSrc?: string;
}

export const VideoEnvelope: React.FC<VideoEnvelopeProps> = ({
  groom,
  bride,
  date,
  churchName = 'Ι.Ν. Εσταυρωμένου',
  imageSrc = '/invitation.png',
  videoSrc = '/Wedding_invitation_envelope_opens_1080p_202608172336.mp4',
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const handleVideoEnded = () => {
    setIsOpened(true);
  };

  return (
    <div className="relative w-full h-[100dvh] flex items-center justify-center bg-[#f3f7fb] overflow-hidden select-none m-0 p-0">
      
      {/* Mobile Frame Container */}
      <div className="relative w-full max-w-[420px] h-full bg-[#f3f7fb] overflow-hidden flex flex-col items-center justify-center">
        
        {/* Video Player */}
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          playsInline
          muted
          onEnded={handleVideoEnded}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Εμφάνιση Κειμένων & Ονομάτων */}
        <AnimatePresence>
          {isOpened && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center"
            >
              {/* Ονόματα από το PNG */}
              <div className="w-64 h-44 flex items-center justify-center mt-6">
                <img
                  src={imageSrc}
                  alt={`${groom} & ${bride}`}
                  className="w-full h-full object-contain mix-blend-multiply opacity-90 scale-105"
                />
              </div>

              {/* Εκκλησία */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="font-bodoni italic text-sm text-[#0c1b33]/80 mt-2"
              >
                {churchName}
              </motion.p>

              {/* Ημερομηνία σε ενιαία γραμμή (whitespace-nowrap) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="mt-4 pt-3 border-t border-[#0c1b33]/15 w-64 text-center"
              >
                <p className="font-didot text-sm font-semibold tracking-widest text-[#0c1b33] whitespace-nowrap">
                  {date}
                </p>
              </motion.div>

              {/* Scroll Down Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute bottom-6 flex flex-col items-center cursor-pointer"
              >
                <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#0c1b33] mb-1 font-medium">
                  Scroll
                </span>
                <div className="w-px h-6 bg-gradient-to-b from-[#0c1b33] to-transparent animate-bounce" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};