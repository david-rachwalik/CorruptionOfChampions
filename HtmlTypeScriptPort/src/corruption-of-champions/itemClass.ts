import * as GUI from './engine/gui';
import * as ENUM from './flags/asset-enums';
import { ItemArmor, ItemUndergarments } from './items/armor';
import { ItemConsumables } from './items/consumables';
import { ItemMaterials } from './items/materials';
import { ItemWeapon } from './items/weapons';
import { liveData } from './main-context';
import * as Inventory from './scenes/inventory';

class Item {
  //Required values, will be declared by parameters
  id: string;
  shortName: string;
  longName: string;
  type: number;
  //Optional
  description: string; //This will appear on tooltip.
  value: number; //The value in gems. Defaults at 6.
  //Consumable values that can be set
  consumeEffect: () => void;
  //Equipment values that can be set
  equipmentName: string;
  attack: number;
  defense: number;
  sexiness: number;
  verb: string;

  constructor(itemId: string, itemShortName: string, itemLongName: string, itemType: number) {
    //Required values, will be declared by parameters
    this.id = itemId;
    this.shortName = itemShortName;
    this.longName = itemLongName;
    this.type = itemType;

    //Optional
    this.description = ''; //This will appear on tooltip.
    this.value = 6; //The value in gems. Defaults at 6.

    //Consumable values that can be set
    this.consumeEffect = () => void {};

    //Equipment values that can be set
    this.equipmentName = '';
    this.attack = 0;
    this.defense = 0;
    this.sexiness = 0;
    this.verb = '';
    //Add to library for lookup.
    liveData.ItemLib[this.id] = this;
  }

  getTooltipDescription() {
    let text = this.description;
    text += '<br><br><b>Type:</b> ' + this.type;
    text += '<br><b>Base value:</b> ' + this.value;
    if (this.type == ENUM.ItemType.Weapon) {
      text += '<br><b>Attack:</b> ' + this.attack;
    }
    if (this.type == ENUM.ItemType.Armour || this.type == ENUM.ItemType.Undergarment) {
      if (this.defense > 0) text += '<br><b>Defense:</b> ' + this.defense;
      if (this.sexiness > 0) text += '<br><b>Sexiness:</b> ' + this.sexiness;
    }
    return text;
  }

  canUse() {
    if (this.type == ENUM.ItemType.Material) return false;
    else return true;
  }

  useItem() {
    if (this.type == ENUM.ItemType.Consumable) {
      if (this.consumeEffect != null) {
        this.consumeEffect();
      }
      return false;
    }
    if (this.type == ENUM.ItemType.Weapon || this.type == ENUM.ItemType.Armour) {
      this.equipItem();
      return false;
    }
    return true;
  }

  useText() {
    // To override
  }

  equipItem() {
    GUI.clearOutput();
    GUI.outputText('You equip your ' + this.equipmentName + '.');
    let oldItem: Item | null = null;
    //Determine if it's weapon or armour.
    if (this.type == ENUM.ItemType.Weapon) {
      if (liveData.player.weapon.id != liveData.Items.NOTHING.id) oldItem = liveData.lookupItem(liveData.player.weapon.id);
      liveData.player.weapon = this;
    }
    if (this.type == ENUM.ItemType.Armour) {
      if (liveData.player.armor.id != liveData.Items.NOTHING.id) oldItem = liveData.lookupItem(liveData.player.armor.id);
      liveData.player.armor = this;
    }
    //Check if you aren't previously using fists or naked.
    if (oldItem != null) {
      GUI.outputText(' You still have your old ' + oldItem.equipmentName + ' left over. ');
      Inventory.takeItem(oldItem, Inventory.inventoryMenu);
    } else {
      GUI.doNext(Inventory.inventoryMenu);
    }
  }

  unequipItem() {
    //TODO
  }
}

class ItemContainer {
  NOTHING: Item;
  Materials: ItemMaterials;
  Armor: ItemArmor;
  Weapons: ItemWeapon;
  Consumables: ItemConsumables;
  Undergarments: ItemUndergarments;

  constructor() {
    this.NOTHING = new Item('Nothing', 'NOTHING!', 'nothing', ENUM.ItemType.Material);
    this.NOTHING.description = 'You know, you are not supposed to see this tooltip. Please let Kitteh6660 know so he can fix it.';
    this.NOTHING.equipmentName = 'nothing';
    this.NOTHING.verb = 'punch';
    this.NOTHING.value = -1;
    this.NOTHING.defense = 0;
    this.NOTHING.attack = 0;

    this.Materials = new ItemMaterials();
    this.Armor = new ItemArmor();
    this.Weapons = new ItemWeapon();
    this.Consumables = new ItemConsumables();
    this.Undergarments = new ItemUndergarments();
  }
}

export { Item, ItemContainer };
