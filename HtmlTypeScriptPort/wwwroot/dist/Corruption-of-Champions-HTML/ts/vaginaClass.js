class Vagina {
    constructor(wetness = 1, looseness = 0, virgin = false, vagType = 0) {
        //Base info
        this.type = vagType;
        this.clitLength = 0.25;
        this.vaginalWetness = wetness;
        this.vaginalLooseness = looseness;
        this.virgin = virgin;
        //Misc
        this.clitPierced = 0;
        this.labiaPierced = 0;
    }
    fixVagina() {
        //Fix any undefined numbers.
        if (this.type == undefined)
            this.type = 0;
        if (this.clitLength == undefined)
            this.clitLength = 0.25;
        if (this.vaginalWetness == undefined)
            this.vaginalWetness = 1;
        if (this.vaginalLooseness == undefined)
            this.vaginalLooseness = 0;
        if (this.virgin == undefined)
            this.virgin = false;
    }
}
export { Vagina };
//# sourceMappingURL=vaginaClass.js.map