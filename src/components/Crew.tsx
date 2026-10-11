import React from 'react';
import { Phone, Sparkles } from 'lucide-react';

interface CrewMember {
  name: string;
  role: string;
  quote?: string;
  phone?: string;
  image?: string;
}

interface CrewProps {
  members?: CrewMember[];
}

const defaultCrew: CrewMember[] = [
  {
    name: 'Νίκος',
    role: 'Γαμπρός',
    quote: '',
    phone: '+30 690 000 0001',
  },
  {
    name: 'Ηλέκτρα',
    role: 'Νύφη',
    quote: '',
    phone: '+30 690 000 0002',
  },
  {
    name: 'Νικόλας',
    role: 'Κουμπάρος',
    quote: 'Έτοιμος για το ρύζι και το καλύτερο πάρτι!',
    phone: '+30 690 000 0003',
  },
  {
    name: 'Καλλιόπη',
    role: 'Κουμπάρα',
    quote: 'Δίπλα τους σε κάθε βήμα αυτής της όμορφης διαδρομής!',
    phone: '+30 690 000 0004',
  },
];

export const Crew: React.FC<CrewProps> = ({ members = defaultCrew }) => {
  const displayMembers = members && members.length > 0 ? members : defaultCrew;

  return (
    <div className="fade-in-section py-16 px-6 bg-white text-center border-t border-stone-100">
      {/* Section Header */}
      <div className="space-y-2 mb-12">
        <p className="font-didot text-xs tracking-[0.35em] text-[#4a729c] font-semibold uppercase">
          Οι Πρωταγωνιστες
        </p>

        <h2 className="font-bodoni italic text-3xl sm:text-4xl text-[#0c1b33] font-normal tracking-wide">
          The Crew
        </h2>

        <div className="flex items-center justify-center gap-2 pt-1">
          <div className="w-8 h-px bg-[#0c1b33]/25" />
          <Sparkles className="w-3.5 h-3.5 text-[#4a729c]" />
          <div className="w-8 h-px bg-[#0c1b33]/25" />
        </div>
      </div>

      {/* Grid Μελών */}
      <div className="space-y-6 max-w-sm mx-auto">
        {displayMembers.map((member, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center p-6 rounded-2xl bg-[#f3f7fb] border border-[#dce8f2] shadow-[0_4px_20px_rgba(12,27,51,0.03)] transition-transform duration-300 hover:scale-[1.02]"
            >
              {/* Κυκλική Φωτογραφία (εάν υπάρχει) */}
              {member.image && (
                <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-[#0c1b33]/15 shadow-md bg-stone-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Ρόλος (Badge) */}
              <div className="mb-2">
                <span className="bg-[#0c1b33] text-white text-xs uppercase font-didot tracking-widest px-4 py-1.5 rounded-full shadow-md whitespace-nowrap border border-white/20">
                  {member.role}
                </span>
              </div>

              {/* Στοιχεία & Quote */}
              <div className="space-y-2 mt-2">
                {/* Όνομα με ίδιο μέγεθος για όλους */}
                <h3 className="font-bodoni font-medium text-[#0c1b33] tracking-wide whitespace-pre-line leading-snug text-xl sm:text-2xl">
                  {member.name}
                </h3>
                
                {member.quote && member.quote.trim() !== '' && (
                  <p className="font-sans italic text-xs text-stone-500 max-w-[240px] leading-relaxed">
                    "{member.quote}"
                  </p>
                )}
              </div>

              {/* Quick Actions / Phone Button */}
              {member.phone && member.phone.trim() !== '' && (
                <div className="flex items-center gap-3 mt-4">
                  <a
                    href={`tel:${member.phone}`}
                    className="flex items-center gap-2 bg-white border border-[#0c1b33]/20 hover:border-[#0c1b33] text-[#0c1b33] hover:bg-[#0c1b33]/5 px-5 py-2.5 rounded-full text-sm font-sans tracking-wide transition-all shadow-xs active:scale-95 font-medium"
                  >
                    <Phone className="w-4 h-4 text-[#4a729c]" />
                    <span>{member.phone}</span>
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};