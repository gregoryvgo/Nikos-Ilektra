export interface EventData {
  couple: {
    groom: string;
    bride: string;
    hashtag: string;
  };
  eventDate: string; // ISO format για το countdown
  formattedDate: string;
  locations: {
    ceremony: {
      title: string;
      time: string;
      name: string;
      address: string;
      mapQuery: string;
      embedUrl: string;
    };
    reception: {
      title: string;
      time: string;
      name: string;
      address: string;
      mapQuery: string;
      embedUrl: string;
    };
  };
  story: {
    title: string;
    text: string;
  };
  crew: Array<{
    name: string;
    role: string;
    quote: string;
    phone: string;
    image: string;
  }>;
  bankAccount: {
    bankName: string;
    iban: string;
    beneficiary: string;
  };
  rsvpDeadline: string;
}

export const eventData: EventData = {
  couple: {
    groom: "Νίκος",
    bride: "Ηλέκτρα",
    hashtag: "#ΝίκοςΗλέκτρα2027",
  },
  eventDate: "2027-01-10T16:00:00",
  formattedDate: "Κυριακή 10 Ιανουαρίου 2027",
  locations: {
    ceremony: {
      title: "Το Μυστήριο",
      time: "12:00",
      name: "Πλατεία Εσταυρωμένου",
      address: "Αιγάλεω, Αττική",
      mapQuery: "https://www.google.com/maps/search/?api=1&query=%CE%A0%CE%BB%CE%B1%CF%84%CE%B5%CE%AF%CE%B1+%CE%95%CF%83%CF%84%CE%B1%CF%85%CF%81%CF%89%CE%BC%CE%AD%CE%BD%CE%BF%CF%85+%CE%91%CE%B9%CE%B3%CE%AC%CE%BB%CE%B5%CF%89",
      embedUrl: "https://maps.google.com/maps?q=Plateia+Estavromenou+Aigaleo&t=&z=15&ie=UTF8&iwloc=&output=embed",
    },
    reception: {
      title: "Η Δεξίωση",
      time: "14:00",
      name: "Κτήμα 28",
      address: "Καπανδρίτι, Αττική",
      mapQuery: "https://www.google.com/maps/search/?api=1&query=%CE%9A%CF%84%CE%AE%CE%BC%CE%B1+28+%CE%9A%CE%B1%CF%80%CE%B1%CE%BD%CE%B4%CF%81%CE%AF%CF%84%CE%B9",
      embedUrl: "https://maps.google.com/maps?q=Ktima+28+Kapandriti&t=&z=15&ie=UTF8&iwloc=&output=embed",
    },
  },
  story: {
    title: "Πώς γνωριστήκαμε",
    text: "Όλα ξεκίνησαν σαν μια τυχαία σύμπτωση σε μια πόλη που δεν ησυχάζει ποτέ. Δύο παράλληλες διαδρομές που, χωρίς να το γνωρίζουν, βάδιζαν προς το ίδιο σημείο συνάντησης. Μια ματιά, ένα αυθόρμητο χαμόγελο και μια πρώτη συζήτηση που έμοιαζε να μην έχει τέλος ήταν αρκετά για να αλλάξουν τα πάντα. Από εκείνη τη στιγμή, η καθημερινότητα απέκτησε άλλο νόημα. Τα βράδια γέμισαν με ατελείωτες βόλτες, τα ταξίδια έγιναν κοινές εμπειρίες και οι μικρές, απλές στιγμές μετατράπηκαν στις πιο όμορφες αναμνήσεις. Μέσα από τα γέλια, τα όνειρα, αλλά και τις προκλήσεις, ανακαλύψαμε ότι το σπίτι μας δεν είναι ένας τόπος, αλλά ο ένας δίπλα στον άλλον. Σήμερα, με την ίδια βαθιά αγάπη και την υπόσχεση να μοιραζόμαστε κάθε επόμενη σελίδα, επιλέγουμε να ενώσουμε τις ζωές μας για πάντα, ξεκινώντας το πιο όμορφο κοινό μας κεφάλαιο.",
  },
  crew: [
    {
      name: "Νίκος",
      role: "Γαμπρός",
      quote: "Ελπίζω να μην περιμένω πολύ τη νύφη!",
      phone: "+306937000000",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop&q=80",
    },
    {
      name: "Ηλέκτρα",
      role: "Νύφη",
      quote: "Εάν το σκάσω και δεν εμφανιστώ, θα με βρείτε στα παρακάτω στοιχεία!",
      phone: "+306937111200",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&fit=crop&q=80",
    },
    {
      name: "Νικόλας",
      role: "Κουμπάρος",
      quote: "Καθόμασταν στο ίδιο θρανίο και φανταζόμασταν αυτή τη στιγμή!",
      phone: "+306937007007",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&fit=crop&q=80",
    },
    {
      name: "Καλλιόπη",
      role: "Κουμπάρα",
      quote: "Επιτέλους θα σε ξυρίσω φίλε, δεν θα μείνει τρίχα!",
      phone: "+306937008008",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&fit=crop&q=80",
    },
  ],
  bankAccount: {
    bankName: "Τράπεζα Πειραιώς",
    iban: "GR00022211155522223333333664512",
    beneficiary: "Νίκος & Ηλέκτρα",
  },
  rsvpDeadline: "10 Δεκεμβρίου 2026",
};