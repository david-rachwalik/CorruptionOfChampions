import { Item, liveData } from 'coc';

class ItemSlot {
  quantity: number;
  itype: Item;

  constructor() {
    this.quantity = 0;
    this.itype = liveData.Items.NOTHING;
  }

  setItemAndQty(itype: Item, quant: number) {
    if (itype == null) itype = liveData.Items.NOTHING;
    if (quant == 0 && itype == liveData.Items.NOTHING) {
      this.emptySlot();
      return;
    }
    if (quant < 0 || (quant == 0 && itype != liveData.Items.NOTHING) || (quant > 0 && itype == liveData.Items.NOTHING)) {
      quant = 0;
      itype = liveData.Items.NOTHING;
    }
    this.quantity = quant;
    this.itype = itype;
  }
  removeItem() {
    //something
  }
  removeOneItem() {
    if (this.quantity > 0) {
      this.quantity--;
      if (this.quantity <= 0) this.itype = liveData.Items.NOTHING;
    }
  }
  emptySlot() {
    this.quantity = 0;
    this.itype = liveData.Items.NOTHING;
  }
}

export { ItemSlot };
