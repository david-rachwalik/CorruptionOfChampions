import { Storage } from './engine/storage';
import { Time } from './engine/time';
import * as FLAG from './flags/dataFlags';
import { Item, ItemContainer } from './itemClass';
import { ItemSlot } from './itemSlotClass';
import { KeyItemType } from './keyItemClass';
import { KeyItemTypeContainer } from './keyItemLib';
import { Creature } from './models/creature';
import { Player } from './models/player';
import { PerkType } from './perkClass';
import { PerkTypeContainer } from './perkLib';
import * as SandWitchScene from './scenes/areas/desert/sandWitch';
import * as TamaniScene from './scenes/areas/forest/tamani';
import * as AmilyScene from './scenes/npcs/amily';
import { StatusEffectType } from './statusEffectClass';
import { StatusEffectTypeContainer } from './statusEffectLib';

class Exploration {
  explored: number;
  exploredForest: number;
  exploredLake: number;
  exploredDesert: number;
  exploredMountain: number;

  constructor() {
    this.explored = 0;
    this.exploredForest = 0;
    this.exploredLake = 0;
    this.exploredDesert = 0;
    this.exploredMountain = 0;
  }
}

class GameContext {
  //Variables that can be set as development progresses.
  gameVersion: string;
  saveVersion: number;
  levelCap: number;
  //Game settings
  storage: Storage;
  debug: boolean;
  silly: boolean;
  hyperHappy: boolean;
  lowStandards: boolean;
  hungerEnabled: boolean; // realistic mode
  SFWMode: boolean;
  // Player tracking (starting appearance, stats points available to distribute)
  originalGender: number;
  originalRace: string;
  statPoints: number;
  perkPoints: number;
  //Interface settings
  use12Hours: boolean;
  useMetrics: boolean;
  //Store data for fonts
  buttonFont: string;
  mainFont: string;
  mainFontSizeArray: string[];
  mainFontSizeIndex: number;
  //Core variables
  player: Player;
  playerMenu: any;
  gameStarted: boolean;
  shiftKeyDown: boolean;

  time: Time;
  exploration: Exploration;

  //Lookup calls originated in UTIL
  Items: ItemContainer;
  ItemLib: { [key: string]: Item }; //Hold item IDs for purpose of looking up or for save data.
  KeyItems: KeyItemTypeContainer;
  KeyItemIDs: { [key: string]: KeyItemType }; //Hold key item IDs for purpose of looking up.
  PerkLib: PerkTypeContainer;
  PerkIDs: { [key: string]: PerkType }; //Hold perk IDs for purpose of looking up.
  StatusEffects: StatusEffectTypeContainer;
  StatusEffectIDs: { [key: string]: StatusEffectType }; //Hold status effect IDs for purpose of looking up.

  gameFlags: { [key: string]: number };
  // pregnancyProgression: PregnancyProgression

  amily: AmilyScene.Amily;
  sexForced: boolean;
  tamanipreg: TamaniScene.Tamani;
  sandWitch: SandWitchScene.SandWitch;
  beeGirlAttitude: number;
  bowSkill: number;

  // Combat
  readonly nullCreature: Creature;
  monster: Creature;
  currentTurn: number;
  currentRound: number;

  //Inventory
  itemSlots: ItemSlot[];
  currentItemSlot?: ItemSlot;
  callNext: (() => void) | null;
  callOnAbandon: (() => void) | null;

  constructor() {
    //Variables that can be set as development progresses.
    this.gameVersion = '0.1.2 alpha';
    this.saveVersion = 1; //If this value is increased, the saves will be upgraded to accommodate the new changes.
    this.levelCap = 5; //Determines the maximum level a player can attain. This will be raised as dungeons are added.

    //Game settings
    this.storage = new Storage();
    this.debug = false;
    this.silly = false;
    this.hyperHappy = false;
    this.lowStandards = false;
    this.hungerEnabled = false;
    this.SFWMode = false;

    //Interface settings
    this.use12Hours = false;
    this.useMetrics = false;

    //Store data for fonts
    this.buttonFont = 'Papyrus';
    this.mainFont = 'Times New Roman';
    this.mainFontSizeArray = ['0.6em', '0.7em', '0.8em', '0.9em', '1em', '1.1em', '1.2em', '1.3em', '1.4em'];
    this.mainFontSizeIndex = 4; //Goes from 0 to 8. Will be used to pick font size from array.

    //Core variables
    this.player = new Player();
    this.playerMenu = null;
    this.gameStarted = false; //Determine if game has already started
    this.shiftKeyDown = false;

    this.time = new Time();
    // Global array for loading in pregnancies and other things that are time sensitive.
    // this.timeAware = []

    this.exploration = new Exploration();

    //Lookup calls (originated in UTIL)
    this.Items = new ItemContainer();
    this.KeyItems = new KeyItemTypeContainer();
    this.PerkLib = new PerkTypeContainer();
    this.StatusEffects = new StatusEffectTypeContainer();
    this.ItemLib = {}; //Hold item IDs for purpose of looking up or for save data.
    this.KeyItemIDs = {}; //Hold key item IDs for purpose of looking up.
    this.PerkIDs = {}; //Hold perk IDs for purpose of looking up.
    this.StatusEffectIDs = {}; //Hold status effect IDs for purpose of looking up.

    //NPC variables
    //let flags = [0] * 3000; //For legacy purposes only.
    // let gameFlags = []
    this.gameFlags = {};
    // this.pregnancyProgression = new PregnancyProgression()

    this.amily = new AmilyScene.Amily(); // Used for Pregnancy tracking
    this.sexForced = false; // AmilyScene: used to get around a nasty bug
    // Add a pregnancy event array NEW CODE
    this.amily.eventFill(FLAG.INCUBATION_AMILY_EVENT);
    this.tamanipreg = new TamaniScene.Tamani(); //Constant instance of TamaniScene.Tamani solely for pregnancy tracking. There may be a better way to do this.
    this.sandWitch = new SandWitchScene.SandWitch();
    this.beeGirlAttitude = 9;
    this.bowSkill = 0;

    // Player tracking (starting appearance, stats points available to distribute)
    this.originalGender = 0;
    this.originalRace = 'human';
    this.statPoints = 0;
    this.perkPoints = 0;

    // Combat
    this.nullCreature = new Creature();
    this.monster = this.nullCreature;
    this.currentTurn = 0;
    this.currentRound = 0;

    //Inventory
    this.currentItemSlot;
    this.itemSlots = [];
    //Slots 0-9 are player inventory. Slots 10-55 are for gear storage options. See inventory.js for details
    // Initializing it here makes things easier.
    for (let i = 0; i < 56; i++) {
      this.itemSlots.push(new ItemSlot());
    }

    this.callNext = null;
    this.callOnAbandon = null;
  }

  advanceMinutes(minutes: number) {
    //if (timeAware.length > 0) { // If there's a function in timeAware
    //	for (i = 0; i < timeAware.length; i++) {
    //		timeAware[i].advanceTime(minutes);

    //	}
    for (let i = 0; i < minutes; i++) {
      this.time.increment();
      // TODO: reactivate when game is stable (really call for each every minute?)
      // this.player.pregnancyAdvance(); // Advances the Player's pregnancy.
      // this.amily.pregnancyAdvance(); // Advances AmilyScene.Amily's pregnancy.
      // this.tamanipreg.pregnancyAdvance(); //Advances TamaniScene.Tamani's pregnancy.
    }
    //pregnancyProgression.updatePregnancy(); // Outputs the results of the Player's pregnancy flags once time passes.
  }

  advanceHours(hours: number) {
    this.advanceMinutes(hours * 60);
  }

  //Lookup calls (originated in UTIL) (e.g. UTIL.lookupItem to liveData.lookupItem)
  lookupItem(id: string) {
    return this.ItemLib[id];
  }
  lookupKeyItem(id: string) {
    return this.KeyItemIDs[id];
  }
  lookupPerk(id: string) {
    return this.PerkIDs[id];
  }
  lookupStatusEffects(id: string) {
    return this.StatusEffectIDs[id];
  }
}

export { GameContext };
