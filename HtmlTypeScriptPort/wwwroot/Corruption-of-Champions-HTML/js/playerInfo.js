//------------
// LEVEL UP
//------------
function levelScreen() {
	clearOutput();
	//Increment
	player.XP -= (player.level * 100);
	player.level++;
	player.statPoints += 5;
	player.perkPoints += 1;
    outputText("<b>You are now level " + num2Text(player.level) + "!</b><br><br>You have gained five attribute points and one perk point!");
	doNext(attributeMenu);
}
function attributeMenu() {
	clearOutput();
	outputText("You have " + player.statPoints + " points to spend.<br><br>");
	outputText("<b></b>Strength:</b> " + player.str + " + <b>" + tempStr + "</b> → " + (player.str + tempStr) + "<br>");
	outputText("<b>Toughness:</b> " + player.tou + " + <b>" + tempTou + "</b> → " + (player.tou + tempTou) + "<br>");
	outputText("<b>Speed:</b> " + player.spe + " + <b>" + tempSpe + "</b> → " + (player.spe + tempSpe) + "<br>");
	outputText("<b>Intelligence:</b> " + player.inte + " + <b>" + tempInt + "</b> → " + (player.inte + tempInt) + "<br>");
	menu();
	//Add attributes
	if (player.statPoints > 0) {
		if (player.str < 100) addButton(0, "STR +", addAttribute, "str");
		if (player.tou < 100) addButton(1, "TOU +", addAttribute, "tou");
		if (player.spe < 100) addButton(2, "SPE +", addAttribute, "spe");
		if (player.inte < 100) addButton(3, "INTE +", addAttribute, "int");
	}
	//Subtract attributes
	if (tempStr > 0) addButton(5, "STR -", subtractAttribute, "str");
	if (tempTou > 0) addButton(6, "TOU +", subtractAttribute, "tou");
	if (tempSpe > 0) addButton(7, "SPE +", subtractAttribute, "spe");
	if (tempInt > 0) addButton(8, "INTE +", subtractAttribute, "int");
	//Reset & Done
	addButton(4, "Reset", resetAttributes);
	addButton(9, "Done", finishAttributes);
}
function addAttribute(attribute) {
	switch(attribute) {
		case "str":
			tempStr++;
			break;
		case "tou":
			tempTou++;
			break;
		case "spe":
			tempSpe++;
			break;
		case "int":
			tempInt++;
			break;
		default:
            player.statPoints++; //Failsafe
	}
	player.statPoints--;
	attributeMenu();
}
function subtractAttribute(attribute) {
	switch(attribute) {
		case "str":
			tempStr--;
			break;
		case "tou":
			tempTou--;
			break;
		case "spe":
			tempSpe--;
			break;
		case "int":
			tempInt--;
			break;
		default:
            player.statPoints--; //Failsafe
	}
	player.statPoints++;
	attributeMenu();
}
function resetAttributes() {
	//Increment unspent attribute points.
	player.statPoints += tempStr;
	player.statPoints += tempTou;
	player.statPoints += tempSpe;
	player.statPoints += tempInt;
	//Reset temporary attributes to 0.
	tempStr = 0;
	tempTou = 0;
	tempSpe = 0;
	tempInt = 0;
	//DONE!
	attributeMenu();
}
function finishAttributes() {
	clearOutput();
	if (tempStr > 0) {
		if (tempStr >= 3) outputText("Your muscles feel significantly stronger from your time adventuring.<br>");
		else outputText("Your muscles feel slightly stronger from your time adventuring.<br>");
	}
	if (tempTou > 0) {
		if (tempTou >= 3) outputText("You feel tougher from all the fights you have endured.<br>");
		else outputText("You feel slightly tougher from all the fights you have endured.<br>");
	}
	if (tempSpe > 0) {
		if (tempSpe >= 3) outputText("Your time in combat has driven you to move faster.<br>");
		else outputText("Your time in combat has driven you to move slightly faster.<br>");
	}
	if (tempInt > 0) {
		if (tempInt >= 3) outputText("Your time spent fighting the creatures of this realm has sharpened your wit.<br>");
		else outputText("Your time spent fighting the creatures of this realm has sharpened your wit slightly.<br>");
	}
	if (tempStr + tempTou + tempSpe + tempInt <= 0 || player.statPoints > 0) {
		outputText("<br>You may allocate your remaining stat points later.");
	}
	player.modStats("str", tempStr);
	player.modStats("tou", tempTou);
	player.modStats("spe", tempSpe);
	player.modStats("int", tempInt);
	tempStr = 0;
	tempTou = 0;
	tempSpe = 0;
	tempInt = 0;
	if (player.perkPoints > 0) doNext(perkBuyMenu);
	else doNext(playerMenu);
}
function perkBuyMenu() {
    clearOutput();
    var perksAvailable = PerkMenuBuilder.buildPerkList();
    menu();
    if (perksAvailable.length > 0) {
        outputText("Please select a perk from the drop-down list, then click 'Okay'. You can press 'Skip' to save your perk point for later.<br>");
        var perkDropdownString = ""; //Will be used to be output for dropdown.
        perkDropdownString += "<select id=\"perkselect\">";
        perkDropdownString += "<option value=\"null\"></option>";
        for (var i = 0; i < perksAvailable.length; i++) {
            perkDropdownString += "<option value=\"" + perksAvailable[i].id + "\">" + perksAvailable[i].name + "</option>";
        }
        perkDropdownString += "</select><br><br>";
        outputText(perkDropdownString);
        addButton(0, "Confirm", perkConfirmation);
        addButton(1, "Skip", playerMenu);
    }
    else {
        outputText("You do not currently qualify for any perks. You still retain your perk points.");
        doNext(playerMenu);
    }
}
function perkConfirmation() {
    if (document.getElementById("perkselect").value == "null") {
        perkBuyMenu();
        return;
    }
    var perkGet = PerkLib[document.getElementById("perkselect").value];
    clearOutput();
    outputText("<b>" + perkGet.name + "</b> gained!");
    player.createPerk(perkGet, 0, 0, 0, 0);
    player.perkPoints--;
    doNext(playerMenu);
}

//------------
// STATS
//------------
function statsScreen() {
	clearOutput();
	//Combat Stats
	var combatStats = "";
	combatStats += "<b>Lust Resistance:</b> " + ((1 - player.lustVuln) * 100) + "% (Higher is better)<br>";
    combatStats += "<b>Spell Effect Multiplier:</b> " + (player.spellMod() * 100) + "%<br>";
    if (player.teaseLevel < 5) combatStats += "<b>Tease Skill Level:</b> " + player.teaseLevel + " (Exp: " + player.teaseXP + " / " + (10 + (player.teaseLevel + 1) * 5 * (player.teaseLevel + 1)) +  ")<br>";
    else combatStats += "<b>Tease Skill Level:</b> " + player.teaseLevel + " (Exp: MAX)<br>";
	if (combatStats.length > 0)
		outputText("<b><u>Combat Stats</u></b><br>" + combatStats + "<br><br>");
	//Body Stats
	var bodyStats = "";
	bodyStats += "<b>Anal Capacity:</b> " + player.analCapacity() + "<br>";
	bodyStats += "<b>Anal Looseness:</b> " + player.ass.analLooseness + "<br>";
	if (player.hasCock()) {
		bodyStats += "<b>Cum Production:</b> " + player.cumQ() + "mL<br>";
	}
	if (player.hasVagina()) {
		bodyStats += "<b>Vaginal Capacity:</b> " + player.vaginalCapacity() + "<br>";
		bodyStats += "<b>Vaginal Looseness:</b> " + player.vaginas[0].vaginalLooseness + "<br>";
	}
	if (bodyStats.length > 0)
		outputText("<b><u>Body Stats</u></b><br>" + bodyStats + "<br><br>");
	doNext(playerMenu);
    
    // Addiction Stats
    var addictStats = "";

    // Mino Cum Addiction
    if (gameFlags[EVER_DRANK_MINOCUM] > 0 || gameFlags[MINOTAUR_CUM_ADDICTION_TRACKER] > 0 || player.findPerk(PerkLib.MinotaurCumAddict) >= 0 || player.findPerk(PerkLib.MinotaurCumResistance) >= 0) {
        if (player.findPerk(PerkLib.MinotaurCumAddict) < 0)
            addictStats += "<b>Minotaur Cum:</b> " + Math.round(gameFlags[MINOTAUR_CUM_ADDICTION_TRACKER] * 10)/10 + "%<br>";
        else if (player.findPerk(PerkLib.MinotaurCumResistance) >= 0)
            addictStats += "<b>Minotaur Cum:</b> 0% (Immune)<br>";
        else
            addictStats += "<b>Minotaur Cum:</b> 100+%<br>";
    }

    if (addictStats != "")
        outputText("<br><b><u>Addictions</u></b><br>" + addictStats, false);
    // End Addiction Stats
    
}
//------------
// PERKS
//------------
function perksScreen() {
	clearOutput();
	for (var i = 0; i < player.perks.length; i++) {
		outputText("<b>" + player.perks[i].ptype.name + "</b> - " + player.perks[i].ptype.desc + "<br>");
	}
    doNext(playerMenu);
    //Additional buttons
    var button = 1;
    if (player.perkPoints > 0) {
        outputText("<br><b>You have " + num2Text(player.perkPoints) + " perk point");
        if (player.perkPoints > 1) outputText("s");
        outputText(" to spend.</b>");
        addButton(button++, "Perk Up", perkBuyMenu);
    }
}
//------------
// APPEARANCE
//------------
function appearanceScreen() {
	clearOutput();
    var temp = 0;
	if (player.race() != "human")
		outputText("You began your journey as a human, but gave that up as you explored the dangers of this realm. ");
	outputText("You are a " + Math.floor(player.tallness / 12) + " foot " + player.tallness % 12 + " inch tall " + player.maleFemaleHerm() + " " + player.race() + ", with " + player.bodyType() + ".");
	//outputText("  <b>You are currently " + (player.armorDescript() != "gear" ? "wearing your " + player.armorDescript() : "naked") + "" + " and using your " + player.weaponName + " as a weapon.</b>");
	outputText(" <b>You are currently " + (player.armor.id == "Naked" ? "naked" : "wearing your " + player.armor.equipmentName) + " and using your " + player.weapon.equipmentName + " as a weapon.</b>");
    //HEAD DESCRIPTION
    //Face
    switch(player.faceType) {
        case FACE_HUMAN:
        case FACE_SHARK_TEETH:
        case FACE_BUNNY:
        case FACE_SPIDER_FANGS:
        case FACE_FERRET_MASK:
            if (player.skinType == SKIN_TYPE_PLAIN || player.skinType == SKIN_TYPE_GOO)
                outputText(" Your face is human in shape and structure, with " + player.skin() + ".");
            if (player.skinType == SKIN_TYPE_FUR)
                outputText(" Under your " + player.skinFurScales() + " you have a human-shaped head with " + player.skin(true,false) + ".");
            if (player.skinType == SKIN_TYPE_SCALES)
                outputText(" Your face is fairly human in shape, but is covered in " + player.skin() + ".");
            if (player.faceType == FACE_SHARK_TEETH)
                outputText(" A set of razor-sharp, retractable shark-teeth fill your mouth and gives your visage a slightly angular appearance.");
            else if (player.faceType == FACE_BUNNY)
                outputText(" The constant twitches of your nose and the length of your incisors gives your visage a hint of bunny-like cuteness.");
            else if (player.faceType == FACE_SPIDER_FANGS)
                outputText(" A set of retractable, needle-like fangs sit in place of your canines and are ready to dispense their venom.");
            else if (player.faceType == FACE_FERRET_MASK)
                outputText(" The [skinFurScales] around your eyes is significantly darker than the rest of your face, giving you a cute little ferret mask.");
            break;
        case FACE_FERRET:
            if (player.skinType == SKIN_TYPE_PLAIN) 
                outputText(" Your face is an adorable cross between human and ferret features, complete with a wet nose and whiskers. The only oddity is your lack of fur, leaving only [skin] visible on your ferret-like face.",false);
            else 
                outputText(" Your face is coated in " + player.furColor + " fur with [skin] underneath, an adorable cross between human and ferret features. It is complete with a wet nose and whiskers.");
            break;
        case FACE_RACCOON_MASK:
            if (player.skinType != SKIN_TYPE_FUR && player.skinType != SKIN_TYPE_SCALES) {
                outputText(" Your face is human in shape and structure, with " + player.skin());
                if ((player.skinTone == "ebony" || player.skinTone == "black") && (player.skinType == SKIN_TYPE_PLAIN || player.skinType == SKIN_TYPE_GOO))
                    outputText(", though with your dusky hue, the black raccoon mask you sport isn't properly visible.");
                else outputText(", though it is decorated with a sly-looking raccoon mask over your eyes.");
            }
            else {
                if (((player.furColor == "black" || player.furColor == "midnight") && (player.skinType == SKIN_TYPE_FUR || player.skinType == SKIN_TYPE_SCALES)))
                    outputText(" Under your " + player.skinFurScales() + " hides a black raccoon mask, barely visible due to your inky hue, and");
                else outputText(" Your " + player.skinFurScales() + " are decorated with a sly-looking raccoon mask, and under them");
                outputText(" you have a human-shaped head with " + player.skin(true,false) + ".");
            }
            break;
        case FACE_RACCOON:
            outputText(" You have a triangular raccoon face, replete with sensitive whiskers and a little black nose; a mask shades the space around your eyes, set apart from your " + player.skinFurScales() + " by a band of white.");
            if (player.skinType == SKIN_TYPE_PLAIN)
                outputText(" It looks a bit strange with only the skin and no fur.");
            else if (player.skinType == SKIN_TYPE_SCALES)
                outputText(" The presence of said scales gives your visage an eerie look, more reptile than mammal.");
            break;
        case FACE_FOX:
            outputText(" You have a tapered, shrewd-looking vulpine face with a speckling of downward-curved whiskers just behind the nose.");
            if (player.skinType == SKIN_TYPE_PLAIN)
                outputText(" Oddly enough, there's no fur on your animalistic muzzle, just " + player.skinFurScales() + ".");
            else if (player.skinType == SKIN_TYPE_FUR)
                outputText(" A coat of " + player.skinFurScales() + " decorates your muzzle.");
            else if (player.skinType == SKIN_TYPE_SCALES)
                outputText(" Strangely, " + player.skinFurScales() + " adorn every inch of your animalistic visage.");
            break;
        case FACE_BUCKTEETH:
            outputText(" Your face is generally human in shape and structure, with " + player.skin());
            if (player.skinType == SKIN_TYPE_FUR || player.skinType == SKIN_TYPE_SCALES)
                outputText(" under your " + player.skinFurScales());
            outputText(" and mousey buckteeth.");
            break;
        case FACE_MOUSE:
            outputText(" You have a snubby, tapered mouse's face, with whiskers, a little pink nose, and ");
            if (player.skinType != SKIN_TYPE_FUR && player.skinType != SKIN_TYPE_SCALES)
                outputText(player.skin());
            else
                outputText(player.skin() + " under your " + player.skinFurScales());
            outputText(". Two large incisors complete it.");
            break;
        case FACE_SNAKE_FANGS:
            if (player.skinType == SKIN_TYPE_PLAIN || player.skinType == SKIN_TYPE_GOO)
                outputText(" You have a fairly normal face, with " + player.skin() + ". The only oddity is your pair of dripping fangs which often hang over your lower lip.");
            if (player.skinType == SKIN_TYPE_FUR)
                outputText(" Under your " + player.skinFurScales() + " you have a human-shaped head with " + player.skin(true,false) + ". In addition, a pair of fangs hang over your lower lip, dripping with venom.");
            if (player.skinType == SKIN_TYPE_SCALES)
                outputText(" Your face is fairly human in shape, but is covered in " + player.skinFurScales() + ". In addition, a pair of fangs hang over your lower lip, dripping with venom.");
            break;
        case FACE_HORSE:
            if (player.skinType == SKIN_TYPE_PLAIN || player.skinType == SKIN_TYPE_GOO)
                outputText(" Your face is equine in shape and structure. The odd visage is hairless and covered with " + player.skinFurScales() + ".");
            if (player.skinType == SKIN_TYPE_FUR)
                outputText(" Your face is almost entirely equine in appearance, even having " + player.skinFurScales() + ". Underneath the fur, you believe you have " + player.skin(true,false) + ".");
            if (player.skinType == SKIN_TYPE_SCALES)
                outputText(" You have the face and head structure of a horse, overlaid with glittering " + player.skinFurScales() + ".");
            break;
        case FACE_DOG:
            if (player.skinType == SKIN_TYPE_PLAIN || player.skinType == SKIN_TYPE_GOO)
                outputText(" You have a dog-like face, complete with a wet nose. The odd visage is hairless and covered with " + player.skinFurScales() + ".");
            if (player.skinType == SKIN_TYPE_FUR)
                outputText(" You have a dog's face, complete with wet nose and panting tongue. You've got " + player.skinFurScales() + ", hiding your " + player.skin(true,false) + " underneath your furry visage.");
            if (player.skinType == SKIN_TYPE_SCALES)
                outputText(" You have the facial structure of a dog, wet nose and all, but overlaid with glittering " + player.skinFurScales() + ".");
            break;
        case FACE_CAT:
            if (player.skinType == SKIN_TYPE_PLAIN || player.skinType == SKIN_TYPE_GOO)
                outputText(" You have a cat-like face, complete with a cute, moist nose and whiskers. The " + player.skin() + " that is revealed by your lack of fur looks quite unusual on so feline a face.");
            if (player.skinType == SKIN_TYPE_FUR)
                outputText(" You have a cat-like face, complete with moist nose and whiskers. Your " + player.skinDesc + " is " + player.furColor + ", hiding your " + player.skin(true,false) + " underneath.");
            if (player.skinType == SKIN_TYPE_SCALES)
                outputText(" Your facial structure blends humanoid features with those of a cat. A moist nose and whiskers are included, but overlaid with glittering " + player.skinFurScales() + ".");
            if (player.eyeType != EYES_BLACK_EYES_SAND_TRAP)
                outputText(" Of course, no feline face would be complete without vertically slit eyes.");
            break;
        case FACE_COW_MINOTAUR:
            if (player.skinType == SKIN_TYPE_PLAIN || player.skinType == SKIN_TYPE_GOO)
                outputText(" You have a face resembling that of a minotaur, with cow-like features, particularly a squared off wet nose. Despite your lack of fur elsewhere, your visage does have a short layer of " + player.furColor + " fuzz.");
            if (player.skinType == SKIN_TYPE_FUR)
                outputText(" You have a face resembling that of a minotaur, with cow-like features, particularly a squared off wet nose. Your " + player.skinFurScales() + " thickens noticably on your head, looking shaggy and more than a little monstrous once laid over your visage.");
            if (player.skinType == SKIN_TYPE_SCALES)
                outputText(" Your face resembles a minotaur's, though strangely it is covered in shimmering scales, right up to the flat cow-like nose that protrudes from your face.");
            break;
        case FACE_LIZARD:
            if (player.skinType == SKIN_TYPE_PLAIN || player.skinType == SKIN_TYPE_GOO)
                outputText(" You have a face resembling that of a lizard, and with your toothy maw, you have quite a fearsome visage. The reptilian visage does look a little odd with just " + player.skin() + ".");
            if (player.skinType == SKIN_TYPE_FUR)
                outputText(" You have a face resembling that of a lizard. Between the toothy maw, pointed snout, and the layer of " + player.skinFurScales() + " covering your face, you have quite the fearsome visage.");
            if (player.skinType == SKIN_TYPE_SCALES)
                outputText(" Your face is that of a lizard, complete with a toothy maw and pointed snout. Reflective " + player.skinFurScales() + " complete the look, making you look quite fearsome.");
            break;
        case FACE_DRAGON:
            outputText(" Your face is a narrow, reptilian muzzle. It looks like a predatory lizard's, at first glance, but with an unusual array of spikes along the under-jaw. It gives you a regal but fierce visage. Opening your mouth reveals several rows of dagger-like sharp teeth. The fearsome visage is decorated by " + player.skinFurScales() + ".");
            break;
        case FACE_KANGAROO:
            outputText(" Your face is ");
            if (player.skinType == SKIN_TYPE_PLAIN)
                outputText("bald");
            else
                outputText("covered with " + player.skinFurScales(), false);
            outputText(" and shaped like that of a kangaroo, somewhat rabbit-like except for the extreme length of your odd visage.");
            break;
        case FACE_PIG:
            outputText(" Your face is like that of a pig, with " + player.skinTone + " skin, complete with a snout that is always wiggling.");
            break;
        case FACE_BOAR:
            outputText(" Your face is like that of a boar, ");
            if (player.skinType == SKIN_TYPE_FUR)
                outputText("with " + player.skinTone + " skin underneath your " + player.furColor + " fur");
            outputText(", complete with tusks and a snout that is always wiggling.");
            break;
        case FACE_RHINO:
            outputText(" Your face is like that of a rhino");
            if (player.skinType == SKIN_TYPE_PLAIN)
                outputText(", with " + player.skin() + ", complete with a long muzzle and a horn on your nose.");
            else
                outputText(" with a long muzzle and a horn on your nose. Oddly, your face is also covered in " + player.skinFurScales() + ".");
            break;
        case FACE_ECHIDNA:
            outputText(" Your odd visage consists of a long, thin echidna snout.");
            if (player.skinType == SKIN_TYPE_PLAIN)
                outputText(" The " + player.skin() + " that is revealed by your lack of fur looks quite unusual.");
            else if (player.skinType == SKIN_TYPE_FUR)
                outputText(" It's covered in " + player.skinFurScales() + ".");
            else if (player.skinType == SKIN_TYPE_SCALES)
                outputText(" It's covered in " + player.skinFurScales() + ", making your face even more unusual.");
            break;
        case FACE_DEER:
            outputText(" Your face is like that of a deer, with a nose at the end of your muzzle.");
            if (player.skinType == SKIN_TYPE_PLAIN)
                outputText(" The " + player.skin() + " that is revealed by your lack of fur looks quite unusual.");
            else if (player.skinType == SKIN_TYPE_FUR)
                outputText(" It's covered in " + player.skinFurScales() + " that covers your " + player.skinTone + " skin underneath.");
            else if (player.skinType == SKIN_TYPE_SCALES)
                outputText(" It's covered in " + player.skinFurScales() + ", making your face looks more unusual.");
            break;
        default:
            outputText(" Your face appears to be incomprehenable to others. Perhaps this is due to an error?");
    }
    //M/F stuff!
    outputText(" It has " + player.faceDesc() + ".");
    //Eyes
    if (player.eyeType == EYES_FOUR_SPIDER_EYES)
        outputText(" In addition to your primary two eyes, you have a second, smaller pair on your forehead.");
    else if (player.eyeType == EYES_BLACK_EYES_SAND_TRAP)
        outputText(" Your eyes are solid spheres of inky, alien darkness.");

    //Hair
    //if bald
    if (player.hairLength == 0) {
        if (player.skinType == SKIN_TYPE_FUR)
            outputText(" You have no hair, only a thin layer of fur atop of your head. ");
        else
            outputText(" You are totally bald, showing only shiny " + player.skinTone + " " + player.skinDesc + " where your hair should be.");
        if (player.earType == EARS_HORSE)
            outputText(" A pair of horse-like ears rise up from the top of your head.");
        else if (player.earType == EARS_FERRET)
            outputText(" A pair of small, rounded ferret ears sit on top of your head.");
        else if (player.earType == EARS_DOG)
            outputText(" A pair of dog ears protrude from your skull, flopping down adorably.");
        else if (player.earType == EARS_COW)
            outputText(" A pair of round, floppy cow ears protrude from the sides of your skull.");
        else if (player.earType == EARS_ELFIN)
            outputText(" A pair of large pointy ears stick out from your skull.");
        else if (player.earType == EARS_CAT)
            outputText(" A pair of cute, fuzzy cat ears have sprouted from the top of your head.");
        else if (player.earType == EARS_PIG)
            outputText(" A pair of pointy, floppy pig ears have sprouted from the top of your head.");
        else if (player.earType == EARS_LIZARD)
            outputText(" A pair of rounded protrusions with small holes on the sides of your head serve as your ears.");
        else if (player.earType == EARS_BUNNY)
            outputText(" A pair of floppy rabbit ears stick up from the top of your head, flopping around as you walk.");
        else if (player.earType == EARS_FOX)
            outputText(" A pair of large, adept fox ears sit high on your head, always listening.");
        else if (player.earType == EARS_DRAGON)
            outputText(" A pair of rounded protrusions with small holes on the sides of your head serve as your ears. Bony fins sprout behind them.");
        else if (player.earType == EARS_RACCOON)
            outputText(" A pair of vaguely egg-shaped, furry raccoon ears adorns your head.");
        else if (player.earType == EARS_MOUSE)
            outputText(" A pair of large, dish-shaped mouse ears tops your head.");
        //<mod>
        else if (player.earType == EARS_PIG)
            outputText(" A pair of pointy, floppy pig ears have sprouted from the top of your head.");
        else if (player.earType == EARS_RHINO)
            outputText(" A pair of open tubular rhino ears protrude from your head.");
        else if (player.earType == EARS_ECHIDNA)
            outputText(" A pair of small rounded openings appear on your head that are your ears.");
        else if (player.earType == EARS_DEER)
            outputText(" A pair of deer-like ears rise up from the top of your head.");
        //</mod>
        if (player.antennae == ANTENNAE_BEE)
            outputText(" Floppy antennae also appear on your skull, bouncing and swaying in the breeze.");
    }
    //not bald
    else {
        if (player.earType == EARS_HUMAN)
            outputText(" Your " + player.hairDescript() + " looks good on you, accentuating your features well.");
        else if (player.earType == EARS_FERRET)
            outputText(" A pair of small, rounded ferret ears burst through the top of your " + player.hairDescript() + ".");
        else if (player.earType == EARS_HORSE)
            outputText(" The " + player.hairDescript() + " on your head parts around a pair of very horse-like ears that grow up from your head.");
        else if (player.earType == EARS_DOG)
            outputText(" The " + player.hairDescript() + " on your head is overlapped by a pair of pointed dog ears.", false);
        else if (player.earType == EARS_COW)
            outputText(" The " + player.hairDescript() + " on your head is parted by a pair of rounded cow ears that stick out sideways.");
        else if (player.earType == EARS_ELFIN)
            outputText(" The " + player.hairDescript() + " on your head is parted by a pair of cute pointed ears, bigger than your old human ones.");
        else if (player.earType == EARS_CAT)
            outputText(" The " + player.hairDescript() + " on your head is parted by a pair of cute, fuzzy cat ears, sprouting from atop your head and pivoting towards any sudden noises.");
        else if (player.earType == EARS_LIZARD)
            outputText(" The " + player.hairDescript() + " atop your head makes it nigh-impossible to notice the two small rounded openings that are your ears.");
        else if (player.earType == EARS_BUNNY)
            outputText(" A pair of floppy rabbit ears stick up out of your " + player.hairDescript() + ", bouncing around as you walk.");
        else if (player.earType == EARS_KANGAROO)
            outputText(" The " + player.hairDescript() + " atop your head is parted by a pair of long, furred kangaroo ears that stick out at an angle.");
        else if (player.earType == EARS_FOX)
            outputText(" The " + player.hairDescript() + " atop your head is parted by a pair of large, adept fox ears that always seem to be listening.");
        else if (player.earType == EARS_DRAGON)
            outputText(" The " + player.hairDescript() + " atop your head is parted by a pair of rounded protrusions with small holes on the sides of your head serve as your ears. Bony fins sprout behind them.");
        else if (player.earType == EARS_RACCOON)
            outputText(" The " + player.hairDescript() + " on your head parts around a pair of egg-shaped, furry raccoon ears.");
        else if (player.earType == EARS_MOUSE)
            outputText(" The " + player.hairDescript() + " atop your head is funneled between and around a pair of large, dish-shaped mouse ears that stick up prominently.");
        //<mod> Mod-added ears
        else if (player.earType == EARS_PIG)
            outputText(" The " + player.hairDescript() + " on your head is parted by a pair of pointy, floppy pig ears. They often flick about when you’re not thinking about it.");
        else if (player.earType == EARS_RHINO)
            outputText(" The " + player.hairDescript() + " on your head is parted by a pair of tubular rhino ears.");
        else if (player.earType == EARS_ECHIDNA)
            outputText(" Your " + player.hairDescript() + " makes it near-impossible to see the small, rounded openings that are your ears.");
        else if (player.earType == EARS_DEER)
            outputText(" The " + player.hairDescript() + " on your head parts around a pair of deer-like ears that grow up from your head.");
        //</mod>
        if (player.antennae == ANTENNAE_BEE) {
            if (player.earType == EARS_BUNNY)
                outputText(" Limp antennae also grow from just behind your hairline, waving and swaying in the breeze with your ears.");
            else
                outputText(" Floppy antennae also grow from just behind your hairline, bouncing and swaying in the breeze.");
        }
    }

    //Beards!
    if (player.beardLength > 0) {
        outputText(" You have a " + player.beardDescript() + " ");
        if (player.beardStyle != BEARD_GOATEE) {
            outputText("covering your ");
            if (rand(2) == 0) outputText("jaw");
            else outputText("chin and cheeks")
        }
        else {
            outputText("protruding from your chin");
        }
        outputText(".");
    }

    //Tongue
    if (player.tongueType == TONGUE_SNAKE)
        outputText(" A snake-like tongue occasionally flits between your lips, tasting the air.");
    else if (player.tongueType == TONGUE_DEMONIC)
        outputText(" A slowly undulating tongue occasionally slips from between your lips. It hangs nearly two feet long when you let the whole thing slide out, though you can retract it to appear normal.");
    else if (player.tongueType == TONGUE_DRACONIC)
        outputText(" Your mouth contains a thick, fleshy tongue that, if you so desire, can telescope to a distance of about four feet. It has sufficient manual dexterity that you can use it almost like a third arm.");
    else if (player.tongueType == TONGUE_ECHIDNA)
        outputText(" A thin echidna tongue, at least a foot long, occasionally flits out from between your lips.");
    //Horns
    switch(player.hornType) {
        case HORNS_DEMON:
            if (player.horns == 2)
                outputText(" A small pair of pointed horns has broken through the " + player.skinDesc + " on your forehead, proclaiming some demonic taint to any who see them.");
            if (player.horns == 4)
                outputText(" A quartet of prominent horns has broken through your " + player.skinDesc + ". The back pair are longer, and curve back along your head. The front pair protrude forward demonically.");
            if (player.horns == 6)
                outputText(" Six horns have sprouted through your " + player.skinDesc + ", the back two pairs curve backwards over your head and down towards your neck, while the front two horns stand almost eight inches long upwards and a little forward.");
            if (player.horns >= 8)
                outputText(" A large number of thick demonic horns sprout through your " + player.skinDesc + ", each pair sprouting behind the ones before. The front jut forwards nearly ten inches while the rest curve back over your head, some of the points ending just below your ears. You estimate you have a total of " + num2Text(player.horns) + " horns.");
            break;
        case HORNS_COW_MINOTAUR:
            if (player.horns < 3)
                outputText(" Two tiny horn-like nubs protrude from your forehead, resembling the horns of the young livestock kept by your village.");
            if (player.horns >= 3 && player.horns < 6)
                outputText(" Two moderately sized horns grow from your forehead, similar in size to those on a young bovine.");
            if (player.horns >= 6 && player.horns < 12)
                outputText(" Two large horns sprout from your forehead, curving forwards like those of a bull.");
            if (player.horns >= 12 && player.horns < 20)
                outputText(" Two very large and dangerous looking horns sprout from your head, curving forward and over a foot long. They have dangerous looking points.");
            if (player.horns >= 20)
                outputText(" Two huge horns erupt from your forehead, curving outward at first, then forwards. The weight of them is heavy, and they end in dangerous looking points.");
            break;
        case HORNS_DRACONIC_X2:
            if (useMetrics)
                outputText(" A pair of " + num2Text(Math.floor(player.horns*2.54)) + " centimetre horns grow from the sides of your head, sweeping backwards and adding to your imposing visage.");
            else
                outputText(" A pair of " + num2Text(player.horns) + " inch horns grow from the sides of your head, sweeping backwards and adding to your imposing visage.");
            break;
        case HORNS_DRACONIC_X4_12_INCH_LONG:
            outputText(" Two pairs of horns, roughly a foot long, sprout from the sides of your head. They sweep back and give you a fearsome look, almost like the dragons from your village's legends.");
            break;
        case HORNS_ANTLERS:
            outputText(" Two antlers, forking into " + num2Text(player.horns) + " points, have sprouted from the top of your head, forming a spiky, regal crown of bone.");
            break;
        case HORNS_GOAT:
            if (player.horns == 1)
                outputText(" A pair of stubby goat horns sprout from the sides of your head.");
            else
                outputText(" A pair of tall-standing goat horns sprout from the sides of your head. They are curved and patterned with ridges.");
            break;
        case HORNS_RHINO:
            if (player.horns >= 2) {
                if (player.faceType == FACE_RHINO)
                    outputText(" A second horn sprouts from your forehead just above the horn on your nose.");
                else
                    outputText(" A single horn sprouts from your forehead. It is conical and resembles a rhino's horn.");
                outputText("You estimate it to be about seven inches long.");
            }
            else {
                outputText(" A single horn sprouts from your forehead. It is conical and resembles a rhino's horn. You estimate it to be about six inches long.");
            }
            break;
        default:
            //No horns here!
    }
    //BODY DESCRIPTION
    outputText("<br><br>You have a humanoid shape with the usual torso, arms, hands, and fingers.");
    //WINGS!
    switch(player.wingType) {
        case WING_TYPE_BEE_LIKE_SMALL:
            outputText(" A pair of tiny-yet-beautiful bee-wings sprout from your back, too small to allow you to fly.");
            break;
        case WING_TYPE_BEE_LIKE_LARGE:
            outputText(" A pair of large bee-wings sprout from your back, reflecting the light through their clear membranes beautifully. They flap quickly, allowing you to easily hover in place or fly.");
            break;
        case WING_TYPE_BAT_LIKE_TINY:
            outputText(" A pair of tiny bat-like demon-wings sprout from your back, flapping cutely, but otherwise being of little use.");
            break;
        case WING_TYPE_BAT_LIKE_LARGE:
            outputText(" A pair of large bat-like demon-wings fold behind your shoulders. With a muscle-twitch, you can extend them, and use them to soar gracefully through the air.");
            break;
        case WING_TYPE_SHARK_FIN:
            outputText(" A large shark-like fin has sprouted between your shoulder blades. With it you have far more control over swimming underwater.");
            break;
        case WING_TYPE_FEATHERED_LARGE:
            outputText(" A pair of large, feathery wings sprout from your back. Though you usually keep the " + player.furColor + "-colored wings folded close, they can unfurl to allow you to soar as gracefully as a harpy.");
            break;
        case WING_TYPE_DRACONIC_SMALL:
            outputText(" Small, vestigial wings sprout from your shoulders. They might look like bat's wings, but the membranes are covered in fine, delicate scales.");
            break;
        case WING_TYPE_DRACONIC_LARGE:
            outputText(" Magnificent wings sprout from your shoulders. When unfurled they stretch further than your arm span, and a single beat of them is all you need to set out toward the sky. They look a bit like bat's wings, but the membranes are covered in fine, delicate scales and a wicked talon juts from the end of each bone.");
            break;
        case WING_TYPE_GIANT_DRAGONFLY:
            outputText(" Giant dragonfly wings hang from your shoulders. At a whim, you could twist them into a whirring rhythm fast enough to lift you off the ground and allow you to fly.");
            break;
        default:
            //No wings here!
    }
    //Wing arms
    if (player.armType == ARM_TYPE_HARPY)
        outputText(" Feathers hang off your arms from shoulder to wrist, giving them a slightly wing-like look.");
    else if (player.armType == ARM_TYPE_SPIDER)
        outputText(" Shining black exoskeleton covers your arms from the biceps down, resembling a pair of long black gloves from a distance.");
    //Done with head bits. Move on to body stuff
    //Horse lowerbody, other lowerbody texts appear lower
    if (player.isTaur())
    {
        if (player.lowerBody == LOWER_BODY_TYPE_HOOFED)
            outputText(" From the waist down you have the body of a horse, with all " + num2Text(player.legCount)+ " legs capped by hooves.");
        else if (player.lowerBody == LOWER_BODY_TYPE_PONY)
            outputText(" From the waist down you have an incredibly cute and cartoonish parody of a horse's body, with all " + num2Text(player.legCount)+ " legs ending in flat, rounded feet.");
        else if (player.lowerBody == LOWER_BODY_TYPE_DRIDER_LOWER_BODY)
            outputText(" Where your legs would normally start you have grown the body of a spider, with " + num2Text(player.legCount)+ " spindly legs that sprout from its sides.");
        else
            outputText(" Where your legs would normally start you have grown the body of a feral animal, with all " + num2Text(player.legCount)+ " legs.");
    }
    //Hip info only displays if you aren't a centaur. 
    if (!player.isTaur())
    {
        if (player.thickness > 70)
        {
            outputText(" You have " + player.hipDescript());
            if (player.hipRating < 6)
            {
                if (player.tone < 65)
                    outputText(" buried under a noticeable muffin-top, and");
                else
                    outputText(" that blend into your pillar-like waist, and");
            }
            if (player.hipRating >= 6 && player.hipRating < 10)
                outputText(" that blend into the rest of your thick form, and");
            if (player.hipRating >= 10 && player.hipRating < 15)
                outputText(" that would be much more noticeable if you weren't so wide-bodied, and");
            if (player.hipRating >= 15 && player.hipRating < 20)
                outputText(" that sway and emphasize your thick, curvy shape, and");
            if (player.hipRating >= 20)
                outputText(" that sway hypnotically on your extra-curvy frame, and");
        }
        else if (player.thickness < 30)
        {
            outputText(" You have " + player.hipDescript(), false);
            if (player.hipRating < 6)
                outputText(" that match your trim, lithe body, and");
            if (player.hipRating >= 6 && player.hipRating < 10)
                outputText(" that sway to and fro, emphasized by your trim body, and");
            if (player.hipRating >= 10 && player.hipRating < 15)
                outputText(" that swell out under your trim waistline, and");
            if (player.hipRating >= 15 && player.hipRating < 20)
                outputText(", emphasized by your narrow waist, and");
            if (player.hipRating >= 20)
                outputText(" that swell disproportionately wide on your lithe frame, and");
        }
        //STANDARD
        else
        {
            outputText(" You have " + player.hipDescript(), false);
            if (player.hipRating < 6)
                outputText(", and");
            if (player.femininity > 50)
            {
                if (player.hipRating >= 6 && player.hipRating < 10)
                    outputText(" that draw the attention of those around you, and");
                if (player.hipRating >= 10 && player.hipRating < 15)
                    outputText(" that make you walk with a sexy, swinging gait, and");
                if (player.hipRating >= 15 && player.hipRating < 20)
                    outputText(" that make it look like you've birthed many children, and");
                if (player.hipRating >= 20)
                    outputText(" that make you look more like an animal waiting to be bred than any kind of human, and");
            }
            else
            {
                if (player.hipRating >= 6 && player.hipRating < 10)
                    outputText(" that give you a graceful stride, and");
                if (player.hipRating >= 10 && player.hipRating < 15)
                    outputText(" that add a little feminine swing to your gait, and");
                if (player.hipRating >= 15 && player.hipRating < 20)
                    outputText(" that force you to sway and wiggle as you move, and");
                if (player.hipRating >= 20)
                {
                    outputText(" that give your ");
                    if (player.balls > 0)
                        outputText("balls plenty of room to breathe");
                    else if (player.hasCock())
                        outputText(player.multiCockDescript() + " plenty of room to swing");
                    else if (player.hasVagina())
                        outputText(player.vaginaDescript() + " a nice, wide berth");
                    else outputText("vacant groin plenty of room");
                    outputText(", and");
                }
            }
        }
    }
    //ASS
    //Horse version
    if (player.isTaur())
    {
        //FATBUTT
        if (player.tone < 65)
        {
            outputText(" Your " + player.buttDescript(), false);
            if (player.buttRating < 4)
                outputText(" is lean, from what you can see of it.");
            if (player.buttRating >= 4 && player.buttRating < 6)
                outputText(" looks fairly average.");
            if (player.buttRating >= 6 && player.buttRating <10)
                outputText(" is fairly plump and healthy.");
            if (player.buttRating >= 10 && player.buttRating < 15)
                outputText(" jiggles a bit as you trot around.");
            if (player.buttRating >= 15 && player.buttRating < 20)
                outputText(" jiggles and wobbles as you trot about.");
            if (player.buttRating >= 20)
                outputText(" is obscenely large, bordering freakish, even for a horse.");
        }
        //GIRL LOOK AT DAT BOOTY
        else
        {
            outputText(" Your " + player.buttDescript(), false);
            if (player.buttRating < 4)
                outputText(" is barely noticable, showing off the muscles of your haunches.");
            if (player.buttRating >= 4 && player.buttRating < 6)
                outputText(" matches your toned equine frame quite well.");
            if (player.buttRating >= 6 && player.buttRating <10)
                outputText(" gives hints of just how much muscle you could put into a kick.");
            if (player.buttRating >= 10 && player.buttRating < 15)
                outputText(" surges with muscle whenever you trot about.");
            if (player.buttRating >= 15 && player.buttRating < 20)
                outputText(" flexes its considerable mass as you move.");
            if (player.buttRating >= 20)
                outputText(" is stacked with layers of muscle, huge even for a horse.");
        }
    }
    //Non-horse PCs
    else
    {
        //TUBBY ASS
        if (player.tone < 60)
        {
            outputText(" your " + player.buttDescript(), false);
            if (player.buttRating < 4)
                outputText(" looks great under your gear.");
            if (player.buttRating >= 4 && player.buttRating < 6)
                outputText(" has the barest amount of sexy jiggle.");
            if (player.buttRating >= 6 && player.buttRating <10)
                outputText(" fills out your clothing nicely.");
            if (player.buttRating >= 10 && player.buttRating < 15)
                outputText(" wobbles enticingly with every step.");
            if (player.buttRating >= 15 && player.buttRating < 20)
                outputText(" wobbles like a bowl full of jello as you walk.");
            if (player.buttRating >= 20)
                outputText(" is obscenely large, bordering freakish, and makes it difficult to run.");
        }
        //FITBUTT
        else
        {
            outputText(" your " + player.buttDescript(), false);
            if (player.buttRating < 4)
                outputText(" molds closely against your form.");
            if (player.buttRating >= 4 && player.buttRating < 6)
                outputText(" contracts with every motion, displaying the detailed curves of its lean musculature.");
            if (player.buttRating >= 6 && player.buttRating <10)
                outputText(" fills out your clothing nicely.");
            if (player.buttRating >= 10 && player.buttRating < 15)
                outputText(" stretches your gear, flexing it with each step.");
            if (player.buttRating >= 15 && player.buttRating < 20)
                outputText(" threatens to bust out from under your kit each time you clench it.");
            if (player.buttRating >= 20)
                outputText(" is marvelously large, but completely stacked with muscle.");
        }
    }
    //TAILS
    switch(player.tailType) {
        case TAIL_TYPE_HORSE:
            outputText(" A long " + player.furColor + " horsetail hangs from your " + player.buttDescript() + ", smooth and shiny.");
            break;
        case TAIL_TYPE_FERRET:
            outputText(" A long ferret tail sprouts from above your [butt]. It is thin, tapered, and covered in shaggy " + player.furColor + " fur.");
            break;
        case TAIL_TYPE_DOG:
            outputText(" A fuzzy " + player.furColor + " dogtail sprouts just above your " + player.buttDescript() + ", wagging to and fro whenever you are happy.");
            break;
        case TAIL_TYPE_DEMONIC:
            outputText(" A narrow tail ending in a spaded tip curls down from your " + player.buttDescript() + ", wrapping around your " + player.leg() + " sensually at every opportunity.");
            break;
        case TAIL_TYPE_COW:
            outputText(" A long cowtail with a puffy tip swishes back and forth as if swatting at flies.");
            break;
        case TAIL_TYPE_SPIDER_ADBOMEN:
            outputText(" A large, spherical spider-abdomen has grown out from your backside, covered in shiny black chitin. Though it's heavy and bobs with every motion, it doesn't seem to slow you down.");
            if (player.tailVenom > 50 && player.tailVenom < 80)
                outputText(" Your bulging arachnid posterior feels fairly full of webbing.");
            if (player.tailVenom >= 80 && player.tailVenom < 100)
                outputText(" Your arachnid rear bulges and feels very full of webbing.");
            if (player.tailVenom == 100)
                outputText(" Your swollen spider-butt is distended with the sheer amount of webbing it's holding.");
            break;
        case TAIL_TYPE_BEE_ABDOMEN:
            outputText(" A large insectile bee-abdomen dangles from just above your backside, bobbing with its own weight as you shift. It is covered in hard chitin with black and yellow stripes, and tipped with a dagger-like stinger.");
            if (player.tailVenom > 50 && player.tailVenom < 80)
                outputText(" A single drop of poison hangs from your exposed stinger.");
            if (player.tailVenom >= 80 && player.tailVenom < 100)
                outputText(" Poisonous bee venom coats your stinger completely.");
            if (player.tailVenom == 100)
                outputText(" Venom drips from your poisoned stinger regularly.");
            break;
        case TAIL_TYPE_SHARK:
            outputText(" A long shark-tail trails down from your backside, swaying to and fro while giving you a dangerous air.");
            break;
        case TAIL_TYPE_CAT:
            outputText(" A soft " + player.furColor + " cat-tail sprouts just above your " + player.buttDescript() + ", curling and twisting with every step to maintain perfect balance.");
            break;
        case TAIL_TYPE_LIZARD:
            outputText(" A tapered tail hangs down from just above your " + player.assDescript() + ". It sways back and forth, assisting you with keeping your balance.");
            break;
        case TAIL_TYPE_RABBIT:
            outputText(" A short, soft bunny tail sprouts just above your " + player.assDescript() + ", twitching constantly whenever you don't think about it.");
            break;
        case TAIL_TYPE_HARPY:
            outputText(" A tail of feathers fans out from just above your " + player.assDescript() + ", twitching instinctively to help guide you if you were to take flight.");
            break;
        case TAIL_TYPE_KANGAROO:
            outputText(" A conical, ");
            if (player.skinType == SKIN_TYPE_GOO)
                outputText("gooey, " + player.skinTone, false);
            else
                outputText("furry, " + player.furColor, false);
            outputText(", tail extends from your " + player.assDescript() + ", bouncing up and down as you move and helping to counterbalance you.");
            break;
        case TAIL_TYPE_FOX:
            if (player.tailVenom <= 1)
                outputText(" A swishing " + player.furColor + " fox's brush extends from your " + player.assDescript() + ", curling around your body - the soft fur feels lovely.");
            else 
                outputText(" " + Num2Text(player.tailVenom) + " swishing " + player.furColor + " fox's tails extend from your " + player.assDescript() + ", curling around your body - the soft fur feels lovely.");
            break;
        case TAIL_TYPE_DRACONIC:
            outputText(" A thin, scaly, prehensile reptilian tail, almost as long as you are tall, swings behind you like a living bullwhip. Its tip menaces with spikes of bone, meant to deliver painful blows.");
            break;
        case TAIL_TYPE_RACCOON:
            outputText(" A black-and-" + player.furColor + "-ringed raccoon tail waves behind you.");
            break;
        case TAIL_TYPE_MOUSE:
            outputText(" A naked, " + player.skinTone + " mouse tail pokes from your butt, dragging on the ground and twitching occasionally.");
            break;
        case TAIL_TYPE_BEHEMOTH:
            outputText(" A long seemingly-tapering tail pokes from your butt, ending in spikes just like behemoth's.");
            break;
        case TAIL_TYPE_PIG:
            outputText(" A short, curly pig tail sprouts from just above your butt.");
            break;
        case TAIL_TYPE_SCORPION:
            outputText(" A chitinous scorpion tail sprouts from just above your butt, ready to dispense venom.");
            break;
        case TAIL_TYPE_GOAT:
            outputText(" A very short, stubby goat tail sprouts from just above your butt.");
            break;
        case TAIL_TYPE_RHINO:
            outputText(" A ropey rhino tail sprouts from just above your butt, swishing from time to time.");
            break;
        case TAIL_TYPE_ECHIDNA:
            outputText(" A stumpy echidna tail forms just about your [ass].");
            break;
        case TAIL_TYPE_DEER:
            outputText(" A very short, stubby deer tail sprouts from just above your butt.");
            break;
        default:
            //No tail here!
    }

    //LOWERBODY SPECIAL
    if (player.lowerBody == LOWER_BODY_TYPE_HUMAN)
        outputText(" " + Num2Text(player.legCount)+ " normal human legs grow down from your waist, ending in normal human feet.");
    else if (player.lowerBody == LOWER_BODY_TYPE_FERRET)
        outputText(" " + Num2Text(player.legCount)+ " furry, digitigrade legs form below your [hips]. The fur is thinner on the feet, and your toes are tipped with claws.");
    else if (player.lowerBody == LOWER_BODY_TYPE_HOOFED)
        outputText(" Your " + num2Text(player.legCount)+ " legs are muscled and jointed oddly, covered in fur, and end in a bestial hooves.");
    else if (player.lowerBody == LOWER_BODY_TYPE_DOG)
        outputText(" " + Num2Text(player.legCount)+ " digitigrade legs grow downwards from your waist, ending in dog-like hind-paws.");
    else if (player.lowerBody == LOWER_BODY_TYPE_NAGA)
        outputText(" Below your waist your flesh is fused together into a very long snake-like tail.");
    //Horse body is placed higher for readability purposes
    else if (player.lowerBody == LOWER_BODY_TYPE_DEMONIC_HIGH_HEELS)
        outputText(" Your " + num2Text(player.legCount)+ " perfect lissome legs end in mostly human feet, apart from the horn protruding straight down from the heel that forces you to walk with a sexy, swaying gait.");
    else if (player.lowerBody == LOWER_BODY_TYPE_DEMONIC_CLAWS)
        outputText(" Your " + num2Text(player.legCount)+ " lithe legs are capped with flexible clawed feet. Sharp black nails grow where once you had toe-nails, giving you fantastic grip.");
    else if (player.lowerBody == LOWER_BODY_TYPE_BEE)
        outputText(" Your " + num2Text(player.legCount)+ " legs are covered in a shimmering insectile carapace up to mid-thigh, looking more like a set of 'fuck-me-boots' than exoskeleton. A bit of downy yellow and black fur fuzzes your upper thighs, just like a bee.");
    else if (player.lowerBody == LOWER_BODY_TYPE_GOO)
        outputText(" In place of legs you have a shifting amorphous blob. Thankfully it's quite easy to propel yourself around on. The lowest portions of your " + player.armor.equipmentName + " float around inside you, bringing you no discomfort.");
    else if (player.lowerBody == LOWER_BODY_TYPE_CAT)
        outputText(" " + Num2Text(player.legCount)+ " digitigrade legs grow downwards from your waist, ending in soft, padded cat-paws.");
    else if (player.lowerBody == LOWER_BODY_TYPE_LIZARD)
        outputText(" " + Num2Text(player.legCount)+ " digitigrade legs grow down from your " + player.hipDescript() + ", ending in clawed feet. There are three long toes on the front, and a small hind-claw on the back.");
    else if (player.lowerBody == LOWER_BODY_TYPE_BUNNY)
        outputText(" Your " + num2Text(player.legCount)+ " legs thicken below the waist as they turn into soft-furred rabbit-like legs. You even have large bunny feet that make hopping around a little easier than walking.");
    else if (player.lowerBody == LOWER_BODY_TYPE_HARPY)
        outputText(" Your " + num2Text(player.legCount)+ " legs are covered with " + player.furColor + " plumage. Thankfully the thick, powerful thighs are perfect for launching you into the air, and your feet remain mostly human, even if they are two-toed and tipped with talons.");
    else if (player.lowerBody == LOWER_BODY_TYPE_KANGAROO)
        outputText(" Your " + num2Text(player.legCount)+ " furry legs have short thighs and long calves, with even longer feet ending in prominently-nailed toes.");
    else if (player.lowerBody == LOWER_BODY_TYPE_CHITINOUS_SPIDER_LEGS)
        outputText(" Your " + num2Text(player.legCount)+ " legs are covered in a reflective black, insectile carapace up to your mid-thigh, looking more like a set of 'fuck-me-boots' than exoskeleton.");
    else if (player.lowerBody == LOWER_BODY_TYPE_FOX)
        outputText(" Your " + num2Text(player.legCount)+ " legs are crooked into high knees with hocks and long feet, like those of a fox; cute bulbous toes decorate the ends.");
    else if (player.lowerBody == LOWER_BODY_TYPE_DRAGON)
        outputText(" " + Num2Text(player.legCount)+ " human-like legs grow down from your " + player.hipDescript() + ", sheathed in scales and ending in clawed feet. There are three long toes on the front, and a small hind-claw on the back.");
    else if (player.lowerBody == LOWER_BODY_TYPE_RACCOON)
        outputText(" Your " + num2Text(player.legCount)+ " legs, though covered in fur, are humanlike. Long feet on the ends bear equally long toes, and the pads on the bottoms are quite sensitive to the touch.");
    else if (player.lowerBody == LOWER_BODY_TYPE_CLOVEN_HOOFED)
        outputText(" " + Num2Text(player.legCount)+ " digitigrade legs form below your [hips], ending in cloven hooves.");
    if (player.findPerk(PerkLib.Incorporeality) >= 0)
        outputText(" Of course, your " + player.legs() + " are partially transparent due to their ghostly nature."); // isn't goo transparent anyway?

    outputText("<br>");
    if (player.findStatusEffect(StatusEffects.GooStuffed) >= 0)

    {
        outputText("<br><b>Your gravid-looking belly is absolutely stuffed full of goo. There's no way you can get pregnant like this, but at the same time, you look like some fat-bellied breeder.</b><br>");
    }
    //Pregnancy Shiiiiiitz
    if ((player.buttPregnancyType == PREGNANCY_FROG_GIRL) || (player.buttPregnancyType == PREGNANCY_SATYR) || player.isPregnant())
    {
        if (player.pregnancyType == PREGNANCY_OVIELIXIR_EGGS)
        {
            outputText("<b>");
            //Compute size
            temp = player.statusAffectv3(StatusEffects.Eggs) + player.statusAffectv2(StatusEffects.Eggs) * 10;
            if (player.pregnancyIncubation <= 50 && player.pregnancyIncubation > 20)
            {
                outputText("Your swollen pregnant belly is as large as a ");
                if (temp < 10)
                    outputText("basketball.");
                if (temp >= 10 && temp < 20)
                    outputText("watermelon.");
                if (temp >= 20)
                    outputText("beach ball.");
            }
            if (player.pregnancyIncubation <= 20)
            {
                outputText("Your swollen pregnant belly is as large as a ");
                if (temp < 10)
                    outputText("watermelon.");
                if (temp >= 10 && temp < 20)
                    outputText("beach ball.");
                if (temp >= 20)
                    outputText("large medicine ball.");
            }
            outputText("</b>");
            temp = 0;
        }
        //Satur preggos - only shows if bigger than regular pregnancy or not pregnancy
        else if (player.buttPregnancyType == PREGNANCY_SATYR && player.buttPregnancyIncubation > player.pregnancyIncubation)
        {
            if (player.buttPregnancyIncubation < 125 && player.buttPregnancyIncubation >= 75)
            {
                outputText("<b>You've got the begginings of a small pot-belly.</b>");
            }
            else if (player.buttPregnancyIncubation >= 50)
            {
                outputText("<b>The unmistakable bulge of pregnancy is visible in your tummy, yet it feels odd inside you - wrong somehow.</b>");
            }
            else if (player.buttPregnancyIncubation >= 30)
            {
                outputText("<b>Your stomach is painfully distended by your pregnancy, making it difficult to walk normally.</b>");
            }
            else
            { //Surely Benoit and Cotton deserve their place in this list
                if (player.pregnancyType == PREGNANCY_IZMA || player.pregnancyType == PREGNANCY_MOUSE || player.pregnancyType == PREGNANCY_AMILY || (player.pregnancyType == PREGNANCY_JOJO && (gameFlags[JOJO_CORRUPTION_STAGE] <= 0 || gameFlags[JOJO_BIMBO_STATE] >= 3)) || player.pregnancyType == PREGNANCY_EMBER || player.pregnancyType == PREGNANCY_BENOIT || player.pregnancyType == PREGNANCY_COTTON || player.pregnancyType == PREGNANCY_URTA || player.pregnancyType == PREGNANCY_BEHEMOTH)
                    outputText("<br><b>Your belly protrudes unnaturally far forward, bulging with the spawn of one of this land's natives.</b>");
                else if (player.pregnancyType != PREGNANCY_MARBLE)
                    outputText("<br><b>Your belly protrudes unnaturally far forward, bulging with the unclean spawn of some monster or beast.</b>");
                else outputText("<br><b>Your belly protrudes unnaturally far forward, bulging outwards with Marble's precious child.</b>");
            }
        }
        //URTA PREG
        else if (player.pregnancyType == PREGNANCY_URTA)
        {
            if (player.pregnancyIncubation <= 432 && player.pregnancyIncubation > 360)
            {
                outputText("<b>Your belly is larger than it used to be.</b><br>");
            }
            if (player.pregnancyIncubation <= 360 && player.pregnancyIncubation > 288)
            {
                outputText("<b>Your belly is more noticably distended.  You're pretty sure it's Urta's.</b>");
            }
            if (player.pregnancyIncubation <= 288 && player.pregnancyIncubation > 216)
            {
                outputText("<b>The unmistakable bulge of pregnancy is visible in your tummy, and the baby within is kicking nowadays.</b>");
            }
            if (player.pregnancyIncubation <= 216 && player.pregnancyIncubation > 144)
            {
                outputText("<b>Your belly is large and very obviously pregnant to anyone who looks at you. It's gotten heavy enough to be a pain to carry around all the time.</b>");
            }
            if (player.pregnancyIncubation <= 144 && player.pregnancyIncubation > 72)
            {
                outputText("<b>It would be impossible to conceal your growing pregnancy from anyone who glanced your way. It's large and round, frequently moving.</b>");
            }
            if (player.pregnancyIncubation <= 72 && player.pregnancyIncubation > 48)
            {
                outputText("<b>Your stomach is painfully distended by your pregnancy, making it difficult to walk normally.</b>");
            }
            if (player.pregnancyIncubation <= 48)
            {
                outputText("<br><b>Your belly protrudes unnaturally far forward, bulging with the spawn of one of this land's natives.</b>");
            }
        }
        else if (player.buttPregnancyType == PREGNANCY_FROG_GIRL)
        {
            if (player.buttPregnancyIncubation >= 8)
                outputText("<b>Your stomach is so full of frog eggs that you look about to birth at any moment, your belly wobbling and shaking with every step you take, packed with frog ovum.</b>");
            else outputText("<b>You're stuffed so full with eggs that your belly looks obscenely distended, huge and weighted with the gargantuan eggs crowding your gut. They make your gait a waddle and your gravid tummy wobble obscenely.</b>");
        }
        else if (player.pregnancyType == PREGNANCY_FAERIE) { //Belly size remains constant throughout the pregnancy
            outputText("<b>Your belly remains swollen like a watermelon. ");
            if (player.pregnancyIncubation <= 100)
                outputText("It's full of liquid, though unlike a normal pregnancy the passenger you’re carrying is tiny.</b>");
            else if (player.pregnancyIncubation <= 140)
                outputText("It feels like it’s full of thick syrup or jelly.</b>");
            else outputText("It still feels like there’s a solid ball inside your womb.</b>");
        }
        else
        {
            if (player.pregnancyIncubation <= 336 && player.pregnancyIncubation > 280)
            {
                outputText("<b>Your belly is larger than it used to be.</b>");
            }
            if (player.pregnancyIncubation <= 280 && player.pregnancyIncubation > 216)
            {
                outputText("<b>Your belly is more noticably distended.  You are probably pregnant.</b>");
            }
            if (player.pregnancyIncubation <= 216 && player.pregnancyIncubation > 180)
            {
                outputText("<b>The unmistakable bulge of pregnancy is visible in your tummy.</b>");
            }
            if (player.pregnancyIncubation <= 180 && player.pregnancyIncubation > 120)
            {
                outputText("<b>Your belly is very obviously pregnant to anyone who looks at you.</b>");
            }
            if (player.pregnancyIncubation <= 120 && player.pregnancyIncubation > 72)
            {
                outputText("<b>It would be impossible to conceal your growing pregnancy from anyone who glanced your way.</b>");
            }
            if (player.pregnancyIncubation <= 72 && player.pregnancyIncubation > 48)
            {
                outputText("<b>Your stomach is painfully distended by your pregnancy, making it difficult to walk normally.</b>");
            }
            if (player.pregnancyIncubation <= 48)
            { //Surely Benoit and Cotton deserve their place in this list
                if (player.pregnancyType == PREGNANCY_IZMA || player.pregnancyType == PREGNANCY_MOUSE || player.pregnancyType == PREGNANCY_AMILY || (player.pregnancyType == PREGNANCY_JOJO && gameFlags[JOJO_CORRUPTION_STAGE] <= 0) || player.pregnancyType == PREGNANCY_EMBER || player.pregnancyType == PREGNANCY_BENOIT || player.pregnancyType == PREGNANCY_COTTON || player.pregnancyType == PREGNANCY_URTA || player.pregnancyType == PREGNANCY_MINERVA || player.pregnancyType == PREGNANCY_BEHEMOTH)
                    outputText("<br><b>Your belly protrudes unnaturally far forward, bulging with the spawn of one of this land's natives.</b>");
                else if (player.pregnancyType != PREGNANCY_MARBLE)
                    outputText("<br><b>Your belly protrudes unnaturally far forward, bulging with the unclean spawn of some monster or beast.</b>");
                else outputText("<br><b>Your belly protrudes unnaturally far forward, bulging outwards with Marble's precious child.</b>");
            }
        }
        outputText("<br>");
    }
    outputText("<br>");
    if (player.gills)
        outputText("A pair of feathery gills are growing out just below your neck, spreading out horizontally and draping down your chest. They allow you to stay in the water for quite a long time. ");
    //Chesticles..I mean bewbz.
    if (player.breastRows.length == 0) {
        outputText("You have " + num2Text(player.breastRows.length) + " rows of breasts, which is pretty paradoxical.");
        //Done with tits.  Move on.
        outputText("<br>");
    }
    else if (player.breastRows.length == 1) {
        outputText("You have " + num2Text(player.breastRows[0].breasts) + " " + player.breastDescript(temp) + ", each supporting ");
        outputText(num2Text(player.breastRows[0].nipplesPerBreast) + " "); //Number of nipples.
        if (useMetrics)
            outputText(Math.floor(player.breastRows[0].nippleLength * 2.54 * 10) / 10 + "-cm "); //Centimeter display
        else
            outputText(Math.floor(player.breastRows[0].nippleLength * 10) / 10 + "-inch "); //Inches display
        outputText(player.nippleDescript(temp) + (player.breastRows[0].nipplesPerBreast == 1 ? "." : "s.")); //Nipple description and plural
        if (player.breastRows[0].milkFullness > 75)
            outputText(" Your " + player.breastDescript(temp) + " are painful and sensitive from being so stuffed with milk. You should release the pressure soon.");
        if (player.breastRows[0].breastRating >= 1)
            outputText(" You could easily fill a " + player.breastCup(temp) + " bra.");
        //Done with tits.  Move on.
        outputText("<br>");
    }
    //many rows
    else {
        outputText("You have " + num2Text(player.breastRows.length) + " rows of breasts, the topmost pair starting at your chest.");
        var breastListText = "";
        breastListText += "<ul>";
        while (temp < player.breastRows.length) {
            breastListText += "<li>";
            if (temp == 0)
                breastListText += "Your uppermost rack houses ";
            if (temp == 1)
                breastListText += "The second row holds ";
            if (temp == 2)
                breastListText += "Your third row of breasts contains ";
            if (temp == 3)
                breastListText += "Your fourth set of tits cradles ";
            if (temp == 4)
                breastListText += "Your fifth and final mammory grouping swells with ";
            breastListText += num2Text(player.breastRows[temp].breasts) + " " + player.breastDescript(temp) + " with ";
            breastListText += num2Text(player.breastRows[temp].nipplesPerBreast) + " "; //Number of nipples per breast
            if (useMetrics )
                breastListText += Math.floor(player.breastRows[temp].nippleLength * 2.54 * 10) / 10 + "-cm "; //Centimeter
            else
                breastListText += Math.floor(player.breastRows[temp].nippleLength * 10) / 10 + "-inch "; //Inches
            breastListText += player.nippleDescript(temp) + (player.breastRows[0].nipplesPerBreast == 1 ? " each." : "s each."); //Description and Plural
            if (player.breastRows[temp].breastRating >= 1)
                breastListText += " They could easily fill a " + player.breastCup(temp) + " bra.";
            if (player.breastRows[temp].milkFullness > 75)
                breastListText += " Your " + player.breastDescript(temp) + " are painful and sensitive from being so stuffed with milk. You should release the pressure soon.";
            breastListText += "</li>";
            temp++;
        }
        breastListText += "</ul>";
        outputText(breastListText);
        //Done with tits.  Move on.
        outputText("<br>");
    }
    //Crotchial stuff - mention snake
    if (player.lowerBody == LOWER_BODY_TYPE_NAGA && player.gender > 0) {
        outputText("<br>Your sex");
        if (player.gender == 3 || player.totalCocks() > 1)
            outputText("es are ");
        else outputText(" is ");
        outputText("concealed within a cavity in your tail when not in use, though when the need arises, you can part your concealing slit and reveal your true self.<br>");
    }
    //Cock stuff!
    temp = 0;
    if (player.cocks.length == 1) {
        if (player.isTaur())
            outputText("<br>Your equipment has shifted to lie between your hind legs, like a feral animal.");
        if (useMetrics)
            outputText("<br>Your " + player.cockDescript(temp) + " is " + Math.round(player.cocks[temp].cockLength * 10 * 2.54) / 10 + " cm long and ");
        else
            outputText("<br>Your " + player.cockDescript(temp) + " is " + Math.round(player.cocks[temp].cockLength * 10) / 10 + " inches long and ");
        if (Math.round(10 * player.cocks[temp].cockThickness) / 10 < 10)
        {
            if (useMetrics) {
                if (Math.round(player.cocks[temp].cockThickness * 10 * 2.54) / 10 == 1)
                    outputText(Math.round(player.cocks[temp].cockThickness * 10 * 2.54) / 10 + " centimetre thick.");
                else
                    outputText(Math.round(player.cocks[temp].cockThickness * 10 * 2.54) / 10 + " centimetres thick.");
            }
            else {
                if (Math.round(player.cocks[temp].cockThickness * 10) / 10 == 1)
                    outputText(Math.round(player.cocks[temp].cockThickness * 10) / 10 + " inch thick.");
                else
                    outputText(Math.round(player.cocks[temp].cockThickness * 10) / 10 + " inches thick.");
            }
        }
        else
            outputText(num2Text(Math.round(10*player.cocks[temp].cockThickness)/10) + " inches wide.");
        //Horsecock flavor
        if (player.cocks[temp].cockType == CockTypesEnum.HORSE)
        {
            outputText(" It's mottled black and brown in a very animalistic pattern. The 'head' of your shaft flares proudly, just like a horse's.");
        }
        //dog cock flavor
        if (((player.cocks[temp].cockType == CockTypesEnum.DOG) || (player.cocks[temp].cockType == CockTypesEnum.FOX)) || (player.cocks[temp].cockType == CockTypesEnum.FOX))
        {
            if (player.cocks[temp].knotMultiplier >= 1.8)
                outputText(" The obscenely swollen lump of flesh near the base of your " + player.cockDescript(temp) + " looks almost too big for your cock.");
            else if (player.cocks[temp].knotMultiplier >= 1.4)
                outputText(" A large bulge of flesh nestles just above the bottom of your " + player.cockDescript(temp) + ", to ensure it stays where it belongs during mating.");
            else if (player.cocks[temp].knotMultiplier > 1)
                outputText(" A small knot of thicker flesh is near the base of your " + player.cockDescript(temp) + ", ready to expand to help you lodge it inside a female.");
            //List thickness
            outputText(" The knot is " + Math.round(player.cocks[temp].cockThickness * player.cocks[temp].knotMultiplier * 10)/10 + " inches wide when at full size.");
        }
        //Demon cock flavor
        if (player.cocks[temp].cockType == CockTypesEnum.DEMON)
        {
            outputText(" The crown is ringed with a circle of rubbery protrusions that grow larger as you get more aroused. The entire thing is shiny and covered with tiny, sensitive nodules that leave no doubt about its demonic origins.");
        }
        //Tentacle cock flavor
        if (player.cocks[temp].cockType == CockTypesEnum.TENTACLE)
        {
            outputText(" The entirety of its green surface is covered in perspiring beads of slick moisture. It frequently shifts and moves of its own volition, the slightly oversized and mushroom-like head shifting in coloration to purplish-red whenever you become aroused.");
        }
        //Cat cock flavor
        if (player.cocks[temp].cockType == CockTypesEnum.CAT)
        {
            outputText(" It ends in a single point, much like a spike, and is covered in small, fleshy barbs. The barbs are larger at the base and shrink in size as they get closer to the tip. Each of the spines is soft and flexible, and shouldn't be painful for any of your partners.");
        }
        //Snake cock flavor
        if (player.cocks[temp].cockType == CockTypesEnum.LIZARD)
        {
            outputText(" It's a deep, iridescent purple in color. Unlike a human penis, the shaft is not smooth, and is instead patterned with multiple bulbous bumps.");
        }
        //Anemone cock flavor
        if (player.cocks[temp].cockType == CockTypesEnum.ANEMONE)
        {
            outputText(" The crown is surrounded by tiny tentacles with a venomous, aphrodisiac payload. At its base a number of similar, longer tentacles have formed, guaranteeing that pleasure will be forced upon your partners.");
        }
        //Kangawang flavor
        if (player.cocks[temp].cockType == CockTypesEnum.KANGAROO)
        {
            outputText(" It usually lies coiled inside a sheath, but undulates gently and tapers to a point when erect, somewhat like a taproot.");
        }
        //Draconic Cawk Flava flav
        if (player.cocks[temp].cockType == CockTypesEnum.DRAGON)
        {
            outputText(" With its tapered tip, there are few holes you wouldn't be able to get into. It has a strange, knot-like bulb at its base, but doesn't usually flare during arousal as a dog's knot would.");
        }
        //Bee flavor
        if (player.cocks[temp].cockType == CockTypesEnum.BEE) {
            outputText(" It's a long, smooth black shaft that's rigid to the touch. Its base is ringed with a layer of four inch long soft bee hair. The tip has a much finer layer of short yellow hairs. The tip is very sensitive, and it hurts constantly if you don’t have bee honey on it.");
        }
        //Pig flavor
        if (player.cocks[temp].cockType == CockTypesEnum.PIG) {
            outputText(" It's bright pinkish red, ending in a prominent corkscrew shape at the tip.");
        }
        //Avian flavor
        if (player.cocks[temp].cockType == CockTypesEnum.AVIAN) {
            outputText(" It's a red, tapered cock that ends in a tip. It rests nicely in a sheath.");
        }
        //Rhino flavor
        if (player.cocks[temp].cockType == CockTypesEnum.RHINO) {
            outputText(" It's a smooth, tough pink colored and takes on a long and narrow shape with an oval shaped bulge along the center.");
        }
        //Echidna flavor
        if (player.cocks[temp].cockType == CockTypesEnum.ECHIDNA) {
            outputText(" It is quite a sight to behold, coming well-equiped with four heads.");
        }
        //Worm flavor
        if (player.findStatusEffect(StatusEffects.Infested) >= 0)
            outputText(" Every now and again a slimy worm coated in spunk slips partway out of your " + player.cockDescript(0) + ", tasting the air like a snake's tongue.");
        //if (player.cocks[temp].sock)
        //    player.sockDescript(temp);
        //DONE WITH COCKS, moving on!
        outputText("<br>");
    }
    if (player.cocks.length > 1) {
        temp = 0;
        rando = rand(4);
        if (player.isTaur())
            outputText("<br>Between hind legs of your bestial body you have grown " + player.multiCockDescript() + "!<br>");
        else
            outputText("<br>Where a penis would normally be located, you have instead grown " + player.multiCockDescript() + "!<br>");
        while(temp < player.cocks.length) {

            //middle cock description
            if (rando == 0)
            {
                if (temp == 0)outputText("--Your first ");
                else outputText("--Your next ");
                outputText(player.cockDescript(temp), false);
                outputText(" is ");
                outputText(Math.floor(10 * player.cocks[temp].cockLength) / 10 + " inches long and ");
                if (Math.floor(player.cocks[temp].cockThickness) >= 2)
                    outputText(num2Text(Math.round(player.cocks[temp].cockThickness * 10)/10) + " inches wide.");
                else
                {
                    if (player.cocks[temp].cockThickness == 1)
                        outputText("one inch wide.");
                    else outputText(Math.round(player.cocks[temp].cockThickness*10)/10 + " inches wide.");
                }
            }
            if (rando == 1)
            {
                outputText("--One of your ");
                outputText(player.cockDescript(temp) + "s is " + Math.round(10*player.cocks[temp].cockLength)/10 + " inches long and ");
                if (Math.floor(player.cocks[temp].cockThickness) >= 2)
                    outputText(num2Text(Math.round(player.cocks[temp].cockThickness * 10)/10) + " inches thick.");
                else
                {
                    if (player.cocks[temp].cockThickness == 1)
                        outputText("one inch thick.");
                    else outputText(Math.round(player.cocks[temp].cockThickness*10)/10 + " inches thick.");
                }
            }
            if (rando == 2)
            {
                if (temp > 0)
                    outputText("--Another of your ");
                else outputText("--One of your ");
                outputText(player.cockDescript(temp) + "s is " + Math.round(10*player.cocks[temp].cockLength)/10 + " inches long and ");
                if (Math.floor(player.cocks[temp].cockThickness) >= 2)
                    outputText(num2Text(Math.round(player.cocks[temp].cockThickness * 10)/10) + " inches thick.");
                else
                {
                    if (player.cocks[temp].cockThickness == 1)
                        outputText("one inch thick.");
                    else outputText(Math.round(player.cocks[temp].cockThickness*10)/10 + " inches thick.");
                }
            }
            if (rando == 3)
            {
                if (temp > 0)
                    outputText("--Your next ");
                else outputText("--Your first ");
                outputText(player.cockDescript(temp) + " is " + Math.round(10*player.cocks[temp].cockLength)/10 + " inches long and ");
                if (Math.floor(player.cocks[temp].cockThickness) >= 2)
                    outputText(num2Text(Math.round(player.cocks[temp].cockThickness * 10)/10) + " inches in diameter.");
                else
                {
                    if (Math.round(player.cocks[temp].cockThickness*10)/10 == 1)
                        outputText("one inch in diameter.");
                    else outputText(Math.round(player.cocks[temp].cockThickness*10)/10 + " inches in diameter.");
                }
            }
            //horse cock flavor
            if (player.cocks[temp].cockType == CockTypesEnum.HORSE)
            {
                outputText(" It's mottled black and brown in a very animalistic pattern. The 'head' of your " + player.cockDescript(temp) + " flares proudly, just like a horse's.");
            }
            //dog cock flavor
            if ((player.cocks[temp].cockType == CockTypesEnum.DOG) || (player.cocks[temp].cockType == CockTypesEnum.FOX))
            {
                outputText(" It is shiny, pointed, and covered in veins, just like a large ");
                if (player.cocks[temp].cockType == CockTypesEnum.DOG)
                    outputText("dog's cock.");
                else
                    outputText("fox's cock.");
            }
            //Demon cock flavor
            if (player.cocks[temp].cockType == CockTypesEnum.DEMON)
            {
                outputText(" The crown is ringed with a circle of rubbery protrusions that grow larger as you get more aroused. The entire thing is shiny and covered with tiny, sensitive nodules that leave no doubt about its demonic origins.");
            }
            //Tentacle cock flavor
            if (player.cocks[temp].cockType == CockTypesEnum.TENTACLE)
            {
                outputText(" The entirety of its green surface is covered in perspiring beads of slick moisture. It frequently shifts and moves of its own volition, the slightly oversized and mushroom-like head shifting in coloration to purplish-red whenever you become aroused.");
            }
            //Cat cock flavor
            if (player.cocks[temp].cockType == CockTypesEnum.CAT)
            {
                outputText(" It ends in a single point, much like a spike, and is covered in small, fleshy barbs. The barbs are larger at the base and shrink in size as they get closer to the tip. Each of the spines is soft and flexible, and shouldn't be painful for any of your partners.");
            }
            //Snake cock flavor
            if (player.cocks[temp].cockType == CockTypesEnum.LIZARD)
            {
                outputText(" It's a deep, iridescent purple in color. Unlike a human penis, the shaft is not smooth, and is instead patterned with multiple bulbous bumps.");
            }
            //Anemone cock flavor
            if (player.cocks[temp].cockType == CockTypesEnum.ANEMONE)
            {
                outputText(" The crown is surrounded by tiny tentacles with a venomous, aphrodisiac payload. At its base a number of similar, longer tentacles have formed, guaranteeing that pleasure will be forced upon your partners.");
            }
            //Kangwang flavor
            if (player.cocks[temp].cockType == CockTypesEnum.KANGAROO)
            {
                outputText(" It usually lies coiled inside a sheath, but undulates gently and tapers to a point when erect, somewhat like a taproot.");
            }
            //Draconic Cawk Flava flav
            if (player.cocks[temp].cockType == CockTypesEnum.DRAGON)
            {
                outputText(" With its tapered tip, there are few holes you wouldn't be able to get into. It has a strange, knot-like bulb at its base, but doesn't usually flare during arousal as a dog's knot would.");
            }
            //Bee flavor
            if (player.cocks[temp].cockType == CockTypesEnum.BEE) {
                outputText(" It's a long, smooth black shaft that's rigid to the touch. Its base is ringed with a layer of four inch long soft bee hair. The tip has a much finer layer of short yellow hairs. The tip is very sensitive, and it hurts constantly if you don’t have bee honey on it.");
            }
            //Pig flavor
            if (player.cocks[temp].cockType == CockTypesEnum.PIG) {
                outputText(" It's bright pinkish red, ending in a prominent corkscrew shape at the tip.");
            }
            //Avian flavor
            if (player.cocks[temp].cockType == CockTypesEnum.AVIAN) {
                outputText(" It's a red, tapered cock that ends in a tip. It rests nicely in a sheath.");
            }

            if (player.cocks[temp].knotMultiplier > 1) {
                if (player.cocks[temp].knotMultiplier >= 1.8)
                    outputText(" The obscenely swollen lump of flesh near the base of your " + player.cockDescript(temp) + " looks almost comically mismatched for your " + player.cockDescript(temp) + ".");
                else if (player.cocks[temp].knotMultiplier >= 1.4)
                    outputText(" A large bulge of flesh nestles just above the bottom of your " + player.cockDescript(temp) + ", to ensure it stays where it belongs during mating.");
                else
                    outputText(" A small knot of thicker flesh is near the base of your " + player.cockDescript(temp) + ", ready to expand to help you lodge your " + player.cockDescript(temp) + " inside a female.");
                //List knot thickness
                outputText(" The knot is " + Math.floor(player.cocks[temp].cockThickness * player.cocks[temp].knotMultiplier * 10) / 10 + " inches thick when at full size.");
            }

            /*if (player.cocks[temp].sock != "" && player.cocks[temp].sock != null)	// I dunno what was happening, but it looks like .sock is null, as it doesn't exist. I guess this is probably more left over from some of the restucturing.
            {																		// Anyways, check against null values, and stuff works again.
                trace("Found a sock description (WTF even is a sock?)", player.cocks[temp].sock);
                sockDescript(temp);
            }*/
            temp++;
            rando++;
            outputText("<br>");
            if (rando > 3) rando = 0;
        }
        //Worm flavor
        if (player.findStatusEffect(StatusEffects.Infested) >= 0)
            outputText("Every now and again slimy worms coated in spunk slip partway out of your " + player.multiCockDescriptLight() + ", tasting the air like tongues of snakes.<br>");
        //DONE WITH COCKS, moving on!
    }
    //Of Balls and Sacks!
    if (player.balls > 0) {
        if (player.findStatusEffect(StatusEffects.Uniball) >= 0)
        {
            if (player.skinType != SKIN_TYPE_GOO)
                outputText("Your [sack] clings tightly to your groin, holding " + player.ballsDescript() + " snugly against you.");
            else if (player.skinType == SKIN_TYPE_GOO)
                outputText("Your [sack] clings tightly to your groin, dripping and holding " + player.ballsDescript() + " snugly against you.");
        }
        else if (player.cockTotal() == 0)
        {
            if (player.skinType == SKIN_TYPE_PLAIN)
                outputText("A " + player.sackDescript() + " with " + player.ballsDescript() + " swings heavily under where a penis would normally grow.");
            if (player.skinType == SKIN_TYPE_FUR)
                outputText("A fuzzy " + player.sackDescript() + " filled with " + player.ballsDescript() + " swings low under where a penis would normally grow.");
            if (player.skinType == SKIN_TYPE_SCALES)
                outputText("A scaley " + player.sackDescript() + " hugs your " + player.ballsDescript() + " tightly against your body.");
            if (player.skinType == SKIN_TYPE_GOO)
                outputText("An oozing, semi-solid sack with " + player.ballsDescript() + " swings heavily under where a penis would normally grow.");
        }
        else
        {
            if (player.skinType == SKIN_TYPE_PLAIN)
                outputText("A " + player.sackDescript() + " with " + player.ballsDescript() + " swings heavily beneath your " + player.multiCockDescriptLight() + ".");
            if (player.skinType == SKIN_TYPE_FUR)
                outputText("A fuzzy " + player.sackDescript() + " filled with " + player.ballsDescript() + " swings low under your " + player.multiCockDescriptLight() + ".");
            if (player.skinType == SKIN_TYPE_SCALES)
                outputText("A scaley " + player.sackDescript() + " hugs your " + player.ballsDescript() + " tightly against your body.");
            if (player.skinType == SKIN_TYPE_GOO)
                outputText("An oozing, semi-solid sack with " + player.ballsDescript() + " swings heavily beneath your " + player.multiCockDescriptLight() + ".");
        }
        outputText(" You estimate each of them to be about " + num2Text(Math.round(player.ballSize)) + " ");
        if (Math.round(player.ballSize) == 1)
            outputText("inch");
        else outputText("inches");
        outputText(" across.<br>");
    }
    //VAGOOZ
    if (player.vaginas.length > 0) {
        if (player.gender == 2 && player.isTaur())
            outputText("<br>Your womanly parts have shifted to lie between your hind legs, in a rather feral fashion.");
        outputText("<br>");
        if (player.vaginas.length == 1) {
            if (useMetrics)
                outputText("You have a " + player.vaginaDescript(0) + ", with a " + Math.floor(player.vaginas[0].clitLength * 10 * 2.54) / 10 + "-centimetre clit");
            else
                outputText("You have a " + player.vaginaDescript(0) + ", with a " + Math.floor(player.vaginas[0].clitLength * 10) / 10 + "-inch clit");
            if (player.vaginas[0].virgin)
                outputText(" and an intact hymen");
            outputText(". ");
        }
        if (player.vaginas.length > 1) {
            if (useMetrics)
                outputText("You have " + player.vaginas.length + " " + player.vaginaDescript(0) + "s, with " + Math.floor(player.vaginas[0].clitLength * 10 * 2.54) / 10 + "-centimetre clits each. ");
            else
                outputText("You have " + player.vaginas.length + " " + player.vaginaDescript(0) + "s, with " + Math.floor(player.vaginas[0].clitLength * 10) / 10 + "-inch clits each. ");
        }
        if (player.lib < 50 && player.lust < 50) { //not particularly horny
            //Wetness
            if (player.vaginas[0].vaginalWetness >= VAGINA_WETNESS_WET && player.vaginas[0].vaginalWetness < VAGINA_WETNESS_DROOLING)
                outputText("Moisture gleams in ");
            if (player.vaginas[0].vaginalWetness >= VAGINA_WETNESS_DROOLING)
            {
                outputText("Occasional beads of ");
                outputText("lubricant drip from ");
            }
            //Different description based on vag looseness
            if (player.vaginas[0].vaginalWetness >= VAGINA_WETNESS_WET)
            {
                if (player.vaginas[0].vaginalLooseness < VAGINA_LOOSENESS_LOOSE)
                    outputText("your " + player.vaginaDescript(0) + ". ");
                if (player.vaginas[0].vaginalLooseness >= VAGINA_LOOSENESS_LOOSE && player.vaginas[0].vaginalLooseness < VAGINA_LOOSENESS_GAPING_WIDE)
                    outputText("your " + player.vaginaDescript(0) + ", its lips slightly parted. ");
                if (player.vaginas[0].vaginalLooseness >= VAGINA_LOOSENESS_GAPING_WIDE)
                    outputText("the massive hole that is your " + player.vaginaDescript(0) + ". ");
            }
        }
        if ((player.lib >= 50 || player.lust >=50) && (player.lib < 80 && player.lust < 80)) { //kinda horny
            //Wetness
            if (player.vaginas[0].vaginalWetness < VAGINA_WETNESS_WET)
                outputText("Moisture gleams in ");
            if (player.vaginas[0].vaginalWetness >= VAGINA_WETNESS_WET && player.vaginas[0].vaginalWetness < VAGINA_WETNESS_DROOLING)
            {
                outputText("Occasional beads of ");
                outputText("lubricant drip from ");
            }
            if (player.vaginas[0].vaginalWetness >= VAGINA_WETNESS_DROOLING)
            {
                outputText("Thin streams of ");
                outputText("lubricant occasionally dribble from ");
            }
            //Different description based on vag looseness
            if (player.vaginas[0].vaginalLooseness < VAGINA_LOOSENESS_LOOSE)
                outputText("your " + player.vaginaDescript(0) + ". ");
            if (player.vaginas[0].vaginalLooseness >= VAGINA_LOOSENESS_LOOSE && player.vaginas[0].vaginalLooseness < VAGINA_LOOSENESS_GAPING_WIDE)
                outputText("your " + player.vaginaDescript(0) + ", its lips slightly parted. ");
            if (player.vaginas[0].vaginalLooseness >= VAGINA_LOOSENESS_GAPING_WIDE)
                outputText("the massive hole that is your " + player.vaginaDescript(0) + ". ");
        }
        if ((player.lib > 80 || player.lust > 80)) { //WTF horny!
            //Wetness
            if (player.vaginas[0].vaginalWetness < VAGINA_WETNESS_WET)

            {
                outputText("Occasional beads of ");
                outputText("lubricant drip from ");
            }
            if (player.vaginas[0].vaginalWetness >= VAGINA_WETNESS_WET && player.vaginas[0].vaginalWetness < VAGINA_WETNESS_DROOLING)

            {
                outputText("Thin streams of ");
                outputText("lubricant occasionally dribble from ");
            }
            if (player.vaginas[0].vaginalWetness >= VAGINA_WETNESS_DROOLING)

            {
                outputText("Thick streams of ");
                outputText("lubricant drool constantly from ");
            }
            //Different description based on vag looseness
            if (player.vaginas[0].vaginalLooseness < VAGINA_LOOSENESS_LOOSE)
                outputText("your " + player.vaginaDescript(0) + ". ");
            if (player.vaginas[0].vaginalLooseness >= VAGINA_LOOSENESS_LOOSE && player.vaginas[0].vaginalLooseness < VAGINA_LOOSENESS_GAPING_WIDE)
                outputText("your " + player.vaginaDescript(0) + ", its lips slightly parted. ");
            if (player.vaginas[0].vaginalLooseness >= VAGINA_LOOSENESS_GAPING_WIDE)
                outputText("the massive hole that is your cunt. ");
        }
        //Line Drop for next descript!
        outputText("<br>");
    }
    //Genderless lovun'
    if (player.cockTotal() == 0 && player.vaginas.length == 0)
        outputText("<br>You have a curious lack of any sexual endowments.<br>");


    //BUNGHOLIO
    if (player.ass) {
        outputText("<br>");
        outputText("You have one " + player.assholeDescript() + ", placed between your butt-cheeks where it belongs.<br>");
    }
    //Piercings!
    if (player.eyebrowPierced > 0)
        outputText("<br>A solitary " + player.eyebrowPShort + " adorns your eyebrow, looking very stylish.");
    if (player.earsPierced > 0)
        outputText("<br>Your ears are pierced with " + player.earsPShort + ".");
    if (player.nosePierced > 0)
        outputText("<br>A " + player.nosePShort + " dangles from your nose.");
    if (player.lipPierced > 0)
        outputText("<br>Shining on your lip, a " + player.lipPShort + " is plainly visible.");
    if (player.tonguePierced > 0)
        outputText("<br>Though not visible, you can plainly feel your " + player.tonguePShort + " secured in your tongue.");
    if (player.nipplesPierced == 3)
        outputText("<br>Your " + player.nippleDescript(0) + "s ache and tingle with every step, as your heavy " + player.nipplesPShort + " swings back and forth.");
    else if (player.nipplesPierced > 0)
        outputText("<br>Your " + player.nippleDescript(0) + "s are pierced with " + player.nipplesPShort + ".");
    if (player.totalCocks() > 0)
    {
        if (player.cocks[0].pierced > 0)
        {
            outputText("<br>Looking positively perverse, a " + player.cocks[0].pShortDesc + " adorns your " + player.cockDescript(0) + ".");
        }
    }
    //if (flags[UNKNOWN_FLAG_NUMBER_00286] == 1)
    //    outputText("<br>A magical, ruby-studded bar pierces your belly button, allowing you to summon Ceraph on a whim.");
    if (player.hasVagina())
    {
        if (player.vaginas[0].labiaPierced > 0)
            outputText("<br>Your " + player.vaginaDescript(0) + " glitters with the " + player.vaginas[0].labiaPShort + " hanging from your lips.");
        if (player.vaginas[0].clitPierced > 0)
            outputText("<br>Impossible to ignore, your " + player.clitDescript() + " glitters with its " + player.vaginas[0].clitPShort + ".");
    }
    //MONEY!
    if (player.gems == 0)
        outputText("<br><br><b>Your money-purse is devoid of any currency.");
    if (player.gems > 1)
        outputText("<br><br><b>You have " + formatNumber(Math.floor(player.gems)) + " shining gems, collected in your travels.");
    if (player.gems == 1)
        outputText("<br><br><b>You have " + formatNumber(Math.floor(player.gems)) + " shining gem, collected in your travels.");
    doNext(playerMenu);
}