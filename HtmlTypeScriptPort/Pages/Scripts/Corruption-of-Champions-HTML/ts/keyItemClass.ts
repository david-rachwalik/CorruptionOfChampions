class KeyItem {
    ktype: number
    value1: number
    value2: number
    value3: number
    value4: number

    constructor(type = 0, val1 = 0, val2 = 0, val3 = 0, val4 = 0) {
        this.ktype = type
        this.value1 = val1
        this.value2 = val2
        this.value3 = val3
        this.value4 = val4
    }
}

class KeyItemType {
    id: string

    constructor(id: string) {
        this.id = id
    }
}

let KeyItemIDs: { [key: string]: KeyItemType } = {} //Hold key item IDs for purpose of looking up.

export { KeyItem, KeyItemType, KeyItemIDs }
