class StatusEffect {
    stype: number
    value1: number
    value2: number
    value3: number
    value4: number

    constructor(type = 0, val1 = 0, val2 = 0, val3 = 0, val4 = 0) {
        this.stype = type
        this.value1 = val1
        this.value2 = val2
        this.value3 = val3
        this.value4 = val4
    }
}

// function StatusEffectType(id: string) {
//     this.id = id
//     StatusEffectIDs[this.id] = this
// }

class StatusEffectType {
    id: string

    constructor(id: string) {
        this.id = id
        StatusEffectIDs[this.id] = this
    }
}

let StatusEffectIDs: { [key: string]: StatusEffectType } = {} //Hold status effect IDs for purpose of looking up.

export { StatusEffect, StatusEffectType, StatusEffectIDs }
