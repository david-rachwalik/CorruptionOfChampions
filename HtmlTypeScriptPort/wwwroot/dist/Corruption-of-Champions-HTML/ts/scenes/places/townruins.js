import { GUI } from "../../engine/gui";
import { Data } from "../../engine/saves";
import { UTIL } from "../../engine/utils";
import { FLAG } from "../../flags/dataFlags";
import { liveData } from "../../globalVariables";
import { KeyItems } from "../../keyItemLib";
import { Camp } from "../camp";
import { AmilyScene } from "../npcs/amily";
Data.addToGameFlags(FLAG.AMILY_VILLAGE_EXPLORED, FLAG.HAS_ARMOR_RACK, FLAG.HAS_EQUIPMENT_RACK, FLAG.HAS_WEAPON_RACK);
class TownRuins {
    static firstExploration() {
        GUI.clearOutput();
        GUI.outputText("As you roam the shores of the lake, you find your footsteps echoing as though you were stepping on wood rather than squishing in the sandy mud of the shore. Curious, you squat down and brush the soil away, revealing the rotting form of a wooden plank. Looking carefully at the ground underfoot, you realize that it is part of a pathway – the kind that villages make to provide easier access to and from muddy rivers, lakes and beaches. You believe you can make out the rest of the path clearly enough to follow it to its end.<br><br>");
        GUI.outputText("Do you follow the pathway?");
        GUI.menu();
        GUI.addButton(0, "Yes", this.exploreAmilyVillage);
        GUI.addButton(1, "No", this.dontExploreAmilyVillage);
    }
    static exploreAmilyVillage() {
        GUI.clearOutput();
        liveData.gameFlags[FLAG.AMILY_VILLAGE_ACCESSIBLE] = 1;
        GUI.outputText("You follow the overgrown path inland, away from the shore of the lake. You pass through thick trees, struggling not to lose the path, before finally reaching what is clearly the end.  In front of you lie crumbling walls, broken and scattered by the wind and rain... and by other forces entirely. Beyond them are houses that have been torn apart, burned or collapsed. This was clearly once a village, but it was devastated at some point in the past. Demon attack is the first possibility that leaps into your mind. You examine the ruins for a time, and then decide to head back to camp. You don't think it would be wise to investigate here without preparing first.<br><br>");
        GUI.outputText('<b>"TownRuins" added to Places GUI.menu.</b>');
        GUI.doNext(Camp.returnToCampUseOneHour);
    }
    static dontExploreAmilyVillage() {
        GUI.clearOutput();
        GUI.outputText("Standing up, you turn and walk away. You presume from the state of the pathway that the village at the other end must either be in dire straits, abandoned, or overwhelmed by demons. In other words, it's no safe place for a traveler like you.");
        GUI.doNext(Camp.returnToCampUseOneHour);
    }
    // Probably don't need this function
    /* this.rackCount = function () {
                var temp = 0;
                if (Inventory.hasKeyItem("Equipment Rack - Armor") >= 0) temp++;
                if (Inventory.hasKeyItem("Equipment Rack - Weapons") >= 0) temp++;
                if (Inventory.hasKeyItem("Equipment Rack - Shields") >= 0) temp++;
                return temp;
    }*/
    //Main TownRuins Exploration Tree
    static exploreVillageRuin() {
        GUI.clearOutput();
        liveData.gameFlags[FLAG.AMILY_VILLAGE_EXPLORED]++;
        // 50% chance of encountering Shouldra. Ignore for now.
        /*
        if ((flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00365] == 0 && rackCount() >= 2 && UTIL.rand(10) <= 3) && !followerShouldra() && flags[kFLAGS.SHOULDRA_FOLLOWER_STATE] != .5) {
                    shouldraScene.shouldraGreeting();
                    return;
                }
        */
        // Checking for racks in the Town Ruins
        if (UTIL.rand(5) == 0 && (liveData.gameFlags[FLAG.HAS_ARMOR_RACK] == 0 || liveData.gameFlags[FLAG.HAS_WEAPON_RACK] == 0 || liveData.gameFlags[FLAG.HAS_EQUIPMENT_RACK] == 0)) {
            var rack = 0;
            var rackArray = [];
            if (liveData.gameFlags[FLAG.HAS_ARMOR_RACK] == 0)
                rackArray[rackArray.length] = 0;
            if (liveData.gameFlags[FLAG.HAS_WEAPON_RACK] == 0)
                rackArray[rackArray.length] = 1;
            if (liveData.gameFlags[FLAG.HAS_EQUIPMENT_RACK] == 0)
                rackArray[rackArray.length] = 2;
            rack = rackArray[UTIL.rand(rackArray.length)];
            GUI.outputText("While picking through the ruined houses and abandoned structures of this dilapidated village, you manage to find something useful!  There's an intact but empty ");
            switch (rack) {
                case 0:
                    GUI.outputText("armor");
                    break;
                case 1:
                    GUI.outputText("weapon");
                    break;
                case 2:
                    GUI.outputText("shield");
                    break;
                default:
                    GUI.outputText("undefined");
            }
            GUI.outputText(" rack here.  It looks like it could hold nine different ");
            switch (rack) {
                case 0:
                    GUI.outputText("armors");
                    break;
                case 1:
                    GUI.outputText("weapons");
                    break;
                case 2:
                    GUI.outputText("shields");
                    break;
                default:
                    GUI.outputText("undefined");
            }
            GUI.outputText(".  You check it over and spot an easy way to fold it up for transport.  This would be a fine addition to your camp, so you pack it up and haul it back.");
            switch (rack) {
                case 0:
                    liveData.gameFlags[FLAG.HAS_ARMOR_RACK] = 1;
                    liveData.player.createKeyItem(KeyItems.ArmorRack, 0, 0, 0, 0);
                    break;
                case 1:
                    liveData.gameFlags[FLAG.HAS_WEAPON_RACK] = 1;
                    liveData.player.createKeyItem(KeyItems.WeaponRack, 0, 0, 0, 0);
                    break;
                case 2:
                    liveData.gameFlags[FLAG.HAS_EQUIPMENT_RACK] = 1;
                    liveData.player.createKeyItem(KeyItems.ShieldRack, 0, 0, 0, 0);
                    break;
                default:
                    GUI.outputText("  <b>Please let Kitteh6660 know about this bug.</b>");
            }
            GUI.menu();
            GUI.doNext(Camp.returnToCampUseOneHour);
            return;
        }
        // Chance to counter Amily
        else if (UTIL.rand(2) == 0) {
            AmilyScene.start();
        }
        // Otherwise, find nothing and go back to camp
        else {
            GUI.menu();
            GUI.outputText("You enter the ruined village cautiously. There are burnt-down houses, smashed-in doorways, ripped-off roofs... everything is covered with dust and grime. You explore for an hour, but you cannot find any sign of another living being, or anything of value. The occasional footprint from an imp or a goblin turns up in the dirt, but you don't see any of the creatures themselves. It looks like time and passing demons have stripped the place bare since it was originally abandoned. Finally, you give up and leave. You feel much easier when you're outside of the village.");
            GUI.doNext(Camp.doCamp);
        }
    }
}
export { TownRuins };
//# sourceMappingURL=townruins.js.map