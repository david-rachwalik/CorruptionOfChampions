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
    fixVagina(pussy) {
        //Fix any undefined numbers.
        if (pussy.type == undefined)
            pussy.type = 0;
        if (pussy.clitLength == undefined)
            pussy.clitLength = 0.25;
        if (pussy.vaginalWetness == undefined)
            pussy.vaginalWetness = 1;
        if (pussy.vaginalLooseness == undefined)
            pussy.vaginalLooseness = 0;
        if (pussy.virgin == undefined)
            pussy.virgin = false;
        return pussy;
    }
}
export { Vagina };
//# sourceMappingURL=vaginaClass.js.map