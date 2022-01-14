import { GUI } from "../engine/gui"
import * as ENUM from "../appearanceEnums"
import { UTIL } from "../engine/utils"
import { liveData } from "../globalVariables"
import { BindType, StatusEffects } from "../statusEffectLib"
import { Items } from "../itemClass"
import { PerkLib } from "../perkLib"
import { Inventory } from "./inventory"
import { ICreature } from "../interfaces/icreature"
import { Camp } from "./camp"
import { FLAG } from "../flags/dataFlags"
import { CombatTeases } from "./combatTeases"

abstract class COMBAT {
    //------------
    // ACTIONS
    //------------
    static battleMenu(): void {
        GUI.clearOutput()
        GUI.outputText("<b>You are fighting " + liveData.monster.a + liveData.monster.refName + ".</b><br>")
        GUI.outputText(liveData.monster.battleDesc)
        GUI.outputText("<br><br><b><u>" + UTIL.capitalizeFirstLetter(liveData.monster.name) + "'s Stats</u></b>")
        GUI.outputText("<br>Level: " + liveData.monster.level)
        GUI.outputText("<br>HP: " + liveData.monster.HP + " / " + liveData.monster.maxHP() + " (" + Math.floor((liveData.monster.HP / liveData.monster.maxHP()) * 1000) / 10 + "%)")
        GUI.outputText("<br>Lust: " + liveData.monster.lust + " / " + liveData.monster.maxLust())
        GUI.outputText("<br>Fatigue: " + liveData.monster.fatigue + " / " + liveData.monster.maxFatigue())
        GUI.refreshStats()
        //DEBUGGING code to check wins
        //liveData.player.HP = 100;
        GUI.hideUpDown()
        GUI.menu()
        GUI.addButton(0, "Attack", this.attack)
        GUI.addButton(1, "Tease", this.tease)
        GUI.addButton(2, "Spells", this.magicMenu)
        GUI.addButton(3, "Items", Inventory.inventoryMenu)
        GUI.addButton(4, "Run", this.flee)
        GUI.addButton(5, "P. Specials", this.physicalSpecials)
        GUI.addButton(6, "M. Specials", this.mentalSpecials)
        if (liveData.monster.refName == "sandtrap") {
            GUI.addButton(7, "Climb", this.wait)
        } else {
            GUI.addButton(7, "Wait", this.wait)
        }
        GUI.addButton(8, "Fantasize", this.fantasize)
        if (liveData.player.findStatusEffect(StatusEffects.Bind) >= 0) {
            GUI.menu()
            GUI.addButton(0, "Struggle", this.struggle)
            GUI.addButton(1, "Wait", this.wait)
        }
    }

    static attack(): void {
        GUI.clearOutput()
        liveData.player.attack()
        this.combatRoundOver()
    }

    static tease(justText = false): void {
        //Go on!
        if (!justText) GUI.clearOutput()
        //You can't tease a blind guy!
        if (liveData.monster.findStatusEffect(StatusEffects.Blind) >= 0) {
            GUI.outputText("You do your best to tease " + liveData.monster.a + liveData.monster.refName + " with your body. It doesn't work - you blinded " + liveData.monster.himHer + ", remember?<br><br>")
            return
        }
        if (liveData.player.findStatusEffect(StatusEffects.Sealed) >= 0 && liveData.player.statusEffectValue(StatusEffects.Sealed, 2) == 1) {
            GUI.outputText("You do your best to tease " + liveData.monster.a + liveData.monster.refName + " with your body. Your artless twirls have no effect, as <b>your ability to tease is sealed.</b><br><br>")
            return
        }
        if (liveData.monster.name == "Sirius, a naga hypnotist") {
            GUI.outputText("He is too focused on your eyes to pay any attention to your teasing moves, <b>looks like you'll have to beat him up.</b><br><br>")
            return
        }
        //Proceed!
        CombatTeases.teaseMain(justText)
        this.combatRoundOver()
    }

    static flee(): void {
        //There are 4 states. Undefined means proceed to escape probability, null means return to battle menu, true if success, false if failure.
        GUI.clearOutput()
        //------------
        // PREEMPTIVE
        //------------
        let success = undefined
        if (this.inCombat() && liveData.player.findStatusEffect(StatusEffects.Sealed) >= 0 && liveData.player.statusEffectValue(StatusEffects.Sealed, 2) == 4) {
            GUI.outputText("You try to run, but you just can't seem to escape. <b>Your ability to run was sealed, and now you've wasted a chance to attack!</b><br><br>")
            success = false
        }
        //Rut doesnt let you run from dicks.
        if (liveData.player.inRut && liveData.monster.totalCocks() > 0 && liveData.player.HPRatio() > 0.25) {
            GUI.outputText("The thought of another male in your area competing for all the pussy infuriates you! No way will you run!")
            success = null
        }
        // if (liveData.monster.trap >= 0 && liveData.player.canFly()) {
        if (liveData.player.canFly()) {
            GUI.clearOutput()
            GUI.outputText(
                'You flex the muscles in your back and, shaking clear of the sand, burst into the air! Wasting no time you fly free of the sandtrap and its treacherous pit. "<i>One day your wings will fall off, little ant,</i>" the snarling voice of the thwarted androgyne carries up to you as you make your escape. "<i>And I will be waiting for you when they do!</i>"'
            )
            success = true
        }
        // if (liveData.monster.findStatusEffect(StatusEffects.GenericRunDisabled) >= 0 /* || urtaQuest.isUrta()*/) {
        //     GUI.outputText("You can't escape from this fight!")
        //     success = null
        // }
        // if (liveData.monster.findStatusEffect(StatusEffects.Level) >= 0 && liveData.monster.statusEffectv1(StatusEffects.Level) < 4) {
        //     GUI.outputText("You're too deeply mired to escape! You'll have to <b>climb</b> some first!")
        //     success = null
        // }
        // if (liveData.monster.findStatusEffect(StatusEffects.RunDisabled) >= 0) {
        //     GUI.outputText("You'd like to run, but you can't scale the walls of the pit with so many demonic hands pulling you down!")
        //     success = null
        // }
        // if (flags[FLAG.UNKNOWN_FLAG_NUMBER_00329] == 1 && (liveData.monster.refName == "minotaur gang" || liveData.monster.refName == "minotaur tribe")) {
        //     flags[FLAG.UNKNOWN_FLAG_NUMBER_00329] = 0
        //     //(Free run away)
        //     GUI.outputText("You slink away while the pack of brutes is arguing. Once they finish that argument, they'll be sorely disappointed!")
        //     success = true
        // } else if (liveData.monster.refName == "minotaur tribe" && liveData.monster.HPRatio() >= 0.75) {
        if (liveData.monster.refName == "minotaur tribe" && liveData.monster.HPRatio() >= 0.75) {
            GUI.outputText("There's too many of them surrounding you to run!")
            success = null
        }
        /*if (inDungeon || inRoomedDungeon) {
            GUI.outputText("You're trapped in your foe's home turf - there is nowhere to run!<br><br>");
            success = false;
            return;
        }
        if (prison.inPrison && !prison.prisonCanEscapeRun()) {
            success = false;
            return;
        }*/
        //Attempt texts!
        if (liveData.monster.refName == "Marae") {
            GUI.outputText("Your boat is blocked by tentacles! ")
            if (!liveData.player.canFly()) GUI.outputText("You may not be able to swim fast enough. ")
            else GUI.outputText("You grit your teeth with effort as you try to fly away but the tentacles grab your " + liveData.player.legs() + " and pull you down. ")
            GUI.outputText("It looks like you cannot escape. ")
            success = false
        }
        if (liveData.monster.refName == "Ember") {
            GUI.outputText("You take off")
            if (!liveData.player.canFly()) GUI.outputText(" running")
            else GUI.outputText(", flapping as hard as you can")
            GUI.outputText(", and Ember, caught up in the moment, gives chase. ")
            success = undefined
        }
        if (liveData.monster.refName == "lizan rogue") {
            GUI.outputText("As you retreat the lizan doesn't even attempt to stop you. When you look back to see if he's still there you find nothing but the empty bog around you.")
            success = true
        } else if (liveData.player.canFly()) GUI.outputText("Gritting your teeth with effort, you beat your wings quickly and lift off! ")
        //Nonflying PCs
        else {
            //In prison!
            /*if (prison.inPrison) {
                GUI.outputText("You make a quick dash for the door and attempt to escape! ");
            }*/
            //Stuck!
            /*else */ if (liveData.player.findStatusEffect(StatusEffects.NoFlee) >= 0) {
                if (liveData.monster.refName == "goblin") GUI.outputText("You try to flee but get stuck in the sticky white goop surrounding you.<br><br>")
                else GUI.outputText("You put all your skills at running to work and make a supreme effort to escape, but are unable to get away!<br><br>")
                success = false
            }
            //Nonstuck!
            else GUI.outputText("You turn tail and attempt to flee! ")
        }
        //Determine if escape is successful. If not, roll to determine if you'll escape.
        if (success === null) {
            //3 equal signs to ensure it doesn't pick up if undefined.
            GUI.doNext(this.battleMenu)
            return
        } else if (success == false) {
            this.combatRoundOver()
            return
        } else if (success == true) {
            liveData.player.clearStatuses()
            GUI.doNext(Camp.returnToCampUseOneHour)
            return
        }
        //------------
        // ESCAPE ROLL
        //------------
        success = false //Move on to escape probability
        //Calculations
        let escapeMod = 20 + liveData.monster.level * 3
        //Clamp initial values, capping difference at 10 levels.
        if (escapeMod < -10) escapeMod = -10
        if (escapeMod > 50) escapeMod = 50
        //Modifier based on conditions
        if (liveData.player.canFly()) escapeMod -= 20
        if (liveData.player.tailType == ENUM.TailType.TAIL_TYPE_RACCOON && liveData.player.earType == ENUM.EarType.EARS_RACCOON && liveData.player.findPerk(PerkLib.Runner) >= 0) escapeMod -= 25
        if (liveData.monster.findStatusEffect(StatusEffects.Stunned) >= 0) escapeMod -= 50
        else {
            //Big tits doesn't matter as much if ya can fly!
            if (liveData.player.biggestTitSize() >= 35) escapeMod += 5
            if (liveData.player.biggestTitSize() >= 66) escapeMod += 10
            if (liveData.player.hipRating >= 20) escapeMod += 5
            if (liveData.player.buttRating >= 20) escapeMod += 5
            if (liveData.player.ballSize >= 24 && liveData.player.balls > 0) escapeMod += 5
            if (liveData.player.ballSize >= 48 && liveData.player.balls > 0) escapeMod += 10
            if (liveData.player.ballSize >= 72 && liveData.player.balls > 0) escapeMod += 10
        }
        //ANEMONE OVERRULES NORMAL RUN
        if (liveData.monster.name == "anemone") {
            //Autosuccess - less than 60 lust
            if (liveData.player.lust < 60) {
                GUI.outputText(
                    "Marshalling your thoughts, you frown at the strange girl and turn to march up the beach. After twenty paces inshore you turn back to look at her again. The anemone is clearly crestfallen by your departure, pouting heavily as she sinks beneath the water's surface."
                )
                success = true
            }
            //Speed dependent
            else {
                //Success
                if (liveData.player.spe > UTIL.rand(liveData.monster.spe + escapeMod)) {
                    GUI.outputText(
                        "Marshalling your thoughts, you frown at the strange girl and turn to march up the beach. After twenty paces inshore you turn back to look at her again. The anemone is clearly crestfallen by your departure, pouting heavily as she sinks beneath the water's surface."
                    )
                    success = true
                    return
                }
                //Run failed:
                else {
                    GUI.outputText(
                        'You try to shake off the fog and run but the anemone slinks over to you and her tentacles wrap around your waist. <i>"Stay?"</i> she asks, pressing her small breasts into you as a tentacle slides inside your ' +
                            liveData.player.armor.equipmentName +
                            " and down to your nethers. The combined stimulation of the rubbing and the tingling venom causes your knees to buckle, hampering your resolve and ending your escape attempt."
                    )
                    //(gain lust, temp lose spd/str)
                    // liveData.monster.applyVenom(4 + liveData.player.sens / 20) // TODO: commented out line; why was it here?
                    success = false
                }
            }
        }
        //Ember is SPUCIAL
        /*if (monster.name == "Ember") {
            //GET AWAY
            if (liveData.player.spe > UTIL.rand(monster.spe + escapeMod) || (liveData.player.findPerk(PerkLib.Runner) >= 0 && UTIL.rand(100) < 50)) {
                if (liveData.player.findPerk(PerkLib.Runner) >= 0) 
                    GUI.outputText("Using your skill at running, y");
                else 
                    GUI.outputText("Y");
                GUI.outputText("ou easily outpace the dragon, who begins hurling imprecations at you. \"What the hell, [name], you weenie; are you so scared that you can't even stick out your punishment?\"");
                GUI.outputText("<br><br>Not to be outdone, you call back, \"Sucks to you! If even the mighty Last Ember of Hope can't catch me, why do I need to train? Later, little bird!\"");
                success = true;
            }
            //Fail:
            else {
                GUI.outputText("Despite some impressive jinking, " + EmberScene.emberMF("he","she") + " catches you, tackling you to the ground.<br><br>");
                success = false;
            }
        }*/
        //SUCCESSFUL FLEE
        if (success !== undefined && liveData.player.spe > UTIL.rand(liveData.monster.spe + escapeMod)) {
            //Escape prison
            /*if (prison.inPrison) {
                GUI.outputText("You quickly bolt out of the main entrance and after hiding for a good while, there's no sign of " + monster.a + " " + monster.refName + ". You sneak back inside to retrieve whatever you had before you were captured. ");
                clearStatuses(false);
                prison.prisonEscapeSuccessText();
                GUI.doNext(prison.prisonEscapeFinalePart1);
                return;
            }*/
            /*else */ if (liveData.player.canFly())
                //Fliers flee!
                GUI.outputText(UTIL.capitalize(liveData.monster.a) + liveData.monster.refName + " can't catch you.")
            else if (liveData.player.tailType == ENUM.TailType.TAIL_TYPE_RACCOON && liveData.player.earType == ENUM.EarType.EARS_RACCOON && liveData.player.findPerk(PerkLib.Runner) >= 0)
                //sekrit benefit: if you have coon ears, coon tail, and Runner perk, change normal Runner escape to flight-type escape
                GUI.outputText(
                    "Using your running skill, you build up a head of steam and jump, then spread your arms and flail your tail wildly; your opponent dogs you as best " +
                        liveData.monster.heShe +
                        " can, but stops and stares dumbly as your spastic tail slowly propels you several meters into the air! You leave " +
                        liveData.monster.himHer +
                        " behind with your clumsy, jerky, short-range flight."
                )
            //Non-fliers flee
            else GUI.outputText(UTIL.capitalize(liveData.monster.a) + liveData.monster.refName + " rapidly disappears into the shifting landscape behind you.")
            if (liveData.monster.name == "Izma") {
                GUI.outputText(
                    '<br><br>As you leave the tigershark behind, her taunting voice rings out after you. "<i>Oooh, look at that fine backside! Are you running or trying to entice me? Haha, looks like we know who\'s the superior specimen now! Remember: next time we meet, you owe me that ass!</i>" Your cheek tingles in shame at her catcalls.'
                )
            }
            success = true
        }
        //Runner perk chance
        else if (liveData.player.findPerk(PerkLib.Runner) >= 0 && UTIL.rand(100) < 50) {
            GUI.outputText("Thanks to your talent for running, you manage to escape.")

            if (liveData.monster.name == "Izma") {
                GUI.outputText(
                    '<br><br>As you leave the tigershark behind, her taunting voice rings out after you. "<i>Oooh, look at that fine backside! Are you running or trying to entice me? Haha, looks like we know who\'s the superior specimen now! Remember: next time we meet, you owe me that ass!</i>" Your cheek tingles in shame at her catcalls.'
                )
            }
            success = true
        }
        //FAIL FLEE
        else {
            // if (liveData.monster.name == "Holli") {
            //     liveData.monster.escapeFailWithHolli()
            //     return
            // }
            if (liveData.player.canFly()) {
                //Flyers get special failure message.
                if (liveData.monster.plural) GUI.outputText(UTIL.capitalize(liveData.monster.a) + liveData.monster.refName + " manage to grab your " + liveData.player.legs() + " and drag you back to the ground before you can fly away!")
                else GUI.outputText(UTIL.capitalize(liveData.monster.a) + liveData.monster.refName + " manages to grab your " + liveData.player.legs() + " and drag you back to the ground before you can fly away!")
            } else if (liveData.player.tailType == ENUM.TailType.TAIL_TYPE_RACCOON && liveData.player.earType == ENUM.EarType.EARS_RACCOON && liveData.player.findPerk(PerkLib.Runner) >= 0)
                // >>>>>>[P] FAIL
                GUI.outputText("Using your running skill, you build up a head of steam and jump, but before you can clear the ground more than a foot, your opponent latches onto you and drags you back down with a thud!")
            else {
                //Nonflyer messages
                //Huge balls messages
                if (liveData.player.balls > 0 && liveData.player.ballSize >= 24) {
                    if (liveData.player.ballSize < 48) GUI.outputText("With your " + liveData.player.ballsDescriptLight() + " swinging ponderously beneath you, getting away is far harder than it should be. ")
                    else GUI.outputText("With your " + liveData.player.ballsDescriptLight() + " dragging along the ground, getting away is far harder than it should be. ")
                }
                //FATASS BODY MESSAGES
                if (liveData.player.biggestTitSize() >= 35 || liveData.player.buttRating >= 20 || liveData.player.hipRating >= 20) {
                    //FOR PLAYERS WITH GIANT BREASTS
                    if (liveData.player.biggestTitSize() >= 35 && liveData.player.biggestTitSize() < 66) {
                        if (liveData.player.hipRating >= 20) {
                            GUI.outputText("Your " + liveData.player.hipDescript() + " forces your gait to lurch slightly side to side, which causes the fat of your " + liveData.player.skinTone + " ")
                            if (liveData.player.buttRating >= 20) GUI.outputText(liveData.player.buttDescript() + " and ")
                            GUI.outputText(liveData.player.chestDesc() + " to wobble immensely, throwing you off balance and preventing you from moving quick enough to escape.")
                        } else if (liveData.player.buttRating >= 20)
                            GUI.outputText(
                                "Your " +
                                    liveData.player.skinTone +
                                    liveData.player.buttDescript() +
                                    " and " +
                                    liveData.player.chestDesc() +
                                    " wobble and bounce heavily, throwing you off balance and preventing you from moving quick enough to escape."
                            )
                        else
                            GUI.outputText(
                                "Your " +
                                    liveData.player.chestDesc() +
                                    " jiggle and wobble side to side like the " +
                                    liveData.player.skinTone +
                                    " sacks of milky fat they are, with such force as to constantly throw you off balance, preventing you from moving quick enough to escape."
                            )
                    }
                    //FOR PLAYERS WITH MASSIVE BREASTS
                    else if (liveData.player.biggestTitSize() >= 66) {
                        if (liveData.player.hipRating >= 20) {
                            GUI.outputText("Your " + liveData.player.chestDesc() + " nearly drag along the ground while your " + liveData.player.hipDescript() + " swing side to side ")
                            if (liveData.player.buttRating >= 20) GUI.outputText("causing the fat of your " + liveData.player.skinTone + liveData.player.buttDescript() + " to wobble heavily, ")
                            GUI.outputText("forcing your body off balance and preventing you from moving quick enough to get escape.")
                        } else if (liveData.player.buttRating >= 20)
                            GUI.outputText(
                                "Your " +
                                    liveData.player.chestDesc() +
                                    " nearly drag along the ground while the fat of your " +
                                    liveData.player.skinTone +
                                    liveData.player.buttDescript() +
                                    " wobbles heavily from side to side, forcing your body off balance and preventing you from moving quick enough to escape."
                            )
                        else GUI.outputText("Your " + liveData.player.chestDesc() + " nearly drag along the ground, preventing you from moving quick enough to get escape.")
                    }
                    //FOR PLAYERS WITH EITHER GIANT HIPS OR BUTT BUT NOT THE BREASTS
                    else if (liveData.player.hipRating >= 20) {
                        GUI.outputText("Your " + liveData.player.hipDescript() + " swing heavily from side to side ")
                        if (liveData.player.buttRating >= 20) GUI.outputText("causing your " + liveData.player.skinTone + liveData.player.buttDescript() + " to wobble obscenely ")
                        GUI.outputText("and forcing your body into an awkward gait that slows you down, preventing you from escaping.")
                    }
                    //JUST DA BOOTAH
                    else if (liveData.player.buttRating >= 20) GUI.outputText("Your " + liveData.player.skinTone + liveData.player.buttDescript() + " wobbles so heavily that you're unable to move quick enough to escape.")
                }
                //NORMAL RUN FAIL MESSAGES
                else if (liveData.monster.plural) GUI.outputText(UTIL.capitalize(liveData.monster.a) + liveData.monster.refName + " stay hot on your heels, denying you a chance at escape!")
                else GUI.outputText(UTIL.capitalize(liveData.monster.a) + liveData.monster.refName + " stays hot on your heels, denying you a chance at escape!")
            }
        }
        GUI.outputText("<br><br>")
        if (success == true) {
            liveData.player.clearStatuses()
            GUI.doNext(Camp.returnToCampUseOneHour)
            return
        } else {
            this.combatRoundOver()
            return
        }
    }

    static wait(): void {
        GUI.clearOutput()
        if (liveData.monster.refName == "sandtrap") {
            SandTrap.sandTrapWait()
            return
        } else if (liveData.player.findStatusEffect(StatusEffects.Bind)) {
            switch (liveData.player.statusEffectValue(StatusEffects.Bind, 1)) {
                case BindType.BIND_TYPE_GOO:
                    GUI.outputText(
                        "You writhe uselessly, trapped inside the goo girl's warm, seething body. Darkness creeps at the edge of your vision as you are lulled into surrendering by the rippling vibrations of the girl's pulsing body around yours."
                    )
                    liveData.player.changeHP(-0.2 * liveData.player.maxHP(), true)
                    break
                case BindType.BIND_TYPE_NAGA:
                    GUI.outputText("The naga's grip on you tightens as you relax into the stimulating pressure. ")
                    liveData.player.changeHP(-(5 + UTIL.rand(5)), true, false)
                    liveData.player.changeLust(liveData.player.sens / 5 + 5, true, false)
                    break
                default:
            }
        } else GUI.outputText("You decide not to take any action this round.<br><br>")
        /*if (monster.findStatusEffect(StatusEffects.PCTailTangle) >= 0) {
            monster.kitsuneWait();
        }

        }
        else if (monster.findStatusEffect(StatusEffects.MinotaurEntangled) >= 0) {
            GUI.clearOutput();
            GUI.outputText("You sigh and relax in the chains, eying the well-endowed minotaur as you await whatever rough treatment he desires to give. His musky, utterly male scent wafts your way on the wind, and you feel droplets of your lust dripping down your thighs. You lick your lips as you watch the pre-cum drip from his balls, eager to get down there and worship them. Why did you ever try to struggle against this fate?<br><br>");
            player.changeLust(30 + UTIL.rand(5), true);
            this.combatRoundOver();
        }
        else if (player.findStatusEffect(StatusEffects.Whispered) >= 0) {
            GUI.clearOutput();
            GUI.outputText("You shake off the mental compulsions and ready yourself to fight!<br><br>");
            player.removeStatusEffect(StatusEffects.Whispered);
            this.combatRoundOver();
        }
        else if (player.findStatusEffect(StatusEffects.HarpyBind) >= 0) {
            GUI.clearOutput();
            GUI.outputText("The brood continues to hammer away at your defenseless self. ");
            player.changeHP(-(80 + UTIL.rand(40)), true);
            this.combatRoundOver();
        }
        else if (monster.findStatusEffect(StatusEffects.QueenBind) >= 0) {
            monster.ropeStruggles(true);
        }
        /*else if (player.findStatusEffect(StatusEffects.GooArmorBind) >= 0) {
            GUI.clearOutput();
            GUI.outputText("Suddenly, the goo-girl leaks half-way out of her heavy armor and lunges at you. You attempt to dodge her attack, but she doesn't try and hit you - instead, she wraps around you, pinning your arms to your chest. More and more goo latches onto you - you'll have to fight to get out of this.");
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
            GUI.clearOutput();
            if (player.cocks.length > 0)
                GUI.outputText("The creature continues spiraling around your cock, sending shivers up and down your body. You must escape or this creature will overwhelm you!");
            else if (player.hasVagina())
                GUI.outputText("The creature continues sucking your clit and now has latched two more suckers on your nipples, amplifying your growing lust. You must escape or you will become a mere toy to this thing! ");
            else GUI.outputText("The creature continues probing at your asshole and has now latched " + num2Text(player.totalNipples()) + " more suckers onto your nipples, amplifying your growing lust. You must escape or you will become a mere toy to this thing! ");
            player.changeLust((8 + player.sen / 10), true);
            this.combatRoundOver();
        }
        else if (player.findStatusEffect(StatusEffects.IsabellaStunned) >= 0) {
            GUI.clearOutput();
            GUI.outputText("You wobble about for some time but manage to recover. Isabella capitalizes on your wasted time to act again.<br><br>");
            player.removeStatusEffect(StatusEffects.IsabellaStunned);
        }
        else if (player.findStatusEffect(StatusEffects.Stunned) >= 0) {
            GUI.clearOutput();
            GUI.outputText("You wobble about, stunned for a moment. After shaking your head, you clear the stars from your vision, but by then you've squandered your chance to act.<br><br>");
            player.removeStatusEffect(StatusEffects.Stunned);
        }
        else if (player.findStatusEffect(StatusEffects.Confusion) >= 0) {
            GUI.clearOutput();
            GUI.outputText("You shake your head and file your memories in the past, where they belong. It's time to fight!<br><br>n");
            player.removeStatusEffect(StatusEffects.Confusion);
        }*/
        //else {

        //}

        liveData.player.changeFatigue(-5, false)
        this.combatRoundOver()
    }

    static fantasize(): void {
        GUI.clearOutput()
        let lustGain = 0
        if (liveData.player.armor == Items.Armor.GooArmor) {
            GUI.outputText("As you fantasize, you feel Valeria rubbing her gooey body all across your sensitive skin")
            if (liveData.player.gender > 0) GUI.outputText(" and genitals")
            GUI.outputText(", arousing you even further.<br>")
            lustGain = 25 + UTIL.rand(liveData.player.lib / 8 + liveData.player.cor / 8)
        } else if (liveData.player.balls > 0 && liveData.player.ballSize >= 10 && UTIL.rand(2) == 0) {
            GUI.outputText("You daydream about fucking " + liveData.monster.a + liveData.monster.refName + ", feeling your balls swell with seed as you prepare to fuck " + liveData.monster.himHer + " full of cum.<br>")
            lustGain = 5 + UTIL.rand(liveData.player.lib / 8 + liveData.player.cor / 8)
            GUI.outputText("You aren't sure if it's just the fantasy, but your " + liveData.player.ballsDescriptLight() + " do feel fuller than before...<br>")
            liveData.player.hoursSinceCum += 50
        } else if (liveData.player.biggestTitSize() >= 6 && UTIL.rand(2) == 0) {
            GUI.outputText(
                "You fantasize about grabbing " +
                    liveData.monster.a +
                    liveData.monster.refName +
                    " and shoving " +
                    liveData.monster.himHer +
                    " in between your jiggling mammaries, nearly suffocating " +
                    liveData.monster.himHer +
                    " as you have your way.<br>"
            )
            lustGain = 5 + UTIL.rand(liveData.player.lib / 5 + liveData.player.cor / 8)
        } else if (liveData.player.biggestLactation() >= 6 && UTIL.rand(2) == 0) {
            GUI.outputText(
                "You fantasize about grabbing " +
                    liveData.monster.a +
                    liveData.monster.refName +
                    " and forcing " +
                    liveData.monster.himHer +
                    " against a " +
                    liveData.player.nippleDescript(0) +
                    ", and feeling your milk let down. The desire to forcefeed SOMETHING makes your nipples hard and moist with milk.<br>"
            )
            lustGain = 5 + UTIL.rand(liveData.player.lib / 5 + liveData.player.cor / 8)
        } else {
            GUI.outputText("You fill your mind with perverted thoughts about " + liveData.monster.a + liveData.monster.refName + ", picturing " + liveData.monster.himHer + " in all kinds of perverse situations with you.<br>")
            lustGain = 10 + UTIL.rand(liveData.player.lib / 5 + liveData.player.cor / 8)
        }
        if (lustGain >= 20) GUI.outputText("The fantasy is so vivid and pleasurable you wish it was happening now. You wonder if " + liveData.monster.a + liveData.monster.refName + " can tell what you were thinking.<br><br>")
        else GUI.outputText("<br>")
        liveData.player.changeLust(lustGain, true)
        this.combatRoundOver()
    }

    static struggle(): void {
        GUI.clearOutput()
        let damage = 0
        switch (liveData.player.statusEffectValue(StatusEffects.Bind, 1)) {
            case BindType.BIND_TYPE_GOO:
                if (UTIL.rand(80) < 33 + liveData.player.str) {
                    //33% chance to break free + up to 100% chance for strength
                    GUI.outputText("You claw your fingers wildly within the slime and manage to brush against her heart-shaped nucleus. The girl silently gasps and loses cohesion, allowing you to pull yourself free while she attempts to solidify.")
                    liveData.player.removeStatusEffect(StatusEffects.Bind)
                } else {
                    GUI.outputText(
                        "You writhe uselessly, trapped inside the goo girl's warm, seething body. Darkness creeps at the edge of your vision as you are lulled into surrendering by the rippling vibrations of the girl's pulsing body around yours. "
                    )
                    damage = liveData.player.maxHP() * 0.15
                    liveData.player.changeHP(-damage, true, false)
                }
                break
            case BindType.BIND_TYPE_NAGA:
                if (UTIL.rand(80) < 33 + liveData.player.str / 1.5) {
                    //33% chance to break free + up to 66% chance for strength
                    GUI.outputText("You wriggle and squirm violently, tearing yourself out from within the naga's coils.")
                    liveData.player.removeStatusEffect(StatusEffects.Bind)
                } else {
                    GUI.outputText("The naga's grip on you tightens as you struggle to break free from the stimulating pressure. ")
                    damage += 7 + UTIL.rand(5)
                    liveData.player.changeHP(-damage, true, false)
                    liveData.player.changeLust(liveData.player.sens / 10 + 2, true, false)
                }
                break
            case BindType.BIND_TYPE_TENTACLE:
                GUI.outputText("You struggle with all of your might to free yourself from the tentacles before the creature can fulfill whatever unholy desire it has for you.<br>")
                if (UTIL.rand(80) < 33 + liveData.player.str / 2) {
                    //33% chance to break free + up to 50% chance for strength
                    GUI.outputText(
                        "As the creature attempts to adjust your position in its grip, you free one of your " +
                            liveData.player.legs() +
                            " and hit the beast in its beak, causing it to let out an inhuman cry and drop you to the ground smartly.<br><br>"
                    )
                    liveData.player.removeStatusEffect(StatusEffects.Bind)
                    liveData.monster.createStatusEffect(StatusEffects.TentacleCoolDown, 3, 0, 0, 0)
                } else {
                    //Fail to break free
                    GUI.outputText("Despite trying to escape, the creature only tightens its grip, making it difficult to breathe. ")
                    damage += 5
                    liveData.player.changeHP(-damage, true, false)
                    if (liveData.player.cocks.length > 0) GUI.outputText("The creature continues spiraling around your cock, sending shivers up and down your body. You must escape or this creature will overwhelm you! ")
                    else if (liveData.player.hasVagina())
                        GUI.outputText("The creature continues sucking your clit and now has latched two more suckers on your nipples, amplifying your growing lust. You must escape or you will become a mere toy to this thing! ")
                    else
                        GUI.outputText(
                            "The creature continues probing at your asshole and has now latched " +
                                UTIL.num2Text(liveData.player.totalNipples()) +
                                " more suckers onto your nipples, amplifying your growing lust. You must escape or you will become a mere toy to this thing! "
                        )
                    liveData.player.changeLust(3 + liveData.player.sens / 10 + liveData.player.lib / 20, true, false)
                }
                break
            default:
        }
        this.combatRoundOver(true)
    }

    //------------
    // CORE STUFF
    //------------
    static inCombat(): boolean {
        return liveData.playerMenu == this.battleMenu
    }

    static startCombat(enemy: ICreature, immediate = false): void {
        liveData.currentTurn = 0
        liveData.currentRound = 0
        liveData.playerMenu = this.battleMenu
        liveData.monster = enemy
        liveData.monster.HP = liveData.monster.maxHP()
        if (immediate) this.battleMenu()
        else GUI.doNext(this.battleMenu)
    }

    static fatigueRecovery(): void {
        liveData.player.changeFatigue(-1, false)
        if (liveData.player.findPerk(PerkLib.SpeedyRecovery) >= 0) liveData.player.changeFatigue(-1, false)
        if (liveData.player.findPerk(PerkLib.EnlightenedNinetails) >= 0 || liveData.player.findPerk(PerkLib.CorruptedNinetails) >= 0) liveData.player.changeFatigue(-(1 + UTIL.rand(3)), false)
    }
    static teaseXP(XP: number): void {
        while (XP > 0) {
            XP--
            liveData.player.teaseXP++
            //Level dat shit up!
            if (liveData.player.teaseLevel < 5 && liveData.player.teaseXP >= 10 + (liveData.player.teaseLevel + 1) * 5 * (liveData.player.teaseLevel + 1)) {
                GUI.outputText("<br><b>Tease skill leveled up to " + (liveData.player.teaseLevel + 1) + "!</b>")
                liveData.player.teaseLevel++
                liveData.player.teaseXP = 0
            }
        }
    }

    static combatRoundOver(skipEnemy = false): boolean {
        //Is combat over? Check if it is.
        if (this.checkCombatOver()) {
            return true
        }
        //Else... If it changes to 0, it's player's turn, else it's enemy's turn.
        if (liveData.currentTurn == 0 && !skipEnemy) {
            liveData.currentTurn = 1
            liveData.monster.doAI()
        } else {
            liveData.currentTurn = 0
            liveData.currentRound++
            GUI.doNext(this.battleMenu)
        }
        return false
    }

    static checkCombatOver(): boolean {
        if (liveData.monster.HP <= 0 || liveData.monster.lust >= liveData.monster.maxLust()) {
            GUI.doNext(liveData.monster.victory)
            return true
        } else if (liveData.player.HP <= 0 || liveData.player.lust >= liveData.player.maxLust()) {
            GUI.doNext(liveData.monster.defeat)
            return true
        }
        return false
    }

    static cleanupAfterCombat(nextFunc: () => void = UTIL.nullFunc): void {
        if (liveData.monster.HP <= 0 || liveData.monster.lust >= liveData.monster.maxLust()) {
            // if (nextFunc == undefined) nextFunc = Camp.returnToCampUseOneHour
            if (nextFunc == UTIL.nullFunc) nextFunc = Camp.returnToCampUseOneHour
            COMBAT.awardPlayer(nextFunc)
        } else if (liveData.player.HP <= 0 || liveData.player.lust >= liveData.player.maxLust()) {
            // if (nextFunc == undefined) nextFunc = Camp.returnToCampUseEightHours
            if (nextFunc == UTIL.nullFunc) nextFunc = Camp.returnToCampUseEightHours
            let gemsLost = Math.floor(liveData.monster.level + UTIL.rand(5))
            if (gemsLost > liveData.player.gems) gemsLost = liveData.player.gems
            GUI.outputText("<br><br>You'll probably come to your senses in eight hours or so, missing " + gemsLost + " gems.")
            liveData.player.changeGems(-gemsLost)
            GUI.doNext(nextFunc)
        }
        liveData.player.clearStatuses()
        liveData.monster.drops = []
        liveData.monster.dropThresholds = []
    }

    static awardPlayer(nextFunc: () => void): void {
        //console.log("Awarded player.");
        let xpGain = Math.floor(liveData.monster.getAwardableXP())
        //Scale down XP gain if 1 level below the cap so you don't hit the level cap too quickly. This will be removed once level cap is ever raised to 20.
        if (liveData.player.level >= liveData.levelCap - 1) {
            xpGain *= 0.2
            xpGain = Math.floor(xpGain)
        }
        let gemGain = Math.floor(liveData.monster.gems)
        GUI.outputText("<br><br>You grab " + gemGain + " gems and " + xpGain + " XP from your victory. ")
        liveData.player.changeXP(xpGain)
        liveData.player.changeGems(gemGain)
        let item = liveData.monster.dropItem()
        if (item) {
            GUI.outputText("There is " + item.longName + " on your defeated opponent. ")
            Inventory.takeItem(item, nextFunc)
        } else GUI.doNext(nextFunc)
    }

    static gameOver(): void {
        GUI.hideMenus()
        GUI.showMenuButton("buttonMain")
        GUI.showMenuButton("buttonData")
        GUI.menu()
        let gameOverTexts = ["GAME OVER", "Game over, man! Game over!", "You just got Bad-Ended!", "Your adventures have came to an end..."]
        if (liveData.silly) gameOverTexts[4] = "You cannot give up just yet. " + liveData.player.name + "! Stay determined..." //You are still filled with DETERMINATION.
        GUI.outputText('<br><br><font color="#800000"><b>' + UTIL.randomChoice(gameOverTexts) + "</b></font>")
        GUI.addButton(0, "Game Over", () => void {}, null, null, null, "Your game has ended. Please load a game or start a new game.")
        //GUI.addButton(1, "Quick Load", null, null, null, null, "Load your most recent save file.");
        //GUI.addButton(2, "Retry", null, null, null, null, "Retry from your last checkpoint.");
    }

    //------------
    // COMBAT SPECIALS
    //------------

    //------------
    // SPELLS
    //------------

    static magicMenu(): void {
        //Spells are housed within combatSpecial.js file.
        GUI.menu()
        //White Spells
        if (liveData.player.spells.blind) GUI.addButton(0, "Blind", this.spellBlind)
        if (liveData.player.spells.chargeWeapon) GUI.addButton(1, "Charge Weapon", this.spellChargeWeapon)
        if (liveData.player.spells.whitefire) GUI.addButton(2, "Whitefire", this.spellWhitefire)
        //Black Spells
        if (liveData.player.spells.arouse) GUI.addButton(5, "Arouse", this.spellArouse)
        if (liveData.player.spells.heal) GUI.addButton(6, "Heal", this.spellHeal)
        if (liveData.player.spells.might) GUI.addButton(7, "Might", this.spellMight)
        //Special
        if (liveData.player.findPerk(PerkLib.CleansingPalm) >= 0) GUI.addButton(10, "CleansingPalm", this.spellCleansingPalm)
        GUI.addButton(14, "Back", COMBAT.battleMenu)
    }

    //White Spells
    static spellBlind(): void {}
    static spellChargeWeapon(silent: boolean): void {
        if (silent) {
            liveData.player.createStatusEffect(StatusEffects.ChargeWeapon, 10 * this.spellMod(), 0, 0, 0)
            return
        }
        if (liveData.player.findPerk(PerkLib.BloodMage) < 0 && liveData.player.fatigue + this.spellCost(15) > liveData.player.maxFatigue()) {
            GUI.outputText("You are too tired to cast this spell.")
            GUI.doNext(this.magicMenu)
            return
        }
        liveData.player.changeFatigue(this.spellCost(15), false)
        GUI.outputText("You utter words of power, summoning an electrical charge around your " + liveData.player.weapon.equipmentName + ".  It crackles loudly, ensuring you'll do more damage with it for the rest of the fight.<br><br>")
        liveData.player.createStatusEffect(StatusEffects.ChargeWeapon, 10 * this.spellMod(), 0, 0, 0)
        liveData.gameFlags[FLAG.SPELLS_CAST]++
        this.spellPerkUnlock()
        // liveData.monster.combatAI() // TODO: commented out line; why was it here?
    }
    static spellWhitefire(): void {}
    //Black Spells
    static spellArouse(): void {}
    static spellHeal(): void {}
    static spellMight(silent: any = undefined): void {}
    //Special Spells
    static spellCleansingPalm(): void {}

    //------------
    // P. SPECIAL
    //------------
    static physicalSpecials(): void {
        GUI.menu()
        GUI.addButton(14, "Back", COMBAT.battleMenu)
    }

    //------------
    // M. SPECIAL
    //------------
    static mentalSpecials(): void {
        GUI.menu()
        GUI.addButton(14, "Back", COMBAT.battleMenu)
    }

    //------------
    // SPEC UTIL
    //------------
    static spellCost(cost: number): number {
        var temp = cost
        return temp
    }
    static physicalCost(cost: number): number {
        var temp = cost
        return temp
    }
    static spellMod(): number {
        return liveData.player.spellMod()
    }

    static spellPerkUnlock(): void {
        if (liveData.gameFlags[FLAG.SPELLS_CAST] >= 5 && liveData.player.findPerk(PerkLib.SpellcastingAffinity) < 0) {
            GUI.outputText("<b>You've become more comfortable with your spells, unlocking the Spellcasting Affinity perk and reducing fatigue cost of spells by 20%!</b><br><br>")
            liveData.player.createPerk(PerkLib.SpellcastingAffinity, 20, 0, 0, 0)
        }
        if (liveData.gameFlags[FLAG.SPELLS_CAST] >= 15 && liveData.player.perkValue(PerkLib.SpellcastingAffinity, 1) < 35) {
            GUI.outputText("<b>You've become more comfortable with your spells, further reducing your spell costs by an additional 15%!</b><br><br>")
            liveData.player.setPerkValue(PerkLib.SpellcastingAffinity, 1, 35)
        }
        if (liveData.gameFlags[FLAG.SPELLS_CAST] >= 45 && liveData.player.perkValue(PerkLib.SpellcastingAffinity, 1) < 50) {
            GUI.outputText("<b>You've become more comfortable with your spells, further reducing your spell costs by an additional 15%!</b><br><br>")
            liveData.player.setPerkValue(PerkLib.SpellcastingAffinity, 1, 50)
        }
    }
}

export { COMBAT }
