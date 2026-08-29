import React from 'react';
import { Phone, Sparkles } from 'lucide-react';

interface CrewMember {
  name: string;
  role: string;
  quote: string;
  phone: string;
  image: string;
}

interface CrewProps {
  members?: CrewMember[];
}

const defaultCrew: CrewMember[] = [
  {
    name: 'Νίκος',
    role: 'Γαμπρός',
    quote: 'Ανυπομονώ να ζήσουμε αυτή τη μοναδική στιγμή μαζί σας!',
    phone: '+30 690 000 0001',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop&q=80',
  },
  {
    name: 'Ηλέκτρα',
    role: 'Νύφη',
    quote: 'Η πιο ξεχωριστή μέρα της ζωής μας ξεκινάει!',
    phone: '+30 690 000 0002',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&fit=crop&q=80',
  },
  {
    name: 'Νικόλας',
    role: 'Κουμπάρος',
    quote: 'Έτοιμος για το ρύζι και το καλύτερο πάρτι!',
    phone: '+30 690 000 0003',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&fit=crop&q=80',
  },
  {
    name: 'Καλλιόπη',
    role: 'Κουμπάρα',
    quote: 'Δίπλα τους σε κάθε βήμα αυτής της όμορφης διαδρομής!',
    phone: '+30 690 000 0004',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&fit=crop&q=80',
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

        {/* 1. "The Crew" στο μπλε της κορδέλας */}
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
      <div className="space-y-10 max-w-sm mx-auto">
        {displayMembers.map((member, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 rounded-2xl bg-[#f3f7fb] border border-[#dce8f2] shadow-[0_4px_20px_rgba(12,27,51,0.03)] transition-transform duration-300 hover:scale-[1.02]"
          >
            {/* Avatar με Navy/Soft Blue Ring */}
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden p-1 border-2 border-[#0c1b33]/30 shadow-sm bg-white">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full"
                  loading="lazy"
                />
              </div>

              {/* 2. Πλαίσιο Ρόλου στο μπλε της κορδέλας */}
              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-[#0c1b33] text-white text-[10px] uppercase font-didot tracking-widest px-3.5 py-1 rounded-full shadow-md whitespace-nowrap border border-white/20">
                {member.role}
              </span>
            </div>

            {/* Στοιχεία & Quote */}
            <div className="space-y-2 mt-3">
              {/* 3. Ονόματα στο μπλε της κορδέλας */}
              <h3 className="font-bodoni text-2xl font-medium text-[#0c1b33] tracking-wide">
                {member.name}
              </h3>
              <p className="font-sans italic text-xs text-stone-500 max-w-[240px] leading-relaxed">
                "{member.quote}"
              </p>
            </div>

            {/* Quick Actions / Phone Button */}
            <div className="flex items-center gap-3 mt-5">
              <a
                href={`tel:${member.phone}`}
                className="flex items-center gap-1.5 bg-white border border-[#0c1b33]/20 hover:border-[#0c1b33] text-[#0c1b33] hover:bg-[#0c1b33]/5 px-4 py-2 rounded-full text-xs font-sans tracking-wide transition-all shadow-xs active:scale-95"
              >
                {/* Σύμβολο τηλεφώνου σε ανοιχτό μπλε (#4a729c) */}
                <Phone className="w-3.5 h-3.5 text-[#4a729c]" />
                <span>{member.phone}</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};