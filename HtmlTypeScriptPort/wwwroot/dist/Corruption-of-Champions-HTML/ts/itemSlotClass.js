import { Items } from "./itemClass.js";
class ItemSlot {
    constructor() {
        this.quantity = 0;
        this.itype = Items.NOTHING;
    }
    setItemAndQty(itype, quant) {
        if (itype == null)
            itype = Items.NOTHING;
        if (quant == 0 && itype == Items.NOTHING) {
            this.emptySlot();
            return;
        }
        if (quant < 0 || (quant == 0 && itype != Items.NOTHING) || (quant > 0 && itype == Items.NOTHING)) {
            quant = 0;
            itype = Items.NOTHING;
        }
        this.quantity = quant;
        this.itype = itype;
    }
    removeItem() { }
    removeOneItem() {
        if (this.quantity > 0) {
            this.quantity--;
            if (this.quantity <= 0)
                this.itype = Items.NOTHING;
        }
    }
    emptySlot() {
        this.quantity = 0;
        this.itype = Items.NOTHING;
    }
}
export { ItemSlot };
//# sourceMappingURL=itemSlotClass.js.map