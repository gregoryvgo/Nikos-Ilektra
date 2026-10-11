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
    quote?: string;
    phone?: string;
    image?: string;
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
      time: "12:30",
      name: "Ιερός Ναός Υψώσεως Τιμίου Σταυρού\n(Εσταυρωμένος)",
      address: "Αιγάλεω, Αττική",
      mapQuery: "https://www.google.com/maps/dir/?api=1&destination=Ieros+Naos+Ypsoseos+Timiou+Stavrou+Aigaleo",
      embedUrl: "https://maps.google.com/maps?q=Plateia+Estavromenou+Aigaleo&t=&z=15&ie=UTF8&iwloc=&output=embed",
    },
    reception: {
      title: "Η Δεξίωση",
      time: "15:00",
      name: "Κτήμα 28",
      address: "Καπανδρίτι, Αττική",
      mapQuery: "https://www.google.com/maps/dir/?api=1&destination=Ktima+28+Kapandriti",
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
      phone: "+306948057742",
      image: "/images/FB_IMG_1717614596508.jpg",
    },
    {
      name: "Ηλέκτρα",
      role: "Νύφη",
      phone: "+306907367525",
      image: "/images/IMG-0d5e919d4f1c95d7cd513e38892b23d0-V.jpg",
    },
    {
      name: "Νικόλας Μπιλάλης\nΒασίλης & Καλλιόπη Παπαδημητρίου",
      role: "Κουμπάροι",
    },
  ],
  bankAccount: {
    bankName: "Τράπεζα Πειραιώς",
    iban: "GR2301727090005709119954638",
    beneficiary: "Νίκος & Ηλέκτρα",
  },
  rsvpDeadline: "10 Δεκεμβρίου 2026",
};