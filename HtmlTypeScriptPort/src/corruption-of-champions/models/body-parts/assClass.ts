class Ass {
  //Base info
  analWetness: number;
  analLooseness: number;
  //Virginity info
  virgin: boolean;

  constructor(wetness = 1, looseness = 0, virgin = false) {
    //Base info
    this.analWetness = wetness;
    this.analLooseness = looseness;
    //Virginity info
    this.virgin = virgin;
  }
}

export { Ass };
