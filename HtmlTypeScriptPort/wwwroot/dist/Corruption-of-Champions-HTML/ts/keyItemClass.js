class KeyItem {
    constructor(type, val1 = 0, val2 = 0, val3 = 0, val4 = 0) {
        this.ktype = type;
        this.value1 = val1;
        this.value2 = val2;
        this.value3 = val3;
        this.value4 = val4;
    }
}
class KeyItemType {
    constructor(id) {
        this.id = id;
    }
}
let KeyItemIDs = {}; //Hold key item IDs for purpose of looking up.
export { KeyItem, KeyItemType, KeyItemIDs };
//# sourceMappingURL=keyItemClass.js.map