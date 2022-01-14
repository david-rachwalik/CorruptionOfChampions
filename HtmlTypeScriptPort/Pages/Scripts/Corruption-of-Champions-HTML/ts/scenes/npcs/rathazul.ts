import { liveData } from "../../globalVariables"
import * as ENUM from "../../appearanceEnums"
import { GUI } from "../../engine/gui"
import { UTIL } from "../../engine/utils"
import { Data } from "../../engine/saves"
import { Items } from "../../itemClass"
import { PerkLib } from "../../perkLib"
import { Inventory } from "../inventory"
import { Camp } from "../camp"
import { FLAG } from "../../flags/dataFlags"

Data.addToGameFlags(FLAG.RATHAZUL_MET, FLAG.RATHAZUL_CAMP, FLAG.RATHAZUL_PURCHASE_COUNTER, FLAG.RATHAZUL_ARMOUR_COUNTER)

abstract class RathazulScene {
    static encounterRathazul() {
        GUI.clearOutput()
        GUI.displaySprite("rathazul")
        /*if (flags[MARBLE_PURIFICATION_STAGE] == 2 && liveData.gameFlags[FLAG.RATHAZUL_MET] >= 0) {
            marblePurification.visitRathazulToPurifyMarbleAfterLaBovaStopsWorkin();
            return;
        }*/
        //Rat is definitely not sexy!
        if (liveData.player.lust > 30) liveData.player.changeLust(-10, false)
        //Introduction
        ////GUI.outputText(images.showImage("rathazul-lake"));
        if (liveData.gameFlags[FLAG.RATHAZUL_MET] > 0) {
            if (liveData.gameFlags[FLAG.RATHAZUL_CAMP] > 0)
                GUI.outputText(
                    "You walk over to Rathazul's corner of the camp. He seems as busy as usual, with his nose buried deep in some tome or alchemical creation, but he turns to face you as soon as you walk within a few paces of him.<br><br>"
                )
            else
                GUI.outputText(
                    "You spy the familiar sight of the alchemist Rathazul's camp along the lake. The elderly rat seems to be oblivious to your presence as he scurries between his equipment, but you know him well enough to bet that he is entirely aware of your presence.<br><br>"
                )
        } else {
            GUI.outputText(
                'You encounter a hunched figure working as you come around a large bush. Clothed in tattered robes that obscure most his figure, you can nontheless see a rat-like muzzle protruding from the shadowy hood that conceals most of his form. A simple glance behind him confirms your suspicions - this is some kind of rat-person. He seems oblivious to your presence as he stirs a cauldron of viscous fluid with one hand; a neat stack of beakers and phials sit in the dirt to his left. You see a smile break across his aged visage, and he says, "<i>Come closer child. I will not bite.</i>"<br><br>Apprehensive of the dangers of this unknown land, you cautiously approach.<br><br>"<i>I am Rathazul the Alchemist. Once I was famed for my miracle cures. Now I idle by this lake, helpless to do anything but measure the increasing amounts of corruption that taint its waters,</i>" he says as he pulls back his hood, revealing the entirety of his very bald and wrinkled head.<br><br>'
            )
            liveData.gameFlags[FLAG.RATHAZUL_MET] = 1
        }
        //Camp offer!
        if (liveData.gameFlags[FLAG.RATHAZUL_PURCHASE_COUNTER] >= 3 && liveData.gameFlags[FLAG.RATHAZUL_CAMP] == 0 && liveData.player.cor < 75) {
            GUI.outputText('"<i>You know, I think I might be able to do this worn-out world a lot more good from your camp than by wandering around this lake. What do you say?</i>" asks the rat.')
            GUI.outputText("<br><br>(Move Rathazul into your camp?)")
            GUI.doYesNo(this.rathazulMoveToCamp, this.rathazulMoveDecline)
            liveData.gameFlags[FLAG.RATHAZUL_CAMP] = -1 //If declined, he won't offer to move into camp. Fortunately, that won't lock you out of spider silk armour.
            return
        }
        let offered = this.rathazulWorkOffer()
        if (!offered) {
            GUI.outputText(
                'He sighs dejectedly, "<i>I am not sure what I can do for you, youngling. This world is fraught with unimaginable dangers, and you\'re just scratching the surface of them.</i>"<br><br>You nod and move on, leaving the depressed alchemist to his sadness.'
            )
            GUI.doNext(Camp.returnToCampUseOneHour)
        }
    }

    static rathazulMoveToCamp() {
        GUI.clearOutput()
        GUI.outputText(
            'Rathazul smiles happily back at you and begins packing up his equipment.  He mutters over his shoulder, "<i>It will take me a while to get my equipment moved over, but you head on back and I\'ll see you within the hour.  Oh my, yes.</i>"\n\nHe has the look of someone experiencing hope for the first time in a long time.'
        )
        liveData.gameFlags[FLAG.RATHAZUL_CAMP] = 1
        GUI.doNext(Camp.returnToCampUseOneHour)
    }

    static rathazulMoveDecline() {
        GUI.clearOutput()
        GUI.outputText('Rathazul wheezes out a sigh, and nods.\n\n"<i>Perhaps I\'ll still be of some use out here after all,</i>" he mutters as he packs up his camp and prepares to head to another spot along the lake.')
        GUI.doNext(Camp.returnToCampUseOneHour)
    }

    static campRathazul() {
        GUI.clearOutput()
        GUI.displaySprite("rathazul")
        /*if (flags[MARBLE_PURIFICATION_STAGE] == 2 && liveData.gameFlags[FLAG.RATHAZUL_MET] > 0) {
            marblePurification.visitRathazulToPurifyMarbleAfterLaBovaStopsWorkin();
            return;
        }*/
        /*if (flags[RATHAZUL_SILK_ARMOR_COUNTDOWN] == 1 && flags[UNKNOWN_FLAG_NUMBER_00275] > 0) {
            this.collectRathazulArmor();
            return;
        }*/
        //Special rathazul/follower scenes scenes.
        /*if (UTIL.rand(6) == 0 && flags[RATHAZUL_CAMP_INTERACTION_COUNTDOWN] == 0) {
            flags[RATHAZUL_CAMP_INTERACTION_COUNTDOWN] = 3;
            //Pure jojo
            if (flags[JOJO_RATHAZUL_INTERACTION_COUNTER] == 0 && liveData.player.findStatusAffect(StatusAffects.PureCampJojo) >= 0 && flags[kFLAGS.JOJO_DEAD_OR_GONE] == 0) {
                finter.jojoOffersRathazulMeditation();
                return;
            }
            if (flags[kFLAGS.AMILY_MET_RATHAZUL] == 0 && flags[kFLAGS.AMILY_FOLLOWER] == 1 && amilyScene.amilyFollower()) {
                finter.AmilyIntroducesSelfToRathazul();
                return;
            }
            if (flags[kFLAGS.AMILY_MET_RATHAZUL] == 1 && flags[kFLAGS.AMILY_FOLLOWER] == 1 && amilyScene.amilyFollower()) {
                finter.amilyIngredientDelivery();
                return;
            }
            if (flags[kFLAGS.AMILY_MET_RATHAZUL] == 2 && flags[kFLAGS.AMILY_FOLLOWER] == 1 && amilyScene.amilyFollower()) {
                finter.amilyAsksAboutRathazulsVillage();
                return;
            }
        }*/
        //Rat is definitely not sexy!
        if (liveData.player.lust > 50) liveData.player.changeLust(-((liveData.player.lust - 50) / 5), false)
        //Introduction
        //GUI.outputText(images.showImage("rathazul-camp"));
        GUI.outputText(
            'Rathazul looks up from his equipment and gives you an uncertain smile.<br><br>"<i>Oh, don\'t mind me,</i>" he says, "<i>I\'m just running some tests here. Was there something you needed, ' + liveData.player.name + '?</i>"<br><br>'
        )
        //liveData.player.createStatusAffect(StatusAffects.metRathazul,0,0,0,0);
        let offered = this.rathazulWorkOffer()
        if (!offered) {
            GUI.outputText("He sighs dejectedly, \"<i>I don't think there is. Why don't you leave me be for a time, and I will see if I can find something to aid you.</i>\"")
            if (liveData.gameFlags[FLAG.RATHAZUL_CAMP] > 0) GUI.doNext(Camp.campFollowersMenu)
            else GUI.doNext(liveData.playerMenu)
        }
    }

    static returnToRathazulMenu() {
        if (liveData.gameFlags[FLAG.RATHAZUL_CAMP] > 0) this.campRathazul()
        else this.encounterRathazul()
    }

    static rathazulWorkOffer() {
        let totalOffers = 0
        let showArmorMenu = false
        let purify = false
        let debimbo = false
        let reductos = false
        let lethiciteDefense = false
        let dyes = false
        /*if (flags[RATHAZUL_SILK_ARMOR_COUNTDOWN] == 1 && flags[UNKNOWN_FLAG_NUMBER_00275] > 0) {
            this.collectRathazulArmor();
            return true;
        }
        if (flags[MINERVA_PURIFICATION_RATHAZUL_TALKED] == 1 && flags[MINERVA_PURIFICATION_PROGRESS] < 10) {
            this.purificationByRathazulBegin();
            return true;
        }*/
        if (liveData.player.hasItem(Items.Consumables.BlackEgg) || liveData.player.hasItem(Items.Consumables.LargeBlackEgg)) {
            liveData.gameFlags[9999] = 1 //PC_KNOWS_ABOUT_BLACK_EGGS
            GUI.outputText(
                'He eyes the onyx egg in your inventory and offers a little advice. "<i>Be careful with black eggs. They can turn your skin to living latex or rubber. The smaller ones are usually safer, but everyone reacts differently. I\'d get rid of them, if you want my opinion.</i>"<br><br>'
            )
        }
        //Item crafting offer
        if (liveData.player.hasItem(Items.Materials.GreenGel)) {
            //Gel
            if (liveData.gameFlags[FLAG.RATHAZUL_ARMOUR_COUNTER] == 0)
                GUI.outputText(
                    "He pipes up with a bit of hope in his voice, \"<i>I can smell the essence of the tainted lake-slimes you've defeated, and if you'd let me, I could turn it into something a bit more useful to you. You see, the slimes are filled with the tainted essence of the world-mother herself, and once the taint is burned away, the remaining substance remains very flexible but becomes nearly impossible to cut through. With the gel of five defeated slimes I could craft you a durable suit of armor.</i>\"<br>"
                )
            else GUI.outputText('He pipes up with a bit of excitement in his voice, "<i>With just five pieces of slime-gel I could make another suit of armor...</i>"<br>')
            if (liveData.player.hasItem(Items.Materials.GreenGel, 5)) {
                GUI.outputText("<br>")
                showArmorMenu = true
                totalOffers++
            } else {
                GUI.outputText("You realize you're still a bit short of gel.<br><br>")
            }
        }
        if (liveData.player.hasItem(Items.Materials.BeeChitin)) {
            //Chitin
            GUI.outputText('The elderly rat looks at you intently and offers, "<i>I see you\'ve gathered a piece of chitin from the giant bees of the forests. If you bring me five pieces I could probably craft it into some tough armor.</i>"<br>')
            if (liveData.player.hasItem(Items.Materials.BeeChitin, 5)) {
                GUI.outputText("<br>")
                showArmorMenu = true
                totalOffers++
            } else {
                GUI.outputText("You realize you're still a bit short of chitin.<br><br>")
            }
        }
        /*if (liveData.player.hasItem(Items.Materials.SpiderSilk) && flags[RATHAZUL_SILK_ARMOR_COUNTDOWN] + flags[UNKNOWN_FLAG_NUMBER_00275] == 0) { //SPOIDAH
            showArmorMenu = true;
            totalOffers++;
            GUI.outputText("\"<i>Oooh, is that some webbing from a giant spider or spider-morph? Most excellent! With a little bit of alchemical treatment, it is possible I could loosen the fibers enough to weave them into something truly magnificent - armor, or even a marvelous robe,</i>\" offers this.<br><br>");
        }
        if (liveData.player.hasItem(Items.Materials.DragonScale)) { //Dragonscale
            showArmorMenu = true;
            totalOffers++;
            GUI.outputText("\"<i>Oooh, is that dragon scale? If you happen to have five of these, I can work them into armor,</i>\" Rathazul says.<br><br>");
        }*/
        //Marae bark armor
        if (liveData.player.hasKeyItem("Tentacled Bark Plates") >= 0 || liveData.player.hasKeyItem("Divine Bark Plates") >= 0) showArmorMenu = true
        //Item purification offer
        let pCounter = 0
        if (liveData.player.hasItem(Items.Consumables.IncubiDraft)) {
            pCounter++
        }
        if (liveData.player.hasItem(Items.Consumables.SuccubiMilk)) {
            pCounter++
        }
        if (liveData.player.hasItem(Items.Consumables.SuccubiDelight)) {
            pCounter++
        }
        if (liveData.player.hasItem(Items.Consumables.LaBova)) {
            pCounter++
        }
        if (liveData.player.hasItem(Items.Consumables.MinoCum)) {
            pCounter++
        }
        if (pCounter > 0) {
            if (pCounter == 1)
                GUI.outputText(
                    'The rat mentions, "<i>I see you have at least one tainted item on you... for 20 gems I could remove most of the taint, making it a good deal safer to use. Of course, who knows what kind of freakish transformations it would cause...</i>"<br><br>'
                )
            else
                GUI.outputText(
                    'The rat mentions, "<i>I see you have a number of demonic items on your person. For 20 gems I could attempt to remove the taint from one of them, rendering it a good deal safer for consumption. Of course it would not remove most of the transformative properties of the item...</i>"<br><br>'
                )
            purify = true
            totalOffers += pCounter
        }
        //Offer dyes if offering something else.
        if (liveData.player.gems >= 50) {
            GUI.outputText('Rathazul offers, "<i>Since you have enough gems to cover the cost of materials for my dyes as well, you could buy one of my dyes for your hair. ')
            if (liveData.gameFlags[FLAG.RATHAZUL_PURCHASE_COUNTER] >= 8) GUI.outputText("I should be able to make exotic-colored dyes if you're interested. ")
            GUI.outputText('Or if you want some changes to your skin, I have skin oils and body lotions. I will need 50 gems up-front.</i>"<br><br>')
            dyes = true
            totalOffers++
        }
        //Bee honey
        if (liveData.player.hasItem(Items.Consumables.BeeHoney)) {
            GUI.outputText("Rathazul offers, \"<i>If you're in need of a pure honey, I can distill the regular bee honey. You'll also need 25 gems up front.</i>\"<br><br>")
        }
        //Pro Lactaid & Taurinum
        if (liveData.gameFlags[FLAG.RATHAZUL_PURCHASE_COUNTER] >= 5) {
            GUI.outputText(
                'The rat mentions, "<i>You know, I could make something new if you\'re willing to hand over two of vials labeled "Equinum", one vial of minotaur blood and one hundred gems. Or five bottles of Lactaid and two bottles of purified LaBova along with 250 gems.</i>"<br><br>'
            )
        }
        //Reducto
        if (liveData.gameFlags[FLAG.RATHAZUL_CAMP] > 0 && liveData.gameFlags[FLAG.RATHAZUL_PURCHASE_COUNTER]) {
            GUI.outputText(
                "The rat hurries over to his supplies and produces a container of paste, looking rather proud of himself, \"<i>Good news everyone! I've developed a paste you could use to shrink down any, ah, oversized body parts. The materials are expensive though, so I'll need "
            )
            //GUI.outputText(liveData.gameFlags[AMILY_MET_RATHAZUL] >= 2 ? "50" : 100);
            GUI.outputText('100 gems for each jar of ointment you want.</i>"<br><br>')
            reductos = true
            totalOffers++
        }

        //Vines
        /*if (player.keyItemv1("Marae's Lethicite") > 0 && player.findStatusAffect(StatusAffects.DefenseCanopy) < 0 && liveData.gameFlags[FLAG.RATHAZUL_CAMP] > 0) {
            GUI.outputText("His eyes widen in something approaching shock when he sees the Lethicite crystal you took from Marae.  Rathazul stammers, \"<i>By the goddess... that's the largest piece of lethicite I've ever seen.  I don't know how you got it, but there is immense power in those crystals.  If you like, I know a way we could use its power to grow a canopy of thorny vines that would hide the camp and keep away imps.  Growing such a defense would use a third of that lethicite's power.</i>\"<br><br>");
            totalOffers++;
            lethiciteDefense = growLethiciteDefense;
        }*/
        if (liveData.gameFlags[FLAG.RATHAZUL_CAMP] > 0) {
            /*if (flags[RATHAZUL_DEBIMBO_OFFERED] == 0 && (sophieBimbo.bimboSophie() || player.findPerk(PerkLib.BroBrains) >= 0 || player.findPerk(PerkLib.BimboBrains) >= 0 || player.findPerk(PerkLib.FutaFaculties) >= 0)) {
                this.rathazulDebimboOffer();
                return true;
            }
            else if (flags[RATHAZUL_DEBIMBO_OFFERED] > 0) {
                GUI.outputText("You recall that Rathazul is willing to make something to cure bimbo liqueur for 250 gems and five Scholar's Teas.");
                if (player.hasItem(consumables.SMART_T,5) && player.gems >= 250) {
                    totalOffers++;
                    debimbo = 1;
                }
                else if (!player.hasItem(consumables.SMART_T,5)) GUI.outputText("  You should probably find some if you want that...");
                else GUI.outputText("  You need more gems to afford that, though.");
                GUI.outputText("<br><br>");
            }
            //Purification potion for Minerva
            if (flags[MINERVA_PURIFICATION_RATHAZUL_TALKED] == 2 && flags[MINERVA_PURIFICATION_PROGRESS] < 10 && player.hasKeyItem("Rathazul's Purity Potion") < 0) {
                GUI.outputText("The rodent alchemist suddenly looks at you in a questioning manner. \"<i>Have you had any luck finding those items? I need pure honey and at least two samples of other purifiers; your friend’s spring may grow the items you need.</i>\"");
                GUI.outputText("<br><br>");
            }*/
            if (liveData.player.hasItem(Items.Consumables.Lactaid, 5) && liveData.player.hasItem(Items.Consumables.PureLaBova, 2)) {
                GUI.outputText('The rodent sniffs your possessions. "<i>You know, I could make something with five bottles of Lactaid and two bottles of purified LaBova. I\'ll also need 250 gems.</i>"')
                GUI.outputText("<br><br>")
            }
        }
        if (totalOffers == 0) {
            GUI.doNext(Camp.returnToCampUseOneHour)
            return true
        }
        if (totalOffers > 0) {
            GUI.outputText("Will you take him up on an offer or leave?")
            //In camp has no time passage if left.
            GUI.menu()
            if (showArmorMenu) GUI.addButton(0, "Armor", this.rathazulArmorMenu, null, null, null, "Ask Rathazul to make an armour for you.")
            if (dyes) {
                GUI.addButton(1, "Buy Dye", this.buyDyes, null, null, null, "Ask him to make a dye for you. <br><br>Cost: 50 Gems.")
                GUI.addButton(2, "Buy Oil", this.buyOils, null, null, null, "Ask him to make a skin oil for you. <br><br>Cost: 50 Gems.")
                GUI.addButton(3, "Buy Lotion", this.buyLotions, null, null, null, "Ask him to make a body lotion for you. <br><br>Cost: 50 Gems.")
            }
            if (purify) GUI.addButton(4, "Purify", this.purifySomething, null, null, null, "Ask him to purify any tainted potions. <br><br>Cost: 20 Gems.")

            /*if (debimbo) GUI.addButton(5, "Debimbo", this.makeADeBimboDraft, null, null, null, "Ask Rathazul to make a debimbofying potion for you. <br><br>Cost: 250 Gems <br>Needs 5 Scholar Teas.");
            if (player.hasItem(Items.Consumables.BeeHoney)) GUI.addButton(6, Items.Consumables.PureHoney.shortName, this.rathazulMakesPureHoney, null, null, null, "Ask him to distill a vial of bee honey into a pure honey. <br><br>Cost: 25 Gems <br>Needs 1 vial of Bee Honey");
            if (liveData.gameFlags[FLAG.RATHAZUL_PURCHASE_COUNTER] >= 5) GUI.addButton(7, "ProLactaid", this.rathazulMakesMilkPotion, null, null, null, "Ask him to brew a special lactation potion. <br><br>Cost: 250 Gems <br>Needs 5 Lactaids and 2 Purified LaBovas.");
            if (liveData.gameFlags[FLAG.RATHAZUL_PURCHASE_COUNTER] >= 5) GUI.addButton(8, "Taurinum", this.rathazulMakesTaurPotion, null, null, null, "Ask him to brew a special potion that could aid in becoming a centaur. <br><br>Cost: 100 Gems <br>Needs 2 Equinum and 1 Minotaur Blood.");
            if (reductos) GUI.addButton(9, "Reducto", reductos);

            if (lethiciteDefense != null) GUI.addButton(10, "Lethicite", lethiciteDefense, null, null, null, "Ask him if he can make use of that lethicite you've obtained from Marae.");
            if (player.hasItem(Items.Consumables.PureHoney, 1) && player.hasItem(Items.Consumables.CalmMint, 1) && player.hasItem(Items.Consumables.PurePeach, 1) && player.hasKeyItem("Rathazul's Purity Potion") < 0 &&(flags[MINERVA_PURIFICATION_RATHAZUL_TALKED] == 2 && flags[MINERVA_PURIFICATION_PROGRESS] < 10)) {
                GUI.addButton(11, "Pure Potion", rathazulMakesPurifyPotion, null, null, null, "Ask him to brew a purification potion for Minerva.");
            }*/

            if (liveData.gameFlags[FLAG.RATHAZUL_CAMP] > 0) GUI.addButton(14, "Leave", Camp.campFollowersMenu)
            else GUI.addButton(14, "Leave", Camp.returnToCampUseOneHour)
            return true
        }
        return false
    }

    //------------
    // ARMOUR
    //------------
    static rathazulArmorMenu() {
        GUI.clearOutput()
        GUI.outputText("Which armor project would you like to pursue with Rathazul?")
        GUI.menu()
        if (liveData.player.hasItem(Items.Materials.GreenGel, 5)) {
            GUI.addButton(0, "GelArmor", this.craftOozeArmor)
        }
        if (liveData.player.hasItem(Items.Materials.BeeChitin, 5)) {
            GUI.addButton(1, "BeeArmor", this.craftCarapace)
        }
        /*if (player.hasItem(Items.Materials.SpiderSilk) && flags[RATHAZUL_SILK_ARMOR_COUNTDOWN] + flags[UNKNOWN_FLAG_NUMBER_00275] == 0) {
            GUI.addButton(2, "SpiderSilk", this.craftSilkArmor);
        }
        if (player.hasItem(Items.Materials.DragonScale, 2)) {
            GUI.addButton(3, "Dragonscale", this.craftDragonscaleArmor);
        }
        if (player.hasKeyItem("Tentacled Bark Plates") >= 0) {
            GUI.addButton(5, "T.Bark Armor", this.craftMaraeArmor, false);
        }
        if (player.hasKeyItem("Divine Bark Plates") >= 0) {
            GUI.addButton(6, "D.Bark Armor", this.craftMaraeArmor, true);
        }*/
        GUI.addButton(14, "Back", this.returnToRathazulMenu)
    }
    //Gel Armour
    static craftOozeArmor() {
        GUI.clearOutput()
        ////GUI.outputText(images.showImage("rathazul-craft-gelarmor"));
        GUI.outputText(
            "Rathazul takes the green gel from you and drops it into an empty cauldron. With speed well beyond what you'd expect from such an elderly creature, he nimbly unstops a number of vials and pours them into the cauldron. He lets the mixture come to a boil, readying a simple humanoid-shaped mold from what you had thought was piles of junk material. In no time at all, he has cast the boiling liquid into the mold, and after a few more minutes he cracks it open, revealing a suit of glistening armor.<br><br>"
        )
        liveData.player.destroyItems(Items.Materials.GreenGel, 5)
        liveData.gameFlags[FLAG.RATHAZUL_PURCHASE_COUNTER]++
        Inventory.takeItem(Items.Armor.GelArmor, this.returnToRathazulMenu)
    }
    //Chitin Armour
    static craftCarapace() {
        GUI.clearOutput()
        ////GUI.outputText(images.showImage("rathazul-craft-chitinarmor"));
        GUI.outputText('The rat takes the scales and works on his bench for an hour while you wait. Once he has finished, Ratzhul is beaming with pride, "<i>I think you\'ll be pleased. Go ahead and take a look.</i>"<br><br>He hands you the armor. ')
        GUI.outputText(
            "The plates shine and shimmer like black steel. He has used the yellow chitin to add accents and embroidery to the plates with a level of detail and craftsmanship rarely seen back home. A yellow fur neck lining has been fashioned from hairs found on the pieces. The armor includes a breastplate, shoulder guards, full arm guards, and knee high boots. You notice there are no pants. As you turn to ask him where the pants are, you see him scratching his head and hastily rustling in drawers. He mutters under his breath, \"<i>I'm sorry, I'm sorry, I got so focused on working on the pauldrons that I forgot to make any leg coverings! Here, this should look good with it, and it won't restrict your movements.</i>\" He hands you a silken loincloth" +
                liveData.player.mf("", " with stockings and garters") +
                "."
        )
        GUI.outputText('He still manages to look somewhat pleased with himself in spite of the blunder, even bragging a little bit, "<i>Let me show you the different lengths of string I used.</i>"<br><br>')
        if (liveData.player.cockTotal() > 0 && liveData.player.biggestCockArea() >= 40)
            GUI.outputText("The silken material does little to hide the bulge of your groin, if anything it looks a little lewd. Rathazul mumbles and looks away, shaking his head.<br><br>")
        if (liveData.player.biggestTitSize() >= 8) GUI.outputText("Your " + liveData.player.chestDesc() + " barely fit into the breastplate, leaving you displaying a large amount of jiggling cleavage.<br><br>")
        liveData.player.destroyItems(Items.Materials.BeeChitin, 5)
        liveData.gameFlags[FLAG.RATHAZUL_PURCHASE_COUNTER]++
        Inventory.takeItem(Items.Armor.BeeArmor, this.returnToRathazulMenu)
    }
    //Spider Silk Armour/Robes/Undergarments
    static craftSilkArmor() {
        GUI.clearOutput()
        GUI.outputText('You hand the bundled webbing to Rathazul carefully, lest you damage the elderly mouse. He gives you a bemused smile and snatches the stuff from your grasp while he mutters, "<i>I\'m not falling apart you know.</i>"<br><br>')
        //(Not enough webs:
        if (!liveData.player.hasItem(Items.Materials.SpiderSilk, 5)) {
            GUI.outputText("The rat shakes his head and hands it back to you. \"<i>This isn't enough for me to make anything with. I'll need at least five bundles of this stuff total, so you'll need to find more,</i>\" he explains.<br><br>")
            //(optional spider bonus:
            if (liveData.player.tailType == ENUM.TailType.TAIL_TYPE_SPIDER_ADBOMEN) {
                GUI.outputText(
                    'You show him your spider-like abdomen in response, offering to produce more webbing for him. Rathazul chuckles dryly, a sound that reminds you of hot wind rushing through a dead valley. "<i>Dear child, this would never do. Silk this tough can only be produced by a true-born spider. No matter how you change yourself, you\'ll always be a human at heart.</i>"<br><br>'
                )
                GUI.outputText(
                    'The old rat shakes his head and adds, "<i>Well, now that I think about it, the venom of a red widow might be able to transform you until you are a spider to the core, but I have absolutely no idea what that would do to you. If you ever try such a dangerous, reckless idea, let me know. I want to have my notebooks handy, for SCIENCE!</i>"<br><br>'
                )
            }
            if (liveData.player.hasItem(Items.Materials.T_SSILK, 2)) {
                GUI.outputText('"<i>But this should be enough for undergarments if you want,</i>" Rathazul adds.')
                GUI.doYesNo(this.commissionSilkArmorForReal, this.declineSilkArmorCommish)
                return
            }
            GUI.doNext(this.returnToRathazulMenu)
            return
        }
        GUI.outputText(
            'The rat limps over to his equipment, spider-silk in hand. With efficient, practiced motions, he runs a few tests. As he finishes, he sighs and explains, "<i>This will be harder than I thought. The webbing is highly resistant to most of my alchemic reagents. To even begin to work with such material I will need a number of rare, expensive elements. I would need 500 gems to even start such a project.</i>"<br><br>'
        )
        GUI.outputText("You can't help but sigh when he names such a sizable figure. Do you give him the 500 gems and spider-silk in order for him to create you a garment?")
        if (liveData.player.gems < 500) {
            GUI.outputText(" <b>Wait... you don't even have 500 gems. Damn.</b>")
            GUI.doNext(this.returnToRathazulMenu)
            return
        }
        //[Yes] [No]
        GUI.doYesNo(this.commissionSilkArmorForReal, this.declineSilkArmorCommish)
    }
    static commissionSilkArmorForReal() {
        GUI.clearOutput()
        GUI.outputText(
            'You sort 500 gems into a pouch and toss them to Rathazul, along with the rest of the webbing. The wizened alchemist snaps the items out of the air with lightning-fast movements and goes to work immediately. He bustles about with enormous energy, invigorated by the challenging task before him. It seems Rathazul has completely forgotten about you, but as you turn to leave, he calls out, "<i>What did you want me to make? A mage\'s robe or some nigh-impenetrable armor? Or undergarments if you want.</i>"<br><br>'
        )
        GUI.menu()
        if (liveData.player.hasItem(Items.Materials.SpiderSilk, 5)) {
            GUI.addButton(0, "Armor", this.chooseArmorOrRobes, 1, null, null, Items.Armor.SpiderSilkArmor.description)
            GUI.addButton(1, "Robes", this.chooseArmorOrRobes, 2, null, null, Items.Armor.SpiderSilkRobes.description)
        }
        GUI.addButton(2, "Bra", this.chooseArmorOrRobes, 3, null, null, Items.Undergarments.SpiderSilkBra.description)
        GUI.addButton(3, "Panties", this.chooseArmorOrRobes, 4, null, null, Items.Undergarments.SpiderSilkPanties.description)
        GUI.addButton(4, "Loincloth", this.chooseArmorOrRobes, 5, null, null, Items.Undergarments.SpiderSilkLoincloth.description)
        GUI.addButton(14, "Nevermind", this.declineSilkArmorCommish)
    }
    static declineSilkArmorCommish() {
        GUI.clearOutput()
        GUI.outputText("You take the silk back from Rathazul and let him know that you can't spend 500 gems on a project like that right now. He sighs, giving you a crestfallen look and a slight nod of his hooded muzzle.")
        GUI.doNext(this.returnToRathazulMenu)
    }
    static chooseArmorOrRobes(armorType: number) {
        if (armorType == 1 || armorType == 2) {
            //Armor or robes
            liveData.player.destroyItems(Items.Materials.SpiderSilk, 5)
        } else {
            //Undergarments
            liveData.player.destroyItems(Items.Materials.SpiderSilk, 2)
        }
        liveData.player.changeGems(-500)
        GUI.outputText("Rathazul grunts in response and goes back to work. ")
        if (liveData.gameFlags[FLAG.RATHAZUL_CAMP] > 0) GUI.outputText("You turn back to the center of your camp")
        else GUI.outputText("You head back to your camp")
        GUI.outputText(", wondering if the old rodent will actually deliver the wondrous item that he's promised you.")
        //flags[UNKNOWN_FLAG_NUMBER_00275] = armorType;
        //flags[RATHAZUL_SILK_ARMOR_COUNTDOWN] = 24;
        GUI.doNext(Camp.returnToCampUseOneHour)
    }
    static collectRathazulArmor() {
        GUI.clearOutput()
        GUI.outputText('Rathazul beams and ejaculates, "<i>Good news everyone! Your ')
        if (liveData.gameFlags[9999] == 1) GUI.outputText("armor")
        else if (liveData.gameFlags[9999] == 2) GUI.outputText("robe")
        else GUI.outputText("undergarment")
        GUI.outputText(' is finished!</i>"<br><br>')

        let itype
        switch (liveData.gameFlags[9999]) {
            case 1: //Armor
                //GUI.outputText(images.showImage("rathazul-craft-silkarmor"));
                GUI.outputText(
                    "A glittering white suit of armor sits atop a crude armor rack, reflecting the light that plays across its surface beautifully. You definitely didn't expect anything like this! It looks nearly identical to a set of light platemail, though instead of having a cold metal surface, the armor feels slightly spongy, with just a little bit of give in it.<br><br>"
                )

                GUI.outputText(
                    'While you marvel at the strange equipment, Rathazul explains, "<i>When you said you wanted armor, I realized I could skip a few of the alchemical processes used to soften material. The savings let me acquire a cheap metal set of armor to use as a base, and I molded half the armor around each piece, then removed it and created the outer, defensive layers with the rest of the webbing. Unfortunately, I didn\'t have enough silk for a solid codpiece, but I did manage to make a you thin loincloth from the leftover scraps - for modesty.</i>"<br><br>'
                )
                itype = Items.Armor.SpiderSilkArmor
                break
            case 2: //Robes
                //GUI.outputText(images.showImage("rathazul-craft-silkrobes"));
                GUI.outputText(
                    "Hanging from a small rack is a long, flowing robe. It glitters brightly in the light, the pearl-white threads seeming to shimmer and shine with every ripple the breeze blows through the soft fabric. You run your fingers over the silken garment, feeling the soft material give at your touch. There's a hood with a golden border embroidered around the edge. For now, it hangs limply down the back, but it would be easy to pull up in order to shield the wearer's eyes from harsh sunlight or rainy drizzle. The sleeves match the cowl, circled with intricate threads laid out in arcane patterns.<br><br>"
                )

                GUI.outputText(
                    "Rathazul gingerly takes down the garment and hands it to you. \"<i>Don't let the softness of the material fool you. This robe is tougher than many armors, and the spider-silk's properties may even help you in your spell-casting as well.</i>\"<br><br>"
                )
                itype = Items.Armor.SpiderSilkRobes
                break
            case 3: //Bra
                //GUI.outputText(images.showImage("rathazul-craft-silkbra"));
                GUI.outputText(
                    "On a table is a pair of white bra. It glitters brightly in the light, the pearl-white threads seeming to shimmer and shine with every ripple the breeze blows through the soft fabric. You run your fingers over the silken garment, feeling the soft material give at your touch. <br><br>"
                )

                GUI.outputText('Rathazul gingerly takes the garment and hands it to you. "<i>Don\'t let the softness of the material fool you. These bras are very durable and should be comfortable as well.</i>"<br><br>')
                itype = Items.Undergarments.SpiderSilkBra
                break
            case 4: //Panties
                //GUI.outputText(images.showImage("rathazul-craft-silkpanties"));
                GUI.outputText(
                    "On a table is a pair of white panties. It glitters brightly in the light, the pearl-white threads seeming to shimmer and shine with every ripple the breeze blows through the soft fabric. You run your fingers over the silken garment, feeling the soft material give at your touch. <br><br>"
                )

                GUI.outputText('Rathazul gingerly takes the garment and hands it to you. "<i>Don\'t let the softness of the material fool you. These panties are very durable and should be comfortable as well.</i>"<br><br>')
                itype = Items.Undergarments.SpiderSilkPanties
                break
            case 5: //Loincloth
                //GUI.outputText(images.showImage("rathazul-craft-silkloincloth"));
                GUI.outputText(
                    "On a table is a white loincloth. It glitters brightly in the light, the pearl-white threads seeming to shimmer and shine with every ripple the breeze blows through the soft fabric. You run your fingers over the silken garment, feeling the soft material give at your touch. <br><br>"
                )

                GUI.outputText('Rathazul gingerly takes the garment and hands it to you. "<i>Don\'t let the softness of the material fool you. This loincloth is very durable and should be comfortable as well.</i>"<br><br>')
                itype = Items.Undergarments.SpiderSilkLoincloth
                break
            default:
                GUI.outputText("Something bugged! Please report this bug to Kitteh6660.")
                itype = Items.Armor.SpiderSilkRobes
        }
        //Reset counters
        liveData.gameFlags[FLAG.RATHAZUL_PURCHASE_COUNTER]++
        liveData.gameFlags[9999] = 0
        liveData.gameFlags[9999] = 0
        Inventory.takeItem(itype, this.returnToRathazulMenu)
    }
    //Dragonscale Armour
    static craftDragonscaleArmor() {
        GUI.clearOutput()
        GUI.outputText('The rat looks at the sheets of dragon scales you\'re carrying and says, "<i>I could work these into armor. Or if you want, undergarments. I have the necessary supplies.</i>"')
        GUI.menu()
        if (liveData.player.hasItem(Items.Materials.DragonScale, 5)) {
            GUI.addButton(0, "Armor", this.craftDragonscaleArmorForReal, 0, null, null, Items.Armor.DragonscaleArmor.description)
            GUI.addButton(1, "Robe", this.craftDragonscaleArmorForReal, 1, null, null, Items.Armor.DragonscaleRobes.description)
        } else GUI.outputText("<br><br>You realize you're still a bit short on dragonscales for the armor but you can have undergarments made instead.")
        GUI.addButton(2, "Bra", this.craftDragonscaleArmorForReal, 2, null, null, Items.Undergarments.DragonscaleBra.description)
        GUI.addButton(3, "Thong", this.craftDragonscaleArmorForReal, 3, null, null, Items.Undergarments.DragonscaleThong.description)
        GUI.addButton(4, "Loincloth", this.craftDragonscaleArmorForReal, 4, null, null, Items.Undergarments.DragonscaleLoincloth.description)
        GUI.addButton(14, "Nevermind", this.returnToRathazulMenu)
    }
    static craftDragonscaleArmorForReal(type: number) {
        if (type == 0 || type == 1) {
            //Armor or robes
            liveData.player.destroyItems(Items.Materials.DragonScale, 5)
        } else {
            //Undergarments
            liveData.player.destroyItems(Items.Materials.DragonScale, 2)
        }
        GUI.clearOutput()
        let itype
        switch (type) {
            case 0: //Armor
                //GUI.outputText(images.showImage("rathazul-craft-dragonscalearmor"));
                GUI.outputText(
                    'The rat takes the scales and works on his bench for an hour while you wait. Once he has finished, Ratzhul is beaming with pride, "<i>I think you\'ll be pleased. Go ahead and take a look.</i>"<br><br>He hands you the armor. '
                )
                GUI.outputText(
                    'The armor is red and the breastplate has nicely decorated pauldrons to give an imposing looks. You touch the armor and feel the scaly texture. "<i>It\'s quite flexible and should offer very good protection,</i>" Rathazul says.'
                )
                itype = Items.Armor.DragonscaleArmor
                break
            case 1: //Robes
                //GUI.outputText(images.showImage("rathazul-craft-dragonscalerobes"));
                GUI.outputText(
                    'The rat takes the scales and works on his bench for an hour while you wait. Once he has finished, Ratzhul is beaming with pride, "<i>I think you\'ll be pleased. Go ahead and take a look.</i>"<br><br>He hands you the robes. '
                )
                GUI.outputText('The robe is red and appears to be textured with scales. You touch the robes and feel the scaly texture. "<i>It\'s quite flexible and should offer very good protection,</i>" Rathazul says.')
                itype = Items.Armor.DragonscaleRobes
                break
            case 2: //Bra
                //GUI.outputText(images.showImage("rathazul-craft-dragonscalebra"));
                GUI.outputText(
                    'The rat takes the scales and works on his bench for an hour while you wait. Once he has finished, Ratzhul is beaming with pride, "<i>I think you\'ll be pleased. Go ahead and take a look.</i>"<br><br>He hands you the bra. '
                )
                GUI.outputText("It's nicely textured with dragon scales. \"<i>I've used leather straps to maintain the flexibility. It should be comfortable and protective,</i>\" Rathazul says.")
                itype = Items.Undergarments.DragonscaleBra
                break
            case 3: //Thong
                //GUI.outputText(images.showImage("rathazul-craft-dragonscalethong"));
                GUI.outputText(
                    'The rat takes the scales and works on his bench for an hour while you wait. Once he has finished, Ratzhul is beaming with pride, "<i>I think you\'ll be pleased. Go ahead and take a look.</i>"<br><br>He hands you the thong. '
                )
                GUI.outputText("It's nicely textured with dragon scales. \"<i>I've used leather straps to maintain the flexibility. It should be comfortable and protective,</i>\" Rathazul says.")
                itype = Items.Undergarments.DragonscaleThone
                break
            case 4: //Loincloth
                //GUI.outputText(images.showImage("rathazul-craft-dragonscaleloincloth"));
                GUI.outputText(
                    'The rat takes the scales and works on his bench for an hour while you wait. Once he has finished, Ratzhul is beaming with pride, "<i>I think you\'ll be pleased. Go ahead and take a look.</i>"<br><br>He hands you the loincloth. '
                )
                GUI.outputText("It's nicely textured with dragon scales. \"<i>I've used leather straps to maintain the flexibility. It should be comfortable and protective,</i>\" Rathazul says.")
                itype = Items.Undergarments.DragonscaleLoincloth
                break
            default:
                GUI.outputText("Something bugged! Please report this bug to Kitteh6660.")
                itype = Items.Armor.DSCLARM
                break
        }
        liveData.gameFlags[FLAG.RATHAZUL_PURCHASE_COUNTER]++
        Inventory.takeItem(itype, this.returnToRathazulMenu)
    }
    //Marae's Bark Armour
    static craftMaraeArmor(divine) {
        GUI.clearOutput()
        if (!divine) {
            ////GUI.outputText(images.showImage("rathazul-craft-barkarmor-corrupt"));
            GUI.outputText(
                "You show him the pieces of thick bark with tentacles attached. <br><br> \"<i>My, my. That's definitely the strangest thing I've ever seen. But as you've requested, I'll make armor for you,</i>\" the old rat says. He takes the pile of bark, taking care to avoid touching the still-alive tentacles. He works on his bench for an hour while you wait. <br><br>"
            )
            GUI.outputText(
                "Once he has finished, Ratzhul is beaming with both pride and shame, \"<i>I think you'll be pleased. Go ahead and take a look. I'm not working on this type of armor again. I nearly got surprised by tentacles.</i>\"<br><br>He hands you the armor. <br><br>"
            )
            GUI.outputText("The plates are white like snow. Green tentacles grow from the shoulderpads. The armor includes a breastplate, pauldrons, full arm guards, and knee-high boots. You realize the armor is missing pants. <br><br>")
            GUI.outputText('"<i>Something wrong? Nothing to protect your modesty? Surprise!</i>" He hands you a silken loincloth')
            if (liveData.player.mf("m", "f") == "f") GUI.outputText(" with stockings and garters")
            GUI.outputText(". You thank him for the armor.<br><br>")
            if (liveData.player.cockTotal() > 0 && liveData.player.biggestCockArea() >= 40)
                GUI.outputText("The silken material does little to hide the bulge of your groin, if anything it looks a little lewd. Rathazul mumbles and looks away, shaking his head.<br><br>")
            if (liveData.player.biggestTitSize() >= 8) GUI.outputText("Your " + liveData.player.chestDesc() + " barely fit into the breastplate, leaving you displaying a large amount of jiggling cleavage.<br><br>")
            liveData.player.removeKeyItem("Tentacled Bark Plates")
            Inventory.takeItem(Items.Armor.TentacledBarkArmor, this.returnToRathazulMenu)
        } else {
            ////GUI.outputText(images.showImage("rathazul-craft-barkarmor-pure"));
            GUI.outputText(
                'You show him the pieces of glowing white thick bark attached. <br><br> "<i>My, my. I heard a voice from Marae instructing me to make the armor for you,</i>" the old rat says. He takes the pile of bark and works on his bench for an hour while you wait. <br><br>'
            )
            GUI.outputText(
                "Once he has finished, Ratzhul is beaming with both pride and shame, \"<i>I think you'll be pleased. Go ahead and take a look. I'm not working on this type of armor again. It took me many attempts to bend the bark plates to get them right.</i>\"<br><br>He hands you the armor. <br><br>"
            )
            GUI.outputText(
                "The plates are white like snow. The armor includes a breastplate, pauldrons, full arm guards, and knee-high boots. You notice there are no pants. As you turn to ask him where the pants are, you see him scratching his head and hastily rustling in drawers. He mutters under his breath, \"<i>I'm sorry, I'm sorry, I got so focused on working on the pauldrons that I forgot to make any leg coverings! Here, this should look good with it, and it won't restrict your movements.</i>\" He hands you a silken loincloth"
            )
            if (liveData.player.mf("m", "f") == "f") GUI.outputText(" with stockings and garters")
            GUI.outputText('. He still manages to look somewhat pleased with himself in spite of the blunder, even bragging a little bit, "<i>Let me show you the different lengths of string I used.</i>"<br><br>')
            if (liveData.player.cockTotal() > 0 && liveData.player.biggestCockArea() >= 40)
                GUI.outputText("The silken material does little to hide the bulge of your groin, if anything it looks a little lewd. Rathazul mumbles and looks away, shaking his head.<br><br>")
            if (liveData.player.biggestTitSize() >= 8) GUI.outputText("Your " + liveData.player.chestDesc() + " barely fit into the breastplate, leaving you displaying a large amount of jiggling cleavage.<br><br>")
            liveData.player.removeKeyItem("Divine Bark Plates")
            Inventory.takeItem(Items.Armor.DivineBarkArmor, this.returnToRathazulMenu)
        }
    }

    //------------
    // DYES/LOTIONS
    //------------
    //Hair Dyes
    static buyDyes() {
        GUI.clearOutput()
        GUI.outputText("Rathazul smiles and pulls forth several vials of colored fluids. Which type of dye would you like?")
        GUI.outputText("<br><br><b>(-50 Gems)</b>")
        liveData.player.changeGems(-50)
        GUI.menu()
        GUI.addButton(0, "Auburn", this.buyDye, Items.Consumables.HairDyeAuburn)
        GUI.addButton(1, "Black", this.buyDye, Items.Consumables.HairDyeBlack)
        GUI.addButton(2, "Blond", this.buyDye, Items.Consumables.HairDyeBlond)
        GUI.addButton(3, "Brown", this.buyDye, Items.Consumables.HairDyeBrown)
        GUI.addButton(4, "Red", this.buyDye, Items.Consumables.HairDyeRed)
        GUI.addButton(5, "White", this.buyDye, Items.Consumables.HairDyeWhite)
        GUI.addButton(6, "Gray", this.buyDye, Items.Consumables.HairDyeGray)
        if (liveData.gameFlags[FLAG.RATHAZUL_PURCHASE_COUNTER] >= 8) {
            GUI.addButton(7, "Blue", this.buyDye, Items.Consumables.HairDyeBlue)
            GUI.addButton(8, "Green", this.buyDye, Items.Consumables.HairDyeGreen)
            GUI.addButton(9, "Orange", this.buyDye, Items.Consumables.HairDyeOrange)
            GUI.addButton(10, "Purple", this.buyDye, Items.Consumables.HairDyePurple)
            GUI.addButton(11, "Pink", this.buyDye, Items.Consumables.HairDyePink)
        }
        if (liveData.gameFlags[FLAG.RATHAZUL_PURCHASE_COUNTER] >= 12) {
            GUI.addButton(12, "Rainbow", this.buyDye, Items.Consumables.HairDyeRainbow)
        }
        GUI.addButton(14, "Nevermind", this.buyDyeNevermind)
    }
    static buyDye(dye) {
        GUI.clearOutput()
        //GUI.outputText(images.showImage("rathazul-buy-dye"));
        liveData.gameFlags[FLAG.RATHAZUL_PURCHASE_COUNTER]++
        Inventory.takeItem(dye, this.returnToRathazulMenu)
    }
    static buyDyeNevermind() {
        GUI.clearOutput()
        GUI.outputText("You change your mind about the dye, and Rathazul returns your gems.")
        GUI.outputText("<br><br><b>(+50 Gems)</b>")
        liveData.player.changeGems(50)
        GUI.doNext(this.returnToRathazulMenu)
    }

    //Skin Oils
    static buyOils() {
        GUI.clearOutput()
        GUI.outputText("Rathazul smiles and pulls forth several bottles of skin oil. Which type of skin oil would you like?")
        GUI.outputText("<br><br><b>(-50 Gems)</b>")
        liveData.player.changeGems(-50)
        GUI.menu()
        GUI.addButton(0, "Dark", this.buyOil, Items.Consumables.SkinOilDark)
        GUI.addButton(1, "Ebony", this.buyOil, Items.Consumables.SkinOilEbony)
        GUI.addButton(2, "Fair", this.buyOil, Items.Consumables.SkinOilFair)
        GUI.addButton(3, "Light", this.buyOil, Items.Consumables.SkinOilLight)
        GUI.addButton(4, "Mahogany", this.buyOil, Items.Consumables.SkinOilMahogany)
        GUI.addButton(5, "Olive", this.buyOil, Items.Consumables.SkinOilOlive)
        GUI.addButton(6, "Russet", this.buyOil, Items.Consumables.SkinOilRusset)
        GUI.addButton(14, "Nevermind", this.buyOilNevermind)
    }
    static buyOil(oil) {
        GUI.clearOutput()
        //GUI.outputText(images.showImage("rathazul-buy-oil"));
        liveData.gameFlags[FLAG.RATHAZUL_PURCHASE_COUNTER]++
        Inventory.takeItem(oil, this.returnToRathazulMenu)
    }
    static buyOilNevermind() {
        GUI.clearOutput()
        GUI.outputText("You change your mind about the oil, and Rathazul returns your gems.")
        GUI.outputText("<br><br><b>(+50 Gems)</b>")
        liveData.player.changeGems(50)
        GUI.doNext(this.returnToRathazulMenu)
    }

    //Body Lotions
    static buyLotions() {
        GUI.clearOutput()
        GUI.outputText("Rathazul smiles and pulls forth several vials of body lotion. Which type of body lotion would you like?")
        GUI.outputText("<br><br><b>(-50 Gems)</b>")
        liveData.player.changeGems(-50)
        GUI.menu()
        GUI.addButton(0, "Clear", this.buyLotion, Items.Consumables.BodyLotionClear)
        GUI.addButton(1, "Rough", this.buyLotion, Items.Consumables.BodyLotionRough)
        GUI.addButton(2, "Sexy", this.buyLotion, Items.Consumables.BodyLotionSexy)
        GUI.addButton(3, "Smooth", this.buyLotion, Items.Consumables.BodyLotionSmooth)
        GUI.addButton(14, "Nevermind", this.buyLotionNevermind)
    }
    static buyLotion(lotion) {
        GUI.clearOutput()
        //GUI.outputText(images.showImage("rathazul-buy-lotion"));
        liveData.gameFlags[FLAG.RATHAZUL_PURCHASE_COUNTER]++
        Inventory.takeItem(lotion, this.returnToRathazulMenu)
    }
    static buyLotionNevermind() {
        GUI.clearOutput()
        GUI.outputText("You change your mind about the lotion, and Rathazul returns your gems.")
        GUI.outputText("<br><br><b>(+50 Gems)</b>")
        liveData.player.changeGems(50)
        GUI.doNext(this.returnToRathazulMenu)
    }

    //------------
    // PURIFICATION
    //------------
    static purifySomething() {
        GUI.clearOutput()
        GUI.outputText('Rathazul asks, "<i>What would you like me to purify?</i>"')
        GUI.menu()
        //Item purification offer
        if (liveData.player.hasItem(Items.Consumables.IncubiDraft)) {
            GUI.addButton(0, "Incubi Draft", this.purifyItem, Items.Consumables.IncubiDraft)
        }
        if (liveData.player.hasItem(Items.Consumables.SuccubiMilk)) {
            GUI.addButton(1, "Succubi Milk", this.purifyItem, Items.Consumables.SuccubiMilk)
        }
        if (liveData.player.hasItem(Items.Consumables.SuccubiDelight)) {
            GUI.addButton(2, "S. Delight", this.purifyItem, Items.Consumables.SuccubiDelight)
        }
        /*if (player.hasItem(Items.Consumables.LaBova)) {
            GUI.addButton(3, "LaBova", this.purifyItem, Items.Consumables.LaBova);
        }
        if (player.hasItem(Items.Consumables.MinotaurCum)) {
            GUI.addButton(4, "Minotaur Cum", this.purifyItem, Items.Consumables.MinotaurCum);
        }*/
        GUI.addButton(14, "Back", this.rathazulWorkOffer)
    }

    //PURIFICATION
    static purifyItem(item) {
        GUI.clearOutput()
        if (liveData.player.gems < 20) {
            GUI.outputText('Rathazul says, "<i>You do not have enough gems for that service.</i>"')
            GUI.doNext(this.returnToRathazulMenu)
            return
        }
        liveData.player.changeGems(-20)
        liveData.gameFlags[FLAG.RATHAZUL_PURCHASE_COUNTER]++
        switch (item) {
            case Items.Consumables.IncubiDraft:
                liveData.player.destroyItems(Items.Consumables.IncubiDraft, 1)
                Inventory.takeItem(Items.Consumables.IncubiDraftPurified, this.returnToRathazulMenu)
                break
            case Items.Consumables.SuccubiMilk:
                liveData.player.destroyItems(Items.Consumables.SuccubiMilk, 1)
                Inventory.takeItem(Items.Consumables.SuccubiMilkPurified, this.returnToRathazulMenu)
                break
            /*case Items.Consumables.SuccubiDelight:
                liveData.player.destroyItems(Items.Consumables.SuccubiDelight, 1);
                Inventory.takeItem(Items.Consumables.SuccubiDelightPurified, this.returnToRathazulMenu);
                break;
            case Items.Consumables.LaBova:
                liveData.player.destroyItems(Items.Consumables.LaBova, 1);
                Inventory.takeItem(Items.Consumables.LaBovaPurified, this.returnToRathazulMenu);
                break;
            case Items.Consumables.MinotaurCum:
                liveData.player.destroyItems(Items.Consumables.MinotaurCum, 1);
                Inventory.takeItem(Items.Consumables.MinotaurCumPurified, this.returnToRathazulMenu);
                break;*/
            default:
        }
    }

    //For Minerva purification.
    static purificationByRathazulBegin() {
        GUI.outputText('Hoping the rodent-morph alchemist can assist you, you waste no time in approaching him. Rathazul looks up when he sees you, raising an eye curiously. "<i>Is something the matter, ' + liveData.player.name + '?</i>"')
        GUI.outputText(
            "<br><br>You nod, and ask him if he knows anything about either killing pests or purifying the corruption from people as well as objects. At his bemused expression, you explain about Minerva and her conditions, repeating your query if he could possibly help you. Rathazul looks downcast and shakes his head."
        )
        GUI.outputText(
            '<br><br>"<i>I am afraid that I have never truly succeeded in my efforts to create a potion to purify the corrupted themselves.</i>" The rat alchemist explains sadly. "<i>The problem is there is very little, if anything, in this world that is capable of removing corruption from a consumer... But, I do have a theoretical recipe. If you can just find me some foodstuffs that would lower corruption and soothe the libido, and bring them to me, then I might be able to complete it. I can suggest pure giant bee honey as one, but I need at least two other items that can perform at least one of those effects. You said that the spring was able to keep your friend\'s corruption in check? Maybe some of the plants that grow there would be viable; bring me some samples, and a fresh dose of pure honey, and we’ll see what I can do.</i>" He proclaims, managing to shake off his old depression and sound determined.'
        )
        GUI.outputText("<br><br>With that in mind, you walk away from him; gathering the items that could cure Minerva is your responsibility.")
        liveData.gameFlags[9999] = 2 //MINERVA_PURIFICATION_RATHAZUL_TALKED
        GUI.doNext(Camp.returnToCampUseOneHour)
    }

    static rathazulMakesPurifyPotion() {
        GUI.clearOutput()
        liveData.player.destroyItems(Items.Consumables.PureHoney, 1)
        liveData.player.destroyItems(Items.Consumables.CalmMint, 1)
        liveData.player.destroyItems(Items.Consumables.PurePeach, 1)
        GUI.outputText(
            "You hurry over to Rathazul, and tell him you have the items you think he needs. His eyes widen in shock as you show them to him, and he immediately snatches them from you without a word, hurrying over to his alchemical equipment. You watch, uncertain of what he’s doing, as he messes around with it, but within minutes he has produced a strange-looking potion that he brings back to you."
        )
        GUI.outputText('<br><br>"<i>Have her swallow this, and it should kill the parasite within her at the very least.</i>"')
        GUI.outputText("<br><br>You take it gratefully, but can't help asking what he means by 'should'.")
        GUI.outputText('<br><br>Rathazul shrugs helplessly. "<i>This formula is untested; its effects are unpredictable... But, surely it cannot make things worse?</i>"')
        GUI.outputText("<br><br>You concede he has a point and take the potion; all you need to do now is give it to Minerva and hope for the best.")
        liveData.player.createKeyItem("Rathazul's Purity Potion", 0, 0, 0, 0)
        GUI.menu()
        GUI.addButton(0, "Next", this.returnToRathazulMenu)
    }

    //Debimbo Draft
    static rathazulDebimboOffer() {
        GUI.clearOutput()
        if (liveData.gameFlags[9999] == 0) {
            //RATHAZUL_DEBIMBO_OFFERED
            /*if (SophieBimboScene.bimboSophie()) {
                GUI.outputText("Rathazul glances your way as you approach his lab, a thoughtful expression on his age-lined face. \"<i>Tell me, [name], do you truly enjoy having that vacuous idiot around, lusting after you at all hours of the day?</i>\" he asks, shaking his head in frustration. \"<i>She's clearly been subjected to the effects of Bimbo Liqueur, which as you can plainly see are quite indeed potent. However, like most things in Mareth, it can be countered - at least partially.</i>\" Rathazul folds his long, clawed fingers together, his tail lashing behind him as he thinks. \"<i>Perhaps with a sufficient quantity of something called Scholar's Tea... I could counter the stupefying effects of the elixir... oh my, yes... hmm...</i>\" Rathazul nods, stroking at the few long wisps of fur that hang from his chin.");
                GUI.outputText("<br><br>You await");
                if (liveData.silly) GUI.outputText(" getGoodPost()"); // C# await joke ;_; http://msdn.microsoft.com/en-gb/library/hh156528.aspx
                GUI.outputText(" further clarification, but the old rat just stands there, staring off into space. Coughing politely, you reacquire his attention, causing him to jump.");
                GUI.outputText("<br><br>\"<i>Oh? Nmm, YES, bimbos, that's right! As I was saying, five Scholar's Teas along with 250 gems for other reagents should give me all I need to create a bimbo-beating brew! Oh my, the alliteration! How absurd.</i>\" Rathazul chuckles slowly, wiping a drop from his eye before he looks back at you fiercely, \"<i>It is a worthwhile goal - no creature should be subjected to a reduced intellect. Let me know when you have acquired what is needed.</i>\"");
            }
            else {*/
            //Notification if the PC is the one bimbo'ed*
            if (liveData.player.findPerk(PerkLib.BimboBrains) >= 0 || liveData.player.findPerk(PerkLib.FutaFaculties) >= 0) {
                GUI.outputText(
                    '<br><br>Rathazul glances your way as you approach his lab, a thoughtful expression on his age-lined face. "<i>Tell me [name], do you truly enjoy living your life under the debilitating effects of that cursed potion? Even now the spark of intelligence has all but left from your eyes. Do you even understand what I\'m saying?</i>"'
                )
                GUI.outputText(
                    "<br><br>You twirl a lock of hair around your finger and giggle. This silly old rat thinks you're like, dumb and stuff! He just doesn't know how great it is to have a rocking body and a sex-drive that's always ready to suck and fuck. It's so much fun! You look back at the rat, realizing you haven't answered him yet, feeling a bit embarrassed as he sighs in disappointment."
                )
                GUI.outputText(
                    '<br><br>"<i>Child, please... bring me five Scholar\'s Teas and 250 gems for reagents, then I can fix you! I can help you! Just... get the tea!</i>" the alchemist pleads, counting off to five on his clawed fingers for extra emphasis while shaking his gem pouch profusely. You bite your lower lip— he seems really really mad about this or something. Maybe you should like, get the tea?'
                )
            } else if (liveData.player.findPerk(PerkLib.BroBrains) >= 0) {
                GUI.outputText(
                    '<br><br>Rathazul glances your way as you approach his lab, a thoughtful expression on his age-lined face. "<i>I see you happen to have drank a can of Bro Brew in the past. If you ever need me to restore your intelligence capabilities, bring me five scholar teas and 250 gems. Thanks Marae you\'re not a bimbo; that would have been worse.</i>"'
                )
            }
            //}
            liveData.gameFlags[9999] = 1 //RATHAZUL_DEBIMBO_OFFERED
        }
        //Rath menu
        GUI.doNext(this.returnToRathazulMenu)
    }

    static makeADeBimboDraft() {
        GUI.clearOutput()
        GUI.outputText(
            "Rathazul takes the teas and the gems into his wizened palms, shuffling the glittering jewels into a pouch and the teas into a large decanter. He promptly sets the combined brews atop a flame and shuffles over to his workbench, where he picks up numerous pouches and vials of every color and description, adding them to the mix one after the other. The mixture roils and bubbles atop the open flame like a monstrous, eerie thing, but quickly simmers down to a quiet boil. Rathazul leaves it going for a while, stirring occasionally as he pulls out a smaller vial. Once most of the excess liquid has evaporated, he pours the concoction into the glass container and corks it, holding it up to the light to check its coloration."
        )
        GUI.outputText(
            '<br><br>"<i>That <b>should</b> do,</i>" he mutters to himself. Rathazul turns, carefully handing you the mixture. "<i>This should counter the mental-inhibiting effects of the Bimbo Liqueur, but I have no idea to what extent those who imbibe it will retain of their time spent as a bimbo...</i>"<br><br>'
        )
        //Take items
        liveData.player.changeGems(-250)
        liveData.player.destroyItems(Items.Consumables.ScholarsTea, 5)
        liveData.gameFlags[FLAG.RATHAZUL_PURCHASE_COUNTER]++
        Inventory.takeItem(Items.Consumables.Debimbo, this.returnToRathazulMenu)
    }
}

export { RathazulScene }
