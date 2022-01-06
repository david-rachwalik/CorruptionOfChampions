export class Player {
    constructor(name, example) {
        this.name = name;
        //Core Stats
        this.str = example;
        this.tou = example;
        this.spe = example;
        this.inte = example;
        this.lib = example;
        this.sens = example;
        this.cor = example;
        //Combat Stats
        this.HP = example;
        this.lust = example;
        this.fatigue = example;
        //Advancement
        this.level = example;
        this.XP = example;
        this.gems = example;
    }
    greet() {
        return "Hello, " + this.name;
    }
}
//# sourceMappingURL=classes.js.map