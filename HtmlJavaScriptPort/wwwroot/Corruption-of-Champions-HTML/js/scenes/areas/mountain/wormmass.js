/**
 * Ported by matraia on 10/7/16.
 */

//Including agreement found in original file:
/*
 LICENSE

 This license grants Fenoxo, creator of this game usage of the works of
 Dxasmodeus in this product. Dxasmodeus grants Fenoxo and the coders assigned by him to this project permission to alter the text to conform with current and new game functions, only. Dxasmodeus retains exclusive rights to alter or change the core contents of the events and no other developer may alter, change or use the events without permission from dxasmodeus. Fenoxo agrees to include Dxasmodeus' name in the credits with indications to the specific contribution made to the licensor. This license must appear
 either at the beginning or the end of the primary file in the source code and cannot be deleted by a third party. This license is also retroactive to include all versions of the game code including events created by dxasmodeus.

 DECLARATION OF OWNERSHIP

 The following events are the creative works of dxasmodeus and are covered under this license.

 Tentacle Plant Event
 Giacomo the Travelling Merchant
 All item events relating to purchases from Giacomo the Travelling Merchant
 worm colony Infestation Events

 Tentacle Plant Event and Giacomo sub-events are copyright 2010 by Dxasmodeus.
 worm colony Events are copyright 2011 by dxasmodeus.

 THIRD PARTY USAGE

 As Fenoxo has made his game code open source, this license DOES NOT transfer to a third party developer. The events created by Dxasmodeus may not be used in whole or in part without permission and license from Dxasmodeus. Dxasmodeus reserves the sole and exclusive right to grant third party licenses of copyrighted scenarios.

 For further information and license requests, Dxasmodeus may be contacted through private message at the Futanari Palace. http://www.futanaripalace.com/forum.php. */


var WormsScene = [];
addToGameFlags(WORM_INFEST_ATTEMPTED, MET_WORMS, INFESTED, EVER_INFESTED);

function WormMass() {
    //Name and references
    this.a = "the ";
    this.name = "worms";
    this.refName = this.name;
    this.isAre = "are";
    this.heShe = "they";
    this.himHer = "them";
    this.hisHer = "their";
    this.plural = true;
    this.battleDesc = "Before you stands the horrid mass of worms. It has shifted itself and now takes the shape of a humanoid composed completely of the worms in the colony. Its vaguely human shape lumbers towards you in a clearly aggressive manner.";
    //Core stats
    this.str = 35;
    this.tou = 5;
    this.spe = 10;
    this.inte = 1;
    this.lib = 90;
    this.sens = 60;
    this.cor = 90;
    //Combat stats
    this.HP = 40; // Special maxHP function
    this.lust = 30;
    this.fatigue = 0;
    //Advancement
    this.level = 3;
    this.XP = 0;
    this.gems = 0;
    //Battle variables
    this.weapon = Items.NOTHING;
    this.weapon.equipmentName = "worm";
    this.weapon.verb = "slap";
    this.armor.equipmentName = "skin";
    this.bonusHP = 0;
    this.additionalXP = 0;
    this.lustVuln = 0;
    //this.temperment = TEMPERMENT_LOVE_GRAPPLES; TODO Add Temperment System

    this.drops = []; // No drops
    this.dropThresholds = [];

    //Appearance
    this.gender = 0; //0 genderless, 1 male, 2 female, 3 hermaphrodite
    this.tallness = 36; //Height in inches
    this.skinTone = "white";
    this.skinType = 0;
    this.skinAdj = "";
    this.skinDesc = "skin";
    this.hairType = 0;
    this.hairColor = "";
    this.hairLength = 0;
    this.beardStyle = 0;
    this.beardLength = 0;
    this.furColor = "";

    //Head
    this.earType = 0;
    this.eyeType = 0;
    this.faceType = 0;
    this.tongueType = 0;


    this.femininity = 50;
    this.tone = 0;
    this.thickness = 0;
    this.hipRating = HIP_RATING_SLENDER;
    this.buttRating = BUTT_RATING_BUTTLESS;

    //Sexual Characteristics
    //Cocks

    //Ass
    this.ass = new Ass();
    this.ass.analLooseness = ANAL_LOOSENESS_VIRGIN;
    this.ass.analWetness = ANAL_WETNESS_DRY;
    //Breasts
    this.createBreastRow(0,0);

    //Drops
    this.clearDrops(); //Need to be called before populating the item arrays.

    //Victory/defeat
    this.victory = cleanupAfterCombat;
    this.defeat = WormsScene.lose;
};
WormMass.prototype = new Creature();
WormMass.prototype.constructor = WormMass;

WormMass.prototype.doAI = function() {
    switch (rand(2)) {
        case 0:
            WormMass.wormAttack(); // Special worm attack
            break;
        case 1:
            WormMass.wormEntice();
            break;
        default:
            WormMass.wormAttack(); // Shouldn't reach here, but leaving it in as a failsafe.
    }
    combatRoundOver();
};

WormMass.prototype.maxHP = function() {
    return 40 + (player.newGamePlusMod() * 20);
}

//Worms Attack
WormMass.wormAttack = function() {
    //Dodged!
    if (player.spe - monster.spe > 0 && (Math.random() * (((player.spe - monster.spe) / 4) + 80)) > 80) {
        outputText("The worm colony flails at you with its simulated arms, but its lack of coordination allows you to easily dodge its attack.<br>", false);
        return;
    }
//Evade
    if (player.findPerk(PerkLib.Evade) >= 0 && rand(100) < 10) {
        outputText("Using your skills at evading attacks, you anticipate and sidestep " + this.a + this.name + "' attacks.<br>", false);
        return;
    }
    var temp = ((monster.str + monster.weapon.attack) - Math.random() * (player.tou + player.armor.defense));
    if (temp <= 0) temp = 1;
    temp = Math.round(temp);
    if (temp > 0) player.changeHP(-temp, true); 
    outputText("The worm colony strikes at you with its makeshift limbs. It strikes you for ", false);
    outputText(String(temp), false);
    outputText(" damage and the limb splatters, dispersing the worms comprising the false arm.", false);
    outputText("<br>", false);
    return;
};

//Worms Entice
WormMass.wormEntice = function () {
    //FAIL
    if (rand(2) == 0) {
        if (player.lust < 50) outputText("The worm colony stands before you and begins secreting a significant amount of slime. You are perplexed as to why the worms have done this. You shrug your shoulders and remain on guard.<br>", false);
        else outputText("The worm colony shambles over to you and attempts to grapple you. Quickly sidestepping the clumsy movements of the creature, you avoid what could have been a horrible fate as the mass falls over and splatters in its failed attempt to engulf you.<br>", false);
        return;
    }
    //SUCCESS
    if (player.lust < 50) {
        outputText("The worm colony stands before you and begins secreting a significant amount of slime. Inexplicably, you find that your " + player.cockDescript(0) + " is already erect and is throbbing. The erection is quite meddlesome and you find yourself distracted by the unwanted arousal.<br>", false);
        player.changeLust((10+player.lib/20) + (player.cor/20));
    }
    else {
        outputText("The worm colony shambles over to you and attempts to grapple you. Attempting to dodge, you fail to get away fast enough and fall to the ground engulfed by the mass. You are completely covered in the slimy worms!!! Incapable of avoiding any of their movements, you feel their slime coat every inch of your body and you feel the struggle and strain of each individual worm as they crawl all over you. You immediately begin flailing wildly as you cannot even breathe!", false);
        //Chance of insta-loss if infested twice
        if (gameFlags[WORM_INFEST_ATTEMPTED] >= 1) {
            outputText("  Struggle as you might, the creatures overwhelm your body and prevent you from any conceivable opportunity to get them off you, Your head quickly becomes visible, allowing you to breathe as you stare helplessly at the cocoon of worms trapping you.<br><br>", false);
            WormsScene.infest1();
            return;
        }
        //Escaped!
        else {
            outputText("<br><br>You struggle wildly as you fight the worm colony for both air and to get the things off you. The sticky slime secreted by the individual worms greatly increases your task. After freeing one of your arms, you uncover your face, allowing you to breathe, and begin sweeping the beasts from your body. Stunned by your renewed vigor, the mass loses its cohesion, allowing your to quickly clear the worms from your body. The disbanded colony retreats a distance from you and begins reforming itself as you purge your body of the annelids.", false);
            gameFlags[WORM_INFEST_ATTEMPTED]++;
        }
    }
};

//---------
// Worm Victory and Defeat
//---------

//Victory leads to default messages

//Worm Loss start, you poor mortal...
WormsScene.lose = function() {
    outputText("<br>Overcome by your "+((player.HP <= 0) ? "wounds":"lust") +", you sink to your knees as the colony of worms swarms all over your body...<br><br>", true);
    WormsScene.infest1();
};

//Infestation begins...
WormsScene.infest1 = function() {
    //TODO Sprite spriteSelect(76);
    outputText("Trapped within the mass of worms, you are utterly helpless. The constant moving all over your body provides naught but unwanted stimulation. Your cock, not knowing any better, springs to attention, creating a peak in the mass. The worms immediately recognize what has happened to you. One particularly fat worm finds itself perched on top of your dick's throbbing glans. You feel it prodding about your urethral opening and come to a horrible realization that your precious penis is completely vulnerable to thousands of creatures capable of invading your body!!! Before you can react or curse your fate, the fat worm quickly forces open your urethra and begins to push its way inside your dick!\n\n", false);
    outputText("Crying out in shock, you feel the fat worm push its way, inch by inch, into your urethra. Your nerves light up like a Christmas tree as each individual cell tells you of the creature's presence and movement deeper into your body. The fat beast easily finds its way into your prostate and settles within the organ. As it settles, it begins flailing inside your sex. The sensations shift from shock to grotesque pleasure as your body only senses the stimulation conductive to orgasmic response. Your groin cramps and bloats quickly by the torrent of semen building within you and the invader's presence. Obviously sensitive to your fluids, you feel the worm thrash around some more, causing your body to respond by making more semen. The flopping creature quickly erodes any orgasmic discipline you are capable of and with a great shrill cry, you force lances of cum into the air, launching goo and worms alike in a sick display of forced pleasure. After you empty your body of spunk, the remaining worms become hyperaggressive.\n\n", false);
    outputText("Excited by the feel of your fluids on them, many smaller worms push their way into your penis. Your cock distends as the worms fight to get inside you and to the source of the milk that has so excited them. Your prostate quickly fills up with the squirming creatures. The discomfort in your bloated bludgeon and the ceaseless stimulation of your organs causes your body to produce more cum. However, you find yourself unable to climax as the invaders rest inside your body submerged in your salty lust. The rest of the colony disperses, having accomplished its true goal of infesting your body.\n\n", false);
    //Big corruption boost for low-corrupt players
    if (player.cor < 25) {
        player.cor = 25;
    } else {
        player.dynStats("cor", 1);
    }
    //Congrats, you got worms
    gameFlags[INFESTED] = 1;
    if (gameFlags[EVER_INFESTED] == 0) gameFlags[EVER_INFESTED] = 1;
    cleanupAfterCombat();
};

//---------
// Worm Encounters
//---------

//Worm Sign Toggle for this Fetish
WormsScene.wormToggle = function() {
    //TODO Sprite spriteSelect(76);
    clearOutput();
    outputText("While wandering, you come across a crudely illustrated sign.  It depicts an imp in obvious discomfort, covered in white little worms.  It looks as if one of them is even crawling into the imp's penis!\n\nHow do you feel about that?");
    gameFlags[MET_WORMS]++; // Show that we met the worms.
    addButton(0, "Aroused", WormsScene.wormsOn);
    addButton(1, "Grossed Out", WormsScene.wormsOff);
    addButton(2, "Who Cares?", WormsScene.wormsPartiallyOn);

};

//Bring on the worms!
WormsScene.wormsOn = function() {
    clearOutput();
    outputText("You actually think it's kind of a hot idea, and wonder if such creatures actually exist in this land as you make your way back to camp.");
    outputText("\n\n<b>If you ever change your mind, you can toggle from Fetishes menu in game settings.</b>");
    gameFlags[WORMS_FETISH] = 2;
    doNext(Camp.returnToCampUseOneHour);
};

//A few aren't bad...
WormsScene.wormsPartiallyOn = function() {
    clearOutput();
    outputText("You shrug and keep walking, not sure how you feel about the strange sign.");
    outputText("\n\n<b>If you ever change your mind, you can toggle from Fetishes menu in game settings.</b>");
    gameFlags[WORMS_FETISH] = 1;
    doNext(Camp.returnToCampUseOneHour);
};

//Get those worms out of my game!
WormsScene.wormsOff = function() {
    clearOutput();
    outputText("You shudder in revulsion and figure the sign to be the result of someone's perverted fantasy.");
    outputText("\n\n<b>If you ever change your mind, you can toggle from Fetishes menu in game settings.</b>");
    gameFlags[WORMS_FETISH] = 1;
    doNext(Camp.returnToCampUseOneHour);
};

// Basic Worm Encounter
WormsScene.wormEncounter = function() {
    //TODO SPRITE spriteSelect(76);
    clearOutput();
    if (gameFlags[MET_WORMS] = 0) { //First encounter
        outputText("As you are exploring, a rather pungent, peaty smell assails your nostrils. You hear a strange rustling and an off-kilter squishing noise in the distance. As you explore the area you come upon a most grotesque sight. Before you is a cohesive mass of writhing, wriggling worms! While normally solitary creatures, these appear to have coalesced into a monstrous living colony!\n\n");
        outputText("You have never before seen such a bizarre freak of nature. You see the mass of annelids creep about across your path. It stops and spreads slightly in your direction before halting. The stench of the mass is indescribable and a thick, viscous slime covers each of the countless worms forming the collective.\n\n");
        outputText("You stop dead in your tracks, wondering what this swarm will do. After a few tense moments, the mass crawls away in a direction opposite of both you and your current path. You breathe a sigh of relief as you are confident that no good could have come from confronting such a zoological travesty.");
        player.changeLust(-10);
        gameFlags[MET_WORMS]++;
        doNext(Camp.returnToCampUseOneHour);
    }
    else if (player.hasCock()) {
        outputText("Minding your own business, you make your way through the mountain and you find yourself stopped by another mass of the sickly worms. The collective stops, apparently sensing your presence and briefly ebbs in your direction. After a few tense moments, the mass begins moving again... straight towards you at an alarming rate!\n\n");
        outputText("What do you do?");
        addButton(0, "Confront", WormsScene.wormsConfront);
        addButton(1, "Do Nothing", WormsScene.wormsDoNothing);
        addButton(2, "Run", WormsScene.wormsRun);
    }
    else {
        outputText("Making your way, you stumble on another gross mass of worms. The countless struggling creatures bar the path before you. Again, you freeze in place as the horror gropes about on the ground. It appears to have no real interest in your presence and it makes its way in a direction other than yours, much to your relief.");
        doNext(Camp.returnToCampUseOneHour);
    }
};

//Fight the worms
WormsScene.wormsConfront = function() {
    //TODO Sprite spriteSelect(76);
    clearOutput();
    outputText("You turn to confront the worms and combat begins!");
    startCombat(new WormMass());
};

//Do nothing - Worms fight you anyway
WormsScene.wormsDoNothing = function() {
    //TODO Sprite spriteSelect(76);
    clearOutput();
    outputText("You do nothing, allowing the worms to enter combat range!");
    startCombat(new WormMass());
};

//Try to flee the worms before fighting starts. Chance to succeed.
WormsScene.wormsRun = function() {
    clearOutput();
    if (player.spe > rand(35)) {
        outputText("Your instincts overwhelm you and you immediately turn around and run like hell in the opposite direction. You look behind you as your heart feels as if it is about to burst only to discover that the creature did not follow you. You take a moment to catch your breath and consider yourself fortunate.");
        doNext(Camp.returnToCampUseOneHour);
    }
    else {
        outputText("You turn to run, but before your " + player.feet() + " can get you away, the worms are upon you!  You turn to face them, lest they launch onto your unprotected back.");
        startCombat(new WormMass());
    }
};

//-------
// Additional Worm Functions
//-------

/*
 //spontaneous orgasm - chance to avoid being raped by monsters who would care.
 public function infestOrgasm():void {
 spriteSelect(76);
 outputText("The ceaseless squirming of your uninvited guests send your body into paroxysms. Collapsing to your knees, you immediately begin pushing gouts of dick milk out of your body. You feel tremendous pressure in your pelvis and in your cock as you realize that you are pushing worms out with each torrent of cum! Stream upon stream of cum breaks free from the prison of your body, carrying some of the worms inside you with it. Once the orgasm passes, you collapse to the ground, totally spent. Before you pass out, you feel the unfortunate presence of the fat worm still in your body.", true);
 player.orgasm();
 //Check infestation and update it
 if (player.findStatusEffect(StatusEffects.Infested) >= 0) {
 //Increment infestation number
 if (player.statusEffectv1(StatusEffects.Infested) < 5) {
 player.addStatusValue(StatusEffects.Infested,1,1);
 player.cumMultiplier+=0.5;
 //fifth time is the charm!
 if (player.statusEffectv1(StatusEffects.Infested) == 5) {
 //Futaz
 if (player.balls == 0) {
 outputText("\n\nAfter you empty yourself, you feel your body shift. The presence of the large worm is no longer discomforting. It is as if your seminal bladder has enlarged to accommodate the new thing inside you. Likewise, your ejaculations have become truly monstrous and the amount of worms you expel has also increased. You realize that the large worm has become a part of you and you can now <b>infest</b> your enemies much in the same manner as you have been infested, yourself. All you need now is some poor fool to overwhelm with your new 'pets'.", false);
 }
 //non-ball-less
 else {
 outputText("\n\nYou feel an awkward sensation in your prostate.  You sense the fat worm squirming wildly triggering multiple, sloppy orgasms, leaving you spraying semen everywhere.  After a moment, the orgasms and the worm's twitching stop.  You feel " + num2Text(player.balls) + " separate sensations in your prostate and feel the sensation of pressure pushing on both sides of your body.  The reality hits you.  The fat worm has divided into " + num2Text(player.balls) + " smaller worms!  Each worm has found its way into your vesicles and is pushing down the vas deferens on each side.  You feel each worm push its way into your testicles and they immediately begin to swell to an impressive size.  Your pelvic muscles begin their familiar rhythmic squeezes and you see your sac bob in its tell-tale fashion of an impending orgasm.  Your muscles seize up and your now-massive scrotum tightens up in a vice-like grip around your fat, infested nuts as a huge solid stream of cum rockets from your cock.  You are utterly speechless as you literally shoot cum for five minutes straight!  When the orgasm subsides, you see a small colony of worms in the massive puddle of spunk you made, which quickly creeps off.  You realize that the creature is now a part of you and that you can use this to your advantage in a fight if you learn to control your ejaculations.", false);
 player.ballSize+=2;
 player.cumMultiplier++;
 }
 }
 }
 }
 doNext(camp.returnToCampUseTwoHours);

 }

 public function playerInfest():void {
 spriteSelect(76);
 //Keep logic sane if this attack brings victory
 //Gone	menuLoc = 0;
 if (player.fatigue + player.physicalCost(40) > player.maxFatigue()) {
 outputText("You try to summon up an orgasm, but you're too tired and waste your time trying!");
 player.changeFatigue(100-player.fatigue);
 monster.doAI();
 return;
 }

 //(if PC uses Infest)
 if (monster.short == "Izma") {
 player.changeFatigue(40,2);
 outputText("With a great squeeze, you will your body to push out a load of semen filled with worms.  Izma's eyes widen in shock as she dives and rolls away from the torrent.  \"<i>What the fuck!</i>\" she yells. \"<i>Is that what that smell was?  That's disgusting!  Get away from me " + player.short + ", I DON'T want what you've got.  Don't talk to me again while you've got those nasty things!</i>\"  Izma grabs her locker between her hands and wades into the lake, swimming away by means of her tail while holding the books out of the water.", true);
 //(set Izmacounter to 0)
 flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00230] = 0;
 flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00233] = 1;
 //clear status
 kGAMECLASS.inCombat = false;
 kGAMECLASS.combat.clearStatuses(false);
 doNext(camp.returnToCampUseOneHour);
 return;
 }
 if (monster.findStatusEffect(StatusEffects.TwuWuv) >= 0) {
 outputText("You expose yourself and attempt to focus on expelling your squirming pets toward Sheila but as you picture launching a flood of parasites from [eachCock], the fantasy she sent returns to you, breaking your concentration!  Your hand darts automatically to your crotch, stroking [oneCock] as you imagine unloading into her cunt... only with effort do you pull it away!\n\n");
 outputText("\"<i>Oh, my,</i>\" the demon teases.  \"<i>You don't have to masturbate yourself, [name]... I'll be happy to do it for you.</i>\"\n\n");
 dynStats("lus", 5 + player.sens/10, "resisted", false);
 monster.doAI();
 return;
 }
 player.changeFatigue(40,2);
 outputText("With a great squeeze, you will your body to push out a load of semen filled with worms. You moan in pleasure and release as your fluids launch at your enemy. Worms and cum fly through the air in an attempt to coat your opponent with your new pets.  ", true);
 //Viable target?
 if (monster.short == "minotaur" || monster.short == "imp") {
 if (monster.lust > 70) {
 outputText("Your load washes over the " + monster.short + " and " + monster.pronoun1 + " stops dead in " + monster.pronoun3 + " tracks as " + monster.pronoun1 + " chokes and sputters to clear the cum from " + monster.pronoun3 + " face and nose to breathe. The " + monster.short + " stumbles, attempting to stand in your fresh cum puddle and quickly busts its ass on the ground. The worms quickly take over and swarm around the " + monster.short + "' s " + monster.cockDescriptShort(0) + ". With wild hunger, the worms easily push into the " + monster.short + "'s urethra and begin venturing into your victim's body. The " + monster.short + " begins to convulse wildly as " + monster.pronoun3 + " body begins to react to the squirming invaders. The " + monster.short + " quickly peaks and cum flies in all directions, along with some worms. You laugh hysterically as the " + monster.short + " must now endure the endless orgasms your new pets provide. You choose to unload one last batch on your fallen foe to ensure a good infestation and walk away to leave the " + monster.short + " in the hell of endless pleasure.\n", false);
 monster.lust = 100;
 combat.cleanupAfterCombat();
 return;
 }
 else {
 outputText("The monster watches your display as they step out of the way, a little grossed out by your actions.\n", false);
 monster.lust+=5;
 }
 }
 else if (monster.short == "lizan rogue") {
 outputText("The lizan makes no attempt to dodge your worm-infused attack. The worms hit him with a fierce clash and slide down his body, disappearing into the ground without even attempting to infect the lizan. Maybe they prefer mammals...");
 }
 else if (monster.short == "anemone") {
 //Infest vs. anemone:
 outputText("The white mess takes the anemone square in the torso, and the worms nearest her blue shaft waste no time in heading for it.  You both watch curiously as the lead worms ascend her dick, only to run headlong into the tentacles and slip off, stunned.  Eyes twinkling, the girl scoops up a handful of the squirming load still on her stomach and slurps it down greedily.  She smacks her lips and says, \"<i>Chewy!</i>\"\n", false);
 monster.HP += 20;
 //(minus PC lust, of course)
 }
 //nonviable
 else {
 outputText("While your fluids bathe the " + monster.short + " in your salty lust, the worms take no interest in your foe and scurry off.\n", true);
 }
 awardAchievement("Cum Cannon", kACHIEVEMENTS.COMBAT_CUM_CANNON);
 dynStats("lus", -20);
 monster.doAI();
 }


 public function nightTimeInfestation():void {
 outputText("\n<b><u>Something odd happens that night...</u></b>\n");
 outputText("You're dreaming of the time you were infected with the worms... the way their comforting bulk sat so heavily in your body, constantly keeping you horny and potent, jism and slippery white parasites practically dripping from your cum-slit with every heated moment.  It felt so good to let them in, to let them claim you, and to become the worm-packing carrier you were meant to be.  You can remember how it felt to have one slithering up your urethra even now, the tiny body trailing slime as it squirmed through your shaft towards its goal.");
 outputText("\n\nMmmm, the way that little annelid rubbed your insides felt so good, and it only got better from there on.  After you let them get comfortable inside, you were also so horny, and it was so easy to get off.  You could just... think about squirting worms into some unsuspecting demon's vulnerable holes, and your little pets would coax your [balls] to climax.  They made you cum so fast and so hard!  You can still feel the squirming inside you, though it's getting deeper and deeper, just like the first time...");
 outputText("\n\nWait!  You snap awake from your fantasy to the sensation of hundreds of worms swarming [eachCock].  Your urethra");
 if (player.cockTotal() > 1) outputText("s are");
 else outputText(" is");
 outputText(" open and vulnerable to the piles of spunk-hungry parasites, and as you look on in shock, you see four of them slide into your worm-packed tunnel");
 if (player.cockTotal() > 1) outputText("s");
 outputText(", one after another!  No!  You reach for your [cock biggest] to somehow try and stop the infestation, but it's a futile gesture.  The worm pile on your [legs] is as big as the rest of you.  Worse still, you doubt you can pull out the ones that have already crawled inside.");

 outputText("\n\nGrabbing hold of [oneCock] with both hands, you pinch your fingers around ");
 if (player.cocks[player.biggestCockIndex()].cockThickness >= 6) outputText("as tight around the girth as you can");
 else outputText("tightly around your girth");
 outputText(", hoping to contain the squiggling menace in the upper reaches of your erection.");
 if (player.cockTotal() > 1) {
 outputText("  It's a vain effort, as your other penis");
 if (player.cockTotal() > 2) outputText("es are");
 else outputText(" is");
 outputText("already turning into ");
 if (player.cockTotal() == 2) outputText("an ");
 outputText("infestation highway");
 if (player.cockTotal() > 2) outputText("s");
 outputText(".  ");
 if (player.cockTotal() == 2) outputText("Its");
 else outputText("Their");
 outputText("inside");
 if (player.cockTotal() > 2) outputText("s are");
 else outputText(" is");
 outputText(" filled to the brim with moist wigglers.");
 }
 outputText("  You can feel narrow, tapered heads pushing at where you've pressed your urethra closed, and they try to force their way under again and again while more of their brethren pile in behind.  You stay resolute in your efforts to prevent the coming infection, pinching so hard it's painful and crying out as a result.  The pressure on your [cock biggest] wars with the way your body is reacting to the other sensations assaulting it.  Your [cock biggest] spasms powerfully when a big, fat worm perches on your [cockHead biggest], slithering all around it, leaving behind a trail of slimy gunk and sending accompanying tingles of delight through your rigid pole.");

 outputText("\n\nThe surge of blood into your erection shifts your grip just enough that one - no, two worms slip through.  Oh nooo!  They wriggle deeper inside you, little tails lashing at the side of your sensitive, innermost flesh, massaging your concentration away with each motion they make.  Your grip fails completely, and the torrent of parasites flows unimpeded past your pleasure-weakened digits.  They move through your urethra, getting deeper by the second.  At the same time, the big, heavy worm, arguably the king of this little colony, pushes its thick, white head into your piss-hole.  Your flagging resolve shatters as you're stretched wide by the insectile invasion, utterly penetrated.   The littler worms have already started to move into your prostate, and once there, they start to convulse, each slapping its head and tail against the sensitive organ again and again.");

 outputText("\n\nMoaning, you look on as the distended bulge makes its way down your [cock biggest], thrashing slightly when it disappears into your crotch, the sensations far stronger once it passes beyond your sight.  This is it... you're definitely infested now.  The worms are inside of you, and they're going to make you cum.  Lying back while your [hips] fruitlessly twitch upward, you let your eyes close and give in to the knowledge that soon, you'll be another horny worm-factory, roaming around and spraying them out at every opportunity.  That big, slithering blob joins the rest in your prostate, stretching it dangerously, and it starts to shake, thumping at the sides of your innermost organ.");

 outputText("\n\nThe painful pressure and erotic horror rise with the onslaught of spasming ecstasy in your reproductive organs, peaking when that huge intruder nestles itself completely inside you, squeezing your organ until you're wailing and bucking your hips, slapping [eachCock] on your belly while you cum.  The torrent of cum that you loose is unexpectedly voluminous, splattering off your [chest] and chin, dripping onto the ground in gooey streams.  Reacting quickly, the rest of the colony smushes over your spurting boner");
 if (player.cockTotal() > 1) outputText("s");
 outputText(" to absorb the sensual nutrition.  Some of them even slop off the sides after the dripping whiteness, to get to it before it absorbs into the brittle, wasted earth.  You cum and cum, almost without end, yet each thick jet is slurped into the writhing mass immediately, leaving behind just the parasitic, clear slime.");

 outputText("\n\nThe big one bathes in your jism, moving faster and faster to spur you to release even more.  Glittering spunk drains out of your tip mixed with a few white creatures until [eachCock] is twitching against you, convulsing with pleasure but unable to leak a single drop.  Only after you've given everything does the internal prostate massage subside, the uncomfortable weight settling into a steady throb.  They feel so good, and a hot wave of contentment slowly rolls through you.  Maternal pride wells up unbidden - these things are a part of you now, and keeping them fed feels so good.");

 outputText("\n\nYou relax in the afterglow, pondering just how you'll handle living with the constant desire, barely noticing the colony slinking off, freshly lubricated by your sexual fluids.  You drink into a lusty slumber, absently fingering [oneCock].");
 outputText("\n\n<b>You are infested, again!</b>");
 //Reinfest
 if (player.findStatusEffect(StatusEffects.Infested) >= 0) {trace("BWUH?");}
 else {
 player.createStatusEffect(StatusEffects.Infested,0,0,0,0);
 dynStats("cor", 0);
 }
 if (player.cor < 25) {
 dynStats("cor", 2);
 player.cor = 25;
 }
 doNext(playerMenu);
 }

 }

 }
 */