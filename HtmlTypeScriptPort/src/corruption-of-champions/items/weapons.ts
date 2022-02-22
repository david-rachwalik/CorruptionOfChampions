import * as ENUM from '../flags/asset-enums';
import { Item } from '../itemClass';
import { liveData } from '../main-context';

class ItemWeapon {
  BeautifulSword: Item;
  Pipe: Item;
  WizardStaff: Item;

  JewelRapier: Item;
  Katana: Item;
  SPEAR: Item;

  constructor() {
    this.BeautifulSword = new Item('B.Sword', 'B. Sword', 'a beautiful sword', ENUM.ItemType.Weapon);
    this.BeautifulSword.description =
      'This beautiful sword shines brilliantly in the light, showing the flawless craftsmanship of its blade. The pommel and guard are heavily decorated in gold and brass. Some craftsman clearly poured his heart and soul into this blade.';
    this.BeautifulSword.equipmentName = 'beautiful sword';
    this.BeautifulSword.verb = 'slash';
    this.BeautifulSword.value = 400;
    this.BeautifulSword.attack = 16;

    this.Pipe = new Item('Pipe', 'Pipe', 'a pipe', ENUM.ItemType.Weapon);
    this.Pipe.description = "This is a simple rusted pipe of unknown origins. It's hefty and could probably be used as an effective bludgeoning tool.";
    this.Pipe.equipmentName = 'pipe';
    this.Pipe.verb = 'smash';
    this.Pipe.value = 25;
    this.Pipe.attack = 5;

    this.WizardStaff = new Item('W.Staff', 'W. Staff', "a wizard's staff", ENUM.ItemType.Weapon);
    this.WizardStaff.description =
      'This staff is made of very old wood and seems to tingle to the touch.  The top has an odd zig-zag shape to it, and the wood is worn smooth from lots of use.  It probably belonged to a wizard at some point and would aid magic use.';
    this.WizardStaff.equipmentName = "wizard's staff";
    this.WizardStaff.verb = liveData.player.findPerk(liveData.PerkLib.StaffChanneling) >= 0 ? 'shot' : 'smack'; //TODO Test this
    this.WizardStaff.value = 350;
    this.WizardStaff.attack = 3;
    // TODO Weapon also adds a perk. Need to see how to add this in upon equip. "Wizard's Focus", liveData.PerkLib.WizardsFocus, 0.4, 0, 0, 0

    // (not originally declared; added to compile)
    this.JewelRapier = liveData.Items.NOTHING;
    this.Katana = liveData.Items.NOTHING;
    this.SPEAR = liveData.Items.NOTHING;
  }
}

export { ItemWeapon };
