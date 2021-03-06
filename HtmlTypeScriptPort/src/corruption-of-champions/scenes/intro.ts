import * as GUI from '../engine/gui';
import * as ENUM from '../flags/asset-enums';
import { liveData } from '../main-context';
import { Player } from '../models/player';
import * as Camp from '../scenes/camp';

//------------
// CREATION
//------------
export function initializeNewGame() {
  //Initialize player
  liveData.player = new Player();
  liveData.player.HP = liveData.player.maxHP();
  // liveData.player.weapon = liveData.Items.NOTHING;
  liveData.player.armor = liveData.Items.Armor.ComfortableClothes;
  liveData.player.hunger = 80;
  liveData.player.location = 'Camp';
  //Clear Flags
  //flags = [0] * 3000;
  //Route to character naming
  chooseName();
}
export function chooseName() {
  GUI.clearOutput();
  GUI.outputText(
    'You grew up in the small village of Ingnam, a remote village with rich traditions, buried deep in the wilds.  Every year for as long as you can remember, your village has chosen a champion to send to the cursed Demon Realm.  Legend has it that in years Ingnam has failed to produce a champion, chaos has reigned over the countryside.  Children disappear, crops wilt, and disease spreads like wildfire.  This year, <b>you</b> have been selected to be the champion.<br><br>What is your name?<br>',
  );
  GUI.outputText('<input type="text" name="inputname" id="inputname">');
  GUI.doNext(chooseGender);
}
export function chooseGender() {
  const inputValue = (<HTMLInputElement>document.getElementById('inputname')).value;
  if (inputValue.length < 1) {
    GUI.clearOutput();
    GUI.outputText('You must input a name. Off you go!');
    GUI.doNext(chooseName);
    return;
  }
  liveData.player.name = inputValue; //Apply name
  GUI.clearOutput();
  GUI.outputText('You are ' + liveData.player.name + '. Are you a man or a woman?');
  GUI.menu();
  GUI.addButton(0, 'Man', setGender, ENUM.GenderType.Male);
  GUI.addButton(1, 'Woman', setGender, ENUM.GenderType.Female);
  GUI.addButton(2, 'Hermaphrodite', setGender, ENUM.GenderType.Herm);
}
export function setGender(gender: ENUM.GenderType): void {
  switch (gender) {
    case ENUM.GenderType.NONE:
      break;
    case ENUM.GenderType.Male: //Male
      //Attribute changes
      liveData.player.str += 3;
      liveData.player.tou += 2;
      //Body changes
      liveData.player.fertility = 5;
      liveData.player.hairLength = 1;
      liveData.player.tallness = 71;
      liveData.player.tone = 60;
      //Genetalia
      liveData.player.balls = 2;
      liveData.player.ballSize = 1;
      liveData.player.clitLength = 0;
      liveData.player.createCock(5.5, 1, ENUM.CockType.HUMAN);
      liveData.player.cocks[0].knotMultiplier = 1;
      //Breasts
      liveData.player.createBreastRow();
      break;
    case ENUM.GenderType.Female: //Female
      //Attribute changes
      liveData.player.spe += 3;
      liveData.player.inte += 2;
      //Body changes
      liveData.player.fertility = 10;
      liveData.player.hairLength = 10;
      liveData.player.tallness = 67;
      liveData.player.tone = 30;
      //Genetalia
      liveData.player.balls = 0;
      liveData.player.ballSize = 0;
      liveData.player.createVagina(true, 0, 0);
      liveData.player.clitLength = 0.5;
      //Breasts
      liveData.player.createBreastRow();
      break;
    case ENUM.GenderType.Herm: //Hermaphrodite
      //Attribute changes
      liveData.player.str += 1;
      liveData.player.tou += 1;
      liveData.player.spe += 1;
      liveData.player.inte += 1;
      //Body changes
      liveData.player.fertility = 10;
      liveData.player.hairLength = 10;
      liveData.player.tallness = 69;
      liveData.player.tone = 45;
      //Genetalia
      liveData.player.createVagina();
      liveData.player.clitLength = 0.5;
      liveData.player.createCock(5.5, 1, ENUM.CockType.HUMAN);
      liveData.player.cocks[0].knotMultiplier = 1;
      //Breasts
      liveData.player.createBreastRow();
      break;
    default:
  }
  chooseBuild();
}
export function chooseBuild() {
  GUI.clearOutput();
  GUI.menu();
  switch (liveData.player.gender) {
    case ENUM.GenderType.NONE:
      GUI.outputText("This isn't supposed to happen. Off you go!");
      GUI.doNext(chooseGender);
      break;
    case ENUM.GenderType.Male:
      GUI.outputText('You are a man. Your upbringing has provided you an advantage in strength and toughness.');
      GUI.addButton(0, 'Lean', setBuild, 'MaleLean');
      GUI.addButton(1, 'Average', setBuild, 'MaleAverage');
      GUI.addButton(2, 'Thick', setBuild, 'MaleThick');
      GUI.addButton(3, 'Girly', setBuild, 'MaleGirly');
      break;
    case ENUM.GenderType.Female:
      GUI.outputText('You are a woman. Your upbringing has provided you an advantage in speed and intellect.');
      GUI.addButton(0, 'Slender', setBuild, 'FemaleSlender');
      GUI.addButton(1, 'Average', setBuild, 'FemaleAverage');
      GUI.addButton(2, 'Curvy', setBuild, 'FemaleCurvy');
      GUI.addButton(3, 'Tomboyish', setBuild, 'FemaleTomboyish');
      break;
    case ENUM.GenderType.Herm:
      GUI.outputText('You are a hermaphrodite. Your upbringing has provided you with the best of both worlds.');
      GUI.addButton(0, 'Mas. Lean', setBuild, 'MaleLean');
      GUI.addButton(1, 'Mas. Average', setBuild, 'MaleAverage');
      GUI.addButton(2, 'Mas. Thick', setBuild, 'MaleThick');
      GUI.addButton(5, 'Fem. Slender', setBuild, 'FemaleSlender');
      GUI.addButton(6, 'Fem. Average', setBuild, 'FemaleAverage');
      GUI.addButton(7, 'Fem. Curvy', setBuild, 'FemaleCurvy');
      break;
    default:
    //This line shouldn't be reached.
  }
  GUI.outputText('<br><br>What type of build do you have?');
}
export function setBuild(build: string): void {
  switch (build) {
    //Male builds (Hermaphrodites choosing these builds will be a maleherm)
    case 'MaleLean':
      liveData.player.str -= 1;
      liveData.player.spe += 1;

      liveData.player.femininity = 34;
      liveData.player.thickness = 30;
      liveData.player.tone += 5;

      liveData.player.breastRows[0].breastRating = ENUM.BreastSizeType.CUP_FLAT;
      liveData.player.buttRating = ENUM.ButtRatingType.TIGHT;
      liveData.player.hipRating = ENUM.HipRatingType.SLENDER;
      break;
    case 'MaleAverage':
      liveData.player.femininity = 30;
      liveData.player.thickness = 50;

      liveData.player.breastRows[0].breastRating = ENUM.BreastSizeType.CUP_FLAT;
      liveData.player.buttRating = ENUM.ButtRatingType.AVERAGE;
      liveData.player.hipRating = ENUM.HipRatingType.AVERAGE;
      break;
    case 'MaleThick':
      liveData.player.spe -= 4;
      liveData.player.str += 2;
      liveData.player.tou += 2;

      liveData.player.femininity = 29;
      liveData.player.thickness = 70;
      liveData.player.tone -= 5;

      liveData.player.breastRows[0].breastRating = ENUM.BreastSizeType.CUP_FLAT;
      liveData.player.buttRating = ENUM.ButtRatingType.NOTICEABLE;
      liveData.player.hipRating = ENUM.HipRatingType.AVERAGE;
      break;
    case 'MaleGirly':
      liveData.player.str -= 2;
      liveData.player.spe += 2;

      liveData.player.femininity = 50;
      liveData.player.thickness = 50;
      liveData.player.tone = 26;

      liveData.player.breastRows[0].breastRating = ENUM.BreastSizeType.CUP_A;
      liveData.player.buttRating = ENUM.ButtRatingType.NOTICEABLE;
      liveData.player.hipRating = ENUM.HipRatingType.SLENDER;
      break;
    //Female builds (Hermaphrodites choosing these builds will be a futanari)
    case 'FemaleSlender':
      liveData.player.str -= 1;
      liveData.player.spe += 1;

      liveData.player.femininity = 66;
      liveData.player.thickness = 30;
      liveData.player.tone += 5;

      liveData.player.breastRows[0].breastRating = ENUM.BreastSizeType.CUP_B;
      liveData.player.buttRating = ENUM.ButtRatingType.TIGHT;
      liveData.player.hipRating = ENUM.HipRatingType.AMPLE;
      break;
    case 'FemaleAverage':
      liveData.player.femininity = 70;
      liveData.player.thickness = 50;

      liveData.player.breastRows[0].breastRating = ENUM.BreastSizeType.CUP_C;
      liveData.player.buttRating = ENUM.ButtRatingType.NOTICEABLE;
      liveData.player.hipRating = ENUM.HipRatingType.AMPLE;
      break;
    case 'FemaleCurvy':
      liveData.player.spe -= 2;
      liveData.player.str += 1;
      liveData.player.tou += 1;

      liveData.player.femininity = 71;
      liveData.player.thickness = 70;

      liveData.player.breastRows[0].breastRating = ENUM.BreastSizeType.CUP_D;
      liveData.player.buttRating = ENUM.ButtRatingType.LARGE;
      liveData.player.hipRating = ENUM.HipRatingType.CURVY;
      break;
    case 'FemaleTomboyish':
      liveData.player.str += 1;
      liveData.player.spe -= 1;

      liveData.player.femininity = 56;
      liveData.player.thickness = 50;
      liveData.player.tone = 50;

      liveData.player.breastRows[0].breastRating = ENUM.BreastSizeType.CUP_A;
      liveData.player.buttRating = ENUM.ButtRatingType.TIGHT;
      liveData.player.hipRating = ENUM.HipRatingType.SLENDER;
      break;
    default:
  }
  customizeCharacterMenu();
}
//Customization GUI.menu
export function customizeCharacterMenu() {
  GUI.clearOutput();
  GUI.outputText('You can customize your character here. You will be able to alter your appearance through the usage of certain items.<br><br>');
  GUI.outputText('Height: ' + Math.floor(liveData.player.tallness / 12) + "'" + (liveData.player.tallness % 12) + '"<br>');
  GUI.outputText('Skin tone: ' + liveData.player.skinTone + '<br>');
  GUI.outputText('Hair color: ' + liveData.player.hairColor + '<br>');
  if (liveData.player.hasCock())
    GUI.outputText('Cock size: ' + liveData.player.cocks[0].cockLength + '" long, ' + liveData.player.cocks[0].cockThickness + '" thick<br>');
  GUI.outputText('Breast size: ' + liveData.player.breastCup(0) + '<br>');
  GUI.menu();
  GUI.addButton(0, 'Complexion', menuSkinComplexion);
  GUI.addButton(1, 'Hair Color', menuHairColor);
  /*if (player.mf("m", "f") == "m") {
            if (player.hasBeard()) {
                GUI.outputText("Beard: " + player.beardDescript() + "<br>");
            }
            GUI.addButton(2, "Beard Style", menuBeardSettings);
        }*/
  //GUI.addButton(3, "Set Height", setHeight);
  //if (player.hasCock()) GUI.addButton(5, "Cock Size", menuCockLength);
  //GUI.addButton(6, "Breast Size", menuBreastSize);
  GUI.addButton(9, 'Done', arrivalPartOne, true);
}
//Skin Colours
export function menuSkinComplexion() {
  GUI.clearOutput();
  GUI.outputText('What is your complexion?');
  GUI.menu();
  GUI.addButton(0, 'Light', confirmComplexion, 'light');
  GUI.addButton(1, 'Fair', confirmComplexion, 'fair');
  GUI.addButton(2, 'Olive', confirmComplexion, 'olive');
  GUI.addButton(3, 'Dark', confirmComplexion, 'dark');
  GUI.addButton(4, 'Ebony', confirmComplexion, 'ebony');
  GUI.addButton(5, 'Mahogany', confirmComplexion, 'mahogany');
  GUI.addButton(6, 'Russet', confirmComplexion, 'russet');
  GUI.addButton(14, 'Back', customizeCharacterMenu);
}
export function confirmComplexion(complexion: string): void {
  liveData.player.skinTone = complexion;
  customizeCharacterMenu();
}
//Hair Colours
export function menuHairColor() {
  GUI.clearOutput();
  GUI.outputText('What is your hair color?');
  GUI.menu();
  GUI.addButton(0, 'Blonde', confirmHairColor, 'blonde');
  GUI.addButton(1, 'Brown', confirmHairColor, 'brown');
  GUI.addButton(2, 'Black', confirmHairColor, 'black');
  GUI.addButton(3, 'Red', confirmHairColor, 'red');
  GUI.addButton(4, 'Gray', confirmHairColor, 'gray');
  GUI.addButton(5, 'White', confirmHairColor, 'white');
  GUI.addButton(6, 'Auburn', confirmHairColor, 'auburn');
  GUI.addButton(14, 'Back', customizeCharacterMenu);
}
export function confirmHairColor(color: string): void {
  liveData.player.hairColor = color;
  customizeCharacterMenu();
}

//------------
// PROLOGUE
//------------
export function arrivalPartOne(): void {
  GUI.clearOutput();
  GUI.outputText(
    "You are prepared for what is to come.  Most of the last year has been spent honing your body and mind to prepare for the challenges ahead.  You are the Champion of Ingnam.  The one who will journey to the demon realm and guarantee the safety of your friends and family, even though you'll never see them again.  You wipe away a tear as you enter the courtyard and see Elder Nomur waiting for you.  You are ready.<br><br>",
  );
  GUI.outputText(
    "The walk to the tainted cave is long and silent.  Elder Nomur does not speak.  There is nothing left to say.  The two of you journey in companionable silence.  Slowly the black rock of Mount Ilgast looms closer and closer, and the temperature of the air drops.   You shiver and glance at the Elder, noticing he doesn't betray any sign of the cold.  Despite his age of nearly 80, he maintains the vigor of a man half his age.  You're glad for his strength, as assisting him across this distance would be draining, and you must save your energy for the trials ahead.<br><br>",
  );
  GUI.outputText(
    'The entrance of the cave gapes open, sharp stalactites hanging over the entrance, giving it the appearance of a monstrous mouth.  Elder Nomur stops and nods to you, gesturing for you to proceed alone.<br><br>',
  );
  GUI.outputText('The cave is unusually warm and damp, ');
  if (liveData.player.gender == ENUM.GenderType.Female)
    GUI.outputText('and your body seems to feel the same way, flushing as you feel a warmth and dampness between your thighs. ');
  else GUI.outputText('and your body reacts with a sense of growing warmth focusing in your groin, your manhood hardening for no apparent reason. ');
  GUI.outputText(
    "You were warned of this and press forward, ignoring your body's growing needs.  A glowing purple-pink portal swirls and flares with demonic light along the back wall.  Cringing, you press forward, keenly aware that your body seems to be anticipating coming in contact with the tainted magical construct.  Closing your eyes, you gather your resolve and leap forwards.  Vertigo overwhelms you and you black out...",
  );
  GUI.showStats();
  liveData.player.changeLust(15, false);
  GUI.doNext(arrivalPartTwo);
}
export function arrivalPartTwo(): void {
  GUI.clearOutput();
  GUI.hideUpDown();
  liveData.time.hours = 18;
  GUI.outputText(
    "You wake with a splitting headache and a body full of burning desire.  A shadow darkens your view momentarily and your training kicks in.  You roll to the side across the bare ground and leap to your feet.  A surprised looking imp stands a few feet away, holding an empty vial.  He's completely naked, an improbably sized pulsing red cock hanging between his spindly legs.  You flush with desire as a wave of lust washes over you, your mind reeling as you fight ",
  );
  if (liveData.player.gender == ENUM.GenderType.Female) GUI.outputText('the urge to chase down his rod and impale yourself on it.<br><br>');
  else GUI.outputText('the urge to ram your cock down his throat.  The strangeness of the thought surprises you.<br><br>');
  GUI.outputText(
    'The imp says, "<i>I\'m amazed you aren\'t already chasing down my cock, human.  The last Champion was an eager whore for me by the time she woke up.  This lust draft made sure of it.</i>"',
  );
  liveData.player.modStats(['cor', 2]);
  liveData.player.changeLust(40, false);
  GUI.doNext(arrivalPartThree);
}
export function arrivalPartThree(): void {
  GUI.clearOutput();
  GUI.hideUpDown();
  liveData.player.changeLust(-30, false);
  GUI.outputText(
    "The imp shakes the empty vial to emphasize his point.  You reel in shock at this revelation - you've just entered the demon realm and you've already been drugged!  You tremble with the aching need in your groin, but resist, righteous anger lending you strength.<br><br>In desperation you leap towards the imp, watching with glee as his cocky smile changes to an expression of sheer terror.  The smaller creature is no match for your brute strength as you pummel him mercilessly.  You pick up the diminutive demon and punt him into the air, frowning grimly as he spreads his wings and begins speeding into the distance.<br><br>",
  );
  GUI.outputText(
    'The imp says, "<i>FOOL!  You could have had pleasure unending... but should we ever cross paths again you will regret humiliating me!  Remember the name Zetaz, as you\'ll soon face the wrath of my master!</i>"<br><br>',
  );
  GUI.outputText(
    "Your pleasure at defeating the demon ebbs as you consider how you've already been defiled.  You swear to yourself you will find the demon responsible for doing this to you and the other Champions, and destroy him AND his pet imp.",
  );
  GUI.doNext(arrivalPartFour);
}
export function arrivalPartFour(): void {
  GUI.clearOutput();
  GUI.outputText(
    "You look around, surveying the hellish landscape as you plot your next move.  The portal is a few yards away, nestled between a formation of rocks.  It does not seem to exude the arousing influence it had on the other side.  The ground and sky are both tinted different shades of red, though the earth beneath your feet feels as normal as any other lifeless patch of dirt.   You settle on the idea of making a camp here and fortifying this side of the portal.  No demons will ravage your beloved hometown on your watch.<br><br>It does not take long to set up your tent and a few simple traps.  You'll need to explore and gather more supplies to fortify it any further.  Perhaps you will even manage to track down the demons who have been abducting the other champions!",
  );
  GUI.doNext(Camp.doCamp);
}
