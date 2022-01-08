import { clearOutput, outputText } from "./engine/text";
import { GUI } from "./engine/gui";
import * as ENUM from "./appearanceEnums";
import { liveData } from "./globalVariables";
import { COMBAT } from "./scenes/combat";
import { Items } from "./itemClass";
import { PerkLib } from "./perkLib";
import { StatusEffects } from "./statusEffectLib";
import { KeyItem } from "./keyItemClass";
import { Ass } from "./assClass";
import { UTIL } from "./engine/utils";
class Creature {
    constructor() {
        //Name and references
        this.a = "";
        this.name = "";
        this.refName = this.name;
        this.isAre = "is";
        this.heShe = "";
        this.himHer = "";
        this.hisHer = "";
        this.plural = false;
        this.battleDesc = "";
        //Core stats
        this.str = 15;
        this.tou = 15;
        this.spe = 15;
        this.inte = 15;
        this.lib = 15;
        this.sens = 15;
        this.cor = 15;
        //Combat stats (Delete when declaring a new mob except for changing initial stats)
        this.HP = 0;
        this.lust = 0;
        this.fatigue = 0;
        //Advancement
        this.level = 1;
        this.XP = 0;
        this.gems = 0;
        //Battle variables
        this.weapon = Items.NOTHING;
        this.shield = Items.NOTHING;
        this.armor = Items.NOTHING;
        this.upperGarment = Items.NOTHING;
        this.lowerGarment = Items.NOTHING;
        this.accessory1 = Items.NOTHING;
        this.accessory2 = Items.NOTHING;
        this.bonusHP = 0;
        this.additionalXP = 0;
        this.lustVuln = 1;
        this.temperment = 0;
        this.drops = [];
        this.dropThresholds = [];
        //Appearance
        this.gender = 0; //0 genderless, 1 male, 2 female, 3 hermaphrodite
        this.tallness = 36; //Height in inches
        this.skinTone = "";
        this.skinType = 0;
        this.skinAdj = "";
        this.skinDesc = "skin";
        this.hairType = 0;
        this.hairColor = "";
        this.hairLength = 0;
        this.beardStyle = 0;
        this.beardLength = 0;
        this.furColor = "";
        //Head
        this.earType = 0;
        this.eyeType = 0;
        this.faceType = 0;
        this.tongueType = 0;
        //Body
        this.lowerBody = 0;
        this.legCount = 2;
        this.armType = 0;
        //Extra parts
        this.antennae = 0;
        this.clawType = ENUM.ClawType.CLAW_TYPE_NORMAL;
        this.clawTone = "";
        this.hornType = 0;
        this.horns = 0;
        this.gills = false;
        this.tailType = 0;
        this.tailVenom = 0;
        this.tailRecharge = 0;
        this.wingType = 0;
        this.femininity = 50;
        this.tone = 0;
        this.thickness = 0;
        this.hipRating = 0;
        //Sexual Characteristics
        //Cocks
        this.cocks = [];
        this.balls = 0;
        this.ballSize = 0;
        this.hoursSinceCum = 0;
        this.cumMultiplier = 0;
        //Vaginas
        this.vaginas = [];
        // Pregnancy
        this.pregnancyType = 0;
        this.pregnancyIncubation = 0;
        this.pregnancyEventArr = [];
        this.pregnancyEventNum = 0;
        this.buttPregnancyType = 0;
        this.buttPregnancyIncubation = 0;
        this.buttPregnancyEventArr = [];
        this.buttPregnancyEventNum = 0;
        //Ass
        this.ass = new Ass();
        //Breasts
        this.breastRows = [];
        this.lactationMultiplier = 0;
        this.keyItems = [];
        this.statusEffects = [];
        this.perks = [];
        //Victory/defeat
        this.victory = COMBAT.cleanupAfterCombat;
        this.defeat = COMBAT.cleanupAfterCombat;
    }
    //------------
    // COMBAT
    //------------
    doAI() {
        switch (UTIL.rand(4)) {
            default:
                this.attack();
        }
        COMBAT.combatRoundOver();
    }
    attack() {
        var enemy;
        if (this == liveData.player)
            enemy = monster;
        else
            enemy = liveData.player;
        //Hit or miss?
        var hitRoll = 70 + (this.spe - enemy.spe / 2);
        var hitNeed = UTIL.rand(100);
        if (hitRoll < hitNeed) {
            //Miss
            if (hitRoll - hitNeed >= -5)
                outputText(UTIL.capitalize(this.a) + this.refName + " narrowly miss" + (this.plural ? "" : "es") + " " + enemy.a + enemy.refName + "! ");
            else
                outputText(UTIL.capitalize(this.a) + this.refName + " miss" + (this.plural ? "" : "es") + " " + enemy.a + enemy.refName + "! ");
            outputText("<br><br>");
            // return
            break attack;
        }
        //Damage
        var damage = this.baseDamage();
        damage *= 1 - (enemy.armor.defense + Math.random() * (enemy.tou * 0.25)) / 100;
        if (damage < 1)
            damage = 1;
        //Critical
        var critical = UTIL.rand(100) < this.criticalChance();
        if (critical) {
            damage *= 1.75;
            if (damage < 5)
                damage = 5;
        }
        //Round things off
        damage = Math.round(damage);
        //Display text and apply damage
        if (this == liveData.player) {
            if (damage <= 5)
                outputText("You struck a glancing blow against " + enemy.a + " " + enemy.refName + ". ");
            else if (damage <= 10)
                outputText("You wound " + enemy.a + " " + enemy.refName + "! ");
            else if (damage <= 20)
                outputText("You stagger " + enemy.a + " " + enemy.refName + " with the force of your attacks! ");
            else
                outputText("You mutilate " + enemy.a + " " + enemy.refName + " with a powerful " + this.weapon.verb + "! ");
        }
        else {
            if (damage <= 0) {
                //Due to toughness or amor...
                if (this.plural)
                    outputText("You deflect and block every " + this.weapon.verb + " " + this.a + this.refName + " throw at you. ");
                else
                    outputText("You deflect and block every " + this.weapon.verb + " " + this.a + this.refName + " throws at you. ");
            }
            else if (damage <= 5) {
                outputText("You are struck a glancing blow by " + this.a + this.refName + "! ");
            }
            else if (damage <= 10) {
                outputText(UTIL.capitalizeFirstLetter(this.a) + this.refName + " wound");
                if (!this.plural)
                    outputText("s");
                outputText(" you! ");
            }
            else if (damage <= 20) {
                outputText(UTIL.capitalizeFirstLetter(this.a) + this.refName + " stagger");
                if (!this.plural)
                    outputText("s");
                outputText(" you with the force of " + this.hisHer + " " + this.weapon.verb + "! ");
            }
            else if (damage > 20) {
                outputText(UTIL.capitalizeFirstLetter(this.a) + this.refName + " <b>mutilate");
                if (!this.plural)
                    outputText("s");
                outputText("</b> you with " + this.hisHer + " powerful " + this.weapon.verb + "! ");
            }
        }
        if (critical)
            outputText("<b>Critical hit!</b> ");
        enemy.changeHP(-damage, true);
    }
    victoryScene() {
        clearOutput();
        COMBAT.cleanupAfterCombat();
    }
    defeatScene() {
        clearOutput();
        COMBAT.cleanupAfterCombat();
    }
    maxHP() {
        var temp = 50;
        temp += this.tou * 2;
        temp += this.bonusHP;
        if (this.findPerk(PerkLib.Tank) >= 0)
            temp += 50;
        if (this.findPerk(PerkLib.Tank2) >= 0)
            temp += this.tou;
        if (this == liveData.player) {
            temp += this.level * 15;
            if (temp < 50)
                temp = 50;
            if (temp > 999)
                temp = 999;
        }
        temp = Math.round(temp);
        if (this.HP > temp)
            this.HP = temp;
        return temp;
    }
    maxLust() {
        var temp = 100;
        return temp;
    }
    maxFatigue() {
        var temp = 100;
        return temp;
    }
    HPRatio() {
        return this.HP / this.maxHP();
    }
    //Combat
    baseDamage() {
        var baseDmg = this.str + this.weapon.attack;
        if (baseDmg < 10)
            baseDmg = 10; //Clamp minimum damage to 10 if under.
        if (baseDmg > 9999)
            baseDmg = 9999; //Clamp maximum damage to 9999 if over.
        return baseDmg;
    }
    criticalChance() {
        var chance = 4;
        return chance;
    }
    spellMod() {
        var multiplier = 1;
        //Permanent base increase
        if (this.findPerk(PerkLib.Spellpower) >= 0) {
            multiplier += 0.5;
        }
        //Others
        if (this.findPerk(PerkLib.WizardsFocus) >= 0) {
            multiplier += this.perkValue(PerkLib.WizardsFocus, 1);
        }
        return multiplier;
    }
    //Experience
    baseXP() {
        return [5, 10, 20, 30, 40, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125][Math.round(this.level)] || 200;
    }
    bonusXP() {
        return UTIL.rand([5, 10, 20, 30, 40, 50, 55, 60, 65, 70, 75, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98][Math.round(this.level)] || 100);
    }
    getAwardableXP() {
        var xpGained = this.baseXP() + this.bonusXP() + this.additionalXP;
        var levelDiff = liveData.player.level - this.level; //The difference in level affects XP gained.
        //Clamp value between 0 and 4.
        if (levelDiff < 2)
            levelDiff = 0;
        else
            levelDiff -= 2;
        if (levelDiff > 4)
            levelDiff = 4;
        //Apply difference.
        xpGained *= (5 - levelDiff) / 5;
        if (levelDiff > 10)
            xpGained = 1; //If your level is significantly higher than the opponent, gain only 1 XP.
        //Return the value.
        return Math.round(xpGained);
    }
    //Stats Change
    modStats(...args) {
        for (var i = 0; i < args.length; i += 2) {
            //Get variables
            var attribute = args[i];
            var mod = args[i + 1];
            //Alternate
            if (attribute == "int")
                attribute = "inte";
            if (attribute == "sen")
                attribute = "sens";
            if (attribute == "lus")
                attribute = "lust";
            //Skip if resisted or noBimbo
            if (attribute == "resisted" || attribute == "nobimbo")
                continue;
            //Apply modifiers
            this[attribute] += mod;
            //Constrain values to min and max
            if (this[attribute] > 100)
                this[attribute] = 100;
            if (this[attribute] < 0)
                this[attribute] = 0;
            if (this == liveData.player) {
                if (mod > 0)
                    GUI.showUpDown(attribute + "Arrow", "up");
                else if (mod < 0)
                    GUI.showUpDown(attribute + "Arrow", "down");
                GUI.refreshStats();
            }
        }
    }
    dynStats(...args) {
        //For legacy compatibility only.
        this.modStats(args);
    }
    changeHP(amount, display, newpg) {
        //Defaulting
        if (display == undefined)
            display = false;
        if (newpg == undefined)
            newpg = true;
        //Main function
        this.HP += amount;
        if (this.HP > this.maxHP())
            this.HP = this.maxHP();
        if (this.HP < 0)
            this.HP = 0;
        if (display) {
            if (amount < 0)
                outputText(UTIL.capitalize(this.a) + " " + this.refName + " take" + (this.isAre == "is" ? "s" : "") + ' <font color="#800000"><b>' + Math.abs(amount) + "</b></font> damage!");
            else if (amount > 0)
                outputText(UTIL.capitalize(this.a) + " " + this.refName + " " + this.isAre + ' healed for <font color="#008000"><b>' + Math.abs(amount) + "</b></font> HP!");
            if (newpg)
                outputText("<br><br>");
            else
                outputText(" ");
        }
        if (this == liveData.player) {
            if (amount < 0)
                GUI.showUpDown("hpArrow", "down");
            else if (amount > 0)
                GUI.showUpDown("hpArrow", "up");
            GUI.refreshStats();
        }
    }
    changeLust(amount, display = false, newpg = true, resisted = true) {
        //Main function
        if (resisted)
            amount *= this.lustVuln;
        this.lust += amount;
        if (this.lust > this.maxLust())
            this.lust = this.maxLust();
        if (this.lust < 0)
            this.lust = 0;
        if (display) {
            if (amount < 0)
                outputText(UTIL.capitalize(this.a) + " " + this.refName + " " + this.isAre + ' calmed for a reduction of <font color="#A05050"><b>' + Math.abs(amount) + "</b></font> lust!");
            else if (amount > 0)
                outputText(UTIL.capitalize(this.a) + " " + this.refName + " " + this.isAre + ' aroused for <font color="#A05050"><b>' + Math.abs(amount) + "</b></font> points of lust!");
            if (newpg)
                outputText("<br><br>");
            else
                outputText(" ");
        }
        if (this == liveData.player) {
            if (amount < 0)
                GUI.showUpDown("lustArrow", "down");
            else if (amount > 0)
                GUI.showUpDown("lustArrow", "up");
            GUI.refreshStats();
        }
    }
    changeFatigue(amount, display, newpg) {
        //Defaulting
        if (display == undefined)
            display = false;
        if (newpg == undefined)
            newpg = true;
        //Main function
        this.fatigue += amount;
        if (this.fatigue > this.maxFatigue())
            this.fatigue = this.maxFatigue();
        if (this.fatigue < 0)
            this.fatigue = 0;
        if (display) {
            if (amount < 0)
                outputText(UTIL.capitalize(this.a) + " " + this.refName + " " + this.isAre + ' rejuvenated for <font color="#000080"><b>' + Math.abs(amount) + "</b></font> points of fatigue!");
            else if (amount > 0)
                outputText(UTIL.capitalize(this.a) + " " + this.refName + " " + this.isAre + ' fatigued for <font color="#000080"><b>' + Math.abs(amount) + "</b></font> points of fatigue!");
            if (newpg)
                outputText("<br><br>");
            else
                outputText(" ");
        }
        if (this == liveData.player) {
            if (amount < 0)
                GUI.showUpDown("fatigueArrow", "down");
            else if (amount > 0)
                GUI.showUpDown("fatigueArrow", "up");
            GUI.refreshStats();
        }
    }
    damageToughnessModifier(displayMode) {
        var temp = 0;
        if (this.tou < 25)
            temp = this.tou * 0.4;
        else if (this.tou < 50)
            temp = 10 + (this.tou - 25) * 0.3;
        else if (this.tou < 75)
            temp = 17.5 + (this.tou - 50) * 0.2;
        else if (this.tou < 100)
            temp = 22.5 + (this.tou - 75) * 0.1;
        else
            temp = 25;
        //displayMode is for stats screen.
        if (displayMode)
            return temp;
        else
            return UTIL.rand(temp);
    }
    damagePercent(displayMode, applyModifiers) {
        var mult = 100;
        var armorMod = this.armor.defense;
        //--BASE--
        //Toughness modifier.
        if (!displayMode) {
            mult -= this.damageToughnessModifier();
            if (mult < 75)
                mult = 75;
        }
        //Modify armor rating based on weapons.
        if (applyModifiers) {
            if (liveData.player.weapon == Items.Weapons.JewelRapier || liveData.player.weapon == Items.Weapons.SPEAR || (liveData.player.weapon.name.indexOf("staff") != -1 && liveData.player.findPerk(PerkLib.StaffChanneling) >= 0))
                armorMod = 0;
            if (liveData.player.weapon == Items.Weapons.Katana)
                armorMod -= 5;
            if (liveData.player.findPerk(PerkLib.LungingAttacks) >= 0)
                armorMod /= 2;
            if (armorMod < 0)
                armorMod = 0;
        }
        mult -= armorMod;
        //--PERKS--
        //Take damage you masochist!
        if (this.findPerk(PerkLib.Masochist) >= 0 && this.lib >= 60) {
            mult *= 0.8;
            if (this == liveData.player && !displayMode)
                this.changeLust(2, false);
        }
        if (this.findPerk(PerkLib.ImmovableObject) >= 0 && this.tou >= 75) {
            mult *= 0.9;
        }
        //--STATUS AFFECTS--
        //Black cat beer = 25% reduction!
        if (this.statusEffectValue(StatusEffects.BlackCatBeer, 1) > 0)
            mult *= 0.75;
        // Uma's Massage bonuses
        /*var statIndex = this.findStatusEffect(StatusEffects.UmasMassage);
        if (statIndex >= 0) {
            if (this.findStatusEffect(statIndex).value1 == UmasShop.MASSAGE_RELAXATION) {
                mult *= this.findStatusEffect(statIndex).value2;
            }
        }*/
        //Round things off.
        mult = Math.round(mult);
        //Caps damage reduction at 80%.
        if (mult < 20)
            mult = 20;
        return mult;
    }
    teased(lustDelta) {
        lustDelta = Math.round(lustDelta);
        this.outputDefaultTeaseReaction(lustDelta);
        if (lustDelta > 0) {
            //Imp mob uber interrupt!
            if (this.findStatusEffect(StatusEffects.ImpUber) >= 0) {
                // TODO move to proper class
                outputText("<br>The imps in the back stumble over their spell, their loincloths tenting obviously as your display interrupts their casting. One of them spontaneously orgasms, having managed to have his spell backfire. He falls over, weakly twitching as a growing puddle of whiteness surrounds his defeated form.");
                //(-5% of max enemy HP)
                this.changeHP(this.maxHP() * 0.05, true);
                this.changeLust(-15, true);
                this.removeStatusEffect(StatusEffects.ImpUber);
                this.createStatusEffect(StatusEffects.ImpSkip, 0, 0, 0, 0);
            }
        }
        this.changeLust(lustDelta, true);
    }
    outputDefaultTeaseReaction(lustDelta) {
        if (this.plural) {
            if (lustDelta == 0)
                outputText("<br><br>" + UTIL.capitalizeFirstLetter(this.a) + this.refName + " seem unimpressed.");
            if (lustDelta > 0 && lustDelta < 4)
                outputText("<br>" + UTIL.capitalizeFirstLetter(this.a) + this.refName + " look intrigued by what " + this.heShe + " see.");
            if (lustDelta >= 4 && lustDelta < 10)
                outputText("<br>" + UTIL.capitalizeFirstLetter(this.a) + this.refName + " definitely seem to be enjoying the show.");
            if (lustDelta >= 10 && lustDelta < 15)
                outputText("<br>" + UTIL.capitalizeFirstLetter(this.a) + this.refName + " openly stroke " + this.himHer + "selves as " + this.heShe + " watch you.");
            if (lustDelta >= 15 && lustDelta < 20)
                outputText("<br>" + UTIL.capitalizeFirstLetter(this.a) + this.refName + " flush hotly with desire, " + this.hisHer + " eyes filled with longing.");
            if (lustDelta >= 20)
                outputText("<br>" + UTIL.capitalizeFirstLetter(this.a) + this.refName + " lick " + this.hisHer + " lips in anticipation, " + this.hisHer + " hands idly stroking " + this.hisHer + " bodies.");
        }
        else {
            if (lustDelta == 0)
                outputText("<br>" + UTIL.capitalizeFirstLetter(this.a) + this.refName + " seems unimpressed.");
            if (lustDelta > 0 && lustDelta < 4)
                outputText("<br>" + UTIL.capitalizeFirstLetter(this.a) + this.refName + " looks intrigued by what " + this.heShe + " sees.");
            if (lustDelta >= 4 && lustDelta < 10)
                outputText("<br>" + UTIL.capitalizeFirstLetter(this.a) + this.refName + " definitely seems to be enjoying the show.");
            if (lustDelta >= 10 && lustDelta < 15)
                outputText("<br>" + UTIL.capitalizeFirstLetter(this.a) + this.refName + " openly strokes " + this.himHer + "self as " + this.heShe + " watches you.");
            if (lustDelta >= 15 && lustDelta < 20)
                outputText("<br>" + UTIL.capitalizeFirstLetter(this.a) + this.refName + " flushes hotly with desire, " + this.hisHer + " eyes filled with longing.");
            if (lustDelta >= 20)
                outputText("<br>" + UTIL.capitalizeFirstLetter(this.a) + this.refName + " licks " + this.hisHer + " lips in anticipation, " + this.hisHer + " hands idly stroking " + this.hisHer + " own body.");
        }
        outputText(" ");
    }
    //ORGASMS!!!!
    orgasm() {
        this.changeLust(-this.lust);
        this.hoursSinceCum = 0;
        if (this == liveData.player) {
            liveData.gameFlags[TIMES_ORGASMED]++;
            GUI.refreshStats();
        }
    }
    //------------
    // ITEMS/DROPS
    //------------
    clearDrops() {
        this.drops = [];
        this.dropThresholds = [];
    }
    addDrop(item, chance) {
        //Chance is in percentage.
        this.drops.push(item);
        if (this.dropThresholds.length == 0) {
            this.dropThresholds.push(chance);
        }
        else {
            var currentThreshold = this.dropThresholds[this.dropThresholds.length - 1];
            this.dropThresholds[this.dropThresholds.length] = currentThreshold + chance;
        }
    }
    dropItem() {
        var roll = UTIL.rand(100);
        var dropIndex = -1;
        for (var i in this.dropThresholds) {
            if (roll < this.dropThresholds[i]) {
                dropIndex = i;
                break;
            }
        }
        if (dropIndex == -1)
            return undefined;
        return this.drops[dropIndex];
    }
    getTotalDropPercents() {
        var sum = 0;
        for (var i in this.dropThresholds) {
            sum += this.dropThresholds[i];
        }
        return sum;
    }
    //------------
    // STATS/PERKS
    //------------
    //Perks
    createPerk(ptype, value1, value2, value3, value4) {
        var newKeyItem = new Perk(ptype);
        //used to denote that the array has already had its new spot pushed on.
        var arrayed = false;
        //used to store where the array goes
        var keySlot = 0;
        var counter = 0;
        //Start the array if its the first bit
        if (this.perks.length == 0) {
            this.perks.push(newKeyItem);
            arrayed = true;
            keySlot = 0;
        }
        //If it belongs at the end, push it on
        if (this.perks[this.perks.length - 1].ptype.id < ptype.id && !arrayed) {
            this.perks.push(newKeyItem);
            arrayed = true;
            keySlot = this.perks.length - 1;
        }
        //If it belongs in the beginning, splice it in
        if (this.perks[0].ptype.id > ptype.id && !arrayed) {
            this.perks.splice(0, 0, newKeyItem);
            arrayed = true;
            keySlot = 0;
        }
        //Find the spot it needs to go in and splice it in.
        if (!arrayed) {
            console.log("Adding perk");
            counter = this.perks.length;
            while (counter > 0 && !arrayed) {
                counter--;
                //If the current slot is later than new key
                if (this.perks[counter].ptype.id > ptype.id) {
                    //If the earlier slot is earlier than new key && a real spot
                    if (counter - 1 >= 0) {
                        //If the earlier slot is earlier slot in!
                        if (this.perks[counter - 1].ptype.id <= ptype.id) {
                            arrayed = true;
                            this.perks.splice(counter, 0, newKeyItem);
                            keySlot = counter;
                        }
                    }
                    //If the item after 0 slot is later put here!
                    else {
                        //If the next slot is later we are go
                        if (this.perks[counter].ptype.id <= ptype.id) {
                            arrayed = true;
                            this.perks.splice(counter, 0, newKeyItem);
                            keySlot = counter;
                        }
                    }
                }
            }
        }
        //Fallback
        if (!arrayed) {
            //trace("New Perk Belongs at the end!! " + keyName);
            this.perks.push(newKeyItem);
            keySlot = this.perks.length - 1;
        }
        this.perks[keySlot].value1 = value1;
        this.perks[keySlot].value2 = value2;
        this.perks[keySlot].value3 = value3;
        this.perks[keySlot].value4 = value4;
    }
    removePerk(ptype) {
        var counter = this.perks.length;
        //Various Errors preventing action
        if (this.perks.length <= 0) {
            return false;
        }
        while (counter > 0) {
            counter--;
            if (this.perks[counter].ptype == ptype) {
                this.perks.splice(counter, 1);
                return true;
            }
        }
        return false;
    }
    findPerk(ptype) {
        if (ptype == undefined)
            return -1;
        for (var counter = 0; counter < this.perks.length; counter++) {
            if (this.perks[counter].ptype.id == ptype.id)
                return counter;
        }
        return -1;
    }
    perkValue(ptype, value) {
        var counter = this.findPerk(ptype);
        if (counter < 0) {
            return 0;
        }
        if (value == 1)
            return this.perks[counter].value1;
        else if (value == 2)
            return this.perks[counter].value2;
        else if (value == 3)
            return this.perks[counter].value3;
        else if (value == 4)
            return this.perks[counter].value4;
        else
            return 0;
    }
    addPerkValue(ptype, valueIdx, bonus) {
        var counter = this.findPerk(ptype);
        if (counter < 0)
            break addPerkValue;
        if (valueIdx < 1 || valueIdx > 4)
            break addPerkValue;
        if (valueIdx == 1)
            this.perks[i].value1 += bonus;
        if (valueIdx == 2)
            this.perks[i].value2 += bonus;
        if (valueIdx == 3)
            this.perks[i].value3 += bonus;
        if (valueIdx == 4)
            this.perks[i].value4 += bonus;
    }
    setPerkValue(ptype, valueIdx, newNum) {
        var counter = this.findPerk(ptype);
        //Various Errors preventing action
        if (counter < 0)
            break setPerkValue;
        if (valueIdx < 1 || valueIdx > 4)
            break setPerkValue;
        if (valueIdx == 1)
            this.perks[i].value1 = newNum;
        if (valueIdx == 2)
            this.perks[i].value2 = newNum;
        if (valueIdx == 3)
            this.perks[i].value3 = newNum;
        if (valueIdx == 4)
            this.perks[i].value4 = newNum;
    }
    //Status Effects
    createStatusEffect(stype, value1, value2, value3, value4) {
        this.statusEffects.push(new StatusEffect(stype, value1, value2, value3, value4));
    }
    removeStatusEffect(stype) {
        var counter = this.findStatusEffect(stype);
        if (counter < 0)
            break removeStatusEffect;
        this.statusEffects.splice(counter, 1);
    }
    findStatusEffect(stype) {
        if (stype == undefined)
            return -1;
        for (var counter = 0; counter < this.statusEffects.length; counter++) {
            if (this.statusEffects[counter].stype == stype)
                return counter;
        }
        return -1;
    }
    statusEffectValue(stype, value) {
        var counter = this.findStatusEffect(stype);
        if (counter < 0) {
            return 0;
        }
        if (value == 1)
            return this.statusEffects[counter].value1;
        else if (value == 2)
            return this.statusEffects[counter].value2;
        else if (value == 3)
            return this.statusEffects[counter].value3;
        else if (value == 4)
            return this.statusEffects[counter].value4;
        else
            return 0;
    }
    addStatusValue(stype, valueIdx, bonus) {
        var counter = this.findStatusEffect(stype);
        if (counter < 0)
            break addStatusValue;
        if (valueIdx < 1 || valueIdx > 4)
            break addStatusValue;
        if (valueIdx == 1)
            this.statusEffects[stype].value1 += bonus;
        if (valueIdx == 2)
            this.statusEffects[stype].value2 += bonus;
        if (valueIdx == 3)
            this.statusEffects[stype].value3 += bonus;
        if (valueIdx == 4)
            this.statusEffects[stype].value4 += bonus;
    }
    changeStatusValue(stype, valueIdx, newNum) {
        var counter = this.findStatusEffect(stype);
        //Various Errors preventing action
        if (counter < 0)
            break changeStatusValue;
        if (valueIdx < 1 || valueIdx > 4)
            break changeStatusValue;
        if (valueIdx == 1)
            this.statusEffects[stype].value1 = newNum;
        if (valueIdx == 2)
            this.statusEffects[stype].value2 = newNum;
        if (valueIdx == 3)
            this.statusEffects[stype].value3 = newNum;
        if (valueIdx == 4)
            this.statusEffects[stype].value4 = newNum;
    }
    //-------
    // Key Items
    //-------
    //Create a new Key Item
    createKeyItem(keyName, value1, value2, value3, value4) {
        var newKeyItem = new KeyItem(keyName);
        //used to denote that the array has already had its new spot pushed on.
        var arrayed = false;
        //used to store where the array goes
        var keySlot = 0;
        var counter = 0;
        //Start the array if its the first bit
        if (this.keyItems.length == 0) {
            //outputText("<br>New Key Item Started Array! " + newKeyItem.ktype.id);
            this.keyItems.push(newKeyItem);
            arrayed = true;
            keySlot = 0;
        }
        //If it belongs at the end, push it on
        if (this.keyItems[this.keyItems.length - 1].ktype.id < newKeyItem.ktype.id && !arrayed) {
            //outputText("<br>New Key Item Belongs at the end!! " + newKeyItem.ktype.id);
            this.keyItems.push(newKeyItem);
            arrayed = true;
            keySlot = this.keyItems.length - 1;
        }
        //If it belongs in the beginning, splice it in
        if (this.keyItems[0].ktype.id > newKeyItem.ktype.id && !arrayed) {
            //outputText("<br>New Key Item Belongs at the beginning! " + newKeyItem.ktype.id);
            this.keyItems.splice(0, 0, newKeyItem);
            arrayed = true;
            keySlot = 0;
        }
        //Find the spot it needs to go in and splice it in.
        if (!arrayed) {
            //outputText("<br>New Key Item using alphabetizer! " + newKeyItem.ktype.id);
            counter = this.keyItems.length;
            while (counter > 0 && !arrayed) {
                counter--;
                //If the current slot is later than new key
                if (this.keyItems[counter].ktype.id > newKeyItem.ktype.id) {
                    //If the earlier slot is earlier than new key && a real spot
                    if (counter - 1 >= 0) {
                        //If the earlier slot is earlier slot in!
                        if (this.keyItems[counter - 1].ktype.id <= newKeyItem.ktype.id) {
                            arrayed = true;
                            this.keyItems.splice(counter, 0, newKeyItem);
                            keySlot = counter;
                        }
                    }
                    //If the item after 0 slot is later put here!
                    else {
                        //If the next slot is later we are go
                        if (this.keyItems[counter].ktype.id <= newKeyItem.ktype.id) {
                            arrayed = true;
                            this.keyItems.splice(counter, 0, newKeyItem);
                            keySlot = counter;
                        }
                    }
                }
            }
        }
        //Fallback
        if (!arrayed) {
            //outputText("New Key Item Belongs at the end!! " + newKeyItem.ktype.id);
            this.keyItems.push(newKeyItem);
            keySlot = this.keyItems.length - 1;
        }
        this.keyItems[keySlot].keyName = keyName;
        this.keyItems[keySlot].value1 = value1;
        this.keyItems[keySlot].value2 = value2;
        this.keyItems[keySlot].value3 = value3;
        this.keyItems[keySlot].value4 = value4;
        //outputText("NEW KEYITEM FOR PLAYER in slot " + keySlot + ": " + this.keyItems[keySlot].ktype.id);
    }
    //Remove a Key Item
    removeKeyItem(ktype) {
        var counter = this.hasKeyItem(ktype);
        if (counter < 0)
            break removeKeyItem;
        this.statusEffects.splice(counter, 1);
    }
    //Check if a Key Item exists
    hasKeyItem(ktype) {
        if (ktype == undefined)
            return -1;
        for (var counter = 0; counter < this.keyItems.length; counter++) {
            if (this.keyItems[counter].ktype.id == ktype.id)
                return counter;
        }
        return -1;
    }
    //Utility functions for key item array
    keyValue(ktype, value) {
        var counter = this.hasKeyItem(ktype);
        if (counter < 0) {
            return 0;
        }
        if (value == 1)
            return this.keyItems[counter].value1;
        else if (value == 2)
            return this.keyItems[counter].value2;
        else if (value == 3)
            return this.keyItems[counter].value3;
        else if (value == 4)
            return this.keyItems[counter].value4;
        else
            return 0;
    }
    addKeyValue(ptype, valueIdx, bonus) {
        var counter = this.hasKeyItem(ptype);
        if (counter < 0)
            break addKeyValue;
        if (valueIdx < 1 || valueIdx > 4)
            break addKeyValue;
        if (valueIdx == 1)
            this.keyItems[i].value1 += bonus;
        if (valueIdx == 2)
            this.keyItems[i].value2 += bonus;
        if (valueIdx == 3)
            this.keyItems[i].value3 += bonus;
        if (valueIdx == 4)
            this.keyItems[i].value4 += bonus;
    }
    setKeyValue(ptype, valueIdx, newNum) {
        var counter = this.findPerk(ptype);
        //Various Errors preventing action
        if (counter < 0)
            break setKeyValue;
        if (valueIdx < 1 || valueIdx > 4)
            break setKeyValue;
        if (valueIdx == 1)
            this.keyItems[i].value1 = newNum;
        if (valueIdx == 2)
            this.keyItems[i].value2 = newNum;
        if (valueIdx == 3)
            this.keyItems[i].value3 = newNum;
        if (valueIdx == 4)
            this.keyItems[i].value4 = newNum;
    }
    //------------
    // SEXUAL UTIL
    //------------
    hasCock() {
        return this.cocks.length > 0;
    }
    cockTotal() {
        return this.cocks.length;
    }
    totalCocks() {
        //Alternate
        return this.cockTotal();
    }
    hasVagina() {
        return this.vaginas.length > 0;
    }
    hasVirginVagina() {
        if (this.vaginas.length > 0)
            return this.vaginas[0].virgin;
        return false;
    }
    vaginaTotal() {
        return this.vaginas.length;
    }
    wetness() {
        if (this.vaginas.length == 0)
            return 0;
        else
            return this.vaginas[0].vaginalWetness;
    }
    vaginaType(newType) {
        //Default
        if (newType == undefined)
            newType = -1;
        //Main
        if (!this.hasVagina())
            return -1;
        if (newType != -1) {
            this.vaginas[0].type = newType;
        }
        return this.vaginas[0].type;
    }
    looseness(vag) {
        //Default
        if (vag == undefined)
            vag = true;
        //Main
        if (vag) {
            if (this.vaginas.length == 0)
                return 0;
            else
                return this.vaginas[0].vaginalLooseness;
        }
        else {
            return this.ass.analLooseness;
        }
    }
    vaginalCapacity() {
        //If the player has no vaginas
        if (this.vaginas.length == 0)
            return 0;
        var bonus = 0;
        //Centaurs = +50 capacity
        if (this.lowerBody == 4)
            bonus = 50;
        //Naga = +20 capacity
        else if (this.lowerBody == 3)
            bonus = 20;
        //Wet pussy provides 20 point boost
        if (this.findPerk(PerkLib.WetPussy) >= 0)
            bonus += 20;
        if (this.findPerk(PerkLib.HistorySlut) >= 0)
            bonus += 20;
        if (this.findPerk(PerkLib.OneTrackMind) >= 0)
            bonus += 10;
        if (this.findPerk(PerkLib.Cornucopia) >= 0)
            bonus += 30;
        if (this.findPerk(PerkLib.FerasBoonWideOpen) >= 0)
            bonus += 25;
        if (this.findPerk(PerkLib.FerasBoonMilkingTwat) >= 0)
            bonus += 40;
        var total = (bonus + this.statusEffectValue(StatusEffects.BonusVCapacity, 1) + 8 * this.vaginas[0].vaginalLooseness * this.vaginas[0].vaginalLooseness) * (1 + this.vaginas[0].vaginalWetness / 10);
        return total;
    }
    analCapacity() {
        var bonus = 0;
        //Centaurs = +30 capacity
        if (this.lowerBody == LOWER_BODY_TYPE_CENTAUR)
            bonus = 30;
        if (this.findPerk(PerkLib.HistorySlut) >= 0)
            bonus += 20;
        if (this.findPerk(PerkLib.Cornucopia) >= 0)
            bonus += 30;
        if (this.findPerk(PerkLib.OneTrackMind) >= 0)
            bonus += 10;
        if (this.ass.analWetness > 0)
            bonus += 15;
        var total = (bonus + this.statusEffectValue(StatusEffects.BonusACapacity, 1) + 6 * this.ass.analLooseness * this.ass.analLooseness) * (1 + this.ass.analWetness / 10);
        return total;
    }
    hasFuckableNipples() {
        var counter = this.breastRows.length;
        while (counter > 0) {
            counter--;
            if (this.breastRows[counter].fuckable)
                return true;
        }
        return false;
    }
    hasBreasts() {
        if (this.breastRows.length > 0) {
            if (this.biggestTitSize() >= 1)
                return true;
        }
        return false;
    }
    hasNipples() {
        var counter = this.breastRows.length;
        while (counter > 0) {
            counter--;
            if (this.breastRows[counter].nipplesPerBreast > 0)
                return true;
        }
        return false;
    }
    //Milky goodness!
    lactationSpeed() {
        //Lactation * breastSize x 10 (milkPerBreast) determines scene
        return this.biggestLactation() * this.biggestTitSize() * 10;
    }
    biggestLactation() {
        if (this.breastRows.length == 0)
            return 0;
        var counter = this.breastRows.length;
        var index = 0;
        while (counter > 0) {
            counter--;
            if (this.breastRows[index].lactationMultiplier < this.breastRows[counter].lactationMultiplier)
                index = counter;
        }
        return this.breastRows[index].lactationMultiplier;
    }
    milked() {
        if (this.findStatusEffect(StatusEffects.LactationReduction) >= 0)
            this.changeStatusValue(StatusEffects.LactationReduction, 1, 0);
        if (this.findStatusEffect(StatusEffects.LactationReduc0) >= 0)
            this.removeStatusEffect(StatusEffects.LactationReduc0);
        if (this.findStatusEffect(StatusEffects.LactationReduc1) >= 0)
            this.removeStatusEffect(StatusEffects.LactationReduc1);
        if (this.findStatusEffect(StatusEffects.LactationReduc2) >= 0)
            this.removeStatusEffect(StatusEffects.LactationReduc2);
        if (this.findStatusEffect(StatusEffects.LactationReduc3) >= 0)
            this.removeStatusEffect(StatusEffects.LactationReduc3);
        if (this.findPerk(PerkLib.Feeder) >= 0) {
            //You've now been milked, reset the timer for that
            this.addStatusValue(StatusEffects.Feeder, 1, 1);
            this.changeStatusValue(StatusEffects.Feeder, 2, 0);
        }
    }
    boostLactation(todo) {
        if (this.breastRows.length == 0)
            return 0;
        var counter = this.breastRows.length;
        var index = 0;
        var changes = 0;
        var temp2 = 0;
        //Prevent lactation decrease if lactating.
        if (todo >= 0) {
            if (this.findStatusEffect(StatusEffects.LactationReduction) >= 0)
                this.changeStatusValue(StatusEffects.LactationReduction, 1, 0);
            if (this.findStatusEffect(StatusEffects.LactationReduc0) >= 0)
                this.removeStatusEffect(StatusEffects.LactationReduc0);
            if (this.findStatusEffect(StatusEffects.LactationReduc1) >= 0)
                this.removeStatusEffect(StatusEffects.LactationReduc1);
            if (this.findStatusEffect(StatusEffects.LactationReduc2) >= 0)
                this.removeStatusEffect(StatusEffects.LactationReduc2);
            if (this.findStatusEffect(StatusEffects.LactationReduc3) >= 0)
                this.removeStatusEffect(StatusEffects.LactationReduc3);
        }
        if (todo > 0) {
            while (todo > 0) {
                counter = this.breastRows.length;
                todo -= 0.1;
                while (counter > 0) {
                    counter--;
                    if (this.breastRows[index].lactationMultiplier > this.breastRows[counter].lactationMultiplier)
                        index = counter;
                }
                temp2 = 0.1;
                if (this.breastRows[index].lactationMultiplier > 1.5)
                    temp2 /= 2;
                if (this.breastRows[index].lactationMultiplier > 2.5)
                    temp2 /= 2;
                if (this.breastRows[index].lactationMultiplier > 3)
                    temp2 /= 2;
                changes += temp2;
                this.breastRows[index].lactationMultiplier += temp2;
            }
        }
        else {
            while (todo < 0) {
                counter = this.breastRows.length;
                index = 0;
                if (todo > -0.1) {
                    while (counter > 0) {
                        counter--;
                        if (this.breastRows[index].lactationMultiplier < this.breastRows[counter].lactationMultiplier)
                            index = counter;
                    }
                    this.breastRows[index].lactationMultiplier += todo;
                    if (this.breastRows[index].lactationMultiplier < 0)
                        this.breastRows[index].lactationMultiplier = 0;
                    todo = 0;
                }
                else {
                    todo += 0.1;
                    while (counter > 0) {
                        counter--;
                        if (this.breastRows[index].lactationMultiplier < this.breastRows[counter].lactationMultiplier)
                            index = counter;
                    }
                    temp2 = todo;
                    changes += temp2;
                    this.breastRows[index].lactationMultiplier += temp2;
                    if (this.breastRows[index].lactationMultiplier < 0)
                        this.breastRows[index].lactationMultiplier = 0;
                }
            }
        }
        return changes;
    }
    averageLactation() {
        if (this.breastRows.length == 0)
            return 0;
        var counter = this.breastRows.length;
        var index = 0;
        while (counter > 0) {
            counter--;
            index += this.breastRows[counter].lactationMultiplier;
        }
        return Math.floor(index / this.breastRows.length);
    }
    lactationQ() {
        if (this.biggestLactation() < 1)
            return 0;
        //(Milk production TOTAL= breastSize x 10 * lactationMultiplier * breast total * milking-endurance (1- default, maxes at 2.  Builds over time as milking as done)
        //(Small – 0.01 mLs – Size 1 + 1 Multi)
        //(Large – 0.8 - Size 10 + 4 Multi)
        //(HUGE – 2.4 - Size 12 + 5 Multi + 4 tits)
        var total;
        if (this.findStatusEffect(StatusEffects.LactationEndurance) < 0)
            this.createStatusEffect(StatusEffects.LactationEndurance, 1, 0, 0, 0);
        total = this.biggestTitSize() * 10 * this.averageLactation() * this.statusEffectValue(StatusEffects.LactationEndurance, 1) * this.totalBreasts();
        if (this.findPerk(PerkLib.MilkMaid) >= 0)
            total += 200 + this.perkValue(PerkLib.MilkMaid, 1) * 100;
        if (this.statusEffectValue(StatusEffects.LactationReduction, 1) >= 48)
            total *= 1.5;
        if (total > Number.MAX_VALUE)
            total = Number.MAX_VALUE;
        return total;
    }
    isLactating() {
        return this.lactationQ() > 0;
    }
    cumQ() {
        if (!this.hasCock())
            return 0;
        var quantity = 0;
        //Base value is ballsize*ballQ*cumefficiency by a factor of 2.
        //Other things that affect it:
        //lust - 50% = normal output.  0 = half output. 100 = +50% output.
        //trace("CUM ESTIMATE: " + int(1.25*2*cumMultiplier*2*(lust + 50)/10 * (hoursSinceCum+10)/24)/10 + "(no balls), " + int(ballSize*balls*cumMultiplier*2*(lust + 50)/10 * (hoursSinceCum+10)/24)/10 + "(withballs)");
        var lustCoefficient = (this.lust + 50) / 10;
        //If realistic mode is enabled, limits cum to capacity.
        if (hungerEnabled >= 1) {
            lustCoefficient = (this.lust + 50) / 5;
            if (this.findPerk(PerkLib.PilgrimsBounty) >= 0)
                lustCoefficient = 30;
            var percent = 0;
            percent = lustCoefficient + (this.hoursSinceCum + 10);
            if (percent > 100)
                percent = 100;
            if (quantity > this.cumCapacity())
                quantity = this.cumCapacity();
            return (percent / 100) * this.cumCapacity();
        }
        //Pilgrim's bounty maxes lust coefficient
        if (this.findPerk(PerkLib.PilgrimsBounty) >= 0)
            lustCoefficient = 150 / 10;
        if (this.balls == 0)
            quantity = Math.floor((1.25 * 2 * this.cumMultiplier * 2 * lustCoefficient * (this.hoursSinceCum + 10)) / 24) / 10;
        else
            quantity = Math.floor((this.ballSize * this.balls * this.cumMultiplier * 2 * lustCoefficient * (this.hoursSinceCum + 10)) / 24) / 10;
        if (this.findPerk(PerkLib.BroBody) >= 0)
            quantity *= 1.3;
        if (this.findPerk(PerkLib.FertilityPlus) >= 0)
            quantity *= 1.5;
        if (this.findPerk(PerkLib.FertilityMinus) >= 0 && this.lib < 25)
            quantity *= 0.7;
        if (this.findPerk(PerkLib.MessyOrgasms) >= 0)
            quantity *= 1.5;
        if (this.findPerk(PerkLib.OneTrackMind) >= 0)
            quantity *= 1.1;
        if (this.findPerk(PerkLib.MaraesGiftStud) >= 0)
            quantity += 350;
        if (this.findPerk(PerkLib.FerasBoonAlpha) >= 0)
            quantity += 200;
        if (this.findPerk(PerkLib.MagicalVirility) >= 0)
            quantity += 200;
        if (this.findPerk(PerkLib.FerasBoonSeeder) >= 0)
            quantity += 1000;
        if (this.findPerk("Elven Bounty") >= 0)
            quantity += 250;
        quantity += this.perkValue(PerkLib.ElvenBounty, 1);
        if (this.findPerk(PerkLib.BroBody) >= 0)
            quantity += 200;
        if (this.findPerk(PerkLib.SatyrSexuality) >= 0)
            quantity += 50;
        quantity += this.statusEffectValue(StatusEffects.Rut, 1);
        quantity *= 1 + (2 * this.perkValue(PerkLib.PiercedFertite, 1)) / 100;
        //if (jewelryEffectId == JewelryLib.MODIFIER_FERTILITY)
        //	quantity *= (1 + (jewelryEffectMagnitude / 100));
        //trace("Final Cum Volume: " + int(quantity) + "mLs.");
        //if (quantity < 0) trace("SOMETHING HORRIBLY WRONG WITH CUM CALCULATIONS");
        if (quantity < 2)
            quantity = 2;
        if (quantity > 999999999)
            //Cum production is capped at 999,999,999mL.
            quantity = 999999999;
        return quantity;
    }
    cumCapacity() {
        if (!this.hasCock())
            return 0;
        var cumCap = 0;
        //Alter capacity by balls.
        if (this.balls > 0)
            cumCap += Math.pow((4 / 3) * Math.PI * (this.ballSize / 2), 3) * this.balls;
        // * cumMultiplier
        else
            cumCap += Math.pow((4 / 3) * Math.PI, 3) * 2; // * cumMultiplier
        //Alter capacity by perks.
        if (this.findPerk(PerkLib.BroBody) >= 0)
            cumCap *= 1.3;
        if (this.findPerk(PerkLib.FertilityPlus) >= 0)
            cumCap *= 1.5;
        if (this.findPerk(PerkLib.FertilityMinus) >= 0 && this.lib < 25)
            cumCap *= 0.7;
        if (this.findPerk(PerkLib.MessyOrgasms) >= 0)
            cumCap *= 1.5;
        if (this.findPerk(PerkLib.OneTrackMind) >= 0)
            cumCap *= 1.1;
        if (this.findPerk(PerkLib.MaraesGiftStud) >= 0)
            cumCap += 350;
        if (this.findPerk(PerkLib.FerasBoonAlpha) >= 0)
            cumCap += 200;
        if (this.findPerk(PerkLib.MagicalVirility) >= 0)
            cumCap += 200;
        if (this.findPerk(PerkLib.FerasBoonSeeder) >= 0)
            cumCap += 1000;
        cumCap += this.perkValue(PerkLib.ElvenBounty, 1);
        if (this.findPerk(PerkLib.BroBody) >= 0)
            cumCap += 200;
        cumCap += this.statusEffectValue(StatusEffects.Rut, 1);
        cumCap *= 1 + (2 * this.perkValue(PerkLib.PiercedFertite, 1)) / 100;
        //Alter capacity by accessories.
        //if (jewelryEffectId == JewelryLib.MODIFIER_FERTILITY) cumCap *= (1 + (jewelryEffectMagnitude / 100));
        cumCap *= this.cumMultiplier;
        cumCap = Math.round(cumCap);
        if (cumCap > 999999999)
            cumCap = 999999999;
        return cumCap;
    }
    inHeat() {
        get;
        inHeat();
        {
            return this.findStatusEffect(StatusEffects.Heat) >= 1;
        } // Setting to 0 was causing heat messages for the Imp scene.
    }
    inRut() {
        get;
        inRut();
        {
            return this.findStatusEffect(StatusEffects.Rut) >= 0;
        }
    }
    bonusFertility() {
        var counter = 0;
        if (this.inHeat())
            counter += this.statusEffectValue(StatusEffects.Heat, 1);
        if (this.findPerk(PerkLib.FertilityPlus) >= 0)
            counter += 15;
        if (this.findPerk(PerkLib.FertilityMinus) >= 0 && this.lib < 25)
            counter -= 15;
        if (this.findPerk(PerkLib.MaraesGiftFertility) >= 0)
            counter += 50;
        if (this.findPerk(PerkLib.FerasBoonBreedingBitch) >= 0)
            counter += 30;
        if (this.findPerk(PerkLib.MagicalFertility) >= 0)
            counter += 10;
        counter += this.perkValue(PerkLib.ElvenBounty, 2);
        counter += this.perkValue(PerkLib.PiercedFertite, 1);
        //if (jewelryEffectId == JewelryLib.MODIFIER_FERTILITY)
        //    counter += jewelryEffectMagnitude;
        counter += this.perkValue(PerkLib.AscensionFertility, 1) * 5;
        return counter;
    }
    totalFertility() {
        return this.bonusFertility() + this.fertility;
    }
    countCocksOfType(type) {
        if (this.cocks.length == 0)
            return 0;
        var counter = 0;
        for (var x = 0; x < this.cocks.length; x++) {
            if (this.cocks[x].cockType == type)
                counter++;
        }
        return counter;
    }
    findFirstCockType(ctype) {
        for (var index = 0; index < cocks.length; index++) {
            if (cocks[index].cockType == ctype)
                return index;
        }
        return -1;
    }
    //Breasts Getter functions
    biggestTitSize() {
        if (this.breastRows.length == 0)
            return -1;
        var counter = this.breastRows.length;
        var index = 0;
        while (counter > 0) {
            counter--;
            if (this.breastRows[index].breastRating < this.breastRows[counter].breastRating)
                index = counter;
        }
        return this.breastRows[index].breastRating;
    }
    //Cock Getter functions
    cockThatFits(capacity) {
        var firstCockFit = -1;
        for (var i = 0; i < this.cocks.length; i++) {
            if (this.cocks[i].cockArea() <= capacity) {
                firstCockFit = i;
                break;
            }
        }
        return firstCockFit;
    }
    cockArea(i_cockIndex) {
        if (i_cockIndex >= this.cocks.length || i_cockIndex < 0)
            return 0;
        return this.cocks[i_cockIndex].cockThickness * this.cocks[i_cockIndex].cockLength;
    }
    biggestCockLength() {
        if (this.cocks.length == 0)
            return 0;
        return this.cocks[this.biggestCockIndex()].cockLength;
    }
    biggestCockArea() {
        if (this.cocks.length == 0)
            return 0;
        var counter = this.cocks.length;
        var index = 0;
        while (counter > 0) {
            counter--;
            if (this.cockArea(index) < this.cockArea(counter))
                index = counter;
        }
        return this.cockArea(index);
    }
    //Find the second biggest dick and it's area.
    biggestCockArea2() {
        if (this.cocks.length <= 1)
            return 0;
        var counter = this.cocks.length;
        var index = 0;
        var index2 = -1;
        //Find the biggest
        while (counter > 0) {
            counter--;
            if (this.cockArea(index) < this.cockArea(counter))
                index = counter;
        }
        //Reset counter and find the next biggest
        counter = this.cocks.length;
        while (counter > 0) {
            counter--;
            //Is this spot claimed by the biggest?
            if (counter != index) {
                //Not set yet?
                if (index2 == -1)
                    index2 = counter;
                //Is the stored value less than the current one?
                if (this.cockArea(index2) < this.cockArea(counter)) {
                    index2 = counter;
                }
            }
        }
        //If it couldn't find a second biggest...
        if (index == index2)
            return 0;
        return this.cockArea(index2);
    }
    longestCock() {
        if (this.cocks.length == 0)
            return 0;
        var counter = this.cocks.length;
        var index = 0;
        while (counter > 0) {
            counter--;
            if (this.cocks[index].cockLength < this.cocks[counter].cockLength)
                index = counter;
        }
        return index;
    }
    longestCockLength() {
        if (this.cocks.length == 0)
            return 0;
        var counter = this.cocks.length;
        var index = 0;
        while (counter > 0) {
            counter--;
            if (this.cocks[index].cockLength < this.cocks[counter].cockLength)
                index = counter;
        }
        return this.cocks[index].cockLength;
    }
    twoDickRadarSpecial(width) {
        //No two dicks?  FUCK OFF
        if (this.cockTotal() < 2)
            return false;
        //Set up vars
        //Get thinnest, work done already
        var thinnest = this.thinnestCockIndex();
        var thinnest2 = 0;
        //For ze loop
        var temp = 0;
        //Make sure they arent the same at initialization
        if (thinnest2 == thinnest)
            thinnest2 = 1;
        //Loop through to find 2nd thinnest
        while (temp < this.cocks.length) {
            if (this.cocks[thinnest2].cockThickness > this.cocks[temp].cockThickness && temp != thinnest)
                thinnest2 = temp;
            temp++;
        }
        //If the two thicknesses added together are less than the arg, true, else false
        return this.cocks[thinnest].cockThickness + this.cocks[thinnest2].cockThickness < width;
    }
    totalCockThickness() {
        var thick = 0;
        var counter = this.cocks.length;
        while (counter > 0) {
            counter--;
            thick += this.cocks[counter].cockThickness;
        }
        return thick;
    }
    thickestCock() {
        if (this.cocks.length == 0)
            return 0;
        var counter = this.cocks.length;
        var index = 0;
        while (counter > 0) {
            counter--;
            if (this.cocks[index].cockThickness < this.cocks[counter].cockThickness)
                index = counter;
        }
        return index;
    }
    thickestCockThickness() {
        if (this.cocks.length == 0)
            return 0;
        var counter = this.cocks.length;
        var index = 0;
        while (counter > 0) {
            counter--;
            if (this.cocks[index].cockThickness < this.cocks[counter].cockThickness)
                index = counter;
        }
        return this.cocks[index].cockThickness;
    }
    thinnestCockIndex() {
        if (this.cocks.length == 0)
            return 0;
        var counter = this.cocks.length;
        var index = 0;
        while (counter > 0) {
            counter--;
            if (this.cocks[index].cockThickness > this.cocks[counter].cockThickness)
                index = counter;
        }
        return index;
    }
    smallestCockIndex() {
        if (this.cocks.length == 0)
            return 0;
        var counter = this.cocks.length;
        var index = 0;
        while (counter > 0) {
            counter--;
            if (this.cockArea(index) > this.cockArea(counter)) {
                index = counter;
            }
        }
        return index;
    }
    smallestCockLength() {
        if (this.cocks.length == 0)
            return 0;
        return this.cocks[this.smallestCockIndex()].cockLength;
    }
    shortestCockIndex() {
        if (this.cocks.length == 0)
            return 0;
        var counter = this.cocks.length;
        var index = 0;
        while (counter > 0) {
            counter--;
            if (this.cocks[index].cockLength > this.cocks[counter].cockLength)
                index = counter;
        }
        return index;
    }
    shortestCockLength() {
        if (this.cocks.length == 0)
            return 0;
        var counter = this.cocks.length;
        var index = 0;
        while (counter > 0) {
            counter--;
            if (this.cocks[index].cockLength > this.cocks[counter].cockLength)
                index = counter;
        }
        return this.cocks[index].cockLength;
    }
    //Find the biggest cock that fits inside a given value
    cockThatFits(i_fits, type) {
        //Defaulting
        if (i_fits == undefined)
            i_fits = 0;
        if (type == undefined)
            type = "area";
        //Main function
        if (this.cocks.length <= 0)
            return -1;
        var cockIdxPtr = this.cocks.length;
        //Current largest fitter
        var cockIndex = -1;
        while (cockIdxPtr > 0) {
            cockIdxPtr--;
            if (type == "area") {
                if (this.cockArea(cockIdxPtr) <= i_fits) {
                    //If one already fits
                    if (cockIndex >= 0) {
                        //See if the newcomer beats the saved small guy
                        if (this.cockArea(cockIdxPtr) > this.cockArea(cockIndex))
                            cockIndex = cockIdxPtr;
                    }
                    //Store the index of fitting dick
                    else
                        cockIndex = cockIdxPtr;
                }
            }
            else if (type == "length") {
                if (this.cocks[cockIdxPtr].cockLength <= i_fits) {
                    //If one already fits
                    if (cockIndex >= 0) {
                        //See if the newcomer beats the saved small guy
                        if (this.cocks[cockIdxPtr].cockLength > this.cocks[cockIndex].cockLength)
                            cockIndex = cockIdxPtr;
                    }
                    //Store the index of fitting dick
                    else
                        cockIndex = cockIdxPtr;
                }
            }
        }
        return cockIndex;
    }
    //Find the 2nd biggest cock that fits inside a given value
    cockThatFits2(fits) {
        //Defaulting
        if (fits == undefined)
            fits = 0;
        //Main function
        if (this.cockTotal() == 1)
            return -1;
        var counter = this.cocks.length;
        //Current largest fitter
        var index = -1;
        var index2 = -1;
        while (counter > 0) {
            counter--;
            //Does this one fit?
            if (this.cockArea(counter) <= fits) {
                //If one already fits
                if (index >= 0) {
                    //See if the newcomer beats the saved small guy
                    if (this.cockArea(counter) > this.cockArea(index)) {
                        //Save old wang
                        if (index != -1)
                            index2 = index;
                        index = counter;
                    }
                    //If this one fits and is smaller than the other great
                    else {
                        if (this.cockArea(index2) < this.cockArea(counter) && counter != index) {
                            index2 = counter;
                        }
                    }
                }
                //Store the index of fitting dick
                else
                    index = counter;
            }
        }
        return index2;
    }
    smallestCockArea() {
        if (this.cockTotal() == 0)
            return -1;
        return this.cockArea(this.smallestCockIndex());
    }
    smallestCock() {
        return this.cockArea(this.smallestCockIndex());
    }
    biggestCockIndex() {
        if (this.cocks.length == 0)
            return 0;
        var counter = this.cocks.length;
        var index = 0;
        while (counter > 0) {
            counter--;
            if (this.cockArea(index) < this.cockArea(counter))
                index = counter;
        }
        return index;
    }
    //Find the second biggest dick's index.
    biggestCockIndex2() {
        if (this.cocks.length <= 1)
            return 0;
        var counter = this.cocks.length;
        var index = 0;
        var index2 = 0;
        //Find the biggest
        while (counter > 0) {
            counter--;
            if (this.cockArea(index) < this.cockArea(counter))
                index = counter;
        }
        //Reset counter and find the next biggest
        counter = this.cocks.length;
        while (counter > 0) {
            counter--;
            //Make sure index2 doesn't get stuck
            //at the same value as index1 if the
            //initial location is biggest.
            if (index == index2 && counter != index)
                index2 = counter;
            //Is the stored value less than the current one?
            if (this.cockArea(index2) < this.cockArea(counter)) {
                //Make sure we don't set index2 to be the same
                //as the biggest dick.
                if (counter != index)
                    index2 = counter;
            }
        }
        //If it couldn't find a second biggest...
        if (index == index2)
            return 0;
        return index2;
    }
    smallestCockIndex2() {
        if (this.cocks.length <= 1)
            return 0;
        var counter = this.cocks.length;
        var index = 0;
        var index2 = 0;
        //Find the smallest
        while (counter > 0) {
            counter--;
            if (this.cockArea(index) > this.cockArea(counter))
                index = counter;
        }
        //Reset counter and find the next biggest
        counter = this.cocks.length;
        while (counter > 0) {
            counter--;
            //Make sure index2 doesn't get stuck
            //at the same value as index1 if the
            //initial location is biggest.
            if (index == index2 && counter != index)
                index2 = counter;
            //Is the stored value less than the current one?
            if (this.cockArea(index2) > this.cockArea(counter)) {
                //Make sure we don't set index2 to be the same
                //as the biggest dick.
                if (counter != index)
                    index2 = counter;
            }
        }
        //If it couldn't find a second biggest...
        if (index == index2)
            return 0;
        return index2;
    }
    //Find the third biggest dick index.
    biggestCockIndex3() {
        if (this.cocks.length <= 2)
            return 0;
        var counter = this.cocks.length;
        var index = 0;
        var index2 = -1;
        var index3 = -1;
        //Find the biggest
        while (counter > 0) {
            counter--;
            if (this.cockArea(index) < this.cockArea(counter))
                index = counter;
        }
        //Reset counter and find the next biggest
        counter = this.cocks.length;
        while (counter > 0) {
            counter--;
            //If this index isn't used already
            if (counter != index) {
                //Has index been set to anything yet?
                if (index2 == -1)
                    index2 = counter;
                //Is the stored value less than the current one?
                else if (this.cockArea(index2) < this.cockArea(counter)) {
                    index2 = counter;
                }
            }
        }
        //If it couldn't find a second biggest...
        if (index == index2 || index2 == -1)
            index2 = 0;
        //Reset counter and find the next biggest
        counter = this.cocks.length;
        while (counter > 0) {
            counter--;
            //If this index isn't used already
            if (counter != index && counter != index2) {
                //Has index been set to anything yet?
                if (index3 == -1)
                    index3 = counter;
                //Is the stored value less than the current one?
                else if (this.cockArea(index3) < this.cockArea(counter)) {
                    index3 = counter;
                }
            }
        }
        //If it fails for some reason.
        if (index3 == -1)
            index3 = 0;
        return index3;
    }
    breastCup(rowNum) {
        return Appearance.breastCup(this.breastRows[rowNum].breastRating);
    }
    bRows() {
        return this.breastRows.length;
    }
    totalBreasts() {
        var counter = this.breastRows.length;
        var total = 0;
        while (counter > 0) {
            counter--;
            total += this.breastRows[counter].breasts;
        }
        return total;
    }
    totalNipples() {
        var counter = this.breastRows.length;
        var total = 0;
        while (counter > 0) {
            counter--;
            total += this.breastRows[counter].nipplesPerBreast * this.breastRows[counter].breasts;
        }
        return total;
    }
    smallestTitSize() {
        if (this.breastRows.length == 0)
            return -1;
        var counter = this.breastRows.length;
        var index = 0;
        while (counter > 0) {
            counter--;
            if (this.breastRows[index].breastRating > this.breastRows[counter].breastRating)
                index = counter;
        }
        return this.breastRows[index].breastRating;
    }
    smallestTitRow() {
        if (this.breastRows.length == 0)
            return -1;
        var counter = this.breastRows.length;
        var index = 0;
        while (counter > 0) {
            counter--;
            if (this.breastRows[index].breastRating > this.breastRows[counter].breastRating)
                index = counter;
        }
        return index;
    }
    biggestTitRow() {
        var counter = this.breastRows.length;
        var index = 0;
        while (counter > 0) {
            counter--;
            if (this.breastRows[index].breastRating < this.breastRows[counter].breastRating)
                index = counter;
        }
        return index;
    }
    averageBreastSize() {
        var counter = this.breastRows.length;
        var average = 0;
        while (counter > 0) {
            counter--;
            average += this.breastRows[counter].breastRating;
        }
        if (this.breastRows.length == 0)
            return 0;
        return average / this.breastRows.length;
    }
    averageCockThickness() {
        var counter = this.cocks.length;
        var average = 0;
        while (counter > 0) {
            counter--;
            average += this.cocks[counter].cockThickness;
        }
        if (this.cocks.length == 0)
            return 0;
        return average / this.cocks.length;
    }
    averageNippleLength() {
        var counter = this.breastRows.length;
        var average = 0;
        while (counter > 0) {
            counter--;
            average += this.breastRows[counter].breastRating / 10 + 0.2;
        }
        return average / this.breastRows.length;
    }
    averageVaginalLooseness() {
        var counter = this.vaginas.length;
        var average = 0;
        //If the player has no vaginas
        if (this.vaginas.length == 0)
            return 2;
        while (counter > 0) {
            counter--;
            average += this.vaginas[counter].vaginalLooseness;
        }
        return average / this.vaginas.length;
    }
    averageVaginalWetness() {
        //If the player has no vaginas
        if (this.vaginas.length == 0)
            return 2;
        var counter = this.vaginas.length;
        var average = 0;
        while (counter > 0) {
            counter--;
            average += this.vaginas[counter].vaginalWetness;
        }
        return average / this.vaginas.length;
    }
    averageCockLength() {
        var counter = this.cocks.length;
        var average = 0;
        while (counter > 0) {
            counter--;
            average += this.cocks[counter].cockLength;
        }
        if (this.cocks.length == 0)
            return 0;
        return average / this.cocks.length;
    }
    canTitFuck() {
        if (this.breastRows.length == 0)
            return false;
        var counter = this.breastRows.length;
        var index = 0;
        while (counter > 0) {
            counter--;
            if (this.breastRows[index].breasts < this.breastRows[counter].breasts && this.breastRows[counter].breastRating > 3)
                index = counter;
        }
        if (this.breastRows[index].breasts >= 2 && this.breastRows[index].breastRating > 3)
            return true;
        return false;
    }
    mostBreastsPerRow() {
        if (this.breastRows.length == 0)
            return 2;
        var counter = this.breastRows.length;
        var index = 0;
        while (counter > 0) {
            counter--;
            if (this.breastRows[index].breasts < this.breastRows[counter].breasts)
                index = counter;
        }
        return this.breastRows[index].breasts;
    }
    averageNipplesPerBreast() {
        var counter = this.breastRows.length;
        var breasts = 0;
        var nipples = 0;
        while (counter > 0) {
            counter--;
            breasts += this.breastRows[counter].breasts;
            nipples += this.breastRows[counter].nipplesPerBreast * this.breastRows[counter].breasts;
        }
        if (breasts == 0)
            return 0;
        return Math.floor(nipples / breasts);
    }
    allBreastsDescript() {
        return Appearance.allBreastsDescript(this);
    }
    //Simplified these cock descriptors and brought them into the creature class
    sMultiCockDesc() {
        return (this.cocks.length > 1 ? "one of your " : "your ") + this.cockMultiLDescriptionShort();
    }
    SMultiCockDesc() {
        return (this.cocks.length > 1 ? "One of your " : "Your ") + this.cockMultiLDescriptionShort();
    }
    oMultiCockDesc() {
        return (this.cocks.length > 1 ? "each of your " : "your ") + this.cockMultiLDescriptionShort();
    }
    OMultiCockDesc() {
        return (this.cocks.length > 1 ? "Each of your " : "Your ") + this.cockMultiLDescriptionShort();
    }
    cockMultiLDescriptionShort() {
        if (this.cocks.length < 1) {
            return "<b>ERROR: NO WANGS DETECTED for cockMultiLightDesc()</b>";
        }
        if (this.cocks.length == 1) {
            //For a songle cock return the default description
            return Appearance.cockDescript(this, 0);
        }
        switch (this.cocks[0].cockType //With multiple cocks only use the descriptions for specific cock types if all cocks are of a single type
        ) {
            case CockTypesEnum.ANEMONE:
            case CockTypesEnum.CAT:
            case CockTypesEnum.DEMON:
            case CockTypesEnum.DISPLACER:
            case CockTypesEnum.DRAGON:
            case CockTypesEnum.HORSE:
            case CockTypesEnum.KANGAROO:
            case CockTypesEnum.LIZARD:
            case CockTypesEnum.PIG:
            case CockTypesEnum.TENTACLE:
                if (this.countCocksOfType(this.cocks[0].cockType) == this.cocks.length)
                    return Appearance.cockNoun(this.cocks[0].cockType) + "s";
                break;
            case CockTypesEnum.DOG:
            case CockTypesEnum.FOX:
                if (this.countCocksOfType(CockTypesEnum.DOG) == this.cocks.length)
                    return Appearance.cockNoun(CockTypesEnum.DOG) + "s";
            default:
        }
        return Appearance.cockNoun(CockTypesEnum.HUMAN) + "s";
    }
    hasSheath() {
        if (this.cocks.length == 0)
            return false;
        for (var x = 0; x < this.cocks.length; x++) {
            switch (this.cocks[x].cockType) {
                case CockTypesEnum.CAT:
                case CockTypesEnum.DISPLACER:
                case CockTypesEnum.DOG:
                case CockTypesEnum.FOX:
                case CockTypesEnum.HORSE:
                case CockTypesEnum.KANGAROO:
                case CockTypesEnum.AVIAN:
                case CockTypesEnum.ECHIDNA:
                    return true; //If there's even one cock of any of these types then return true
                default:
            }
        }
        return false;
    }
    hasKnot(arg) {
        if (arg == undefined)
            arg = 0;
        if (arg > this.cockTotal() - 1 || arg < 0)
            return false;
        return this.cocks[arg].hasKnot();
    }
    //PLACEHOLDER
    dogCocks() {
        outputText("Placeholder for dogCocks in creature.js. Returning.");
        doNext(Camp.returnToCampUseOneHour);
    }
    cockHead(cockNum) {
        if (cockNum == undefined)
            cockNum = 0;
        if (cockNum < 0 || cockNum > this.cocks.length - 1) {
            outputText("Something went wrong in Creature.cockHead()!");
            return "";
        }
        switch (this.cocks[cockNum].cockType) {
            case CockTypesEnum.CAT:
                if (UTIL.rand(2) == 0)
                    return "point";
                return "narrow tip";
            case CockTypesEnum.DEMON:
                if (UTIL.rand(2) == 0)
                    return "tainted crown";
                return "nub-ringed tip";
            case CockTypesEnum.DISPLACER:
                switch (UTIL.rand(5)) {
                    case 0:
                        return "star tip";
                    case 1:
                        return "blooming cock-head";
                    case 2:
                        return "open crown";
                    case 3:
                        return "alien tip";
                    default:
                        return "bizarre head";
                }
            case CockTypesEnum.DOG:
            case CockTypesEnum.FOX:
                if (UTIL.rand(2) == 0)
                    return "pointed tip";
                return "narrow tip";
            case CockTypesEnum.HORSE:
                if (UTIL.rand(2) == 0)
                    return "flare";
                return "flat tip";
            case CockTypesEnum.KANGAROO:
                if (UTIL.rand(2) == 0)
                    return "tip";
                return "point";
            case CockTypesEnum.LIZARD:
                if (UTIL.rand(2) == 0)
                    return "crown";
                return "head";
            case CockTypesEnum.TENTACLE:
                if (UTIL.rand(2) == 0)
                    return "mushroom-like tip";
                return "wide plant-like crown";
            case CockTypesEnum.PIG:
                if (UTIL.rand(2) == 0)
                    return "corkscrew tip";
                return "corkscrew head";
            case CockTypesEnum.RHINO:
                if (UTIL.rand(2) == 0)
                    return "flared head";
                return "rhinoceros dickhead";
            case CockTypesEnum.ECHIDNA:
                if (UTIL.rand(2) == 0)
                    return "quad heads";
                return "echidna quad heads";
            default:
        }
        if (UTIL.rand(2) == 0)
            return "crown";
        if (UTIL.rand(2) == 0)
            return "head";
        return "cock-head";
    }
    //------------
    // ALTERATIONS
    //------------
    //Addition of parts
    createCock(clength, cthickness, ctype) {
        if (this.cocks.length >= 11)
            break createCock; //This one goes to eleven.
        //Defaulting parameters
        if (clength == undefined)
            clength = 5.5;
        if (cthickness == undefined)
            cthickness = 1;
        if (ctype == undefined)
            ctype = CockTypesEnum.HUMAN;
        //New cock
        var newCock = new Cock(clength, cthickness, ctype);
        this.cocks.push(newCock);
        this.genderCheck();
    }
    createVagina(virgin, vagwetness, vaglooseness) {
        if (this.vaginas.length >= 3)
            break createVagina; //Limit of 3 vaginas
        //Defaulting parameters
        if (virgin == undefined)
            virgin = true;
        if (vagwetness == undefined)
            vagwetness = 1;
        if (vaglooseness == undefined)
            vaglooseness = 0;
        //New vagina
        var newVagina = new Vagina(vagwetness, vaglooseness, virgin, 0);
        this.vaginas.push(newVagina);
        this.genderCheck();
    }
    createBreastRow(size, nipplesPerBreast) {
        if (this.breastRows.length >= 10)
            return; //Limit of 10 breast rows
        //Defaulting parameters
        if (size == undefined)
            size = 0;
        if (nipplesPerBreast == undefined)
            nipplesPerBreast = 1;
        //New breast row
        var newBreastRow = new BreastRow(size, nipplesPerBreast);
        this.breastRows.push(newBreastRow);
        this.genderCheck();
    }
    //Removal of parts
    removeCock(arraySpot, totalRemoved) {
        //Defaulting
        if (arraySpot == undefined)
            arraySpot = 0;
        if (totalRemoved == undefined)
            totalRemoved = 1;
        //Various Errors preventing action
        if (arraySpot < 0 || totalRemoved <= 0) {
            //trace("ERROR: removeCock called but arraySpot is negative or totalRemoved is 0.");
            return;
        }
        if (this.cocks.length == 0) {
            //trace("ERROR: removeCock called but cocks do not exist.");
        }
        else {
            if (arraySpot > this.cocks.length - 1) {
                //trace("ERROR: removeCock failed - array location is beyond the bounds of the array.");
            }
            else {
                try {
                    var cock = this.cocks[arraySpot];
                    if (cock.sock == "viridian") {
                        this.removePerk(PerkLib.LustyRegeneration);
                    }
                    else if (cock.sock == "cockring") {
                        var numRings = 0;
                        for (var i = 0; i < this.cocks.length; i++) {
                            if (this.cocks[i].sock == "cockring")
                                numRings++;
                        }
                        if (numRings == 0)
                            this.removePerk(PerkLib.PentUp);
                        else
                            this.setPerkValue(PerkLib.PentUp, 1, 5 + numRings * 5);
                    }
                    this.cocks.splice(arraySpot, totalRemoved);
                }
                catch (e) {
                    console.error(e); //trace("Argument error in Creature[" + this._short + "]: " + e.message);
                }
                //trace("Attempted to remove " + totalRemoved + " cocks.");
            }
        }
        this.genderCheck();
    }
    removeVagina(arraySpot, totalRemoved) {
        //Defaulting
        if (arraySpot == undefined)
            arraySpot = 0;
        if (totalRemoved == undefined)
            totalRemoved = 1;
        //Various Errors preventing action
        if (arraySpot < -1 || totalRemoved <= 0) {
            //trace("ERROR: removeVagina called but arraySpot is negative or totalRemoved is 0.");
            return;
        }
        if (this.vaginas.length == 0) {
            //trace("ERROR: removeVagina called but cocks do not exist.");
        }
        else {
            if (arraySpot > this.vaginas.length - 1) {
                //trace("ERROR: removeVagina failed - array location is beyond the bounds of the array.");
            }
            else {
                this.vaginas.splice(arraySpot, totalRemoved);
                //trace("Attempted to remove " + totalRemoved + " vaginas.");
            }
        }
        this.genderCheck();
    }
    removeBreastRow(arraySpot, totalRemoved) {
        //Defaulting
        if (arraySpot == undefined)
            arraySpot = 0;
        if (totalRemoved == undefined)
            totalRemoved = 1;
        //Various Errors preventing action
        if (arraySpot < -1 || totalRemoved <= 0) {
            //trace("ERROR: removeBreastRow called but arraySpot is negative or totalRemoved is 0.");
            return;
        }
        if (this.breastRows.length == 0) {
            //trace("ERROR: removeBreastRow called but cocks do not exist.");
        }
        else if (this.breastRows.length == 1 || this.breastRows.length - totalRemoved < 1) {
            //trace("ERROR: Removing the current breast row would break the Creature classes assumptions about breastRow contents.");
        }
        else {
            if (arraySpot > this.breastRows.length - 1) {
                //trace("ERROR: removeBreastRow failed - array location is beyond the bounds of the array.");
            }
            else {
                this.breastRows.splice(arraySpot, totalRemoved);
                //trace("Attempted to remove " + totalRemoved + " breastRows.");
            }
        }
    }
    shrinkTits(ignore_hyper_happy) {
        if (hyperHappy && !ignore_hyper_happy)
            return;
        if (this.breastRows.length == 1) {
            if (this.breastRows[0].breastRating > 0) {
                //Shrink if bigger than N/A cups
                var temp = 1;
                this.breastRows[0].breastRating--;
                //Shrink again 50% chance
                if (this.breastRows[0].breastRating >= 1 && UTIL.rand(2) == 0 && this.findPerk(PerkLib.BigTits) < 0) {
                    temp++;
                    this.breastRows[0].breastRating--;
                }
                if (this.breastRows[0].breastRating < 0)
                    this.breastRows[0].breastRating = 0;
                //Talk about shrinkage
                if (temp == 1)
                    outputText("<br><br>You feel a weight lifted from you, and realize your breasts have shrunk!  With a quick measure, you determine they're now " + this.breastCup(0) + "s.");
                if (temp == 2)
                    outputText("<br><br>You feel significantly lighter.  Looking down, you realize your breasts are much smaller!  With a quick measure, you determine they're now " + this.breastCup(0) + "s.");
            }
        }
        else if (this.breastRows.length > 1) {
            //multiple
            outputText("<br>");
            //temp2 = amount changed
            //temp3 = counter
            var temp2 = 0;
            var temp3 = breastRows.length;
            while (temp3 > 0) {
                temp3--;
                if (breastRows[temp3].breastRating > 0) {
                    breastRows[temp3].breastRating--;
                    if (breastRows[temp3].breastRating < 0)
                        breastRows[temp3].breastRating = 0;
                    temp2++;
                    outputText("<br>");
                    if (temp3 < breastRows.length - 1)
                        outputText("...and y");
                    else
                        outputText("Y");
                    outputText("our " + liveData.player.breastDescript(temp3) + " shrink, dropping to " + this.breastCup(temp3) + "s.");
                }
                if (breastRows[temp3].breastRating < 0)
                    breastRows[temp3].breastRating = 0;
            }
            if (temp2 == 2)
                outputText("<br>You feel so much lighter after the change.");
            if (temp2 == 3)
                outputText("<br>Without the extra weight you feel particularly limber.");
            if (temp2 >= 4)
                outputText("<br>It feels as if the weight of the world has been lifted from your shoulders, or in this case, your chest.");
        }
    }
    growTits(amount, rowsGrown, display, growthType) {
        if (this.breastRows.length == 0)
            return;
        //GrowthType 1 = smallest grows
        //GrowthType 2 = Top Row working downward
        //GrowthType 3 = Only top row
        var temp2 = 0;
        var temp3 = 0;
        //Chance for "big tits" perked characters to grow larger!
        if (this.findPerk(PerkLib.BigTits) >= 0 && UTIL.rand(3) == 0 && amount < 1)
            amount = 1;
        // Needs to be a number, since uint will round down to 0 prevent growth beyond a certain point
        var temp = this.breastRows.length;
        if (growthType == 1) {
            //Select smallest breast, grow it, move on
            while (rowsGrown > 0) {
                //Temp = counter
                temp = this.breastRows.length;
                //Temp2 = smallest tits index
                temp2 = 0;
                //Find smallest row
                while (temp > 0) {
                    temp--;
                    if (this.breastRows[temp].breastRating < breastRows[temp2].breastRating)
                        temp2 = temp;
                }
                //Temp 3 tracks total amount grown
                temp3 += amount;
                //Reuse temp to store growth amount for diminishing returns.
                temp = amount;
                if (!hyperHappy) {
                    //Diminishing returns!
                    if (this.breastRows[temp2].breastRating > 3) {
                        if (this.findPerk(PerkLib.BigTits) < 0)
                            temp /= 1.5;
                        else
                            temp /= 1.3;
                    }
                    // WHy are there three options here. They all have the same result.
                    if (this.breastRows[temp2].breastRating > 7) {
                        if (this.findPerk(PerkLib.BigTits) < 0)
                            temp /= 2;
                        else
                            temp /= 1.5;
                    }
                    if (this.breastRows[temp2].breastRating > 9) {
                        if (this.findPerk(PerkLib.BigTits) < 0)
                            temp /= 2;
                        else
                            temp /= 1.5;
                    }
                    if (this.breastRows[temp2].breastRating > 12) {
                        if (this.findPerk(PerkLib.BigTits) < 0)
                            temp /= 2;
                        else
                            temp /= 1.5;
                    }
                }
                //Grow!
                this.breastRows[temp2].breastRating += temp;
                rowsGrown--;
            }
        }
        if (!hyperHappy) {
            //Diminishing returns!
            if (this.breastRows[0].breastRating > 3) {
                if (this.findPerk(PerkLib.BigTits) < 0)
                    amount /= 1.5;
                else
                    amount /= 1.3;
            }
            if (this.breastRows[0].breastRating > 7) {
                if (this.findPerk(PerkLib.BigTits) < 0)
                    amount /= 2;
                else
                    amount /= 1.5;
            }
            if (this.breastRows[0].breastRating > 12) {
                if (this.findPerk(PerkLib.BigTits) < 0)
                    amount /= 2;
                else
                    amount /= 1.5;
            }
        }
        if (growthType == 2) {
            temp = 0;
            //Start at top and keep growing down, back to top if hit bottom before done.
            while (rowsGrown > 0) {
                if (temp + 1 > this.breastRows.length)
                    temp = 0;
                this.breastRows[temp].breastRating += amount;
                temp++;
                temp3 += amount;
                rowsGrown--;
            }
        }
        if (growthType == 3) {
            while (rowsGrown > 0) {
                rowsGrown--;
                this.breastRows[0].breastRating += amount;
                temp3 += amount;
            }
        }
        //Breast Growth Finished...talk about changes.
        if (display) {
            if (growthType < 3) {
                if (amount <= 2) {
                    if (this.breastRows.length > 1)
                        outputText("Your rows of " + this.breastDescript(0) + " jiggle with added weight, growing a bit larger.");
                    if (this.breastRows.length == 1)
                        outputText("Your " + this.breastDescript(0) + " jiggle with added weight as they expand, growing a bit larger.");
                }
                else if (amount <= 4) {
                    if (this.breastRows.length > 1)
                        outputText("You stagger as your chest gets much heavier.  Looking down, you watch with curiosity as your rows of " + this.breastDescript(0) + " expand significantly.");
                    if (this.breastRows.length == 1)
                        outputText("You stagger as your chest gets much heavier.  Looking down, you watch with curiosity as your " + this.breastDescript(0) + " expand significantly.");
                }
                else {
                    if (this.breastRows.length > 1)
                        outputText("You drop to your knees from a massive change in your body's center of gravity.  Your " + this.breastDescript(0) + " tingle strongly, growing disturbingly large.");
                    if (this.breastRows.length == 1)
                        outputText("You drop to your knees from a massive change in your center of gravity.  The tingling in your " + this.breastDescript(0) + " intensifies as they continue to grow at an obscene rate.");
                }
                if (this.biggestTitSize() >= 8.5 && this.breastRows[0].nippleLength < 2) {
                    outputText("  A tender ache starts at your " + this.nippleDescript(0) + "s as they grow to match your burgeoning breast-flesh.");
                    this.breastRows[0].nippleLength = 2;
                }
                if (this.biggestTitSize() >= 7 && this.breastRows[0].nippleLength < 1) {
                    outputText("  A tender ache starts at your " + this.nippleDescript(0) + "s as they grow to match your burgeoning breast-flesh.");
                    this.breastRows[0].nippleLength = 1;
                }
                if (this.biggestTitSize() >= 5 && this.breastRows[0].nippleLength < 0.75) {
                    outputText("  A tender ache starts at your " + this.nippleDescript(0) + "s as they grow to match your burgeoning breast-flesh.");
                    this.breastRows[0].nippleLength = 0.75;
                }
                if (this.biggestTitSize() >= 3 && this.breastRows[0].nippleLength < 0.5) {
                    outputText("  A tender ache starts at your " + this.nippleDescript(0) + "s as they grow to match your burgeoning breast-flesh.");
                    this.breastRows[0].nippleLength = 0.5;
                }
            }
            else {
                if (amount <= 2) {
                    if (this.breastRows.length > 1)
                        outputText("Your top row of " + this.breastDescript(0) + " jiggles with added weight as it expands, growing a bit larger.");
                    if (this.breastRows.length == 1)
                        outputText("Your row of " + this.breastDescript(0) + " jiggles with added weight as it expands, growing a bit larger.");
                }
                if (amount > 2 && amount <= 4) {
                    if (this.breastRows.length > 1)
                        outputText("You stagger as your chest gets much heavier.  Looking down, you watch with curiosity as your top row of " + this.breastDescript(0) + " expand significantly.");
                    if (this.breastRows.length == 1)
                        outputText("You stagger as your chest gets much heavier.  Looking down, you watch with curiosity as your " + this.breastDescript(0) + " expand significantly.");
                }
                if (amount > 4) {
                    if (this.breastRows.length > 1)
                        outputText("You drop to your knees from a massive change in your body's center of gravity.  Your top row of " + this.breastDescript(0) + " tingle strongly, growing disturbingly large.");
                    if (this.breastRows.length == 1)
                        outputText("You drop to your knees from a massive change in your center of gravity.  The tinglng in your " + this.breastDescript(0) + " intensifies as they continue to grow at an obscene rate.");
                }
                if (this.biggestTitSize() >= 8.5 && this.breastRows[0].nippleLength < 2) {
                    outputText("  A tender ache starts at your " + this.nippleDescript(0) + "s as they grow to match your burgeoning breast-flesh.");
                    this.breastRows[0].nippleLength = 2;
                }
                if (this.biggestTitSize() >= 7 && this.breastRows[0].nippleLength < 1) {
                    outputText("  A tender ache starts at your " + this.nippleDescript(0) + "s as they grow to match your burgeoning breast-flesh.");
                    this.breastRows[0].nippleLength = 1;
                }
                if (this.biggestTitSize() >= 5 && this.breastRows[0].nippleLength < 0.75) {
                    outputText("  A tender ache starts at your " + this.nippleDescript(0) + "s as they grow to match your burgeoning breast-flesh.");
                    this.breastRows[0].nippleLength = 0.75;
                }
                if (this.biggestTitSize() >= 3 && this.breastRows[0].nippleLength < 0.5) {
                    outputText("  A tender ache starts at your " + this.nippleDescript(0) + "s as they grow to match your burgeoning breast-flesh.");
                    this.breastRows[0].nippleLength = 0.5;
                }
            }
        }
    }
    genderCheck() {
        if (this.cocks.length > 0) {
            //Got dicks? Either male or herm.
            if (this.vaginas.length > 0)
                this.gender = 3;
            else
                this.gender = 1;
        }
        else if (this.vaginas.length > 0)
            //No dicks but have a vagina? Female.
            this.gender = 2;
        //Got neither? Genderless.
        else
            this.gender = 0;
    }
    changeCockType(type) {
        var counter = this.cocks.length;
        while (counter > 0) {
            counter--;
            if (this.cocks[counter].cockType != type) {
                this.cocks[counter].cockType = type;
                return counter;
            }
        }
        return -1;
    }
    //Vaginal Stretching
    cuntChange(cArea, display, spacingsF, spacingsB) {
        //Default parameters
        if (spacingsF == undefined)
            spacingsF = true;
        if (spacingsB == undefined)
            spacingsB = true;
        //Main function
        if (this.vaginas.length == 0)
            return false;
        var wasVirgin = this.vaginas[0].virgin;
        var stretched = this.cuntChangeNoDisplay(cArea);
        var devirgined = wasVirgin && !this.vaginas[0].virgin;
        if (devirgined) {
            if (spacingsF)
                outputText("  ");
            outputText("<b>Your hymen is torn, robbing you of your virginity.</b>", false);
            if (spacingsB)
                outputText("  ");
        }
        //STRETCH SUCCESSFUL - begin flavor text if outputting it!
        if (stretched && display) {
            //Virgins get different formatting
            if (devirgined) {
                //If no spaces after virgin loss
                if (!spacingsB)
                    outputText("  ");
            }
            //Non virgins as usual
            else if (spacingsF)
                outputText("  ");
            this.cuntChangeDisplay();
            if (spacingsB)
                outputText("  ");
        }
        return stretched;
    }
    cuntChangeNoDisplay(cArea) {
        if (this.vaginas.length == 0)
            return false;
        var stretched = false;
        if (this.findPerk(PerkLib.FerasBoonMilkingTwat) < 0 || vaginas[0].vaginalLooseness <= VAGINA_LOOSENESS_NORMAL) {
            //cArea > capacity = autostreeeeetch.
            if (cArea >= this.vaginalCapacity()) {
                if (this.vaginas[0].vaginalLooseness >= VAGINA_LOOSENESS_CLOWN_CAR) {
                }
                else
                    this.vaginas[0].vaginalLooseness++;
                stretched = true;
            }
            //If within top 10% of capacity, 50% stretch
            else if (cArea >= 0.9 * this.vaginalCapacity() && UTIL.rand(2) == 0) {
                this.vaginas[0].vaginalLooseness++;
                stretched = true;
            }
            //if within 75th to 90th percentile, 25% stretch
            else if (cArea >= 0.75 * this.vaginalCapacity() && UTIL.rand(4) == 0) {
                this.vaginas[0].vaginalLooseness++;
                stretched = true;
            }
        }
        //If virgin
        if (this.vaginas[0].virgin) {
            this.vaginas[0].virgin = false;
        }
        //Delay anti-stretching
        if (cArea >= 0.5 * this.vaginalCapacity()) {
            //Cunt Stretched used to determine how long since last enlargement
            if (this.findStatusEffect(StatusEffects.CuntStretched) < 0)
                this.createStatusEffect(StatusEffects.CuntStretched, 0, 0, 0, 0);
            //Reset the timer on it to 0 when restretched.
            else
                this.changeStatusValue(StatusEffects.CuntStretched, 1, 0);
        }
        return stretched;
    }
    cuntChangeDisplay() {
        if (this.vaginas[0].vaginalLooseness == VAGINA_LOOSENESS_CLOWN_CAR)
            outputText("<b>Your " + Appearance.vaginaDescript(this, 0) + " is stretched painfully wide, large enough to accomodate most beasts and demons.</b>");
        if (this.vaginas[0].vaginalLooseness == VAGINA_LOOSENESS_GAPING_WIDE)
            outputText("<b>Your " + Appearance.vaginaDescript(this, 0) + " is stretched so wide that it gapes continually.</b>");
        if (this.vaginas[0].vaginalLooseness == VAGINA_LOOSENESS_GAPING)
            outputText("<b>Your " + Appearance.vaginaDescript(this, 0) + " painfully stretches, the lips now wide enough to gape slightly.</b>");
        if (this.vaginas[0].vaginalLooseness == VAGINA_LOOSENESS_LOOSE)
            outputText("<b>Your " + Appearance.vaginaDescript(this, 0) + " is now very loose.</b>", false);
        if (this.vaginas[0].vaginalLooseness == VAGINA_LOOSENESS_NORMAL)
            outputText("<b>Your " + Appearance.vaginaDescript(this, 0) + " is now a little loose.</b>", false);
        if (this.vaginas[0].vaginalLooseness == VAGINA_LOOSENESS_TIGHT)
            outputText("<b>Your " + Appearance.vaginaDescript(this, 0) + " is stretched out to a more normal size.</b>");
    }
    //Anal Stretching
    buttChange(cArea, display, spacingsF, spacingsB) {
        //Default parameters
        if (spacingsF == undefined)
            spacingsF = true;
        if (spacingsB == undefined)
            spacingsB = true;
        //Main function
        var stretched = this.buttChangeNoDisplay(cArea);
        //STRETCH SUCCESSFUL - begin flavor text if outputting it!
        if (stretched && display) {
            if (spacingsF)
                outputText(" ");
            this.buttChangeDisplay();
            if (spacingsB)
                outputText(" ");
        }
        return stretched;
    }
    buttChangeNoDisplay(cArea) {
        var stretched = false;
        //cArea > capacity = autostreeeeetch half the time.
        if (cArea >= this.analCapacity() && UTIL.rand(2) == 0) {
            if (this.ass.analLooseness >= 5) {
            }
            else
                this.ass.analLooseness++;
            stretched = true;
            //Reset butt stretchin recovery time
            if (this.findStatusEffect(StatusEffects.ButtStretched) >= 0)
                this.changeStatusValue(StatusEffects.ButtStretched, 1, 0);
        }
        //If within top 10% of capacity, 25% stretch
        if (cArea < this.analCapacity() && cArea >= 0.9 * this.analCapacity() && UTIL.rand(4) == 0) {
            this.ass.analLooseness++;
            stretched = true;
        }
        //if within 75th to 90th percentile, 10% stretch
        if (cArea < 0.9 * this.analCapacity() && cArea >= 0.75 * this.analCapacity() && UTIL.rand(10) == 0) {
            this.ass.analLooseness++;
            stretched = true;
        }
        //Anti-virgin
        if (this.ass.analLooseness == 0) {
            this.ass.analLooseness++;
            stretched = true;
        }
        //Delay un-stretching
        if (cArea >= 0.5 * this.analCapacity()) {
            //Butt Stretched used to determine how long since last enlargement
            if (this.findStatusEffect(StatusEffects.ButtStretched) < 0)
                this.createStatusEffect(StatusEffects.ButtStretched, 0, 0, 0, 0);
            //Reset the timer on it to 0 when restretched.
            else
                this.changeStatusValue(StatusEffects.ButtStretched, 1, 0);
        }
        return stretched;
    }
    buttChangeDisplay() {
        //Allows the test for stretching and the text output to be separated
        if (this.ass.analLooseness == 5)
            outputText("<b>Your " + Appearance.assholeDescript(this) + " is stretched even wider, capable of taking even the largest of demons and beasts.</b>");
        if (this.ass.analLooseness == 4)
            outputText("<b>Your " + Appearance.assholeDescript(this) + " becomes so stretched that it gapes continually.</b>", false);
        if (this.ass.analLooseness == 3)
            outputText("<b>Your " + Appearance.assholeDescript(this) + " is now very loose.</b>");
        if (this.ass.analLooseness == 2)
            outputText("<b>Your " + Appearance.assholeDescript(this) + " is now a little loose.</b>");
        if (this.ass.analLooseness == 1)
            outputText("<b>You have lost your anal virginity.</b>");
    }
    //------------
    // GENDER UTIL
    //------------
    genderText(male, female, futa, eunuch) {
        //Defaulting
        if (male == undefined)
            male = "man";
        if (female == undefined)
            female = "woman";
        if (futa == undefined)
            futa = "herm";
        if (eunuch == undefined)
            eunuch = "eunuch";
        //Main function
        if (this.vaginas.length > 0) {
            if (this.cocks.length > 0)
                return futa;
            return female;
        }
        else if (this.cocks.length > 0) {
            return male;
        }
        return eunuch;
    }
    manWoman(caps) {
        //Dicks?
        if (this.totalCocks() > 0) {
            if (this.hasVagina()) {
                if (caps)
                    return "Futa";
                else
                    return "futa";
            }
            else {
                if (caps)
                    return "Man";
                else
                    return "man";
            }
        }
        else {
            if (this.hasVagina()) {
                if (caps)
                    return "Woman";
                else
                    return "woman";
            }
            else {
                if (caps)
                    return "Eunuch";
                else
                    return "eunuch";
            }
        }
    }
    mfn(male, female, neuter) {
        if (this.gender == 0)
            return neuter;
        else
            return this.mf(male, female);
    }
    //Rewritten!
    mf(male, female) {
        //if (femWeight()) return female;
        //else return male;
        //Dicks?
        if (this.totalCocks() > 0) {
            if (this.hasVagina()) {
                if (this.biggestTitSize() >= 2)
                    return female;
                else if (this.biggestTitSize() == 1) {
                    if (this.femininity > 50)
                        return female;
                    else
                        return male;
                }
                else
                    return male;
            }
            else
                return male;
        }
        else {
            if (this.hasVagina())
                if (this.biggestTitSize() == 0 && this.femininity < 45)
                    return male;
                else
                    return female;
            else {
                if (this.biggestTitSize() >= 3)
                    return female;
                else
                    return male;
            }
        }
    }
    maleFemaleHerm(caps) {
        if (this.gender == 0) {
            if (caps)
                return this.mf("Genderless", "Fem-genderless");
            else
                return this.mf("genderless", "fem-genderless");
        }
        else if (this.gender == 1) {
            if (caps)
                return this.mf("Male", "Dickgirl");
            else
                return this.mf("male", "dickgirl");
        }
        else if (this.gender == 2) {
            if (caps)
                return this.mf("Cuntboy", "Female");
            else
                return this.mf("cuntboy", "female");
        }
        else if (this.gender == 3) {
            if (caps)
                return this.mf("Maleherm", "Hermaphrodite");
            else
                return this.mf("maleherm", "hermaphrodite");
        }
        else
            return "<b>Gender error!</b>";
    }
    //------------
    // BODY UTIL
    //------------
    //Lower body
    isBiped() {
        return this.legCount == 2;
    }
    isNaga() {
        return this.lowerBody == LOWER_BODY_TYPE_NAGA;
    }
    isTaur() {
        return this.legCount > 2 && !this.isDrider(); // driders have genitals on their human part, inlike usual taurs... this is actually bad way to check, but too many places to fix just now
    }
    isDrider() {
        return this.lowerBody == LOWER_BODY_TYPE_DRIDER_LOWER_BODY;
    }
    isGoo() {
        return this.lowerBody == LOWER_BODY_TYPE_GOO;
    }
    legs() {
        if (this.isDrider())
            return num2Text(this.legCount) + " spider legs";
        if (this.isTaur()) {
            if (this.lowerBody == LOWER_BODY_TYPE_PONY && UTIL.rand(3) == 0)
                return "cute pony-legs";
            return num2Text(this.legCount) + " legs";
        }
        if (this.isNaga())
            return "snake-like coils";
        if (this.isGoo())
            return "mounds of goo";
        if (this.isBiped()) {
            //Biped, has several variants.
            //Bunny legs
            if (this.lowerBody == LOWER_BODY_TYPE_BUNNY) {
                switch (UTIL.rand(5)) {
                    case 0:
                        return "fuzzy, bunny legs";
                    case 1:
                        return "fur-covered legs";
                    case 2:
                        return "furry legs";
                    default:
                        return "legs";
                }
            }
            //Avian legs
            if (this.lowerBody == LOWER_BODY_TYPE_HARPY) {
                switch (UTIL.rand(4)) {
                    case 0:
                        return "bird-like legs";
                    case 1:
                        return "feathered legs";
                    default:
                        return "legs";
                }
            }
            //Fox legs
            if (this.lowerBody == LOWER_BODY_TYPE_FOX) {
                switch (UTIL.rand(4)) {
                    case 0:
                        return "fox-like legs";
                    case 1:
                        return "vulpine legs";
                    default:
                        return "legs";
                }
            }
            //Raccoon legs
            if (this.lowerBody == LOWER_BODY_TYPE_RACCOON) {
                switch (UTIL.rand(4)) {
                    case 0:
                        return "raccoon-like legs";
                    default:
                        return "legs";
                }
            }
            //Cloven hooved
            if (this.lowerBody == LOWER_BODY_TYPE_CLOVEN_HOOFED) {
                switch (UTIL.rand(4)) {
                    case 0:
                        return "pig-like legs";
                    case 1:
                        return "swine legs";
                    default:
                        return "legs";
                }
            }
            return "legs"; //Default description for all other bipedal lower body types.
        }
        return "legs"; //Fallback for other body types.
    }
    leg() {
        if (this.isDrider())
            return num2Text(this.legCount) + " spider legs";
        if (this.isTaur()) {
            if (this.lowerBody == LOWER_BODY_TYPE_PONY && UTIL.rand(3) == 0)
                return "cute pony-leg";
            return "leg";
        }
        if (this.isNaga())
            return "snake-tail";
        if (this.isGoo())
            return "mound of goo";
        if (this.isBiped()) {
            //Biped, has several variants.
            //Bunny legs
            if (this.lowerBody == LOWER_BODY_TYPE_BUNNY) {
                switch (UTIL.rand(5)) {
                    case 0:
                        return "fuzzy, bunny leg";
                    case 1:
                        return "fur-covered leg";
                    case 2:
                        return "furry leg";
                    default:
                        return "leg";
                }
            }
            //Avian legs
            if (this.lowerBody == LOWER_BODY_TYPE_HARPY) {
                switch (UTIL.rand(4)) {
                    case 0:
                        return "bird-like leg";
                    case 1:
                        return "feathered leg";
                    default:
                        return "leg";
                }
            }
            //Fox legs
            if (this.lowerBody == LOWER_BODY_TYPE_FOX) {
                switch (UTIL.rand(4)) {
                    case 0:
                        return "fox-like leg";
                    case 1:
                        return "vulpine leg";
                    default:
                        return "leg";
                }
            }
            //Raccoon legs
            if (this.lowerBody == LOWER_BODY_TYPE_RACCOON) {
                switch (UTIL.rand(4)) {
                    case 0:
                        return "raccoon-like leg";
                    default:
                        return "leg";
                }
            }
            //Cloven hooved
            if (this.lowerBody == LOWER_BODY_TYPE_CLOVEN_HOOFED) {
                switch (UTIL.rand(4)) {
                    case 0:
                        return "pig-like leg";
                    case 1:
                        return "swine leg";
                    default:
                        return "leg";
                }
            }
            return "leg"; //Default description for all other bipedal lower body types.
        }
        return "leg"; //Fallback for other body types.
    }
    feet() {
        if (this.isDrider())
            return "spider feet";
        if (this.isTaur()) {
            if (this.lowerBody == LOWER_BODY_TYPE_PONY && UTIL.rand(3) == 0)
                return "flat pony-feet";
            return "hooves";
        }
        if (this.isNaga())
            return "coils";
        if (this.isGoo())
            return "slimey cillia";
        if (this.isBiped()) {
            if (this.lowerBody == LOWER_BODY_TYPE_HUMAN)
                return "feet";
            if (this.lowerBody == LOWER_BODY_TYPE_HOOFED)
                return "hooves";
            if (this.lowerBody == LOWER_BODY_TYPE_CLOVEN_HOOFED)
                return "cloven hooves";
            if (this.lowerBody == LOWER_BODY_TYPE_DOG || this.lowerBody == LOWER_BODY_TYPE_CAT || this.lowerBody == LOWER_BODY_TYPE_FOX || this.lowerBody == LOWER_BODY_TYPE_RACCOON) {
                if (this.lowerBody == LOWER_BODY_TYPE_FOX && UTIL.rand(3) > 0) {
                    if (UTIL.rand(2) == 0)
                        return "fox-like feet";
                    else
                        return "soft, padded paws";
                }
                if (this.lowerBody == LOWER_BODY_TYPE_RACCOON && UTIL.rand(3) > 0) {
                    if (UTIL.rand(2) == 0)
                        return "raccoon-like feet";
                    else
                        return "long-toed paws";
                }
                return "paws";
            }
            if (this.lowerBody == LOWER_BODY_TYPE_DEMONIC_HIGH_HEELS)
                return "demonic high-heels";
            if (this.lowerBody == LOWER_BODY_TYPE_DEMONIC_CLAWS)
                return "demonic foot-claws";
            if (this.lowerBody == LOWER_BODY_TYPE_BUNNY) {
                switch (UTIL.rand(5)) {
                    case 0:
                        return "large bunny feet";
                    case 1:
                        return "rabbit feet";
                    case 2:
                        return "large feet";
                    default:
                        return "feet";
                }
            }
            if (this.lowerBody == LOWER_BODY_TYPE_HARPY) {
                switch (UTIL.rand(3)) {
                    case 0:
                        return "taloned feet";
                    default:
                        return "feet";
                }
            }
            if (this.lowerBody == LOWER_BODY_TYPE_KANGAROO)
                return "foot-paws";
        }
        return "feet";
    }
    foot() {
        if (this.isDrider())
            return "spider feet";
        if (this.isTaur()) {
            if (this.lowerBody == LOWER_BODY_TYPE_PONY && UTIL.rand(3) == 0)
                return "flat pony-foot";
            return "hoof";
        }
        if (this.isNaga())
            return "coiled tail";
        if (this.isGoo())
            return "slimey undercarriage";
        if (this.isBiped()) {
            if (this.lowerBody == LOWER_BODY_TYPE_HUMAN)
                return "foot";
            if (this.lowerBody == LOWER_BODY_TYPE_HOOFED)
                return "hoof";
            if (this.lowerBody == LOWER_BODY_TYPE_CLOVEN_HOOFED)
                return "cloven hoof";
            if (this.lowerBody == LOWER_BODY_TYPE_DOG || this.lowerBody == LOWER_BODY_TYPE_CAT || this.lowerBody == LOWER_BODY_TYPE_FOX || this.lowerBody == LOWER_BODY_TYPE_RACCOON) {
                if (this.lowerBody == LOWER_BODY_TYPE_FOX && UTIL.rand(3) > 0) {
                    if (UTIL.rand(2) == 0)
                        return "fox-like foot";
                    else
                        return "soft, padded paw";
                }
                if (this.lowerBody == LOWER_BODY_TYPE_RACCOON && UTIL.rand(3) > 0) {
                    if (UTIL.rand(2) == 0)
                        return "raccoon-like foot";
                    else
                        return "long-toed paw";
                }
                return "paw";
            }
            if (this.lowerBody == LOWER_BODY_TYPE_BUNNY) {
                switch (UTIL.rand(5)) {
                    case 0:
                        return "large bunny foot";
                    case 1:
                        return "rabbit foot";
                    case 2:
                        return "large foot";
                    default:
                        return "foot";
                }
            }
            if (this.lowerBody == LOWER_BODY_TYPE_HARPY) {
                switch (UTIL.rand(3)) {
                    case 0:
                        return "taloned foot";
                    default:
                        return "foot";
                }
            }
        }
        return "foot";
    }
    skinFurScales() {
        var skinzilla = "";
        //Adjectives first!
        if (this.skinAdj != "")
            skinzilla += this.skinAdj + ", ";
        //Fur handled a little differently since it uses
        //haircolor
        if (this.skinType == 1)
            skinzilla += this.furColor + " ";
        else
            skinzilla += this.skinTone + " ";
        skinzilla += this.skinDesc;
        return skinzilla;
    }
    faceDesc() {
        var faceo = "";
        //0-10
        if (this.femininity < 10) {
            faceo = "a square chin";
            if (!this.hasBeard())
                faceo += " and chiseled jawline";
            else
                faceo += ", chiseled jawline, and " + this.beard();
        }
        //10+ -20
        else if (this.femininity < 20) {
            faceo = "a rugged looking " + this.face() + " ";
            if (this.hasBeard())
                faceo += "and " + this.beard();
            faceo += "that's surely handsome";
        }
        //21-28
        else if (this.femininity < 28)
            faceo = "a well-defined jawline and a fairly masculine profile";
        //28+-35
        else if (this.femininity < 35)
            faceo = "a somewhat masculine, angular jawline";
        //35-45
        else if (this.femininity < 45)
            faceo = "the barest hint of masculinity on its features";
        //45-55
        else if (this.femininity <= 55)
            faceo = "an androgynous set of features that would look normal on a male or female";
        //55+-65
        else if (this.femininity <= 65)
            faceo = "a tiny touch of femininity to it, with gentle curves";
        //65+-72
        else if (this.femininity <= 72)
            faceo = "a nice set of cheekbones and lips that have the barest hint of pout";
        //72+-80
        else if (this.femininity <= 80)
            faceo = "a beautiful, feminine shapeliness that's sure to draw the attention of males";
        //81-90
        else if (this.femininity <= 90)
            faceo = "a gorgeous profile with full lips, a button nose, and noticeable eyelashes";
        //91-100
        else
            faceo = "a jaw-droppingly feminine shape with full, pouting lips, an adorable nose, and long, beautiful eyelashes";
        return faceo;
    }
    //Modify femininity!
    modFem(goal, strength) {
        //Default parameters
        if (strength == undefined)
            strength = 1;
        //Main function
        var output = "";
        var old = this.faceDesc();
        var oldN = this.femininity;
        var Changed = false;
        //If already perfect!
        if (goal == this.femininity)
            return "";
        //If turning MANLYMAN
        if (goal < this.femininity && goal <= 50) {
            this.femininity -= strength;
            //YOUVE GONE TOO FAR! TURN BACK!
            if (this.femininity < goal)
                this.femininity = goal;
            Changed = true;
        }
        //if turning GIRLGIRLY, like duh!
        if (goal > this.femininity && goal >= 50) {
            this.femininity += strength;
            //YOUVE GONE TOO FAR! TURN BACK!
            if (this.femininity > goal)
                this.femininity = goal;
            Changed = true;
        }
        //Fix if it went out of bounds!
        if (this.findPerk(PerkLib.Androgyny) < 0)
            this.fixFemininity();
        //Abort if nothing changed!
        if (!Changed)
            return "";
        //See if a change happened!
        if (old != this.faceDesc()) {
            //Gain fem?
            if (goal > oldN)
                output = "<br><br><b>Your facial features soften as your body becomes more feminine. (+" + strength + ")</b>";
            if (goal < oldN)
                output = "<br><br><b>Your facial features harden as your body becomes more masculine. (+" + strength + ")</b>";
        }
        //Barely noticable change!
        else {
            if (goal > oldN)
                output = "<br><br>There's a tingling in your " + this.face() + " as it changes imperceptibly towards being more feminine. (+" + strength + ")";
            else if (goal < oldN)
                output = "<br><br>There's a tingling in your " + this.face() + " as it changes imperciptibly towards being more masculine. (+" + strength + ")";
        }
        return output;
    }
    modThickness(goal, strength) {
        //Default parameters
        if (strength == undefined)
            strength = 1;
        //Main function
        if (goal == this.thickness)
            return "";
        //Lose weight fatty!
        if (goal < this.thickness && goal < 50) {
            this.thickness -= strength;
            //YOUVE GONE TOO FAR! TURN BACK!
            if (this.thickness < goal)
                this.thickness = goal;
        }
        //Sup tubby!
        if (goal > this.thickness && goal > 50) {
            this.thickness += strength;
            //YOUVE GONE TOO FAR! TURN BACK!
            if (this.thickness > goal)
                this.thickness = goal;
        }
        //DIsplay 'U GOT FAT'
        if (goal >= this.thickness && goal >= 50)
            return "<br><br>Your center of balance changes a little bit as your body noticeably widens. (+" + strength + " body thickness)";
        //GET THIN BITCH
        else if (goal <= this.thickness && goal <= 50)
            return "<br><br>Each movement feels a tiny bit easier than the last.  Did you just lose a little weight!? (+" + strength + " thin)";
        return "";
    }
    modTone(goal, strength) {
        //Default parameters
        if (strength == undefined)
            strength = 1;
        //Main function
        if (goal == this.tone)
            return "";
        //Lose muscle visibility!
        if (goal < this.tone && goal < 50) {
            this.tone -= strength;
            //YOUVE GONE TOO FAR! TURN BACK!
            if (this.tone < goal) {
                this.tone = goal;
                return "<br><br>You've lost some tone, but can't lose any more this way. (-" + strength + " muscle tone)";
            }
        }
        //MOAR hulkness
        if (goal > this.tone && goal > 50) {
            this.tone += strength;
            //YOUVE GONE TOO FAR! TURN BACK!
            if (this.tone > goal) {
                this.tone = goal;
                return "<br><br>You've gained some muscle tone, but can't gain any more this way. (+" + strength + " muscle tone)";
            }
        }
        //DIsplay BITCH I WORK OUT
        if (goal >= this.tone && goal > 50)
            return "<br><br>Your body feels a little more solid as you move, and your muscles look slightly more visible. (+" + strength + " muscle tone)";
        //Display DERP I HAVE GIRL MUSCLES
        else if (goal <= this.tone && goal < 50)
            return "<br><br>Moving brings with it a little more jiggle than you're used to.  You don't seem to have gained weight, but your muscles look less visible. (-" + strength + " muscle tone)";
        return "";
    }
    //Run this every hour to 'fix' femininity.
    fixFemininity() {
        var output = "";
        //Genderless/herms share the same bounds
        if (this.gender == GENDER_NONE || this.gender == GENDER_HERM) {
            if (this.femininity < 20) {
                output += "<br><b>Your incredibly masculine, chiseled features become a little bit softer from your body's changing hormones.";
                output += "</b><br>";
                this.femininity = 20;
            }
            else if (this.femininity > 85) {
                output += "<br><b>You find your overly feminine face loses a little bit of its former female beauty due to your body's changing hormones.</b><br>";
                this.femininity = 85;
            }
        }
        //GURLS!
        else if (this.gender == GENDER_FEMALE) {
            if (this.femininity < 30) {
                output += "<br><b>Your incredibly masculine, chiseled features become a little bit softer from your body's changing hormones.";
                output += "</b><br>";
                this.femininity = 30;
            }
        }
        //BOIZ!
        else if (this.gender == GENDER_MALE) {
            if (this.femininity > 70) {
                output += "<br><b>You find your overly feminine face loses a little bit of its former female beauty due to your body's changing hormones.</b><br>";
                this.femininity = 70;
            }
        }
        return output;
    }
    hasBeard() {
        return this.beardLength > 0;
    }
    beard() {
        if (this.hasBeard())
            return "beard";
        else {
            //CoC_Settings.error("");
            return "ERROR: NO BEARD! <b>YOU ARE NOT A VIKING AND SHOULD TELL KITTEH IMMEDIATELY.</b>";
        }
    }
    skin(noAdj, noTone) {
        //Default parameters
        if (noAdj == undefined)
            noAdj = false;
        if (noTone == undefined)
            noTone = false;
        //Main function
        var skinzilla = "";
        //Only show stuff other than skinDesc if justSkin is false
        if (!noAdj) {
            //Adjectives first!
            if (this.skinAdj != "" && !noTone && this.skinTone != "rough gray") {
                skinzilla += this.skinAdj;
                if (noTone)
                    skinzilla += " ";
                else
                    skinzilla += ", ";
            }
        }
        if (!noTone)
            skinzilla += this.skinTone + " ";
        //Fur handled a little differently since it uses
        //haircolor
        if (this.skinType == 1)
            skinzilla += "skin";
        else
            skinzilla += this.skinDesc;
        return skinzilla;
    }
    hasMuzzle() {
        if (this.faceType == FACE_HORSE ||
            this.faceType == FACE_DOG ||
            this.faceType == FACE_CAT ||
            this.faceType == FACE_LIZARD ||
            this.faceType == FACE_KANGAROO ||
            this.faceType == FACE_FOX ||
            this.faceType == FACE_DRAGON ||
            this.faceType == FACE_RHINO ||
            this.faceType == FACE_ECHIDNA ||
            this.faceType == FACE_DEER)
            return true;
        return false;
    }
    face() {
        var stringo = "";
        //0 - human
        //5 - Human w/Naga fangz
        //8 - bunnah faceahhh bunbun
        //10 - spidah-face (humanish)
        if (this.faceType == FACE_HUMAN)
            return "face";
        //1 - horse
        //2 - dogface
        //6 - kittah face
        //7 - lizard face (durned argonians!)
        //9 - kangaface
        if (this.hasMuzzle()) {
            if (UTIL.rand(3) == 0 && this.faceType == FACE_HORSE)
                stringo = "long ";
            if (UTIL.rand(3) == 0 && this.faceType == FACE_CAT)
                stringo = "feline ";
            if (UTIL.rand(3) == 0 && this.faceType == FACE_RHINO)
                stringo = "rhino ";
            if (UTIL.rand(3) == 0 && (this.faceType == FACE_LIZARD || this.faceType == FACE_DRAGON))
                stringo = "reptilian ";
            switch (UTIL.rand(3)) {
                case 0:
                    return stringo + "muzzle";
                case 1:
                    return stringo + "snout";
                case 2:
                    return stringo + "face";
                default:
                    return stringo + "face";
            }
        }
        //3 - cowface
        if (this.faceType == FACE_COW_MINOTAUR) {
            if (UTIL.rand(4) == 0)
                stringo = "bovine ";
            if (UTIL.rand(2) == 0)
                return "muzzle";
            return stringo + "face";
        }
        //4 - sharkface-teeth
        if (this.faceType == FACE_SHARK_TEETH) {
            if (Math.floor(Math.random() * 4) == 0)
                stringo = "angular ";
            return stringo + "face";
        }
        if (this.faceType == FACE_PIG || this.faceType == FACE_BOAR) {
            if (Math.floor(Math.random() * 4) == 0)
                stringo = (this.faceType == FACE_PIG ? "pig" : "boar") + "-like ";
            if (Math.floor(Math.random() * 4) == 0)
                return stringo + "snout";
            return stringo + "face";
        }
        return "face";
    }
    hasLongTail() {
        //7 - shark tail!
        //8 - catTAIIIIIL
        //9 - lizard tail
        //10 - bunbuntail
        //11 - harpybutt
        //12 - rootail
        //13 - foxtail
        //14 - dagron tail
        if (this.isNaga())
            return true;
        if (this.tailType == 2 ||
            this.tailType == 3 ||
            this.tailType == 4 ||
            this.tailType == 7 ||
            this.tailType == 8 ||
            this.tailType == 9 ||
            this.tailType == 12 ||
            this.tailType == 13 ||
            this.tailType == 14 ||
            this.tailType == 15 ||
            this.tailType == 16 ||
            this.tailType == 17 ||
            this.tailType == 18 ||
            this.tailType == 20)
            return true;
        return false;
    }
    hasLongTongue() {
        if (this.tongueType == TONGUE_SNAKE || this.tongueType == TONGUE_DEMONIC || this.tongueType == TONGUE_DRACONIC)
            return true;
        return false;
    }
    canFly() {
        //web also makes false!
        if (this.findStatusEffect(StatusEffects.Web) >= 0)
            return false;
        return this.wingType == WING_TYPE_BEE_LIKE_LARGE || this.wingType == WING_TYPE_BAT_LIKE_LARGE || this.wingType == WING_TYPE_FEATHERED_LARGE || this.wingType == WING_TYPE_DRACONIC_LARGE || this.wingType == WING_TYPE_GIANT_DRAGONFLY;
    }
    isPregnant() {
        return this.pregnancyType != 0;
    }
    isButtPregnant() {
        return this.buttPregnancyType != 0;
    }
    //------------
    // DESCRIPTORS
    //------------
    //Cawks!
    cockDescript(x) {
        return Appearance.cockDescript(this, x);
    }
    cockDescriptShort(x) {
        return Appearance.cockDescript(this, x);
    }
    multiCockDescriptLight() {
        return Appearance.multiCockDescriptLight(this);
    }
    //BALLZ!
    ballDescript() {
        return Appearance.ballsDescription(false, false, this);
    }
    ballsDescript() {
        return Appearance.ballsDescription(false, true, this, true);
    }
    ballsDescriptLight(forcedSize) {
        if (forcedSize == undefined)
            forcedSize = true;
        return Appearance.ballsDescription(forcedSize, false, this);
    }
    sackDescript() {
        return Appearance.sackDescript(this);
    }
    //Vagoos!
    vaginaDescript(x = 0) {
        return Appearance.vaginaDescript(this, x);
    }
    allVaginaDescript() {
        if (liveData.player.vaginas.length == 1)
            return this.vaginaDescript(UTIL.rand(liveData.player.vaginas.length - 1));
        if (liveData.player.vaginas.length > 1)
            return this.vaginaDescript(UTIL.rand(liveData.player.vaginas.length - 1)) + "s";
        return "ERROR: allVaginaDescript called with no vaginas.";
    }
    clitDescript() {
        return Appearance.clitDescription(this);
    }
    //Boobies!
    chestDesc() {
        if (this.biggestTitSize() < 1)
            return "chest";
        return Appearance.biggestBreastSizeDescript(this);
    }
    allChestDesc() {
        if (this.biggestTitSize() < 1)
            return "chest";
        return this.allBreastsDescript();
    }
    breastDescript(x) {
        return Appearance.breastDescript(x);
    }
    nippleDescript(rowNum) {
        return Appearance.nippleDescription(this, rowNum);
    }
    //Hair and beard ahoy!
    hairDescript() {
        return Appearance.hairDescription(this);
    }
    beardDescript() {
        return Appearance.beardDescription(this);
    }
    hairOrFur() {
        return Appearance.hairOrFur(this);
    }
    //Body descriptors!
    hipDescript() {
        return Appearance.hipDescription(this);
    }
    assDescript() {
        return this.buttDescript();
    }
    assholeDescript() {
        return Appearance.assholeDescript(this);
    }
    buttDescript() {
        return Appearance.buttDescription(this);
    }
    //Other parts!
    tongueDescript() {
        return Appearance.tongueDescription(this);
    }
    tailDescript() {
        return Appearance.tailDescript(this);
    }
    oneTailDescript() {
        return Appearance.oneTailDescript(this);
    }
    wingsDescript() {
        return Appearance.wingsDescript(this);
    }
    //---------
    // PREGNANCY UTIL
    //---------
    isPregnant() {
        return this.pregnancyType != 0;
    }
    isButtPregnant() {
        return this.buttPregnancyType != 0;
    }
    //fertility must be >= random(0-beat)
    //If arg == 1 then override any contraceptives and guarantee fertilization
    //If arg == -1, no chance of fertilization.
    knockUp(type, incubation, beat, arg, event) {
        //Defaulting
        if (type == undefined)
            type = 0;
        if (incubation == undefined)
            incubation = 0;
        if (beat == undefined)
            beat = 100;
        if (arg == undefined)
            arg = 0;
        if (event == undefined)
            event = [];
        //Contraceptives cancel!
        if (this.findStatusEffect(StatusEffects.Contraceptives) >= 0 && arg < 1)
            return;
        // Originally commented out
        //if (this.findStatusEffect(StatusEffects.GooStuffed) >= 0) return; //No longer needed thanks to PREGNANCY_GOO_STUFFED being used as a blocking value
        var bonus = 0;
        //If arg = 1 (always pregnant), bonus = 9000
        if (arg >= 1)
            bonus = 9000;
        if (arg <= -1)
            bonus = -9000;
        if (this.pregnancyIncubation == 0 && this.totalFertility() + bonus > Math.floor(Math.random() * beat) && this.hasVagina()) {
            this.knockUpForce(type, incubation);
            //trace("PC Knocked up with pregnancy type: " + type + " for " + incubation + " incubation.");
        }
        //Chance for eggs fertilization - ovi elixir and imps excluded!
        if (type != PREGNANCY_IMP && type != PREGNANCY_OVIELIXIR_EGGS && type != PREGNANCY_ANEMONE) {
            if (this.findPerk(PerkLib.SpiderOvipositor) >= 0 || this.findPerk(PerkLib.BeeOvipositor) >= 0) {
                if (this.totalFertility() + bonus > Math.floor(Math.random() * beat)) {
                    this.fertilizeEggs();
                }
            }
        }
    }
    buttKnockUp(type, incubation, beat, arg) {
        //Defaulting
        if (type == undefined)
            type = 0;
        if (incubation == undefined)
            incubation = 0;
        if (beat == undefined)
            beat = 100;
        if (arg == undefined)
            arg = 0;
        //Contraceptives cancel!
        if (this.findStatusEffect(StatusEffects.Contraceptives) >= 0 && arg < 1)
            return;
        var bonus = 0;
        //If arg = 1 (always pregnant), bonus = 9000
        if (arg >= 1)
            bonus = 9000;
        if (arg <= -1)
            bonus = -9000;
        //If unpregnant and fertility wins out:
        if (this.buttPregnancyIncubation == 0 && this.totalFertility() + bonus > Math.floor(Math.random() * beat)) {
            this.buttKnockUpForce(type, incubation);
            //trace("PC Butt Knocked up with pregnancy type: " + type + " for " + incubation + " incubation.");
        }
    }
    //The more complex buttKnockUp function used by the player is defined in Character.as
    buttKnockUpForce(type, incubation, event) {
        //Defaulting
        if (type == undefined)
            type = 0;
        if (incubation == undefined)
            incubation = 0;
        if (event == undefined)
            event = [];
        //Functionality
        this.buttPregnancyType = type;
        this.buttPregnancyIncubation = type == 0 ? 0 : incubation * 60; //Won't allow incubation time without pregnancy type
        if (event.length > 1) {
            this.buttPregnancyEventArr = event;
            this.buttPregnancyEventNum = 0;
        }
        if (type == 0) {
            this.buttPregnancyEventArr.length = 0;
            this.pregnancyEventNum = 0;
        }
    }
    knockUpForce(type, incubation, event) {
        //Defaulting
        if (type == undefined)
            type = 0;
        if (incubation == undefined)
            incubation = 0;
        if (event == undefined)
            event = [];
        //Functionality
        this.pregnancyType = type;
        this.pregnancyIncubation = type == 0 ? 0 : incubation * 60; //Won't allow incubation time without pregnancy type
        if (event.length > 1) {
            this.pregnancyEventArr = event;
            this.pregnancyEventNum = 0;
        }
        //Reset pregnancy event array and encounter
        if (type == 0) {
            this.pregnancyEventArr.length = 0;
            this.pregnancyEventNum = 0;
        }
    }
    // More for compatibility, though knockUpForce will take care of this too.
    eventFill(events) {
        this.pregnancyEventArr = [];
        for (i in events)
            this.pregnancyEventArr.push(events[i] * 60);
    }
    pregnancyAdvance() {
        if (this.pregnancyType == 0) {
            this.pregnancyEventArr.length = 0;
            this.pregnancyEventNum = 0;
        }
        if (this.pregnancyIncubation > 0)
            this.pregnancyIncubation--;
        if (this.pregnancyIncubation < 0)
            this.pregnancyIncubation = 0;
        if (this.buttPregnancyIncubation > 0)
            this.buttPregnancyIncubation--;
        if (this.buttPregnancyIncubation < 0)
            this.buttPregnancyIncubation = 0;
        // If there's something in the pregnancy event array, find out what event we're on.
        if (this.pregnancyEventArr.length > 1) {
            for (j = 0; j < this.pregnancyEventArr.length; j++) {
                if (this.pregnancyIncubation < this.pregnancyEventArr[j]) {
                    //outputText("Setting new flag to " + (j + 1));
                    this.pregnancyEventNum = j + 1;
                }
            }
        }
        if (this.buttPregnancyEventArr.length > 1) {
            for (j = 0; j < this.buttPregnancyEventArr.length; j++) {
                if (this.buttPregnancyIncubation < this.buttPregnancyEventArr[j]) {
                    //outputText("Setting new flag to " + (j + 1));
                    this.buttPregnancyEventNum = j + 1;
                }
            }
        }
    }
    //public function pregnancyUpdate():Boolean { return false; }
    /*


    //The more complex knockUp function used by the player is defined above
    //The player doesn't need to be told of the last event triggered, so the code here is quite a bit simpler than that in PregnancyStore


    //fertility must be >= random(0-beat)


    */
    //---------------
    // OVIPOSITING - NOT COMPLETE IN THE SLIGHTEST. CHECK ALL FUNCTIONS WHEN WE DECIDE TO GET THIS GOING.
    //---------------
    // Does the creature have a spider ovipositor?
    canOvipositSpider() {
        if (this.eggs() >= 10 && this.findPerk(PerkLib.SpiderOvipositor) >= 0 && this.isDrider() && this.tailType == TAIL_TYPE_SPIDER_ADBOMEN)
            return true;
        return false;
    }
    // Does the creature have an bee ovipositor?
    canOvipositBee() {
        if (this.eggs() >= 10 && this.findPerk(PerkLib.BeeOvipositor) >= 0 && this.tailType == TAIL_TYPE_BEE_ABDOMEN)
            return true;
        return false;
    }
    // Can the creature oviposit at all?
    canOviposit() {
        if (this.canOvipositSpider() || this.canOvipositBee())
            return true;
        return false;
    }
    // How many eggs, held in value 1 in the perks, does the creature have?
    eggs() {
        if (this.findPerk(PerkLib.SpiderOvipositor) < 0 && this.findPerk(PerkLib.BeeOvipositor) < 0)
            return -1;
        else if (this.findPerk(PerkLib.SpiderOvipositor) >= 0)
            return this.perkValue(PerkLib.SpiderOvipositor, 1);
        else
            return this.perkValue(PerkLib.BeeOvipositor, 1);
    }
    // Add eggs to the ovipositors
    addEggs(arg) {
        if (arg == undefined)
            arg = 0;
        if (this.findPerk(PerkLib.SpiderOvipositor) < 0 && this.findPerk(PerkLib.BeeOvipositor) < 0)
            return -1;
        else {
            // Increase the number of Spider eggs by arg.
            if (this.findPerk(PerkLib.SpiderOvipositor) >= 0) {
                this.addPerkValue(PerkLib.SpiderOvipositor, 1, arg);
                // Can't hold more than 50 eggs
                if (this.eggs() > 50)
                    this.setPerkValue(PerkLib.SpiderOvipositor, 1, 50);
                return this.perkValue(PerkLib.SpiderOvipositor, 1);
            }
            else {
                // Increase Bee eggs by arg.
                this.addPerkValue(PerkLib.BeeOvipositor, 1, arg);
                if (this.eggs() > 50)
                    this.setPerkValue(PerkLib.BeeOvipositor, 1, 50);
                return this.perkValue(PerkLib.BeeOvipositor);
            }
        }
    }
    // Sets a specific number of eggs to the ovipositors
    setEggs(arg) {
        if (arg == undefined)
            arg = 0;
        if (this.findPerk(PerkLib.SpiderOvipositor) < 0 && this.findPerk(PerkLib.BeeOvipositor) < 0)
            return -1;
        else {
            // Set the number of Spider eggs by arg.
            if (this.findPerk(PerkLib.SpiderOvipositor) >= 0) {
                this.setPerkValue(PerkLib.SpiderOvipositor, 1, arg);
                // Can't hold more than 50 eggs
                if (this.eggs() > 50)
                    this.setPerkValue(PerkLib.SpiderOvipositor, 1, 50);
                return this.perkValue(PerkLib.SpiderOvipositor, 1);
            }
            else {
                // Set the number of Bee eggs by arg.
                this.setPerkValue(PerkLib.BeeOvipositor, 1, arg);
                // No more than 50 eggs
                if (this.eggs() > 50)
                    this.setPerkValue(PerkLib.BeeOvipositor, 1, 50);
                return this.perkValue(PerkLib.BeeOvipositor);
            }
        }
    }
    // Returns value 2 to check to see if the creature's eggs are fertilized.
    fertilizedEggs() {
        if (this.findPerk(PerkLib.SpiderOvipositor) < 0 && this.findPerk(PerkLib.BeeOvipositor) < 0)
            return -1;
        else if (this.findPerk(PerkLib.SpiderOvipositor) >= 0)
            return this.perkValue(PerkLib.SpiderOvipositor, 2);
        else
            return this.perkValue(PerkLib.BeeOvipositor, 2);
    }
    // Fertilize the player's eggs by setting value 2 to eggs()
    fertilizeEggs() {
        if (this.findPerk(PerkLib.SpiderOvipositor) < 0 && this.findPerk(PerkLib.BeeOvipositor) < 0)
            return -1;
        else if (this.findPerk(PerkLib.SpiderOvipositor) >= 0)
            this.setPerkValue(PerkLib.SpiderOvipositor, 2, this.eggs());
        else
            this.setPerkValue(PerkLib.BeeOvipositor, 2, this.eggs());
        return this.fertilizedEggs();
    }
    // Remove all eggs from the ovipositors
    dumpEggs() {
        if (this.findPerk(PerkLib.SpiderOvipositor) < 0 && this.findPerk(PerkLib.BeeOvipositor) < 0)
            return;
        // Clear out the eggs
        this.setEggs(0);
        // Use the new egg number to clear out the fertilized eggs
        this.fertilizeEggs();
    }
    //---------------
    // MINO CUM ADDICTION
    //---------------
    minoCumAddiction(raw) {
        //Fix if variables go out of range.
        if (liveData.gameFlags[MINOTAUR_CUM_ADDICTION_TRACKER] < 0)
            liveData.gameFlags[MINOTAUR_CUM_ADDICTION_TRACKER] = 0;
        if (liveData.gameFlags[MINOTAUR_CUM_ADDICTION_STATE] < 0)
            liveData.gameFlags[MINOTAUR_CUM_ADDICTION_STATE] = 0;
        if (liveData.gameFlags[MINOTAUR_CUM_ADDICTION_TRACKER] > 120)
            liveData.gameFlags[MINOTAUR_CUM_ADDICTION_TRACKER] = 120;
        liveData.gameFlags[EVER_DRANK_MINOCUM] = 1;
        //Turn off withdrawal
        //if (flags[kFLAGS.MINOTAUR_CUM_ADDICTION_STATE] > 1) flags[kFLAGS.MINOTAUR_CUM_ADDICTION_STATE] = 1;
        //Reset counter
        liveData.gameFlags[TIME_SINCE_LAST_CONSUMED_MINOTAUR_CUM] = 0;
        //If highly addicted, rises slower
        if (liveData.gameFlags[MINOTAUR_CUM_ADDICTION_TRACKER] >= 60)
            raw /= 2;
        if (liveData.gameFlags[MINOTAUR_CUM_ADDICTION_TRACKER] >= 80)
            raw /= 2;
        if (liveData.gameFlags[MINOTAUR_CUM_ADDICTION_TRACKER] >= 90)
            raw /= 2;
        if (liveData.player.findPerk(PerkLib.MinotaurCumResistance) >= 0)
            raw *= 0;
        //If in withdrawl, readdiction is potent!
        if (liveData.gameFlags[MINOTAUR_CUM_ADDICTION_STATE] == 3)
            raw += 10;
        if (liveData.gameFlags[MINOTAUR_CUM_ADDICTION_STATE] == 2)
            raw += 5;
        raw = Math.round(raw * 100) / 100;
        //PUT SOME CAPS ON DAT' SHIT
        if (raw > 50)
            raw = 50;
        if (raw < -50)
            raw = -50;
        liveData.gameFlags[MINOTAUR_CUM_ADDICTION_TRACKER] += raw;
        //Recheck to make sure shit didn't break
        if (this.findPerk(PerkLib.MinotaurCumResistance) >= 0)
            liveData.gameFlags[MINOTAUR_CUM_ADDICTION_TRACKER] = 0; //Never get addicted!
        if (liveData.gameFlags[MINOTAUR_CUM_ADDICTION_TRACKER] > 120)
            liveData.gameFlags[MINOTAUR_CUM_ADDICTION_TRACKER] = 120;
        if (liveData.gameFlags[MINOTAUR_CUM_ADDICTION_TRACKER] < 0)
            liveData.gameFlags[MINOTAUR_CUM_ADDICTION_TRACKER] = 0;
    }
    minotaurAddicted() {
        return this.findPerk(PerkLib.MinotaurCumResistance) < 0 && (this.findPerk(PerkLib.MinotaurCumAddict) >= 0 || liveData.gameFlags[MINOTAUR_CUM_ADDICTION_STATE] >= 1);
    }
    minotaurNeed() {
        return this.findPerk(PerkLib.MinotaurCumResistance) < 0 && liveData.gameFlags[MINOTAUR_CUM_ADDICTION_STATE] > 1;
    }
}
export { Creature };
//# sourceMappingURL=creature.js.map