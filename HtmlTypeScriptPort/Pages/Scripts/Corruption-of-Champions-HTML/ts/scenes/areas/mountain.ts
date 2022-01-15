import { liveData } from "../../globalVariables"
import * as ENUM from "../../appearanceEnums"
import { GUI } from "../../engine/gui"
import { UTIL } from "../../engine/utils"
import { Camp } from "../camp"
import { FLAG } from "../../flags/dataFlags"
import { AreasGenericExploration } from "../exploration"
import { MinotaurScene } from "./mountain/minotaur"
import { HellhoundScene } from "./mountain/hellhound"
import { WormsScene } from "./mountain/wormmass"

abstract class AreasMountain {
    static explore() {
        GUI.clearOutput()
        liveData.exploration.exploredMountain++ //Increment counter
        var choice = []
        choice[choice.length] = 0 //Goblin/imp encounter
        choice[choice.length] = 1 //Minotaur
        choice[choice.length] = 2 //Hellhound
        choice[choice.length] = 3 //Worms
        choice[choice.length] = 99 //Nothing out of the ordinary
        var select = choice[UTIL.rand(choice.length)]
        switch (select) {
            case 0:
                AreasGenericExploration.genericGobImpEncounters()
                break
            case 1:
                MinotaurScene.encounterMinotaur()
                break
            case 2:
                HellhoundScene.hellhoundEncounter()
                break
            case 3:
                // If you haven't met worms yet, have the sign encounter.
                if (liveData.gameFlags[FLAG.MET_WORMS] == 0) {
                    WormsScene.wormToggle() // Only get this scene once
                    break
                }
                // If you're infested right now or you've marked that you hate worms, go for a walk
                if (liveData.gameFlags[FLAG.INFESTED] == 1 || liveData.gameFlags[FLAG.WORMS_FETISH] == 3) {
                    if (liveData.player.cor < 90) {
                        GUI.outputText("Your hike in the mountains, while fruitless, reveals pleasant vistas and provides you with good exercise and relaxation.")
                        liveData.player.modStats(["tou", 0.25], ["spe", 0.5], ["lus", liveData.player.lib / 10 - 15])
                    } else {
                        GUI.outputText(
                            "During your hike into the mountains, your depraved mind keeps replaying your most obcenely warped sexual encounters, always imagining new perverse ways of causing pleasure.<br><br>It is a miracle no predator picked up on the strong sexual scent you are emitting."
                        )
                        liveData.player.modStats(["tou", 0.25], ["spe", 0.5], ["lib", 0.25], ["lus", liveData.player.lib / 10])
                    }
                    GUI.doNext(Camp.returnToCampUseOneHour)
                    break
                }
                // If you do want to meet the worms always
                if (liveData.gameFlags[FLAG.WORMS_FETISH] == 2) WormsScene.wormEncounter()
                // If you only want to meet the worms sometimes
                if (liveData.gameFlags[FLAG.WORMS_FETISH] == 1 && UTIL.rand(2) == 0) {
                    if (liveData.player.cor < 90) {
                        GUI.outputText("Your hike in the mountains, while fruitless, reveals pleasant vistas and provides you with good exercise and relaxation.")
                        liveData.player.dynStats(["tou", 0.25], ["spe", 0.5])
                        liveData.player.changeLust(liveData.player.lib / 10 - 15)
                    } else {
                        GUI.outputText(
                            "During your hike into the mountains, your depraved mind keeps replaying your most obcenely warped sexual encounters, always imagining new perverse ways of causing pleasure.\n\nIt is a miracle no predator picked up on the strong sexual scent you are emitting."
                        )
                        liveData.player.dynStats(["tou", 0.25], ["spe", 0.5], ["lib", 0.25])
                        liveData.player.changeLust(liveData.player.lib / 10)
                    }
                    GUI.doNext(Camp.returnToCampUseOneHour)
                    break
                } else {
                    WormsScene.wormEncounter()
                    break
                }
            default:
                if (liveData.player.cor < 90) {
                    GUI.outputText("Your hike in the mountains, while fruitless, reveals pleasant vistas and provides you with good exercise and relaxation.")
                    liveData.player.modStats(["tou", 0.25], ["spe", 0.5], ["lus", liveData.player.lib / 10 - 15])
                } else {
                    GUI.outputText(
                        "During your hike into the mountains, your depraved mind keeps replaying your most obcenely warped sexual encounters, always imagining new perverse ways of causing pleasure.<br><br>It is a miracle no predator picked up on the strong sexual scent you are emitting."
                    )
                    liveData.player.modStats(["tou", 0.25], ["spe", 0.5], ["lib", 0.25], ["lus", liveData.player.lib / 10])
                }
                GUI.doNext(Camp.returnToCampUseOneHour)
        }
        liveData.exploration.exploredMountain++
    }
}

export { AreasMountain }
