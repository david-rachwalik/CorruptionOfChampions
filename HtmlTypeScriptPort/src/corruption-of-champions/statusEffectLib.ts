import { StatusEffectType } from './statusEffectClass';

enum BindType {
  BIND_TYPE_GOO = 0,
  BIND_TYPE_NAGA,
  BIND_TYPE_TENTACLE,
}

enum VenomType {
  VENOM_TYPE_BEE = 0,
  VENOM_TYPE_NAGA,
}

class StatusEffectTypeContainer {
  //------------
  // NON-COMBAT
  //------------
  //Bonus
  BonusACapacity: StatusEffectType;
  BonusVCapacity: StatusEffectType;
  Heat: StatusEffectType;
  CuntStretched: StatusEffectType;
  //Penalties
  Infested: StatusEffectType;
  WormPlugged: StatusEffectType;
  Dysfunction: StatusEffectType;
  SlimeCraving: StatusEffectType;
  //Neutral
  Feeder: StatusEffectType;
  MeanToNaga: StatusEffectType;
  Contraceptives: StatusEffectType;
  Eggs: StatusEffectType;
  Uniball: StatusEffectType;

  //------------
  // COMBAT
  //------------
  //Buffs
  ChargeWeapon: StatusEffectType;
  Might: StatusEffectType;
  Climbed: StatusEffectType;
  //Debuffs
  Acid: StatusEffectType;
  Blind: StatusEffectType;
  Bind: StatusEffectType;
  Confusion: StatusEffectType;
  NoFlee: StatusEffectType;
  Poison: StatusEffectType;
  Silence: StatusEffectType;
  StoneLust: StatusEffectType;
  Stunned: StatusEffectType;
  TemporaryHeat: StatusEffectType;
  Venom: StatusEffectType;
  ParalyzeVenom: StatusEffectType;
  LustVenom: StatusEffectType;
  Fertilized: StatusEffectType;

  ButtStretched: StatusEffectType;
  LactationEndurance: StatusEffectType;
  LactationReduction: StatusEffectType;
  BlackCatBeer: StatusEffectType;
  ImpUber: StatusEffectType;
  ImpSkip: StatusEffectType;

  // unverified
  LactationReduc0: StatusEffectType;
  LactationReduc1: StatusEffectType;
  LactationReduc2: StatusEffectType;
  LactationReduc3: StatusEffectType;
  Rut: StatusEffectType;
  Web: StatusEffectType;
  BlackNipples: StatusEffectType;
  Shielding: StatusEffectType;
  HolliConstrict: StatusEffectType;
  LustStones: StatusEffectType;
  Sandstorm: StatusEffectType;
  Sealed: StatusEffectType;
  Berzerking: StatusEffectType;
  TailWhip: StatusEffectType;
  UBERWEB: StatusEffectType;
  DriderKiss: StatusEffectType;
  WebSilence: StatusEffectType;
  GooArmorSilence: StatusEffectType;
  Whispered: StatusEffectType;
  AkbalSpeed: StatusEffectType;

  AmilyVenom: StatusEffectType;
  SheilaOil: StatusEffectType;
  TwuWuv: StatusEffectType;
  TuvWuv: StatusEffectType;
  FirstAttack: StatusEffectType;
  IsabellaStunned: StatusEffectType;
  ThroatPunch: StatusEffectType;
  KissOfDeath: StatusEffectType;
  AcidSlap: StatusEffectType;
  CalledShot: StatusEffectType;
  DemonSeed: StatusEffectType;
  InfestAttempted: StatusEffectType;
  Disarmed: StatusEffectType;
  AnemoneVenom: StatusEffectType;
  GnollSpear: StatusEffectType;
  BasiliskCompulsion: StatusEffectType;
  BasiliskSlow: StatusEffectType;
  GiantGrabbed: StatusEffectType;
  GiantBoulder: StatusEffectType;
  GiantStrLoss: StatusEffectType;
  LizanBlowpipe: StatusEffectType;
  IzmaBleed: StatusEffectType;
  GardenerSapSpeed: StatusEffectType;
  KnockedBack: StatusEffectType;
  RemovedArmor: StatusEffectType;
  JCLustLevel: StatusEffectType;
  MirroredAttack: StatusEffectType;
  Tentagrappled: StatusEffectType;
  TentagrappleCooldown: StatusEffectType;
  ShowerDotEffect: StatusEffectType;
  VineHealUsed: StatusEffectType;
  TentacleCoolDown: StatusEffectType;
  GooStuffed: StatusEffectType;
  NakedOn: StatusEffectType;
  Kelt: StatusEffectType;
  KeltBJ: StatusEffectType;

  constructor() {
    //------------
    // NON-COMBAT
    //------------
    //Bonus
    this.BonusACapacity = new StatusEffectType('Bonus aCapacity');
    this.BonusVCapacity = new StatusEffectType('Bonus vCapacity');
    this.Heat = new StatusEffectType('Heat');
    this.CuntStretched = new StatusEffectType('Cunt Stretched');

    //Penalties
    this.Infested = new StatusEffectType('Infested');
    this.WormPlugged = new StatusEffectType('Worm Plugged');
    this.Dysfunction = new StatusEffectType('Dysfunction');
    this.SlimeCraving = new StatusEffectType('Slime Craving');

    //Neutral
    this.Feeder = new StatusEffectType('Feeder');
    this.MeanToNaga = new StatusEffectType('Mean to Naga');
    this.Contraceptives = new StatusEffectType('Contraceptives');
    this.Eggs = new StatusEffectType('Eggs');
    this.Uniball = new StatusEffectType('Uniball'); //TODO: Check code to see if this would be better as a gameflag

    //------------
    // COMBAT
    //------------
    //Buffs
    this.ChargeWeapon = new StatusEffectType('ChargeWeapon');
    this.Might = new StatusEffectType('Might');
    this.Climbed = new StatusEffectType('Climbed'); // Used in Sand Trap fight;
    //Debuffs
    this.Acid = new StatusEffectType('Acid');
    this.Blind = new StatusEffectType('Blind');
    this.Bind = new StatusEffectType('Bind'); //Value determines the type.
    this.Confusion = new StatusEffectType('Confusion');
    this.NoFlee = new StatusEffectType('NoFlee');
    this.Poison = new StatusEffectType('Poison');
    this.Silence = new StatusEffectType('Silence');
    this.StoneLust = new StatusEffectType('StoneLust');
    this.Stunned = new StatusEffectType('Stunned');
    this.TemporaryHeat = new StatusEffectType('TempHeat');
    this.Venom = new StatusEffectType('Venom');
    this.ParalyzeVenom = new StatusEffectType('ParalyzeVenom');
    this.LustVenom = new StatusEffectType('LustVenom');

    this.Fertilized = new StatusEffectType('Fertilized'); // Used in SandTrap battles.

    //----------
    // TODO: verify: called in Creature but not originally defined
    //---------
    this.ButtStretched = new StatusEffectType('ButtStretched');
    this.LactationEndurance = new StatusEffectType('LactationEndurance');
    this.LactationReduction = new StatusEffectType('LactationReduction');
    this.BlackCatBeer = new StatusEffectType('BlackCatBeer');
    this.ImpUber = new StatusEffectType('ImpUber');
    this.ImpSkip = new StatusEffectType('ImpSkip');
    this.LactationReduc0 = new StatusEffectType('LactationReduc0');
    this.LactationReduc1 = new StatusEffectType('LactationReduc1');
    this.LactationReduc2 = new StatusEffectType('LactationReduc2');
    this.LactationReduc3 = new StatusEffectType('LactationReduc3');
    this.Rut = new StatusEffectType('Rut');
    this.Web = new StatusEffectType('Web');
    this.BlackNipples = new StatusEffectType('BlackNipples');
    this.Shielding = new StatusEffectType('Shielding');
    this.HolliConstrict = new StatusEffectType('HolliConstrict');
    this.LustStones = new StatusEffectType('LustStones');
    this.Sandstorm = new StatusEffectType('Sandstorm');
    this.Sealed = new StatusEffectType('Sealed');
    this.Berzerking = new StatusEffectType('Berzerking');
    this.TailWhip = new StatusEffectType('TailWhip');
    this.UBERWEB = new StatusEffectType('UBERWEB');
    this.DriderKiss = new StatusEffectType('DriderKiss');
    this.WebSilence = new StatusEffectType('WebSilence');
    this.GooArmorSilence = new StatusEffectType('GooArmorSilence');
    this.Whispered = new StatusEffectType('Whispered');
    this.AkbalSpeed = new StatusEffectType('AkbalSpeed');
    this.AmilyVenom = new StatusEffectType('AmilyVenom');
    this.SheilaOil = new StatusEffectType('SheilaOil');
    this.TwuWuv = new StatusEffectType('TwuWuv');
    this.TuvWuv = new StatusEffectType('TuvWuv');
    this.FirstAttack = new StatusEffectType('FirstAttack');
    this.IsabellaStunned = new StatusEffectType('IsabellaStunned');
    this.ThroatPunch = new StatusEffectType('ThroatPunch');
    this.KissOfDeath = new StatusEffectType('KissOfDeath');
    this.AcidSlap = new StatusEffectType('AcidSlap');
    this.CalledShot = new StatusEffectType('CalledShot');
    this.DemonSeed = new StatusEffectType('DemonSeed');
    this.InfestAttempted = new StatusEffectType('InfestAttempted');
    this.Disarmed = new StatusEffectType('Disarmed');
    this.AnemoneVenom = new StatusEffectType('AnemoneVenom');
    this.GnollSpear = new StatusEffectType('GnollSpear');
    this.BasiliskCompulsion = new StatusEffectType('BasiliskCompulsion');
    this.BasiliskSlow = new StatusEffectType('BasiliskSlow');
    this.GiantGrabbed = new StatusEffectType('GiantGrabbed');
    this.GiantBoulder = new StatusEffectType('GiantBoulder');
    this.GiantStrLoss = new StatusEffectType('GiantStrLoss');
    this.LizanBlowpipe = new StatusEffectType('LizanBlowpipe');
    this.IzmaBleed = new StatusEffectType('IzmaBleed');
    this.GardenerSapSpeed = new StatusEffectType('GardenerSapSpeed');
    this.KnockedBack = new StatusEffectType('KnockedBack');
    this.RemovedArmor = new StatusEffectType('RemovedArmor');
    this.JCLustLevel = new StatusEffectType('JCLustLevel');
    this.MirroredAttack = new StatusEffectType('MirroredAttack');
    this.Tentagrappled = new StatusEffectType('Tentagrappled');
    this.TentagrappleCooldown = new StatusEffectType('TentagrappleCooldown');
    this.ShowerDotEffect = new StatusEffectType('ShowerDotEffect');
    this.VineHealUsed = new StatusEffectType('VineHealUsed');
    this.TentacleCoolDown = new StatusEffectType('TentacleCoolDown');
    this.GooStuffed = new StatusEffectType('GooStuffed');
    this.NakedOn = new StatusEffectType('NakedOn');
    this.Kelt = new StatusEffectType('Kelt');
    this.KeltBJ = new StatusEffectType('KeltBJ');
  }
}

export { BindType, VenomType, StatusEffectTypeContainer };
