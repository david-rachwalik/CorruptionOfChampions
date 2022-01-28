export * from 'coc/flags/appearanceEnums';

enum CharacterType {
  Unassigned,
  Creature,
  Player,
}

// export const ITEM_TYPE_WEAPON = 'Weapon';
// export const ITEM_TYPE_ARMOUR = 'Armour';
// export const ITEM_TYPE_UNDERGARMENT = 'Undergarment';
// export const ITEM_TYPE_CONSUMABLE = 'Consumable';
// export const ITEM_TYPE_MATERIAL = 'Material';
// export const ITEM_TYPE_SHIELD = 'Shield';

enum ItemType {
  Weapon,
  Armour,
  Undergarment,
  Consumable,
  Material,
  Shield,
}

/*
    Pregnancy Enums
 */

//Pregancy types. Both butt and normal. Each type represents the father of this baby.
enum PregnancyType {
  MINOTAUR = 2,
  MOUSE = 4,
  HELL_HOUND = 6,
  CENTAUR = 7,
  MARBLE = 8,
  BUNNY = 9,

  AMILY = 11,
  IZMA = 12,
  SPIDER = 13,
  BASILISK = 14,

  GOO_GIRL = 16,
  EMBER = 17,
  BENOIT = 18,
  SATYR = 19,
  COTTON = 20,
  URTA = 21,
  SAND_WITCH = 22,
  FROG_GIRL = 23,
  FAERIE = 24, //Indicates you are carrying either a phouka or faerie baby. Which one is determined by the CORRUPTION flag
  PLAYER = 25, // Marks the player impregnated someone. Will be used when an NPC is able to have children from multiple different fathers.

  SANDTRAP_FERTILE = 27,
  SANDTRAP = 28,
  JOJO = 29, //So we can track them separately from other mouse pregnancies
  KELT = 30, //So we can track them separately from other centaur pregnancies
  TAOTH = 31,
  GOO_STUFFED = 32, //Used to fill the player's ass and/or vagina when Valeria has a goo girl take up residence. This prevents any other form of pregnancy from taking hold. Does not respond to ovielixirs.
  WORM_STUFFED = 33, //Used to fill the player's vagina when the worms take up residence. This prevents any other form of pregnancy from taking hold. Does not respond to ovielixirs.
  MINERVA = 34,
  BEHEMOTH = 35,
  PHOENIX = 36,
  ANDY = 37, //This is functionally the same as Satyr but less corrupt. 10% chance of fauns, if ever implemented.
}

enum PregType {
  PREG_NOT_PREGANT = 0, //The PREG_* consts are returned by the size function
  PREG_NO_SIGNS_UNKNOWN, //NPC has conceived but doesn’t know she’s pregnant, no visible signs
  PREG_NO_SIGNS_KNOWN, //NPC is in the first trimester, knows she’s pregnant
  PREG_START_BULGE, //NPC is in the first trimester, belly is just starting to bulge
  PREG_SWOLLEN, //NPC is in the second trimester, belly is small but definitely swollen
  PREG_SIZEABLE, //NPC is in the second trimester, belly is now sizable
  PREG_BLATANT, //NPC is in the third trimester, belly is blatantly bulging
  PREG_FULL_TERM, //NPC is in the third trimester, belly is big as it will get for a normal pregnancy
  PREG_OVERDUE, //NPC is overdue. Usually means a centaur baby, twins or some similar condition. Effectively looks 10 months pregnant
  PREG_VERY_OVERDUE, //NPC is very overdue. Probably triplets or more. Effectively looks 11 months pregnant
  //Old Value, replaced in Saves.unFuckSave()        BUTT_BEE              =   2;
  //Old Value, replaced in Saves.unFuckSave()        BUTT_DRIDER           =   3;
  //Old Value, replaced in Saves.unFuckSave()        BUTT_SANDTRAP_FERTILE =   4;
  //Old Value, replaced in Saves.unFuckSave()        BUTT_SANDTRAP         =   5; //Sandtrap did not have fertilized eggs
}

enum IncubationType {
  MINOTAUR = 432,

  OVIELIXIR_EGGS = 50,
  HELL_HOUND = 352,
  CENTAUR = 420,
  MARBLE = 368,
  BUNNY_BABY = 200,
  BUNNY_EGGS = 808, //High time indicates neon egg pregnancy
  ANEMONE = 256,
  IZMA = 300,
  SPIDER = 400,
  BASILISK = 250,

  GOO_GIRL = 85,
  EMBER = 336,
  SATYR = 160,
  COTTON = 350,
  URTA = 515,
  SAND_WITCH = 360,
  FROG_GIRL = 30,
  FAERIE = 200,
  SANDTRAP = 42,
  HARPY = 168,
  SHIELA = 72,
  SALAMANDER = 336,
  MINERVA = 216,
  BEHEMOTH = 1440, //Sorry Behemoth, but Isabella wins.
  PHOENIX = 168,
  KIHA = 384,
  ISABELLA = 2160, //Longest pregnancy ever.
}

export { CharacterType, ItemType, PregnancyType, PregType, IncubationType };
