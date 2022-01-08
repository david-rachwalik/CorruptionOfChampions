class StatusEffect {
    constructor(type, val1 = 0, val2 = 0, val3 = 0, val4 = 0) {
        this.stype = type;
        this.value1 = val1;
        this.value2 = val2;
        this.value3 = val3;
        this.value4 = val4;
    }
}
// function StatusEffectType(id: string) {
//     this.id = id
//     StatusEffectIDs[this.id] = this
// }
class StatusEffectType {
    constructor(id) {
        this.id = id;
        StatusEffectIDs[this.id] = this;
    }
}
let StatusEffectIDs = {}; //Hold status effect IDs for purpose of looking up.
export { StatusEffect, StatusEffectType, StatusEffectIDs };
//# sourceMappingURL=statusEffectClass.js.map