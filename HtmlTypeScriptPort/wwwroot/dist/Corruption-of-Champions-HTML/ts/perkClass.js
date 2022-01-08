class Perk {
    constructor(type, val1 = 0, val2 = 0, val3 = 0, val4 = 0) {
        this.ptype = type;
        this.value1 = val1;
        this.value2 = val2;
        this.value3 = val3;
        this.value4 = val4;
    }
}
class PerkType {
    constructor(id, name, desc, longDesc = null, keepOnAscension = false) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.longDesc = longDesc;
        this.keepOnAscension = keepOnAscension;
        PerkIDs[this.id] = this;
    }
}
let PerkIDs = {}; //Hold perk IDs for purpose of looking up.
export { Perk, PerkType, PerkIDs };
//# sourceMappingURL=perkClass.js.map