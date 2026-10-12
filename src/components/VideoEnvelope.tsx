'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoEnvelopeProps {
  groom?: string;
  bride?: string;
  date?: string;
  churchName?: string;
  imageSrc?: string;
  videoSrc?: string;
}

export const VideoEnvelope: React.FC<VideoEnvelopeProps> = ({
  groom = 'Νίκος',
  bride = 'Ηλέκτρα',
  imageSrc = '/images/nikos-proskitirio.png',
  videoSrc = '/Wedding_invitation_envelope_opens_1080p_202608172336.mp4',
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ρύθμιση ταχύτητας 1.65x (μπορείς να το αλλάξεις π.χ. σε 2.0 ή 2.5 αν το θέλεις πιο γρήγορο)
  const handlePlayOrLoad = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.65;
    }
  };

  // Εμφάνιση της εικόνας 1.6 δευτερόλεπτα πριν τελειώσει το βίντεο
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const timeLeft = videoRef.current.duration - videoRef.current.currentTime;
      if (timeLeft <= 1.0 && !isOpened) {
        setIsOpened(true);
      }
    }
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
          onPlay={handlePlayOrLoad}
          onLoadedMetadata={handlePlayOrLoad}
          onTimeUpdate={handleTimeUpdate}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Εμφάνιση Προσκλητηρίου - Ομαλό Animation χωρίς απότομο φόντο */}
        <AnimatePresence>
          {isOpened && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-20 w-full h-full flex flex-col items-center justify-center p-4"
            >
              {/* Εικόνα προσκλητηρίου ενσωματωμένη φυσικά πάνω στο τελικό κάδρο του βίντεο */}
              <div className="w-full h-full max-h-[88dvh] flex items-center justify-center">
                <img
                  src={imageSrc}
                  alt={`${groom} & ${bride}`}
                  className="w-full h-full max-w-full max-h-full object-contain drop-shadow-xl"
                />
              </div>

              {/* Scroll Down Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="absolute bottom-3 flex flex-col items-center cursor-pointer"
              >
                <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#0c1b33] mb-0.5 font-medium">
                  Scroll
                </span>
                <div className="w-px h-4 bg-gradient-to-b from-[#0c1b33] to-transparent animate-bounce" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};