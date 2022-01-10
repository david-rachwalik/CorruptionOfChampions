import { Item } from "../itemClass";
class ItemArmor {
    constructor() {
        this.ComfortableClothes = new Item("C.Cloth", "C.Cloth", "a set of comfortable clothes", ITEM_TYPE_ARMOUR);
        this.ComfortableClothes.description = "These loose fitting and comfortable clothes allow you to move freely while protecting you from the elements.";
        this.ComfortableClothes.equipmentName = "comfortable clothes";
        this.ComfortableClothes.value = 6;
        this.ComfortableClothes.defense = 0;
        this.GelArmor = new Item("GelArmr", "Gel Armor", "a suit of gel armour", ITEM_TYPE_ARMOUR);
        this.GelArmor.description = "This suit of interlocking plates is made from a strange green material. It feels spongy to the touch but is amazingly resiliant.";
        this.GelArmor.equipmentName = "glistening gel-armor plates";
        this.GelArmor.value = 150;
        this.GelArmor.defense = 10;
        this.BeeArmor = new Item("BeeArmr", "Bee Armor", "a set of chitinous armour", ITEM_TYPE_ARMOUR);
        this.BeeArmor.description = "A suit of armour cleverly fashioned from giant bee chitin. It comes with a silken loincloth to protect your modesty.";
        this.BeeArmor.equipmentName = "sexy black chitin armour-plating";
        this.BeeArmor.value = 200;
        this.BeeArmor.defense = 18;
        this.BeeArmor.sexiness = 3;
        this.LustyMaidenArmor = new Item("L.Mad.Arm.", "Lusty Maiden's Armor", "to be added", ITEM_TYPE_ARMOUR);
        this.LustyMaidenArmor.description = "To Be Added.";
        //this.LustyMaidenArmor.equipmentName
        //this.LustyMaidenArmor.value
        //this.LustyMaidenArmor.defense
        //this.LustyMaidenArmor.sexiness
    }
}
export { ItemArmor };
//# sourceMappingURL=armor.js.map