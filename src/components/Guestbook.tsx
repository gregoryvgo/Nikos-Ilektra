import React, { useEffect, useState } from 'react';
import { BookHeart, Send, Camera, CheckCircle2, Lock, ShieldCheck, X, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Wish {
  id?: string;
  name: string;
  message: string;
  photoUrl?: string;
  createdAt: string;
}

const ADMIN_PIN = '1001';

export const Guestbook: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  useEffect(() => {
    const fetchWishes = async () => {
      if (!supabase) return;

      const { data, error } = await supabase
        .from('guestbook_wishes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Failed to load guestbook wishes:', error);
        return;
      }

      if (data) {
        const formatted = data.map((item) => ({
          id: item.id,
          name: item.name,
          message: item.message,
          photoUrl: item.photo_url || undefined,
          createdAt: new Date(item.created_at).toLocaleDateString('el-GR', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
          }),
        }));
        setWishes(formatted);
      }
    };

    void fetchWishes();

    let subscription: any = null;
    if (supabase) {
      subscription = supabase
        .channel('public:guestbook_wishes')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'guestbook_wishes' },
          (payload) => {
            if (payload.eventType === 'INSERT') {
              const newItem = payload.new as any;
              const formattedNewWish: Wish = {
                id: newItem.id,
                name: newItem.name,
                message: newItem.message,
                photoUrl: newItem.photo_url || undefined,
                createdAt: 'Μόλις τώρα',
              };
              setWishes((prev) => [formattedNewWish, ...prev]);
            } else if (payload.eventType === 'DELETE') {
              const deletedId = payload.old.id;
              setWishes((prev) => prev.filter((w) => w.id !== deletedId));
            }
          }
        )
        .subscribe();
    }

    return () => {
      if (subscription && supabase) {
        supabase.removeChannel(subscription);
      }
    };
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || isSubmitting) return;

    setIsSubmitting(true);

    if (supabase) {
      const { error } = await supabase.from('guestbook_wishes').insert([
        {
          name: name.trim(),
          message: message.trim(),
          photo_url: photo || null,
        },
      ]);

      if (error) {
        console.error('Failed to save wish to Supabase:', error);
      }
    }

    setIsSuccess(true);
    setName('');
    setMessage('');
    setPhoto(null);
    setIsSubmitting(false);
    window.setTimeout(() => setIsSuccess(false), 3000);
  };

  const handleDeleteWish = async (id?: string) => {
    if (!id || !supabase) return;
    const { error } = await supabase.from('guestbook_wishes').delete().eq('id', id);
    if (error) {
      console.error('Failed to delete wish:', error);
    } else {
      setWishes((prev) => prev.filter((w) => w.id !== id));
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setIsAuthenticated(true);
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

  return (
    <div className="fade-in-section py-16 px-6 bg-[#f3f7fb] text-center border-t border-[#dce8f2] relative">
      <div className="max-w-sm mx-auto space-y-8">
        <div className="space-y-2">
          <p className="font-didot text-xs tracking-[0.35em] text-[#4a729c] font-semibold uppercase">
            Αναμνήσεις
          </p>

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
            disabled={isSubmitting}
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
                <span>Αποστολή Ευχής</span>
              </>
            )}
          </button>
        </form>

        <div className="space-y-4 text-left">
          <p className="font-didot text-xs tracking-[0.35em] text-[#4a729c] font-semibold uppercase text-center">
            Πρόσφατες Ευχές
          </p>

          <div className="space-y-3">
            {wishes.length === 0 ? (
              <p className="text-center text-xs text-stone-400 py-4 font-sans">
                Δεν υπάρχουν ευχές ακόμα. Γίνετε ο πρώτος!
              </p>
            ) : (
              wishes.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="bg-white p-4 rounded-xl border border-[#dce8f2] shadow-[0_4px_16px_rgba(12,27,51,0.03)] space-y-2"
                >
                  <div className="flex items-center justify-between gap-3">
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
              ))
            )}
          </div>
        </div>

        <div className="pt-6 border-t border-[#dce8f2]/50 flex justify-center">
          <button
            type="button"
            onClick={() => setIsAdminOpen(true)}
            className="flex items-center gap-1.5 text-[11px] font-sans text-[#4a729c]/70 hover:text-[#4a729c] transition-colors cursor-pointer"
          >
            <Lock className="w-3 h-3" />
            <span>Admin Dashboard</span>
          </button>
        </div>
      </div>

      {isAdminOpen && (
        <div className="fixed inset-0 bg-[#0c1b33]/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-left shadow-2xl border border-[#dce8f2] relative space-y-6">
            <button
              type="button"
              onClick={() => {
                setIsAdminOpen(false);
                setPinError(false);
                setPinInput('');
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#0c1b33]"
            >
              <X className="w-5 h-5" />
            </button>

            {!isAuthenticated ? (
              <form onSubmit={handleLogin} className="space-y-4 py-4">
                <div className="space-y-1">
                  <h3 className="font-bodoni text-xl font-medium text-[#0c1b33]">
                    Είσοδος Διαχειριστή
                  </h3>
                  <p className="font-sans text-xs text-gray-500">
                    Εισάγετε τον τετραψήφιο κωδικό PIN για να διαχειριστείτε τις ευχές.
                  </p>
                </div>
                <div>
                  <input
                    type="password"
                    maxLength={4}
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="PIN"
                    className="w-full px-4 py-2 border border-[#dce8f2] rounded-xl text-center font-mono tracking-widest text-lg focus:outline-none focus:border-[#4a729c]"
                    autoFocus
                  />
                  {pinError && (
                    <p className="text-red-500 text-xs mt-1.5 text-center">Λανθασμένος κωδικός PIN.</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#0c1b33] text-white py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase hover:bg-[#4a729c] transition-colors cursor-pointer"
                >
                  Είσοδος
                </button>
              </form>
            ) : (
              <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-1">
                <div className="flex items-center justify-between border-b pb-3 border-[#dce8f2]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#4a729c]" />
                    <h3 className="font-bodoni text-xl font-medium text-[#0c1b33]">
                      Διαχείριση Ευχών
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAuthenticated(false)}
                    className="text-xs text-red-500 hover:underline font-medium"
                  >
                    Έξοδος
                  </button>
                </div>

                <div className="space-y-4">
                  {wishes.length === 0 ? (
                    <p className="text-xs text-stone-500 text-center py-4">
                      Δεν υπάρχουν ευχές προς διαγραφή.
                    </p>
                  ) : (
                    wishes.map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#f3f7fb] p-4 rounded-xl border border-[#dce8f2] space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-bodoni text-sm text-[#0c1b33] truncate">{item.name}</p>
                            <p className="font-sans text-[10px] text-stone-400">{item.createdAt}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => void handleDeleteWish(item.id)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 bg-white text-red-500 hover:bg-red-50 transition-colors"
                            aria-label={`Delete wish from ${item.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="font-sans text-xs text-stone-600 leading-relaxed">"{item.message}"</p>

                        {item.photoUrl && (
                          <img
                            src={item.photoUrl}
                            alt={`${item.name} photo`}
                            className="w-full max-h-40 object-cover rounded-lg border border-[#dce8f2]"
                          />
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};