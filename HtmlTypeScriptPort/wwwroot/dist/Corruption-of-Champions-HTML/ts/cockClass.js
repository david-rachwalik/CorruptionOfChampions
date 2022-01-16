import { liveData } from "./globalVariables.js";
class Cock {
    constructor(length = 5.5, thickness = 1, type = 0) {
        //Base info
        this.cockType = type;
        this.cockLength = length;
        this.cockThickness = thickness;
        //Special, for dog and dragon cocks
        this.knotMultiplier = 1;
        //Other
        this.pierced = false;
        this.sock = "";
    }
    cockArea() {
        return this.cockLength * this.cockThickness;
    }
    thickenCock(amount) {
        //Diminishing returns!
        if (!liveData.hyperHappy) {
            if (this.cockThickness >= 6 && this.cockThickness < 10)
                amount *= 0.8;
            else if (this.cockThickness >= 10 && this.cockThickness < 14)
                amount *= 0.6;
            else if (this.cockThickness >= 14 && this.cockThickness < 18)
                amount *= 0.5;
            else if (this.cockThickness >= 18 && this.cockThickness < 24)
                amount *= 0.4;
            else if (this.cockThickness >= 24)
                amount *= 0.3;
        }
        //Apply growth
        this.cockThickness += amount;
        //Apply hard cap
        if (this.cockThickness > 40)
            this.cockThickness = 40;
        return this.cockThickness;
    }
    increaseCock(amount) {
        //Diminishing returns!
        if (!liveData.hyperHappy) {
            if (this.cockLength >= 30 && this.cockLength < 50)
                amount *= 0.8;
            else if (this.cockLength >= 50 && this.cockLength < 70)
                amount *= 0.6;
            else if (this.cockLength >= 70 && this.cockLength < 90)
                amount *= 0.5;
            else if (this.cockLength >= 90 && this.cockLength < 120)
                amount *= 0.4;
            else if (this.cockLength >= 120)
                amount *= 0.3;
        }
        //Apply growth
        this.cockLength += amount;
        //Apply hard cap
        if (this.cockLength > 240)
            this.cockLength = 240;
        return this.cockLength;
    }
    cArea() {
        return this.cockLength * this.cockThickness;
    }
    fixCock() {
        //Fix any undefined numbers.
        if (this.cockType == undefined)
            this.cockType = 0;
        if (this.cockLength == undefined)
            this.cockLength = 5;
        if (this.cockThickness == undefined)
            this.cockThickness = 1;
        if (this.knotMultiplier == undefined)
            this.knotMultiplier = 1;
        if (this.pierced == undefined)
            this.pierced = false;
        if (this.sock == undefined)
            this.sock = "";
    }
}
export { Cock };
//# sourceMappingURL=cockClass.js.map