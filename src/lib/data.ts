// src/lib/data.ts
import { GroupConcept, GroupTalent, Origin, Upbringing, Humanity, PlayerConcept, Talent } from './types';

export const GROUP_CONCEPTS: GroupConcept[] = [
  {
    name: 'Free Traders',
    concepts: ['Negotiator (Peddler)', 'Pilot (Freighterpilot)', 'Scientist (Technician)', 'Ship Worker (Deckhand)', 'Ship Worker (Dock Worker)', 'Soldier (Legionnaire)']
  },
  {
    name: 'Mercenaries',
    concepts: ['Soldier (Officer)', 'Soldier (Legionnaire)', 'Trailblazer (Scout)', 'Pilot (Fighter Pilot)', 'Scientist (Technician)', 'Operative (Spy)']
  },
  {
    name: 'Explorers',
    concepts: ['Scientist (Archaeologist)', 'Trailblazer (Prospector)', 'Scientist (Technician)', 'Pilot (Freighter pilot)', 'Trailblazer (Scout)', 'Data Spider (Correspondent)']
  },
  {
    name: 'Agents',
    concepts: ['Operative (Spy)', 'Trailblazer (Scout)', 'Soldier (Officer)', 'Artist (Courtesan)', 'Data Spider (Correspondent)']
  },
  {
    name: 'Pilgrims',
    concepts: ['Preacher (Missionary)', 'Negotiator (Diplomat)', 'Ship Worker (Deckhand)', 'Artist (Courtesan)', 'Negotiator (Peddler)']
  }
];

export const GROUP_TALENTS: GroupTalent[] = [
  {
    name: 'Free Traders',
    concepts: ['A Nose for Birr', 'Everything is for Sale', 'Quickest Route']
  },
  {
    name: 'Mercenaries',
    concepts: ['Assault', 'Charge', 'Situational Awareness']
  },
  {
    name: 'Agents',
    concepts: ['A Friend in Every Port', 'Assassin\'s Guild', 'Dancers of Ahlam']
  },
  {
    name: 'Explorers',
    concepts: ['Seasoned Travelers', 'Survivors', 'Truth Seekers']
  },
  {
    name: 'Pilgrims',
    concepts: ['Last Laugh', 'Mercy of the Icons', 'One Last Birr']
  }
];

export const ORIGINS: Origin[] = [
  { name: 'Algol' },
  { name: 'Mira' },
  { name: 'Kua' },
  { name: 'Dabaran' },
  { name: 'Zalos' },
  { name: 'Random' }
];

export const UPBRINGINGS: Upbringing[] = [
  { name: 'Plebian', repBase: 2, skillPoints: 8 },
  { name: 'Stationary', repBase: 4, skillPoints: 10 },
  { name: 'Privileged', repBase: 6, skillPoints: 12 }
];

export const HUMANITIES: Humanity[] = [
  { name: 'Pure-blood', repDivisor: 1 },
  { name: 'Sirb', repDivisor: 2 },
  { name: 'Xinghur', repDivisor: 2 },
  { name: 'Nerid', repDivisor: 2 }
];

export const PLAYER_CONCEPTS: PlayerConcept[] = [
  { name: 'Artist (Courtesan)', repBonus: 1, keyAttribute: 'Empathy', advancedSkills: ['Manipulation', 'Culture', 'Dexterity', 'Observation'] },
  { name: 'Artist (Musician)', repBonus: 1, keyAttribute: 'Empathy', advancedSkills: ['Manipulation', 'Culture', 'Infiltration', 'Observation'] },
  { name: 'Artist (Poet)', repBonus: 1, keyAttribute: 'Empathy', advancedSkills: ['Manipulation', 'Culture', 'Dexterity', 'Infiltration'] },
  { name: 'Data Spider (Analyst)', repBonus: 0, keyAttribute: 'Wits', advancedSkills: ['Data Djinn', 'Culture', 'Manipulation', 'Science'] },
  { name: 'Data Spider (Correspondent)', repBonus: 0, keyAttribute: 'Wits', advancedSkills: ['Culture', 'Manipulation', 'Infiltration', 'Observation'] },
  { name: 'Data Spider (Data Djinn)', repBonus: 0, keyAttribute: 'Wits', advancedSkills: ['Data Djinn', 'Manipulation', 'Observation', 'Science'] },
  { name: 'Fugitive (Criminal)', repBonus: -2, keyAttribute: 'Empathy', advancedSkills: ['Force', 'Melee Combat', 'Dexterity', 'Infiltration'] },
  { name: 'Fugitive (Mystic)', repBonus: -2, keyAttribute: 'Empathy', advancedSkills: ['Manipulation', 'Mystic Powers', 'Dexterity', 'Infiltration'] },
  { name: 'Fugitive (Revolutionary)', repBonus: -2, keyAttribute: 'Empathy', advancedSkills: ['Ranged Combat', 'Dexterity', 'Observation', 'Survival'] },
  { name: 'Negotiator (Agitator)', repBonus: 1, keyAttribute: 'Empathy', advancedSkills: ['Data Djinn', 'Force', 'Manipulation', 'Culture'] },
  { name: 'Negotiator (Diplomat)', repBonus: 1, keyAttribute: 'Empathy', advancedSkills: ['Command', 'Culture', 'Manipulation', 'Melee Combat'] },
  { name: 'Negotiator (Peddler)', repBonus: 1, keyAttribute: 'Empathy', advancedSkills: ['Culture', 'Manipulation', 'Observation', 'Pilot'] },
  { name: 'Operative (Spy)', repBonus: 0, keyAttribute: 'Agility', advancedSkills: ['Data Djinn', 'Manipulation', 'Infiltration', 'Ranged Combat'] },
  { name: 'Operative (Guard)', repBonus: 0, keyAttribute: 'Agility', advancedSkills: ['Force', 'Melee Combat', 'Ranged Combat', 'Observation'] },
  { name: 'Operative (Assassin)', repBonus: 0, keyAttribute: 'Agility', advancedSkills: ['Data Djinn', 'Manipulation', 'Infiltration', 'Ranged Combat'] },
  { name: 'Pilot (Driver)', repBonus: 0, keyAttribute: 'Agility', advancedSkills: ['Force', 'Pilot', 'Ranged Combat', 'Survival'] },
  { name: 'Pilot (Fighter Pilot)', repBonus: 0, keyAttribute: 'Agility', advancedSkills: ['Data Djinn', 'Pilot', 'Ranged Combat', 'Technology'] },
  { name: 'Pilot (Freighter Pilot)', repBonus: 0, keyAttribute: 'Agility', advancedSkills: ['Data Djinn', 'Force', 'Pilot', 'Technology'] },
  { name: 'Preacher (Ascetic)', repBonus: 1, keyAttribute: 'Empathy', advancedSkills: ['Force', 'Culture', 'Dexterity', 'Science'] },
  { name: 'Preacher (Missionary)', repBonus: 1, keyAttribute: 'Empathy', advancedSkills: ['Culture', 'Manipulation', 'Dexterity', 'Survival'] },
  { name: 'Preacher (Prophet)', repBonus: 1, keyAttribute: 'Empathy', advancedSkills: ['Force', 'Culture', 'Manipulation', 'Observation'] },
  { name: 'Scientist (Archaeologist)', repBonus: 1, keyAttribute: 'Wits', advancedSkills: ['Culture', 'Observation', 'Science', 'Survival'] },
  { name: 'Scientist (Medicurg)', repBonus: 1, keyAttribute: 'Wits', advancedSkills: ['Medicurgy', 'Manipulation', 'Observation', 'Science'] },
  { name: 'Scientist (Technician)', repBonus: 1, keyAttribute: 'Wits', advancedSkills: ['Force', 'Technology', 'Observation', 'Science'] },
  { name: 'Ship Worker (Deckhand)', repBonus: -1, keyAttribute: 'Strength', advancedSkills: ['Force', 'Manipulation', 'Dexterity', 'Culture'] },
  { name: 'Ship Worker (Dock Worker)', repBonus: -1, keyAttribute: 'Strength', advancedSkills: ['Force', 'Melee Combat', 'Dexterity', 'Technology'] },
  { name: 'Ship Worker (Engineer)', repBonus: -1, keyAttribute: 'Strength', advancedSkills: ['Data Djinn', 'Force', 'Observation', 'Technology'] },
  { name: 'Soldier (Legionnaire)', repBonus: -1, keyAttribute: 'Agility', advancedSkills: ['Force', 'Melee Combat', 'Ranged Combat', 'Survival'] },
  { name: 'Soldier (Mercenary)', repBonus: -1, keyAttribute: 'Agility', advancedSkills: ['Melee Combat', 'Dexterity', 'Observation', 'Ranged Combat'] },
  { name: 'Soldier (Officer)', repBonus: -1, keyAttribute: 'Agility', advancedSkills: ['Command', 'Culture', 'Melee Combat', 'Ranged Combat'] },
  { name: 'Trailblazer (Colonist)', repBonus: 0, keyAttribute: 'Wits', advancedSkills: ['Force', 'Dexterity', 'Ranged Combat', 'Survival'] },
  { name: 'Trailblazer (Prospector)', repBonus: 0, keyAttribute: 'Wits', advancedSkills: ['Pilot', 'Technology', 'Science', 'Survival'] },
  { name: 'Trailblazer (Scout)', repBonus: 0, keyAttribute: 'Wits', advancedSkills: ['Infiltration', 'Ranged Combat', 'Observation', 'Survival'] }
];

export const TALENTS: Talent[] = [
  { name: 'Blessing', concepts: ['Preacher'], description: 'You can bless people and items, providing spiritual comfort.' },
  { name: 'Combat Veteran', concepts: ['Soldier', 'Trailblazer', 'Operative'], description: 'Your extensive combat experience gives you an edge in battle.' },
  { name: 'Defensive', concepts: ['Operative', 'Fugitive', 'Soldier', 'Pilot'], description: 'You excel at defensive maneuvers in combat.' },
  { name: 'Executioner', concepts: ['Soldier', 'Operative'], description: 'You are skilled at delivering lethal blows.' },
  { name: 'Exo Specialist', concepts: ['Ship Worker', 'Soldier'], description: 'You are an expert in exoskeleton operation.' },
  { name: 'Faction Standing', concepts: ['Negotiator', 'Preacher', 'Fugitive', 'Artist'], description: 'You have good standing with a particular faction.' },
  { name: 'Field Medicurg', concepts: ['Scientist', 'Operative'], description: 'You can provide emergency medical treatment in the field.' },
  { name: 'Gear Head', concepts: ['Ship Worker', 'Data Spider'], description: 'You have an intuitive understanding of machinery.' },
  { name: 'Intimidating', concepts: ['Soldier', 'Negotiator', 'Data Spider'], description: 'Your presence is intimidating to others.' },
  { name: 'Judge of Character', concepts: ['Negotiator', 'Fugitive', 'Preacher'], description: 'You can quickly assess someone\'s character.' },
  { name: 'Licensed', concepts: ['Scientist', 'Soldier', 'Negotiator', 'Data Spider', 'Ship Worker'], description: 'You hold official licenses for restricted activities.' },
  { name: 'Machinegunner', concepts: ['Soldier', 'Trailblazer'], description: 'You are skilled with automatic weapons.' },
  { name: 'Malicious', concepts: ['Preacher'], description: 'You can instill fear and doubt in others.' },
  { name: 'Nine Lives', concepts: ['Trailblazer'], description: 'You have an uncanny ability to survive dangerous situations.' },
  { name: 'Point Blank', concepts: ['Operative', 'Soldier', 'Trailblazer', 'Negotiator'], description: 'You excel at close-range combat.' },
  { name: 'Rapid Reload', concepts: ['Soldier', 'Operative', 'Trailblazer'], description: 'You can reload weapons with exceptional speed.' },
  { name: 'Rugged', concepts: ['Trailblazer', 'Soldier'], description: 'You are accustomed to harsh environments.' },
  { name: 'Seductive', concepts: ['Artist', 'Ship Worker'], description: 'You can charm and seduce others.' },
  { name: 'Sprinter', concepts: ['Operative', 'Ship Worker'], description: 'You can run faster than most people.' },
  { name: 'Soothing', concepts: ['Preacher', 'Negotiator', 'Fugitive'], description: 'You can calm others in tense situations.' },
  { name: 'Talisman Maker', concepts: ['Preacher', 'Negotiator'], description: 'You can create talismans with spiritual significance.' },
  { name: 'The Hassassin\'s Thrust', concepts: ['Operative', 'Soldier'], description: 'You are skilled at delivering precise, deadly strikes.' },
  { name: 'Third Eye', concepts: ['Trailblazer', 'Fugitive', 'Soldier'], description: 'You have heightened awareness of your surroundings.' },
  { name: 'Tough', concepts: ['Trailblazer', 'Ship Worker'], description: 'You can endure more physical punishment than most.' },
  { name: 'Wealthy Family', concepts: ['Data Spider'], description: 'You come from a wealthy family with connections.' },
  { name: 'Zero-G Training', concepts: ['Operative', 'Soldier', 'Pilot', 'Ship Worker'], description: 'You are trained to operate in zero-gravity environments.' }
];

export const ICONS = [
  'The Lady of Tears',
  'The Dancer',
  'The Deckhand',
  'The Gambler',
  'The Merchant',
  'The Traveler',
  'The Messenger',
  'The Judge',
  'The Faceless'
];

export const PERSONAL_PROBLEMS = [
  'Addiction',
  'Debt',
  'Nemesis',
  'Wanted',
  'Illness',
  'Poverty',
  'Stigma',
  'Trauma'
];

export const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const calculateReputation = (upbringing: Upbringing, concept: PlayerConcept, humanity: Humanity): number => {
  return Math.floor((upbringing.repBase + concept.repBonus) / humanity.repDivisor);
};

export const getAvailableTalents = (concept: string): Talent[] => {
  const conceptType = concept.split(' ')[0];
  return TALENTS.filter(talent => talent.concepts.includes(conceptType));
};
