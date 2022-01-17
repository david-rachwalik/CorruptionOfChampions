import { liveData } from "../globalVariables.js"
import { GUI } from "../engine/gui.js"
import { UTIL } from "../engine/utils.js"
import * as ENUM from "../appearanceEnums.js"
import { Inventory } from "./inventory.js"
import { FLAG } from "../flags/dataFlags.js"
import { CampEvents } from "./campEvents.js"
import { RathazulScene } from "./npcs/rathazul.js"
import { MAIN } from "../main.js"
import { Data } from "../engine/saves.js"
import { AreasGenericExploration } from "./exploration.js"
import { Debug } from "../debug.js"
import { Places } from "./places.js"
// import { JojoScene } from "./npcs/jojo.js"

Data.addToGameFlags(FLAG.HAS_KEY_ITEM, FLAG.CAMP_WALL_PROGRESS)

abstract class Camp {
    //MENUS
    static doCamp() {
        //Set some stuff
        GUI.outputText("Got to Camp")
        liveData.gameStarted = true
        GUI.showStats()
        GUI.showMenus()
        GUI.hideUpDown()
        GUI.displaySprite()
        GUI.setMenuButton("buttonMain", "Main Menu", MAIN.mainMenu)
        if (liveData.player.XP >= liveData.player.level * 100 && liveData.player.level < liveData.levelCap) {
            GUI.showMenuButton("buttonLevel")
        } else {
            GUI.hideMenuButton("buttonLevel")
        }
        liveData.playerMenu = this.doCamp
        //Display texts
        GUI.clearOutput()
        // Display Special events
        CampEvents.checkEvents()
        // Display Pregnancy related events
        // liveData.pregnancyProgression.updatePregnancy() // Displays special messages before the main camp message prints.
        /*if (isabellaFollower()) {
            GUI.outputText("Your campsite got a lot more comfortable once Isabella moved in.  Carpets cover up much of the barren ground, simple awnings tied to the rocks provide shade, and hand-made wooden furniture provides comfortable places to sit and sleep.  ", false);
        }
        else {*/
        if (liveData.time.days < 10) GUI.outputText("Your campsite is fairly simple at the moment.  Your tent and bedroll are set in front of the rocks that lead to the portal.  You have a small fire pit as well.  ")
        if (liveData.time.days >= 10 && liveData.time.days < 20)
            GUI.outputText("Your campsite is starting to get a very 'lived-in' look.  The fire-pit is well defined with some rocks you've arranged around it, and your bedroll and tent have been set up in the area most sheltered by rocks.  ")
        if (liveData.time.days >= 20) {
            //if (!isabellaFollower()) GUI.outputText("Your new home is as comfy as a camp site can be.  ", false);
            GUI.outputText("The fire-pit ")
            //if (flags[kFLAGS.CAMP_BUILT_CABIN] > 0 && flags[kFLAGS.CAMP_CABIN_FURNITURE_BED] > 0) GUI.outputText("is ", false);
            /*else */ GUI.outputText("and tent are both ")
            GUI.outputText("set up perfectly, and in good repair.  ")
        }
        //}
        if (liveData.time.days >= 20) GUI.outputText("You've even managed to carve some artwork into the rocks around the camp's perimeter.<br><br>")
        else GUI.outputText("<br><br>")
        GUI.outputText("You have a number of traps surrounding your makeshift home, but they are fairly simple and may not do much to deter a demon. ")
        GUI.outputText("The portal shimmers in the background as it always does, looking menacing and reminding you of why you came.<br><br>")
        if (liveData.time.hours < 6 || liveData.time.hours > 20)
            GUI.outputText("It is dark out, made worse by the lack of stars in the sky.  A blood-red moon hangs in the sky, seeming to watch you, but providing little light.  It's far too dark to leave camp.<br><br>")
        else {
            if (liveData.time.hours == 19) GUI.outputText("The sun is close to the horizon, getting ready to set. ")
            if (liveData.time.hours == 20) GUI.outputText("The sun has already set below the horizon. The sky glows orange. ")
            GUI.outputText("It's light outside, a good time to explore and forage for supplies with which to fortify your camp.<br><br>")
        }

        //DEBUGGING CODE FOR AMILY MEETINGS
        //player.gender = 3;
        //player.modStats("cor", 50);
        //Inventory.takeItem(Items.Consumables.IncubiDraftPurified);
        // liveData.gameFlags[AMILY_HERM_QUEST] = 2;
        //liveData.gameFlags[AMILY_AFFECTION] = 50;
        //player.HP = 100;
        //GUI.outputText(player.gender + "<br>");
        //GUI.outputText("AmilyMet = " + liveData.gameFlags[AMILY_MET] + "<br>");
        //if (!player.isPregnant()) { player.knockUpForce(PREGNANCY_AMILY, 100); }
        //GUI.outputText("Player pregnancy counter is " + player.pregnancyIncubation + "<br>");
        //GUI.outputText("Player knockedup by " + player.pregnancyType + "<br>");

        //if (!amily.isPregnant()) amily.knockUpForce(PREGNANCY_PLAYER, INCUBATION_MOUSE);
        //GUI.outputText("Amily pregnancy counter is " + amily.pregnancyIncubation + "<br>");
        //GUI.outputText("Player knockedup by " + amily.pregnancyType + "<br>");
        //GUI.outputText("Player pregnancy event counter is " + amily.pregnancyEventNum + "<br><br>");

        //Display available options
        GUI.menu()

        GUI.addButton(0, "Explore", AreasGenericExploration.exploreMenu, null, null, null, "Explore to find new regions and visit any discovered regions.")
        GUI.addButton(1, "Places", Places.placesMenu, null, null, null, "Visit any places you have discovered so far.")
        //GUI.addButton(5, "Camp Actions", this.campActionsMenu, null, null, null, "Interact with the camp surroundings.");
        if (this.followersCount() > 0) GUI.addButton(2, "Followers", this.campFollowersMenu, null, null, null, "Check up on any followers or companions who are joining you in or around your camp. You'll probably just end up sleeping with them.")
        if (this.loversCount() > 0) GUI.addButton(3, "Lovers", this.campLoversMenu, null, null, null, "Check up on any lovers you have invited so far and interact with them.")
        if (this.slavesCount() > 0) GUI.addButton(4, "Slaves", this.campSlavesMenu, null, null, null, "Check up on any slaves you have received and interact with them.")
        GUI.addButton(6, "Debug", Debug.doDebug, null, null, null, "Debug Menu.")
        GUI.addButton(8, "Masturbate", this.doMasturbate)
        GUI.addButton(9, "Sleep", this.doSleep)
        if (Inventory.showStash() == true) {
            GUI.addButton(12, "Stash", Inventory.stashMenu, null, null, null, "The stash allows you to store your items safely until you need them later.")
        }
        GUI.addButton(13, "Inventory", Inventory.inventoryMenu, null, null, null, "The inventory allows you to use an item. Be careful as this leaves you open to a counterattack when in combat.")
        //GUI.addButton(14, "Codex", Codex.readCodex);
    }

    /* Placeholder
    static placesMenu() {
        GUI.clearOutput();
        GUI.doNext(Places.placesMenu);
        GUI.doNext(this.doCamp);
    }
    */

    static campFollowersMenu() {
        GUI.clearOutput()
        GUI.displaySprite()
        GUI.menu()
        // if (liveData.gameFlags[FLAG.JOJO_CAMP] == 1) GUI.addButton(0, "Jojo", JojoScene.jojoCamp, null, null, null, "Go find Jojo around the edges of your camp and meditate with him or talk about watch duty.")
        if (liveData.gameFlags[FLAG.RATHAZUL_CAMP] > 0) GUI.addButton(1, "Rathazul", RathazulScene.campRathazul, null, null, null, "Visit with Rathazul to see what alchemical supplies and services he has available at the moment.")
        GUI.addButton(14, "Back", this.doCamp)
    }

    static campLoversMenu() {
        GUI.clearOutput()
        GUI.menu()
        GUI.addButton(14, "Back", this.doCamp)
    }

    static campSlavesMenu() {
        GUI.clearOutput()
        GUI.displaySprite()
        GUI.menu()
        // if (liveData.gameFlags[FLAG.JOJO_CAMP] == 2)
        //     GUI.addButton(0, "Jojo", JojoScene.jojoCampCorrupt, null, null, null, "Call your corrupted pet into camp in order to relieve your desires in a variety of sexual positions? He's ever so willing after your last encounter with him.")
        GUI.addButton(14, "Back", this.doCamp)
    }

    //ACTIONS
    static doMasturbate() {
        GUI.clearOutput()
        GUI.outputText("(Placeholder) You masturbate furiously, cumming buckets.")
        liveData.player.orgasm()
        liveData.advanceMinutes(30 - Math.floor(liveData.player.sens / 4))
        GUI.doNext(this.doCamp)
    }

    static doSleep() {
        //For now
        GUI.clearOutput()
        GUI.outputText("You lie down and sleep for eight hours.")
        liveData.player.changeHP(15 * 8, true)
        liveData.player.changeLust(liveData.player.lib * 0.04 * 8, false)
        GUI.doNext(this.doCamp)
        liveData.advanceHours(8)
    }

    //UTIL
    static returnToCampUseOneHour() {
        liveData.advanceHours(1)
        this.doCamp()
    }

    static returnToCampUseTwoHours() {
        liveData.advanceHours(2)
        this.doCamp()
    }

    static returnToCampUseFourHours() {
        liveData.advanceHours(4)
        this.doCamp()
    }

    static returnToCampUseEightHours() {
        liveData.advanceHours(8)
        this.doCamp()
    }

    static returnToCampUseCustomMinutes(minutes: number) {
        liveData.advanceMinutes(minutes)
        this.doCamp()
    }

    static bedDesc() {
        return "bedroll"
    }

    static homeDesc() {
        return "tent"
    }

    static followersCount() {
        var count = 0
        if (liveData.gameFlags[FLAG.JOJO_CAMP] > 0 && liveData.gameFlags[FLAG.JOJO_CORRUPTION_STAGE] < 5) count++
        if (liveData.gameFlags[FLAG.RATHAZUL_CAMP] > 0) count++
        return count
    }

    static loversCount() {
        var count = 0
        return count
    }

    static slavesCount() {
        var count = 0
        if (liveData.gameFlags[FLAG.JOJO_CAMP] > 0 && liveData.gameFlags[FLAG.JOJO_CORRUPTION_STAGE] >= 5) count++
        return count
    }
}

export { Camp }
