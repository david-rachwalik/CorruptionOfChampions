﻿const TIMES_AMILY_AND_JOJO_PLAYED_TIMES:int = 434;
const AMILY_X_JOJO_COOLDOWN:int = 435;
const JOJO_MOVE_IN_DISABLED:int = 550;
const TIMES_EGGED_JOJO:int = 590;
const JOJO_EGGCUBATE_COUNT:int = 591;


function assholeOrPussy():String {
	if(player.hasVagina()) return vaginaDescript(0);
	return assholeDescript();
}
function assholeOrCunt():String {
	if(player.hasVagina()) return vaginaDescript(0);
	return assholeDescript();
}
function assholeOrDP():String {
	if(player.hasVagina()) return (vaginaDescript(0) + " and " + assholeDescript());
	return assholeDescript();
}
function vaginaOrDicksOrCrotch():String {
	if(player.gender == 0) return "crotch";
	if(player.gender == 1) return multiCockDescriptLight();
	if(player.gender == 2) return vaginaDescript(0);
	if(player.gender == 3) return (multiCockDescriptLight() + " and " + vaginaDescript(0));
	return "FUKK: ERROR";
}
function mouthMuzzle():String {
	if(player.faceType >= 1) return "muzzle";
	return "mouth";
}
function faceMuzzle():String {
	if(player.faceType >= 1) return "muzzle";
	return "face";
}
function tentacleJojo():Boolean {
	if(player.hasStatusAffect("Tentacle Jojo") >= 0) return true;
	return false;
}
function campCorruptJojo():Boolean {
	if(monk >= 5 && player.hasStatusAffect("noJojo") < 0 && flags[80] == 0) return true;
	return false;
}
function jojoMutationOffer():void {
	outputText("A wicked idea comes to mind while thinking of Jojo.  The lethicite you took from the lake goddess – perhaps it could be used to enhance your own budding demonic powers, and twist your mousey fuck-puppet into a truly worthy pet?\n\n<b>Do You?</b> (WARNING: Offered only once & unlocks tentacle content)", true);
	doYesNo(2134,2135);
}
function jojoMutationOfferNo():void {
	outputText("There are some lines even you won't cross.  Besides, having a sex-addled mouse with a constantly drooling foot-long cock is all the fun you can handle.\n\nWith that decided you prepare to call on your slut.", true);
	//Normal jojo sex scene here
	doNext(2138);
}
//CORRUPT CAMP JOJO
function corruptCampJojo():void {
	spriteSelect(34);
	//Corrupt Amily and Jojo sexings
	if(flags[43] == 2 && amilyFollower() && campCorruptJojo() && flags[AMILY_X_JOJO_COOLDOWN] <= 0 && rand(5) == 0) {
		flags[AMILY_X_JOJO_COOLDOWN] = 7;
		hideMenus();
		amilyTeachingJojoBJ();
		return;
	}
	//Oh shit goes down! (Wiv Tentacles)
	if(amilyFollower && flags[81] == 0 && rand(10) <= 1 && flags[43] == 1 && player.hasStatusAffect("Tentacle Jojo") >= 0) {
		amilyDiscoversJojoWithTentaclesAndShitOhBoy();
		return;
	}
	//Oh shit goes down! (No tentacles)
	else if(flags[76] == 0 && rand(10) <= 1 && flags[43] == 1 && amilyFollower() && player.hasStatusAffect("Tentacle Jojo") < 0) {
		amilyIsPissedAtYouForRuiningJojo();
		return;
	}
	//Offer lethicite jojo tf if the player is ready
	if(player.hasStatusAffect("JojoTFOffer") < 0 && player.hasKeyItem("Marae's Lethicite") >= 0 && player.keyItemv2("Marae's Lethicite") < 3 && player.cor >= 75) {
		jojoMutationOffer();
		player.createStatusAffect("JojoTFOffer",0,0,0,0);
		return;
	}
	outputText("Before you call for your corrupted pet, how do you want to use him?", true);
	var tent:Number = 0;
	if(tentacleJojo() && player.lust >= 33) tent = 2137;
	var milkHim:Number = 0;
	var tentaMilk:Number = 0;
	var eggs:int = 0;
	if(player.canOvipositBee()) eggs = 3850;
	if(player.hasKeyItem("Cock Milker - Installed At Whitney's Farm") >= 0) {
		if(flags[332] > 0) outputText("\n\n<b>Jojo is still drained from his last visit to the milkers - you should wait a few hours before taking him back.</b>", false);
		//First time:
		else if(flags[331] == 0) milkHim = 3163;
		//Followup:
		else {
			milkHim = 3164;
			if(tentacleJojo()) tentaMilk = 3165;
		}
	}
	var hairCare:Number = 0;
	var sex:Number = 0;
	if(player.gender > 0 && player.lust >= 33) sex = 2138;
	if(player.hasStatusAffect("hairdresser meeting") >= 0) hairCare = 3166;
	choices("Sex",sex,"TentacleSex",tent,"Milk Him",milkHim,"TentacleMilk",tentaMilk,"HairCare",hairCare,"Lay Eggs",eggs,"",0,"",0,"",0,"Back",120);
}
/*OLD FOLLOWER JOJO CODE
	if(player.hasStatusAffect("Tentacle Jojo") >= 0) {
		outputText("Do you want to use his tentacles or just the mouse?", true);
		simpleChoices("Tentacles",2137,"Normal",2138,"",0,"",0,"Back",74);
		return;
	}
	masturbateJojo();
	return;
}*/


function jojoMutationOfferYes():void {
	spriteSelect(34);
	player.addKeyValue("Marae's Lethicite",2,1);
	outputText("There's no question about it, this is a great idea.  It might be coming from the corruption in your blood, but why bother to fight it?  You take Marae's lethicite and grab a one of the larger crystalline protrusions.  With a hard yank, you break it off from the main cluster, sending tiny crystalline shards over the campsite.  They vanish into the ground before you have a chance to gather them.\n\n", true);
	outputText("Whether by luck or some unconscious demonic magic, the smaller piece of lethicite is rather phallic. If it weren't for the sharp corners and hard edges, it would look like a large dildo with a pair of balls at the base.  You put away the larger piece, focusing this tool and your plans for your pet.\n\n", false);
	outputText("You lick the sharp crystalline dildo, slathering it with spit.  You aren't sure, but you seem unable to stop.  It's as if some demonic force guides you.  It's difficult to focus on much beyond your own arousal and the tingling feeling that spreads through your body as you taste this piece of a goddess' essence.  Your mind drifts off into a perverted fantasy, unable to cope with total loss of control and oral debauchery.\n==========================================\n<i>", false);
	//[Male]
	if(player.gender <= 1) {
		outputText("In your fantasy you're fucking Jojo again, bottoming out against his cute girlish ass over and over.  His dick spurts mouse-milk with each thrust, feeding a dozen growing puddles underneath him as they slowly merge together.  He writhes and squirms, a pair of crystalline balls against his chin while he deep-throats a massive dildo.  You blast another wave into his overloaded spunk-dumpster, forcing a thick jet out of him and into the cum-puddles underneath you.\n\n", false);
		outputText("Tired of the foreplay, you pull out of him, watching a river of your cum escape from the uncorked opening.  You pull him up, watching the crystal cock slide out of his mouth, the bulge along his throat slowly disappearing as each inch escapes.   He staggers, completely exhausted, but still hard and horny judging by the look in his eye.\n\n", false);
		outputText("You shove him over a log and grab his spit-slick toy, dragging it through the puddled cum until it's white and dripping.  Jojo whimpers, his disproportional member stuck between his legs and twitching with anticipation.  The dildo slides into his well-stretched hole with ease, sealing the rest of your tainted seed deep inside his bowels as your magic begins to change him…</i>\n==========================================\n", false);
		outputText("You snap out of the fantasy with a start.  The crystal shard is sitting on the ground in front of you, but it is no longer a shard – it's the dildo from your fantasy, complete with a thick covering of your cum.  You manage to pry your hand away from your softening member(s) and take tainted artifact, now ready to be used.</i>\n", false);
	}
	//[Female] 
	else {
		outputText("In your fantasy, you're riding Jojo hard, milking his swollen dick with your pussy", false);
		if(player.biggestLactation() < 2) outputText(" while your tits cover his head, nearly suffocating him", false);
		else outputText(" while he suckles one of your breasts hungrily, sucking down your milk", false);
		outputText(". A crystalline dildo is buried hilt-deep in his ass, held in place by a harness of your own design that twists it around every time he moves.  You cum again, relishing the desperate and needy look the poor mouse is giving.  Your spasming pussy is immediately filled with even more warmth, and you feel the thick spunk forcing its way into your core until you feel bloated.\n\n", false);
		outputText("You calm your trembling body and stand up off of him, soaking him with his own escaping fluids.  Jojo moans and starts pumping his dick, wriggling his hips while his orgasm is dragged on by the dildo squeezing his prostate.  You curl up alongside his ear and begin whispering into his mind, watching as your words soak in and begin to change him with the aid of the crystalline cock's magic.</i>\n==========================================\n", false);
		outputText("You snap out of your fantasy with a start.  The crystal shard is sitting on the ground in front of you, but it's no longer a shard – it's the dildo from your fantasy, now slick with pussy juices.  You touch your sore cunt and gasp when you realize where it went.  ", false);
		if(player.vaginas[0].virgin) outputText("(Yet somehow your virginity remains intact).  ", false);
		outputText("The dildo disappears back into your inventory, and you smile in wicked anticipation of your next meeting with Jojo.\n", false);
	}
	outputText("\n<b>You just can't wait!  You'll call him over now...</b>", false);
	doNext(2136);
}

function mutateJojo():void {
	spriteSelect(34);
	outputText("You call out, and Jojo obediently pads into the camp.  At some point he decided to switch to wearing a loin-cloth, for all the good it has done him – it drapes over his member, barely covering half of it as it twitches and throbs from your presence.   You gesture for him to remove that tiny cloth, and he does immediately.  When he gets within a few feet of you, he drops to his knees with his hands behind his back, his head down submissively.  You see little tics and twitches run through his body as he fights to resist touching himself, so you drag it out and see how long he can wait.\n\n", true);
	outputText("It doesn't take long.  A plaintive whine escapes him as his hand creeps around his waist.  You grin and push him onto his back, stepping onto his wrist to pin his hand in place.  You drop the crystal dildo on to his chest with a single command, \"<i><i>Use it</i></i>\".\n\n", false);
	outputText("Jojo shivers and takes your offering with his free hand, slowly hefting it and dragging it lower.  He looks up at you questioningly, and you gesture impatiently at him to quit wasting your time.  The dildo's crown presses against his sphincter, stopping for a second as the bitch-boy relaxes, and then begins its long journey inward.   Jojo's eyes roll up a bit and his prick starts pumping out a clear stream of his pre-cum, wetting most of his belly.  Finally the pinkish-hued balls press against his bum.  He's taken the whole thing.\n\n", false);
	outputText("While you still have one of the mouse's hands pinned under your " + player.foot() + ", his other has already released the tainted sex-toy, and journeyed up to his pre-cum spurting cock.  You waste no time and push his hand away as you jump on top of him, being sure to grind your " + vaginaOrDicksOrCrotch() + " against his slick boner.   He keeps whining plaintively and wriggling his hips against you, but you deny him any further stimulation, instead focusing on keeping him horny while the tainted dildo settles in.\n\n", false);
	outputText("Jojo's moans reach a fevered pitch as a soft buzzing begins to fill the air behind you.  You turn around and see that the lethicite-crafted dildo has begun to vibrate inside of him!  Somehow you can feel that this is the time to change him – that his form is malleable and ready.   Your hand finds itself wrapped around the base of his cock, bottling him up until you're ready, while you lean up to his cute mouse-ears and start to whisper, \"<i><i>Aww, does my little rodent-bitch want to cum?</i></i>\"\n\n", false);
	outputText("He shakes his head and whines again, trembling underneath you.\n\n", false); 
	outputText("\"<i><i>Too bad slut,</i></i>\" you say while you give his balls a squeeze, \"<i><i>you can't cum until I've changed you into the perfect fuck-toy.   A toy that can just keep cumming, more than once.  A toy who can fill more than one hole at a time.  A toy I could share with my friends, who could keep up with a succubus and an incubus simultaneously.  You'll be that toy for me.  My delicious fuck-puppet that cums on command with tentacle-dicks and pussy-vines aplenty.</i></i>\"\n\n", false);
	outputText("Jojo's eyes roll back until all you can see is the whites.  His mouth lolls open from pleasure and lets loose a constant stream of pants and moans.  Already you can feel his cock squirming in your hand, thrashing to get free.  The dildo starts vibrating louder, and his pre-cum manages to start spurting free again, despite your tight grip on his member.   You see his shoulders bulge as something starts wriggling under his skin, thrashing back and forth until they sprout free as a pair of tentacles.\n\n", false); 
	outputText("Uncontrolled, the tentacles curl down to Jojo's vine-like member, wrapping it in coils until your hand is forced off and wriggling around it.  You note each of his new appendages is developing a flare at their tips, and the puddle of pre seems to be growing faster than it ever did before.\n\n", false);
	outputText("You whisper, \"<i><i>Good bitch, you'll be able to fuck every hole around you, won't you?  But all I see is an ass and a mouth for cocks.  You need some nice tight cock-sleeves don't you?</i></i>\"\n\n", false);
	outputText("On cue, you feel his tail curl up your back, already longer than it ever was before.  To your surprise the fur is vanishing, leaving you feeling smooth rubbery skin.  It splits three ways in an instant, but each grows thicker than his tail ever was before.  One curls over your shoulder as if looking for something, and reveals a strange sucking opening, sticky with some kind of fluid and filled with undulating fleshy ridges.\n\n", false);
	outputText("You smile and give the opening a lick – it's sweet – and turn back to his ear, \"<i><i>Now you're where I want you bitch.   Feel that dildo squeezing your prostate?  You'll cum just from that won't you?  Take those new tentacles off your dick and aim them at your face, I want to watch you give yourself a facial and cum all over yourself just from my other toy.</i></i>\"\n\n", false);
	outputText("Despite looking lost to the pleasure, his body obeys, releasing his dick and aiming his shoulder-tentacles at his open mouth.   You can see now that each is a dark green color, and capped with a shiny purplish head, just like the vines in the corrupted glade.  Each of them starts flaring wider, and you feel his cock snake up between your ", false);
	if(player.biggestTitSize() < 1) outputText("bodies", false);
	else outputText(allBreastsDescript(), false);
	outputText(", until it pops out just under his chin, looking like a fatter version of the twins on his shoulders.  All three start flaring wider in preparation, and you know he is about to erupt.\n\n", false);
	outputText("\"<i><i>Good toy,</i></i>\" you whisper, \"<i><i>cum for your ", false);
	if(player.gender <= 1) outputText("master", false);
	else outputText("mistress", false);
	outputText(".</i></i>\"\n\n", false);
	outputText("He submits happily, a smile overtaking his face in spite of his eyes rolled back and his tongue drooling all over his muzzle.  His entire body quakes, and you feel bulges beginning to pass under your ", false);
	if(player.biggestTitSize() >= 1) outputText(allBreastsDescript(), false);
	else outputText("chest", false);
	outputText(".  You can see them moving up the shoulder tentacles with agonizing slowness, until all three cock-vines erupt simultaneously, splattering Jojo's face with his own seed.  The perfect synchronization is broken immediately when his primary tentacle blasts a glob into his hair, and then the entire scene devolves into a mess of quivering tentacles and splattering spooge.  Jojo's mouth catches plenty, and he begins swallowing instinctively as his tentacles do their best to drown him.\n\n", false);
	outputText("You pull back and watch, ", false);
	if(player.cockTotal() > 0) {
		outputText("stroking your own member", false);
		if(player.cockTotal() > 1) outputText("s", false);
		outputText(" ", false);
		if(player.hasVagina()) outputText("and ",false);
	}
	if(player.hasVagina()) outputText("caressing your aching twat ", false);
	outputText("as the mouse slowly paints himself with spoo.  By the time he has finished, he is soaked from head to toe, and lying in a puddle of his own making.  The tentacles fall limp and slowly begin to retract, until the only visible indication of their presence is a small lump on each shoulder.  His tails seem to regrow their fur in an instant, but they stay separate, and retain their thicker size.  And last but not least, you see that his member has shrunk back down to almost a foot and a half long, but has thickened up nicely.  Most of it returns to his natural pink skin-tone, but the head remains an angry purple as it stays hard and keeps drooling.\n\n", false);
	outputText("The dildo is gone, leaving only a hot pink tinge on the fur around his pucker.  Whatever dark magic you managed to imbue it with was used up by the transformation.  Jojo is still out cold, probably unable to cope with the force of his altered orgasm, but his body is doing an admirable job of adjusting.  You even see his three tails curling together until they look like one larger tail.  Only close inspection would reveal the difference.\n\n", false);
	outputText("You turn back to your tent, turned on beyond all measure, and needing to masturbate NOW.   You wonder what Jojo's new additions will feel like on your body when he wakes up, but for now you'll have to get off another way.", false);
	stats(0,0,0,0,0,0,300,10);
	doNext(1);
	//(LIMITED MASTURBATE MENU – No Jojo)
	player.createStatusAffect("noJojo",0,0,0,0);
	player.createStatusAffect("Tentacle Jojo",0,0,0,0);
}

//[POST TENTACLE DICKINGS]
function useTentacleJojo():void {
	spriteSelect(34);
	slimeFeed();
	var nippleSucking:Boolean = false;
	var clitSucking:Boolean = false;
	var mouthFucking:Boolean = false;
	var titFucking:Boolean = false;
	var cumPuddle:Boolean = false;
	var milkPuddle:Boolean = false;
	outputText("You call out, \"<i><i>Sluuuuuut!</i></i>\"\n\n", true);
	outputText("A few seconds later Jojo comes bounding into camp on all fours, blushing furiously and with his ass high in the air, trying to keep his tumescent mouse-member from dragging the ground.   He presents himself to you, putting his hands behind his back and displaying his prick.  It squirms and wriggles obscenely in a way that nothing that thick should be able to move.  Jojo is biting his lip and blushing hard at his uncontrollable display.  You note that despite his blush, the tiny lumps on his shoulders are growing larger and taking on a purplish hue, while his three tails have begun to disentangle themselves behind him.\n\n", false);
	outputText("Desperation hangs thick about him in the air as his newfound additions react to your summons.  Somehow he knows you wanted to use them, but he's trying to hold himself back like a good bitch.  You egg him on a bit, taunting, \"<i><i>Awww look at the cute little tentacles begging to come out and play,</i></i>\" while you begin to brush your fingertips along underside of his writhing cock.  Jojo's eye cross from the pleasure, his member growing longer and longer under your touches until it's swaying in the air, snake-like, with its flared purple tip lying in the palm of your hand.\n\n", false);
	outputText("You drop it, letting it smack into the floor with a wet-sound 'SPLAT' that creates a puddle of pre-cum on the ground.  With your hands free, it is easy to quickly remove your " + player.armorName + " and toss it back towards your tent.  By the time you turn back around, his snake-like member is curling up your thigh, towards your " + assholeOrPussy() + ".  ", false);
	if(player.hasVagina()) outputText("You feel it split in half, dividing in order to take you from both ends.  ", false);
	outputText("You marvel at just how hard it is to dominate someone who can fuck you from a few feet away and wrap you up with a half-dozen appendages before you just give in and decide to enjoy it.\n\n", false); 
	outputText("You put your arms on your hips and say, \"<i><i>Go ahead and ravage me then, but if I don't love every second of it you'll regret it.</i></i>\"\n\n", false);
	outputText("Looking very much like a starving man looking at a steak, Jojo smiles serenely and lashes out with his shoulder-tentacles, grabbing your arms and pinning them to your waist.   They wrap about your middle and lift you off the ground with ease.  Suspended in front of him, you're effortlessly rotated in place until your " + assholeDescript() + " is in the air and your legs splayed apart, with the mutant-mouse's primary tentacle getting ever closer to your " + assholeDescript(), false);
	if(player.hasVagina()) outputText(" and " + vaginaDescript(0), false);
	outputText(".\n\n", false);
	//REAL SECKS STARTS HERE
	if(player.totalCocks() > 0) {
		outputText("Upside down, you're forced to watch as his tail-tentacles curl out from between his legs, and extend towards your vulnerable " + multiCockDescriptLight() + ".  All three of them pause a few inches away for what seems an eternity, revealing circular dripping orifices filled with slimy wriggling cilia.\n\n", false);  
		if(player.cockTotal() == 1) {
			//(1dick+balls = 
			if(player.balls > 0) {
				outputText("One of them lashes forwards, ", false);
				if(player.cockArea(0) > 60) outputText("laboriously stretching around", false);
				else if(player.cockArea(0) >= 20) outputText("engulfing", false);
				else outputText("easily swallowing", false);
				outputText(" your " + cockDescript(0) + " in a tight vise of pleasure.  The other two tentacles slide under, each taking a " + ballDescript() + " partially inside their 'mouths' and massaging them softly.", false);
				outputText("\n\n", false);
			}
			//(1 dick no balls = 
			else {
				outputText("One of them lashes forwards, ", false);
				if(player.cockArea(0) > 60) outputText("laboriously stretching around", false);
				else if(player.cockArea(0) >= 20) outputText("engulfing", false);
				else outputText("easily swallowing", false);
				outputText(" your " + cockDescript(0) + " in a tight vise of pleasure.  The other two tentacles slide under, ", false);
				if(!player.hasVagina()) outputText("rubbing back and forth along your taint and smearing you with their slime.", false);
				else {
					outputText("rubbing against your thighs and smearing them with lubricant while one of them easily sucks your " + clitDescript() + " inside.", false);
					//(If big clit – 
					if(player.clitLength >= 4) outputText("  You nearly cum on the spot from the clitoral stimulation, it's you have a super-sensitive cock being licked by 1000 tongues.", false);
				}
				outputText("\n\n", false);
			}
		}
		//(2 dicks + 
		if(player.cockTotal() == 2) {
			//balls)
			if(player.balls > 0) {
				outputText("Two of them lash forward, ", false);
				if(player.cockArea(0) > 60) outputText("laboriously stretching around", false);
				else if(player.cockArea(0) >= 20) outputText("engulfing", false);
				else outputText("easily swallowing", false);
				outputText(" your " + multiCockDescriptLight() + " in tight vises of pleasure.  The remaining tentacle slides underneath, alternatively taking each of your " + ballsDescript() + " partway into its 'mouth' and massaging them with its thousands of wriggling stimulators.\n\n", false);
			}
			//(2 dicks no balls) 
			else {
				outputText("Two of them lash forward, ", false);
				if(player.cockArea(0) > 60) outputText("laboriously stretching around", false);
				else if(player.cockArea(0) >= 20) outputText("engulfing", false);
				else outputText("easily swallowing", false);
				outputText(" your " + multiCockDescriptLight() + " in tight vises of pleasure.  The remaining tentacle slides underneath, seeking ", false);
				if(player.hasVagina()) {
					outputText("out your " + clitDescript() + " and sucking it inside.", false);
					//(If big clit – 
					if(player.clitLength >= 4) outputText("  You nearly cum on the spot from the clitoral stimulation, it's you have a super-sensitive cock being licked by 1000 tongues.", false);
				}
				else outputText("to rub itself along your taint, massaging the sensitive skin with its slimy lubricants.", false);
				outputText("\n\n", false);
			}
		}
		//(3 dicks) 
		if(player.cockTotal() >= 3) {
			outputText("All three of them lash forward, ", false);
			if(player.cockArea(0) > 60) outputText("laboriously working to swallow", false);
			else if(player.cockArea(0) >= 20) outputText("engulfing", false);
			else outputText("easily swallowing", false);
			outputText(" your " + multiCockDescriptLight() + " in tight vises of pleasure.  The sensation is overhwelmingly pleasurable, like having three cocks being licked and sucked by 1000 tongues.", false);
			//(if extra: 
			if(player.cockTotal() > 3) outputText("  The remaining " + cockNoun(0) + "'s pulse and throb with jealous desire, until one of the tentacles slips off and captures it.  They take turns, slipping off and capturing each of your offerings until you wish they'd just keep sucking forever.", false);
			outputText("\n\n", false);
		}
	}
	//(0 dicks but clit)
	if(player.totalCocks() == 0 && player.hasVagina()) {
		outputText("One of Jojo's tail-tentacles slides underneath his body, shooting forwards to seek out your " + clitDescript() + ".  It pauses an inch or two away and opens up a horrific orifice full of wriggling tentacles and slick fluids.  The next moment it lunges forwards and sucks it inside.", false);
		//(If big clit – 
		if(player.clitLength >= 4) outputText("  You nearly cum on the spot from the clitoral stimulation, it's you have a super-sensitive cock being licked by 1000 tongues.", false);
		else outputText("  The sensation was unreal, and you find yourself wishing your clit was bigger so you could feel even more of the tendrils pleasure-hole.", false);
		outputText("\n\n", false);
	}
	//GET BUTT/VAGOO PENETRATED
	outputText("The ", false);
	if(player.hasVagina()) outputText("pair of tentacles ", false);
	else outputText("tentacle ", false);
	outputText("hanging over your bottom decide", false);
	if(!player.hasVagina()) outputText("s", false);
	outputText(" that now is a good time to penetrate your undefended opening", false);
	if(player.hasVagina()) outputText("s", false);
	outputText(", and press against you, ", false);
	//Virgin taking
	if(player.hasVirginVagina() || player.ass.analLooseness == 0) {
		outputText("barely slipping inside your virginal opening", false);
		if(player.hasVirginVagina() && player.ass.analLooseness == 0) outputText("s", false);
	}
	//not virgin taking
	else {
		//With cunt
		if(player.hasVagina()) {
			if(player.vaginas[0].vaginalLooseness >= 4) outputText(" practically falling into oversized cum-receptacles", false);
			else {
				if(player.vaginas[0].vaginalWetness >= 3) outputText(" sliding inside easily thanks to your copious lubrication", false);
				else outputText("forcing their way inside your " + vaginaDescript(0) + " and " + assholeDescript(), false);
			}
		}
		//Just butt
		else {
			if(player.ass.analLooseness >= 4) outputText(" practically falling into oversized cum-receptacle", false);
			else {
				if(player.ass.analWetness >= 3) outputText(" sliding inside easily thanks to your copious lubrication", false);
				else outputText("forcing its way inside your " + assholeDescript(), false);
			}
		}
	}
	//ON WITH THE PENETRATION
	outputText(".  Your " + mouthMuzzle() + " opens with a wordless cry of surprise ", false);
	if(player.hasVagina()) outputText("and pleasure ", false);
	outputText("as Jojo's tentacle", false);
	if(player.hasVagina()) outputText("s begin", false);
	else outputText(" begins", false);
	outputText(" thoroughly violating you, pistoning in and out relentlessly.", false);
	if(player.totalCocks() > 0) {
		outputText("  You feel a strange pleasure every time it plunges deep into your ass, smacking into your prostate.  ", false);
		if(player.cockTotal() == 1) outputText("  The tentacle on your " + multiCockDescriptLight() + " seems appreciative, and begins sucking to swallow down all your pre.", false);
		if(player.cockTotal() > 1) outputText("  The tentacles on your " + multiCockDescriptLight() + " seem appreciative, and begin sucking to swallow down all your pre.", false);
	}
	if(player.hasVagina()) outputText("  Your " + vaginaDescript(0) + " spasms around the invader, clenching uncontrollably as its plowed by the thick vine-prick.", false);
	outputText("\n\n", false);
	outputText("You feel the bindings around your waist sliding and twisting to free up some of their length.  The pair of tentacle-cocks rear up before your " + allBreastsDescript() + " like hungry snakes eyeing a mouse.\n\n", false);
	//(Large tits &/or multitits with no lactation)
	if((player.biggestTitSize() >= 4 || (player.biggestTitSize() >= 4 && player.breastRows.length > 1)) && player.biggestLactation() < 2) {
		titFucking = true;
		outputText("The twin tentacles erupt like kinked up garden-hoses that have suddenly become free, splattering your chest thick white goop.  They spurt until all of your " + breastDescript(0) + " are painted white with warm dripping goop.  One of the purple-headed monsters slides into the mess, while the other ties itself around your " + breastDescript(0) + ", squeezing its brother tightly between the walls of cum-slickened titflesh.  The swollen purple head bumps your chin, smearing you with its cum, as it begins to fuck your tits.  Glob after glob of mouse-cum spatters up from your chest into your chin and mouth, eventually soaking your " + faceMuzzle() + " and neck.\n\n", false);
	}
	//(Lactating highly)
	if(player.biggestLactation() >= 2) {
		nippleSucking = true;
		outputText("The heads split apart, dividing into quarters as they reveal a wet openings with pink, tongue-like appendages.   Milk begins to leak from your nipples as their intent becomes clear, and you inwardly scold yourself for ", false);
		if(player.cor < 80) outputText("being such a wanton slut", false);
		else outputText("giving it up too easily", false);
		outputText(".  Jojo's dick-mouths latch on and suck hard, pulling your " + nippleDescript(0) + "s deep into their internal resevoir and stimulating your breasts to release a torrent of milk.  ", false);
		if(player.cowScore() >= 5) outputText("You find yourself mooing in contentment as your fuck-slave works to milk you.  ", false);
		outputText("You watch with a happy smile, enjoying the sensations as the tentacles bulge and move milk-distended knots down their lengths towards Jojo.  They are so full that the sloshing whiteness actually becomes visible through the 'skin' of his tendrils.", false);
		if(player.breastRows.length > 1) {
			//(NewPG if multirow)
			outputText("\n\nThere is nothing to do but enjoy the sensations until your " + breastDescript(0) + " are emptied, but before that can happen, they detach, soaking your chest with excess milk, and move down to the next row.  It becomes clear they will keep milking you, moving from row to row to give each a chance to recover, so that they can feed indefinitely...", false);
		}
		outputText("\n\n", false);
	}
	//(NEITHER - JUST NIPS) 
	else if(player.biggestTitSize() < 4 && rand(2) == 0) {
		nippleSucking = true;
		outputText("The heads split apart, dividing into quarters and revealing a wet pink opening with a writhing tongue in the center.   They latch on and suck hard, each pulling your entire " + nippleDescript(0) + " into their interior.  Gasping at the sensations, you can only moan as the tentacular tongue twists itself around your nipple.  ", false);
		if(player.biggestLactation() >= 1) outputText("A squirt of milk escapes and is quickly sucked down by the hungry tentacles.  ", false);
		outputText("The sucking and teasing is relentless, keeping your nipples hard and incredibly sensative as Jojo has his way with you.\n\n", false);
	}
	//mouthfuck – if shoulder-tentacles are unoccupied – random
	else if(player.biggestTitSize() < 4 && player.biggestLactation() < 2) {
		mouthFucking = true;
		outputText("You feel the bindings around your waist sliding and twisting to free up some of their length.  The pair of tentacle-cocks rear up in front of your face, dripping cum from their tainted purple heads.  One curls around the other, twirling around it until the two tentacles look more like some obscene double-headed dildo.  They smear against your lips, coating them with spunk and begging to be let inside.  Pushing harder and harder, they eventally work your jaw open and cram themselves inside.  An immediate jet of cum paints the back of your throat, nearly gagging you for a moment.  The sensation passes quickly, as if your gag reflex was somehow numbed.\n\n", false);
		outputText("Twinned dicks force themselves further into your throat, until you are sure they must be outlined and clearly visible to Jojo on your neck.  The mouse-dicks push further in, working their way down to the bottom of your esophagus before pulling back, dripping cum all the while.   Every now and then you get a feeling of fullness in your belly, and realize one of them must have shot off a load of spunk directly into you.   The brutal mouthfuck shows no sign of slowing down, forcing you to gasp in a breath through your nose every time the tentacles pull back.\n\n", false);
	}
	//Cumsplosion
	outputText("Jojo unleashes a howl of beastial pleasure, and you feel the ", false);
	if(player.hasVagina()) {
		outputText("tentacles in your " + assholeOrDP() + " thicken perceptibly.  Bulges of cum work their way down the tentacles, spreading your " + assholeOrDP() + " wide before stuffing you full of mouse cream.  You can feel your bowels and uterus filling, expanding you until you look ", false);
		if(player.pregnancyIncubation == 0) outputText("mildly pregnant", false);
		else outputText("even more pregnant", false);
		outputText(".  Your body spasms around them, locked in the throes of orgasm", false);
		if(player.vaginas[0].vaginalWetness == 5) outputText(", and soaks him with a wave of puss juice.  ", false);
		else if(player.vaginas[0].vaginalWetness >= 3) outputText(", as your drooling cunt forms a slick puddle.  ", false);
		else outputText(".  ", false)
		//(If big clit being sucked – 
		if(player.cockTotal() <= 2 && player.balls == 0) {
			outputText("The tentacle locked around your " + clitDescript() + " bulges out a bit as your clit throbs from the orgasm, before it sucks harder, making your clitty even larger.  You squeel from the raw sensation until the tentacle pops off, satisfied, leaving your clit looking like an angry red cock.  ", false);
			player.clitLength += .25;
		}
		outputText("Both tentacles pull out, still dripping whiteness that puddles in your holes.", false);
	}
	else {
		outputText("tentacle in your " + assholeDescript() + " thickens perceptibly.  Bulges of cum work their way down the main tentacle, spreading your " + assholeDescript() + " wide before stuffing you full of mouse cream.  You can feel your bowels filling, expanding you until you look mildly pregnant.  Your body spasms around them, locked in the throes of orgasm.  The tentacle pull out, still dripping whiteness that puddles in your well-used hole.", false);
	}
	//Dick milkings ahoy!
	if(player.cockTotal() > 0) {
		if(player.cockTotal() == 1) {
			outputText("The tentacle working over your " + multiCockDescript() + " clamps down and wriggles deliciously around you.  You can't help but cum from the assault, feeding the tentacle your hot spoogy load.  It drinks it down eagerly", false);
			if(player.cumQ() >= 100) {
				outputText(", but after a few moments it begins to struggle with the sheer output.", false);
				if(player.cumQ() >= 300) {
					outputText("  When you finally finish, it's bloated and dripping your cum all over your crotch.", false);
					if(player.cumQ() >= 600) {
						outputText("  You pump the tentacle so full it turns pinkish-white and bloats obscenely, before suddenly releasing a backflow that soaks you in spunk from the waist down. It drops to the ground limp and spent", false);
						if(player.cumQ() >= 800) outputText(" but you don't stop cumming until it lies in a deep puddle of jizz", false);
						outputText(".", false);
						cumPuddle = true;
					}
				}
			}
			else outputText(".", false);
		}
		if(player.cockTotal() > 1) {
			outputText("The tentacles working over your " + multiCockDescript() + " clamp down and wriggle deliciously around you.  You can't help but cum from the assault, feeding the tentacles your hot spoogy load.  They drinks it down eagerly", false);
			if(player.cumQ() >= 100) {
				outputText(", but after a few moments they begin to struggle with the sheer output.", false);
				if(player.cumQ() >= 300) {
					outputText("  When you finally finish, they're bloated and dripping your cum all over your crotch.", false);
					if(player.cumQ() >= 600) {
						outputText("  You pump the tentacles so full they turn pinkish-white and bloat obscenely, before suddenly releasing a backflow that soaks you in spunk from the waist down. They drops to the ground limp and spent", false);
						if(player.cumQ() >= 800) outputText(" but you don't stop cumming until they lie in a deep puddle of jizz", false);
						outputText(".", false);
						cumPuddle = true;
					}
				}
			}
			else outputText(".", false);
		}
	}
	//Breastgasm
	if(player.biggestLactation() >= 2 && nippleSucking) {
		outputText("Your " + breastDescript(0) + " squirt milk even harder, pushing the tentacles clear off you with the force of your lactation.  Your " + nippleDescript(0) + "s look like ", false);
		if(player.nippleLength >= 2) outputText("even larger", false);
		else outputText("obscene", false);
		outputText(" cow-teats from all the suction, fountaining milk everywhere as it puddles on the ground.   The milk flow tapers off after a few seconds, leaving you stretched and sore.", false);
		if(player.nippleLength < 4 && player.breastRows[0].breastRating >= 1) {
			outputText("  Somehow you know they won't shrink the whole way back down to normal.", false);
			player.nippleLength += .25;
		}
		else outputText("  Somehow you know they won't get any bigger from his rough treatment.", false);
		outputText("  Your " + allBreastsDescript() + " finally feel emptied, it's a relief.\n\n", false);
		milkPuddle = true;
	}
	//Titfucking breastgasm
	if(titFucking) {
		outputText("The titfucking tentacles squeeze tighter against your " + allBreastsDescript() + " before they cum again, much harder than before.  Each time it pops free of your flesh, a wave of spunk flows out with it, rolling off your chest to drip into your already soaked face and mouth.  ", false);
		if(player.cor >= 80 && player.lib >= 70) outputText("You lick your lips and swallow as much of it as possible, wallowing in the mouse-cream.  ", false);
		if(player.hairLength > 0) outputText("He keeps unloading it until you feel it in your " + hairDescript(), false);
		else outputText("He keeps unloading it until you feel it on your head", false);
		outputText(", then both tentacles abruptly release, going flaccid.\n\n", false);
	}
	if(mouthFucking) {
		outputText("A wide bulge forces your jaw apart, distends your throat, and finally empties into your gut, filling you with warmth.  The action repeats until you feel bloated and full, far worse than before as you're now filled from BOTH ends.  You look more like ", false);
		if(player.pregnancyIncubation == 0 && player.buttPregnancyIncubation == 0) outputText("an eight month pregnant woman", false);
		else outputText("a brood-mother immobilized by her growing offspring", false);
		outputText(" than your old self at this point, and Jojo wastes no time in pulling out to paint your " + faceMuzzle() + " with his baby batter.\n\n", false);
		cumPuddle = true;
		stats(0,0,0,0,0,0,0,.5);
	}
	outputText("All of Jojo's tentacles seem to lose their strength, and he gently sets your violated body down ", false);
	if(cumPuddle) {
		if(milkPuddle) outputText("in the puddle of cum and milk", false);
		else outputText("in the puddle of spunk", false);
	}
	else {
		if(milkPuddle) outputText("in the puddle of milk", false);
		else outputText("on the ground", false);
	}
	outputText(".  You moan in frustration, feeling the fluid soak into your skin, secretly wishing he could've fucked you into unconsciousness.  ", false);
	outputText("The mouse kneels over you and begins licking your body, cleaning you with his tongue.  The tentacles join in, noisily slurping up every ounce of fluid from your form until you're clean and sated.  Sighing dreamily from the attention, you close your eyes and murmer, \"<i><i>Good boy.</i></i>\" When you open them, he's trotting away towards the forest, his tentacles well-hidden again...\n\n", false);
	doNext(13);
	buttChange(40, true);
	cuntChange(40, true);
	stats(0,0,0,0,0,0,-100,.5);
}

//Jojo milk payments
function jojoMilkPay(tentacle:Boolean = false):void {
	spriteSelect(34);
	flags[332] = 4;
	outputText("A loud 'ding' chimes and a panel displays ", false);

	//Set temp to liter amount produced.
	var payout:Number = 0;
	var cap:Number = 500;
	var cumQ:Number = 0;
	//Ez mode cap doubles
	if(flags[99] == 1) cap *= 2;
	if(debug) {
		flags[104] = 0;
		cap = 9999;
	}
	//Get rid of extra digits
	cumQ = jojoCumQ();
	if(tentacle) cumQ += 40000 + rand(1000);
	
	//10% randomization
	cumQ -= rand(cumQ/10);
	cumQ = Math.round(cumQ);
	
	outputText(cumQ/1000 + " Ls.  ", false);
		
	//Calculate payout
	if(cumQ > 100) {
		payout = 2 + int(cumQ/200)*2;
	}
	//Reduce payout if it would push past
	if(flags[104] + payout >= cap) {
		payout = cap - flags[104];
		outputText("It also shows a warning: <b>Not enough gems for full payment.  GEMS NOW EXHAUSTED.</b>  ", false);
	}
	//If over cap!
	else if(flags[104] >= cap) {
		payout = 0;
		outputText("It also shows a warning: <b>FUNDS EXHAUSTED.</b>  ", false);
	}
	if(payout > 0) {
		player.gems += payout;
		flags[104] += payout;
		statScreenRefresh();
		flags[331]++;
		if(payout == 1) outputText(Num2Text(payout) + " gem rolls out into a collection plate.  Whitney really put a lot of work into this!  You pocket the gem and g", false);
		else outputText(Num2Text(payout) + " gems roll out into a collection plate.  Whitney really put a lot of work into this!  You pocket the gems and g", false);
	}
	else outputText("You g", false);
}
function jojoCumQ():Number {
	var cumQ:Number = 0;
	cumQ = 400;
	if(flags[331] < 4) cumQ += flags[331] * 200;
	else cumQ += flags[331] * 100;
	if(tentacleJojo()) cumQ += 500 + flags[331] * 100;
	return cumQ;
}

//Jojo - First Time Milking (edited)
function milkJojoFirst():void {
	spriteSelect(34);
	var x:Number = player.cockThatFits(40);
	outputText("", true);
	outputText("A wicked idea comes to mind, and you call for your favorite mousey ", false);
	if(tentacleJojo()) outputText("tentacle", false);
	else outputText("boy", false);
	outputText("-toy.  He runs up as quickly as he can with his swollen, cum-dripping genitalia. With how big his balls are, it's a wonder he can run anywhere at all.  Jojo's eyes are fogged and lidded, his tongue is hanging out, and he's slowly stroking his swollen meat, moaning with each pump.  You take him by the clean hand and instruct him, \"<i>No cumming just yet, my toy; I'm going to give you a special treat today.</i>\"\n\n", false);
	
	outputText("The white-furred mouse mewls in disappointment, but he obeys reluctantly, slowing his constant stroking down to more measured caresses.  Without any further instruction, you start walking towards Whitney's farm, the corrupted vermin trailing behind you like a lost puppy.  The constant, lurid panting is the only clue you have that he's obeying you, though at this point you're confident you've fucked every single ounce of disobedience out of your plaything.  Maybe there's a puddle of it somewhere in the forest, helping to seed a corrupted glade.  No matter, you're almost there.\n\n", false);
	
	outputText("Looming over the next hill, you can see the large, well-maintained roof of Whitney's farm.  She does a fantastic job of keeping everything running considering it seems to be primarily a one-woman show.  Whatever the case, it doesn't look like she's near the barn right now.  It's the perfect time to introduce two of your favorite toys to one another!  Tugging on Jojo's ear, you start dragging him down the hillside towards the empty barn.  He doesn't fight at all, moaning and dripping behind you as if he knows what's coming.  Perhaps he learned a little about 'milking' from somewhere before you broke him?\n\n", false);
	
	outputText("Sliding easily, the barn door barely creaks as you push it open and send Jojo inside.  You glance around furtively, making sure you weren't seen, and then you close the door behind you.  Jojo has slumped down into some straw and started masturbating again, yanking on his corruption-bloated cock as if it's the only thing in the room that matters.  Slapping his balls to get his attention, you lead him towards your stall.  It's empty and clean as always", false);
	if(flags[333] > 0) outputText(", even though it reeks of the spunk you've spilled into the milker's mechanical embrace", false);
	outputText(".  Jojo shrugs and whines at you, pleading to be allowed to touch himself again.\n\n", false);
	
	outputText("You smirk and push him inside, tangling him up in the dangling milk-harness.  The surprised mouse struggles and looks back at you with a mix of confusion and lust warring in his pliant, submissive eyes.  Placing a reassuring fingertip on his nose, you make calming, shushing noises at him as you strap him in properly.  Thankfully the harness is quite adjustable, and you're able to give the corrupt fuck-beast a proper fitting before you milk him.  Each time you cinch one of the bands tight, you make sure to give his balls or his a cock a gentle squeeze.  The extra attention keeps Jojo calm as he is increasingly immobilized.  Only one fitting remains to be tightened, and knowing all too well what will happen, you give it a tug.\n\n", false);
	
	outputText("As soon as the white slut-mouse is secured, the machinery kicks in.  It starts with the harness whirring and rising, lifting Jojo up high enough that his arms and legs can't scrabble for purchase.  He's going to be completely immobilized the entire time, and there's nothing he can do about it.  Meanwhile, a hatch on the far wall pops open, revealing a tangled nest of wires.  A single hose with a slimy, pulsating texture on its interior worms out of the machinery, slithering across the floor like a snake.  ", false);
	if(player.hasCock()) outputText("It starts to turn your way before it stops and rises, seeming to sniff at the rodent directly above.", false);
	else outputText("It slowly starts to rise, seeming to sniff at the rodent above as it orients itself.", false);
	outputText("  Rising upward and undulating through the air, it closes with Jojo's twitching, dripping erection a second later.\n\n", false);
	
	outputText("The purplish-pink interior writhes and jiggles when a droplet of Jojo's pre-cum lands in the hose's moist insides.  It truly does seem to be alive.  Perhaps in reaction to your mouse's leaky, drooling shaft, the milker's hose seems to dilate wider and lurch upward.  It slurps up Jojo's prick in an instant, the only evidence of its rapid dick-devouring being the loud wet 'slurrrp' that still echoes throughout the barn.  The slut boy immediately groans from the onslaught of sucking sensation, trying to pump his hips into the pulsating cock-tube.  Of course, it's a futile effort - the harness holds him quite firmly in place, keeping him nice and immobile while every drop of precious 'milk' is sucked from his body.\n\n", false);
	
	outputText("Bouncing up, down, back, and forth, the milker twitches with every change of pressure and beat of Jojo's furiously pounding heart.  He whines pitifully, the sound a mix of begging and intense, erotic pleasure.  You gently caress his twitching sack, letting the heavy orbs roll back and forth between your fingers.  They even bounce from time to time, drawn tight every time the machine edges him closer to orgasm.  What an absolute marvel of demon technology.  It's able to take a body to the very brink of release and then back off.  It keeps the victim on edge as long as possible in order to maximize the user's (or victim's?) eventual 'output'.\n\n", false);
	
	if(player.hasCock()) {
		//(Cock - too big!)	
		if(x < 0) {
			x = player.biggestCockIndex();
			if(flags[333] > 0) outputText("You know from experience that machine usually takes an hour before it will allow release", false);
			else outputText("You figure the machine will probably pump him for quite a while before it allows release", false);
			outputText(", and you're getting quite turned on from the show.  You shuck your " + player.armorName + " and pull out " + oMultiCockDesc() + ", feeling ", false);
			if(player.lust < 50) outputText("it stiffin in your hand", false);
			else outputText("its rigidity with your hand", false);
			outputText(".  For his part, Jojo doesn't even notice.  He just moans, squirms, and twitches any time he's brought particularly close to orgasm.  You sigh, wishing you were small enough to fit inside him, but there's more than one way to fuck a mouse.  Resting your heavy male endowment between his asscheeks, you twirl his tail around your member and turn it into an impromptu cock-ring.  Jojo cranes his head back to see what's going on.  His blush seems to deepen three shades at the sight.  Giving him a wink, you start rocking back and forth.  His ass serves as the perfect hotdog 'bun' while the tightness of his tail keeps your " + cockDescript(x) + " so hard it feels like it could burst.\n\n", false);
		}
		//(Cock - butt rape!)
		else {
			if(flags[333] > 0) outputText("You know from experience that machine usually takes an hour before it will allow release", false);
			else outputText("You figure the machine will probably pump him for quite a while before it allows release", false);
			outputText(", and you're getting quite turned on from the show.  You shuck your " + player.armorName + " and pull out " + oMultiCockDesc() + ", feeling ", false);
			if(player.lust < 50) outputText("it stiffin in your hand", false);
			else outputText("it's rigidity with your hand", false);
			outputText(".  For his part, Jojo doesn't even notice.  He just moans, squirms, and twitches any time he's brought particularly close to orgasm.  You smile and push forward, sheathing yourself inside Jojo's spasming asshole.  His happily convulsing muscles clamp tight around you, seizing your " + cockDescript(x) + " in his hot innards.  Swatting his plump, furry cheeks, you start to fuck him, noting that the machine all but stops its rhythmic motions.  It seems pounding Jojo's prostate into mush is as effective at milking his dick as the unholy semen-seeking machinery.\n\n", false);
		}
		stats(0,0,0,0,0,0,-100,0);
	}
	//(Vagoozle!)
	else if(player.hasVagina()) {
		if(flags[333] > 0) outputText("You know from experience that machine usually takes an hour before it will allow release", false);
		else outputText("You figure the machine will probably pump him for quite a while before it allows release", false);
		outputText(", and you're getting quite turned on from the show.  You shuck your " + player.armorName + " and reveal your " + vaginaDescript() + ", feeling your " + clitDescript() + " grow firm and hard.  For his part, Jojo doesn't even notice.  He just moans, squirms, and twitches any time he's brought particularly close to orgasm.  Seating yourself down below him, you let your fingers play across your now-wet folds, caressing your labia before you slide a few digits inside.  You brush your thumb against your clitoral hood and shudder from pleasure, enjoying watching your pet get milked as much as he's enjoying the milking.  ", false);
		if(player.clitLength > 3) outputText("Your other hand grabs your penis-sized 'button' and begins to jack it, the action sending tremors of sensation through your " + hipDescript() + ".  ", false);
		outputText("Feeling naughty, you sit up straight and lick at Jojo's twitching balls, observing his shame as he squirms on your nose.\n\n", false);
		stats(0,0,0,0,0,0,-100,0);
	}
	//(NEITHER!)
	else {
		if(flags[333] > 0) outputText("You know from experience that machine usually takes an hour before it will allow release", false);
		else outputText("You figure the machine will probably pump him for quite a while before it allows release", false);
		outputText(", and while you're getting quite turned on from the show, you lack the equipment to take care of your lusts in a satisfactory way.  Meanwhile, Jojo is just moaning, squirming, and twitching each time he's brought close to orgasm.  You sit down and watch the machinery take your mouse-toy to task, wishing you had similar endowments you could be taking care of right now.\n\n", false);
		stats(0,0,0,0,0,0,50,0);
	}
	
	outputText("At long last, the appointed time has come, and Jojo lets out the most lewd-sounding squeak you've ever heard come from his mouth.  His ass-cheeks and legs clench and flex against their restraints", false);
	if(player.hasCock()) outputText(", squeezing your " + cockDescript(x) + " with agonizingly pleasurable pressure", false);
	outputText(".  His back arches in ecstasy.  Most noticeably, the tube slurping on his cock is suddenly distorting as thick, round globules of mousey seed are sucked towards the wall.  The bulges are quickly smoothed out into one long, hose-dilating river of rodent-spooge.", false);
	if(!player.hasCock() && player.hasVagina()) outputText("  His balls tremble and shrink in your mouth, pumping his prodigious semen out, wasting it in exchange for a pittance of gems.", false);
	outputText("\n\n", false);
	
	if(player.hasCock()) {
		//(Too big dick: 
		if(player.cockThatFits(40) < 0) outputText("You release your cum all over Jojo's back, matting his white fur with cum.  Each successive splatter of spunk makes the mouse look even more like a semen-drenched whore.  It's a good look for him.", false);
		else outputText("You pull out and release your cum all over Jojo's back, matting his white fur with cum.  Each successive splatter of spunk makes the mouse look even more like a semen-drenched whore.  It's a good look for him.", false);
	}
	else if(player.hasVagina()) outputText("You climax and clamp down on your fingers, squeezing your hand as your own cries of pleasure mix with your cock-toy's milked-out moans.", false);
	else outputText("You sigh wistfully as Jojo ejaculates his load, wishing you could feel such exquisite sensations.  Maybe you can find something to give you some proper sexual organs soon?", false);
	outputText("  Though he cums for minutes on end, the machinery doesn't seem to have much problem keeping up.  Eventually the hose pops off and drags back towards the wall, leaking a small trail of mouse-spunk on the floor.\n\n", false);
	
	outputText("Jojo is lowered to the ground and released.  He immediately nuzzles against you, still trembling from the force of his orgasm and clearly thankful for the treat.  ", false);
	
	//(COPY PASTA REGULAR MILKER STUFF: A loud 'ding' chimes and a panel displays 0.864 Ls.  Ten gems roll out into a collection plate.  Whitney really put a lot of work into this!  You pocket the gems and g
	jojoMilkPay();
	
	outputText("o on your way, dragging an exhausted mouse behind you as you head back towards camp.", false);
	doNext(13);
}

function repeatMilkJojo(tentacle:Boolean = false):void {
	spriteSelect(34);
	outputText("", true);
	//Jojo Repeat Milking - Non Tentacle (edited)
	if(!tentacle || !tentacleJojo()) {
		outputText("You call for your corruption-filled mouse-pet, and Jojo immediately bounds out of the woods on all fours, his bloated dick practically dragging the ground as it dribbles behind him. He looks up at you with eyes full of hope, still remembering the pleasure of his last trip to the farm.  You sigh and say, \"<i>Yes, I'm going to take you for another milking.  Are your balls nice and full?  I expect you to earn me a few gems, my little cum-cow.</i>\"\n\n", false);
		
		outputText("Jojo nods his head eagerly and sits up on his haunches, his hand darting down to fondle his dick for you and show you just how much it dribbles now.  He seems to be more than ready for another session.  You start leading him to the farm, listening to him moan and pant behind you.  Drops of pre-cum splatter into the ground with every movement, and you realize he seems to be leaking a little more heavily than the last time the two of you embarked on this journey.  Somehow either the milkers or what you did originally must be slowly increasing his 'productivity' the more he empties out.  Perfect!\n\n", false);
		
		outputText("In no time, the two of you are back inside the barn.  Jojo practically leaps into the stall, helping you strap him into the harness in record time.  His dick ", false);
		
		if(jojoCumQ() < 1000) outputText("has already dripped everywhere, making a mess of the floor.", false);
		else if(jojoCumQ() < 4000) outputText("is drizzling a steady flow of man-slime, puddling on the floor.", false);
		else outputText("is already pouring out a river of pre-cum, turning the floor into a slippery morass.", false);
		outputText("  The mouse is quickly immobilized and left to hang there, waiting on you to finish strapping him into his place.  You tune out his frantic whines and admire your handiwork.  Jojo is utterly restrained and hanging in the air.  His dick is throbbing and dripping in anticipation.  Even his balls are twitching and shuddering, aching to release their heavy cream.  You give his weighty orbs a squeeze and pull the last strap into place, activating the machinery.\n\n", false);
		
		outputText("Your white-furred slut is hauled up into the air, kept up high enough that he can't get any kind of traction.  He can barely move at all!  Well, most of him can barely move - the way his dick is bobbing around makes it clear that no matter how you tie him down, Jojo will find a way to squirm like a bitch.  Once again, the wall pops open and releases a thick tube.  Just looking at the pulsating purple opening, you can tell it will be a near-perfect fit for your fuckpet's throbbing erection.  The faint sounds of suction mix with wet squishes as the hose rises up, homing in on Jojo's bouncing shaft.\n\n", false);
		
		outputText("Lunging forward, the tube's opening slips around your mouse's cock-head, slurping it up as the sound of mechanized suction whines higher.  Jojo's own voice rises as well, matching the machine pitch for pitch as he moans in bliss.  Lurid slurps fill the barn as the tube greedily devours the mouse's boner, eventually coming to rest snugly against his groin and bouncing, squirming gonads.  Now that his member has been completely encapsulated by the machinery, Jojo sighs blissfully.  His hips are rocking gently against the restraints, as if it would somehow increase the pleasure coursing through his penis.  You know better - he gets to hang there on the edge for most of the next hour.\n\n", false);
		
		outputText("Giving your furry slut's clenching ass a smack, you walk around in front of him, nearly tripping over the bouncing tube as you change position.  Jojo's panting with his eyes nearly rolled back into his head.  Every fifteen seconds or so his body will clench, only to have the cock-sucker's motions slow torturously.  He squeals and squeaks each time as if it was the first time.  You scratch him behind his large, dish-shaped ears as words bubble up from within you.  \"<i>Good pet.  You love being milked.  Your balls get so full and heavy... so full of spunk.  They ache don't they?  Yes... they hurt you so bad.  You get so much cum pent up in there, and you can't let it out, not without being sucked like this.  Shhh... shhh... it's okay.  Just enjoy how perfectly swollen your balls are getting.  You can let it out eventually.</i>\"\n\n", false);
		
		outputText("Jojo's eyes roll the whole way back for a moment, and his mouth begins to froth as he utterly caves in to his animal, pleasure-seeking instincts.  You lean back against a smooth part of the wall and shed your clothes, beginning to masturbate directly in front of your stall.  In time, your own pleasured moans draw your pet from his pleasure-induced stupor, and he watches with wide, bloodshot eyes as you bring yourself off to climax after climax", false);
		if(!player.hasCock() && !player.hasVagina()) outputText(", even though to do so you're forced to stimulate your " + assholeDescript(), false);
		outputText(".  His twitching rodent-nose sniffs at the air wildly as he pants, inhaling your scent between long, forlorn sounding moans.\n\n", false);
		
		outputText("Jojo's muscles seize, and you can tell his orgasm has arrived.  You smirk and lean closer, tugging an ear close to your mouth for another dose of 'encouragement'.  \"<i>Cum for me, pet.  Let all that spunk clogging up your balls boil out into the milker.  Give it all up for me.  Just let out every... thick... pent-up... liter of your seed.  Empty it all!  Cum and squirt until your balls are as empty as your virtue!</i>\"\n\n", false);
		
		//(\"<i>Normal</i>\" Jojo cum) 
		if(jojoCumQ() < 1000) {
			outputText("Your poor semen-slave does not disappoint.  His balls, looking far more swollen than when you arrived, tremble beneath him in time with his bouncing cock, convulsing as they begin to obey your commands.  Big spheres of cum suddenly distend the hose, stretching it with their liquid weight as they're pumped away toward the wall.  Jojo happily squeaks with each fresh burst he releases, though he rapidly devolves into just constantly screeching and moaning as his dick begins to continually twitch, unloading the rest of his spermy cargo in one thick deluge.  He hangs over the slightly dilated, whirring hose as it slurps down all of his cum.  Eventually, the mouse is totally drained, and his body goes limp in the harness.\n\n", false);
			outputText("The hose slides off Jojo's softening member and heads back to the wall, trailing mouse-slime as it goes.  At the same time, Jojo is lowered down to the floor.  He stands up on wobbling feet and stumbles down to kneel beneath you.  Looking up, he pants, \"<i>Did I cum enough?</i>\"\n\n", false);
			outputText("You pat his head and answer, \"<i>Yes, for now.  I expect your swollen balls can do better next time though, can't they?</i>\"\n\n", false);
		}
		//(\"<i>Big</i>\" Jojo Cum)
		else if(jojoCumQ() < 4000) {
			outputText("Your poor, pent-up semen-slave does not disappoint.  His swollen balls look like heavy grapefruits, only with a much different juice inside them.  Trembling to obey your commands, the hefty spheres bounce and shake, starting to pump out their syrupy rodent-sludge into Whitney's retrofitted demonic machinery.  Just below his swollen tip, the hose massively distends with cum in one climactic moment, accompanied by a squeal of pleasure from your slut.  You can hear the device's humming jump an octave from the heavy load it's being forced to accept, but it seems to manage well enough.  The blob slowly flattens out as it's siphoned down the spunk-devouring tube, just in time for another fat sphere to bloat the hose.  Jojo's eyes roll back, showing you just the whites, and he simply sits and shakes, depositing an inhuman amount of jizm into the milker's ravenous tubing.  After a time, the drained mouse goes limp, his dick still releasing a little a more cream even after he goes unconscious.\n\n", false);
			
			outputText("Finished, the hose slides off Jojo's hard, cum-drooling cock and retracts towards the wall, leaving a messy trail of mouse-spunk in its wake.  At the same time, Jojo is lowered down to the floor.  He finds his bearings, waking up to stumble over to kneel before you.  Looking up, he pants, \"<i>Was... was that enough?</i>\"\n\n", false);
			
			outputText("You pet him affectionately and answer, \"<i>Not too bad, pet.  I still think those balls of yours can do more.  Maybe someday you'll put out so much that the machine can't take it.  Only then will you be cumming enough for me.</i>\"\n\n", false);
		}
		//(\"<i>Victory</i>\" Jojo Cum)
		else {
			outputText("Your poor, pent-up semen-slave does not disappoint.  His swollen balls are huge and heavy, swaying back and forth as they shudder and shake with the massive amount of jism they've built up.  Suddenly, they convulse in sync, absolutely flooding the milker's tube with a torrential spurt of mouse-cum.  Globules of jizz leak out around the seal at Jojo's crotch, drizzling down his stretched sack to drip to the floor in gooey strands.  The hose doubles in size, more reminiscent of a rubber balloon than a mechanical device.  Jojo is simply cumming far too hard and too fast for the machinery to handle.  Meanwhile, the noise of the milker's motor jumps up three octaves, becoming an earsplitting whine.  With the seal around your slave's cock failing, the tube is starting to slide off.  He really did it this time!  You rush underneath Jojo and grab hold of the tube with both hands, ramming it back up his shaft in time for his next gigantic pulse of cum to wash through the tube.  Some of it sprays out around the seal, but you hang on for dear life as your mouse's amazing orgasm floods into the receptacles.  He quickly slumps in his hardness, but you keep the milker in place until every drop has been siphoned from his body.\n\n", false);
			
			outputText("Finally finished, you release the tube and let it slither towards its home in the wall.  It burps out a wave of cum that stains the floor as it goes.  Meanwhile, Jojo's dick is still rock-hard and dumping his alabaster slime.  Once lowered to the ground, he rouses from his state and drops to his knees, right in the middle of his spunk-puddle.  With heavy-lidded eyes, he asks, \"<i>Did I cum enough?</i>\"\n\n", false);
			
			outputText("You pet him affectionately and reply, \"<i>Yes you did.  You're such a good cum-slave.</i>\"\n\n", false);
		}
			
		jojoMilkPay();
	
		outputText("o on your way, dragging an exhausted mouse behind you as you head back towards camp.", false);
	}
	//TENTACLE JOJO MILKING (edited)
	else {
		outputText("You call for your mutated mouse, and Jojo immediately lumbers out of the woods on all fours, his bloated tentacle-cock dragging on the ground and painting a trail of spooge behind it.  He looks up at you with eyes full of hope, two indistinct bulges on his shoulders twitching in excitement as he remembers the last time you took him to the farm.  You sigh and ask, \"<i>I suppose you're thinking I'll giving your tentacles a nice, firm milking, huh slut?  Well it looks like you lucked out today, but you had better cum hard enough with those three cocks to impress me.</i>\"\n\n", false);
		
		outputText("Jojo nods his head, his shoulder-tentacles starting to engorge and lift out of his fur, already aching for another session.  You slap one of them, causing them to retract, and start leading him towards the farm.  The whole time he's dripping splatters of pre-cum everywhere, letting his swollen penis drag through the grass and leave a slimy trail in his wake.  What a mess.  You idly wonder if his time in the milkers has increased his virility, but as much cum as he leaks at any given time, it'd be hard to tell without an objective measurement.  Lucky for you, you're about to get one.\n\n", false);
		
		outputText("In no time, the two of you have slipped back inside Whitney's barn.  Jojo rushes to the stall, snuggling himself into the harness in no time.  His dick unspools from his crotch, hanging down to the floor while his two shoulder tentacles enlarge, slowly lowering themselves down alongside it.  All three start drizzling pre-cum as you work to buckle him the rest of the way into his harness.  Though he's immobile, he does not sit idly by while you secure his restraints.  Each of the three prehensile penises turns towards you and wraps around your " + player.legs() + ", sliding along your body in a show of perverse affection.  Even his heavy balls are shaking in anticipation.  You give them a gentle caress as the last part of his harness is secured.\n\n", false);
		
		outputText("With a sudden lurch, Jojo is lifted towards the ceiling in order to immobilize him for his milking.  Obviously the designers of such machinery did not count on their victims' having lengthy tentacle-cocks.  As soon as the wall panel opens to release the hoses, Jojo's vine-like pricks go into a frenzy, tangling around each other as they await their chance to get milked.  Three hoses snake from the wall, sliding across the floor with odd undulations.  The tentacle-mouse in the harness doesn't seem inclined to wait, and in a blur of movement, he swiftly plugs each of his three penises into an appropriate orifice.  The purple, flesh-like interiors easily accommodate the sudden penetration, at least initially.  Jojo's penises keep pushing, and you're treated to a view of the tubes distending as they're forced to swallow several feet of mouse-cock.\n\n", false);
		
		outputText("Smiling, you begin stroking on one of the tentacles where it emerges from his shoulders, encouraging him to stuff yet more penile tissue inside the milker's sucking embrace.  Of course he's already trying, but the added stimulation can't hurt.  You've truly made this mouse into the perfect fuck-toy.  If only there was a way to suck the pussy-juice from his trio of tail-tentacles, it would perfect!  Between Jojo's forceful thrusting and the milker's incessant advances, the mouse's three shafts are soon girded in flexible, flesh-lined tubing.  They flail around on the slick floor, motivated by the pulsating bursts of vacuum and your pet's frenzied spasms.\n\n", false);
		
		outputText("You carefully pace around the edge of the of the stall, moving carefully to avoid tripping up on the wildly-waving hoses.  Once you get in front of him, you grab the mutant rodent's ear and begin to whisper instructions to him.  \"<i>You need to flood this machine, pet.  Feel all that jizz, feel it building up inside you, backing up inside your swollen, cum-heavy nuts.  You're just filling up with spunk, aren't you?  Good.  Stay there and enjoy the cock-massages while you watch me masturbate.  I expect you to be messy enough to need a mop when we're done, understand?</i>\"  There's a dark undercurrent to your words, similar to the one you used when initially corrupting the mouse.  It destroys any doubts you had about his output - he'll be every bit as messy as you instructed him to be.\n\n", false);
		
		outputText("Leaning back, you let your fingers casually attend to your own growing needs.  Seeing Jojo's extraordinary form succumbing to its lusts has stirred up some arousal within your own ", false);
		if(player.gender > 0) outputText("loins", false);
		else outputText("body", false);
		outputText(".  You close your eyes and forget about the mouse, stripping out of your clothes to expose your nudity  to questing hands.  As you work yourself into a sexual frenzy, you become more aware of Jojo's lusty, panting gaze on your exposed skin.  ", false);
		if(flags[23] > 0) outputText("An exhibitionist thrill shivers through you at the thought being watched while engaged in such a carnal act.  ", false);
		outputText("Your climax comes as fast as it is hard, breaking over you in a concussive wave of bliss.\n\n", false);
		
		outputText("Blinking the stars from your eyes, you look up to see Jojo hanging there, panting and shaking.  The ever-present mechanical hum incrementally increases in pitch, climbing all the way to a keening wail that would put a banshee to shame.  Swollen bulges of cum are coursing through the tentacle-slut's members, distending the shafts and the tubes struggling to encapsulate the newfound girth.  Jojo's eyes roll back while frothy spit drips from his open maw and dangling tongue.  His body strains at the harness' bindings, the huge, dangling orbs between his legs visibly contracting as their cargo is released.  Semen bubbles from the seals at the edges of hoses as your pet drowns the cock-milker in spooge.  Gauges on the wall rapidly switch to 'F', one after another.  The last meter tops out, and then the pressure is blasting the suckers off his dicks, sending the sperm-packed machinery flying from the sheer, cummy pressure.\n\n", false);
		
		outputText("Jojo sags down in the harness while his members finish releasing their load.  The leftovers from his orgasm easily fill the stall with at least a foot of cum.  You sigh at the realization that both you and your clothes are utterly drenched.  The harness unceremoniously dumps Jojo into the puddle of his own making, and as he rises, he hugs your " + player.legs() + " and says, \"<i>Thank you.  Did... did I cum enough?  I'll do more next time, I promise!</i>\"\n\n", false);
		
		outputText("You scratch his jizz-slicked fur and let him know that he did great.  ", false);
		jojoMilkPay(true);
	
		outputText("o on your way, dragging an exhausted mouse behind you as you head back towards camp.", false);
	}
	stats(0,0,0,0,0,0,-100,0);
	doNext(13);
}
//Use Jojo to pay for Hair Care 
function jojoPaysForPerms():void {
	spriteSelect(34);
	outputText("", true);
	outputText("Lynnette the goblin answers the door and lets you in, waving you deeper into her shop.  Her shining black dress barely contains her fertile-hips and jiggling chest as she greets you, \"<i>Welcome back honey!  Who's the cutie?</i>\"\n\n", false);
	
	outputText("You answer that your pet mouse, Jojo will be taking care of payment for you today.  Lynnette looks doubtful, but she quickly drops to her knees in front of the mouse, determined to get her payment one way or another.  Jojo's forearm-length erection immediately makes itself apparent.  The goblin matron coos at the sight, humming happily once she sees the rivulets of pre-cum streaming down your slut's cock.  In one smooth motion, she devours the heavy mouse-shaft, sliding her lips down all the way to the base.\n\n", false);
	outputText("Jojo moans and reaches for Lynnette's hair, but you stop him with a sharp command.  He's paying for your services today, not getting a reward.  Big, lusty eyes look up at him from his loins, and he shudders, his heavy balls clenching and relaxing from the goblin's perfect throat-fuck.  She reaches up to caress them, ", false);
	if(jojoCumQ() >= 4000) outputText("and releases a surprised gurgle when she feels just how heavy and full they've gotten.  All that time at the milker has clearly done Jojo's body good, and Lynette is likely to leave with a mouse-milk mustache.", false);
	else if(jojoCumQ() >= 1000) outputText("and releases a surprised gurgle when she discovers their size.  Clearly all the trips to the milker have given Jojo an impressive set of testes.", false);
	else outputText("and rolls them back and forth in her fingers, expertly pleasuring Jojo.", false);
	outputText("  In no time flat he's reached the edge of his endurance.\n\n", false);
	
	outputText("Lynnette, for her part, has two wet stains on her blouse, but she ignores them as she gives the mouse's nuts a gentle squeeze.  He cums easily and hard from that little bit of extra stimulation.  The goblin's throat works to devour it all", false);
	if(jojoCumQ() < 1000) outputText(", readily swallowing most of it.  After a short time, she pulls back and lets him finish by filling her mouth.  In turn, she spits the sticky mess into a funnel that leads to who-knows-where.", false);
	else if(jojoCumQ() < 4000) outputText(", swallowing as much as she can.  Still, Jojo is pumping out enough that Lynette's belly quickly grows even more gravid, and the semen froths at the edges of her lips.  Eventually she just gives up and pulls off, aiming him at a funnel.  She keeps stroking his spit-slicked shaft as he's drained off that way, the goblin's grin growing a touch manic at the sight of that much seed being collected.", false);
	else outputText(", but there's no way she can keep up with Jojo's ridiculous cum-production.  Two jets of seed leave her belly stretched to its limit, and the goblin matron quickly pulls back with a panicked look in her eyes, barely aiming Jojo's spunk-sprayer at the funnel in time for it to be filled by the next blast.  Watching with rapt attention, the green-skinned girl smiles wider and wider when she realizes just how much your pet can produce.  It's quite some time before his flow tapers off, but Lynnette doesn't seem to mind at all.", false);
	outputText("  Perhaps one of her daughters has the other end of that pipe jammed into her pussy?\n\n", false);
	outputText("Lynnete pants", false);
	if(jojoCumQ() >= 1000 && jojoCumQ() < 4000) outputText(" with a smile", false);
	else if(jojoCumQ() >= 4000) outputText(" with a dazed, crazy-looking smile", false);
	outputText(", \"<i>What'll it be today?</i>\"\n\n", false);
	salonPurchaseMenu();
}

//Scene 1: Amily Teaches Jojo How To Give Blowjobs. (Z)
function amilyTeachingJojoBJ():void {
	clearOutput();
	//First time version	
	if(flags[TIMES_AMILY_AND_JOJO_PLAYED_TIMES] == 0) {
		outputText("Your pet mice make an appearance as you're plotting your next move, Amily practically dragging Jojo behind her, ignoring the thick ropes of spunk he drizzles on the ground in his path.  He pants and whines, \"<i>-don't wanna suck cocks!  Fucking is totally better.</i>\"");
		outputText("\n\nAmily turns about and boxes his rebellious little muzzle.  \"<i>You need schooling in how to properly please our [master].  Do you honestly think [he] will be satisfied with just plowing your ass or riding your thick... drooling... cock...</i>\" Amily's question trails off as she reaches down to caress Jojo's ever-present, cum-slicked boner.");
	}
	//Repeat
	else {
		outputText("It seems Amily and Jojo are together again, this time in the center of the camp.  Amily is holding Jojo's swollen balls in one hand as she graphically explains how a proper slave should swallow every drop of cum in order to please his [master].  Jojo is panting, his tongue lolling from his mouth as he absently agrees with Amily's particularly pleasurable demonstration, too focused on her fingers to pay attention to her words.");
		outputText("\n\nThe corrupted girl's demon-like tail swishes angrily, and she squeezes his throbbing sac as she chides, \"<i>Are you even listening, cum-for-brains?!</i>\"  A thick rope of pre-spunk squirts from Jojo's cum-slit, splashing against her chin and sending a bone-deep shudder down her spine and into her over-sexed loins.");
	}
	flags[TIMES_AMILY_AND_JOJO_PLAYED_TIMES]++;
	//Universal Outro
	outputText("  She seems visibly distracted by the mouse's boner, and will likely wind up fucking him soon.  [if (hasCock = true) \"Do you surprise them both by allowing Amily to demonstrate on you?\" else \"Do you want to watch them fuck?\"]");
	var demon:Number = 0;
	if(player.hasCock()) demon = 3452;
	simpleChoices("Demonstrate",demon,"Watch",3456,"",0,"",0,"Leave",1);
}
//Scene 1 Result: Male Gets BJ (Z)
function BJRidesGETYOUONE():void {
	amilySprite();
	clearOutput();
	outputText("You step into view and knowingly ask just what all the fuss is about.  Amily meekly prostrates herself before you, apologizing, \"<i>I'm sorry, [master], I merely wanted to help your boyslut learn to satisfy your needs better.</i>\"  You wait, just long enough to make her nervous.  The pregnant pause hangs in the air as both your murine whores look increasingly worried, their large, radar-like ears twitching fitfully about as they await your response.  Laughing, you undo your [armor] and ask Amily how she planned to teach without a proper 'teaching tool'.");
	outputText("\n\nThe succubus-tainted mouse looks up at you with lust pooling in her large, languid eyes.  \"<i>As you command, [master],</i>\" she whispers eagerly as she rises her feet, her spaded tail curling behind Jojo's neck, dragging him closer to you.  Flopping free, [oneCock] dangles enticingly in the air before them, swaying back and forth to a rhythm that seems almost hypnotic to your poor, corrupted sluts.  They zero in on your [cock biggest] as if it were the only thing in the world.  Even Jojo's reluctant attitude evaporates when faced with the irresistable allure of your swinging manhood.  He sits at your [feet] as eagerly as his teacher, his expression an ecstatic portrait of mesmeric cock-worship.");
	outputText("\n\nTaking your [cock biggest] in hand, Amily begins to caress it in adoring reverence before beginning her lecture.  \"<i>It's important to make sure you've gotten your [master]'s attention before really getting into it, particularly if [he] isn't fully hard yet.  As you can see, [name] is already pleased by my devotion to [his] cock.  Of course, the direct approach can often work just as w-</i>\"  Amily cuts herself off by jamming ");
	if(player.biggestCockArea() > 50) outputText("as much of your [cock biggest] as possible");
	else outputText("your entire [cock biggest]");
	outputText(" into her mouth and throat.  The tight warmth of your pet's puffy, corruption-engorged cock-sucker shoots tingling thrills of delight through your maleness, and as she's careful to guide the sensitive underside along her tongue as she swallows, [eachCock] soon stiffens to a full, throbbing erection.  You cannot help but groan at the skillful sucking, and when Amily pops off a moment later, she looks quite pleased with herself.");
	outputText("\n\n\"<i>Our [master] very much enjoys the wet suction of a skilled mouth and gratifying [him] is a decadent pleasure in and of itself.  Just taking [him] inside my lips makes me so wet!</i>\" Amily cries as she resumes stroking you.  Jojo glances away from the handjob long enough to see the streamers of girl-honey hanging from Amily's nethers, and he moans lustily.  Amily barely notices, too intent on pleasuring your [cock biggest] to worry about Jojo's inattentiveness.  She jacks your spit-soaked tool with neat, even strokes all the way from [sheath] to [cockHead biggest].  Sighing, you edge your [hips] forwards to give her better access to and encouragement from your excited loins.");
	outputText("\n\nSensing your need, Amily begins to pump faster as she continues her instruction, \"<i>You have to pay attention to your [master]'s body when you do this.  See the little twitches, how [his] [hips] and shaft are bouncing for [his] little slut?  That means I'm being a good cum-slut.  I made [his] cock happy.</i>\"  Jojo nods and licks at his lips, watching in rapt study as Amily enthusiastically tends to your throbbing tool.   \"<i>You can't slow down here,</i>\" Amily continues, before spitting on her other hand and raising it to fondle your long member.  Your glossed prick slides easily through Amily's pink palms, filling the air with a wet squishing that brings drool to the lips of your mice.");
	outputText("\n\nJojo leans closer and closer to his female counterpart while that other works, nuzzling so close that they're soon cheek to cheek, ears flat against each other.  The feminine cum-junkie graciously points your [cock biggest] towards the former monk, and he nervously licks at your [cockHead biggest], each lap faster and more eager than the one before.  Soon he is slurping the entire tip into his maw and letting Amily squeeze the pre-cum onto his wiggling tongue.  Jojo's eyes cross to better watch the pumping passion under his nose, while your other cum-slut eggs him on with lewd, encouraging remarks. \"<i>You're a natural cock-sucker, Jojo.  The demons were right about us... we're meant to serve the powerful.</i>\"  She sighs and whispers, \"<i>...our [master].</i>\"");
	outputText("\n\nYou groan at the dual sensations assaulting your [cock biggest].  Four eyes look up, happily twinkling as they service you, their eager devotion nearly drawing your orgasm right there, the temptation to gush your jetting spunk into their whorish little ");
	if(flags[AMILY_NOT_FURRY] == 1) outputText("mouths ");
	else outputText("muzzles ");
	outputText("almost too great to resist.  Amily seems to sense this, obediently offering their bodies for your release. \"<i>[Master], would you like to fill your cum-slut's pussy or mouth?  Or maybe you want to give your bitch-boy a taste?</i>\"");
	//[Cum in Amily Mouth] [Cum in Amily Pussy] [Cum in Jojo Mouth]
	outputText("\n\nWhere do you cum?");
	//Pussy requires a minimum tallness?
	var puss:Number = 0;
	if(player.tallness > 55) puss = 3454;
	simpleChoices("Amily's Mouth",3453,"Amily's Pussy",puss,"Jojo's Mouth",3455,"",0,"",0);
}
//Fill Amily's Mouth (Z)
function fillAmilysMouth():void {
	amilySprite();
	clearOutput();
	outputText("You tell Amily to open wide, and she gleefully yanks your [cock biggest] away from Jojo.  He whines pathetically but, servile as he is, the mouse-boy [if (hasBalls = true) \"leans down to desperately suckle at your [sack], subserviently worshipping your bloated testes and their liquid bliss one after another; tonguing, sucking, and moaning into the spunk-bloated mass of your ambrosial scrotum.\" else \"leans down to slurp needily at the bottom of your cock, licking it with languid tongue-strokes each time Amily gives him an opening.\"]  Amily looks up at you, her cute, succubi-like horns glinting in the light as she purrs, \"<i>Please, [master], give slut a throat-thick load to swallow.  Fill your nympho's mouth-pussy with sticky baby batter and splatter her whorish face with oozing leftovers.</i>\"");
	outputText("\n\nThe mousette's chemically-engorged lips spread into an 'o', then happily devour most of your dick's straining length, leaving room at the base for her hands and Jojo's tongue to work.  She pumps you hard and fast, and you feel the telltale twitching of your internal muscles, signaling the crest of your onrushing orgasm.  Your [hips] jerk spasmodically as the pleasure overwhelms your control, but Amily holds on like a pro.  She slides her hot, wet little tongue along your member's underside again as your urethra fills with goo, and in one explosive moment, you propel the thick rope of seed hard into the hungry addict's throat.  You see her jaw work breathlessly as she swallows [if (cumQuantity >= 250) \"most of\" else \"all of\"] it.  You cum and cum for her, packing her worthless throat with your gushing cream, unloading even as she does her best to wring you dry (with Jojo's help).[if (cumQuantity >= 500) \"  Before long, her belly is nicely rounded from all the seed she's swallowed, a happy little bump visible on her lithe frame.\"][if (cumQuantity >= 1000) \"  Too full to keep drinking, she releases your [cock biggest] with a zestful gasp and gladly takes the next spurt directly on her face and hair.  The huge blob of cum soaks her ardent features, cataracts of jism cascading lazily towards the ground.\"][if (cumQuantity >= 3000) \"  You keep blasting her with ever-greater volumes of spooge until she's stained completely white with gobs of spunk and lounging euphorically in a deep puddle of it.\"]");
	outputText("\n\nThe sperm-filled girl burps and turns to kiss Jojo, the once-pure monk eagerly returning the embrace and getting a good taste for your seed as Amily fervently tongues it into his mouth.  She eventually pulls back to encourage him with an overwrought sigh. \"<i>Maybe if you service [master] better you'll be allowed to receive [his] seed next time.</i>\"  Jojo pants and licks at his lips, hands darting down to tend to his long-neglected phallus.");
	outputText("\n\nYour personal whore laughs and hugs your leg, whispering, \"<i>Cum-slut thanks you, [master].</i>\"  You pull her up and smile at her, glad she's working to make your budding harem as sexually adept as possible.  She beams and grabs Jojo with her tail, no doubt eager to drag him off for more training.");
	stats(0,0,0,0,0,0,-100,0);
	doNext(13);
}
//Fill Amily's Twat (requires not short-ass, weak-ass nigga) (Z)
function stuffAmilysMouthWithPostBJCUM():void {
	amilySprite();
	clearOutput();
	outputText("You tell Amily to hurry up and climb on.  With a squeak of joy, she bounds up into your arms, immediately sinking her plush little pussy onto your lap and swallowing your cocktip.  Surprising you with her control, she holds herself like that, restraining herself from taking in your whole [cock biggest] and instead bouncing up and down atop your peak while Jojo attends to the lower portion of your manhood with his eager tongue.  He tentatively licks along the swell of your shaft, sucking at the sensitive underside and planting desperate kisses over your length, lapping up Amily's freely flowing juices as she rides the crest of your pulsing tip.  The mouse-girl's ears tickle as they brush against you, her voice husky with desperate need.  \"<i>Please, [master], give slut your seed.  Her cunny needs to be filled sooo badly.  Make me your pregnant, baby-bloated whore, [master]!</i>\"");
	outputText("\n\nAs if you'd resist such an invitation!  You squeeze your demon mouse tightly and push her further down, impaling her juicy snatch ");
	outputText("on your rigid fuck-tool");
	outputText(".  She squeaks in surprise, her yelp turning into a high-pitched moan as your [cockHead biggest] widens in preparation for your looming orgasm.  Spunk forces your cum-slit open and sprays into Amily's clenching uterus, gorging her lascivious cunt with the virile seed it craves.  You hold her, impaled and squirming, as you continue to spray, inseminating her moist twat with squirt after squirt of oozing cock-nectar.[if (cumQuantity > 500) \"  Her belly rounds out delightfully from the extra stuffing.  You run a palm across it and smile when you feel your sperm churning under her stretched skin.\"][if (cumQuantity >= 1000) \"  Rivulets of spooge run from her overflowing pussy in thick cascades of pearl goo.  Jojo does his best to keep up, but even his growing lust for swallowing your cum can't match the volume of the salty surf foaming from the spasming girl's flush pussy.\"][if (cumQuantity >= 2000) \"  Amily's eyes roll back in complete pleasure as the pressure of your cum begins to cause the ejaculate to spout from her spunk-laden twat.  Jojo gives up on swallowing it all and leans back, opening wide to catch as much as possible as your second-hand seed showers the fallen monk, an ivory rain of hot slime splattering from your freshly stuffed slut's cream-sated cunny.\"]");
	outputText("\n\nSatisfied, you pull out and let Amily's insensate body slide off into the dirt.  She shivers and cups her box, trying to hold all the jizz inside her leaky quim as she comes down from the bliss of being your personal cock-sleeve.  Smirking, you work on getting dressed.  By the time you're ready to go, you realize Amily has stirred enough to pull Jojo between her legs.  His muzzle is lodged deep into the cum-slut's pussy, and she's moaning words of encouragement nonstop.  \"<i>Good boy... lick up [master]'s cum.  Savor its taste, its texture.  Don't worry, you'll never get it out of my womb.  Just drink it down, and maybe - if you're a good little bitch - [master] might let you have the next load.</i>\"");
	outputText("\n\nYou leave them behind with a spring in your step.  With a dedicated slave like that training your harem, you have no doubt that you'll be well taken care of.");
	stats(0,0,0,0,0,-1,-100,0);
	//{DONT FORGET PREGNANCY CHECK}
	amilyPreggoChance();
	doNext(13);
}
//Fill Jojo's Mouth (Z)
function fillJojosMouthWithHotStickyCum():void {
	spriteSelect(34);
	clearOutput();
	outputText("You point at Jojo and command, \"<i>Open wide.</i>\"  The former monk happily opens his muzzle broadly, so far open that his buck-teeth practically vanish into the roof of his mouth.  Amily looks disappointed, but then she consoles herself by [if (hasBalls = true) \"sinking down to covetously suck your swollen balls while \"]tugging on your shaft, squeezing it from stem to stern with hard, fast pumps.  Jojo's tongue slips out to lick the beading pre-cum from your [cock biggest] as it flexes powerfully in the other slut's grip.  Warmth races through your loins as you feel your orgasm approaching.");
	outputText("\n\nAn explosion of bliss burns in your head as [eachCock] spews its load.  Thick waves of pent-up jism spray out from your cum-slit, filling Jojo's mouth with honey-thick cream, and splatter across his nose and hair.  He gurgles as his mouth fills with your musky spunk and opens wider, keenly trying to catch as much of your seed as possible with his cum-dribbled face before he slurps it down in one sputtering gulp.[if (cumQuantity < 500) \"  You discharge your alabaster lacquer again and again, white-washing his already pale fur until his face seems little more than a glistening mask, dripping with your seething unguent.  Bound to your will, he patiently awaits your permission to swallow, his pacified mouth full to the brim, leaking out the sides in twin ivory cascades. You nod curtly and the tamed mouse-boy obeys happily, savoring the humbling salt of your overpowering jizz as it rolls down his throat.\" else \"  You spurt again and again, splattering heavy ropes of goo across his face and fur.  His mouth floods, too full of jizz to contain it all, giving the vanquished monk a thick glaze of cum that very quickly leaves his body with an oily sheen.\"][if (cumQuantity >= 1000) \"  He swallows, taking a blast of spunk across his brow, and opens up again, giving you another hole to aim for.  Another eruption of your virile seed rushes past his lips and coats the back of his throat in your fluid ivory, nearly drowning him as the column of jism gushes into his windpipe and up his nostrils, surging out of his nose.  The domesticated mouse gulps desperately at your slimy passion while your fountaining cum arcs to dump fat globs on his shuddering body.\"]  You finish and shove your [cock biggest] into his throat for cleaning.  Jojo happily obliges.");
	outputText("\n\nWhile one of your mouse-toys is polishing your rod, the other is masturbating and panting.  \"<i>Please, [master], may I... may I have some cum?  Can I... I lick him clean?  He's so...</i>\"  She inhales and luridly moans, \"<i>...messy.</i>\"  You give her your assent as you withdraw your spit-shined pecker from Jojo's maw, not caring how the two of them get their rocks off so long as your harem is kept well-trained and willing.");
	stats(0,0,0,0,-1,0,-100,1);
	doNext(13);
}
	
//Scene 2: Amily And Jojo Fuck (w/o Tentacles) (Z)
function amilyAndJojoFuck():void {
	spriteSelect(34);
	clearOutput();
	outputText("You find a nearby rock to perch on as the two mice begin to get more lewd with their actions.  Amily uses her tail to sit Jojo down in front of her, squeezing his taut balls in her hand and gasping when he spews a thick stream of pre-cum.  You use the commotion as cover to squeeze out of your [armor] and get comfortable.  Thankfully, neither of them hears you, or if they do, they don't care.  Amily titters, \"<i>Wow, no wonder [master] keeps you around with a cum-fountain like that!</i>\"  She gently traces a fingertip along the swollen underside of Jojo's cock, giggling when he, over-stimulated, immediately starts dripping fluid on her fingers.");
	outputText("\n\nJojo moans, \"<i>Ugh... stop... please Amily, please, can I cum?</i>\"  Amily jerks and shakes her head in disappointment.  She mouths, \"<i>Not yet,</i>\" and stands back up, turning around and pulling Jojo's muzzle into her slippery twat with her demonic tail.  The former monk's protests are muffled by Amily's sodden quim, and he soon begins to eagerly slurp at her drooling cunny.  With each enthusiastic lick, she reaches between her knees to caress Jojo's corruption-engorged cock, egging him on to please her more thoroughly.");
	outputText("\n\n\"<i>R-right there,</i>\" Amily moans, \"<i>Lick my clit!  Suck it!  Suck it bitch!</i>\"  Jojo reaches around her to find her tits, and he begins to knead them in his hands while he eats her out, matching his movements to the rhythm of his graceful tongue and the pulsing suction of his mindless lust on her drenched joybuzzer.  She shudders and cries out in euphoric mastery. \"<i>Yes!  Fuck yes!  Good bitch! GOOD BIIITCH!</i>\"  Jojo's muzzle and face darken from a sudden onslaught of moisture, and you realize Amily has just cum so hard her gushing orgasm has soaked his face with her glistening honey.  She tumbles down onto her hands and knees, groaning and shuddering as the spasming climax wracks her body and mind.");
	outputText("\n\nJojo sees his opening, and with surprising speed, he's up and on top of Amily, mounting her from behind like a beast in rut.  Even as far away as you are, you can hear the wet squelching sound of his massive dick spearing through Amily's sopping folds, even louder than Amily's lascivious exultations of pleasure.  For one with such a small frame, Jojo's movements have surprising confidence and strength.  His white-furred hips start to thrust into Amily with hard, fast motions.  Without the leash of a dominating partner, he's become like a feral animal, fucking her with no regard for her pleasure- only the suffocating, all-consuming need to BREED.  The soft patter of mousey cunt-juice splattering on the ground alerts you to Amily's shared urgency - she's getting off on being mindlessly ridden like a beast, coarsely degraded and carnally ravaged like the worthless cum dump she's willingly become.");
	outputText("\n\nThe succubus-like mouse's restless demonic tail twitches back and forth between Jojo's legs, then strikes, serpent-like, towards his distended cum-sack.  It twists around the top of his scrotum, pulling it tightly to perfectly outline the shape of his massive gonads through the lightly-furred skin.  Distressed by the new development, yet not slowing from the rapid pace of his bestial pounding, he throws his head back and releases a shrill, feminine squeak of impotent displeasure.");
	outputText("\n\n\"<i>Don't... unf... be a... unf... baby,</i>\" the demonic woman chides in between each jarring impact against her snatch, \"<i>I don't... uh... want... oooh... you cummMMING... ahhh... too soon.</i>\"");
	outputText("\n\nOf course, hearing her voice rise and fall in time with his frenzied pounding drives Jojo onward, fueling the mad fires of his perverted lust.  The mouse's hips pump faster, and Amily's entire body begins to tremble from the force of his blows.  His bound nuts sway dangerously, slapping noisily against Amily's sodden mons with each hard smack of his swollen girth.  The girl stops doing much of anything but moaning and shaking from the experience, her voice finally muffled into grunts and squeaks of muted enjoyment as the relentless mouse-boy tames the over-bold female, breaking her to the dominating frenzy of his squelching bitch-tamer.");
	outputText("\n\nJojo grabs her hair and pulls as he fucks her, growling against her ear.  You can see his balls bobbing and twitching through their bondage.  They're trying so hard to cum, and yet, Amily's vice-tight tail is keeping all that spooge bottled up inside them.  Jojo's sack even appears to be swelling under the pressure of their liquid weight.  In his frenzied desperation, the male mouse begins to nip and bite Amily's ears, bringing her to heel with the feral gesture of dominance.  It seems to pay off, as the corrupted mouse-girl begins to shiver and shake, losing a bit of her muscle control as she orgasms.  Her tail loosens, not completely, but enough for Jojo's visibly-pulsating nut-sack to unleash the tidal-wave of spooge that's been backing up inside and force it open.  You see his eyes clench, and then Amily's belly begins to bulge slightly.  His hips shiver, and the bulge grows.  It goes for what seems like ages - Jojo giving little shifts and sighs of pleasure, Amily's belly becoming more and more pregnant with cum.  It doesn't really sink in just how big she's gotten until you realize her belly has touched the ground.  It trembles and wobbles with fluid girth before the former monk has finally had enough and withdraws to hose her down with the last few thick strands of his seed.");
	outputText("\n\nJojo stands back and smiles, observing his handwork.  His dick never even goes soft.  If anything, you see his balls swelling back up to their normal size - well, the norm since you changed him.  He starts leaking pre again, and as he runs off towards the woods, you have to wonder if he's off to visit the flower in the corrupted glade.  Amily lies on her side and cradles her cum-stuffed belly, squeaking soft bleats of happiness as she tries to recover.");
	outputText("\n\nYou stealthily slide down the rock and get dressed.[if (hasVagina = true) \"  It isn't until you realize how wet your crotch is that you realized you masturbated yourself through a few orgasms as well.\" else \"  It isn't until you realize how clearheaded you are that you realize you masturbated while you watched.\"]  Maybe you'll get to catch them in the act again?");
	stats(0,0,0,0,0,0,-100,0);
	//{DONT FORGET PREGNANCY CHECK}
	//amilyPreggoChance();
	doNext(13);
}


function jojoRape():void {
	spriteSelect(34);
	slimeFeed();
	//Track Jojo rapeage
	if(player.hasStatusAffect("Ever Raped Jojo") < 0) player.createStatusAffect("Ever Raped Jojo",1,0,0,0);
	else player.addStatusValue("Ever Raped Jojo",1,1);
	//Fifth RAEP
	if(monk == 5) {
		outputText("Jojo smiles serenely, pleased at the outcome, a foot of tumescent mouse-meat bobbing at attention.\n\n", true);
		//Placeholder till I'm less lazy
		outputText("You fuck your mousey slut for what feels like hours, orgasming until both of you are tired and worn out.  ", false);
		stats(0,0,0,0,0,0,-100,0);
		fatigue(-20);
		if(player.lib > 40) {
			outputText("When you're done you feel more clear-headed, but Jojo looks hornier than ever.", false);
			stats(0,0,0,0,-4,0,0,0);
		}
	}
	//Fourth rape
	if(monk == 4) {
		outputText("Jojo flops down, eyes filled with anticipation.  His self-control has really slipped away.  The corrupted and horny mouse on display here is anathema to the studious monk you met before.  His cock is close to a foot long and over two inches thick, veiny with arousal.\n\n", true);
		//Male Version
		if(player.gender == 1) {
			outputText("The mousy former-monk kneels as you disrobe, his will nearly broken by desire.  ", false);
			if(player.cockTotal() == 1) outputText("You touch his head softly and guide him to your " + cockDescript(0) + ", smiling as he licks his lips with anticipation.  You gasp at the feeling of his soft lips and wet tongue as he pleasures you, your knees going weak from his efforts.  Jojo cups your balls and slips a fuzzy finger into your ass.  He labors to take as much of you as possible into his mouth, panting warmly and wetly around your " + cockDescript(0) + ".  You twitch in pleasure as he alternates pressure on your prostate with smooth strokes of his slick tongue.  ", false);
			else outputText("You touch his head softly and guide him to your " + multiCockDescriptLight() + ", smiling as he licks his lips in anticipation.  You gasp at the feelings of his soft lips and wet tongue on your heads as he pleasures you, your knees going weak from his efforts.  Jojo cups your balls and slips a fuzzy finger into your ass.  He labors to take in two shafts, struggling to swallow them as deep as possible, panting wetly around you.  You twitch with pleasure as he alternates pressure on your prostate with smooth strokes of his slick tongue.  ", false);
			//Too thick for him
			if(player.averageCockThickness() > 3 || (player.dogCocks() > 0 && player.averageCockThickness() > 3)) outputText("Jojo is forced to back off of your " + cockDescript(0) + " from time to time to come up for air, barely opening his jaw wide enough to take your girth back inside his mouth.  ", false);
			//Too long for him
			if(player.averageCockLength() > 10 || (player.horseCocks() > 0 && player.averageCockLength() > 10)) outputText("He struggles not to gag on your " + cockDescript(0) + "'s length, opening his throat as far as he can.  ", false);
			outputText("You rock back and forth on his face as he expertly keeps you on the edge of orgasm.  ", false);
			if(player.cumQ() > 25) outputText("Your constant stream of heavy pre practically chokes the poor mouse as he edges you mercilessly, his own equipment drizzling in sympathetic lust.  ", false);
			outputText("Jojo presses his paw hard into your ass, squeezing your prostate tightly as his hot muzzle dives deeply over your cock.  You feel the building tightness of your orgasm and pull him tightly against you as the pressure builds.  ", false);
			if(player.cumQ() < 25) outputText("You buck against him as you orgasm, your small squirts of cum eagerly devoured by the slutty mouse.", false);
			if(player.cumQ() >= 25 && player.cumQ() < 250) outputText("You buck against him as you orgasm, the slutty mouse's throat squeezing against you as he works to swallow your seed.", false);
			if(player.cumQ() >= 250 && player.cumQ() < 500) outputText("You spasm against him as you orgasm, the pleasure erupting into the slut-mouse's throat as he tries to swallow it all.  Excess cum dribbles from the corners of his mouth as you fully spend yourself.", false);
			if(player.cumQ() >= 500) outputText("You buck against him as you orgasm, the slutty mouse's cheeks bulging in surprise as your cum explodes into his mouth.  Thick streams escape from the corners of his muzzle, your seed pouring into him faster than he can swallow.  Eventually you finish, and see the mouse dripping with your spunk nearly to the waist, a small bulge in his belly.", false);
			outputText("  Jojo leans back, panting for breath, a dull smile on his face.  He spits a load of your cum into his paw and begins jerking himself off with it, lewdly putting on a show for you.\n\n", false);
			if(player.lib > 50 && player.cor > 80) {
				outputText("<b>You feel a familiar power growing within you and decide to unleash it.</b>  You grab the prayer beads from his outfit and spit on them, making them slick and wet.  Holding them below your flagging cock, you focus on the demonic visions in your mind, slowly but constantly milking larger and larger dollops of cum onto the once holy beads.  Jojo moans as he comes to understand your intent, and turns around, shaking his lithe mouse-bum at you.  You lean over him, whispering into his ear, \"<i>Each defiled bead I push into you is going to make you more of a willing slut.  More willing receptacle for demon cum.  More a fountain of desire waiting to be tapped by Succubi.  More my toy.</i>\"\n\n", false);  
				outputText("He whimpers as you slide the first bead in, his eyes growing foggy and his bum wiggling more eagerly.  You push the second bead inside him, and feel his asshole stretch and loosen, welcoming the corruption.  The third bead slips right in, and he moans, \"<i>sluuuut</i>,\" his cock grows longer and thicker throughout the moan, stopping at over a foot long and 3 inches thick, dribbling cum.  You whisper, \"<i>Cum, my Toy,</i>\" and push the remaining beads inside him.  His eyes roll back as his paws frantically milk his " + eCockDescript(0) + ", cum spraying from him like a fountain.  Jojo trembles, losing complete control and falling away from you.  You still hold the end of his beads, and smile as they pop out, stained almost as dark as the poor mouse's soul.\n\n", false);
				outputText("You walk away, leaving your new pet to explore his outlook on life, and to test your awakened powers.  ", false);
				monk++;
				stats(0,0,0,0,-10,0,-100,10);
			}
			else {
				outputText("Jojo eventually cums violently, collapsing into a puddle of spent jizz.  You smile and walk away, hoping to encounter him again.  ", false);
				stats(0,0,0,0,2, 0,-100, 1);
			}
		}
		//Female or Herm Version
		if(player.gender == 2 || player.gender == 3) {
			//Oral
			outputText("The mousy once-monk kneels as you disrobe, his will nearly broken by desire.  ", false);
			outputText("You touch his head softly, guiding him to your " + vaginaDescript(0) + ", lips breaking into a grin as he licks his mouth with desire.  You gasp at the feeling of his wet nose as it bumps against your groin, shooting thunderbolts of pleasure from your " + clitDescript() + ".  He attacks with his tongue, thrusting strikes practically attacking your " + vaginaDescript(0) + " with his long, practically serpentine, tongue.  You shudder, knowing a visible sign of corruption when you see it, moisture slicking the mouse's face.\n\n", false);
			outputText("Jojo moans into your folds as his " + eCockDescript(0) + " brushes against your calf.  You get a devilish idea, ", false);
			if(player.lowerBody == 8) outputText("and push his " + eCockDescript(0) + " in between folds of slime, sandwiching it in a mass of slippery, gooey tightness.  Holding his shoulder for balance, you slowly squeeze him, gently milking out small dribbles of pre.  He redoubles his efforts, burying his nose into your " + vaginaDescript(0) + ", tongue swirling over your folds and around your " + clitDescript() + ".  For every effort on his part you step up your own, squeezing and stroking him with your goo, doing your best to impart a fetish for being masturbated with someone's lower body on his slowly warping mind.  You feel a hot wetness in your slime, and it grows slicker and wetter every second. Jojo's cum drips out of you, glazing your jello-like form white.  ", false);
			else outputText("and push his " + eCockDescript(0) + " with your " + player.foot() + ", sandwiching it under one " + player.foot() + " and on top of the other.  Holding his shoulder for balance, you slowly squeeze him, gently milking out small dribbles of pre.  He redoubles his efforts, burying his nose into your " + vaginaDescript(0) + ", tongue swirling over your folds and around your " + clitDescript() + ".  For every effort on his part you step up your own, squeezing and stroking him with your " + player.feet() + ", doing your best to impart a " + player.foot() + " fetish on his slowly warping mind.  You feel a hot wetness on your " + player.feet() + ", and they grow slicker and wetter every second. Jojo's cum drips out from between them, glazing them white.  ", false);
			if(player.averageVaginalWetness() <= 1) outputText("You clamp down on his muzzle as you writhe in orgasm.  ", false);
			if(player.averageVaginalWetness() > 1 && player.averageVaginalWetness() <= 3) outputText("Your legs trap his muzzle in your " + vaginaDescript(0) + " as orgasm wracks your body.  ", false);
			if(player.averageVaginalWetness() == 4) outputText("Your legs trap his muzzle in your " + vaginaDescript(0) + ", slicking his muzzle with girlcum as you spasm with bliss.  ", false);
			if(player.averageVaginalWetness() == 5)outputText("Your legs squeeze him against your " + vaginaDescript(0) + ", girlcum erupting over his face and soaking him as you bliss out with orgasm  ", false);
			if(player.cockTotal() == 1) outputText("Your " + cockDescript(0) + " drizzles cum in his hair, some dripping off by his ear.  ", false);
			if(player.cockTotal() > 1) outputText("Your " + cockDescript(0) + "s drizzle him with cum, covering his head with thick white streams of your jizz.  ", false);
			outputText("Twitching weakly with pleasure, you fall back.\n\n", false);
			//Fux!
			outputText("The pleasure was magnificent...but you want MORE.  You push yourself up, feeling pleased as you spy Jojo stroking his cum-slick " + eCockDescript(0) + ", thick streams of cum leaking from the tip.  You pounce on him, pushing him down on the ground, and position your " + vaginaDescript(0) + " over him, allowing him to scent your sex.  With a triumphant smile, you sink down onto him,  impaling yourself on his " + eCockDescript(0) + ".  ", false);
			if(player.averageVaginalLooseness() == 0) outputText("He is painfully large, so much so that you feel more pain than pleasure.  ", false);
			if(player.averageVaginalLooseness() == 1) outputText("He stretches you around him like a latex glove, pulling your " + vaginaDescript(0) + " taught with his " + eCockDescript(0) + ", the sensation riding a razor's edge between pleasure and pain.  ", false);
			if(player.averageVaginalLooseness() == 2) outputText("His " + eCockDescript(0) + " stuffs you completely, filling your " + vaginaDescript(0) + " to capacity.  ", false);
			if(player.averageVaginalLooseness() == 3) outputText("His " + eCockDescript(0) + " fits you perfectly, burying deep inside your folds.  ", false);
			if(player.averageVaginalLooseness() == 4) outputText("You easily accomadate his member into your " + vaginaDescript(0) + ".  ", false);
			if(player.averageVaginalLooseness() == 5) outputText("His " + eCockDescript(0) + " slips inside your " + vaginaDescript(0) + " with little resistance, easily sinking in to the hilt.  You muse to yourself, \"<i>If only he were thicker...</i>\"  ", false);
			outputText("You ride him slowly, gyrating your hips in tiny grinding circles while you run your hands through his fur.  His hips bounce you gently with tiny twitching thrusts, cum pooling out of your " + vaginaDescript(0) + " as it continues to drip from him.  ", false);
			outputText("He gradually ups the tempo, and you are forced to go along for the ride as you begin to bounce on his " + eCockDescript(0) + ".  You grab fistfuls of his fur and hang on as he begins pounding your " + vaginaDescript(0) + ", his huge balls slapping against you.  Cum squirts from your pussy with each of his violent thrusts, more pouring deep inside you continually.  Jojo squeals with glee and slams his hips into yours a final time, triggering an eruption of seed in your channel.  You feel it pouring into your womb, slowly distending your belly with every shuddering pump of cum.  You orgasm helplessly, fingering your " + clitDescript() + " the whole time.  ", false);
			//Futacawk here
			if(player.cockTotal() > 0) {
				//Single Cock
				if(player.cockTotal() == 1) {
					//Horsefun!
					if(player.horseCocks() == 1) outputText("Your " + cockDescript(0) + " feels a building pressure, the whole thing pulsating wildly with each of your heartbeats, most noticably the tip, which flares out wildly.  Powerful contractions wrack your sheath and " + cockDescript(0) + " as pre practically fountains from it.  ", false);
					//DogFun!
					if(player.dogCocks() == 1) outputText("Your " + cockDescript(0) + " feels an intense pressure, and begins bulging out obscenely above your sheath.  The knot thickens gratuitiously, filling as it pulses with need.  Cum drips from your pointed tip as it continues to bulge wider, filling you with unbearable pressure.  ", false);
					//Else
					if(player.normalCocks() == 1) outputText("Your " + cockDescript(0) + " twitches, muscle contractions slowly working their way up from the base.  ", false);
					//CUMSPLOISION
					if(player.cumQ() < 25) outputText("Your body tenses and cums, spraying spurts of jizz over the mouse.  ", false);
					if(player.cumQ() >= 25 && player.cumQ() < 250) {
						if(player.horseCocks() == 1) outputText(" Your " + cockDescript(0) + " flares wildly as musky horse-cum erupts from it, splattering over Jojo.  ", false);
						if(player.dogCocks() == 1) outputText("The terrible pressure in your " + dogDescript(0) + " finally relents, in the form of a fountain of doggie-cum, spraying out from your " + cockDescript(0) + " in a steady stream that seems to last and last.  ", false);
						if(player.cocks[0].cockType == 0 || player.cocks[0].cockType > 2) outputText("Your body tenses and cums a thick eruption far beyond what a normal human could produce.  Jojo is splattered with the stuff.  ", false);
					}
					if(player.cumQ() >= 250) {
						if(player.horseCocks() == 1) outputText("Your " + cockDescript(0) + " ripples and bulges with animalistic vigor, horse-cum splattering everywhere with each contraction.  The musky animal-jizz never seems to stop pouring from your equine organ, soaking the mouse from the waist up.  ", false);
						if(player.dogCocks() == 1) outputText("Your " + cockDescript(0) + " suddenly releases the pressure, a constant stream of doggie-cum spouting from your " + cockDescript(0) + " like some kind of cum-hose.  It seems to go on endlessly, covering the mouse from the waist up with thick ribbons of doggie-spooge as your knot slowly shrinks to normal.  ", false);
						if(player.cocks[0].cockType == 0 || player.cocks[0].cockType > 2) outputText("Your body tenses and cums a thick eruption far beyond what a normal human could produce.  Jojo is splattered with the stuff.  ", false);
					}
				}
				//Sorry multicocks, I'm donE!
				if(player.cockTotal() > 1) {
					outputText("Your cocks feel a building pressure at their base, it only seems to get stronger and stronger, until at last it explodes out from you, jizz covering the poor mouse from the waist up.  ", false);
				}
			}
			
			//Milk here
			if(player.biggestLactation() >= 1 && player.biggestTitSize() > 3) {
				if(player.biggestTitSize() * player.biggestLactation() * player.breastRows.length < 8) outputText("Milk sprays from your " + breastDescript(0) + " in tiny streams, triggered by your orgasms.", false);
				if(player.biggestTitSize() * player.biggestLactation() * player.breastRows.length < 20 &&
				 player.biggestTitSize() * player.biggestLactation() * player.breastRows.length >= 8) outputText("Milk erupts from your " + breastDescript(0) + ", spraying out over the mouse, squirting out the contractions of each shuddering orgasm.", false);
				if(player.biggestTitSize() * player.biggestLactation() * player.breastRows.length < 35 &&
				 player.biggestTitSize() * player.biggestLactation() * player.breastRows.length >= 20) outputText("Milk erupts from your " + breastDescript(0) + ", spraying in pulsing blasts, soaking the mouse.  Each nerve-wracking orgasm seems to wring more and more milk from you, till it puddles around.", false);
				if(player.biggestTitSize() * player.biggestLactation() * player.breastRows.length >= 35) outputText("Milk fountains from your " + breastDescript(0) + ", soaking the mouse with a continuous river of cream.  For every blob of cum you feel pushing into your over-filled uterus, another torrent of milk sprays out.  As your mind-bending orgasms drag on, a small lake of milk forms around you.", false);
			}
			cuntChange(3, true);
			//Preggers chance!
			player.knockUp(4,432);
			//The end
			if(player.lib > 50 && player.cor > 80) {
				outputText("\n\n<b>You feel a familiar power growing within you and decide to unleash it.</b>  You grab the prayer beads from his outfit and spit on them, making them slick and wet.  Holding them below his flagging cock, you focus on the demonic visions in your mind, slowly but constantly milking larger and larger dollops of cum onto the once holy beads.  Jojo moans as he comes to understand your intent, and turns around, shaking his lithe mouse-bum at you.  You lean over him, whispering into his ear, \"<i>Each defiled bead I push into you is going to make you more of a willing slut.  More a willing receptacle for demon cum.  More a fountain of desire waiting to be tapped by Succubi.  More my toy.</i>\"\n\n", false);  
				outputText("He whimpers as you slide the first bead in, his eyes growing foggy and his bum wiggling more eagerly.  You push the second bead inside him, and feel his asshole stretch and loosen, welcoming the corruption.  The third bead slips right in, and he moans, \"<i>sluuuut</i>,\" his cock grows longer and thicker throughout the moan, stopping at over a foot long and 3 inches thick, dribbling cum.  You whisper, \"<i>Cum, my Toy,</i>\" and push the remaining beads inside him.  His eyes roll back as his paws frantically milk his " + eCockDescript(0) + ", cum spraying from him like a fountain.  Jojo trembles, losing complete control and falling away from you.  You still hold the end of his beads, and smile as they pop out, stained almost as dark as the poor mouse's soul.\n\n", false);
				outputText("You walk away, leaving your new pet to explore his outlook on life, and to test your awakened powers.  ", false);
				monk++;
				stats(0,0,0,0,-10,0,-100,10);
			}
			else {
				outputText("\n\nExhausted, you pull yourself free from the mouse, drained of lust but feeling VERY naughty.  Jojo doesn't even bother getting up, he just keeps masturbating, lost in the scents of your slick juices and his cum.  As you walk away with a sexy wiggle, the sexual fluids are absorbed into the ground.", false);
				stats(0,0,0,0,2, 0,-100, 1);
			}
			
		}
	}
	//Third rape
	if(monk == 3) {
		trace("Monk(3) rape");
		outputText("It's no wonder the monk's body has betrayed him so thoroughly, his " + eCockDescript(0) + " is nearly ten inches long, pulsing with hot need.\n\n", true);
		if(player.gender == 1) {
			outputText("You yank Jojo up from the ground and onto his knees, ", false);
			if(player.cockTotal() == 1) {
				outputText("presenting your " + cockDescript(0) + " to him.  ", false);
			}
			else outputText("presenting your " + multiCockDescriptLight() + " to him.  ", false);
			outputText("The monk betrays his violated state of mind, licking his lips demurely and opening wide.  The invitation is all you need ", false);
			if(player.cockTotal() == 1) outputText("to ram your " + cockDescript(0) + " deep into his maw.  You roughly grab his ears, facefucking him hard, his tongue working hard to please.  ", false);
			if(player.cockTotal() > 1) outputText("to cram two cocks deep into his maw, making his jaw stretch obscenely.  You roughly grab his ears, facefucking him hard, his tongue working hard to please you.  ", false);
			outputText("One of Jojo's paws is buried in his groin, stroking his " + eCockDescript(0) + " with feverish intensity.  The hornier he gets, the more his throat seems to relax, allowing you to push deeper.  The glazed, lust-addled look on his face is so hot, you can't hold back any longer.  ", false);
			if(player.cockTotal() == 1) outputText("Your " + cockDescript(0) + " clenches tightly, erupting ", false);
			if(player.cockTotal() > 1) outputText("Your twin dicks clench tightly, erupting ", false);
			outputText("hot seed into the now meek and subdued bitch-boy.  His throat squeezes around you as he presses his nose tightly against your crotch, pulling as much of you in as he can.  Mouse-spunk spatters your legs as he cums with you.\n\n", false);
			if(player.lib > 60 && player.cor > 40) {
				outputText("You flip him onto his back, both of you still hard and ready for more.  He gets up on all-fours and wiggles his bum tantalizingly.  You press on, ", false);
				if(player.cockTotal() == 1) outputText("violating his loosened sphincter, and begin to fuck him hard.  He whimpers with a mixture of pain and pleasure, your spit-lubed " + cockDescript(0) + " pounding his prostate mercilessly.  Thick ropes of mousey-cum drool with each anus-stretching thrust of your cock, pooling below you.  You wickedly smile, slapping his ass, imagining him stretched further, his ass gaping, his cock huge and dripping with cum.  The strange thoughts filling your mind seem to travel straight to your balls and distill into pools of cum.  Like a long dormant volcano, you erupt, hot liquid spraying into Jojo, pumping his ass full and leaking down his legs.  He cums again, harder than before, his pulsing prick seeming to grow larger throughout his orgasm.\n\n", false);
				else outputText("violating his loosened sphincter, and begin to fuck him hard.  He whimpers with a mixture of pain and pleasure, a spit-lubed cock pounding his prostate mercilessly.  Thick ropes of mousey-cum drool with each anus-stretching thrust of your cock, pooling below you.  You wickedly smile, slapping his ass, imagining him stretched further, his ass gaping, his cock huge and dripping with cum.  The strange thoughts filling your mind seem to travel straight to your balls and distil into pools of cum.  Like a long dormant volcano, you erupt, hot liquid spraying into Jojo, pumping his ass full and leaking down his legs.  He cums again, harder than before, his pulsing prick seeming to grow larger throughout his orgasm.\n\n", false);
			}
			outputText("You leave the exhausted mousey behind you, wondering how you'll take him next time.  ", false);
			if(player.lib > 60 && player.cor > 40) {
				outputText("You smile as you hear him begin masturbating in the background.  There can be no doubt, you are tainting him more and more...", false);
				monk++;
				stats(0,0,0,0,-10,0,-100,4);
			}
			else stats(0,0,0,0,2, 0,-100, 1);
		}
		if(player.gender == 2) {
			outputText("You spread your legs and crook your finger, beckoning him towards your " + vaginaDescript(0) + ".  He looks disheartened, but obediently kneels before you, his whiskers tickling your " + vaginaDescript(0) + ", his wet nose bumping your clit, his tongue taking long licks between your lips.  ", false);
			if(player.biggestTitSize() >= 2) {
				outputText("You sigh and knead your breasts in pleasure.  ", false);
			}
			if(player.biggestLactation() >= 1.5 && player.biggestTitSize() > 2 && player.mostBreastsPerRow() >= 2 && player.breastRows.length >= 1) outputText("Every sensual peak within you is mirrored with small spurts of milk from your nipples.  It eventually trickles down to Jojo's tongue, spurring his efforts on.  ", false);
			outputText("The mousey gets more and more in to eating your box, making it harder and harder to stave off an orgasm.  You wrap ", false);
			if(player.lowerBody == 3) outputText("your coils ", false);
			else if(player.lowerBody == 8) outputText("your jiggling goo ", false);
			else outputText("your thighs ", false);
			outputText("around his head and quiver with passion, ", false);
			if(player.averageVaginalWetness() <= 1) outputText("squeezing him tightly into your " + vaginaDescript(0) + ".", false);
			if(player.averageVaginalWetness() > 1 && player.averageVaginalWetness() <= 3) outputText("creaming his tongue liberally with girlcum.", false);
			if(player.averageVaginalWetness() == 4) outputText("creaming all over him with your slobbering pussy.", false);
			if(player.averageVaginalWetness() == 5) outputText("splattering him with girlcum from your " + vaginaDescript(0) + ".", false);
			outputText("\n\nYou pull the cunt-dazed mouse away reluctantly, and bend over, spreading your legs and shaking your rump.  ", false);
			if(player.hasLongTail() > 0) outputText("Your tail swishes back and forth teasingly.  ", false);
			outputText("Your tantalizing backside is too much for him.  He pounces your ass in a second, penetrating your " + vaginaDescript(0) + " forcefully.  The knowledge that your demonic influence is responsible for his state nearly makes you cream all over his cock.  You fantasize about your cunt making his cock grow longer and fatter as it corrupts him further, transforming his morals and values into cock and cum.  Jojo thrashes against you, brutally pounding your " + vaginaDescript(0) + " as he orgasms.  His " + eCockDescript(0) + " erupts inside you, the feeling of being filled with mouse-spunk drives you over the edge with him.  More and more of his cum sprays inside you, unnatural amounts for a creature his size.  Thick streams of the stuff escape down your thighs as your belly distends.  ", false);
			cuntChange(2, true);
			outputText("\n\n", false);
			outputText("You let the drained mouse pop free, reveling in the sensation of cum pouring from between your thighs.   Jojo has already passed out behind you.  ", false);
			if(player.lib > 60 && player.cor > 50) {
				outputText("You lean down and whisper strange un-words as you stroke his cock.  It spasms and grows, cum pumping from it slowly but constantly.  You walk away, leaving him in a growing puddle of what was once his morals.  You don't know where the words came from, but you do know you're getting better at tempting and corrupting.", false);
				monk++;
				stats(0,0,0,0,-10,0,-100,4);
			}
			else stats(0,0,0,0,2, 0,-100, 1);
			outputText("", false);
			//Preggers chance!
			player.knockUp(4,432);
		}
		if(player.gender == 3) {
			outputText("You spread your legs and crook your finger, beckoning him towards your " + vaginaDescript(0) + ".  He looks disheartened, but obediently kneels before you, his whiskers tickling, his wet nose bumping your clit, his tongue taking long licks between your lips.  ", false);
			if(player.cockTotal() == 1) outputText("You sigh as your " + cockDescript(0) + " droops over his head.  ", false);
			if(player.cockTotal() > 1) outputText("You sigh as your " + multiCockDescriptLight() + " pile atop his head.  ", false);
			if(player.biggestTitSize() >= 2) {
				outputText("You kneed your breasts, excited and filled with pleasure.  ", false);
			}
			if(player.biggestLactation() >= 1.5 && player.biggestTitSize() > 2 && player.mostBreastsPerRow() >= 2 && player.breastRows.length >= 1) outputText("Every sensual peak within you is mirrored with small spurts of milk from your nipples.  It eventually trickles down to Jojo's tongue, spurring his efforts on.  ", false);
			outputText("The mousey gets more and more into eating your box, making it harder and harder to stave off an orgasm.  You wrap your thighs around his head and quiver with passion, ", false);
			if(player.averageVaginalWetness() <= 1) outputText("squeezing him tightly into your " + vaginaDescript(0) + ".", false);
			if(player.averageVaginalWetness() > 1 && player.averageVaginalWetness() < 4) outputText("creaming his tongue liberally with girlcum.", false);
			if(player.averageVaginalWetness() == 4) outputText("creaming all over him with your slobbering pussy.", false);
			if(player.averageVaginalWetness() >= 5) outputText("splattering him with you girlcum from your " + vaginaDescript(0) + ".", false);
			if(player.cockTotal() > 0) outputText("  Thick runners of your pre dribble down his neck, sticking to his fur.  ", false);
			outputText("\n\nYou pull the cunt-dazed mouse away reluctantly, and bend over, spreading your legs and shaking your rump.  ", false);
			if(player.hasLongTail() > 0) outputText("Your tail swishes back and forth teasingly.  ", false);
			outputText("Your tantalizing backside is too much for him.  He pounces your ass in a second, penetrating your " + vaginaDescript(0) + " forcefully.  The knowledge that your demonic influence is responsible for his state nearly makes you cream all over his cock.  You fantasize about your cunt making his cock grow longer and fatter as it corrupts him further, transforming his morals and values into cock and cum.  Jojo thrashes against you, brutally pounding your " + vaginaDescript(0) + " as he orgasms.  His " + eCockDescript(0) + " erupts inside you, the feeling of being filled with mouse-spunk drives you over the edge with him.  More and more of his cum sprays inside you, unnatural amounts for a creature his size.  Thick streams of the stuff escape down your thighs as your belly distends.  ", false);
			cuntChange(2, true);
			if(player.cockTotal() == 1) outputText("Your " + cockDescript(0) + " trembles in orgasm, squirting your load into the thick forest loam.  ", false);
			if(player.cockTotal() > 1) outputText("Your " + multiCockDescriptLight() + " tremble in orgasm, squirting their hot loads all over the thick forest loam.  ", false);
			outputText("\n\n", false);
			outputText("You let the drained mouse pop free, reveling in the sensation of cum pouring from between your thighs.   Jojo has already passed out behind you.  ", false);
			if(player.lib > 60 && player.cor > 50) {
				outputText("You lean down and whisper strange un-words as you stroke his cock.  It spasms and grows, cum pumping from it slowly but constantly.  You walk away, leaving him in a growing puddle of what was once his morals.  You don't know where the words came from, but you do know you're getting better at tempting and corrupting.", false);
				monk++;
				stats(0,0,0,0,-10,0,-100,4);
			}
			else stats(0,0,0,0,2, 0,-100, 1);
			outputText("", false);
			//Preggers chance!
			player.knockUp(4,432);
		}
		outputText("", false);
	}
	//Second rape
	if(monk == 2) {
		outputText("The poor mouse is already hard...his cock throbbing eagerly, as it protrudes through the opening in his robe, looking nearly eight inches long.  You're pretty sure it wasn't that big last time.\n\n", true);
		monk++;
		stats(0,0,0,0,-10,0,-100,4);
		if(player.gender == 1) {
			outputText("You force Jojo over a log, running your hands through his fur and slapping his ass.  He grunts, but it's impossible to tell if it's in frustration, anger, or arousal.  You quickly force yourself back into his ass, finding it noticably stretched from your last incursion.  ", false);
			if(player.averageCockThickness() >= 3) outputText("It makes little difference to your " + cockDescript(0) + ", he still feels tight as a virgin's cunt to you.  ", false);
			outputText("You grab him by the waist and fuck him powerfully, slamming your " + cockDescript(0) + " in brutally hard and fast.  You notice his hands are in his crotch, feverishly masturbating his disproportionately large cock like a slut.  You start leaking pre-cum like a sieve, realizing you're doing it, really doing it - making this virtuous mouse into a wanton slut!  You squeeze him tightly as you cum into his bowels, his belly distending slightly as your orgasm goes on and on.  Trails of cum run down his fur as it becomes more than his ass can handle.", false);
			if(player.cockTotal() > 1) outputText("  Your remaining equipment showers him with jizz, more than you ever thought you could produce.", false);
			outputText("  The mouse moans and cums himself, with loud moans and messy splurts coating the ground every time your hips meet.\n\n", false);
			outputText("Eventually it ends, and you drop him into the puddled spooge like a used condom.  He lays there, idly stroking himself in a daze, his prick still swollen with need and dripping fluids.  You can't wait to corrupt him some more.", false);
		}
		if(player.gender == 2 || player.gender == 3) {
			outputText("You throw him on the soft soil of the forest and mount him, skilfully guiding his member towards your now dripping wet hole.  As you slide down you marvel at how he feels larger and thicker than before, deliciously so.  Your " + vaginaDescript(0) + " throbs in the most pleasant way as you rape his small form.  You play with your clit, watching Jojo's face flit between rapture and disgust.  You lick your lips and smile as the disgust vanishes, his hot jets of cum painting your cunt-walls.  You giggle and keep fucking him, hoping that somehow your corruption and lust are influencing him, turning him into your personal fucktoy.  The thought brings you over the edge.  You clamp down, your " + vaginaDescript(0) + " milking, squeezing every last drop from him as his prick erupts inside you.  ", false);
			cuntChange(1.5, true);
			if(player.biggestLactation() >= 1 && player.biggestLactation() < 2) outputText("Milk squirts from  your nipples, spraying him down with small droplets of your creamy tit-treat.  ", false);
			if(player.biggestLactation() >= 2 && player.biggestLactation() < 3) outputText("Streams of milk spray from your nipples in time with your pussy contractions, hosing the poor mouse down and puddling on his fur.  ", false);
			if(player.biggestLactation() >= 3) outputText("Gouts of milk erupt from your nipples, spraying continually as you cum.  The poor mouse is soaked from head to toe, your cream utterly drenching the monk.  ", false);
			if(player.averageVaginalWetness() == 5) outputText("Your " + vaginaDescript(0) + " drenches him with your squirting girl-cum, mixed with his own seed.", false);
			if(player.cockTotal() == 1) outputText("Jizz sprays onto his chest from your " + cockDescript(0) + ".  ", false);
			if(player.cockTotal() == 2) outputText("A hail of jizz splatters over Jojo from your " + multiCockDescriptLight() + ".  ", false);
			if(player.cockTotal() == 3) outputText("A multitude of thick cum-streams splatter over Jojo from head to waist as your " + multiCockDescriptLight() + " hose him down.  ", false);
			outputText("\n\nSatisfied at last, you pull yourself away from the dazed mouse.  His shaft is still swollen with need, his hands irresistibly stroking it, eyes vacant.  You're going to corrupt him so much more next time.\n\n", false);
			//Preggers chance!
			player.knockUp(4,432);
		}
	}
	//First rape;
	if(monk == 1) {
		outputText("You pretend to agree, and follow Jojo into the woods.  You bide your time, waiting for him to relax.  Eventually the mouse stumbles, and you have your chance!\n\n", true);
		if(player.gender == 1) {
			outputText("You push him hard, following through to pin his small frame.  He struggles but you twist his arm expertly and hold him down with your larger bodyweight.  He squirms as you tear off the bottom of his outfit, protesting mightily as you force him into the dirt and expose his toned bottom.\n\n", false);
			if(player.cockTotal() == 1) {
				outputText("You grin and press your " + cockDescript(0) + " against him, making him squeal in protest.  You press on, eager to violate his puckered asshole, reveling in the crushing tightness.  His muscles quiver nervelessly as you pound him raw, his muted protests getting weaker as you notice a rapidly swelling bulge under him.  You reach around and begin jerking him off as you fuck him, fantasizing about pouring him full of corruptive demon power, making him your slave.  The dirty thoughts make your balls feel full; a pulsing, squeezing tightness builds in your nethers as your " + cockDescript(0) + " flexes and bulges inside your prey.  You cum hard, pressing his muzzle into the dirt as you pump glob after glob of cum up his ass, violating him to his core.\n\n", false);
				outputText("With a satisfied sigh, you pull your " + cockDescript(0) + " out with an audible 'pop'.  Your cum begins leaking out, pooling under him and mixing with his own.  The little guy must have cum hard; he seems fairly comatose.  As you leave your senseless victim, you realize  you feel more satisfied than you have in a while, almost like you've cum so hard it took some of your libido with it.", false);
				stats(0,0,0,0,-10,0,-100,4);
				monk++;
				return;
			}
			else {
				outputText("You grin and press your " + multiCockDescriptLight() + " against him, making him squeal in protest.  You press on, eager to violate his tight asshole, reveling in the crushing tightness.  His muscles quiver nervelessly as you pound him raw, his muted protests getting weaker as you notice a rapidly swelling bulge under him.  You reach around and begin jerking him off as you fuck him, fantasizing about pouring him full of corruptive demon power, making him your slave.  The dirty thoughts make your balls feel full, a pulsing squeezing tightness building in your nethers as your " + cockDescript(0) + " flexes and bulges inside your prey.  You cum hard, pressing his muzzle into the dirt as you pump glob after glob of cum up his ass, violating him to his core.  Cum sprays over his ass, the rest of your equipment soaking him as it cums as hard as the one you sank up into the mouse-hole.\n\n", false);
				outputText("With a satisfied sigh, you pull your " + cockDescript(0) + " out with an audible 'pop'.  Your cum begins leaking out, pooling under him and mixing with his own.  The little guy must have cum hard, he seems fairly comatose.  As you leave your senseless victim, you realize  you feel more satisfied than you have in a while, almost like you've cum so hard it took some of your libido with it.", false);
				stats(0,0,0,0,-10,0,-100,4);
				monk++;
				return;
			}
		}
		if(player.gender == 2) {
			outputText("You smack the back of his head hard, dazing him.  You spin him around as you take his feet out from under him, one hand pulling his pants while the other slashes his belt.  He literally 'falls out of his pants' and onto the soft earth of the forest.  You pounce on the stunned monk, shedding your own clothes and pinning him to the ground.  He begins to resist, squirming under you, ", false);
			if(player.averageVaginalWetness() < 2) outputText("but the sensation of you grinding your folds against him momemtarily breaks his will.  ", false);
			else outputText("but the feeling of your " + vaginaDescript(0) + " grinding against his hardening cock robs him of any will.  ", false);
			outputText("You smile when you realize how large he is for his frame, and mount him, taking care to keep him pinned hard to the ground.", false);
			cuntChange(12, true, true, false);
			outputText("\n\n", false);
			
			outputText("He lets out little grunts and whines of protest as you ride him hard, but quickly cums.  The flood of warmth inside your canal only serves to spur you on, slamming your " + vaginaDescript(0) + " down on him with brutal force.  You envision yourself raping others, corrupting all those you come across with your needy pussy.  You imagine what it must be like to be a succubus, fucking poor monks like this, your magics making your victim's manhood ever larger.  The thought breaks over you like a wave and you cum, hard; your " + vaginaDescript(0) + " clamps down hard on Jojo's cock as he finds himself cumming again, eyes rolling back in his head.  You shudder and moan, cum squirting out of your fuck-hole with each bounce on the poor mouse.", false);
			if(player.biggestLactation() >= 1 && player.biggestLactation() < 2) outputText("  Milk squirts from  your nipples, spraying him down with small droplets of your creamy tit-treat.", false);
			if(player.biggestLactation() >= 2 && player.biggestLactation() < 3) outputText("  Streams of milk spray from your nipples in time with your pussy contractions, hosing the poor mouse down and puddling on his fur.", false);
			if(player.biggestLactation() >= 3) outputText("  Gouts of milk erupt from your nipples, spraying continually as you cum.  The poor mouse is soaked from head to toe, your cream utterly drenching the monk.", false);
			
			outputText("\n\nYou stand on wobbly legs, happy to have so thoroughly fucked such a chaste and good-natured creature.  You vow to do it again soon, realizing you feel more clearheaded, if a bit more evil.", false);
			stats(0, 0, 0, 0, -10, 0, -100, 4);
			monk++;
			//Preggers chance!
			player.knockUp(4,432);
			return;
		}
		if(player.gender == 3) {
			outputText("You push him hard, following through to pin his small frame.  He struggles but you twist his arm expertly and hold him down with your larger bodyweight.  He squirms as you tear off the bottom of his outfit, protesting mightily as you force him into the dirt and expose his toned bottom.\n\n", false);
			if(player.cockTotal() == 1) {
				outputText("You grin and press your " + cockDescript(0) + " against him, making him squeal in protest.  You press on, eager to violate his tight asshole, reveling in the crushing tightness.  His muscles quiver nervelessly as you pound him raw, his muted protests getting weaker as you notice a rapidly swelling bulge under him.  You reach around and begin jerking him off as you fuck him, fantasizing about pouring him full of corruptive demon power, making him your slave.  The dirty thoughts make your balls feel full, a pulsing squeezing tightness building in your nethers as your " + cockDescript(0) + " flexes and bulges inside your prey.  You cum hard, pressing his muzzle into the dirt as you pump glob after glob of cum up his ass, violating him to his core.  Your pussy quivers, cumming as well, feeling empty.  You resolve to take his cock's virginity next time.", false);
				if(player.biggestLactation() >= 1 && player.biggestLactation() < 2) outputText("  Milk squirts from  your nipples, spraying him down with small droplets of your creamy tit-treat.  ", false);
				if(player.biggestLactation() >= 2 && player.biggestLactation() < 3) outputText("  Streams of milk spray from your nipples in time with your pussy contractions, hosing the poor mouse down and puddling on his fur.  ", false);
				if(player.biggestLactation() >= 3) outputText("  Gouts of milk erupt from your nipples, spraying continually as you cum.  The poor mouse is soaked from head to toe, your cream utterly drenching the monk.  ", false);
				outputText("\n\nWith a satisfied sigh, you pull your " + cockDescript(0) + " out with an audible 'pop'.  Your cum begins leaking out, pooling under him and mixing with his own.  The little guy must have cum hard, he seems fairly comatose.  As you leave your senseless victim, you realize  you feel more satisfied than you have in a while, almost like you've cum so hard it took some of your libido with it.", false);
				stats(0,0,0,0,-10,0,-100,4);
				monk++;
				return;
			}
			else {
				outputText("You grin and press your " + multiCockDescriptLight() + " against him, making him squeal in protest.  You press on, eager to violate his tight asshole, reveling in the crushing tightness.  His muscles quiver nervelessly as you pound him raw, his muted protests getting weaker as you notice a rapidly swelling bulge under him.  You reach around and begin jerking him off as you fuck him, fantasizing about pouring him full of corruptive demon power, making him your slave.  The dirty thoughts make your balls feel full, a pulsing squeezing tightness building in your nethers as your " + cockDescript(0) + " flexes and bulges inside your prey.  You cum hard, pressing his muzzle into the dirt as you pump glob after glob of cum up his ass, violating him to his core.  Cum sprays over his ass, the rest of your equipment soaking him as it cums as hard as the one you sank up into the mouse-hole.  Your pussy quivers, cumming as well, feeling empty.  Mentally you resolve to take his cock's virginity next time.", false);
				if(player.biggestLactation() >= 1 && player.biggestLactation() < 2) outputText("  Milk squirts from  your nipples, spraying him down with small droplets of your creamy tit-treat.  ", false);
				if(player.biggestLactation() >= 2 && player.biggestLactation() < 3) outputText("  Streams of milk spray from your nipples in time with your pussy contractions, hosing the poor mouse down and puddling on his fur.  ", false);
				if(player.biggestLactation() >= 3) outputText("  Gouts of milk erupt from your nipples, spraying continually as you cum.  The poor mouse is soaked from head to toe, your cream utterly drenching the monk.  ", false);
				outputText("\n\nWith a satisfied sigh, you pull your " + cockDescript(0) + " out with an audible 'pop'.  Your cum begins leaking out, pooling under him and mixing with his own.  The little guy must have cum hard, he seems fairly comatose.  As you leave your senseless victim, you realize  you feel more satisfied than you have in a while, almost like you've cum so hard it took some of your libido with it.", false);
				stats(0,0,0,0,-10,0,-100,4);
				monk++;
				return;
			}
		}
	}
}

//Bee on C. Jojo: Finished (Fenoxo) (Zedit)
function beeEggsInCorruptJojo():void {
	clearOutput();
	outputText("Drawing Jojo close, you gently tease your fingertips along the soft fur of his cheeks, buzzing reassuring noises into his dish-shaped ears.  The greedy little slut perks up and nuzzles against you happily.  His hand, soft and delicate, reaches down inside your [armor] to touch your groin.  Its partner strays south to the mouse's own erection, gathering his copious pre to smear a fresh layer across his hardness.  You let him be for now, allowing him to build your lust higher and higher.  The show draws your ovipositor out of its slit and fills it with fresh blood, hardening the tubular organ into an approximation of a large phallus.");
	outputText("\n\nJojo, for his part, seems oblivious to the swelling protrusion or your malicious grin.  Once fully hard, you whisper to him, instructing for him to get on all fours and let you fuck him.  ");
	if(!player.hasCock()) {
		if(flags[TIMES_EGGED_JOJO] == 0) outputText("Jojo looks confused at this; he knows you don't have a cock!  ");
		else outputText("Jojo looks confused at first, and then nods in understanding, remembering the last time you laid in him.  ");
	}
	outputText("He bends over, obedient slut that he is, lifting his ");
	if(tentacleJojo()) outputText("tentacle-");
	outputText("tail for you in an inviting motion.  His butt looks nice and cushy, a soft heart-shape just beckoning to be impaled on your rigid egg-tool.  You give the mouse-tush a hearty swat and smile at his squeak of surprise and winking anus.");
	
	outputText("\n\nMoving forward, you ");
	if(player.isNaga()) outputText("slither around him");
	else if(player.isGoo()) outputText("ooze over him");
	else if(player.isTaur()) outputText("straddle him");
	else outputText("climb atop him");
	outputText(".  Jojo looks up over his shoulder trustingly, swaying a bit from trying to hold up your body weight.  He starts to reach for his corruption-fueled boner, but of course, he has to drop his arm to hold himself upright.  The rodent whines plaintively, begging you to take him, stroke him... ANYTHING!  You gently shush him and sink your stinger into his backside, rewarding his obedience with a flash of pain and injection of fresh, unnatural lust.  His arms begin to shake, his butt begins to wiggle, and he starts to drool all over the ground, panting in a way that reminds you more of a canine than a mouse.");
	outputText("\n\nYou withdraw one insectile spear from the slut-mouse's rump and replace with another, thicker prong.  Your honeyed ovipositor slides right in to Jojo's welcoming anus, his rectum stretching to welcome the egg-pipe's healthy width.  A trickle of lubricating, honey-like fluid dribbles from the tip to aid the penetration, and in no time flat, the mouse's ass is a slick fuck-tunnel that sweetly squishes with each pump of your abdomen.  His thick, foot-long mouse-cock actually softens slightly and flops around with each thrust, trailing trickles of stringing pre-cum as you squeeze it out of him.");
	outputText("\n\nJojo mewls in pleasure when you push particularly hard and bottom out the heavy ovipositor, your stinger nearly scratching his balls.  A huge wad of semi-opaque cum drizzles from his cocktip, and he begins to push back against you like the willing fuck-pet that he is.  You grab him by the ears and begin to fuck him faster; the wet squelches carry through your camp to let anyone nearby know exactly what's going on.  You'd worry if you weren't lost in the moment, tugging his back and lewdly kissing him while your honey-flow thickens and the eggs shift into position.");
	outputText("\n\n\"<i>Here it comes pet,</i>\" you coo, \"<i>Let's see just how many eggs you can hold, hrmm?</i>\"");
	outputText("\n\nJojo whimpers and nods, his dick dripping a bit quicker at your words.  What a whore!  Gasping in pleasure, you feel the first egg begin to slide through your fuck-tube, the muscular contractions coaxing it deeper and deeper inside your pet.  Your organ, made to stretch as it is, easily handles the passage, but Jojo's butthole doesn't fare quite as well.  He is liberally strained by it, his poor prostate pressed so hard that a rope of thick fluid squirts from his cock, not from orgasm or pleasure, but because there is no room in his body for it.");
	outputText("\n\nThe white mouse moans lustily, trying to hump back against you, actually seeking more pressure on his prostate even though you've stopped thrusting.  Fortunately for him, you can feel your next egg squeezing down into your ovipositor, even as the first pops out into the rodent's gut.  Jojo gasps at the change in pressure before resuming his panting moans.  Even before the second egg has traversed half your length, the third makes itself known, nestling into the base and beginning its slow, pleasure-filled journey out your prong and into your pet's behind.");
	outputText("\n\nLaying eggs feels so goddamn good!  ");
	if(player.gender > 0) {
		outputText("Your ");
		if(player.hasVagina()) outputText("pussy ");
		if(player.gender == 3) outputText(" and [eachCock] ");
		if(player.gender == 1) outputText(multiCockDescriptLight() + " ");
		if(player.gender == 3 || player.cockTotal() > 1) outputText("are");
		else outputText("is");
		outputText(" gushing all over Jojo's back, but you don't feel particularly inclined to deal with your regular genitals.  ");
	}
	outputText("You're utterly focused on the silky feel of those smooth spheres rolling out of you, being implanted into a host, willing or not.  Thankfully, Jojo is willing, creaming the ground, sputtering strings of spunk with each new egg that you force inside his once-tight anus.  Orb after orb slides inside him, drawing shivers of ecstasy from your alien-looking egg-cock.  With an explosive clench, you cum and force the remainder of your eggs into the mouse-bitch's butt-cunt.");
	if(player.eggs() > 30) outputText("  His belly is slightly rounded by the time you finish, with small, egg-shaped bumps visible through his fur.");
	
	outputText("\n\nYou pull out with a self-satisfied smile, the ovipositor swiftly retracting into your body.  A trickle of golden honey pours from the mouse's abused anus to mix with his puddling spunk.  The relief you feel is palpable - you're light on your [feet] when you climb off him, and Jojo sighs, \"<i>Thank you for the orgasm!</i>\"");
	
	outputText("\n\nHe shambles off towards the woods when you dismiss him, his hard cock still dribbling mousey sperm the whole way.  You have to wonder if the eggs are sliding over his prostate with every step he takes?  Oh well, it's no concern of yours.");
	if(player.fertilizedEggs() > 0 && flags[JOJO_EGGCUBATE_COUNT] == 0) {
		flags[JOJO_EGGCUBATE_COUNT] = 80;
	}
	flags[TIMES_EGGED_JOJO]++;
	player.dumpEggs();
	stats(0,0,0,0,0,0,-100,0);
	eventParser(5007);
}
//Jojo Got Laid With Fertilized Bee Eggs (Zedit)
function jojoLaysEggs():void {
	outputText("\nWhile passing time, you hear grunts of pleasure from the direction of the forest.  You amble over to investigate and find Jojo bent over, ass-up.  He's tugging on his cock non-stop, firing ropes of cum one after another while heavy, honey-slicked eggs roll out of his gaped anus to form an amber pile.");
	outputText("\n\nYou watch idly as the mouse gathers up the drizzling honey for lube and smears it over his cock, turning his twitching, orgasmic prick golden.  He pumps faster and faster, squeezing and jerking, moaning in lurid, unrestrained bliss.  Jojo is focused utterly on laying eggs and getting off, or maybe he's just getting off from the act of laying.  He's not even supporting his upper body - he just sits there, face down in the dirt, laying and cumming, laying and cumming.  His eggs are even drizzled with his wasted spunk, a testament to the debauchery of their surrogate 'mother'.");
	outputText("\n\nThe mouse turns his head to meet your gaze and whimpers, \"<i>Did... did I do a good job?</i>\"");
	outputText("\n\nYou start to answer, but the exhausted, anal-gaped slut slumps onto his side and starts snoring, exhausted and dripping both white and yellow.  The whole thing makes you feel a little hot under the collar, but there's nothing to do for now but head back to camp.\n");
	flags[JOJO_EGGCUBATE_COUNT] = 0;
}
	