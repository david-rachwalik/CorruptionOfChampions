import { clearOutput, outputText } from "../engine/text";
import { GUI } from "../engine/gui";
import { UTIL } from "../engine/utils";
import { liveData } from "../globalVariables";
import { StatusEffects } from "../statusEffectLib";
import { Items } from "../itemClass";
import { PerkLib } from "../perkLib";
let monster = null;
let currentTurn = 0;
let currentRound = 0;
class COMBAT {
    //------------
    // ACTIONS
    //------------
    static battleMenu() {
        clearOutput();
        outputText("<b>You are fighting " + monster.a + monster.refName + ".</b><br>");
        outputText(monster.battleDesc);
        outputText("<br><br><b><u>" + UTIL.capitalizeFirstLetter(monster.name) + "'s Stats</u></b>");
        outputText("<br>Level: " + monster.level);
        outputText("<br>HP: " + monster.HP + " / " + monster.maxHP() + " (" + Math.floor((monster.HP / monster.maxHP()) * 1000) / 10 + "%)");
        outputText("<br>Lust: " + monster.lust + " / " + monster.maxLust());
        outputText("<br>Fatigue: " + monster.fatigue + " / " + monster.maxFatigue());
        GUI.refreshStats();
        //DEBUGGING code to check wins
        //liveData.player.HP = 100;
        GUI.hideUpDown();
        GUI.menu();
        GUI.addButton(0, "Attack", this.attack);
        GUI.addButton(1, "Tease", this.tease);
        GUI.addButton(2, "Spells", magicMenu);
        GUI.addButton(3, "Items", Inventory.inventoryMenu);
        GUI.addButton(4, "Run", this.flee);
        GUI.addButton(5, "P. Specials", physicalSpecials);
        GUI.addButton(6, "M. Specials", mentalSpecials);
        if (monster.refName == "sandtrap") {
            GUI.addButton(7, "Climb", this.wait);
        }
        else {
            GUI.addButton(7, "Wait", this.wait);
        }
        GUI.addButton(8, "Fantasize", this.fantasize);
        if (liveData.player.findStatusEffect(StatusEffects.Bind) >= 0) {
            GUI.menu();
            GUI.addButton(0, "Struggle", this.struggle);
            GUI.addButton(1, "Wait", this.wait);
        }
    }
    static attack() {
        clearOutput();
        liveData.player.attack();
        this.combatRoundOver();
    }
    static tease(justText = false) {
        //Go on!
        if (!justText)
            clearOutput();
        //You can't tease a blind guy!
        if (monster.findStatusEffect(StatusEffects.Blind) >= 0) {
            outputText("You do your best to tease " + monster.a + monster.refName + " with your body. It doesn't work - you blinded " + monster.himHer + ", remember?<br><br>");
            return;
        }
        if (liveData.player.findStatusEffect(StatusEffects.Sealed) >= 0 && liveData.player.statusEffectValue(StatusEffects.Sealed, 2) == 1) {
            outputText("You do your best to tease " + monster.a + monster.refName + " with your body. Your artless twirls have no effect, as <b>your ability to tease is sealed.</b><br><br>");
            return;
        }
        if (monster.name == "Sirius, a naga hypnotist") {
            outputText("He is too focused on your eyes to pay any attention to your teasing moves, <b>looks like you'll have to beat him up.</b><br><br>");
            return;
        }
        //Proceed!
        teaseMain(justText);
        this.combatRoundOver();
    }
    static flee() {
        //There are 4 states. Undefined means proceed to escape probability, null means return to battle menu, true if success, false if failure.
        clearOutput();
        //------------
        // PREEMPTIVE
        //------------
        let success = undefined;
        if (this.inCombat() && liveData.player.findStatusEffect(StatusEffects.Sealed) >= 0 && liveData.player.statusEffectValue(StatusEffects.Sealed, 2) == 4) {
            outputText("You try to run, but you just can't seem to escape. <b>Your ability to run was sealed, and now you've wasted a chance to attack!</b><br><br>");
            success = false;
        }
        //Rut doesnt let you run from dicks.
        if (liveData.player.inRut && monster.totalCocks() > 0 && liveData.player.HPRatio() > 0.25) {
            outputText("The thought of another male in your area competing for all the pussy infuriates you! No way will you run!");
            success = null;
        }
        if (monster.trap >= 0 && liveData.player.canFly()) {
            clearOutput();
            outputText('You flex the muscles in your back and, shaking clear of the sand, burst into the air! Wasting no time you fly free of the sandtrap and its treacherous pit. "<i>One day your wings will fall off, little ant,</i>" the snarling voice of the thwarted androgyne carries up to you as you make your escape. "<i>And I will be waiting for you when they do!</i>"');
            success = true;
        }
        if (monster.findStatusEffect(StatusEffects.GenericRunDisabled) >= 0 /* || urtaQuest.isUrta()*/) {
            outputText("You can't escape from this fight!");
            success = null;
        }
        if (monster.findStatusEffect(StatusEffects.Level) >= 0 && monster.statusEffectv1(StatusEffects.Level) < 4) {
            outputText("You're too deeply mired to escape! You'll have to <b>climb</b> some first!");
            success = null;
        }
        if (monster.findStatusEffect(StatusEffects.RunDisabled) >= 0) {
            outputText("You'd like to run, but you can't scale the walls of the pit with so many demonic hands pulling you down!");
            success = null;
        }
        if (flags[UNKNOWN_FLAG_NUMBER_00329] == 1 && (monster.refName == "minotaur gang" || monster.refName == "minotaur tribe")) {
            flags[UNKNOWN_FLAG_NUMBER_00329] = 0;
            //(Free run away)
            outputText("You slink away while the pack of brutes is arguing. Once they finish that argument, they'll be sorely disappointed!");
            success = true;
        }
        else if (monster.refName == "minotaur tribe" && monster.HPRatio() >= 0.75) {
            outputText("There's too many of them surrounding you to run!");
            success = null;
        }
        /*if (inDungeon || inRoomedDungeon) {
            outputText("You're trapped in your foe's home turf - there is nowhere to run!<br><br>");
            success = false;
            return;
        }
        if (prison.inPrison && !prison.prisonCanEscapeRun()) {
            success = false;
            return;
        }*/
        //Attempt texts!
        if (monster.refName == "Marae") {
            outputText("Your boat is blocked by tentacles! ");
            if (!liveData.player.canFly())
                outputText("You may not be able to swim fast enough. ");
            else
                outputText("You grit your teeth with effort as you try to fly away but the tentacles grab your " + liveData.player.legs() + " and pull you down. ");
            outputText("It looks like you cannot escape. ");
            success = false;
        }
        if (monster.refName == "Ember") {
            outputText("You take off");
            if (!liveData.player.canFly())
                outputText(" running");
            else
                outputText(", flapping as hard as you can");
            outputText(", and Ember, caught up in the moment, gives chase. ");
            success = undefined;
        }
        if (monster.refName == "lizan rogue") {
            outputText("As you retreat the lizan doesn't even attempt to stop you. When you look back to see if he's still there you find nothing but the empty bog around you.");
            success = true;
        }
        else if (liveData.player.canFly())
            outputText("Gritting your teeth with effort, you beat your wings quickly and lift off! ");
        //Nonflying PCs
        else {
            //In prison!
            /*if (prison.inPrison) {
                outputText("You make a quick dash for the door and attempt to escape! ");
            }*/
            //Stuck!
            /*else */ if (liveData.player.findStatusEffect(StatusEffects.NoFlee) >= 0) {
                if (monster.refName == "goblin")
                    outputText("You try to flee but get stuck in the sticky white goop surrounding you.<br><br>");
                else
                    outputText("You put all your skills at running to work and make a supreme effort to escape, but are unable to get away!<br><br>");
                success = false;
            }
            //Nonstuck!
            else
                outputText("You turn tail and attempt to flee! ");
        }
        //Determine if escape is successful. If not, roll to determine if you'll escape.
        if (success === null) {
            //3 equal signs to ensure it doesn't pick up if undefined.
            doNext(this.battleMenu);
            return;
        }
        else if (success == false) {
            this.combatRoundOver();
            return;
        }
        else if (success == true) {
            liveData.player.clearStatuses();
            doNext(Camp.returnToCampUseOneHour);
            return;
        }
        //------------
        // ESCAPE ROLL
        //------------
        success = false; //Move on to escape probability
        //Calculations
        let escapeMod = 20 + monster.level * 3;
        //Clamp initial values, capping difference at 10 levels.
        if (escapeMod < -10)
            escapeMod = -10;
        if (escapeMod > 50)
            escapeMod = 50;
        //Modifier based on conditions
        if (liveData.player.canFly())
            escapeMod -= 20;
        if (liveData.player.tailType == TAIL_TYPE_RACCOON && liveData.player.earType == EARS_RACCOON && liveData.player.findPerk(PerkLib.Runner) >= 0)
            escapeMod -= 25;
        if (monster.findStatusEffect(StatusEffects.Stunned) >= 0)
            escapeMod -= 50;
        else {
            //Big tits doesn't matter as much if ya can fly!
            if (liveData.player.biggestTitSize() >= 35)
                escapeMod += 5;
            if (liveData.player.biggestTitSize() >= 66)
                escapeMod += 10;
            if (liveData.player.hipRating >= 20)
                escapeMod += 5;
            if (liveData.player.buttRating >= 20)
                escapeMod += 5;
            if (liveData.player.ballSize >= 24 && liveData.player.balls > 0)
                escapeMod += 5;
            if (liveData.player.ballSize >= 48 && liveData.player.balls > 0)
                escapeMod += 10;
            if (liveData.player.ballSize >= 72 && liveData.player.balls > 0)
                escapeMod += 10;
        }
        //ANEMONE OVERRULES NORMAL RUN
        if (monster.name == "anemone") {
            //Autosuccess - less than 60 lust
            if (liveData.player.lust < 60) {
                outputText("Marshalling your thoughts, you frown at the strange girl and turn to march up the beach. After twenty paces inshore you turn back to look at her again. The anemone is clearly crestfallen by your departure, pouting heavily as she sinks beneath the water's surface.", true);
                success = true;
            }
            //Speed dependent
            else {
                //Success
                if (liveData.player.spe > rand(monster.spe + escapeMod)) {
                    outputText("Marshalling your thoughts, you frown at the strange girl and turn to march up the beach. After twenty paces inshore you turn back to look at her again. The anemone is clearly crestfallen by your departure, pouting heavily as she sinks beneath the water's surface.");
                    success = true;
                    return;
                }
                //Run failed:
                else {
                    outputText('You try to shake off the fog and run but the anemone slinks over to you and her tentacles wrap around your waist. <i>"Stay?"</i> she asks, pressing her small breasts into you as a tentacle slides inside your ' +
                        liveData.player.armorName +
                        " and down to your nethers. The combined stimulation of the rubbing and the tingling venom causes your knees to buckle, hampering your resolve and ending your escape attempt.");
                    //(gain lust, temp lose spd/str)
                    monster.applyVenom(4 + liveData.player.sen / 20);
                    success = false;
                }
            }
        }
        //Ember is SPUCIAL
        /*if (monster.name == "Ember") {
            //GET AWAY
            if (liveData.player.spe > rand(monster.spe + escapeMod) || (liveData.player.findPerk(PerkLib.Runner) >= 0 && rand(100) < 50)) {
                if (liveData.player.findPerk(PerkLib.Runner) >= 0)
                    outputText("Using your skill at running, y");
                else
                    outputText("Y");
                outputText("ou easily outpace the dragon, who begins hurling imprecations at you. \"What the hell, [name], you weenie; are you so scared that you can't even stick out your punishment?\"");
                outputText("<br><br>Not to be outdone, you call back, \"Sucks to you! If even the mighty Last Ember of Hope can't catch me, why do I need to train? Later, little bird!\"");
                success = true;
            }
            //Fail:
            else {
                outputText("Despite some impressive jinking, " + EmberScene.emberMF("he","she") + " catches you, tackling you to the ground.<br><br>");
                success = false;
            }
        }*/
        //SUCCESSFUL FLEE
        if (success !== undefined && liveData.player.spe > rand(monster.spe + escapeMod)) {
            //Escape prison
            /*if (prison.inPrison) {
                outputText("You quickly bolt out of the main entrance and after hiding for a good while, there's no sign of " + monster.a + " " + monster.refName + ". You sneak back inside to retrieve whatever you had before you were captured. ");
                clearStatuses(false);
                prison.prisonEscapeSuccessText();
                doNext(prison.prisonEscapeFinalePart1);
                return;
            }*/
            /*else */ if (liveData.player.canFly())
                //Fliers flee!
                outputText(capitalize(monster.a) + monster.refName + " can't catch you.");
            else if (liveData.player.tailType == TAIL_TYPE_RACCOON && liveData.player.earType == EARS_RACCOON && liveData.player.findPerk(PerkLib.Runner) >= 0)
                //sekrit benefit: if you have coon ears, coon tail, and Runner perk, change normal Runner escape to flight-type escape
                outputText("Using your running skill, you build up a head of steam and jump, then spread your arms and flail your tail wildly; your opponent dogs you as best " +
                    monster.heShe +
                    " can, but stops and stares dumbly as your spastic tail slowly propels you several meters into the air! You leave " +
                    monster.himHer +
                    " behind with your clumsy, jerky, short-range flight.");
            //Non-fliers flee
            else
                outputText(capitalize(monster.a) + monster.refName + " rapidly disappears into the shifting landscape behind you.");
            if (monster.name == "Izma") {
                outputText('<br><br>As you leave the tigershark behind, her taunting voice rings out after you. "<i>Oooh, look at that fine backside! Are you running or trying to entice me? Haha, looks like we know who\'s the superior specimen now! Remember: next time we meet, you owe me that ass!</i>" Your cheek tingles in shame at her catcalls.');
            }
            success = true;
        }
        //Runner perk chance
        else if (liveData.player.findPerk(PerkLib.Runner) >= 0 && rand(100) < 50) {
            outputText("Thanks to your talent for running, you manage to escape.");
            if (monster.name == "Izma") {
                outputText('<br><br>As you leave the tigershark behind, her taunting voice rings out after you. "<i>Oooh, look at that fine backside! Are you running or trying to entice me? Haha, looks like we know who\'s the superior specimen now! Remember: next time we meet, you owe me that ass!</i>" Your cheek tingles in shame at her catcalls.', false);
            }
            success = true;
        }
        //FAIL FLEE
        else {
            if (monster.name == "Holli") {
                monster.escapeFailWithHolli();
                return;
            }
            if (liveData.player.canFly()) {
                //Flyers get special failure message.
                if (monster.plural)
                    outputText(capitalize(monster.a) + monster.refName + " manage to grab your " + liveData.player.legs() + " and drag you back to the ground before you can fly away!");
                else
                    outputText(capitalize(monster.a) + monster.refName + " manages to grab your " + liveData.player.legs() + " and drag you back to the ground before you can fly away!");
            }
            else if (liveData.player.tailType == TAIL_TYPE_RACCOON && liveData.player.earType == EARS_RACCOON && liveData.player.findPerk(PerkLib.Runner) >= 0)
                // >>>>>>[P] FAIL
                outputText("Using your running skill, you build up a head of steam and jump, but before you can clear the ground more than a foot, your opponent latches onto you and drags you back down with a thud!");
            else {
                //Nonflyer messages
                //Huge balls messages
                if (liveData.player.balls > 0 && liveData.player.ballSize >= 24) {
                    if (liveData.player.ballSize < 48)
                        outputText("With your " + liveData.player.ballsDescriptLight() + " swinging ponderously beneath you, getting away is far harder than it should be. ");
                    else
                        outputText("With your " + liveData.player.ballsDescriptLight() + " dragging along the ground, getting away is far harder than it should be. ");
                }
                //FATASS BODY MESSAGES
                if (liveData.player.biggestTitSize() >= 35 || liveData.player.buttRating >= 20 || liveData.player.hipRating >= 20) {
                    //FOR PLAYERS WITH GIANT BREASTS
                    if (liveData.player.biggestTitSize() >= 35 && liveData.player.biggestTitSize() < 66) {
                        if (liveData.player.hipRating >= 20) {
                            outputText("Your " + liveData.player.hipDescript() + " forces your gait to lurch slightly side to side, which causes the fat of your " + liveData.player.skinTone + " ");
                            if (liveData.player.buttRating >= 20)
                                outputText(liveData.player.buttDescript() + " and ");
                            outputText(liveData.player.chestDesc() + " to wobble immensely, throwing you off balance and preventing you from moving quick enough to escape.");
                        }
                        else if (liveData.player.buttRating >= 20)
                            outputText("Your " +
                                liveData.player.skinTone +
                                liveData.player.buttDescript() +
                                " and " +
                                liveData.player.chestDesc() +
                                " wobble and bounce heavily, throwing you off balance and preventing you from moving quick enough to escape.");
                        else
                            outputText("Your " +
                                liveData.player.chestDesc() +
                                " jiggle and wobble side to side like the " +
                                liveData.player.skinTone +
                                " sacks of milky fat they are, with such force as to constantly throw you off balance, preventing you from moving quick enough to escape.");
                    }
                    //FOR PLAYERS WITH MASSIVE BREASTS
                    else if (liveData.player.biggestTitSize() >= 66) {
                        if (liveData.player.hipRating >= 20) {
                            outputText("Your " + liveData.player.chestDesc() + " nearly drag along the ground while your " + liveData.player.hipDescript() + " swing side to side ");
                            if (liveData.player.buttRating >= 20)
                                outputText("causing the fat of your " + liveData.player.skinTone + liveData.player.buttDescript() + " to wobble heavily, ");
                            outputText("forcing your body off balance and preventing you from moving quick enough to get escape.");
                        }
                        else if (liveData.player.buttRating >= 20)
                            outputText("Your " +
                                liveData.player.chestDesc() +
                                " nearly drag along the ground while the fat of your " +
                                liveData.player.skinTone +
                                liveData.player.buttDescript() +
                                " wobbles heavily from side to side, forcing your body off balance and preventing you from moving quick enough to escape.");
                        else
                            outputText("Your " + liveData.player.chestDesc() + " nearly drag along the ground, preventing you from moving quick enough to get escape.");
                    }
                    //FOR PLAYERS WITH EITHER GIANT HIPS OR BUTT BUT NOT THE BREASTS
                    else if (liveData.player.hipRating >= 20) {
                        outputText("Your " + liveData.player.hipDescript() + " swing heavily from side to side ");
                        if (liveData.player.buttRating >= 20)
                            outputText("causing your " + liveData.player.skinTone + liveData.player.buttDescript() + " to wobble obscenely ");
                        outputText("and forcing your body into an awkward gait that slows you down, preventing you from escaping.");
                    }
                    //JUST DA BOOTAH
                    else if (liveData.player.buttRating >= 20)
                        outputText("Your " + liveData.player.skinTone + liveData.player.buttDescript() + " wobbles so heavily that you're unable to move quick enough to escape.");
                }
                //NORMAL RUN FAIL MESSAGES
                else if (monster.plural)
                    outputText(capitalize(monster.a) + monster.refName + " stay hot on your heels, denying you a chance at escape!");
                else
                    outputText(capitalize(monster.a) + monster.refName + " stays hot on your heels, denying you a chance at escape!");
            }
        }
        outputText("<br><br>");
        if (success == true) {
            liveData.player.clearStatuses();
            doNext(Camp.returnToCampUseOneHour);
            return;
        }
        else {
            this.combatRoundOver();
            return;
        }
    }
    static wait() {
        clearOutput();
        if (monster.refName == "sandtrap") {
            SandTrap.sandTrapWait();
            return;
        }
        else if (liveData.player.findStatusEffect(StatusEffects.Bind)) {
            switch (liveData.player.statusEffectValue(StatusEffects.Bind, 1)) {
                case BIND_TYPE_GOO:
                    outputText("You writhe uselessly, trapped inside the goo girl's warm, seething body. Darkness creeps at the edge of your vision as you are lulled into surrendering by the rippling vibrations of the girl's pulsing body around yours.");
                    liveData.player.changeHP(-0.2 * liveData.player.maxHP(), true);
                    break;
                case BIND_TYPE_NAGA:
                    outputText("The naga's grip on you tightens as you relax into the stimulating pressure. ");
                    liveData.player.changeHP(-(5 + rand(5)), true, false);
                    liveData.player.changeLust(liveData.player.sen / 5 + 5, true, false);
                    break;
                default:
            }
        }
        else
            outputText("You decide not to take any action this round.<br><br>");
        /*if (monster.findStatusEffect(StatusEffects.PCTailTangle) >= 0) {
            monster.kitsuneWait();
        }

        }
        else if (monster.findStatusEffect(StatusEffects.MinotaurEntangled) >= 0) {
            clearOutput();
            outputText("You sigh and relax in the chains, eying the well-endowed minotaur as you await whatever rough treatment he desires to give. His musky, utterly male scent wafts your way on the wind, and you feel droplets of your lust dripping down your thighs. You lick your lips as you watch the pre-cum drip from his balls, eager to get down there and worship them. Why did you ever try to struggle against this fate?<br><br>");
            player.changeLust(30 + rand(5), true);
            this.combatRoundOver();
        }
        else if (player.findStatusEffect(StatusEffects.Whispered) >= 0) {
            clearOutput();
            outputText("You shake off the mental compulsions and ready yourself to fight!<br><br>");
            player.removeStatusEffect(StatusEffects.Whispered);
            this.combatRoundOver();
        }
        else if (player.findStatusEffect(StatusEffects.HarpyBind) >= 0) {
            clearOutput();
            outputText("The brood continues to hammer away at your defenseless self. ");
            player.changeHP(-(80 + rand(40)), true);
            this.combatRoundOver();
        }
        else if (monster.findStatusEffect(StatusEffects.QueenBind) >= 0) {
            monster.ropeStruggles(true);
        }
        /*else if (player.findStatusEffect(StatusEffects.GooArmorBind) >= 0) {
            clearOutput();
            outputText("Suddenly, the goo-girl leaks half-way out of her heavy armor and lunges at you. You attempt to dodge her attack, but she doesn't try and hit you - instead, she wraps around you, pinning your arms to your chest. More and more goo latches onto you - you'll have to fight to get out of this.");
            player.addStatusValue(StatusEffects.GooArmorBind, 1, 1);
            if (player.statusEffectValue(StatusEffects.GooArmorBind, 1) >= 5) {
                if (monster.findStatusEffect(StatusEffects.Spar) >= 0)
                    Valeria.pcWinsValeriaSparDefeat();
                else
                    Valeria.gooArmorBeatsUpPC();
                return;
            }
            this.combatRoundOver();
        }
        else if (player.findStatusEffect(StatusEffects.HolliConstrict) >= 0) {
            monster.waitForHolliConstrict(true);
        }
        else if (player.findStatusEffect(StatusEffects.TentacleBind) >= 0) {
            clearOutput();
            if (player.cocks.length > 0)
                outputText("The creature continues spiraling around your cock, sending shivers up and down your body. You must escape or this creature will overwhelm you!");
            else if (player.hasVagina())
                outputText("The creature continues sucking your clit and now has latched two more suckers on your nipples, amplifying your growing lust. You must escape or you will become a mere toy to this thing! ");
            else outputText("The creature continues probing at your asshole and has now latched " + num2Text(player.totalNipples()) + " more suckers onto your nipples, amplifying your growing lust. You must escape or you will become a mere toy to this thing! ");
            player.changeLust((8 + player.sen / 10), true);
            this.combatRoundOver();
        }
        else if (player.findStatusEffect(StatusEffects.IsabellaStunned) >= 0) {
            clearOutput();
            outputText("You wobble about for some time but manage to recover. Isabella capitalizes on your wasted time to act again.<br><br>");
            player.removeStatusEffect(StatusEffects.IsabellaStunned);
        }
        else if (player.findStatusEffect(StatusEffects.Stunned) >= 0) {
            clearOutput();
            outputText("You wobble about, stunned for a moment. After shaking your head, you clear the stars from your vision, but by then you've squandered your chance to act.<br><br>");
            player.removeStatusEffect(StatusEffects.Stunned);
        }
        else if (player.findStatusEffect(StatusEffects.Confusion) >= 0) {
            clearOutput();
            outputText("You shake your head and file your memories in the past, where they belong. It's time to fight!<br><br>n");
            player.removeStatusEffect(StatusEffects.Confusion);
        }*/
        //else {
        //}
        liveData.player.changeFatigue(-5, false);
        this.combatRoundOver();
    }
    static fantasize() {
        clearOutput();
        let lustGain = 0;
        if (liveData.player.armor == Items.Armor.GooArmor) {
            outputText("As you fantasize, you feel Valeria rubbing her gooey body all across your sensitive skin");
            if (liveData.player.gender > 0)
                outputText(" and genitals");
            outputText(", arousing you even further.<br>");
            lustGain = 25 + rand(liveData.player.lib / 8 + liveData.player.cor / 8);
        }
        else if (liveData.player.balls > 0 && liveData.player.ballSize >= 10 && rand(2) == 0) {
            outputText("You daydream about fucking " + monster.a + monster.refName + ", feeling your balls swell with seed as you prepare to fuck " + monster.himHer + " full of cum.<br>");
            lustGain = 5 + rand(liveData.player.lib / 8 + liveData.player.cor / 8);
            outputText("You aren't sure if it's just the fantasy, but your " + liveData.player.ballsDescriptLight() + " do feel fuller than before...<br>");
            liveData.player.hoursSinceCum += 50;
        }
        else if (liveData.player.biggestTitSize() >= 6 && rand(2) == 0) {
            outputText("You fantasize about grabbing " + monster.a + monster.refName + " and shoving " + monster.himHer + " in between your jiggling mammaries, nearly suffocating " + monster.himHer + " as you have your way.<br>");
            lustGain = 5 + rand(liveData.player.lib / 5 + liveData.player.cor / 8);
        }
        else if (liveData.player.biggestLactation() >= 6 && rand(2) == 0) {
            outputText("You fantasize about grabbing " +
                monster.a +
                monster.refName +
                " and forcing " +
                monster.himHer +
                " against a " +
                liveData.player.nippleDescript(0) +
                ", and feeling your milk let down. The desire to forcefeed SOMETHING makes your nipples hard and moist with milk.<br>");
            lustGain = 5 + rand(liveData.player.lib / 5 + liveData.player.cor / 8);
        }
        else {
            outputText("You fill your mind with perverted thoughts about " + monster.a + monster.refName + ", picturing " + monster.himHer + " in all kinds of perverse situations with you.<br>");
            lustGain = 10 + rand(liveData.player.lib / 5 + liveData.player.cor / 8);
        }
        if (lustGain >= 20)
            outputText("The fantasy is so vivid and pleasurable you wish it was happening now. You wonder if " + monster.a + monster.refName + " can tell what you were thinking.<br><br>");
        else
            outputText("<br>");
        liveData.player.changeLust(lustGain, true);
        this.combatRoundOver();
    }
    static struggle() {
        clearOutput();
        let damage = 0;
        switch (liveData.player.statusEffectValue(StatusEffects.Bind, 1)) {
            case BIND_TYPE_GOO:
                if (rand(80) < 33 + liveData.player.str) {
                    //33% chance to break free + up to 100% chance for strength
                    outputText("You claw your fingers wildly within the slime and manage to brush against her heart-shaped nucleus. The girl silently gasps and loses cohesion, allowing you to pull yourself free while she attempts to solidify.");
                    liveData.player.removeStatusEffect(StatusEffects.Bind);
                }
                else {
                    outputText("You writhe uselessly, trapped inside the goo girl's warm, seething body. Darkness creeps at the edge of your vision as you are lulled into surrendering by the rippling vibrations of the girl's pulsing body around yours. ");
                    damage = liveData.player.maxHP() * 0.15;
                    liveData.player.changeHP(-damage, true, false);
                }
                break;
            case BIND_TYPE_NAGA:
                if (rand(80) < 33 + liveData.player.str / 1.5) {
                    //33% chance to break free + up to 66% chance for strength
                    outputText("You wriggle and squirm violently, tearing yourself out from within the naga's coils.");
                    liveData.player.removeStatusEffect(StatusEffects.Bind);
                }
                else {
                    outputText("The naga's grip on you tightens as you struggle to break free from the stimulating pressure. ");
                    damage += 7 + rand(5);
                    liveData.player.changeHP(-damage, true, false);
                    liveData.player.changeLust(liveData.player.sens / 10 + 2, true, false);
                }
                break;
            case BIND_TYPE_TENTACLE:
                outputText("You struggle with all of your might to free yourself from the tentacles before the creature can fulfill whatever unholy desire it has for you.<br>");
                if (rand(80) < 33 + liveData.player.str / 2) {
                    //33% chance to break free + up to 50% chance for strength
                    outputText("As the creature attempts to adjust your position in its grip, you free one of your " +
                        liveData.player.legs() +
                        " and hit the beast in its beak, causing it to let out an inhuman cry and drop you to the ground smartly.<br><br>");
                    liveData.player.removeStatusEffect(StatusEffects.Bind);
                    monster.createStatusEffect(StatusEffects.TentacleCoolDown, 3, 0, 0, 0);
                }
                else {
                    //Fail to break free
                    outputText("Despite trying to escape, the creature only tightens its grip, making it difficult to breathe. ");
                    damage += 5;
                    liveData.player.changeHP(-damage, true, false);
                    if (liveData.player.cocks.length > 0)
                        outputText("The creature continues spiraling around your cock, sending shivers up and down your body. You must escape or this creature will overwhelm you! ");
                    else if (liveData.player.hasVagina())
                        outputText("The creature continues sucking your clit and now has latched two more suckers on your nipples, amplifying your growing lust. You must escape or you will become a mere toy to this thing! ");
                    else
                        outputText("The creature continues probing at your asshole and has now latched " +
                            num2Text(liveData.player.totalNipples()) +
                            " more suckers onto your nipples, amplifying your growing lust. You must escape or you will become a mere toy to this thing! ");
                    liveData.player.changeLust(3 + liveData.player.sens / 10 + liveData.player.lib / 20, true, false);
                }
                break;
            default:
        }
        this.combatRoundOver(true);
    }
    //------------
    // CORE STUFF
    //------------
    static inCombat() {
        return liveData.playerMenu == this.battleMenu;
    }
    static startCombat(enemy, immediate) {
        currentTurn = 0;
        currentRound = 0;
        playerMenu = this.battleMenu;
        monster = enemy;
        monster.HP = monster.maxHP();
        if (immediate)
            this.battleMenu();
        else
            doNext(this.battleMenu);
    }
    static fatigueRecovery() {
        liveData.player.changeFatigue(-1, false);
        if (liveData.player.findPerk(PerkLib.SpeedyRecovery) >= 0)
            liveData.player.changeFatigue(-1, false);
        if (liveData.player.findPerk(PerkLib.EnlightenedNinetails) >= 0 || liveData.player.findPerk(PerkLib.CorruptedNinetails) >= 0)
            liveData.player.changeFatigue(-(1 + rand(3)), false);
    }
    static teaseXP(XP) {
        while (XP > 0) {
            XP--;
            liveData.player.teaseXP++;
            //Level dat shit up!
            if (liveData.player.teaseLevel < 5 && liveData.player.teaseXP >= 10 + (liveData.player.teaseLevel + 1) * 5 * (liveData.player.teaseLevel + 1)) {
                outputText("<br><b>Tease skill leveled up to " + (liveData.player.teaseLevel + 1) + "!</b>");
                liveData.player.teaseLevel++;
                liveData.player.teaseXP = 0;
            }
        }
    }
    static combatRoundOver(skipEnemy = false) {
        //Is combat over? Check if it is.
        if (this.checkCombatOver()) {
            return true;
        }
        //Else... If it changes to 0, it's player's turn, else it's enemy's turn.
        if (currentTurn == 0 && !skipEnemy) {
            currentTurn = 1;
            monster.doAI();
        }
        else {
            currentTurn = 0;
            currentRound++;
            doNext(this.battleMenu);
        }
        return false;
    }
    static checkCombatOver() {
        if (monster.HP <= 0 || monster.lust >= monster.maxLust()) {
            doNext(monster.victory);
            return true;
        }
        else if (liveData.player.HP <= 0 || liveData.player.lust >= liveData.player.maxLust()) {
            doNext(monster.defeat);
            return true;
        }
        return false;
    }
    static cleanupAfterCombat(nextFunc = undefined) {
        if (monster.HP <= 0 || monster.lust >= monster.maxLust()) {
            if (nextFunc == undefined)
                nextFunc = Camp.returnToCampUseOneHour;
            awardPlayer(nextFunc);
        }
        else if (liveData.player.HP <= 0 || liveData.player.lust >= liveData.player.maxLust()) {
            if (nextFunc == undefined)
                nextFunc = Camp.returnToCampUseEightHours;
            let gemsLost = Math.floor(monster.level + rand(5));
            if (gemsLost > liveData.player.gems)
                gemsLost = liveData.player.gems;
            outputText("<br><br>You'll probably come to your senses in eight hours or so, missing " + gemsLost + " gems.");
            liveData.player.changeGems(-gemsLost);
            doNext(nextFunc);
        }
        liveData.player.clearStatuses();
        monster.drops = [];
        monster.dropThreshold = [];
    }
    static awardPlayer(nextFunc) {
        //console.log("Awarded player.");
        let xpGain = Math.floor(monster.getAwardableXP());
        //Scale down XP gain if 1 level below the cap so you don't hit the level cap too quickly. This will be removed once level cap is ever raised to 20.
        if (liveData.player.level >= levelCap - 1) {
            xpGain *= 0.2;
            xpGain = Math.floor(xpGain);
        }
        let gemGain = Math.floor(monster.gems);
        outputText("<br><br>You grab " + gemGain + " gems and " + xpGain + " XP from your victory. ");
        liveData.player.changeXP(xpGain);
        liveData.player.changeGems(gemGain);
        let item = monster.dropItem();
        if (item != undefined) {
            outputText("There is " + item.longName + " on your defeated opponent. ");
            Inventory.takeItem(item, nextFunc);
        }
        else
            doNext(nextFunc);
    }
    static gameOver() {
        hideMenus();
        showMenuButton("buttonMain");
        showMenuButton("buttonData");
        GUI.menu();
        let gameOverTexts = ["GAME OVER", "Game over, man! Game over!", "You just got Bad-Ended!", "Your adventures have came to an end..."];
        if (silly)
            gameOverTexts[4] = "You cannot give up just yet. " + liveData.player.name + "! Stay determined..."; //You are still filled with DETERMINATION.
        outputText('<br><br><font color="#800000"><b>' + UTIL.randomChoice(gameOverTexts) + "</b></font>");
        GUI.addButton(0, "Game Over", null, null, null, null, "Your game has ended. Please load a game or start a new game.");
        //GUI.addButton(1, "Quick Load", null, null, null, null, "Load your most recent save file.");
        //GUI.addButton(2, "Retry", null, null, null, null, "Retry from your last checkpoint.");
    }
}
export { COMBAT };
//# sourceMappingURL=combat.js.map