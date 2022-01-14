import { liveData } from "../../globalVariables";
import { FLAG } from "../../flags/dataFlags";
import { Data } from "../../engine/saves";
import { PerkLib } from "../../perkLib";
Data.addToGameFlags(FLAG.MARBLE_MET, FLAG.MARBLE_ADDICTION, FLAG.MARBLE_AFFECTION, FLAG.MARBLE_WARNING, FLAG.NO_MORE_MARBLE, FLAG.MARBLE_RAPE_ATTEMPTED, FLAG.MURBLE_FARM_TALK_LEVELS);
class MarbleScene {
    static marbleStatusChange(affection, addiction, isAddicted) {
        if (isAddicted == undefined)
            isAddicted = -1;
        //Values only change if not brought to conclusion
        if (liveData.player.findPerk(PerkLib.MarblesMilk) < 0 && liveData.player.findPerk(PerkLib.MarbleResistant) < 0) {
            liveData.gameFlags[FLAG.MARBLE_AFFECTION] += affection;
            liveData.gameFlags[FLAG.MARBLE_ADDICTION] += addiction;
        }
        //if (isAddicted != -1) player.changeStatusValue(StatusEffects.Marble, 3, isAddicted);
    }
    static applyMarblesMilk() {
        liveData.player.slimeFeed();
        /*var str = 5;
        var tou = 10;
        //Marble's milk - effect
        //Increases player toughness by 10 and strength by 5 for several hours (suggest 12).
        if (player.findStatusEffect(StatusEffects.MarblesMilk) < 0) {
            player.createStatusEffect(StatusEffects.MarblesMilk,12,0,0,0);
            if (player.str + 5 > 100) {
                str = 100 - player.str;
                if (str < 0) str = 0;
            }
            if (player.tou + 10 > 100) {
                tou = 100 - player.tou;
                if (tou < 0) tou = 0;
            }
            dynStats("str", str,"tou", tou);
            player.changeStatusValue(StatusEffects.MarblesMilk,2,str);
            player.changeStatusValue(StatusEffects.MarblesMilk,3,tou);
        }
        else {
            player.addStatusValue(StatusEffects.MarblesMilk,1,12);
        }
        //Prevent duration from going to high.
        if (player.statusEffectv1(StatusEffects.MarblesMilk) > 36) player.changeStatusValue(StatusEffects.MarblesMilk,1,36);
        //Remove withdrawl if applicable
        if (player.findStatusEffect(StatusEffects.MarbleWithdrawl) >= 0) {
            player.removeStatusEffect(StatusEffects.MarbleWithdrawl);
            dynStats("tou", 5, "int", 5);
        }*/
        //The message for the effect wearing off varies depends on your addiction level.
        //If the player is addicted to her milk, they gain the withdrawal effect when it wears off, reducing player's inte and tou by 5
        //Gaining the effect while they are in withdrawal removes the effect.
        //The player becomes addicted when the addiction score crosses over 50 and they drink directly from Marble's teat, they remain addicted until it drops under 25.
    }
}
export { MarbleScene };
//# sourceMappingURL=marble.js.map