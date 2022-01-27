class BreastRow {
  //Base info
  breasts: number;
  breastSize: number;
  breastRating: number;
  //Other info
  lactationMultiplier: number;
  milkFullness: number; //Goes up to 100.
  fuckable: boolean;
  nipplesPerBreast: number;
  nippleLength: number;
  pierced: boolean;

  constructor(breastSize: number, nipplesPerBreast: number) {
    //Base info
    this.breasts = 2;
    this.breastSize = breastSize;
    this.breastRating = 0;
    //Other info
    this.lactationMultiplier = 0;
    this.milkFullness = 0; //Goes up to 100.
    this.fuckable = false;
    this.nipplesPerBreast = nipplesPerBreast;
    this.nippleLength = 0.25;
    this.pierced = false;
  }

  unfuckBreastRow(): void {
    //Fix any undefined numbers.
    if (this.breasts == undefined) this.breasts = 2;
    if (this.breastSize == undefined) this.breastSize = 0;
    if (this.lactationMultiplier == undefined) this.lactationMultiplier = 0;
    if (this.milkFullness == undefined) this.milkFullness = 0;
    if (this.fuckable == undefined) this.fuckable = false;
    if (this.nipplesPerBreast == undefined) this.nipplesPerBreast = 1;
    if (this.nippleLength == undefined) this.nippleLength = 0.25;
  }
}

export { BreastRow };
