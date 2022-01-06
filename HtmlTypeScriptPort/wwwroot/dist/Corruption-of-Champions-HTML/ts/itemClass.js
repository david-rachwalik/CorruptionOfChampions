import { clearOutput, outputText } from "./engine/text";
let ItemLib = {}; //Hold item IDs for purpose of looking up or for save data.
export const ITEM_TYPE_WEAPON = "Weapon";
export const ITEM_TYPE_ARMOUR = "Armour";
export const ITEM_TYPE_UNDERGARMENT = "Undergarment";
export const ITEM_TYPE_CONSUMABLE = "Consumable";
export const ITEM_TYPE_MATERIAL = "Material";
export const ITEM_TYPE_SHIELD = "Shield";
class Item {
    constructor(itemId, itemShortName, itemLongName, itemType) {
        //Required values, will be declared by parameters
        this.id = itemId;
        this.shortName = itemShortName;
        this.longName = itemLongName;
        this.type = itemType;
        //Optional
        this.description = ""; //This will appear on tooltip.
        this.value = 6; //The value in gems. Defaults at 6.
        //Consumable values that can be set
        this.consumeEffect = null;
        //Equipment values that can be set
        this.equipmentName = "";
        this.attack = 0;
        this.defense = 0;
        this.sexiness = 0;
        this.verb = "";
        //Add to library for lookup.
        ItemLib[this.id] = this;
    }
    getTooltipDescription() {
        var text = this.description;
        text += "<br><br><b>Type:</b> " + this.type;
        text += "<br><b>Base value:</b> " + this.value;
        if (this.type == ITEM_TYPE_WEAPON) {
            text += "<br><b>Attack:</b> " + this.attack;
        }
        if (this.type == ITEM_TYPE_ARMOUR || this.type == ITEM_TYPE_UNDERGARMENT) {
            if (this.defense > 0)
                text += "<br><b>Defense:</b> " + this.defense;
            if (this.sexiness > 0)
                text += "<br><b>Sexiness:</b> " + this.sexiness;
        }
        return text;
    }
    canUse() {
        if (this.type == ITEM_TYPE_MATERIAL)
            return false;
        else
            return true;
    }
    useItem() {
        if (this.type == ITEM_TYPE_CONSUMABLE) {
            if (this.consumeEffect != null) {
                this.consumeEffect();
            }
            return false;
        }
        if (this.type == ITEM_TYPE_WEAPON || this.type == ITEM_TYPE_ARMOUR) {
            this.equipItem();
            return false;
        }
        return true;
    }
    useText() { }
    equipItem() {
        clearOutput();
        outputText("You equip your " + this.equipmentName + ".");
        var oldItem = null;
        //Determine if it's weapon or armour.
        if (this.type == ITEM_TYPE_WEAPON) {
            if (player.weapon.id != Items.NOTHING.id)
                oldItem = lookupItem(player.weapon.id);
            player.weapon = this;
        }
        if (this.type == ITEM_TYPE_ARMOUR) {
            if (player.armor.id != Items.NOTHING.id)
                oldItem = lookupItem(player.armor.id);
            player.armor = this;
        }
        //Check if you aren't previously using fists or naked.
        if (oldItem != null) {
            outputText(" You still have your old " + oldItem.equipmentName + " left over. ");
            Inventory.takeItem(oldItem, Inventory.inventoryMenu);
        }
        else {
            doNext(Inventory.inventoryMenu);
        }
    }
    unequipItem() {
        //TODO
    }
}
class ItemContainer {
    constructor() {
        this.NOTHING = new Item("Nothing", "NOTHING!", "nothing", ITEM_TYPE_MATERIAL);
        this.NOTHING.description = "You know, you are not supposed to see this tooltip. Please let Kitteh6660 know so he can fix it.";
        this.NOTHING.equipmentName = "nothing";
        this.NOTHING.verb = "punch";
        this.NOTHING.value = -1;
        this.NOTHING.defense = 0;
        this.NOTHING.attack = 0;
    }
}
let Items = new ItemContainer();
export { Item, ItemLib, Items };
//# sourceMappingURL=itemClass.js.map