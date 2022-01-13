﻿const SLEEP_WITH:int = 701;

import classes.creature;
import classes.cockClass;

function camp():void {
	trace("Current fertility: " + player.totalFertility());
	newGameText.visible = true;
	newGameBG.visible = true;
	if(player.hasStatusAffect("Post Akbal Submission") >= 0) {
		player.removeStatusAffect("Post Akbal Submission");
		akbalSubmissionFollowup();
		return;
	}
	if(player.hasStatusAffect("Post Anemone Beatdown") >= 0) {
		HPChange(Math.round(maxHP()/2),false);
		player.removeStatusAffect("Post Anemone Beatdown");
	}
	//make sure gameState is cleared if coming from combat or giacomo
	gameState = 0;
	if(inDungeon) {
		dataBG.visible = true;
		dataText.visible = true;
		appearanceText.visible = true;
		appearanceBG.visible = true;
		dungeonRoom(dungeonLoc);
		return;
	}
	//Clear out Izma's saved loot status
	flags[234] = "";
	//History perk backup
	if(flags[418] == 0) {
		hideMenus();
		fixHistory();
		return;
	}
	if(arianFollower() && flags[ARIAN_MORNING] == 1) {
		hideMenus();
		wakeUpAfterArianSleep();
		return;
	}
	if(arianFollower() && flags[ARIAN_EGG_EVENT] >= 30) {
		hideMenus();
		arianEggingEvent();
		return;
	}
	if(arianFollower() && flags[ARIAN_EGG_COUNTER] >= 24 && flags[ARIAN_VAGINA] > 0) {
		hideMenus();
		arianLaysEggs();
		return;
	}
	if(flags[JACK_FROST_PROGRESS] > 0) {
		hideMenus();
		processJackFrostEvent();
		return;
	}
	if(player.hasKeyItem("Super Reducto") < 0 && milkSlave() && player.hasStatusAffect("Camp Rathazul") >= 0 && player.statusAffectv2("metRathazul") >= 4) {
		hideMenus();
		ratducto();
		return;
	}
	if(nieveHoliday() && hours == 6) {
		if(flags[NIEVE_STAGE] == 0) {
			hideMenus();
			snowLadyActive();
			return;
		}
		else if(flags[NIEVE_STAGE] == 4) {
			hideMenus();
			nieveComesToLife();
			return;
		}
	}
	if(isHeliaBirthday() && followerHel() && flags[HEL_FOLLOWER_LEVEL] >= 2 && flags[HELIA_BIRTHDAY_OFFERED] == 0) {
		hideMenus();
		heliasBirthday();
		return;
	}
	if(flags[HEL_PREGNANCY_INCUBATION] >= 1 && followerHel()) {
		if(flags[HEL_PREGNANCY_INCUBATION] <= 300 && flags[HEL_PREGNANCY_NOTICES] == 0) {
			hideMenus();
			bulgyCampNotice();
			return;
		}
		if(flags[HEL_PREGNANCY_INCUBATION] <= 200 && flags[HEL_PREGNANCY_NOTICES] == 1) {
			hideMenus();
			heliaSwollenNotice();
			return;
		}
		if(flags[HEL_PREGNANCY_INCUBATION] <= 100 && flags[HEL_PREGNANCY_NOTICES] == 2) {
			hideMenus();
			heliaGravidity();
			return;
		}
		if(flags[HEL_PREGNANCY_INCUBATION] == 1 && (hours == 6 || hours == 7)) {
			hideMenus();
			heliaBirthtime();
			return;
		}
	}
	if(flags[HELSPAWN_AGE] == 1 && flags[HELSPAWN_GROWUP_COUNTER] == 7) {
		hideMenus();
		helSpawnGraduation();
		return;
	}
	if(hours >= 10 && hours <= 18 && (days % 20 == 0 || hours == 12) && flags[HELSPAWN_DADDY] == 2 && helspawnFollower()) {
		hideMenus();
		maiVisitsHerKids();
		return;
	}
	if(hours == 6 && flags[HELSPAWN_DADDY] == 1 && days % 30 == 0 && flags[SPIDER_BRO_GIFT] == 0 && helspawnFollower())
	{
		hideMenus();
		spiderBrosGift();
		return;
	}
	if(hours >= 10 && hours <= 18 && (days % 15 == 0 || hours == 12) && helspawnFollower() && flags[HAKON_AND_KIRI_VISIT] == 0) {
		hideMenus();
		hakonAndKiriComeVisit();
		return;
	}
	if(flags[HELSPAWN_AGE] == 2 && flags[HELSPAWN_DISCOVER_BOOZE] == 0 && (rand(10) == 0 || flags[HELSPAWN_GROWUP_COUNTER] == 6)) {
		hideMenus();
		helspawnDiscoversBooze();
		return;
	}
	if(flags[HELSPAWN_AGE] == 2 && flags[HELSPAWN_WEAPON] == 0 && flags[HELSPAWN_GROWUP_COUNTER] == 3 && hours >= 10 && hours <= 18) {
		hideMenus();
		helSpawnChoosesAFightingStyle();
		return;
	}
	if(flags[HELSPAWN_AGE] == 2 && (hours == 6 || hours == 7) && flags[HELSPAWN_GROWUP_COUNTER] == 7 && flags[HELSPAWN_FUCK_INTERRUPTUS] == 1) {
		helspawnAllGrownUp();
		return;
	}
	if((sophieFollower() || bimboSophie()) && flags[SOPHIE_DAUGHTER_MATURITY_COUNTER] == 1) {
		flags[SOPHIE_DAUGHTER_MATURITY_COUNTER] = 0;
		sophieKidMaturation();
		hideMenus();
		return;
	}
	//Bimbo Sophie Move In Request!
	if(bimboSophie() && flags[SOPHIE_BROACHED_SLEEP_WITH] == 0 && flags[SOPHIE_INCUBATION] > 0 && flags[SOPHIE_INCUBATION] < 140)
	{
		hideMenus();
		sophieMoveInAttempt();
		return;
	}
	if(!nieveHoliday() && hours == 6 && flags[NIEVE_STAGE] > 0) {
		nieveIsOver();
		return;
	}
	//Amily followup!
	if(flags[163] == 1) {
		postBirthingEndChoices();
		flags[163] = 2;
		return;
	}
	if(timeQ > 0) {
		if(!campQ) {
			outputText("More time passes...\n", true);
			goNext(timeQ, false);
			return;
		}
		else {
			if(hours < 6 || hours > 20) {
				eventParser(41);
				return;
			}
			else {
				eventParser(11);
				return;
			}
		}
	}
	if(flags[FUCK_FLOWER_KILLED] == 0 && flags[100] > 0) {
		if(flags[FUCK_FLOWER_LEVEL] == 0 && flags[FUCK_FLOWER_GROWTH_COUNTER] >= 8) {
			getASprout();
			hideMenus();
			return;
		}
		if(flags[FUCK_FLOWER_LEVEL] == 1 && flags[FUCK_FLOWER_GROWTH_COUNTER] >= 7) {
			fuckPlantGrowsToLevel2();
			hideMenus();
			return;
		}
		if(flags[FUCK_FLOWER_LEVEL] == 2 && flags[FUCK_FLOWER_GROWTH_COUNTER] >= 25) {
			flowerGrowsToP3();
			hideMenus();
			return;
		}
		//Level 4 growth
		if(flags[FUCK_FLOWER_LEVEL] == 3 && flags[FUCK_FLOWER_GROWTH_COUNTER] >= 40) {
			treePhaseFourGo();
			hideMenus();
			return;
		}
	}
	//Jojo treeflips!
	if(flags[FUCK_FLOWER_LEVEL] >= 4 && flags[FUCK_FLOWER_KILLED] == 0 && player.hasStatusAffect("PureCampJojo") >= 0) {
		JojoTransformAndRollOut();
		hideMenus();
		return;
	}
	//Amily flips out
	if(amilyFollower() && !amilyCorrupt() && flags[FUCK_FLOWER_LEVEL] >= 4 && flags[FUCK_FLOWER_KILLED] == 0) {
		amilyHatesTreeFucking();
		hideMenus();
		return;
	}
	trace("FUCK FLOWER KILLED: " + flags[FUCK_FLOWER_KILLED] + " TREE FLIPOUT: " + flags[AMILY_TREE_FLIPOUT] + " FOLLOWER: " + flags[43]);
	if(flags[FUCK_FLOWER_KILLED] == 1 && flags[AMILY_TREE_FLIPOUT] == 1 && !amilyFollower() && flags[AMILY_VISITING_URTA] == 0) {
		amilyComesBack();
		flags[AMILY_TREE_FLIPOUT] = 2;
		hideMenus();
		return;
	}
	//Anemone birth followup!
	if(player.hasStatusAffect("Camp Anemone Trigger") >= 0) {
		player.removeStatusAffect("Camp Anemone Trigger");
		anemoneKidBirthPtII();
		hideMenus();
		return;
	}
	//Exgartuan clearing
	if(player.statusAffectv1("Exgartuan") == 1 && (player.cockArea(0) < 100 || player.cocks.length == 0)) {
		exgartuanCampUpdate();
		return;
	}
	else if(player.statusAffectv1("Exgartuan") == 2 && player.biggestTitSize() < 12) {
		exgartuanCampUpdate();
		return;
	}
	//Izzys tits asplode
	if(isabellaFollower() && flags[ISABELLA_MILKED_YET] >= 10 && player.hasKeyItem("Breast Milker - Installed At Whitney's Farm") >= 0) {
		milktasticLacticLactation();
		hideMenus();
		return;
	}
	//Marble meets follower izzy when moving in
	if(flags[381] == 1 && isabellaFollower() && player.hasStatusAffect("Camp Marble") >= 0) {
		angryMurble();
		hideMenus();
		return;
	}
	//Cotton preg freakout
	if(player.pregnancyIncubation <= 280 && player.pregnancyIncubation >= 0 && player.pregnancyType == 20 &&
	   	flags[COTTON_KNOCKED_UP_PC_AND_TALK_HAPPENED] == 0 && (hours == 6 || hours == 7)) {
		goTellCottonShesAMomDad();
		hideMenus();
		return;
	}
	//Bimbo Sophie finds ovi elixer in chest!
	if(bimboSophie() && hasItemInStorage("OviElix") && rand(5) == 0 && flags[284] == 0 && player.gender > 0) {
		sophieEggApocalypse();
		hideMenus();
		return;
	}
	//Amily + Urta freakout!
	if(!urtaBusy() && flags[AMILY_VISITING_URTA] == 0 && rand(10) == 0 && flags[146] >= 0 && flags[147] == 0 && flags[AMILY_NEED_TO_FREAK_ABOUT_URTA] == 1 && amilyFollower() && flags[43] == 1 && flags[AMILY_INCUBATION] == 0) {
		amilyUrtaReaction();
		hideMenus();
		return;
	}
	//Find jojo's note!
	if(flags[79] == 1 && flags[78] == 0) {
		findJojosNote();
		hideMenus();
		return;
	}
	//Rathazul freaks out about jojo
	if(flags[83] == 0 && rand(5) == 0 && player.hasStatusAffect("Camp Rathazul") >= 0 && campCorruptJojo()) {
		rathazulFreaksOverJojo();
		hideMenus();
		return;
	}
	//Izma/Marble freakout - marble moves in
	if(flags[237] == 1) {
		newMarbleMeetsIzma();
		hideMenus();
		return;
	}
	//Izma/Amily freakout - Amily moves in
	if(flags[236] == 1) {
		newAmilyMeetsIzma();
		hideMenus();
		return;
	}
	//Amily/Marble Freakout
	if(flags[86] == 0 && player.hasStatusAffect("Camp Marble") >= 0 && flags[43] == 1 && amilyFollower()) {
		marbleVsAmilyFreakout();
		hideMenus();
		return;
	}
	//Amily and/or Jojo freakout about Vapula!!
	if(vapulaSlave() && (player.hasStatusAffect("PureCampJojo") >= 0 || (amilyFollower() && !amilyCorrupt()))) {
		//Jojo but not Amily
		if(player.hasStatusAffect("PureCampJojo") >= 0 && !(amilyFollower() && !amilyCorrupt())) 
			mouseWaifuFreakout(false,true);
		//Amily but not Jojo
		else if((amilyFollower() && !amilyCorrupt())) mouseWaifuFreakout(true,false);
		//Both
		else mouseWaifuFreakout(true,true);
		hideMenus();
		return;
	}
	//Go through Helia's first time move in interactions if  you haven't yet.
	if(flags[HEL_FOLLOWER_LEVEL] == 2 && followerHel() && flags[HEL_INTROS_LEVEL] == 0) {
		helFollowersIntro();
		hideMenus();
		return;
	}
	//If you've gone through Hel's first time actions and Issy moves in without being okay with threesomes.
	if(flags[HEL_INTROS_LEVEL] > 9000 && followerHel() && isabellaFollower() && flags[HEL_ISABELLA_THREESOME_ENABLED] == 0) {
		angryHelAndIzzyCampHelHereFirst();
		hideMenus();
		return;		
	}
	//Reset.
	flags[CAME_WORMS_AFTER_COMBAT] = 0;
	campQ = false;
	//Build explore menus
	var desert:Number = 0;
	var lake:Number = 0;
	var forest:Number = 0;
	var mountain:Number = 0;
	var farm:Number = 0;
	var jojo:Number = 0;
	var placesNum:Number = 0;
	var followers:Number = 0;
	var lovers:Number = 0;
	var slaves:Number = 0;
	var storage:Number = 0;
	if(stash()) storage = 2951;
	if(places(false)) placesNum = 71; 
	if(foundDesert) desert = 3;
	if(foundMountain) mountain = 6;
	if(foundForest) forest = 4;
	if(foundLake) lake = 5;
	if(whitney > 0) farm = 7;
	//Clear stuff
	if(player.hasStatusAffect("Slime Craving Output") >= 0) player.removeStatusAffect("Slime Craving Output");
	//Reset luststick display status (see event parser)
	flags[95] = 0;
	//Display Proper Buttons
	appearanceText.visible = true;
	appearanceBG.visible = true;
	perksText.visible = true;
	perksBG.visible = true;
	statsBG.visible = true;
	statsText.visible = true;
	dataBG.visible = true;
	dataText.visible = true;
	showStats();
	//Change settings of new game buttons to go to main menu
	newGameText.removeEventListener(MouseEvent.CLICK, newGameGo);
	newGameBG.removeEventListener(MouseEvent.CLICK, newGameGo);
	newGameText.addEventListener(MouseEvent.CLICK, mainMenu);
	newGameBG.addEventListener(MouseEvent.CLICK, mainMenu);
	newGameText.text = "Main Menu";
	//clear up/down arrows
	hideUpDown();
	//Level junk
	if(player.XP >= (player.level) * 100 || player.perkPoints > 0) {
		if(player.XP < player.level * 100) levelText2.text = "Perk Up";
		else levelText2.text = "Level Up";
		levelText2.visible = true;
		levelBG.visible = true;
		levelUp.visible = true;
	}
	else {
		levelText2.visible = false;
		levelBG.visible = false;
		levelUp.visible = false;
	}
	//Build main menu
	var masturbate:Number = 0;
	var rest:Number = 0;
	var explore:Number = 2;
	if(player.fatigue > 50) rest = 11;
	if(player.lust > 30) masturbate = 42;
	outputText("", true);
	//Isabella upgrades camp level!
	if(isabellaFollower()) {
		outputText("Your campsite got a lot more comfortable once Isabella moved in.  Carpets cover up much of the barren ground, simple awnings tied to the rocks provide shade, and hand-made wooden furniture provides comfortable places to sit and sleep.", false);
		if(days >= 20) outputText("  You've even managed to carve some artwork into the rocks around the camp's perimeter.", false);
	}
	//Live in-ness
	else {
		if(days < 10) outputText("Your campsite is fairly simple at the moment.  Your tent and bedroll are set in front of the rocks that lead to the portal.  You have a small fire pit as well.", false);
		else if(days < 20) outputText("Your campsite is starting to get a very 'lived-in' look.  The fire-pit is well defined with some rocks you've arranged around it, and your bedroll and tent have been set up in the area most sheltered by rocks.", false);
		else outputText("Your new home is as comfy as a camp site can be.  The fire-pit and tent are both set up perfectly, and in good repair, and you've even managed to carve some artwork into the rocks around the camp's perimeter.", false);
	}
	//Nursery
	if(flags[9] == 100 && player.hasStatusAffect("Camp Marble") >= 0) {
		outputText("  Marble has built a fairly secure nursery amongst the rocks to house your ",false);
		if(flags[8] == 0) outputText("future children", false);
		else {
			outputText(num2Text(flags[8]) + " child", false);
			if(flags[8] > 1) outputText("ren", false);
		}
		outputText(".", false);
	}
	//HARPY ROOKERY
	if(flags[SOPHIE_ADULT_KID_COUNT] > 0) {
		//Rookery Descriptions (Short)
		//Small (1 mature daughter)
		if(flags[SOPHIE_ADULT_KID_COUNT] == 1) {
			outputText("  There's a smallish harpy nest that your daughter has built up with rocks piled high near the fringes of your camp.  It's kind of pathetic, but she seems proud of her accomplishment.");
		}
		//Medium (2-3 mature daughters)
		else if(flags[SOPHIE_ADULT_KID_COUNT] <= 3) {
			outputText("  There's a growing pile of stones built up at the fringes of your camp.  It's big enough to be considered a small hill by this point, dotted with a couple small harpy nests just barely big enough for two.");
		}
		//Big (4 mature daughters)
		else if(flags[SOPHIE_ADULT_KID_COUNT] <= 4) {
			outputText("  The harpy rookery at the edge of camp has gotten pretty big.  It's taller than most of the standing stones that surround the portal, and there's more nests than harpies at this point.  Every now and then you see the four of them managing a boulder they dragged in from somewhere to add to it.");
		}
		//Large (5-10 mature daughters)
		else if(flags[SOPHIE_ADULT_KID_COUNT] <= 10) {
			outputText("  The rookery has gotten quite large.  It stands nearly two stories tall at this point, dotted with nests and hollowed out places in the center.  It's surrounded by the many feathers the assembled harpies leave behind.");
		}
		//Giant (11-20 mature daughters)
		else if(flags[SOPHIE_ADULT_KID_COUNT] <= 20) {
			outputText("  A towering harpy rookery has risen up at the fringes of your camp, filled with all of your harpy brood.  It's at least three stories tall at this point, and it has actually begun to resemble a secure structure.  These harpies are always rebuilding and adding onto it.");
		}
		//Massive (31-50 mature daughters)
		else if(flags[SOPHIE_ADULT_KID_COUNT] <= 50) {
			outputText("  A massive harpy rookery towers over the edges of your camp.  It's almost entirely built out of stones that are fit seamlessly into each other, with many ledges and overhangs for nests.  There's a constant hum of activity over there day or night.");
		}
		//Immense (51+ Mature daughters)
		else {
			outputText("  An immense harpy rookery dominates the edge of your camp, towering over the rest of it.  Innumerable harpies flit around it, always working on it, assisted from below by the few sisters unlucky enough to be flightless.");
		}
	}
	//Traps
	if(player.hasStatusAffect("Defense: Canopy") >= 0) {
		outputText("  A thorny tree has sprouted near the center of the camp, growing a protective canopy of spiky vines around the portal and your camp.", false);
	}
	else outputText("  You have a number of traps surrounding your makeshift home, but they are fairly simple and may not do much to deter a demon.", false);
	outputText("  The portal shimmers in the background as it always does, looking menacing and reminding you of why you came.\n\n", false);

	//Ember's anti-minotaur crusade!
	if(flags[EMBER_CURRENTLY_FREAKING_ABOUT_MINOCUM] == 1) {
		//Modified Camp Description
		outputText("Since Ember began " + emberMF("his","her") + " 'crusade' against the minotaur population, skulls have begun to pile up on either side of the entrance to " + emberMF("his","her") + " den.  There're quite a lot of them.\n\n");
	}
	//Dat tree!
	if(flags[FUCK_FLOWER_LEVEL] >= 4 && flags[FUCK_FLOWER_KILLED] == 0) {
		outputText("On the outer edges, half-hidden behind a rock, is a large, very healthy tree.  It grew fairly fast, but seems to be fully developed now.  Holli, Marae's corrupt spawn, lives within.\n\n");
	}
	//BIMBO SOPHAH
	if(bimboSophie()) sophieCampLines();
	if(player.hasStatusAffect("Camp Marble") >= 0) {
		temp = rand(5);
		outputText("A second bedroll rests next to yours; a large two-handed hammer sometimes rests against it, depending on whether or not its owner needs it at the time.  ", false);
		//requires at least 1 kid, time is just before sunset, this scene always happens at this time if the PC has at least one kid.
		if(flags[MARBLE_KIDS] >= 1 && (hours == 19 || hours == 20)) {
			outputText("Marble herself is currently in the nursery, putting your ");
			if(flags[MARBLE_KIDS] == 1) outputText("child");
			else outputText("children");
			outputText(" to bed.");
		}
		//at 6-7 in the morning, scene always displays at this time
		else if(hours == 6 || hours == 7) outputText("Marble is off in an open area to the side of your camp right now.  She is practicing with her large hammer, going through her daily training.");
		//after nightfall, scene always displays at this time unless PC is wormed
		else if(hours == 21 && player.hasStatusAffect("infested") < 0) {
			outputText("Marble is hanging around her bedroll waiting for you to come to bed.  However, sometimes she lies down for a bit, and sometimes she paces next to it.");
			if(flags[MARBLE_LUST] > 30) outputText("  She seems to be feeling antsy.");
		}
		else if(flags[MARBLE_KIDS] > 0) {
			//requires at least 6 kids, and no other parental characters in camp
			if(rand(2) == 0 && flags[MARBLE_KIDS] > 5) outputText("Marble is currently tending to your kids, but she looks a bit stressed out right now.  It looks like " + num2Text(flags[MARBLE_KIDS]) + " might just be too many for her to handle on her own...");
			//requires at least 4 kids
			else if(rand(3) == 0 && flags[MARBLE_KIDS] > 3) outputText("Marble herself is in the camp right now, telling a story about her travels around the world to her kids as they gather around her.  The girls are completely enthralled by her words.  You can't help but smile.");
			//requires at least 2 kids
			else if(rand(3) == 0 && flags[MARBLE_KIDS] > 1) outputText("Marble herself is involved in a play fight with two of your kids brandishing small sticks.  It seems that the <i>mommy monster</i> is terrorising the camp and needs to be stopped by the <i>Mighty Moo and her sidekick Bovine Lass</i>.");
			else if(rand(3) == 0 && flags[MARBLE_KIDS] > 1) outputText("Marble herself is out right now; she's taken her kids to go visit Whitney.  You're sure though that she'll be back within the hour, so you could just wait if you needed her.");
			else {
				//requires at least 1 kid
				outputText("Marble herself is nursing ");
				if(flags[MARBLE_KIDS] > 1) outputText("one of your cow-girl children");
				else outputText("your cow-girl child");
				outputText(" with a content look on her face.");
			}
		}
		//(Choose one of these at random to display each hour)
		else if(temp == 0) outputText("Marble herself has gone off to Whitney's farm to get milked right now.  You're sure she'd be back in moments if you needed her.", false);
		else if(temp == 1) outputText("Marble herself has gone off to Whitney's farm to do some chores right now.  You're sure she'd be back in moments if you needed her.", false);
		else if(temp == 2) outputText("Marble herself isn't at the camp right now; she is probably off getting supplies, though she'll be back soon enough.  You're sure she'd be back in moments if you needed her.", false);
		else if(temp == 3) {
			outputText("Marble herself is resting on her bedroll right now.", false);
			
		}
		else if(temp == 4) {
			outputText("Marble herself is wandering around the camp right now.", false);
		}
		outputText("\n\n", false);	
	}
	//RATHAZUL
	//if rathazul has joined the camp
	if(player.hasStatusAffect("Camp Rathazul") >= 0) {
		if(flags[274] <= 1) {
			outputText("Tucked into a shaded corner of the rocks is a bevy of alchemical devices and equipment.  The alchemist Rathazul looks to be hard at work with his chemicals, working on who knows what.", false);
			if(flags[274] == 1) outputText("  Some kind of spider-silk-based equipment is hanging from a nearby rack.  <b>He's finished with the task you gave him!</b>", false);
			outputText("\n\n", false);
		}
		else outputText("Tucked into a shaded corner of the rocks is a bevy of alchemical devices and equipment.  The alchemist Rathazul looks to be hard at work on the silken equipment you've commissioned him to craft.\n\n", false);
	}
	//MOUSEBITCH
	if(amilyFollower() && flags[43] == 1) {
		if(flags[FUCK_FLOWER_LEVEL] >= 4) outputText("Amily has relocated her grass bedding to the opposite side of the camp from the strange tree; every now and then, she gives it a suspicious glance, as if deciding whether to move even further.");
		else outputText("A surprisingly tidy nest of soft grasses and sweet-smelling herbs has been built close to your bedroll. A much-patched blanket draped neatly over the top is further proof that Amily sleeps here. She changes the bedding every few days, to ensure it stays as nice as possible.\n\n", false);
	}
	//Corrupt mousebitch!
	else if(amilyFollower() && flags[43] == 2) {
		outputText("Sometimes you hear a faint moan from not too far away. No doubt the result of your slutty toy mouse playing with herself.\n\n", false);
	}
	//Amily out freaking Urta?
	else if(flags[AMILY_VISITING_URTA] == 1 || flags[AMILY_VISITING_URTA] == 2) {
		outputText("Amily's bed of grass and herbs lies empty, the mouse-woman still absent from her sojourn to meet your other lover.\n\n", false);
	}
	//JOJO
	//If Jojo is corrupted, add him to the masturbate menu.
	if(campCorruptJojo()) outputText("From time to time you can hear movement from around your camp, and you routinely find thick puddles of mouse semen.  You are sure Jojo is here if you ever need to sate yourself.\n\n", false);
	//Pure Jojo
	if(player.hasStatusAffect("PureCampJojo") >= 0) outputText("There is a small bedroll for Jojo near your own, though the mouse is probably hanging around the camp's perimeter.\n\n", false);
	//Izma
	if(izmaFollower()) {
		outputText("Neatly laid near the base of your own is a worn bedroll belonging to Izma, your tigershark lover.  It's a snug fit for her toned body, though it has some noticeable cuts and tears in the fabric.  Close to her bed is her old trunk, almost as if she wants to have it at arms length if anyone tries to rob her in her sleep.  ", false);
		temp = rand(3);
		//Text 1} I
		if(temp == 0) outputText("Izma's lazily sitting on the trunk beside her bedroll, reading one of the many books from inside it.  She smiles happily when your eyes linger on her, and you know full well she's only half-interested in it.", false);
		//Text 2
		else if(temp == 1) outputText("You notice Izma isn't around right now.  She's probably gone off to the nearby stream to get some water.  Never mind, she comes around from behind a rock, still dripping wet.", false);
		//Text 3 
		else outputText("Izma is lying on her back near her bedroll.  You wonder at first just why she isn't using her bed, but as you look closer you notice all the water pooled beneath her and the few droplets running down her arm, evidence that she's just returned from the stream.", false);
		outputText("\n\n", false);
	}
	//►[Added Campsite Description]
	if(phyllaWaifu()) {
		outputText("You see Phylla's anthill in the distance.  Every now and then you see");
		//If PC has children w/ Phylla:
		if(flags[ANT_KIDS] > 0) outputText(" one of your many children exit the anthill to unload some dirt before continuing back down into the colony.  It makes you feel good knowing your offspring are so productive.");
		else outputText(" Phylla appear out of the anthill to unload some dirt.  She looks over to your campsite and gives you an excited wave before heading back into the colony.  It makes you feel good to know she's so close.");
		outputText("\n\n");
	}
	//Clear bee-status
	if(player.hasStatusAffect("paralyze venom") >= 0) {
		temp = player.hasStatusAffect("paralyze venom");
		stats(player.statusAffects[temp].value1, 0, player.statusAffects[temp].value2, 0,0,0,0,0);
		player.removeStatusAffect("paralyze venom");
		outputText("<b>You feel quicker and stronger as the paralyzation venom in your veins wears off.</b>\n\n", false);
	}
	//The uber horny
	if(player.lust >= 100) {
		if(player.hasStatusAffect("dysfunction") >= 0) {
			outputText("<b>You are debilitatingly aroused, but your sexual organs are so numbed the only way to get off would be to find something tight to fuck or get fucked...</b>\n\n", false);
		}
		else if(flags[60] > 0 && player.isTaur()) {
			outputText("<b>You are delibitatingly aroused, but your sex organs are so difficult to reach that masturbation isn't at the forefront of your mind.</b>\n\n", false);
		}
		else {
			outputText("<b>You are debilitatingly aroused, and can think of doing nothing other than masturbating.</b>\n\n", false);
			explore = 0;
			rest = 0;
			placesNum = 0;
		}
	}
	var baitText:String = "Masturbate";
	if(player.hasPerk("History: Religious") >= 0 && player.cor <= 66 && !(player.hasStatusAffect("Exgartuan") >= 0 && player.statusAffectv2("Exgartuan") == 0)) baitText = "Meditate";
	//Initialize companions/followers
	if(hours > 4 && hours < 23) {
		if(followersCount() > 0) followers = 74;
		if(slavesCount() > 0) slaves = 120;
		if(loversCount() > 0) lovers = 121;
	}
	var restEvent:Number = 40;
	var restName:String = "Wait";
	//Set up rest stuff
	//Night
	if(hours < 6 || hours > 20) {
		outputText("It is dark out, made worse by the lack of stars in the sky.  A blood-red moon hangs in the sky, seeming to watch you, but providing little light.  It's far too dark to leave camp.\n", false);
		restName = "Sleep";
		restEvent = 41;
		explore = 0;
		placesNum = 0;
	}
	//Day Time!
	else {
		outputText("It's light outside, a good time to explore and forage for supplies with which to fortify your camp.\n", false);
		if(player.fatigue > 40 || player.HP/maxHP() <= .9) {
			restName = "Rest";
			restEvent = 11;
		}
	}
	//Menu
	choices("Explore", explore, "Places", placesNum, "Inventory", 1000, "Stash", storage, "Followers", followers, "Lovers", lovers, "Slaves",slaves, "", 0, baitText, masturbate, restName, restEvent);
	//Lovers
	//Followers
	//Slaves

}


function stash(exists:Boolean = true):Boolean {
	
	//Use to know if to show/hide stash.
	if(exists) {
		if(flags[254] > 0 || flags[255] > 0 || itemStorage.length > 0 || flags[ANEMONE_KID] > 0)
			return true;
		else
			return false;
	}
	/*Hacked in cheat to enable shit
	flags[254] = 1;
	flags[255] = 1;*/
	//REMOVE THE ABOVE BEFORE RELASE ()
	var retrieveStuff:Number = 0;
	var storeStuff:Number = 0;
	if(hasItemsInStorage()) retrieveStuff = 1029;
	if(itemStorage.length > 0) storeStuff = 1028;
	var weaponRack:Number = 0;
	var weaponRetrieve:Number = 0;
	var armorRack:Number = 0;
	var armorRetrieve:Number = 0;
	var barrel:Number = 0;
	outputText("", true);
	if(flags[ANEMONE_KID] > 0) {
		//(morning)
		if(hours < 6) outputText("Kid A is sleeping in her barrel right now.");
		else if(hours <= 10) outputText("Kid A stands next to her barrel, refilling it from one of your waterskins.  A second full skin is slung over her shoulder.  She gives you a grin.\n\n");
		else if(flags[KID_SITTER] > 1) outputText("Kid A is absent from her barrel right now, dragooned into babysitting again.\n\n");
		//(midday)
		else if(hours < 16) outputText("Kid A is deep in her barrel with the lid on top, hiding from the midday sun.\n\n");
		//(night hours)
		else if(hours < 22) outputText("Kid A is peeking out of her barrel.  Whenever you make eye contact she breaks into a smile; otherwise she just stares off into the distance, relaxing.\n\n");
		else outputText("Kid A is here, seated demurely on the rim of her barrel and looking somewhat more purple under the red moon.  She glances slyly at you from time to time.\n\n");
		barrel = 3546;
		if(hours < 6) barrel = 0;
	}
	if(player.hasKeyItem("Camp - Chest") >= 0) outputText("You have a large wood and iron chest to help store excess items located near the portal entrance.\n\n", false);
	var weaponNames:Array = new Array();
	//Weapon rack
	if(flags[254] > 0) {
		outputText("There's a weapon rack set up here, set up to hold up to nine various weapons.", false);
		weaponRack = 1090;
		if(hasItemsInRacks(false)) {
			weaponRetrieve = 1091;
			temp = 0;
			outputText("  It currently holds ", false);
			while(temp < 9) {
				if(gearStorage[temp].quantity > 0) {
					weaponNames[weaponNames.length] = itemLongName(gearStorage[temp].shortName);
				}
				temp++;
			}
			if(weaponNames.length == 1) outputText(weaponNames[0], false);
			else if(weaponNames.length == 2) outputText(weaponNames[0] + " and " + weaponNames[1], false);
			else {
				temp = 0;
				while(temp < weaponNames.length) {
					outputText(weaponNames[temp], false);
					if(temp + 2 >= weaponNames.length && temp + 1 < weaponNames.length) outputText(", and ", false);
					else if(temp + 1 < weaponNames.length) outputText(", ", false);
					temp++;
				}
			}
		}
		outputText(".\n\n", false);
	}
	var armorNames:Array = new Array();
	//Armor Rack
	if(flags[255] > 0) {
		outputText("Your camp has an armor rack set up to hold your various sets of gear.  It appears to be able to hold nine different types of armor.", false);
		armorRack = 1106;
		if(hasItemsInRacks(true)) {
			armorRetrieve = 1107;
			temp = 9;
			outputText("  It currently holds ", false);
			while(temp < 18) {
				if(gearStorage[temp].quantity > 0) {
					armorNames[armorNames.length] = itemLongName(gearStorage[temp].shortName);
				}
				temp++;
			}
			if(armorNames.length == 1) outputText(armorNames[0], false);
			else if(armorNames.length == 2) outputText(armorNames[0] + " and " + armorNames[1], false);
			else {
				temp = 0;
				while(temp < armorNames.length) {
					outputText(armorNames[temp], false);
					if(temp + 2 >= armorNames.length && temp + 1 < armorNames.length) outputText(", and ", false);
					else if(temp + 1 < armorNames.length) outputText(", ", false);
					temp++;
				}
			}
		}
		outputText(".\n\n", false);
	}
	choices("Chest Store",storeStuff,"Chest Take",retrieveStuff,"W.Rack Put",weaponRack,"W.Rack Take",weaponRetrieve,"Anemone",barrel,"A.Rack Put",armorRack,"A.Rack Take",armorRetrieve,"",0,"",0,"Back",1);
	return true;
}
	
function hasCompanions():Boolean {
	if(companionsCount() > 0) return true;
	return false;
}
function companionsCount():Number {
	return followersCount() + slavesCount() + loversCount();
}
function followersCount():Number {
	var counter:Number = 0;
	if(followerEmber()) counter++;
	if(flags[VALARIA_AT_CAMP] == 1) counter++;
	if(player.hasStatusAffect("PureCampJojo") >= 0) counter++;
	if(player.hasStatusAffect("Camp Rathazul") >= 0) counter++;
	if(followerShouldra()) counter++;
	if(sophieFollower()) counter++;
	if(helspawnFollower()) counter++;
	return counter;
}
function hasFollowers():Boolean {
	if(followersCount() > 0) return true;
	return false;
}
function slavesCount():Number {
	var counter:Number = 0;
	if(latexGooFollower()) counter++;
	if(vapulaSlave()) counter++;
	if(campCorruptJojo()) counter++;
	if(amilyFollower() && amilyCorrupt()) counter++;
	//Bimbo sophie
	if(bimboSophie()) counter++;
	if(ceraphIsFollower()) counter++;
	if(milkSlave()) counter++;
	return counter;
}
function hasSlaves():Boolean {
	if(slavesCount() > 0) return true;
	return false;
}
function loversCount():Number {
	var counter:Number = 0;
	if(arianFollower()) counter++;
	if(followerHel()) counter++;
	//Izma!
	if(flags[238] == 1) counter++;
	if(isabellaFollower()) counter++;
	if(player.hasStatusAffect("Camp Marble") >= 0) counter++;
	if(amilyFollower() && !amilyCorrupt()) counter++;
	if(followerKiha()) counter++;
	if(flags[NIEVE_STAGE] == 5) counter++;
	if(flags[ANT_WAIFU] > 0) counter++;
	return counter;
}
function hasLovers():Boolean {
	if(loversCount() > 0) return true;
	return false;
}
function campLoversMenu():void {
	var isabellaButt:Number = 0;
	var marbleEvent:Number = 0;
	var izmaEvent:Number = 0;
	var kihaButt:Number = 0;
	var amilyEvent:Number = 0;
	var hel:Number = 0;
	var nieve:int = 0;
	clearOutput();
	if(flags[NIEVE_STAGE] == 5) {
		nieveCampDescs();
		outputText("\n\n");
		nieve = 3965;
	}
	if(followerHel()) {
		if(flags[HEL_FOLLOWER_LEVEL] == 2) {
			//Hel @ Camp: Follower Menu
			//(6-7) 
			if(hours <= 7) outputText("Hel is currently sitting at the edge of camp, surrounded by her scraps of armor, sword, and a few half-empty bottles of vodka.  By the way she's grunting and growling, it looks like she's getting ready to flip her shit and go running off into the plains in her berserker state.\n\n");
			//(8a-5p) 
			else if(hours <= 17) outputText("Hel's out of camp at the moment, adventuring on the plains.  You're sure she'd be on hand in moments if you needed her, though.\n\n");
			//5-7) 
			else if(hours <= 19) outputText("Hel's out visiting her family in Tel'Adre right now, though you're sure she's only moments away if you need her.\n\n");
			//(7+)
			else outputText("Hel is fussing around her hammock, checking her gear and sharpening her collection of blades.  Each time you glance her way, though, the salamander puts a little extra sway in her hips and her tail wags happily.\n\n");
		}
		else if(flags[HEL_FOLLOWER_LEVEL] == 1) {
			if(flags[HEL_HARPY_QUEEN_DEFEATED] == 1) {
				outputText("Hel has returned to camp, though for now she looks a bit bored.  Perhaps she is waiting on something.\n\n");
			}
			else {
				outputText("<b>You see the salamander Helia pacing around camp, anxiously awaiting your departure to the harpy roost. Seeing you looking her way, she perks up, obviously ready to get underway.</b>\n\n");
			}
		}
		hel = 3587;
	}
	//Kiha!
	if(followerKiha()) {
		//(6-7) 
		if(hours < 7) outputText("Kiha is sitting near the fire, her axe laying across her knees as she polishes it.[pg]");
		else if(hours < 19) outputText("Kiha's out right now, likely patrolling for demons to exterminate.  You're sure a loud call could get her attention.\n\n");
		else outputText("Kiha is utterly decimating a set of practice dummies she's set up out on the edge of camp.  All of them have crudely drawn horns. Most of them are on fire.\n\n");
		kihaButt = 3435;
	}
	//Isabella
	if(isabellaFollower()) {
		isabellaButt = 3243;
		if(hours >= 21 || hours <= 5) outputText("Isabella is sound asleep in her bunk and quietly snoring.", false);
		else if(hours == 6) outputText("Isabella is busy eating some kind of grain-based snack for breakfast.  The curly-haired cow-girl gives you a smile when she sees you look her way.", false);
		else if(hours == 7) outputText("Isabella, the red-headed cow-girl, is busy with a needle and thread, fixing up some of her clothes.", false);
		else if(hours == 8) outputText("Isabella is busy cleaning up the camp, but when she notices you looking her way, she stretches up and arches her back, pressing eight bullet-hard nipples into the sheer silk top she prefers to wear.", false);
		else if(hours == 9) outputText("Isabella is out near the fringes of your campsite.  She has her massive shield in one hand and appears to be keeping a sharp eye out for intruders or demons.  When she sees you looking her way, she gives you a wave.", false);
		else if(hours == 10) outputText("The cow-girl warrioress, Isabella, is sitting down on a chair and counting out gems from a strange pouch.  She must have defeated someone or something recently.", false);
		else if(hours == 11) outputText("Isabella is sipping from a bottle labelled 'Lactaid' in a shaded corner.  When she sees you looking she blushes, though dark spots appear on her top and in her skirt's middle.", false);
		else if(hours == 12) outputText("Isabella is cooking a slab of meat over the fire.  From the smell that's wafting this way, you think it's beef.  Idly, you wonder if she realizes just how much like her chosen food animal she has become.", false);
		else if(hours == 13) {
			outputText("Isabella ", false);
			var izzyCreeps:Array = new Array();
			var choice = 0;
			//Build array of choices for izzy to talk to
			if(player.hasStatusAffect("Camp Rathazul") >= 0)
				izzyCreeps[izzyCreeps.length] = 0;
			if(player.hasStatusAffect("PureCampJojo") >= 0)
				izzyCreeps[izzyCreeps.length] = 1;
			if(amilyFollower() && flags[43] == 1 && flags[78] == 0)
				izzyCreeps[izzyCreeps.length] = 2;
			if(amilyFollower() && flags[43] == 2 && flags[78] == 0)
				izzyCreeps[izzyCreeps.length] = 3;
			if(flags[238] == 1)
				izzyCreeps[izzyCreeps.length] = 4;
			//Base choice - book
			izzyCreeps[izzyCreeps.length] = 5;
			//Select!
			choice = rand(izzyCreeps.length);
				
			if(izzyCreeps[choice] == 0) outputText("is sitting down with Rathazul, chatting amiably about the weather.", false);
			else if(izzyCreeps[choice] == 1) outputText("is sitting down with Jojo, smiling knowingly as the mouse struggles to keep his eyes on her face.", false);
			else if(izzyCreeps[choice] == 2) outputText("is talking with Amily, sharing stories of the fights she's been in and the enemies she's faced down.  Amily seems interested but unimpressed.", false);
			else if(izzyCreeps[choice] == 3) outputText("is sitting down chatting with Amily, but the corrupt mousette is just staring at Isabella's boobs and masturbating.  The cow-girl is pretending not to notice.", false);
			else if(izzyCreeps[choice] == 4) outputText("is sitting down with Izma and recounting some stories, somewhat nervously.  Izma keeps flashing her teeth in a predatory smile.", false);
			else outputText("is sitting down and thumbing through a book.", false);
		}
		else if(hours == 14) outputText("Isabella is working a grindstone and sharpening her tools.  She even hones the bottom edge of her shield into a razor-sharp cutting edge.  The cow-girl is sweating heavily, but it only makes the diaphanous silk of her top cling more alluringly to her weighty chest.", false);
		else if(hours == 15) outputText("The warrior-woman, Isabella is busy constructing dummies of wood and straw, then destroying them with vicious blows from her shield.  Most of the time she finishes by decapitating them with the sharp, bottom edge of her weapon.  She flashes a smile your way when she sees you.", false);
		else if(hours == 16) outputText("Isabella is sitting down with a knife, the blade flashing in the sun as wood shavings fall to the ground.  Her hands move with mechanical, practiced rhythm as she carves a few hunks of shapeless old wood into tools or art.", false);
		else if(hours == 17) outputText("Isabella is sitting against one of the large rocks near the outskirts of your camp, staring across the wasteland while idly munching on what you assume to be a leg of lamb.  She seems lost in thought, though that doesn't stop her from throwing a wink and a goofy food-filled grin toward you.", false);
		else if(hours == 18) outputText("The dark-skinned cow-girl, Isabella, is sprawled out on a carpet and stretching.  She seems surprisingly flexible for someone with hooves and oddly-jointed lower legs.", false);
		else if(hours == 19) {
			//[(Izzy Milked Yet flag = -1)
			if(flags[ISABELLA_MILKED_YET] == -1) outputText("Isabella has just returned from a late visit to Whitney's farm, bearing a few filled bottles and a small pouch of gems.", false);
			else outputText("Isabella was hidden behind a rock when you started looking for her, but as soon as you spot her in the darkness, she jumps, a guilty look flashing across her features.  She turns around and adjusts her top before looking back your way, her dusky skin even darker from a blush.  The cow-girl gives you a smile and walks back to her part of camp.  A patch of white decorates the ground where she was standing - is that milk?  Whatever it is, it's gone almost as fast as you see it, devoured by the parched, wasteland earth.", false);
		}
		else if(hours == 20) outputText("Your favorite chocolate-colored cowgirl, Isabella, is moving about, gathering all of her scattered belongings and replacing them in her personal chest.  She yawns more than once, indicating her readiness to hit the hay, but her occasional glance your way lets you know she wouldn't mind some company before bed.", false);
		else outputText("Isabella looks incredibly bored right now.", false);
		outputText("\n\n", false);		
	}
	//Izma
	if(flags[238] == 1) {
		outputText("Neatly laid near the base of your own is a worn bedroll belonging to Izma, your tigershark lover. It's a snug fit for her toned body, though it has some noticeable cuts and tears in the fabric. Close to her bed is her old trunk, almost as if she wants to have it at arms length if anyone tries to rob her in her sleep.\n\n", false);
		izmaEvent = 2922;
	}
	//MARBLE
	if(player.hasStatusAffect("Camp Marble") >= 0) {
		temp = rand(5);
		outputText("A second bedroll rests next to yours; a large two handed hammer sometimes rests against it, depending on whether or not its owner needs it at the time.  ", false);
		//(Choose one of these at random to display each hour)
		if(temp == 0) outputText("Marble herself has gone off to Whitney's farm to get milked right now.", false);
		if(temp == 1) outputText("Marble herself has gone off to Whitney's farm to do some chores right now.", false);
		if(temp == 2) outputText("Marble herself isn't at the camp right now; she is probably off getting supplies, though she'll be back soon enough.", false);
		if(temp == 3) {
			outputText("Marble herself is resting on her bedroll right now.", false);
		}
		if(temp == 4) {
			outputText("Marble herself is wandering around the camp right now.", false);
		}
		if(temp < 3) outputText("  You're sure she'd be back in moments if you needed her.", false);
		marbleEvent = 2133;
		outputText("\n\n", false);
	}
	//AMILY
	if(amilyFollower() && flags[43] == 1 && flags[78] == 0) {
		outputText("Amily is currently strolling around your camp, ", false);
		temp = rand(6);
		if(temp == 0) {
			outputText("dripping water and stark naked from a bath in the stream", false);
			if(player.hasStatusAffect("Camp Rathazul") >= 0) outputText(".  Rathazul glances over and immediately gets a nosebleed", false);
		}
		else if(temp == 1) outputText("slouching in the shade of some particularly prominent rocks, whittling twigs to create darts for her blowpipe", false);
		else if(temp == 2) outputText("dipping freshly-made darts into a jar of something that looks poisonous", false);
		else if(temp == 3) outputText("eating some of your supplies", false);
		else if(temp == 4) outputText("and she flops down on her nest to have a rest", false);
		else outputText("peeling the last strips of flesh off of an imp's skull and putting it on a particularly flat, sun-lit rock to bleach as a trophy", false);
		outputText(".\n\n", false);
		amilyEvent = 2427;
	}
	//Amily out freaking Urta?
	else if(flags[AMILY_VISITING_URTA] == 1 || flags[AMILY_VISITING_URTA] == 2) {
		outputText("Amily's bed of grass and herbs lies empty, the mouse-woman still absent from her sojourn to meet your other lover.\n\n", false);
	}
	if(arianFollower()) outputText("Arian's tent is here, if you'd like to go inside.\n\n");
	//choices("Amily",amilyEvent,"Helia",hel,"Isabella",isabellaButt,"Izma",izmaEvent,"Kiha",kihaButt,"Marble",marbleEvent,"Nieve",nieve,"",0,"",0,"Back",1);	
	menu();
	if(amilyEvent > 0) addButton(0,"Amily",eventParser,amilyEvent);
	if(arianFollower()) addButton(1,"Arian",visitAriansHouse);
	if(hel > 0) addButton(2,"Helia",eventParser,hel);
	if(isabellaButt > 0) addButton(3,"Isabella",eventParser,isabellaButt);
	if(izmaEvent > 0) addButton(4,"Izma",eventParser,izmaEvent);
	if(kihaButt > 0) addButton(5,"Kiha",eventParser,kihaButt);
	if(marbleEvent > 0) addButton(6,"Marble",eventParser,marbleEvent);
	if(nieve > 0) addButton(7,"Nieve",eventParser,nieve);
	if(flags[ANT_WAIFU] > 0) addButton(8,"Phylla",introductionToPhyllaFollower);
	addButton(9,"Back",eventParser,1);
}
function campSlavesMenu():void {
	clearOutput();
	var vapula:Number = 0;
	var amilyEvent:Number = 0;
	var ceraph:Number = 0;
	var sophieEvent:Number = 0;
	var jojoEvent:Number = 0;
	var goo:int = 0;
	if(vapulaSlave()) {
		vapulaSlaveFlavorText();
		outputText("\n\n");
		vapula = 3749;
	}
	//Bimbo Sophie
	if(bimboSophie()) {
		sophieCampLines();
		sophieEvent = 3028;
	}
	if(latexGooFollower()) {
		outputText(flags[GOO_NAME] + " lurks in a secluded section of rocks, only venturing out when called for or when she needs to gather water from the stream.\n\n");
		goo = 3970;
	}
	if(ceraphIsFollower()) ceraph = 3041;
	//JOJO
	//If Jojo is corrupted, add him to the masturbate menu.
	if(campCorruptJojo()) {
		outputText("From time to time you can hear movement from around your camp, and you routinely find thick puddles of mouse semen.  You are sure Jojo is here if you ever need to sate yourself.\n\n", false);
		jojoEvent = 43;
	}
	//Modified Camp/Follower List Description:
	if(amilyFollower() && flags[43] == 2 && flags[78] == 0) {
		outputText("Sometimes you hear a faint moan from not too far away. No doubt the result of your slutty toy mouse playing with herself.\n\n", false);
		amilyEvent = 2427;
	}
	if(milkSlave()) {
		outputText("Your well-endowed, dark-skinned milk-girl is here.  She flicks hopeful eyes towards you whenever she thinks she has your attention.\n\n");
	}
	
	//choices("Amily",amilyEvent,"Ceraph",ceraph,"Jojo",jojoEvent,"Sophie",sophieEvent,"Vapula",vapula,"",0,"",0,"",0,flags[GOO_NAME],goo,"Back",1);	
	menu();
	if(amilyEvent > 0) addButton(0,"Amily",eventParser,amilyEvent);
	if(ceraph > 0) addButton(1,"Ceraph",eventParser,ceraph);
	if(jojoEvent > 0) addButton(2,"Jojo",eventParser,jojoEvent);
	if(sophieEvent > 0) addButton(3,"Sophie",eventParser,sophieEvent);
	if(vapula > 0) addButton(4,"Vapula",eventParser,vapula);
	if(milkSlave()) addButton(7,flags[MILK_NAME],milkyMenu);
	if(goo > 0) addButton(8,flags[GOO_NAME],eventParser,goo);
	addButton(9,"Back",eventParser,1);
}

function campFollowers():void {
	var rathazulEvent:Number = 0;
	var jojoEvent:Number = 0;
	var valeria:Number = 0;
	var shouldra:Number = 0;
	var ember:Number = 0;
	clearOutput();
	gameState = 0;
	//ADD MENU FLAGS/INDIVIDUAL FOLLOWER TEXTS
	menu();
	if(followerEmber()) {
		emberCampDesc();
		ember = 3691;
	}
	if(followerShouldra()) {
		shouldra = 3665;
	}
	//Pure Jojo
	if(player.hasStatusAffect("PureCampJojo") >= 0) {
		outputText("There is a small bedroll for Jojo near your own, though the mouse is probably hanging around the camp's perimeter.\n\n", false);
		jojoEvent = 2150;
	}
	//RATHAZUL
	//if rathazul has joined the camp
	if(player.hasStatusAffect("Camp Rathazul") >= 0) {
		rathazulEvent = 2070;
		if(flags[274] <= 1) {
			outputText("Tucked into a shaded corner of the rocks is a bevy of alchemical devices and equipment.  The alchemist Rathazul looks to be hard at work with his chemicals, working on who knows what.", false);
			if(flags[274] == 1) outputText("  Some kind of spider-silk-based equipment is hanging from a nearby rack.  He's finished with the task you gave him!", false);
			outputText("\n\n", false);
		}
		else outputText("Tucked into a shaded corner of the rocks is a bevy of alchemical devices and equipment.  The alchemist Rathazul looks to be hard at work on the silken equipment you've commissioned him to craft.\n\n", false);
	}
	if(sophieFollower()) {
		if(rand(5) == 0) outputText("Sophie is sitting by herself, applying yet another layer of glittering lip gloss to her full lips.\n\n");
		else if(rand(4) == 0) outputText("Sophie is sitting in her nest, idly brushing out her feathers.  Occasionally, she looks up from her work to give you a sultry wink and a come-hither gaze.\n\n");
		else if(rand(3) == 0) outputText("Sophie is fussing around in her nest, straightening bits of straw and grass, trying to make it more comfortable.  After a few minutes, she flops down in the middle and reclines, apparently satisfied for the moment.\n\n");
		else if(rand(2) == 0 || flags[SOPHIE_ADULT_KID_COUNT] == 0) {
			if(flags[282] > 0) outputText("Your platinum-blonde harpy, Sophie, is currently reading a book - a marked change from her bimbo-era behavior.  Occasionally, though, she glances up from the page and gives you a lusty look.  Some things never change....\n\n");
			else outputText("Your pink harpy, Sophie, is currently reading a book.  She seems utterly absorbed in it, though you question how she obtained it.  Occasionally, though, she'll glance up from the pages to shoot you a lusty look.\n\n");
		}
		else {
			outputText("Sophie is sitting in her nest, ");
			if(flags[SOPHIE_ADULT_KID_COUNT] < 5) {
				outputText("across from your daughter");
				if(flags[SOPHIE_ADULT_KID_COUNT] > 1) outputText("s");
			}
			else outputText("surrounded by your daughters");
			outputText(", apparently trying to teach ");
			if(flags[SOPHIE_ADULT_KID_COUNT] == 1) outputText("her");
			else outputText("them");
			outputText(" about hunting and gathering techniques.  Considering their unusual upbringing, it can't be as easy for them...\n\n");
		}
		addButton(5,"Sophie",followerSophieMainScreen);
	}
	if(flags[VALARIA_AT_CAMP] == 1) valeria = 3588;
//choices("Ember",ember,"Jojo",jojoEvent,"Rathazul",rathazulEvent,"Shouldra",shouldra,"Valeria",valeria,"",0,"",0,"",0,"",0,"Back",1);	
	if(ember > 0) addButton(0,"Ember",eventParser,ember);
	if(helspawnFollower()) addButton(1,flags[HELSPAWN_NAME],helspawnsMainMenu);
	if(jojoEvent > 0) addButton(2,"Jojo",eventParser,jojoEvent);
	if(rathazulEvent > 0) addButton(3,"Rathazul",eventParser,rathazulEvent);
	if(shouldra > 0) addButton(4,"Shouldra",eventParser,shouldra);
	//ABOVE: addButton(4,"Sophie",followerSophieMainScreen);
	if(valeria > 0) addButton(6,"Valeria",eventParser,valeria);
	addButton(9,"Back",eventParser,1);
}


function rest():void {
	campQ = true;
	if(timeQ == 0) {
		outputText("You lie down to rest for four hours.\n", true);
		timeQ = 4;
		//Marble withdrawl
		if(player.hasStatusAffect("MarbleWithdrawl") >= 0) {
			outputText("\nYour rest is very troubled, and you aren't able to settle down.  You get up feeling tired and unsatisfied, always thinking of Marble's milk.\n", false);
			HPChange(timeQ * 510, true);
			stats(0,-.1,0,-.1,0,0,0,0);
			//fatigue
			fatigue(-2*timeQ);
			if(player.hasPerk("Speedy Recovery") >= 0) fatigue(-1*timeQ);
		}
		//REGULAR HP/FATIGUE RECOVERY
		else {
			HPChange(timeQ * 10, true);
			//fatigue
			fatigue(-4*timeQ); 
			if(player.hasPerk("Speedy Recovery") >= 0) fatigue(-2*timeQ);
		}
	}
	else {
		if(timeQ != 1) outputText("You continue to rest for " + num2Text(timeQ) + " more hours.\n", true);
		else outputText("You continue to rest for another hour.\n", true);
	}
	goNext(timeQ,true);
}
function doWait():void {
	campQ = true;
	outputText("", true);
	if(timeQ == 0) {
		outputText("You wait four hours...\n", false);
		timeQ = 4;
		//Marble withdrawl
		if(player.hasStatusAffect("MarbleWithdrawl") >= 0) {
			outputText("\nYour time spent waiting is very troubled, and you aren't able to settle down.  You get up feeling tired and unsatisfied, always thinking of Marble's milk.\n", false);
			//fatigue
			fatigue(-1*timeQ); 
			if(player.hasPerk("Speedy Recovery") >= 0) fatigue(-0.5*timeQ);
		}
		//REGULAR HP/FATIGUE RECOVERY
		else {
			//fatigue
			fatigue(-2*timeQ); 	
			if(player.hasPerk("Speedy Recovery") >= 0) fatigue(-1*timeQ);
		}
	}
	else {
		if(timeQ != 1) outputText("You continue to wait for " + num2Text(timeQ) + " more hours.\n", false);
		else outputText("You continue to wait for another hour.\n", false);
	}
	goNext(timeQ,true);
}

function doSleep(clrScreen:Boolean = true):void {
	if(flags[URTA_INCUBATION] >= 384 && hours >= 20 && hours < 2) {
		preggoUrtaGivingBirth();
		return;
	}
	campQ = true;
	if(timeQ == 0) {
		if(hours == 21) timeQ = 9;
		if(hours == 22) timeQ = 8;
		if(hours >= 23) timeQ = 7;
		if(hours == 0) timeQ = 6;
		if(hours == 1) timeQ = 5;
		if(hours == 2) timeQ = 4;
		if(hours == 3) timeQ = 3;
		if(hours == 4) timeQ = 2;
		if(hours == 5) timeQ = 1;
		//Autosave stuff
		if(player.slotName != "VOID" && player.autoSave && b1Text.text != "Game Over") {
			saveGame(player.slotName);
		}
		//Clear screen
		if(clrScreen) outputText("", true);
		/******************************************************************/
		/*       ONE TIME SPECIAL EVENTS                                  */
		/******************************************************************/
		//HEL SLEEPIES!
		if(helAffection() >= 70 && flags[HEL_REDUCED_ENCOUNTER_RATE] == 0 && flags[HEL_FOLLOWER_LEVEL] == 0) {
			heliaDiscovery();
			sleepRecovery(false);
			return;
		}
		//Shouldra xgartuan fight
		if(player.hasCock() && followerShouldra() && player.statusAffectv1("Exgartuan") == 1) {
			if(flags[SHOULDRA_EXGARTUDRAMA] == 0) {
				shouldraAndExgartumonFightGottaCatchEmAll();
				sleepRecovery(false);
				return;
			}
			else if(flags[SHOULDRA_EXGARTUDRAMA] == 3) {
				exgartuMonAndShouldraShowdown();
				sleepRecovery(false);
				return;
			}
		}
		if(player.hasCock() && followerShouldra() && flags[SHOULDRA_EXGARTUDRAMA] == -0.5) {
			keepShouldraPartIIExgartumonsUndeatH();
			sleepRecovery(false);
			return;
		}
		/******************************************************************/
		/*       SLEEP WITH SYSTEM GOOOO                                  */
		/******************************************************************/
		//Marble Sleepies
		if(player.hasStatusAffect("Camp Marble") >= 0 && flags[SLEEP_WITH] == "Marble") {
			if(marbleNightSleepFlavor()) {
				sleepRecovery(false);
				return;
			}
		}
		else if(flags[SLEEP_WITH] == "Arian" && arianFollower()) {
			sleepWithArian();
			return;
		}
		else if(flags[SLEEP_WITH] == "Sophie" && (bimboSophie() || sophieFollower())) {
			//Night Time Snuggle Alerts!*
			//(1) 
			if(rand(4) == 0) {
				outputText("You curl up next to Sophie, planning to sleep for " + num2Text(timeQ) + " hour");
				if(timeQ > 1 ) outputText("s");
				outputText(".  She wraps her feathery arms around you and nestles her chin into your shoulder.  Her heavy breasts cushion flat against your back as she gives you a rather chaste peck on the cheek and drifts off towards dreamland...");
			}
			//(2) 
			else if(rand(3) == 0) {
				outputText("While you're getting ready for bed, you see that Sophie has already beaten you there.  She's sprawled out on her back with her arms outstretched, making little beckoning motions towards the valley of her cleavage.  You snuggle in against her, her pillowy breasts supporting your head and her familiar heartbeat drumming you to sleep for " + num2Text(timeQ) + " hour");
				if(timeQ > 1) outputText("s");
				outputText(".");
			}
			//(3)
			else if(rand(2) == 0) {
				outputText("As you lay down to sleep for " + num2Text(timeQ) + " hour");
				if(timeQ > 1) outputText("s");
				outputText(", you find the harpy-girl, Sophie, snuggling herself under her blankets with you.  She slips in between your arms and guides your hands to her enormous breasts, her backside already snug against your loins.  She whispers, \"<i>Something to think about for next morning...  Sweet dreams,</i>\" as she settles in for the night.");
			}
			//(4)
			else {
				outputText("Sophie climbs under the sheets with you when you go to sleep, planning on resting for " + num2Text(timeQ) + " hour");
				if(timeQ > 1) outputText("s");
				outputText(".  She sleeps next to you, just barely touching you.  You rub her shoulder affectionately before the two of you nod off.");
			}
			outputText("\n");
		}
		else {
			if(flags[SLEEP_WITH] == "Helia" && followerHel()) {
				outputText("You curl up next to Helia, planning to sleep for " + num2Text(timeQ) + " ");
			}
			//Normal sleep message
			else outputText("You curl up, planning to sleep for " + num2Text(timeQ) + " ", false);
			if(timeQ == 1) outputText("hour.\n", false);
			else outputText("hours.\n", false);
		}
		sleepRecovery(true);
	}
	else {
		if(timeQ != 1) outputText("You lie down to resume sleeping for the remaining " + num2Text(timeQ) + " hours.\n", true);
		else outputText("You lie down to resume sleeping for the remaining hour.\n", true);
	}
	goNext(timeQ, true);
	return;
	
	if(player.fatigue > 50) restTime = Math.ceil(player.fatigue/12);
	if(restTime == 0) restTime = 4;
	outputText("", true);
	outputText("You go to sleep...", false);
	
	
	//else outputText("\nYou wake " + num2Text(restTime) + " hours later, feeling refreshed.", false);
	//Autosave stuff
	if(player.slotName != "VOID" && player.autoSave && b1Text.text != "Game Over") saveGame(player.slotName);
}
//For shit that breaks normal sleep processing.
function sleepWrapper():void {
	if(hours == 16) timeQ = 14;
	if(hours == 17) timeQ = 13;
	if(hours == 18) timeQ = 12;
	if(hours == 19) timeQ = 11;
	if(hours == 20) timeQ = 10;
	if(hours == 21) timeQ = 9;
	if(hours == 22) timeQ = 8;
	if(hours >= 23) timeQ = 7;
	if(hours == 0) timeQ = 6;
	if(hours == 1) timeQ = 5;
	if(hours == 2) timeQ = 4;
	if(hours == 3) timeQ = 3;
	if(hours == 4) timeQ = 2;
	if(hours == 5) timeQ = 1;
	clearOutput();
	if(timeQ != 1) outputText("You lie down to resume sleeping for the remaining " + num2Text(timeQ) + " hours.\n", true);
	else outputText("You lie down to resume sleeping for the remaining hour.\n", true);
	sleepRecovery(true);
	goNext(timeQ, true);
}

function sleepRecovery(display:Boolean = false):void {
	//Marble withdrawl
	if(player.hasStatusAffect("MarbleWithdrawl") >= 0) {
		if(display) outputText("\nYour sleep is very troubled, and you aren't able to settle down.  You get up feeling tired and unsatisfied, always thinking of Marble's milk.\n", false);
		HPChange(timeQ * 10, true);
		stats(0,-.1,0,-.1,0,0,0,0);
		//fatigue
		fatigue(-int(player.fatigue/2));
		if(player.hasPerk("Speedy Recovery") >= 0) fatigue(-int(player.fatigue/4));
	}
	//Mino withdrawal
	else if(flags[20] == 3) {
		if(display) outputText("\nYou spend much of the night tossing and turning, aching for a taste of minotaur cum.\n", false);
		HPChange(timeQ * 15, true);
		fatigue(-int(player.fatigue/2)); 
		if(player.hasPerk("Speedy Recovery") >= 0) fatigue(-int(player.fatigue/4)); 
	}
	//REGULAR HP/FATIGUE RECOVERY
	else {
		HPChange(timeQ * 20, display);
		//fatigue
		fatigue(-player.fatigue); 
	}
}


function nightSuccubiRepeat():void {
	spriteSelect(8);
	if(player.gender == 0) {
		if(flags[62] == 0) {
			outputText("\nAs you sleep, your rest becomes increasingly disturbed. You feel a great weight on top of you and you find it difficult to breathe. Stirred to consciousness, your eyes are greeted by an enormous pair of blue-tinged breasts. The nipples are quite long and thick and are surrounded by large, round areola. A deep, feminine voice breaks the silence, \"<i>I was wondering if you would wake up.</i>\" You turn your head to the voice to see the visage of a sharp featured, attractive woman. The woman grins mischievously and speaks again, \"<i>I was hoping that idiot, Giacomo, did not dilute the 'potion' again.</i>\" Your campfire reflects off the woman's face and her beauty contains some sharply contrasting features. The pupils of her eyes are slit like a cat's. As she grins, she bares her teeth, which contain two pairs of long and short fangs. This woman is clearly NOT human! In shock, you attempt to get up, only prompting the woman to prove her inhuman nature by grabbing your shoulders and pinning you to the ground. You see that each finger on her hand also contains a fourth joint, further proving her status. Before you can speak a word, the woman begins mocking your fear and places her face in front of yours. Her face is almost certainly demonic in nature.\n\n", false);
			outputText("She quickly moves down to your crotch…only to discover no organs down there.\n\n", false);
			outputText("*record scratch*\n\n", false);
	
			outputText("\"<i>Wait a fucking minute.</i>\", the Succubus says, \"<i>Where's your dick?!</i>\"\n\n", false);
	
			outputText("As you state your genderless nature, the succubus hops off and from nowhere pulls out a large folder marked \"<i>Corruption of Champions-Script</i>\" and begins thumbing through the pages. After finding the page she is looking for, she reads it and looks off into the distance in disgust.\n\n", false);
	
			outputText("\"<i>Hey Fenoxo and Dxasmodeus!!!!!!</i>\", the Succubus crows, \"<i>The goddamn script says that I should be milking someone's DICK!!! Man, futa, herm, I don't give a shit. YOUR OWN FUCKING SCRIPT SAYS I SHOULD BE MOUNTING AND MILKING A COCK!!!! THIS IS A SEX GAME!!!!!! THAT MEANS FUCKING! WHAT THE HELL AM I SUPPOSED TO FUCK???!!!</i>\"\n\n", false);
	
			outputText("The Succubus looks at you with utter contempt, \"<i>THIS motherfucker doesn't have a DAMN thing! What am I supposed to do?! I can't exactly order a fucking Happy Meal!!!!!</i>\"\n\n", false); 
	
			outputText("Throwing the script down in an utter rage, the tantrum continues, \"<i>Goddammit! I can't believe this shit! HEY!!!!! INTERN!!!! Bring me my robe, aspirins and cancer sticks!!!!</i>\"\n\n", false);
	
			outputText("The Succubus walks a few paces away where a plain-dressed woman with a clipboard hands the Succubus a pack of cigarettes and a small bottle of aspirin. She takes a fistful of the painkillers and immediately lights up a smoke. The Succubus takes a couple of drags off the cig and rubs her temples.\n\n", false);
	
			outputText("\"<i>You two are killing me!</i>\", she groans in clear frustration, \"<i>I come to work for you perverts based off the promise of MORE perverts to feed from and you do THIS to me! I can't work like this!</i>\"\n\n", false);
	
			outputText("The plain woman hands the Succubus a robe, which she crudely puts on as she storms off into the night.\n\n", false);
	
			outputText("\"<i>I will discuss this horseshit with my agent.</i>\", the Succubus continues bitching, \"<i>THIS was NOT in my contract.</i>\"\n\n", false);
	
			outputText("The Succubus stops, turns and points to you in derision. \"<i>And YOU! You no-cock, no-cunt having pissant! Take your ass back to the lab before they find out you escaped!!!!!</i>\"\n\n", false);
	
			outputText("The Succubus resumes her stormy exit. You look at the bottle of Cerulean Potion and wonder if it REALLY had some psychotropics in it. What the hell just happened?!", false);
			flags[62] = 1;
		}
		//REPEAT
		else {
			outputText("\nAs you begin to relax, you hear footsteps behind you, expecting the unholy interloper and pray for a better…and more understanding... encounter.\n\n", false);

			outputText("You turn around, hoping for an exciting encounter only to find a rather short, plain-faced woman with horned-rim glasses and a purple dress on. She appears to be holding a stack of papers in her hand.\n\n", false);

			outputText("\"<i>Ahem.</i>\", the woman says meekly, \"<i>I hate to bother you, but I was sent by the CoC writers and staff to hand you this.</i>\"\n\n", false);

			outputText("Scratching your head, you inquire what the document is. The woman smiles shyly and hands it to you.\n\n", false);

			outputText("\"<i>This is the script and production notes for Corruption of Champions,</i>\" she says with a small bit of pride, \"<i>Apparently, you need to read the highlighted sections. They are important.</i>\"\n\n", false);

			outputText("You take the script, scratching your head at the surreal nature of the moment. You thumb through the pages, finding virtually every aspect of your life and encounters written as if foreseen by great mystics. The accuracy is nothing short of horrifying. You find a highlighted section that appears to be what the woman is referring to. The note is terse and outright blunt.\n\n", false);
			
			outputText("\"<i>GENDER NEUTRAL CHARACTERS ARE BUTT-MONKEYS. IF THE ENCOUNTER INVOLVES SEX, EXPECT SOMETHING FUCKED UP TO HAPPEN INSTEAD. ACTORS WHO PLAY NEUTER CHARACTERS SHOULD EXPECT TO PLAY ONLY FOR LULZ</i>.\"\n\n", false);

			outputText("The shock is overwhelming. The script basically says that you will never catch a break. As this reality drapes about you, the script disappears and you hear a cacophony of mocking laughter in all directions. The woman is nowhere to be found.\n\n", false);

			outputText("As the cacophony fades, you only hear one facetiously toned word,\n\n", false);

			outputText("\"<i><b>Problem?</b></i>\"", false);
		}
		doNext(1);
		return;
	}
	stats(0,0,0,0,0,0,-100,2);
	if(player.gender == 1) {
		if(player.cor < 66) {
			outputText("\nAgainst your better judgment, you've again partaken of the cerulean elixir and fallen asleep. You are quickly awakened by a thick nipple being thrust into your mouth and torrents of breast milk gushing down your throat as the succubus returns to have her way with you. Looking up, your eyes meet hers as a hungry manipulative grin stretches across her blue face. Unable to control your lust, your prick jumps to attention, which prompts the demoness to ", false);
			if(player.isTaur()) outputText(" crouch between your legs and impale herself on your " + cockDescript(0) + " with a wet sound caused by her well-lubricated vulva. Y", false);
			else outputText(" open her womb and quickly consume your " + cockDescript(0) + ". She embraces you, entrapping your head in her cleavage as y", false);
			outputText("ou quickly feel her superhuman vaginal muscles work and stroke your " + cockDescript(0) + " better than any human woman or pair of hands could ever hope to accomplish. You are helpless as your unholy embrace milks the both of you in an infernal symphony of debauchery. The familiar cramp of an impending ejaculation grips you and your twitching signals the succubus of your approaching climax.\n\n", false);
			if(player.isTaur()) outputText("Pushing on your forelegs, she engulfs even more of your " + cockDescript(0), false);
			else outputText("Almost crushing your pelvis, she wraps her legs around your body", false);
			outputText(" and her muscles churn mercilessly demanding that you release your 'milk' as freely as she has released hers into you. Stimulated beyond any human ability to maintain control, you bear down and release a milky flood of your own inside the succubus. Moaning in ecstasy, she ", false);
			if(player.isTaur()) outputText("arches under your belly as you feel your " + cockDescript(0) + " bending pleasurably inside her, and", false);
			else outputText("releases you from her grip, allowing you to finally breathe deeply, and leans back, arching high to reveal your joined genitals in the moonlight. You visibly see", false);
			outputText(" her contractions milking your " + cockDescript(0) + " as fiercely as a maid milks a cow! Another torrent of cum pushes its way out of your body and you let out a moan of pleasure and exhaustion.\n\n", false);
			outputText("As you are passing out, you feel a deep kiss upon your lips from the succubus. \"You taste better each time we join. Call upon me soon, lest I take what I want from you anyway,\", says the lustful creature.\n\n", false);
			outputText("Fatigue takes you and you collapse into a deep sleep.  ", false);
		}
		else {
			outputText("\nKnowing the succubus will come, you do not even bother trying to sleep. Instead, you prepare a little surprise for her. You briefly jerk off and start edging yourself, preparing a massive batch to unload inside her. Hopefully, she will be the one to get more than she bargained for.\n\n", true);
			outputText("The succubus comes, as you predicted. Despite her obvious strength and size difference to you, you grab her and push her down to the ground and immediately push your angry cock into her hairy hole. The succubus, surprised and enthralled, laughs at your aggression.\n\n", false);
			outputText("\"<i>I thought I was the hungry one.</i>\", she chuckles. \"I am all yours, little man. FEED ME!\"\n\n", false);
			outputText("You begin bucking your ", false);
			if(player.isTaur()) outputText("flanks", false);
			else outputText("hips", false);
			outputText(" in the all-too-familiar rhythm, hammering away at the succubus' cunt. Impressed with your initiative, she chooses to remain submissive as you work up an impressive load of spunk. Trying with all of your might, you continue to hold off your orgasm, painfully, as you continue stimulating your inhuman lover.\n\n", false);
			outputText("However, she senses your control and immediately brings her own muscles into the little love game. With one good squeeze, she breaks down any control and resistance you have. Sensing you are about to explode, she ", false);
			if(player.isTaur()) outputText("pushes on your forelegs, impaling herself even deeper on your " + cockDescript(0), false);
			else outputText("wraps her legs around your hips and bears down", false);
			outputText(". You feel the head of your prick push past the dilated opening in her cervix, which immediately contracts around your head. Your penis is literally trapped and caught in her womb!\n\n", false);
			outputText("Groaning loudly, long muscle spasms release the painfully stored semen into the deepest parts of the succubus. The sensation of your hot cum so deep inside her body triggers her peak. ", false);
			
			if(player.isTaur()) outputText("She moans inhumanly, and reflexively digs her claws into your forelegs. Searing with lust, the pain means little to you as you only feel the sensation of your body forcing your fluids out of your body and into hers. You press your " + cockDescript(0) + " into her", false);
			else outputText("She embraces you, moaning inhumanly, and reflexively digs her claws into your back. Searing with lust, the pain means little to you as you only feel the sensation of your body forcing your fluids out of your body and into hers. You slam your pelvis into hers", false);
			outputText(", as if to force yourself to cum harder than you already are capable of, prompting an equally pleasurable reaction from her.\n\n", false);
			outputText("For the first time since you have had your 'visits', the succubus appears winded. Without another word, her muscles release your manhood, which she quickly licks clean of your intermingled juices.  She tongues your face in lustful approval and flies away. You quickly fall asleep, utterly spent.  ", false);
			stats(0,0,0,0,-1,0,0,0);
		}
	}
	else if(player.gender == 3) {
		//Bad End-Cerulean Succubus Futa/herm
		//[Conditions: Corruption >50. Drink 10 Cerulean potions over the course of 20 Days. (Other stipulations as required that prevent interference with other events-to be determined)]
		if(flags[61] > 10 && player.cor > 50) {
			outputText("\nAs the Succubus mounts you, an uncontrollable urge takes over your mind and body. Without any thought, you quickly thrust one of her nipples in your mouth and begin suckling wildly like a newborn child. The Succubus cries in shock and pleasure as you begin feeding from her and quickly begins her ritualistic milking of your dong. The warm milk passes into your mouth and down your throat, where it settles peacefully in your stomach. The sensation of fulfillment from her tits is only eclipsed by the massive load of semen you feel cramping your prostate.", false);
			//[ (Herm-Dickgirl variant only)
			if(player.balls > 0) outputText("  Even your nuts are unbearably sore.", false);
			outputText("  As the milk begins to dry out of the Succubus' tit, you release it from your control and launch an impossible load of cum into the succubus. The demoness releases her hold of your cock and hops off your crotch and jumps to place her mouth over your erupting penis. Reflexively grabbing her head, you push your cock as deep as you can in her mouth and for minutes, pump stream after stream of hot lust into her gullet. After the last load leaves your dong, you pass out.\n\n", false);

			outputText("After a short time, you wake up sore from head to toe. The Succubus is sitting next to you with an utterly satisfied look on her face.\n\n", false);

			outputText("\"<i>Well, this was unexpected.</i>\", she says, \"<i>I did not expect you to change. Normally, men are susceptible to my milk, but apparently it works on herms, too.</i>\"\n\n", false); 

			outputText("As you stand, you feel awkward as your body does not feel right. You look at the Succubus and she no longer appears as large as she once was. Quick to realize a problem, you look at your reflection in a small bucket at your campsite. Other than your own unique facial features, you see ANOTHER Cerulean Succubus looking back at you! You ARE a Cerulean Succubus!", false);
			//[(if the player has a large number of transformations) 
			if(player.horseScore() + player.dogScore() + player.nagaScore() + player.goblinScore() + player.sharkScore() + player.minoScore() + player.cowScore() > 5) outputText("  All of the other corruptions and changes to your body have faded away as your new form has taken shape.", false);
			outputText("  As the reality soaks in, you feel a sharp pain in your stomach and your cock. You NEED to feed. Cum, milk, it doesn't matter. Likewise, your dick is hard and you need to cum. Despite your need, you cannot bring yourself to masturbate. You want ANOTHER'S attention.\n\n", false);

			outputText("Without further acknowledgement, you take up your on your demonic wings to find your first \"meal\". The Succubus left behind simply giggles as she sees another of her kind take up the night in search for more meals and pleasure.", false);
			eventParser(5035);
			return;
		}
		else {
			flags[111]++;
			flags[61]++;
			outputText("\nAs you begin to relax from a long day of adventuring, the succubus returns and lands squarely in your lap, just missing your throbbing erection. The succubus growls in arousal as she thrusts one of her fat nipples into your mouth. Reflexively, you begin suckling the teat with neither shame nor restraint. Milk floods into your mouth as you sense the weight of the succubus descend upon your cock. The familiar warmth and snugness of her cunt greet your hungry prick as her muscles begin the savory churning to coax your body into producing the 'milk' she needs to sate her own hunger. Your eyes roll back into your head as the torrent of milk pouring down your throat increases the sensitivity in all of your organs, compelling your hips to reflexively buck to press your dick deeper.\n\n", false);
			
			outputText("The Succubus restrains you without missing a stroke or disrupting your breastfeeding as the pangs of orgasmic pleasure swell up at the base of your cock. You wrap your arms forcefully around the succubus as you bear down upon your crotch, releasing the painfully stockpiled load of lust into the demoness' cunt for her own sustenance. The succubus lets out an inhuman howl of pleasure as her own orgasm begins to crush your cock, draining every last drop out of you.\n\n", false);

			outputText("Your consciousness begins to fade as the orgasm subsides. The succubus pops her tit out of your mouth and squeezes more of her essence into the empty bottle. She licks your lips and flies away just in time for you to pass out.  ", false);
			//Clear out any queue'ed events if bad-end
			//coming.  PC has to dig his own grave.
			if(flags[61] > 10) {
				player.removeStatusAffect("succubiNight");
			}
			fatigue(20);
			player.cumMultiplier++;
			//[Maintain first encounter mechanics. New variable to keep track of subsequent encounters within a specific time period]
		}
	}
	shortName = "Cerul P";
	menuLoc = 14;
	takeItem();
	outputText("\n", false);
	stats(rand(2), rand(2), rand(2), rand(2), 0, 0, -100, 1);
}
//Places menu
function places(display):Boolean {
	var farmBarn:Number = 0;
	var farmHouse:Number = 0;
	var farm:Number = 0;
	var boat:Number = 0;
	var barber:Number = 0;
	var telAdre:Number = 0;
	var ruins:Number = 0;
	var bazaar:Number = 0;
	var owca:Number = 0;
	var dungeons:Number = 0;
	if(flags[113] > 0 || player.hasStatusAffect("Found Factory") >= 0 || flags[DISCOVERED_WITCH_DUNGEON] > 0) dungeons = 3994;
	if(flags[OWCA_UNLOCKED] == 1) owca = 3631;
	
	//turn on ruins
	if(flags[44] > 0) ruins = 2371;
	//turn on teladre
	if(player.statusAffectv1("Tel'Adre") >= 1) telAdre = 2211;
	if(player.hasStatusAffect("hairdresser meeting") >= 0) barber = 2169;
	//turn on boat
	if(player.hasStatusAffect("Boat Discovery") >= 0) boat = 2079;
	
	//Turn on main farm encounter!
	if(player.hasStatusAffect("Met Whitney") >= 0) {
		if(player.statusAffects[player.hasStatusAffect("Met Whitney")].value1 > 1 && flags[FARM_DISABLED] == 0) farm = 2068;
	}
	//Turn on bazaar encounter
	if(flags[211] > 0) bazaar = 2855;
	//Return if there is anything enabled in places
	if(!display) {
		if(owca + flags[113] + telAdre + barber + farmBarn + farmHouse + farm + dungeons + boat + ruins + flags[211] > 0) return true;
		else return false;
	}
	//Make choices
	choices("Bazaar",bazaar,"Boat", boat,"Dungeons",dungeons,"",0,"Farm",farm,"Owca",owca,"Salon", barber,"Tel'Adre", telAdre, "TownRuins",ruins,"Back",1);
	return true;
}

function dungeons():void {
	menu();
	//Turn on d2
	if(flags[113] > 0) addButton(0,"Deep Cave",eventParser,11076);
	//Turn on dungeon
	if(player.hasStatusAffect("Found Factory") >= 0) addButton(1,"Factory",eventParser,11057);
	if(flags[DISCOVERED_WITCH_DUNGEON] > 0) addButton(2,"Desert Cave",enterBoobsDungeon);
	addButton(9,"Back",eventParser,71);
}

function exgartuanCampUpdate():void {
	//Update Exgartuan stuff
	if(player.hasStatusAffect("Exgartuan") >= 0) 
	{
		trace("EXGARTUAN V1: " + player.statusAffectv1("Exgartuan") + " V2: " + player.statusAffectv2("Exgartuan"));
		//if too small dick, remove him
		if(player.statusAffectv1("Exgartuan") == 1 && (player.cockArea(0) < 100 || player.cocks.length == 0)) 
		{
			outputText("", true);
			outputText("<b>You suddenly feel the urge to urinate, and stop over by some bushes.  It takes wayyyy longer than normal, and once you've finished, you realize you're alone with yourself for the first time in a long time.", false);
			if(player.hasCock()) outputText("  Perhaps you got too small for Exgartuan to handle?</b>\n", false);
			else outputText("  It looks like the demon didn't want to stick around without your manhood.</b>\n", false);
			player.removeStatusAffect("Exgartuan");
		}
		//Tit removal
		else if(player.statusAffectv1("Exgartuan") == 2 && player.biggestTitSize() < 12) 
		{
			outputText("", true);
			outputText("<b>Black milk dribbles from your " + nippleDescript(0) + ".  It immediately dissipates into the air, leaving you feeling alone.  It looks like you became too small for Exgartuan!\n</b>", false);
			player.removeStatusAffect("Exgartuan");
		}		
	}
	doNext(1);
}

function fixHistory():void {
	outputText("<b>New history perks are available during creation.  Since this character was created before they were available, you may choose one now!</b>", true);
	flags[418] = 2;
	doNext(10036);
}