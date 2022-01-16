import * as ENUM from "../../appearanceEnums.js";
import { GUI } from "../../engine/gui.js";
import { UTIL } from "../../engine/utils.js";
import { liveData } from "../../globalVariables.js";
import { Inventory } from "../../scenes/inventory.js";
import { Items } from "../../itemClass.js";
class ReductoMenu {
    /**
     * Originally Created by aimozg on 11.01.14.
     */
    static cancelReducto() {
        GUI.clearOutput();
        GUI.outputText("You put the salve away.<br><br>");
        Inventory.takeItem(Items.Consumables.Reducto);
    }
    static reductoBalls() {
        GUI.clearOutput();
        GUI.outputText("You smear the foul-smelling paste onto your " + liveData.player.sackDescript() + ".  It feels cool at first but rapidly warms to an uncomfortable level of heat.\n\n");
        liveData.player.ballSize -= UTIL.rand(4) + 2;
        if (liveData.player.ballSize < 1)
            liveData.player.ballSize = 1;
        GUI.outputText("You feel your scrotum shift, shrinking down along with your " + liveData.player.ballsDescriptLight() + ".  Within a few seconds the paste has been totally absorbed and the shrinking stops.");
        liveData.player.dynStats(["lib", -2]);
        liveData.player.changeLust(-10);
        Inventory.itemGoNext();
    }
    static reductoBreasts() {
        GUI.clearOutput();
        GUI.outputText("You smear the foul-smelling ointment all over your " + liveData.player.allBreastsDescript() + ", covering them entirely as the paste begins to get absorbed into your " + liveData.player.skinDesc + ".\n");
        liveData.player.shrinkTits(true);
        if (UTIL.rand(2) == 0 && liveData.player.biggestTitSize() >= 1) {
            GUI.outputText("\nThe effects of the paste continue to manifest themselves, and your body begins to change again...");
            liveData.player.shrinkTits(true);
        }
        GUI.outputText("\nThe last of it wicks away into your skin, completing the changes.");
        liveData.player.dynStats(["sen", -2]);
        liveData.player.changeLust(-5);
        Inventory.itemGoNext();
    }
    static reductoButt() {
        GUI.clearOutput();
        GUI.outputText("You smear the foul-smelling paste onto your " + liveData.player.buttDescript() + ".  It feels cool at first but rapidly warms to an uncomfortable level of heat.\n\n");
        if (liveData.player.buttRating >= 15) {
            liveData.player.buttRating -= 3 + liveData.player.buttRating / 3;
            GUI.outputText("Within seconds you feel noticeably lighter, and a quick glance shows your ass is significantly smaller.");
        }
        else if (liveData.player.buttRating >= 10) {
            liveData.player.buttRating -= 3;
            GUI.outputText("You feel much lighter as your " + liveData.player.buttDescript() + " jiggles slightly, adjusting to its smaller size.");
        }
        else {
            liveData.player.buttRating -= UTIL.rand(3) + 1;
            if (liveData.player.buttRating < 1)
                liveData.player.buttRating = 1;
            GUI.outputText("After a few seconds your " + liveData.player.buttDescript() + " has shrunk to a much smaller size!");
        }
        liveData.player.dynStats(["lib", -2]);
        liveData.player.changeLust(-10);
        Inventory.itemGoNext();
    }
    static reductoClit() {
        GUI.clearOutput();
        GUI.outputText("You carefully apply the paste to your " + liveData.player.clitDescript() + ", being very careful to avoid getting it on your " + liveData.player.vaginaDescript(0) + ".  It burns with heat as it begins to make its effects known...\n\n");
        liveData.player.clitLength /= 1.7;
        //Set clit length down to 2 digits in length
        liveData.player.clitLength = (liveData.player.clitLength * 100) / 100;
        GUI.outputText("Your " + liveData.player.clitDescript() + " shrinks rapidly, dwindling down to almost half its old size before it finishes absorbing the paste.");
        liveData.player.dynStats(["sen", 2]);
        liveData.player.changeLust(10);
        Inventory.itemGoNext();
    }
    static reductoCock() {
        GUI.clearOutput();
        if (liveData.player.cocks[0].cockType == ENUM.CockType.BEE) {
            GUI.outputText("The gel produces an odd effect when you rub it into your " +
                liveData.player.cockDescript(0) +
                ".  It actually seems to calm the need that usually fills you.  In fact, as your " +
                liveData.player.cockDescript(0) +
                " shrinks, its skin tone changes to be more in line with yours and the bee hair that covered it falls out.  <b>You now have a human cock!</b>");
            liveData.player.cocks[0].cockType = ENUM.CockType.HUMAN;
        }
        else {
            GUI.outputText("You smear the repulsive smelling paste over your " +
                liveData.player.multiCockDescriptLight() +
                ".  It immediately begins to grow warm, almost uncomfortably so, as your " +
                liveData.player.multiCockDescriptLight() +
                " begins to shrink.\n\n");
            if (liveData.player.cocks.length == 1) {
                GUI.outputText("Your " + liveData.player.cockDescript(0) + " twitches as it shrinks, disappearing steadily into your " + (liveData.player.hasSheath() ? "sheath" : "crotch") + " until it has lost about a third of its old size.");
                liveData.player.cocks[0].cockLength *= 2 / 3;
                liveData.player.cocks[0].cockThickness *= 2 / 3;
            }
            else {
                //MULTI
                GUI.outputText("Your " + liveData.player.multiCockDescriptLight() + " twitch and shrink, each member steadily disappearing into your " + (liveData.player.hasSheath() ? "sheath" : "crotch") + " until they've lost about a third of their old size.");
                for (var i = 0; i < liveData.player.cocks.length; i++) {
                    liveData.player.cocks[i].cockLength *= 2 / 3;
                    liveData.player.cocks[i].cockThickness *= 2 / 3;
                }
            }
        }
        liveData.player.dynStats(["sen", -2]);
        liveData.player.changeLust(-10);
        Inventory.itemGoNext();
    }
    static reductoHips() {
        GUI.clearOutput();
        GUI.outputText("You smear the foul-smelling paste onto your [hips].  It feels cool at first but rapidly warms to an uncomfortable level of heat.\n\n");
        if (liveData.player.hipRating >= 15) {
            liveData.player.hipRating -= 3 + liveData.player.hipRating / 3;
            GUI.outputText("Within seconds you feel noticeably lighter, and a quick glance at your hips shows they've gotten significantly narrower.");
        }
        else if (liveData.player.hipRating >= 10) {
            liveData.player.hipRating -= 3;
            GUI.outputText("You feel much lighter as your [hips] shift slightly, adjusting to their smaller size.");
        }
        else {
            liveData.player.hipRating -= UTIL.rand(3) + 1;
            if (liveData.player.hipRating < 1)
                liveData.player.hipRating = 1;
            GUI.outputText("After a few seconds your [hips] have shrunk to a much smaller size!");
        }
        liveData.player.dynStats(["lib", -2]);
        liveData.player.changeLust(-10);
        Inventory.itemGoNext();
    }
    static reductoNipples() {
        GUI.clearOutput();
        GUI.outputText("You rub the paste evenly over your " + liveData.player.nippleDescript(0) + "s, being sure to cover them completely.\n\n");
        //Shrink
        if (liveData.player.nippleLength / 2 < 0.25) {
            GUI.outputText('Your nipples continue to shrink down until they stop at 1/4" long.');
            liveData.player.nippleLength = 0.25;
        }
        else {
            GUI.outputText("Your " + liveData.player.nippleDescript(0) + "s get smaller and smaller, stopping when they are roughly half their previous size.");
            liveData.player.nippleLength /= 2;
        }
        liveData.player.dynStats(["sen", -5]);
        liveData.player.changeLust(-5);
        Inventory.itemGoNext();
    }
    static shrinkHorns() {
        GUI.outputText("You doubt if the reducto is going to work but you apply the foul-smelling paste all over your horns anyways.\n\n");
        GUI.outputText("Incredibly, it works and you can feel your horns receding by an inch.");
        liveData.player.horns -= 1;
        Inventory.itemGoNext();
    }
}
export { ReductoMenu };
//# sourceMappingURL=reducto.js.map