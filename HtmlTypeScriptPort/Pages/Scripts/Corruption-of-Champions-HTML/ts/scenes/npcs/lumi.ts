import { liveData } from "../../globalVariables.js"
import * as ENUM from "../../appearanceEnums.js"
import { FLAG } from "../../flags/dataFlags.js"
import { UTIL } from "../../engine/utils.js"
import { GUI } from "../../engine/gui.js"
import { Data } from "../../engine/saves.js"
import { Camp } from "../camp.js"
import { IItem, Items } from "../../itemClass.js"
import { Inventory } from "../inventory.js"

Data.addToGameFlags(FLAG.LUMI_MET)

abstract class LumiScene {
    static lumiEncounter() {
        GUI.clearOutput()
        //1st time lumi meeting
        if (liveData.gameFlags[FLAG.LUMI_MET] == 0) {
            //placeholder text for outside the cathedral
            GUI.outputText(
                "You spot an anomaly in the barren wastes; a door that seems to be standing out in the middle of nowhere. Somehow, you figure that it must lead to some other part of the world, and the only reason it's here is because you can't get to where the door should be right now.<br><br>"
            )
            GUI.outputText("Do you open it?")
            GUI.doYesNo(LumiScene.lumiLabChoices, Camp.returnToCampUseOneHour)
        } else {
            //placeholder text for outside the cathedral
            GUI.outputText("You spot the door standing in the middle of nowhere again, and you guess that it will lead you back to Lumi's laboratory. It swings open easily...")
            GUI.doNext(LumiScene.lumiLabChoices)
        }
        //end of placeholder text
    }

    static lumiLabChoices() {
        GUI.displaySprite("lumi")
        GUI.clearOutput()
        //First time meeting
        if (liveData.gameFlags[FLAG.LUMI_MET] == 0) {
            //Set Lumi met flag
            liveData.gameFlags[FLAG.LUMI_MET]++
            GUI.outputText(
                "You open the door and carefully check inside for any enemies that may be trying to ambush you. The room seems to be some kind of alchemical lab, with shelves full of apparatuses all along the walls, a desk on one side of the room, and a long table across the room from you that is full of alchemical experiments in progress, many give off lots of smoke, and others are bottles of bubbling fluids. A goblin wearing an apron and some kind of headband is sitting on a tall, wheeled stool; she is otherwise nude and seems to be watching at least 3 experiments right now. She suddenly turns around and looks straight in your direction. It's hard to tell thanks to the dark goggles that hide her eyes from view, but you're fairly certain she's watching you. After a few seconds she yells \"<i>Cuths-tohmer!</i>\" in a thick lisp. She looks harmless enough, so you step inside while she fiddles with her experiments, reducing the bubbling smoke. She jumps down from her stool, tears off her apron, bounds over to the desk, and scrambles on top of it.<br><br>"
            )
            GUI.outputText(
                "She's about 3 feet tall, with yellow-green skin, and wears her orange hair in a long ponytail that reaches to her knees. Her breasts are about B cup, with average nipples that have been colored orange. All of her nails have been painted orange to match. She doesn't seem to ever stop moving, and while the majority of her face looks cute, it's a little hard to be sure while she's wearing those thick goggles. The solid black lenses of her goggles make her look quite unsettling, stifling any appeal her form could inspire in you.<br><br>"
            )
            GUI.outputText('"<i>Stho, what can Lumi, Gobin Aochomist Extwaordinaire, do fo you today?</i>" asks the unusual goblin.<br><br>')
            GUI.outputText(
                "You explain that it's a little hard to understand her. She sticks her tongue out at you, showing a VERY large stud in the middle of it, instantly explaining her lisp. Rather than pushing the point, you ask her what she can do for you. She pulls open a hatch on the top of the desk and pulls out a bottle of something and shakes it, \"<i>Lumi can sell you some of her finely cwafted poetions fo a good pwice, ore, if you've alweady got some nice poetions or reagents, Lumi can make them even bettar. But tha cost a whole lot. If you were one of dee Followers, den maybe Lumi could make a special deal wit you; but the boss don't want me playin wit outsiders. Wat will it be?</i>\"<br><br>"
            )
        }
        //Repeat Meetings
        else {
            GUI.outputText(
                "Once more, you step into Lumi's lab. She's still working on her experiments. Before you even have a chance to call out to her, she has already pivoted to watch you. In a flash her apron hits the floor and she is standing on her desk, asking, \"<i>Stho, what can Lumi the Aochomist Extwaordinaire do fo you today?</i>\""
            )
        }
        GUI.menu()
        GUI.addButton(0, "Shop", LumiScene.lumiShop)
        //if (LumiScene.lumiEnhance(true)) GUI.addButton(1, "Enhance", LumiScene.lumiEnhance); //NOT YET IMPLEMENTED
        GUI.addButtonDisabled(1, "Enhance", "This is not yet implemented.")
        GUI.addButton(4, "Leave", Camp.returnToCampUseOneHour)
    }

    static lumiShop() {
        //Set item handling to lumi shop
        GUI.clearOutput()
        GUI.outputText('You ask Lumi if you can see her potions. She smiles at you and pulls out several bottles from her desk and shows them to you.<br><br>"<i>Gawantied qwality, made by Lumi herself,</i>" she says proudly.<br><br>')
        GUI.outputText("Lust Draft - 15 gems<br>")
        GUI.outputText("Goblin Ale - 20 gems<br>")
        GUI.outputText("Oviposition Elixir - 45 gems<br>")
        //The player is given a list of choices, clicking on one gives the description and the price, like Giacomo.
        GUI.menu()
        GUI.addButton(0, Items.Consumables.LustDraft.shortName, LumiScene.lumiLustDraftPitch)
        GUI.addButton(1, Items.Consumables.GoblinAle.shortName, LumiScene.lumiPitchGobboAle)
        GUI.addButton(2, Items.Consumables.OviElixir.shortName, LumiScene.lumiPitchOviElixer)
        GUI.addButton(4, "Leave", LumiScene.lumiLabChoices)
    }

    //Lust Draft
    static lumiLustDraftPitch() {
        GUI.clearOutput()
        GUI.outputText(
            'You point at the bottle filled with bubble-gum pink fluid.<br><br>"<i>De lust dwaft? Always a favowite, with it you nevar have to worwy about not bein weady for sexy time; one of my fiwst creations. 15 gems each.</i>"<br><br>'
        )
        GUI.outputText("Will you buy the lust draft?")
        GUI.doYesNo(UTIL.createCallBackFunction(LumiScene.lumiPurchase, Items.Consumables.LustDraft), LumiScene.lumiShop)
    }
    //Goblin Ale
    static lumiPitchGobboAle() {
        GUI.clearOutput()
        GUI.outputText("You point at the flagon. \"<i>Oh? Oh thats Lumi's... actually no, dat tispsy stuff for 20 gems. You'll like if you want to be like Lumi. Do you like it?</i>\"<br><br>")
        GUI.outputText("Will you buy the goblin ale?")
        GUI.doYesNo(UTIL.createCallBackFunction(LumiScene.lumiPurchase, Items.Consumables.GoblinAle), LumiScene.lumiShop)
    }
    //Ovi Elixir
    static lumiPitchOviElixer() {
        GUI.clearOutput()
        GUI.outputText(
            'You point at the curious hexagonal bottle. "<i>De Oviposar Elixir? Made baithsed on da giant bee\'s special stuff dey give deir queen. It will help make de burfing go faster, an if you dwink it while you awen pweggy, iw will give you some eggs to burf later. More dwinks, eqwals more and biggar eggs. Lumi charges 45 gems for each dose.</i>"<br><br>'
        )
        GUI.outputText("Will you buy the Ovi Elixir?")
        GUI.doYesNo(UTIL.createCallBackFunction(LumiScene.lumiPurchase, Items.Consumables.OviElixir), LumiScene.lumiShop)
    }

    static lumiPurchase(itype: IItem) {
        GUI.clearOutput()
        //After choosing, and PC has enough gems
        var cost = 0
        if (itype == Items.Consumables.OviElixir) cost = 45
        if (itype == Items.Consumables.GoblinAle) cost = 20
        if (itype == Items.Consumables.LustDraft) cost = 15
        if (liveData.player.gems >= cost) {
            GUI.outputText("You pay Lumi the gems, and she hands you " + itype.longName + ' saying, "<i>Here ya go!</i>"<br><br>')
            liveData.player.changeGems(-cost)
            Inventory.takeItem(itype, LumiScene.lumiShop, LumiScene.lumiLabChoices)
        } else {
            //After choosing, and PC doesn't have enough gems
            GUI.outputText('You go to pay Lumi the gems, but then you realize that you don\'t have enough. Lumi seems to know what happened and tells you "<i>Ok, is dere somefing you want to buy that you can affowd?</i>"<br><br>')
            //Return to main Lumi menu
            GUI.doNext(LumiScene.lumiShop)
        }
    }

    /*LumiScene.lumiEnhance = function (justCheck) {
        if (justCheck == undefined) justCheck = false;
        var fox:Function =null;
        if (player.hasItem(consumables.FOXBERY))
            fox = lumiEnhanceFox;
        var laBova:Function =null;
        if (player.hasItem(consumables.LABOVA_))
            laBova = lumiEnhanceLaBova;
        var succuDelight:Function =null;
        if (player.hasItem(consumables.SDELITE))
            succuDelight = lumiEnhanceSDelight;
        var oviElix:Function =null;
        //if (player.hasItem(consumables.OVIELIX))
        //	oviElix = lumiEnhanceOviElix;
        var lustDraft:Function =null;
        if (player.hasItem(consumables.L_DRAFT))
            lustDraft = lumiEnhanceDraft;
        var seed:Function =null;
        if (player.hasItem(consumables.GLDSEED))
            seed = lumiEnhanceGoldenSeed;
        var kanga:Function =null;
        if (player.hasItem(consumables.KANGAFT))
            kanga = lumiEnhanceKanga;
        var kitsune:Function =null;
        if (player.hasItem(consumables.FOXJEWL))
            kitsune = lumiEnhanceFoxJewel;
        var pigTruffle:Function = null;
        if (player.hasItem(consumables.PIGTRUF))
            pigTruffle = lumiEnhancePigtailTruffle;
        var pureHoney:Function = null;
        if (player.hasItem(consumables.PURHONY))
            pureHoney = lumiEnhancePureHoney;
        if (justCheck) {
            return fox != null || kanga != null || seed != null || laBova != null || succuDelight != null || oviElix != null || lustDraft != null || kitsune != null || pigTruffle != null || pureHoney != null;
        }
        GUI.clearOutput();
        GUI.outputText("\"<i>Do you have 100 gems for de enhancement?</i>\" asks Lumi.<br><br>", false);
        //If (player has less than 100 gems)
        if (player.gems < 100) {
            GUI.outputText("You shake your head no, and Lumi gives you a disappointed look and says, \"<i>Den Lumi can do no enhancement for you. Anyfing else?</i>\"<br><br>", false);
            //Return to main Lumi menu
            GUI.doNext(lumiLabChoices);
            return false;
        }
        else {
            GUI.outputText("You nod and Lumi gives an excited yell, \"<i>Yay! Lumi loves to do enhancement, what you want to be bettar?</i>\"<br><br>", false);
            //The player chooses an item that can be enhanced from a list, regardless of which is chosen, the text for the next part is the same.
            choices(consumables.FOXBERY.shortName, fox,
                consumables.FOXJEWL.shortName, kitsune,
                consumables.GLDSEED.shortName, seed,
                consumables.KANGAFT.shortName, kanga,
                consumables.L_DRAFT.shortName, lustDraft,
                consumables.LABOVA_.shortName, laBova,
                consumables.OVIELIX.shortName, oviElix,
                consumables.SDELITE.shortName, succuDelight,
                consumables.PIGTRUF.shortName, pigTruffle,
                consumables.PURHONY.shortName, pureHoney);
            GUI.addButton(14, "Back", lumiLabChoices);
            return true;
        }
    }
    LumiScene.lumiEnhanceLaBova = function() {
        lumiEnhanceGo(consumables.LABOVA_);
    }
    LumiScene.lumiEnhanceSDelight = function() {
        lumiEnhanceGo(consumables.SDELITE);
    }
    LumiScene.lumiEnhanceOviElix = function() {
        lumiEnhanceGo(consumables.OVIELIX);
    }
    LumiScene.lumiEnhanceDraft = function() {
        lumiEnhanceGo(consumables.L_DRAFT);
    }
    LumiScene.lumiEnhanceGoldenSeed = function() {
        lumiEnhanceGo(consumables.GLDSEED);
    }
    LumiScene.lumiEnhanceKanga = function() {
        lumiEnhanceGo(consumables.KANGAFT);
    }
    LumiScene.lumiEnhanceFox = function() {
        lumiEnhanceGo(consumables.FOXBERY);
    }
    LumiScene.lumiEnhanceFoxJewel = function() {
        lumiEnhanceGo(consumables.FOXJEWL);
    }
    LumiScene.lumiEnhancePigtailTruffle = function() {
        lumiEnhanceGo(consumables.PIGTRUF);
    }
    LumiScene.lumiEnhancePureHoney = function() {
        lumiEnhanceGo(consumables.PURHONY);
    }

    LumiScene.lumiEnhanceGo(itype:ItemType):void
    {
        spriteSelect(37);
        var nextItem = ItemType.NOTHING;
        if (itype == consumables.LABOVA_) {
            nextItem = consumables.PROBOVA;
        }
        else if (itype == consumables.KANGAFT) {
            nextItem = consumables.MGHTYVG;
        }
        else if (itype == consumables.SDELITE) {
            nextItem = consumables.S_DREAM;
        }
        else if (itype == consumables.OVIELIX) {
        nextItem = consumables.OVIMAX_;
        }
        else if (itype == consumables.L_DRAFT) {
            nextItem = consumables.F_DRAFT;
        }
        else if (itype == consumables.GLDSEED) {
            nextItem = consumables.MAGSEED;
        }
        else if (itype == consumables.FOXBERY) {
            nextItem = consumables.VIXVIGR;
        }
        else if (itype == consumables.FOXJEWL) {
            nextItem = consumables.MYSTJWL;
        }
        else if (itype == consumables.PIGTRUF) {
            nextItem = consumables.BOARTRU;
        }
        else if (itype == consumables.PURHONY) {
            nextItem = consumables.SPHONEY;
        }
        player.gems -= 100;
        statScreenRefresh();
        player.consumeItem(itype);
        GUI.clearOutput();
        GUI.outputText("Lumi grabs the item from you and runs over to her table, stopping for only a second to put her apron on. ", false);
        //start list of possible enhancement texts
        temp = UTIL.rand(3);
        if (itype == consumables.GLDSEED) GUI.outputText("She fiddles with it, coating it in exotic powders before she tosses the whole mess onto a hotplate. It explodes, knocking the goblin flat on her ass. She sits bolt upright and snatches up the now-glowing seed with a gloved hand.<br><br>", false);
        else if (itype == consumables.FOXJEWL) GUI.outputText("Lumi stares wide-eyed into the fathoms of its depths. She remains like that for several moments before you clear your throat, and then hurries off to work. Flitting back and forth between the various beakers and test tubes that litter the workshop, she mixes chemicals seemingly at random, many of which bubble or explode rather violently.<br><br>After several minutes of this, she pours all of the reagents into a large beaker over an open flame. The contents boil up through the neck of the flask and drip slowly down the condenser. A ponderously large drop of black liquid builds up at the tip of the condenser, wobbling precipitously for a moment before finally falling onto the jewel with a splash.<br><br>The jewel soaks up the black fluid like a sponge, veins of sickening purple spreading across the surface like a spider's web. A few moments later, the jewel is entirely purple, the mystic flames inside glowing a bright violet.<br><br>You reach out hesitantly and place the mystically enhanced teardrop-shaped jewel into your pouch.<br><br>");
        else if (itype == consumables.KANGAFT) GUI.outputText("She fiddles with it, coating it in exotic powders before she tosses the whole mess onto a hotplate. It explodes, knocking the goblin flat on her ass. She sits bolt upright and snatches up the now-glowing fruit with a gloved hand.<br><br>", false);
        else if (temp == 0) GUI.outputText("She starts grabbing things from around the table, seemingly at random, and adds them to " + itype.longName + ". To your alarm, there is soon a large cloud of smoke coming off it! There is a strong smell to the smoke and it makes it hard to breathe. Lumi grabs a mask out of a drawer and puts it on, continuing with her work unperturbed. She suddenly stops and you wonder if she is done, but she takes off her mask and inhales deeply of the smoke, then keels over! As you go over to help her she suddenly stands up, waves away some of the smoke, and says, \"<i>All dun!</i>\"<br><br>", false);
        else if (temp == 1) GUI.outputText("Taking hold of one of the bottles that were sitting where she put the tray, she seems to think for a moment before tossing the bottle into one of the corners of the room. It shatters just behind the table, and a small puff of smoke goes up into the air. You're a little nervous about that bottle, but before you have a chance to say anything, two more bottles fly off and join it; this time causing a small explosion. You ask her what she is thinking tossing those aside, and she simply responds, \"<i>Dey were in my way.</i>\"<br><br>\"<i>What?! So you just toss things that explode to the side?</i>\"<br><br><i>\"Don worry, I'll put counter agents in dere at de end of de day. An I never throw stuff da'll do any damage. Done!</i>\"<br><br>", false);
        else if (temp == 2) GUI.outputText("She adds a few things to the tray before moving down the table. She adds some reagents to a bubbling chemical reaction, and then adds some more ingredients to that. You wonder why she just left " + itype.longName + " there to work on something else. Then Lumi moves back across the table, past where " + itype.longName + " sits, to start adding things to something else. Before you have a chance to complain, she moves back to " + itype.longName + " and continues. You decide that it's probably best not to ask about her work ethic and just let her do her thing; she has more experience than you, after all.<br><br>POP! You look over in surprise as the first thing she worked on makes a small explosion. POW! Now the second experiment has blown up! You start to move in alarm, wondering if Lumi really knows what she's doing; just before " + itype.longName + " seems to explode with an incredible BOOM. Lumi stops moving for a moment, looking straight ahead before saying, \"<i>Dat was a gud one, Lumi dun!</i>\"<br><br>", false);
        inventory.takeItem(nextItem, lumiEnhance, lumiLabChoices);
    }*/
}

export { LumiScene }
