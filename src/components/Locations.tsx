import React from 'react';
import { MapPin, Navigation, Clock } from 'lucide-react';

interface LocationItem {
  title: string;
  time: string;
  name: string;
  address: string;
  mapQuery: string;
  embedUrl: string;
}

interface LocationsProps {
  ceremony?: LocationItem;
  reception?: LocationItem;
}

export const Locations: React.FC<LocationsProps> = ({ ceremony, reception }) => {
  const ceremonyData: LocationItem = {
    title: ceremony?.title || 'Το Μυστήριο',
    time: ceremony?.time || '12:30',
    name: ceremony?.name || 'Ιερό Ναό Υψώσεως Τιμίου Σταυρού\n(Εσταυρωμένος)',
    address: ceremony?.address || 'Αιγάλεω, Αττική',
    // Universal Google Maps Directions URL
    mapQuery: ceremony?.mapQuery || 'https://maps.google.com/?daddr=Ιερό+Ναός+Υψώσεως+Τιμίου+Σταυρού+Εσταυρωμένος+Αιγάλεω',
    embedUrl: ceremony?.embedUrl || 'https://maps.google.com/maps?q=Plateia%20Estavromenou%20Aigaleo&t=&z=15&ie=UTF8&iwloc=&output=embed',
  };

  const receptionData: LocationItem = {
    title: reception?.title || 'Η Δεξίωση',
    time: reception?.time || '15:00',
    name: 'Κτήμα 28',
    address: 'Καπανδρίτι, Αττική',
    // Universal Google Maps Directions URL
    mapQuery: reception?.mapQuery || 'https://maps.google.com/?daddr=Κτήμα+28+Καπανδρίτι',
    embedUrl: reception?.embedUrl || 'https://maps.google.com/maps?q=Ktima+28+Kapandriti&t=&z=15&ie=UTF8&iwloc=&output=embed',
  };

  return (
    <div className="py-16 px-6 bg-[#f3f7fb] space-y-12 border-t border-[#dce8f2]">
      
      {/* 1. ΤΟ ΜΥΣΤΗΡΙΟ (ΕΚΚΛΗΣΙΑ) */}
      <div className="fade-in-section space-y-4">
        <div className="text-center space-y-1.5">
          <p className="font-didot text-xs tracking-[0.35em] text-[#4a729c] font-semibold uppercase">
            Η Τελετη
          </p>
          
          <h2 className="font-bodoni italic text-3xl sm:text-4xl text-[#0c1b33] font-normal tracking-wide">
            {ceremonyData.title}
          </h2>

          <div className="flex items-center justify-center gap-1.5 text-[#0c1b33]/70 font-sans text-xs pt-1">
            <Clock className="w-3.5 h-3.5 text-[#4a729c]" />
            <span>{ceremonyData.time}</span>
          </div>
        </div>

        {/* Card Χάρτη & Πληροφοριών */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_25px_rgba(12,27,51,0.05)] border border-[#dce8f2]">
          <div className="w-full h-48 bg-stone-100 relative">
            <iframe
              src={ceremonyData.embedUrl}
              className="w-full h-full border-0 grayscale-[15%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={ceremonyData.title}
            />
          </div>

          <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h4 className="font-didot text-lg font-semibold text-[#0c1b33] whitespace-pre-line leading-snug">
                {ceremonyData.name}
              </h4>
              <p className="font-sans text-xs text-[#4a729c] flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#4a729c]" />
                {ceremonyData.address}
              </p>
            </div>

            <a
              href={ceremonyData.mapQuery}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#0c1b33] hover:bg-[#183059] text-white px-5 py-2.5 rounded-xl text-xs font-didot tracking-widest uppercase transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-[#fcfbf9]" />
              Πλοηγηση
            </a>
          </div>
        </div>
      </div>

      {/* 2. Η ΔΕΞΙΩΣΗ */}
      <div className="fade-in-section space-y-4">
        <div className="text-center space-y-1.5">
          <p className="font-didot text-xs tracking-[0.35em] text-[#4a729c] font-semibold uppercase">
            Το Παρτι
          </p>
          
          <h2 className="font-bodoni italic text-3xl sm:text-4xl text-[#0c1b33] font-normal tracking-wide">
            {receptionData.title}
          </h2>

          <div className="flex items-center justify-center gap-1.5 text-[#0c1b33]/70 font-sans text-xs pt-1">
            <Clock className="w-3.5 h-3.5 text-[#4a729c]" />
            <span>{receptionData.time}</span>
          </div>
        </div>

        {/* Card Χάρτη & Πληροφοριών */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_25px_rgba(12,27,51,0.05)] border border-[#dce8f2]">
          <div className="w-full h-48 bg-stone-100 relative">
            <iframe
              src={receptionData.embedUrl}
              className="w-full h-full border-0 grayscale-[15%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={receptionData.title}
            />
          </div>

          <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h4 className="font-didot text-lg font-semibold text-[#0c1b33]">
                {receptionData.name}
              </h4>
              <p className="font-sans text-xs text-[#4a729c] flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#4a729c]" />
                {receptionData.address}
              </p>
            </div>

            <a
              href={receptionData.mapQuery}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 bg-[#0c1b33] hover:bg-[#183059] text-white px-5 py-2.5 rounded-xl text-xs font-didot tracking-widest uppercase transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-[#fcfbf9]" />
              Πλοηγηση
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};