import React, { useEffect, useState } from 'react';
import { Copy, Check, Gift } from 'lucide-react';

interface GiftRegistryProps {
  bankName?: string;
  iban?: string;
  beneficiary?: string;
}

export const GiftRegistry: React.FC<GiftRegistryProps> = ({
  bankName = 'Τράπεζα Πειραιώς',
  iban = 'GR2301727090005709119954638',
  beneficiary = 'Νίκος & Ηλέκτρα',
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(iban);
      } else {
        // Fallback μέθοδος για παλαιότερους browsers ή μη ασφαλή contexts
        const textArea = document.createElement('textarea');
        textArea.value = iban;
        textArea.style.position = 'fixed'; // Αποφυγή scroll
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Αποτυχία αντιγραφής:', err);
    }
  };

  return (
    <div className={`fade-in-section py-16 px-6 bg-[#f3f7fb] text-center border-t border-[#dce8f2] ${isMounted ? 'is-visible' : ''}`}>
      <div className="max-w-sm mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <p className="font-didot text-xs tracking-[0.35em] text-[#4a729c] font-semibold uppercase">
            Λιστα Γαμου
          </p>

          <h2 className="font-bodoni italic text-3xl sm:text-4xl text-[#0c1b33] font-normal tracking-wide">
            Προαιρετική Συνεισφορά
          </h2>

          <div className="flex items-center justify-center gap-2 pt-1">
            <div className="w-8 h-px bg-[#0c1b33]/25" />
            <Gift className="w-3.5 h-3.5 text-[#4a729c]" />
            <div className="w-8 h-px bg-[#0c1b33]/25" />
          </div>
        </div>

        <p className="font-sans text-xs text-[#0c1b33]/85 font-normal leading-relaxed px-4">
          Η παρουσία σας είναι το ομορφότερο δώρο για εμάς. Εάν ωστόσο επιθυμείτε να
          συμβάλετε στο ξεκίνημα της νέας μας ζωής:
        </p>

        {/* Bank Card */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgba(12,27,51,0.04)] border border-[#dce8f2] space-y-4">
          <div className="space-y-1">
            <span className="font-didot text-sm tracking-widest text-[#0c1b33] uppercase font-semibold block">
              {bankName}
            </span>
            <p className="font-sans text-xs text-[#4a729c] font-normal">
              Δικαιούχοι: <span className="font-normal text-[#4a729c]">{beneficiary}</span>
            </p>
          </div>

          {/* IBAN Box */}
          <div className="bg-[#f3f7fb] p-3.5 rounded-xl border border-[#dce8f2]">
            <p className="font-mono text-xs sm:text-[13px] tracking-wider text-[#0c1b33] break-all select-all font-medium">
              {iban}
            </p>
          </div>

          {/* Κουμπί "Αντιγραφή IBAN" */}
          <button
            type="button"
            onClick={handleCopy}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-didot tracking-widest uppercase transition-all duration-300 shadow-sm active:scale-95 cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white shadow-emerald-200'
                : 'bg-[#0c1b33] hover:bg-[#183059] text-white shadow-md'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Αντιγραφηκε!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#fcfbf9]" />
                <span>Αντιγραφη IBAN</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};