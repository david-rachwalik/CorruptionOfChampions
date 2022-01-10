import { PerkType } from "./perkClass";
class PerkTypeContainer {
    constructor() {
        //------------
        // LEVEL UP
        //------------
        this.Evade = new PerkType("Evade", "Evade", "Increases chances of evading enemy attacks.", "You choose the 'Evade' perk, allowing you to avoid enemy attacks more often!");
        this.Precision = new PerkType("Precision", "Precision", "Reduces enemy armor by 10. (Req's 25+ Intelligence)", "You've chosen the 'Precision' perk.  Thanks to your intelligence, you're now more adept at finding and striking an enemy's weak points, reducing their damage resistance from armor by 10.  If your intelligence ever drops below 25 you'll no longer be smart enough to benefit from this perk.");
        this.Runner = new PerkType("Runner", "Runner", "Increases chances of escaping combat.", "You choose the 'Runner' perk, increasing your chances to escape from your foes when fleeing!");
        this.Spellpower = new PerkType("Spellpower", "Spellpower", "Increases base spell strength by 50%.", "You choose the 'Spellpower' perk. Thanks to your sizeable intellect and willpower, you are able to more effectively use magic, boosting base spell effects by 50%.");
        this.StrongBack = new PerkType("StrongBack", "Strong Back", "Enables fourth item slot.", "You choose the 'Strong Back' perk, enabling a fourth item slot.");
        this.StrongBack2 = new PerkType("StrongBack2", "Strong Back 2: Strong Harder", "Enables fifth item slot.", "You choose the 'Strong Back 2: Strong Harder' perk, enabling a fifth item slot.");
        this.Tank = new PerkType("Tank", "Tank", "Raises max HP by 50.", "You choose the 'Tank' perk, giving you an additional 50 HP!");
        this.Tank2 = new PerkType("Tank2", "Tank 2", "Raises max HP by 1 per point of Toughness.", "You choose the 'Tank 2' perk, granting an extra maximum HP for each point of toughness.");
        //------------
        // EQUIPMENT
        //------------
        this.WizardsFocus = new PerkType("Wizard", "Wizard's Focus", "Your wizard's staff grants you additional focus, amplifying the power of your spells.");
        //------------
        // EVENTS
        //------------
        //Jojo
        this.ControlledBreath = new PerkType("ControlledBreath", "Controlled Breath", "Jojo’s training allows you to recover more quickly. Increases rate of fatigue regeneration by 10%.");
        this.CleansingPalm = new PerkType("CleansingPalm", "Cleansing Palm", "A ranged fighting technique of Jojo’s order, allows you to blast your enemies with waves of pure spiritual energy, weakening them and hurting the corrupt.");
        this.Enlightenment = new PerkType("Enlightenment", "Enlightenment", "Jojo’s tutelage has given you a master’s focus and you can feel the universe in all its glory spread out before you. You’ve finally surpassed your teacher.");
        //Marble
        this.MarblesMilk = new PerkType("MarblesMilk", "Marble's Milk", "Add Marble's Milk perk description in perkLib.js");
        //Ovipositing
        this.BeeOvipositor = new PerkType("BeeOvipositor", "Bee Ovipositor", "Bee Ovipositor Description to be added.");
        this.SpiderOvipositor = new PerkType("SpiderOvipositor", "Spider Ovipositor", "Spider Ovipositor Description to be added.");
        //-----------
        // TRANSFORMATION RELATED
        //-----------
        this.BimboBrains = new PerkType("BimboBrains", "Bimbo Brains", "TO BE ADDED");
        this.FutaFaculties = new PerkType("FutaFac", "Futa Faculties", "TO BE ADDED");
        //Fire Fire!
        this.FireLord = new PerkType("FireLord", "FireLord", "TO BE ADDED");
        this.Hellfire = new PerkType("Hellfire", "Hellfire", "TO BE ADDED");
        this.Dragonfire = new PerkType("Dragonfire", "Dragonfire", "TO BE ADDED");
        this.SlimeCore = new PerkType("SlimeCore", "Slime Core", "TO BE ADDED");
        //----------
        // UNKNOWN
        //---------
        this.Misdirection = new PerkType("Misdirection", "Misdirection", "TO BE ADDED");
        this.Flexibility = new PerkType("Flexibility", "Flexibility", "TO BE ADDED");
        this.ArousingAura = new PerkType("ArousingAura", "Arousing Aura", "TO BE ADDED");
        this.MinotaurCumResistance = new PerkType("MinoCumResist", "Minotaur Cum Resistance", "TO BE ADDED");
        this.MinotaurCumAddict = new PerkType("MinoCumAddict", "Minotaur Cum Addict", "TO BE ADDED");
        this.Masochist = new PerkType("Masochist", "Masochist", "TO BE ADDED");
        this.HistoryAlchemist = new PerkType("H.Alchemist", "Alchemist History", "TO BE ADDED");
        this.TransformationResistance = new PerkType("T.Resist", "Transformation Resistance", "TO BE ADDED");
        this.Oviposition = new PerkType("Oviposit", "Oviposition", "TO BE ADDED");
        this.MessyOrgasms = new PerkType("MessyOrgasms", "Messy Orgasms", "TO BE ADDED");
        this.MaraesGiftButtslut = new PerkType("MaraesGiftButtslut", "TO BE ADDED", "TO BE ADDED");
        this.Incorporeality = new PerkType("Incorporeality", "Incorporeality", "TO BE ADDED");
        this.SpellcastingAffinity = new PerkType("SpellAff", "Spellcasting Affinity", "TO BE ADDED");
        this.HarpyWomb = new PerkType("HarpyWomb", "Harpy Womb", "TO BE ADDED");
        this.BasiliskWomb = new PerkType("BaskWomb", "Basilisk Womb", "TO BE ADDED");
        this.Androgyny = new PerkType("Androgyny", "Androgyny", "TO BE ADDED");
        this.MaraesGiftStud = new PerkType("MaraesGiftStud", "Marae's Gift - Stud", "TO BE ADDED");
        this.StaffChanneling = new PerkType("StaffChanneling", "Staff Channeling", "TO BE ADDED");
        //----------
        // TODO: verify: were called in Creature but not originally defined; seem like Starter Perks
        //---------
        this.AscensionFertility = new PerkType("AscensionFertility", "Ascension Fertility", "TO BE ADDED");
        this.BigTits = new PerkType("BigTits", "Big Tits", "TO BE ADDED");
        this.BroBody = new PerkType("BroBody", "Bro Body", "TO BE ADDED");
        this.Cornucopia = new PerkType("Cornucopia", "Cornucopia", "TO BE ADDED");
        this.ElvenBounty = new PerkType("ElvenBounty", "Elven Bounty", "TO BE ADDED");
        this.Feeder = new PerkType("Feeder", "Feeder", "TO BE ADDED");
        this.FerasBoonAlpha = new PerkType("FerasBoonAlpha", "Feras Boon Alpha", "TO BE ADDED");
        this.FerasBoonBreedingBitch = new PerkType("FerasBoonBreedingBitch", "Feras Boon Breeding Bitch", "TO BE ADDED");
        this.FerasBoonMilkingTwat = new PerkType("FerasBoonMilkingTwat", "Feras Boon Milking Twat", "TO BE ADDED");
        this.FerasBoonSeeder = new PerkType("FerasBoonSeeder", "Feras Boon Seeder", "TO BE ADDED");
        this.FerasBoonWideOpen = new PerkType("FerasBoonWideOpen", "Feras Boon Wide Open", "TO BE ADDED");
        this.FertilityMinus = new PerkType("FertilityMinus", "Fertility Minus", "TO BE ADDED");
        this.FertilityPlus = new PerkType("FertilityPlus", "Fertility Plus", "TO BE ADDED");
        this.HistorySlut = new PerkType("HistorySlut", "History Slut", "TO BE ADDED");
        this.ImmovableObject = new PerkType("ImmovableObject", "Immovable Object", "TO BE ADDED");
        this.LungingAttacks = new PerkType("LungingAttacks", "Lunging Attacks", "TO BE ADDED");
        this.LustyRegeneration = new PerkType("LustyRegeneration", "Lusty Regeneration", "TO BE ADDED");
        this.MagicalFertility = new PerkType("MagicalFertility", "Magical Fertility", "TO BE ADDED");
        this.MagicalVirility = new PerkType("MagicalVirility", "Magical Virility", "TO BE ADDED");
        this.MaraesGiftFertility = new PerkType("MaraesGiftFertility", "Maraes Gift Fertility", "TO BE ADDED");
        this.Masochist = new PerkType("Masochist", "Masochist", "TO BE ADDED");
        this.MilkMaid = new PerkType("MilkMaid", "Milk Maid", "TO BE ADDED");
        this.OneTrackMind = new PerkType("OneTrackMind", "One Track Mind", "TO BE ADDED");
        this.PentUp = new PerkType("PentUp", "Pent Up", "TO BE ADDED");
        this.PiercedFertite = new PerkType("PiercedFertite", "Pierced Fertite", "TO BE ADDED");
        this.PilgrimsBounty = new PerkType("PilgrimsBounty", "Pilgrims Bounty", "TO BE ADDED");
        this.SatyrSexuality = new PerkType("SatyrSexuality", "Satyr Sexuality", "TO BE ADDED");
        this.WetPussy = new PerkType("WetPussy", "Wet Pussy", "TO BE ADDED");
    }
}
let PerkLib = new PerkTypeContainer();
export { PerkLib };
//# sourceMappingURL=perkLib.js.map