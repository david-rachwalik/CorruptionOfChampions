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
// abstract class PregnancyStore {
/*
    //this._pregnancyEventValue = [];
        //this._buttPregnancyEventValue = [];
        //_pregnancyEventValue = new Vector.< Vector.<int> >();
        //_buttPregnancyEventValue = new Vector.< Vector.<int> >();
        
        //if (pregType < 0 || pregType > MAX_FLAG_VALUE || pregInc < 0 || pregInc > MAX_FLAG_VALUE || buttPregType < 0 || buttPregType > MAX_FLAG_VALUE || buttPregInc < 0 || buttPregInc > MAX_FLAG_VALUE || pregType == buttPregType || pregInc == buttPregInc) {
        //trace("Error: PregnancyStore created with invalid values for its flags. PregnancyStore(" + pregType + ", " + pregInc + ", " + buttPregType + ", " + buttPregInc + ")");	}
    */
// Pregnancy methods
/*
        
    // isPregnant rewrite. Checks to see if Amily is pregnant
        
        //isPregnant: function () {
        //  var returnvar = false;
        //    if (this.pregnancyTypeFlag != 0) returnvar = true;
        //  return returnvar;
    */
/*

            
            public function get incubation():int { return (_pregnancyIncubationFlag == 0 ? 0 : kGAMECLASS.flags[_pregnancyIncubationFlag]); }

            public function get buttType():int { return (_buttPregnancyTypeFlag == 0 ? 0 : kGAMECLASS.flags[_buttPregnancyTypeFlag] & PREG_TYPE_MASK); }

            public function get buttIncubation():int { return (_buttPregnancyIncubationFlag == 0 ? 0 : kGAMECLASS.flags[_buttPregnancyIncubationFlag]); }
            

            public function get isButtPregnant():Boolean { return buttType != 0; } //At birth the incubation can be zero so a check vs. type is safer
    */
/*

            //Same as addPregnancyEventSet, but for butts
            public function addButtPregnancyEventSet(buttPregType:int, ... buttPregStage):void
            {
                var pregVector:Vector.<int> = new Vector.<int>(buttPregStage.length + 1);
                pregVector[0] = buttPregType; //First element is the butt pregnancy type
                for (var i:int = 0; i < buttPregStage.length; i++) pregVector[i + 1] = buttPregStage[i];
                pregVector[pregVector.length - 1] = -1; //Make last element -1 to ensure there is always a match
                _buttPregnancyEventValue.push(pregVector);
            }
            

            
            
        
            public function buttKnockUp(newPregType:int = 0, newPregIncubation:int = 0):void
            {
                if (!isButtPregnant) buttKnockUpForce(newPregType, newPregIncubation);
            }
            
            public function buttKnockUpForce(newPregType:int = 0, newPregIncubation:int = 0):void
            {
                if (_buttPregnancyTypeFlag == 0 || _buttPregnancyIncubationFlag == 0) return; //Check that these variables were provided by the containing class
                if (newPregType != 0) newPregType = (kGAMECLASS.flags[_buttPregnancyTypeFlag] & PREG_NOTICE_MASK) + newPregType;
                    //If a pregnancy 'continues' an existing pregnancy then do not change the value for last noticed stage
                kGAMECLASS.flags[_buttPregnancyTypeFlag] = newPregType;
                kGAMECLASS.flags[_buttPregnancyIncubationFlag] = (newPregType == 0 ? 0 : newPregIncubation); //Won't allow incubation time without pregnancy type
            }

            //The containing class is responsible for calling pregnancyAdvance, usually once per timeChange()
            public function pregnancyAdvance():void //Separate function so it can be called more often than timeChange if neccessary
            {
                if (incubation != 0) {
                    kGAMECLASS.flags[_pregnancyIncubationFlag]--;
                    if (kGAMECLASS.flags[_pregnancyIncubationFlag] < 0) kGAMECLASS.flags[_pregnancyIncubationFlag] = 0;
                }
                if (buttIncubation != 0) {
                    kGAMECLASS.flags[_buttPregnancyIncubationFlag]--;
                    if (kGAMECLASS.flags[_buttPregnancyIncubationFlag] < 0) kGAMECLASS.flags[_buttPregnancyIncubationFlag] = 0;
                }
            }
    */
/* Many NPCs go through several events during their pregnancies. This function returns the latest event the NPC qualifies for.
            When the NPC is not pregnant this always returns 0, when pregnant it will return at least 1. The further along the NPC is the larger the value. Each NPC
            is free to have as many event as desired. They must be added using the addPregnancyEventSet function and are unique to each pregnancy type. */
/*

            public function get event():int
            {
                var pregType:int = type;
                if (pregType == 0) return 0; //Not pregnant
                var incubationValue:int = incubation;
                var pregEventVector:Vector.<int> = null;
                for (var i:int = 0; i < _pregnancyEventValue.length; i++) {
                    pregEventVector = _pregnancyEventValue[i];
                    if (pregEventVector[0] == pregType) {
                        for (var j:int = 1; j < pregEventVector.length; j++) { //Skip element zero, the pregnancy type
                            if (incubationValue > pregEventVector[j]) return j; //Will always find a value that is < incubationValue as last value is -1
                        }
                    }
                }
                return 1; //If there are no pregnancy events for this type of pregnancy then return 1
            }
            
            //The same event system as for vaginal pregnacies, but for butts
            public function get buttEvent():int
            {
                var pregType:int = buttType;
                if (pregType == 0) return 0; //Not pregnant
                var incubationValue:int = buttIncubation;
                var pregEventVector:Vector.<int> = null;
                for (var i:int = 0; i < _buttPregnancyEventValue.length; i++) {
                    pregEventVector = _buttPregnancyEventValue[i];
                    if (pregEventVector[0] == pregType) {
                        for (var j:int = 1; j < pregEventVector.length; j++) { //Skip element zero, the pregnancy type
                            if (incubationValue > pregEventVector[j]) return j; //Will always find a value that is < incubationValue as last value is -1
                        }
                    }
                }
                return 1; //If there are no pregnancy events for this type of pregnancy then return 1
            }

            //Returns either zero - for no change - or the value of the new pregnancy event which the player has not yet noticed
            //This function updates the noticed pregnancy event, so it only triggers once per event per pregnancy.
            public function eventTriggered():int
            {
                var currentStage:int = event;
                var lastNoticed:int = kGAMECLASS.flags[_pregnancyTypeFlag] & PREG_NOTICE_MASK;
                if (currentStage * 65536 == lastNoticed) return 0; //Player has already noticed this stage
                kGAMECLASS.flags[_pregnancyTypeFlag] = (kGAMECLASS.flags[_pregnancyTypeFlag] & PREG_TYPE_MASK) + (currentStage * 65536);
                    //Strip off the old noticed value by ANDing with PREG_TYPE_MASK
                return currentStage;
            }

            //Same as eventTriggered, but for butts
            public function buttEventTriggered():int
            {
                var currentStage:int = buttEvent;
                var lastNoticed:int = kGAMECLASS.flags[_buttPregnancyTypeFlag] & PREG_NOTICE_MASK;
                if (currentStage * 65536 == lastNoticed) return 0; //Player has already noticed this stage
                kGAMECLASS.flags[_buttPregnancyTypeFlag] = (kGAMECLASS.flags[_buttPregnancyTypeFlag] & PREG_TYPE_MASK) + (currentStage * 65536);
                    //Strip off the old noticed value by ANDing with PREG_TYPE_MASK
                return currentStage;
            }

            public function get size():int {
                //This function exists to provide consistency across different NPC's pregnancies. This is most useful when trying to write descriptions of different belly sizes
                //in threesomes, where the author might not be familiar with how the different pregnancy events relate to belly size.
                return PREG_NOT_PREGANT;
            }
        }
    }

    */
// }
export { Pregnancy };
//# sourceMappingURL=pregnancy.js.map