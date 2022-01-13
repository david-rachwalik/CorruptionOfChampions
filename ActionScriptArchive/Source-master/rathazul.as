﻿const RATHAZUL_DEBIMBO_OFFERED:int = 744;

	//Rathazul the Alchemist
	//Encounter, random text for potential uses, choices.
	//After he has crafted 3 things for the player, option to move into camp.
function encounterRathazul():void {
	spriteSelect(49);
	var offered:Boolean = false;
	//Rat is definitely not sexy!
	if(player.lust > 30) stats(0,0,0,0,0,0,-10,0);
	//Introduction
	if(player.hasStatusAffect("metRathazul") >= 0) {
		if(player.hasStatusAffect("Camp Rathazul") >= 0)
			outputText("You walk over to Rathazul's corner of the camp.  He seems as busy as usual, with his nose buried deep in some tome or alchemical creation, but he turns to face you as soon as you walk within a few paces of him.\n\n", true);
		else
			outputText("You spy the familiar sight of the alchemist Rathazul's camp along the lake.  The elderly rat seems to be oblivious to your presence as he scurries between his equipment, but you know him well enough to bet that he is entirely aware of your presence.\n\n", true);
	}
	else {
		outputText("You encounter a hunched figure working as you come around a large bush.  Clothed in tattered robes that obscure most his figure, you can nontheless see a rat-like muzzle protruding from the shadowy hood that conceals most of his form.  A simple glance behind him confirms your suspicions - this is some kind of rat-person.   He seems oblivious to your presence as he stirs a cauldron of viscous fluid with one hand; a neat stack of beakers and phials sit in the dirt to his left.  You see a smile break across his aged visage, and he says, \"<i>Come closer child.  I will not bite.</i>\"\n\nApprehensive of the dangers of this unknown land, you cautiously approach.\n\n\"<i>I am Rathazul the Alchemist.  Once I was famed for my miracle cures.  Now I idle by this lake, helpless to do anything but measure the increasing amounts of corruption that taint its waters,</i>\" he says as he pulls back his hood, revealing the entirety of his very bald and wrinkled head.\n\n", true);
		player.createStatusAffect("metRathazul",0,0,0,0);
	}
	//Camp offer!
	if(player.statusAffectv2("metRathazul") >= 3 && player.statusAffectv3("metRathazul") != 1 && player.cor < 75) {
		outputText("\"<i>You know, I think I might be able to do this worn-out world a lot more good from your camp than by wandering around this lake.  What do you say?</i>\" asks the rat.\n\n(Move Rathazul into your camp?)", false);
		doYesNo(2124,2125);
		//Set rathazul flag that he has offered to move in (1 time offer)
		player.changeStatusValue("metRathazul",3,1);
		return;
	}
	offered = rathazulWorkOffer();
	if(!offered) {
		outputText("He sighs dejectedly, \"<i>I am not sure what I can do for you, youngling.  This world is fraught with unimaginable dangers, and you're just scratching the surface of them.</i>\"\n\nYou nod and move on, leaving the depressed alchemist to his sadness.", false);
		doNext(13);
	}
}

function campRathazul():void {
	spriteSelect(49);
	if(flags[274] == 1 && flags[275] > 0) {
		collectRathazulArmor();
		return;
	}
	//Special rathazul/follower scenes scenes.
	if(rand(6) == 0 && flags[87] == 0) {
		flags[87] = 3;
		//Pure jojo
		if(flags[84] == 0 && player.hasStatusAffect("PureCampJojo") >= 0 && flags[80] == 0) {
			jojoOffersRathazulMeditation();
			return;
		}
		if(flags[82] == 0 && flags[43] == 1 && amilyFollower()) {
			AmilyIntroducesSelfToRathazul();
			return;
		}
		if(flags[82] == 1 && flags[43] == 1 && amilyFollower()) {
			amilyIngredientDelivery();
			return;
		}
		if(flags[82] == 2 && flags[43] == 1 && amilyFollower()) {
			amilyAsksAboutRathazulsVillage();
			return;
		}
	}
	var offered:Boolean = false;
	//Rat is definitely not sexy!
	if(player.lust > 50) stats(0,0,0,0,0,0,-1,0);
	if(player.lust > 65) stats(0,0,0,0,0,0,-5,0);
	if(player.lust > 80) stats(0,0,0,0,0,0,-5,0);
	if(player.lust > 90) stats(0,0,0,0,0,0,-5,0);
	//Introduction
	outputText("Rathazul looks up from his equipment and gives you an uncertain smile.\n\n\"<i>Oh, don't mind me,</i>\" he says, \"<i>I'm just running some tests here.  Was there something you needed, " + player.short + "?</i>\"\n\n", true);
	//player.createStatusAffect("metRathazul",0,0,0,0);
	offered = rathazulWorkOffer();
	if(!offered) {
		outputText("He sighs dejectedly, \"<i>I don't think there is.  Why don't you leave me be for a time, and I will see if I can find something to aid you.</i>\"", false);
		if(player.hasStatusAffect("Camp Rathazul") >= 0) doNext(74);
		else doNext(1);
	}

}
function rathazulWorkOffer():Boolean {
	spriteSelect(49);
	var totalOffers:Number = 0;
	var spoken:Boolean = false;
	var gelArmor:Number = 0;
	var beeArmor:Number = 0;
	var purify:Number = 0;
	var debimbo:int = 0;
	var lethiciteDefense:Number = 0;
	var dyes:Number = 0;
	if(hasItem("BlackEg",1) || hasItem("L.BlkEg",1)) {
		flags[PC_KNOWS_ABOUT_BLACK_EGGS] = 1;
		spoken = true;
		outputText("He eyes the onyx egg in your inventory and offers a little advice.  \"<i>Be careful with black eggs.  They can turn your skin to living latex or rubber.  The smaller ones are usually safer, but everyone reacts differently.  I'd get rid of them, if you want my opinion.</i>\"\n\n");
	}
	//Item crafting offer
	if(hasItem("GreenGl", 2)) {
		if(player.hasStatusAffect("RathazulArmor") < 0) outputText("He pipes up with a bit of hope in his voice, \"<i>I can smell the essence of the tainted lake-slimes you've defeated, and if you'd let me, I could turn it into something a bit more useful to you.  You see, the slimes are filled with the tainted essence of the world-mother herself, and once the taint is burned away, the remaining substance remains very flexible but becomes nearly impossible to cut through.  With the gel of five defeated slimes I could craft you a durable suit of armor.</i>\"\n\n", false);
		else outputText("He pipes up with a bit of excitement in his voice, \"<i>With just five pieces of slime-gel I could make another suit of armor...</i>\"\n\n", false);
		spoken = true;
		if(hasItem("GreenGl",5)) {
			gelArmor = 2069;
			totalOffers++;
		}
		else {
			outputText("You realize you're still a bit short of gel.\n\n", false);
		}
	}
	//Item crafting offer
	if(hasItem("B.Chitn", 1)) {
		outputText("The elderly rat looks at you intently and offers, \"<i>I see you've gathered a piece of chitin from the giant bees of the forests.  If you bring me five pieces I could probably craft it into some tough armor.</i>\"\n\n", false);
		spoken = true;
		if(hasItem("B.Chitn",5)) {
			beeArmor = 2180;
			totalOffers++;
		}
		else {
			outputText("(You need five pieces of chitin for Rathazul to make you the chitinous armor.)\n\n", false);
		}
	}
	var pCounter:int = 0;
	//Item purification offer
	if(hasItem("IncubiD", 1)) {
		purify = 3987;
		totalOffers++;
		pCounter++;
	}
	if(hasItem("SucMilk", 1)) {
		purify = 3987;
		totalOffers++;
		pCounter++;
	}
	if(hasItem("SDelite", 1)) {
		purify = 3987;
		totalOffers++;
		pCounter++;
	}
	if(hasItem("LaBova ", 1)) {
		purify = 3987;
		totalOffers++;
		pCounter++;
	}
	//Single Offer
	if(pCounter == 1) {
		outputText("The rat mentions, \"<i>I see you have at least one tainted item on you... for 20 gems I could remove most of the taint, making it a good deal safer to use.  Of course, who knows what kind of freakish transformations it would cause...</i>\"\n\n", false);
		spoken = true;
		totalOffers++;
	}
	if(pCounter > 1) {
		outputText("The rat mentions, \"<i>I see you have a number of demonic items on your person.  For 20 gems I could attempt to remove the taint from one of them, rendering it a good deal safer for consumption.   Of course it would not remove most of the transformative properties of the item....</i>\"\n\n", false);
		spoken = true;
		totalOffers+=2;
	}
	//Offer dyes if offering something else.
	if(player.gems >= 50) {
		outputText("Rathazul offers, \"<i>Since you have enough gems to cover the cost of materials for my dyes as well, you could buy one of my dyes for your hair.  I will need 50 gems up-front.</i>\"\n\n", false);
		spoken = true;
		totalOffers++;
		dyes = 1022;
	}
	//Reducto
	var reductos:Number = 0;
	if(player.hasStatusAffect("Camp Rathazul") >= 0 && player.statusAffectv2("metRathazul") >= 4) {
		outputText("The rat hurries over to his supplies and produces a container of paste, looking rather proud of himself, \"<i>Good news everyone!  I've developed a paste you could use to shrink down any, ah, oversized body parts.  The materials are expensive though, so I'll need ", false);
		if(flags[82] >= 2) outputText("50", false);
		else outputText("100", false);
		outputText(" gems for each jar of ointment you want.</i>\"\n\n", false);
		totalOffers++;
		spoken = true;
		reductos = 1058;
	}
	//SPOIDAH
	var silk:Number = 0;
	if(player.hasStatusAffect("Camp Rathazul") >= 0 && hasItem("T.SSilk", 1) && flags[274] + flags[275] == 0) {
		silk = 5;
		spoken = true;
		totalOffers++;
		outputText("\"<i>Oooh, is that some webbing from a giant spider or spider-morph?  Most excellent!  With a little bit of alchemical treatment, it is possible I could loosen the fibres enough to weave them into something truly magnificent - armor, or even a marvelous robe,</i>\" offers Rathazul.\n\n", false);
	}
	//Vines
	if(player.hasKeyItem("Marae's Lethicite") >= 0 && player.keyItemv2("Marae's Lethicite") < 3 && player.hasStatusAffect("Defense: Canopy") < 0 && player.hasStatusAffect("Camp Rathazul") >= 0) {
		outputText("His eyes widen in something approaching shock when he sees the Lethicite crystal you took from Marae.  Rathazul stammers, \"<i>By the goddess... that's the largest piece of lethicite I've ever seen.  I don't know how you got it, but there is immense power in those crystals.  If you like, I know a way we could use its power to grow a canopy of thorny vines that would hide the camp and keep away imps.  Growing such a defense would use a third of that lethicite's power.</i>\"\n\n", false);
		totalOffers++;
		spoken = true;
		lethiciteDefense = 1059;
	}
	if(player.hasStatusAffect("Camp Rathazul") >= 0) {
		if(flags[RATHAZUL_DEBIMBO_OFFERED] == 0 && (bimboSophie() || player.hasPerk("Bimbo Brains") >= 0 || player.hasPerk("Futa Faculties") >= 0)) {
			rathazulDebimboOffer();
			return true;
		}
		else if(flags[RATHAZUL_DEBIMBO_OFFERED] > 0) {
			outputText("You recall that Rathazul is willing to make something to cure bimbo liqueur for 250 gems and five Scholar's Teas.");
			if(hasItem("Smart T",5) && player.gems >= 250) {
				totalOffers++;
				debimbo = 1; 
			}
			else if(!hasItem("Smart T",5)) outputText("  You should probably find some if you want that...");
			else outputText("  You need more gems to afford that, though.");
			outputText("\n\n");			
		}
	}
	if(totalOffers == 0 && spoken) {
		doNext(13);
		return true;
	}
	if(totalOffers > 0) {
		var armor:Number = 0;
		if(beeArmor + gelArmor + silk > 0) armor = 2998;
		outputText("Will you take him up on an offer or leave?", false);
		//In camp has no time passage if left.
		menu();
		if(armor > 0) addButton(0,"Armor",eventParser,armor);
		if(debimbo > 0) addButton(1,"Debimbo",makeADeBimboDraft);
		if(dyes > 0) addButton(2,"Buy Dye",eventParser,dyes);
		if(lethiciteDefense > 0) addButton(3,"Lethicite",eventParser,lethiciteDefense);
		if(purify > 0) addButton(4,"Purify",eventParser,purify);
		if(reductos > 0) addButton(8,"Reducto",eventParser,reductos);
		if(player.hasStatusAffect("Camp Rathazul") >= 0) 
			addButton(9,"Leave",eventParser,74);
		//choices("Armor",armor,"Debimbo", debimbo, "Buy Dye",dyes, "Lethicite", lethiciteDefense, "Purify", purify, "", 0, "", 0, "", 0, "Reducto",reductos,"Leave",74);
		else 
			addButton(9,"Leave",eventParser,13);
		//choices("Armor",armor,"Debimbo", debimbo, "Buy Dye",dyes, "Lethicite", lethiciteDefense, "Purify", purify, "", 0, "", 0, "", 0, "Reducto",reductos,"Leave",13);
		gameState = 6;
		return true;
	}
	return false;
}

function purifySomething():void {
	spriteSelect(49);
	clearOutput();
	outputText("Rathazul asks, \"<i>What would you like me to purify?</i>\"");
	menu();
	//Item purification offer
	if(hasItem("IncubiD", 1)) {
		//incubiPurify = 2071;
		addButton(0,"Incubi Draft",eventParser,2071);
	}
	if(hasItem("SucMilk", 1)) {
		//succubiPurify = 2072;
		addButton(1,"SuccubiMilk",eventParser,2072);
	}
	if(hasItem("SDelite", 1)) {
		//delightPurify = 2073;
		addButton(2,"S. Delight",eventParser,2073);		
	}
	if(hasItem("LaBova ", 1)) {
		//laBovaPurify = 2145;
		addButton(3,"LaBova",eventParser,2145);
	}
	addButton(4,"Back",rathazulWorkOffer);
}


function rathazulDebimboOffer():void {
	spriteSelect(49);
	clearOutput();
	if(flags[RATHAZUL_DEBIMBO_OFFERED] == 0) {
		if(bimboSophie()) {
			outputText("Rathazul glances your way as you approach his lab, a thoughtful expression on his age-lined face.  \"<i>Tell me, [name], do you truly enjoy having that vacuous idiot around, lusting after you at all hours of the day?</i>\" he asks, shaking his head in frustration.  \"<i>She's clearly been subjected to the effects of Bimbo Liqueur, which as you can plainly see are quite indeed potent.  However, like most things in Mareth, it can be countered - at least partially.</i>\"  Rathazul folds his long, clawed fingers together, his tail lashing behind him as he thinks.  \"<i>Perhaps with a sufficient quantity of something called Scholar's Tea...Can counter the stupefying effects of the elixir... Oh my yes... Hmm...</i>\"  Rathazul nods, stroking at the few long wisps of fur that hang from his chin.");
			outputText("\n\nYou wait further clarification, but the old rat just stands there, staring off into space.  Coughing politely, you reacquire his attention, causing him to jump.");
			outputText("\n\n\"<i>Oh?  Nmm, YES, bimbos, that's right!  As I was saying, five Scholar's Teas along with 250 gems for other reagents should give me all I need to create a bimbo-beating brew!  Oh my, the alliteration!  How absurd.</i>\"  Rathazul chuckles slowly, wiping a drop from his eye before he looks back at you fiercely, \"<i>It is a worthwhile goal - no creature should be subjected to a reduced intellect.  Let me know when you have acquired what is needed.</i>\"");
		}
		else {
			//Notification if the PC is the one bimbo'ed*
			outputText("\n\nRathazul glances your way as you approach his lab, a thoughtful expression on his age-lined face.  \"<i>Tell me [name], do you truly enjoy living your life under the debilitating effects of that cursed potion?  Even now the spark of intelligence has all but left from your eyes.  Do you even understand what I'm saying?</i>\"");
			outputText("\n\nYou twirl a lock of hair around your finger and giggle.  This silly old rat thinks you're like, dumb and stuff!  He just doesn't know how great it is to have a rocking body and a sex-drive that's always ready to suck and fuck.  It's so much fun!  You look back at the rat, realizing you haven't answered him yet, feeling a bit embarrassed as he sighs in disappointment.");
			outputText("\n\n\"<i>Child, please... bring me five Scholar's Teas and 250 gems for reagents, then I can fix you!  I can help you!  Just... get the tea!</i>\" the alchemist pleads, counting off to five on his clawed fingers for extra emphasis while shaking his gem pouch profusely.  You bite your lower lip— he seems really really mad about this or something.  Maybe you should like, get the tea?");
		}
		flags[RATHAZUL_DEBIMBO_OFFERED]++;
	}
	//Rath menu
	menu();
	addButton(0,"Next",campRathazul);
}

//Creation Of The Draft:*
function makeADeBimboDraft():void {
	clearOutput();
	spriteSelect(49);
	outputText("Rathazul takes the teas and the gems into his wizened palms, shuffling the glittering jewels into a pouch and the teas into a large decanter.  He promptly sets the combined brews atop a flame and shuffles over to his workbench, where he picks up numerous pouches and vials of every color and description, adding them to the mix one after the other.  The mixture roils and bubbles atop the open flame like a monstrous, eerie thing, but quickly simmers down to a quiet boil.  Rathazul leaves it going for a while, stirring occasionally as he pulls out a smaller vial.  Once most of the excess liquid has evaporated, he pours the concoction into the glass container and corks it, holding it up to the light to check its coloration.");
	outputText("\n\n\"<i>That <b>should</b> do,</i>\" he mutters to himself.  Rathazul turns, carefully handing you the mixture.  \"<i>This should counter the mental-inhibiting effects of the Bimbo Liqueur, but I have no idea to what extent those who imbibe it will retain of their time spent as a bimbo.....</i>\"\n\n");
	//Take items
	player.gems -= 250;
	consumeItem("Smart T",5);
	statScreenRefresh();
	player.addStatusValue("metRathazul",2,1);
	shortName = "Debimbo";
	takeItem();
}


function RathazulArmorMenu():void {
	spriteSelect(49);
	var gelArmor:Number = 0;
	var silk:Number = 0;
	var beeArmor:Number = 0;
	outputText("Which armor project would you like to pursue with Rathazul?", true);
	//Item crafting offer
	if(hasItem("GreenGl", 5)) {
		gelArmor = 2069;
	}
	//Item crafting offer
	if(hasItem("B.Chitn", 5)) {
		beeArmor = 2180;
	}
	if(player.hasStatusAffect("Camp Rathazul") >= 0 && hasItem("T.SSilk", 1) && flags[274] + flags[275] == 0) {
		silk = 2999;
	}
	simpleChoices("BeeArmor",beeArmor,"GelArmor",gelArmor,"SpiderSilk",silk,"",0,"Back",2070);
}
function craftSilkArmor():void {
	spriteSelect(49);
	outputText("", true);
	outputText("You hand the bundled webbing to Rathazul carefully, lest you damage the elderly mouse.  He gives you a bemused smile and snatches the stuff from your grasp while he mutters, \"<i>I'm not falling apart you know.</i>\"\n\n", false);
	//(Not enough webs: 
	if(!hasItem("T.SSilk", 5)) {
		outputText("The rat shakes his head and hands it back to you.  \"<i>This isn't enough for me to make anything with.  I'll need at least five bundles of this stuff total, so you'll need to find more,</i>\" he explains.\n\n", false);
		//(optional spider bonus: 
		if(player.tailType == 5) {
			outputText("You show him your spider-like abdomen in response, offering to produce more webbing for him.  Rathazul chuckles dryly, a sound that reminds you of hot wind rushing through a dead valley.  \"<i>Dear child, this would never do.  Silk this tough can only be produced by a true-born spider.  No matter how you change yourself, you'll always be a human at heart.</i>\"\n\n", false);
			outputText("The old rat shakes his head and adds, \"<i>Well, now that I think about it, the venom of a red widow might be able to transform you until you are a spider to the core, but I have absolutely no idea what that would do to you.  If you ever try such a dangerous, reckless idea, let me know.  I want to have my notebooks handy, for SCIENCE!</i>\"\n\n", false);
		}
		doNext(2070);
		return;
	}
	outputText("The rat limps over to his equipment, spider-silk in hand.  With efficient, practiced motions, he runs a few tests.  As he finishes, he sighs and explains, \"<i>This will be harder than I thought.  The webbing is highly resistant to most of my alchemic reagents.  To even begin to work with such material I will need a number of rare, expensive elements.  I would need 500 gems to even start such a project.</i>\"\n\n", false);
	outputText("You can't help but sigh when he names such a sizable figure.  Do you give him the 500 gems and spider-silk in order for him to create you a garment?", false);
	if(player.gems < 500) {
		outputText("  <b>Wait... you don't even have 500 gems.  Damn.</b>", false);
		doNext(2070);
		return;
	}
	//[Yes] [No]
	doYesNo(3000,3001);
}
function commissionSilkArmorForReal():void {
	spriteSelect(49);
	outputText("", true);
	outputText("You sort 500 gems into a pouch and toss them to Rathazul, along with the rest of the webbing.  The wizened alchemist snaps the items out of the air with lightning-fast movements and goes to work immediately.  He bustles about with enormous energy, invigorated by the challenging task before him.  It seems Rathazul has completely forgotten about you, but as you turn to leave, he calls out, \"<i>What did you want me to make?  A mage's robe or some nigh-impenetrable armor?</i>\"\n\n", false);
	player.gems -= 500;
	statScreenRefresh();
	destroyItems("T.SSilk",5);
	//[Armor][Robes]
	simpleChoices("Armor",3002,"Robes",3004,"",0,"",0,"",0);
}
function declineSilkArmorCommish():void {
	spriteSelect(49);
	outputText("", true);
	outputText("You take the silk back from Rathazul and let him know that you can't spend 500 gems on a project like that right now.  He sighs, giving you a crestfallen look and a slight nod of his hooded muzzle.", false);
	doNext(2070);
}
function chooseArmorOrRobes():void {
	spriteSelect(49);
	outputText("Rathazul grunts in response and goes back to work.  You turn back to the center of your camp, wondering if the old rodent will actually deliver the wondrous item that he's promised you.", true);
	doNext(13);
	flags[274] = 24;
	trace("274: " + flags[274]);
}
function collectRathazulArmor():void {
	spriteSelect(49);
	outputText("", true);
	outputText("Rathazul beams and ejaculates, \"<i>Good news everyone!  Your ", false);
	if(flags[275] == 1) outputText("armor", false);
	else outputText("robe", false);
	outputText(" is finished!</i>\"\n\n", false);
	//Robe
	if(flags[275] == 2) {
		outputText("Hanging from a small rack is a long, flowing robe.  It glitters brightly in the light, the pearl-white threads seeming to shimmer and shine with every ripple the breeze blows through the soft fabric.  You run your fingers over the silken garment, feeling the soft material give at your touch.  There's a hood with a golden border embroidered around the edge.  For now, it hangs limply down the back, but it would be easy to pull up in order to shield the wearer's eyes from harsh sunlight or rainy drizzle.  The sleeves match the cowl, circled with intricate threads laid out in arcane patterns.\n\n", false);
		
		outputText("Rathazul gingerly takes down the garment and hands it to you.  \"<i>Don't let the softness of the material fool you.  This robe is tougher than many armors, and the spider-silk's properties may even help you in your spell-casting as well.</i>\"\n\n", false);
		shortName = "SS.Robe";
	}
	//(Armor)
	else {
		outputText("A glittering white suit of armor sits atop a crude armor rack, reflecting the light that plays across its surface beautifully.  You definitely didn't expect anything like this!  It looks nearly identical to a set of light platemail, though instead of having a cold metal surface, the armor feels slightly spongy, with just a little bit of give in it.\n\n", false);
		
		outputText("While you marvel at the strange equipment, Rathazul explains, \"<i>When you said you wanted armor, I realized I could skip a few of the alchemical processes used to soften material.  The savings let me acquire a cheap metal set of armor to use as a base, and I molded half the armor around each piece, then removed it and created the outer, defensive layers with the rest of the webbing.  Unfortunately, I didn't have enough silk for a solid codpiece, but I did manage to make a you thin loincloth from the leftover scraps  - for modesty.</i>\"\n\n", false);
		shortName = "SSArmor";
	}
	//Reset counters
	flags[275] = 0;
	flags[274] = 0;
	menuLoc = 2;
	takeItem();
}

function craftOozeArmor():void {
	spriteSelect(49);
	destroyItems("GreenGl", 5);
	outputText("Rathazul takes the green gel from you and drops it into an empty cauldron.  With speed well beyond what you'd expect from such an elderly creature, he nimbly unstops a number of vials and pours them into the cauldron.  He lets the mixture come to a boil, readying a simple humanoid-shaped mold from what you had thought was piles of junk material.  In no time at all, he has cast the boiling liquid into the mold, and after a few more minutes he cracks it open, revealing a suit of glistening armor.\n\n", true);
	shortName = "GelArmr";
	player.addStatusValue("metRathazul",2,1);
	takeItem();
	if(player.hasStatusAffect("RathazulArmor") < 0) player.createStatusAffect("RathazulArmor",0,0,0,0);
}

function buyDyes():void {
	spriteSelect(49);
	outputText("Rathazul smiles and pulls forth several vials of colored fluids.  Which type of dye would you like?", true);
	outputText("\n\n<b>(-50 Gems)</b>", false);
	player.gems -= 50;
	statScreenRefresh();
	choices("Auburn", 1017, "Black", 1018, "Blond", 1019, "Brown", 1020, "Red", 1021,"White",1044,"Gray",1084,"",0,"",0,"Nevermind",2486);
}

function carapaceFind():void {
	outputText("You find a large piece of insectile carapace obscured in the ferns to your left.  It's mostly black with a thin border of bright yellow along the outer edge.  There's still a fair portion of yellow fuzz clinging to the chitinous shard.  It feels strong and flexible - maybe someone can make something of it.  ", true);
	shortName = "B.Chitn";
	takeItem();
}

function craftCarapace():void {
	spriteSelect(49);
	outputText("The rat takes the scales and works on his bench for an hour while you wait.  Once he has finished, Ratzhul is beaming with pride, \"<i>I think you'll be pleased. Go ahead and take a look.</i>\"\n\nHe hands you the armor.  ", true);
	outputText("The plates shine and shimmer like black steel.  He has used the yellow chitin to add accents and embroidery to the plates with a level of detail and craftsmanship rarely seen back home. A yellow fur neck lining has been fashioned from hairs found on the pieces.  The armor includes a breastplate, shoulder guards, full arm guards, and knee high boots.  You notice there are no pants.  As you turn to ask him where the pants are, you see him scratching his head and hastily rustling in drawers.  He mutters under his breath, \"<i>I'm sorry, I'm sorry, I got so focused on working on the pauldrons that I forgot to make any leg coverings!  Here, this should look good with it, and it won't restrict your movements.</i>\"  He hands you a silken loincloth", false);
	if(player.gender >= 2) outputText(" with stockings and garters", false);
	outputText(".  He still manages to look somewhat pleased with himself in spite of the blunder, even bragging a little bit, \"<i>Let me show you the different lengths of string I used.</i>\"\n\n", false);
	if(player.cockTotal() > 0 && player.biggestCockArea() >= 40) outputText("The silken material does little to hide the bulge of your groin, if anything it looks a little lewd.   Rathazul mumbles and looks away, shaking his head.\n\n", false);
	if(player.biggestTitSize() >= 8) outputText("Your " + biggestBreastSizeDescript() + " barely fit into the breastplate, leaving you displaying a large amount of jiggling cleavage.\n\n", false);
	destroyItems("B.Chitn", 5);
	shortName = "BeeArmr";
	player.addStatusValue("metRathazul",2,1);
	takeItem();
}