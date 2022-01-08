import { liveData } from "../globalVariables";
import { createCallBackFunction } from "./utils";
// This code holds the positioning of the GUI display. The look of the display is handled through the CSS file.
// This holds some of the most important code for the engine of the game. It turns the buttons on and off, sets their labels and tool tips
// and tells the program which function to go to next.
class GUI {
    static getMousePosition(event) {
        const tooltip = document.getElementById("tooltip");
        if (tooltip) {
            tooltip.style.top = event.clientY - 220 + "px";
            if (event.clientX + 20 < document.documentElement.clientWidth - 320) {
                tooltip.style.left = event.clientX + 20 + "px";
            }
            else {
                tooltip.style.left = document.documentElement.clientWidth - 320 + "px";
            }
        }
    }
    //Stats Pane
    static refreshStats() {
        //------------
        // NUMBERS
        //------------
        //Core Stats
        const strNum = document.getElementById("strNum");
        const touNum = document.getElementById("touNum");
        const speNum = document.getElementById("speNum");
        const intNum = document.getElementById("intNum");
        const libNum = document.getElementById("libNum");
        const senNum = document.getElementById("senNum");
        const corNum = document.getElementById("corNum");
        if (strNum) {
            strNum.innerHTML = Math.floor(liveData.player.str).toString();
        }
        if (touNum) {
            touNum.innerHTML = Math.floor(liveData.player.tou).toString();
        }
        if (speNum) {
            speNum.innerHTML = Math.floor(liveData.player.spe).toString();
        }
        if (intNum) {
            intNum.innerHTML = Math.floor(liveData.player.inte).toString();
        }
        if (libNum) {
            libNum.innerHTML = Math.floor(liveData.player.lib).toString();
        }
        if (senNum) {
            senNum.innerHTML = Math.floor(liveData.player.sens).toString();
        }
        if (corNum) {
            corNum.innerHTML = Math.floor(liveData.player.cor).toString();
        }
        //Combat Stats
        const hpNum = document.getElementById("hpNum");
        const lustNum = document.getElementById("lustNum");
        const fatigueNum = document.getElementById("fatigueNum");
        if (hpNum) {
            hpNum.innerHTML = (Math.floor(liveData.player.HP) + " / " + liveData.player.maxHP()).toString();
        }
        if (hpNum) {
            hpNum.title = ("HP: " + Math.floor(liveData.player.HP) + " / " + liveData.player.maxHP()).toString();
        }
        if (lustNum) {
            lustNum.innerHTML = (Math.floor(liveData.player.lust) + " / " + liveData.player.maxLust()).toString();
        }
        if (lustNum) {
            lustNum.title = ("Lust: " +
                Math.floor(liveData.player.lust) +
                " / " +
                liveData.player.maxLust() +
                " \nMinimum: " +
                liveData.player.minLust() +
                "\nLust Resistance: " +
                Math.floor((1 - liveData.player.lustVuln) * 1000) / 10 +
                "%").toString();
        }
        if (fatigueNum) {
            fatigueNum.innerHTML = (Math.floor(liveData.player.fatigue) + " / " + liveData.player.maxFatigue()).toString();
        }
        if (fatigueNum) {
            fatigueNum.title = ("Fatigue: " + Math.floor(liveData.player.fatigue) + " / " + liveData.player.maxFatigue()).toString();
        }
        //Advancement
        const levelNum = document.getElementById("levelNum");
        const xpNum = document.getElementById("xpNum");
        const gemNum = document.getElementById("gemNum");
        if (levelNum) {
            levelNum.innerHTML = liveData.player.level.toString();
        }
        if (xpNum) {
            xpNum.innerHTML = (liveData.player.XP + " / " + liveData.player.level * 100).toString();
        }
        if (gemNum) {
            gemNum.innerHTML = liveData.player.gems.toString();
        }
        //------------
        // BARS
        //------------
        //Core Stats
        const strBar = document.getElementById("strBar");
        const touBar = document.getElementById("touBar");
        const speBar = document.getElementById("speBar");
        const intBar = document.getElementById("intBar");
        const libBar = document.getElementById("libBar");
        const senBar = document.getElementById("senBar");
        const corBar = document.getElementById("corBar");
        if (strBar) {
            strBar.innerHTML = (Math.floor((liveData.player.str / 100) * 100) + "%").toString();
        }
        if (touBar) {
            touBar.innerHTML = (Math.floor((liveData.player.tou / 100) * 100) + "%").toString();
        }
        if (speBar) {
            speBar.innerHTML = (Math.floor((liveData.player.spe / 100) * 100) + "%").toString();
        }
        if (intBar) {
            intBar.innerHTML = (Math.floor((liveData.player.inte / 100) * 100) + "%").toString();
        }
        if (libBar) {
            libBar.innerHTML = (Math.floor((liveData.player.lib / 100) * 100) + "%").toString();
        }
        if (senBar) {
            senBar.innerHTML = (Math.floor((liveData.player.sens / 100) * 100) + "%").toString();
        }
        if (corBar) {
            corBar.innerHTML = (Math.floor((liveData.player.cor / 100) * 100) + "%").toString();
        }
        //Combat Stats
        const hpBar = document.getElementById("hpBar");
        const lustBar = document.getElementById("lustBar");
        const fatigueBar = document.getElementById("fatigueBar");
        const hungerFrame = document.getElementById("hungerFrame");
        if (hpBar) {
            hpBar.style.width = (Math.floor((liveData.player.HP / liveData.player.maxHP()) * 100) + "%").toString();
        }
        if (lustBar) {
            lustBar.style.width = (Math.floor((liveData.player.lust / liveData.player.maxLust()) * 100) + "%").toString();
        }
        if (fatigueBar) {
            fatigueBar.style.width = (Math.floor((liveData.player.fatigue / liveData.player.maxFatigue()) * 100) + "%").toString();
        }
        if (hungerFrame) {
            hungerFrame.style.visibility = "hidden";
        }
        //Advancement
        const xpBar = document.getElementById("xpBar");
        if (xpBar) {
            if (liveData.player.XP / (liveData.player.level * 100) < 1) {
                xpBar.style.width = (Math.floor((liveData.player.XP / (liveData.player.level * 100)) * 100) + "%").toString();
            }
            else {
                xpBar.style.width = "100%";
            }
        }
        //Name
        const charName = document.getElementById("charName");
        if (charName) {
            charName.innerHTML = liveData.player.name;
        }
        //Time
        let timeText = "";
        timeText += "Day#: " + liveData.time.days + "<br>Time: ";
        if (liveData.use12Hours) {
            if (liveData.time.hours < 12) {
                //am
                if (liveData.time.hours == 0)
                    timeText += liveData.time.hours + 12 + ":" + (liveData.time.minutes < 10 ? "0" : "") + liveData.time.minutes;
                else
                    timeText += liveData.time.hours + ":" + (liveData.time.minutes < 10 ? "0" : "") + liveData.time.minutes;
                timeText += "am";
            }
            else {
                //pm
                if (liveData.time.hours == 0)
                    timeText += liveData.time.hours + ":" + (liveData.time.minutes < 10 ? "0" : "") + liveData.time.minutes;
                else
                    timeText += liveData.time.hours - 12 + ":" + (liveData.time.minutes < 10 ? "0" : "") + liveData.time.minutes;
                timeText += "pm";
            }
        }
        else {
            timeText += liveData.time.hours + ":" + (liveData.time.minutes < 10 ? "0" : "") + liveData.time.minutes;
        }
        const timeDisplay = document.getElementById("timeDisplay");
        if (timeDisplay) {
            timeDisplay.innerHTML = timeText;
        }
    }
    static showStats() {
        this.refreshStats();
        const stats = document.getElementById("stats");
        if (stats) {
            stats.style.visibility = "visible";
        }
    }
    static hideStats() {
        const stats = document.getElementById("stats");
        if (stats) {
            stats.style.visibility = "hidden";
        }
    }
    static hideUpDown() {
        let arrows = ["strArrow", "touArrow", "speArrow", "intArrow", "libArrow", "senArrow", "corArrow", "hpArrow", "lustArrow", "fatigueArrow"];
        for (let i = 0; i < arrows.length; i++) {
            const arrow = document.getElementById(arrows[i]);
            if (arrow) {
                arrow.style.visibility = "hidden";
            }
        }
    }
    static showUpDown(arrowToDisplay, upDown) {
        //Auto-route parameter
        if (arrowToDisplay == "sensArrow") {
            arrowToDisplay = "senArrow";
        }
        if (arrowToDisplay == "inteArrow") {
            arrowToDisplay = "intArrow";
        }
        //Display arrow
        const arrowElToDisplay = document.getElementById(arrowToDisplay);
        if (arrowElToDisplay) {
            if (upDown == "up") {
                arrowElToDisplay.style.backgroundImage = "url(assets/interface/arrow-up.png)";
            }
            else if (upDown == "down") {
                arrowElToDisplay.style.backgroundImage = "url(assets/interface/arrow-down.png)";
            }
            else {
                arrowElToDisplay.style.visibility = "visible";
            }
        }
    }
    static displaySprite(spriteId = "") {
        const spriteDisplay = document.getElementById("spriteDisplay");
        if (spriteDisplay) {
            if (spriteId) {
                let image = new Image();
                image.src = "assets/sprites/" + spriteId + ".png";
                spriteDisplay.innerHTML = '<img src="assets/sprites/' + spriteId + '.png">';
            }
            else {
                spriteDisplay.innerHTML = "";
            }
        }
    }
    //Bottom menu buttons
    static menu() {
        for (let i = 0; i < 15; i++) {
            const buttonEl = document.getElementById("button" + i);
            if (buttonEl) {
                buttonEl.style.visibility = "hidden";
            }
        }
    }
    static addButton(pos, txt, func, arg1 = undefined, arg2 = undefined, arg3 = undefined, tooltipText = "", tooltipHeader = "") {
        if (!tooltipHeader) {
            tooltipHeader = txt;
        }
        let callback = createCallBackFunction(func, arg1, arg2, arg3);
        const buttonEl = document.getElementById("button" + pos);
        if (buttonEl) {
            buttonEl.innerHTML = txt;
            buttonEl.style.visibility = "visible";
            //buttonEl.style.opacity = "1";
            buttonEl.onclick = callback;
            // TODO: (DMR) uncomment below and see if there was ever a use for tooltipHeader & tooltipText
            // buttonEl.tooltipHeader = tooltipHeader
            // buttonEl.tooltipText = tooltipText
            // return buttonEl
        }
    }
    static addButtonDisabled(pos, txt, tooltipText = "", tooltipHeader = "") {
        if (!tooltipHeader) {
            tooltipHeader = txt;
        }
        const buttonEl = document.getElementById("button" + pos);
        if (buttonEl) {
            buttonEl.innerHTML = txt;
            buttonEl.style.visibility = "visible";
            //buttonEl.style.opacity = "0.4";
            buttonEl.onclick = null;
            // TODO: (DMR) uncomment below and see if there was ever a use for tooltipHeader & tooltipText
            // buttonEl.tooltipHeader = tooltipHeader
            // buttonEl.tooltipText = tooltipText
        }
    }
    static removeButton(pos) {
        const buttonEl = document.getElementById("button" + pos);
        if (buttonEl) {
            buttonEl.style.visibility = "hidden";
        }
    }
    static doNext(func) {
        this.menu();
        this.addButton(0, "Next", func);
    }
    static doYesNo(yesFunc, noFunc) {
        this.menu();
        this.addButton(0, "Yes", yesFunc);
        this.addButton(1, "No", noFunc);
    }
    static isButtonVisible(index) {
        const buttonEl = document.getElementById("button" + index);
        if (buttonEl) {
            return buttonEl.style.visibility == "visible";
        }
        return false;
    }
    //Top menu buttons
    static showMenus() {
        const buttonMain = document.getElementById("buttonMain");
        const buttonData = document.getElementById("buttonData");
        // const buttonLevel = document.getElementById("buttonLevel")
        const buttonStats = document.getElementById("buttonStats");
        const buttonPerks = document.getElementById("buttonPerks");
        const buttonAppearance = document.getElementById("buttonAppearance");
        if (buttonMain) {
            buttonMain.style.visibility = "visible";
        }
        if (buttonData) {
            buttonData.style.visibility = "visible";
        }
        // if (buttonLevel) {
        //     buttonLevel.style.visibility = "visible"
        // }
        if (buttonStats) {
            buttonStats.style.visibility = "visible";
        }
        if (buttonPerks) {
            buttonPerks.style.visibility = "visible";
        }
        if (buttonAppearance) {
            buttonAppearance.style.visibility = "visible";
        }
    }
    static hideMenus() {
        const buttonMain = document.getElementById("buttonMain");
        const buttonData = document.getElementById("buttonData");
        const buttonLevel = document.getElementById("buttonLevel");
        const buttonStats = document.getElementById("buttonStats");
        const buttonPerks = document.getElementById("buttonPerks");
        const buttonAppearance = document.getElementById("buttonAppearance");
        if (buttonMain) {
            buttonMain.style.visibility = "hidden";
        }
        if (buttonData) {
            buttonData.style.visibility = "hidden";
        }
        if (buttonLevel) {
            buttonLevel.style.visibility = "hidden";
        }
        if (buttonStats) {
            buttonStats.style.visibility = "hidden";
        }
        if (buttonPerks) {
            buttonPerks.style.visibility = "hidden";
        }
        if (buttonAppearance) {
            buttonAppearance.style.visibility = "hidden";
        }
    }
    static hideMenuButton(menuButton) {
        const menuButtonEl = document.getElementById(menuButton);
        if (menuButtonEl) {
            menuButtonEl.style.visibility = "hidden";
        }
    }
    static showMenuButton(menuButton) {
        const menuButtonEl = document.getElementById(menuButton);
        if (menuButtonEl) {
            menuButtonEl.style.visibility = "visible";
        }
    }
    static setMenuButton(menuButton, text, func) {
        const menuButtonEl = document.getElementById(menuButton);
        if (menuButtonEl) {
            menuButtonEl.innerHTML = text;
            menuButtonEl.onclick = func;
        }
    }
    //Tooltip
    static initializeTooltipEvents() {
        for (let i = 0; i < 15; i++) {
            //Create blank variable
            const buttonEl = document.getElementById("button" + i);
            if (buttonEl) {
                // TODO: (DMR) uncomment below and see if there was ever a use for tooltipHeader & tooltipText
                // buttonEl.tooltipHeader = undefined
                // buttonEl.tooltipText = undefined
                // //Hook events
                // buttonEl.onmouseover = function (event) {
                //     const tooltip = document.getElementById("tooltip")
                //     if (tooltip && event && event.currentTarget) {
                //         if (event.currentTarget.tooltipText != undefined) {
                //             tooltip.style.visibility = "visible"
                //             tooltip.innerHTML = "<h4>" + event.currentTarget.tooltipHeader + "</h4><p>" + event.currentTarget.tooltipText + "</p>"
                //         }
                //     }
                // }
                buttonEl.onmouseout = function () {
                    const tooltip = document.getElementById("tooltip");
                    if (tooltip) {
                        tooltip.style.visibility = "hidden";
                    }
                };
            }
        }
    }
}
//Events
document.onmousemove = GUI.getMousePosition;
GUI.initializeTooltipEvents();
export { GUI };
//# sourceMappingURL=gui.js.map