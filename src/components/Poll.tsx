import React, { useEffect, useState } from 'react';
import { HelpCircle, CheckCircle2, Lock, ShieldCheck, X } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface PollQuestion {
  id: string;
  question: string;
  options: PollOption[];
}

const initialPolls: PollQuestion[] = [
  {
    id: 'attendance',
    question: 'Θα μας τιμήσετε με την παρουσία σας;',
    options: [
      { id: '1', text: 'Ναι', votes: 0 },
      { id: '2', text: 'Όχι', votes: 0 },
    ],
  },
  {
    id: 'honeymoon',
    question: 'Πού θα πάμε μήνα του μέλιτος;',
    options: [
      { id: '1', text: 'Μαδαγασκάρη', votes: 0 },
      { id: '2', text: 'Μπαλί', votes: 0 },
      { id: '3', text: 'Βιέννη-Πράγα', votes: 0 },
      { id: '4', text: 'Κυψέλη', votes: 0 },
    ],
  },
  {
    id: 'bride_late',
    question: 'Πόση ώρα θα αργήσει η νύφη;',
    options: [
      { id: '1', text: '10 λεπτά', votes: 0 },
      { id: '2', text: '1 ώρα', votes: 0 },
      { id: '3', text: 'ΚΑΘΟΛΟΥ', votes: 0 },
    ],
  },
];

const ADMIN_PIN = '1001';

export const Poll: React.FC = () => {
  const [polls, setPolls] = useState<PollQuestion[]>(initialPolls);
  const [userVotes, setUserVotes] = useState<Record<string, string>>({});
  const [mounted, setMounted] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  useEffect(() => {
    setMounted(true);

    const savedVotes = window.localStorage.getItem('wedding_poll_votes');
    if (savedVotes) {
      try {
        setUserVotes(JSON.parse(savedVotes));
      } catch (error) {
        console.error(error);
      }
    }

    const fetchVotes = async () => {
      if (!supabase) return;
      try {
        const { data, error } = await supabase.from('poll_votes').select('*');
        if (!error && data && data.length > 0) {
          setPolls((prev) =>
            prev.map((poll) => {
              const pollOptions = poll.options.map((opt) => {
                const found = data.find(
                  (d) => d.poll_id === poll.id && d.option_id === opt.id
                );
                return found ? { ...opt, votes: found.votes } : opt;
              });
              return { ...poll, options: pollOptions };
            })
          );
        }
      } catch (err) {
        console.error('Supabase fetch error:', err);
      }
    };

    void fetchVotes();

    let subscription: ReturnType<typeof supabase.on> | null = null;
    if (supabase) {
      try {
        subscription = supabase
          .channel('public:poll_votes')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'poll_votes' },
            (payload) => {
              const updated = payload.new as { poll_id: string; option_id: string; votes: number } | null;
              if (!updated) return;

              setPolls((prev) =>
                prev.map((poll) => {
                  if (poll.id !== updated.poll_id) return poll;
                  return {
                    ...poll,
                    options: poll.options.map((opt) =>
                      opt.id === updated.option_id ? { ...opt, votes: updated.votes } : opt
                    ),
                  };
                })
              );
            }
          )
          .subscribe();
      } catch (error) {
        console.error(error);
      }
    }

    return () => {
      if (subscription && supabase) {
        supabase.removeChannel(subscription);
      }
    };
  }, []);

  const handleVote = async (poll: PollQuestion, option: PollOption) => {
    const previousOptionId = userVotes[poll.id];
    if (previousOptionId === option.id) return;

    const updatedVotesMap = { ...userVotes, [poll.id]: option.id };
    setUserVotes(updatedVotesMap);
    window.localStorage.setItem('wedding_poll_votes', JSON.stringify(updatedVotesMap));

    setPolls((prev) =>
      prev.map((p) => {
        if (p.id !== poll.id) return p;
        return {
          ...p,
          options: p.options.map((opt) => {
            let v = opt.votes;
            if (opt.id === option.id) v += 1;
            if (opt.id === previousOptionId) v = Math.max(0, v - 1);
            return { ...opt, votes: v };
          }),
        };
      })
    );

    if (supabase) {
      try {
        for (const opt of poll.options) {
          let newVoteCount = opt.votes;
          if (opt.id === option.id) newVoteCount += 1;
          if (opt.id === previousOptionId) newVoteCount = Math.max(0, newVoteCount - 1);

          await supabase.from('poll_votes').upsert(
            { poll_id: poll.id, option_id: opt.id, votes: newVoteCount },
            { onConflict: 'poll_id,option_id' }
          );
        }
      } catch (error) {
        console.error('Failed to sync vote with Supabase:', error);
      }
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

  const getTotalVotes = (options: PollOption[]) =>
    options.reduce((sum, opt) => sum + opt.votes, 0);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fade-in-section py-16 px-6 bg-white text-center border-t border-[#dce8f2] relative">
      <div className="max-w-sm mx-auto space-y-8">
        <div className="space-y-2">
          <p className="font-didot text-xs tracking-[0.35em] text-[#4a729c] font-semibold uppercase">
            Fun Zone
          </p>
          <h2 className="font-bodoni italic text-3xl sm:text-4xl text-[#0c1b33] font-normal tracking-wide">
            Δημοσκόπηση
          </h2>
          <div className="flex items-center justify-center gap-2 pt-1">
            <div className="w-8 h-px bg-[#0c1b33]/25" />
            <HelpCircle className="w-3.5 h-3.5 text-[#4a729c]" />
            <div className="w-8 h-px bg-[#0c1b33]/25" />
          </div>
        </div>

        <div className="space-y-8 text-left">
          {polls.map((poll) => {
            const hasVoted = Boolean(userVotes[poll.id]);
            const selectedOptionId = userVotes[poll.id];
            const totalVotes = getTotalVotes(poll.options);

            return (
              <div
                key={poll.id}
                className="bg-[#f3f7fb] p-5 rounded-2xl border border-[#dce8f2] shadow-[0_4px_20px_rgba(12,27,51,0.03)] space-y-4"
              >
                <h3 className="font-bodoni text-lg font-medium text-[#0c1b33] leading-snug tracking-wide">
                  {poll.question}
                </h3>

                <div className="space-y-2.5">
                  {poll.options.map((option) => {
                    const isSelected = selectedOptionId === option.id;
                    const percentage =
                      totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => void handleVote(poll, option)}
                        className={`w-full relative overflow-hidden rounded-xl border p-3 text-left transition-all duration-300 ${
                          hasVoted
                            ? isSelected
                              ? 'border-[#4a729c] bg-white shadow-xs'
                              : 'border-[#dce8f2] bg-white/60 opacity-80'
                            : 'border-[#dce8f2] bg-white hover:border-[#4a729c] active:scale-[0.99] cursor-pointer'
                        }`}
                      >
                        {hasVoted && (
                          <div
                            className={`absolute top-0 bottom-0 left-0 transition-all duration-700 ${
                              isSelected ? 'bg-[#4a729c]/20' : 'bg-[#dce8f2]/40'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        )}

                        <div className="relative flex items-center justify-between z-10">
                          <div className="flex items-center gap-2 pr-2">
                            {isSelected && (
                              <CheckCircle2 className="w-4 h-4 text-[#4a729c] shrink-0" />
                            )}
                            <span className="font-sans text-xs text-[#0c1b33] font-medium">
                              {option.text}
                            </span>
                          </div>

                          {hasVoted && (
                            <span className="font-mono text-xs font-semibold text-[#0c1b33] shrink-0">
                              {percentage}%
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {hasVoted && (
                  <p className="text-[11px] text-right font-sans text-[#4a729c] font-medium">
                    Σύνολο ψήφων: {totalVotes}
                  </p>
                )}
              </div>
            );
          })}
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
                    Εισάγετε τον τετραψήφιο κωδικό PIN για να δείτε τα συγκεντρωτικά στατιστικά.
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
                      Συγκεντρωτικά Στατιστικά
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

                <div className="space-y-6">
                  {polls.map((poll) => {
                    const totalVotes = getTotalVotes(poll.options);
                    return (
                      <div
                        key={poll.id}
                        className="bg-[#f3f7fb] p-4 rounded-xl border border-[#dce8f2] space-y-3"
                      >
                        <h4 className="font-bodoni text-sm font-medium text-[#0c1b33]">
                          {poll.question}
                        </h4>
                        <div className="space-y-2">
                          {poll.options.map((opt) => {
                            const percentage = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
                            return (
                              <div key={opt.id} className="text-xs space-y-1">
                                <div className="flex justify-between font-sans text-[#0c1b33]">
                                  <span className="font-medium">{opt.text}</span>
                                  <span className="font-mono font-semibold">
                                    {opt.votes} ψήφοι ({percentage}%)
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-[#4a729c] rounded-full"
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
