import { outputText } from "../engine/text";
import { UTIL } from "../engine/utils";
import { Item, ITEM_TYPE_CONSUMABLE } from "../itemClass";
import { BodyLotion, HairDye, SkinOil } from "../itemConstructors";
import { ConsumableEffects } from "./consumableEffects";
import { TransformationEffects } from "./transformationEffects";
class ItemConsumables {
    constructor() {
        //------------
        // STANDARD
        //------------
        this.BeeHoney = new Item("BeeHony", "Bee Honey", "a small vial filled with giant-bee honey", ITEM_TYPE_CONSUMABLE);
        this.BeeHoney.description = "This fine crystal vial is filled with a thick amber liquid that glitters dully in the light. You can smell a sweet scent, even though it is tightly corked.";
        this.BeeHoney.consumeEffect = TransformationEffects.beeTFs(0);
        this.CaninePepper = new Item("CanineP", "Canine Pp", "a canine pepper", ITEM_TYPE_CONSUMABLE);
        this.CaninePepper.description = "The pepper is shiny and red, bulbous at the base but long and narrow at the tip. It smells spicy.";
        this.CaninePepper.consumeEffect = UTIL.createCallBackFunction(TransformationEffects.canineTFs, 0);
        this.CaninePepperLarge = new Item("Large P", "Large Pp", "an overly large canine pepper", ITEM_TYPE_CONSUMABLE);
        this.CaninePepperLarge.description = "This large canine pepper is much bigger than any normal peppers you've seen.";
        this.CaninePepperLarge.consumeEffect = UTIL.createCallBackFunction(TransformationEffects.canineTFs, 1);
        this.CaninePepperLarge.value = 10;
        this.CaninePepperDouble = new Item("DoubleP", "Double Pp", "a double canine pepper", ITEM_TYPE_CONSUMABLE);
        this.CaninePepperDouble.description = "This canine pepper is actually two that have grown together due to some freak coincidence.";
        this.CaninePepperDouble.consumeEffect = UTIL.createCallBackFunction(TransformationEffects.canineTFs, 2);
        this.CaninePepperDouble.value = 10;
        this.CaninePepperBlack = new Item("Black P", "Black Pp", "a solid black canine pepper", ITEM_TYPE_CONSUMABLE);
        this.CaninePepperBlack.description = "This solid black canine pepper is smooth and shiny, but something about it doesn't seem quite right...";
        this.CaninePepperBlack.consumeEffect = UTIL.createCallBackFunction(TransformationEffects.canineTFs, 3);
        this.CaninePepperBlack.value = 10;
        this.CaninePepperKnotty = new Item("KnottyP", "Knotty Pp", "a knotty canine pepper", ITEM_TYPE_CONSUMABLE);
        this.CaninePepperKnotty.description = "This knotted pepper is very swollen, with a massive, distended knot near the base.";
        this.CaninePepperKnotty.consumeEffect = UTIL.createCallBackFunction(TransformationEffects.canineTFs, 4);
        this.CaninePepperKnotty.value = 10;
        this.CaninePepperBulby = new Item("Bulby P", "Bulby Pp", "a bulbous canine pepper", ITEM_TYPE_CONSUMABLE);
        this.CaninePepperBulby.description = "This bulbous pepper has a slightly different shape than the other canine peppers, with two large orb-like protrusions at the base.";
        this.CaninePepperBulby.consumeEffect = UTIL.createCallBackFunction(TransformationEffects.canineTFs, 5);
        this.CaninePepperBulby.value = 10;
        this.Equinum = new Item("Equinum", "Equinum", "a vial of Equinum", ITEM_TYPE_CONSUMABLE);
        this.Equinum.description = 'This is a long flared vial with a small label that reads, "<i>Equinum</i>". It is likely this potion is tied to horses in some way.';
        this.Equinum.consumeEffect = TransformationEffects.equineTFs;
        this.GoblinAle = new Item("Gob.Ale", "Goblin Ale", "a flagon of potent goblin ale", ITEM_TYPE_CONSUMABLE);
        this.GoblinAle.description = "This sealed flagon of 'Goblin Ale' sloshes noisily with alcoholic brew. Judging by the markings on the flagon, it's a VERY strong drink, and not to be trifled with.";
        this.GoblinAle.consumeEffect = TransformationEffects.goblinTFs;
        this.GoldenSeed = new Item("G.Seed", "Golden Seed", "a golden seed", ITEM_TYPE_CONSUMABLE);
        this.GoldenSeed.description = "This seed looks and smells absolutely delicious.  Though it has an unusual color, the harpies prize these nuts as delicious treats.  Eating one might induce some physical transformations.";
        this.GoldenSeed.consumeEffect = TransformationEffects.harpyTFs(0);
        this.Hummanus = new Item("Hummus ", "Hummanus", "a small jar of hummus", ITEM_TYPE_CONSUMABLE);
        this.Hummanus.description = 'This is a small jar with label that reads, "<i>Hummanus</i>". If the name clues you in, this might be how humanity is regained.';
        this.Hummanus.consumeEffect = TransformationEffects.humanTFs;
        this.ImpFood = new Item("ImpFood", "Imp Food", "a parcel of imp food", ITEM_TYPE_CONSUMABLE);
        this.ImpFood.description = "This is a small parcel of reddish-brown bread stuffed with some kind of meat. It smells delicious.";
        this.ImpFood.consumeEffect = TransformationEffects.impTFs;
        this.LaBova = new Item("LaBova", "La Bova", 'a bottle containing a misty fluid labeled "LaBova"', ITEM_TYPE_CONSUMABLE);
        this.LaBova.description = "A bottle containing a misty fluid with a grainy texture, it has a long neck and a ball-like base.  The label has a stylized picture of a well endowed cowgirl nursing two guys while they jerk themselves off.";
        this.LaBova.consumeEffect = TransformationEffects.cowTFs(true, false);
        this.Lactaid = new Item("Lactaid", "Lactaid", 'a pink bottle labelled "Lactaid"', ITEM_TYPE_CONSUMABLE);
        this.Lactaid.description = "Judging by the name printed on this bottle, 'Lactaid' probably has an effect on the ability to lactate, and you doubt that effect is a reduction.";
        this.Lactaid.consumeEffect = ConsumableEffects.lactaid;
        this.MinotaurBlood = new Item("M.Blood", "MinoBlood", "a vial of Minotaur blood", ITEM_TYPE_CONSUMABLE);
        this.MinotaurBlood.description = "You've got a scratched up looking vial full of bright red minotaur blood.  Any time you move it around it seems to froth up, as if eager to escape.";
        this.MinotaurBlood.consumeEffect = TransformationEffects.minotaurTFs;
        this.MinotaurCum = new Item("M.Cum", "MinoCum", "a sealed bottle of minotaur cum", ITEM_TYPE_CONSUMABLE);
        this.MinotaurCum.description = "This bottle of minotaur cum looks thick and viscous.  You know it has narcotic properties, but aside from that its effects are relatively unknown.";
        this.MinotaurCum.consumeEffect = ConsumableEffects.minotaurCum(false);
        this.MinotaurCum.value = 60;
        this.PigTruffle = new Item("PigTruf", "Pig Truffle", "a pigtail truffle", ITEM_TYPE_CONSUMABLE);
        this.PigTruffle.description = "It's clear where this fungus gets its name. A small, curly sprig resembling a pig's tail can be seen jutting out of it.";
        this.PigTruffle.consumeEffect = TransformationEffects.pigTFs;
        this.PureHoney = new Item("PurHon", "Pure Honey", "a crystal vial filled with glittering honey", ITEM_TYPE_CONSUMABLE);
        this.PureHoney.description = "This fine crystal vial is filled with a thick amber liquid that glitters in the light.  You can smell a sweet scent, even though it is tightly corked.";
        this.PureHoney.consumeEffect = TransformationEffects.beeTFs(1);
        this.PureHoney.value = 40;
        this.Reptilum = new Item("Reptilum", "Reptilum", "a vial of Reptilum", ITEM_TYPE_CONSUMABLE);
        this.Reptilum.description = 'This is a rounded bottle with a small label that reads, "<i>Reptilum</i>".  It is likely this potion is tied to reptiles in some way.';
        this.Reptilum.consumeEffect = TransformationEffects.lizardTFs;
        this.SnakeOil = new Item("SnakeOil", "Snake Oil", "a vial of snake oil", ITEM_TYPE_CONSUMABLE);
        this.SnakeOil.description = "A vial the size of your fist made of dark brown glass. It contains what appears to be an oily, yellowish liquid. The odor is abominable.";
        this.SnakeOil.consumeEffect = TransformationEffects.snakeTFs;
        this.SpecialHoney = new Item("SPHoney", "Special Honey", "a bottle of special bee honey", ITEM_TYPE_CONSUMABLE);
        this.SpecialHoney.description = "A clear crystal bottle of a dark brown fluid that you got from the bee handmaiden.  It gives off a strong sweet smell even though the bottle is still corked.";
        this.SpecialHoney.consumeEffect = TransformationEffects.beeTFs(2);
        this.SpecialHoney.value = 20;
        this.TrapOil = new Item("TrapOil", "TrapOil", "a vial of trap oil.", ITEM_TYPE_CONSUMABLE);
        this.TrapOil.description = "A round, opaque glass vial filled with a clear, viscous fluid.  It has a symbol inscribed on it, a circle with a cross and arrow pointing out of it in opposite directions.  It looks and smells entirely innocuous.";
        //this.TrapOil.consumeEffect = TransformationEffects.trapOil;
        this.WetCloth = new Item("W.Cloth", "Wet Cloth", "a wet cloth dripping with slippery slime", ITEM_TYPE_CONSUMABLE);
        this.WetCloth.description = "Dripping with a viscous slime, you've no doubt rubbing this cloth on your body would have some kind of strange effect.";
        this.WetCloth.consumeEffect = TransformationEffects.slimeTFs; //TODO
        this.WhiskerFruit = new Item("W.Fruit", "W.Fruit", "a piece of whisker-fruit", ITEM_TYPE_CONSUMABLE);
        this.WhiskerFruit.description = "This small, peach-sized fruit has tiny whisker-like protrusions growing from the sides.";
        this.WhiskerFruit.consumeEffect = TransformationEffects.felineTFs;
        //------------
        // DEMONIC
        //------------
        this.IncubiDraft = new Item("I.Draft", "I.Draft", "a flask of Incubi draft", ITEM_TYPE_CONSUMABLE);
        this.IncubiDraft.description = "The cork-topped flask swishes with a slimy looking off-white fluid, purported to give incubi-like powers. A stylized picture of a humanoid with a huge penis is etched into the glass.";
        this.IncubiDraft.consumeEffect = UTIL.createCallBackFunction(TransformationEffects.demonTFs, 0, false);
        this.IncubiDraftPurified = new Item("P.Draft", "P.Draft", "an untainted flask of purified Incubi draft", ITEM_TYPE_CONSUMABLE);
        this.IncubiDraftPurified.description =
            "The cork-topped flask swishes with a slimy looking off-white fluid, purported to give incubi-like powers. A stylized picture of a humanoid with a huge penis is etched into the glass. Rathazul has purified this to prevent corruption upon use.";
        this.IncubiDraftPurified.consumeEffect = UTIL.createCallBackFunction(TransformationEffects.demonTFs, 0, true);
        this.IncubiDraftPurified.value = 20;
        this.SuccubiMilk = new Item("SucMilk", "SucMilk", "a bottle of Succubi milk", ITEM_TYPE_CONSUMABLE);
        this.SuccubiMilk.description =
            'This milk-bottle is filled to the brim with a creamy white milk of dubious origin. A pink label proudly labels it as "<i>Succubi Milk</i>". In small text at the bottom of the label it reads: "<i>To bring out the succubus in YOU!</i>"';
        this.SuccubiMilk.consumeEffect = UTIL.createCallBackFunction(TransformationEffects.demonTFs, 1, false);
        // There are two definitions for SuccubiMilkPurified. Which one is the correct one?
        this.SuccubiMilkPurified = new Item("P.S.Mlk", "P.S.Milk", "an untainted bottle of Succubi milk", ITEM_TYPE_CONSUMABLE);
        this.SuccubiMilkPurified.description =
            'This milk-bottle is filled to the brim with a creamy white milk of dubious origin. A pink label proudly labels it as "<i>Succubi Milk</i>". In small text at the bottom of the label it reads: "<i>To bring out the succubus in YOU!</i>" Rathazul has purified this to prevent corruption upon use.';
        this.SuccubiMilkPurified.consumeEffect = UTIL.createCallBackFunction(TransformationEffects.demonTFs, 1, true);
        this.SuccubiMilkPurified.value = 20;
        this.SuccubiDelight = new Item("SDelite", "S.Delite", "a bottle of 'Succubi's Delight'", ITEM_TYPE_CONSUMABLE);
        this.SuccubiDelight.description = "This precious fluid is often given to men a succubus intends to play with for a long time.";
        this.SuccubiDelight.consumeEffect = UTIL.createCallBackFunction(TransformationEffects.succubiDelight, false);
        this.SuccubiMilkPurified = new Item("PSDelit", "PSDelit", 'an untainted bottle of "Succubi\'s Delight"', ITEM_TYPE_CONSUMABLE);
        this.SuccubiMilkPurified.description = "This precious fluid is often given to men a succubus intends to play with for a long time.  It has been partially purified by Rathazul to prevent corruption.";
        this.SuccubiMilkPurified.consumeEffect = UTIL.createCallBackFunction(TransformationEffects.succubiDelight, true);
        this.SuccubiMilkPurified.value = 20;
        //------------
        // NON-TFs
        //------------
        this.BlackBook = new Item("B.Book", "Black Book", "a small book with a midnight-black cover", ITEM_TYPE_CONSUMABLE);
        this.BlackBook.description =
            "This solid black book is totally unmarked, saved for a blood red clasp that holds the covers closed until you are ready to read it.  The pages are edged with gold, like some of the fancy books in the monastary back home.";
        this.BlackBook.consumeEffect = ConsumableEffects.blackSpellbook;
        this.BlackBook.value = 40;
        this.Condom = new Item("Condom", "Condom", "a condom packet", ITEM_TYPE_CONSUMABLE);
        this.Condom.description = "This wrapper contains a latex condom that can be worn over penis. It's designed to prevent pregnancy most of the time. Can be used in certain sex scenes.";
        this.Condom.consumeEffect = function () {
            outputText("You look at the unopened packet of condom.  If applicable, you can use the condom to prevent pregnancy most of the time.");
        };
        this.Condom.value = 6;
        this.FishFillet = new Item("FishFil", "F. Fillet", "a fish fillet", ITEM_TYPE_CONSUMABLE);
        this.FishFillet.description = "A perfectly cooked piece of fish. You're not sure what type of fish is, since you're fairly certain \"delicious\" is not a valid species.";
        this.FishFillet.consumeEffect = ConsumableEffects.fishFillet;
        this.LustDraft = new Item("L.Draft", "Lust Draft", "a vial of roiling bubble-gum pink fluid", ITEM_TYPE_CONSUMABLE);
        this.LustDraft.description = 'This vial of bright pink fluid bubbles constantly inside the glass, as if eager to escape. It smells very sweet, and has "Lust" inscribed on the side of the vial.';
        this.LustDraft.consumeEffect = ConsumableEffects.lustDraft;
        this.LustDraft.value = 20;
        this.FuckDraft = new Item("F.Draft", "Fuck Draft", 'a vial of roiling red fluid labeled "Fuck Draft".', ITEM_TYPE_CONSUMABLE);
        this.FuckDraft.description = 'This vial of red fluid bubbles constantly inside the glass, as if eager to escape.  It smells very strongly, though its odor is difficult to identify.  The word "Fuck" is inscribed on the side of the vial.';
        this.FuckDraft.consumeEffect = UTIL.createCallBackFunction(ConsumableEffects.lustDraft, true);
        this.FuckDraft.value = 20;
        this.OviElixir = new Item("OviElix", "Ovi Elixir", "a salve marked as 'Ovulation Exlixir'", ITEM_TYPE_CONSUMABLE);
        this.OviElixir.description = "This hexagonal container with an egg-shaped label can help you or others lay eggs.";
        this.OviElixir.consumeEffect = ConsumableEffects.oviElixir;
        this.OviElixir.value = 30;
        this.Reducto = new Item("Reducto", "Reducto", "a salve marked as 'Reducto'", ITEM_TYPE_CONSUMABLE);
        this.Reducto.description = "This container full of paste can be used to shrink a body part down by a significant amount.";
        this.Reducto.consumeEffect = ConsumableEffects.reductoMenu;
        this.Reducto.value = 30;
        this.ScholarsTea = new Item("Smart T", "Scholars T.", "a cup of scholar's tea", ITEM_TYPE_CONSUMABLE);
        this.ScholarsTea.description = "This potent tea supposedly has mind-strengthening effects.";
        this.ScholarsTea.consumeEffect = ConsumableEffects.scholarsTea;
        this.TatteredScroll = new Item("T.Scroll", "Tattered Scroll", "a tattered scroll", ITEM_TYPE_CONSUMABLE);
        this.TatteredScroll.description = "This tattered scroll is written in strange symbols, yet you have the feeling that if you tried to, you could decipher it.";
        this.TatteredScroll.consumeEffect = ConsumableEffects.tatteredScroll;
        this.VitalityTincture = new Item("Vital T", "Vitality T.", "a fish fillet", ITEM_TYPE_CONSUMABLE);
        this.VitalityTincture.description = "This powerful brew is supposedly good for the strengthening the body.";
        this.VitalityTincture.consumeEffect = ConsumableEffects.vitalityTincture;
        this.WhiteBook = new Item("W.Book", "White Book", "a small book with a pristine white cover", ITEM_TYPE_CONSUMABLE);
        this.WhiteBook.description = "This white book is totally unmarked, and the cover is devoid of any lettering or title.  A shiny brass clasp keeps the covers closed until you are ready to read it.";
        this.WhiteBook.consumeEffect = ConsumableEffects.whiteSpellBook;
        this.WhiteBook.value = 40;
        //------------
        // DYES/OILS/LOTIONS
        //------------
        this.HairDyeAuburn = HairDye("AuburnD", "Auburn");
        this.HairDyeBlack = HairDye("Black D", "Black");
        this.HairDyeBlond = HairDye("Blond D", "Blond");
        this.HairDyeBlue = HairDye("BlueDye", "Blue");
        this.HairDyeBrown = HairDye("Brown D", "Brown");
        this.HairDyeGray = HairDye("GrayDye", "Gray");
        this.HairDyeGreen = HairDye("Green D", "Green");
        this.HairDyeOrange = HairDye("OrangeD", "Orange");
        this.HairDyePink = HairDye("PinkDye", "Pink");
        this.HairDyePurple = HairDye("PurpleD", "Purple");
        this.HairDyeRainbow = HairDye("RainDye", "Rainbow");
        this.HairDyeRed = HairDye("Red Dye", "Red");
        this.HairDyeWhite = HairDye("White D", "White");
        this.SkinOilDark = SkinOil("DarkOil", "Dark");
        this.SkinOilEbony = SkinOil("EbonyOl", "Ebony");
        this.SkinOilFair = SkinOil("FairOil", "Fair");
        this.SkinOilLight = SkinOil("LightOl", "Light");
        this.SkinOilMahogany = SkinOil("MahogOl", "Mahogany");
        this.SkinOilOlive = SkinOil("OliveOl", "Olive");
        this.SkinOilRusset = SkinOil("RussOil", "Russet");
        this.BodyLotionClear = BodyLotion("ClearLn", "Clear", "smooth thick creamy liquid");
        this.BodyLotionRough = BodyLotion("RoughLn", "Rough", "thick abrasive cream");
        this.BodyLotionSexy = BodyLotion("SexyLtn", "Sexy", "pretty cream like substance");
        this.BodyLotionSmooth = BodyLotion("SmthLtn", "Smooth", "smooth thick creamy liquid");
        //-------------
        // EGGS
        //-------------
        // Needed for Amily transformation code to work. Flesh out when we can obtain the items.
        this.BlackEgg = new Item("BlEgg", "Black Egg", "a black egg", ITEM_TYPE_CONSUMABLE);
        this.LBlackEgg = new Item("LBlEgg", "L.Black Egg", "a large black egg", ITEM_TYPE_CONSUMABLE);
    }
}
export { ItemConsumables };
//# sourceMappingURL=consumables.js.map