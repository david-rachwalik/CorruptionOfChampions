﻿import flash.net.FileReference;
import flash.events.Event;
import flash.net.URLRequest;
import flash.utils.ByteArray;
import flash.net.URLLoader;
import flash.net.SharedObject;

var file:FileReference;
var loader:URLLoader;

function loadSaveDisplay(slot:String, slotName:String):String {
	var holding:String = "";
	//Initialize the save file
    var saveFile = SharedObject.getLocal(slot,"/");;
	var pfileHolding:creature;
	if(saveFile.data.exists)
    {
		if(saveFile.data.notes == undefined) {
			saveFile.data.notes = "No notes available.";
		}
		holding = slotName;
		holding += ":  <b>";
		holding += saveFile.data.short;
		holding += "</b> - <i>" + saveFile.data.notes + "</i>\n";
		holding += "Days - " + saveFile.data.days + "  Gender - ";
		if(saveFile.data.gender == 0) holding += "U";
		if(saveFile.data.gender == 1) holding += "M";
		if(saveFile.data.gender == 2) holding += "F";
		if(saveFile.data.gender == 3) holding += "H";
		holding += "\n";
		return holding;
	}
	return slotName + ":  <b>EMPTY</b>\n     \n";
}

function loadScreen():void {
	var test;
	var holder = "";
	var slot1:Number = 0;
	var slot2:Number = 0;
	var slot3:Number = 0;
	var slot4:Number = 0;
	var slot5:Number = 0;
	var slot6:Number = 0;
	var slot7:Number = 0;
	var slot8:Number = 0;
	var slot9:Number = 0;
	outputText("<b><u>Slot: Sex,  Game Days Played</u></b>\n", true);
    outputText(loadSaveDisplay("CoC_1","1") + loadSaveDisplay("CoC_2","2") + loadSaveDisplay("CoC_3","3") + loadSaveDisplay("CoC_4","4") + loadSaveDisplay("CoC_5","5") + loadSaveDisplay("CoC_6","6") + loadSaveDisplay("CoC_7","7") + loadSaveDisplay("CoC_8","8") + loadSaveDisplay("CoC_9","9"), false);
	test = SharedObject.getLocal("CoC_1","/");
	if(test.data.exists) slot1 = 31;
	test = SharedObject.getLocal("CoC_2","/");
	if(test.data.exists) slot2 = 32;
	test = SharedObject.getLocal("CoC_3","/");
	if(test.data.exists) slot3 = 33;
	test = SharedObject.getLocal("CoC_4","/");
	if(test.data.exists) slot4 = 34;
	test = SharedObject.getLocal("CoC_5","/");
	if(test.data.exists) slot5 = 35;
	test = SharedObject.getLocal("CoC_6","/");
	if(test.data.exists) slot6 = 36;
	test = SharedObject.getLocal("CoC_7","/");
	if(test.data.exists) slot7 = 37;
	test = SharedObject.getLocal("CoC_8","/");
	if(test.data.exists) slot8 = 38;
	test = SharedObject.getLocal("CoC_9","/");
	if(test.data.exists) slot9 = 39;
	choices("Slot 1", slot1, "Slot 2", slot2, "Slot 3", slot3, "Slot 4", slot4, "Slot 5", slot5, "Slot 6", slot6, "Slot 7", slot7, "Slot 8", slot8, "Slot 9", slot9, "Back", 30);
}
function saveScreen():void {
	nameBox.x = 210;
	nameBox.y = 620;
	nameBox.width = 550;
	nameBox.visible = true;
	nameBox.text = "";
	var test;
	var slot1:Number = 21;
	var slot2:Number = 22;
	var slot3:Number = 23;
	var slot4:Number = 24;
	var slot5:Number = 25;
	var slot6:Number = 26;
	var slot7:Number = 27;
	var slot8:Number = 28;
	var slot9:Number = 29;
	outputText("", true);
	if(player.slotName != "VOID") outputText("<b>Last saved or loaded from: " + player.slotName + "</b>\n\n", false);
	outputText("<b><u>Slot: Sex,  Game Days Played</u></b>\n", false);
    outputText(loadSaveDisplay("CoC_1","1") + loadSaveDisplay("CoC_2","2") + loadSaveDisplay("CoC_3","3") + loadSaveDisplay("CoC_4","4") + loadSaveDisplay("CoC_5","5") + loadSaveDisplay("CoC_6","6") + loadSaveDisplay("CoC_7","7") + loadSaveDisplay("CoC_8","8") + loadSaveDisplay("CoC_9","9"), false);
	test = SharedObject.getLocal("CoC_1","/");
	if(test.data.exists) slot1 = 21;
	test = SharedObject.getLocal("CoC_2","/");
	if(test.data.exists) slot2 = 22;
	test = SharedObject.getLocal("CoC_3","/");
	if(test.data.exists) slot3 = 23;
	test = SharedObject.getLocal("CoC_4","/");
	if(test.data.exists) slot4 = 24;
	test = SharedObject.getLocal("CoC_5","/");
	if(test.data.exists) slot5 = 25;
	test = SharedObject.getLocal("CoC_6","/");
	if(test.data.exists) slot6 = 26;
	test = SharedObject.getLocal("CoC_7","/");
	if(test.data.exists) slot7 = 27;
	test = SharedObject.getLocal("CoC_8","/");
	if(test.data.exists) slot8 = 28;
	test = SharedObject.getLocal("CoC_9","/");
	if(test.data.exists) slot9 = 29;
	if(player.slotName == "VOID") outputText("\n\n", false);
	outputText("<b>Leave the notes box blank if you don't wish to change notes.\n<u>NOTES:</u></b>", false);
	choices("Slot 1", slot1, "Slot 2", slot2, "Slot 3", slot3, "Slot 4", slot4, "Slot 5", slot5, "Slot 6", slot6, "Slot 7", slot7, "Slot 8", slot8, "Slot 9", slot9, "Back", 30);
}
function saveLoad(e:MouseEvent):void {
	eventTestInput.x = -10207.5;
	eventTestInput.y = -1055.1;
	//Hide the name box in case of backing up from save
	//screen so it doesnt overlap everything.
	nameBox.visible = false;
	outputText("", true);
	outputText("<b>Frequently Asked Questions</b>:\nWhere are my saves located?\n", false);
	outputText("<i>In Windows Vista/7 (IE/FireFox/Other): Users/[username]/Appdata/Roaming/Macromedia/Flash Player/#Shared Objects/[GIBBERISH]/\n", false, false);
	outputText("In Windows Vista/7 (Chrome): Users/[username]/AppData/Local/Google/Chrome/User Data/Default/Pepper Data/Shockwave Flash/WritableRoot/#SharedObjects/[GIBBERISH]/\n", false, false);
	outputText("Inside that folder it will saved in a folder corresponding to where it was played from.  If you saved the CoC.swf to your HDD, then it will be in a folder called localhost.  If you played from my website, it will be in fenoxo.com.  The save files will be labelled CoC_1.sol, CoC_2.sol, CoC_3.sol, etc.</i>\n\n", false);
	outputText("Why do my saves disappear all the time?\n<i>There are numerous things that will wipe out flash local shared files.  If your browser or player is set to delete flash cookies or data, that will do it.  CCleaner will also remove them.  CoC or its updates will never remove your savegames - if they disappear something else is wiping them out.</i>\n\n", false);
	outputText("When I play from my HDD I have one set of saves, and when I play off your site I have a different set of saves.  Why?\n<i>Flash stores saved data relative to where it was accessed from.  Playing from your HDD will store things in a different location than fenoxo.com or FurAffinity.</i>\n\n", false);
	outputText("If you want to be absolutely sure you don't lose a character, copy the .sol file for that slot out and back it up!\n\n<b>For more information, google flash shared objects.</b>", false);
	//This is to clear the 'game over' block from stopping simpleChoices from working.  Loading games supercede's game over.
	if(b1Text.text == "Game Over") {
		temp = 777;
		b1Text.text = "save/load";
	}
	if(temp == 777) {
		simpleChoices("", 0, "Load", 19, "Load File", -21, "Delete", 82, "Back", 5025);
		return;
	}
	if(player.str == 0) {
		simpleChoices("", 0, "Load", 19, "Load File", -21, "Delete", 82, "Back", 64);
		return;
	}
	if(inDungeon) {
		simpleChoices("", 0, "Load", 19, "Load File", -21, "Delete", 82, "Back", 1);
		return;
	}
	if(gameState == 3) choices("Save", 20, "Load", 19, "Load File", -21, "Delete", 82, "Back", 0,"Save to File", -20, "Load File", -21,"",0,"",0,"",0);
	else {
		if(player.autoSave) choices("Save", 20, "Load", 19, "AutoSav: ON", 65, "Delete", 82, "", 0,"Save to File", -20, "Load File", -21,"",0,"",0,"Back",1);
		else choices("Save", 20, "Load", 19, "AutoSav: OFF", 65, "Delete", 82, "", 0,"Save to File", -20, "Load File", -21,"",0,"",0,"Back",1);
	}
}
function deleteScreen():void {
	var test;
	var slot1:Number = 0;
	var slot2:Number = 0;
	var slot3:Number = 0;
	var slot4:Number = 0;
	var slot5:Number = 0;
	var slot6:Number = 0;
	var slot7:Number = 0;
	var slot8:Number = 0;
	var slot9:Number = 0;
	outputText("Slot,  Race,  Sex,  Game Days Played\n", true);
    outputText(loadSaveDisplay("CoC_1","1") + loadSaveDisplay("CoC_2","2") + loadSaveDisplay("CoC_3","3") + loadSaveDisplay("CoC_4","4") + loadSaveDisplay("CoC_5","5") + loadSaveDisplay("CoC_6","6") + loadSaveDisplay("CoC_7","7") + loadSaveDisplay("CoC_8","8") + loadSaveDisplay("CoC_9","9"), false);
	test = SharedObject.getLocal("CoC_1","/");
	if(test.data.exists) slot1 = 83;
	test = SharedObject.getLocal("CoC_2","/");
	if(test.data.exists) slot2 = 84;
	test = SharedObject.getLocal("CoC_3","/");
	if(test.data.exists) slot3 = 85;
	test = SharedObject.getLocal("CoC_4","/");
	if(test.data.exists) slot4 = 86;
	test = SharedObject.getLocal("CoC_5","/");
	if(test.data.exists) slot5 = 87;
	test = SharedObject.getLocal("CoC_6","/");
	if(test.data.exists) slot6 = 88;
	test = SharedObject.getLocal("CoC_7","/");
	if(test.data.exists) slot7 = 89;
	test = SharedObject.getLocal("CoC_8","/");
	if(test.data.exists) slot8 = 90;
	test = SharedObject.getLocal("CoC_9","/");
	if(test.data.exists) slot9 = 91;
	
	outputText("\n<b>ONCE DELETED, YOUR SAVE IS GONE FOREVER.</b>", false);
	choices("Slot 1", slot1, "Slot 2", slot2, "Slot 3", slot3, "Slot 4", slot4, "Slot 5", slot5, "Slot 6", slot6, "Slot 7", slot7, "Slot 8", slot8, "Slot 9", slot9, "Back", 30);
}
function confirmDelete():void {
	outputText("You are about to delete the following save: <b>" + flags[63] + "</b>\n\nAre you sure you want to delete it?", true);
	simpleChoices("No",82,"Yes",93,"",0,"",0,"",0);
}
function purgeTheMutant():void {
	var test = SharedObject.getLocal(flags[63],"/");
	trace("DELETING SLOT: " + flags[63]);
	var blah:Array = new Array("been virus bombed","been purged","been vaped","been nuked from orbit","taken an arrow to the knee","fallen on its sword","lost its reality matrix cohesion","been cleansed","suffered the following error: (404) Porn Not Found");

	trace(blah.length + " array slots");
	var select:Number = rand(blah.length);
	outputText(flags[63] + " has " + blah[select] + ".", true);
	test.clear();
	doNext(82);
}

function saveGame(slot:String):void
{
	saveGameObject(slot, false);
}

function loadGame(slot:String):void
{
	var saveFile = SharedObject.getLocal(slot,"/");;
    loadGameObject(saveFile,slot);
	outputText("Game Loaded", true);
	temp = 0;
	statScreenRefresh();
	doNext(1);
}

//FURNITURE'S JUNK
function saveGameObject(slot:String, isFile:Boolean):void
{
	import classes.cockClass;
	import classes.vaginaClass;
	import classes.breastRowClass;
	import classes.assClass;
	import classes.perkClass;
	import classes.statusAffectClass;
	
	//Autosave stuff
	if(player.slotName != "VOID") player.slotName = slot;
	
	var counter:Number = player.cocks.length;
    //Initialize the save file
	var saveFile;
	if(isFile)
	{
    	saveFile = new Object();
	
		saveFile.data = new Object();
	}
	else
	{
		saveFile = SharedObject.getLocal(slot,"/");
	}
    //Set a single variable that tells us if this save exists
	
	saveFile.data.exists = true;
	
	//CLEAR OLD ARRAYS
	
    //Save sum dataz
	trace("SAVE DATAZ");
	saveFile.data.short = player.short;
	saveFile.data.a = player.a;
	saveFile.data.long = player.long;
	saveFile.data.capitalA = player.capitalA;
	saveFile.data.temperment = player.temperment;
	saveFile.data.special1 = player.special1;
	saveFile.data.special2 = player.special2;
	saveFile.data.special3 = player.special3;
	saveFile.data.pronoun1 = player.pronoun1;
	saveFile.data.pronoun2 = player.pronoun2;
	saveFile.data.pronoun3 = player.pronoun3;
	
	//Notes
	if(nameBox.text != "") {
		saveFile.data.notes = nameBox.text;
		notes = nameBox.text;
	}
	else saveFile.data.notes = notes;
	nameBox.visible = false;
	
	//flags
	saveFile.data.flags = new Array();
	for(var i=0;i < flags.length;i++) {
		saveFile.data.flags[i] = flags[i];
	}	
	//CLOTHING/ARMOR
	saveFile.data.armorName = player.armorName;
	saveFile.data.weaponName = player.weaponName;
	saveFile.data.weaponVerb = player.weaponVerb;
	saveFile.data.armorDef = player.armorDef;
	saveFile.data.armorPerk = player.armorPerk;
	saveFile.data.weaponAttack = player.weaponAttack;
	saveFile.data.weaponPerk = player.weaponPerk;
	saveFile.data.weaponValue = player.weaponValue;
	saveFile.data.armorValue = player.armorValue;
	
	//PIERCINGS
	saveFile.data.nipplesPierced = player.nipplesPierced;
	saveFile.data.nipplesPShort = player.nipplesPShort;
	saveFile.data.nipplesPLong = player.nipplesPLong;
	saveFile.data.lipPierced = player.lipPierced;
	saveFile.data.lipPShort = player.lipPShort;
	saveFile.data.lipPLong = player.lipPLong;
	saveFile.data.tonguePierced = player.tonguePierced;
	saveFile.data.tonguePShort = player.tonguePShort;
	saveFile.data.tonguePLong = player.tonguePLong;
	saveFile.data.eyebrowPierced = player.eyebrowPierced;
	saveFile.data.eyebrowPShort = player.eyebrowPShort;
	saveFile.data.eyebrowPLong = player.eyebrowPLong;
	saveFile.data.earsPierced = player.earsPierced;
	saveFile.data.earsPShort = player.earsPShort;
	saveFile.data.earsPLong = player.earsPLong;
	saveFile.data.nosePierced = player.nosePierced;
	saveFile.data.nosePShort = player.nosePShort;
	saveFile.data.nosePLong = player.nosePLong;
	
	
	
	//MAIN STATS
	saveFile.data.str = player.str;
	saveFile.data.tou = player.tou;
	saveFile.data.spe = player.spe;
	saveFile.data.inte = player.inte;
	saveFile.data.lib = player.lib;
	saveFile.data.sens = player.sens;
	saveFile.data.cor = player.cor;
	saveFile.data.fatigue = player.fatigue;
	//Combat STATS
	saveFile.data.HP = player.HP;
	saveFile.data.lust = player.lust;
	saveFile.data.teaseLevel = player.teaseLevel;
	saveFile.data.teaseXP = player.teaseXP;
	//LEVEL STATS
	saveFile.data.XP = player.XP;
	saveFile.data.level = player.level;
	saveFile.data.gems = player.gems;
	saveFile.data.perkPoints = player.perkPoints;
	
	//Appearance
	saveFile.data.gender = player.gender;
	saveFile.data.femininity = player.femininity;
	saveFile.data.thickness = player.thickness;
	saveFile.data.tone = player.tone;
	saveFile.data.tallness = player.tallness;
	saveFile.data.hairColor = player.hairColor;
	saveFile.data.hairType = player.hairType;
	saveFile.data.gills = player.gills;
	saveFile.data.armType = player.armType;
	saveFile.data.hairLength = player.hairLength;
	saveFile.data.beardLength = player.beardLength;
	saveFile.data.eyeType = player.eyeType;
	saveFile.data.beardStyle = player.beardStyle;
	saveFile.data.skinType = player.skinType;
	saveFile.data.skinTone = player.skinTone;
	saveFile.data.skinDesc = player.skinDesc;
	saveFile.data.skinAdj = player.skinAdj;
	saveFile.data.faceType = player.faceType;
	saveFile.data.tongueType = player.tongueType;
	saveFile.data.earType = player.earType;
	saveFile.data.earValue = player.earValue;
	saveFile.data.antennae = player.antennae;
	saveFile.data.horns = player.horns;
	saveFile.data.hornType = player.hornType;
	saveFile.data.wingDesc = player.wingDesc;
	saveFile.data.wingType = player.wingType;
	saveFile.data.lowerBody = player.lowerBody;
	saveFile.data.tailType = player.tailType;
	saveFile.data.tailVenum = player.tailVenom;
	saveFile.data.tailRecharge = player.tailRecharge;
	saveFile.data.hipRating = player.hipRating;
	saveFile.data.buttRating = player.buttRating;
	
	//Sexual Stuff
	saveFile.data.balls = player.balls;
	saveFile.data.cumMultiplier = player.cumMultiplier;
	saveFile.data.ballSize = player.ballSize;
	saveFile.data.hoursSinceCum = player.hoursSinceCum;
	saveFile.data.fertility = player.fertility;
	saveFile.data.clitLength = player.clitLength;
	
	//Preggo stuff
	saveFile.data.pregnancyIncubation = player.pregnancyIncubation;
	saveFile.data.pregnancyType = player.pregnancyType;
	saveFile.data.buttPregnancyIncubation = player.buttPregnancyIncubation;
	saveFile.data.buttPregnancyType = player.buttPregnancyType;
	
	
	/*myLocalData.data.furnitureArray = new Array();
	for (var i:Number = 0; i < GameArray.length; i++) {
		myLocalData.data.girlArray.push(new Array());
		myLocalData.data.girlEffectArray.push(new Array());
	}*/
	
	saveFile.data.cocks = new Array();
	saveFile.data.vaginas = new Array();
	saveFile.data.breastRows= new Array();
	saveFile.data.perks = new Array();
	saveFile.data.statusAffects = new Array();
	saveFile.data.ass = new Array();
	saveFile.data.keyItems = new Array();
	saveFile.data.itemStorage = new Array();
	saveFile.data.gearStorage = new Array();
	//Set array
	for(i = 0; i < player.cocks.length; i++) {
		saveFile.data.cocks.push(new Array());
	}
	//Populate Array
	for(i = 0; i < player.cocks.length ; i++) {
		saveFile.data.cocks[i].cockThickness = player.cocks[i].cockThickness;
		saveFile.data.cocks[i].cockLength = player.cocks[i].cockLength;
		saveFile.data.cocks[i].cockType = player.cocks[i].cockType;
		saveFile.data.cocks[i].knotMultiplier = player.cocks[i].knotMultiplier;
		saveFile.data.cocks[i].pierced = player.cocks[i].pierced;
		saveFile.data.cocks[i].pShort = player.cocks[i].pShort;
		saveFile.data.cocks[i].pLong = player.cocks[i].pLong;
		saveFile.data.cocks[i].sock = player.cocks[i].sock;
	}
	//Set Vaginal Array
	for(i = 0; i < player.vaginas.length ; i++) {
		saveFile.data.vaginas.push(new Array());
	}
	//Populate Vaginal Array
	for(i = 0; i < player.vaginas.length ; i++) {
		saveFile.data.vaginas[i].type = player.vaginas[i].type;
		saveFile.data.vaginas[i].vaginalWetness = player.vaginas[i].vaginalWetness;
		saveFile.data.vaginas[i].vaginalLooseness = player.vaginas[i].vaginalLooseness;
		saveFile.data.vaginas[i].fullness = player.vaginas[i].fullness;
		saveFile.data.vaginas[i].virgin = player.vaginas[i].virgin;
		saveFile.data.vaginas[i].labiaPierced = player.vaginas[i].labiaPierced;
		saveFile.data.vaginas[i].labiaPShort = player.vaginas[i].labiaPShort;
		saveFile.data.vaginas[i].labiaPLong = player.vaginas[i].labiaPLong;
		saveFile.data.vaginas[i].clitPierced = player.vaginas[i].clitPierced;
		saveFile.data.vaginas[i].clitPShort = player.vaginas[i].clitPShort;
		saveFile.data.vaginas[i].clitPLong = player.vaginas[i].clitPLong;		
	}
	//NIPPLES
	saveFile.data.nippleLength = player.nippleLength;
	//Set Breast Array
	for(i = 0; i < player.breastRows.length ; i++) {
		saveFile.data.breastRows.push(new Array());
		trace("Saveone breastRow");
	}
	//Populate Breast Array
	for(i = 0; i < player.breastRows.length ; i++) {
		trace("Populate One BRow");
		saveFile.data.breastRows[i].breasts             = player.breastRows[i].breasts;
		saveFile.data.breastRows[i].breastRating        = player.breastRows[i].breastRating;
		saveFile.data.breastRows[i].nipplesPerBreast    = player.breastRows[i].nipplesPerBreast;
		saveFile.data.breastRows[i].lactationMultiplier = player.breastRows[i].lactationMultiplier;
		saveFile.data.breastRows[i].milkFullness        = player.breastRows[i].milkFullness;
		saveFile.data.breastRows[i].fuckable            = player.breastRows[i].fuckable;
		saveFile.data.breastRows[i].fullness            = player.breastRows[i].fullness;
	}
	//Set Perk Array
	for(i = 0; i < player.perks.length ; i++) {
		saveFile.data.perks.push(new Array());
		trace("Saveone Perk");
	}
	//Populate Perk Array
	for(i = 0; i < player.perks.length ; i++) {
		trace("Populate One Perk");
		saveFile.data.perks[i].perkName = player.perks[i].perkName;
		saveFile.data.perks[i].value1 = player.perks[i].value1;
		saveFile.data.perks[i].value2 = player.perks[i].value2;
		saveFile.data.perks[i].value3 = player.perks[i].value3;
		saveFile.data.perks[i].value4 = player.perks[i].value4;
		saveFile.data.perks[i].perkDesc = player.perks[i].perkDesc;
	}
	
	//Set Status Array
	for(i = 0; i < player.statusAffects.length ; i++) {
		saveFile.data.statusAffects.push(new Array());
		trace("Saveone statusAffects");
	}
	//Populate Status Array
	for(i = 0; i < player.statusAffects.length ; i++) {
		trace("Populate One statusAffects");
		saveFile.data.statusAffects[i].statusAffectName = player.statusAffects[i].statusAffectName;
		saveFile.data.statusAffects[i].value1 = player.statusAffects[i].value1;
		saveFile.data.statusAffects[i].value2 = player.statusAffects[i].value2;
		saveFile.data.statusAffects[i].value3 = player.statusAffects[i].value3;
		saveFile.data.statusAffects[i].value4 = player.statusAffects[i].value4;
	}
	//Set keyItem Array
	for(i = 0; i < player.keyItems.length ; i++) {
		saveFile.data.keyItems.push(new Array());
		trace("Saveone keyItem");
	}
	//Populate keyItem Array
	for(i = 0; i < player.keyItems.length ; i++) {
		trace("Populate One keyItemzzzzzz");
		saveFile.data.keyItems[i].keyName = player.keyItems[i].keyName;
		saveFile.data.keyItems[i].value1 = player.keyItems[i].value1;
		saveFile.data.keyItems[i].value2 = player.keyItems[i].value2;
		saveFile.data.keyItems[i].value3 = player.keyItems[i].value3;
		saveFile.data.keyItems[i].value4 = player.keyItems[i].value4;
	}
	//Set storage slot array
	for(i = 0; i < itemStorage.length ; i++) {
		saveFile.data.itemStorage.push(new Array());
	}
	//Populate storage slot array
	for(i = 0; i < itemStorage.length ; i++) {
		saveFile.data.itemStorage[i].shortName = itemStorage[i].shortName;
		saveFile.data.itemStorage[i].quantity = itemStorage[i].quantity;
		saveFile.data.itemStorage[i].unlocked = itemStorage[i].unlocked;
	}
	//Set gear slot array
	for(i = 0; i < gearStorage.length ; i++) {
		saveFile.data.gearStorage.push(new Array());
	}
	//Populate gear slot array
	for(i = 0; i < gearStorage.length ; i++) {
		saveFile.data.gearStorage[i].shortName = gearStorage[i].shortName;
		saveFile.data.gearStorage[i].quantity = gearStorage[i].quantity;
		saveFile.data.gearStorage[i].unlocked = gearStorage[i].unlocked;
	}
	saveFile.data.ass.push(new Array());
	saveFile.data.ass.analWetness = player.ass.analWetness;
	saveFile.data.ass.analLooseness = player.ass.analLooseness;
	saveFile.data.ass.fullness = player.ass.fullness;
	//EXPLORED
	saveFile.data.exploredLake = player.exploredLake;
	saveFile.data.exploredMountain = player.exploredMountain;
	saveFile.data.exploredForest = player.exploredForest;
	saveFile.data.exploredDesert = player.exploredDesert;
	saveFile.data.explored = player.explored;
	saveFile.data.foundForest = foundForest;
	saveFile.data.foundDesert = foundDesert;
	saveFile.data.foundMountain = foundMountain;
	saveFile.data.foundLake = foundLake;
	saveFile.data.gameState = gameState;
	
	//Time and Items
	saveFile.data.hours = hours;
	saveFile.data.days = days;
	saveFile.data.autoSave = player.autoSave;
	
	//PLOTZ
	saveFile.data.whitney = whitney;
	saveFile.data.monk = monk;
	saveFile.data.sand = sand;
	saveFile.data.giacomo = giacomo;
	saveFile.data.beeProgress = beeProgress;
	
	//ITEMZ. Item1s
	saveFile.data.itemSlot1 = new Array();
	saveFile.data.itemSlot1.quantity = itemSlot1.quantity;
	saveFile.data.itemSlot1.shortName = itemSlot1.shortName;
	saveFile.data.itemSlot1.unlocked = itemSlot1.unlocked;
	saveFile.data.itemSlot2 = new Array();
	saveFile.data.itemSlot2.quantity = itemSlot2.quantity;
	saveFile.data.itemSlot2.shortName = itemSlot2.shortName;		
	saveFile.data.itemSlot2.unlocked = itemSlot2.unlocked;
	saveFile.data.itemSlot3 = new Array();
	saveFile.data.itemSlot3.quantity = itemSlot3.quantity;
	saveFile.data.itemSlot3.shortName = itemSlot3.shortName;
	saveFile.data.itemSlot3.unlocked = itemSlot3.unlocked;
	saveFile.data.itemSlot4 = new Array();
	saveFile.data.itemSlot4.quantity = itemSlot4.quantity;
    saveFile.data.itemSlot4.shortName = itemSlot4.shortName;
	saveFile.data.itemSlot4.unlocked = itemSlot4.unlocked;
	saveFile.data.itemSlot5 = new Array();
	saveFile.data.itemSlot5.quantity = itemSlot5.quantity;
	saveFile.data.itemSlot5.shortName = itemSlot5.shortName;
	saveFile.data.itemSlot5.unlocked = itemSlot5.unlocked;
	
	if(isFile)
	{
		file = new FileReference();
		//outputText(serializeToString(saveFile.data), true);
		var bytes:ByteArray = new ByteArray();
		bytes.writeObject(saveFile);
		file.save(bytes, null);
		outputText("Attempted to save to file.", true);
		doNext(1);
	}
	else
	{
		saveFile.flush();
		outputText("Saved to slot" + slot + "!", true);
		doNext(1);
	}
}

function openSave():void
{
	file = new FileReference();
	file.browse();
	file.addEventListener(Event.SELECT, onFileSelected);
	//var fileObj : Object = readObjectFromStringBytes("");
	//loadGameFile(fileObj);
}

function onFileSelected(evt:Event):void
{
	file.load();
	file.addEventListener ( Event.COMPLETE, onFileLoaded ) ;
}

function onFileLoaded(evt:Event):void
{
	var tempFileRef : FileReference = FileReference (evt.target) ;
	loader = new URLLoader();
	loader.dataFormat = URLLoaderDataFormat.BINARY;
	loader.addEventListener (Event.COMPLETE, onDataLoaded);
	loader.addEventListener(IOErrorEvent.IO_ERROR, ioErrorHandler)
	try
	{
		var req = new URLRequest(tempFileRef.name);
		loader.load(req);
	}
	catch(error:Error)
	{
		outputText("<b>!</b> Save file not found, check that it is in the same directory as the CoC.swf file.\n\nLoad from file is not available when playing directly from a website like furaffinity or fenoxo.com.",true);
	}
}

function ioErrorHandler(e:IOErrorEvent):void{
    outputText("<b>!</b> Save file not found, check that it is in the same directory as the CoC_" + ver + ".swf file.\n\nLoad from file is not available when playing directly from a website like furaffinity or fenoxo.com.",true);
}

function onDataLoaded(evt:Event):void
{
	//var fileObj = readObjectFromStringBytes(loader.data);
	try
	{
		loadGameObject(loader.data.readObject());
		outputText("Loaded Save",true);
	}
	catch(rangeError:RangeError)
	{
		outputText("<b>!</b> File is either corrupted or not a valid save",true);
	}
	catch(error:Error)
	{
		outputText("<b>!</b> Unhandled Exception",true);
	}
	statScreenRefresh();
	mainText.htmlText = currentText;
	scrollBar.update();
	//eventParser(1);
}

function loadGameObject(saveData:Object, slot:String = "VOID"):void
{
	dungeonLoc = 0;
	inDungeon = false;
	var silly:Boolean = false;
	var easy:Boolean = false;
	var sprite:Boolean = false;
	//If at initial title
	if(player.str == 0) {
		if(flags[273] > 0) sprite = true;
		if(flags[99] > 0) easy = true;
		if(flags[305] > 0) silly = true;
	}
	
	//Autosave stuff
	player.slotName = slot;
	import classes.cockClass;
	import classes.vaginaClass;
	import classes.breastRowClass;
	import classes.assClass;
	import classes.perkClass;
	import classes.statusAffectClass;
	var counter:Number = player.cocks.length;
    //Initialize the save file
	//var saveFile:Object = loader.data.readObject();
	var saveFile = saveData;
    if(saveFile.data.exists)
    {
		//KILL ALL COCKS;
		player.removeCock(0,player.cocks.length);
		player.removeBreastRow(0,player.breastRows.length);
		player.removeVagina(0,player.vaginas.length);
		player.removeStatuses();
		player.removePerks();
		player.removeKeyItems();
		clearStorage();
		clearGearStorage();
		player.short = saveFile.data.short;
		player.a = saveFile.data.a
		player.long = saveFile.data.long;
		player.capitalA = saveFile.data.capitalA;
		player.temperment = saveFile.data.temperment;
		player.special1 = saveFile.data.special1;
		player.special2 = saveFile.data.special2;
		player.special3 = saveFile.data.special3;
		player.pronoun1 = saveFile.data.pronoun1;
		player.pronoun2 = saveFile.data.pronoun2;
		player.pronoun3 = saveFile.data.pronoun3;
		notes = saveFile.data.notes;
		
		//flags
		for(var i=0;i < flags.length;i++) {
			if(saveFile.data.flags == undefined) {
				flags[i] = 0;
			}
			else {
				if(saveFile.data.flags[i] == undefined) flags[i] = 0;
				else flags[i] = saveFile.data.flags[i];
			}
		}	
		//If at initial title
		if(sprite) flags[273] = 1;
		if(easy) flags[99] = 1;
		else flags[99] = 0;
		if(silly) flags[305] = 1;
		
		//PIERCINGS
		if(saveFile.data.nipplesPierced == undefined) {
			trace("PIERCINGS UNDEFINED, REINIT");
			player.nipplesPierced = 0;
			player.nipplesPShort = "";
			player.nipplesPLong = "";
			player.lipPierced = 0;
			player.lipPShort = "";
			player.lipPLong = ""; 
			player.tonguePierced = 0;
			player.tonguePShort = "";
			player.tonguePLong = "";
			player.eyebrowPierced = 0;
			player.eyebrowPShort = "";
			player.eyebrowPLong = "";
			player.earsPierced = 0;
			player.earsPShort = "";
			player.earsPLong = "";
			player.nosePierced = 0;
			player.nosePShort = "";
			player.nosePLong = "";
		}
		else {
			trace("LOADING PIERCINGS");
			player.nipplesPierced = saveFile.data.nipplesPierced;
			player.nipplesPShort = saveFile.data.nipplesPShort;
			player.nipplesPLong = saveFile.data.nipplesPLong;
			player.lipPierced = saveFile.data.lipPierced;
			player.lipPShort = saveFile.data.lipPShort;
			player.lipPLong = saveFile.data.lipPLong; 
			player.tonguePierced = saveFile.data.tonguePierced;
			player.tonguePShort = saveFile.data.tonguePShort;
			player.tonguePLong = saveFile.data.tonguePLong;
			player.eyebrowPierced = saveFile.data.eyebrowPierced;
			player.eyebrowPShort = saveFile.data.eyebrowPShort;
			player.eyebrowPLong = saveFile.data.eyebrowPLong;
			player.earsPierced = saveFile.data.earsPierced;
			player.earsPShort = saveFile.data.earsPShort;
			player.earsPLong = saveFile.data.earsPLong;
			player.nosePierced = saveFile.data.nosePierced;
			player.nosePShort = saveFile.data.nosePShort;
			player.nosePLong = saveFile.data.nosePLong;
		}
		
		//CLOTHING/ARMOR
		player.armorName = saveFile.data.armorName;
		player.weaponName = saveFile.data.weaponName;
		player.weaponVerb = saveFile.data.weaponVerb;
		player.armorDef = saveFile.data.armorDef;
		player.armorPerk = saveFile.data.armorPerk;
		player.weaponAttack = saveFile.data.weaponAttack;
		player.weaponPerk = saveFile.data.weaponPerk;
		player.weaponValue = saveFile.data.weaponValue;
		player.armorValue = saveFile.data.armorValue;
		
		//MAIN STATS
		player.str = saveFile.data.str;
		player.tou = saveFile.data.tou;
		player.spe = saveFile.data.spe;
		player.inte = saveFile.data.inte;
		player.lib = saveFile.data.lib;
		player.sens = saveFile.data.sens;
		player.cor = saveFile.data.cor;
		player.fatigue = saveFile.data.fatigue;
		
		//Combat STATS
		player.HP = saveFile.data.HP;
		player.lust = saveFile.data.lust;
		if(saveFile.data.teaseXP == undefined) player.teaseXP = 0;
		else player.teaseXP = saveFile.data.teaseXP;
		if(saveFile.data.teaseLevel == undefined) player.teaseLevel = 0;
		else player.teaseLevel = saveFile.data.teaseLevel;
		
		//LEVEL STATS
		player.XP = saveFile.data.XP;
		player.level = saveFile.data.level;
		player.gems = saveFile.data.gems;
		if(saveFile.data.perkPoints == undefined) player.perkPoints = 0;
		else player.perkPoints = saveFile.data.perkPoints;
		
		//Appearance
		player.gender = saveFile.data.gender;
		if(saveFile.data.femininity == undefined) player.femininity = 50;
		else player.femininity = saveFile.data.femininity;
		//EYES
		if(saveFile.data.eyeType == undefined) player.eyeType = 0;
		else player.eyeType = saveFile.data.eyeType;
		//BEARS
		if(saveFile.data.beardLength == undefined) player.beardLength = 0;
		else player.beardLength = saveFile.data.beardLength;
		if(saveFile.data.beardStyle == undefined) player.beardStyle = 0;
		else player.beardStyle = saveFile.data.beardStyle;
		//BODY STYLE
		if(saveFile.data.tone == undefined) player.tone = 50;
		else player.tone = saveFile.data.tone;
		if(saveFile.data.thickness == undefined) player.thickness = 50;
		else player.thickness = saveFile.data.thickness;

		player.tallness = saveFile.data.tallness;
		player.hairColor = saveFile.data.hairColor;
		if(saveFile.data.hairType == undefined) player.hairType = 0;
		else player.hairType = saveFile.data.hairType;
		if(saveFile.data.gills == undefined) player.gills = false;
		else player.gills = saveFile.data.gills;
		if(saveFile.data.armType == undefined) player.armType = 0;
		else player.armType = saveFile.data.armType;
		player.hairLength = saveFile.data.hairLength;
		player.skinType = saveFile.data.skinType;
		if(saveFile.data.skinAdj == undefined) player.skinAdj = "";
		else player.skinAdj = saveFile.data.skinAdj;
		player.skinTone = saveFile.data.skinTone;
		player.skinDesc = saveFile.data.skinDesc;
		//Convert from old skinDesc to new skinAdj + skinDesc!
		if(player.skinDesc.indexOf("smooth") != -1) {
			player.skinAdj = "smooth";
			if(player.skinType == 0) player.skinDesc = "skin";
			if(player.skinType == 1) player.skinDesc = "fur";
			if(player.skinType == 2) player.skinDesc = "scales";
			if(player.skinType == 3) player.skinDesc = "goo";
		}
		if(player.skinDesc.indexOf("thick") != -1) {
			player.skinAdj = "thick";
			if(player.skinType == 0) player.skinDesc = "skin";
			if(player.skinType == 1) player.skinDesc = "fur";
			if(player.skinType == 2) player.skinDesc = "scales";
			if(player.skinType == 3) player.skinDesc = "goo";
		}
		if(player.skinDesc.indexOf("rubber") != -1) {
			player.skinAdj = "rubber";
			if(player.skinType == 0) player.skinDesc = "skin";
			if(player.skinType == 1) player.skinDesc = "fur";
			if(player.skinType == 2) player.skinDesc = "scales";
			if(player.skinType == 3) player.skinDesc = "goo";
		}
		if(player.skinDesc.indexOf("latex") != -1) {
			player.skinAdj = "latex";
			if(player.skinType == 0) player.skinDesc = "skin";
			if(player.skinType == 1) player.skinDesc = "fur";
			if(player.skinType == 2) player.skinDesc = "scales";
			if(player.skinType == 3) player.skinDesc = "goo";
		}
		if(player.skinDesc.indexOf("slimey") != -1) {
			player.skinAdj = "slimey";
			if(player.skinType == 0) player.skinDesc = "skin";
			if(player.skinType == 1) player.skinDesc = "fur";
			if(player.skinType == 2) player.skinDesc = "scales";
			if(player.skinType == 3) player.skinDesc = "goo";
		}
		player.faceType = saveFile.data.faceType;
		if(saveFile.data.tongueType == undefined) player.tongueType = 0;
		else player.tongueType = saveFile.data.tongueType;
		if(saveFile.data.earType == undefined) player.earType = 0;
		else player.earType = saveFile.data.earType;
		if(saveFile.data.earValue == undefined) player.earValue = 0;
		else player.earValue = saveFile.data.earValue;
		if(saveFile.data.antennae == undefined) player.antennae = 0;
		else player.antennae = saveFile.data.antennae;
		player.horns = saveFile.data.horns;
		if(saveFile.data.hornType == undefined) player.hornType = 0;
		else player.hornType = saveFile.data.hornType;
		player.wingDesc = saveFile.data.wingDesc;
		player.wingType = saveFile.data.wingType;
		player.lowerBody = saveFile.data.lowerBody;
		player.tailType = saveFile.data.tailType;
		player.tailVenom = saveFile.data.tailVenum;
		player.tailRecharge = saveFile.data.tailRecharge;
		player.hipRating = saveFile.data.hipRating;
		player.buttRating = saveFile.data.buttRating;
		
		//Sexual Stuff
		player.balls = saveFile.data.balls;
		player.cumMultiplier = saveFile.data.cumMultiplier;
		player.ballSize = saveFile.data.ballSize;
		player.hoursSinceCum = saveFile.data.hoursSinceCum;
		player.fertility = saveFile.data.fertility;
		player.clitLength = saveFile.data.clitLength;
		
		//Preggo stuff
		player.pregnancyIncubation = saveFile.data.pregnancyIncubation;
		player.pregnancyType = saveFile.data.pregnancyType;
		player.buttPregnancyIncubation = saveFile.data.buttPregnancyIncubation;
		player.buttPregnancyType = saveFile.data.buttPregnancyType;
		
		//ARRAYS HERE!
		//Set Cock array
		for(i = 0; i < saveFile.data.cocks.length; i++) {
			player.createCock();
		}
		//Populate Cock Array
		for(i = 0; i < saveFile.data.cocks.length ; i++) {
			player.cocks[i].cockThickness = saveFile.data.cocks[i].cockThickness;
			player.cocks[i].cockLength = saveFile.data.cocks[i].cockLength;
			player.cocks[i].cockType = saveFile.data.cocks[i].cockType;
			player.cocks[i].knotMultiplier = saveFile.data.cocks[i].knotMultiplier;
			if(saveFile.data.cocks[i].sock == undefined) player.cocks[i].sock = "";
			else player.cocks[i].sock = saveFile.data.cocks[i].sock;
			if(saveFile.data.cocks[i].pierced == undefined) {
				player.cocks[i].pierced = 0;
				player.cocks[i].pShort = "";
				player.cocks[i].pLong = "";
			}
			else {
				player.cocks[i].pierced = saveFile.data.cocks[i].pierced;
				player.cocks[i].pShort = saveFile.data.cocks[i].pShort;
				player.cocks[i].pLong = saveFile.data.cocks[i].pLong;
			}
			trace("LoadOne Cock i(" + i + ")");
		}
		//Set Vaginal Array
		for(i = 0; i < saveFile.data.vaginas.length ; i++) {
			player.createVagina();
		}
		//Populate Vaginal Array
		for(i = 0; i < saveFile.data.vaginas.length ; i++) {
			player.vaginas[i].vaginalWetness = saveFile.data.vaginas[i].vaginalWetness;
			player.vaginas[i].vaginalLooseness = saveFile.data.vaginas[i].vaginalLooseness;
			player.vaginas[i].fullness = saveFile.data.vaginas[i].fullness;
			player.vaginas[i].virgin = saveFile.data.vaginas[i].virgin;
			if(saveFile.data.vaginas[i].type == undefined) player.vaginas[i].type = 0;
			else player.vaginas[i].type = saveFile.data.vaginas[i].type;
			if(saveFile.data.vaginas[i].labiaPierced == undefined) {
				player.vaginas[i].labiaPierced = 0;
				player.vaginas[i].labiaPShort = "";
				player.vaginas[i].labiaPLong = "";
				player.vaginas[i].clitPierced = 0;
				player.vaginas[i].clitPShort = "";
				player.vaginas[i].clitPLong = "";
			}
			else {
				player.vaginas[i].labiaPierced = saveFile.data.vaginas[i].labiaPierced;
				player.vaginas[i].labiaPShort = saveFile.data.vaginas[i].labiaPShort;
				player.vaginas[i].labiaPLong = saveFile.data.vaginas[i].labiaPLong;
				player.vaginas[i].clitPierced = saveFile.data.vaginas[i].clitPierced;
				player.vaginas[i].clitPShort = saveFile.data.vaginas[i].clitPShort;
				player.vaginas[i].clitPLong = saveFile.data.vaginas[i].clitPLong;
			}
			trace("LoadOne Vagina i(" + i + ")");
		}
		//NIPPLES
		if(saveFile.data.nippleLength == undefined) player.nippleLength = .25;
		else player.nippleLength = saveFile.data.nippleLength;
		//Set Breast Array
		for(i = 0; i < saveFile.data.breastRows.length ; i++) {
			player.createBreastRow();
			trace("LoadOne BreastROw i(" + i + ")");
		}
		//Populate Breast Array
		for(i = 0; i < saveFile.data.breastRows.length ; i++) {
			player.breastRows[i].breasts = saveFile.data.breastRows[i].breasts;
			player.breastRows[i].nipplesPerBreast = saveFile.data.breastRows[i].nipplesPerBreast;
			//Fix nipplesless breasts bug
			if(player.breastRows[i].nipplesPerBreast == 0) player.breastRows[i].nipplesPerBreast = 1;
			player.breastRows[i].breastRating = saveFile.data.breastRows[i].breastRating;
			player.breastRows[i].lactationMultiplier = saveFile.data.breastRows[i].lactationMultiplier;
			if(player.breastRows[i].lactationMultiplier < 0) player.breastRows[i].lactationMultiplier = 0;
			player.breastRows[i].milkFullness = saveFile.data.breastRows[i].milkFullness;
			player.breastRows[i].fuckable = saveFile.data.breastRows[i].fuckable;
			player.breastRows[i].fullness = saveFile.data.breastRows[i].fullness;
			if(player.breastRows[i].breastRating < 0) player.breastRows[i].breastRating = 0;
		}
		//Set Perk Array
		for(i = 0; i < saveFile.data.perks.length ; i++) {
			player.createPerk("TEMP", 0, 0, 0, 0);
			trace("LoadOne Perk i(" + i + ")");
		}
		//Populate Perk Array
		for(i = 0; i < saveFile.data.perks.length ; i++) {
			player.perks[i].perkName = saveFile.data.perks[i].perkName;
			player.perks[i].value1 = saveFile.data.perks[i].value1;
			player.perks[i].value2 = saveFile.data.perks[i].value2;
			player.perks[i].value3 = saveFile.data.perks[i].value3;
			player.perks[i].value4 = saveFile.data.perks[i].value4;
			if(isNaN(player.perks[i].value1)) {
				if(player.perks[i].perkName == "Wizard's Focus") {
					player.perks[i].value1 = .3;
				}
				else player.perks[i].value1 = 0;
				trace("NaN byaaaatch: " + player.perks[i].value1);
			}
			if(player.perks[i].perkName == "Wizard's Focus") {
				if(player.perks[i].value1 == 0 || player.perks[i].value1 < 0.1) {
					trace("Wizard's Focus boosted up to par (.5)");
					player.perks[i].value1 = .5;
				}
			}
			//If no save data for perkDesc, initialize it.
			if(saveFile.data.perks[i].perkDesc == undefined) player.perks[i].perkDesc = "<b>N/A: This is an older character file.</b>";
			else player.perks[i].perkDesc = saveFile.data.perks[i].perkDesc;
			trace("Perk " + player.perks[i].perkName + " loaded.");
		}
		//Set Status Array
		for(i = 0; i < saveFile.data.statusAffects.length ; i++) {
			player.createStatusAffect("TEMP", 0, 0, 0, 0);
		}
		//Populate Status Array
		for(i = 0; i < saveFile.data.statusAffects.length ; i++) {
			player.statusAffects[i].statusAffectName = saveFile.data.statusAffects[i].statusAffectName;
			player.statusAffects[i].value1 = saveFile.data.statusAffects[i].value1;
			player.statusAffects[i].value2 = saveFile.data.statusAffects[i].value2;
			player.statusAffects[i].value3 = saveFile.data.statusAffects[i].value3;
			player.statusAffects[i].value4 = saveFile.data.statusAffects[i].value4;
			//trace("StatusAffect " + player.statusAffects[i].statusAffectName + " loaded.");
		}
		//Make sure keyitems exist!
		if(saveFile.data.keyItems != undefined) {
			//Set keyItems Array
			for(i = 0; i < saveFile.data.keyItems.length ; i++) {
				player.createKeyItem("TEMP", 0, 0, 0, 0);
			}
			//Populate keyItems Array
			for(i = 0; i < saveFile.data.keyItems.length ; i++) {
				player.keyItems[i].keyName = saveFile.data.keyItems[i].keyName;
				player.keyItems[i].value1 = saveFile.data.keyItems[i].value1;
				player.keyItems[i].value2 = saveFile.data.keyItems[i].value2;
				player.keyItems[i].value3 = saveFile.data.keyItems[i].value3;
				player.keyItems[i].value4 = saveFile.data.keyItems[i].value4;
				//trace("KeyItem " + player.keyItems[i].keyName + " loaded.");
			}
		}
		//Set storage slot array
		if(saveFile.data.itemStorage == undefined) {
			//trace("OLD SAVES DO NOT CONTAIN ITEM STORAGE ARRAY");
		}
		else {
			for(i = 0; i < saveFile.data.itemStorage.length ; i++) {
				itemStorage.push(new Array());
				//trace("Initialize a slot for one of the item storage locations to load.");
			}
			//Populate storage slot array
			for(i = 0; i < saveFile.data.itemStorage.length ; i++) {
				//trace("Populating a storage slot save with data");
				itemStorage[i].shortName = saveFile.data.itemStorage[i].shortName;
				itemStorage[i].quantity = saveFile.data.itemStorage[i].quantity;
				itemStorage[i].unlocked = saveFile.data.itemStorage[i].unlocked;
				if(itemStorage[i].shortName.indexOf("Gro+") != -1) itemStorage[i].shortName = "GroPlus";
			}
		}
		//Set gear slot array
		if(saveFile.data.gearStorage == undefined || saveFile.data.gearStorage.length < 18) {
			//trace("OLD SAVES DO NOT CONTAIN ITEM STORAGE ARRAY - Creating new!");
			initializeGearStorage();
		}
		else {
			for(i = 0; i < saveFile.data.gearStorage.length && gearStorage.length < 20; i++) {
				gearStorage.push(new Array());
				//trace("Initialize a slot for one of the item storage locations to load.");
			}
			//Populate storage slot array
			for(i = 0; i < saveFile.data.gearStorage.length && i < gearStorage.length; i++) {
				//trace("Populating a storage slot save with data");
				if(saveFile.data.gearStorage[i].shortName == undefined)  gearStorage[i].shortName = "";
				else gearStorage[i].shortName = saveFile.data.gearStorage[i].shortName;
				if(saveFile.data.gearStorage[i].quantity == undefined) gearStorage[i].quantity = 0;
				else gearStorage[i].quantity = saveFile.data.gearStorage[i].quantity;
				gearStorage[i].unlocked = saveFile.data.gearStorage[i].unlocked;
			}
		}
		//player.cocks = saveFile.data.cocks;
		player.ass.analLooseness = saveFile.data.ass.analLooseness;
		player.ass.analWetness = saveFile.data.ass.analWetness;
		player.ass.fullness = saveFile.data.ass.fullness;
		
		
		
		//Shit
		gameState = saveFile.data.gameState;
		player.exploredLake = saveFile.data.exploredLake;
		player.exploredMountain = saveFile.data.exploredMountain;
		player.exploredForest = saveFile.data.exploredForest;
		player.exploredDesert = saveFile.data.exploredDesert;
		player.explored = saveFile.data.explored;
		foundForest = saveFile.data.foundForest;
		foundDesert = saveFile.data.foundDesert;
		foundMountain = saveFile.data.foundMountain;
		foundLake = saveFile.data.foundLake;
		
		//Days
		//Time and Items
		hours = saveFile.data.hours;
		days = saveFile.data.days;
		if(saveFile.data.autoSave == undefined) player.autoSave = false;
		else player.autoSave = saveFile.data.autoSave;
		
		//PLOTZ
		whitney = saveFile.data.whitney;
		monk = saveFile.data.monk;
		sand = saveFile.data.sand;
		if(saveFile.data.giacomo == undefined) giacomo = 0;
		else giacomo = saveFile.data.giacomo;
		if(saveFile.data.beeProgress == undefined) beeProgress = 0;
		else beeProgress = saveFile.data.beeProgress;
		
		//ITEMZ. Item1
		itemSlot1.quantity = saveFile.data.itemSlot1.quantity;
		itemSlot1.shortName = saveFile.data.itemSlot1.shortName;
		itemSlot1.unlocked = saveFile.data.itemSlot1.unlocked;
		itemSlot2.quantity = saveFile.data.itemSlot2.quantity;
		itemSlot2.shortName = saveFile.data.itemSlot2.shortName;		
		itemSlot2.unlocked = saveFile.data.itemSlot2.unlocked;
		itemSlot3.quantity = saveFile.data.itemSlot3.quantity;
		itemSlot3.shortName = saveFile.data.itemSlot3.shortName;
		itemSlot3.unlocked = saveFile.data.itemSlot3.unlocked;
		itemSlot4.quantity = saveFile.data.itemSlot4.quantity;
		itemSlot4.shortName = saveFile.data.itemSlot4.shortName;
		itemSlot4.unlocked = saveFile.data.itemSlot4.unlocked;
		itemSlot5.quantity = saveFile.data.itemSlot5.quantity;
		itemSlot5.shortName = saveFile.data.itemSlot5.shortName;
		itemSlot5.unlocked = saveFile.data.itemSlot5.unlocked;
		if(itemSlot1.shortName.indexOf("Gro+") != -1) itemSlot1.shortName = "GroPlus";
		if(itemSlot2.shortName.indexOf("Gro+") != -1) itemSlot2.shortName = "GroPlus";
		if(itemSlot3.shortName.indexOf("Gro+") != -1) itemSlot3.shortName = "GroPlus";
		if(itemSlot4.shortName.indexOf("Gro+") != -1) itemSlot4.shortName = "GroPlus";
		if(itemSlot5.shortName.indexOf("Gro+") != -1) itemSlot5.shortName = "GroPlus";
		//Fixing shit!
		if(player.hasPerk("Elven Bounty") >= 0) {
			//CLear duplicates
			while(player.perkDuplicated("Elven Bounty")) player.removePerk("Elven Bounty");
			//Fix fudged preggers value
			if(player.perkv1("Elven Bounty") == 15) {
				player.changePerkValue("Elven Bounty",1,0);
				player.addPerkValue("Elven Bounty",2,15);
			}
		}
		doNext(1);
	}
}

/*//MAIN STATS
    saveFile.data.str = str;
	saveFile.data.tou = tou;
	saveFile.data.spe = spe;
	saveFile.data.inte = inte;
	saveFile.data.lib = lib;
	saveFile.data.sen = sen;
	saveFile.data.HP = HP;
	saveFile.data.lust = lust;
	saveFile.data.cor = cor;
	saveFile.data.gems = gems;
	//APPEARANCE VARIABLES
	saveFile.data.tallness = tallness;
	saveFile.data.hair = hair;
	saveFile.data.gender = gender;
	saveFile.data.horseTail = horseTail;
	saveFile.data.horseFace = horseFace;
	saveFile.data.demonTail = demonTail;
	saveFile.data.dogTail = dogTail;
	saveFile.data.dogFace = dogFace;
	saveFile.data.furry = furry;
	saveFile.data.horns = horns;
	//PLOTS
	saveFile.data.merchant = merchant;
	saveFile.data.monk = monk;
	saveFile.data.farm = farm;
	saveFile.data.sand = sand;
	//AFFINITIES
	saveFile.data.horseAffinity = horseAffinity;
	saveFile.data.dogAffinity = dogAffinity;
	//SEXIN STUFF!
	saveFile.data.cockTotal = cockTotal;
	saveFile.data.normalCocks = normalCocks;
	saveFile.data.horseCocks = horseCocks;
	saveFile.data.balls = balls;
	saveFile.data.ballSize = ballSize;
	saveFile.data.dogCocks = dogCocks;
	saveFile.data.baseCockLength = baseCockLength;
	saveFile.data.baseCockThickness = baseCockThickness;
	saveFile.data.clitLength = clitLength;
	saveFile.data.breastTotal = breastTotal;
	saveFile.data.breastsPerRow = breastsPerRow;
	saveFile.data.breastRows = breastRows;
	saveFile.data.nipplesPerBreast = nipplesPerBreast;
	saveFile.data.breastCupSize = breastCupSize;
	saveFile.data.nippleLength = nippleLength;
	saveFile.data.nipplesFuckable = nipplesFuckable;
	saveFile.data.nippleCocks = nippleCocks;
	saveFile.data.vaginas = vaginas;
	saveFile.data.vaginalLooseness = vaginalLooseness;
	saveFile.data.vaginalWetness = vaginalWetness;
	saveFile.data.pregnancyIncubation = pregnancyIncubation;
	saveFile.data.pregnancyType = pregnancyType;
	saveFile.data.lactationMultiplier = lactationMultiplier;
	//ITEMZ
	saveFile.data.itemSlot1 = itemSlot1;
	saveFile.data.itemSlot2 = itemSlot2;
	saveFile.data.itemSlot3 = itemSlot3;
	saveFile.data.ownsDangerousPlants = ownsDangerousPlants;
	saveFile.data.ownsTravelersGuide = ownsTravelersGuide;
	saveFile.data.ownsHentaiComic = ownsHentaiComic;
	saveFile.data.ownsDildo = ownsDildo;
	saveFile.data.ownsStimBelt = ownsStimBelt;
	saveFile.data.ownsNaturalStimBelt = ownsNaturalStimBelt;
	saveFile.data.ownsOnahole = ownsOnahole;
	saveFile.data.ownsDeluxeOnahole = ownsDeluxeOnahole;
	saveFile.data.ownsNaturalOnahole = ownsNaturalOnahole;
	//Leveling Stuff
	saveFile.data.expe = exp;
	saveFile.data.levele = level;
	saveFile.data.holding = holding;
	saveFile.data.inHeat = inHeat;
	if(saveFile.flush()) return true;
    return false;
}

function loadGame(slot:String):Boolean
{

    //Initialize the save file
    var saveFile = SharedObject.getLocal(slot,"/");
    //make sure the file exists
    if(saveFile.data.exists)
    {
        //load sum dataz
		//MAIN STATS
        str = saveFile.data.str;
		tou = saveFile.data.tou;
		spe = saveFile.data.spe;
		inte= saveFile.data.inte;
		lib = saveFile.data.lib;
		sen = saveFile.data.sen;
		HP  = saveFile.data.HP;
		lust= saveFile.data.lust;
		cor = saveFile.data.cor;
		gems= saveFile.data.gems;
		//APPEARANCE VARIABLES
		tallness = saveFile.data.tallness;
		hair = saveFile.data.hair;
		gender = saveFile.data.gender;
		horseTail = saveFile.data.horseTail;
		horseFace = saveFile.data.horseFace;
		demonTail = saveFile.data.demonTail;
		dogTail = saveFile.data.dogTail;
		dogFace = saveFile.data.dogFace;
		furry = saveFile.data.furry;
		horns = saveFile.data.horns;
		//PLOTS
		merchant = saveFile.data.merchant;
		monk = saveFile.data.monk;
		farm = saveFile.data.farm;
		sand = saveFile.data.sand;
		//AFFINITIES
		horseAffinity = saveFile.data.horseAffinity;
		dogAffinity = saveFile.data.dogAffinity;
		//SEXIN STUFF!
		cockTotal = saveFile.data.cockTotal;
		normalCocks = saveFile.data.normalCocks;
		horseCocks = saveFile.data.horseCocks;
		balls = saveFile.data.balls;
		ballSize = saveFile.data.ballSize;
		dogCocks = saveFile.data.dogCocks;
		baseCockLength = saveFile.data.baseCockLength;
		baseCockThickness = saveFile.data.baseCockThickness;
		clitLength = saveFile.data.clitLength;
		breastTotal = saveFile.data.breastTotal;
		breastsPerRow = saveFile.data.breastsPerRow;
		breastRows = saveFile.data.breastRows;
		nipplesPerBreast = saveFile.data.nipplesPerBreast;
		breastCupSize = saveFile.data.breastCupSize;
		nippleLength = saveFile.data.nippleLength;
		nipplesFuckable = saveFile.data.nipplesFuckable;
		nippleCocks = saveFile.data.nippleCocks;
		vaginas = saveFile.data.vaginas;
		vaginalLooseness = saveFile.data.vaginalLooseness;
		vaginalWetness = saveFile.data.vaginalWetness;
		pregnancyIncubation = saveFile.data.pregnancyIncubation;
		pregnancyType = saveFile.data.pregnancyType;
		lactationMultiplier = saveFile.data.lactationMultiplier;
		//ITEMZ
		itemSlot1 = saveFile.data.itemSlot1;
		itemSlot2 = saveFile.data.itemSlot2;
		itemSlot3 = saveFile.data.itemSlot3;
		ownsDangerousPlants = saveFile.data.ownsDangerousPlants;
		ownsTravelersGuide = saveFile.data.ownsTravelersGuide;
		ownsHentaiComic = saveFile.data.ownsHentaiComic;
		ownsDildo = saveFile.data.ownsDildo;
		ownsStimBelt = saveFile.data.ownsStimBelt;
		ownsNaturalStimBelt = saveFile.data.ownsNaturalStimBelt;
		ownsOnahole = saveFile.data.ownsOnahole;
		ownsDeluxeOnahole = saveFile.data.ownsDeluxeOnahole;
		ownsNaturalOnahole = saveFile.data.ownsNaturalOnahole;
		//Leveling Stuff
		exp = saveFile.data.expe;
		level = saveFile.data.levele;
		holding = saveFile.data.holding;
		inHeat = saveFile.data.inHeat;
		//Show stat pane (would not appear if loading from title)
		statDisplay();
		statPane.visible = true;
		statValuePane.visible = true;
		if(str == 0) return false;
		return true;
    }
    return false;    
}*/
/*function loadGame(slot:String):Boolean
{
	dungeonLoc = 0;
	inDungeon = false;
	//Autosave stuff
	player.slotName = slot;
	import classes.cockClass;
	import classes.vaginaClass;
	import classes.breastRowClass;
	import classes.assClass;
	import classes.perkClass;
	import classes.statusAffectClass;
	var counter:Number = player.cocks.length;
    //Initialize the save file
	var saveFile = SharedObject.getLocal(slot,"/");;
    //make sure the file exists
    if(saveFile.data.exists)
    {
		//KILL ALL COCKS;
		player.removeCock(0,player.cocks.length);
		player.removeBreastRow(0,player.breastRows.length);
		player.removeVagina(0,player.vaginas.length);
		player.removeStatuses();
		player.removePerks();
		player.removeKeyItems();
		clearStorage();
		player.short = saveFile.data.short;
		player.a = saveFile.data.a
		player.long = saveFile.data.long;
		player.capitalA = saveFile.data.capitalA;
		player.temperment = saveFile.data.temperment;
		player.special1 = saveFile.data.special1;
		player.special2 = saveFile.data.special2;
		player.special3 = saveFile.data.special3;
		player.pronoun1 = saveFile.data.pronoun1;
		player.pronoun2 = saveFile.data.pronoun2;
		player.pronoun3 = saveFile.data.pronoun3;
		notes = saveFile.data.notes;
		
		//flags
		for(var i=0;i < flags.length;i++) {
			if(saveFile.data.flags == undefined) {
				flags[i] = 0;
			}
			else {
				if(saveFile.data.flags[i] == undefined) flags[i] = 0;
				else flags[i] = saveFile.data.flags[i];
			}
		}	
		
		//PIERCINGS
		if(saveFile.data.nipplesPierced == undefined) {
			trace("PIERCINGS UNDEFINED, REINIT");
			player.nipplesPierced = 0;
			player.nipplesPShort = "";
			player.nipplesPLong = "";
			player.lipPierced = 0;
			player.lipPShort = "";
			player.lipPLong = ""; 
			player.tonguePierced = 0;
			player.tonguePShort = "";
			player.tonguePLong = "";
			player.eyebrowPierced = 0;
			player.eyebrowPShort = "";
			player.eyebrowPLong = "";
			player.earsPierced = 0;
			player.earsPShort = "";
			player.earsPLong = "";
			player.nosePierced = 0;
			player.nosePShort = "";
			player.nosePLong = "";
		}
		else {
			trace("LOADING PIERCINGS");
			player.nipplesPierced = saveFile.data.nipplesPierced;
			player.nipplesPShort = saveFile.data.nipplesPShort;
			player.nipplesPLong = saveFile.data.nipplesPLong;
			player.lipPierced = saveFile.data.lipPierced;
			player.lipPShort = saveFile.data.lipPShort;
			player.lipPLong = saveFile.data.lipPLong; 
			player.tonguePierced = saveFile.data.tonguePierced;
			player.tonguePShort = saveFile.data.tonguePShort;
			player.tonguePLong = saveFile.data.tonguePLong;
			player.eyebrowPierced = saveFile.data.eyebrowPierced;
			player.eyebrowPShort = saveFile.data.eyebrowPShort;
			player.eyebrowPLong = saveFile.data.eyebrowPLong;
			player.earsPierced = saveFile.data.earsPierced;
			player.earsPShort = saveFile.data.earsPShort;
			player.earsPLong = saveFile.data.earsPLong;
			player.nosePierced = saveFile.data.nosePierced;
			player.nosePShort = saveFile.data.nosePShort;
			player.nosePLong = saveFile.data.nosePLong;
		}
		
		//CLOTHING/ARMOR
		player.armorName = saveFile.data.armorName;
		player.weaponName = saveFile.data.weaponName;
		player.weaponVerb = saveFile.data.weaponVerb;
		player.armorDef = saveFile.data.armorDef;
		player.armorPerk = saveFile.data.armorPerk;
		player.weaponAttack = saveFile.data.weaponAttack;
		player.weaponPerk = saveFile.data.weaponPerk;
		player.weaponValue = saveFile.data.weaponValue;
		player.armorValue = saveFile.data.armorValue;
		
		//MAIN STATS
		player.str = saveFile.data.str;
		player.tou = saveFile.data.tou;
		player.spe = saveFile.data.spe;
		player.inte = saveFile.data.inte;
		player.lib = saveFile.data.lib;
		player.sens = saveFile.data.sens;
		player.cor = saveFile.data.cor;
		player.fatigue = saveFile.data.fatigue;
		
		//Combat STATS
		player.HP = saveFile.data.HP;
		player.lust = saveFile.data.lust;
		//LEVEL STATS
		player.XP = saveFile.data.XP;
		player.level = saveFile.data.level;
		player.gems = saveFile.data.gems;
		
		//Appearance
		player.gender = saveFile.data.gender;
		player.tallness = saveFile.data.tallness;
		player.hairColor = saveFile.data.hairColor;
		player.hairLength = saveFile.data.hairLength;
		player.skinType = saveFile.data.skinType;
		player.skinTone = saveFile.data.skinTone;
		player.skinDesc = saveFile.data.skinDesc;
		player.faceType = saveFile.data.faceType;
		if(saveFile.data.tongueType == undefined) player.tongueType = 0;
		else player.tongueType = saveFile.data.tongueType;
		if(saveFile.data.earType == undefined) player.earType = 0;
		else player.earType = saveFile.data.earType;
		if(saveFile.data.earValue == undefined) player.earValue = 0;
		else player.earValue = saveFile.data.earValue;
		if(saveFile.data.antennae == undefined) player.antennae = 0;
		else player.antennae = saveFile.data.antennae;
		player.horns = saveFile.data.horns;
		if(saveFile.data.hornType == undefined) player.hornType = 0;
		else player.hornType = saveFile.data.hornType;
		player.wingDesc = saveFile.data.wingDesc;
		player.wingType = saveFile.data.wingType;
		player.lowerBody = saveFile.data.lowerBody;
		player.tailType = saveFile.data.tailType;
		player.tailVenom = saveFile.data.tailVenum;
		player.tailRecharge = saveFile.data.tailRecharge;
		player.hipRating = saveFile.data.hipRating;
		player.buttRating = saveFile.data.buttRating;
		
		//Sexual Stuff
		player.balls = saveFile.data.balls;
		player.cumMultiplier = saveFile.data.cumMultiplier;
		player.ballSize = saveFile.data.ballSize;
		player.hoursSinceCum = saveFile.data.hoursSinceCum;
		player.fertility = saveFile.data.fertility;
		player.clitLength = saveFile.data.clitLength;
		
		//Preggo stuff
		player.pregnancyIncubation = saveFile.data.pregnancyIncubation;
		player.pregnancyType = saveFile.data.pregnancyType;
		player.buttPregnancyIncubation = saveFile.data.buttPregnancyIncubation;
		player.buttPregnancyType = saveFile.data.buttPregnancyType;
		
		//ARRAYS HERE!
		//Set Cock array
		for(i = 0; i < saveFile.data.cocks.length; i++) {
			player.createCock();
		}
		//Populate Cock Array
		for(i = 0; i < saveFile.data.cocks.length ; i++) {
			player.cocks[i].cockThickness = saveFile.data.cocks[i].cockThickness;
			player.cocks[i].cockLength = saveFile.data.cocks[i].cockLength;
			player.cocks[i].cockType = saveFile.data.cocks[i].cockType;
			player.cocks[i].knotMultiplier = saveFile.data.cocks[i].knotMultiplier;
			if(saveFile.data.cocks[i].pierced == undefined) {
				player.cocks[i].pierced = 0;
				player.cocks[i].pShort = "";
				player.cocks[i].pLong = "";
			}
			else {
				player.cocks[i].pierced = saveFile.data.cocks[i].pierced;
				player.cocks[i].pShort = saveFile.data.cocks[i].pShort;
				player.cocks[i].pLong = saveFile.data.cocks[i].pLong;
			}
			trace("LoadOne Cock i(" + i + ")");
		}
		//Set Vaginal Array
		for(i = 0; i < saveFile.data.vaginas.length ; i++) {
			player.createVagina();
		}
		//Populate Vaginal Array
		for(i = 0; i < saveFile.data.vaginas.length ; i++) {
			player.vaginas[i].vaginalWetness = saveFile.data.vaginas[i].vaginalWetness;
			player.vaginas[i].vaginalLooseness = saveFile.data.vaginas[i].vaginalLooseness;
			player.vaginas[i].fullness = saveFile.data.vaginas[i].fullness;
			player.vaginas[i].virgin = saveFile.data.vaginas[i].virgin;
			if(saveFile.data.vaginas[i].labiaPierced == undefined) {
				player.vaginas[i].labiaPierced = 0;
				player.vaginas[i].labiaPShort = "";
				player.vaginas[i].labiaPLong = "";
				player.vaginas[i].clitPierced = 0;
				player.vaginas[i].clitPShort = "";
				player.vaginas[i].clitPLong = "";
			}
			else {
				player.vaginas[i].labiaPierced = saveFile.data.vaginas[i].labiaPierced;
				player.vaginas[i].labiaPShort = saveFile.data.vaginas[i].labiaPShort;
				player.vaginas[i].labiaPLong = saveFile.data.vaginas[i].labiaPLong;
				player.vaginas[i].clitPierced = saveFile.data.vaginas[i].clitPierced;
				player.vaginas[i].clitPShort = saveFile.data.vaginas[i].clitPShort;
				player.vaginas[i].clitPLong = saveFile.data.vaginas[i].clitPLong;
			}
			trace("LoadOne Vagina i(" + i + ")");
		}
		//NIPPLES
		if(saveFile.data.nippleLength == undefined) player.nippleLength = .25;
		else player.nippleLength = saveFile.data.nippleLength;
		//Set Breast Array
		for(i = 0; i < saveFile.data.breastRows.length ; i++) {
			player.createBreastRow();
			trace("LoadOne BreastROw i(" + i + ")");
		}
		//Populate Breast Array
		for(i = 0; i < saveFile.data.breastRows.length ; i++) {
			player.breastRows[i].breasts = saveFile.data.breastRows[i].breasts;
			player.breastRows[i].nipplesPerBreast = saveFile.data.breastRows[i].nipplesPerBreast;
			player.breastRows[i].breastRating = saveFile.data.breastRows[i].breastRating;
			player.breastRows[i].lactationMultiplier = saveFile.data.breastRows[i].lactationMultiplier;
			if(player.breastRows[i].lactationMultiplier < 0) player.breastRows[i].lactationMultiplier = 0;
			player.breastRows[i].milkFullness = saveFile.data.breastRows[i].milkFullness;
			player.breastRows[i].fuckable = saveFile.data.breastRows[i].fuckable;
			player.breastRows[i].fullness = saveFile.data.breastRows[i].fullness;
			if(player.breastRows[i].breastRating < 0) player.breastRows[i].breastRating = 0;
		}
		//Set Perk Array
		for(i = 0; i < saveFile.data.perks.length ; i++) {
			player.createPerk("TEMP", 0, 0, 0, 0);
			trace("LoadOne Perk i(" + i + ")");
		}
		//Populate Perk Array
		for(i = 0; i < saveFile.data.perks.length ; i++) {
			player.perks[i].perkName = saveFile.data.perks[i].perkName;
			player.perks[i].value1 = saveFile.data.perks[i].value1;
			player.perks[i].value2 = saveFile.data.perks[i].value2;
			player.perks[i].value3 = saveFile.data.perks[i].value3;
			player.perks[i].value4 = saveFile.data.perks[i].value4;
			//If no save data for perkDesc, initialize it.
			if(saveFile.data.perks[i].perkDesc == undefined) player.perks[i].perkDesc = "<b>N/A: This is an older character file.</b>";
			else player.perks[i].perkDesc = saveFile.data.perks[i].perkDesc;
			trace("Perk " + player.perks[i].perkName + " loaded.");
		}
		//Set Status Array
		for(i = 0; i < saveFile.data.statusAffects.length ; i++) {
			player.createStatusAffect("TEMP", 0, 0, 0, 0);
		}
		//Populate Status Array
		for(i = 0; i < saveFile.data.statusAffects.length ; i++) {
			player.statusAffects[i].statusAffectName = saveFile.data.statusAffects[i].statusAffectName;
			player.statusAffects[i].value1 = saveFile.data.statusAffects[i].value1;
			player.statusAffects[i].value2 = saveFile.data.statusAffects[i].value2;
			player.statusAffects[i].value3 = saveFile.data.statusAffects[i].value3;
			player.statusAffects[i].value4 = saveFile.data.statusAffects[i].value4;
			trace("StatusAffect " + player.statusAffects[i].statusAffectName + " loaded.");
		}
		//Make sure keyitems exist!
		if(saveFile.data.keyItems != undefined) {
			//Set keyItems Array
			for(i = 0; i < saveFile.data.keyItems.length ; i++) {
				player.createKeyItem("TEMP", 0, 0, 0, 0);
			}
			//Populate keyItems Array
			for(i = 0; i < saveFile.data.keyItems.length ; i++) {
				player.keyItems[i].keyName = saveFile.data.keyItems[i].keyName;
				player.keyItems[i].value1 = saveFile.data.keyItems[i].value1;
				player.keyItems[i].value2 = saveFile.data.keyItems[i].value2;
				player.keyItems[i].value3 = saveFile.data.keyItems[i].value3;
				player.keyItems[i].value4 = saveFile.data.keyItems[i].value4;
				trace("KeyItem " + player.keyItems[i].keyName + " loaded.");
			}
		}
		//Set storage slot array
		if(saveFile.data.itemStorage == undefined) {
			trace("OLD SAVES DO NOT CONTAIN ITEM STORAGE ARRAY");
		}
		else {
			for(i = 0; i < saveFile.data.itemStorage.length ; i++) {
				itemStorage.push(new Array());
				trace("Initialize a slot for one of the item storage locations to load.");
			}
			//Populate storage slot array
			for(i = 0; i < saveFile.data.itemStorage.length ; i++) {
				trace("Populating a storage slot save with data");
				itemStorage[i].shortName = saveFile.data.itemStorage[i].shortName;
				itemStorage[i].quantity = saveFile.data.itemStorage[i].quantity;
				itemStorage[i].unlocked = saveFile.data.itemStorage[i].unlocked;
				if(itemStorage[i].shortName.indexOf("Gro+") != -1) itemStorage[i].shortName = "GroPlus";
			}
		}
		//player.cocks = saveFile.data.cocks;
		player.ass.analLooseness = saveFile.data.ass.analLooseness;
		player.ass.analWetness = saveFile.data.ass.analWetness;
		player.ass.fullness = saveFile.data.ass.fullness;
		
		
		
		//Shit
		gameState = saveFile.data.gameState;
		player.exploredLake = saveFile.data.exploredLake;
		player.exploredMountain = saveFile.data.exploredMountain;
		player.exploredForest = saveFile.data.exploredForest;
		player.exploredDesert = saveFile.data.exploredDesert;
		player.explored = saveFile.data.explored;
		foundForest = saveFile.data.foundForest;
		foundDesert = saveFile.data.foundDesert;
		foundMountain = saveFile.data.foundMountain;
		foundLake = saveFile.data.foundLake;
		
		//Days
		//Time and Items
		hours = saveFile.data.hours;
		days = saveFile.data.days;
		if(saveFile.data.autoSave == undefined) player.autoSave = false;
		else player.autoSave = saveFile.data.autoSave;
		
		//PLOTZ
		whitney = saveFile.data.whitney;
		monk = saveFile.data.monk;
		sand = saveFile.data.sand;
		if(saveFile.data.giacomo == undefined) giacomo = 0;
		else giacomo = saveFile.data.giacomo;
		if(saveFile.data.beeProgress == undefined) beeProgress = 0;
		else beeProgress = saveFile.data.beeProgress;
		
		//ITEMZ. Item1
		itemSlot1.quantity = saveFile.data.itemSlot1.quantity;
		itemSlot1.shortName = saveFile.data.itemSlot1.shortName;
		itemSlot1.unlocked = saveFile.data.itemSlot1.unlocked;
		itemSlot2.quantity = saveFile.data.itemSlot2.quantity;
		itemSlot2.shortName = saveFile.data.itemSlot2.shortName;		
		itemSlot2.unlocked = saveFile.data.itemSlot2.unlocked;
		itemSlot3.quantity = saveFile.data.itemSlot3.quantity;
		itemSlot3.shortName = saveFile.data.itemSlot3.shortName;
		itemSlot3.unlocked = saveFile.data.itemSlot3.unlocked;
		itemSlot4.quantity = saveFile.data.itemSlot4.quantity;
		itemSlot4.shortName = saveFile.data.itemSlot4.shortName;
		itemSlot4.unlocked = saveFile.data.itemSlot4.unlocked;
		itemSlot5.quantity = saveFile.data.itemSlot5.quantity;
		itemSlot5.shortName = saveFile.data.itemSlot5.shortName;
		itemSlot5.unlocked = saveFile.data.itemSlot5.unlocked;
		if(itemSlot1.shortName.indexOf("Gro+") != -1) itemSlot1.shortName = "GroPlus";
		if(itemSlot2.shortName.indexOf("Gro+") != -1) itemSlot2.shortName = "GroPlus";
		if(itemSlot3.shortName.indexOf("Gro+") != -1) itemSlot3.shortName = "GroPlus";
		if(itemSlot4.shortName.indexOf("Gro+") != -1) itemSlot4.shortName = "GroPlus";
		if(itemSlot5.shortName.indexOf("Gro+") != -1) itemSlot5.shortName = "GroPlus";
		return true;
	}
	return false;
}*/

/*function saveGame(slot:String):Boolean
{
	import classes.cockClass;
	import classes.vaginaClass;
	import classes.breastRowClass;
	import classes.assClass;
	import classes.perkClass;
	import classes.statusAffectClass;
	//Autosave stuff
	if(player.slotName != "VOID") player.slotName = slot;
	
	//Dont save if no stats to save:

	var counter:Number = player.cocks.length;
	//Invalid player data cannot be saved.
	if(player.str == 0) return false;
    //Initialize the save file
    var saveFile = SharedObject.getLocal(slot,"/");;
    //Set a single variable that tells us if this save exists
	saveFile.data.exists = true;
	//CLEAR OLD ARRAYS
	
    //Save sum dataz
	trace("SAVE DATAZ");
	saveFile.data.short = player.short;
	saveFile.data.a = player.a;
	saveFile.data.long = player.long;
	saveFile.data.capitalA = player.capitalA;
	saveFile.data.temperment = player.temperment;
	saveFile.data.special1 = player.special1;
	saveFile.data.special2 = player.special2;
	saveFile.data.special3 = player.special3;
	saveFile.data.pronoun1 = player.pronoun1;
	saveFile.data.pronoun2 = player.pronoun2;
	saveFile.data.pronoun3 = player.pronoun3;
	
	//Notes
	if(nameBox.text != "") {
		saveFile.data.notes = nameBox.text;
		notes = nameBox.text;
	}
	else saveFile.data.notes = notes;
	nameBox.visible = false;
	
	
	//flags
	saveFile.data.flags = new Array();
	for(var i=0;i < flags.length;i++) {
		saveFile.data.flags[i] = flags[i];
	}	
	//CLOTHING/ARMOR
	saveFile.data.armorName = player.armorName;
	saveFile.data.weaponName = player.weaponName;
	saveFile.data.weaponVerb = player.weaponVerb;
	saveFile.data.armorDef = player.armorDef;
	saveFile.data.armorPerk = player.armorPerk;
	saveFile.data.weaponAttack = player.weaponAttack;
	saveFile.data.weaponPerk = player.weaponPerk;
	saveFile.data.weaponValue = player.weaponValue;
	saveFile.data.armorValue = player.armorValue;
	
	//PIERCINGS
	saveFile.data.nipplesPierced = player.nipplesPierced;
	saveFile.data.nipplesPShort = player.nipplesPShort;
	saveFile.data.nipplesPLong = player.nipplesPLong;
	saveFile.data.lipPierced = player.lipPierced;
	saveFile.data.lipPShort = player.lipPShort;
	saveFile.data.lipPLong = player.lipPLong;
	saveFile.data.tonguePierced = player.tonguePierced;
	saveFile.data.tonguePShort = player.tonguePShort;
	saveFile.data.tonguePLong = player.tonguePLong;
	saveFile.data.eyebrowPierced = player.eyebrowPierced;
	saveFile.data.eyebrowPShort = player.eyebrowPShort;
	saveFile.data.eyebrowPLong = player.eyebrowPLong;
	saveFile.data.earsPierced = player.earsPierced;
	saveFile.data.earsPShort = player.earsPShort;
	saveFile.data.earsPLong = player.earsPLong;
	saveFile.data.nosePierced = player.nosePierced;
	saveFile.data.nosePShort = player.nosePShort;
	saveFile.data.nosePLong = player.nosePLong;
	
	
	
	//MAIN STATS
	saveFile.data.str = player.str;
	saveFile.data.tou = player.tou;
	saveFile.data.spe = player.spe;
	saveFile.data.inte = player.inte;
	saveFile.data.lib = player.lib;
	saveFile.data.sens = player.sens;
	saveFile.data.cor = player.cor;
	saveFile.data.fatigue = player.fatigue;
	//Combat STATS
	saveFile.data.HP = player.HP;
	saveFile.data.lust = player.lust;
	//LEVEL STATS
	saveFile.data.XP = player.XP;
	saveFile.data.level = player.level;
	saveFile.data.gems = player.gems;
	
	//Appearance
	saveFile.data.gender = player.gender;
	saveFile.data.tallness = player.tallness;
	saveFile.data.hairColor = player.hairColor;
	saveFile.data.hairLength = player.hairLength;
	saveFile.data.skinType = player.skinType;
	saveFile.data.skinTone = player.skinTone;
	saveFile.data.skinDesc = player.skinDesc;
	saveFile.data.faceType = player.faceType;
	saveFile.data.tongueType = player.tongueType;
	saveFile.data.earType = player.earType;
	saveFile.data.earValue = player.earValue;
	saveFile.data.antennae = player.antennae;
	saveFile.data.horns = player.horns;
	saveFile.data.hornType = player.hornType;
	saveFile.data.wingDesc = player.wingDesc;
	saveFile.data.wingType = player.wingType;
	saveFile.data.lowerBody = player.lowerBody;
	saveFile.data.tailType = player.tailType;
	saveFile.data.tailVenum = player.tailVenom;
	saveFile.data.tailRecharge = player.tailRecharge;
	saveFile.data.hipRating = player.hipRating;
	saveFile.data.buttRating = player.buttRating;
	
	//Sexual Stuff
	saveFile.data.balls = player.balls;
	saveFile.data.cumMultiplier = player.cumMultiplier;
	saveFile.data.ballSize = player.ballSize;
	saveFile.data.hoursSinceCum = player.hoursSinceCum;
	saveFile.data.fertility = player.fertility;
	saveFile.data.clitLength = player.clitLength;
	
	//Preggo stuff
	saveFile.data.pregnancyIncubation = player.pregnancyIncubation;
	saveFile.data.pregnancyType = player.pregnancyType;
	saveFile.data.buttPregnancyIncubation = player.buttPregnancyIncubation;
	saveFile.data.buttPregnancyType = player.buttPregnancyType;
	
	
	//myLocalData.data.furnitureArray = new Array();
	//for (var i:Number = 0; i < GameArray.length; i++) {
		//myLocalData.data.girlArray.push(new Array());
		//myLocalData.data.girlEffectArray.push(new Array());
	//}
	
	saveFile.data.cocks = new Array();
	saveFile.data.vaginas = new Array();
	saveFile.data.breastRows= new Array();
	saveFile.data.perks = new Array();
	saveFile.data.statusAffects = new Array();
	saveFile.data.ass = new Array();
	saveFile.data.keyItems = new Array();
	saveFile.data.itemStorage = new Array();
	//Set array
	for(i = 0; i < player.cocks.length; i++) {
		saveFile.data.cocks.push(new Array());
	}
	//Populate Array
	for(i = 0; i < player.cocks.length ; i++) {
		saveFile.data.cocks[i].cockThickness = player.cocks[i].cockThickness;
		saveFile.data.cocks[i].cockLength = player.cocks[i].cockLength;
		saveFile.data.cocks[i].cockType = player.cocks[i].cockType;
		saveFile.data.cocks[i].knotMultiplier = player.cocks[i].knotMultiplier;
		saveFile.data.cocks[i].pierced = player.cocks[i].pierced;
		saveFile.data.cocks[i].pShort = player.cocks[i].pShort;
		saveFile.data.cocks[i].pLong = player.cocks[i].pLong;
	}
	//Set Vaginal Array
	for(i = 0; i < player.vaginas.length ; i++) {
		saveFile.data.vaginas.push(new Array());
	}
	//Populate Vaginal Array
	for(i = 0; i < player.vaginas.length ; i++) {
		saveFile.data.vaginas[i].vaginalWetness = player.vaginas[i].vaginalWetness;
		saveFile.data.vaginas[i].vaginalLooseness = player.vaginas[i].vaginalLooseness;
		saveFile.data.vaginas[i].fullness = player.vaginas[i].fullness;
		saveFile.data.vaginas[i].virgin = player.vaginas[i].virgin;
		saveFile.data.vaginas[i].labiaPierced = player.vaginas[i].labiaPierced;
		saveFile.data.vaginas[i].labiaPShort = player.vaginas[i].labiaPShort;
		saveFile.data.vaginas[i].labiaPLong = player.vaginas[i].labiaPLong;
		saveFile.data.vaginas[i].clitPierced = player.vaginas[i].clitPierced;
		saveFile.data.vaginas[i].clitPShort = player.vaginas[i].clitPShort;
		saveFile.data.vaginas[i].clitPLong = player.vaginas[i].clitPLong;		
	}
	//NIPPLES
	saveFile.data.nippleLength = player.nippleLength;
	//Set Breast Array
	for(i = 0; i < player.breastRows.length ; i++) {
		saveFile.data.breastRows.push(new Array());
		trace("Saveone breastRow");
	}
	//Populate Breast Array
	for(i = 0; i < player.breastRows.length ; i++) {
		trace("Populate One BRow");
		saveFile.data.breastRows[i].breasts             = player.breastRows[i].breasts;
		saveFile.data.breastRows[i].breastRating        = player.breastRows[i].breastRating;
		saveFile.data.breastRows[i].nipplesPerBreast    = player.breastRows[i].nipplesPerBreast;
		saveFile.data.breastRows[i].lactationMultiplier = player.breastRows[i].lactationMultiplier;
		saveFile.data.breastRows[i].milkFullness        = player.breastRows[i].milkFullness;
		saveFile.data.breastRows[i].fuckable            = player.breastRows[i].fuckable;
		saveFile.data.breastRows[i].fullness            = player.breastRows[i].fullness;
	}
	//Set Perk Array
	for(i = 0; i < player.perks.length ; i++) {
		saveFile.data.perks.push(new Array());
		trace("Saveone Perk");
	}
	//Populate Perk Array
	for(i = 0; i < player.perks.length ; i++) {
		trace("Populate One Perk");
		saveFile.data.perks[i].perkName = player.perks[i].perkName;
		saveFile.data.perks[i].value1 = player.perks[i].value1;
		saveFile.data.perks[i].value2 = player.perks[i].value2;
		saveFile.data.perks[i].value3 = player.perks[i].value3;
		saveFile.data.perks[i].value4 = player.perks[i].value4;
		saveFile.data.perks[i].perkDesc = player.perks[i].perkDesc;
	}
	
	//Set Status Array
	for(i = 0; i < player.statusAffects.length ; i++) {
		saveFile.data.statusAffects.push(new Array());
		trace("Saveone statusAffects");
	}
	//Populate Status Array
	for(i = 0; i < player.statusAffects.length ; i++) {
		trace("Populate One statusAffects");
		saveFile.data.statusAffects[i].statusAffectName = player.statusAffects[i].statusAffectName;
		saveFile.data.statusAffects[i].value1 = player.statusAffects[i].value1;
		saveFile.data.statusAffects[i].value2 = player.statusAffects[i].value2;
		saveFile.data.statusAffects[i].value3 = player.statusAffects[i].value3;
		saveFile.data.statusAffects[i].value4 = player.statusAffects[i].value4;
	}
	//Set keyItem Array
	for(i = 0; i < player.keyItems.length ; i++) {
		saveFile.data.keyItems.push(new Array());
		trace("Saveone keyItem");
	}
	//Populate keyItem Array
	for(i = 0; i < player.keyItems.length ; i++) {
		trace("Populate One keyItemzzzzzz");
		saveFile.data.keyItems[i].keyName = player.keyItems[i].keyName;
		saveFile.data.keyItems[i].value1 = player.keyItems[i].value1;
		saveFile.data.keyItems[i].value2 = player.keyItems[i].value2;
		saveFile.data.keyItems[i].value3 = player.keyItems[i].value3;
		saveFile.data.keyItems[i].value4 = player.keyItems[i].value4;
	}
	//Set storage slot array
	for(i = 0; i < itemStorage.length ; i++) {
		saveFile.data.itemStorage.push(new Array());
		trace("Initialize a slot for one of the item storage locations.");
	}
	//Populate storage slot array
	for(i = 0; i < itemStorage.length ; i++) {
		trace("Populating a storage slot save with data");
		saveFile.data.itemStorage[i].shortName = itemStorage[i].shortName;
		saveFile.data.itemStorage[i].quantity = itemStorage[i].quantity;
		saveFile.data.itemStorage[i].unlocked = itemStorage[i].unlocked;
	}
	saveFile.data.ass.push(new Array());
	saveFile.data.ass.analWetness = player.ass.analWetness;
	saveFile.data.ass.analLooseness = player.ass.analLooseness;
	saveFile.data.ass.fullness = player.ass.fullness;
	//EXPLORED
	saveFile.data.exploredLake = player.exploredLake;
	saveFile.data.exploredMountain = player.exploredMountain;
	saveFile.data.exploredForest = player.exploredForest;
	saveFile.data.exploredDesert = player.exploredDesert;
	saveFile.data.explored = player.explored;
	saveFile.data.foundForest = foundForest;
	saveFile.data.foundDesert = foundDesert;
	saveFile.data.foundMountain = foundMountain;
	saveFile.data.foundLake = foundLake;
	saveFile.data.gameState = gameState;
	
	//Time and Items
	saveFile.data.hours = hours;
	saveFile.data.days = days;
	saveFile.data.autoSave = player.autoSave;
	
	//PLOTZ
	saveFile.data.whitney = whitney;
	saveFile.data.monk = monk;
	saveFile.data.sand = sand;
	saveFile.data.giacomo = giacomo;
	saveFile.data.beeProgress = beeProgress;
	
	//ITEMZ. Item1s
	saveFile.data.itemSlot1 = new Array();
	saveFile.data.itemSlot1.quantity = itemSlot1.quantity;
	saveFile.data.itemSlot1.shortName = itemSlot1.shortName;
	saveFile.data.itemSlot1.unlocked = itemSlot1.unlocked;
	saveFile.data.itemSlot2 = new Array();
	saveFile.data.itemSlot2.quantity = itemSlot2.quantity;
	saveFile.data.itemSlot2.shortName = itemSlot2.shortName;		
	saveFile.data.itemSlot2.unlocked = itemSlot2.unlocked;
	saveFile.data.itemSlot3 = new Array();
	saveFile.data.itemSlot3.quantity = itemSlot3.quantity;
	saveFile.data.itemSlot3.shortName = itemSlot3.shortName;
	saveFile.data.itemSlot3.unlocked = itemSlot3.unlocked;
	saveFile.data.itemSlot4 = new Array();
	saveFile.data.itemSlot4.quantity = itemSlot4.quantity;
    saveFile.data.itemSlot4.shortName = itemSlot4.shortName;
	saveFile.data.itemSlot4.unlocked = itemSlot4.unlocked;
	saveFile.data.itemSlot5 = new Array();
	saveFile.data.itemSlot5.quantity = itemSlot5.quantity;
	saveFile.data.itemSlot5.shortName = itemSlot5.shortName;
	saveFile.data.itemSlot5.unlocked = itemSlot5.unlocked;
	if(saveFile.flush() == SharedObjectFlushStatus.FLUSHED) return true;
	else return false;
}
*/

//This is just the save/load code - from it you can get 
//strings from the save objects, and load games from strings. 
//What you do with the strings, and where you get them from 
//is not handled here. For this to work right, you'll need to
//modify saveGameObject() to use an int or something instead 
//of a boolean to identify the save type (0 = normal, 
//1 = file, 2 = text and so on), and modify the if/else at the 
//bottom, which currently checks if a boolean is true for 
//using the file saving code, else it uses slot saving.
 
//Arrays for converting a byte array into a string
const encodeChars:Array =  
        ['A','B','C','D','E','F','G','H',  
        'I','J','K','L','M','N','O','P',  
        'Q','R','S','T','U','V','W','X',  
        'Y','Z','a','b','c','d','e','f',  
        'g','h','i','j','k','l','m','n',  
        'o','p','q','r','s','t','u','v',  
        'w','x','y','z','0','1','2','3',  
        '4','5','6','7','8','9','+','/'];  
const decodeChars:Array =  
        [-1, -1, -1, -1, -1, -1, -1, -1,  
        -1, -1, -1, -1, -1, -1, -1, -1,  
        -1, -1, -1, -1, -1, -1, -1, -1,  
        -1, -1, -1, -1, -1, -1, -1, -1,  
        -1, -1, -1, -1, -1, -1, -1, -1,  
        -1, -1, -1, 62, -1, -1, -1, 63,  
        52, 53, 54, 55, 56, 57, 58, 59,  
        60, 61, -1, -1, -1, -1, -1, -1,  
        -1,  0,  1,  2,  3,  4,  5,  6,  
         7,  8,  9, 10, 11, 12, 13, 14,  
        15, 16, 17, 18, 19, 20, 21, 22,  
        23, 24, 25, -1, -1, -1, -1, -1,  
        -1, 26, 27, 28, 29, 30, 31, 32,  
        33, 34, 35, 36, 37, 38, 39, 40,  
        41, 42, 43, 44, 45, 46, 47, 48,  
        49, 50, 51, -1, -1, -1, -1, -1];
 
//ByteArray > String
function b64e(data:ByteArray):String
{  
        var out:Array = [];  
        var i:int = 0;  
        var j:int = 0;  
        var r:int = data.length % 3;  
        var len:int = data.length - r;  
        var c:int;  
        while (i < len)
        {  
                c = data[i++] << 16 | data[i++] << 8 | data[i++];  
        out[j++] = encodeChars[c >> 18] + encodeChars[c >> 12 & 0x3f] + encodeChars[c >> 6 & 0x3f] + encodeChars[c & 0x3f];  
        }  
        if (r == 1)
        {  
                c = data[i++];  
                out[j++] = encodeChars[c >> 2] + encodeChars[(c & 0x03) << 4] + "==";  
        }  
    else if (r == 2)
        {  
                c = data[i++] << 8 | data[i++];  
                out[j++] = encodeChars[c >> 10] + encodeChars[c >> 4 & 0x3f] + encodeChars[(c & 0x0f) << 2] + "=";  
        }  
        return out.join('');  
}
 
//String > ByteArray
function b64d(str:String):ByteArray
{  
        var c1:int;  
        var c2:int;  
        var c3:int;  
        var c4:int;  
        var i:int;  
        var len:int;  
        var out:ByteArray;  
        len = str.length;  
        i = 0;  
        out = new ByteArray();  
        while (i < len)
        {  
                // c1  
                do
                {  
                        c1 = decodeChars[str.charCodeAt(i++) & 0xff];  
                } while (i < len && c1 == -1);  
                if (c1 == -1)
                {  
                        break;  
                }  
                // c2      
                do
                {  
                        c2 = decodeChars[str.charCodeAt(i++) & 0xff];  
                } while (i < len && c2 == -1);  
                if (c2 == -1)
                {  
                        break;  
                }
               
                out.writeByte((c1 << 2) | ((c2 & 0x30) >> 4));  
               
                // c3  
                do
                {
                        c3 = str.charCodeAt(i++) & 0xff;  
                        if (c3 == 61)
                        {  
                                        return out;  
                        }  
                        c3 = decodeChars[c3];  
                } while (i < len && c3 == -1);  
                if (c3 == -1)
                {  
                        break;  
                }
               
                out.writeByte(((c2 & 0x0f) << 4) | ((c3 & 0x3c) >> 2));  
 
                // c4  
                do
                {  
                        c4 = str.charCodeAt(i++) & 0xff;  
                        if (c4 == 61)
                        {  
                                return out;  
                        }  
                        c4 = decodeChars[c4];  
                } while (i < len && c4 == -1);  
                if (c4 == -1)
                {  
                        break;  
                }  
                out.writeByte(((c3 & 0x03) << 6) | c4);  
        }  
        return out;  
}  
 
//This loads the game from the string
function loadText(saveText:String):void
{
        //Get the byte array from the string
        var rawSave:ByteArray = b64d(saveText);
 
        //Inflate
        rawSave.inflate();
       
        //Read the object
        var obj:Object = rawSave.readObject();
       
        //Load the object
        loadGameObject(obj);
}
//*******
//This is the modified if for initialising saveFile in saveGameObject(). It assumes the save type parameter passed is an int, that 0 means a slot-save, and is called saveType.
 /*
if(saveType != 0)
{
        saveFile = new Object();
 
        saveFile.data = new Object();
}
else
{
        saveFile = SharedObject.getLocal(slot,"/");
}
//*******
//This stuff is for converting the save object into a string, should go down in saveGameObject(), as an else-if (if saveType == 2, etc)
var rawSave:ByteArray = new ByteArray;
 
//Write the object to the byte array
rawSave.writeObject(saveFile);
 
//Deflate
rawSave.deflate();
 
//Convert to a Base64 string
var saveString:String = b64e(rawSave);
 */
//*******