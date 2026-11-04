import React, { useEffect, useState } from 'react';
import { MapPin, Clock3, Navigation } from 'lucide-react';

type LocationInfo = {
  title: string;
  time: string;
  name: string;
  address: string;
  mapQuery: string;
  embedUrl: string;
};

interface LocationsProps {
  ceremony: LocationInfo;
  reception: LocationInfo;
}

export const Locations: React.FC<LocationsProps> = ({ ceremony, reception }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const renderLocation = (location: LocationInfo) => (
    <div key={location.name} className="rounded-[28px] border border-[#dce8f2] bg-[#f7fafc] p-6 shadow-[0_8px_28px_rgba(12,27,51,0.04)] text-left flex flex-col justify-between h-full">
      <div>
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eaf2fb] text-[#4a729c]">
            <MapPin className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#4a729c]">
              {location.title}
            </p>
            <h3 className="font-bodoni text-xl text-[#0c1b33] mt-0.5 leading-snug">{location.name}</h3>
          </div>
        </div>

        <div className="mb-5 space-y-2.5 text-sm text-[#0c1b33]/80">
          <div className="flex items-center gap-2.5">
            <Clock3 className="h-4 w-4 shrink-0 text-[#4a729c]" />
            <span>{location.time}</span>
          </div>
          <div className="flex items-start gap-2.5">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#4a729c]" />
            <span>{location.address}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="overflow-hidden rounded-2xl border border-[#dce8f2] bg-white">
          <iframe
            src={location.embedUrl}
            title={location.name}
            className="h-48 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <a
          href={location.mapQuery}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#0c1b33] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#4a729c]"
        >
          <Navigation className="h-3.5 w-3.5" />
          Πλοήγηση
        </a>
      </div>
    </div>
  );

  return (
    <section className={`fade-in-section bg-white px-6 py-16 text-center ${isMounted ? 'is-visible' : ''}`}>
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 space-y-2">
          <p className="font-didot text-xs tracking-[0.35em] text-[#4a729c] font-semibold uppercase">
            Το μέρος μας
          </p>
          <h2 className="font-bodoni italic text-3xl sm:text-4xl text-[#0c1b33] font-normal tracking-wide">
            Τοποθεσίες
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 items-stretch">
          {renderLocation(ceremony)}
          {renderLocation(reception)}
        </div>
      </div>
    </section>
  );
};

export default Locations;