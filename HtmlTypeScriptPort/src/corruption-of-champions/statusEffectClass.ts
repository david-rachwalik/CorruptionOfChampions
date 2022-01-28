class StatusEffect {
  stype: StatusEffectType;
  value1: number;
  value2: number;
  value3: number;
  value4: number;

  constructor(type: StatusEffectType, val1 = 0, val2 = 0, val3 = 0, val4 = 0) {
    this.stype = type;
    this.value1 = val1;
    this.value2 = val2;
    this.value3 = val3;
    this.value4 = val4;
  }
}

class StatusEffectType {
  id: string;

  constructor(id: string) {
    this.id = id;
    // TODO: verify below is still called somewhere (e.g. liveData)
    // StatusEffectIDs[this.id] = this;
  }
}

export { StatusEffect, StatusEffectType };
