import * as ENUM from "./appearanceEnums.js"
import { GUI } from "./engine/gui.js"
import { UTIL } from "./engine/utils.js"
import { IPlayer } from "./interfaces/iplayer.js"
import { Ass, IAss } from "./models/body-parts/assClass.js"
import { IItem, Item, Items } from "./itemClass.js"
import { ItemSlot } from "./itemSlotClass.js"
import { liveData } from "./globalVariables.js"
import { CharacterType, Creature } from "./creature.js"
import { StatusEffects, VenomType } from "./statusEffectLib.js"
import { PerkLib } from "./perkLib.js"
import { Appearance } from "./appearance.js"

class Spell {
    blind: boolean
    chargeWeapon: boolean
    whitefire: boolean
    arouse: boolean
    heal: boolean
    might: boolean

    constructor() {
        this.blind = false
        this.chargeWeapon = false
        this.whitefire = false
        this.arouse = false
        this.heal = false
        this.might = false
    }
}

class Player extends Creature implements IPlayer {
    beardType: number
    teaseLevel: number
    teaseXP: number
    itemSlots: ItemSlot[]
    //Spells
    spells: Spell
    //Stats points
    statPoints: number
    perkPoints: number
    hunger: number
    location: string
    //Race
    originalGender: number
    originalRace: string
    // Temporary defaults
    tempStr: number
    tempTou: number
    tempSpe: number
    tempInt: number

    constructor() {
        super()

        this.type = CharacterType.Player
        this.a = ""
        this.name = ""
        this.refName = "You"
        this.isAre = "are"
        this.heShe = "you"
        this.himHer = "you"
        this.hisHer = "your"
        this.plural = true
        //Appearance
        this.gender = 0 //0 genderless, 1 male, 2 female, 3 hermaphrodite
        this.tallness = 60 //Height in inches
        this.skinTone = "light"
        this.skinType = ENUM.SkinType.SKIN_TYPE_PLAIN
        this.skinAdj = ""
        this.hairType = ENUM.HairType.HAIR_NORMAL
        this.hairColor = "brown"
        this.hairLength = 1
        this.beardType = ENUM.BeardType.BEARD_NORMAL
        this.beardLength = 0
        this.furColor = "none"

        this.earType = ENUM.EarType.EARS_HUMAN
        this.tailType = ENUM.TailType.TAIL_TYPE_NONE
        this.tailVenom = 0
        this.tailRecharge = 0
        this.lowerBody = ENUM.LowerBodyType.LOWER_BODY_TYPE_HUMAN

        this.tone = 50
        this.thickness = 50
        this.hipRating = ENUM.HipRatingType.HIP_RATING_BOYISH
        this.buttRating = ENUM.ButtRatingType.BUTT_RATING_AVERAGE

        //Sexual Characteristics
        //Cocks
        this.cocks = []
        this.balls = 0
        this.ballSize = 0
        this.hoursSinceCum = 0
        this.cumMultiplier = 0
        //Vaginas
        this.vaginas = []
        //Ass
        this.ass = new Ass(1, 0, true)
        //Breasts
        this.breastRows = []
        this.lactationMultiplier = 0

        //Equipment
        this.weapon = Items.NOTHING
        this.armor = Items.Armor.ComfortableClothes

        this.teaseLevel = 0
        this.teaseXP = 0

        this.itemSlots = []
        //Slots 0-9 are player inventory. Slots 10-55 are for gear storage options. See inventory.js for details
        // Initializing it here makes things easier.
        for (var i = 0; i < 56; i++) {
            this.itemSlots.push(new ItemSlot())
        }
        this.keyItems = []
        this.statusEffects = []
        this.perks = []

        //Spells
        this.spells = new Spell()
        // this.spells.blind = false
        // this.spells.chargeWeapon = false
        // this.spells.whitefire = false
        // this.spells.arouse = false
        // this.spells.heal = false
        // this.spells.might = false

        //Stats points
        this.statPoints = 0
        this.perkPoints = 0

        this.hunger = 80

        this.location = "Camp"

        //Race
        this.originalGender = 0
        this.originalRace = "human"

        // Temporary defaults
        this.tempStr = 0
        this.tempTou = 0
        this.tempSpe = 0
        this.tempInt = 0
    }

    /*lustVuln() {
        get lustVuln() {
            var percent = 100;
            //Level-based
            if (this.level < 10)
                percent -= (this.level - 1) * 3;
            else
                percent -= 27;
            //Perk-based
            if (this.findPerk(PerkLib.Resistance) >= 0)
                percent -= 10;
            //Apply cap
            if (percent < 25)
                percent = 25;
            return percent / 100;
        }
    }*/

    // TODO: verify: best guess is shortName (equipmentName also possible)
    get armorName(): string {
        return this.armor.shortName
    }

    minLust() {
        return 0
    }

    //RACIAL SCORE
    race() {
        //Determine race type:
        var race = "human"
        if (this.catScore() >= 4) {
            if (this.isTaur() && this.lowerBody == ENUM.LowerBodyType.LOWER_BODY_TYPE_CAT) {
                race = "cat-taur"
                if (this.faceType == 0) race = "sphinx-morph" // no way to be fully feral anyway
            } else {
                race = "cat-morph"
                if (this.faceType == 0) race = "cat-" + this.mf("boy", "girl")
            }
        }
        if (this.lizardScore() >= 4) race = "lizan"
        if (this.dragonScore() >= 4) {
            race = "dragon-morph"
            if (this.faceType == 0) race = "dragon-" + this.mf("man", "girl")
        }
        if (this.raccoonScore() >= 4) {
            race = "raccoon-morph"
            if (this.balls > 0 && this.ballSize > 5) race = "tanuki-morph"
        }
        if (this.dogScore() >= 4) {
            if (this.isTaur() && this.lowerBody == ENUM.LowerBodyType.LOWER_BODY_TYPE_DOG) race = "dog-taur"
            else {
                race = "dog-morph"
                if (this.faceType == 0) race = "dog-" + this.mf("man", "girl")
            }
        }
        if (this.foxScore() >= 4) {
            if (this.isTaur() && this.lowerBody == ENUM.LowerBodyType.LOWER_BODY_TYPE_FOX) race = "fox-taur"
            else if (this.skinType == 1) race = "fox-morph"
            else race = "fox-" + this.mf("morph", "girl")
        }
        if (this.ferretScore() >= 4) {
            if (this.skinType == 1) race = "ferret-morph"
            else race = "ferret-" + this.mf("morph", "girl")
        }
        if (this.kitsuneScore() >= 4) {
            race = "kitsune"
        }
        if (this.horseScore() >= 3) {
            if (this.isTaur()) race = "centaur-morph"
            else if (this.hornType == ENUM.HornType.HORNS_UNICORN) race = "unicorn-morph"
            else race = "equine-morph"
        }
        if (this.mutantScore() >= 5 && race == "human") race = "corrupted mutant"
        if (this.minoScore() >= 4) race = "minotaur-morph"
        if (this.cowScore() > 5) {
            race = "cow-"
            race += this.mf("morph", "girl")
        }
        if (this.beeScore() >= 5) race = "bee-morph"
        if (this.goblinScore() >= 5) race = "goblin"
        if (this.humanScore() >= 5 && race == "corrupted mutant") race = "somewhat human mutant"
        if (this.demonScore() > 4) race = "demon-morph"
        if (this.sharkScore() >= 3) race = "shark-morph"
        if (this.bunnyScore() >= 4) race = "bunny-" + this.mf("boy", "girl")
        if (this.harpyScore() >= 4) {
            if (this.gender >= 2) race = "harpy"
            else race = "avian"
        }
        if (this.spiderScore() >= 4) {
            race = "spider-morph"
            if (this.mf("no", "yes") == "yes") race = "spider-girl"
            if (this.isDrider()) race = "drider"
        }
        if (this.kangaScore() >= 4) race = "kangaroo-morph"
        if (this.mouseScore() >= 3) {
            if (this.faceType != 16) race = "mouse-" + this.mf("boy", "girl")
            else race = "mouse-morph"
        }
        //<mod>
        if (this.pigScore() >= 4) {
            race = "pig-morph"
            if (this.faceType == 0) race = "pig-" + this.mf("boy", "girl")
            if (this.faceType == 20) race = "boar-morph"
        }
        if (this.satyrScore() >= 4) {
            race = "satyr"
        }
        if (this.rhinoScore() >= 4) {
            race = "rhino-morph"
            if (this.faceType == 0) race = "rhino-" + this.mf("man", "girl")
        }
        if (this.echidnaScore() >= 4) {
            race = "echidna-morph"
            if (this.faceType == 0) race = "echidna-" + this.mf("boy", "girl")
        }
        if (this.deerScore() >= 4) {
            if (this.isTaur()) race = "deer-taur"
            else {
                race = "deer-morph"
                if (this.faceType == 0) race = "deer-" + this.mf("morph", "girl")
            }
        }
        //Special, bizarre races
        if (this.dragonneScore() >= 6) {
            if (this.isTaur()) race = "dragonne-taur"
            else {
                race = "dragonne-morph"
                if (this.faceType == 0) race = "dragonne-" + this.mf("man", "girl")
            }
        }
        if (this.manticoreScore() >= 6) {
            race = "manticore-morph"
            if (this.faceType == 0) race = "manticore-" + this.mf("man", "girl")
        }
        if (this.sirenScore() >= 4) {
            race = "siren"
        }
        //</mod>
        if (this.lowerBody == 3) race = "naga"
        if (this.lowerBody == ENUM.LowerBodyType.LOWER_BODY_TYPE_HOOFED && this.isTaur()) {
            if (this.wingType == ENUM.WingType.WING_TYPE_FEATHERED_LARGE) race = "pegataur"
            else race = "centaur"
        }
        if (this.lowerBody == ENUM.LowerBodyType.LOWER_BODY_TYPE_PONY) race = "pony-kin"
        if (this.gooScore() >= 3) {
            race = "goo-"
            race += this.mf("boi", "girl")
        }

        return race
    }

    //determine demon rating
    demonScore() {
        var demonCounter = 0
        if (this.hornType == 1 && this.horns > 0) demonCounter++
        if (this.hornType == 1 && this.horns > 4) demonCounter++
        if (this.tailType == 3) demonCounter++
        if (this.wingType == 6 || this.wingType == 7) demonCounter++
        if (this.skinType == 0 && this.cor > 50) demonCounter++
        if (this.faceType == 0 && this.cor > 50) demonCounter++
        if (this.lowerBody == 5 || this.lowerBody == 6) demonCounter++
        if (this.countCocksOfType(ENUM.CockType.DEMON) > 0) demonCounter++
        return demonCounter
    }

    //Determine Human Rating
    humanScore() {
        var humanCounter = 0
        if (this.faceType == 0) humanCounter++
        if (this.skinType == 0) humanCounter++
        if (this.horns == 0) humanCounter++
        if (this.tailType == 0) humanCounter++
        if (this.wingType == 0) humanCounter++
        if (this.lowerBody == 0) humanCounter++
        if (this.countCocksOfType(ENUM.CockType.HUMAN) == 1 && this.totalCocks() == 1) humanCounter++
        if (this.breastRows.length == 1 && this.skinType == 0) humanCounter++
        return humanCounter
    }

    //Determine minotaur rating
    minoScore() {
        var minoCounter = 0
        if (this.faceType == 3) minoCounter++
        if (this.earType == 3) minoCounter++
        if (this.tailType == 4) minoCounter++
        if (this.hornType == 2) minoCounter++
        if (this.lowerBody == 1 && minoCounter > 0) minoCounter++
        if (this.tallness > 80 && minoCounter > 0) minoCounter++
        if (this.cocks.length > 0 && minoCounter > 0) {
            if (this.countCocksOfType(ENUM.CockType.HORSE) > 0) minoCounter++
        }
        if (this.vaginas.length > 0) minoCounter--
        return minoCounter
    }

    minotaurScore() {
        return this.minoScore()
    }

    //Determine cow rating
    cowScore() {
        var minoCounter = 0
        if (this.faceType == 0) minoCounter++
        if (this.faceType == 3) minoCounter--
        if (this.earType == 3) minoCounter++
        if (this.tailType == 4) minoCounter++
        if (this.hornType == 2) minoCounter++
        if (this.lowerBody == 1 && minoCounter > 0) minoCounter++
        if (this.tallness >= 73 && minoCounter > 0) minoCounter++
        if (this.vaginas.length > 0) minoCounter++
        if (this.biggestTitSize() > 4 && minoCounter > 0) minoCounter++
        if (this.biggestLactation() > 2 && minoCounter > 0) minoCounter++
        return minoCounter
    }

    sandTrapScore() {
        var counter = 0
        if (this.findStatusEffect(StatusEffects.BlackNipples) >= 0) counter++
        if (this.findStatusEffect(StatusEffects.Uniball) >= 0) counter++
        if (this.hasVagina() && this.vaginaType() == 5) counter++
        if (this.eyeType == ENUM.EyeType.EYES_BLACK_EYES_SAND_TRAP) counter++
        if (this.wingType == ENUM.WingType.WING_TYPE_GIANT_DRAGONFLY) counter++
        if (this.findStatusEffect(StatusEffects.Uniball) >= 0) counter++
        return counter
    }

    //Determine Bee Rating
    beeScore() {
        var beeCounter = 0
        if (this.hairColor == "shiny black") beeCounter++
        if (this.hairColor == "black and yellow") beeCounter += 2
        if (this.antennae > 0) {
            beeCounter++
            if (this.faceType == 0) beeCounter++
        }
        if (this.lowerBody == 7) {
            beeCounter++
            if (this.vaginas.length == 1) beeCounter++
        }
        if (this.tailType == 6) beeCounter++
        if (this.wingType == 1) beeCounter++
        if (this.wingType == 2) beeCounter++
        return beeCounter
    }
    //Determine Ferret Rating!
    ferretScore() {
        var counter = 0
        if (this.faceType == ENUM.FaceType.FACE_FERRET_MASK) counter++
        if (this.faceType == ENUM.FaceType.FACE_FERRET) counter += 2
        if (this.earType == ENUM.EarType.EARS_FERRET) counter++
        if (this.tailType == ENUM.TailType.TAIL_TYPE_FERRET) counter++
        if (this.lowerBody == ENUM.LowerBodyType.LOWER_BODY_TYPE_FERRET) counter++
        if (this.skinType == ENUM.SkinType.SKIN_TYPE_FUR && counter > 0) counter++
        return counter
    }
    //Determine Dog Rating
    dogScore() {
        var dogCounter = 0
        if (this.faceType == 2) dogCounter++
        if (this.earType == 2) dogCounter++
        if (this.tailType == 2) dogCounter++
        if (this.lowerBody == 2) dogCounter++
        if (this.countCocksOfType(ENUM.CockType.DOG) > 0) dogCounter++
        if (this.breastRows.length > 1) dogCounter++
        if (this.breastRows.length == 3) dogCounter++
        if (this.breastRows.length > 3) dogCounter--
        //Fur only counts if some canine features are present
        if (this.skinType == 1 && dogCounter > 0) dogCounter++
        return dogCounter
    }

    mouseScore() {
        var coonCounter = 0
        if (this.earType == 12) coonCounter++
        if (this.tailType == 16) coonCounter++
        if (this.faceType == 15) coonCounter++
        if (this.faceType == 16) coonCounter += 2
        //Fur only counts if some canine features are present
        if (this.skinType == 1 && coonCounter > 0) coonCounter++
        if (this.tallness < 55 && coonCounter > 0) coonCounter++
        if (this.tallness < 45 && coonCounter > 0) coonCounter++
        return coonCounter
    }

    raccoonScore() {
        var coonCounter = 0
        if (this.faceType == 13) coonCounter++
        if (this.faceType == 14) coonCounter += 2
        if (this.earType == 11) coonCounter++
        if (this.tailType == 15) coonCounter++
        if (this.lowerBody == 19) coonCounter++
        if (coonCounter > 0 && this.balls > 0) coonCounter++
        //Fur only counts if some canine features are present
        if (this.skinType == 1 && coonCounter > 0) coonCounter++
        return coonCounter
    }

    //Determine Fox Rating
    foxScore() {
        var foxCounter = 0
        if (this.faceType == 11) foxCounter++
        if (this.earType == 9) foxCounter++
        if (this.tailType == 13) foxCounter++
        if (this.lowerBody == 17) foxCounter++
        if (this.countCocksOfType(ENUM.CockType.DOG) && foxCounter > 0) foxCounter++
        if (this.breastRows.length > 1 && foxCounter > 0) foxCounter++
        if (this.breastRows.length == 3 && foxCounter > 0) foxCounter++
        if (this.breastRows.length == 4 && foxCounter > 0) foxCounter++
        //Fur only counts if some canine features are present
        if (this.skinType == 1 && foxCounter > 0) foxCounter++
        return foxCounter
    }

    //Determine cat Rating
    catScore() {
        var catCounter = 0
        if (this.faceType == 6) catCounter++
        if (this.earType == 5) catCounter++
        if (this.tailType == 8) catCounter++
        if (this.lowerBody == 9) catCounter++
        if (this.countCocksOfType(ENUM.CockType.CAT) > 0) catCounter++
        if (this.breastRows.length > 1 && catCounter > 0) catCounter++
        if (this.breastRows.length == 3 && catCounter > 0) catCounter++
        if (this.breastRows.length > 3) catCounter -= 2
        //Fur only counts if some canine features are present
        if (this.skinType == 1 && catCounter > 0) catCounter++
        return catCounter
    }

    //Determine lizard rating
    lizardScore() {
        var lizardCounter = 0
        if (this.faceType == 7) lizardCounter++
        if (this.earType == 6) lizardCounter++
        if (this.tailType == 9) lizardCounter++
        if (this.lowerBody == 10) lizardCounter++
        if (this.countCocksOfType(ENUM.CockType.LIZARD) > 0) lizardCounter++
        if (this.horns > 0 && (this.hornType == 3 || this.hornType == 4)) lizardCounter++
        if (this.skinType == 2) lizardCounter++
        return lizardCounter
    }

    spiderScore() {
        var score = 0
        if (this.eyeType == 1) score += 2
        if (this.faceType == 10) score++
        if (this.armType == 2) score++
        if (this.lowerBody == 15 || this.lowerBody == 16) score += 2
        else if (score > 0) score--
        if (this.tailType == 5) score += 2
        if (this.skinType > 0 && score > 0) score--
        return score
    }

    //Determine Horse Rating
    horseScore() {
        var horseCounter = 0
        if (this.faceType == 1) horseCounter++
        if (this.earType == 1) horseCounter++
        if (this.tailType == 1) horseCounter++
        if (this.countCocksOfType(ENUM.CockType.HORSE) > 0) horseCounter++
        if (this.lowerBody == 1 || this.lowerBody == 4) horseCounter++
        //Fur only counts if some equine features are present
        if (this.skinType == 1 && horseCounter > 0) horseCounter++
        return horseCounter
    }

    //Determine kitsune Rating
    kitsuneScore() {
        var kitsuneCounter = 0
        //If the character has fox ears, +1
        if (this.earType == ENUM.EarType.EARS_FOX) kitsuneCounter++
        //If the character has a fox tail, +1
        if (this.tailType == ENUM.TailType.TAIL_TYPE_FOX) kitsuneCounter++
        //If the character has two or more fox tails, +2
        if (this.tailType == ENUM.TailType.TAIL_TYPE_FOX && this.tailVenom >= 2) kitsuneCounter += 2
        //If the character has tattooed skin, +1
        //9999
        //If the character has a 'vag of holding', +1
        if (this.vaginalCapacity() >= 8000) kitsuneCounter++
        //If the character's kitsune score is greater than 0 and:
        //If the character has a normal face, +1
        if (kitsuneCounter > 0 && (this.faceType == ENUM.FaceType.FACE_HUMAN || this.faceType == ENUM.FaceType.FACE_FOX)) kitsuneCounter++
        //If the character's kitsune score is greater than 1 and:
        //If the character has "blonde","black","red","white", or "silver" hair, +1
        //if (kitsuneCounter > 0 && (InCollection(furColor, KitsuneScene.basicKitsuneHair) || InCollection(furColor, KitsuneScene.elderKitsuneColors)))
        //    kitsuneCounter++;
        //If the character's femininity is 40 or higher, +1
        if (kitsuneCounter > 0 && this.femininity >= 40) kitsuneCounter++
        //If the character has fur, scales, or gooey skin, -1
        //if (this.skinType == SKIN_TYPE_FUR && !InCollection(furColor, KitsuneScene.basicKitsuneFur) && !InCollection(furColor, KitsuneScene.elderKitsuneColors))
        //    kitsuneCounter--;
        if (this.skinType > ENUM.SkinType.SKIN_TYPE_FUR) kitsuneCounter -= this.skinType // -2 sor scales, -3 for goo
        //If the character has abnormal legs, -1
        if (this.lowerBody != ENUM.LowerBodyType.LOWER_BODY_TYPE_HUMAN && this.lowerBody != ENUM.LowerBodyType.LOWER_BODY_TYPE_FOX) kitsuneCounter--
        //If the character has a nonhuman face, -1
        if (this.faceType != ENUM.FaceType.FACE_HUMAN && this.faceType != ENUM.FaceType.FACE_FOX) kitsuneCounter--
        //If the character has ears other than fox ears, -1
        if (this.earType != ENUM.EarType.EARS_FOX) kitsuneCounter--
        //If the character has tail(s) other than fox tails, -1
        if (this.tailType != ENUM.TailType.TAIL_TYPE_FOX) kitsuneCounter--

        return kitsuneCounter
    }

    //Determine Dragon Rating
    dragonScore() {
        var dragonCounter = 0
        if (this.faceType == ENUM.FaceType.FACE_DRAGON) dragonCounter++
        if (this.earType == ENUM.EarType.EARS_DRAGON) dragonCounter++
        if (this.tailType == ENUM.TailType.TAIL_TYPE_DRACONIC) dragonCounter++
        if (this.tongueType == ENUM.TongueType.TONGUE_DRACONIC) dragonCounter++
        if (this.countCocksOfType(ENUM.CockType.DRAGON) > 0) dragonCounter++
        if (this.wingType == ENUM.WingType.WING_TYPE_DRACONIC_SMALL || this.wingType == ENUM.WingType.WING_TYPE_DRACONIC_LARGE) dragonCounter++
        if (this.lowerBody == ENUM.LowerBodyType.LOWER_BODY_TYPE_DRAGON) dragonCounter++
        if (this.horns > 0 && (this.hornType == ENUM.HornType.HORNS_DRACONIC_X2 || this.hornType == ENUM.HornType.HORNS_DRACONIC_X4_12_INCH_LONG)) dragonCounter++
        if (this.skinType == ENUM.SkinType.SKIN_TYPE_SCALES && dragonCounter > 0) dragonCounter++
        if (this.hornType == ENUM.HornType.HORNS_DRACONIC_X4_12_INCH_LONG || this.hornType == ENUM.HornType.HORNS_DRACONIC_X2) dragonCounter++
        if (this.findPerk(PerkLib.Dragonfire) >= 0) dragonCounter++
        return dragonCounter
    }

    //Goblinscore
    goblinScore() {
        var horseCounter = 0
        if (this.earType == ENUM.EarType.EARS_ELFIN) horseCounter++
        if (this.skinTone == "pale yellow" || this.skinTone == "grayish-blue" || this.skinTone == "green" || this.skinTone == "dark green") horseCounter++
        if (horseCounter > 0) {
            if (this.faceType == ENUM.FaceType.FACE_HUMAN) horseCounter++
            if (this.tallness < 48) horseCounter++
            if (this.hasVagina()) horseCounter++
            if (this.lowerBody == ENUM.LowerBodyType.LOWER_BODY_TYPE_HUMAN) horseCounter++
        }
        return horseCounter
    }

    //Gooscore
    gooScore() {
        var gooCounter = 0
        if (this.hairType == ENUM.HairType.HAIR_GOO) gooCounter++
        if (this.skinAdj == "slimy") gooCounter++
        if (this.lowerBody == 8) gooCounter++
        if (this.vaginalCapacity() > 9000) gooCounter++
        if (this.findStatusEffect(StatusEffects.SlimeCraving) >= 0) gooCounter++
        return gooCounter
    }

    //Nagascore
    nagaScore() {
        var nagaCounter = 0
        if (this.faceType == ENUM.FaceType.FACE_SNAKE_FANGS) nagaCounter++
        if (this.tongueType == ENUM.TongueType.TONGUE_SNAKE) nagaCounter++
        if (nagaCounter > 0 && this.antennae == 0) nagaCounter++
        if (nagaCounter > 0 && this.wingType == 0) nagaCounter++
        return nagaCounter
    }

    //Bunnyscore
    bunnyScore() {
        var bunnyCounter = 0
        if (this.faceType == ENUM.FaceType.FACE_BUNNY) bunnyCounter++
        if (this.tailType == ENUM.TailType.TAIL_TYPE_RABBIT) bunnyCounter++
        if (this.earType == ENUM.EarType.EARS_BUNNY) bunnyCounter++
        if (this.lowerBody == ENUM.LowerBodyType.LOWER_BODY_TYPE_BUNNY) bunnyCounter++
        //More than 2 balls reduces bunny score
        if (this.balls > 2 && bunnyCounter > 0) bunnyCounter--
        //Human skin on bunmorph adds
        if (this.skinType == ENUM.SkinType.SKIN_TYPE_PLAIN && bunnyCounter > 1) bunnyCounter++
        //No wings and antennae a plus
        if (bunnyCounter > 0 && this.antennae == 0) bunnyCounter++
        if (bunnyCounter > 0 && this.wingType == 0) bunnyCounter++
        return bunnyCounter
    }

    //Harpyscore
    harpyScore() {
        var harpy = 0
        if (this.armType == ENUM.ArmType.ARM_TYPE_HARPY) harpy++
        if (this.hairType == ENUM.HairType.HAIR_FEATHER) harpy++
        if (this.wingType == ENUM.WingType.WING_TYPE_FEATHERED_LARGE) harpy++
        if (this.tailType == ENUM.TailType.TAIL_TYPE_HARPY) harpy++
        if (this.lowerBody == ENUM.LowerBodyType.LOWER_BODY_TYPE_HARPY) harpy++
        if (harpy >= 2 && this.faceType == ENUM.FaceType.FACE_HUMAN) harpy++
        if (harpy >= 2 && (this.earType == ENUM.EarType.EARS_HUMAN || this.earType == ENUM.EarType.EARS_ELFIN)) harpy++
        return harpy
    }

    //Kangascore
    kangaScore() {
        var kanga = 0
        if (this.countCocksOfType(ENUM.CockType.KANGAROO) > 0) kanga++
        if (this.earType == ENUM.EarType.EARS_KANGAROO) kanga++
        if (this.tailType == ENUM.TailType.TAIL_TYPE_KANGAROO) kanga++
        if (this.lowerBody == ENUM.LowerBodyType.LOWER_BODY_TYPE_KANGAROO) kanga++
        if (this.faceType == ENUM.FaceType.FACE_KANGAROO) kanga++
        if (kanga >= 2 && this.skinType == ENUM.SkinType.SKIN_TYPE_FUR) kanga++
        return kanga
    }

    //sharkscore
    sharkScore() {
        var sharkCounter = 0
        if (this.faceType == ENUM.FaceType.FACE_SHARK_TEETH) sharkCounter++
        if (this.wingType == ENUM.WingType.WING_TYPE_SHARK_FIN) sharkCounter++
        if (this.tailType == ENUM.TailType.TAIL_TYPE_SHARK) sharkCounter++
        if (this.skinType == ENUM.SkinType.SKIN_TYPE_PLAIN && (this.skinTone == "rough gray" || this.skinTone == "orange and black striped")) sharkCounter++
        return sharkCounter
    }

    //Determine Mutant Rating
    mutantScore() {
        var mutantCounter = 0
        if (this.faceType > ENUM.FaceType.FACE_HUMAN) mutantCounter++
        if (this.skinType > ENUM.SkinType.SKIN_TYPE_PLAIN) mutantCounter++
        if (this.tailType > ENUM.TailType.TAIL_TYPE_NONE) mutantCounter++
        if (this.cockTotal() > 1) mutantCounter++
        if (this.hasCock() && this.hasVagina()) mutantCounter++
        if (this.hasFuckableNipples()) mutantCounter++
        if (this.breastRows.length > 1) mutantCounter++
        if (this.faceType == ENUM.FaceType.FACE_HORSE) {
            if (this.skinType == ENUM.SkinType.SKIN_TYPE_FUR) mutantCounter--
            if (this.tailType == ENUM.TailType.TAIL_TYPE_HORSE) mutantCounter--
        }
        if (this.faceType == ENUM.FaceType.FACE_DOG) {
            if (this.skinType == ENUM.SkinType.SKIN_TYPE_FUR) mutantCounter--
            if (this.tailType == ENUM.TailType.TAIL_TYPE_DOG) mutantCounter--
        }
        if (this.faceType == ENUM.FaceType.FACE_CAT) {
            if (this.skinType == ENUM.SkinType.SKIN_TYPE_FUR) mutantCounter--
            if (this.tailType == ENUM.TailType.TAIL_TYPE_CAT) mutantCounter--
        }
        return mutantCounter--
    }

    //Mod-added
    sirenScore() {
        var sirenCounter = 0
        if (this.faceType == ENUM.FaceType.FACE_SHARK_TEETH && this.tailType == ENUM.TailType.TAIL_TYPE_SHARK && this.wingType == ENUM.WingType.WING_TYPE_FEATHERED_LARGE && this.armType == ENUM.ArmType.ARM_TYPE_HARPY) sirenCounter += 4
        if (this.hasVagina() && sirenCounter > 0) sirenCounter++
        if (this.hasCock() && this.countCocksOfType(ENUM.CockType.ANEMONE) > 0 && sirenCounter > 0) sirenCounter++
        return sirenCounter++
    }

    pigScore() {
        var pigCounter = 0
        if (this.earType == ENUM.EarType.EARS_PIG) pigCounter++
        if (this.tailType == ENUM.TailType.TAIL_TYPE_PIG) pigCounter++
        if (this.faceType == ENUM.FaceType.FACE_PIG || ENUM.FaceType.FACE_BOAR) pigCounter++
        if (this.lowerBody == ENUM.LowerBodyType.LOWER_BODY_TYPE_CLOVEN_HOOFED) pigCounter += 2
        if (this.countCocksOfType(ENUM.CockType.PIG) > 0) pigCounter++
        return pigCounter
    }

    satyrScore() {
        var satyrCounter = 0
        if (this.lowerBody == ENUM.LowerBodyType.LOWER_BODY_TYPE_HOOFED) satyrCounter++
        if (this.tailType == ENUM.TailType.TAIL_TYPE_GOAT) satyrCounter++
        if (satyrCounter >= 2) {
            if (this.earType == ENUM.EarType.EARS_ELFIN) satyrCounter++
            if (this.faceType == ENUM.FaceType.FACE_HUMAN) satyrCounter++
            if (this.countCocksOfType(ENUM.CockType.HUMAN) > 0) satyrCounter++
            if (this.balls > 0 && this.ballSize >= 3) satyrCounter++
        }
        return satyrCounter
    }

    rhinoScore() {
        var rhinoCounter = 0
        if (this.earType == ENUM.EarType.EARS_RHINO) rhinoCounter++
        if (this.tailType == ENUM.TailType.TAIL_TYPE_RHINO) rhinoCounter++
        if (this.faceType == ENUM.FaceType.FACE_RHINO) rhinoCounter++
        if (this.hornType == ENUM.HornType.HORNS_RHINO) rhinoCounter++
        if (rhinoCounter >= 2 && this.skinTone == "gray") rhinoCounter++
        if (rhinoCounter >= 2 && this.hasCock() && this.countCocksOfType(ENUM.CockType.RHINO) > 0) rhinoCounter++
        return rhinoCounter
    }

    echidnaScore() {
        var echidnaCounter = 0
        if (this.earType == ENUM.EarType.EARS_ECHIDNA) echidnaCounter++
        if (this.tailType == ENUM.TailType.TAIL_TYPE_ECHIDNA) echidnaCounter++
        if (this.faceType == ENUM.FaceType.FACE_ECHIDNA) echidnaCounter++
        if (this.tongueType == ENUM.TongueType.TONGUE_ECHIDNA) echidnaCounter++
        if (this.lowerBody == ENUM.LowerBodyType.LOWER_BODY_TYPE_ECHIDNA) echidnaCounter++
        if (echidnaCounter >= 2 && this.skinType == ENUM.SkinType.SKIN_TYPE_FUR) echidnaCounter++
        if (echidnaCounter >= 2 && this.hasCock() && this.countCocksOfType(ENUM.CockType.ECHIDNA) > 0) echidnaCounter++
        return echidnaCounter
    }

    deerScore() {
        var deerCounter = 0
        if (this.earType == ENUM.EarType.EARS_DEER) deerCounter++
        if (this.tailType == ENUM.TailType.TAIL_TYPE_DEER) deerCounter++
        if (this.faceType == ENUM.FaceType.FACE_DEER) deerCounter++
        if (this.lowerBody == ENUM.LowerBodyType.LOWER_BODY_TYPE_CLOVEN_HOOFED || this.lowerBody == ENUM.LowerBodyType.LOWER_BODY_TYPE_DEERTAUR) deerCounter++
        if (this.hornType == ENUM.HornType.HORNS_ANTLERS && this.horns >= 4) deerCounter++
        if (deerCounter >= 2 && this.skinType == ENUM.SkinType.SKIN_TYPE_FUR) deerCounter++
        if (deerCounter >= 3 && this.countCocksOfType(ENUM.CockType.HORSE) > 0) deerCounter++
        return deerCounter
    }

    //Dragonne
    dragonneScore() {
        var dragonneCounter = 0
        if (this.faceType == ENUM.FaceType.FACE_CAT) dragonneCounter++
        if (this.earType == ENUM.EarType.EARS_CAT) dragonneCounter++
        if (this.tailType == ENUM.TailType.TAIL_TYPE_CAT) dragonneCounter++
        if (this.tongueType == ENUM.TongueType.TONGUE_DRACONIC) dragonneCounter++
        if (this.wingType == ENUM.WingType.WING_TYPE_DRACONIC_LARGE || this.wingType == ENUM.WingType.WING_TYPE_DRACONIC_SMALL) dragonneCounter++
        if (this.lowerBody == ENUM.LowerBodyType.LOWER_BODY_TYPE_CAT) dragonneCounter++
        if (this.skinType == 2 && dragonneCounter > 0) dragonneCounter++
        return dragonneCounter
    }

    //Manticore
    manticoreScore() {
        var catCounter = 0
        if (this.faceType == ENUM.FaceType.FACE_CAT) catCounter++
        if (this.earType == ENUM.EarType.EARS_CAT) catCounter++
        if (this.tailType == ENUM.TailType.TAIL_TYPE_SCORPION) catCounter += 2
        if (this.lowerBody == ENUM.LowerBodyType.LOWER_BODY_TYPE_CAT) catCounter++
        if (catCounter >= 4) {
            if (this.hornType == ENUM.HornType.HORNS_DEMON || this.hornType == ENUM.HornType.HORNS_DRACONIC_X2 || this.hornType == ENUM.HornType.HORNS_DRACONIC_X4_12_INCH_LONG) catCounter++
            if (this.wingType == ENUM.WingType.WING_TYPE_BAT_LIKE_TINY || this.wingType == ENUM.WingType.WING_TYPE_DRACONIC_SMALL) catCounter++
            if (this.wingType == ENUM.WingType.WING_TYPE_BAT_LIKE_LARGE || this.wingType == ENUM.WingType.WING_TYPE_DRACONIC_LARGE) catCounter += 2
        }
        //Fur only counts if some canine features are present
        if (this.skinType == 1 && catCounter >= 6) catCounter++
        return catCounter
    }

    //APPEARANCE
    bodyType() {
        var desc = ""
        //OLD STUFF
        //SUPAH THIN
        if (this.thickness < 10) {
            //SUPAH BUFF
            if (this.tone > 90) desc += "a lithe body covered in highly visible muscles"
            else if (this.tone > 75) desc += "an incredibly thin, well-muscled frame"
            else if (this.tone > 50) desc += "a very thin body that has a good bit of muscle definition"
            else if (this.tone > 25) desc += "a lithe body and only a little bit of muscle definition"
            else desc += "a waif-thin body, and soft, forgiving flesh"
        }
        //Pretty thin
        else if (this.thickness < 25) {
            if (this.tone > 90) desc += "a thin body and incredible muscle definition"
            else if (this.tone > 75) desc += "a narrow frame that shows off your muscles"
            else if (this.tone > 50) desc += "a somewhat lithe body and a fair amount of definition"
            else if (this.tone > 25) desc += "a narrow, soft body that still manages to show off a few muscles"
            else desc += "a thin, soft body"
        }
        //Somewhat thin
        else if (this.thickness < 40) {
            if (this.tone > 90) desc += "a fit, somewhat thin body and rippling muscles all over"
            else if (this.tone > 75) desc += "a thinner-than-average frame and great muscle definition"
            else if (this.tone > 50) desc += "a somewhat narrow body and a decent amount of visible muscle"
            else if (this.tone > 25) desc += "a moderately thin body, soft curves, and only a little bit of muscle"
            else desc += "a fairly thin form and soft, cuddle-able flesh"
        }
        //average
        else if (this.thickness < 60) {
            if (this.tone > 90) desc += "average thickness and a bevy of perfectly defined muscles"
            else if (this.tone > 75) desc += "an average-sized frame and great musculature"
            else if (this.tone > 50) desc += "a normal waistline and decently visible muscles"
            else if (this.tone > 25) desc += "an average body and soft, unremarkable flesh"
            else desc += "an average frame and soft, untoned flesh with a tendency for jiggle"
        } else if (this.thickness < 75) {
            if (this.tone > 90) desc += "a somewhat thick body that's covered in slabs of muscle"
            else if (this.tone > 75) desc += "a body that's a little bit wide and has some highly-visible muscles"
            else if (this.tone > 50) desc += "a solid build that displays a decent amount of muscle"
            else if (this.tone > 25) desc += "a slightly wide frame that displays your curves and has hints of muscle underneath"
            else desc += "a soft, plush body with plenty of jiggle"
        } else if (this.thickness < 90) {
            if (this.tone > 90) desc += "a thickset frame that gives you the appearance of a wall of muscle"
            else if (this.tone > 75) desc += "a burly form and plenty of muscle definition"
            else if (this.tone > 50) desc += "a solid, thick frame and a decent amount of muscles"
            else if (this.tone > 25) desc += "a wide-set body, some soft, forgiving flesh, and a hint of muscle underneath it"
            else {
                desc += "a wide, cushiony body"
                if (this.gender >= 2 || this.biggestTitSize() > 3 || this.hipRating > 7 || this.buttRating > 7) desc += " and plenty of jiggle on your curves"
            }
        }
        //Chunky monkey
        else {
            if (this.tone > 90) desc += "an extremely thickset frame and so much muscle others would find you harder to move than a huge boulder"
            else if (this.tone > 75) desc += "a very wide body and enough muscle to make you look like a tank"
            else if (this.tone > 50) desc += "an extremely substantial frame packing a decent amount of muscle"
            else if (this.tone > 25) {
                desc += "a very wide body"
                if (this.gender >= 2 || this.biggestTitSize() > 4 || this.hipRating > 10 || this.buttRating > 10) desc += ", lots of curvy jiggles,"
                desc += " and hints of muscle underneath"
            } else {
                desc += "a thick"
                if (this.gender >= 2 || this.biggestTitSize() > 4 || this.hipRating > 10 || this.buttRating > 10) desc += ", voluptuous"
                desc += " body and plush, "
                if (this.gender >= 2 || this.biggestTitSize() > 4 || this.hipRating > 10 || this.buttRating > 10) desc += " jiggly curves"
                else desc += " soft flesh"
            }
        }
        return desc
    }

    lengthChange(amount: number, ncocks: number) {
        if (amount < 0 && liveData.hyperHappy) {
            // Early return for hyper-happy cheat if the call was *supposed* to shrink a cock.
            return
        }
        //Display the degree of length change.
        if (amount <= 1 && amount > 0) {
            if (this.cocks.length == 1) GUI.outputText("Your " + this.cockDescript(0) + " has grown slightly longer.")
            if (this.cocks.length > 1) {
                if (ncocks == 1) GUI.outputText("One of your " + this.multiCockDescriptLight() + " grows slightly longer.")
                if (ncocks > 1 && ncocks < this.cocks.length) GUI.outputText("Some of your " + this.multiCockDescriptLight() + " grow slightly longer.")
                if (ncocks == this.cocks.length) GUI.outputText("Your " + this.multiCockDescriptLight() + " seem to fill up... growing a little bit larger.")
            }
        }
        if (amount > 1 && amount < 3) {
            if (this.cocks.length == 1) GUI.outputText("A very pleasurable feeling spreads from your groin as your " + this.cockDescript(0) + " grows permanently longer - at least an inch - and leaks pre-cum from the pleasure of the change.")
            if (this.cocks.length > 1) {
                if (ncocks == this.cocks.length)
                    GUI.outputText("A very pleasurable feeling spreads from your groin as your " + this.multiCockDescriptLight() + " grow permanently longer - at least an inch - and leak plenty of pre-cum from the pleasure of the change.")
                if (ncocks == 1)
                    GUI.outputText("A very pleasurable feeling spreads from your groin as one of your " + this.multiCockDescriptLight() + " grows permanently longer, by at least an inch, and leaks plenty of pre-cum from the pleasure of the change.")
                if (ncocks > 1 && ncocks < this.cocks.length)
                    GUI.outputText(
                        "A very pleasurable feeling spreads from your groin as " +
                            UTIL.num2Text(ncocks) +
                            " of your " +
                            this.multiCockDescriptLight() +
                            " grow permanently longer, by at least an inch, and leak plenty of pre-cum from the pleasure of the change."
                    )
            }
        }
        if (amount >= 3) {
            if (this.cocks.length == 1) GUI.outputText("Your " + this.cockDescript(0) + " feels incredibly tight as a few more inches of length seem to pour out from your crotch.")
            if (this.cocks.length > 1) {
                if (ncocks == 1) GUI.outputText("Your " + this.multiCockDescriptLight() + " feel incredibly tight as one of their number begins to grow inch after inch of length.")
                if (ncocks > 1 && ncocks < this.cocks.length) GUI.outputText("Your " + this.multiCockDescriptLight() + " feel incredibly number as " + UTIL.num2Text(ncocks) + " of them begin to grow inch after inch of added length.")
                if (ncocks == this.cocks.length) GUI.outputText("Your " + this.multiCockDescriptLight() + " feel incredibly tight as inch after inch of length pour out from your groin.")
            }
        }
        //Display LengthChange
        if (amount > 0) {
            if (this.cocks[0].cockLength >= 8 && this.cocks[0].cockLength - amount < 8) {
                if (this.cocks.length == 1) GUI.outputText("  <b>Most men would be overly proud to have a tool as long as yours.</b>")
                if (this.cocks.length > 1) GUI.outputText("  <b>Most men would be overly proud to have one cock as long as yours, let alone " + this.multiCockDescript() + ".</b>")
            }
            if (this.cocks[0].cockLength >= 12 && this.cocks[0].cockLength - amount < 12) {
                if (this.cocks.length == 1) GUI.outputText("  <b>Your " + this.cockDescript(0) + " is so long it nearly swings to your knee at its full length.</b>")
                if (this.cocks.length > 1) GUI.outputText("  <b>Your " + this.multiCockDescriptLight() + " are so long they nearly reach your knees when at full length.</b>")
            }
            if (this.cocks[0].cockLength >= 16 && this.cocks[0].cockLength - amount < 16) {
                if (this.cocks.length == 1) GUI.outputText("  <b>Your " + this.cockDescript(0) + " would look more at home on a large horse than you.</b>")
                if (this.cocks.length > 1) GUI.outputText("  <b>Your " + this.multiCockDescriptLight() + " would look more at home on a large horse than on your body.</b>")
                if (this.biggestTitSize() >= ENUM.BreastSizeType.BREAST_CUP_C) {
                    if (this.cocks.length == 1) GUI.outputText("  You could easily stuff your " + this.cockDescript(0) + " between your breasts and give yourself the titty-fuck of a lifetime.")
                    if (this.cocks.length > 1) GUI.outputText("  They reach so far up your chest it would be easy to stuff a few cocks between your breasts and give yourself the titty-fuck of a lifetime.")
                } else {
                    if (this.cocks.length == 1) GUI.outputText("  Your " + this.cockDescript(0) + " is so long it easily reaches your chest.  The possibility of autofellatio is now a foregone conclusion.")
                    if (this.cocks.length > 1) GUI.outputText("  Your " + this.multiCockDescriptLight() + " are so long they easily reach your chest.  Autofellatio would be about as hard as looking down.")
                }
            }
            if (this.cocks[0].cockLength >= 20 && this.cocks[0].cockLength - amount < 20) {
                if (this.cocks.length == 1)
                    GUI.outputText("  <b>As if the pulsing heat of your " + this.cockDescript(0) + " wasn't enough, the tip of your " + this.cockDescript(0) + " keeps poking its way into your view every time you get hard.</b>")
                if (this.cocks.length > 1)
                    GUI.outputText(
                        "  <b>As if the pulsing heat of your " +
                            this.multiCockDescriptLight() +
                            " wasn't bad enough, every time you get hard, the tips of your " +
                            this.multiCockDescriptLight() +
                            " wave before you, obscuring the lower portions of your vision.</b>"
                    )
                if (this.cor > 40 && this.cor <= 60) {
                    if (this.cocks.length > 1) GUI.outputText("  You wonder if there is a demon or beast out there that could take the full length of one of your " + this.multiCockDescriptLight() + "?")
                    if (this.cocks.length == 1) GUI.outputText("  You wonder if there is a demon or beast out there that could handle your full length.")
                }
                if (this.cor > 60 && this.cor <= 80) {
                    if (this.cocks.length > 1)
                        GUI.outputText("  You daydream about being attacked by a massive tentacle beast, its tentacles engulfing your " + this.multiCockDescriptLight() + " to their hilts, milking you dry.\n\nYou smile at the pleasant thought.")
                    if (this.cocks.length == 1)
                        GUI.outputText("  You daydream about being attacked by a massive tentacle beast, its tentacles engulfing your " + this.cockDescript(0) + " to the hilt, milking it of all your cum.\n\nYou smile at the pleasant thought.")
                }
                if (this.cor > 80) {
                    if (this.cocks.length > 1) GUI.outputText("  You find yourself fantasizing about impaling nubile young champions on your " + this.multiCockDescriptLight() + " in a year's time.")
                }
            }
        }
        //Display the degree of length loss.
        if (amount < 0 && amount >= -1) {
            if (this.cocks.length == 1) GUI.outputText("Your " + this.multiCockDescriptLight() + " has shrunk to a slightly shorter length.")
            if (this.cocks.length > 1) {
                if (ncocks == this.cocks.length) GUI.outputText("Your " + this.multiCockDescriptLight() + " have shrunk to a slightly shorter length.")
                if (ncocks > 1 && ncocks < this.cocks.length) GUI.outputText("You feel " + UTIL.num2Text(ncocks) + " of your " + this.multiCockDescriptLight() + " have shrunk to a slightly shorter length.")
                if (ncocks == 1) GUI.outputText("You feel " + UTIL.num2Text(ncocks) + " of your " + this.multiCockDescriptLight() + " has shrunk to a slightly shorter length.")
            }
        }
        if (amount < -1 && amount > -3) {
            if (this.cocks.length == 1) GUI.outputText("Your " + this.multiCockDescriptLight() + " shrinks smaller, flesh vanishing into your groin.")
            if (this.cocks.length > 1) {
                if (ncocks == this.cocks.length) GUI.outputText("Your " + this.multiCockDescriptLight() + " shrink smaller, the flesh vanishing into your groin.")
                if (ncocks == 1) GUI.outputText("You feel " + UTIL.num2Text(ncocks) + " of your " + this.multiCockDescriptLight() + " shrink smaller, the flesh vanishing into your groin.")
                if (ncocks > 1 && ncocks < this.cocks.length) GUI.outputText("You feel " + UTIL.num2Text(ncocks) + " of your " + this.multiCockDescriptLight() + " shrink smaller, the flesh vanishing into your groin.")
            }
        }
        if (amount <= -3) {
            if (this.cocks.length == 1) GUI.outputText("A large portion of your " + this.multiCockDescriptLight() + "'s length shrinks and vanishes.")
            if (this.cocks.length > 1) {
                if (ncocks == this.cocks.length) GUI.outputText("A large portion of your " + this.multiCockDescriptLight() + " receeds towards your groin, receding rapidly in length.")
                if (ncocks == 1) GUI.outputText("A single member of your " + this.multiCockDescriptLight() + " vanishes into your groin, receding rapidly in length.")
                if (ncocks > 1 && this.cocks.length > ncocks) GUI.outputText("Your " + this.multiCockDescriptLight() + " tingles as " + UTIL.num2Text(ncocks) + " of your members vanish into your groin, receding rapidly in length.")
            }
        }
    }

    //Armour Descript & Clothed or Naked!
    armorDescript(nakedText = "gear") {
        //Main Function
        var textArray = []
        var text = ""
        //if (armor != ArmorLib.NOTHING) text += armorName;
        //Join text.
        if (this.armor.equipmentName != "naked") textArray.push(this.armor.equipmentName)
        //if (upperGarment != UndergarmentLib.NOTHING) textArray.push(upperGarmentName);
        //if (lowerGarment != UndergarmentLib.NOTHING) textArray.push(lowerGarmentName);
        if (textArray.length > 0) text = UTIL.formatStringArray(textArray)
        //Naked?
        if (this.armor.equipmentName == "naked") text = nakedText
        //if (upperGarment == UndergarmentLib.NOTHING && lowerGarment == UndergarmentLib.NOTHING && armor == ArmorLib.NOTHING) text = nakedText;
        return text
    }

    clothedOrNaked(clothedText: string, nakedText = "") {
        return this.armorDescript() != "nothing" ? clothedText : nakedText
    }

    clothedOrNakedUpper(clothedText: string, nakedText = "") {
        return this.armor.equipmentName != "nothing" && this.upperGarment.equipmentName == "nothing" ? clothedText : nakedText
    }

    clothedOrNakedLower(clothedText: string, nakedText = "") {
        return this.armor.equipmentName != "nothing" && this.armor.equipmentName != "lethicite armor" && this.lowerGarment.equipmentName == "nothing" && !this.isTaur() ? clothedText : nakedText
    }

    //CLEAR STATUSES
    clearStatuses() {
        while (this.findStatusEffect(StatusEffects.Web) >= 0) {
            this.modStats(["spe", this.statusEffectValue(StatusEffects.Web, 1)])
            this.removeStatusEffect(StatusEffects.Web)
        }
        if (this.findStatusEffect(StatusEffects.Shielding) >= 0) this.removeStatusEffect(StatusEffects.Shielding)
        if (this.findStatusEffect(StatusEffects.HolliConstrict) >= 0) this.removeStatusEffect(StatusEffects.HolliConstrict)
        if (this.findStatusEffect(StatusEffects.LustStones) >= 0) this.removeStatusEffect(StatusEffects.LustStones)
        if (liveData.monster.findStatusEffect(StatusEffects.Sandstorm) >= 0) liveData.monster.removeStatusEffect(StatusEffects.Sandstorm)
        if (this.findStatusEffect(StatusEffects.Sealed) >= 0) this.removeStatusEffect(StatusEffects.Sealed)
        if (this.findStatusEffect(StatusEffects.Berzerking) >= 0) this.removeStatusEffect(StatusEffects.Berzerking)
        if (liveData.monster.findStatusEffect(StatusEffects.TailWhip) >= 0) liveData.monster.removeStatusEffect(StatusEffects.TailWhip)
        if (this.findStatusEffect(StatusEffects.UBERWEB) >= 0) this.removeStatusEffect(StatusEffects.UBERWEB)
        if (this.findStatusEffect(StatusEffects.DriderKiss) >= 0) this.removeStatusEffect(StatusEffects.DriderKiss)
        if (this.findStatusEffect(StatusEffects.WebSilence) >= 0) this.removeStatusEffect(StatusEffects.WebSilence)
        if (this.findStatusEffect(StatusEffects.GooArmorSilence) >= 0) this.removeStatusEffect(StatusEffects.GooArmorSilence)

        if (this.findStatusEffect(StatusEffects.Whispered) >= 0) this.removeStatusEffect(StatusEffects.Whispered)
        if (this.findStatusEffect(StatusEffects.AkbalSpeed) >= 0) {
            this.modStats(["spe", -this.statusEffectValue(StatusEffects.AkbalSpeed, 1)])
            this.removeStatusEffect(StatusEffects.AkbalSpeed)
        }
        if (this.findStatusEffect(StatusEffects.AmilyVenom) >= 0) {
            this.modStats(["str", this.statusEffectValue(StatusEffects.AmilyVenom, 1)])
            this.modStats(["spe", this.statusEffectValue(StatusEffects.AmilyVenom, 2)])
            this.removeStatusEffect(StatusEffects.AmilyVenom)
        }
        while (this.findStatusEffect(StatusEffects.Blind) >= 0) this.removeStatusEffect(StatusEffects.Blind)
        if (this.findStatusEffect(StatusEffects.SheilaOil) >= 0) this.removeStatusEffect(StatusEffects.SheilaOil)
        if (this.findStatusEffect(StatusEffects.TwuWuv) >= 0) {
            this.modStats(["int", this.statusEffectValue(StatusEffects.TwuWuv, 1)])
            this.removeStatusEffect(StatusEffects.TuvWuv)
        }
        if (this.findStatusEffect(StatusEffects.Bind) >= 0) this.removeStatusEffect(StatusEffects.Bind)
        if (this.findStatusEffect(StatusEffects.Venom) >= 0) {
            if (this.statusEffectValue(StatusEffects.Venom, 1) == VenomType.VENOM_TYPE_BEE) {
                this.modStats(["str", this.statusEffectValue(StatusEffects.Venom, 2)])
                this.modStats(["spe", this.statusEffectValue(StatusEffects.Venom, 3)])
            }
            this.removeStatusEffect(StatusEffects.Venom)
        }
        if (this.findStatusEffect(StatusEffects.Silence) >= 0) this.removeStatusEffect(StatusEffects.Silence)

        if (this.findStatusEffect(StatusEffects.StoneLust) >= 0) this.removeStatusEffect(StatusEffects.StoneLust)
        this.removeStatusEffect(StatusEffects.FirstAttack)
        if (this.findStatusEffect(StatusEffects.TemporaryHeat) >= 0) this.removeStatusEffect(StatusEffects.TemporaryHeat)
        if (this.findStatusEffect(StatusEffects.NoFlee) >= 0) this.removeStatusEffect(StatusEffects.NoFlee)
        if (this.findStatusEffect(StatusEffects.Poison) >= 0) this.removeStatusEffect(StatusEffects.Poison)
        if (this.findStatusEffect(StatusEffects.IsabellaStunned) >= 0) this.removeStatusEffect(StatusEffects.IsabellaStunned)
        if (this.findStatusEffect(StatusEffects.Stunned) >= 0) this.removeStatusEffect(StatusEffects.Stunned)
        if (this.findStatusEffect(StatusEffects.Confusion) >= 0) this.removeStatusEffect(StatusEffects.Confusion)
        if (this.findStatusEffect(StatusEffects.ThroatPunch) >= 0) this.removeStatusEffect(StatusEffects.ThroatPunch)
        if (this.findStatusEffect(StatusEffects.KissOfDeath) >= 0) this.removeStatusEffect(StatusEffects.KissOfDeath)
        if (this.findStatusEffect(StatusEffects.AcidSlap) >= 0) this.removeStatusEffect(StatusEffects.AcidSlap)
        if (this.findStatusEffect(StatusEffects.CalledShot) >= 0) {
            this.modStats(["spe", this.statusEffectValue(StatusEffects.CalledShot, 1)])
            this.removeStatusEffect(StatusEffects.CalledShot)
        }
        if (this.findStatusEffect(StatusEffects.DemonSeed) >= 0) this.removeStatusEffect(StatusEffects.DemonSeed)
        if (this.findStatusEffect(StatusEffects.InfestAttempted) >= 0) this.removeStatusEffect(StatusEffects.InfestAttempted)
        if (this.findStatusEffect(StatusEffects.Might) >= 0) {
            this.modStats(["str", -this.statusEffectValue(StatusEffects.Might, 1)])
            this.modStats(["tou", -this.statusEffectValue(StatusEffects.Might, 2)])
            this.removeStatusEffect(StatusEffects.Might)
        }
        if (this.findStatusEffect(StatusEffects.ChargeWeapon) >= 0) this.removeStatusEffect(StatusEffects.ChargeWeapon)
        if (this.findStatusEffect(StatusEffects.Disarmed) >= 0) {
            this.removeStatusEffect(StatusEffects.Disarmed)
        }
        if (this.findStatusEffect(StatusEffects.AnemoneVenom) >= 0) {
            this.modStats(["str", this.statusEffectValue(StatusEffects.AnemoneVenom, 1)])
            this.modStats(["spe", this.statusEffectValue(StatusEffects.AnemoneVenom, 2)])
            this.removeStatusEffect(StatusEffects.AnemoneVenom)
        }
        if (this.findStatusEffect(StatusEffects.GnollSpear) >= 0) {
            this.modStats(["spe", this.statusEffectValue(StatusEffects.AnemoneVenom, 1)])
            this.removeStatusEffect(StatusEffects.GnollSpear)
        }
        if (this.findStatusEffect(StatusEffects.BasiliskCompulsion) >= 0) this.removeStatusEffect(StatusEffects.BasiliskCompulsion)
        if (this.findStatusEffect(StatusEffects.BasiliskSlow) >= 0) {
            this.modStats(["spe", this.statusEffectValue(StatusEffects.AnemoneVenom, 1)])
            this.removeStatusEffect(StatusEffects.BasiliskSlow)
        }
        if (this.findStatusEffect(StatusEffects.GiantGrabbed) >= 0) this.removeStatusEffect(StatusEffects.GiantGrabbed)
        if (this.findStatusEffect(StatusEffects.GiantBoulder) >= 0) this.removeStatusEffect(StatusEffects.GiantBoulder)
        if (this.findStatusEffect(StatusEffects.GiantStrLoss) >= 0) {
            this.modStats(["str", this.statusEffectValue(StatusEffects.GiantStrLoss, 1)])
            this.removeStatusEffect(StatusEffects.GiantStrLoss)
        }
        if (this.findStatusEffect(StatusEffects.LizanBlowpipe) >= 0) {
            this.modStats(["str", this.statusEffectValue(StatusEffects.LizanBlowpipe, 1)])
            this.modStats(["tou", this.statusEffectValue(StatusEffects.LizanBlowpipe, 2)])
            this.modStats(["spe", this.statusEffectValue(StatusEffects.LizanBlowpipe, 3)])
            this.modStats(["sen", -this.statusEffectValue(StatusEffects.LizanBlowpipe, 4)])
            this.removeStatusEffect(StatusEffects.LizanBlowpipe)
        }
        while (this.findStatusEffect(StatusEffects.IzmaBleed) >= 0) this.removeStatusEffect(StatusEffects.IzmaBleed)
        if (this.findStatusEffect(StatusEffects.GardenerSapSpeed) >= 0) {
            this.modStats(["spe", this.statusEffectValue(StatusEffects.GardenerSapSpeed, 1)])
            this.removeStatusEffect(StatusEffects.GardenerSapSpeed)
        }
        if (this.findStatusEffect(StatusEffects.KnockedBack) >= 0) this.removeStatusEffect(StatusEffects.KnockedBack)
        if (this.findStatusEffect(StatusEffects.RemovedArmor) >= 0) this.removeStatusEffect(StatusEffects.RemovedArmor)
        if (this.findStatusEffect(StatusEffects.JCLustLevel) >= 0) this.removeStatusEffect(StatusEffects.JCLustLevel)
        if (this.findStatusEffect(StatusEffects.MirroredAttack) >= 0) this.removeStatusEffect(StatusEffects.MirroredAttack)
        if (this.findStatusEffect(StatusEffects.Tentagrappled) >= 0) this.removeStatusEffect(StatusEffects.Tentagrappled)
        if (this.findStatusEffect(StatusEffects.TentagrappleCooldown) >= 0) this.removeStatusEffect(StatusEffects.TentagrappleCooldown)
        if (this.findStatusEffect(StatusEffects.ShowerDotEffect) >= 0) this.removeStatusEffect(StatusEffects.ShowerDotEffect)
        if (this.findStatusEffect(StatusEffects.VineHealUsed) >= 0) this.removeStatusEffect(StatusEffects.VineHealUsed)
    }

    setFurColor(colorArray: string[]) {
        if (this.skinType == ENUM.SkinType.SKIN_TYPE_FUR) {
            this.furColor = colorArray[UTIL.rand(colorArray.length)]
        }
    }

    //RUT/HEAT (NYI)
    goIntoRut() {
        return false
    }

    goIntoHeat(a: boolean) {
        return false
    }

    //NUTRIENTS (NYI)
    slimeFeed() {}

    refillHunger(amount: number) {
        this.hunger += amount
        if (this.hunger > 100) this.hunger = 100
    }

    damageHunger(amount: number) {
        GUI.outputText("You take <b><font color='#daa520'>" + amount + "</font></b> hunger damage.")
        this.hunger -= amount
        if (this.hunger < 0) this.hunger = 0
    }

    //ITEMS
    getMaxSlots() {
        var slots = 3
        if (this.findPerk(PerkLib.StrongBack) >= 0) slots++
        if (this.findPerk(PerkLib.StrongBack2) >= 0) slots++
        return slots
    }

    hasItem(itype: IItem, minQuantity = -1) {
        if (minQuantity == -1) minQuantity = 1
        return this.itemCount(itype) >= minQuantity
    }

    itemCount(itype: IItem) {
        var count = 0
        for (var i = 0; i < this.itemSlots.length; i++) {
            if (this.itemSlots[i].itype == itype) count += this.itemSlots[i].quantity
        }
        return count
    }

    roomInExistingStack(itype: IItem) {
        for (var i = 0; i < 10; i++) {
            if (this.itemSlots[i].itype == itype && this.itemSlots[i].quantity != 0 && this.itemSlots[i].quantity < 5) return i
        }
        return -1
    }

    emptySlot() {
        for (var i = 0; i < this.itemSlots.length; i++) {
            if ((this.itemSlots[i].itype == undefined || this.itemSlots[i].itype == Items.NOTHING) && i < this.getMaxSlots()) return i
        }
        return -1
    }

    destroyItems(itype: IItem, numOfItemToRemove = 1) {
        for (var slotNum = 0; slotNum < this.itemSlots.length; slotNum += 1) {
            if (this.itemSlots[slotNum].itype == itype) {
                while (this.itemSlots[slotNum].quantity > 0 && numOfItemToRemove > 0) {
                    this.itemSlots[slotNum].removeOneItem()
                    numOfItemToRemove--
                }
            }
        }
        return numOfItemToRemove <= 0
    }

    //OTHERS
    corruptionTolerance() {
        return 0 //Currently returns 0.
    }

    // countCockSocks(colour) {
    countCockSocks() {
        return 0 //Currently returns 0.
    }

    changeXP(amount: number) {
        this.XP += amount
        if (this.XP < 0) this.XP = 0 //Keep from going into negative.
        if (this.XP > 9999) this.XP = 9999
        GUI.refreshStats()
    }

    changeGems(amount: number) {
        this.gems += amount
        if (this.gems < 0) this.gems = 0 //Keep from going into negative.
        if (this.gems > Number.MAX_VALUE) this.gems = Number.MAX_VALUE
        GUI.refreshStats()
    }

    //-----------
    // NEW GAME PLUS
    //-----------
    newGamePlusMod() {
        return 0
    }

    /*
        Moved from Appearance
     */

    multiCockDescript(): string {
        if (this.cocks.length < 1) {
            return "<B>Error: multiCockDescript() called with no penises present.</B>"
        }
        //Get cock counts
        let descript = ""
        let currCock = 0
        let totCock = this.cocks.length
        let dogCocks = 0
        let horseCocks = 0
        let normalCocks = 0
        let normalCockKey = 0
        let dogCockKey = 0
        let horseCockKey = 0
        let averageLength = 0
        let averageThickness = 0
        let same = true
        //For temp14 random values
        let rando = 0
        let descripted = false
        //Count cocks & Prep average totals
        while (currCock <= totCock - 1) {
            //trace("Counting cocks!");
            if (this.cocks[currCock].cockType == ENUM.CockType.HUMAN) {
                normalCocks++
                normalCockKey = currCock
            }
            if (this.cocks[currCock].cockType == ENUM.CockType.HORSE) {
                horseCocks++
                horseCockKey = currCock
            }
            if (this.cocks[currCock].cockType == ENUM.CockType.DOG) {
                dogCocks++
                dogCockKey = currCock
            }
            averageLength += this.cocks[currCock].cockLength
            averageThickness += this.cocks[currCock].cockThickness
            //If cocks are matched make sure they still are
            if (same && currCock > 0 && this.cocks[currCock].cockType != this.cocks[currCock - 1].cockType) same = false
            currCock++
        }
        //Crunch averages
        averageLength /= currCock
        averageThickness /= currCock
        //Quantity descriptors
        if (currCock == 1) {
            if (dogCocks == 1) return Appearance.cockNoun(ENUM.CockType.DOG)
            if (horseCocks == 1) return Appearance.cockNoun(ENUM.CockType.HORSE)
            if (normalCocks == 1) return this.cockDescript(0)
            //Catch-all for when I add more cocks.  Let cock descript do the sorting.
            if (this.cocks.length == 1) return this.cockDescript(0)
        }
        if (currCock == 2) {
            //For cocks that are the same
            if (same) {
                descript += UTIL.randomChoice("a pair of ", "two ", "a brace of ", "matching ", "twin ")
                descript += this.cockAdjectives(averageLength, averageThickness, this.cocks[0].cockType)
                if (normalCocks == 2) descript += " " + Appearance.cockNoun(ENUM.CockType.HUMAN) + "s"
                if (horseCocks == 2) descript += ", " + Appearance.cockNoun(ENUM.CockType.HORSE) + "s"
                if (dogCocks == 2) descript += ", " + Appearance.cockNoun(ENUM.CockType.DOG) + "s"
                //Tentacles
                if (this.cocks[0].cockType > 2) descript += ", " + Appearance.cockNoun(this.cocks[0].cockType) + "s"
            }
            //Nonidentical
            else {
                descript += UTIL.randomChoice("a pair of ", "two ", "a brace of ")
                descript += this.cockAdjectives(averageLength, averageThickness, this.cocks[0].cockType) + ", "
                descript += UTIL.randomChoice("mutated cocks", "mutated dicks", "mixed cocks", "mismatched dicks")
            }
        }
        if (currCock == 3) {
            //For samecocks
            if (same) {
                descript += UTIL.randomChoice("three ", "a group of ", "a <i>ménage à trois</i> of ", "a triad of ", "a triumvirate of ")
                descript += this.cockAdjectives(averageLength, averageThickness, this.cocks[currCock - 1].cockType)
                if (normalCocks == 3) descript += " " + Appearance.cockNoun(ENUM.CockType.HUMAN) + "s"
                if (horseCocks == 3) descript += ", " + Appearance.cockNoun(ENUM.CockType.HORSE) + "s"
                if (dogCocks == 3) descript += ", " + Appearance.cockNoun(ENUM.CockType.DOG) + "s"
                //Tentacles
                if (this.cocks[0].cockType > 2) descript += ", " + Appearance.cockNoun(this.cocks[0].cockType) + "s" // Not sure what's going on here, referencing index *may* be a bug.
            } else {
                descript += UTIL.randomChoice("three ", "a group of ")
                descript += this.cockAdjectives(averageLength, averageThickness, this.cocks[0].cockType)
                descript += UTIL.randomChoice(", mutated cocks", ", mutated dicks", ", mixed cocks", ", mismatched dicks")
            }
        }
        //Large numbers of cocks!
        if (currCock > 3) {
            descript += UTIL.randomChoice("a bundle of ", "an obscene group of ", "a cluster of ", "a wriggling group of ")
            //Cock adjectives and nouns
            descripted = false
            //If same types...
            if (same) {
                if (this.cocks[0].cockType == ENUM.CockType.HUMAN) {
                    descript += this.cockAdjectives(averageLength, averageThickness, ENUM.CockType.HUMAN) + " "
                    descript += Appearance.cockNoun(ENUM.CockType.HUMAN) + "s"
                    descripted = true
                }
                if (this.cocks[0].cockType == ENUM.CockType.DOG) {
                    descript += this.cockAdjectives(averageLength, averageThickness, ENUM.CockType.DOG) + ", "
                    descript += Appearance.cockNoun(ENUM.CockType.DOG) + "s"
                    descripted = true
                }
                if (this.cocks[0].cockType == ENUM.CockType.HORSE) {
                    descript += this.cockAdjectives(averageLength, averageThickness, ENUM.CockType.HORSE) + ", "
                    descript += Appearance.cockNoun(ENUM.CockType.HORSE) + "s"
                    descripted = true
                }
                //TODO More group cock type descriptions!
                if (this.cocks[0].cockType > 2) {
                    descript += this.cockAdjectives(averageLength, averageThickness, ENUM.CockType.HUMAN) + ", "
                    descript += Appearance.cockNoun(this.cocks[0].cockType) + "s"
                    descripted = true
                }
            }
            //If mixed
            if (!descripted) {
                descript += this.cockAdjectives(averageLength, averageThickness, this.cocks[0].cockType) + ", "
                rando = UTIL.rand(4)
                descript += UTIL.randomChoice("mutated cocks", "mutated dicks", "mixed cocks", "mismatched dicks")
            }
        }
        return descript
    }

    //Cock adjectives for single cock
    cockAdjectives(i_cockLength: number, i_cockThickness: number, i_cockType: ENUM.CockType): string {
        let description = ""
        let rando = 0
        let descripts = 0
        //length or thickness, usually length.
        if (UTIL.rand(4) == 0) {
            if (i_cockLength < 3) {
                rando = UTIL.rand(3)
                if (rando == 0) description = "little"
                else if (rando == 1) description = "toy-sized"
                else description = "tiny"
            } else if (i_cockLength < 5) {
                if (UTIL.rand(2) == 0) description = "short"
                else description = "small"
            } else if (i_cockLength < 7) {
                if (UTIL.rand(2) == 0) description = "fair-sized"
                else description = "nice"
            } else if (i_cockLength < 9) {
                rando = UTIL.rand(3)
                if (rando == 0) description = "long"
                else if (rando == 1) description = "lengthy"
                else if (rando == 2) description = "sizable"
            } else if (i_cockLength < 13) {
                if (UTIL.rand(2) == 0) description = "huge"
                else description = "foot-long"
            } else if (i_cockLength < 18) {
                if (UTIL.rand(2) == 0) description = "massive"
                else description = "forearm-length"
            } else if (i_cockLength < 30) {
                if (UTIL.rand(2) == 0) description = "enormous"
                else description = "monster-length"
            } else {
                rando = UTIL.rand(3)
                if (rando == 0) description = "towering"
                else if (rando == 1) description = "freakish"
                else description = "massive"
            }
            descripts = 1
        }
        //thickness go!
        else if (UTIL.rand(4) == 0 && descripts == 0) {
            if (i_cockThickness <= 0.75) description += "narrow"
            else if (i_cockThickness <= 1.1) description += "nice"
            else if (i_cockThickness <= 1.4) {
                if (UTIL.rand(2) == 0) description += "ample"
                else description += "big"
            } else if (i_cockThickness <= 2) {
                if (UTIL.rand(2) == 0) description += "broad"
                else description += "girthy"
            } else if (i_cockThickness <= 3.5) {
                if (UTIL.rand(2) == 0) description += "fat"
                else description += "distended"
            } else {
                if (UTIL.rand(2) == 0) description += "inhumanly distended"
                else description += "monstrously thick"
            }
            descripts = 1
        }
        //Length/Thickness done.  Moving on to special animal characters/lust stuff.
        /*Animal Fillers - turned off due to duplication in noun segment
        else if (type == 1 && descripts == 0 && UTIL.rand(2) == 0) {
        if (UTIL.rand(2) == 0) descript += "flared ";
        else descript += "musky ";
        }
        else if (type == 2 && descripts == 0 && UTIL.rand(2) == 0) {
        descript += "musky ";
        }*/
        //FINAL FALLBACKS - lust descriptors
        //Lust stuff
        else if (this.lust > 90) {
            //lots of cum? drippy.
            if (this.cumQ() > 50 && this.cumQ() < 200 && UTIL.rand(2) == 0) {
                //for hroses and dogs
                // TODO: fix below to original logic when able to reliably target horses and dogs
                // if (i_cockType.Group == "animal") description += "animal-pre leaking"
                // else description += "pre-slickened"
                description += "pre-slickened"
                descripts = 1
            }
            //Tons of cum
            if (this.cumQ() >= 200 && UTIL.rand(2) == 0) {
                //for horses and dogs
                // TODO: fix below to original logic when able to reliably target horses and dogs
                // if (i_cockType.Group == "animal") description += "animal-spunk dripping"
                // else description += "cum-drooling"
                description += "cum-drooling"
                descripts = 1
            }
            //Not descripted? Pulsing and twitching
            if (descripts == 0) {
                if (UTIL.rand(2) == 0) description += "throbbing"
                else description += "pulsating"
                descripts = 1
            }
        }
        //A little less lusty, but still lusty.
        else if (this.lust > 75) {
            if (descripts == 0 && this.cumQ() > 50 && this.cumQ() < 200 && UTIL.rand(2) == 0) {
                description += "pre-leaking"
                descripts = 1
            }
            if (descripts == 0 && this.cumQ() >= 200 && UTIL.rand(2) == 0) {
                description += "pre-cum dripping"
                descripts = 1
            }
            if (descripts == 0) {
                if (UTIL.rand(2) == 0) description += "rock-hard"
                else description += "eager"
                descripts = 1
            }
        }
        //Not lusty at all, fallback adjective
        else if (this.lust > 50) description += "hard"
        else description += "ready"
        return description
    }

    assholeOrPussy(): string {
        if (this.hasVagina()) return this.vaginaDescript(0)
        return this.assholeDescript()
    }

    increaseCock(index: number, amount: number): number {
        return this.cocks[index].increaseCock(amount)
    }
}

export { Spell, Player }
