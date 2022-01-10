// So, a bit of weirdness about these game flags. They're constants because of how the save files work. When the player reaches an area where a flag would come into play, addToGameFlags() is called with these flags. This function fills an array full of these constant names and a value. That's what the game grabs when a save is loaded. So, while it may seem smart to change all of these into variables, don't!

//The default value for all of these flags is zero. To change the value of a flag, you have to call gameFlags[NAMEOFFLAG] = int or whatever it's getting set to. If you use addToGameFlags and set flags in this way, your values will be saved.

abstract class FLAG {
    //------------
    // META FLAGS
    //------------
    static readonly SFW_MODE = "SFW_Mode" // Is the game in SFW mode?

    //------------
    // STATS
    //------------
    static readonly TIMES_TRANSFORMED = "Times_Transformed"
    static readonly TIMES_ORGASMED = "Times_Orgasmed"
    static readonly PC_FETISH = "PC_Fetish" // Used in lust attack in combatTeases file
    static readonly IMPS_KILLED = "Imps_Killed" // How many Imps has the player killed?
    static readonly COMBAT_BONUS_XP_VALUE = "Combat_Bonus_XP_Value"
    static readonly SLIME_CRAVING = "Slime_Craving" // Replaces Slime Craving status effect.
    static readonly GOOGIRL_BIRTHS = "GooGirl_Births"
    static readonly HORSE_WARNING = "Horse_Warning" // In Danger of Drinking Too Much Equinum

    //------------
    // MISC
    //------------
    static readonly HAIR_GROWTH_STOPPED_BECAUSE_LIZARD = "Hair_Growth_Stopped"
    static readonly EVER_INFESTED = "Ever_Infested" // Has the PC ever been infested with worms?
    static readonly MEANINGLESS_CORRUPTION = "Meaningless_Corruption" //Unknown, used in Goblin victory code.
    static readonly INFESTED = "Infested" // Currently infested with worms.
    static readonly HYPER_HAPPY = "Hyper_Happy"
    static readonly PREGNANCY_CORRUPTION = "Pregnancy_Corruption" // Used in Phouka pregnancy

    //------------
    // CODEX
    //------------
    //Codex Entry, will be used at a point.
    static readonly CODEX_ENTRY_ANEMONES = "Codex_Entry_Anemones"
    static readonly CODEX_ENTRY_ARACHNES = "Codex_Entry_Arachnes"
    static readonly CODEX_ENTRY_BEHEMOTH = "Codex_Entry_Behemoth"
    static readonly CODEX_ENTRY_ECHIDNAS = "Codex_Entry_Echidnas"
    static readonly CODEX_ENTRY_FETISHFOLLOWERS = "Codex_Entry_FetishFollowers"
    static readonly CODEX_ENTRY_GIANTBEES = "Codex_Entry_GiantBees"
    static readonly CODEX_ENTRY_GOBLINS = "Codex_Entry_Goblins"
    static readonly CODEX_ENTRY_GOOGIRLS = "Codex_Entry_GooGirls"
    static readonly CODEX_ENTRY_HARPIES = "Codex_Entry_Harpies"
    static readonly CODEX_ENTRY_HELLHOUNDS = "Codex_Entry_Hellhounds"
    static readonly CODEX_ENTRY_IMPS = "Codex_Entry_Imps"
    static readonly CODEX_ENTRY_LABOVINES = "Codex_Entry_Labovines"
    static readonly CODEX_ENTRY_LIZANS = "Codex_Entry_Lizans"
    static readonly CODEX_ENTRY_MAGIC = "Codex_Entry_Magic"
    static readonly CODEX_ENTRY_MINOTAURS = "Codex_Entry_Minotaurs"
    static readonly CODEX_ENTRY_NAGAS = "Codex_Entry_Nagas"
    static readonly CODEX_ENTRY_ORCS = "Codex_Entry_Orcs"
    static readonly CODEX_ENTRY_RHINOCEROS = "Codex_Entry_Rhinoceros"
    static readonly CODEX_ENTRY_SALAMANDERS = "Codex_Entry_Salamanders"
    static readonly CODEX_ENTRY_SANDWITCHES = "Codex_Entry_SandWitches"
    static readonly CODEX_ENTRY_SATYRS = "Codex_Entry_Satyrs"
    static readonly CODEX_ENTRY_SHARKGIRLS = "Codex_Entry_SharkGirls"
    static readonly CODEX_ENTRY_SUCCUBUS = "Codex_Entry_Succubus"
    static readonly CODEX_ENTRY_ZEBRAS = "Codex_Entry_Zebras"

    //------------
    // CAMP FLAGS
    //------------

    static readonly CAMP_WALL_PROGRESS = "Camp_Wall_Progress"

    //------------
    // SPELLS
    //------------

    //static readonly KNOWS_AROUSE                      = "Knows_Arouse";
    //static readonly KNOWS_HEAL                        = "Knows_Heal";
    //static readonly KNOWS_MIGHT                       = "Knows_Might";
    //static readonly KNOWS_CHARGE                      = "Knows_Charge";
    //static readonly KNOWS_BLIND                       = "Knows_Blind";
    //static readonly KNOWS_WHITEFIRE                   = "Knows_Whitefire";

    static readonly SPELLS_CAST = "Spells_Cast"

    //------------
    // FOLLOWERS
    //------------
    //Rathazul
    static readonly RATHAZUL_MET = "Rathazul_Met"
    static readonly RATHAZUL_CAMP = "Rathazul_Camp"
    static readonly RATHAZUL_PURCHASE_COUNTER = "Rathazul_Purchase_Counter"
    static readonly RATHAZUL_ARMOUR_COUNTER = "Rathazul_Armour_Counter"

    //Jojo
    static readonly JOJO_MET = "Jojo_Met"
    static readonly JOJO_CAMP = "Jojo_Camp"
    static readonly JOJO_CORRUPTION_STAGE = "Jojo_Corruption_Stage" //5 indicates he's mentally broken and corrupted. -3 indicates sex scenes unlocked.
    static readonly JOJO_RAPE_COUNTER = "Jojo_Rape_Counter"
    static readonly JOJO_MEDITATION_COUNTER = "Jojo_Meditation_Counter"
    static readonly JOJO_TRAINING_COUNTER = "Jojo_Training_Counter"
    static readonly JOJO_TRAINING_UNLOCKED = "Jojo_Training_Unlocked"
    static readonly JOJO_NIGHT_WATCH = "Jojo_Night_Watch"
    static readonly JOJO_BIMBO_STATE = "Jojo_Bimbo_State"

    //Marble
    static readonly MARBLE_MET = "Marble_Met"
    static readonly MARBLE_CAMP = "Marble_Camp"
    static readonly MARBLE_ADDICTION = "Marble_Addiction"
    static readonly MARBLE_AFFECTION = "Marble_Affection"
    static readonly MARBLE_WARNING = "Marble_Warning"
    static readonly NO_MORE_MARBLE = "No_More_Marble"
    static readonly MARBLE_RAPE_ATTEMPTED = "Marble_Rape_Attempted"
    static readonly MURBLE_FARM_TALK_LEVELS = "Marble_Farm_Talk_Levels"

    //Amily
    static readonly AMILY_VILLAGE_ACCESSIBLE = "Amily_Village_Accessible" // Can you access the Town Ruins?
    static readonly AMILY_VILLAGE_EXPLORED = "Amily_Village_Explored" // How many times has the TownRuins been explored? Used in achievement.
    static readonly AMILY_MET = "Amily_Met" // Has Amily been met yet?
    static readonly AMILY_PC_GENDER = "Amily_PC_Gender" // Used for gender checks with Amily to switch between scenes.
    static readonly AMILY_MET_AS = "Amily_Met_As" // Marks the player gender that met with Amily.
    static readonly AMILY_OFFER_ACCEPTED = "Amily_Offer_Accepted" // You've taken up Amily's offer to breed her.
    static readonly AMILY_AFFECTION = "Amily_Affection" // Amily's Affection level toward PC.
    static readonly AMILY_OFFERED_DEFURRY = "Amily_Offered_Defurry" // Refused Amily's offer because she's a mouse.
    static readonly AMILY_FUCK_COUNTER = "Amily_Fuck_Counter" // How many times you fucked Amily.
    static readonly AMILY_NOT_FURRY = "Amily_Not_Furry" // If active, Amily has been defurred.
    static readonly AMILY_WANG_LENGTH = "Amily_Wang_Length" // Amily is a herm. Measures her penis length.
    static readonly AMILY_PREGNANCY_TYPE = "Amily_Pregnancy_Type" // What is Amily pregnant with?
    static readonly AMILY_INCUBATION = "Amily_Incubation"
    static readonly AMILY_BUTT_PREGNANCY_TYPE = "Amily_Butt_Pregnancy_Type"
    static readonly AMILY_OVIPOSITED_COUNTDOWN = "Amily_Oviposited_Countdown"
    static readonly AMILY_GROSSED_OUT_BY_WORMS = "Amily_Grossed_Out_By_Worms"
    static readonly AMILY_FOLLOWER = "Amily_Follower"
    static readonly AMILY_ALLOWS_FERTILITY = "Amily_Allows_Fertility"
    static readonly FOLLOWER_AT_FARM_AMILY = "Follower_At_Farm_Amily"
    static readonly AMILY_CORRUPT_FLIPOUT = "Amily_Corrupt_Flipout"
    static readonly AMILY_VILLAGE_ENCOUNTERS_DISABLED = "Amily_Village_Encounters_Disabled"
    static readonly AMILY_CONFESSED_LESBIAN = "Amily_Confessed_Lesbian"
    static readonly AMILY_TIMES_FUCKED_FEMPC = "Amily_Times_Fucked_FemPC"
    static readonly AMILY_WANG_GIRTH = "Amily_Wang_Girth"
    static readonly AMILY_HERM_TIMES_FUCKED_BY_FEMPC = "Amily_Herm_Times_Fucked_By_FemPC"
    static readonly AMILY_HERM_QUEST = "Amily_Herm_Quest"
    static readonly PC_TIMES_BIRTHED_AMILYKIDS = "PC_Times_Birthed_Amilykids"
    static readonly AMILY_VISITING_URTA = "Amily_Visiting_Urta"
    static readonly CREATE_POTENT_MIXTURE = "Amily_Drank_Potent_Mixture"
    static readonly AMILY_BIRTH_TOTAL = "Amily_Birth_Total"
    static readonly AMILY_CORRUPTION_PATH = "Amily_Corruption_Path"
    static readonly AMILY_TREE_FLIPOUT = "Amily_Tree_Flipout"
    static readonly AMILY_CUP_SIZE = "Amily_Cup_Size"
    static readonly AMILY_NIPPLE_LENGTH = "Amily_Nipple_Length"
    static readonly AMILY_HIP_RATING = "Amily_Hip_Rating"
    static readonly AMILY_ASS_SIZE = "Amily_Ass_Size"
    static readonly AMILY_VAGINAL_WETNESS = "Amily_Vaginal_Wetness"
    static readonly AMILY_CLOTHING = "Amily_Clothing"

    //=================
    // PREGNANCY FLAGS
    //
    // Note that these are actual constants, not called by gameFlags yet until the pregnancy system is figured out.
    //=================

    // Base incubation values for a pregnancy
    static readonly INCUBATION_MOUSE = 350 // Incubation time for mice types/Amily
    static readonly INCUBATION_DRIDER = 400
    static readonly INCUBATION_BEE = 48
    static readonly INCUBATION_IMP = 432 //Time for standard imps. Imp lords, Ceraph, Lilium and the imp horde cause slightly faster pregnancies

    // Pregnancy event arrays
    static readonly INCUBATION_MOUSE_EVENT = [336, 280, 216, 180, 120, 72, 48, 32] // Event flags for Mouse Pregnancy
    static readonly INCUBATION_AMILY_EVENT = [150, 120, 100, 96, 90, 72, 48] // Special array for Amily pregnancy in Town Ruins.
    static readonly INCUBATION_SAND_WITCH_EVENT = [142, 96]
    static readonly INCUBATION_TAMANI_EVENT = [219, 96, 48]

    // Pregnancy types. Marks who did the impregnation
    // static readonly PREGNANCY_PLAYER = "Player" // Marks the player impregnated someone
    // static readonly PREGNANCY_AMILY = "Amily"
    static readonly PREGNANCY_BEE_EGGS = "Bee_Eggs"
    static readonly PREGNANCY_DRIDER_EGGS = "Drider_Eggs"
    static readonly PREGNANCY_IMP = "Imp"
    static readonly PREGNANCY_OVIELIXIR_EGGS = "Ovielixir_Eggs"
    static readonly PREGNANCY_ANEMONE = "Anemone"

    // Misc Pregnancy flags
    static readonly PC_PENDING_PREGGERS = "PC_Pending_Preggers" // Unsure what this is for. Used in Amily Herm Quest.

    //------------
    // ENCOUNTERS
    //------------
    //--[[ NON-COMBAT ]]--
    //Callu
    static readonly MET_OTTERGIRL = "Met_OtterGirl"

    //Giacomo
    static readonly GIACOMO_MET = "Giacomo_Met"
    static readonly GIACOMO_WORMS_OFFERED = "Giacomo_Worms_Offered"

    //Lumi
    static readonly LUMI_MET = "Lumi_Met"

    //Marcus & Lucia
    static readonly WANDERER_MET = "Wanderer_Met"
    static readonly WANDERER_DEMON = "Wanderer_Demon"
    static readonly WANDERER_EPILOGUE = "Wanderer_Epilogue"

    //Tamani and Tamani's Daughters
    static readonly TAMANI_MET = "Tamani_Met"
    static readonly TAMANI_TIME_OUT = "Tamani_Time_Out"
    static readonly TAMANI_BAD_ENDED = "Tamani_Bad_Ended"
    static readonly TAMANI_DAUGHTER_PREGGO_COUNTDOWN = "Tamani_Daughter_Preggo_Countdown"
    static readonly TAMANI_NUMBER_OF_DAUGHTERS = "Tamani_Number_Of_Daughters"
    static readonly TAMANI_TIMES_HYPNOTIZED = "Tamani_Times_Hypnotized"
    static readonly TAMANI_DEFEAT_COUNTER = "Tamani_Defeat_Counter"
    static readonly TAMANI_TIMES_IMPREGNATED = "Tamani_Times_Impregnated"
    static readonly TAMANI_PREGNANCY_COUNT = "Tamani_Pregnancy_Count" //Current litter
    static readonly TIMES_OVIPOSITED_TAMANI = "Times_Oviposited_Tamani"

    //Whitney & Farm
    static readonly FARM_DISABLED = "Farm_Disabled"
    static readonly FARM_CORRUPTION_STARTED = "Farm_Corruption_Started"
    static readonly MET_WHITNEY = "Met_Whitney"
    static readonly WHITNEY_FLIPPED_OUT_OVER_KELLY = "Whitney_Flipped_Out_Over_Kelly"

    static readonly KELT_MET = "Kelt_Met"
    static readonly KELT_SUBMISSIVENESS = "Kelt_Submissiveness"
    static readonly NEVER_RESIST_KELT = "Never_Resist_Kelt"
    static readonly KELT_BAD_END_WARNING = "Kelt_Bad_End_Warning"
    static readonly KELT_DISABLED = "Kelt_Disabled"
    static readonly KELT_KILLED = "Kelt_Killed"
    static readonly KELT_BREAK_LEVEL = "Kelt_Break_Level"
    static readonly KELLY_CUNT_TYPE = "Kelly_Cunt_Type"
    static readonly KELLY_COCK_SIZE = "Kelly_Cock_Size"
    static readonly TIMES_PUNISHED_KELLY = "Times_Punished_Kelly"
    static readonly TIMES_RIM_JOBBED_BY_KELLY = "Times_Rim_Jobbed_By_Kelly"
    static readonly TIMES_RIDDEN_KELLY_FOR_PUNISHMENT = "Times_Ridden_Kelly_For_Punishment"
    static readonly KELLY_BONUS_TIT_ROWS = "Kelly_Bonus_Tits_Row"
    static readonly KELLY_LACTATING = "Kelly_Lactating"
    static readonly KELLY_DISOBEYING_COUNTER = "Kelly_Disobeying_Counter"
    static readonly KELLY_VAGINALLY_FUCKED_COUNT = "Kelly_Vaginally_Fucked_Count"

    //--[[ COMBAT ]]--
    //Minotaur
    static readonly MINOTAUR_TF2 = "Minotaur_TF2" //One-time silly mode scene.
    static readonly MINOTAUR_AND_COWGIRL = "Minotaur_And_CowGirl"

    static readonly HAS_SEEN_MINO_AND_COWGIRL = "Has_Seen_Mino_And_Cowgirl"
    static readonly MINOTAUR_CUM_ADDICT = "Minotaur_Cum_Addict" // Replacment for status effect. Marks if you are an addict or not.
    static readonly MINOTAUR_CUM_ADDICTION_STATE = "Minotaur_Cum_Addiction_State" // What stage of addiction are you at?
    static readonly MINOTAUR_CUM_ADDICTION_TRACKER = "Minotaur_Cum_Addiction_Tracker" //How much cum? (0-120)
    static readonly TIME_SINCE_LAST_CONSUMED_MINOTAUR_CUM = "Time_Since_Last_Consumed_Minotaur_Cum" // Timer for cum problems
    static readonly EVER_DRANK_MINOCUM = "Ever_Drank_Minocum" // Used for playerinfo menu
    static readonly MINOTAUR_CUM_REALLY_ADDICTED_STATE = "Minotaur_Cum_Really_Addicted_State"

    //Naga
    static readonly NAGA_LAST_ENCOUNTERED_AS_NAGA = "Naga_Last_Encountered_As_Naga" //0 indicates player isn't naga, 1 indicates player is naga, 2 indicates player is naga but hostile.
    static readonly NAGA_FUCKED_AS_NAGA = "Naga_Fucked_As_Naga"

    //Sand Trap
    static readonly SANDTRAP_LOSS_REPEATS = "Sandtrap_Loss_Repeats" //Used for Sandtrap bad end tracking
    static readonly TIMES_ENCOUNTERED_SAND_TRAPS = "Times_Encountered_Sand_Traps"
    static readonly TRAP_LEVEL = "Trap_Level" // What level of the sand trap are you on?
    static readonly CLIMBED_TRAP_THIS_ROUND = "Climbed_Trap_This_Round" // Did you try climbing this round?
    static readonly FERTILE_SANDTRAP = "Fertile_Sandtrap"

    //Sand Witch
    static readonly SAND_WITCH_RAPED = "Sand_Witch_Raped"

    //Bee Girl
    static readonly BEE_GIRL_COMBAT_WINS_WITHOUT_RAPE = "Bee_Girl_Combat_Wins_Without_Rape"
    static readonly BEE_GIRL_COMBAT_WINS_WITH_RAPE = "Bee_Girl_Combat_Wins_With_Rape"
    static readonly BEE_GIRL_COMBAT_LOSSES = "Bee_Girl_Combat_Losses"
    static readonly BEE_BAD_END_WARNING = "Bee_Bad_End_Warning"
    static readonly FORCE_BEE_TO_PRODUCE_HONEY = "Force_Bee_To_Produce_Honey"

    //Goo Girl
    static readonly GOOGIRL_CONSECUTIVE_LOSSES = "GooGirl_Consecutive_Losses"
    static readonly TIMES_FUCKED_NORMAL_GOOS = "Times_Fucked_Normal_Goos"
    static readonly GOO_TFED_MEAN = "Goo_TFed_Mean"
    static readonly GOO_TFED_NICE = "Goo_TFed_Nice"
    static readonly PC_KNOWS_ABOUT_BLACK_EGGS = "PC_Knows_About_Black_Eggs" //May need to move this one, and possibly integrate with Amily?
    static readonly TIMES_THOUGHT_ABOUT_GOO_RECRUITMENT = "Times_Thought_About_Goo_Recruitment"

    //Green Goo
    static readonly TIMES_MET_OOZE = "Times_Met_Ooze"

    //Oasis Demons
    static readonly OASIS_DEMONS_ACCEPT = "Oasis_Demons_Accept"

    //Tentacle Beast
    static readonly TENTACLE_COOL_DOWN = "Tentacle_Cool_Down"
    static readonly TENTACLE_BIND = "Tentacle_Bind"
    static readonly TENTACLE_BAD_END = "Tentacle_Bad_End"
    static readonly TENTACLE_GENDERLESS_CENTAUR = "Tentacle_Genderless_Centaur" //Unknown flag 00247;

    //Worms

    static readonly WORM_INFEST_ATTEMPTED = "Worm_Infest_Attempted"
    static readonly MET_WORMS = "Met_Worms"
    static readonly WORMS_FETISH = "Worms_Fetish" //0 = Not Encountered, 1 = Partially on, 2 = Fully on, 3 = Off

    //------------
    // KEY ITEMS
    //------------
    // Racks

    static readonly HAS_KEY_ITEM = "Has_Key_Item" // Does the player have any key items?
    static readonly HAS_ARMOR_RACK = "Has_Armor_Rack" // Does the player have the armor rack?
    static readonly HAS_WEAPON_RACK = "Has_Weapon_Rack" // Does the player have the weapon rack?
    static readonly HAS_EQUIPMENT_RACK = "Has_Equipment_Rack" // Does the player have the equipment rack?

    //---------
    // PLOT VARIABLES
    //---------

    static readonly FACTORY_SHUTDOWN = "Factory_Shutdown" // Is the factory on, shut down, or destroyed?

    //---------
    // PLAYER TRANSFORMATIONS
    //---------

    static readonly HAS_BLACK_NIPPLES = "Has_Black_Nipples"
}

export { FLAG }
