﻿const YVONNE_FUCK_COUNTER:int = 437;


function discoverTelAdre():void {
	outputText("", true);
	if(player.hasStatusAffect("Tel'Adre") < 0) {
		outputText("The merciless desert sands grind uncomfortably under your " + player.feet() + " as you walk the dunes, searching the trackless sands to uncover their mysteries.  All of a sudden, you can see the outline of a small city in the distance, ringed in sandstone walls.  Strangely it wasn't there a few moments before.  It's probably just a mirage brought on by the heat.  Then again, you don't have any specific direction you're heading, what could it hurt to go that way?", false);
		outputText("\n\nDo you investigate the city in the distance?", false);
	}
	else {
		outputText("While out prowling the desert dunes you manage to spy the desert city of Tel'Adre again.  You could hike over to it again, but some part of you fears being rejected for being 'impure' once again.  Do you try?", false);
	}
	doYesNo(2209,13);
}

//player chose to approach the city in the distance
function encounterTelAdre():void {
	outputText("", true);
	if(player.hasStatusAffect("Tel'Adre") < 0) {
		outputText("You slog through the shifting sands for a long time, not really seeming to get that close.  Just when you're about to give up, you crest a large dune and come upon the walls of the city you saw before.  It's definitely NOT a mirage.  There are sandstone walls at least fifty feet tall ringing the entire settlement, and the only entrance you can see is a huge gate with thick wooden doors.  The entrance appears to be guarded by a female gray fox who's more busy sipping on something from a bottle than watching the desert.\n\n", false);
		outputText("As if detecting your thoughts, she drops the bottle and pulls out a halberd much longer than she is tall.\n\n", false);
		outputText("\"<i>Hold it!</i>\" barks the fox, her dark gray fur bristling in suspicion at your sudden appearance, \"<i>What's your business in the city of Tel'Adre?</i>\"\n\n", false);
		outputText("You shrug and explain that you know nothing about this town, and just found it while exploring the desert.  The girl stares at you skeptically for a moment and then blows a shrill whistle.  She orders, \"<i>No sudden moves.</i>\"\n\n", false);
		outputText("Deciding you've nothing to lose by complying, you stand there, awaiting whatever reinforcements this cute vulpine-girl has summoned.  Within the minute, a relatively large-chested centauress emerges from a smaller door cut into the gate, holding a massive bow with an arrow already nocked.\n\n", false);
		outputText("\"<i>What's the problem, Urta?  A demon make it through the barrier?</i>\" asks the imposing horse-woman.\n\nUrta the fox shakes her head, replying, \"<i>I don't think so, Edryn.  " + player.mf("He's","She's") + " something else.  We should use the crystal and see if " + player.mf("he","she") + "'s fit to be allowed entry to Tel'Adre.</i>\"\n\n", false);
		outputText("You watch the big centaur cautiously as she pulls out a pendant, and approaches you.  \"<i>Hold still,</i>\" she says, \"<i>this will do you no harm.</i>\"\n\n", false);
		outputText("She places one hand on your shoulder and holds the crystal in the other.  Her eyes close, but her brow knits as she focuses on something.  ", false);
		telAdreCrystal();
	}
	else {
		outputText("Once again you find the gray fox, Urta, guarding the gates.  She nods at you and whistles for her companion, Edryn once again.  The centauress advances cautiously, and you submit herself to her inspection as she once again produces her magical amulet.  ", false);
		telAdreCrystal();		
	}	
}

//Alignment crystal goooooo
function telAdreCrystal():void {
	if(player.hasStatusAffect("Tel'Adre") < 0) player.createStatusAffect("Tel'Adre",0,0,0,0);
	//-70+ corruption, or possessed by exgartuan
	if(player.hasStatusAffect("Exgartuan") >= 0 || player.cor >= 70) {
		outputText("The crystal pendant begins to vibrate in the air, swirling around and glowing dangerously black.  Edryn snatches her hand back and says, \"<i>I'm sorry, but you're too far gone to step foot into our city.  If by some miracle you can shake the corruption within you, return to us.</i>\"\n\n", false);
		outputText("You shrug and step back.  You could probably defeat these two, but you know you'd have no hope against however many friends they had beyond the walls.  You turn around and leave, a bit disgruntled at their hospitality.  After walking partway down the dune you spare a glance over your shoulder and discover the city has vanished!  Surprised, you dash back up the dune, flinging sand everywhere, but when you crest the apex, the city is gone.", false);
		doNext(13);
		return;
	}
	//-50+ corruption or corrupted Jojo
	else if(player.cor >= 50 || monk >= 5) {
		outputText("The crystal pendant shimmers, vibrating in place and glowing a purple hue.  Edryn steps back, watching you warily, \"<i>You've been deeply touched by corruption.  You balance on a razor's edge between falling completely and returning to sanity.  You may enter, but we will watch you closely.</i>\"\n\n", false);
	}
	//-25+ corruption or corrupted Marae
	else if(player.cor >= 25 || player.hasStatusAffect("FactoryOverload") >= 0) {
		outputText("The crystal pendant twirls in place, glowing a dull red.  Edryn takes a small step back and murmers, \"<i>You've seen the darkness of this land first hand, but its hold on you is not deep.  You'll find sanctuary here.  The demons cannot find this place yet, and we promise you safe passage within the walls.</i>\"\n\n", false);
	}
	//-Low corruption/pure characters
	else {
		outputText("The crystal shines a pale white light.  Edryn steps back and smiles broadly at you and says, \"<i>You've yet to be ruined by the demonic taint that suffuses the land of Mareth.  Come, you may enter our city walls and find safety here, though only so long as the covenant's white magic protects us from the demons' lapdogs.</i>\"\n\n", false);
	}
	outputText("The vixen Urta gestures towards the smaller door and asks, \"<i>Would you a like a tour of Tel'Adre, newcomer?</i>\"\n\n", false);
	outputText("You remember your etiquette and nod, thankful to have a quick introduction to such a new place.  Urta leaves Edryn to watch the gate and leads you inside.  You do notice her gait is a bit odd, and her fluffy fox-tail seems to be permanently wrapped around her right leg.  The door closes behind you easily as you step into the city of Tel'Adre...", false);
	doNext(2210);
}

function telAdreTour():void {
	player.changeStatusValue("Tel'Adre",1,1);
	outputText("", true);
	spriteSelect(1);
	outputText("Urta leads you into the streets of Tel'Adre, giving you a brief run-down of her and her city, \"<i>You see, about two decades back, the demons were chewing their way through every settlement and civilization in Mareth.  The covenant, a group of powerful magic-users, realized direct confrontation was doomed to fail.  They hid us in the desert with their magic, and the demons can't corrupt what they can't find.  So we're safe, for now.</i>\"\n\n", false);
	outputText("The two of you find yourselves in the center of a busy intersection.  Urta explains that this is the main square of the city, and that, although the city is large, a goodly portion of it remains empty.  Much of the population left to assist other settlements in resisting the demons and was lost.  She brushes a lock of stray hair from her eye and guides you down the road, making sure to point out her favorite pub - \"The Wet Bitch\".  You ", false);
	if(player.cor < 25) outputText("blush", false);
	else outputText("chuckle", false);
	outputText(" at the rather suggestive name as Urta turns around and says, \"<i>With how things are, we've all gotten a lot more comfortable with our sexuality.  I hope it doesn't bother you.</i>\"\n\n", false);
	outputText("A bit further on, you're shown a piercing parlor, apparently another favorite of Urta's.  A cute human girl with cat-like ears peeks out the front and gives you both a friendly wave.  It's so strange to see so many people together in one place, doing things OTHER than fucking.  The whole thing makes you miss your hometown more than ever.  Tears come to your eyes unbidden, and you wipe them away, glad to at least have this one reminder of normalcy.  Urta politely pretends not to notice, though the tail she keeps wrapped around her leg twitches as she wraps up the tour.\n\n", false); 
	outputText("She gives you a friendly punch on the shoulder and says, \"<i>Okay, gotta go!  Be good and stay out of trouble, alright?</i>\"\n\n", false);
	outputText("Before you can answer, she's taken off back down the street, probably stopping off at 'The Wet Bitch' for a drink.  Strange, her departure was rather sudden...", false);
	doNext(2211);
}

function telAdreMenu():void {
	if(flags[VALENTINES_EVENT_YEAR] < date.fullYear && player.balls > 0 && player.hasCock() && flags[54] >= 4 && flags[105] > 0 && isValentine()) {
		crazyVDayShenanigansByVenithil();
		return;
	}
	if(!urtaBusy() && flags[33] == 0 && rand(15) == 0 && hours > 15) {
		urtaIsABadass();
		return;
	}
	if(!urtaBusy() && flags[URTA_INCUBATION] >= 192 && rand(30) == 0) {
	   urtaIsAPregnantCopScene();
	   return;
	}
	if(flags[ARIAN_PARK] == 0 && player.level >= 4 && rand(10) == 0) {
		meetArian();
		return;
	}
	//Display Tel'adre menu options//
	//Special Delivery☼☼☼
	//Has a small-ish chance of playing when the PC enters Tel'Adre.
	//Must have Urta's Key.
	//Urta must be pregnant to trigger this scene.
	//Play this scene upon entering Tel'Adre.
	if(flags[URTA_INCUBATION] > 50 && rand(4) == 0 && flags[URTA_PREGNANT_DELIVERY_SCENE] == 0 && player.hasKeyItem("Spare Key to Urta's House") >= 0) {
		urtaSpecialDeliveries();
		return;
	}
	if(flags[242] == -1) {
		runAwayMaddieFollowup();
		return;
	}
	outputText("Tel'Adre is a massive city, though most of its inhabitants tend to hang around the front few city blocks.  It seems the fall of Mareth did not leave the city of Tel'Adre totally unscathed.  A massive tower rises up in the center of the city, shimmering oddly.  From what you overhear in the streets, the covenant's magic-users slave away in that tower, working to keep the city veiled from outside dangers.  There does not seem to be a way to get into the unused portions of the city, but you'll keep your eyes open.\n\n", true);
	outputText("A sign depicting a hermaphroditic centaur covered in piercings hangs in front of one of the sandstone buildings, and bright pink lettering declares it to be the 'Piercing Studio'.  You glance over and see the wooden facade of Urta's favorite bar, 'The Wet Bitch'.  How strange that those would be what she talks about during a tour.  In any event you can also spot some kind of wolf-man banging away on an anvil in a blacksmith's stand, and a foppishly-dressed dog-man with large floppy ears seems to be running some kind of pawnshop in his stand.  Steam boils from the top of a dome-shaped structure near the far end of the street, and simple lettering painted on the dome proclaims it to be a bakery.  Perhaps those shops will be interesting as well.", false);
	var homes:Boolean = false;
	var homeB:int = 0;
	if(flags[133] == -2) {
		if(RaphaelLikes())
		{
			homes = true;
		}
		else {
			outputText("\n\nYou remember Raphael's offer about the Orphanage, but you might want to see about shaping yourself more to his tastes first.  He is a picky fox, after all, and you doubt he would take well to seeing you in your current state.");
		}
	}
	if(urtaKids() > 0 && player.hasKeyItem("Spare Key to Urta's House") >= 0) homes = true;
	if(flags[ARIAN_PARK] >= 4 && !arianFollower()) homes = true;
	if(homes) homeB = 3993;
	choices("Shops",3995,"Bakery",2836,"Bar",2256,"Gym",2783,"Homes",homeB,"Park",2255,"Pawn",2255,"Tower",3996,"Weapons",2553,"Leave",13);
	menu();
	addButton(0,"Shops",eventParser,3995);
	addButton(1,"Bakery",eventParser,2836);
	addButton(2,"Bar",eventParser,2256);
	addButton(3,"Gym",eventParser,2783);
	if(homeB > 0) addButton(4,"Homes",eventParser,homeB);
	if(flags[ARIAN_PARK] > 0 && flags[ARIAN_PARK] < 4) addButton(5,"Park",visitThePark);
	addButton(6,"Pawn",eventParser,2255);
	addButton(7,"Tower",eventParser,3996);
	addButton(8,"Weapons",eventParser,2553);
	addButton(9,"Leave",eventParser,13);
}

function armorShops():void {
	menu();
	addButton(0,"Blacksmith",eventParser,2274);
	addButton(1,"Piercing",eventParser,2212);
	addButton(2,"Tailor",eventParser,1072);
	addButton(4,"Back",telAdreMenu);
}

function houses():void {
	clearOutput();
	outputText("Whose home will you visit?");
	var orphanage:int = 0;
	if(flags[133] == -2) {
		if(RaphaelLikes())
		{
			orphanage = 3975;
		}
		else {
			outputText("\n\nYou remember Raphael's offer about the Orphanage, but you might want to see about shaping yourself more to his tastes first.  He is a picky fox, after all, and you doubt he would take well to seeing you in your current state.");
		}
	}
	menu();
	if(flags[ARIAN_PARK] >= 4 && !arianFollower()) addButton(0,"Arian's",visitAriansHouse);
	if(orphanage) addButton(1,"Orphanage",eventParser,3975);
	if(urtaKids() > 0 && player.hasKeyItem("Spare Key to Urta's House") >= 0) addButton(2,"Urta's House",visitTheHouse);
	addButton(9,"Back",telAdreMenu);
}

function piercingStudio():void {
	spriteSelect(63);
	var about:Number = 0;
	if(player.hasStatusAffect("Yara") < 0) about = 2239;
	outputText("", true);
	outputText("The interior of the piercing studio is earthy, leaving the stone floors and walls uncovered, though the windows are covered with woven blankets, sewn from multicolored threads.  There are a number of cushy chairs facing a wall of mirrors, along with a shelf covered in needles, piercings, and strong alcohols.  A brunette prowls about the place, tidying it up during a lull in business.  You dully notice that unlike everyone else in this town, she's mostly human.  Perhaps she came through a portal as well?  She approaches you, and you see a cat tail waving behind her, and a pair of fuzzy feline ears, both covered in piercings, perched atop her head.  Clearly she's been here long enough to pick up some of the local flavor.\n\n", false);
	outputText("She introduces herself, \"<i>Hello there " + player.mf("sir","cutie") + ", my name is Yara.  Would you like to get a piercing?</i>\"", false);
	simpleChoices("Pierce",2213,"Remove",2240,"About Her",about,"",0,"Leave",2211);
}
function aboutYara():void {
	spriteSelect(63);
	player.createStatusAffect("Yara",0,0,0,0);
	outputText("You introduce yourself and ask Yara about her past, noting that ", true);
	if(player.humanScore() <= 2) outputText("you were once a human too.", false);
	else outputText("you haven't seen many other humans about.", false);
	outputText("\n\nShe blushes a little when she answers, her tail curling about her protectively, \"<i>My home city was built around a portal, and the Baron that ruled it insisted that we send a sacrifice through every year.  We were raised believing that if we didn't sacrifice SOMEONE, the gods would become angry and bring our city to ruin.  Of course the whole thing was a sham, but the families of those sacrificed get compensation.  My father tried to whore me out first, but when that didn't work, the bastard had me drugged and sacrificed.  I woke up next to a lake, ate some weird fruit when I got hungry, and I...well, I changed.  Thankfully I found my way here before I ran into any demons, or who knows what would have happened to me!  Tel'Adre has been good to me, and I'm sure it'll be good to you.  Now, how about getting a piercing?</i>\"", false);
	stats(0,0,0,2,0,0,-5,-1);
	doNext(2212);
}
function pierceMenu():void {
	spriteSelect(63);
	hideUpDown();
	var clit:Number = 0;
	if(player.hasVagina()) {
		if(player.vaginas[0].clitPierced == 0) clit = 2215;
	}
	var dick:Number = 0;
	if(player.totalCocks() > 0) {
		if(player.cocks[0].pierced == 0) dick = 2216;
	}
	var ears:Number = 0;
	if(player.earsPierced == 0) ears = 2217;
	var eyebrow:Number = 0;
	if(player.eyebrowPierced == 0) eyebrow = 2218;
	var lip:Number = 0;
	if(player.lipPierced == 0) lip = 2219;
	var nipples:Number = 0;
	if(player.nipplesPierced == 0) nipples = 2220;
	var nose:Number = 0;
	if(player.nosePierced == 0) nose = 2221;
	var tongue:Number = 0;
	if(player.tonguePierced == 0) tongue = 2222;
	var vulva:Number = 0;
	if(player.hasVagina()) {
		if(player.vaginas[0].labiaPierced == 0) vulva = 2223;
	}
	outputText("Yara asks, \"<i>Ok then, what would you like pierced " + player.mf("sir","cutie") + "?  Just keep in mind my piercings are special - they're permanent and CAN'T be removed.</i>\"", true);
	if(clit + dick + ears + eyebrow + lip + nipples + nose + tongue + vulva > 0) 
		choices("Clit",clit,"Dick",dick,"Ears",ears,"Eyebrow",eyebrow,"Lip",lip,"Nipples",nipples,"Nose",nose,"Tongue",tongue,"Labia",vulva,"Back",2212);
	else {
		outputText("\n\nYou give yourself a quick once-over and realize there's nowhere left for her to pierce you.  Oh well.", false);
		doNext(2212);
	}
}

function dickPierce():void {
	spriteSelect(63);
	if(player.totalCocks() > 0) outputText("\"<i>Ok, this is gonna hurt a LOT, but I've heard good things about it.  What kind of piercing do you want done?</i>\" Yara asks.", true);
	else {
		outputText("You realize you don't have a dick to pierce.  Whoops!  Better pick something else...", true);
		doNext(2213);
		return;
	}
	simpleChoices("Stud",2224,"Ring",2225,"Ladder",2226,"Back",2213,"Nevermind",2212);
	piercingLoc = 1;
}

function clitPierce():void {
	spriteSelect(63);
	if(player.hasVagina()) outputText("\"<i>Ohhh that's going to be suckably cute!</i>\" exclaims Yara, blushing more than a little. \"<i>What kind of piercing would you like?</i>", true);
	else {
		outputText("You realize you don't have a clit to pierce.  Whoops!  Better pick something else...", true);
		doNext(2213);
		return;
	}
	piercingLoc = 0;
	simpleChoices("Stud",2224,"Ring",2225,"",0,"Back",2213,"Nevermind",2212);
}

function earPierce():void {
	spriteSelect(63);
	piercingLoc = 2;
	outputText("\"<i>Okay, just let me get my supplies and we can get started.  What kind of jewelry do you want in them?</i>\" asks Yara.", true)
	simpleChoices("Stud",2224,"Ring",2225,"Hoop",2227,"Back",2213,"Nevermind",2212);
}

function eyebrowPierce():void {
	spriteSelect(63);
	piercingLoc = 3;
	outputText("\"<i>Ah, that's a good look!  What do you want there?</i>\" asks Yara.", true);
	simpleChoices("Stud",2224,"Ring",2225,"",0,"Back",2213,"Nevermind",2212);
}

function lipPierce():void {
	spriteSelect(63);
	piercingLoc = 4;
	outputText("\"<i>Oh my, that'll be HAWT!  What kind of jewelry do you want there?</i>\" asks Yara.", true);
	simpleChoices("Stud",2224,"Ring",2225,"",0,"Back",2213,"Nevermind",2212);
}

function nipplePierce():void {
	spriteSelect(63);
	piercingLoc = 5;
	outputText("\"<i>Yeah sure I can do those!  What kind of jewelry do you want there?  I'm partial to nipple-chains myself,</i>\" admits Yara, blushing bright red.", true);
	simpleChoices("Studs",2224,"Rings",2225,"Chain",2228,"Back",2213,"Nevermind",2212);
}

function nosePierce():void {
	spriteSelect(63);
	piercingLoc = 6;
	outputText("Yara wrinkles her nose in distaste, \"<i>Really?  Well ok, what do you want there?</i>\"", true);
	simpleChoices("Stud",2224,"Ring",2225,"",0,"Back",2213,"Nevermind",2212);
}

function tonguePierce():void {
	spriteSelect(63);
	piercingLoc = 7;
	outputText("Yara happily purrs, \"<i>Oh my, I bet that'll fun!  I'm afraid I can only put a stud there though, ok?</i>\"", true);
	simpleChoices("Ok",2224,"",0,"",0,"Back",2213,"Nevermind",2212);
}
function vulvaPierce():void {
	spriteSelect(63);
	piercingLoc = 8;
	if(player.hasVagina()) outputText("Yara explains, \"<i>This is gonna hurt a lot, but I think you'll love how it feels after.  I know I do!  Now what kind of jewelry do you want down-town?</i>\"", true);
	else {
		outputText("You realize you don't have a pussy to pierce.  Whoops!  Better pick something else...", true);
		doNext(2213);
		return;
	}
	simpleChoices("Stud",2224,"Ring",2225,"",0,"Back",2213,"Nevermind",2212);
}
function chooseStud():void {
	piercingType = 1;
	chooseMaterials();	
}
function chooseRing():void {
	piercingType = 2;
	chooseMaterials();
}
function chooseLadder():void {
	piercingType = 3;
	chooseMaterials();	
}
function chooseHoop():void {
	piercingType = 4;
	chooseMaterials();	
}
function chooseChain():void {
	piercingType = 5;
	chooseMaterials();	
}

function chooseMaterials():void {
	spriteSelect(63);
	outputText("Yara gathers up her materials and says, \"<i>Ok, now what type of material do you want it made from?  Don't worry about price, none of these are that rare, so the piercing will only be 100 gems.  Though I do have some rarer materials; you'll need 1000 gems to spend if you want to check them out.</i>\"", true);
	if(player.gems < 100) {
		outputText("\n\nYou realize you don't have enough gems to get a piercing.", false);
		doNext(2212);
		return;
	}
	var rare:Number = 0;
	if(player.gems >= 1000) rare = 2250;
	choices("Amethyst",2231,"Diamond",2232,"Gold",2233,"Emerald",2234,"Jade",2235,"Onyx",2236,"Ruby",2237,"Steel",2238,"Rare Menu",rare,"Nevermind",2212);
}
function chooseAmethyst():void {
	piercingMat = 1;
	areYouSure();
}
function chooseDiamond():void {
	piercingMat = 2;
	areYouSure();
}
function chooseGold():void {
	piercingMat = 3;
	areYouSure();
}
function chooseEmerald():void {
	piercingMat = 4;
	areYouSure();
}
function chooseJade():void {
	piercingMat = 5;
	areYouSure();
}
function chooseOnyx():void {
	piercingMat = 6;
	areYouSure();
}
function chooseRuby(): void {
	piercingMat = 7;
	areYouSure();
}
function chooseSteel():void {
	piercingMat = 8;
	areYouSure();
}
function chooseLethite():void {
	piercingMat = 9;
	areYouSure();
}
function chooseFertite():void {
	piercingMat = 10;
	areYouSure();
}
function chooseFurrite():void {
	piercingMat = 11;
	areYouSure();
}
function chooseCrimstone():void {
	piercingMat = 12;
	areYouSure();
}

function areYouSure():void {
	spriteSelect(63);
	outputText("Yara says, \"<i>Ok, last chance to back out, are you sure you want to go ahead with this?  Remember, once I put it in, it's permanent.</i>\"", true);
	doYesNo(2230,2212);
}
	//9. Lethite (Demon Lure)
	//10. Fertite (Fertility Booster)
	//11. Furrite (Attracts Furries)
	//12. Crimstone - + min lust
function chooseAdvancedMaterials():void {
	spriteSelect(63);
	outputText("Yara goes back into the back and comes out with a gilded tray full of exotic materials.  She hands you a brochure and asks, \"<i>Ok, now what am I going to be working with?</i>\"", true);
	outputText("\n\nThere's a number of materials listed here:", false);
	outputText("\n1. Lethite - Fake lethicite.  While beautiful, it's known to attract demons.", false);
	outputText("\n2. Fertite - A green gem sometimes fished up from the bottom of Mareth's great lake, it is said to enhance the fertility of both genders.", false);
	outputText("\n3. Furrite - This beautiful purple gem is actually crystalized from materials used in hunting lures.  It is said to enhance the wearer's appeal to beast-people.", false);
	outputText("\n4. Crimstone - Crimstone is said to be formed from volcanic fires, and to keep the fires of one's desires burning brightly.", false);
	outputText("\n\n<b>DISCLAIMER</b>: Yara's Piercing Studio is not responsible if the piercee's body absorbs any residual magic of these stones, and is not required to resolve any issues if the effects persist beyond removal.</b>", false);
	simpleChoices("Lethite",2251,"Fertite",2252,"Furrite",2253,"Crimstone",2254,"Back",2214);
}

function normalPierceAssemble():void {
	spriteSelect(63);
	outputText("Yara makes you comfortable and has you look away while she uses her piercing tools.  It hurts, but she's skilled and before you know it, your piercing is done!", true);
	//1. Amethyst (+1 int, +1 lib)
	//2. Diamond (+2 int, -1 cor)
	//3. Gold (+1 int, +1 sens)
	//4. Emerald (+1 spe)
	//5. Jade (+1 spe, -.5 tou)
	//6. Onyx (+1 tou, -1 spe)
	//7. Ruby (+1 lib, +1 sens)
	//8. Steel (+2 str, -2 int)
	//9. Lethite (Demon Lure)
	//10. Fertite (Fertility Booster)
	//11. Furrite (Attracts Furries)
	//12. Crimsonite (+Min Lust) 
	//13. 
	//var piercingMat:Number = 0;	
	var shortP:String = "";
	var longP:String = "";
	player.gems -= 100;
	if(piercingMat > 8) player.gems -= 900;
	statScreenRefresh();
	//set up material description
	switch(piercingMat) {
		case 1:
			shortP += "amethyst ";
			stats(0,0,0,1,1,0,0,0);
			longP += "Amethyst ";
			break;
		case 2:
			shortP += "diamond ";
			stats(0,0,0,2,0,0,0,-1);
			longP += "Diamond ";
			break;
		case 3:
			shortP += "gold ";
			stats(0,0,0,1,0,1,0,0);
			longP += "Gold ";
			break;
		case 4:
			shortP += "emerald ";
			stats(0,0,1,0,0,0,0,0);
			longP += "Emerald ";
			break;
		case 5:
			shortP += "jade ";
			stats(0,-.5,0,1,0,0,0,-1);
			longP += "Jade ";
			break;
		case 6:
			shortP += "onyx ";
			stats(0,1,-1,0,0,0,0,0);
			longP += "Onyx ";
			break;
		case 7:
			shortP += "ruby ";
			stats(0,0,0,0,1,1,0,0);
			longP += "Ruby ";
			break;
		case 8:
			shortP += "steel ";
			stats(2,0,0,-2,0,0,0,0);
			longP += "Steel ";
			break;
		case 9:
			shortP += "lethite ";
			if(player.hasPerk("Pierced: Lethite") < 0) player.createPerk("Pierced: Lethite",0,0,0,0,"You've been pierced with Lethite and demons are more attracted to you.");
			longP += "Lethite ";
			break;
		case 10:
			shortP += "fertite ";
			if(player.hasPerk("Pierced: Fertite") < 0) player.createPerk("Pierced: Fertite",5,0,0,0,"You've been pierced with Fertite and any male or female organs have become more fertile.");
			else player.addPerkValue("Pierced: Fertite",1,5);
			longP += "Fertite ";
			break;
		case 11:
			shortP += "furrite ";
			if(player.hasPerk("Pierced: Furrite") < 0) player.createPerk("Pierced: Furrite",0,0,0,0,"You've been pierced with Furrite and are more attractive to those who are part beast.");
			longP += "Furrite ";
			break;
		case 12:
			shortP += "crimstone ";
			if(player.hasPerk("Pierced: Crimstone") < 0) player.createPerk("Pierced: Crimstone",5,0,0,0,"You've been pierced with Crimstone and your lust seems to stay a bit higher than before.");
			else player.addPerkValue("Pierced: Crimstone",1,5);
			longP += "Crimstone ";
			break;
	}
	switch(piercingLoc) {
		/*
		0) **Clit (+2 sens)
		1) **Dick (+2 lib) adds the word 'pierced' sometimes to the description
		2) **Ears
		3) **Eyebrow (-.5 def)
		4) **Lip (-.5 def)
		5) **Nipples (+1 sens, +1 lib)
		6) **Nose (+.5 attack)
		7) **Tongue (+1 sens)
		8) **Vulva (+1 sens)*/
		//var piercingLoc:Number = 0;
		case 0:
			shortP += "clit-";
			longP += "clit-";
			stats(0,0,0,0,0,2,0,0);
			break;
		case 1:
			if(piercingType == 3) break;
			shortP += "cock-";
			longP += "cock-";
			stats(0,0,0,0,2,0,0,0);
			break;
		case 2:
			shortP += "ear";
			longP += "ear";
			break;
		case 3:
			stats(0,-.5,0,0,0,0,0,0);
			shortP += "eyebrow-";
			longP += "eyebrow-";
			break;
		case 4:
			stats(0,-.5,0,0,0,0,0,0);
			shortP += "lip-";
			longP += "lip-";
			break;
		case 5:
			stats(0,0,0,0,1,1,0,0);
			shortP += "nipple-";
			longP += "nipple-";
			break;
		case 6:
			stats(.5,0,0,0,0,0,0,0);
			shortP += "nose-";
			longP += "nose-";
			break;
		case 7:
			stats(0,0,0,0,0,1,0,0);
			shortP += "tongue-";
			longP += "tongue-";
			break;
		case 8:
			stats(0,0,0,0,0,1,0,0);
			shortP += "labia-";
			longP += "labia-";
			break
	}
	switch(piercingType) {
		//studs
		case 1:
			//multiples
			if(piercingLoc == 2 || piercingLoc == 5 || piercingLoc == 8) {
				shortP += "studs";
				longP += "studs";
			}
			else {
				shortP += "stud";
				longP += "stud";
			}
			break;
		//2. Ring (Called prince albert on dick)
		case 2:
			//multiples
			if(piercingLoc == 2 || piercingLoc == 5 || piercingLoc == 8) {
				shortP += "rings";
				longP += "rings";
			}
			else {
				shortP += "ring";
				longP += "ring";
			}
			break;
		//3. Jacobs Ladder (dick only)
		case 3:
			shortP += "jacob's ladder";
			longP += "jacob's ladder";
			break;
		//4. Hoop (ears/nipples/clit)
		case 4:
			//multiples
			if(piercingLoc == 2 || piercingLoc == 5 || piercingLoc == 8) {
				shortP += "hoops";
				longP += "hoops";
			}
			else {
				shortP += "hoop";
				longP += "hoop";
			}
			break;
		//5. Chain (nipples only)	
		case 5:
			shortP += "chain";
			longP += "chain";
			break;
	}
	//Actually assign values to their real storage locations
	switch(piercingLoc) {
		/*
		0) **Clit (+2 sens)
		1) **Dick (+2 lib) adds the word 'pierced' sometimes to the description
		2) **Ears
		3) **Eyebrow (-.5 def)
		4) **Lip (-.5 def)
		5) **Nipples (+1 sens, +1 lib)
		6) **Nose (+.5 attack)
		7) **Tongue (+1 sens)
		8) **Vulva (+1 sens)*/
		//var piercingLoc:Number = 0;
		case 0:
			player.vaginas[0].clitPierced = piercingType;
			player.vaginas[0].clitPShort = shortP;
			player.vaginas[0].clitPLong = longP;
			break;
		case 1:
			player.cocks[0].pierced = piercingType;
			player.cocks[0].pShort = shortP;
			player.cocks[0].pLong = longP;
			break;
		case 2:
			player.earsPierced = piercingType;
			player.earsPShort = shortP;
			player.earsPLong = longP;
			break;
		case 3:
			player.eyebrowPierced = piercingType;
			player.eyebrowPShort = shortP;
			player.eyebrowPLong = longP;
			break;
		case 4:
			player.lipPierced = piercingType;
			player.lipPShort = shortP;
			player.lipPLong = longP;
			break;
		case 5:
			player.nipplesPierced = piercingType;
			player.nipplesPShort = shortP;
			player.nipplesPLong = longP;
			break;
		case 6:
			player.nosePierced = piercingType;
			player.nosePShort = shortP;
			player.nosePLong = longP;
			break;
		case 7:
			player.tonguePierced = piercingType;
			player.tonguePShort = shortP;
			player.tonguePLong = longP;
			break;
		case 8:
			player.vaginas[0].labiaPierced = piercingType;
			player.vaginas[0].labiaPShort = shortP;
			player.vaginas[0].labiaPLong = longP;
			break;
	}
	//Girls
	if(piercingLoc == 8 || piercingLoc == 0) {
		yaraSex();
		return;
	}
	//Dudes
	else if(piercingLoc == 1 && player.cockThatFits(36) >= 0) {
		yaraSex(false);
		return;
	}
	//Piercing shop main menu
	doNext(2212);
}

function specialPierceAssemble():void {
	
	
}

function piercingRemove():void {
	spriteSelect(63);
	hideUpDown();
	var clit:Number = 0;
	if(player.hasVagina()) {
		if(player.vaginas[0].clitPierced > 0) clit = 2241;
	}
	var dick:Number = 0;
	if(player.totalCocks() > 0) {
		if(player.cocks[0].pierced > 0) dick = 2242;
	}
	var ears:Number = 0;
	if(player.earsPierced > 0) ears = 2243;
	var eyebrow:Number = 0;
	if(player.eyebrowPierced > 0) eyebrow = 2244;
	var lip:Number = 0;
	if(player.lipPierced > 0) lip = 2245;
	var nipples:Number = 0;
	if(player.nipplesPierced > 0) nipples = 2246;
	var nose:Number = 0;
	if(player.nosePierced > 0) nose = 2247;
	var tongue:Number = 0;
	if(player.tonguePierced > 0) tongue = 2248;
	var vulva:Number = 0;
	if(player.hasVagina()) {
		if(player.vaginas[0].labiaPierced > 0) vulva = 2249;
	}
	if(clit + dick + ears + eyebrow + lip + nipples + nose + tongue + vulva == 0) {
		outputText("Yara giggles, \"<i>You don't have any piercings, silly!</i>\"", true);
		doNext(2212);
		return;
	}
	outputText("\"<i>Really?</i>\" asks Yara, \"<i>I told you those piercings are permanent!  Well, I suppose they CAN be removed, but you're gonna hurt like hell afterword.  If you really want me to, I can remove something, but it'll cost you 100 gems for the painkillers and labor.</i>\"", true);
	if(player.gems < 100) {
		outputText("\n\n<b>You do not have enough gems.</b>", false);
		doNext(2212);
		return;
	}
	if(player.tou <= 5.5) {
		outputText("Yara looks you up and down before refusing you outright, \"<i>You don't look so good " + player.short + ".  I don't think your body could handle it right now.</i>\"", true);
		doNext(2212);
		return;
	}
	choices("Clit",clit,"Dick",dick,"Ears",ears,"Eyebrow",eyebrow,"Lip",lip,"Nipples",nipples,"Nose",nose,"Tongue",tongue,"Labia",vulva,"Back",2212);
}

function removeClitPierce():void {
	spriteSelect(63);
	outputText("Yara gives you something to drink and you swiftly black out.  You awake about an hour later, sore and weak, though thankfully not bleeding.", true);
	player.vaginas[0].clitPierced = 0;
	player.vaginas[0].clitPShort = "";
	player.vaginas[0].clitPLong = "";
	stats(0,-5,0,0,0,0,0,0);
	player.gems -= 100;
	statScreenRefresh();
	doNext(2212);
}

function removeCockPierce():void {
	spriteSelect(63);
	outputText("Yara gives you something to drink and you swiftly black out.  You awake about an hour later, sore and weak, though thankfully not bleeding.", true);
	player.cocks[0].pierced = 0;
	player.cocks[0].pShort = "";
	player.cocks[0].pLong = "";
	stats(0,-5,0,0,0,0,0,0);
	player.gems -= 100;
	statScreenRefresh();
	doNext(2212);
}

function removeEarsPierce():void {
	spriteSelect(63);
	outputText("Yara gives you something to drink and you swiftly black out.  You awake about an hour later, sore and weak, though thankfully not bleeding.", true);
	player.earsPierced = 0;
	player.earsPShort = "";
	player.earsPLong = "";
	stats(0,-5,0,0,0,0,0,0);
	player.gems -= 100;
	statScreenRefresh();
	doNext(2212);
}

function removeEyebrowPierce():void {
	spriteSelect(63);
	outputText("Yara gives you something to drink and you swiftly black out.  You awake about an hour later, sore and weak, though thankfully not bleeding.", true);
	player.eyebrowPierced = 0;
	player.eyebrowPShort = "";
	player.eyebrowPLong = "";
	stats(0,-5,0,0,0,0,0,0);
	player.gems -= 100;
	statScreenRefresh();
	doNext(2212);
}

function removeLipPierce():void {
	spriteSelect(63);
	outputText("Yara gives you something to drink and you swiftly black out.  You awake about an hour later, sore and weak, though thankfully not bleeding.", true);
	player.lipPierced = 0;
	player.lipPShort = "";
	player.lipPLong = "";
	stats(0,-5,0,0,0,0,0,0);
	player.gems -= 100;
	statScreenRefresh();
	doNext(2212);
}

function removeNipplesPierce():void {
	spriteSelect(63);
	outputText("Yara gives you something to drink and you swiftly black out.  You awake about an hour later, sore and weak, though thankfully not bleeding.", true);
	player.nipplesPierced = 0;
	player.nipplesPShort = "";
	player.nipplesPLong = "";
	stats(0,-5,0,0,0,0,0,0);
	player.gems -= 100;
	statScreenRefresh();
	doNext(2212);
}

function removeNosePierce():void {
	spriteSelect(63);
	outputText("Yara gives you something to drink and you swiftly black out.  You awake about an hour later, sore and weak, though thankfully not bleeding.", true);
	player.nosePierced = 0;
	player.nosePShort = "";
	player.nosePLong = "";
	stats(0,-5,0,0,0,0,0,0);
	player.gems -= 100;
	statScreenRefresh();
	doNext(2212);
}

function removeTonguePierce():void {
	spriteSelect(63);
	outputText("Yara gives you something to drink and you swiftly black out.  You awake about an hour later, sore and weak, though thankfully not bleeding.", true);
	player.tonguePierced = 0;
	player.tonguePShort = "";
	player.tonguePLong = "";
	stats(0,-5,0,0,0,0,0,0);
	player.gems -= 100;
	statScreenRefresh();
	doNext(2212);
}

function removeVulvaPierce():void {
	spriteSelect(63);
	outputText("Yara gives you something to drink and you swiftly black out.  You awake about an hour later, sore and weak, though thankfully not bleeding.", true);
	player.vaginas[0].labiaPierced = 0;
	player.vaginas[0].labiaPShort = "";
	player.vaginas[0].labiaPLong = "";
	stats(0,-5,0,0,0,0,0,0);
	player.gems -= 100;
	statScreenRefresh();
	doNext(2212);
}

function oswaldPawn():void {
	spriteSelect(47);
	outputText("", true);
	if(player.hasStatusAffect("Oswald") < 0) {
		outputText("Upon closer inspection, you realize the pawnbroker appears to be some kind of golden retriever.  He doesn't look entirely comfortable and he slouches, but he manages to smile the entire time.  His appearance is otherwise immaculate, including his classy suit-jacket and tie, though he doesn't appear to be wearing any pants.  Surprisingly, his man-bits are retracted.  ", false);
		if(player.cor < 75) outputText("Who would've thought that seeing someone NOT aroused would ever shock you?", false);
		else outputText("What a shame, but maybe you can give him a reason to stand up straight?", false);
		outputText("  His stand is a disheveled mess, in stark contrast to its well-groomed owner.  He doesn't appear to be selling anything at all right now.\n\n", false);
		outputText("The dog introduces himself as Oswald and gives his pitch, \"<i>Do you have anything you'd be interested in selling?  The name's Oswald, and I'm the best trader in Tel'Adre.</i>\"\n\n", false);
		outputText("(You can sell an item here, but Oswald will not let you buy them back, so be sure of your sales.)", false);
		player.createStatusAffect("Oswald",0,0,0,0);
	}
	else {
		outputText("You see Oswald fiddling with a top hat as you approach his stand again.  He looks up and smiles, padding up to you and rubbing his furry hands together.  He asks, \"<i>Have any merchandise for me " + player.mf("sir","dear") + "?</i>\"\n\n", false);
		outputText("(You can sell an item here, but Oswald will not let you buy them back, so be sure of your sales.)", false);		
	}
	eventParser(1065);
}


function anotherButton(button:int,nam:String,func,arg = -9000):int {
	if(button > 8) return 9;
	if(arg == -9000) addButton(button,nam,func);
	else addButton(button,nam,func,arg);
	button++;
	return button;
}
function barTelAdre():void {
	hideUpDown();
	var button:int = 0;
	outputText("", true);
	if(flags[LOPPE_DISABLED] == 0 && flags[LOPPE_MET] == 0 && rand(10) == 0) {
		loppeFirstMeeting();
		return;
	}	
	outputText("The interior of The Wet Bitch is far different than the mental picture its name implied.  It looks like a normal tavern, complete with a large central hearth, numerous tables and chairs, and a polished dark wood bar.  The patrons all seem to be dressed and interacting like normal people, that is if normal people were mostly centaurs and dog-morphs of various sub-species.  The atmosphere is warm and friendly, and ", false);
	if(player.humanScore() <= 3) outputText("despite your altered appearance, ", false);
	outputText("you hardly get any odd stares.  There are a number of rooms towards the back, as well as a stairway leading up to an upper level.", false);
	
	menu();	
	//AMILY!
	if(flags[AMILY_VISITING_URTA] == 1) {
		button = anotherButton(button,"Ask4Amily",eventParser,3187);
	}
	//DOMINIKA
	if(hours > 17 && hours < 20 && flags[150] != -1) {
		button = anotherButton(button,"Dominika",eventParser,2739);
	}
	//EDRYN!
	if(flags[EDRYN_BIRF_COUNTDOWN] == 0) {
		if(edrynBar()) {
			//Edryn panic appearance!
			if(flags[71] == 0 && flags[68] > 0 && flags[69] == 0) {
				outputText("\n\nEdryn smiles when she sees you and beckons you towards her.  Fear and some kind of frantic need are painted across her face, imploring you to come immediately.  Whatever the problem is, it doesn't look like it can wait.", false);
				doNext(2488);
				flags[71]++;
				return;
			}
			//Edryn re-preggers appearance!
			if(flags[71] == 0 && flags[69] > 0) {
				flags[71]++;
				outputText("\n\nEdryn smiles at you and yells, \"<i>Guess what " + player.short + "?  I'm pregnant again!</i>\"  There are some hoots and catcalls but things quickly die down.  You wonder if her scent will be as potent as before?", false);
			}
			//Edryn just had a kid and hasn't talked about it!
			else if(flags[72] == 1) {
				outputText("\n\nEdryn the centaur isn't pregnant anymore!  She waves excitedly at you, beckoning you over to see her.  It looks like she's already given birth to your child!", false);
			}
			//Mid-pregnancy appearance
			else if(flags[68] > 0) {
				outputText("\n\nEdryn is seated at her usual table, and chowing down with wild abandon.  A stack of plates is piled up next to her.  Clearly she has been doing her best to feed her unborn child.  She notices you and waves, blushing heavily.", false); 
			}
			//Appearance changes if has had kids
			else if(flags[69] > 0) {
				outputText("\n\nEdryn is seated at her usual place, picking at a plate of greens and sipping a mug of the local mead.  She looks bored until she sees you.  Her expression brightens immediately, and Edryn fiddles with her hair and changes her posture slightly.  You aren't sure if she means to, but her cleavage is prominently displayed in an enticing manner.", false);
			}
			else if(player.statusAffectv1("Edryn") < 3) {
				outputText("\n\nEdryn, the centauress you met at the gate, is here, sitting down at her table alone and sipping on a glass of wine.  You suppose you could go talk to her a bit.", false);
			}
			else outputText("\n\nEdryn the centauress is here, sipping wine at a table by herself.  She looks up and spots you, her eyes lighting up with happiness.  She gives you a wink and asks if you'll join her.", false);
			button = anotherButton(button,"Edryn",eventParser,2257);
		}
	}
	//HELIA
	if(player.gender > 0 && hours >= 14 && rand(2) == 0 && hours < 20 && flags[HEL_FUCKBUDDY] == 1 && !(flags[HEL_FOLLOWER_LEVEL] == 1 && flags[HEL_HARPY_QUEEN_DEFEATED]== 0)) {
		helAppearance();
		button = anotherButton(button,"Helia",eventParser,3355);
	}
	//NANCY
	if(auntNancy(false)) {
		auntNancy(true);
		if(flags[263] > 0) button = anotherButton(button,"Nancy",eventParser,2970);
		else button = anotherButton(button,"Barkeep",eventParser,2970);
	}
	else outputText("\n\nIt doesn't look like there's a bartender working at the moment.", false);
	
	//NIAMH
	if(hours >= 8 && hours <= 16 && flags[NIAMH_STATUS] == 0) {
		telAdreNiamh();
		if(flags[MET_NIAMH] == 0) button = anotherButton(button,"Beer Cat",eventParser,3524);
		else button = anotherButton(button,"Niamh",eventParser,3524);
	}
	//ROGAR #1
	if(flags[ROGAR_PHASE] == 3 && flags[ROGAR_DISABLED] == 0 && flags[ROGAR_FUCKED_TODAY] == 0) {
		button = anotherButton(button,"HoodedFig",eventParser,3373);
		//Wet Bitch screen text when Ro'gar phase = 3:
		outputText("\n\nYou notice a cloaked figure at the bar, though you're quite unable to discern anything else as its back is turned to you.", false);
	}
	//ROGAR #2
	else if(flags[ROGAR_PHASE] >= 4 && flags[ROGAR_DISABLED] == 0 && flags[ROGAR_FUCKED_TODAY] == 0) {
		button = anotherButton(button,"Rogar",eventParser,3374);
		//Wet Bitch bar text when Ro'gar phase = 4:
		outputText("\n\nRo'gar is here with his back turned to the door, wearing his usual obscuring cloak.", false);
	}
	//Scylla - requires dungeon shut down
	if(player.totalCocks() > 0 && player.hasStatusAffect("DungeonShutDown") >= 0) {
		//Scylla repeat
		//big dick!
		if(player.longestCockLength() >= 12) {
			if(flags[54] == 0) {
				outputText("\n\nThere is one nun sitting in a corner booth who catches your eye.  She sits straight-backed against the dark, wood chair, her thin waist accentuating the supple curve of her breasts. She's dressed in a black robe that looks a few sizes too small for her hips and wears a black and white cloth over her head.", false);
				button = anotherButton(button,"Nun",eventParser,2447);
			}
			else if(flags[54] == 1 && rand(5) == 0) {
				outputText("", true);
				scyllaRoundII();
				return;
			}
			else if(flags[54] == 2 && rand(5) == 0) {
				outputText("", true);
				scyllaRoundThreeCUM()
				return;
			}
			//Round 4 goes here
			else if(flags[54] == 3 && rand(5) == 0) {
				scyllaRoundIVGo();
				return;
			}
			//Round 6 - catscratch!
			else if(flags[54] == 5 && rand(5) == 0) {
				outputText("\n\nIt looks like Scylla is here but getting ready to leave.  You could check and see what the misguided nun is up to.", false);
				button = anotherButton(button,"Scylla",eventParser,2705);
			}
			//Round 5 - repeatable!
			else if(flags[54] >= 4 && (hours == 18 || hours == 19)) {
				outputText("\n\nYou see Scylla's white and black nun's habit poking above the heads of the other patrons. The tall woman seems unaware of her effect on those around her, but it's clear by the way people are crowding she's acquired a reputation by now. You're not sure what she's doing, but you could push your way through to find out.", false);
				button = anotherButton(button,"Scylla",eventParser,2563);
			}			
			//Round 2.5 Repeatable
			else if(flags[54] >= 2 && flags[FED_SCYLLA_TODAY] == 0 && hours >= 7 && hours <= 11) {
				outputText("\n\nIt looks like Scylla is milling around here this morning, praying as she keeps an eye out for someone to 'help'.");
				button = anotherButton(button,"Scylla",eventParser,3992);
			}
		}
	}
	//Nun cat stuff!
	if((hours > 8 || hours < 18) && player.hasKeyItem("Silver Kitty-Bell") >= 0) {
		catMorphIntr();
		button = anotherButton(button,"ScyllaCats",eventParser,3316);
	}
	//URTA	
	if(!urtaBusy() && flags[AMILY_VISITING_URTA] != 1 && hours < 15) {
		//Scylla + Urta sitting in a tree
		// SOME COMFORT     FUCKED URTA      NOT PISSED      DRUNK TIME    SCYLLA TO LV4    RANDOM CHANCE  HAS THIS HAPPENED BEFORE? SCYLLA REQS ->
		if(flags[13] == 0 && flags[12] > 2 && flags[11] > 0 && flags[31] < 1 && (urtaDrunk() || flags[143] > 0) && flags[54] >= 3 && rand(3) == 0 && (flags[143] == 0 || (flags[147] == 0 && flags[145] > 0)) && ((flags[143] > 0 && !urtaDrunk()) || player.balls > 0) && player.totalCocks() > 0 && !hasButton("Scylla") && !hasButton("ScyllaCats")) {
			if(flags[143] > 0) {
				outputText("\n\nUrta's usual place is vacant, though her table still holds a half-drank glass of water.  If it's anything like the last time this happened, she's snuck into a back room with Scylla to relieve some pressure.  It might not hurt to join in...", false);
			}
			else {
				if(flags[143] == 0) {
					outputText("\n\n<b>Though Urta would normally be here getting sloshed, her usual spot is completely vacant.  You ask around but all you get are shrugs and giggles.  Something isn't quite right here.  You see an empty bottle of one of her favorite brands of whiskey still rolling on her table, so she can't have been gone long.  Maybe she had guard business, or had to head to the back rooms for something?</b>", false);
				}
				else {
					outputText("\n\nUrta's usual place is vacant, though her table still holds a half-drank mug of something potent and alcoholic.  If it's anything like the last time this happened, she's snuck into a back room with Scylla to relieve some pressure.  It might not hurt to join in...", false);
				}
			}
			flags[13] = 4;
			button = anotherButton(button,"Back Room",eventParser,2697);
		}
		else if(urtaBarDescript()) {
			if(flags[URTA_INCUBATION_CELEBRATION] == 0 && flags[URTA_INCUBATION] > 0) {
				urtaIsHappyAboutPregnancyAtTheBar();
				return;
			}
			button = anotherButton(button,"Urta",eventParser,2284);
		}
	}
	//VALA
	if(purifiedFaerieBitchBar()) button = anotherButton(button,"Vala",eventParser,2621);
	
	addButton(9,"Leave",telAdreMenu);		
}

function oldbarTelAdre():void {
	hideUpDown();
	var edryn:Number = 0;
	var urta:Number = 0;
	var misc1:Number = 0;
	var misc1Name:String = "";
	outputText("", true);
	if(flags[LOPPE_DISABLED] == 0 && flags[LOPPE_MET] == 0 && rand(10) == 0) {
		loppeFirstMeeting();
		return;
	}	
	outputText("The interior of The Wet Bitch is far different than the mental picture its name implied.  It looks like a normal tavern, complete with a large central hearth, numerous tables and chairs, and a polished dark wood bar.  The patrons all seem to be dressed and interacting like normal people, that is if normal people were mostly centaurs and dog-morphs of various sub-species.  The atmosphere is warm and friendly, and ", false);
	if(player.humanScore() <= 3) outputText("despite your altered appearance, ", false);
	outputText("you hardly get any odd stares.  There are a number of rooms towards the back, as well as a stairway leading up to an upper level.", false);
	//Hours of operation decrease after birth
	if(!urtaBusy()) {
		if(edrynBar()) {
			//Edryn panic appearance!
			if(flags[71] == 0 && flags[68] > 0 && flags[69] == 0) {
				outputText("\n\nEdryn smiles when she sees you and beckons you towards her.  Fear and some kind of frantic need are painted across her face, imploring you to come immediately.  Whatever the problem is, it doesn't look like it can wait.", false);
				doNext(2488);
				flags[71]++;
				return;
			}
			//Edryn re-preggers appearance!
			if(flags[71] == 0 && flags[69] > 0) {
				flags[71]++;
				outputText("\n\nEdryn smiles at you and yells, \"<i>Guess what " + player.short + "?  I'm pregnant again!</i>\"  There are some hoots and catcalls but things quickly die down.  You wonder if her scent will be as potent as before?", false);
			}
			//Edryn just had a kid and hasn't talked about it!
			else if(flags[72] == 1) {
				outputText("\n\nEdryn the centaur isn't pregnant anymore!  She waves excitedly at you, beckoning you over to see her.  It looks like she's already given birth to your child!", false);
			}
			//Mid-pregnancy appearance
			else if(flags[68] > 0) {
				outputText("\n\nEdryn is seated at her usual table, and chowing down with wild abandon.  A stack of plates is piled up next to her.  Clearly she has been doing her best to feed her unborn child.  She notices you and waves, blushing heavily.", false); 
			}
			//Appearance changes if has had kids
			else if(flags[69] > 0) {
				outputText("\n\nEdryn is seated at her usual place, picking at a plate of greens and sipping a mug of the local mead.  She looks bored until she sees you.  Her expression brightens immediately, and Edryn fiddles with her hair and changes her posture slightly.  You aren't sure if she means to, but her cleavage is prominently displayed in an enticing manner.", false);
			}
			else if(player.statusAffectv1("Edryn") < 3) {
				outputText("\n\nEdryn, the centauress you met at the gate, is here, sitting down at her table alone and sipping on a glass of wine.  You suppose you could go talk to her a bit.", false);
			}
			else outputText("\n\nEdryn the centauress is here, sipping wine at a table by herself.  She looks up and spots you, her eyes lighting up with happiness.  She gives you a wink and asks if you'll join her.", false);
			if(edryn == 0) edryn = 2257;
		}
	}
	//Nun cat stuff!
	if((hours > 8 || hours < 18) && player.hasKeyItem("Silver Kitty-Bell") >= 0) {
		misc1Name = "ScyllaCats";
		misc1 = 3316;
		catMorphIntr();
	}
	//Scylla - requires dungeon shut down
	if(player.totalCocks() > 0 && player.hasStatusAffect("DungeonShutDown") >= 0) {
		//Scylla repeat
		//big dick!
		if(player.longestCockLength() >= 12) {
			if(flags[54] == 0) {
				outputText("\n\nThere is one nun sitting in a corner booth who catches your eye.  She sits straight-backed against the dark, wood chair, her thin waist accentuating the supple curve of her breasts. She's dressed in a black robe that looks a few sizes too small for her hips and wears a black and white cloth over her head.", false);
				misc1 = 2447;
				misc1Name = "Nun";
			}
			else if(flags[54] == 1 && rand(5) == 0) {
				outputText("", true);
				scyllaRoundII();
				return;
			}
			else if(flags[54] == 2 && rand(5) == 0) {
				outputText("", true);
				scyllaRoundThreeCUM()
				return;
			}
			//Round 4 goes here
			else if(flags[54] == 3 && rand(5) == 0) {
				scyllaRoundIVGo();
				return;
			}
			//Round 6 - catscratch!
			else if(flags[54] == 5 && rand(5) == 0) {
				outputText("\n\nIt looks like Scylla is here but getting ready to leave.  You could check and see what the misguided nun is up to.", false);
				misc1Name = "Scylla";
				misc1 = 2705;
			}
			//Round 5 - repeatable!
			else if(flags[54] >= 4 && (hours == 18 || hours == 19)) {
				outputText("\n\nYou see Scylla's white and black nun's habit poking above the heads of the other patrons. The tall woman seems unaware of her effect on those around her, but it's clear by the way people are crowding she's acquired a reputation by now. You're not sure what she's doing, but you could push your way through to find out.", false);
				misc1Name = "Scylla";
				misc1 = 2563;
			}			
			//Round 2.5 Repeatable
			else if(flags[54] >= 2 && flags[FED_SCYLLA_TODAY] == 0 && hours >= 7 && hours <= 11) {
				outputText("\n\nIt looks like Scylla is milling around here this morning, praying as she keeps an eye out for someone to 'help'.");
				misc1Name = "Scylla";
				misc1 = 3992;
			}
		}
	}
	if(hours >= 8 && hours <= 16 && (misc1 == 0 || (rand(2) == 0 && misc1 != 2705)) && flags[NIAMH_STATUS] == 0) {
		telAdreNiamh();
		if(flags[MET_NIAMH] == 0) misc1Name = "Beer Cat";
		else misc1Name = "Niamh";
		misc1 = 3524;
	}
	var hel:Number = 0;
	if(player.gender > 0 && hours >= 14 && rand(2) == 0 && hours < 20 && flags[HEL_FUCKBUDDY] == 1 && (!followerHel() || flags[HEL_HARPY_QUEEN_DEFEATED] == 1)) {
		helAppearance();
		hel = 3355;
	}
	//Everyone's favorite Vala!
	var vala:Number = 0;
	//Backroom urta
	var backroom:Number = 0;
	var backroomT:String = "Backrooms";
	if(purifiedFaerieBitchBar()) vala = 2621;
	if(!urtaBusy() && flags[AMILY_VISITING_URTA] != 1 && hours < 15) {
		//Scylla + Urta sitting in a tree
		// SOME COMFORT     FUCKED URTA      NOT PISSED      DRUNK TIME    SCYLLA TO LV4    RANDOM CHANCE  HAS THIS HAPPENED BEFORE? SCYLLA REQS ->
		if(flags[13] == 0 && flags[12] > 2 && flags[11] > 0 && flags[31] < 1 && (urtaDrunk() || flags[143] > 0) && flags[54] >= 3 && rand(3) == 0 && (flags[143] == 0 || (flags[147] == 0 && flags[145] > 0)) && ((flags[143] > 0 && !urtaDrunk()) || player.balls > 0) && player.totalCocks() > 0 && misc1Name != "Scylla") {
			if(flags[143] > 0) {
				outputText("\n\nUrta's usual place is vacant, though her table still holds a half-drank glass of water.  If it's anything like the last time this happened, she's snuck into a back room with Scylla to relieve some pressure.  It might not hurt to join in...", false);
			}
			else {
				if(flags[143] == 0) {
					outputText("\n\n<b>Though Urta would normally be here getting sloshed, her usual spot is completely vacant.  You ask around but all you get are shrugs and giggles.  Something isn't quite right here.  You see an empty bottle of one of her favorite brands of whiskey still rolling on her table, so she can't have been gone long.  Maybe she had guard business, or had to head to the back rooms for something?</b>", false);
				}
				else {
					outputText("\n\nUrta's usual place is vacant, though her table still holds a half-drank mug of something potent and alcoholic.  If it's anything like the last time this happened, she's snuck into a back room with Scylla to relieve some pressure.  It might not hurt to join in...", false);
				}
			}
			flags[13] = 4;
			if(misc1Name == "Scylla") misc1 = 0;
			urta = 0;
			backroom = 2697;
			flags[13] = 4;
		}
		else if(urtaBarDescript()) {
			if(flags[URTA_INCUBATION_CELEBRATION] == 0 && flags[URTA_INCUBATION] > 0) {
				urtaIsHappyAboutPregnancyAtTheBar();
				return;
			}
			urta = 2284;
		}
		else urta = 0;
	}
	//Ask about Amily!
	if(flags[AMILY_VISITING_URTA] == 1) {
		backroom = 3187;
		backroomT = "Ask4Amily";		
	}
	var dominika:Number = 0
	if(hours > 17 && hours < 20 && flags[150] != -1) {
		dominika = 2739;
		fellatrixBarAppearance();
	}

	var nancy:Number = 0;
	var nancyText:String = "Barkeep";
	if(auntNancy(false)) {
		auntNancy(true);
		if(flags[263] > 0) nancyText = "Nancy";
		nancy = 2970;
	}
	else outputText("\n\nIt doesn't look like there's a bartender working at the moment.", false);
	
	var rogarB:Number = 0;
	var rogarT:String = "HoodedFig";
	if(flags[ROGAR_PHASE] == 3 && flags[ROGAR_DISABLED] == 0 && flags[ROGAR_FUCKED_TODAY] == 0) {
		rogarB = 3373;
		//Wet Bitch screen text when Ro'gar phase = 3:
		outputText("\n\nYou notice a cloaked figure at the bar, though you're quite unable to discern anything else as its back is turned to you.", false);
	}
	else if(flags[ROGAR_PHASE] >= 4 && flags[ROGAR_DISABLED] == 0 && flags[ROGAR_FUCKED_TODAY] == 0) {
		rogarB = 3374;
		rogarT = "Rogar";
		//Wet Bitch bar text when Ro'gar phase = 4:
		outputText("\n\nRo'gar is here with his back turned to the door, wearing his usual obscuring cloak.", false);
	}		
	var kath:Number = 0;
	choices("Dominika",dominika,"Edryn",edryn,"Hel",hel,misc1Name,misc1,nancyText,nancy,rogarT,rogarB,"Urta",urta,"Vala",vala,"Backroom",backroom,"Leave",2211);
}

function tailorShoppe():void {
	outputText("", true);
	spriteSelect(61);
	outputText("The inside of the tailor's shop is far cleaner than anything else you've seen in the city.  The walls are painted muted gray, and the floor is carpeted with a sprawling, royal blue rug.  After glancing around, you realize WHY the walls and floor are so muted – the quiet backdrop makes the merchandise look even more amazing.  There are racks and racks of clothing, but much of it is plain comfortable clothing, and not worth spending much time investigating.  A high-pitched voice pipes up, \"<i>Can I help you?</i>\"\n\n", false);
	if(player.hasStatusAffect("Victoria") < 0) {
		outputText("You turn around, ", false);
		if(player.tallness > 60) outputText("looking for the source, eventually looking down and at a short but busty Corgi dog-girl.  ", false);
		else outputText("coming face to face with a busty Corgi dog-girl.  ", false);
		outputText("She's clearly the tailor judging by her stylish, low-cut clothing and poofy hat.  A monocle perches on her nose, giving her a rather distinguished appearance.  The fashionable wench arches her back, showing off what she's got as she introduces herself, \"<i>Ello love, welcome to my shop.  My name's Victoria, though if you like, you can call me Vicky.  You'll find my clothing to be a cut above the rubbish sold elsewhere.</i>\"", false);
		//Flag as meeting her
		player.createStatusAffect("Victoria",0,0,0,0);
	}
	else {
		outputText("You turn around to look ", false);
		if(player.tallness > 60) outputText("down ", false);
		outputText("at Victoria the Corgi Tailor.  As usual, she's dressed in a stylish low-cut dress and sporting her feathery hat.", false);
	}
	outputText("\n\n(What do you want to buy?)", false);
	choices("Suitclothes",1075,"Rbbr Fetish",1076,"G. Clothes",1077,"Tube Top",1078,"Overalls", 1079,"Long Dress",1080,"Bodysuit",1081,"Robes",1082,"T.Lthr Pants",1083,"Leave",2211);
}


function buyClothes():void {
	outputText("", true);
	spriteSelect(61);
	outputText("Victoria nods and pulls a measuring tape off her shoulder.  She moves around you with practiced ease, taking measurements from every conceivable angle.  Thanks to her small stature, it's quite easy for her to take your inseam measurement, though Vicky manages to ", false);
	if(player.biggestCockArea() > 30 || player.totalCocks() > 1) outputText("fondle your bulging package", false);
	else if(player.hasVagina()) outputText("rub against your outer lips", false);
	else outputText("slip a finger along your crotch", false);
	outputText(" more than a few times.  You could swear you catch her licking her lips when she stands up, but she quickly turns away, saying, \"<i>I've got one in the back that should fit perfectly!  Be right with you!</i>\"\n\n", false);
	outputText("She disappears in the back for a few moments, then returns with " + itemLongName(shortName) + " that looks as if it were tailor-made for you.\n\n", false);
	outputText("\"<i>" + itemValue(shortName) + " gems and it can be yours,</i>\" she says.  ", false);
	if(player.gems < itemValue(shortName)) {
		outputText("You count out your gems and realize it's beyond your price range.", false);
		//Goto shop main menu
		doNext(1072);
		return;
	}
	//Go to debit/update function or back to shop window
	if(player.hasCock() && player.lust >= 33) simpleChoices("Yes",1074,"No",1072,"",0,"",0,"Flirt",3746);
	else doYesNo(1074,1072);
}

function debitClothes():void {
	spriteSelect(61);
	player.gems -= itemValue(shortName);
	statScreenRefresh();
	menuLoc = 10;
	takeItem();
}

function armorShop():void {
	outputText("", true);
	spriteSelect(64);
	outputText("The interior of the armory is blisteringly hot, filled with intense heat from the massive forge dominating the far side of the shop.  The bellows are blowing hard as a tall german-shepherd woman works the forge.  Incredibly, she's wearing nothing aside from a ragged leather apron.  It bulges from the front, barely containing her obscene proportions as it protects them from the heat of her forge.  She pulls a piece of metal from the forge and strikes it a few times with a hammer bigger than your head, then tosses it in a bucket filled with water, steam boiling out of it from the hot metal.  At last, the sweating forgemistress notices you and turns around, her breasts jiggling wildly.\n\n", true);
	//outputText("\"<i>Vat can Yvonne make for you?  Ze platemail?  Or someting a bit lighter?</i>\" she asks you.", false);
	outputText("\"<i>What can I make for you?  Platemail?  Or something that breathes a little easier?</i>\" Yvonne asks, fanning herself.");
	
	var egg:Number = 0;
	if(player.hasKeyItem("Dragon Eggshell") >= 0) {
		outputText("\n\nThough the pieces on display have their arguable attractions, none of them really interest you.  Yvonne taps her foot impatiently.  \"<i>Well, I could make you something to order... if you have any decent materials, cutie.  200 gems.</i>\"");
		if(player.gems < 200) {
			outputText("\n\nYou can't afford that!");
		}
		else egg = 3697;
	}
	choices("ChBikni",2276,"FullChn",2277,"FullPlt",2278,"IndecSt",2279,"LthrRob",2280,"ScaleMl",2281,"",0,"Eggshell",egg,"Flirt",3459,"Leave",2211);
}

function weaponShop():void {
	outputText("", true);
	spriteSelect(80);
	outputText("The high pitched ring of a steel hammer slamming into hot metal assaults your ears as you walk up to the stand.  Sparks are flying with every blow the stand's owner strikes on his current work.  The metal is glowing red hot, and the hammer falls with the relentless, practiced precision of an experienced blacksmith's guiding hand.  Thick gray and white fur ruffles as the blacksmith stands up, revealing the details of his form to you.  He's one of the dog-people that inhabits this city, though his fur and ears remind you of a dog one of your friends had growing up called a husky.  The blacksmith is anything but husky.  He's fairly short, but lean and whip-cord tough.  His right arm is far more thickly muscled than his left thanks to his trade, and he walks with a self-assured gait that can only come with age and experience.\n\n", false);
	
	outputText("His piercing blue eyes meet yours as he notices you, and he barks, \"<i>Buy something or fuck off.</i>\"\n\nWhat do you buy?", false);
	
	choices("Wingstick",2556,"L.Claymore",2557,"Warhammer",2558,"Katana",2559,"Spear",2560,"Whip",2561,"W. Staff",2554,"S.Gauntlet",2562,"",0,"Leave",2211);
}
function weaponBuy():void {
	outputText("", true);
	spriteSelect(80);
	outputText("The gruff metal-working husky gives you a slight nod and slams the weapon down on the edge of his stand.  He grunts, \"<i>That'll be " + itemValue(shortName) + " gems.</i>\"", false);
	if(player.gems < itemValue(shortName)) {
		outputText("\n\nYou count out your gems and realize it's beyond your price range.", false);
		//Goto shop main menu
		doNext(2553);
		return;
	}
	else outputText("\n\nDo you buy it?\n\n", false);
	//Go to debit/update function or back to shop window
	doYesNo(2555,2553);
}
function debitWeapon():void {
	spriteSelect(80);
	player.gems -= itemValue(shortName);
	statScreenRefresh();
	menuLoc = 15;
	takeItem();
}
function armorBuy():void {
	spriteSelect(64)
	outputText("", true);
	outputText("Yvonne gives you a serious look, then nods.  She pulls the armor off a rack and makes a few adjustments, banging away with her massive hammer to ensure a perfect fit.  The entire time, she's oblivious to the movements of her massive breasts, accidentally exposing her impressive nipples multiple times.\n\n", false);
	outputText("She finishes and turns to you, smiling broadly, \"<i>Now, that will be " + itemValue(shortName) + " gems, unless you want to change your mind?</i>\"", false);
	if(player.gems < itemValue(shortName)) {
		outputText("\n\nYou count out your gems and realize it's beyond your price range.", false);
		//Goto shop main menu
		doNext(2274);
		return;
	}
	else outputText("\n\nDo you buy it?", false);
	//Go to debit/update function or back to shop window
	doYesNo(2282,2274);
}

function debitArmor():void {
	spriteSelect(64)
	outputText("", true);
	player.gems -= itemValue(shortName);
	statScreenRefresh();
	menuLoc = 9;
	takeItem();
}

function urtaIsABadass():void {
	flags[33] = 1;
	outputText("", true);
	outputText("There's a commotion in the streets of Tel'Adre.  A dense crowd of onlookers has formed around the center of the street, massed together so tightly that you're unable to see much, aside from the backs the other onlookers' heads.  The sound of blows impacting on flesh can be heard over the crowd's murmuring, alerting you of the fight at the gathering's core.", false);
	simpleChoices("Investigate",2360,"Who cares?",2211,"",0,"",0,"",0);
}

//[Invetigate]
function watchUrtaBeABadass():void {
	outputText("", true);
	spriteSelect(1);
	outputText("You shoulder past the bulky centaurs, ignore the rough fur of the nearby wolves and hounds as it brushes against you, and press your way through to the center of the crowd.  Eventually the throng parts, revealing the embattled combatants.  A snarling wolf, nearly eight feet tall, towers over Urta.  The comparatively diminutive fox-woman is girded in light leather armor and dripping with sweat.  The larger wolf-man is staggering about, and his dark brown fur is matted with blood.\n\n", false);
	
	outputText("The bigger canid charges, snarling, with his claws extended.  Urta sidesteps and pivots, her momentum carrying her foot around in a vicious kick.  Her foot hits the side of the beast's knee hard enough to buckle it, and the wolf goes down on his knees with an anguished cry.  Urta slips under his arm and twists, turning his slump into a fall.  A cloud of dust rises from the heavy thud of the beast's body as it slams into the cobblestone street.\n\n", false);
	
	outputText("Now that it's immobile, you get can get a better look at the defeated combatant, and you're ", false);
	if(player.hasStatusAffect("infested") >= 0) outputText("aroused", false);
	else if(player.cor < 50) outputText("horrified", false);
	else outputText("confused", false);
	outputText(" by what you see.  A pair of thick, demonic horns curve back over the beast's head, piercing through the bottoms of its wolf-like ears.  Its entire body is covered in rippling muscle, leaving you in no doubt of its strength.  Even with a broken knee, the wolf-man is clearly aroused: protruding from a bloated sheath, his massive dog-dick is fully erect, solid black in color, with an engorged knot.  Small white worms crawl over the surface of his penis, wriggling out of the tip and crawling down the length, leaving trails of slime behind them.\n\n", false);
	
	outputText("Urta kneels down onto the corrupted wolf's throat, cutting off its air as it foams and struggles under her.  With grim determination, she holds the weakening, demonically-tainted wolf underneath her, leaning all of her body-weight into her knee to keep it down.  It struggles for what seems like ages, but eventually the tainted wolf's eyes roll closed.  Urta nods and rises, watching closely as the beast's breathing resumes.\n\n", false);
	
	outputText("She barks, \"<i>Get this one outside the walls before he wakes.  I won't have this corrupted filth in our city, and make sure you get the wards updated.  If he manages to find his way back, you sorry excuses for guards will be going out with him.</i>\"\n\n", false);
	outputText("A few dog-morphs in similar armor to Urta approach and lash ropes around the wolf's legs.  They hand a line to a centaur, and together the party begins dragging the unconscious body away.  With the action over, the crowd begins dispersing.  More than a few males nod to Urta respectfully.  She keeps her expression neutral and excuses herself to resume her rounds, wiping her hands off on her armor-studded skirt as she leaves.", false);
	doNext(2211);
}

function gymDesc():void {
	//PREGGO ALERT!
	if(flags[PC_IS_A_GOOD_COTTON_DAD] + flags[PC_IS_A_DEADBEAT_COTTON_DAD] == 0 && flags[COTTON_PREGNANCY_INCUBATION] > 0) {
		cottonPregnantAlert();
		return;
	}

	outputText("", true);
	outputText("Even though Ingnam, your hometown, was a large, prosperous village, you never saw a gym before coming to Tel'Adre.  The structure itself has numerous architectural differences from the surrounding buildings: short, waist-high walls, an arched ceiling supported by simple columns, and a sand-covered floor.  Perhaps the only 'normal' rooms inside are the changing stands and bathrooms, which ", false);
	if(player.cor < 35) outputText("thankfully ", false);
	else if(flags[23] > 0 || player.cor > 80) outputText("unfortunately ", false);
	outputText("have full sized walls to protect their users' privacy.  A breeze blows by, revealing that the open-air design provides great ventilation.  You note a wall of weights of different sizes and shapes, perfect for building muscle and bulking up.  There are also jogging tracks and even a full-sized, grass-covered track out back for centaurs to run on.  Though some of the equipment seems a bit esoteric in nature, you're sure you can make use of most of this stuff.\n\n", false);
	
	outputText("Though the gym sees heavy use by the city guard and various citizens, it's not too busy at present.", false);
	//(Add possible character descripts here)
	//(An extraordinarily well-muscled centaur male is by the weights, lifting some huge dumbbells and sweating like crazy.  In true centaur fashion, he's not wearing any clothes, but then again, male centaurs don't have much that regular clothes would hide.)
	//(There's a lizan girl jogging laps on one of the tracks.  She's quite thin, but her muscles have a lean definition to them.  She's wearing a one-piece, spandex leotard that hugs her tight ass and pert, b-cup breasts nicely.)  
	outputText("  There's a centauress in a tank-top just inside the doorway with huge, rounded melons and perky nipples, but she merely coughs to get you to look up and says, \"<i>", false);
	if(flags[167] == 0) outputText("10 gems an hour to use the facilities here, or 500 for a life-time membership.</i>\"  She has her hands on her hips, and it looks you'll have to pay ten gems to actually get to use any of this stuff.", false);
	else outputText("Oh, welcome back " + player.short + ".  Have a nice workout!</i>\"", false);
	
	if(player.gems < 10 && flags[167] == 0) {
		outputText("\n\n<b>You reach into your pockets for the fee and come up empty.  It looks like you won't get close to enough to use the equipment or meet anyone.  Damn!</b>", false);
		//(back to tel'adre streets)
		doNext(2211);
		return;
	}
	lottieAppearance();
	if(flags[LOPPE_MET] > 0 && flags[LOPPE_DISABLED] == 0) {
		outputText("\n\nYou spot Loppe the laquine wandering around, towel slung over her shoulder.  When she sees you, she smiles and waves to you and you wave back.");
	}
	if(hours > 9 && hours < 14) heckelAppearance();
	gymMenu();
}

function gymMenu():void {
	
	var membership:Number = 0;
	var cotton:Number = 0;
	var cottonB:String = "Horsegirl";
	var hyena:Number = 0;
	var hyenaB:String = "Hyena";
	var ifris:Number = 0;
	var ifrisB:String = "Girl";
	var lottie:Number = lottieAppearance(false);
	var lottieB:String = "Pig-Lady";
	var loppe:int = 0;
	if(flags[281] > 0) lottieB = "Lottie";
	if(ifrisIntro()) ifris = 2845;
	if(flags[205] > 0) ifrisB = "Ifris";
	if(hours > 9 && hours <= 15) {
		hyena = 2844;
		if(flags[204] > 0) hyenaB = "Heckel";
	}
	if(flags[167] == 0 && player.gems >= 500) membership = 2784;
	if(flags[PC_IS_A_DEADBEAT_COTTON_DAD] == 0) {
		if(cottonsIntro()) cotton = 2808;
	}
	if(flags[177] > 0) cottonB = "Cotton";
	if(flags[LOPPE_MET] > 0 && flags[LOPPE_DISABLED] == 0) loppe = 3976;
	
	choices("ChangeRoom",2821,cottonB,cotton,hyenaB,hyena,ifrisB,ifris,"Jog",2786,"LiftWeights",2785,"Life Member",membership,"Lottie",lottie,"Loppe",loppe,"Leave",2211);
}

function buyGymLifeTimeMembership():void {
	outputText("", true);
	//[Buy LifeTime Membership]
	outputText("You fish into your pouches and pull out 500 gems, dumping them into the centaur's hands.  Her eyes widen as she turns and trots towards a counter in the back.  She leans over as she counts, giving you a generous view down her low-cut top at the cleavage she barely bothers to conceal.", false);
	if(player.hasCock()) {
		outputText("  It brings a flush to your face that has nothing to do with exercise.  Maybe you'll be able to con her into some alone time later?", false);
		stats(0,0,0,0,0,0,(10+player.lib/10),0);
	}
	flags[167] = 1;
	player.gems -= 500;
	statScreenRefresh();
	//[Bring up gym menu]
	gymMenu();
}

function weightLifting():void {
	outputText("", true);
	//Too tired?  Fuck off.
	if(player.fatigue > 75) {
		outputText("<b>There's no way you could exercise right now - you're exhausted!</b>  ", false);
		if(flags[167] == 0) outputText("It'd be better to save your money and come back after you've rested.", false);
		doNext(2211);
		return;
	}
	//Deduct gems if not a full member.
	if(flags[167] == 0) {
		player.gems -= 10;
		statScreenRefresh();
	}
	//[Lift Weights] +25 fatigue!
	fatigue(25);
	//TEXTS!
	outputText("You walk up to the weights and begin your workout.  ", false);
	//(< 25 str)
	if(player.str < 25) outputText("You have to start out on the smaller weights to the left side of the rack due to your strength, but even so, you manage to work up a good burn and a modest sweat.", false);
	//(< 40 str)
	else if(player.str < 40) outputText("You heft a few of the weights and select some of the ones just to the left of the middle.  It doesn't take you long to work up a sweat, but you push on through a variety of exercises that leave your body feeling sore and exhausted.", false);
	//(< 60 str)
	else if(player.str < 60) outputText("You smile when you grip a few of the heavier weights on the rack and start to do some lifts.  With a start, you realize you're probably stronger now than Ingnam's master blacksmith, Ben.  Wow!  This realization fuels you to push yourself even harder, and you spend nearly an hour doing various strength-building exercises with the weights.", false);
	//(<80 str)
	else if(player.str < 80) outputText("You confidently grab the heaviest dumbbells in the place and heft them.  It doesn't take long for you to work up a lather of sweat and feel the burn thrumming through your slowly tiring form.  The workout takes about an hour, but you feel you made some good progress today.", false);
	//(<90)
	else if(player.str < 90) outputText("You grab the heaviest weights they have and launch into an exercise routine that leaves you panting from exertion.  Setting the weights aside, you flex and marvel at yourself – you could probably arm wrestle a minotaur or two and come out victorious!", false);
	//(else)
	else outputText("This place barely has anything left to challenge you, but you take the heaviest weights you can get your mitts on and get to it.  By the time an hour has passed, you've worked up a good sweat, but without heavier weights you probably won't get any stronger.", false);
	//Stat changes HERE!
	if(player.str < 90) stats(.5,0,0,0,0,0,0,0);
	if(player.tou < 40) stats(0,.3,0,0,0,0,0,0);
	//Body changes here
	//Muscleness boost!
	outputText(player.modTone(85,5+rand(5)), false);
	outputText("\n\nDo you want to hit the showers before you head back to camp?", false);
	if(flags[BROOKE_MET] == 1) {
		menu();
		addButton(0,"\"Showers\"",eventParser,2827);
		addButton(1,"Showers",repeatChooseShower);
		addButton(4,"Leave",eventParser,13);
	}
	else doYesNo(2827,13);
}

function goJogging():void {
	outputText("", true);
	//Too tired?  Fuck off.
	if(player.fatigue > 70) {
		outputText("<b>There's no way you could exercise right now - you're exhausted!</b>  ", false);
		if(flags[167] == 0) outputText("It'd be better to save your money and come back after you've rested.", false);
		doNext(2211);
		return;
	}
	//Deduct gems if not a full member.
	if(flags[167] == 0) {
		player.gems -= 10;
		statScreenRefresh();
	}
	//[Jogging] +30 fatigue!
	fatigue(30);
	//Text!
	outputText("You hit the jogging track, ", false);
	//(<25 tou)
	if(player.tou < 25) outputText("but you get so winded you have to stop after a few minutes.  Determined to improve, you force yourself to stay at a fast walk until you can run again.", false);
	//(<40 tou)
	else if(player.tou < 40) outputText("but your performance isn't that great.  You nearly stop jogging a few times but manage to push through until you're completely exhausted.", false);
	//(<60 tou)
	else if(player.tou < 60) outputText("and you do quite well.  You jog around for nearly an hour, working up a healthy lather of sweat.  Even your " + player.legs() + " tingle and burn with exhaustion.", false);
	//(<80 tou)
	else if(player.tou < 80) outputText("and it doesn't faze you in the slightest.  You run lap after lap at a decent clip, working yourself until you're soaked with sweat and fairly tired.", false);
	//(<90 tou) 
	else if(player.tou < 90) outputText("and you have a terrific time.  You can keep yourself just below your sprinting speed for the entire time, though you work up a huge amount of sweat in the process.", false);
	//else) 
	else outputText("and it barely challenges you.  You run at a sprint half the time and still don't feel like you're improving in the slightest.  Still, you do manage to burn a lot of calories.", false);
	//Stat changes HERE!
	if(player.spe < 40) stats(0,0,.3,0,0,0,0,0);
	if(player.tou < 90) stats(0,.5,0,0,0,0,0,0);

	//If butt is over 15 guaranteed reduction
	if(player.buttRating >= 15) {
		outputText("\n\nAll that running must have done some good, because your " + buttDescript() + " feels a little less bouncy.", false);
		player.buttRating--;
	}
	else {
		if(player.buttRating >= 10 && rand(3) == 0) {
			outputText("\n\nThe jogging really helped trim up your " + buttDescript() + ".", false);
			player.buttRating--;
		}
		else if(player.buttRating >= 5 && rand(3) == 0) {
			outputText("\n\nYour " + buttDescript() + " seems to have gotten a little bit more compact from the work out.", false);
			player.buttRating--;
		}
		else if(player.buttRating > 1 && rand(4) == 0) {
			outputText("\n\nYour " + buttDescript() + " seems to have gotten a little bit more compact from the work out.", false);
			player.buttRating--;
		}
	}//If hips is over 15 guaranteed reduction
	if(player.hipRating >= 15) {
		outputText("\n\nIt feels like your " + hipDescript() + " have shed some pounds and narrowed.", false);
		player.hipRating--;
	}
	else {
		if(player.hipRating >= 10 && rand(3) == 0) {
			outputText("\n\nIt feels like your " + hipDescript() + " have shed some pounds and narrowed.", false);
			player.hipRating--;
		}
		else if(player.hipRating >= 5 && rand(3) == 0) {
			outputText("\n\nIt feels like your " + hipDescript() + " have shed some pounds and narrowed.", false);
			player.hipRating--;
		}
		else if(player.hipRating > 1 && rand(4) == 0) {
			outputText("\n\nIt feels like your " + hipDescript() + " have shed some pounds and narrowed.", false);
			player.hipRating--;
		}
	}
	
	//Thickness decrease!
	outputText(player.modThickness(1,5+rand(2)), false);
	//Muscleness boost!
	outputText(player.modTone(100,2+rand(4)), false);
	outputText("\n\nDo you want to hit the showers before you head back to camp?", false);
	if(flags[BROOKE_MET] == 1) {
		menu();
		addButton(0,"\"Showers\"",eventParser,2827);
		addButton(1,"Showers",repeatChooseShower);
		addButton(4,"Leave",eventParser,13);
	}
	else doYesNo(2827,13);
}

function yaraSex(girl:Boolean = true):void {
	spriteSelect(63);
	outputText("", true);
	outputText("Yara makes you comfortable and has you look away while she uses her piercing tools.  It hurts, but she's skilled. Before you know it, your piercing is done!  You move to rise, retaining a bit of modesty", false);
	if(flags[23] > 0) outputText(" despite the guilty thrill", false);
	outputText(".  \"<i>Hold it,</i>\" Yara commands softly, pressing her hand against your " + chestDesc() + " and pushing you back in your chair.  \"<i>Do you think I'll let you get away without some... field testing?</i>\"\n\n", false);

	outputText("She seems intent on getting some loving - would you like to turn her down, or will you let nature run its course?", false);
	//[not at all] [yeah baby]
	if(girl) simpleChoices("Turn down",2212,"Oh yeah!",3407,"",0,"",0,"",0);
	else simpleChoices("Turn down",2212,"Oh yeah!",3408,"",0,"",0,"",0);
}

function letsDoYaraSex(girl:Boolean = true):void {
	spriteSelect(63);
	outputText("", true);
	var x:Number = player.cockThatFits(36);
	outputText("Her eyes widen as you begin to ", false);
	if(player.lust < 50) outputText("protest", false);
	else outputText("speak", false);
	outputText(", neatly silencing you with the lust-filled fires simmering in her eyes.  \"<i>Call it quality testing,</i>\" she purrs.  Her free hand runs up and down your inner thigh, the ticklish teasing nearly making your head spin.  Licking her lips in anticipation, Yara wiggles out of her clothes and clambers onto the chair, kneeling on the armrests.  Due to her awkward posture, you find your gaze drifting to her wide-spread legs.  There, twinkling with a radiant luster, is nestled a golden ring, looped through her already-throbbing clit.  A blush darkens her cheeks as she notices your stare, but she seems almost empowered by it.\n\n", false);

	outputText("Yara's free hand slides down her belly - past the stud in her navel - down to her box.  Using two fingers, she spreads her lips apart, giving you a great view of both her glistening button-piercing and the fleshy recesses past it.  She bites her bottom lip gently", false);
	if(!girl && player.hasCock()) outputText(" as your " + cockDescript(x) + " rises to attention, her eyes fixed upon the stiffened tool.  You resist the urge to grab her thin-yet-girlish hips and power into her right then and there, curious enough to allow her teasing.", false);
	else outputText(" as a growing puddle of love stains the cushioned chair.  It takes most of your power to not drag her down and force her face into your box.", false);
	outputText("\n\n", false);

	outputText("She leans forward, planting you with a wet and lingering kiss.  She moves lower, kissing ", false);
	if(player.biggestTitSize() < 1) outputText("your chest", false);
	else outputText("your nipples, one at a time", false);
	outputText(" and smooching your belly.  Even with her racially characteristic flexibility, however, she's not able to get any lower from that angle.  \"<i>Hold this, dear,</i>\" she says somewhat snarkily, pivoting around and resting her ass against your " + chestDesc() + ".  In this new posture, Yara can easily have her way with your junk, and by the way her wagging tail keeps bopping you in the face you can tell she's excited.\n\n", false);

	outputText("Not content with simple penetration, it seems, the cat girl gets to work.", false);
	if(player.balls > 0) outputText("  Her dexterous fingertips brush against your " + ballsDescriptLight() + ", light and fluttery strokes that send shivers coursing through you.  The near-lack of contact is at least as titillating than the less-subtle Marethians you've come across.", false);
	outputText("  She scoots forward a bit, dragging her soaking cunt down your chest in an effort to reach your crotch.\n\n", false);
	
	//male
	if(!girl && player.hasCock()) {
		outputText("Yara's pursed lips touch down upon your cockhead, her head tilting from side to side as she vexingly and repeatedly kisses your " + cockDescript(x) + ".  However, she abruptly pauses, glancing sidelong at you expectantly.  When you don't immediately respond, she huffs a sigh - onto your dick - and raises her hips level with your nose.  After momentarily getting lost in the bouncing of her tight-yet-jiggly cheeks, you get the message, leaning forward and giving her puffy sex a long and lingering lick.  You're rewarded with a low-pitched and very satisfied groan.  Though you go in for another taste, the shining ring looped through her joy-buzzer attracts your oral attention like a magnet.  Gently as a newborn kitten, your teeth close down on the clit-embedded trinket.  Yara goes absolutely stiff as you begin to softly tug the piercing around, neatly paralyzed by the sensitivity.  Indistinguishable mewling tumbles from her mouth as she attempts to attune herself to your yanking antics.  Her lithe frame spasms in ecstasy, forcing you to release your grip on her, lest something unfortunate happen to her undercarriage.\n\n", false);

		outputText("As soon as you release her from the mind-numbing grasp, she whips her hips forward (spattering your " + player.armorName + " with her downpour of girlcum), leaning back and hastily lining herself up with your " + cockDescript(x) + ".  Only hesitating for a second to leak a bit of lubricant onto your eager shaft, she plummets downwards, not stopping until her ass slams against your pelvis.\n\n", false);
		
		outputText("Yara takes total control, her death-grip on the armrests giving her full coital maneuverability.  Despite the easy entry, you can't believe how well her sopping-wet folds squeeze against you.  For a long while the only sounds heard are the slapping of her cheeks and the studded-up cat girl's halting pants of pleasure.  \"<i>I wanna say... your new piercing... works like a charm,</i>\" she mutters between throaty groans.\n\n", false);

		outputText("Before you're even allowed to respond, Yara's pace quickens, her finish line in sight.  More than eager to help spur her on, your hands wrap around her slender waist.  She purrs in appreciation of your assistance.  It's not long before, with a victorious and primal scream, she throws all her weight downwards, splattering the mixture of pre-cum and femspunk and actually stinging you a bit with the force of her descent.\n\n", false);

		outputText("The powerful motion is all the motivation your body needs.  Before either of you can even consider the ramifications of an internal ejaculation, your bodies seize up, caught in the familiar grasp of orgasmic bliss.  ", false);
		
		//([cum quantity time, normal L/M/H/S quantities {IT'S A MARVEL REFERENCE} <no new paragraph>]
		//light and medium
		if(player.cumQ() < 500) outputText("Yara's entire frame spasms as your load paints her private passage with snowy-white seed.  The cat girl writhes happily, arching her spine so far back your eyes nearly meet.\n\nYara dismounts your dick and hops to the ground in one fluid movement.", false);
		//heavy
		else if(player.cumQ() <= 1500) outputText("Yara's belly visibly plumps with the quantity of cum you pour into her, the extra weight bending her over to rest heavily against your " + player.leg() + ".  She purrs happily, patting the distended gut even while the tremors of her own orgasm run through her.\n\nYara lifts herself off you, pressing a hand against her tummy as she somewhat ungracefully steps off the chair.", false);
		//special (super-big)
		else outputText("Her low-pitched ecstatic moans swiftly escalate to piercing shrieks as her taut belly quickly balloons to roughly beach ball-sized in moments.  With a huge effort, she manages to haul herself off your semen-pumping staff, falling back against you.  Sighing contentedly, Yara nestles herself into your " + chestDesc() + ", getting comfortable despite the seed drizzling from her overstuffed nethers.  You just sit there for a few minutes, waiting patiently as your ejaculatory rampage ceases.\n\nYara makes a noble attempt to rise that is ultimately thwarted by her huge fluid-filled belly.  Casting a sidelong sheepish grin at you, she giggles nervously.  \"<i>Mind helping me out here, friend?</i>\" she says after a moment's hesitation.  With your assistance, she rises and stands on wobbling feet.  She tries her best to compose herself with your cum still streaming down her thighs, the flow only intensifying as she impatiently presses against the bloated belly.", false);

		outputText("\n\n\"<i>Works like a charm,</i>\" she concludes as you both redress", false);
		if(player.cumQ() > 1500) outputText(", Yara trying her best to fit her clothes over the bump in her midsection", false);
		outputText(".  \"<i>Come back whenever, okay?  I'm sure we can arrange another... appointment!</i>\"", false);
		//ZA ENDO
	}
	//female
	else {
		outputText("A duo of errant forefingers run along the perimeter of your feminine fortress, your signal to prepare for a siege.  Yara reaches down off the side of your seat, pushing on a lever that sends the back of the chair down to about a 30º angle.  She grasps for the armrests of the chair next, promptly lifting her body up and going into what looks like a forward somersault.  Before you can complement the feat, her legs fly up either side of your head.   The only things to have made contact were her nimble feet, gently stroking their way up from your belly, past your chest, off of your shoulders and soaring beyond the back of the chair.  The feline acrobat calls for you to lay your hands open at the sides of the chair, an order you fulfill with due haste.  She wastes no time in seizing your upper arms, causing her body to slide forward off of you.  You return the favor by clasping onto her as well in the same manner, stopping her descent.\n\n", false);

		outputText("Trying to parse out the scene at play here is a fool's errand.  Yara must have done this before as your two sprawled out bodies have stopped in just the right fashion to make both of your fleshy orifices in plain view of one another's faces.  Air escapes your pursed lips as the \"<i>quality testing</i>\" commences on your " + vaginaDescript() + ", your kitty comrade going in tongue first towards your silken fringes.  ", false);
		if(player.wetness() >= 3) outputText("She may as well be licking a melting popsicle with how wet your snatch is.", false);
		else outputText("Your relatively dry perimeter makes for an easy target.", false);
		outputText("  Not to be outdone, your ambitious tongue moves in as if it has everything to prove, mirroring your partner's efforts. Both of your lapping endeavours are periodically interrupted by moaning or slight gasps, your grasps on one another only growing more tense.\n\n", false);

		outputText("Yara looks up - down in her case - at your " + clitDescript() + ", your feminine fragrance riling her up as if it were catnip. Your work on her box is interrupted as your pleasure buzzer gets the oral shebang of a lifetime, eliciting a knowing laugh from deep within your teammate's throat.  Yara's lucky you redouble your clamp on her arms rather than sending the poor woman sliding to the ground as your body writhes in satisfaction.  But this is war, and you'll be damned if you're weak enough to go straight for the crown jewel as she has. No, you go to town, redefining what it means to eat out a pussy.  Your laborious toil is rewarded as the kitten's assault on your button eases up.  Her hold begins to waver, however, forcing you to yank your prey towards you.  The movement pierces through her contentment, her armlock strengthening as the air fills with the sound of a duo of muffled moans.\n\n", false);

		outputText("Judging by the contortionist's wobbly embrace, you decide its the perfect time to go in for the kill.  Yara stands no chance as you pounce for her pierced clit, your tongue lodging itself between the loop and her love-button.  It takes all of her willpower to maintain the offensive on your nub nexus while standing firm in her grasp on your arms.  Your oral tugging and teasing proves to be the victor, however, marked by the femspunk making its way right onto your face.  The cocktail combined with the orgasmic-enhanced last ditch effort by Yara on your nether regions triggers your own satisfying outburst.  The chain reaction ends in both your couplings to falter, sending the feline sliding headfirst for the floor.\n\n", false);
	
		outputText("Her head stops short, though.  Through your gasping relief, you managed to lock onto her legs.  \"<i>Nice...nice catch,</i>\" is about all Yara manages to share before resuming her purring contentment upside down, limp arms spread across the floor.  After a minute or so, the two of you regain some sort of composure, but the spectacular gymnast from before can only bare to slink around on the ground as she reorients herself.  The most you need to do is fix the back of your chair, lifting it to a more comfortable height.  \"<i>Can you spare one more helping hand here, friend?</i>\" Yara requests, now having at least managed to at least sit up straight.  The two of you exchange a knowing glance as you lift the metal-worker back to her feet.", false);
	}
	stats(0,0,0,0,0,0,-100,0);
	doNext(2212);
}


//[Flirt]
function yvonneFlirt():void {
	spriteSelect(64)
	clearOutput();
	outputText("You step closer, glancing from her bulging, barely contained tits to her pouting lips and expressive, violet eyes.  A shock of sweat-matted auburn hair obscures part of her face, but the tall, buxom blacksmith nervously brushes it aside as she watches.  Once you're close enough to touch, you quietly and sincerely proclaim, \"<i>You're the most beautiful piece of craftsmanship in this entire store.</i>\"");
	outputText("\n\nYvonne steps back, and you swear you can see a blush blooming through her fur, a fiery glow of embarrassment that spreads to the upper curve of her immense mammaries.  She folds her arms over her apron, unintentionally smushing those gigantic tits closer together and deepening her cleavage into a canyon. An immense sigh causes the plush plateau to sway pendulously as Yvonne answers, \"<i>");
	stats(0,0,0,0,0,0,(10+player.lib/10),0);
	if(player.cockTotal() == 0 || player.tallness > 65 || player.cockThatFits(75) == -1) {
		outputText("Sorry, but you don't look like you'd be much fun.");
		outputText("</i>\"");
		doNext(2274);
		return;
	}
	if(flags[YVONNE_FUCK_COUNTER] == 0) outputText("Well, I could use a quick fuck.  If you meant what you said, go change the sign to say 'out' please.");
	else outputText("You want to go again, huh?  I do love working up a sweat...");
	outputText("</i>\"");
	//[Fuck] [Nevermind]
	simpleChoices("Fuck Her",3461,"Nevermind",3460,"",0,"",0,"",0);
}
//[Nevermind]
function backOutOfYvonneFuck():void {
	spriteSelect(64)
	clearOutput();
	outputText("You politely decline, not wanting to interrupt her work.  Yvonne sighs and begins to pump the bellows, muttering, \"<i>Then you'd better be buying something!</i>\"");
	doNext(2274);
}
//[Fuck]
function fuckYvonneInZeBlacksmith():void {
	spriteSelect(64)
	clearOutput();
	//X = cock that fits!
	var x:Number = player.cockThatFits(75);
	if(x < 0) x = 0;
	//Used for the new cock stuff
	var y:Number = x + 1;
	outputText("You walk over to the door and find a sign hanging in front of the window.  The side facing indoors has 'out' on it.  There's also a 'closed' sign hanging to the side of the doorframe.  You take the simple wood plaque in hand and flip it over - can't have anybody walking in on your sexual hijinks, can you?");
	outputText("\n\nA fuzzy, calloused hand grabs you by the scuff of the neck, lifts you off the ground and pushes you against the wall, slamming you into it forcefully enough that some weapons hanging nearby rattle dangerously.  A hot puff of breath hits your cheek, Yvonne's wet, canine nose bumping against your ear as she pants in your face.  She closes, and you feel her bare, sweat-soaked breasts sliding up and down your back, holding you up as firmly as her iron grip.  Yvonne's long, smooth tongue licks you from collarbone to chin, lapping up the sweat that's already starting to bead, the heat of the simmering forge-fires and your companion's well-warmed, powerful frame long since getting to you.");
	outputText("\n\nA distinctly feminine scent wafts up to your nostrils, intermingled with the blacksmith's own pungent body-odor, strong enough to make your head swim.  Yvonne's free hand begins removing your [armor], the blacksmith's confident motions suggesting she's had plenty of experience at this.  The aroma of the super-stacked bitch's estrus increases to the point where it nearly overpowers her salty sweat-smell, her nipples pressing hard into your back.  [EachCock] grows hard from from the forceful attention, pinned between the wall and your belly.  Finished with your gear, Yvonne nips your neck and says, \"<i>Nice package, ");
	if(player.cockArea(x) < 20) outputText("runt");
	else if(player.cockArea(x) < 40) outputText(player.mf("boy","girl"));
	else if(player.cockArea(x) < 60) outputText("big " + player.mf("boy","girl"));
	else outputText(player.mf("stud","breeder"));
	outputText(".</i>\"");
	outputText("\n\nThe forge-mistress abruptly releases you and steps away, the supporting cushion of her breasts no longer there to help balance you.  After a moment of confused stumbling, you catch yourself and turn around, curious as to just what the buxom bitch is about.");
	outputText("\n\nYvonne is on the ground on all fours.  Her tail is sticking nearly straight up, waving back and forth excitedly as she presents her curvy rump to you.  Surprisingly, her ass is much less muscular than her upper body, with a pair of pillowy buttcheeks that nearly conceal her soaked cunny from view.  You aren't sure if it's lubricant from her arousal, or sweat from working the forge all day, but Yvonne's thighs are absolutely drenched with moisture; a veritable slip n' slide of wetness that beckons you to bury your bone in the canine's feminine entrance.  She glances back over her shoulder, a submissive glint in her eyes as she begs, \"<i>Come on, be my alpha.  This bitch needs a hot, wet fuck.  Do it!</i>\"  What an odd dichotomy - one moment she's throwing you around, the next, begging to be mounted.  For all her power, it seems Yvonne still wants to be taken as a meek bitch.");
	outputText("\n\nYou sidle up to the larger woman and begin aligning [oneCock] with her mammoth buns, the sweltering, pheromone-laced stink pouring from her body making it difficult not to fall on top of her and rut.  Her huge tits are squished against the floor, squeezing out obscenely to either side of the blacksmith's lithe, muscular torso.  When you push inside, her slick wet cunt squeezes your [cock " + y + "] powerfully but affectionately.  Her potent vaginal muscles work your [cock " + y + "] over, tightly embracing your turgid dickflesh as you begin to fuck her properly, plowing her sweat and love-juice soaked folds even while you struggle to reach up for her incredible breasts.");
	outputText("\n\nYou get a handhold on the soft chest-flesh and begin to massage at what you can find, releasing appreciative moans from your partner.  Unfortunately, her furiously-wagging tail bludgeons you across the nose over and over, and you're forced to block it with one arm so that you can ream her snatch unimpeded by the woman's canine instincts.  She growls, but doesn't stop you.  You can see the muscles in her arms quivering, shaking, struggling to maintain her posture in spite of the overwhelming pleasure your [cock " + y + "] is inflicting upon her poor womanhood.");
	outputText("\n\nA shiver runs through the dog-morph's entire body, culminating in a cock-wringing contraction that ripples through her cunt, milking you with her slippery twat.  It works, and you lean over her prostrate form as you bottom out inside her, her sweat-matted fur smearing your face with her scent as you cum.  ");
	if(player.hasKnot(x)) outputText("Your knot fills, locking you inside her, securely blocking any escape for the jizz you're now filling her depths with.  Yvonne sighs dreamily, \"<i>Just right...</i>\" while spunk slides into her birth canal to infiltrate her womb.[if (cumQuantity > 500) \"  The pearly goop spatters into her womb with egg-inseminating force, filling her beyond her wildest expectations.\"][if (cumQuantity > 1000) \"  The blacksmith cries out in pain and pleasure, her belly rounding with your liquid, taking on a more pregnant, stuffed-silly look.\"][if (cumQuantity > 2000) \"  Thanks to your knot, not a single drop escapes, and soon Yvonne's belly is as fat as her tits, cum-bloated in the extreme, a sloshing auburn tub packed with ivory sperm.\"]");
	else outputText("Your jizz bubbles out to fill her depths, the spunk surging through her as it moves towards her womb.  Yvone sighs dreamily, \"<i>Ahhhh...</i>\" while you empty your [balls] inside her unprotected womanhood.[if (cumQuantity > 500) \"  The pearly goop spatters into her uterus with egg-inseminating force, filling the bitch beyond her wildest expectations.\"][if (cumQuantity > 1000) \"  The blacksmith cries out in pain and pleasure, her belly rounding with your liquid, looking positively pregnant.  Her twat begins to dribble sperm, creampied beyond belief.\"][if (cumQuantity > 2000) \"  Unfortunately, as your virility makes itself known, Yvonne's body hits its limit, and jets of ivory spooge squirt from all sides of her cunny, dribbling into a pearly puddle on the floor.\"]");
	//still no new pg
	outputText("  With a thoroughly cream-stuffed twat beneath you, you ");
	if(player.hasKnot(x)) outputText("pop");
	else outputText("pull");
	outputText(" out, accompanied by a exhalation of female pleasure.");
	outputText("\n\nYvonne staggers up on her footpaws, groaning the whole time, a trail of white dribbling on the floor behind her.  Her tail wags happily, and she grabs you, pulling you into her sweaty bosom as she affectionately squeezes your [butt].  You aren't released until you feel dizzy, half-suffocated by her preponderance of breast-tissues and potent pheromones.");
	outputText("\n\nYvonne tosses you your gear, and you dress in a daze.  Before you've completely finished, she's pushing you out into the street, covered in sex-stink and stumbling over your own [feet].  She calls out after you, \"<i>Thanks babe, I gotta mop this mess up!</i>\"");
	stats(0,0,0,0,0,-1,-100,0);
	flags[YVONNE_FUCK_COUNTER]++;
	doNext(13);
}

//*Typical buy text goes here. Options are now Yes/No/Flirt*
//[Flirt]
function flirtWithVictoria():void {
	clearOutput();
	var x:Number = player.cockThatFits(70);
	//if(x < 0) x = player.smallestCockIndex();
	var y:Number = x + 1;
	outputText("You take the clothes from her and give them a look over.  Setting them on the counter, you tell her that they're quite nice, but if she's interested you might have something that could fit in the back quite nicely as well.");
	
	if(x < 0) {
		outputText("\n\nVictoria smirks and answers, \"<i>I measured your inseam, and what you're packing in there won't fit anywhere in a girl like me.  Maybe some other time, " + player.mf("studmuffin","sweet thing") + ".  Did you actually want to buy?</i>\"\n\nDo you still want to buy?");
		doYesNo(1074,1072);
		return;
	}
	outputText("\n\nIt takes her a moment to realize just what it is you're suggesting before her face splits into a wide grin.  <i>\"That right?  Well now, you can't say things like that without backin' 'em up, can you?\"</i>  she says with a low chuckle, pressing her curvy body into you.  <i>\"What do you say, I close the shop up quick, and you can show me just 'ow nicely you can fit, mm?\"</i>");

	outputText("\n\nGiving your [butt] a squeeze, she hops off to turn the shop's open sign around and locks the door before closing all of the curtains.  Turning back to you, she pushes her ample cleavage up into ");
	if(player.tallness >= 65) outputText("your stomach.");
	else if(player.tallness >= 55) outputText("your chest.");
	else outputText("your face.");
	outputText("  <i>\"Now then,  let's see what you've got!\"</i>  With practiced ease she works the bottom of your [armor] off, revealing [eachCock].  <i>\"Well, well. Looks like I was right about you from the start,\"</i> she says, licking her lips again.  <i>\"Just a taste first, I think...\"</i> Sticking her tongue out once more, she gives your rapidly stiffening dick a long, slow lick from the base up to the tip.  She closes her mouth just around your [cockHead " + y + "], giving it a few rapid licks before pulling off with a pop.");
	
	outputText("\n\n<i>\"Oh yes,  I think you'll do rather nicely.  In fact, I think I'm going to give you a special treat.\"</i>  Smirking up at you, the busty dog-girl unbuttons her top just beneath her ample chest.  Before you can puzzle out what it is she's doing, she takes your [cock] and stuffs it into the hole and up through her cleavage");
	if(player.cocks[x].cockLength >= 5) outputText(" until the tip is poking out the top");
	outputText(".");
	if(player.cocks[x].cockThickness > 3) outputText("  Her face scrunches up uncomfortably for a moment, your girth straining the seams of her shirt.  With a series of loud pops, her buttons all go flying in different directions, letting her ample, creamy flesh bounce free with a bountiful jiggle.  <i>\"Bloody hell, that was my favorite top...\"</i> she whines for a moment before squeezing her chest back together with her hands.");
	else outputText("  She presses her arms inward to increase the pressure on your cock even further, and gives you another wide smile.  <i>\"Ready for this, love?\"</i>");
	
	outputText("\n\nShe begins to slowly move her disproportionately massive chest up and down your cock, ");
	if(player.cocks[x].cockLength > 5) outputText("making sure to give the " + cockHead(x) + " a quick suck every time it breaches her mounds.");
	else outputText("pressing her mouth down into her ample cleavage so as to give your hidden tip a quick lick every time it draws near.");

	outputText("\n\n<i>\"Hvvng fnn?\"</i>  she asks, pausing her pillowy assault to lick over the end of your pecker once again.  You can only moan in response from the wonderful wet, squishy feeling washing over your sensitive organ.  <i>\"That's what I thought,\"</i> she says, releasing you with a wet pop.");
	
	outputText("\n\nVicky continues her marshmallowy assault for what feels like hours, slowing down every time you give even the slightest indication that you're about to cum.  <i>\"You might hate me for this now, love, but trust me.  It'll feel so much better once you finally do cum.\"</i>  She may be right, but it's agony to get so close to orgasm only to back away, and then draw close once more.  She's practically driving you crazy with lust with her tantalizingly slow tit-fuck.  As you feel your cum nearly boiling away in your [balls], only to have her back away once again, something inside of you snaps.");
	
	outputText("\n\nYou wrench your dick free of the confines of her pillowy mounds, and grab her around her plush middle.  She gives a surprised yelp as you nearly throw her against the counter and lift her butt up into the air.  <i>\"Ooooh, someone's excited!\"</i>  she nearly cheers, looking over her shoulder and wagging her plush rear up at you as her tail swishes back and forth, showing that she's nearly as consumed with lust as you are.  Flipping her long skirt up over her back, you violently pull her panties aside before you force your [cock " + y + "] deep within her gushing folds.");
	
	outputText("\n\nShe squeals in surprise and pleasure as she's penetrated, thrusting her ample hips back at you as you begin to pound into her.  Her ass jiggles violently with every thrust, sending ripples through her creamy flesh.  You grip her around her soft middle as you slam against her hips, barely noticing every squeak she makes as her thick thighs are pounded into the side of the counter.  <i>\"Ah!  Oh, Marae, that feels incredible!\"</i>  she nearly screams as her monocle finally loses its grip on her face and goes flying, thankfully landing safely on a pile of scrap cloth.  If you were more sound of mind, you'd probably have dreaded the cost of repairing the broken eyepiece.");

	outputText("\n\nSomehow, miraculously, you're able to hold back long enough to work your hands up her soft body and grip onto her enormous tits, mashing them in your hands as you find her rock-hard nipples.  She seems to be enjoying the rough treatment - quite a bit in fact - as the moment you give her hard nubs a quick tweak you feel her already rather tight pussy clamp down on your cock HARD.  It becomes nearly impossible to move as she cums explosively, screaming incoherently as she sprays your lower body with her liquid pleasure.");
	
	outputText("\n\nThe sudden resistance is all it takes to finally bring you over the edge, as with a loud roar of your own, you bury yourself deep inside of her still tightly clutching cunt and release.  [if (cumNormal = true) \"It would seem that what she said earlier was correct.  Your pent-up need surges up through your dick, firing your fertile seed straight into her unprotected womb.  She lets out a submissive whimper as your spurting dick triggers aftershocks within her exhausted body.  At last, her body relaxes, freeing your softening dick.\"][if (cumMedium = true) \"Thick, sticky, ropes of your cream fire deep within her grasping pussy, attempting to extinguish the fire you lit within her with your frantic rutting.  She whimpers beneath you as your ejaculation sends another wave of pleasure through her body, which clamps down even harder onto you than before.  Thankfully, it's not long before she releases you once again, going limp on the counter and breathing raggedly.\"][if (cumHigh = true) \"Your urethra distends as it funnels your thick, potent seed into the tightly gripping walls of Victoria's pussy.  She clenches down as the white torrent sends her into yet another orgasm, shuddering beneath you as her already thick stomach begins to distend with its load.  Her pussy continues to milk your dick of its load even as she rides the high of her last orgasm, her body desperate to draw out more of your thick cream.  Finally she releases you, your softening dick forced back out with a thick stream of your jizz, which begins to pool out onto the floor.\"][if (cumVeryHigh = true) \"You feel your dick swell as it nearly explodes within her, pouring thick streams of your seed deep into her fertile womb.  She lets out another loud squeal as her body clenches down into yet another orgasm, gripping your dick tighter than you ever thought possible as it tries to milk you for all you have.  Her plush stomach visibly distends with its contents as you dump your load within her, lifting her small body up from the surface of the counter somewhat.  Thankfully, her body soon relaxes, releasing your softening prick, which is followed by a thick, white fountain of jizz that soaks your legs and pools out onto the floor.\"]");
	if(silly()) outputText("[if cumExtreme = true) \"You groan loudly as your cock pours gallon after gallon of jizz deep into her spasming pussy.  She screams as another powerful orgasm wracks her body, triggered by the enormous amount of jizz you're shooting into her.  Her belly audibly sloshes with each of her movements as it continues to expand from the enormous amount of fluid you're pumping into her.  She attempts to clutch down on you as tightly as she can, trying to retain your enormous load; but the moment she releases even a little bit, she shoots forward from the enormous pressure of jizz within her, flopping down face-first onto some clothes on the other side of the counter.  Your thick cream continues to shoot up from between her limp legs, almost like a fountain, before gravity pulls it back down and it splatters all over the interior of the store.\"]");
	else outputText("[if (cumExtreme = true) \"You groan loudly as your cock pours gallon after gallon of jizz deep into her spasming pussy.  She screams as another powerful orgasm wracks her body, triggered by the enormous amount of jizz you're shooting into her.  Her belly audibly sloshes with each of her movements as it continues to expand from the enormous amount of fluid you're pumping into her.  Thick streams of your seed shoot out all around your dick as she continues to squeeze down on you, trying to keep as much of it inside her massively pregnant-looking belly as possible before she finally releases, squirting your dick back out of her with a pop, followed by a veritable geyser of white. Your entire lower body is painted white as it gushes out, soaking into your clothes and covering the floor as she visibly deflates.\"]");
	
	outputText("\n\nFinally, your strength gives out and you fall backwards onto the floor, exhausted.  A few seconds later, Vicky slips backward off of the counter and lands on top of you.  Like you, she's completely unable to move, however unlike you it's more because she is completely insensate.  Her eyes have rolled back into her head and her tongue hangs out as she occasionally mutters something incoherent.");
	
	outputText("\n\nA few seconds later your body finally gives out completely and you pass out.  You wake up about an hour later, still on the floor with Vicky on the ground near you, leaning up against the counter with her legs splayed, cum still dripping from her used pussy.  <i>\"I uh... s'pose you wanna leave now?\"</i>  She asks, still sounding a bit loopy.  She climbs unsteadily to her feet, and walks, a bit bowlegged to the door, unlocking it before slumping back down the wall.  <i>\"Do come back for a visit, love!\"</i>  You pull your pants back up and crawl back out into the street.  Climbing back to your feet, you notice a few passersby chuckling at you before you close the door.  Before you leave, you think you can make out Victoria muttering, <i>\"Gonna have to clean this place up...\"</i>");
	
	stats(0,0,0,0,0,-1,-100,0);
	doNext(13);
}