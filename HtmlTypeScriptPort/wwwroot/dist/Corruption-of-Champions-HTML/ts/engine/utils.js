// Miscellenious functions
import { ItemLib } from "../itemClass";
import { KeyItemIDs } from "../keyItemClass";
import { StatusEffectIDs } from "../statusEffectClass";
const NUMBER_WORDS_NORMAL = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
const NUMBER_WORDS_CAPITAL = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
const NUMBER_WORDS_POSITIONAL = ["zeroth", "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"];
//Format string
function formatStringArray(stringList) {
    //Changes an array of values into "1", "1 and 2" or "1, (x, )y and z"
    switch (stringList.length) {
        case 0:
            return "";
        case 1:
            return stringList[0];
        case 2:
            return stringList[0] + " and " + stringList[1];
        default:
    }
    var concat = stringList[0];
    for (var x = 1; x < stringList.length - 1; x++)
        concat += ", " + stringList[x];
    return concat + " and " + stringList[stringList.length - 1];
}
//Number to words
function num2Text(num) {
    if (num >= 0 && num <= 10)
        return NUMBER_WORDS_NORMAL[num];
    return num.toString();
}
function num2Text2(num) {
    if (num < 0)
        return num.toString(); //Can't really have the -10th of something
    if (num <= 10)
        return NUMBER_WORDS_POSITIONAL[num];
    switch (num % 10) {
        case 1:
            return num.toString() + "st";
        case 2:
            return num.toString() + "nd";
        case 3:
            return num.toString() + "rd";
        default:
    }
    return num.toString() + "th";
}
function Num2Text(num) {
    if (num >= 0 && num <= 10)
        return NUMBER_WORDS_CAPITAL[num];
    return num.toString();
}
//Comma display
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
//Capitalize letters
function capitalizeFirstLetter(msg) {
    return msg.charAt(0).toUpperCase() + msg.slice(1);
}
function capitalize(msg) {
    //Alternate function
    return capitalizeFirstLetter(msg);
}
//Randomization
function rand(num) {
    var result = Math.random() * num;
    return Math.floor(result);
}
function randomChoice() {
    var choice;
    if (arguments.length == 1) {
        choice = Math.round(Math.random() * (arguments[0].length - 1));
        return arguments[0][choice];
    }
    else {
        choice = Math.round(Math.random() * (arguments.length - 1));
        return arguments[choice];
    }
}
//Lookup
function lookupItem(id) {
    return ItemLib[id];
}
function lookupKeyItem(id) {
    return KeyItemIDs[id];
}
function lookupPerk(id) {
    return PerkIDs[id];
}
function lookupStatusEffects(id) {
    return StatusEffectIDs[id];
}
//Function
function createCallBackFunction(func, arg1 = undefined, arg2 = undefined, arg3 = undefined) {
    if (arg1 != undefined) {
        if (arg2 != undefined) {
            if (arg3 != undefined) {
                return function () {
                    func(arg1, arg2, arg3);
                };
            }
            return function () {
                func(arg1, arg2);
            };
        }
        return function () {
            func(arg1);
        };
    }
    else {
        return function () {
            func();
        };
    }
}
export { formatStringArray, num2Text, num2Text2, Num2Text, formatNumber, capitalizeFirstLetter, capitalize, rand, randomChoice, lookupItem, lookupKeyItem, lookupPerk, lookupStatusEffects, createCallBackFunction };
//# sourceMappingURL=utils.js.map