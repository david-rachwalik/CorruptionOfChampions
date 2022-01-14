import { IItem, Item, ITEM_TYPE_ARMOUR } from "../itemClass"

class ItemArmor {
    ComfortableClothes: IItem
    GelArmor: IItem
    BeeArmor: IItem
    LustyMaidenArmor: IItem
    GooArmor: IItem
    LethiciteArmor: IItem

    constructor() {
        this.ComfortableClothes = new Item("C.Cloth", "C.Cloth", "a set of comfortable clothes", ITEM_TYPE_ARMOUR)
        this.ComfortableClothes.description = "These loose fitting and comfortable clothes allow you to move freely while protecting you from the elements."
        this.ComfortableClothes.equipmentName = "comfortable clothes"
        this.ComfortableClothes.value = 6
        this.ComfortableClothes.defense = 0

        this.GelArmor = new Item("GelArmr", "Gel Armor", "a suit of gel armour", ITEM_TYPE_ARMOUR)
        this.GelArmor.description = "This suit of interlocking plates is made from a strange green material. It feels spongy to the touch but is amazingly resiliant."
        this.GelArmor.equipmentName = "glistening gel-armor plates"
        this.GelArmor.value = 150
        this.GelArmor.defense = 10

        this.BeeArmor = new Item("BeeArmr", "Bee Armor", "a set of chitinous armour", ITEM_TYPE_ARMOUR)
        this.BeeArmor.description = "A suit of armour cleverly fashioned from giant bee chitin. It comes with a silken loincloth to protect your modesty."
        this.BeeArmor.equipmentName = "sexy black chitin armour-plating"
        this.BeeArmor.value = 200
        this.BeeArmor.defense = 18
        this.BeeArmor.sexiness = 3

        this.LustyMaidenArmor = new Item("L.Mad.Arm.", "Lusty Maiden's Armor", "to be added", ITEM_TYPE_ARMOUR)
        this.LustyMaidenArmor.description = "To Be Added."
        //this.LustyMaidenArmor.equipmentName
        //this.LustyMaidenArmor.value
        //this.LustyMaidenArmor.defense
        //this.LustyMaidenArmor.sexiness

        this.GooArmor = new Item("GooArmor", "Goo Armor", "to be added", ITEM_TYPE_ARMOUR)
        this.GooArmor.description = "To Be Added."

        this.LethiciteArmor = new Item("LethiciteArmor", "Lethicite Armor", "to be added", ITEM_TYPE_ARMOUR)
        this.LethiciteArmor.description = "To Be Added."
    }
}

export { ItemArmor }
