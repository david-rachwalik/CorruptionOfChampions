import { liveData } from "../globalVariables.js";
import { Item, Items, ITEM_TYPE_WEAPON } from "../itemClass.js";
import { PerkLib } from "../perkLib.js";
class ItemWeapon {
    constructor() {
        this.BeautifulSword = new Item("B.Sword", "B. Sword", "a beautiful sword", ITEM_TYPE_WEAPON);
        this.BeautifulSword.description =
            "This beautiful sword shines brilliantly in the light, showing the flawless craftsmanship of its blade. The pommel and guard are heavily decorated in gold and brass. Some craftsman clearly poured his heart and soul into this blade.";
        this.BeautifulSword.equipmentName = "beautiful sword";
        this.BeautifulSword.verb = "slash";
        this.BeautifulSword.value = 400;
        this.BeautifulSword.attack = 16;
        this.Pipe = new Item("Pipe", "Pipe", "a pipe", ITEM_TYPE_WEAPON);
        this.Pipe.description = "This is a simple rusted pipe of unknown origins. It's hefty and could probably be used as an effective bludgeoning tool.";
        this.Pipe.equipmentName = "pipe";
        this.Pipe.verb = "smash";
        this.Pipe.value = 25;
        this.Pipe.attack = 5;
        this.WizardStaff = new Item("W.Staff", "W. Staff", "a wizard's staff", ITEM_TYPE_WEAPON);
        this.WizardStaff.description =
            "This staff is made of very old wood and seems to tingle to the touch.  The top has an odd zig-zag shape to it, and the wood is worn smooth from lots of use.  It probably belonged to a wizard at some point and would aid magic use.";
        this.WizardStaff.equipmentName = "wizard's staff";
        this.WizardStaff.verb = liveData.player.findPerk(PerkLib.StaffChanneling) >= 0 ? "shot" : "smack"; //TODO Test this
        this.WizardStaff.value = 350;
        this.WizardStaff.attack = 3;
        // TODO Weapon also adds a perk. Need to see how to add this in upon equip. "Wizard's Focus", PerkLib.WizardsFocus, 0.4, 0, 0, 0
        // (not originally declared; added to compile)
        this.JewelRapier = Items.NOTHING;
        this.Katana = Items.NOTHING;
        this.SPEAR = Items.NOTHING;
    }
}
export { ItemWeapon };
//# sourceMappingURL=weapons.js.map