﻿const VELARIA_FUTA:int = 499;


//Camp Menu -- [Followers] -- [Valeria]
function valeriaFollower():void {
	spriteSelect(79);
	clearOutput();
	outputText("You walk over to Valeria.  Seeing you approach, the armor-goo turns a slightly brighter shade of blue beneath her plates and grins.");
	outputText("\n\n\"<i>Hey there, partner! Need anything while we're safe at camp?</i>\"");
	var sex:Number = 0;
	if(player.lust > 33) sex = 3593;
	//(Display Options: [Appearance] [Spar] [Sex] [Talk])
	choices("Appearance",3589,"Spar",3590,"Sex",sex,"Talk",3599,"Take",3603,"",0,"",0,"",0,"",0,"Back",74);
}

//[Valeria] -- [Appearance]
function valeriaAppearance():void {
	clearOutput();
	spriteSelect(79);
	outputText("Valeria is a 6 foot tall goo-girl composed of a viscous blue goop.  She is currently wearing a suit of plated armor, and wields her gooey greatsword as a weapon.  She has a beautiful feminine face with strong, angular features, and has affected short-cropped gooey hair, hanging just past her cheeks.  Her hips are average, with a muscular, gropable bum.  Unlike most goos, Valeria has formed two normal human legs ending in normal human feet out of her gooey lower body.");
	outputText("\n\nShe has a pair of C-cup breasts, with a single 0.5 inch nipple on each breast.");
	//[If Valeria is cock'd:]
	if(flags[VELARIA_FUTA] == 1) outputText("\n\nWhen you desire it, she's able to form an impressive human-shaped cock above her twat, usually capping out at about 12 inches. Gooey as it is, it constantly dribbles bits of goop, not unlike pre-cum.");
	outputText("\n\nShe has created an easily stretchable, gooey cunt between her legs, with a tiny 0.2 inch clitoris.");
	outputText("\n\nShe generally doesn't bother to affect an anus, though you can't imagine it'd be too difficult to penetrate her gooey, gropable behind.");
	doNext(3588);
}
//Valeria] -- [Spar]
function valeriaSpar():void {
	clearOutput();
	spriteSelect(79);
	outputText("You ask Valeria if she would be up for a bit of battle practice.");
	outputText("\n\n\"<i>Hey, that'd be great, partner. Gotta keep our skills sharp if we wanna have a chance against the demons, after all! Let's do it.</i>\"");
	outputText("\n\nYou take Valeria out to the fringe of camp and ready your [weapon] as she forms a gooey greatsword in her hands.");
	//(Play normal combat scenes, with EXP rewards. No rape options, however; use the following outtros:)
	startCombat(47);
	monster.createStatusAffect("spar",0,0,0,0);
	monster.gems = 0;
	doNext(1);
}

//[Valeria] -- [Spar] -- PC Victorious
function pcWinsValeriaSpar():void {
	clearOutput();
	spriteSelect(79);
	outputText("\"<i>Oof!</i>\" Valeria grunts, nearly losing her human shape as she tumbles to the hard-packed dirt.  \"<i>All right, all right, you win!  Take it easy, partner,</i>\" she laughs, letting her greatsword dissipate back into her body.");
	outputText("\n\nYou offer to help her up, but she easily reconstitutes herself into a standing pose, giving you a little wink afterwards.  \"<i>Thanks for the ass-whoopin', [name],</i>\" she laughs.  \"<i>C'mon, let's get back to it.  Demons aren't gonna defeat themselves, after all.</i>\"");
	eventParser(5007);
}

//[Valeria] -- [Spar] -- PC Defeated
function pcWinsValeriaSparDefeat():void {
	clearOutput();
	spriteSelect(79);
	outputText("You collapse, ");
	if(player.HP < 1) outputText("in too much pain");
	else outputText("too turned on");
	outputText(" to fight any longer.  Valeria's on you in a heartbeat, her gooey greatsword pressed to your throat.");
	outputText("\n\n\"<i>Do you yield?</i>\" she asks, not unlike a knight.");
	outputText("\n\nYou nod emphatically.");
	outputText("\n\n\"<i>Tsk,</i>\" she sighs, shaking her head.  \"<i>Only reason I tagged along with you is I thought you might actually have a chance, Champion.  If you can't beat little old me... Oh, whatever am I going to do with you?</i>\" she chuckles");
	//[if PC lost via HP or has no gender: 
	if(player.HP < 1 || player.gender == 0) {
		outputText(", offering you a hand up.");
		outputText("\n\n\"<i>C'mon, let's get back to camp.</i>\"");
		//(Return to main Camp menu)
		eventParser(5007);
	}
	//[else; If PC lost via lust & has a gender: 
	else {
		outputText(".  \"<i>Well, since you're so... eager... I might as well get my daily fluids while we're here.</i>\"");
		//(Go to Valeria's gender-appropriate FemDom sex scenes)
		doNext(3598);
	}
}

//Followers -- [Valeria] -- [Sex]
function followersValeriaSex(display:Boolean = true):void {
	spriteSelect(79);
	if(display) {
		clearOutput();
		outputText("With a lusty grin, you ask your gooey friend if ");
		if(player.gender > 0) outputText("she's interested in a little fluid exchange");
		else outputText("she wouldn't mind helping you get some release, despite your genderlessness");
		outputText(".");
		outputText("\n\n\"<i>Hmm... I suppose that could be arranged. What did you have in mind, partner?</i>\"");
	}
	//(Display Options: \"<i>[Penetrate Her](Cockwielder PC Only)  [Get Fucked]  [Gooflation] 
	//[Get Dominated](Must have a gender)  [Dick/No Dick])
	var penetrate:Number = 0;
	if(player.hasCock()) penetrate = 3597;
	var getFucked:Number = 0;
	getFucked = 3595;
	var gooFlation:Number = 3596;
	var dominated:Number = 0;
	if(player.gender > 0) dominated = 3598;
	var dickToggle:Number = 3594;
	var dickText:String = "Grow Dick";
	if(flags[VELARIA_FUTA] == 1) {
		dickText = "Lose Dick";
		dickToggle = 3594;
	}
	choices("PenetrateHer",penetrate,"Get Fucked",getFucked,"Gooflation",gooFlation,"GetDominated",dominated,dickText,dickToggle,"",0,"",0,"",0,"",0,"Back",3588);
}

//Valeria -- [Sex] -- [Dick/No Dick]
function valeriaDickToggle():void {
	spriteSelect(79);
	clearOutput();
	//[If Valeria has a dick:] 
	if(flags[VELARIA_FUTA] == 1) {
		outputText("Before you do anything, you ask Valeria if she wouldn't mind hiding her facsimile of a dick, at least when you aren't having sex.");
		outputText("\n\n\"<i>Aww,</i>\" she groans, \"<i>I was starting to get used to my little buddy there, too.  But, if that's what you want... I guess I'll oblige.</i>\"");
		outputText("\n\nYou're gratified to see her thick gooey dick retract and dissipate into her groin.");
		outputText("\n\n\"<i>All better now, partner?</i>\"");
		//(PC returns to sex menu)
		flags[VELARIA_FUTA] = 0;
	}
	//[If Valeria doesn't have a dick:] 
	else {
		flags[VELARIA_FUTA] = 1;
		outputText("Struggling to find a less-than-awkward way of phrasing this, you ask Valeria if she wouldn't mind growing a certain extra appendage for you.");
		//(If PC is female/herm/genderless:)
		if(player.gender != 1) {
			outputText("\n\nShe cocks an eyebrow at you. \"<i>You know, I'm pretty fond of being a girl... But for you, partner, I guess I could manage a little something extra.</i>\"");
			outputText("\n\nYou watch as, with a grunt of effort, Valeria's crotch expands.  A hefty twelve-inch human-like cock sprouts above her gooey cunt, twitching and dripping gooey pre-cum.  Your armor-goo shudders slightly.");
			outputText("\n\n\"<i>Well, this is going to be... different. So, what do you say we put this third leg of mine to good use, huh?</i>\"");
		}
		//(PC returns to sex menu)
		//(If PC is Male:) 
		else {
			outputText("\n\nValeria cocks an eyebrow at you.  \"<i>Dude. What're you, gay?</i>\"");
			outputText("\n\nYou scowl at her.");
			outputText("\n\n\"<i>Shit, I'm a giant pile of goop.  Who am I to judge?  One throbbing goo-stick, coming up.</i>\"");
			outputText("\n\nYou watch as, with a grunt of effort, Valeria's crotch expands.  A hefty twelve-inch human-like cock sprouts above her gooey cunt, twitching and dripping gooey pre-cum.  Your armor-goo shudders slightly.");
			outputText("\n\n\"<i>Well, this is going to be... different. So, what do you say we put this third leg of mine to good use, huh?</i>\"");
			//(PC returns to sex menu)
		}

	}
	doNext(3588);
}

//Valeria -- [Sex] -- [Get Fucked]
function valeriaGetFucked():void {
	spriteSelect(79);
	clearOutput();
	outputText("You disrobe and, ");
	if(player.hasVagina()) outputText("stroking the slick lips of your [vagina], ask Valeria to fuck you.");
	else outputText("posing seductively, ask Valeria to fuck you.");
	outputText("\n\nShe grins.  \"<i>You just lie back and let me take care of everything, partner.</i>\"  You do as she asks, flopping onto your back ");
	if(player.isBiped()) outputText("and spreading your legs ");
	outputText("as Valeria ");
	if(flags[VELARIA_FUTA] == 0) outputText("forms a thick, gooey cock");
	else outputText("grabs her thick, gooey cock");
	outputText(" and looms over you.");
	outputText("\n\nSurprisingly, she kneels over your shoulders and lets her cock flip onto your chin.  \"<i>Well, get it ready.  Come on.</i>\"");
	outputText("\n\nYou start to remind her that she's already pretty damn moist, but as soon as you open your mouth, she shoves her cock in.  You squirm and grunt, but Valeria just grabs your shoulders and stuffs more of her in your gob until her gooey cock is pouring down your throat.  Figuring it's a useless fight, you start to deepthroat her cock, pumping your head back and forth until your lips press against her groin.  Squishy and malleable as it is, you don't have any problems taking her shaft all the way, and even manage to pierce the bottom of it with your tongue, slurping at the insides of Valeria's dick; your invading tongue tingles at her citrusy taste.");
	outputText("\n\nValeria lets out a long, low moan as you fellate her goo-cock and runs her hand through your [hair], urging you onwards.  You continue on for a few minutes, slowly working her slick cock in and out of your throat until she eventually pushes your head back and withdraws herself, already panting from the pleasure.  \"<i>That's enough, [name].  Time for the main event, I think.</i>\"");
	outputText("\n\nThe tip of her goopy cock slips out of your well-used mouth, leaving its sticky, citrusy residue clinging to your lips.  Valeria slides back along your chest, ");
	//[if PC has C-cups or bigger, 
	if(player.biggestTitSize() > 3) outputText("bumping over your [chest] and stopping for a brief moment to tickle your sensitive tits with her goopy bottom before ");
	outputText("coming to a stop over your crotch.  She pours herself into your lap, ");
	//[if PC has cock: \"<i>
	if(player.hasCock()) outputText("her gooey ass devouring your " + cockDescript(0) + " as she slides down your belly");
	if(player.hasCock() && player.hasVagina()) outputText(" and ");
	if(player.hasVagina()) outputText(" letting bits of her goo-body slither into your wet, waiting [vagina], ever so slightly peeling your walls apart");
	//If PC has no gender 
	if(player.gender == 0) outputText("poking the shaft of her cock gingerly, teasingly against your [asshole]");
	outputText(".");
	
	outputText("\n\nShe rocks back in your lap, sticking her arms to your [legs] for support as she slings her legs over your shoulders.  She grabs her cock, stroking it sensually");
	if(player.hasCock()) outputText(", as she rhythmically flexes her ass cheeks, shifting her fluidity around your shaft within her with a feeling like lotion-covered hands gently stroking you");
	outputText(".");
	
	//(If Female)
	if(!player.hasCock() && player.hasVagina()) {
		outputText("\n\nValeria gives you a little grin and, still grasping her cock, begins to push it downward.  Her shaft slides down her body in a way that only a goo-girl's appendage could, its base traveling down her groin until her rod flops wetly onto the lips of your [vagina].  Though her cock sits neatly atop your entrance, Valeria only gives you a little smirk and pushes down again.  Her gooey prick folds in on itself, slathering your pussylips with slime as she literally pours herself into you, reconstituting her cock to perfectly fill each and every crevase of your eager [vagina]."); 
		outputText("\n\nValeria sits in your lap, seemingly motionless, but you can feel her cock pouring in and out of your cunt, fucking you as fast and hard as any solid prick ever could.  Your breath catches in your throat as Valeria utterly fills you, stretching your cunt with her massive, malleable member until she threatens to tear you apart.  Her gooey prick slams through your cervix, battering the entrance to your womb.  Were she solid, you're sure you would be in incredible pain; but being so soft and slippery, all you feel is pleasure as she fills and empties you.");
		outputText("\n\nGrinning wickedly, Valeria shifts her legs closer to her body, running them over your [chest]. You gasp as her soft, sticky goo slithers across your sensitive flesh.  Her feet stop just atop your [nipples].");
		//(paragraph finishes with the below:)
		//(If PC has normal tits)
		if(!player.hasFuckableNipples()) outputText("  Valeria swirls her heels around your sensitive [nipples], letting the tips slip into her gooey feet.  She rocks her heels back and forth, popping your nips in and out of her gooey body, feeling like little pinches and squeezes on your defenseless flesh.");
		//if PC has nipplecunts)
		else outputText("  The goo-girl, still grinning, picks her feet up off your chest. You can only watch as both her dainty feet swirl and bend, reconstituting themselves as a pair of massive flared horsecocks.  You barely have time to yelp before she plunges both of her bestial shafts deep into your [chest].  You moan like a whore as the goo-girl triple-penetrates you, ramming her three cocks into your stretched cunt and the holes on your chest.");
		//(end if)
		outputText("\n\nUnder Valeria's triple attacks on your [vagina] and [nipples], you cannot last very long.  Gasping with pleasure, you feel your climax rising.  But not one to be outdone, your gooey lover lets out her own long, loud moan and rams her cock");
		if(player.hasFuckableNipples()) outputText("s");
		outputText(" deeper inside you than ever before.  You feel streaks of goo pouring into you as she cums, pouring her essence into your womb ");
		if(player.hasFuckableNipples()) outputText("and [chest] ");
		outputText("until slime overflows from inside you, pooling under her hips.  Filled beyond your capacity, you scream your pleasure and cum, clamping down on Valeria's cock");
		if(player.hasFuckableNipples()) outputText("s");
		outputText(" until they literally pop inside you, flowing back out in goopy streaks.");
	}
	//(If Male/Herm)
	else if(player.hasCock()) {
		outputText("\n\nWith your cock stuffed into Valeria's warm, gooey innards, the goo-girl makes a show of rocking herself back and forth in your lap, using her entire bottom like one sopping-wet cunt riding your cock.  With her own rod in hand, she pushes down, letting the base of her prick shift down her body until it bends around your hips and pops back into form just above your [butt].  Your eyes go wide, but when you try to yelp, Val roughly shoves one of her feet into your mouth.  \"<i>Shh, partner,</i>\" she laughs, flicking your tongue with her soft, citrusy toes, \"<i>just let it happen... It'll be good, I promise.</i>\"");
		
		outputText("\n\nResigned, you let the goo-girl have her way.  You try your best to relax as her goo-cock slithers between your ass-cheeks, her prick remaining just hard enough for her to hotdog herself between your cheeks.  But rather than penetrate, she instead seems content for the moment to rock her hips in your lap, riding your " + cockDescript(0) + " and fucking your butt-cheeks with her own rod.  As she rides you, Valeria slips a little more foot into your mouth, pouring her leg into you until you get the hint and start to suckle her dainty toes, easily slipping your tongue into her soft body to taste her insides.");
		outputText("\n\nJust as you're getting into the rhythm of things, you feel a sudden pressure against your [asshole].  Oh, shit.  You squirm and try to relax yourself, but surprisingly, you don't feel the hard pinch of a cock's insertion.  Instead, Valeria pours a tiny trickle of herself into your anus, slowly but surely stretching you out as her cock inflates half-way inside you.  You groan in pleasure as she stretches you out and redoubles her pace on your " + cockDescript(0));
		//(if Herm: [
		if(player.hasVagina()) {
			cuntChange(10,true,true,false);
			outputText(", the double-attack's pleasure is so great that you barely even notice her creating a second cock above the first and pouring it into your unused [vagina], filling your last hole up with a firm, gooey cock");
		}
		outputText(".");
		buttChange(10,true,true,false);
		
		outputText("\n\nValeria begins to buck her hips in your lap, stuffing your hole");
		if(player.hasVagina()) outputText("s");
		outputText(" and fucking your " + cockDescript(0) + " with one fluid, passionate motion.  You're both moaning openly now, nearly overwhelmed by a multitude of pleasures.  You can feel your impending orgasm rising, and by the heightening pitch of Valeria's moans, she seems to be just as close to the edge."); 
		outputText("\n\nYou cum, screaming as you unload into Valeria's depths.  You can see your cum spurting into her, swirling and dancing in her brightly-colored, transparent body.  She echoes your cry as you feel hot goo squirting into you, her cock");
		if(player.hasVagina()) outputText("s");
		outputText(" literally popping as she climaxes, filling your stretched ass ");
		if(player.hasVagina()) outputText("and vag ");
		outputText("with warm, sticky goop.");
	}
	//(If PC is Genderless OR [Gooflation])
	else {
		gooFlation(false);
	}
	outputText("\n\nYou collapse, goop flowing freely from your abused body.  Laughing, Valeria pours out of your lap, ");
	if(player.gender > 0) outputText("patting her belly full of your juices, ");
	outputText("and looms over you.  \"<i>That was fun, partner,</i>\" she says, leaning down to give you a wet peck on the cheek. \"<i>Let's do that again soon, all right?</i>\"");

	stats(0,0,0,0,0,-1,-100,0);
	HPChange(25,false);
	doNext(13);
}

function gooFlation(clearText:Boolean = true):void {
	spriteSelect(79);
	if(clearText) {
		clearOutput();
		outputText("\"<i>Just relax, partner,</i>\" she grins, reaching up to run a hand through your [hair].  \"<i>Just let ol' Valeria take care of everything...</i>\"");
		outputText("\n\nYou bite your lip as you feel Valeria's feet shifting around behind you.  Suddenly there are ten tendrils of warm goo snaking around your [butt], tickling and caressing your sensitive flesh.");
	}
	else {
		outputText("\n\nValeria wiggles her gooey ass on your barren, genitalia-less lap, finally giving up when she sees that she isn't quite having an effect on you.  She pauses for a moment, thinking to herself, until you can see an idea flicker across her features.  With a grin, the armor-goo wraps her long legs around your [hips], locking her feet together behind your back.");
	}
	outputText("\n\nValeria, still curled up in your lap, gives you nothing but a cute, innocent little smile as you feel her toes growing and expanding into ten long, slender tentacles prying at your buttcheeks, seeking entrance to your ");
	if(!player.hasVagina()) outputText("one lonely ");
	outputText("hole.  You gulp as the tentacle-fuck begins, her long tendrils pouring one by one into your [asshole], each so small and soft it easily slips inside you.  One piles onto another, tickling and teasing your anal walls as more and more of her slithers into you.");
	buttChange(30,true,true,false);
	outputText("\n\nYou grunt and gasp as the last of her toe-tentacles pierces your sphincter and joins its sisters inside your ass.  As she pours more and more of her cock-toe-tendrils into you, you begin to see Valeria's body shrinking and deflating... Oh, god...");
	outputText("\n\nHer gut becomes concave, then her face, until she's pouring off your body and around your waist.  You try and struggle, but it's too late.  She surges up your rectum, utterly filling you with herself.  You can only sit and watch as your stomach begins to expand, pushing dangerously out from your ribs as the last little bits of Valeria suck up your ass.");
	outputText("\n\n\"<i>VALERIA!</i>\" you shout, poking your stomach.  Your flesh quivers, shaking like a great big bowl of goo.");
	outputText("\n\n\"<i>Hey there, partner,</i>\" you hear a laugh from inside you.  Before you can say anything else to the goo-girl inside you, your stomach rumbles.  You double over, half in pleasure half in pain as something lurches inside you.  You feel a rush going out your colon, and just squat in time for Val to explode out of your ass in one massive thrust.  You cum, an anal orgasm rocking your body as Valeria pops out your bum, pouring out of your well-stretched sphincter.");
	//(All Genders Reconvene) 
	if(clearText) {
		outputText("\n\nYou collapse, goop flowing freely from your abused body.  Laughing, Valeria pours out of your lap, ");
		if(player.gender > 0) outputText("patting her belly full of your juices, ");
		outputText("and looms over you.  \"<i>That was fun, partner,</i>\" she says, leaning down to give you a wet peck on the cheek. \"<i>Let's do that again soon, alright?</i>\"");
		stats(0,0,0,0,0,1,-100,0);
		HPChange(25,false);
		doNext(13);
	}
}

//Valeria -- [Sex] -- [Penetrate Her] (Dickwielders only)
function penetrateValeria():void {
	spriteSelect(79);
	clearOutput();
	outputText("\"<i>Mmm, that's a tasty-looking cock,</i>\" Valeria says as you disrobe, letting your " + cockDescript(0) + " flop free.  \"<i>I just might have to get a sample,</i>\" she chuckles, squatting down before you and taking your shaft in hand.  Rather than giving you a simple handy, however, the goo-girl places her palm against the head of your cock and presses forward.");
	outputText("\n\nYou gasp as her gooey skin parts, letting your " + cockDescript(0) + " slip inside her.  Her palm and forearms act like a snug, wet cocksleeve, shifting and molding to perfectly fit around your prick as you slide into her up to the hilt.  She grins up at you as she gives you a handy the likes of which only a goo-girl could manage, using her penetrable palm like a cunt.  You groan as she moves her arm, slowly stroking your cock inside of her, occasionally varying her motions, making wide circles around you or moving side to side.");
	outputText("\n\nBefore you can get too comfortable, however, Valeria sidles forward and moves your " + cockDescript(0) + " from her arm to her breast with a wet POP.  She squeezes her palmable C-cups together and leans in, letting your cock slip in between them and into her gooey flesh.  You moan as the pleasurable wetness and warmth of her interior returns when the goo-girl begins to titty-fuck you, slipping her wet breasts along the length of your shaft as the head bobs in and out of her cunt-like interior.");
	outputText("\n\nYou sink your fingers into the goo's shoulders and start to guide her speed, moving her back and forth along your cock at your own pace like a particularly lush onahole.  The normally-dominant Valeria makes a surprised, happy squeal as you seize control.  She redoubles her efforts of tit-fucking your " + cockDescript(0) + " as you use her as your own personal sex-toy, roughly ramming her back and forth on your shaft until you feel an orgasm bubbling up inside you.");
	outputText("\n\nValeria seems to sense the coming climax, too; she melts out of your grasp and slithers back, just out of reach.  \"<i>Tsk, tsk. I'm not done with you yet, [name],</i>\" she teases, gliding back as you try to grab her, desperate for release.  She waggles a finger at you, denying you access to her body, but a 'come hither' look spreads across her features.  You pursue her, your raging erection demanding her care, but she deftly eludes you until the threat of orgasm has passed.  Only then does the goo-girl slow, letting you roughly grab her shoulders and throw her to the ground.");
	outputText("\n\n\"<i>Ohhh, you want it rough, partner?</i>\" she laughs, spreading her gooey legs to reveal the slick tunnel of her cunt.  \"<i>Well, what are you waiting for? Let me have it already!</i>\"");
	outputText("\n\nYou eagerly oblige her, throwing her legs over your shoulders and plunging in.  Valeria lets out a roar of pleasure as you slide into her, burying yourself up to the hilt as her gooey insides conform to the exact shape of your " + cockDescript(0) + ", forming the perfect sleeve for you to fuck.  You sink your fingertips into her soft hips and start to pound her, slamming your cock into her until her groin begins to lose its consistency, warping around your hips until she practically swallows you whole.");
	outputText("\n\nValeria laughs and you cry out as she wraps her legs around your back and pulls you in, burying your face between her tits and sinking your hips and cock deep into her crotch.  She pulls you further in, forcing your face into and through her skin until you're nearly swallowed up by the goo-girl, only your struggling [legs] left outside her.  Valeria giggles and pats her belly, letting you just feel the touch of her hands through the goop around you.");
	outputText("\n\nYou try to struggle inside Valeria, but you let out a yelp of pleasure as she grabs your cock, her goo jutting from her hips to form a tight sheath around your length.  She merely grins and begins to jerk you off, running her hands easily up and down the length of your gooey cocksleeve.  You writhe inside her, held in place by the tight goo-body surrounding you and the hands firmly grasping your " + cockDescript(0) + ".  She coos and groans as she masturbates you, obviously enjoying the sensation as much as you are --  and maybe more.");
	outputText("\n\nSuddenly, you feel the goo constricting around you, threatening to crush you.  Your struggling intensifies, only serving to help Valeria get off even harder.  She throws back her head and screams, jerking both her hands along your shared shafts as she cums, goo exploding out the top of your cocksheath.  Feeling her contract and squeeze down on your " + cockDescript(0) + ", you're suddenly assaulted with the sensation of inevitable orgasm.");
	outputText("\n\nWith a sudden surge of strength, you take advantage of Valeria's dazed state to roll onto your knees, freeing your upper body from her so that only your hips and cock are still inside her rapidly-deforming body.  You grab her tits and jackhammer your prick into her, pounding her until you see rivulets of pre squirming through her.  Laughing, you let yourself go and cum, watching thick ropes of your spunk shoot into her depths, turning into a white mist inside her blue body.");
	outputText("\n\nWith a relieved, exhausted sigh, you collapse backwards, popping out of Valeria's body with a wet squelch.  As you lie on your back, panting from the rough sex, you notice Valeria reconstituting her body into her normal human form, a mist of cum rolling happily in her full belly.  She makes a show of rubbing her tummy before coming over and plopping down on top of you, her gropable bum pressing lightly on your gut.");
	outputText("\n\n\"<i>That was fun, partner,</i>\" she laughs.  \"<i>Tasty, too,</i>\" she adds, reaching into her belly to pull out a strand of your cum.  She slurps it back down, giving you a little wink.");
	outputText("\n\nYou run your hand along her curves as she digests her meal, but eventually you know you need to get on with your duties.  You roll Valeria off of you and start to redress.");
	stats(0,0,0,0,0,1,-100,0);
	HPChange(25,false);
	doNext(13);
}

//[Valeria] -- [Sex] -- [Get Dominated]
function valeriaSexDominated():void {
	spriteSelect(79);
	clearOutput();
	outputText("Making a show of playing hesitant and nervous, you tell Valeria you'd like her to take charge.  A wide grin quickly spreads across her girlish features.  \"<i>Mmm, feeling subby today, partner?  Good, good... You just let Valeria take good care of you, " + player.mf("handsome","cutie") + ".</i>\"");
	outputText("\n\nWith a sexual swing of her hips, Valeria closes the distance between you and presses her lips to yours.  One of her arms easily wraps around your neck, pulling you close to her as her other snakes into your clothes, teasing and caressing your inner thighs.  Suddenly, Valeria gives you a rough push, throwing you onto your ass.  She looms over you, licking her lips and placing one of her gooey feet firmly on your chest.  Goop seeps out of her heels, slithering out to bind your arms and [legs] as she encases your torso.");
	outputText("\n\n\"<i>Just lie back and submit, partner. It'll be better that way...</i>\"");
	//(PC has Vagina)
	if(player.hasVagina() && (!player.hasCock() || rand(2) == 0)) {
	   outputText("\n\nValeria begins to use her goo to peel back your clothes, soon revealing your defenseless [vagina].  She makes a show of licking her lips as tendrils of goo seep into your cunt, filling you utterly.  You meekly submit to your gooey captor, letting Valeria have her way with you. Seeing your lack of resistance, she smiles and coos what a good " + player.mf("boy","girl") + " you are, slowly withdrawing herself from your [vagina].");
	   outputText("\n\nYou have only a moment to figure out what's coming before her goo - now perfectly shaped like the inside of your cunt - slams back into you like a stiff cock.  You can't help yourself as a moan escapes your lips, barely audible through the goop covering your mouth.");
	   cuntChange(player.vaginalCapacity(),true,true,false);
		outputText("\n\n\"<i>Oh, you like that, do you?</i>\" the armor-goo asks, smiling evilly.  \"<i>Hmm, maybe if you're a good " + player.mf("boy","girl") + ", I'll let you get off, too</i>\"  Still grinning, she begins to hammer her cock-like appendage into your pussy, fucking you fast and hard with her goo-dildo.");
		//[If PC has breasts > A-cups: 
		if(player.biggestTitSize() > 1) {
			outputText("  As she hammers your cunny, bits of her goo swirl around your [chest], squeezing and massaging your tits. You squirm as she roughly teases your boobs, pinching at your nipples and squeezing your tender flesh roughly.");
			if(player.lactationQ() > 0) outputText("  To her delight, a spray of warm milk jets out of your sore nipples, milky white mixing into blue goo like oil in water.  \"<i>Mmm, tasty!</i>\" she teases, massaging more and more from you.");
		}
		outputText("\n\nShe continues to pound your cunt mercilessly, her grin spreading to inhuman width as your juices begin to flow around and into her gooey penetration. She soaks your fem-lube up greedily, enjoying the meal, but her fucking is relentless until you feel orgasm approaching. \"<i>Aw, ");
		if(player.tallness > 60) outputText("big ");
		else outputText("little ");
		outputText(player.mf("boy","girl") + " ready to cum?</i>\" she withdraws herself from you, leaving you feeling suddenly very, very empty.  \"<i>I didn't say you could cum yet, slut! I'm not done with you yet.</i>\"");
		outputText("\n\nYou gulp nervously as Valeria withdraws the goo from your entire body, leaving you naked save for the bonds she's placed on your wrists.  Roughly, she grabs your [hips] and rolls you over, forcing you into a kneeling position.  Grinning, she grabs your hair and pushes your face in the dirt, grinding your cheeks into the hard-packed ground as her hips press against your [butt].  You feel a warm, slick shaft plop between your asscheeks, grinding between them; another leaps up, wrapping around you, prodding at the entrance to your [vagina].");

		outputText("\n\nYou can only grit your teeth as Valeria pushes into you, leaning in as she slides her twin cocks into your cunt and asshole, meeting no resistance thanks to her goopy nature");
		if(player.vaginalCapacity() > 80 || player.analCapacity() > 80) outputText(" and your own receptibility");
		outputText(".  Hugging your back, the goo-girl grabs at your [chest], squeezing your tits and pinching at your nipples.  \"<i>Moan for me, bitch,</i>\" Valeria growls into your ear, giving your [nipples] a particularly violent tug.  You let out a lewd, whorish moan.  The goo-girl grins, her tongue lashing out to lick your ear as she rewards you with a single long thrust into your depths, filling and stretching your [vagina] and [asshole] completely before withdrawing.");
		outputText("\n\n\"<i>Well?</i>\" she demands, her cocks utterly still at the entrances to your holes.  \"<i>Don't stop moaning 'till I let you cum, you hear me?</i>\"");
		outputText("\n\nYou let out a whimpered moan, and immediately Valeria slams herself back into you.  Your moan turns into a scream of pleasure, but obediently you do as Valeria commanded and moan as she withdraws.  She thrusts right back into you, stretching you out wonderfully.  You fall into a happy pace, moaning and groaning as Valeria fucks you roughly, stuffing both your holes with her goo and savaging your breasts until your mind goes hazy with pleasure.");
		outputText("\n\n\"<i>Here we go...</i>\" Valeria grunts, \"<i>Now you can cum.  Go ahead, little bitch.  Feed me.</i>\"");
		outputText("\n\nYou cum at her command, fem-spunk gushing out of your [vagina] and into the goo-cock stuffed up your twat.  Both your holes contract hard on Valeria's dicks.  Laughing, the goo-girl absorbs your cum, growing larger and larger as you feed her, until she towers over you, her massive cocks now painfully stretching your walls.  \"<i>Oh, that's good.  Good, girl, good.  Yes, let it all out, just like that... just like that,</i>\" she coos, soaking your juices up until your orgasm finally passes.  Sated, she withdraws from inside you, leaving a decidedly empty feeling in your gut as she allows you to stand.");
		outputText("\n\n\"<i>Mmm, not bad, partner</i>\" Valeria says, patting her full belly.  You can see a bit of your cum ");
		if(player.lactationQ() > 0) outputText("and milk ");
		outputText("swirling around inside her.  \"<i>We'll do this again sometime,</i>\" she adds, walking off to another part of camp with a wink.");
	}
	//(PC has Dick)
	else {
		outputText("\n\nValeria begins to use her goo to peel back your clothes, soon revealing your defenseless, half-erect  package.  She makes a show of licking her lips as tendrils of goo wrap tightly around [eachCock] like a warm, wet onahole. You submit to your gooey bonds, and seeing your lack of resistance, Valeria smiles down at you and squeezes your " + multiCockDescriptLight() + " tighter.");
		outputText("\n\nYou gasp with pleasure as she starts to stroke [eachCock], jerking you off as she looms over you, grinning wickedly.  \"<i>Oh, you like that do you?</i>\" the armor-goo asks.  \"<i>Well then, I might just let you get off, too... If you're a good " + player.mf("boy","girl") + "</i>\"  She starts to increase her tempo, making you squirm and writhe as she wanks your " + multiCockDescriptLight() + ", licking her lips as little bubbles of pre start to form.");
		outputText("\n\nHelpless, you can only submit and try to enjoy yourself as the armored goo-girl continues to milk you.  She jerks you off mercilessly, her grin spreading to inhuman width as your pre begins to flow around and into her gooey 'hands.'  She soaks your pre-cum up greedily, enjoying the meal, but her fucking is relentless until you feel orgasm approaching.  \"<i>Aw, ");
		if(player.tallness > 60) outputText("big");
		else outputText("little");
		outputText(" " + player.mf("boy","girl") + " ready to cum? Well, go on then - we've got time for more.</i>\"");
		outputText("\n\nYou cum, ropes of thick, white jizz shooting out of your cock and into the goo's waiting body.  Laughing, the goo-girl absorbs your cum, growing larger and larger as you feed her until she towers over you, her expanding breasts and belly now hanging over you.  \"<i>Oh, that's good. Good, " + player.mf("boy","girl") + ", good.  Yes, let it all out, just like that... just like that,</i>\" she coos, soaking your cum up until your orgasm finally passes.");
		outputText("\n\nBefore you can think clearly again, though, Valeria drops down onto you, impaling herself on [oneCock].  You yelp as she enwraps your overly-sensitive flesh, stroking and pulling on your cock, forcing it to remain hard after your orgasm.  Straddling your helpless form, Valeria begins to rock her hips, humping your spent cock.");
		outputText("\n\n\"<i>What, didn't think I'd let such a tasty treat go after just one bite? Oh, no. Not a chance.</i>\"");
		outputText("\n\nYour eyes go wide as Valeria turns around on your prick, bracing herself on your [feet].  Now riding you reverse-cowgirl style, Valeria grabs your hands and puts them on her bubble butt, commanding you to play with her as she milks you for a second time.  You do as she commands, fingers sinking into her gooey flesh until the girl makes a sharp, pleasured gasp.  But you're only just able to focus on your task, much of your mind locked on your weary cock buried inside Valeria's body.  You can just see your " + cockDescript(0) + " through her cum-filled body, bobbing limply inside her as she bounces.");
		outputText("\n\nThe goo-girl rides you hard, bouncing on your cock until your hips and thighs are liberally splattered with stray strands of goo and semen.  You have to give her credit - you can't manage to go limp under her rough ministrations, and before long you're rock hard again.  Valeria grins over her shoulder at you, but doesn't let up for an instant.  You can feel your orgasm rising once again, but as soon as your dick starts to throb, Valeria lifts herself off you in a quick, fluid motion, leaving you weakly thrusting your hips in the air.  With your hands firmly bound by goo, you cannot give yourself release.");
		outputText("\n\n\"<i>Aw, ready to cum again so soon?</i>\" she coos, looming over you with her hands firmly on her flared hips.  \"<i>But I didn't say you could cum yet, little bitch.  Maybe if you begged,</i>\" she adds, gently tapping your " + cockDescript(0) + " with her big toe, sending shivers of ecstasy up your spine, \"<i>maybe then I'll let you cum.</i>\"");
		outputText("\n\nDesperate, you plead with Valeria to let you cum. She grins, but does nothing.  You cry out her name, begging her to help you.  Your lover makes only the slightest of motions, flicking her sole across the bottom of your shaft.  You feel like you could faint.");
		outputText("\n\n\"<i>One more time, slut,</i>\" she commands, utterly still. \"<i>Beg for it.</i>\"");
		outputText("\n\nYou beg for it. You want it more than anything in the world.  The demons could take this world if you could only cum!");
		outputText("\n\nValeria throws her head back and laughs as she submerges your prick into her gooey foot. The tight, wet hole surrounding you is too good to resist.  You yell out in pleasure and cum, watching as thick ropes of your hot white spunk blast into Valeria's leg, mixing with the cocktail of your fluids already wafting around inside her.  Valeria's laugh turns into a rapturous half-cry as the influx of fluids and your sudden penetration of her footgina set her off, sending literal quivers throughout her gooey body.");
		outputText("\n\n\"<i>Oh, that's good... good, " + player.mf("boy","girl") + ", good.  Yes, let it all out, just like that... just like that,</i>\" she moans, soaking your juices up until your orgasm finally passes.  Sated, she withdraws around your foot, leaving you a quivering mess on the ground.");
		outputText("\n\n\"<i>Mmm, not bad, partner</i>\" Valeria says, patting her full belly.  You can see a bit of your cum swirling around inside her.  \"<i>We'll do this again sometime,</i>\" she adds, walking off to another part of camp with a wink.");
	}
	HPChange(25,false);
	stats(0,0,0,0,0,1,-100,0);
	if(!inCombat()) doNext(13);
	else eventParser(5007);
}

//Followers -- [Valeria] -- [Talk]
function talkWithValeria():void {
	spriteSelect(79);
	clearOutput();
	outputText("You ask Valeria if she wouldn't mind just talking for a little bit.");
	outputText("\n\n\"<i>I dunno, partner,</i>\" she teases, sitting down beside you, \"<i>That's asking an awful lot.</i>\"");
	outputText("\n\nYou roll your eyes and, after a few pleasantries, venture to ask her... well, what the hell she is, exactly.  She's not at all like the average goo-girl wandering around Mareth.  She talks, she walks on two legs...");
	outputText("\n\nShe laughs girlishly, waving you off like you've said something absurd.  \"<i>I'm not a real goo, you know. At least, I didn't start out this way,</i>\" she adds, indicating her gooey blue form.  \"<i>No, I was a human, like you");
	if(player.race() != "human") outputText(" were");
	outputText(".  I just, I dunno, changed, I guess.</i>\"");
	outputText("\n\nChanged?");
	outputText("\n\n\"<i>Well, yeah. Back when the demons first came.  One of them took me and... changed me,</i>\" she says quietly, looking quickly away. \"<i>I don't know if there were real goo-girls or slimes back then.  I guess I was something of an experiment - a prototype, maybe.  The magic the demons used on me wasn't quite the same as whatever creates the goos nowadays, though.  I'm as mentally capable as I ever was, can talk, walk on two legs... The whole deal.  Biggest change is that shit like this happens,</i>\" she adds, picking up a nearby rock and poking into her belly. It floats listlessly inside her, darkly visible through her gooey skin.");
	outputText("\n\nYou quickly remark that, for someone who was the subject of demonic magics, she seems to be remarkably unscathed.  Most demon victims, you'd think, would be raving mad with lust at the very least.");
	outputText("\n\nValeria chuckles wryly. \"<i>Well, it's not like I'm completely unchanged,</i>\" she whispers huskily, leaning close and looking hungrily at your crotch.  \"<i>After all, I have certain... appetites... now, you know.  I'm not proud of my new needs, but I'm afraid I just can't ignore them...</i>\"");
	//How do you respond to that?
	//(Display Options: [Flirt](PC has Gender) [Accept] [Gross])
	if(player.gender > 0) simpleChoices("Flirt",3600,"Accept",3601,"Gross",3602,"",0,"",0);
	else simpleChoices("",0,"Accept",3601,"Gross",3602,"",0,"",0);
}

//[Flirt]
function flirtWithValeria():void {
	spriteSelect(79);
	clearOutput();
	outputText("You slip an arm around Valeria's slender shoulders and pull her close.  Patting your crotch, you tell her you're practically a gourmet chef for a girl like her.  She giggles and slips a hand easily into your [armor], ");
	if(player.hasCock()) outputText("brushing along the length of your rapidly-hardening cock");
	else outputText("brushing a wet, warm knuckle across your [clit]");
	outputText(".");
	
	outputText("\n\n\"<i>Mmm. I'm sure you are, partner,</i>\" she murmurs into your neck, nuzzling against you.  \"<i>So, what do you say you whip me up a little meal?</i>\"");
	//(Display Sex Options)
	followersValeriaSex(false);
}

//[Accept]
function acceptValeriasNeeds():void {
	spriteSelect(79);
	clearOutput();
	outputText("You smile and tell Valeria that you're perfectly all right with her special needs");
	if(player.hasStatusAffect("Slime Craving") >= 0) outputText(" after all, you have the same ones");
	outputText(", as long as they don't interfere with your mission as Champion.");
	outputText("\n\n\"<i>They won't, partner,</i>\" Valeria says with a little wink. \"<i>I give you my word.</i>\"");
	outputText("\n\nNodding, you ruffle her gooey hair and get back to business.");
	doNext(3588);
}
//[Gross]
function declineValeriasNeeds():void {
	spriteSelect(79);
	clearOutput();
	outputText("You grimace and push the goo-girl away.  You've got no interest in her corrupted 'needs,' especially with a look like that on her face.  She gasps as you push her, nearly falling over; she catches herself and glowers angrily.");
	outputText("\n\n\"<i>Well, fuck you kindly, [name],</i>\" she says with a huff.  \"<i>Pardon me for being... me.</i>\"  She turns up her chin and saunters off to a part of camp about as far away from you as possible.");
	//(Disable Valeria sex for 6 hours)
	doNext(13);
}

function takeValeria():void {
	spriteSelect(79);
	doNext(1);
	equipArmor("goo armor");
}

/*MISC. Valeria Interactions


[If PC has Valeria unequipped and Isabella is in camp]
(Play when PC returns to camp from anywhere/anything)

As you make your way back home, you hear an annoyed \"<i>Mooooo!</i>\" from Isabella's section of the camp. Cocking an eyebrow, you wander over to the busy cow-girl. Isabella's arms are currently crossed over her prodigious chest, her shield planted in the ground in front of her. Standing a few feet in front of her is Valeria, snuggly fit into her steel plates, her greatsword held firmly in hand. 

\"<i>I'm just saying, Izzy,</i>\" Valeria groans, nodding to her gooey sword. \"<i>You're fighting style is just... lacking, is all.</i>\"

\"<i>Mein style of combat ist NICHT LACKING!</i>\" Isabella huffs, crossing her arms so tight that a little dollop of milk bubbles out through her corset. 

\"<i>Yes it is! What's the fucking point of packing a big-ass tower shield and then PUNCHING people? Seriously, what's up with that; if you just can't afford a sword, or a hammer, or whatever, I could spot you some gems. I mean...</i>\"

\"<i>SILENCE!</i>\" Isabella snaps, scowling. \"<i>It ist not a matter of gems! I prefer to use mein fists, und that ist that.</i>\"

\"<i>Come oooonnnn, at least try using a sword. Please? You might like it...</i>\"

\"<i>Nein, Isabella vill not degrade her hand vith your goo weapons.</i>\"

Valeria's shoulders slump. \"<i>Fine, fine. Whatever. Get your arm torn off by a demon. See if I care. I'll just go... spar by myself, I guess.</i>\"

\"<i>Vait, I,</i>\" Isabella starts, grabbing Valeria's shoulder as she turns away. \"<i>I suppose I could... try ein svord.</i>\"

Valeria beams, and hands the cow-girl the gooey greatsword, urging her to give it a few swings to get accustomed to it.

Experimentally, Isabella swings the greatsword in long, slow arcs. She seems to be getting the hang of it, swinging faster and harder, adding on simple spins and parries... Until she makes a wide, spinning arc with the sword, and lands it right on Valeria's neck.

You watch in horror as the armor-goo's head tumbles to the ground, chopped right off by Isabella's powerful swing. \"<i>Mein Gott!</i>\" Isabella gasps, dropping the sword and clutching at her breast.

\"<i>Ow.</i>\" Valeria answers, her head reappearing on her neck a moment later. The cow-girl leaps back in fright as the dismembered head decomposes and is absorbed back into Valeria's feet. The goo-girl rolls her lower jaw and makes an exaggerated show of cracking her neck. \"<i>Hey, nice swing, Izzy. Might wanna, uh, look where you're swinging, though.</i>\"

\"<i>I, ah, ja. Ich vill?</i>\"

Valeria chuckles as she re-absorbs her greatsword and, scratching her neck, wanders off into camp, leaving poor Isabella rather startled.*/