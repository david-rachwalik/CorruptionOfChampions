import { ItemLib } from "../itemClass"
import { KeyItemIDs } from "../keyItemClass"
import { PerkIDs } from "../perkClass"
import { StatusEffectIDs } from "../statusEffectClass"

// Miscellenious functions
abstract class UTIL {
    static readonly NUMBER_WORDS_NORMAL = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]
    static readonly NUMBER_WORDS_CAPITAL = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"]
    static readonly NUMBER_WORDS_POSITIONAL = ["zeroth", "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"]

    //Format string
    static formatStringArray(stringList: string[]) {
        //Changes an array of values into "1", "1 and 2" or "1, (x, )y and z"
        switch (stringList.length) {
            case 0:
                return ""
            case 1:
                return stringList[0]
            case 2:
                return stringList[0] + " and " + stringList[1]
            default:
        }
        var concat = stringList[0]
        for (var x = 1; x < stringList.length - 1; x++) concat += ", " + stringList[x]
        return concat + " and " + stringList[stringList.length - 1]
    }

    //Number to words
    static num2Text(num: number) {
        if (num >= 0 && num <= 10) return this.NUMBER_WORDS_NORMAL[num]
        return num.toString()
    }
    static num2Text2(num: number) {
        if (num < 0) return num.toString() //Can't really have the -10th of something
        if (num <= 10) return this.NUMBER_WORDS_POSITIONAL[num]
        switch (num % 10) {
            case 1:
                return num.toString() + "st"
            case 2:
                return num.toString() + "nd"
            case 3:
                return num.toString() + "rd"
            default:
        }
        return num.toString() + "th"
    }
    static Num2Text(num: number) {
        if (num >= 0 && num <= 10) return this.NUMBER_WORDS_CAPITAL[num]
        return num.toString()
    }

    //Comma display
    static formatNumber(num: number) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    }

    //Capitalize letters
    static capitalizeFirstLetter(msg: string) {
        return msg.charAt(0).toUpperCase() + msg.slice(1)
    }
    static capitalize(msg: string) {
        //Alternate function
        return this.capitalizeFirstLetter(msg)
    }

    //Randomization
    static rand(num: number) {
        var result = Math.random() * num
        return Math.floor(result)
    }
    static randomChoice(...args: any[]) {
        var choice
        if (args.length == 1) {
            choice = Math.round(Math.random() * (args[0].length - 1))
            return args[0][choice]
        } else {
            choice = Math.round(Math.random() * (args.length - 1))
            return args[choice]
        }
    }

    //Lookup
    static lookupItem(id: string) {
        return ItemLib[id]
    }

    static lookupKeyItem(id: string) {
        return KeyItemIDs[id]
    }

    static lookupPerk(id: string) {
        return PerkIDs[id]
    }

    static lookupStatusEffects(id: string) {
        return StatusEffectIDs[id]
    }

    //Function
    static createCallBackFunction(func: any, arg1: any = undefined, arg2: any = undefined, arg3: any = undefined) {
        if (arg1 != undefined) {
            if (arg2 != undefined) {
                if (arg3 != undefined) {
                    return function () {
                        func(arg1, arg2, arg3)
                    }
                }
                return function () {
                    func(arg1, arg2)
                }
            }
            return function () {
                func(arg1)
            }
        } else {
            return function () {
                func()
            }
        }
    }
}

export { UTIL }
