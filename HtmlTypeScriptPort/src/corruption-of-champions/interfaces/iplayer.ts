import { ICreature } from "./icreature.js"
import { Ass } from "../models/body-parts/assClass.js"
import { IItem, Item } from "../itemClass.js"
import { ItemSlot } from "../itemSlotClass.js"
import { Spell } from "../player.js"

interface IPlayer extends ICreature {
    beardType: number
    buttRating: number
    teaseLevel: number
    teaseXP: number
    itemSlots: ItemSlot[]
    //Spells
    spells: Spell
    //Stats points
    statPoints: number
    perkPoints: number
    hunger: number
    location: string
    //Race
    originalGender: number
    originalRace: string
    // Temporary defaults
    tempStr: number
    tempTou: number
    tempSpe: number
    tempInt: number

    minLust: () => number
    race: () => string
    demonScore: () => number
    humanScore: () => number
    minoScore: () => number
    minotaurScore: () => number
    cowScore: () => number
    sandTrapScore: () => number
    beeScore: () => number
    ferretScore: () => number
    dogScore: () => number
    mouseScore: () => number
    raccoonScore: () => number
    foxScore: () => number
    catScore: () => number
    lizardScore: () => number
    spiderScore: () => number
    horseScore: () => number
    kitsuneScore: () => number
    dragonScore: () => number
    goblinScore: () => number
    gooScore: () => number
    nagaScore: () => number
    bunnyScore: () => number
    harpyScore: () => number
    kangaScore: () => number
    sharkScore: () => number
    mutantScore: () => number
    sirenScore: () => number
    pigScore: () => number
    satyrScore: () => number
    rhinoScore: () => number
    echidnaScore: () => number
    deerScore: () => number
    dragonneScore: () => number
    manticoreScore: () => number
    bodyType: () => string
    lengthChange: (amount: number, ncocks: number) => void
    armorDescript: (nakedText?: string) => string
    clothedOrNaked: (clothedText: string, nakedText: string) => string
    clothedOrNakedUpper: (clothedText: string, nakedText: string) => string
    clothedOrNakedLower: (clothedText: string, nakedText: string) => string
    clearStatuses: () => void
    setFurColor: (colorArray: string[]) => void
    goIntoRut: () => boolean
    goIntoHeat: (a: boolean) => boolean
    slimeFeed: () => void
    refillHunger: (amount: number) => void
    damageHunger: (amount: number) => void
    getMaxSlots: () => number
    hasItem: (itype: IItem, minQuantity?: number) => boolean
    itemCount: (itype: IItem) => number
    roomInExistingStack: (itype: IItem) => number
    emptySlot: () => number
    destroyItems: (itype: IItem, numOfItemToRemove?: number) => boolean
    corruptionTolerance: () => number
    countCockSocks: () => number
    changeXP: (amount: number) => void
    changeGems: (amount: number) => void
    newGamePlusMod: () => number
}

export { IPlayer }
