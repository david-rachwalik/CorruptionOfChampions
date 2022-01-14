// Creating a constructor for pregnancies. Declaring default variables to prevent JS from turning these into the Number type.
class Pregnancy {
    constructor(pregType = 0, pregInc = 0, buttPregType = 0, buttPregInc = 0) {
        this.pregnancyTypeFlag = pregType; // This marks who did the impregnation for standard births
        this.pregnancyIncubationFlag = pregInc; // This is the base counter for how long the impregnation last for standard births
        this.buttPregnancyTypeFlag = buttPregType; // As above, but for anal pregnancy
        this.buttPregnancyIncubationFlag = buttPregInc; // As above, but for anal pregnancy
        this.pregnancyEventArray = []; // Holds pregnancy event countdown numbers
        this.buttPregnancyEventArray = []; // Hold butt pregnancy event countdown numbers
        this.incrementer = 0; // Used to time the pregnancies.
        this.pregnancyEventCounter = 0; // Used for pregnancy event switch blocks. 0 should make it fall through to the default.
    }
    /***************
    *

    How pregnancy seems to work:

    Each creation of a PregnancyStore object is a new pregnancy. One variable holds a number that represents the type of pregnancy. The other holds the duration of the pregnancy. The duration counts down over time. When it gets to zero, the birth happens. There are separate sets for normal pregnancy and anal pregnancy.

    */
    // Method for determining whether or not there is a pregnancy
    isPregnant() {
        if (this.pregnancyTypeFlag != 0)
            return true;
        else
            return false;
    }
    // Method for filling pregnancyEventArrays. Original code specifies by hours. This will convert into minutes automatically
    eventFill(hourArray) {
        // Convert all elements in hourArray into minutes using fancy Haskell-like JS
        this.pregnancyEventArray = hourArray.map(function (item) {
            return item * 60;
        });
    }
    knockUp(newPregType, newPregIncubation) {
        if (this.pregnancyTypeFlag == 0) {
            this.pregnancyTypeFlag = newPregType;
            this.pregnancyIncubationFlag = newPregIncubation * 60;
            this.pregnancyEventCounter = 0;
        }
    }
    // Forces pregnancy regardless of existing pregnancy.
    knockUpForce(newPregType, newPregIncubation) {
        // Passing 0 and 0  to this function now clears out pregnancy.
        /*
        if (newPregType == 0 || newPregIncubation == 0) {
            GUI.outputText("<br><br>DEBUGGER: Attempted to start a pregnancy without passing the right flags!");
            return;
        }
        */
        this.pregnancyTypeFlag = newPregType;
        this.pregnancyIncubationFlag = newPregIncubation * 60; // Converts hours into minutes
        this.pregnancyEventCounter = 0; // Resets event counter.
        // Debugging text
        //GUI.outputText("<br><br>You knocked someone up!");
        //GUI.outputText("<br>Pregnancy flag is " + this.pregnancyTypeFlag);
        //GUI.outputText("<br>Incubation flag is" + this.pregnancyIncubationFlag);
        //GUI.outputText("<br>Pregnancy array is" + this.pregnancyEventArray);
        //if (newPregType != 0) newPregType = (kGAMECLASS.flags[_pregnancyTypeFlag] & PREG_NOTICE_MASK) + newPregType;
        //If a pregnancy 'continues' an existing pregnancy then do not change the value for last noticed stage
        //kGAMECLASS.flags[_pregnancyTypeFlag] = newPregType;
        //kGAMECLASS.flags[_pregnancyIncubationFlag] = (newPregType == 0 ? 0 : newPregIncubation);
        //Won't allow incubation time without pregnancy type
        //	return;
    }
}
class PregnancyStore {
    constructor() {
        this.Pregnancy = new Pregnancy();
    }
}
export { Pregnancy, PregnancyStore };
//# sourceMappingURL=pregnancy.js.map