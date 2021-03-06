import { UTIL, Item, ConsumableEffects } from 'coc';
import { ITEM_TYPE_CONSUMABLE } from './itemClass';

function HairDye(dyeId: string, dyeColor: string) {
  const newItem = new Item(dyeId, dyeColor + ' Dye', 'a vial of ' + dyeColor + ' hair dye', ITEM_TYPE_CONSUMABLE);
  newItem.description = "This bottle of dye will allow you to change the color of your hair. Of course if you don't have hair, using this would be a waste.";
  newItem.consumeEffect = UTIL.createCallBackFunction(ConsumableEffects.hairDye, dyeColor.toLowerCase());
  return newItem;
}

function SkinOil(oilId: string, oilColor: string) {
  const newItem = new Item(oilId, oilColor + ' Oil', 'a bottle of ' + oilColor + ' oil', ITEM_TYPE_CONSUMABLE);
  newItem.description = 'A small glass bottle filled with a smooth clear liquid. A label across the front says, "' + oilColor + ' Skin Oil."';
  newItem.consumeEffect = UTIL.createCallBackFunction(ConsumableEffects.skinOil, oilColor.toLowerCase());
  return newItem;
}

function BodyLotion(lotionId: string, lotionType: string, longAdj: string) {
  const newItem = new Item(lotionId, lotionType + ' Ltn', 'a flask of ' + lotionType + ' lotion', ITEM_TYPE_CONSUMABLE);
  newItem.description = 'A small wooden flask filled with a ' + longAdj + ' . A label across the front says, "' + lotionType + ' Lotion."';
  newItem.consumeEffect = UTIL.createCallBackFunction(ConsumableEffects.bodyLotion, lotionType.toLowerCase());
  return newItem;
}

export { HairDye, SkinOil, BodyLotion };
