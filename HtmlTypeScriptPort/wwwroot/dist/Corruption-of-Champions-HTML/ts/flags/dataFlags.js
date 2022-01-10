// So, a bit of weirdness about these game flags. They're constants because of how the save files work. When the player reaches an area where a flag would come into play, addToGameFlags() is called with these flags. This function fills an array full of these constant names and a value. That's what the game grabs when a save is loaded. So, while it may seem smart to change all of these into variables, don't!
//The default value for all of these flags is zero. To change the value of a flag, you have to call gameFlags[NAMEOFFLAG] = int or whatever it's getting set to. If you use addToGameFlags and set flags in this way, your values will be saved.
class FLAG {
}
//------------
// META FLAGS
//------------
FLAG.SFW_MODE = "SFW_Mode"; // Is the game in SFW mode?
//------------
// STATS
//------------
FLAG.TIMES_TRANSFORMED = "Times_Transformed";
FLAG.TIMES_ORGASMED = "Times_Orgasmed";
FLAG.PC_FETISH = "PC_Fetish"; // Used in lust attack in combatTeases file
FLAG.IMPS_KILLED = "Imps_Killed"; // How many Imps has the player killed?
FLAG.COMBAT_BONUS_XP_VALUE = "Combat_Bonus_XP_Value";
FLAG.SLIME_CRAVING = "Slime_Craving"; // Replaces Slime Craving status effect.
FLAG.GOOGIRL_BIRTHS = "GooGirl_Births";
FLAG.HORSE_WARNING = "Horse_Warning"; // In Danger of Drinking Too Much Equinum
//------------
// MISC
//------------
FLAG.HAIR_GROWTH_STOPPED_BECAUSE_LIZARD = "Hair_Growth_Stopped";
FLAG.EVER_INFESTED = "Ever_Infested"; // Has the PC ever been infested with worms?
FLAG.MEANINGLESS_CORRUPTION = "Meaningless_Corruption"; //Unknown, used in Goblin victory code.
FLAG.INFESTED = "Infested"; // Currently infested with worms.
FLAG.HYPER_HAPPY = "Hyper_Happy";
FLAG.PREGNANCY_CORRUPTION = "Pregnancy_Corruption"; // Used in Phouka pregnancy
//------------
// CODEX
//------------
//Codex Entry, will be used at a point.
FLAG.CODEX_ENTRY_ANEMONES = "Codex_Entry_Anemones";
FLAG.CODEX_ENTRY_ARACHNES = "Codex_Entry_Arachnes";
FLAG.CODEX_ENTRY_BEHEMOTH = "Codex_Entry_Behemoth";
FLAG.CODEX_ENTRY_ECHIDNAS = "Codex_Entry_Echidnas";
FLAG.CODEX_ENTRY_FETISHFOLLOWERS = "Codex_Entry_FetishFollowers";
FLAG.CODEX_ENTRY_GIANTBEES = "Codex_Entry_GiantBees";
FLAG.CODEX_ENTRY_GOBLINS = "Codex_Entry_Goblins";
FLAG.CODEX_ENTRY_GOOGIRLS = "Codex_Entry_GooGirls";
FLAG.CODEX_ENTRY_HARPIES = "Codex_Entry_Harpies";
FLAG.CODEX_ENTRY_HELLHOUNDS = "Codex_Entry_Hellhounds";
FLAG.CODEX_ENTRY_IMPS = "Codex_Entry_Imps";
FLAG.CODEX_ENTRY_LABOVINES = "Codex_Entry_Labovines";
FLAG.CODEX_ENTRY_LIZANS = "Codex_Entry_Lizans";
FLAG.CODEX_ENTRY_MAGIC = "Codex_Entry_Magic";
FLAG.CODEX_ENTRY_MINOTAURS = "Codex_Entry_Minotaurs";
FLAG.CODEX_ENTRY_NAGAS = "Codex_Entry_Nagas";
FLAG.CODEX_ENTRY_ORCS = "Codex_Entry_Orcs";
FLAG.CODEX_ENTRY_RHINOCEROS = "Codex_Entry_Rhinoceros";
FLAG.CODEX_ENTRY_SALAMANDERS = "Codex_Entry_Salamanders";
FLAG.CODEX_ENTRY_SANDWITCHES = "Codex_Entry_SandWitches";
FLAG.CODEX_ENTRY_SATYRS = "Codex_Entry_Satyrs";
FLAG.CODEX_ENTRY_SHARKGIRLS = "Codex_Entry_SharkGirls";
FLAG.CODEX_ENTRY_SUCCUBUS = "Codex_Entry_Succubus";
FLAG.CODEX_ENTRY_ZEBRAS = "Codex_Entry_Zebras";
//------------
// CAMP FLAGS
//------------
FLAG.CAMP_WALL_PROGRESS = "Camp_Wall_Progress";
//------------
// SPELLS
//------------
//static readonly KNOWS_AROUSE                      = "Knows_Arouse";
//static readonly KNOWS_HEAL                        = "Knows_Heal";
//static readonly KNOWS_MIGHT                       = "Knows_Might";
//static readonly KNOWS_CHARGE                      = "Knows_Charge";
//static readonly KNOWS_BLIND                       = "Knows_Blind";
//static readonly KNOWS_WHITEFIRE                   = "Knows_Whitefire";
FLAG.SPELLS_CAST = "Spells_Cast";
//------------
// FOLLOWERS
//------------
//Rathazul
FLAG.RATHAZUL_MET = "Rathazul_Met";
FLAG.RATHAZUL_CAMP = "Rathazul_Camp";
FLAG.RATHAZUL_PURCHASE_COUNTER = "Rathazul_Purchase_Counter";
FLAG.RATHAZUL_ARMOUR_COUNTER = "Rathazul_Armour_Counter";
//Jojo
FLAG.JOJO_MET = "Jojo_Met";
FLAG.JOJO_CAMP = "Jojo_Camp";
FLAG.JOJO_CORRUPTION_STAGE = "Jojo_Corruption_Stage"; //5 indicates he's mentally broken and corrupted. -3 indicates sex scenes unlocked.
FLAG.JOJO_RAPE_COUNTER = "Jojo_Rape_Counter";
FLAG.JOJO_MEDITATION_COUNTER = "Jojo_Meditation_Counter";
FLAG.JOJO_TRAINING_COUNTER = "Jojo_Training_Counter";
FLAG.JOJO_TRAINING_UNLOCKED = "Jojo_Training_Unlocked";
FLAG.JOJO_NIGHT_WATCH = "Jojo_Night_Watch";
FLAG.JOJO_BIMBO_STATE = "Jojo_Bimbo_State";
//Marble
FLAG.MARBLE_MET = "Marble_Met";
FLAG.MARBLE_CAMP = "Marble_Camp";
FLAG.MARBLE_ADDICTION = "Marble_Addiction";
FLAG.MARBLE_AFFECTION = "Marble_Affection";
FLAG.MARBLE_WARNING = "Marble_Warning";
FLAG.NO_MORE_MARBLE = "No_More_Marble";
FLAG.MARBLE_RAPE_ATTEMPTED = "Marble_Rape_Attempted";
FLAG.MURBLE_FARM_TALK_LEVELS = "Marble_Farm_Talk_Levels";
//Amily
FLAG.AMILY_VILLAGE_ACCESSIBLE = "Amily_Village_Accessible"; // Can you access the Town Ruins?
FLAG.AMILY_VILLAGE_EXPLORED = "Amily_Village_Explored"; // How many times has the TownRuins been explored? Used in achievement.
FLAG.AMILY_MET = "Amily_Met"; // Has Amily been met yet?
FLAG.AMILY_PC_GENDER = "Amily_PC_Gender"; // Used for gender checks with Amily to switch between scenes.
FLAG.AMILY_MET_AS = "Amily_Met_As"; // Marks the player gender that met with Amily.
FLAG.AMILY_OFFER_ACCEPTED = "Amily_Offer_Accepted"; // You've taken up Amily's offer to breed her.
FLAG.AMILY_AFFECTION = "Amily_Affection"; // Amily's Affection level toward PC.
FLAG.AMILY_OFFERED_DEFURRY = "Amily_Offered_Defurry"; // Refused Amily's offer because she's a mouse.
FLAG.AMILY_FUCK_COUNTER = "Amily_Fuck_Counter"; // How many times you fucked Amily.
FLAG.AMILY_NOT_FURRY = "Amily_Not_Furry"; // If active, Amily has been defurred.
FLAG.AMILY_WANG_LENGTH = "Amily_Wang_Length"; // Amily is a herm. Measures her penis length.
FLAG.AMILY_PREGNANCY_TYPE = "Amily_Pregnancy_Type"; // What is Amily pregnant with?
FLAG.AMILY_INCUBATION = "Amily_Incubation";
FLAG.AMILY_BUTT_PREGNANCY_TYPE = "Amily_Butt_Pregnancy_Type";
FLAG.AMILY_OVIPOSITED_COUNTDOWN = "Amily_Oviposited_Countdown";
FLAG.AMILY_GROSSED_OUT_BY_WORMS = "Amily_Grossed_Out_By_Worms";
FLAG.AMILY_FOLLOWER = "Amily_Follower";
FLAG.AMILY_ALLOWS_FERTILITY = "Amily_Allows_Fertility";
FLAG.FOLLOWER_AT_FARM_AMILY = "Follower_At_Farm_Amily";
FLAG.AMILY_CORRUPT_FLIPOUT = "Amily_Corrupt_Flipout";
FLAG.AMILY_VILLAGE_ENCOUNTERS_DISABLED = "Amily_Village_Encounters_Disabled";
FLAG.AMILY_CONFESSED_LESBIAN = "Amily_Confessed_Lesbian";
FLAG.AMILY_TIMES_FUCKED_FEMPC = "Amily_Times_Fucked_FemPC";
FLAG.AMILY_WANG_GIRTH = "Amily_Wang_Girth";
FLAG.AMILY_HERM_TIMES_FUCKED_BY_FEMPC = "Amily_Herm_Times_Fucked_By_FemPC";
FLAG.AMILY_HERM_QUEST = "Amily_Herm_Quest";
FLAG.PC_TIMES_BIRTHED_AMILYKIDS = "PC_Times_Birthed_Amilykids";
FLAG.AMILY_VISITING_URTA = "Amily_Visiting_Urta";
FLAG.CREATE_POTENT_MIXTURE = "Amily_Drank_Potent_Mixture";
FLAG.AMILY_BIRTH_TOTAL = "Amily_Birth_Total";
FLAG.AMILY_CORRUPTION_PATH = "Amily_Corruption_Path";
FLAG.AMILY_TREE_FLIPOUT = "Amily_Tree_Flipout";
FLAG.AMILY_CUP_SIZE = "Amily_Cup_Size";
FLAG.AMILY_NIPPLE_LENGTH = "Amily_Nipple_Length";
FLAG.AMILY_HIP_RATING = "Amily_Hip_Rating";
FLAG.AMILY_ASS_SIZE = "Amily_Ass_Size";
FLAG.AMILY_VAGINAL_WETNESS = "Amily_Vaginal_Wetness";
FLAG.AMILY_CLOTHING = "Amily_Clothing";
//=================
// PREGNANCY FLAGS
//
// Note that these are actual constants, not called by gameFlags yet until the pregnancy system is figured out.
//=================
// Base incubation values for a pregnancy
FLAG.INCUBATION_MOUSE = 350; // Incubation time for mice types/Amily
FLAG.INCUBATION_DRIDER = 400;
FLAG.INCUBATION_BEE = 48;
FLAG.INCUBATION_IMP = 432; //Time for standard imps. Imp lords, Ceraph, Lilium and the imp horde cause slightly faster pregnancies
// Pregnancy event arrays
FLAG.INCUBATION_MOUSE_EVENT = [336, 280, 216, 180, 120, 72, 48, 32]; // Event flags for Mouse Pregnancy
FLAG.INCUBATION_AMILY_EVENT = [150, 120, 100, 96, 90, 72, 48]; // Special array for Amily pregnancy in Town Ruins.
FLAG.INCUBATION_SAND_WITCH_EVENT = [142, 96];
FLAG.INCUBATION_TAMANI_EVENT = [219, 96, 48];
// Pregnancy types. Marks who did the impregnation
// static readonly PREGNANCY_PLAYER = "Player" // Marks the player impregnated someone
// static readonly PREGNANCY_AMILY = "Amily"
FLAG.PREGNANCY_BEE_EGGS = "Bee_Eggs";
FLAG.PREGNANCY_DRIDER_EGGS = "Drider_Eggs";
FLAG.PREGNANCY_IMP = "Imp";
FLAG.PREGNANCY_OVIELIXIR_EGGS = "Ovielixir_Eggs";
FLAG.PREGNANCY_ANEMONE = "Anemone";
// Misc Pregnancy flags
FLAG.PC_PENDING_PREGGERS = "PC_Pending_Preggers"; // Unsure what this is for. Used in Amily Herm Quest.
//------------
// ENCOUNTERS
//------------
//--[[ NON-COMBAT ]]--
//Callu
FLAG.MET_OTTERGIRL = "Met_OtterGirl";
//Giacomo
FLAG.GIACOMO_MET = "Giacomo_Met";
FLAG.GIACOMO_WORMS_OFFERED = "Giacomo_Worms_Offered";
//Lumi
FLAG.LUMI_MET = "Lumi_Met";
//Marcus & Lucia
FLAG.WANDERER_MET = "Wanderer_Met";
FLAG.WANDERER_DEMON = "Wanderer_Demon";
FLAG.WANDERER_EPILOGUE = "Wanderer_Epilogue";
//Tamani and Tamani's Daughters
FLAG.TAMANI_MET = "Tamani_Met";
FLAG.TAMANI_TIME_OUT = "Tamani_Time_Out";
FLAG.TAMANI_BAD_ENDED = "Tamani_Bad_Ended";
FLAG.TAMANI_DAUGHTER_PREGGO_COUNTDOWN = "Tamani_Daughter_Preggo_Countdown";
FLAG.TAMANI_NUMBER_OF_DAUGHTERS = "Tamani_Number_Of_Daughters";
FLAG.TAMANI_TIMES_HYPNOTIZED = "Tamani_Times_Hypnotized";
FLAG.TAMANI_DEFEAT_COUNTER = "Tamani_Defeat_Counter";
FLAG.TAMANI_TIMES_IMPREGNATED = "Tamani_Times_Impregnated";
FLAG.TAMANI_PREGNANCY_COUNT = "Tamani_Pregnancy_Count"; //Current litter
FLAG.TIMES_OVIPOSITED_TAMANI = "Times_Oviposited_Tamani";
//Whitney & Farm
FLAG.FARM_DISABLED = "Farm_Disabled";
FLAG.FARM_CORRUPTION_STARTED = "Farm_Corruption_Started";
FLAG.MET_WHITNEY = "Met_Whitney";
FLAG.WHITNEY_FLIPPED_OUT_OVER_KELLY = "Whitney_Flipped_Out_Over_Kelly";
FLAG.KELT_MET = "Kelt_Met";
FLAG.KELT_SUBMISSIVENESS = "Kelt_Submissiveness";
FLAG.NEVER_RESIST_KELT = "Never_Resist_Kelt";
FLAG.KELT_BAD_END_WARNING = "Kelt_Bad_End_Warning";
FLAG.KELT_DISABLED = "Kelt_Disabled";
FLAG.KELT_KILLED = "Kelt_Killed";
FLAG.KELT_BREAK_LEVEL = "Kelt_Break_Level";
FLAG.KELLY_CUNT_TYPE = "Kelly_Cunt_Type";
FLAG.KELLY_COCK_SIZE = "Kelly_Cock_Size";
FLAG.TIMES_PUNISHED_KELLY = "Times_Punished_Kelly";
FLAG.TIMES_RIM_JOBBED_BY_KELLY = "Times_Rim_Jobbed_By_Kelly";
FLAG.TIMES_RIDDEN_KELLY_FOR_PUNISHMENT = "Times_Ridden_Kelly_For_Punishment";
FLAG.KELLY_BONUS_TIT_ROWS = "Kelly_Bonus_Tits_Row";
FLAG.KELLY_LACTATING = "Kelly_Lactating";
FLAG.KELLY_DISOBEYING_COUNTER = "Kelly_Disobeying_Counter";
FLAG.KELLY_VAGINALLY_FUCKED_COUNT = "Kelly_Vaginally_Fucked_Count";
//--[[ COMBAT ]]--
//Minotaur
FLAG.MINOTAUR_TF2 = "Minotaur_TF2"; //One-time silly mode scene.
FLAG.MINOTAUR_AND_COWGIRL = "Minotaur_And_CowGirl";
FLAG.HAS_SEEN_MINO_AND_COWGIRL = "Has_Seen_Mino_And_Cowgirl";
FLAG.MINOTAUR_CUM_ADDICT = "Minotaur_Cum_Addict"; // Replacment for status effect. Marks if you are an addict or not.
FLAG.MINOTAUR_CUM_ADDICTION_STATE = "Minotaur_Cum_Addiction_State"; // What stage of addiction are you at?
FLAG.MINOTAUR_CUM_ADDICTION_TRACKER = "Minotaur_Cum_Addiction_Tracker"; //How much cum? (0-120)
FLAG.TIME_SINCE_LAST_CONSUMED_MINOTAUR_CUM = "Time_Since_Last_Consumed_Minotaur_Cum"; // Timer for cum problems
FLAG.EVER_DRANK_MINOCUM = "Ever_Drank_Minocum"; // Used for playerinfo menu
FLAG.MINOTAUR_CUM_REALLY_ADDICTED_STATE = "Minotaur_Cum_Really_Addicted_State";
//Naga
FLAG.NAGA_LAST_ENCOUNTERED_AS_NAGA = "Naga_Last_Encountered_As_Naga"; //0 indicates player isn't naga, 1 indicates player is naga, 2 indicates player is naga but hostile.
FLAG.NAGA_FUCKED_AS_NAGA = "Naga_Fucked_As_Naga";
//Sand Trap
FLAG.SANDTRAP_LOSS_REPEATS = "Sandtrap_Loss_Repeats"; //Used for Sandtrap bad end tracking
FLAG.TIMES_ENCOUNTERED_SAND_TRAPS = "Times_Encountered_Sand_Traps";
FLAG.TRAP_LEVEL = "Trap_Level"; // What level of the sand trap are you on?
FLAG.CLIMBED_TRAP_THIS_ROUND = "Climbed_Trap_This_Round"; // Did you try climbing this round?
FLAG.FERTILE_SANDTRAP = "Fertile_Sandtrap";
//Sand Witch
FLAG.SAND_WITCH_RAPED = "Sand_Witch_Raped";
//Bee Girl
FLAG.BEE_GIRL_COMBAT_WINS_WITHOUT_RAPE = "Bee_Girl_Combat_Wins_Without_Rape";
FLAG.BEE_GIRL_COMBAT_WINS_WITH_RAPE = "Bee_Girl_Combat_Wins_With_Rape";
FLAG.BEE_GIRL_COMBAT_LOSSES = "Bee_Girl_Combat_Losses";
FLAG.BEE_BAD_END_WARNING = "Bee_Bad_End_Warning";
FLAG.FORCE_BEE_TO_PRODUCE_HONEY = "Force_Bee_To_Produce_Honey";
//Goo Girl
FLAG.GOOGIRL_CONSECUTIVE_LOSSES = "GooGirl_Consecutive_Losses";
FLAG.TIMES_FUCKED_NORMAL_GOOS = "Times_Fucked_Normal_Goos";
FLAG.GOO_TFED_MEAN = "Goo_TFed_Mean";
FLAG.GOO_TFED_NICE = "Goo_TFed_Nice";
FLAG.PC_KNOWS_ABOUT_BLACK_EGGS = "PC_Knows_About_Black_Eggs"; //May need to move this one, and possibly integrate with Amily?
FLAG.TIMES_THOUGHT_ABOUT_GOO_RECRUITMENT = "Times_Thought_About_Goo_Recruitment";
//Green Goo
FLAG.TIMES_MET_OOZE = "Times_Met_Ooze";
//Oasis Demons
FLAG.OASIS_DEMONS_ACCEPT = "Oasis_Demons_Accept";
//Tentacle Beast
FLAG.TENTACLE_COOL_DOWN = "Tentacle_Cool_Down";
FLAG.TENTACLE_BIND = "Tentacle_Bind";
FLAG.TENTACLE_BAD_END = "Tentacle_Bad_End";
FLAG.TENTACLE_GENDERLESS_CENTAUR = "Tentacle_Genderless_Centaur"; //Unknown flag 00247;
//Worms
FLAG.WORM_INFEST_ATTEMPTED = "Worm_Infest_Attempted";
FLAG.MET_WORMS = "Met_Worms";
FLAG.WORMS_FETISH = "Worms_Fetish"; //0 = Not Encountered, 1 = Partially on, 2 = Fully on, 3 = Off
//------------
// KEY ITEMS
//------------
// Racks
FLAG.HAS_KEY_ITEM = "Has_Key_Item"; // Does the player have any key items?
FLAG.HAS_ARMOR_RACK = "Has_Armor_Rack"; // Does the player have the armor rack?
FLAG.HAS_WEAPON_RACK = "Has_Weapon_Rack"; // Does the player have the weapon rack?
FLAG.HAS_EQUIPMENT_RACK = "Has_Equipment_Rack"; // Does the player have the equipment rack?
//---------
// PLOT VARIABLES
//---------
FLAG.FACTORY_SHUTDOWN = "Factory_Shutdown"; // Is the factory on, shut down, or destroyed?
//---------
// PLAYER TRANSFORMATIONS
//---------
FLAG.HAS_BLACK_NIPPLES = "Has_Black_Nipples";
export { FLAG };
//# sourceMappingURL=dataFlags.js.map