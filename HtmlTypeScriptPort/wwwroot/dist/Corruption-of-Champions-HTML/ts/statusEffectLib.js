import { StatusEffectType } from "./statusEffectClass";
var BindType;
(function (BindType) {
    BindType[BindType["BIND_TYPE_GOO"] = 0] = "BIND_TYPE_GOO";
    BindType[BindType["BIND_TYPE_NAGA"] = 1] = "BIND_TYPE_NAGA";
    BindType[BindType["BIND_TYPE_TENTACLE"] = 2] = "BIND_TYPE_TENTACLE";
})(BindType || (BindType = {}));
var VenomType;
(function (VenomType) {
    VenomType[VenomType["VENOM_TYPE_BEE"] = 0] = "VENOM_TYPE_BEE";
    VenomType[VenomType["VENOM_TYPE_NAGA"] = 1] = "VENOM_TYPE_NAGA";
})(VenomType || (VenomType = {}));
class StatusEffectTypeContainer {
    constructor() {
        //------------
        // NON-COMBAT
        //------------
        //Bonus
        this.BonusACapacity = new StatusEffectType("Bonus aCapacity");
        this.BonusVCapacity = new StatusEffectType("Bonus vCapacity");
        this.Heat = new StatusEffectType("Heat");
        this.CuntStretched = new StatusEffectType("Cunt Stretched");
        //Penalties
        this.Infested = new StatusEffectType("Infested");
        this.WormPlugged = new StatusEffectType("Worm Plugged");
        this.Dysfunction = new StatusEffectType("Dysfunction");
        this.SlimeCraving = new StatusEffectType("Slime Craving");
        //Neutral
        this.Feeder = new StatusEffectType("Feeder");
        this.MeanToNaga = new StatusEffectType("Mean to Naga");
        this.Contraceptives = new StatusEffectType("Contraceptives");
        this.Eggs = new StatusEffectType("Eggs");
        this.Uniball = new StatusEffectType("Uniball"); //TODO: Check code to see if this would be better as a gameflag
        //------------
        // COMBAT
        //------------
        //Buffs
        this.ChargeWeapon = new StatusEffectType("ChargeWeapon");
        this.Might = new StatusEffectType("Might");
        this.Climbed = new StatusEffectType("Climbed"); // Used in Sand Trap fight;
        //Debuffs
        this.Acid = new StatusEffectType("Acid");
        this.Blind = new StatusEffectType("Blind");
        this.Bind = new StatusEffectType("Bind"); //Value determines the type.
        this.Confusion = new StatusEffectType("Confusion");
        this.NoFlee = new StatusEffectType("NoFlee");
        this.Poison = new StatusEffectType("Poison");
        this.Silence = new StatusEffectType("Silence");
        this.StoneLust = new StatusEffectType("StoneLust");
        this.Stunned = new StatusEffectType("Stunned");
        this.TemporaryHeat = new StatusEffectType("TempHeat");
        this.Venom = new StatusEffectType("Venom");
        this.ParalyzeVenom = new StatusEffectType("ParalyzeVenom");
        this.LustVenom = new StatusEffectType("LustVenom");
        this.Fertilized = new StatusEffectType("Fertilized"); // Used in SandTrap battles.
        //----------
        // TODO: verify: called in Creature but not originally defined
        //---------
        this.ButtStretched = new StatusEffectType("ButtStretched");
        this.LactationEndurance = new StatusEffectType("LactationEndurance");
        this.LactationReduction = new StatusEffectType("LactationReduction");
        this.BlackCatBeer = new StatusEffectType("BlackCatBeer");
        this.ImpUber = new StatusEffectType("ImpUber");
        this.ImpSkip = new StatusEffectType("ImpSkip");
        this.LactationReduc0 = new StatusEffectType("LactationReduc0");
        this.LactationReduc1 = new StatusEffectType("LactationReduc1");
        this.LactationReduc2 = new StatusEffectType("LactationReduc2");
        this.LactationReduc3 = new StatusEffectType("LactationReduc3");
        this.Rut = new StatusEffectType("Rut");
        this.Web = new StatusEffectType("Web");
        this.BlackNipples = new StatusEffectType("BlackNipples");
        this.Shielding = new StatusEffectType("Shielding");
        this.HolliConstrict = new StatusEffectType("HolliConstrict");
        this.LustStones = new StatusEffectType("LustStones");
        this.Sandstorm = new StatusEffectType("Sandstorm");
        this.Sealed = new StatusEffectType("Sealed");
        this.Berzerking = new StatusEffectType("Berzerking");
        this.TailWhip = new StatusEffectType("TailWhip");
        this.UBERWEB = new StatusEffectType("UBERWEB");
        this.DriderKiss = new StatusEffectType("DriderKiss");
        this.WebSilence = new StatusEffectType("WebSilence");
        this.GooArmorSilence = new StatusEffectType("GooArmorSilence");
        this.Whispered = new StatusEffectType("Whispered");
        this.AkbalSpeed = new StatusEffectType("AkbalSpeed");
        this.AmilyVenom = new StatusEffectType("AmilyVenom");
        this.SheilaOil = new StatusEffectType("SheilaOil");
        this.TwuWuv = new StatusEffectType("TwuWuv");
        this.TuvWuv = new StatusEffectType("TuvWuv");
        this.FirstAttack = new StatusEffectType("FirstAttack");
        this.IsabellaStunned = new StatusEffectType("IsabellaStunned");
        this.ThroatPunch = new StatusEffectType("ThroatPunch");
        this.KissOfDeath = new StatusEffectType("KissOfDeath");
        this.AcidSlap = new StatusEffectType("AcidSlap");
        this.CalledShot = new StatusEffectType("CalledShot");
        this.DemonSeed = new StatusEffectType("DemonSeed");
        this.InfestAttempted = new StatusEffectType("InfestAttempted");
        this.Disarmed = new StatusEffectType("Disarmed");
        this.AnemoneVenom = new StatusEffectType("AnemoneVenom");
        this.GnollSpear = new StatusEffectType("GnollSpear");
        this.BasiliskCompulsion = new StatusEffectType("BasiliskCompulsion");
        this.BasiliskSlow = new StatusEffectType("BasiliskSlow");
        this.GiantGrabbed = new StatusEffectType("GiantGrabbed");
        this.GiantBoulder = new StatusEffectType("GiantBoulder");
        this.GiantStrLoss = new StatusEffectType("GiantStrLoss");
        this.LizanBlowpipe = new StatusEffectType("LizanBlowpipe");
        this.IzmaBleed = new StatusEffectType("IzmaBleed");
        this.GardenerSapSpeed = new StatusEffectType("GardenerSapSpeed");
        this.KnockedBack = new StatusEffectType("KnockedBack");
        this.RemovedArmor = new StatusEffectType("RemovedArmor");
        this.JCLustLevel = new StatusEffectType("JCLustLevel");
        this.MirroredAttack = new StatusEffectType("MirroredAttack");
        this.Tentagrappled = new StatusEffectType("Tentagrappled");
        this.TentagrappleCooldown = new StatusEffectType("TentagrappleCooldown");
        this.ShowerDotEffect = new StatusEffectType("ShowerDotEffect");
        this.VineHealUsed = new StatusEffectType("VineHealUsed");
    }
}
let StatusEffects = new StatusEffectTypeContainer();
export { BindType, VenomType, StatusEffects };
//# sourceMappingURL=statusEffectLib.js.map