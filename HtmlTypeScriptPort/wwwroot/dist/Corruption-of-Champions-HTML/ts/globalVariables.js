import { Player } from "./player";
import { Time } from "./engine/time";
class Exploration {
    constructor() {
        this.explored = 0;
        this.exploredForest = 0;
        this.exploredLake = 0;
        this.exploredDesert = 0;
        this.exploredMountain = 0;
    }
}
class GameContext {
    constructor() {
        //Variables that can be set as development progresses.
        this.gameVersion = "0.1.2 alpha";
        this.saveVersion = 1; //If this value is increased, the saves will be upgraded to accommodate the new changes.
        this.levelCap = 5; //Determines the maximum level a player can attain. This will be raised as dungeons are added.
        //Game settings
        this.debug = false;
        this.silly = false;
        this.hyperHappy = false;
        this.lowStandards = false;
        this.hungerEnabled = false;
        this.SFWMode = false;
        //Interface settings
        this.use12Hours = false;
        this.useMetrics = false;
        //Store data for fonts
        this.buttonFont = "Papyrus";
        this.mainFont = "Times New Roman";
        this.mainFontSizeArray = ["0.6em", "0.7em", "0.8em", "0.9em", "1em", "1.1em", "1.2em", "1.3em", "1.4em"];
        this.mainFontSizeIndex = 4; //Goes from 0 to 8. Will be used to pick font size from array.
        //Core variables
        this.player = new Player();
        this.playerMenu = null;
        this.gameStarted = false; //Determine if game has already started
        this.shiftKeyDown = false;
        this.time = new Time();
        // Global array for loading in pregnancies and other things that are time sensitive.
        // this.timeAware = []
        this.exploration = new Exploration();
        //NPC variables
        //let flags = [0] * 3000; //For legacy purposes only.
        // let gameFlags = []
        this.gameFlags = {};
        this.amily = new Amily(); // Used for Pregnancy tracking
    }
    advanceMinutes(minutes) {
        //if (timeAware.length > 0) { // If there's a function in timeAware
        //	for (i = 0; i < timeAware.length; i++) {
        //		timeAware[i].advanceTime(minutes);
        //	}
        for (let i = 0; i < minutes; i++) {
            this.time.increment();
            this.player.pregnancyAdvance(); // Advances the Player's pregnancy.
            this.amily.pregnancyAdvance(); // Advances Amily's pregnancy.
            this.tamanipreg.pregnancyAdvance(); //Advances Tamani's pregnancy.
        }
        //pregnancyProgression.updatePregnancy(); // Outputs the results of the Player's pregnancy flags once time passes.
    }
    advanceHours(hours) {
        this.advanceMinutes(hours * 60);
    }
}
let liveData = new GameContext();
export { GameContext, liveData };
//# sourceMappingURL=globalVariables.js.map