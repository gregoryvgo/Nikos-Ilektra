import React, { useState } from 'react';
import { BookHeart, Send, Camera, CheckCircle2 } from 'lucide-react';

interface Wish {
  name: string;
  message: string;
  photoUrl?: string;
  createdAt: string;
}

const initialWishes: Wish[] = [
  {
    name: 'Μαρία & Νίκος',
    message: 'Να ζήσετε ευτυχισμένοι και πάντα αγαπημένοι! Ανυπομονούμε να το γιορτάσουμε μαζί σας!',
    createdAt: 'Πριν λίγο',
  },
  {
    name: 'Γιάννης Κ.',
    message: 'Η ώρα η καλή! Σας εύχομαι έναν βίο γεμάτο χαμόγελα και όμορφες στιγμές.',
    createdAt: 'Χθες',
  },
];

export const Guestbook: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: Wish = {
      name,
      message,
      photoUrl: photo || undefined,
      createdAt: 'Μόλις τώρα',
    };

    setWishes([newWish, ...wishes]);
    setIsSuccess(true);
    setName('');
    setMessage('');
    setPhoto(null);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="fade-in-section py-16 px-6 bg-[#f3f7fb] text-center border-t border-[#dce8f2]">
      <div className="max-w-sm mx-auto space-y-8">
        <div className="space-y-2">
          {/* 1. "Αναμνήσεις" σε ανοιχτό μπλε (#4a729c) */}
          <p className="font-didot text-xs tracking-[0.35em] text-[#4a729c] font-semibold uppercase">
            Αναμνησεις
          </p>

          {/* Τίτλος στο σκούρο μπλε της κορδέλας */}
          <h2 className="font-bodoni italic text-3xl sm:text-4xl text-[#0c1b33] font-normal tracking-wide">
            Ψηφιακό Ευχολόγιο
          </h2>

          <div className="flex items-center justify-center gap-2 pt-1">
            <div className="w-8 h-px bg-[#0c1b33]/25" />
            <BookHeart className="w-3.5 h-3.5 text-[#4a729c]" />
            <div className="w-8 h-px bg-[#0c1b33]/25" />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl border border-[#dce8f2] shadow-[0_8px_30px_rgba(12,27,51,0.03)] space-y-4 text-left"
        >
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#0c1b33]/70 font-medium mb-1.5">
              Το Όνομά σας
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="π.χ. Γιώργος & Μαρία"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#dce8f2] focus:outline-none focus:border-[#4a729c] text-xs text-[#0c1b33] bg-[#f3f7fb]"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#0c1b33]/70 font-medium mb-1.5">
              Η Ευχή σας
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Γράψτε τις ευχές σας για το ζευγάρι..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#dce8f2] focus:outline-none focus:border-[#4a729c] text-xs text-[#0c1b33] bg-[#f3f7fb] resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-1.5 cursor-pointer text-[#4a729c] hover:text-[#0c1b33] transition-colors">
              <Camera className="w-4 h-4 text-[#4a729c]" />
              <span className="text-xs font-sans">
                {photo ? 'Αλλαγή φωτογραφίας' : 'Προσθήκη Selfie'}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>

            {photo && (
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#dce8f2]">
                <img src={photo} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <button
            type="submit"
            className={`w-full flex items-center justify-center gap-2 text-white py-3 rounded-xl text-xs uppercase font-didot tracking-widest transition-all duration-300 shadow-sm active:scale-98 cursor-pointer ${
              isSuccess
                ? 'bg-emerald-600 shadow-emerald-200'
                : 'bg-[#0c1b33] hover:bg-[#183059] shadow-md'
            }`}
          >
            {isSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Η ευχή καταχωρήθηκε!</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5 text-[#fcfbf9]" />
                <span>Αποστολη Ευχης</span>
              </>
            )}
          </button>
        </form>

        <div className="space-y-4 text-left">
          {/* 2. "Πρόσφατες Ευχές" σε ανοιχτό μπλε (#4a729c) */}
          <p className="font-didot text-xs tracking-[0.35em] text-[#4a729c] font-semibold uppercase text-center">
            Προσφατες Ευχες
          </p>

          <div className="space-y-3">
            {wishes.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-xl border border-[#dce8f2] shadow-[0_4px_16px_rgba(12,27,51,0.03)] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bodoni font-medium text-[#0c1b33] text-sm tracking-wide">
                    {item.name}
                  </span>
                  <span className="font-sans text-[10px] text-stone-400">
                    {item.createdAt}
                  </span>
                </div>

                <p className="font-sans text-xs text-stone-600 font-light leading-relaxed">
                  "{item.message}"
                </p>

                {item.photoUrl && (
                  <div className="pt-2">
                    <img
                      src={item.photoUrl}
                      alt="Guest photo"
                      className="w-20 h-20 rounded-lg object-cover border border-[#dce8f2]"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};