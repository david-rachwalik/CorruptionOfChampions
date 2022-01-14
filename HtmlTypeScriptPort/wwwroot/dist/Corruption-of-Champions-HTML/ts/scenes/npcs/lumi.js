import { liveData } from "../../globalVariables";
import { FLAG } from "../../flags/dataFlags";
import { UTIL } from "../../engine/utils";
import { GUI } from "../../engine/gui";
import { Data } from "../../engine/saves";
import { Camp } from "../camp";
import { Items } from "../../itemClass";
import { Inventory } from "../inventory";
Data.addToGameFlags(FLAG.LUMI_MET);
class LumiScene {
    static lumiEncounter() {
        GUI.clearOutput();
        //1st time lumi meeting
        if (liveData.gameFlags[FLAG.LUMI_MET] == 0) {
            //placeholder text for outside the cathedral
            GUI.outputText("You spot an anomaly in the barren wastes; a door that seems to be standing out in the middle of nowhere. Somehow, you figure that it must lead to some other part of the world, and the only reason it's here is because you can't get to where the door should be right now.<br><br>");
            GUI.outputText("Do you open it?");
            GUI.doYesNo(LumiScene.lumiLabChoices, Camp.returnToCampUseOneHour);
        }
        else {
            //placeholder text for outside the cathedral
            GUI.outputText("You spot the door standing in the middle of nowhere again, and you guess that it will lead you back to Lumi's laboratory. It swings open easily...");
            GUI.doNext(LumiScene.lumiLabChoices);
        }
        //end of placeholder text
    }
    static lumiLabChoices() {
        GUI.displaySprite("lumi");
        GUI.clearOutput();
        //First time meeting
        if (liveData.gameFlags[FLAG.LUMI_MET] == 0) {
            //Set Lumi met flag
            liveData.gameFlags[FLAG.LUMI_MET]++;
            GUI.outputText("You open the door and carefully check inside for any enemies that may be trying to ambush you. The room seems to be some kind of alchemical lab, with shelves full of apparatuses all along the walls, a desk on one side of the room, and a long table across the room from you that is full of alchemical experiments in progress, many give off lots of smoke, and others are bottles of bubbling fluids. A goblin wearing an apron and some kind of headband is sitting on a tall, wheeled stool; she is otherwise nude and seems to be watching at least 3 experiments right now. She suddenly turns around and looks straight in your direction. It's hard to tell thanks to the dark goggles that hide her eyes from view, but you're fairly certain she's watching you. After a few seconds she yells \"<i>Cuths-tohmer!</i>\" in a thick lisp. She looks harmless enough, so you step inside while she fiddles with her experiments, reducing the bubbling smoke. She jumps down from her stool, tears off her apron, bounds over to the desk, and scrambles on top of it.<br><br>");
            GUI.outputText("She's about 3 feet tall, with yellow-green skin, and wears her orange hair in a long ponytail that reaches to her knees. Her breasts are about B cup, with average nipples that have been colored orange. All of her nails have been painted orange to match. She doesn't seem to ever stop moving, and while the majority of her face looks cute, it's a little hard to be sure while she's wearing those thick goggles. The solid black lenses of her goggles make her look quite unsettling, stifling any appeal her form could inspire in you.<br><br>");
            GUI.outputText('"<i>Stho, what can Lumi, Gobin Aochomist Extwaordinaire, do fo you today?</i>" asks the unusual goblin.<br><br>');
            GUI.outputText("You explain that it's a little hard to understand her. She sticks her tongue out at you, showing a VERY large stud in the middle of it, instantly explaining her lisp. Rather than pushing the point, you ask her what she can do for you. She pulls open a hatch on the top of the desk and pulls out a bottle of something and shakes it, \"<i>Lumi can sell you some of her finely cwafted poetions fo a good pwice, ore, if you've alweady got some nice poetions or reagents, Lumi can make them even bettar. But tha cost a whole lot. If you were one of dee Followers, den maybe Lumi could make a special deal wit you; but the boss don't want me playin wit outsiders. Wat will it be?</i>\"<br><br>");
        }
        //Repeat Meetings
        else {
            GUI.outputText("Once more, you step into Lumi's lab. She's still working on her experiments. Before you even have a chance to call out to her, she has already pivoted to watch you. In a flash her apron hits the floor and she is standing on her desk, asking, \"<i>Stho, what can Lumi the Aochomist Extwaordinaire do fo you today?</i>\"");
        }
        GUI.menu();
        GUI.addButton(0, "Shop", LumiScene.lumiShop);
        //if (LumiScene.lumiEnhance(true)) GUI.addButton(1, "Enhance", LumiScene.lumiEnhance); //NOT YET IMPLEMENTED
        GUI.addButtonDisabled(1, "Enhance", "This is not yet implemented.");
        GUI.addButton(4, "Leave", Camp.returnToCampUseOneHour);
    }
    static lumiShop() {
        //Set item handling to lumi shop
        GUI.clearOutput();
        GUI.outputText('You ask Lumi if you can see her potions. She smiles at you and pulls out several bottles from her desk and shows them to you.<br><br>"<i>Gawantied qwality, made by Lumi herself,</i>" she says proudly.<br><br>');
        GUI.outputText("Lust Draft - 15 gems<br>");
        GUI.outputText("Goblin Ale - 20 gems<br>");
        GUI.outputText("Oviposition Elixir - 45 gems<br>");
        //The player is given a list of choices, clicking on one gives the description and the price, like Giacomo.
        GUI.menu();
        GUI.addButton(0, Items.Consumables.LustDraft.shortName, LumiScene.lumiLustDraftPitch);
        GUI.addButton(1, Items.Consumables.GoblinAle.shortName, LumiScene.lumiPitchGobboAle);
        GUI.addButton(2, Items.Consumables.OviElixir.shortName, LumiScene.lumiPitchOviElixer);
        GUI.addButton(4, "Leave", LumiScene.lumiLabChoices);
    }
    //Lust Draft
    static lumiLustDraftPitch() {
        GUI.clearOutput();
        GUI.outputText('You point at the bottle filled with bubble-gum pink fluid.<br><br>"<i>De lust dwaft? Always a favowite, with it you nevar have to worwy about not bein weady for sexy time; one of my fiwst creations. 15 gems each.</i>"<br><br>');
        GUI.outputText("Will you buy the lust draft?");
        GUI.doYesNo(UTIL.createCallBackFunction(LumiScene.lumiPurchase, Items.Consumables.LustDraft), LumiScene.lumiShop);
    }
    //Goblin Ale
    static lumiPitchGobboAle() {
        GUI.clearOutput();
        GUI.outputText("You point at the flagon. \"<i>Oh? Oh thats Lumi's... actually no, dat tispsy stuff for 20 gems. You'll like if you want to be like Lumi. Do you like it?</i>\"<br><br>");
        GUI.outputText("Will you buy the goblin ale?");
        GUI.doYesNo(UTIL.createCallBackFunction(LumiScene.lumiPurchase, Items.Consumables.GoblinAle), LumiScene.lumiShop);
    }
    //Ovi Elixir
    static lumiPitchOviElixer() {
        GUI.clearOutput();
        GUI.outputText('You point at the curious hexagonal bottle. "<i>De Oviposar Elixir? Made baithsed on da giant bee\'s special stuff dey give deir queen. It will help make de burfing go faster, an if you dwink it while you awen pweggy, iw will give you some eggs to burf later. More dwinks, eqwals more and biggar eggs. Lumi charges 45 gems for each dose.</i>"<br><br>');
        GUI.outputText("Will you buy the Ovi Elixir?");
        GUI.doYesNo(UTIL.createCallBackFunction(LumiScene.lumiPurchase, Items.Consumables.OviElixir), LumiScene.lumiShop);
    }
    static lumiPurchase(itype) {
        GUI.clearOutput();
        //After choosing, and PC has enough gems
        var cost = 0;
        if (itype == Items.Consumables.OviElixir)
            cost = 45;
        if (itype == Items.Consumables.GoblinAle)
            cost = 20;
        if (itype == Items.Consumables.LustDraft)
            cost = 15;
        if (liveData.player.gems >= cost) {
            GUI.outputText("You pay Lumi the gems, and she hands you " + itype.longName + ' saying, "<i>Here ya go!</i>"<br><br>');
            liveData.player.changeGems(-cost);
            Inventory.takeItem(itype, LumiScene.lumiShop, LumiScene.lumiLabChoices);
        }
        else {
            //After choosing, and PC doesn't have enough gems
            GUI.outputText('You go to pay Lumi the gems, but then you realize that you don\'t have enough. Lumi seems to know what happened and tells you "<i>Ok, is dere somefing you want to buy that you can affowd?</i>"<br><br>');
            //Return to main Lumi menu
            GUI.doNext(LumiScene.lumiShop);
        }
    }
}
export { LumiScene };
//# sourceMappingURL=lumi.js.map