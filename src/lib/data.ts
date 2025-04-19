// src/lib/data.ts
import { GroupConcept, GroupTalent, Origin, Upbringing, Humanity, PlayerConcept, Talent, IconDefinition } from './types';

export const GROUP_CONCEPTS: GroupConcept[] = [
  {
    name: 'Free Traders',
    concepts: ['Negotiator (Peddler)', 'Pilot (Freighterpilot)', 'Scientist (Technician)', 'ShipWorker (Deckhand)', 'ShipWorker (Dock Worker)', 'Soldier (Legionnaire)']
  },
  {
    name: 'Mercenaries',
    concepts: ['Soldier (Officer)', 'Soldier (Legionnaire)', 'Trailblazer (Scout)', 'Pilot (Fighter Pilot)', 'Scientist (Technician)', 'Operative (Spy)']
  },
  {
    name: 'Explorers',
    concepts: ['Scientist (Archaeologist)', 'Trailblazer (Prospector)', 'Scientist (Technician)', 'Pilot (Freighter pilot)', 'Trailblazer (Scout)', 'DataSpider (Correspondent)']
  },
  {
    name: 'Agents',
    concepts: ['Operative (Spy)', 'Trailblazer (Scout)', 'Soldier (Officer)', 'Artist (Courtesan)', 'DataSpider (Correspondent)']
  },
  {
    name: 'Pilgrims',
    concepts: ['Preacher (Missionary)', 'Negotiator (Diplomat)', 'ShipWorker (Deckhand)', 'Artist (Courtesan)', 'Negotiator (Peddler)']
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
// Descriptions for each group talent, shown when selecting your group's shared ability
export const GROUP_TALENT_DESCRIPTIONS: { [key: string]: string } = {
  'A Nose for Birr': 'When trading, you get a +2 to Manipulation. One user per session for the whole group',
  'Everything is for Sale': 'You have a knack for finding the most corrupt public servants, toll officers, or guards, and always get a +2 to Manipulation when you are bribing someone',
  'Quickest Route': 'You find the quickest route. Travel takes half the amount of time, or one encounter alone the way may be ignored. The GM gets 1 DP per use. One use per journey.',
  'Assault': 'You get a +2 to Ranged Combat, but only when everyone in the group attacks the same target in the same turn.',
  'Charge': 'You get a +2 to Melee combat, but only when everyone in the group, in the same turn, also spends at least one fast action (1 AP) on movement. The bonus only lasts one turn.',
  'Situational Awareness': 'You can sense danger before it happens, gaining a bonus to initiative checks.',
  'A Friend in Every Port': 'You can find a useful contact in a new place. The contact can protect you, lend you gear, or vouch for you with local authorites. The GM gets 1 DP per use. One user per session for the whole group.',
  'Assassin\'s Guild': 'You can test infiltration instead of melee combat when you make a melee combat attack against an enemy who isn\'t aware of you.',
  'Dancers of Ahlam': 'You can text Dex instead of manipulation when trying to make a good impression.',
  'Seasoned Travelers': 'You can test manipulation instead of culture to understand a group\'s customs.',
  'Survivors': 'You can get out of a dangerous situation somehow connected to nature, such as a bushfire or explosive decompression. The whole group escapes danger. The GM gets 1 DP per use. One use per session.',
  'Truth Seekers': 'You can find important information or get a clue from the GM without rolling Dice. The information must be important enough to enable you to overcome a minor obstacle or challenge in a scenario. The GM gets 1 DP per use. One use per session for the whole group.',
  'Last Laugh': 'You can get yourselves out of a pinch using your knack for entertainment. The GM gets 1 DP per use. One use per session for the whole group.',
  'Mercy of the Icons': 'When you are in a tight spot, the Icons will hear you. This means that you can cancel the effects of a Darkness Points that have just been spent by the GM. One use per session for the whole group.',
  'One Last Birr': 'You can make a living out of your craft or performance. Test Dex instead of manipulation to find basic subsistence when in a new place.'
};

/**
 * Planetary origins available for characters
 */
export const ORIGINS: Origin[] = [
  { name: 'Algol', description: 'A planet of rebels, ruined by heavy industry and under draconian Consortium rule.' },
  { name: 'Mira', description: 'The cradle of Firstcome culture. Filled with temples, churches, and cloister palaces.' },
  { name: 'Kua', description: 'The center of the Horizon, home of the space station Coriolis.' },
  { name: 'Dabaran', description: 'A barren desert with ravine seraglios, oasis gardens, and domed palaces.' },
  { name: 'Zalos', description: 'Deeply devoted to the Icon the Martyr (an incarnation of the Judge), locked in constant civil war.' },
  { name: 'Other' }
];

/**
 * Home worlds classification (for PDF Origin box)
 */
export const HOME_WORLDS: Origin[] = [
  { name: 'Zenitian', description: 'Recent arrivals to the Third Horizon.' },
  { name: 'Firstcome', description: 'Established human population in the Third Horizon.' }
];

export const UPBRINGINGS: Upbringing[] = [
  { name: 'Plebian', repBase: 2, skillPoints: 8, attributePoints: 15, startingBirr: 500 },
  { name: 'Stationary', repBase: 4, skillPoints: 10, attributePoints: 14, startingBirr: 1000 },
  { name: 'Privileged', repBase: 6, skillPoints: 12, attributePoints: 13, startingBirr: 5000 }
];

export const HUMANITIES: Humanity[] = [
  { name: 'Pure-blood', repDivisor: 1, description: 'A human with in the normal genetic variation range.' },
  { name: 'Sirb',       repDivisor: 2, description: 'Get the Pheromones talent. Half reputation.' },
  { name: 'Xinghur',    repDivisor: 2, description: 'Get the Resistant talent. Half reputation.' },
  { name: 'Nerid',      repDivisor: 2, description: 'Get the Water Breathing talent. Half reputation.' }
];

export const PLAYER_CONCEPTS: PlayerConcept[] = [
  { name: 'Artist (Courtesan)', repBonus: 1, keyAttribute: 'Empathy', advancedSkills: ['Manipulation', 'Culture', 'Dexterity', 'Observation'] },
  { name: 'Artist (Musician)', repBonus: 1, keyAttribute: 'Empathy', advancedSkills: ['Manipulation', 'Culture', 'Infiltration', 'Observation'] },
  { name: 'Artist (Poet)', repBonus: 1, keyAttribute: 'Empathy', advancedSkills: ['Manipulation', 'Culture', 'Dexterity', 'Infiltration'] },
  { name: 'DataSpider (Analyst)', repBonus: 0, keyAttribute: 'Wits', advancedSkills: ['Data Djinn', 'Culture', 'Manipulation', 'Science'] },
  { name: 'DataSpider (Correspondent)', repBonus: 0, keyAttribute: 'Wits', advancedSkills: ['Culture', 'Manipulation', 'Infiltration', 'Observation'] },
  { name: 'DataSpider (Data Djinn)', repBonus: 0, keyAttribute: 'Wits', advancedSkills: ['Data Djinn', 'Manipulation', 'Observation', 'Science'] },
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
  { name: 'ShipWorker (Deckhand)', repBonus: -1, keyAttribute: 'Strength', advancedSkills: ['Force', 'Manipulation', 'Dexterity', 'Culture'] },
  { name: 'ShipWorker (Dock Worker)', repBonus: -1, keyAttribute: 'Strength', advancedSkills: ['Force', 'Melee Combat', 'Dexterity', 'Technology'] },
  { name: 'ShipWorker (Engineer)', repBonus: -1, keyAttribute: 'Strength', advancedSkills: ['Data Djinn', 'Force', 'Observation', 'Technology'] },
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
  { name: 'Exo Specialist', concepts: ['ShipWorker', 'Soldier'], description: 'You are an expert in exoskeleton operation.' },
  { name: 'Faction Standing', concepts: ['Negotiator', 'Preacher', 'Fugitive', 'Artist'], description: 'You have good standing with a particular faction.' },
  { name: 'Field Medicurg', concepts: ['Scientist', 'Operative'], description: 'You can provide emergency medical treatment in the field.' },
  { name: 'Gear Head', concepts: ['ShipWorker', 'DataSpider'], description: 'You have an intuitive understanding of machinery.' },
  { name: 'Intimidating', concepts: ['Soldier', 'Negotiator', 'DataSpider'], description: 'Your presence is intimidating to others.' },
  { name: 'Judge of Character', concepts: ['Negotiator', 'Fugitive', 'Preacher'], description: 'You can quickly assess someone\'s character.' },
  { name: 'Licensed', concepts: ['Scientist', 'Soldier', 'Negotiator', 'DataSpider', 'ShipWorker'], description: 'You hold official licenses for restricted activities.' },
  { name: 'Machinegunner', concepts: ['Soldier', 'Trailblazer'], description: 'You are skilled with automatic weapons.' },
  { name: 'Malicious', concepts: ['Preacher'], description: 'You can instill fear and doubt in others.' },
  { name: 'Nine Lives', concepts: ['Trailblazer'], description: 'You have an uncanny ability to survive dangerous situations.' },
  { name: 'Point Blank', concepts: ['Operative', 'Soldier', 'Trailblazer', 'Negotiator'], description: 'You excel at close-range combat.' },
  { name: 'Rapid Reload', concepts: ['Soldier', 'Operative', 'Trailblazer'], description: 'You can reload weapons with exceptional speed.' },
  { name: 'Rugged', concepts: ['Trailblazer', 'Soldier'], description: 'You are accustomed to harsh environments.' },
  { name: 'Seductive', concepts: ['Artist', 'ShipWorker'], description: 'You can charm and seduce others.' },
  { name: 'Sprinter', concepts: ['Operative', 'ShipWorker'], description: 'You can run faster than most people.' },
  { name: 'Soothing', concepts: ['Preacher', 'Negotiator', 'Fugitive'], description: 'You can calm others in tense situations.' },
  { name: 'Talisman Maker', concepts: ['Preacher', 'Negotiator'], description: 'You can create talismans with spiritual significance.' },
  { name: 'The Hassassin\'s Thrust', concepts: ['Operative', 'Soldier'], description: 'You are skilled at delivering precise, deadly strikes.' },
  { name: 'Third Eye', concepts: ['Trailblazer', 'Fugitive', 'Soldier'], description: 'You have heightened awareness of your surroundings.' },
  { name: 'Tough', concepts: ['Trailblazer', 'ShipWorker'], description: 'You can endure more physical punishment than most.' },
  { name: 'Wealthy Family', concepts: ['DataSpider'], description: 'You come from a wealthy family with connections.' },
  { name: 'Zero-G Training', concepts: ['Operative', 'Soldier', 'Pilot', 'ShipWorker'], description: 'You are trained to operate in zero-gravity environments.' }
];

// Inherent abilities granted by mutated humanities
export const HUMANITY_TALENTS: { name: string; description: string }[] = [
  { name: 'Pheromones', description: 'You have the ability to transmit and receive pheromones via enlarged dermal glands on your chest, neck or face. Get get a +2 to Manipulation. One use per session.' },
  { name: 'Resistant', description: 'Your body can endure extreme weather and other natural hazards. The talent counts as Armor with an Armor Rating of 6 against natural damage.' },
  { name: 'Water Breathing', description: 'You can breathe normally underwater.' }
];

/**
 * Icons available for characters. Each Icon has a name, description,
 * an associated talent name, and a description of that talent.
 */
export const ICONS: IconDefinition[] = [
  { name: 'The Lady of Tears', description: '', talent: 'Lady of Tears Talent', talentDescription: 'You can get back up after having been broken by damage or stress, and are immediately restored 1HP or 1MP. Alternatively, you can choose to ignore the effects of a critical injury when you suffer one. p.71' },
  { name: 'The Dancer', description: '', talent: 'Dancer Talent', talentDescription: 'You can evade an incoming attack, taking no damage. You can choose to activate the talent after a successful attack roll, but before you roll any cover or armor dice. p.71' },
  { name: 'The Deckhand', description: '', talent: 'Deckhand Talent', talentDescription: 'If your ship drops to zero hull points or energy points, you can restore D6 points of either kind instantly. This requires no action from you - it is the Icons intervening on your behalf.' },
  { name: 'The Gambler', description: '', talent: 'Gambler Talent', talentDescription: 'You are incredibly lucky and can choose to an automatic critical success on a skill test of your choice. It counds as if you had rolled three sixes. If it is an advanced skill, you still need a level of at least 1 in that skill to activate the talent. p.72' },
  { name: 'The Merchant', description: '', talent: 'Merchant Talent', talentDescription: 'You can find a favorable loan enabling you to purchase an expensive object or a ship module. This loan must be paid back within the agreed upon timeframe.' },
  { name: 'The Traveler', description: '', talent: 'Traveler Talent', talentDescription: 'You can ask the GM about a choice you have to make in the game. It has to be a choice with only two options. The GM must answer truthfully which of the two is the most beneficial to you, if that is at all possible to estimate.' },
  { name: 'The Messenger', description: '', talent: 'Messenger Talent', talentDescription: 'You can make someone obey you, through careful words and actions, without having to test manipulation. Can be used on post NPCs and PCs. Your wish must be reasonable, you cannot for example force an NPC to act completely against their own interests.' },
  { name: 'The Judge', description: '', talent: 'Judge Talent', talentDescription: 'You deal an automatic critcal injury when your attack hits, regardless of whether the attack penetrated cover and armor. Any other effects from the attack are resolved as usual.' },
  { name: 'The Faceless', description: '', talent: 'Faceless Talent', talentDescription: 'Fate is on your side, giving you the benefit of getting to change a single, concerete detail in a scene more to your favor. It must be something that has a cosmetic or indirectly helpful effect - you cannot make an enemy disappear, buit you can decide that there is a knife within reach, or that a window has been left open. The GM has final say on what is possible to accomplish with the talent. You can only use this talent once per session.' }
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
