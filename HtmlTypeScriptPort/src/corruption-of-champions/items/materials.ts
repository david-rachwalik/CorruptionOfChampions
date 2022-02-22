import * as GUI from '../engine/gui';
import * as ENUM from '../flags/asset-enums';
import { Item } from '../itemClass';

class ItemMaterials {
  GreenGel: Item;
  BeeChitin: Item;
  ImpSkull: Item;
  SpiderSilk: Item;
  T_SSILK: Item;
  DragonScale: Item;

  constructor() {
    this.GreenGel = new Item('GreenGl', 'Green Gel', 'a clump of green gel', ENUM.ItemType.Material);
    this.GreenGel.description = 'This tough substance has no obvious use that you can discern.';
    this.GreenGel.useText = function () {
      GUI.outputText(
        'You examine the gel thoroughly, noting it is tough and resiliant, yet extremely pliable. Somehow you know eating it would not be a good idea.',
      );
      return false;
    };

    this.BeeChitin = new Item('B.Chitn', 'B.Chitin', 'a large shard of chitinous plating', ENUM.ItemType.Material);
    this.BeeChitin.description = 'A perfect piece of black chitin from a bee-girl. It still has some fuzz on it.';
    this.BeeChitin.useText = function () {
      GUI.outputText('You look over the chitin carefully but cannot find a use for it. Maybe someone else will know how to use it.');
      return false;
    };

    this.ImpSkull = new Item('ImpSkull', 'Imp Skull', 'To Be Added', ENUM.ItemType.Material);
    this.ImpSkull.description = 'To be added';
    this.ImpSkull.useText = this.toBeAdded;

    this.SpiderSilk = new Item('SpiderSilk', 'Spider Silk', 'To Be Added', ENUM.ItemType.Material);
    this.SpiderSilk.description = 'To be added';
    this.SpiderSilk.useText = this.toBeAdded;

    this.T_SSILK = new Item('T_SSILK', 'T_SSILK', 'To Be Added', ENUM.ItemType.Material);
    this.T_SSILK.description = 'To be added';
    this.T_SSILK.useText = this.toBeAdded;

    this.DragonScale = new Item('DragonScale', 'Dragon Scale', 'To Be Added', ENUM.ItemType.Material);
    this.DragonScale.description = 'To be added';
    this.DragonScale.useText = this.toBeAdded;
  }

  toBeAdded() {
    GUI.outputText('To Be Added.');
    return false;
  }
}

export { ItemMaterials };
