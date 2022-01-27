class Perk {
  ptype: PerkType;
  value1: number;
  value2: number;
  value3: number;
  value4: number;

  constructor(type: PerkType, val1 = 0, val2 = 0, val3 = 0, val4 = 0) {
    this.ptype = type;
    this.value1 = val1;
    this.value2 = val2;
    this.value3 = val3;
    this.value4 = val4;
  }

  // perkName() {
  //     get perkName() { return this.ptype.name; }
  // }
}

class PerkType {
  id: string;
  name: string;
  desc: string;
  longDesc: any;
  keepOnAscension: boolean;

  constructor(id: string, name: string, desc: string, longDesc: any = null, keepOnAscension = false) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.longDesc = longDesc;
    this.keepOnAscension = keepOnAscension;
    PerkIDs[this.id] = this;
  }
}

const PerkIDs: { [key: string]: PerkType } = {}; //Hold perk IDs for purpose of looking up.

export { Perk, PerkType, PerkIDs };
