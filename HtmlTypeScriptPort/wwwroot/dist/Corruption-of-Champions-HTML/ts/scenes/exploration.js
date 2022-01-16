import { liveData } from "../globalVariables.js";
import * as ENUM from "../appearanceEnums.js";
import { GUI } from "../engine/gui.js";
import { Camp } from "./camp.js";
import { UTIL } from "../engine/utils.js";
import { COMBAT } from "./combat.js";
import { FLAG } from "../flags/dataFlags.js";
import { AreasMountain } from "./areas/mountain.js";
import { AreasDesert } from "./areas/desert.js";
import { AreasLake } from "./areas/lake.js";
import { AreasForest } from "./areas/forest.js";
import { GiacomoScene } from "./npcs/giacomo.js";
import { Imp } from "./monsters/imp.js";
import { Goblin } from "./monsters/goblin.js";
class AreasGenericExploration {
    static exploreMenu() {
        GUI.hideMenus();
        GUI.clearOutput();
        if (liveData.exploration.explored < 2) {
            this.tryDiscover();
            return;
        }
        GUI.outputText("You can continue to search for new locations, or explore your previously discovered locations.");
        GUI.menu();
        GUI.addButton(0, "Explore", this.tryDiscover);
        if (liveData.exploration.exploredForest > 0)
            GUI.addButton(1, "Forest", AreasForest.explore, null, null, null, "Visit the lush forest. <br><br>Recommended level: 1" + (liveData.player.level < 5 ? "<br><br>Beware of Tentacle Beasts!" : ""));
        if (liveData.exploration.exploredLake > 0)
            GUI.addButton(2, "Lake", AreasLake.explore, null, null, null, "Visit the lake and explore the beach. <br><br>Recommended level: 2");
        if (liveData.exploration.exploredDesert > 0)
            GUI.addButton(3, "Desert", AreasDesert.explore, null, null, null, "Visit the dry desert. <br><br>Recommended level: 3");
        if (liveData.exploration.exploredMountain > 0)
            GUI.addButton(4, "Mountain", AreasMountain.explore, null, null, null, "Visit the mountain. <br><br>Recommended level: 5");
        GUI.addButton(14, "Back", Camp.doCamp);
    }
    static tryDiscover() {
        GUI.clearOutput();
        GUI.doNext(Camp.returnToCampUseOneHour);
        if (liveData.exploration.explored <= 0) {
            GUI.outputText("You tentatively step away from your campsite, alert and scanning the ground and sky for danger. You walk for the better part of an hour, marking the rocks you pass for a return trip to your camp. It worries you that the portal has an opening on this side, and it was totally unguarded...<br><br>...Wait a second, why is your campsite in front of you? The portal's glow is clearly visible from inside the tall rock formation.  Looking carefully you see your footprints leaving the opposite side of your camp, then disappearing. You look back the way you came and see your markings vanish before your eyes. The implications boggle your mind as you do your best to mull over them. Distance, direction, and geography seem to have little meaning here, yet your campsite remains exactly as you left it. A few things click into place as you realize you found your way back just as you were mentally picturing the portal! Perhaps memory influences travel here, just like time, distance, and speed would in the real world!<br><br>This won't help at all with finding new places, but at least you can get back to camp quickly. You are determined to stay focused the next time you explore and learn how to traverse this gods-forsaken realm.");
            liveData.exploration.explored++;
        }
        else {
            liveData.exploration.explored++;
            //Find zones
            if (liveData.exploration.exploredForest <= 0) {
                GUI.outputText("You walk for quite some time, roaming the hard-packed and pink-tinged earth of the demon-realm. Rust-red rocks speckle the wasteland, as barren and lifeless as anywhere else you've been. A cool breeze suddenly brushes against your face, as if gracing you with its presence. You turn towards it and are confronted by the lush foliage of a very old looking forest. You smile as the plants look fairly familiar and non-threatening. Unbidden, you remember your decision to test the properties of this place, and think of your campsite as you walk forward. Reality seems to shift and blur, making you dizzy, but after a few minutes you're back, and sure you'll be able to return to the forest with similar speed.<br><br><b>You've discovered the Forest!</b>");
                liveData.exploration.exploredForest = 1;
                return;
            }
            if (liveData.exploration.exploredLake <= 0) {
                GUI.outputText("Your wanderings take you far and wide across the barren wasteland that surrounds the portal, until the smell of humidity and fresh water alerts you to the nearby lake. With a few quick strides you find a lake so massive the distant shore cannot be seen. Grass and a few sparse trees grow all around it.<br><br><b>You've discovered the Lake!</b>");
                liveData.exploration.exploredLake = 1;
                return;
            }
            if (liveData.exploration.exploredDesert <= 0 && UTIL.rand(3) == 0 && liveData.exploration.exploredLake > 0) {
                GUI.outputText("You stumble as the ground shifts a bit underneath you. Groaning in frustration, you straighten up and discover the rough feeling of sand ");
                if (liveData.player.lowerBody == ENUM.LowerBodyType.LOWER_BODY_TYPE_HUMAN)
                    GUI.outputText("inside your footwear, between your toes");
                if (liveData.player.lowerBody == ENUM.LowerBodyType.LOWER_BODY_TYPE_HOOFED)
                    GUI.outputText("in your hooves");
                if (liveData.player.lowerBody == ENUM.LowerBodyType.LOWER_BODY_TYPE_DOG)
                    GUI.outputText("in your paws");
                if (liveData.player.lowerBody == ENUM.LowerBodyType.LOWER_BODY_TYPE_NAGA)
                    GUI.outputText("in your scales");
                GUI.outputText(".<br><br><b>You've discovered the Desert!</b>");
                liveData.exploration.exploredDesert = 1;
                return;
            }
            if (liveData.exploration.exploredMountain <= 0 && UTIL.rand(3) == 0 && liveData.exploration.exploredDesert > 0) {
                GUI.outputText("Thunder booms overhead, shaking you out of your thoughts. High above, dark clouds encircle a distant mountain peak. You get an ominous feeling in your gut as you gaze up at it.<br><br><b>You've discovered the Mountain!</b>");
                liveData.exploration.exploredMountain = 1;
                return;
            }
            //Find encounters
            if (UTIL.rand(100) > 0) {
                switch (UTIL.rand(4)) {
                    case 0:
                        this.genericGobImpEncounters();
                        break;
                    case 1:
                        GiacomoScene.giacomoEncounter();
                        break;
                    case 2:
                    case 3:
                }
            }
            else {
                //Easter egg
                GUI.outputText("You wander around, fruitlessly searching for new places.");
            }
        }
    }
    static genericGobImpEncounters() {
        var impGob = 5; //Determines whether goblin or imp should be encountered.
        if (liveData.player.totalCocks() > 0)
            impGob--;
        if (liveData.player.hasVagina())
            impGob++;
        //Decide whether to encounter imp or goblin.
        if (UTIL.rand(10) < impGob) {
            //A wild imp appears!
            GUI.displaySprite("imp");
            GUI.outputText("An imp wings out of the sky and attacks!");
            if (liveData.gameFlags[FLAG.CODEX_ENTRY_IMPS] <= 0) {
                liveData.gameFlags[FLAG.CODEX_ENTRY_IMPS] = 1;
                GUI.outputText("<br><br><b>New codex entry unlocked: Imps!</b>");
            }
            COMBAT.startCombat(new Imp());
        }
        else {
            //A wild goblin appears!
            GUI.displaySprite("goblin");
            if (liveData.player.gender > 0)
                GUI.outputText('A goblin saunters out of the bushes with a dangerous glint in her eyes.<br><br>She says, "<i>Time to get fucked, ' + liveData.player.mf("stud", "slut") + '.</i>"');
            else
                GUI.outputText('A goblin saunters out of the bushes with a dangerous glint in her eyes.<br><br>She says, "<i>Time to get fuc-oh shit, you don\'t even have anything to play with! This is for wasting my time!</i>"');
            if (liveData.gameFlags[FLAG.CODEX_ENTRY_GOBLINS] <= 0) {
                liveData.gameFlags[FLAG.CODEX_ENTRY_GOBLINS] = 1;
                GUI.outputText("<br><br><b>New codex entry unlocked: Goblins!</b>");
            }
            COMBAT.startCombat(new Goblin());
        }
    }
}
export { AreasGenericExploration };
//# sourceMappingURL=exploration.js.map