import * as GUI from '../engine/gui';
import * as UTIL from '../engine/utils';
import * as ENUM from '../flags/asset-enums';
import * as FLAG from '../flags/dataFlags';
import { liveData } from '../main-context';
import * as COMBAT from '../scenes/combat';

export function teaseMain(justText = false) {
  COMBAT.fatigueRecovery();
  let damage;
  let chance;
  let bimbo = false;
  let bro = false;
  let futa = false;
  const choices: number[] = [];
  let select;
  //Tags used for bonus damage and chance later on
  let breasts = false;
  let penis = false;
  const balls = false;
  let vagina = false;
  let anus = false;
  let ass = false;
  //If auto = true, set up bonuses using above flags
  let auto = true;
  //==============================
  //Determine basic success chance.
  //==============================
  chance = 60;
  //5% chance for each tease level.
  chance += liveData.player.teaseLevel * 5;
  //Extra chance for sexy undergarments.
  //chance += player.upperGarment.sexiness;
  //chance += player.lowerGarment.sexiness;
  //10% for seduction perk
  if (liveData.player.findPerk(liveData.PerkLib.Seduction) >= 0) chance += 10;
  //10% for sexy armor types
  if (liveData.player.findPerk(liveData.PerkLib.SluttySeduction) >= 0) chance += 10;
  //10% for bimbo shits
  if (liveData.player.findPerk(liveData.PerkLib.BimboBody) >= 0) {
    chance += 10;
    bimbo = true;
  }
  if (liveData.player.findPerk(liveData.PerkLib.BroBody) >= 0) {
    chance += 10;
    bro = true;
  }
  if (liveData.player.findPerk(liveData.PerkLib.FutaForm) >= 0) {
    chance += 10;
    futa = true;
  }
  //2 & 2 for seductive valentines!
  if (liveData.player.findPerk(liveData.PerkLib.SensualLover) >= 0) {
    chance += 2;
  }
  //if (player.findPerk(liveData.PerkLib.ChiReflowLust) >= 0) chance += UmasShop.NEEDLEWORK_LUST_TEASE_MULTI;
  //==============================
  //Determine basic damage.
  //==============================
  damage = 6 + UTIL.rand(3);
  if (liveData.player.findPerk(liveData.PerkLib.SensualLover) >= 0) {
    damage += 2;
  }
  if (liveData.player.findPerk(liveData.PerkLib.Seduction) >= 0) damage += 5;
  //+ slutty armor bonus
  if (liveData.player.findPerk(liveData.PerkLib.SluttySeduction) >= 0) damage += liveData.player.perkValue(liveData.PerkLib.SluttySeduction, 1);
  //10% for bimbo shits
  if (bimbo || bro || futa) {
    damage += 5;
    bimbo = true;
  }
  if (liveData.player.level < 30) damage += liveData.player.level;
  else if (liveData.player.level < 60) damage += 30 + (liveData.player.level - 30) / 2;
  else damage += 45 + (liveData.player.level - 60) / 5;
  damage += liveData.player.teaseLevel * 2;
  //==============================
  //TEASE SELECT CHOICES
  //==BASICS========
  //0 butt shake
  //1 breast jiggle
  //2 pussy flash
  //3 cock flash
  //==BIMBO STUFF===
  //4 butt shake
  //5 breast jiggle
  //6 pussy flash
  //7 special Adjatha-crafted bend over bimbo times
  //==BRO STUFF=====
  //8 Pec Dance
  //9 Heroic Pose
  //10 Bulgy groin thrust
  //11 Show off dick
  //==EXTRAS========
  //12 Cat flexibility.
  //13 Pregnant
  //14 Brood Mother
  //15 Nipplecunts
  //16 Anal gape
  //17 Bee abdomen tease
  //18 DOG TEASE
  //19 Maximum Femininity:
  //20 Maximum MAN:
  //21 Perfect Androgyny:
  //22 SPOIDAH SILK
  //23 RUT
  //24 Poledance - req's staff! - Req's gender!  Req's TITS!
  //25 Tall Tease! - Reqs 2+ feet & PC Cunt!
  //26 SMART PEEPS! 70+ int, arouse spell!
  //27 - FEEDER
  //28 FEMALE TEACHER COSTUME TEASE
  //29 Male Teacher Outfit Tease
  //30 Naga Fetish Clothes
  //31 Centaur harness clothes
  //32 Genderless servant clothes
  //33 Crotch Revealing Clothes (herm only?)
  //34 Maid Costume (female only):
  //35 Servant Boy Clothes (male only)
  //36 Bondage Patient Clothes
  //37 Kitsune Tease
  //38 Kitsune Tease
  //39 Kitsune Tease
  //40 Kitsune Tease
  //41 Kitsune Gendered Tease
  //42 Urta teases
  //43 Cowgirl teases
  //44 Bikini Mail Tease
  //45 Lethicite Armor Tease
  //==============================
  //BUILD UP LIST OF TEASE CHOICES!
  //==============================
  //Futas!
  if ((futa || bimbo) && liveData.player.gender == 3) {
    //Once chance of butt.
    choices[choices.length] = 4;
    //Big butts get more butt
    if (liveData.player.buttRating >= 7) choices[choices.length] = 4;
    if (liveData.player.buttRating >= 10) choices[choices.length] = 4;
    if (liveData.player.buttRating >= 14) choices[choices.length] = 4;
    if (liveData.player.buttRating >= 20) choices[choices.length] = 4;
    if (liveData.player.buttRating >= 25) choices[choices.length] = 4;
    //Breast jiggle!
    if (liveData.player.biggestTitSize() >= 2) choices[choices.length] = 5;
    if (liveData.player.biggestTitSize() >= 4) choices[choices.length] = 5;
    if (liveData.player.biggestTitSize() >= 8) choices[choices.length] = 5;
    if (liveData.player.biggestTitSize() >= 15) choices[choices.length] = 5;
    if (liveData.player.biggestTitSize() >= 30) choices[choices.length] = 5;
    if (liveData.player.biggestTitSize() >= 50) choices[choices.length] = 5;
    if (liveData.player.biggestTitSize() >= 75) choices[choices.length] = 5;
    if (liveData.player.biggestTitSize() >= 100) choices[choices.length] = 5;
    //Pussy Flash!
    if (liveData.player.hasVagina()) {
      choices[choices.length] = 2;
      if (liveData.player.wetness() >= 3) choices[choices.length] = 6;
      if (liveData.player.wetness() >= 5) choices[choices.length] = 6;
      if (liveData.player.vaginalCapacity() >= 30) choices[choices.length] = 6;
      if (liveData.player.vaginalCapacity() >= 60) choices[choices.length] = 6;
      if (liveData.player.vaginalCapacity() >= 75) choices[choices.length] = 6;
    }
    //Adj special!
    if (liveData.player.hasVagina() && liveData.player.buttRating >= 8 && liveData.player.hipRating >= 6 && liveData.player.biggestTitSize() >= 4) {
      choices[choices.length] = 7;
      choices[choices.length] = 7;
      choices[choices.length] = 7;
      choices[choices.length] = 7;
    }
    //Cock flash!
    if (futa && liveData.player.hasCock()) {
      choices[choices.length] = 10;
      choices[choices.length] = 11;
      if (liveData.player.cockTotal() > 1) choices[choices.length] = 10;
      if (liveData.player.cockTotal() >= 2) choices[choices.length] = 11;
      if (liveData.player.biggestCockArea() >= 10) choices[choices.length] = 10;
      if (liveData.player.biggestCockArea() >= 25) choices[choices.length] = 11;
      if (liveData.player.biggestCockArea() >= 50) choices[choices.length] = 11;
      if (liveData.player.biggestCockArea() >= 75) choices[choices.length] = 10;
      if (liveData.player.biggestCockArea() >= 100) choices[choices.length] = 11;
      if (liveData.player.biggestCockArea() >= 300) choices[choices.length] = 10;
    }
  } else if (bro) {
    //8 Pec Dance
    if (liveData.player.biggestTitSize() < 1 && liveData.player.tone >= 60) {
      choices[choices.length] = 8;
      if (liveData.player.tone >= 70) choices[choices.length] = 8;
      if (liveData.player.tone >= 80) choices[choices.length] = 8;
      if (liveData.player.tone >= 90) choices[choices.length] = 8;
      if (liveData.player.tone == 100) choices[choices.length] = 8;
    }
    //9 Heroic Pose
    if (liveData.player.tone >= 60 && liveData.player.str >= 50) {
      choices[choices.length] = 9;
      if (liveData.player.tone >= 80) choices[choices.length] = 9;
      if (liveData.player.str >= 70) choices[choices.length] = 9;
      if (liveData.player.tone >= 90) choices[choices.length] = 9;
      if (liveData.player.str >= 80) choices[choices.length] = 9;
    }
    //Cock flash!
    if (liveData.player.hasCock()) {
      choices[choices.length] = 10;
      choices[choices.length] = 11;
      if (liveData.player.cockTotal() > 1) choices[choices.length] = 10;
      if (liveData.player.cockTotal() >= 2) choices[choices.length] = 11;
      if (liveData.player.biggestCockArea() >= 10) choices[choices.length] = 10;
      if (liveData.player.biggestCockArea() >= 25) choices[choices.length] = 11;
      if (liveData.player.biggestCockArea() >= 50) choices[choices.length] = 11;
      if (liveData.player.biggestCockArea() >= 75) choices[choices.length] = 10;
      if (liveData.player.biggestCockArea() >= 100) choices[choices.length] = 11;
      if (liveData.player.biggestCockArea() >= 300) choices[choices.length] = 10;
    }
  }
  //VANILLA FOLKS
  else {
    //Once chance of butt.
    choices[choices.length] = 0;
    //Big butts get more butt
    if (liveData.player.buttRating >= 7) choices[choices.length] = 0;
    if (liveData.player.buttRating >= 10) choices[choices.length] = 0;
    if (liveData.player.buttRating >= 14) choices[choices.length] = 0;
    if (liveData.player.buttRating >= 20) choices[choices.length] = 0;
    if (liveData.player.buttRating >= 25) choices[choices.length] = 0;
    //Breast jiggle!
    if (liveData.player.biggestTitSize() >= 2) choices[choices.length] = 1;
    if (liveData.player.biggestTitSize() >= 4) choices[choices.length] = 1;
    if (liveData.player.biggestTitSize() >= 8) choices[choices.length] = 1;
    if (liveData.player.biggestTitSize() >= 15) choices[choices.length] = 1;
    if (liveData.player.biggestTitSize() >= 30) choices[choices.length] = 1;
    if (liveData.player.biggestTitSize() >= 50) choices[choices.length] = 1;
    if (liveData.player.biggestTitSize() >= 75) choices[choices.length] = 1;
    if (liveData.player.biggestTitSize() >= 100) choices[choices.length] = 1;
    //Pussy Flash!
    if (liveData.player.hasVagina()) {
      choices[choices.length] = 2;
      if (liveData.player.wetness() >= 3) choices[choices.length] = 2;
      if (liveData.player.wetness() >= 5) choices[choices.length] = 2;
      if (liveData.player.vaginalCapacity() >= 30) choices[choices.length] = 2;
      if (liveData.player.vaginalCapacity() >= 60) choices[choices.length] = 2;
      if (liveData.player.vaginalCapacity() >= 75) choices[choices.length] = 2;
    }
    //Cock flash!
    if (liveData.player.hasCock()) {
      choices[choices.length] = 3;
      if (liveData.player.cockTotal() > 1) choices[choices.length] = 3;
      if (liveData.player.cockTotal() >= 2) choices[choices.length] = 3;
      if (liveData.player.biggestCockArea() >= 10) choices[choices.length] = 3;
      if (liveData.player.biggestCockArea() >= 25) choices[choices.length] = 3;
      if (liveData.player.biggestCockArea() >= 50) choices[choices.length] = 3;
      if (liveData.player.biggestCockArea() >= 75) choices[choices.length] = 3;
      if (liveData.player.biggestCockArea() >= 100) choices[choices.length] = 3;
      if (liveData.player.biggestCockArea() >= 300) choices[choices.length] = 3;
    }
  }
  //==EXTRAS========
  //12 Cat flexibility.
  if (liveData.player.findPerk(liveData.PerkLib.Flexibility) >= 0 && liveData.player.isBiped() && liveData.player.hasVagina()) {
    choices[choices.length] = 12;
    choices[choices.length] = 12;
    if (liveData.player.wetness() >= 3) choices[choices.length] = 12;
    if (liveData.player.wetness() >= 5) choices[choices.length] = 12;
    if (liveData.player.vaginalCapacity() >= 30) choices[choices.length] = 12;
  }
  //13 Pregnant
  if (liveData.player.pregnancyIncubation <= 216 && liveData.player.pregnancyIncubation > 0) {
    choices[choices.length] = 13;
    if (liveData.player.biggestLactation() >= 1) choices[choices.length] = 13;
    if (liveData.player.pregnancyIncubation <= 180) choices[choices.length] = 13;
    if (liveData.player.pregnancyIncubation <= 120) choices[choices.length] = 13;
    if (liveData.player.pregnancyIncubation <= 100) choices[choices.length] = 13;
    if (liveData.player.pregnancyIncubation <= 50) choices[choices.length] = 13;
    if (liveData.player.pregnancyIncubation <= 24) choices[choices.length] = 13;
    if (liveData.player.pregnancyIncubation <= 24) choices[choices.length] = 13;
    if (liveData.player.pregnancyIncubation <= 24) choices[choices.length] = 13;
    if (liveData.player.pregnancyIncubation <= 24) choices[choices.length] = 13;
  }
  //14 Brood Mother
  if (
    liveData.monster.hasCock() &&
    liveData.player.hasVagina() &&
    liveData.player.findPerk(liveData.PerkLib.BroodMother) >= 0 &&
    (liveData.player.pregnancyIncubation <= 0 || liveData.player.pregnancyIncubation > 216)
  ) {
    choices[choices.length] = 14;
    choices[choices.length] = 14;
    choices[choices.length] = 14;
    if (liveData.player.inHeat) choices[choices.length] = 14;
    if (liveData.player.inHeat) choices[choices.length] = 14;
    if (liveData.player.inHeat) choices[choices.length] = 14;
    if (liveData.player.inHeat) choices[choices.length] = 14;
    if (liveData.player.inHeat) choices[choices.length] = 14;
    if (liveData.player.inHeat) choices[choices.length] = 14;
    if (liveData.player.inHeat) choices[choices.length] = 14;
  }
  //15 Nipplecunts
  if (liveData.player.hasFuckableNipples()) {
    choices[choices.length] = 15;
    choices[choices.length] = 15;
    if (liveData.player.hasVagina()) choices[choices.length] = 15;
    if (liveData.player.hasVagina()) choices[choices.length] = 15;
    if (liveData.player.hasVagina()) choices[choices.length] = 15;
    if (liveData.player.wetness() >= 3) choices[choices.length] = 15;
    if (liveData.player.wetness() >= 5) choices[choices.length] = 15;
    if (liveData.player.biggestTitSize() >= 3) choices[choices.length] = 15;
    if (liveData.player.nippleLength >= 3) choices[choices.length] = 15;
  }
  //16 Anal gape
  if (liveData.player.ass.analLooseness >= 4) {
    choices[choices.length] = 16;
    if (liveData.player.ass.analLooseness >= 5) choices[choices.length] = 16;
  }
  //17 Bee abdomen tease
  if (liveData.player.tailType == ENUM.TailType.BEE_ABDOMEN) {
    choices[choices.length] = 17;
    choices[choices.length] = 17;
  }
  //18 DOG TEASE
  if (liveData.player.dogScore() >= 4 && liveData.player.hasVagina() && liveData.player.isBiped()) {
    choices[choices.length] = 18;
    choices[choices.length] = 18;
  }
  //19 Maximum Femininity:
  if (liveData.player.femininity >= 100) {
    choices[choices.length] = 19;
    choices[choices.length] = 19;
    choices[choices.length] = 19;
  }
  //20 Maximum MAN:
  if (liveData.player.femininity <= 0) {
    choices[choices.length] = 20;
    choices[choices.length] = 20;
    choices[choices.length] = 20;
  }
  //21 Perfect Androgyny:
  if (liveData.player.femininity == 50) {
    choices[choices.length] = 21;
    choices[choices.length] = 21;
    choices[choices.length] = 21;
  }
  //22 SPOIDAH SILK
  if (liveData.player.tailType == ENUM.TailType.SPIDER_ADBOMEN) {
    choices[choices.length] = 22;
    choices[choices.length] = 22;
    choices[choices.length] = 22;
    if (liveData.player.spiderScore() >= 4) {
      choices[choices.length] = 22;
      choices[choices.length] = 22;
      choices[choices.length] = 22;
    }
  }
  //23 RUT
  if (liveData.player.inRut && liveData.monster.hasVagina() && liveData.player.hasCock()) {
    choices[choices.length] = 23;
    choices[choices.length] = 23;
    choices[choices.length] = 23;
    choices[choices.length] = 23;
    choices[choices.length] = 23;
  }
  //24 Poledance - req's staff! - Req's gender!  Req's TITS!
  if (liveData.player.weapon.equipmentName == "wizard's staff" && liveData.player.biggestTitSize() >= 1 && liveData.player.gender > 0) {
    choices[choices.length] = 24;
    choices[choices.length] = 24;
    choices[choices.length] = 24;
    choices[choices.length] = 24;
    choices[choices.length] = 24;
  }
  //25 Tall Tease! - Reqs 2+ feet & PC Cunt!
  if (liveData.player.tallness - liveData.monster.tallness >= 24 && liveData.player.biggestTitSize() >= 4) {
    choices[choices.length] = 25;
    choices[choices.length] = 25;
    choices[choices.length] = 25;
    choices[choices.length] = 25;
    choices[choices.length] = 25;
  }
  //26 SMART PEEPS! 70+ int, arouse spell!
  if (liveData.player.inte >= 70 && liveData.player.spells.arouse) {
    choices[choices.length] = 26;
    choices[choices.length] = 26;
    choices[choices.length] = 26;
  }
  //27 FEEDER
  if (liveData.player.findPerk(liveData.PerkLib.Feeder) >= 0 && liveData.player.biggestTitSize() >= 4) {
    choices[choices.length] = 27;
    choices[choices.length] = 27;
    choices[choices.length] = 27;
    if (liveData.player.biggestTitSize() >= 10) choices[choices.length] = 27;
    if (liveData.player.biggestTitSize() >= 15) choices[choices.length] = 27;
    if (liveData.player.biggestTitSize() >= 25) choices[choices.length] = 27;
    if (liveData.player.biggestTitSize() >= 40) choices[choices.length] = 27;
    if (liveData.player.biggestTitSize() >= 60) choices[choices.length] = 27;
    if (liveData.player.biggestTitSize() >= 80) choices[choices.length] = 27;
  }
  //28 FEMALE TEACHER COSTUME TEASE
  if (liveData.player.armor.equipmentName == "backless female teacher's clothes" && liveData.player.gender == 2) {
    choices[choices.length] = 28;
    choices[choices.length] = 28;
    choices[choices.length] = 28;
    choices[choices.length] = 28;
  }
  //29 Male Teacher Outfit Tease
  if (liveData.player.armor.equipmentName == 'formal vest, tie, and crotchless pants' && liveData.player.gender == 1) {
    choices[choices.length] = 29;
    choices[choices.length] = 29;
    choices[choices.length] = 29;
    choices[choices.length] = 29;
  }
  //30 Naga Fetish Clothes
  if (liveData.player.armor.equipmentName == 'headdress, necklaces, and many body-chains') {
    choices[choices.length] = 30;
    choices[choices.length] = 30;
    choices[choices.length] = 30;
    choices[choices.length] = 30;
  }
  //31 Centaur harness clothes
  if (liveData.player.armor.equipmentName == 'bridle bit and saddle set') {
    choices[choices.length] = 31;
    choices[choices.length] = 31;
    choices[choices.length] = 31;
    choices[choices.length] = 31;
  }
  //32 Genderless servant clothes
  if (liveData.player.armor.equipmentName == "servant's clothes" && liveData.player.gender == 0) {
    choices[choices.length] = 32;
    choices[choices.length] = 32;
    choices[choices.length] = 32;
    choices[choices.length] = 32;
  }
  //33 Crotch Revealing Clothes (herm only?)
  if (liveData.player.armor.equipmentName == 'crotch-revealing clothes' && liveData.player.gender == 3) {
    choices[choices.length] = 33;
    choices[choices.length] = 33;
    choices[choices.length] = 33;
    choices[choices.length] = 33;
  }
  //34 Maid Costume (female only):
  if (liveData.player.armor.equipmentName == "maid's clothes" && liveData.player.hasVagina()) {
    choices[choices.length] = 34;
    choices[choices.length] = 34;
    choices[choices.length] = 34;
    choices[choices.length] = 34;
  }
  //35 Servant Boy Clothes (male only)
  if (liveData.player.armor.equipmentName == "cute servant's clothes" && liveData.player.hasCock()) {
    choices[choices.length] = 35;
    choices[choices.length] = 35;
    choices[choices.length] = 35;
    choices[choices.length] = 35;
  }
  //36 Bondage Patient Clothes
  if (liveData.player.armor.equipmentName == 'bondage patient clothes') {
    choices[choices.length] = 36;
    choices[choices.length] = 36;
    choices[choices.length] = 36;
    choices[choices.length] = 36;
  }
  //37 Kitsune Tease
  //38 Kitsune Tease
  //39 Kitsune Tease
  //40 Kitsune Tease
  if (liveData.player.kitsuneScore() >= 2 && liveData.player.tailType == ENUM.TailType.FOX) {
    choices[choices.length] = 37;
    choices[choices.length] = 37;
    choices[choices.length] = 37;
    choices[choices.length] = 37;
    choices[choices.length] = 38;
    choices[choices.length] = 38;
    choices[choices.length] = 38;
    choices[choices.length] = 38;
    choices[choices.length] = 39;
    choices[choices.length] = 39;
    choices[choices.length] = 39;
    choices[choices.length] = 39;
    choices[choices.length] = 40;
    choices[choices.length] = 40;
    choices[choices.length] = 40;
    choices[choices.length] = 40;
  }
  //41 Kitsune Gendered Tease
  if (liveData.player.kitsuneScore() >= 2 && liveData.player.tailType == ENUM.TailType.FOX) {
    choices[choices.length] = 41;
    choices[choices.length] = 41;
    choices[choices.length] = 41;
    choices[choices.length] = 41;
  }
  //42 Urta teases!
  /*if (urtaQuest.isUrta()) {
            choices[choices.length] = 42;
            choices[choices.length] = 42;
            choices[choices.length] = 42;
            choices[choices.length] = 42;
            choices[choices.length] = 42;
            choices[choices.length] = 42;
            choices[choices.length] = 42;
            choices[choices.length] = 42;
            choices[choices.length] = 42;
        }*/
  //43 - special mino + cowgirls
  if (
    liveData.player.hasVagina() &&
    liveData.player.lactationQ() >= 500 &&
    liveData.player.biggestTitSize() >= 6 &&
    liveData.player.cowScore() >= 3 &&
    liveData.player.tailType == ENUM.TailType.COW
  ) {
    choices[choices.length] = 43;
    choices[choices.length] = 43;
    choices[choices.length] = 43;
    choices[choices.length] = 43;
    choices[choices.length] = 43;
    choices[choices.length] = 43;
    choices[choices.length] = 43;
    choices[choices.length] = 43;
    choices[choices.length] = 43;
  }
  //44 - Bikini Mail Teases!
  if (liveData.player.hasVagina() && liveData.player.biggestTitSize() >= 4 && liveData.player.armor.equipmentName == "lusty maiden's armor") {
    choices[choices.length] = 44;
    choices[choices.length] = 44;
    choices[choices.length] = 44;
    choices[choices.length] = 44;
    choices[choices.length] = 44;
    choices[choices.length] = 44;
    choices[choices.length] = 44;
    choices[choices.length] = 44;
    choices[choices.length] = 44;
    choices[choices.length] = 44;
    choices[choices.length] = 44;
    choices[choices.length] = 44;
    choices[choices.length] = 44;
    choices[choices.length] = 44;
    choices[choices.length] = 44;
  }
  //45 - Lethicite armor
  if (
    liveData.player.armor ==
    liveData.Items.Armor.LethiciteArmor /* && player.upperGarment == UndergarmentLib.NOTHING && player.lowerGarment == UndergarmentLib.NOTHING*/
  ) {
    choices[choices.length] = 45;
    choices[choices.length] = 45;
    choices[choices.length] = 45;
    choices[choices.length] = 45;
    choices[choices.length] = 45;
    choices[choices.length] = 45;
  }
  //=======================================================
  //    CHOOSE YOUR TEASE AND DISPLAY IT!
  //=======================================================
  select = choices[UTIL.rand(choices.length)];
  if (liveData.monster.refName.indexOf('minotaur') != -1) {
    if (
      liveData.player.hasVagina() &&
      liveData.player.lactationQ() >= 500 &&
      liveData.player.biggestTitSize() >= 6 &&
      liveData.player.cowScore() >= 3 &&
      liveData.player.tailType == ENUM.TailType.COW
    )
      select = 43;
  }
  switch (select) {
    //0 butt shake
    case 0:
      //Display
      GUI.outputText('You slap your ' + liveData.player.buttDescript());
      if (liveData.player.buttRating >= 10 && liveData.player.tone < 60) GUI.outputText(', making it jiggle delightfully.');
      else GUI.outputText('.');
      //Mod success
      ass = true;
      break;
    //1 BREAST JIGGLIN'
    case 1:
      //Single breast row
      if (liveData.player.breastRows.length == 1) {
        //50+ breastsize% success rate
        GUI.outputText(
          'Your lift your top, exposing your ' +
            liveData.player.breastDescript(0) +
            ' to ' +
            liveData.monster.a +
            liveData.monster.refName +
            '. You shake them from side to side enticingly.',
        );
        if (liveData.player.lust >= 50)
          GUI.outputText(' Your ' + liveData.player.nippleDescript(0) + 's seem to demand ' + liveData.monster.hisHer + ' attention.');
      }
      //Multirow
      if (liveData.player.breastRows.length > 1) {
        //50 + 10% per breastRow + breastSize%
        GUI.outputText(
          'You lift your top, freeing your rows of ' + liveData.player.breastDescript(0) + ' to jiggle freely. You shake them from side to side enticingly',
        );
        if (liveData.player.lust >= 50) GUI.outputText(', your ' + liveData.player.nippleDescript(0) + 's painfully visible.');
        else GUI.outputText('.');
        chance++;
      }
      breasts = true;
      break;
    //2 PUSSAH FLASHIN'
    case 2:
      if (liveData.player.isTaur()) {
        GUI.outputText(
          "You gallop toward your unsuspecting enemy, dodging their defenses and knocking them to the ground. Before they can recover, you slam your massive centaur ass down upon them, stopping just short of using crushing force to pin them underneath you. In this position, your opponent's face is buried right in your girthy horsecunt. You grind your cunt into " +
            liveData.monster.hisHer +
            " face for a moment before standing. When you do, you're gratified to see your enemy covered in your lubricant and smelling powerfully of horsecunt.",
        );
        chance += 2;
        damage += 4;
      } else {
        GUI.outputText('You open your ' + liveData.player.armor.equipmentName + ', revealing your ');
        if (liveData.player.cocks.length > 0) {
          chance++;
          damage++;
          if (liveData.player.cocks.length == 1) GUI.outputText(liveData.player.cockDescript(0));
          if (liveData.player.cocks.length > 1) GUI.outputText(liveData.player.multiCockDescriptLight());
          GUI.outputText(' and ');
          if (liveData.player.findPerk(liveData.PerkLib.BulgeArmor) >= 0) {
            damage += 5;
          }
          penis = true;
        }
        GUI.outputText(liveData.player.vaginaDescript(0));
        GUI.outputText('.');
      }
      vagina = true;
      break;
    //3 cock flash
    case 3:
      if (liveData.player.isTaur() && liveData.player.countCocksOfType(ENUM.CockType.HORSE) > 0) {
        GUI.outputText(
          "You let out a bestial whinny and stomp your hooves at your enemy. They prepare for an attack, but instead you kick your front hooves off the ground, revealing the hefty horsecock hanging beneath your belly. You let it flop around, quickly getting rigid and to its full erect length. You buck your hips as if you were fucking a mare in heat, letting your opponent know just what's in store for them if they surrender to pleasure...",
        );
        if (liveData.player.findPerk(liveData.PerkLib.BulgeArmor) >= 0) damage += 5;
      } else {
        GUI.outputText('You open your ' + liveData.player.armor.equipmentName + ', revealing your ');
        if (liveData.player.cocks.length == 1) GUI.outputText(liveData.player.cockDescript(0));
        if (liveData.player.cocks.length > 1) GUI.outputText(liveData.player.multiCockDescriptLight());
        if (liveData.player.hasVagina()) GUI.outputText(' and ');
        //Bulgy bonus!
        if (liveData.player.findPerk(liveData.PerkLib.BulgeArmor) >= 0) {
          damage += 5;
          chance++;
        }
        if (liveData.player.vaginas.length > 0) {
          GUI.outputText(liveData.player.vaginaDescript(0));
          vagina = true;
        }
        GUI.outputText('.');
      }
      penis = true;
      break;
    //BIMBO
    //4 butt shake
    case 4:
      GUI.outputText('You turn away and bounce your ' + liveData.player.buttDescript() + ' up and down hypnotically');
      //Big butts = extra text + higher success
      if (liveData.player.buttRating >= 10) {
        GUI.outputText(
          ', making it jiggle delightfully. ' +
            UTIL.capitalizeFirstLetter(liveData.monster.a) +
            liveData.monster.refName +
            ' even gets a few glimpses of the ' +
            liveData.player.assholeDescript() +
            ' between your cheeks.',
        );
        chance += 3;
      }
      //Small butts = less damage, still high success
      else {
        GUI.outputText(
          ', letting ' +
            liveData.monster.a +
            liveData.monster.refName +
            ' get a good look at your ' +
            liveData.player.assholeDescript() +
            ' and ' +
            liveData.player.vaginaDescript(0) +
            '.',
        );
        chance += 1;
        vagina = true;
      }
      ass = true;
      anus = true;
      break;
    //5 breast jiggle
    case 5:
      GUI.outputText(
        'You lean forward, letting the well-rounded curves of your ' +
          liveData.player.allBreastsDescript() +
          ' show to ' +
          liveData.monster.a +
          liveData.monster.refName +
          '.',
      );
      GUI.outputText(
        ' You cup them in your palms and lewdly bounce them, putting on a show and giggling the entire time. An inch at a time, your ' +
          liveData.player.armor.equipmentName +
          ' starts to come down, dropping tantalizingly slowly until your ' +
          liveData.player.nippleDescript(0) +
          's pop free.',
      );
      if (liveData.player.lust >= 50) {
        if (liveData.player.hasFuckableNipples()) {
          chance++;
          GUI.outputText(" Clear slime leaks from them, making it quite clear that they're more than just nipples.");
        } else GUI.outputText(' Your hard nipples seem to demand ' + liveData.monster.hisHer + ' attention.');
        chance += 1;
        damage += 2;
      }
      //Damage boosts!
      breasts = true;
      break;
    //6 pussy flash
    case 6:
      if (liveData.player.findPerk(liveData.PerkLib.BimboBrains) >= 0 || liveData.player.findPerk(liveData.PerkLib.FutaFaculties) >= 0) {
        GUI.outputText('You coyly open your ' + liveData.player.armor.equipmentName + ' and giggle, "<i>Is this, like, what you wanted to see?</i>" ');
      } else {
        GUI.outputText('You coyly open your ' + liveData.player.armor.equipmentName + ' and purr, "<i>Does the thought of a hot, ');
        if (futa) GUI.outputText('futanari ');
        else if (liveData.player.findPerk(liveData.PerkLib.BimboBody) >= 0) GUI.outputText('bimbo ');
        else GUI.outputText('sexy ');
        GUI.outputText('body turn you on?</i>" ');
      }
      if (liveData.monster.plural)
        GUI.outputText(
          UTIL.capitalizeFirstLetter(liveData.monster.a) +
            liveData.monster.refName +
            "' gazes are riveted on your groin as you run your fingers up and down your folds seductively.",
        );
      else
        GUI.outputText(
          UTIL.capitalizeFirstLetter(liveData.monster.a) +
            liveData.monster.refName +
            "'s gaze is riveted on your groin as you run your fingers up and down your folds seductively.",
        );
      if (liveData.player.clitLength > 3)
        GUI.outputText(' You smile as your ' + liveData.player.clitDescript() + ' swells out from the folds and stands proudly, begging to be touched.');
      else GUI.outputText(' You smile and pull apart your lower-lips to expose your ' + liveData.player.clitDescript() + ', giving the perfect view.');
      if (liveData.player.cockTotal() > 0)
        GUI.outputText(' Meanwhile, ' + liveData.player.sMultiCockDesc() + ' bobs back and forth with your gyrating hips, adding to the display.');
      //BONUSES!
      if (liveData.player.hasCock()) {
        if (liveData.player.findPerk(liveData.PerkLib.BulgeArmor) >= 0) damage += 5;
        penis = true;
      }
      vagina = true;
      break;
    //7 special Adjatha-crafted bend over bimbo times
    case 7:
      GUI.outputText(
        'The glinting of light catches your eye and you whip around to inspect the glittering object, turning your back on ' +
          liveData.monster.a +
          liveData.monster.refName +
          '. Locking your knees, you bend waaaaay over, ' +
          liveData.player.chestDesc() +
          ' swinging in the open air while your ' +
          liveData.player.buttDescript() +
          ' juts out at the ' +
          liveData.monster.a +
          liveData.monster.refName +
          '. Your plump cheeks and ' +
          liveData.player.hipDescript() +
          ' form a jiggling heart-shape as you eagerly rub your thighs together.<br><br>',
      );
      GUI.outputText(
        'The clear, warm fluid of your happy excitement trickles down from your loins, polishing your ' +
          liveData.player.skin() +
          ' to a glossy, inviting shine. Retrieving the useless, though shiny, bauble, you hold your pose for just a moment longer, a sly little smile playing across your lips as you wiggle your cheeks one more time before straightening up and turning back around.',
      );
      vagina = true;
      chance++;
      damage += 2;
      break;
    //==BRO STUFF=====
    //8 Pec Dance
    case 8:
      GUI.outputText('You place your hands on your hips and flex repeatedly, skillfully making your pecs alternatively bounce in a muscular dance. ');
      if (liveData.player.findPerk(liveData.PerkLib.BroBrains) >= 0)
        GUI.outputText('Damn, ' + liveData.monster.a + liveData.monster.refName + ' has got to love this!');
      else
        GUI.outputText(
          UTIL.capitalizeFirstLetter(liveData.monster.a) + liveData.monster.refName + ' will probably enjoy the show, but you feel a bit silly doing this.',
        );
      chance += (liveData.player.tone - 75) / 5;
      damage += (liveData.player.tone - 70) / 5;
      auto = false;
      break;
    //9 Heroic Pose
    case 9:
      GUI.outputText('You lift your arms and flex your incredibly muscular arms while flashing your most disarming smile. ');
      if (liveData.player.findPerk(liveData.PerkLib.BroBrains) >= 0)
        GUI.outputText(UTIL.capitalizeFirstLetter(liveData.monster.a) + liveData.monster.refName + " can't resist such a heroic pose!");
      else GUI.outputText('At least the physical changes to your body are proving useful!');
      chance += (liveData.player.tone - 75) / 5;
      damage += (liveData.player.tone - 70) / 5;
      auto = false;
      break;
    //10 Bulgy groin thrust
    case 10:
      GUI.outputText(
        'You lean back and pump your hips at ' +
          liveData.monster.a +
          liveData.monster.refName +
          ' in an incredibly vulgar display. The bulging, barely-contained outline of your ' +
          liveData.player.cockDescript(0) +
          ' presses hard into your gear. ',
      );
      if (liveData.player.findPerk(liveData.PerkLib.BroBrains) >= 0) GUI.outputText('No way could ' + liveData.monster.heShe + ' resist your huge cock!');
      else GUI.outputText("This is so crude, but at the same time, you know it'll likely be effective.");
      GUI.outputText(' You go on like that, humping the air for your foe');
      GUI.outputText("'s");
      GUI.outputText(' benefit, trying to entice them with your man-meat.');
      if (liveData.player.findPerk(liveData.PerkLib.BulgeArmor) >= 0) damage += 5;
      penis = true;
      break;
    //11 Show off dick
    case 11:
      if (liveData.silly && UTIL.rand(2) == 0)
        GUI.outputText(
          'You strike a herculean pose and flex, whispering, "<i>Do you even lift?</i>" to ' + liveData.monster.a + liveData.monster.refName + '.',
        );
      else {
        GUI.outputText(
          'You open your ' +
            liveData.player.armor.equipmentName +
            ' just enough to let your ' +
            liveData.player.cockDescript(0) +
            ' and ' +
            liveData.player.ballsDescriptLight() +
            ' dangle free. A shiny rope of pre-cum dangles from your cock, showing that your reproductive system is every bit as fit as the rest of you. ',
        );
        if (liveData.player.findPerk(liveData.PerkLib.BroBrains) >= 0) GUI.outputText('Bitches love a cum-leaking cock.');
        else GUI.outputText("You've got to admit, you look pretty good down there.");
      }
      if (liveData.player.findPerk(liveData.PerkLib.BulgeArmor) >= 0) damage += 5;
      penis = true;
      break;
    //==EXTRAS========
    //12 Cat flexibility.
    case 12:
      //CAT TEASE MOTHERFUCK (requires flexibility and legs [maybe can't do it with armor?])
      GUI.outputText(
        'Reaching down, you grab an ankle and pull it backwards, looping it up and over to touch the foot to your ' +
          liveData.player.hairDescript() +
          '. You bring the leg out to the side, showing off your ' +
          liveData.player.vaginaDescript(0) +
          ' through your ' +
          liveData.player.armor.equipmentName +
          ". The combination of the lack of discomfort on your face and the ease of which you're able to pose shows " +
          liveData.monster.a +
          liveData.monster.refName +
          " how good of a time they're in for with you.",
      );
      vagina = true;
      if (liveData.player.thickness < 33) chance++;
      else if (liveData.player.thickness >= 66) chance--;
      damage += (liveData.player.thickness - 50) / 10;
      break;
    //13 Pregnant
    case 13:
      //PREG
      GUI.outputText(
        'You lean back, feigning a swoon while pressing a hand on the small of your back. The pose juts your huge, pregnant belly forward and makes the shiny spherical stomach look even bigger. With a teasing groan, you rub the protruding tummy gently, biting your lip gently as you stare at ' +
          liveData.monster.a +
          liveData.monster.refName +
          ' through heavily lidded eyes. "<i>All of this estrogen is making me frisky,</i>" you moan, stroking hand gradually shifting to the southern hemisphere of your big baby-bump.',
      );
      //if lactating]
      if (liveData.player.biggestLactation() >= 1) {
        GUI.outputText(
          ' Your other hand moves to expose your ' +
            liveData.player.chestDesc() +
            ', cupping and squeezing a stream of milk to leak down the front of your ' +
            liveData.player.armor.equipmentName +
            '. "<i>Help a mommy out.</i>"<br><br>',
        );
        chance += 2;
        damage += 4;
      }
      if (liveData.player.pregnancyIncubation < 100) {
        chance++;
        damage += 2;
      }
      if (liveData.player.pregnancyIncubation < 50) {
        chance++;
        damage += 2;
      }
      break;
    //14 Brood Mother
    case 14:
      if (UTIL.rand(2) == 0)
        GUI.outputText(
          'You tear open your ' +
            liveData.player.armor.equipmentName +
            ' and slip a few fingers into your well-used birth canal, giving your opponent a good look at what they\'re missing. "<i>C\'mon stud,</i>" you say, voice dripping with lust and desire, "<i>Come to mama ' +
            liveData.player.name +
            ' and fuck my pussy \'til your baby batter just POURS out. I want your children inside of me, I want your spawn crawling out of this cunt and begging for my milk. Come on, FUCK ME PREGNANT!</i>"',
        );
      else
        GUI.outputText(
          'You wiggle your ' +
            liveData.player.hipDescript() +
            ' at your enemy, giving them a long, tantalizing look at the hips that have passed so very many offspring. "<i>Oh, like what you see, bad boy? Well why don\'t you just come on over and stuff that cock inside me? Give me your seed, and I\'ll give you suuuuch beautiful offspring. Oh? Does that turn you on? It does! Come on, just let loose and fuck me full of your babies!</i>"',
        );
      chance += 2;
      damage += 4;
      if (liveData.player.inHeat) {
        chance += 2;
        damage += 4;
      }
      vagina = true;
      break;
    //15 Nipplecunts
    case 15:
      //Req's tits & Pussy
      if (liveData.player.biggestTitSize() > 1 && liveData.player.hasVagina() && UTIL.rand(2) == 0) {
        GUI.outputText(
          'Closing your eyes, you lean forward and slip a hand under your ' +
            liveData.player.armor.equipmentName +
            '. You let out the slightest of gasps as your fingers find your drooling honeypot, warm tips poking, one after another between your engorged lips. When you withdraw your hand, your fingers have been soaked in the dripping passion of your cunny, translucent beads rolling down to wet your palm. With your other hand, you pull down the top of your ' +
            liveData.player.armor.equipmentName +
            ' and bare your ' +
            liveData.player.chestDesc() +
            ' to ' +
            liveData.monster.a +
            liveData.monster.refName +
            '.<br><br>',
        );
        GUI.outputText(
          'Drawing your lust-slick hand to your ' +
            liveData.player.nippleDescript(0) +
            's, the yielding flesh of your cunt-like nipples parts before the teasing digits. Using your own girl cum as added lubrication, you pump your fingers in and out of your nipples, moaning as you add progressively more digits until only your thumb remains to stroke the inflamed flesh of your over-stimulated chest. Your throat releases the faintest squeak of your near-orgasmic delight and you pant, withdrawing your hands and readjusting your armor.<br><br>',
        );
        GUI.outputText(
          "Despite how quiet you were, it's clear that every lewd, desperate noise you made was heard by " +
            liveData.monster.a +
            liveData.monster.refName +
            '.',
        );
        chance += 2;
        damage += 4;
      } else if (liveData.player.biggestTitSize() > 1 && UTIL.rand(2) == 0) {
        GUI.outputText(
          'You yank off the top of your ' +
            liveData.player.armor.equipmentName +
            ', revealing your ' +
            liveData.player.chestDesc() +
            ' and the gaping nipplecunts on each. With a lusty smirk, you slip a pair of fingers into the nipples of your ' +
            liveData.player.chestDesc() +
            ", pulling the nipplecunt lips wide, revealing the lengthy, tight passage within. You fingerfuck your nipplecunts, giving your enemy a good show before pulling your armor back on, leaving the tantalizing image of your gaping titpussies to linger in your foe's mind.",
        );
        chance += 1;
        damage += 2;
      } else
        GUI.outputText(
          'You remove the front of your ' +
            liveData.player.armor.equipmentName +
            ' exposing your ' +
            liveData.player.chestDesc() +
            '. Using both of your hands, you thrust two fingers into your nipple cunts, milky girl cum soaking your hands and fingers. "<i>Wouldn\'t you like to try out these holes too?</i>"',
        );
      breasts = true;
      break;
    //16 Anal gape
    case 16:
      GUI.outputText(
        'You quickly strip out of your ' +
          liveData.player.armor.equipmentName +
          ' and turn around, giving your ' +
          liveData.player.buttDescript() +
          ' a hard slap and showing your enemy the real prize: your ' +
          liveData.player.assholeDescript() +
          '. With a smirk, you easily plunge your hand inside, burying yourself up to the wrist inside your anus. You give yourself a quick fisting, watching the enemy over your shoulder while you moan lustily, sure to give them a good show. You withdraw your hand and give your ass another sexy spank before readying for combat again.',
      );
      anus = true;
      ass = true;
      break;
    //17 Bee abdomen tease
    case 17:
      GUI.outputText(
        'You swing around, shedding the ' +
          liveData.player.armor.equipmentName +
          ' around your waist to expose your ' +
          liveData.player.buttDescript() +
          ' to ' +
          liveData.monster.a +
          liveData.monster.refName +
          '. Taking up your oversized bee abdomen in both hands, you heft the thing and wave it about teasingly. Drops of venom drip to and fro, a few coming dangerously close to ' +
          liveData.monster.himHer +
          '. "<i>Maybe if you behave well enough, I\'ll even drop a few eggs into your belly,</i>" you say softly, dropping the abdomen back to dangle above your butt and redressing.',
      );
      ass = true;
      chance += 0.5;
      damage += 0.5;
      break;
    //18 DOG TEASE
    case 18:
      GUI.outputText('You sit down like a dog, your [legs] are spread apart, showing your ');
      if (liveData.player.hasVagina()) GUI.outputText('parted cunt-lips');
      else GUI.outputText('puckered asshole, hanging, erect maleness,');
      GUI.outputText(
        ' and your hands on the ground in front of you. You pant heavily with your tongue out and promise, "<i>I\'ll be a good little bitch for you</i>."',
      );
      vagina = true;
      chance += 1;
      damage += 2;
      break;
    //19 MAX FEM TEASE - SYMPHONIE
    case 19:
      GUI.outputText(
        "You make sure to capture your foe's attention, then slowly and methodically allow your tongue to slide along your lush, full lips. The glistening moisture that remains on their plump beauty speaks of deep lust and deeper throats. Batting your long lashes a few times, you pucker them into a playful blown kiss, punctuating the act with a small moan. Your gorgeous feminine features hint at exciting, passionate moments together, able to excite others with just your face alone.",
      );
      chance += 2;
      damage += 4;
      break;
    //20 MAX MASC TEASE
    case 20:
      GUI.outputText(
        'As your foe regards you, you recognize their attention is fixated on your upper body. Thrusting your strong jaw forward you show off your chiseled chin, handsome features marking you as a flawless specimen. Rolling your broad shoulders, you nod your head at your enemy. The strong, commanding presence you give off could melt the heart of an icy nun. Your perfect masculinity speaks to your confidence, allowing you to excite others with just your face alone.',
      );
      chance += 2;
      damage += 4;
      break;
    //21 MAX ADROGYN
    case 21:
      GUI.outputText(
        'You reach up and run your hands down your delicate, androgynous features. With the power of a man but the delicacy of a woman, looking into your eyes invites an air of enticing mystery. You blow a brief kiss to your enemy while at the same time radiating a sexually exciting confidence. No one could identify your gender by looking at your features, and the burning curiosity they encourage could excite others with just your face alone.',
      );
      damage -= 3;
      break;
    //22 SPOIDAH SILK
    case 22:
      GUI.outputText(
        'Reaching back, you milk some wet silk from your spider-y abdomen and present it to ' +
          liveData.monster.a +
          liveData.monster.refName +
          ', molding the sticky substance as ' +
          liveData.monster.heShe +
          ' looks on curiously. Within moments, you hold up a silken heart scuplture, and with a wink, you toss it at ' +
          liveData.monster.himHer +
          '. It sticks to ' +
          liveData.monster.hisHer +
          ' body, the sensation causing ' +
          liveData.monster.himHer +
          ' to hastily slap the heart off. ' +
          liveData.monster.mf('He', 'She') +
          ' returns ' +
          liveData.monster.hisHer +
          ' gaze to you to find you turned around, ' +
          liveData.player.buttDescript() +
          ' bared and abdomen bouncing lazily. "<i>I wonder what would happen if I webbed up your hole after I dropped some eggs inside?</i>" you hiss mischievously. ' +
          liveData.monster.mf('He', 'She') +
          ' gulps.',
      );
      ass = true;
      break;
    //23 RUT TEASE
    case 23:
      if (liveData.player.countCocksOfType(ENUM.CockType.HORSE) > 0 && liveData.player.longestCock() >= 12) {
        GUI.outputText(
          'You whip out your massive horsecock, and are immediately surrounded by a massive, heady musk. Your enemy swoons, nearly falling to her knees under your oderous assault. Grinning, you grab her shoulders and force her to her knees. Before she can defend herself, you slam your horsecock onto her head, running it up and down on her face, her nose acting like a sexy bump in an onahole. You fuck her face -- literally -- for a moment before throwing her back and sheathing your cock.',
        );
      } else {
        GUI.outputText(
          'Panting with your unstoppable lust for the delicious, impregnable cunt before you, you yank off your ' +
            liveData.player.armor.equipmentName +
            ' with strength born of your inhuman rut, and quickly wave your fully erect cock at your enemy. She flashes with lust, quickly feeling the heady effect of your man-musk. You rush up, taking advantage of her aroused state and grab her shoulders. ',
        );
        GUI.outputText(
          "Before she can react, you push her down until she's level with your cock, and start to spin it in a circle, slapping her right in the face with your musky man-meat. Her eyes swim, trying to follow your meatspin as you swat her in the face with your cock! Satisfied, you release her and prepare to fight!<br>",
        );
      }
      penis = true;
      break;
    //24 STAFF POLEDANCE
    case 24:
      GUI.outputText(
        'You run your tongue across your lips as you plant your staff into the ground. Before your enemy can react, you spin onto the long, wooden shaft, using it like an impromptu pole. You lean back against the planted staff, giving your enemy a good look at your body. You stretch backwards like a cat, nearly touching your fingertips to the ground beneath you, now holding onto the staff with only one leg. You pull yourself upright and give your ' +
          liveData.player.buttDescript() +
          ' a little slap and your ' +
          liveData.player.chestDesc() +
          ' a wiggle before pulling open your ' +
          liveData.player.armor.equipmentName +
          ' and sliding the pole between your tits. You drop down to a low crouch, only just covering your genitals with your hand as you shake your ' +
          liveData.player.buttDescript() +
          ' playfully. You give the enemy a little smirk as you slip your ' +
          liveData.player.armor.equipmentName +
          ' back on and pick up your staff.',
      );
      ass = true;
      breasts = true;
      break;
    //TALL WOMAN TEASE
    case 25:
      GUI.outputText(
        'You move close to your enemy, handily stepping over ' +
          liveData.monster.hisHer +
          ' defensive strike before leaning right down in ' +
          liveData.monster.hisHer +
          ' face, giving ' +
          liveData.monster.himHer +
          ' a good long view at your cleavage. "<i>Hey, there, little ' +
          liveData.monster.mf('guy', 'girl') +
          ',</i>" you smile. Before ' +
          liveData.monster.heShe +
          ' can react, you grab ' +
          liveData.monster.himHer +
          ' and smoosh ' +
          liveData.monster.hisHer +
          ' face into your ' +
          liveData.player.allChestDesc() +
          ', nearly choking ' +
          liveData.monster.himHer +
          ' in the canyon of your cleavage. ' +
          liveData.monster.mf('He', 'She') +
          ' struggles for a moment. You give ' +
          liveData.monster.himHer +
          ' a little kiss on the head and step back, ready for combat.',
      );
      breasts = true;
      chance += 2;
      damage += 4;
      break;
    //Magic Tease
    case 26:
      GUI.outputText(
        'Seeing a lull in the battle, you plant your ' +
          liveData.player.weapon.equipmentName +
          ' on the ground and let your magic flow through you. You summon a trickle of magic into a thick, slowly growing black ball of lust. You wave the ball in front of you, making a little dance and striptease out of the affair as you slowly saturate the area with latent sexual magics.',
      );
      chance++;
      damage += 2;
      break;
    //Feeder
    case 27:
      GUI.outputText(
        'You present your swollen breasts full of milk to ' +
          liveData.monster.a +
          liveData.monster.refName +
          ' and say "<i>Wouldn\'t you just love to lie back in my arms and enjoy what I have to offer you?</i>"',
      );
      breasts = true;
      chance++;
      damage++;
      break;
    //28 FEMALE TEACHER COSTUME TEASE
    case 28:
      GUI.outputText(
        'You turn to the side and give ' +
          liveData.monster.a +
          liveData.monster.refName +
          " a full view of your body. You ask them if they're in need of a private lesson in lovemaking after class.",
      );
      ass = true;
      break;
    //29 Male Teacher Outfit Tease
    case 29:
      GUI.outputText(
        'You play with the strings on your outfit a bit and ask ' +
          liveData.monster.a +
          liveData.monster.refName +
          ' just how much do they want to see their teacher pull them off?',
      );
      chance++;
      damage += 3;
      break;
    //30 Naga Fetish Clothes
    case 30:
      GUI.outputText('You sway your body back and forth, and do an erotic dance for ' + liveData.monster.a + liveData.monster.refName + '.');
      chance += 2;
      damage += 4;
      break;
    //31 Centaur harness clothes
    case 31:
      GUI.outputText('You rear back, and declare that, "<i>This horse is ready to ride, all night long!</i>"');
      chance += 2;
      damage += 4;
      break;
    //32 Genderless servant clothes
    case 32:
      GUI.outputText(
        'You turn your back to your foe, and flip up your butt flap for a moment.  Your ' +
          liveData.player.buttDescript() +
          ' really is all you have to offer downstairs.',
      );
      ass = true;
      chance++;
      damage += 2;
      break;
    //33 Crotch Revealing Clothes (herm only?)
    case 33:
      GUI.outputText(
        "You do a series of poses to accentuate what you've got on display with your crotch revealing clothes, while asking if your " +
          liveData.player.mf('master', 'mistress') +
          ' is looking to sample what is on display.',
      );
      chance += 2;
      damage += 4;
      break;
    //34 Maid Costume (female only)
    case 34:
      GUI.outputText(
        'You give a rather explicit curtsey towards ' +
          liveData.monster.a +
          liveData.monster.refName +
          ' and ask them if your ' +
          liveData.player.mf('master', 'mistress') +
          ' is interested in other services today.',
      );
      chance++;
      damage += 2;
      breasts = true;
      break;
    //35 Servant Boy Clothes (male only)
    case 35:
      GUI.outputText(
        'You brush aside your crotch flap for a moment, then ask ' +
          liveData.monster.a +
          liveData.monster.refName +
          ' if, ' +
          liveData.player.mf('Master', 'Mistress') +
          ' would like you to use your ' +
          liveData.player.multiCockDescriptLight() +
          ' on them?',
      );
      penis = true;
      chance++;
      damage += 2;
      break;
    //36 Bondage Patient Clothes (done):
    case 36:
      GUI.outputText(
        'You pull back one of the straps on your bondage cloths and let it snap back. "<i>I need some medical care, feeling up for it?</i>" you tease.',
      );
      damage += 2;
      chance++;
      break;
    default:
      GUI.outputText('You shimmy and shake sensually. (An error occurred.)');
      break;
    case 37:
      GUI.outputText(
        'You purse your lips coyly, narrowing your eyes mischievously and beckoning to ' +
          liveData.monster.a +
          liveData.monster.refName +
          ' with a burning come-hither glare. Sauntering forward, you pop your hip to the side and strike a coquettish pose, running ' +
          (liveData.player.tailVenom > 1 ? 'one of your tails' : 'your tail') +
          ' up and down ' +
          liveData.monster.hisHer +
          ' body sensually.',
      );
      chance += 6;
      damage += 3;
      break;
    case 38:
      GUI.outputText(
        'You wet your lips, narrowing your eyes into a smoldering, hungry gaze. Licking the tip of your index finger, you trail it slowly and sensually down the front of your ' +
          liveData.player.armor.equipmentName +
          ', following the line of your ' +
          liveData.player.chestDesc() +
          ' teasingly. You hook your thumbs into your top and shimmy it downward at an agonizingly slow pace. The very instant that your [nipples] pop free, your tail crosses in front, obscuring ' +
          liveData.monster.a +
          liveData.monster.refName +
          "'s view.",
      );
      breasts = true;
      chance++;
      damage++;
      break;
    case 39:
      GUI.outputText(
        'Leaning forward, you bow down low, raising a hand up to your lips and blowing ' +
          liveData.monster.a +
          liveData.monster.refName +
          ' a kiss. You stand straight, wiggling your ' +
          liveData.player.hipDescript() +
          ' back and forth seductively while trailing your fingers down your front slowly, pouting demurely. The tip of ',
      );
      if (liveData.player.tailVenom == 1) GUI.outputText('your');
      else GUI.outputText('a');
      GUI.outputText(
        ' bushy tail curls up around your ' + liveData.player.leg() + ', uncoiling with a whipping motion that makes an audible crack in the air.',
      );
      ass = true;
      chance++;
      damage += 1;
      break;
    case 40:
      GUI.outputText(
        'Turning around, you stare demurely over your shoulder at ' + liveData.monster.a + liveData.monster.refName + ', batting your eyelashes amorously.',
      );
      if (liveData.player.tailVenom == 1)
        GUI.outputText(
          ' Your tail twists and whips about, sliding around your ' +
            liveData.player.hipDescript() +
            ' in a slow arc and framing your rear nicely as you slowly lift your ' +
            liveData.player.armor.equipmentName +
            '.',
        );
      else
        GUI.outputText(
          ' Your tails fan out, twisting and whipping sensually, sliding up and down your ' +
            liveData.player.legs() +
            ' and framing your rear nicely as you slowly lift your ' +
            liveData.player.armor.equipmentName +
            '.',
        );
      GUI.outputText(
        ' As your [butt] comes into view, you brush your tail' +
          (liveData.player.tailVenom > 1 ? 's' : '') +
          ' across it, partially obscuring the view in a tantalizingly teasing display.',
      );
      ass = true;
      anus = true;
      chance++;
      damage += 2;
      break;
    case 41:
      GUI.outputText(
        'Smirking coyly, you sway from side to side, running your tongue along your upper teeth seductively. You hook your thumbs into your ' +
          liveData.player.armor.equipmentName +
          ' and pull them away to partially reveal ',
      );
      if (liveData.player.cockTotal() > 0) GUI.outputText(liveData.player.sMultiCockDesc());
      if (liveData.player.gender == 3) GUI.outputText(' and ');
      if (liveData.player.gender >= 2) GUI.outputText('your ' + liveData.player.vaginaDescript(0));
      GUI.outputText(
        '. Your bushy tail' +
          (liveData.player.tailVenom > 1 ? 's' : '') +
          ' cross' +
          (liveData.player.tailVenom > 1 ? '' : 'es') +
          ' in front, wrapping around your genitals and obscuring the view teasingly.',
      );
      vagina = true;
      penis = true;
      damage += 2;
      chance++;
      break;
    case 42:
      //Tease #1:
      if (UTIL.rand(2) == 0) {
        GUI.outputText(
          'You lift your skirt and flash your king-sized stallionhood, already unsheathing itself and drooling pre, at your opponent. "<i>Come on, then; I got plenty of girlcock for you if that\'s what you want!</i>" you cry.',
        );
        penis = true;
        damage += 3;
        chance--;
      }
      //Tease #2:
      else {
        GUI.outputText(
          'You turn partially around and then bend over, swaying your tail from side to side in your most flirtatious manner and wiggling your hips seductively, your skirt fluttering with the motions. "<i>Come on then, what are you waiting for? This is a fine piece of ass here,</i>" you grin, spanking yourself with an audible slap.',
        );
        ass = true;
        chance += 2;
        damage += 3;
      }
      break;
    case 43: {
      const cows = UTIL.rand(7);
      if (cows == 0) {
        GUI.outputText(
          'You tuck your hands under your chin and use your arms to squeeze your massive, heavy breasts together. Milk squirts from your erect nipples, filling the air with a rich, sweet scent.',
        );
        breasts = true;
        chance += 2;
        damage++;
      } else if (cows == 1) {
        GUI.outputText(
          'Moaning, you bend forward, your full breasts nearly touching the ground as you sway your [hips] from side to side. Looking up from under heavily-lidded eyes, you part your lips and lick them, letting out a low, lustful "<i>Mooooo...</i>"',
        );
        breasts = true;
        chance += 2;
        damage += 2;
      } else if (cows == 2) {
        GUI.outputText('You tuck a finger to your lips, blinking innocently, then flick your tail, wafting the scent of your ');
        if (liveData.player.wetness() >= 3) GUI.outputText('dripping ');
        GUI.outputText('sex through the air.');
        vagina = true;
        chance++;
        damage++;
      } else if (cows == 3) {
        GUI.outputText(
          'You heft your breasts, fingers splayed across your [nipples] as you SQUEEZE. Milk runs in rivulets over your hands and down the massive curves of your breasts, soaking your front with sweet, sticky milk.',
        );
        breasts = true;
        chance += 3;
        damage++;
      } else if (cows == 4) {
        GUI.outputText(
          'You lift a massive breast to your mouth, suckling loudly at yourself, finally letting go of your nipple with a POP and a loud, satisfied gasp, milk running down your chin.',
        );
        breasts = true;
        chance++;
        damage += 3;
      } else if (cows == 5) {
        GUI.outputText(
          'You crouch low, letting your breasts dangle in front of you. Each hand caresses one in turn as you slowly milk yourself onto your thighs, splashing white, creamy milk over your hips and sex.',
        );
        vagina = true;
        breasts = true;
        chance++;
      } else {
        GUI.outputText(
          'You lift a breast to your mouth, taking a deep draught of your own milk, then tilt your head back. With a low moan, you let it run down your front, winding a path between your breasts until it drips sweetly from your crotch.',
        );
        vagina = true;
        breasts = true;
        damage += 2;
      }
      if (liveData.monster.refName.indexOf('minotaur') != -1) {
        damage += 6;
        chance += 3;
      }
      break;
    }
    //lusty maiden's armor teases
    case 44: {
      const maiden = UTIL.rand(5);
      damage += 5;
      chance += 3;
      if (maiden == 0) {
        GUI.outputText(
          'Confidently sauntering forward, you thrust your chest out with your back arched in order to enhance your [chest]. You slowly begin to shake your torso back and forth, slapping your chain-clad breasts against each other again and again. One of your hands finds its way to one of the pillowy expanses and grabs hold, fingers sinking into the soft tit through the fine, mail covering. You stop your shaking to trace a finger down through the exposed center of your cleavage, asking, "<i>Don\'t you just want to snuggle inside?</i>"',
        );
        breasts = true;
      } else if (maiden == 1) {
        GUI.outputText(
          'You skip up to ' +
            liveData.monster.a +
            liveData.monster.refName +
            ' and spin around to rub your barely-covered butt up against ' +
            liveData.monster.himHer +
            '. Before ' +
            liveData.monster.heShe +
            " can react, you're slowly bouncing your [butt] up and down against " +
            liveData.monster.hisHer +
            ' groin. When ' +
            liveData.monster.heShe +
            ' reaches down, you grab ' +
            liveData.monster.hisHer +
            ' hand and press it up, under your skirt, right against the steamy seal on your sex. The simmering heat of your overwhelming lust burns hot enough for ' +
            liveData.monster.himHer +
            ' to feel even through the contoured leather, and you let ' +
            liveData.monster.himHer +
            ' trace the inside of your [leg] for a moment before moving away, laughing playfully.',
        );
        ass = true;
        vagina = true;
      } else if (maiden == 2) {
        GUI.outputText(
          'You flip up the barely-modest chain you call a skirt and expose your g-string to ' +
            liveData.monster.a +
            liveData.monster.refName +
            '. Slowly swaying your [hips], you press a finger down on the creased crotch plate and exaggerate a lascivious moan into a throaty purr of enticing, sexual bliss. Your eyes meet ' +
            liveData.monster.hisHer +
            ', and you throatily whisper, "<i>',
        );
        if (liveData.player.hasVirginVagina()) GUI.outputText("Think you can handle a virgin's infinite lust?");
        else GUI.outputText('Think you have what it takes to satisfy this perfect pussy?');
        GUI.outputText('</i>"');
        vagina = true;
        damage += 3;
      } else if (maiden == 3) {
        GUI.outputText(
          'You seductively wiggle your way up to ' +
            liveData.monster.a +
            liveData.monster.refName +
            ', and before ' +
            liveData.monster.heShe +
            " can react to your salacious advance, you snap a [leg] up in what would be a vicious kick, if you weren't simply raising it to rest your [foot] on " +
            liveData.monster.hisHer +
            ' shoulder. With your thighs so perfectly spready, your skirt is lifted, and ' +
            liveData.monster.a +
            liveData.monster.refName +
            ' is given a perfect view of your thong-enhanced cameltoe and the moisture that beads at the edges of your not-so-modest covering.',
        );
        vagina = true;
      } else {
        GUI.outputText(
          "Bending over, you lift your [butt] high in the air. Most of your barely-covered tush is exposed, but the hem of your chainmail skirt still protects some of your anal modesty. That doesn't last long. You start shaking your [butt] up, down, back, and forth to an unheard rhythm, flipping the pointless covering out of the way so that " +
            liveData.monster.a +
            liveData.monster.refName +
            ' can gaze upon your curvy behind in it all its splendid detail. A part of you hopes that ' +
            liveData.monster.heShe +
            ' takes in the intricate filigree on the back of your thong, though to ' +
            liveData.monster.himHer +
            ' it looks like a bunch of glittering arrows on an alabaster background, all pointing squarely at your [asshole].',
        );
        ass = true;
        chance += 2;
      }
      break;
    }
    //lethicite armor teases
    case 45: {
      const partChooser: number[] = []; //Array for choosing.
      //Choose part. Must not be a centaur for cock and vagina teases!
      partChooser[partChooser.length] = 0;
      if (liveData.player.gender == 1 && !liveData.player.isTaur()) partChooser[partChooser.length] = 1;
      if (liveData.player.gender == 2 && !liveData.player.isTaur()) partChooser[partChooser.length] = 2;
      if (liveData.player.gender == 3 && liveData.player.hasVagina() && !liveData.player.isTaur()) partChooser[partChooser.length] = 3;
      //Let's do this!
      switch (partChooser[UTIL.rand(partChooser.length)]) {
        case 0:
          GUI.outputText(
            'You place your hand on your lethicite-covered belly, move your hand up across your belly and towards your [chest]. Taking advantage of the small openings in your breastplate, you pinch and tweak your exposed [nipples].',
          );
          breasts = true;
          chance += 3;
          damage += 1;
          break;
        case 1:
          GUI.outputText(
            'You move your hand towards your [cocks], unobstructed by the lethicite. You give your [cock] a good stroke and sway your hips back and forth, emphasizing your manhood.',
          );
          penis = true;
          chance += 1;
          damage += 2;
          break;
        case 2:
          GUI.outputText(
            'You move your hand towards your [pussy], unobstructed by the lethicite. You give your [clit] a good tease, finger your [pussy], and sway your hips back and forth, emphasizing your womanhood.',
          );
          vagina = true;
          chance += 1;
          damage += 2;
          break;
        case 3:
          GUI.outputText(
            'You move your hand towards your [cocks] and [pussy], unobstructed by the lethicite. You give your [cock] a good stroke, tease your [clit], and sway your hips back and forth, emphasizing your hermaphroditic gender.',
          );
          penis = true;
          vagina = true;
          chance += 1;
          damage += 3;
          break;
        default:
          GUI.outputText('Whoops, something derped! Please let Kitteh6660 know! Anyways, you put on a tease show.');
      }
      break;
    }
  }
  //===========================
  //BUILD BONUSES IF APPLICABLE
  //===========================
  let bonusChance = 0;
  let bonusDamage = 0;
  if (auto) {
    //TIT BONUSES
    if (breasts) {
      if (liveData.player.bRows() > 1) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.bRows() > 2) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.bRows() > 4) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.biggestLactation() >= 2) {
        bonusChance++;
        bonusDamage += 2;
      }
      if (liveData.player.biggestLactation() >= 3) {
        bonusChance++;
        bonusDamage += 2;
      }
      if (liveData.player.biggestTitSize() >= 4) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.biggestTitSize() >= 7) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.biggestTitSize() >= 12) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.biggestTitSize() >= 25) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.biggestTitSize() >= 50) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.hasFuckableNipples()) {
        bonusChance++;
        bonusDamage += 2;
      }
      if (liveData.player.averageNipplesPerBreast() > 1) {
        bonusChance++;
        bonusDamage += 2;
      }
    }
    //PUSSY BONUSES
    if (vagina) {
      if (liveData.player.hasVagina() && liveData.player.wetness() >= 2) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.hasVagina() && liveData.player.wetness() >= 3) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.hasVagina() && liveData.player.wetness() >= 4) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.hasVagina() && liveData.player.wetness() >= 5) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.clitLength > 1.5) {
        bonusChance += 0.5;
        bonusDamage++;
      }
      if (liveData.player.clitLength > 3.5) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.clitLength > 7) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.clitLength > 12) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.vaginalCapacity() >= 30) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.vaginalCapacity() >= 70) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.vaginalCapacity() >= 120) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.vaginalCapacity() >= 200) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
    }
    //Penis bonuses!
    if (penis) {
      if (liveData.player.cockTotal() > 1) {
        bonusChance += 1;
        bonusDamage += 2;
      }
      if (liveData.player.biggestCockArea() >= 15) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.biggestCockArea() >= 30) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.biggestCockArea() >= 60) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.biggestCockArea() >= 120) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.cumQ() >= 50) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.cumQ() >= 150) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.cumQ() >= 300) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.cumQ() >= 1000) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      // if (balls > 0) {
      if (balls) {
        if (liveData.player.balls > 2) {
          bonusChance += 1;
          bonusDamage += 2;
        }
        if (liveData.player.ballSize > 3) {
          bonusChance += 0.5;
          bonusDamage += 1;
        }
        if (liveData.player.ballSize > 7) {
          bonusChance += 0.5;
          bonusDamage += 1;
        }
        if (liveData.player.ballSize > 12) {
          bonusChance += 0.5;
          bonusDamage += 1;
        }
      }
      if (liveData.player.biggestCockArea() < 8) {
        bonusChance--;
        bonusDamage -= 2;
        if (liveData.player.biggestCockArea() < 5) {
          bonusChance--;
          bonusDamage -= 2;
        }
      }
    }
    if (ass) {
      if (liveData.player.buttRating >= 6) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.buttRating >= 10) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.buttRating >= 13) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.buttRating >= 16) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.buttRating >= 20) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.hipRating >= 6) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.hipRating >= 10) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.hipRating >= 13) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.hipRating >= 16) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.hipRating >= 20) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
    }
    if (anus) {
      if (liveData.player.ass.analLooseness == 0) {
        bonusChance += 1.5;
        bonusDamage += 3;
      }
      if (liveData.player.ass.analWetness > 0) {
        bonusChance += 1;
        bonusDamage += 2;
      }
      if (liveData.player.analCapacity() >= 30) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.analCapacity() >= 70) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.analCapacity() >= 120) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.analCapacity() >= 200) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.ass.analLooseness == 4) {
        bonusChance += 0.5;
        bonusDamage += 1;
      }
      if (liveData.player.ass.analLooseness == 5) {
        bonusChance += 1.5;
        bonusDamage += 3;
      }
    }
    //Trim it down!
    if (bonusChance > 5) bonusChance = 5;
    if (bonusDamage > 10) bonusDamage = 10;
  }
  //Land the hit!
  if (UTIL.rand(100) <= chance + UTIL.rand(bonusChance)) {
    //NERF TEASE DAMAGE
    damage *= 0.7;
    bonusDamage *= 0.7;
    if (liveData.player.findPerk(liveData.PerkLib.HistoryWhore) >= 0) {
      damage *= 1.15;
      bonusDamage *= 1.15;
    }
    //if (player.findPerk(liveData.PerkLib.ChiReflowLust) >= 0) damage *= UmasShop.NEEDLEWORK_LUST_TEASE_DAMAGE_MULTI;
    if (liveData.monster.plural) damage *= 1.3;
    damage = (damage + UTIL.rand(bonusDamage)) * liveData.monster.lustVuln;

    //if (monster.name == "Jean Claude") monster.handleTease(damage, true);
    //else if (monster is Doppleganger && monster.findStatusEffect(liveData.StatusEffects.Stunned) < 0) (monster as Doppleganger).mirrorTease(damage, true);
    /*else */ if (!justText) liveData.monster.teased(damage);

    if (liveData.gameFlags[FLAG.PC_FETISH] >= 1 /* && !urtaQuest.isUrta()*/) {
      if (liveData.player.lust < 75) GUI.outputText('<br>Flaunting your body in such a way gets you a little hot and bothered. ');
      else
        GUI.outputText(
          "<br>If you keep exposing yourself you're going to get too horny to fight back. This exhibitionism fetish makes it hard to resist just stripping naked and giving up. ",
        );
      if (!justText) liveData.player.changeLust(2 + UTIL.rand(3));
    }

    // Similar to fetish check, only add XP if the player IS the player...
    if (!justText /* && !urtaQuest.isUrta()*/) COMBAT.teaseXP(1);
  }
  //Nuttin honey
  else {
    if (!justText /* && !urtaQuest.isUrta()*/) COMBAT.teaseXP(5);

    //if (monster is JeanClaude) (monster as JeanClaude).handleTease(0, false);
    //else if (monster is Doppleganger) (monster as Doppleganger).mirrorTease(0, false);
    /*else*/ if (!justText) GUI.outputText('<br>' + UTIL.capitalizeFirstLetter(liveData.monster.a) + liveData.monster.refName + ' seems unimpressed.');
  }
  GUI.outputText('<br><br>');
}

// export { CombatTeases }
