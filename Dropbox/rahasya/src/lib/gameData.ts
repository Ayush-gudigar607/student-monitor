export interface Suspect {
  id: number;
  name: string;
  alias: string;
  description: string;
  background: string;
  trait: string;
  color: string; // neon accent color for each suspect
}

export interface Clue {
  id: number;
  text: string;
  hint: string; // subtle hint about who it points to
  eliminates?: number[]; // suspect IDs this clue eliminates
}

// ============================================================
// THE CORRECT CRIMINAL — NEVER EXPOSE THIS TO THE CLIENT
// ============================================================
export const CORRECT_CRIMINAL_ID = 5;
export const CORRECT_CRIMINAL_NAME = "Daichi Nakamura";

// ============================================================
// SUSPECTS
// ============================================================
export const suspects: Suspect[] = [
  {
    id: 1,
    name: "Akira Tanaka",
    alias: "The Shadow Broker",
    description:
      "An underground information dealer who operates in the darkest corners of Neo-Tokyo. Known for selling secrets to the highest bidder.",
    background:
      "Former intelligence analyst who went rogue after discovering government corruption. Now runs a black-market information network.",
    trait: "Always wears dark glasses, even at night. Never makes eye contact.",
    color: "#00e5ff",
  },
  {
    id: 2,
    name: "Yuki Morishima",
    alias: "The Ice Queen",
    description:
      "A cold and calculating corporate executive at Morishima Industries. Her empire was built on ruthless acquisitions.",
    background:
      "Inherited the family conglomerate at 22. Doubled its value in 5 years through hostile takeovers. The victim was her business rival.",
    trait: "Never raises her voice. The quieter she speaks, the more dangerous she becomes.",
    color: "#7c4dff",
  },
  {
    id: 3,
    name: "Ryoma Kenshin",
    alias: "The Ronin",
    description:
      "An ex-detective turned vigilante. Once the best investigator in the city, now working outside the law.",
    background:
      "Left the force after his partner was killed in a case involving corporate corruption. Suspects the victim was connected to that case.",
    trait: "Still carries his old police badge. Has a scar across his left cheek.",
    color: "#ff1744",
  },
  {
    id: 4,
    name: "Sakura Hayashi",
    alias: "The Phantom",
    description:
      "A legendary hacker who exists only in the digital world. No one has ever seen her face — or confirmed she even exists.",
    background:
      "Rumored to have breached every major corporation's firewall. The victim's encrypted files were accessed hours before the crime.",
    trait: "Communicates only through encrypted channels. Leaves a cherry blossom emoji as her signature.",
    color: "#ff4081",
  },
  {
    id: 5,
    name: "Daichi Nakamura",
    alias: "The Architect",
    description:
      "A brilliant structural engineer and urban planner. Known for designing impossible buildings — and impossible plans.",
    background:
      "Designed the victim's corporate headquarters. Recently had a major contract dispute with the victim worth millions.",
    trait: "Always carries a leather notebook. Sketches blueprints obsessively, even in conversation.",
    color: "#ffd740",
  },
];

// ============================================================
// CLUES — revealed one by one, building toward the answer
// ============================================================
export const clues: Clue[] = [
  {
    id: 1,
    text: "Security cameras captured a figure near the Shibuya data center at 2:47 AM. The person moved with purpose — they knew the layout intimately.",
    hint: "Someone who knew the building's architecture...",
    eliminates: [1], // Shadow Broker operates remotely, not on-site
  },
  {
    id: 2,
    text: "The suspect was wearing a tailored suit and carried a leather briefcase. This was not a street-level operation.",
    hint: "A professional, not a hacker or street operator...",
    eliminates: [4], // The Phantom is a digital ghost, not physical
  },
  {
    id: 3,
    text: "The method used required advanced knowledge of structural systems — ventilation, load-bearing walls, and emergency exits were all exploited.",
    hint: "Only someone with engineering expertise could pull this off...",
    eliminates: [2], // Ice Queen is business, not engineering
  },
  {
    id: 4,
    text: "Investigators found hand-drawn blueprints of the victim's building in a nearby dumpster. The drawings were precise — not digital prints, but sketched by hand.",
    hint: "Who obsessively draws blueprints by hand?",
  },
  {
    id: 5,
    text: "All communication related to the crime was conducted through analog methods — handwritten notes, face-to-face meetings. Zero digital footprint.",
    hint: "This rules out anyone who operates digitally...",
    eliminates: [4], // reinforces Phantom elimination
  },
  {
    id: 6,
    text: 'A confidential informant revealed: "He always said he could design the perfect crime, just like he designs the perfect building. He wasn\'t joking."',
    hint: "The Architect... of crime itself.",
  },
];

// Client-safe suspects (no server secrets)
export const getClientSuspects = () =>
  suspects.map(({ id, name, alias, description, trait, color }) => ({
    id,
    name,
    alias,
    description,
    trait,
    color,
  }));

export const getClientClues = () =>
  clues.map(({ id, text, hint }) => ({ id, text, hint }));
