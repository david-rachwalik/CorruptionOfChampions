import { GUI } from "../engine/gui"
import { IItem, Item, ITEM_TYPE_MATERIAL } from "../itemClass"

class ItemMaterials {
    GreenGel: IItem
    BeeChitin: IItem
    ImpSkull: IItem

    constructor() {
        this.GreenGel = new Item("GreenGl", "Green Gel", "a clump of green gel", ITEM_TYPE_MATERIAL)
        this.GreenGel.description = "This tough substance has no obvious use that you can discern."
        this.GreenGel.useText = function () {
            GUI.outputText("You examine the gel thoroughly, noting it is tough and resiliant, yet extremely pliable. Somehow you know eating it would not be a good idea.")
            return false
        }

        this.BeeChitin = new Item("B.Chitn", "B.Chitin", "a large shard of chitinous plating", ITEM_TYPE_MATERIAL)
        this.BeeChitin.description = "A perfect piece of black chitin from a bee-girl. It still has some fuzz on it."
        this.BeeChitin.useText = function () {
            GUI.outputText("You look over the chitin carefully but cannot find a use for it. Maybe someone else will know how to use it.")
            return false
        }

        this.ImpSkull = new Item("ImpSkull", "Imp Skull", "To Be Added", ITEM_TYPE_MATERIAL)
        this.ImpSkull.description = "To be added"
        this.ImpSkull.useText = function () {
            GUI.outputText("To Be Added.")
            return false
        }
    }
}

export { ItemMaterials }
