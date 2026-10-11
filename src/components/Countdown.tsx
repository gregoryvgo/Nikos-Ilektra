import React, { useState, useEffect } from 'react';
import { Calendar, CalendarPlus, Download } from 'lucide-react';

interface CountdownProps {
  targetDate: string;
  formattedDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate, formattedDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const getGoogleCalendarUrl = () => {
    const event = {
      title: 'Γάμος νίκος & Ηλέκτρα',
      description: 'Σας περιμένουμε στον γάμο μας!',
      location: 'Ι.Ν Εσταυρωμένου Εσταυρωμένου Εσταυρωμένου. Αγίου Δημητρίου',
      start: '20280928T160000Z',
      end: '20280928T230000Z',
    };
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=${event.start}/${event.end}&details=${encodeURIComponent(
      event.description
    )}&location=${encodeURIComponent(event.location)}`;
  };

  const downloadIcsFile = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//vgogenius//Wedding Invitation//EL',
      'BEGIN:VEVENT',
      'SUMMARY:Γάμος Νίκος & Ηλέκτρα',
      'DESCRIPTION:Σας περιμένουμε στον γάμο μας!',
      'LOCATION:Ι.Ν. Εσταυρωμένου',
      'DTSTART:20280928T160000Z',
      'DTEND:20280928T230000Z',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'wedding-invite.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const timeUnits = [
    { label: 'Ημέρες', value: timeLeft.days },
    { label: 'Ώρες', value: timeLeft.hours },
    { label: 'Λεπτά', value: timeLeft.minutes },
    { label: 'Δεύτερα', value: timeLeft.seconds },
  ];

  return (
    <div className="pt-6 pb-16 px-6 bg-[#f3f7fb] text-center m-0 border-0">
      <div className="max-w-sm mx-auto space-y-8">
        
        {/* Heading */}
        <div className="space-y-2">
          <p className="font-didot text-xs tracking-[0.35em] text-[#4a729c] font-semibold uppercase">
            Αντίστροφη Μέτρηση
          </p>
          
          <h2 className="font-bodoni italic text-3xl sm:text-4xl font-normal tracking-wide text-[#0c1b33]">
            Η Μεγάλη Μέρα
          </h2>

          <div className="flex items-center justify-center gap-2 pt-1">
            <div className="w-8 h-px bg-[#0c1b33]/25" />
            <Calendar className="w-3.5 h-3.5 text-[#4a729c]" />
            <div className="w-8 h-px bg-[#0c1b33]/25" />
          </div>

          <p className="font-didot text-sm sm:text-base text-[#0c1b33] tracking-widest uppercase pt-1 font-medium">
            {formattedDate}
          </p>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-4 gap-2.5">
          {timeUnits.map((unit, index) => (
            <div
              key={index}
              className="bg-white py-3.5 px-2 rounded-2xl border border-[#dce8f2] shadow-[0_4px_20px_rgba(12,27,51,0.05)] flex flex-col items-center justify-center space-y-1"
            >
              <span className="font-didot text-2xl sm:text-3xl font-semibold text-[#0c1b33] tracking-tight">
                {String(unit.value).padStart(2, '0')}
              </span>
              
              <span className="font-bodoni italic text-[11px] text-[#0c1b33]/70 tracking-wider">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <p className="font-bodoni italic text-sm text-[#0c1b33]/80">
            Αποθηκεύστε την ημερομηνία
          </p>

          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-[#0c1b33]/20 hover:border-[#0c1b33] text-[#0c1b33] hover:bg-[#0c1b33]/5 text-[11px] font-sans font-medium transition-all shadow-sm active:scale-95"
            >
              <CalendarPlus className="w-3.5 h-3.5 text-[#4a729c]" />
              <span>Google Calendar</span>
            </a>

            <button
              onClick={downloadIcsFile}
              type="button"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-[#0c1b33]/20 hover:border-[#0c1b33] text-[#0c1b33] hover:bg-[#0c1b33]/5 text-[11px] font-sans font-medium transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#4a729c]" />
              <span>Apple / Outlook</span>
            </button>
          </div>
        </div>

        {/* Επιπλέον Κείμενα */}
        <div className="space-y-3 pt-3">
          <p className="font-bodoni italic text-base sm:text-lg text-[#0c1b33] leading-relaxed">
            Παρακαλούμε επιβεβαιώστε την παρουσία σας <br />
            έως τις{' '}
            <strong className="font-semibold not-italic text-[#4a729c] whitespace-nowrap">
              10/12/2026
            </strong>
            .
          </p>
          <p className="font-bodoni italic font-semibold text-xl sm:text-2xl text-[#4a729c]">
            Θα χαρούμε πολύ να σας δούμε!
          </p>
        </div>

      </div>
    </div>
  );
};