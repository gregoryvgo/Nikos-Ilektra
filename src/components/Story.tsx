import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
import { Heart, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface StoryProps {
  title?: string;
  text?: string;
  coupleHashtag?: string;
  images?: string[];
}

const defaultImages = [
   '/images/20251117_170012.jpg',
   '/images/Messenger_creation_FECBF82D-8453-4B02-B251-864E466C72D0.jpeg',
     '/images/IMG-d802b9d34b2fddf9e6d2446e679ed884-V.jpg',
     '/images/IMG-20221106-WA0003.jpg',
    '/images/IMG-20220619-WA0002.jpg',
    '/images/20240318_183927.jpg',
  '/images/Messenger_creation_1447DC2B-36B5-4A4A-8306-6288031966AB.jpeg',
  '/images/VideoCapture_20260407-090602.jpg',
];

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export const Story: React.FC<StoryProps> = ({
  title = 'Πώς γνωριστήκαμε',
  images = defaultImages,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || images.length <= 1) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length, isPaused]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + images.length) % images.length);
  };

  const handleDragEnd = (_: any, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold || offset.x < -50) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold || offset.x > 50) {
      paginate(-1);
    }
  };

  return (
    <div className="fade-in-section py-20 px-6 bg-white text-center border-t border-stone-100 relative overflow-hidden">
      
      {/* Background Decorative Soft Blue Glow */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-[#edf4fa]/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 rounded-full bg-[#edf4fa]/60 blur-3xl pointer-events-none" />

      <div className="max-w-xl mx-auto space-y-10 relative z-10">
        
        {/* Editorial Heading */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-center gap-1 text-[#4a729c]">
            <Sparkles className="w-3.5 h-3.5 opacity-80" />
            <p className="font-didot text-xs tracking-[0.3em] uppercase">
              Η Ιστορία Μας
            </p>
            <Sparkles className="w-3.5 h-3.5 opacity-80" />
          </div>

          <h2 className="font-bodoni italic text-3xl sm:text-4xl text-[#0c1b33] font-normal tracking-wide">
            {title}
          </h2>

          <div className="flex items-center justify-center gap-2 pt-1">
            <div className="w-10 h-px bg-[#0c1b33]/25" />
            <Heart className="w-3.5 h-3.5 text-[#0c1b33] fill-[#0c1b33]/20" />
            <div className="w-10 h-px bg-[#0c1b33]/25" />
          </div>
        </div>

        {/* Photo Gallery (Ακόμα πιο μεγάλο Swipeable Polaroid Stack) */}
        <div
          className="relative mx-auto w-full max-w-[480px] group select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Layered Back Cards σε πολύ απαλό μπλε */}
          <div className="absolute inset-0 bg-[#edf4fa] rounded-2xl rotate-[3deg] shadow-xs border border-[#dce8f2] pointer-events-none" />
          <div className="absolute inset-0 bg-[#e4eff8] rounded-2xl rotate-[-2deg] opacity-70 pointer-events-none" />

          {/* Foreground Polaroid Card σε καθαρό λευκό */}
          <div className="relative bg-white p-4 sm:p-5 rounded-2xl shadow-[0_16px_40px_rgba(12,27,51,0.06)] border border-[#dce8f2]">
            
            {/* Image Stage (Πιο μεγάλο και ευρύχωρο) */}
            <div className="relative aspect-[4/5] sm:aspect-[4/5] w-full overflow-hidden rounded-xl bg-stone-100 cursor-grab active:cursor-grabbing touch-pan-y">
              <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex]}
                  alt={`Couple moment ${currentIndex + 1}`}
                  custom={direction}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.8}
                  onDragStart={() => setIsPaused(true)}
                  onDragEnd={handleDragEnd}
                  initial={{ opacity: 0, x: direction * 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -direction * 100 }}
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.35 },
                  }}
                  className="absolute inset-0 h-full w-full object-cover pointer-events-auto"
                  draggable={false}
                  loading="lazy"
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => paginate(-1)}
                    aria-label="Προηγούμενη φωτογραφία"
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#0c1b33] shadow-md flex items-center justify-center backdrop-blur-xs transition-all active:scale-90 cursor-pointer opacity-85 hover:opacity-100 z-20"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    type="button"
                    onClick={() => paginate(1)}
                    aria-label="Επόμενη φωτογραφία"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#0c1b33] shadow-md flex items-center justify-center backdrop-blur-xs transition-all active:scale-90 cursor-pointer opacity-85 hover:opacity-100 z-20"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Counter Pill */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#0c1b33]/65 backdrop-blur-md text-xs font-didot text-white tracking-widest pointer-events-none z-20">
                {currentIndex + 1} / {images.length}
              </div>
            </div>

            {/* Bottom Dots */}
            <div className="pt-4 pb-1 flex flex-col items-center gap-2">
              {images.length > 1 && (
                <div className="flex items-center gap-1.5 pt-0.5">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setDirection(i > currentIndex ? 1 : -1);
                        setCurrentIndex(i);
                      }}
                      aria-label={`Φωτογραφία ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        i === currentIndex
                          ? 'w-6 bg-[#0c1b33]'
                          : 'w-1.5 bg-[#0c1b33]/20 hover:bg-[#0c1b33]/40'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Story Narrative Box (Μεγαλύτερη γραμματοσειρά κειμένου) */}
        <div className="relative px-7 py-8 rounded-2xl bg-[#f3f7fb] border border-[#dce8f2] shadow-[0_4px_20px_rgba(12,27,51,0.03)]">
          <span className="font-bodoni italic text-6xl text-[#4a729c]/25 absolute -top-4 left-3 select-none leading-none">
            “
          </span>
          <div className="font-serif text-base sm:text-lg leading-relaxed text-stone-700 font-light text-justify pt-3 px-1 space-y-5">
            <p>
              Όλα ξεκίνησαν σαν μια τυχαία σύμπτωση σε μια πόλη που δεν ησυχάζει ποτέ. Δύο παράλληλες διαδρομές που, χωρίς να το γνωρίζουν, βάδιζαν προς το ίδιο σημείο συνάντησης. Μια ματιά, ένα αυθόρμητο χαμόγελο και μια πρώτη συζήτηση έμοιαζε να μην έχει τέλος ήταν αρκετά για να αλλάξουν τα πάντα.
            </p>
            <p>
              Από εκείνη τη στιγμή, η καθημερινότητα απέκτησε άλλο νόημα. Τα βράδια γέμισαν με ατελείωτες βόλτες, τα ταξίδια έγιναν κοινές εμπειρίες και οι μικρές, απλές στιγμές μετατράπηκαν στις πιο όμορφες αναμνήσεις. Μέσα από τα γέλια, τα όνειρα, αλλά και τις προκλήσεις, ανακαλύψαμε ότι το σπίτι μας δεν είναι ένας τόπος, αλλά ο ένας δίπλα στον άλλον.
            </p>
            <p>
              Σήμερα, με την ίδια βαθιά αγάπη και την υπόσχεση να μοιραζόμαστε κάθε επόμενη σελίδα, επιλέγουμε να ενώσουμε τις ζωές μας για πάντα, ξεκινώντας το πιο όμορφο κοινό μας κεφάλαιο.
            </p>
          </div>
          <span className="font-bodoni italic text-6xl text-[#4a729c]/25 absolute -bottom-6 right-3 select-none leading-none">
            ”
          </span>
        </div>

      </div>
    </div>
  );
};