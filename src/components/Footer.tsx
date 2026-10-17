import React, { useEffect, useState } from 'react';
import { Heart, Code2 } from 'lucide-react';

interface FooterProps {
  groom: string;
  bride: string;
  year?: string;
}

export const Footer: React.FC<FooterProps> = ({
  groom,
  bride,
  year = '2027',
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <footer className={`fade-in-section py-12 px-6 bg-white text-center border-t border-[#dce8f2] ${isMounted ? 'is-visible' : ''}`}>
      <div className="max-w-sm mx-auto space-y-6">
        {/* Couple Signature Monogram */}
        <div className="space-y-1">
          {/* Μόνο τα ονόματα με χρυσά γράμματα */}
          <p className="font-serif text-2xl font-light tracking-wider text-[#b89753]">
            {groom} & {bride}
          </p>
          {/* Heart & Year σε ανοιχτό μπλε (#4a729c) */}
          <div className="flex items-center justify-center gap-1.5 text-[#4a729c] text-xs">
            <Heart className="w-3 h-3 text-[#4a729c] fill-[#4a729c]/80" />
            <span className="font-serif italic">{year}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-12 h-px bg-[#0c1b33]/15 mx-auto" />

        {/* Developer Credit / Branding */}
        <div className="space-y-1">
          {/* Το σύμβολο Code2 και η φράση σε σκούρο μπλε (#0c1b33) */}
          <p className="font-sans text-[11px] text-[#0c1b33]/80 font-normal flex items-center justify-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-[#0c1b33]" />
            Σχεδιάστηκε με αγάπη από
          </p>
          {/* vgogenius.gr σε ανοιχτό μπλε (#4a729c) */}
          <a
            href="https://vgogenius.gr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-sans text-xs font-medium tracking-widest text-[#4a729c] hover:text-[#0c1b33] uppercase transition-colors hover:underline underline-offset-4"
          >
            vgogenius.gr
          </a>
        </div>
      </div>
    </footer>
  );
};