import { StatusEffect, StatusEffectIDs, StatusEffectType } from "./statusEffectClass"

enum BindType {
    BIND_TYPE_GOO = 0,
    BIND_TYPE_NAGA,
    BIND_TYPE_TENTACLE
}

enum VenomType {
    VENOM_TYPE_BEE = 0,
    VENOM_TYPE_NAGA
}

class StatusEffectTypeContainer {
    //------------
    // NON-COMBAT
    //------------
    //Bonus
    BonusACapacity: StatusEffectType
    BonusVCapacity: StatusEffectType
    Heat: StatusEffectType
    CuntStretched: StatusEffectType
    //Penalties
    Infested: StatusEffectType
    WormPlugged: StatusEffectType
    Dysfunction: StatusEffectType
    SlimeCraving: StatusEffectType
    //Neutral
    Feeder: StatusEffectType
    MeanToNaga: StatusEffectType
    Contraceptives: StatusEffectType
    Eggs: StatusEffectType
    Uniball: StatusEffectType

    //------------
    // COMBAT
    //------------
    //Buffs
    ChargeWeapon: StatusEffectType
    Might: StatusEffectType
    Climbed: StatusEffectType
    //Debuffs
    Acid: StatusEffectType
    Blind: StatusEffectType
    Bind: StatusEffectType
    Confusion: StatusEffectType
    NoFlee: StatusEffectType
    Poison: StatusEffectType
    Silence: StatusEffectType
    StoneLust: StatusEffectType
    Stunned: StatusEffectType
    TemporaryHeat: StatusEffectType
    Venom: StatusEffectType
    ParalyzeVenom: StatusEffectType
    LustVenom: StatusEffectType
    Fertilized: StatusEffectType

    ButtStretched: StatusEffectType
    LactationEndurance: StatusEffectType
    LactationReduction: StatusEffectType

    constructor() {
        //------------
        // NON-COMBAT
        //------------
        //Bonus
        this.BonusACapacity = new StatusEffectType("Bonus aCapacity")
        this.BonusVCapacity = new StatusEffectType("Bonus vCapacity")
        this.Heat = new StatusEffectType("Heat")
        this.CuntStretched = new StatusEffectType("Cunt Stretched")

        //Penalties
        this.Infested = new StatusEffectType("Infested")
        this.WormPlugged = new StatusEffectType("Worm Plugged")
        this.Dysfunction = new StatusEffectType("Dysfunction")
        this.SlimeCraving = new StatusEffectType("Slime Craving")

        //Neutral
        this.Feeder = new StatusEffectType("Feeder")
        this.MeanToNaga = new StatusEffectType("Mean to Naga")
        this.Contraceptives = new StatusEffectType("Contraceptives")
        this.Eggs = new StatusEffectType("Eggs")
        this.Uniball = new StatusEffectType("Uniball") //TODO: Check code to see if this would be better as a gameflag

        //------------
        // COMBAT
        //------------
        //Buffs
        this.ChargeWeapon = new StatusEffectType("ChargeWeapon")
        this.Might = new StatusEffectType("Might")
        this.Climbed = new StatusEffectType("Climbed") // Used in Sand Trap fight;
        //Debuffs
        this.Acid = new StatusEffectType("Acid")
        this.Blind = new StatusEffectType("Blind")
        this.Bind = new StatusEffectType("Bind") //Value determines the type.
        this.Confusion = new StatusEffectType("Confusion")
        this.NoFlee = new StatusEffectType("NoFlee")
        this.Poison = new StatusEffectType("Poison")
        this.Silence = new StatusEffectType("Silence")
        this.StoneLust = new StatusEffectType("StoneLust")
        this.Stunned = new StatusEffectType("Stunned")
        this.TemporaryHeat = new StatusEffectType("TempHeat")
        this.Venom = new StatusEffectType("Venom")
        this.ParalyzeVenom = new StatusEffectType("ParalyzeVenom")
        this.LustVenom = new StatusEffectType("LustVenom")

        this.Fertilized = new StatusEffectType("Fertilized") // Used in SandTrap battles.

        //----------
        // TODO: verify: were called in Creature but not originally defined
        //---------
        this.ButtStretched = new StatusEffectType("ButtStretched")
        this.LactationEndurance = new StatusEffectType("LactationEndurance")
        this.LactationReduction = new StatusEffectType("LactationReduction")
    }
}
let StatusEffects = new StatusEffectTypeContainer()

export { BindType, VenomType, StatusEffects }
