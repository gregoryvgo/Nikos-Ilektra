import React, { useState, useEffect } from 'react';
import { HelpCircle, CheckCircle2 } from 'lucide-react';

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
    id: 'foot_step',
    question: 'Θα πατήσει η νύφη το πόδι του γαμπρού;',
    options: [
      { id: '1', text: 'Φυσικά και θα το πατήσει!', votes: 42 },
      { id: '2', text: 'Όχι, είναι παραδοσιακός.', votes: 12 },
      { id: '3', text: 'Κρίμα δεν είναι το παπούτσι;', votes: 18 },
    ],
  },
  {
    id: 'honeymoon',
    question: 'Πού πρέπει να πάνε ταξίδι του μέλιτος;',
    options: [
      { id: '1', text: 'Μπαλί / Εξωτικά', votes: 35 },
      { id: '2', text: 'Ιταλία / Ρώμη', votes: 24 },
      { id: '3', text: 'Ιαπωνία / Τόκιο', votes: 29 },
    ],
  },
];

export const Poll: React.FC = () => {
  const [polls, setPolls] = useState<PollQuestion[]>(initialPolls);
  const [userVotes, setUserVotes] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = localStorage.getItem('wedding_poll_votes');
    if (saved) {
      try {
        setUserVotes(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleVote = (poll: PollQuestion, option: PollOption) => {
    const previousOptionId = userVotes[poll.id];
    if (previousOptionId === option.id) return;

    const updatedVotes = { ...userVotes, [poll.id]: option.id };
    setUserVotes(updatedVotes);
    localStorage.setItem('wedding_poll_votes', JSON.stringify(updatedVotes));

    setPolls((prev) =>
      prev.map((p) => {
        if (p.id !== poll.id) return p;
        return {
          ...p,
          options: p.options.map((opt) => {
            if (opt.id === option.id) return { ...opt, votes: opt.votes + 1 };
            if (opt.id === previousOptionId) return { ...opt, votes: Math.max(0, opt.votes - 1) };
            return opt;
          }),
        };
      })
    );
  };

  const getTotalVotes = (options: PollOption[]) =>
    options.reduce((sum, opt) => sum + opt.votes, 0);

  return (
    <div className="fade-in-section py-16 px-6 bg-white text-center border-t border-[#dce8f2]">
      <div className="max-w-sm mx-auto space-y-8">
        <div className="space-y-2">
          {/* Fun Zone σε ανοιχτό μπλε (#4a729c) */}
          <p className="font-didot text-xs tracking-[0.35em] text-[#4a729c] font-semibold uppercase">
            Fun Zone
          </p>

          {/* Δημοσκόπηση σε σκούρο μπλε (#0c1b33) */}
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
              /* Καρτέλα σε ανοιχτό μπλε (#f3f7fb) */
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
                        onClick={() => handleVote(poll, option)}
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
                            /* Ποσοστά σε σκούρο μπλε (#0c1b33) */
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
      </div>
    </div>
  );
};