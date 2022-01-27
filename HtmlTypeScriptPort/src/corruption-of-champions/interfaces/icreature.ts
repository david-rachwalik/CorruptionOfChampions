import { ENUM, IItem, KeyItem, KeyItemType, Perk, PerkType, StatusEffect, StatusEffectType, Ass, Cock, Vagina, BreastRow, CharacterType } from 'coc';

interface ICreature {
  //Name and references
  type: CharacterType;
  a: string;
  name: string;
  refName: string;
  isAre: string;
  heShe: string;
  himHer: string;
  hisHer: string;
  plural: boolean;
  battleDesc: string;

  //Core stats
  str: number;
  tou: number;
  spe: number;
  inte: number;
  lib: number;
  sens: number;
  cor: number;

  //Combat stats (Delete when declaring a new mob except for changing initial stats)
  HP: number;
  lust: number;
  fatigue: number;

  //Advancement
  level: number;
  XP: number;
  gems: number;

  //Battle variables
  weapon: IItem;
  shield: IItem;
  armor: IItem;
  upperGarment: IItem;
  lowerGarment: IItem;
  accessory1: IItem;
  accessory2: IItem;

  bonusHP: number;
  additionalXP: number;
  lustVuln: number;
  temperment: number;

  drops: IItem[];
  dropThresholds: number[];

  //Appearance
  gender: number; //0 genderless, 1 male, 2 female, 3 hermaphrodite
  tallness: number; //Height in inches
  skinTone: string;
  skinType: number;
  skinAdj: string;
  skinDesc: string;
  hairType: number;
  hairColor: string;
  hairLength: number;
  beardStyle: number;
  beardLength: number;
  furColor: string;

  //Head
  earType: number;
  earValue: number;
  eyeType: number;
  faceType: number;
  tongueType: number;

  //Body
  lowerBody: number;
  legCount: number;
  armType: number;

  //Extra parts
  antennae: number;
  clawType: number;
  clawTone: string;
  hornType: number;
  horns: number;
  gills: boolean;
  tailType: number;
  tailVenom: number;
  tailRecharge: number;
  wingType: number;
  wingDesc: string;
  venom: number;

  femininity: number;
  tone: number;
  thickness: number;
  hipRating: number;

  //Sexual Characteristics
  //Cocks
  cocks: Cock[];
  balls: number;
  ballSize: number;
  hoursSinceCum: number;
  cumMultiplier: number;
  //Vaginas
  vaginas: Vagina[];
  // Pregnancy
  pregnancyType: number;
  pregnancyIncubation: number;
  pregnancyEventArr: number[];
  pregnancyEventNum: number;
  buttPregnancyType: number;
  buttPregnancyIncubation: number;
  buttPregnancyEventArr: number[];
  buttPregnancyEventNum: number;
  fertility: number;
  //Ass
  ass: Ass;
  buttRating: number;
  //Breasts
  breastRows: BreastRow[];
  lactationMultiplier: number;
  nippleLength: number;
  nipplesPierced: number;

  keyItems: KeyItem[];
  statusEffects: StatusEffect[];
  perks: Perk[];

  //Victory/defeat
  victory: (a: any) => void;
  defeat: (a: any) => void;

  // Getter/Setter
  clitLength: number;

  doAI: () => void;
  attack: () => void;
  victoryScene: () => void;
  defeatScene: () => void;
  maxHP: () => number;
  maxLust: () => number;
  maxFatigue: () => number;
  HPRatio: () => number;
  baseDamage: () => number;
  criticalChance: () => number;
  spellMod: () => number;
  baseXP: () => number;
  bonusXP: () => number;
  getAwardableXP: () => number;
  modStats: (...args: any[]) => void;
  dynStats: (...args: any[]) => void;
  changeHP: (amount: number, display?: boolean, newpg?: boolean) => void;
  changeLust: (amount: number, display?: boolean, newpg?: boolean, resisted?: boolean) => void;
  changeFatigue: (amount: number, display?: boolean, newpg?: boolean) => void;
  damageToughnessModifier: (displayMode?: boolean) => number;
  damagePercent: (displayMode?: boolean, applyModifiers?: boolean) => number;
  teased: (lustDelta: number) => void;
  outputDefaultTeaseReaction: (lustDelta: number) => void;
  orgasm: () => void;
  clearDrops: () => void;
  addDrop: (item: IItem, chance: number) => void;
  dropItem: () => IItem | null;
  getTotalDropPercents: () => number;
  createPerk: (ptype: PerkType, value1: number, value2: number, value3: number, value4: number) => void;
  removePerk: (ptype: PerkType) => boolean;
  findPerk: (ptype: PerkType) => number;
  perkValue: (ptype: PerkType, value: number) => number;
  addPerkValue: (ptype: PerkType, valueIdx: number, bonus: number) => void;
  setPerkValue: (ptype: PerkType, valueIdx: number, newNum: number) => void;
  createStatusEffect: (stype: StatusEffectType, value1: number, value2: number, value3: number, value4: number) => void;
  removeStatusEffect: (stype: StatusEffectType) => void;
  findStatusEffect: (stype: StatusEffectType) => number;
  statusEffectValue: (stype: StatusEffectType, value: number) => number;
  addStatusValue: (stype: StatusEffectType, valueIdx: number, bonus: number) => void;
  changeStatusValue: (stype: StatusEffectType, valueIdx: number, newNum: number) => void;
  createKeyItem: (ktype: KeyItemType, value1: number, value2: number, value3: number, value4: number) => void;
  removeKeyItem: (ktype: KeyItemType) => void;
  hasKeyItem: (ktype: KeyItemType) => number;
  keyValue: (ktype: KeyItemType, value: number) => number;
  addKeyValue: (ptype: PerkType, valueIdx: number, bonus: number) => void;
  setKeyValue: (ptype: PerkType, valueIdx: number, newNum: number) => void;
  hasCock: () => boolean;
  cockTotal: () => number;
  totalCocks: () => number;
  hasVagina: () => boolean;
  hasVirginVagina: () => boolean;
  vaginaTotal: () => number;
  wetness: () => number;
  vaginaType: (newType?: number) => number;
  looseness: (vag?: boolean) => number;
  vaginalCapacity: () => number;
  analCapacity: () => number;
  hasFuckableNipples: () => boolean;
  hasBreasts: () => boolean;
  hasNipples: () => boolean;
  lactationSpeed: () => number;
  biggestLactation: () => number;
  milked: () => void;
  boostLactation: (todo: number) => number;
  averageLactation: () => number;
  lactationQ: () => number;
  isLactating: () => boolean;
  cumQ: () => number;
  cumCapacity: () => number;
  inHeat: boolean;
  inRut: boolean;
  bonusFertility: () => number;
  totalFertility: () => number;
  countCocksOfType: (type: number) => number;
  findFirstCockType: (ctype: number) => number;
  biggestTitSize: () => number;
  cockThatFits: (capacity: number) => number;
  cockArea: (i_cockIndex: number) => number;
  biggestCockLength: () => number;
  biggestCockArea: () => number;
  biggestCockArea2: () => number;
  longestCock: () => number;
  longestCockLength: () => number;
  twoDickRadarSpecial: (width: number) => boolean;
  totalCockThickness: () => number;
  thickestCock: () => number;
  thickestCockThickness: () => number;
  thinnestCockIndex: () => number;
  smallestCockIndex: () => number;
  smallestCockLength: () => number;
  shortestCockIndex: () => number;
  shortestCockLength: () => number;
  // cockThatFits: (i_fits, type) => number
  cockThatFits2: (fits?: number) => number;
  smallestCockArea: () => number;
  smallestCock: () => number;
  biggestCockIndex: () => number;
  biggestCockIndex2: () => number;
  smallestCockIndex2: () => number;
  biggestCockIndex3: () => number;
  breastCup: (rowNum: number) => string;
  bRows: () => number;
  totalBreasts: () => number;
  totalNipples: () => number;
  smallestTitSize: () => number;
  smallestTitRow: () => number;
  biggestTitRow: () => number;
  averageBreastSize: () => number;
  averageCockThickness: () => number;
  averageNippleLength: () => number;
  averageVaginalLooseness: () => number;
  averageVaginalWetness: () => number;
  averageCockLength: () => number;
  canTitFuck: () => boolean;
  mostBreastsPerRow: () => number;
  averageNipplesPerBreast: () => number;
  allBreastsDescript: () => string;
  sMultiCockDesc: () => string;
  SMultiCockDesc: () => string;
  oMultiCockDesc: () => string;
  OMultiCockDesc: () => string;
  cockMultiLDescriptionShort: () => string;
  hasSheath: () => boolean;
  hasKnot: (arg?: number) => boolean;
  dogCocks: () => void;
  cockHead: (cockNum?: number) => string;
  createCock: (clength?: number, cthickness?: number, ctype?: ENUM.CockType) => void;
  createVagina: (virgin?: boolean, vagwetness?: number, vaglooseness?: number) => void;
  createBreastRow: (size?: number, nipplesPerBreast?: number) => void;
  removeCock: (arraySpot?: number, totalRemoved?: number) => void;
  removeVagina: (arraySpot?: number, totalRemoved?: number) => void;
  removeBreastRow: (arraySpot?: number, totalRemoved?: number) => void;
  shrinkTits: (ignore_hyper_happy?: boolean) => void;
  growTits: (amount: number, rowsGrown: number, display: boolean, growthType: number) => void;
  genderCheck: () => void;
  changeCockType: (type: number) => number;
  cuntChange: (cArea: number, display: boolean, spacingsF?: boolean, spacingsB?: boolean) => void;
  cuntChangeNoDisplay: (cArea: number) => boolean;
  cuntChangeDisplay: () => void;
  buttChange: (cArea: number, display: boolean, spacingsF?: boolean, spacingsB?: boolean) => boolean;
  buttChangeNoDisplay: (cArea: number) => boolean;
  buttChangeDisplay: () => void;
  genderText: (male?: string, female?: string, futa?: string, eunuch?: string) => string;
  manWoman: (caps?: boolean) => string;
  mfn: (male: string, female: string, neuter: string) => string;
  mf: (male: string, female: string) => string;
  maleFemaleHerm: (caps?: boolean) => string;
  isBiped: () => boolean;
  isNaga: () => boolean;
  isTaur: () => boolean;
  isDrider: () => boolean;
  isGoo: () => boolean;
  legs: () => string;
  leg: () => string;
  feet: () => string;
  foot: () => string;
  skinFurScales: () => string;
  faceDesc: () => string;
  modFem: (goal: number, strength?: number) => string;
  modThickness: (goal: number, strength?: number) => string;
  modTone: (goal: number, strength?: number) => string;
  fixFemininity: () => string;
  hasBeard: () => boolean;
  beard: () => string;
  skin: (noAdj?: boolean, noTone?: boolean) => string;
  hasMuzzle: () => boolean;
  face: () => string;
  hasLongTail: () => boolean;
  hasLongTongue: () => boolean;
  canFly: () => boolean;
  isPregnant: () => boolean;
  isButtPregnant: () => boolean;
  cockDescript: (x: number) => string;
  cockDescriptShort: (x: number) => string;
  multiCockDescriptLight: () => string;
  ballDescript: () => string;
  ballsDescript: () => string;
  ballsDescriptLight: (forcedSize?: boolean) => string;
  sackDescript: () => string;
  vaginaDescript: (x?: number) => string;
  allVaginaDescript: () => string;
  clitDescript: () => string;
  chestDesc: () => string;
  allChestDesc: () => string;
  breastDescript: (x: number) => string;
  nippleDescript: (x: number) => string;
  hairDescript: () => string;
  beardDescript: () => string;
  hairOrFur: () => string;
  hipDescript: () => string;
  assDescript: () => string;
  assholeDescript: () => string;
  buttDescript: () => string;
  tongueDescript: () => string;
  tailDescript: () => string;
  oneTailDescript: () => string;
  wingsDescript: () => string;
  knockUp: (type: number, incubation?: number, beat?: number, arg?: number, event?: []) => void;
  buttKnockUp: (type?: number, incubation?: number, beat?: number, arg?: number) => void;
  buttKnockUpForce: (type?: number, incubation?: number, event?: []) => void;
  knockUpForce: (type?: number, incubation?: number, event?: []) => void;
  eventFill: (events: number[]) => void;
  pregnancyAdvance: () => void;
  canOvipositSpider: () => boolean;
  canOvipositBee: () => boolean;
  canOviposit: () => boolean;
  eggs: () => number;
  addEggs: (arg: number) => number;
  setEggs: (arg: number) => number;
  fertilizedEggs: () => number;
  fertilizeEggs: () => number;
  dumpEggs: () => void;
  minoCumAddiction: (raw: number) => void;
  minotaurAddicted: () => boolean;
  minotaurNeed: () => boolean;
  gooColor(colorType: number): string;
}

export { ICreature };
