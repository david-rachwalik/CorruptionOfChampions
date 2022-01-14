import { liveData } from "../../globalVariables";
import { GUI } from "../../engine/gui";
import { UTIL } from "../../engine/utils";
import { PlacesFarm } from "../places/farm";
import { FLAG } from "../../flags/dataFlags";
import { Data } from "../../engine/saves";
import { AreasGenericExploration } from "../exploration";
import { Camp } from "../camp";
import { Items } from "../../itemClass";
import { Inventory } from "../inventory";
import { GooGirlScene } from "./lake/gooGirl";
import { GreenSlimeScene } from "./lake/greenSlime";
import { RathazulScene } from "../npcs/rathazul";
import { TownRuins } from "../places/townruins";
Data.addToGameFlags(FLAG.AMILY_VILLAGE_ACCESSIBLE);
class AreasLake {
    static explore() {
        GUI.clearOutput();
        liveData.exploration.exploredLake++; //Increment counter
        var choice = [];
        choice[choice.length] = 0; //Generic imps/goblins
        if (liveData.gameFlags[FLAG.RATHAZUL_CAMP] <= 0)
            choice[choice.length] = 1; //Rathazul
        choice[choice.length] = 2; //Farm or TF Items
        //choice[choice.length] = 3; //Fetish Cultists & Zealots after factory
        choice[choice.length] = 4; //Green Slime & Goo Girl
        //choice[choice.length] = 8;
        if (liveData.gameFlags[FLAG.AMILY_VILLAGE_ACCESSIBLE] == 0)
            choice[choice.length] = 9; //Discovering the Town Ruins/Amily Encounter
        choice[choice.length] = 99; //Nothing out of the ordinary
        var select = choice[UTIL.rand(choice.length)];
        switch (select) {
            case 0: //Goblin and Imp encounters.
                AreasGenericExploration.genericGobImpEncounters();
                break;
            case 1: //Rathazul if he isn't in your camp.
                RathazulScene.encounterRathazul();
                break;
            case 2: //Attempt to find the farm or find item
                if (UTIL.rand(100) < 40) {
                    this.findLakeLoot();
                }
                else {
                    PlacesFarm.farmExploreEncounter();
                }
                break;
            case 3: //Fetish Cultists and Zealots, encounterable if factory is shut down (Not yet implemented)
                break;
            case 4: //Green Slime or Goo Girl, encounterable if you're at least level 2.
                if (liveData.gameFlags[FLAG.FACTORY_SHUTDOWN] == 2 && UTIL.rand(10) == 0) {
                    GooGirlScene.spyOnGooAndOozeSex();
                    return;
                }
                else if (UTIL.rand(25) == 0) {
                    GooGirlScene.spyOnGooAndOozeSex();
                    return;
                }
                var gooOrSlime = 50;
                if (UTIL.rand(100) < gooOrSlime)
                    //GOO!
                    GooGirlScene.encounterGooGirl();
                //OOZE!
                else
                    GreenSlimeScene.encounterSlime();
                break;
            case 9: //Discover the town ruins/Start Amily/Shouldra Encounters
                if (liveData.gameFlags[FLAG.AMILY_VILLAGE_ACCESSIBLE] == 0) {
                    TownRuins.firstExploration();
                }
                break;
            default:
                if (UTIL.rand(2) == 0) {
                    GUI.outputText("Your quick walk along the lakeshore feels good.");
                    if (liveData.player.spe < 50) {
                        GUI.outputText(" You bet you could cover the same distance even faster next time.<br>");
                        liveData.player.modStats(["spe", 0.75]);
                    }
                }
                else {
                    GUI.outputText("Your stroll around the lake increasingly bores you, leaving your mind to wander. ");
                    if (liveData.player.cor > 30 || liveData.player.lust > 50 + UTIL.rand(50) || liveData.player.lib > 40) {
                        GUI.outputText("Your imaginings increasingly seem to turn ");
                        if ((liveData.player.cor > 30 && liveData.player.cor < 60) || (liveData.player.lust > 50 && liveData.player.lust < 90) || (liveData.player.lib > 40 && liveData.player.lib < 75)) {
                            GUI.outputText("to thoughts of sex. ");
                            liveData.player.changeLust(5 + liveData.player.lib / 10, true);
                        }
                        if (liveData.player.cor >= 60 || liveData.player.lust >= 90 || liveData.player.lib >= 75) {
                            GUI.outputText("into daydreams of raunchy perverted sex, flooding your groin with warmth. ");
                            liveData.player.changeLust(liveData.player.cor / 10 + liveData.player.lib / 10, true);
                        }
                    }
                    else {
                        liveData.player.modStats(["int", 1]);
                    }
                }
                GUI.doNext(Camp.returnToCampUseOneHour);
        }
    }
    static findLakeLoot() {
        var item;
        switch (UTIL.rand(3)) {
            case 0:
                GUI.outputText("You find a long and oddly flared vial half-buried in the sand. Written across the middle band of the vial is a single word: 'Equinum'.<br>");
                item = Items.Consumables.Equinum;
                break;
            case 1:
                GUI.outputText("You find an odd, fruit-bearing tree growing near the lake shore. One of the fruits has fallen on the ground in front of you. You pick it up.<br>");
                item = Items.Consumables.WhiskerFruit;
                break;
            case 2:
                GUI.outputText("You find a small clay jar half-buried in the sand. Written across the jar is a single word: 'Hummanus'.<br>");
                item = Items.Consumables.Hummanus;
            default:
                item = Items.Consumables.Equinum;
        }
        Inventory.takeItem(item, Camp.returnToCampUseOneHour);
    }
}
export { AreasLake };
//# sourceMappingURL=lake.js.map