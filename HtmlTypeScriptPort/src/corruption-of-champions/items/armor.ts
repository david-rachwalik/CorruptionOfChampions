import { Item, ENUM } from 'coc';

class ItemArmor {
  ComfortableClothes: Item;
  GelArmor: Item;
  BeeArmor: Item;
  LustyMaidenArmor: Item;
  GooArmor: Item;
  LethiciteArmor: Item;
  SpiderSilkArmor: Item;
  SpiderSilkRobes: Item;
  DragonscaleArmor: Item;
  DragonscaleRobes: Item;
  DSCLARM: Item;
  TentacledBarkArmor: Item;
  DivineBarkArmor: Item;
  DivineBarkPlates: Item;

  constructor() {
    this.ComfortableClothes = new Item('C.Cloth', 'C.Cloth', 'a set of comfortable clothes', ENUM.ItemType.Armour);
    this.ComfortableClothes.description = 'These loose fitting and comfortable clothes allow you to move freely while protecting you from the elements.';
    this.ComfortableClothes.equipmentName = 'comfortable clothes';
    this.ComfortableClothes.value = 6;
    this.ComfortableClothes.defense = 0;

    this.GelArmor = new Item('GelArmr', 'Gel Armor', 'a suit of gel armour', ENUM.ItemType.Armour);
    this.GelArmor.description =
      'This suit of interlocking plates is made from a strange green material. It feels spongy to the touch but is amazingly resiliant.';
    this.GelArmor.equipmentName = 'glistening gel-armor plates';
    this.GelArmor.value = 150;
    this.GelArmor.defense = 10;

    this.BeeArmor = new Item('BeeArmr', 'Bee Armor', 'a set of chitinous armour', ENUM.ItemType.Armour);
    this.BeeArmor.description = 'A suit of armour cleverly fashioned from giant bee chitin. It comes with a silken loincloth to protect your modesty.';
    this.BeeArmor.equipmentName = 'sexy black chitin armour-plating';
    this.BeeArmor.value = 200;
    this.BeeArmor.defense = 18;
    this.BeeArmor.sexiness = 3;

    this.LustyMaidenArmor = new Item('L.Mad.Arm.', "Lusty Maiden's Armor", 'to be added', ENUM.ItemType.Armour);
    this.LustyMaidenArmor.description = 'To Be Added.';
    //this.LustyMaidenArmor.equipmentName
    //this.LustyMaidenArmor.value
    //this.LustyMaidenArmor.defense
    //this.LustyMaidenArmor.sexiness

    this.GooArmor = new Item('GooArmor', 'Goo Armor', 'to be added', ENUM.ItemType.Armour);
    this.GooArmor.description = 'To Be Added.';

    this.LethiciteArmor = new Item('LethiciteArmor', 'Lethicite Armor', 'to be added', ENUM.ItemType.Armour);
    this.LethiciteArmor.description = 'To Be Added.';

    this.SpiderSilkArmor = new Item('SpiderSilkArmor', 'Spider Silk Armor', 'to be added', ENUM.ItemType.Armour);
    this.SpiderSilkArmor.description = 'To Be Added.';

    this.SpiderSilkRobes = new Item('SpiderSilkRobes', 'Spider Silk Robes', 'to be added', ENUM.ItemType.Armour);
    this.SpiderSilkRobes.description = 'To Be Added.';

    this.DragonscaleArmor = new Item('DragonscaleArmor', 'Dragonscale Armor', 'to be added', ENUM.ItemType.Undergarment);
    this.DragonscaleArmor.description = 'To Be Added.';

    this.DragonscaleRobes = new Item('DragonscaleRobes', 'Dragonscale Robes', 'to be added', ENUM.ItemType.Undergarment);
    this.DragonscaleRobes.description = 'To Be Added.';

    this.DSCLARM = new Item('DSCLARM', 'DSCLARM', 'to be added', ENUM.ItemType.Undergarment);
    this.DSCLARM.description = 'To Be Added.';

    this.TentacledBarkArmor = new Item('TentacledBarkArmor', 'Tentacled Bark Armor', 'to be added', ENUM.ItemType.Undergarment);
    this.TentacledBarkArmor.description = 'To Be Added.';

    this.DivineBarkArmor = new Item('DivineBarkArmor', 'Divine Bark Armor', 'to be added', ENUM.ItemType.Undergarment);
    this.DivineBarkArmor.description = 'To Be Added.';

    this.DivineBarkPlates = new Item('DivineBarkPlates', 'Divine Bark Plates', 'to be added', ENUM.ItemType.Undergarment);
    this.DivineBarkPlates.description = 'To Be Added.';
  }
}

class ItemUndergarments {
  SpiderSilkBra: Item;
  SpiderSilkPanties: Item;
  SpiderSilkLoincloth: Item;
  DragonscaleBra: Item;
  DragonscaleThong: Item;
  DragonscaleLoincloth: Item;
  DragonscaleThone: Item;

  constructor() {
    this.SpiderSilkBra = new Item('SpiderSilkBra', 'Spider Silk Bra', 'to be added', ENUM.ItemType.Undergarment);
    this.SpiderSilkBra.description = 'To Be Added.';

    this.SpiderSilkPanties = new Item('SpiderSilkPanties', 'Spider Silk Panties', 'to be added', ENUM.ItemType.Undergarment);
    this.SpiderSilkPanties.description = 'To Be Added.';

    this.SpiderSilkLoincloth = new Item('SpiderSilkLoincloth', 'Spider Silk Loincloth', 'to be added', ENUM.ItemType.Undergarment);
    this.SpiderSilkLoincloth.description = 'To Be Added.';

    this.DragonscaleBra = new Item('DragonscaleBra', 'Dragonscale Bra', 'to be added', ENUM.ItemType.Undergarment);
    this.DragonscaleBra.description = 'To Be Added.';

    this.DragonscaleThong = new Item('DragonscaleThong', 'Dragonscale Thong', 'to be added', ENUM.ItemType.Undergarment);
    this.DragonscaleThong.description = 'To Be Added.';

    this.DragonscaleLoincloth = new Item('DragonscaleLoincloth', 'Dragonscale Loincloth', 'to be added', ENUM.ItemType.Undergarment);
    this.DragonscaleLoincloth.description = 'To Be Added.';

    this.DragonscaleThone = new Item('DragonscaleThone', 'Dragonscale Thone', 'to be added', ENUM.ItemType.Undergarment);
    this.DragonscaleThone.description = 'To Be Added.';
  }
}

export { ItemArmor, ItemUndergarments };
