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
    }
}
let StatusEffects = new StatusEffectTypeContainer();
export { BindType, VenomType, StatusEffects };
//# sourceMappingURL=statusEffectLib.js.map