// src/lib/types.ts (just updating the Character interface)
export interface Character {
  name: string;
  concept: string;
  origin: string;
  upbringing: string;
  personalProblem: string;
  groupConcept: string;
  groupTalent: string;
  talent: string;
  icon: string;
  humanity: string;
  
  // Attributes
  strength: number;
  agility: number;
  wits: number;
  empathy: number;
  
  // Skills
  force: number;
  meleeCombat: number;
  infiltration: number;
  dexterity: number;
  rangedCombat: number;
  observation: number;
  survival: number;
  manipulation: number;
  pilot: number;
  medicurgy: number;
  dataDjinn: number;
  technology: number;
  science: number;
  mysticPowers: number;
  culture: number;
  command: number;

  iconTalent: string;
  
  // Other stats
  reputation: number;
  
  // Description and portrait
  appearance: string;
  portraitPrompt: string;
  portraitUrl?: string;
  localPortraitUrl?: string; // Added this field for storing data URLs
}

export interface AppState {
  step: number;
  totalPlayers: number;
  currentPlayerIndex: number;
  groupConcept: string;
  groupTalent: string;
  characters: Character[];
}

export interface GroupConcept {
  name: string;
  concepts: string[];
}

export interface GroupTalent {
  name: string;
  concepts: string[];
}

export interface Origin {
  name: string;
  description: string;
}

export interface Upbringing {
  name: string;
  repBase: number;
  skillPoints: number;
}

export interface Humanity {
  name: string;
  repDivisor: number;
}

export interface PlayerConcept {
  name: string;
  repBonus: number;
  keyAttribute: string;
  advancedSkills: string[];
}

export interface Talent {
  name: string;
  concepts: string[];
  description: string;
}