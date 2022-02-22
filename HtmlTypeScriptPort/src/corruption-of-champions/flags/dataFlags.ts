// So, a bit of weirdness about these game flags. They're constants because of how the save files work. When the player reaches an area where a flag
// would come into play, Data.addToGameFlags() is called with these flags. This function fills an array full of these constant names and a value.
// That's what the game grabs when a save is loaded. So, while it may seem smart to change all of these into variables, don't!

//The default value for all of these flags is zero. To change the value of a flag, you have to call liveData.gameFlags[NAMEOFFLAG] = int or whatever
// it's getting set to. If you use addToGameFlags and set flags in this way, your values will be saved.

//------------
// META FLAGS
//------------
export const SFW_MODE = 'SFW_Mode'; // Is the game in SFW mode?

//------------
// STATS
//------------
export const TIMES_TRANSFORMED = 'Times_Transformed';
export const TIMES_ORGASMED = 'Times_Orgasmed';
export const PC_FETISH = 'PC_Fetish'; // Used in lust attack in combatTeases file
export const IMPS_KILLED = 'Imps_Killed'; // How many Imps has the player killed?
export const COMBAT_BONUS_XP_VALUE = 'Combat_Bonus_XP_Value';
export const SLIME_CRAVING = 'Slime_Craving'; // Replaces Slime Craving status effect.
export const GOOGIRL_BIRTHS = 'GooGirl_Births';
export const HORSE_WARNING = 'Horse_Warning'; // In Danger of Drinking Too Much Equinum

//------------
// MISC
//------------
export const HAIR_GROWTH_STOPPED_BECAUSE_LIZARD = 'Hair_Growth_Stopped';
export const EVER_INFESTED = 'Ever_Infested'; // Has the PC ever been infested with worms?
export const MEANINGLESS_CORRUPTION = 'Meaningless_Corruption'; //Unknown, used in Goblin victory code.
export const INFESTED = 'Infested'; // Currently infested with worms.
export const HYPER_HAPPY = 'Hyper_Happy';
export const PREGNANCY_CORRUPTION = 'Pregnancy_Corruption'; // Used in Phouka pregnancy

//------------
// CODEX
//------------
//Codex Entry, will be used at a point.
export const CODEX_ENTRY_ANEMONES = 'Codex_Entry_Anemones';
export const CODEX_ENTRY_ARACHNES = 'Codex_Entry_Arachnes';
export const CODEX_ENTRY_BEHEMOTH = 'Codex_Entry_Behemoth';
export const CODEX_ENTRY_ECHIDNAS = 'Codex_Entry_Echidnas';
export const CODEX_ENTRY_FETISHFOLLOWERS = 'Codex_Entry_FetishFollowers';
export const CODEX_ENTRY_GIANTBEES = 'Codex_Entry_GiantBees';
export const CODEX_ENTRY_GOBLINS = 'Codex_Entry_Goblins';
export const CODEX_ENTRY_GOOGIRLS = 'Codex_Entry_GooGirls';
export const CODEX_ENTRY_HARPIES = 'Codex_Entry_Harpies';
export const CODEX_ENTRY_HELLHOUNDS = 'Codex_Entry_Hellhounds';
export const CODEX_ENTRY_IMPS = 'Codex_Entry_Imps';
export const CODEX_ENTRY_LABOVINES = 'Codex_Entry_Labovines';
export const CODEX_ENTRY_LIZANS = 'Codex_Entry_Lizans';
export const CODEX_ENTRY_MAGIC = 'Codex_Entry_Magic';
export const CODEX_ENTRY_MINOTAURS = 'Codex_Entry_Minotaurs';
export const CODEX_ENTRY_NAGAS = 'Codex_Entry_Nagas';
export const CODEX_ENTRY_ORCS = 'Codex_Entry_Orcs';
export const CODEX_ENTRY_RHINOCEROS = 'Codex_Entry_Rhinoceros';
export const CODEX_ENTRY_SALAMANDERS = 'Codex_Entry_Salamanders';
export const CODEX_ENTRY_SANDWITCHES = 'Codex_Entry_SandWitches';
export const CODEX_ENTRY_SATYRS = 'Codex_Entry_Satyrs';
export const CODEX_ENTRY_SHARKGIRLS = 'Codex_Entry_SharkGirls';
export const CODEX_ENTRY_SUCCUBUS = 'Codex_Entry_Succubus';
export const CODEX_ENTRY_ZEBRAS = 'Codex_Entry_Zebras';

//------------
// CAMP FLAGS
//------------

export const CAMP_WALL_PROGRESS = 'Camp_Wall_Progress';

//------------
// SPELLS
//------------

//export const KNOWS_AROUSE                      = "Knows_Arouse";
//export const KNOWS_HEAL                        = "Knows_Heal";
//export const KNOWS_MIGHT                       = "Knows_Might";
//export const KNOWS_CHARGE                      = "Knows_Charge";
//export const KNOWS_BLIND                       = "Knows_Blind";
//export const KNOWS_WHITEFIRE                   = "Knows_Whitefire";

export const SPELLS_CAST = 'Spells_Cast';

//------------
// FOLLOWERS
//------------
//Rathazul
export const RATHAZUL_MET = 'Rathazul_Met';
export const RATHAZUL_CAMP = 'Rathazul_Camp';
export const RATHAZUL_PURCHASE_COUNTER = 'Rathazul_Purchase_Counter';
export const RATHAZUL_ARMOUR_COUNTER = 'Rathazul_Armour_Counter';

//Jojo
export const JOJO_MET = 'Jojo_Met';
export const JOJO_CAMP = 'Jojo_Camp';
export const JOJO_CORRUPTION_STAGE = 'Jojo_Corruption_Stage'; //5 indicates he's mentally broken and corrupted. -3 indicates sex scenes unlocked.
export const JOJO_RAPE_COUNTER = 'Jojo_Rape_Counter';
export const JOJO_MEDITATION_COUNTER = 'Jojo_Meditation_Counter';
export const JOJO_TRAINING_COUNTER = 'Jojo_Training_Counter';
export const JOJO_TRAINING_UNLOCKED = 'Jojo_Training_Unlocked';
export const JOJO_NIGHT_WATCH = 'Jojo_Night_Watch';
export const JOJO_BIMBO_STATE = 'Jojo_Bimbo_State';

//Marble
export const MARBLE_MET = 'Marble_Met';
export const MARBLE_CAMP = 'Marble_Camp';
export const MARBLE_ADDICTION = 'Marble_Addiction';
export const MARBLE_AFFECTION = 'Marble_Affection';
export const MARBLE_WARNING = 'Marble_Warning';
export const NO_MORE_MARBLE = 'No_More_Marble';
export const MARBLE_RAPE_ATTEMPTED = 'Marble_Rape_Attempted';
export const MURBLE_FARM_TALK_LEVELS = 'Marble_Farm_Talk_Levels';

//Amily
export const AMILY_VILLAGE_ACCESSIBLE = 'Amily_Village_Accessible'; // Can you access the Town Ruins?
export const AMILY_VILLAGE_EXPLORED = 'Amily_Village_Explored'; // How many times has the TownRuins been explored? Used in achievement.
export const AMILY_MET = 'Amily_Met'; // Has Amily been met yet?
export const AMILY_PC_GENDER = 'Amily_PC_Gender'; // Used for gender checks with Amily to switch between scenes.
export const AMILY_MET_AS = 'Amily_Met_As'; // Marks the player gender that met with Amily.
export const AMILY_OFFER_ACCEPTED = 'Amily_Offer_Accepted'; // You've taken up Amily's offer to breed her.
export const AMILY_AFFECTION = 'Amily_Affection'; // Amily's Affection level toward PC.
export const AMILY_OFFERED_DEFURRY = 'Amily_Offered_Defurry'; // Refused Amily's offer because she's a mouse.
export const AMILY_FUCK_COUNTER = 'Amily_Fuck_Counter'; // How many times you fucked Amily.
export const AMILY_NOT_FURRY = 'Amily_Not_Furry'; // If active, Amily has been defurred.
export const AMILY_WANG_LENGTH = 'Amily_Wang_Length'; // Amily is a herm. Measures her penis length.
export const AMILY_PREGNANCY_TYPE = 'Amily_Pregnancy_Type'; // What is Amily pregnant with?
export const AMILY_INCUBATION = 'Amily_Incubation';
export const AMILY_BUTT_PREGNANCY_TYPE = 'Amily_Butt_Pregnancy_Type';
export const AMILY_OVIPOSITED_COUNTDOWN = 'Amily_Oviposited_Countdown';
export const AMILY_GROSSED_OUT_BY_WORMS = 'Amily_Grossed_Out_By_Worms';
export const AMILY_FOLLOWER = 'Amily_Follower';
export const AMILY_ALLOWS_FERTILITY = 'Amily_Allows_Fertility';
export const FOLLOWER_AT_FARM_AMILY = 'Follower_At_Farm_Amily';
export const AMILY_CORRUPT_FLIPOUT = 'Amily_Corrupt_Flipout';
export const AMILY_VILLAGE_ENCOUNTERS_DISABLED = 'Amily_Village_Encounters_Disabled';
export const AMILY_CONFESSED_LESBIAN = 'Amily_Confessed_Lesbian';
export const AMILY_TIMES_FUCKED_FEMPC = 'Amily_Times_Fucked_FemPC';
export const AMILY_WANG_GIRTH = 'Amily_Wang_Girth';
export const AMILY_HERM_TIMES_FUCKED_BY_FEMPC = 'Amily_Herm_Times_Fucked_By_FemPC';
export const AMILY_HERM_QUEST = 'Amily_Herm_Quest';
export const PC_TIMES_BIRTHED_AMILYKIDS = 'PC_Times_Birthed_Amilykids';
export const AMILY_VISITING_URTA = 'Amily_Visiting_Urta';
export const CREATE_POTENT_MIXTURE = 'Amily_Drank_Potent_Mixture';
export const AMILY_BIRTH_TOTAL = 'Amily_Birth_Total';
export const AMILY_CORRUPTION_PATH = 'Amily_Corruption_Path';
export const AMILY_TREE_FLIPOUT = 'Amily_Tree_Flipout';
export const AMILY_CUP_SIZE = 'Amily_Cup_Size';
export const AMILY_NIPPLE_LENGTH = 'Amily_Nipple_Length';
export const AMILY_HIP_RATING = 'Amily_Hip_Rating';
export const AMILY_ASS_SIZE = 'Amily_Ass_Size';
export const AMILY_VAGINAL_WETNESS = 'Amily_Vaginal_Wetness';
export const AMILY_CLOTHING = 'Amily_Clothing';

//=================
// PREGNANCY FLAGS
//
// Note that these are actual constants, not called by liveData.gameFlags yet until the pregnancy system is figured out.
//=================

// Base incubation values for a pregnancy
export const INCUBATION_MOUSE = 350; // Incubation time for mice types/Amily
export const INCUBATION_DRIDER = 400;
export const INCUBATION_BEE = 48;
export const INCUBATION_IMP = 432; //Time for standard imps. Imp lords, Ceraph, Lilium and the imp horde cause slightly faster pregnancies

// Pregnancy event arrays
export const INCUBATION_MOUSE_EVENT = [336, 280, 216, 180, 120, 72, 48, 32]; // Event flags for Mouse Pregnancy
export const INCUBATION_AMILY_EVENT = [150, 120, 100, 96, 90, 72, 48]; // Special array for Amily pregnancy in Town Ruins.
export const INCUBATION_SAND_WITCH_EVENT = [142, 96];
export const INCUBATION_TAMANI_EVENT = [219, 96, 48];

// Pregnancy types. Marks who did the impregnation
// export const PREGNANCY_PLAYER = "Player" // Marks the player impregnated someone
// export const PREGNANCY_AMILY = "Amily"
export const PREGNANCY_BEE_EGGS = 'Bee_Eggs';
export const PREGNANCY_DRIDER_EGGS = 'Drider_Eggs';
export const PREGNANCY_IMP = 'Imp';
export const PREGNANCY_OVIELIXIR_EGGS = 'Ovielixir_Eggs';
export const PREGNANCY_ANEMONE = 'Anemone';

// Misc Pregnancy flags
export const PC_PENDING_PREGGERS = 'PC_Pending_Preggers'; // Unsure what this is for. Used in Amily Herm Quest.

//------------
// ENCOUNTERS
//------------
//--[[ NON-COMBAT ]]--
//Callu
export const MET_OTTERGIRL = 'Met_OtterGirl';

//Giacomo
export const GIACOMO_MET = 'Giacomo_Met';
export const GIACOMO_WORMS_OFFERED = 'Giacomo_Worms_Offered';

//Lumi
export const LUMI_MET = 'Lumi_Met';

//Marcus & Lucia
export const WANDERER_MET = 'Wanderer_Met';
export const WANDERER_DEMON = 'Wanderer_Demon';
export const WANDERER_EPILOGUE = 'Wanderer_Epilogue';

//Tamani and Tamani's Daughters
export const TAMANI_MET = 'Tamani_Met';
export const TAMANI_TIME_OUT = 'Tamani_Time_Out';
export const TAMANI_BAD_ENDED = 'Tamani_Bad_Ended';
export const TAMANI_DAUGHTER_PREGGO_COUNTDOWN = 'Tamani_Daughter_Preggo_Countdown';
export const TAMANI_NUMBER_OF_DAUGHTERS = 'Tamani_Number_Of_Daughters';
export const TAMANI_TIMES_HYPNOTIZED = 'Tamani_Times_Hypnotized';
export const TAMANI_DEFEAT_COUNTER = 'Tamani_Defeat_Counter';
export const TAMANI_TIMES_IMPREGNATED = 'Tamani_Times_Impregnated';
export const TAMANI_PREGNANCY_COUNT = 'Tamani_Pregnancy_Count'; //Current litter
export const TIMES_OVIPOSITED_TAMANI = 'Times_Oviposited_Tamani';

//Whitney & Farm
export const FARM_DISABLED = 'Farm_Disabled';
export const FARM_CORRUPTION_STARTED = 'Farm_Corruption_Started';
export const MET_WHITNEY = 'Met_Whitney';
export const WHITNEY_FLIPPED_OUT_OVER_KELLY = 'Whitney_Flipped_Out_Over_Kelly';

export const KELT_MET = 'Kelt_Met';
export const KELT_SUBMISSIVENESS = 'Kelt_Submissiveness';
export const NEVER_RESIST_KELT = 'Never_Resist_Kelt';
export const KELT_BAD_END_WARNING = 'Kelt_Bad_End_Warning';
export const KELT_DISABLED = 'Kelt_Disabled';
export const KELT_KILLED = 'Kelt_Killed';
export const KELT_BREAK_LEVEL = 'Kelt_Break_Level';
export const KELLY_CUNT_TYPE = 'Kelly_Cunt_Type';
export const KELLY_COCK_SIZE = 'Kelly_Cock_Size';
export const TIMES_PUNISHED_KELLY = 'Times_Punished_Kelly';
export const TIMES_RIM_JOBBED_BY_KELLY = 'Times_Rim_Jobbed_By_Kelly';
export const TIMES_RIDDEN_KELLY_FOR_PUNISHMENT = 'Times_Ridden_Kelly_For_Punishment';
export const KELLY_BONUS_TIT_ROWS = 'Kelly_Bonus_Tits_Row';
export const KELLY_LACTATING = 'Kelly_Lactating';
export const KELLY_DISOBEYING_COUNTER = 'Kelly_Disobeying_Counter';
export const KELLY_VAGINALLY_FUCKED_COUNT = 'Kelly_Vaginally_Fucked_Count';

//--[[ COMBAT ]]--
//Minotaur
export const MINOTAUR_TF2 = 'Minotaur_TF2'; //One-time silly mode scene.
export const MINOTAUR_AND_COWGIRL = 'Minotaur_And_CowGirl';

export const HAS_SEEN_MINO_AND_COWGIRL = 'Has_Seen_Mino_And_Cowgirl';
export const MINOTAUR_CUM_ADDICT = 'Minotaur_Cum_Addict'; // Replacment for status effect. Marks if you are an addict or not.
export const MINOTAUR_CUM_ADDICTION_STATE = 'Minotaur_Cum_Addiction_State'; // What stage of addiction are you at?
export const MINOTAUR_CUM_ADDICTION_TRACKER = 'Minotaur_Cum_Addiction_Tracker'; //How much cum? (0-120)
export const TIME_SINCE_LAST_CONSUMED_MINOTAUR_CUM = 'Time_Since_Last_Consumed_Minotaur_Cum'; // Timer for cum problems
export const EVER_DRANK_MINOCUM = 'Ever_Drank_Minocum'; // Used for playerinfo menu
export const MINOTAUR_CUM_REALLY_ADDICTED_STATE = 'Minotaur_Cum_Really_Addicted_State';

//Naga
export const NAGA_LAST_ENCOUNTERED_AS_NAGA = 'Naga_Last_Encountered_As_Naga'; //0 indicates player isn't naga, 1 indicates player is naga, 2 indicates player is naga but hostile.
export const NAGA_FUCKED_AS_NAGA = 'Naga_Fucked_As_Naga';

//Sand Trap
export const SANDTRAP_LOSS_REPEATS = 'Sandtrap_Loss_Repeats'; //Used for Sandtrap bad end tracking
export const TIMES_ENCOUNTERED_SAND_TRAPS = 'Times_Encountered_Sand_Traps';
export const TRAP_LEVEL = 'Trap_Level'; // What level of the sand trap are you on?
export const CLIMBED_TRAP_THIS_ROUND = 'Climbed_Trap_This_Round'; // Did you try climbing this round?
export const FERTILE_SANDTRAP = 'Fertile_Sandtrap';

//Sand Witch
export const SAND_WITCH_RAPED = 'Sand_Witch_Raped';

//Bee Girl
export const BEE_GIRL_COMBAT_WINS_WITHOUT_RAPE = 'Bee_Girl_Combat_Wins_Without_Rape';
export const BEE_GIRL_COMBAT_WINS_WITH_RAPE = 'Bee_Girl_Combat_Wins_With_Rape';
export const BEE_GIRL_COMBAT_LOSSES = 'Bee_Girl_Combat_Losses';
export const BEE_BAD_END_WARNING = 'Bee_Bad_End_Warning';
export const FORCE_BEE_TO_PRODUCE_HONEY = 'Force_Bee_To_Produce_Honey';

//Goo Girl
export const GOOGIRL_CONSECUTIVE_LOSSES = 'GooGirl_Consecutive_Losses';
export const TIMES_FUCKED_NORMAL_GOOS = 'Times_Fucked_Normal_Goos';
export const GOO_TFED_MEAN = 'Goo_TFed_Mean';
export const GOO_TFED_NICE = 'Goo_TFed_Nice';
export const PC_KNOWS_ABOUT_BLACK_EGGS = 'PC_Knows_About_Black_Eggs'; //May need to move this one, and possibly integrate with Amily?
export const TIMES_THOUGHT_ABOUT_GOO_RECRUITMENT = 'Times_Thought_About_Goo_Recruitment';

//Green Goo
export const TIMES_MET_OOZE = 'Times_Met_Ooze';

//Oasis Demons
export const OASIS_DEMONS_ACCEPT = 'Oasis_Demons_Accept';

//Tentacle Beast
export const TENTACLE_COOL_DOWN = 'Tentacle_Cool_Down';
export const TENTACLE_BIND = 'Tentacle_Bind';
export const TENTACLE_BAD_END = 'Tentacle_Bad_End';
export const TENTACLE_GENDERLESS_CENTAUR = 'Tentacle_Genderless_Centaur'; //Unknown flag 00247;

//Worms

export const WORM_INFEST_ATTEMPTED = 'Worm_Infest_Attempted';
export const MET_WORMS = 'Met_Worms';
export const WORMS_FETISH = 'Worms_Fetish'; //0 = Not Encountered, 1 = Partially on, 2 = Fully on, 3 = Off

//------------
// KEY ITEMS
//------------
// Racks

export const HAS_KEY_ITEM = 'Has_Key_Item'; // Does the player have any key items?
export const HAS_ARMOR_RACK = 'Has_Armor_Rack'; // Does the player have the armor rack?
export const HAS_WEAPON_RACK = 'Has_Weapon_Rack'; // Does the player have the weapon rack?
export const HAS_EQUIPMENT_RACK = 'Has_Equipment_Rack'; // Does the player have the equipment rack?

//---------
// PLOT VARIABLES
//---------

export const FACTORY_SHUTDOWN = 'Factory_Shutdown'; // Is the factory on, shut down, or destroyed?

//---------
// PLAYER TRANSFORMATIONS
//---------

export const HAS_BLACK_NIPPLES = 'Has_Black_Nipples';

// export { FLAG }
