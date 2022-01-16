import { liveData } from "../../globalVariables.js";
import * as ENUM from "../../appearanceEnums.js";
import { FLAG } from "../../flags/dataFlags.js";
import { UTIL } from "../../engine/utils.js";
import { GUI } from "../../engine/gui.js";
import { Creature } from "../../creature.js";
import { COMBAT } from "../combat.js";
import { Items } from "../../itemClass.js";
import { StatusEffects } from "../../statusEffectLib.js";
import { Inventory } from "../inventory.js";
import { PerkLib } from "../../perkLib.js";
class Imp extends Creature {
    constructor() {
        super();
        //Name and references
        this.a = "an ";
        this.name = "imp";
        this.refName = this.name;
        this.isAre = "is";
        this.heShe = "he";
        this.himHer = "him";
        this.hisHer = "his";
        this.battleDesc =
            "An imp is short, only a few feet tall. An unkempt mane of shaggy black hair hangs from his head, parted by two short curved horns. His eyes are solid black, save for tiny red irises which glow with evil intent. His skin is bright red, and unencumbered by clothing or armor, save for a small loincloth at his belt. His feet are covered by tiny wooden sandals, and his hands tipped with sharp claws. A pair of tiny but functional wings occasionally flap from his back.";
        //Stats
        this.str = 20;
        this.tou = 10;
        this.spe = 25;
        this.inte = 12;
        this.lib = 45;
        this.sens = 45;
        this.cor = 100;
        //Combat stats
        this.HP = this.maxHP();
        this.lust = 40;
        this.fatigue = 0;
        //Advancement
        this.level = 1;
        this.gems = 5 + UTIL.rand(5);
        //Battle variables
        this.weapon.equipmentName = "claws";
        this.weapon.verb = "claw-slash";
        this.armor.equipmentName = "leathery skin";
        this.lustVuln = 1;
        this.temperment = 1; //TEMPERMENT_LUSTY_GRAPPLES
        //Appearance
        this.tallness = UTIL.rand(24) + 25;
        this.hipRating = ENUM.HipRatingType.HIP_RATING_BOYISH;
        this.buttRating = ENUM.ButtRatingType.BUTT_RATING_TIGHT;
        this.skinTone = "red";
        this.hairColor = "black";
        this.hairLength = 5;
        this.wingType = ENUM.WingType.WING_TYPE_IMP;
        //Sexual characteristics
        this.createCock(UTIL.rand(2) + 11, 2.5, ENUM.CockType.DEMON);
        this.balls = 2;
        this.ballSize = 1;
        this.createBreastRow(0);
        this.ass.analLooseness = ENUM.AnalLoosenessType.ANAL_LOOSENESS_STRETCHED;
        this.ass.analWetness = ENUM.AnalWetnessType.ANAL_WETNESS_NORMAL;
        //Drops
        this.clearDrops();
        this.addDrop(Items.Consumables.IncubiDraft, 30);
        this.addDrop(Items.Consumables.SuccubiMilk, 30);
        this.addDrop(Items.Consumables.ImpFood, 30);
        this.addDrop(Items.Consumables.CaninePepper, 10);
        //Victory/defeat
        this.victory = ImpScene.victoryAgainstImp;
        this.defeat = ImpScene.impRapesYou;
    }
    //------------
    // COMBAT
    //------------
    doAI() {
        switch (UTIL.rand(4)) {
            case 0:
                this.lustMagicAttack();
                break;
            default:
                this.attack();
        }
        COMBAT.combatRoundOver();
    }
    lustMagicAttack() {
        GUI.outputText("You see " + liveData.monster.a + liveData.monster.refName + " make sudden arcane gestures at you! ");
        liveData.player.changeLust(liveData.player.lib / 10 + liveData.player.cor / 10 + 10, true);
        //Lust check
        if (liveData.player.lust < 30)
            GUI.outputText("You feel strangely warm. ");
        if (liveData.player.lust >= 30 && liveData.player.lust < 60)
            GUI.outputText("Blood rushes to your groin as a surge of arousal hits you, making your knees weak. ");
        if (liveData.player.lust >= 60)
            GUI.outputText("Images of yourself fellating and fucking the imp assault your mind, unnaturally arousing you. ");
        //Genitals check
        if (liveData.player.cocks.length > 0) {
            if (liveData.player.lust >= 60)
                GUI.outputText("You feel your " + liveData.player.multiCockDescriptLight() + " dribble pre-cum.");
            else if (liveData.player.lust >= 30 && liveData.player.cocks.length == 1)
                GUI.outputText("Your " + liveData.player.cockDescript(0) + " hardens, distracting you further.");
            else if (liveData.player.lust >= 30 && liveData.player.cocks.length > 1)
                GUI.outputText("Your " + liveData.player.multiCockDescriptLight() + " harden uncomfortably.");
            if (liveData.player.hasVagina())
                GUI.outputText(" ");
        }
        if (liveData.player.lust >= 60 && liveData.player.hasVagina()) {
            switch (liveData.player.vaginas[0].vaginalWetness) {
                case ENUM.VaginalWetnessType.VAGINA_WETNESS_NORMAL:
                    GUI.outputText("Your " + liveData.player.allVaginaDescript() + " dampen" + (liveData.player.vaginas.length > 1 ? "" : "s") + " perceptibly.");
                    break;
                case ENUM.VaginalWetnessType.VAGINA_WETNESS_WET:
                    GUI.outputText("Your crotch becomes sticky with girl-lust.");
                    break;
                case ENUM.VaginalWetnessType.VAGINA_WETNESS_SLICK:
                    GUI.outputText("Your " + liveData.player.allVaginaDescript() + " become" + (liveData.player.vaginas.length > 1 ? "" : "s") + " sloppy and wet.");
                    break;
                case ENUM.VaginalWetnessType.VAGINA_WETNESS_DROOLING:
                    GUI.outputText("Thick runners of girl-lube stream down the insides of your thighs.");
                    break;
                case ENUM.VaginalWetnessType.VAGINA_WETNESS_SLAVERING:
                    GUI.outputText("Your " + liveData.player.allVaginaDescript() + " instantly soak" + (liveData.player.vaginas.length > 1 ? "" : "s") + " your groin.");
                default: //Dry vaginas are unaffected
            }
        }
        GUI.outputText("<br>");
    }
}
//------------
// SCENES
//------------
// FOR ANYONE WANTING TO EXPAND THIS, THESE ADDITIONAL IMP SCENES WERE UNFINISHED IN THE ORIGINAL CODE.
/*
 {{Any player: Oral Give}}
 <<Cor <30>>You look furtively at the imp's [imp cock desc] as the creature masturbates shamelessly on the ground in front of you.  Unable to help yourself, you trot closer and closer, leaning in to get a better look at its giant member.  A lustful part of you wonders what the dripping pre-cum would taste like against your tongue.<<else if Cor <50>>You look lustfully at the imp's [imp cock desc] as the creature masturbates shamelessly on the ground in front of you.  Licking your lips in anticipation you walk closer, lowering your head to better inspect it.  <<else>>Your grin betrays your lust as you watch the imp masturbate its [imp cock desc] shamelessly on the ground.  Your hands already drift over your body as you trot over and grab a hold of its [imp cock desc], bringing it to your eager lips.<</Cor>>  The Imp's eyes shoot open as its hands grab a hold of your [hair desc - if no hair, then ears] and it pulls its member against your lips.  With your guard down, images of fellating the [imp cock desc] fill your mind with overwhelming intensity.  The visions cause your jaw to fly open without any trace of your own volition, and suddenly the [imp cock desc] is forcing its way to the back of your throat.  <<Cor <40>>Your gag reflexes are trying desperately to kick in, serving only to massage the [imp cock desc] as the creature makes guttural noises and pushes its self even deeper. <<else if Cor <70>> Though it takes you a moment to get adjusted to the intrusion, soon you are able to relax your throat like an expert cock-swallower, taking it even deeper. <<else>>You moan around the creature's [imp cock desc], opening your throat as your eyes plead with it to fuck your mouth-hole even deeper.<</Cor>>

 The creature's pre-cum tastes more like brimstone than salt, and yet something about it inflames you as it pools in your mouth and pours down your throat.  <<Cor <30>>It is disgusting to let this substance inside your body, but the images keep you from resisting. <<else Cor <60>>The corrupt fluids seem unusual, but something about the lewd act makes them more than worthwhile and you take some delight in knowing they are filling your body. <<else>><<If Pussy>>Your [pussies desc] start drooling juices, <</Pussy>><<If cock and pussy>>and your<<else If Cock>>Your cock grows rock hard<</If>>as you feel the corrupt fluids flowing throughout your body.<</Cor>> Without even having to think about it you reach out and <<Str <80>>stroke its [imp cock desc], trying to milk more of it into you <<else>>pick up the imp with one hand, your other hand stroking its [imp cock desc] and trying to milk more of it into you<</Str>><<Cor 80+, Str <80>> as you shove a finger into its [imp anus desc]<<else Cor 80+, Str 80+>> then shoving a finger into its [imp anus desc] and using the new form of grip to move the creature into and out of your mouth-hole<</Cor>>.<<Goto I3 then return>>  In only a few minutes the creature begins to lose its ability to resist your <<Cor <30>>tight<<else Cor <60>> skilled <<else>> eager <</Cor>> throat and begins to pour massive amounts of corrupt cum into your stomach. <<Cor 60-79>>As much as you love having your stomach filled with sperm, you quickly pull the imp back so that some of it might land on your tongue for you to savor.  The excessive cum is soon dripping down your lips, no matter how fast you try to swallow.<<else Cor 80+>>As much as you love having your stomach filled with sperm, a perverse thought fills you and you pull the creature out, <<Str 80+>>holding the creature over your head as <</Str>>you guide its [imp cock desc] to liberally coat your face <<Breasts>>and [breasts desc]<</Breasts>>.<</Cor>>You lick your lips clean of the creamy mess as you put down the now unconscious Imp and give it a look-over for valuables.  <<Cor 80+>>As you trot back the way you have come you idly trace a finger through the dangling sperm, hoping someone might see what a [slur] you have become becomes too uncomfortable to wear.  Though if you have to clean it off, you can always get more.. perhaps from an even more copious source.<<end>>

 {{Any player: Anal Receive}}
 As you watch the imp stroking its [imp cock desc] you find it difficult to resist the urge to feel that massive member sliding into your body.  Slowly you trot closer, turning around to display your rear to the creature.  <<Pussy, Cor <30>>Your [largest pussy desc] is already drooling in anticipation of the cum it is about to receive, though to your surprise you feel the imp's [imp cock desc] bumping slightly above it.  You try to turn and stop it, but the creature pushes deep past your anal muscles before you have a chance.<<else>><<Pussy, Cor <50>>>>Your [largest pussy desc] is already drooling in anticipation of the cum it is about to receive, though to your surprise you feel the imp's [imp cock desc] bumping slightly above it. You brace yourself in anticipation and slight trepidation, delighting in the perversion you are about to take part in. <<else Pussy, Cor 50+>>Though your [largest pussy desc] is dripping at the chance at being bred, you feel like you would like somehing a lot more raw.  Breathlessly you beg it to fuck your [anus desc], debasing yourself and lowering yourself to the ground so you can be as accessile as possible. You moan like a [slur] in anticipation of feeling a cock shoved deep into your [anus desc] <<Breasts>>gripping your nipples hard<<else>>raking your body with your nails<</Breasts>>as you try to keep from biting through your lips.  <</Pussy,/Cor>><<no Pussy>><<Cock>>Your [cocks desc] harden in anticipation<<else>>You rake your nails over your sides in anticipation<</Cock>> as you feel the creature prepare to mount you, its [imp cock desc] pressing up against your [anus desc].  <</no pussy>>
 <<Cor 30+, Cor <50>> As the imp slowly pushes into your [anus desc] you moan in animalistic pleasure.<<else>>When you begin to feel your [anus desc] being distended you cry out and beg it to shove it harder, faster, to take your asshole as roughly as it can!<</Cor>><<anus smaller than dick>>The sheer size of the [imp cock desc] tears your anus open, sending streams of pain into you as you cry out in agony.[if anus smaller than dick, increase size]<</anus>>
 [if anal virgin, lose anal virginity]

 The Imp grunts as it ruts your [anus desc], and you can feel it bumping deeply against your bowels.  After a few minutes the initial pain is gone and you find yourself making bestial sounds along-side the overly-endowed creature.  You long to feel its cum filling you to overflowing, and break into a slight trot that causes the small imp to bounce around inside of your tightening asshole.  The combination of movement, grip, and its own furious thrusting seems to push it over the edge and you can feel jets of sperm shooting deeply into you, sending you into your own anal orgasm.  Used to the limit, the imp slides out of you and drops to the ground, barely conscious. <<Cor 80+>>Grinning at the perversity, you lower yourself down and take its dirty [imp cock desc] into your mouth, cleaning it thoroughly as you enjoy the mixture of your juices.  Your intense sucking and stroking causes a few last spurts of cum to fly out, and you pull the imp out lock enough to shoot the gouy mess over your face and hair while you swallow what was already in your mouth.<<end>>

 {{Player has breast-pussies and is E+ sized breasts}}
 As the imp falls to the ground, furiously masturbating its [imp cock desc] you smile in delight, your [nip-pussy desc] already beginning to grow wet <<lots of milk>>with the massive flow of milk pouring out of them<</milk>>.  You approach the little Imp at an eager trot, lowering yourself down and encasing its [imp cock desc] in your [breasts desc].  Its eyes fly open and stare in wicked delight at what it sees, quickly reaching out and beginning to fondle and finger your [nip-pussy desc].  Unable to resist any more, you press the opening of one of your [breasts desc] against the tip of the [imp cock desc].  If the creature is confused it does not show it, shoving its self hard quickly and hard into your tit.  [if virgin-nip, lose virginity]<<nip-size smaller than dick size>>Pain shoots through you as you feel the [nip-pussy desc] being forced to widen by the imp's massive tool, and you let out a slight scream [increase nip-pussy size]<</smaller>>  Without missing a beat the creature wraps its hands around your [breast desc] and begins thrusting liberally into it as if your tit was nothing more than a giant and perverted fuck-toy.  Seeing no point in arguing with the perception, you reach over and start shoving your own finger into your other [nip-pussy desc], crying out as you urge the imp to use your [breast desc].  Part of you longs to feel the imp's thick and corrupted cream filling your tit-hole, <<Cor <80>> and you begin moving your breast in circles around the thrusting member. <<else>>and you lower your breast against a rock, letting the imp squish your breast under its weight, grinding it into the rough stone as it continues to fuck it<</Cor>>.  The Imp seems to really enjoy this and after a few more minutes of intense pleasure it begins pouring its cum inside of your chest.  Without anywhere to go the cum pours back out, mixed with torrents of milk that are being stimulated out of you.  Exhausted the imp falls to the ground <<Cor <30>>leaving you frustrated. [no lust reduction] <<Cor <50>>before it can see you bringing your nipples to your mouth and sucking on the spermy mixture until you bring yourself to orgasm. <<Cor 80+>>before it can see you bringing your nipples to your mouth.  You suck hard to get to as much of its sperm as you can, shoving your tongue deep into yourself and digging around wih your fingers.  When this is not enough to bring you to orgasm you slap and bite your [nip-pussy desc], crying out as the intensity and perversion finally proves enough to push you over the edge.<</Cor>><<end>>
 */
// Initial Win Scenes
/* You can always kill the imp and take the skull no matter how you win.

To rape the imp, you need at least one of these factors:

Have the Feeder status effect
Be female, have large breasts, and wear the Lusty Maiden Armor
Have a bee ovipositor
Have a lust score equal or greater to 33

Possible results:
If you have a cock and your lust is => 33: male rape.
If you have a cock, your lust is => 33, and you're a taur: male taur rape.
If you have a vagina and your lust is => 33: female rape.
If you have a vagina, your lust is => 33, and you're a taur: group imp female rape.
If your lust is => 33 and you have fuckable nipples: nipple rape
If you have the feeder status: force imp to drain your breasts
If you have a bee ovipositor: implant eggs into imp
If you are wearing the lusty maiden armor and your breasts are big enough: paizuri. (not implemented yet)

Additional possible results are in the commented code above.

 */
class ImpScene {
    static victoryAgainstImp() {
        GUI.clearOutput();
        //Screen messages
        var canFeed = liveData.player.findStatusEffect(StatusEffects.Feeder) >= 0;
        var canBikiniTits = liveData.player.hasVagina() && liveData.player.biggestTitSize() >= 4 && liveData.player.armor == Items.Armor.LustyMaidenArmor;
        GUI.outputText("You smile in satisfaction as " + liveData.monster.a + liveData.monster.refName + " collapses and begins masturbating feverishly.");
        GUI.menu();
        if (canFeed) {
            if (liveData.player.lust >= 33)
                GUI.outputText("  Sadly you realize your own needs have not been met.  Of course you could always rape the poor thing, but it might be more fun to force it to guzzle your breast-milk.<br><br>What do you do?");
            else
                GUI.outputText("  You're not really turned on enough to rape it, but it might be fun to force it to guzzle your breast-milk.<br><br>Do you breastfeed it?");
        }
        else if (liveData.player.lust >= 33 || canBikiniTits || liveData.player.canOvipositBee()) {
            GUI.outputText("  Sadly you realize your own needs have not been met.  Of course you could always rape the poor thing...<br><br>Do you rape him?");
        }
        else {
            GUI.outputText("You smile in satisfaction as " + liveData.monster.a + liveData.monster.name + " collapses and begins masturbating feverishly.");
            if (liveData.monster.HP <= 0) {
                GUI.addButton(0, "Kill Him", ImpScene.killImp);
                GUI.addButton(4, "Leave", COMBAT.cleanupAfterCombat);
            }
            else
                COMBAT.cleanupAfterCombat();
            return;
        }
        // Generate buttons + additional text.
        if (liveData.player.lust >= 33) {
            if (liveData.player.hasCock()) {
                if (liveData.player.cockThatFits(liveData.monster.analCapacity()) == -1)
                    GUI.outputText("<br><br><b>You're too big to rape an imp with " + liveData.player.oMultiCockDesc() + ".</b>");
                else {
                    GUI.addButton(0, liveData.player.isTaur() ? "Centaur Rape" : "Male Rape", liveData.player.isTaur() ? ImpScene.centaurOnImpStart : ImpScene.rapeImpWithDick);
                    if (liveData.player.hasItem(Items.Consumables.Condom) && !liveData.player.isTaur())
                        GUI.addButton(5, "Use Condom", ImpScene.rapeImpWithDick, true);
                }
            }
            if (liveData.player.hasVagina()) {
                if (liveData.player.isTaur())
                    GUI.addButton(1, "Group Vaginal", ImpScene.centaurGirlOnImps);
                else
                    GUI.addButton(1, "Female Rape", ImpScene.rapeImpWithPussy);
            }
            if (liveData.player.hasFuckableNipples()) {
                GUI.addButton(2, "NippleFuck", ImpScene.impNippleRape);
            }
        }
        else {
            COMBAT.cleanupAfterCombat();
            return;
        }
        if (canFeed)
            GUI.addButton(3, "Breastfeed", ImpScene.areImpsLactoseIntolerant);
        //lustyMaidenPaizuri requires Lusty Maiden Armor to be finished. Finish this later
        //if (canBikiniTits) GUI.addButton(4, "B.Titfuck", (player.armor as LustyMaidensArmor).lustyMaidenPaizuri);
        if (liveData.player.canOvipositBee())
            GUI.addButton(8, "Oviposit", ImpScene.putBeeEggsInAnImp);
        GUI.addButton(10, "Kill Him", ImpScene.killImp);
        GUI.addButton(14, "Leave", COMBAT.cleanupAfterCombat);
    }
    // MALE RAPE
    static rapeImpWithDick(condomed = false) {
        GUI.clearOutput();
        var x = liveData.player.cockThatFits(liveData.monster.analCapacity());
        if (x < 0)
            x = 0;
        if (condomed) {
            liveData.player.destroyItems(Items.Consumables.Condom, 1);
            GUI.outputText("You first unwrap the condom wrapper and slide the latex all evenly all over your " + liveData.player.cockDescript(x) + " until it's fully covered.");
        }
        //Single cock
        //GUI.outputText(images.showImage("imp-win-male-fuck"), false);
        if (liveData.player.cocks.length == 1) {
            GUI.outputText("With a demonic smile you grab the insensible imp and lift him from the ground by his neck. The reduced airflow doesn't seem to slow his feverish masturbation at all, and only serves to make him harder.");
            //if (player.lowerBody != LOWER_BODY_TYPE_CENTAUR) {
            GUI.outputText(" You casually unclasp your " + liveData.player.armorName + " and reveal your " + liveData.player.cockDescript(x) + ", ");
            if (liveData.player.breastRows.length > 0 && liveData.player.breastRows[0].breastRating > 2)
                GUI.outputText("smashing him against your " + liveData.player.breastDescript(0) + " while you jerk hard on your " + liveData.player.cockDescript(x) + ", bringing it to a full, throbbing erection.");
            else
                GUI.outputText("stroking it to full hardness languidly.");
            //}
            GUI.outputText("<br><br>With no foreplay, you press your " +
                liveData.player.cockDescript(x) +
                " against his tight little pucker and ram it in to the hilt. The imp's eyes bulge in surprise even as a thick stream of pre leaks from his " +
                liveData.monster.cockDescriptShort(0) +
                ". You grab him by his distended waist and brutally rape the little demon, whose claws stay busy adding to his pleasure.");
            if (liveData.player.cocks[0].cockType == ENUM.CockType.CAT)
                GUI.outputText(" The tiny creature's claws dig into your sides at the feeling of soft, hooked barbs stroking his sensitive insides.");
            if (liveData.player.cocks[0].cockLength >= 7 && liveData.player.cocks[0].cockLength <= 12)
                GUI.outputText(" Each thrust obviously distorts the imp's abdomen. It amazes you that it doesn't seem to be hurting him.");
            if (liveData.player.cocks[0].cockLength > 12)
                GUI.outputText(" Each plunge into the imp's tight asshole seems to distort its entire body, bulging obscenely from its belly and chest. Amazingly he doesn't seem to mind, his efforts focused solely on his sorely throbbing demon-dick.");
            GUI.outputText("<br><br>The tight confines of the imp's ass prove too much for you, and you feel your orgasm build.");
            if (liveData.player.balls == 0 && liveData.player.vaginas.length > 0)
                GUI.outputText(" The cum seems to boil out from inside you as your " +
                    liveData.player.vaginaDescript(0) +
                    " soaks itself. With delicious slowness you fire rope after rope of cum " +
                    (condomed ? "inside your condom." : "deep into the imp's rectum.") +
                    "");
            if (liveData.player.balls == 0 && liveData.player.vaginas.length == 0)
                GUI.outputText(" The cum seems to boil out from inside you, flowing up your " +
                    liveData.player.cockDescript(x) +
                    ". With delicious slowness, you fire rope after rope of cum " +
                    (condomed ? "inside your condom." : "deep into the imp's rectum.") +
                    "");
            if (liveData.player.cumQ() >= 14 && liveData.player.cumQ() <= 30)
                GUI.outputText(" Your orgasm drags on and on, until your slick jism is dripping out around your " + liveData.player.cockDescript(x) + ".");
            if (liveData.player.cumQ() > 30 && liveData.player.cumQ() <= 100)
                GUI.outputText(" Your orgasm seems to last forever, jizz dripping out of " + (condomed ? "your condom" : "the imp's asshole") + " around your " + liveData.player.cockDescript(x) + " as you plunder him relentlessly.");
            if (liveData.player.cumQ() > 100)
                GUI.outputText(" Your orgasm only seems to grow more and more intense as it goes on, each spurt more powerful and copious than the last. " +
                    (condomed
                        ? "Your condom swells nearly to the point of bursting, and tiny jets of cum squirt out around your " + liveData.player.cockDescript(x) + " with each thrust."
                        : "The imp begins to look slightly pregnant as you fill him, and tiny jets of cum squirt out around your " + liveData.player.cockDescript(x) + " with each thrust.") +
                    "");
            GUI.outputText("<br><br>Satisfied at last, you pull him off just as he reaches his own orgasm, splattering his hot demon-cum all over the ground.  You drop the imp hard and he passes out, dripping " +
                (condomed ? "semen" : "mixed fluids") +
                " that seem to be absorbed by the dry earth as fast as they leak out.");
        }
        //Multicock
        if (liveData.player.cocks.length >= 2) {
            GUI.outputText("With a demonic smile you grab the insensible imp and lift him from the ground by his neck. The reduced airflow doesn't seem to slow his feverish masturbation at all, and only serves to make him harder.");
            //if (player.lowerBody != LOWER_BODY_TYPE_CENTAUR) {
            GUI.outputText(" You casually unclasp your " + liveData.player.armorName + " and reveal your " + liveData.player.multiCockDescriptLight() + ", ");
            if (liveData.player.breastRows.length > 0 && liveData.player.breastRows[0].breastRating > 2)
                GUI.outputText("smashing him against your " + liveData.player.breastDescript(0) + " while you jerk hard on one of your " + liveData.player.cockDescript(x) + "s, bringing it to a full, throbbing erection.");
            else
                GUI.outputText("stroking one of your members to full hardness languidly.");
            //}
            GUI.outputText("<br><br>With no foreplay, you press a " +
                liveData.player.cockDescript(x) +
                " against his tight little pucker and ram it in to the hilt. The imp's eyes bulge in surprise even as a thick stream of pre leaks from his " +
                liveData.monster.cockDescriptShort(0) +
                ". You grab him by his distended waist and brutally rape the little demon, whose claws stay busy adding to his pleasure.");
            if (liveData.player.cocks[0].cockLength >= 7 && liveData.player.cocks[0].cockLength <= 12)
                GUI.outputText(" Each thrust obviously distorts the imp's abdomen. It amazes you that it doesn't seem to be hurting him.");
            if (liveData.player.cocks[0].cockLength > 12 && liveData.player.cocks[0].cockLength <= 18)
                GUI.outputText(" Each plunge into the imp's tight asshole seems to distort its entire body, bulging obscenely from its belly and chest. Amazingly he doesn't seem to mind, his efforts focused solely on his sorely throbbing demon-dick.");
            GUI.outputText("<br><br>The tight confines of the imp's ass prove too much for you, and you feel your orgasm build.");
            if (liveData.player.balls > 0)
                GUI.outputText("The cum seems to boil in your balls, sending heat spreading through your " +
                    liveData.player.cockDescript(x) +
                    " as your muscles clench reflexively, propelling hot spurts of jism deep into the imp's rectum. Your other equipment pulses and dripples steady streams of its own cum.");
            if (liveData.player.balls == 0 && liveData.player.vaginas.length > 0)
                GUI.outputText("The cum seems to boil out from inside you as your " +
                    liveData.player.vaginaDescript(0) +
                    " soaks itself. With delicious slowness you fire rope after rope of cum " +
                    (condomed ? "inside your condom." : "deep into the imp's rectum.") +
                    " Your other equipment drizzles small streams of jizz in sympathy.");
            if (liveData.player.balls == 0 && liveData.player.vaginas.length == 0)
                GUI.outputText("The cum seems to boil out from inside you, flowing up your " +
                    liveData.player.cockDescript(x) +
                    ". With delicious slowness, you fire rope after rope of cum " +
                    (condomed ? "inside your condom." : "deep into the imp's rectum.") +
                    " Your other equipment drizzles small streams of jizz in sympathy.");
            if (liveData.player.cumQ() >= 14 && liveData.player.cumQ() <= 30)
                GUI.outputText(" Your orgasm drags on and on, until your slick jism is dripping out around your " + liveData.player.cockDescript(x) + ".");
            if (liveData.player.cumQ() > 30 && liveData.player.cumQ() <= 100)
                GUI.outputText(" Your orgasm seems to last forever, jizz dripping out of " + (condomed ? "your condom" : "the imp's asshole") + " around your " + liveData.player.cockDescript(x) + " as you plunder him relentlessly.");
            if (liveData.player.cumQ() > 100)
                GUI.outputText(" Your orgasm only seems to grow more and more intense as it goes on, each spurt more powerful and copious than the last. T" +
                    (condomed
                        ? "Your condom swells nearly to the point of bursting, and tiny jets of cum squirt out around your " + liveData.player.cockDescript(x) + " with each thrust."
                        : "The imp begins to look slightly pregnant as you fill him, and tiny jets of cum squirt out around your " + liveData.player.cockDescript(x) + " with each thrust.") +
                    "");
            GUI.outputText("<br><br>Satisfied at last, you pull him off just as he reaches his own orgasm, splattering his hot demon-cum all over the ground.  You drop the imp hard and he passes out, dripping mixed fluids that seem to be absorbed by the dry earth as fast as they leak out.");
        }
        liveData.player.orgasm();
        if (!condomed)
            liveData.player.modStats(["cor", 1]);
        COMBAT.cleanupAfterCombat();
    }
    // FEMALE RAPE
    static rapeImpWithPussy() {
        GUI.clearOutput();
        //GUI.outputText(images.showImage("imp-win-female-fuck"));
        liveData.player.slimeFeed();
        GUI.outputText("You " +
            liveData.player.clothedOrNakedLower("shed your " + liveData.player.armor.equipmentName + " without a thought and ") +
            "approach the masturbating imp, looming over him menacingly.  Your " +
            liveData.player.vaginaDescript(0) +
            " moistens in anticipation as you gaze down upon his splendid rod. With no hesitation, you lower yourself until your lips are spread wide by his demon-head, the hot pre-cum tingling deliciously.");
        //Too small!
        if (liveData.player.vaginalCapacity() < liveData.monster.cockArea(0)) {
            GUI.outputText("  You frown as you push against him, but his demonic tool is too large for your " +
                liveData.player.vaginaDescript(0) +
                ".  With a sigh, you shift position and begin grinding your " +
                liveData.player.vaginaDescript(0) +
                " against his " +
                liveData.monster.cockDescriptShort(0) +
                ", coating it with fluids of your gender.  Your clit tingles wonderfully as it bumps against every vein on his thick appendage.");
            if (liveData.player.breastRows.length > 0 && liveData.player.breastRows[0].breastRating > 1) {
                GUI.outputText("  You happily tug and pinch on your erect nipples, adding to your pleasure and nearly driving yourself to orgasm.");
            }
            GUI.outputText("<br><br>You lose track of time as you languidly pump against the imp's " +
                liveData.monster.cockDescriptShort(0) +
                ".  At long last you feel your " +
                liveData.player.vaginaDescript(0) +
                " ripple and quiver.  Your " +
                liveData.player.legs() +
                " give out as you lose your muscle control and collapse against the small demon.  You gasp as his " +
                liveData.monster.cockDescriptShort(0) +
                " erupts against you, splattering your chest with hot demonic cum that rapidly soaks into your skin.  You giggle as you rise up from the exhausted imp, feeling totally satisfied.");
        }
        //Big enough!
        else {
            GUI.outputText("  You sink down his " + liveData.monster.cockDescriptShort(0) + " slowly, delighting in the gradual penetration and the tingling feeling of his dripping hot pre-cum.  At last you bottom out on his balls.");
            liveData.player.cuntChange(liveData.monster.cockArea(0), true);
            GUI.outputText("  Your lust and desire spurs you into movement, driving you to bounce yourself up and down on the " +
                liveData.monster.cockDescriptShort(0) +
                ".  His exquisite member pushes you to the very height of pleasure, your " +
                liveData.player.vaginaDescript(0) +
                " clenching tightly of its own accord each time you bottom out.  The tensing of the little demon's hips is the only warning you get before he cums inside you, hot demonic jizz pouring into your womb.  Your " +
                liveData.player.legs() +
                " give out, pushing him deeper as he finishes filling you.");
            GUI.outputText("<br><br>The two of you lay there a moment while you recover, at last separating as you rise up off his " + liveData.monster.cockDescriptShort(0) + ".  Spunk drips down your legs, quickly wicking into your skin and disappearing.");
            //Taking it internal is more corruptive!
            liveData.player.modStats(["cor", 1]);
            //Preggers chance!
            // liveData.player.knockUp(FLAG.PREGNANCY_IMP, FLAG.INCUBATION_IMP)
            liveData.player.cuntChange(liveData.monster.cockArea(0), true, true, false);
        }
        liveData.player.orgasm();
        liveData.player.modStats(["cor", 1]);
        COMBAT.cleanupAfterCombat();
    }
    // TAUR RAPE START
    static centaurOnImpStart() {
        GUI.clearOutput();
        //Event: Centaur-Imp: Player Raping
        GUI.outputText("As the imp collapses in front of you, ");
        if (liveData.monster.HP == 0)
            GUI.outputText("panting in exhaustion");
        else
            GUI.outputText("masturbating furiously");
        GUI.outputText(", you advance toward the poor creature.  The demon's eyes run over your powerful equine muscles as you tower above it.  It is difficult to hide your smile as you look at the tiny creature's engorged cock and the perpetual lust filling its beady eyes.");
        //OPTIONAL THOUGHTS
        //[if previously gave birth to imps and Cor >50] A part of you wonders idly if this is one the offspring that you added to this world
        //[corruption is under 80] but the you quickly banish the thought. [corruption is over 80]  and the thought fills you with excitement. ))
        //<< Cor <50 >>
        if (liveData.player.cor < 50)
            GUI.outputText("  You lick your lips slightly as you begin to approach the small figure.");
        else
            GUI.outputText("You lick your lips obscenely as you approach the small figure.<br><br>");
        //[Even chance of any of the following happening if the player has the correct equipment, distribute chances between what equipment is available]
        var x = liveData.player.cockThatFits(liveData.monster.analCapacity());
        if (x >= 0 && !liveData.player.hasVagina())
            ImpScene.centaurOnImpMale();
        else if (liveData.player.hasVagina() && x < 0)
            ImpScene.centaurOnImpFemale();
        else {
            GUI.outputText("Do you focus on your maleness or girl-parts?");
            GUI.menu();
            GUI.addButton(0, "Male", ImpScene.centaurOnImpMale, null, null, null, "TO BE ADDED.");
            GUI.addButton(1, "Female", ImpScene.centaurOnImpFemale, null, null, null, "TO BE ADDED.");
        }
    }
    // MALE RAPE AS TAUR
    static centaurOnImpMale(vape = false) {
        var x = liveData.player.cockThatFits(liveData.monster.analCapacity());
        if (x < 0)
            x = 0;
        if (vape)
            GUI.clearOutput();
        // Strange cocks first.
        //{{Player has multicock and they're very long}}
        if (liveData.player.cockTotal() > 1 && liveData.player.cocks[liveData.player.biggestCockIndex()].cockLength >= 24) {
            GUI.outputText("As your shadow falls over it, it looks with a hint of fear between your legs, and then its eyes widen in a mixture of apprehension and lust.  Before you can even more the little creatures scrambles forward between your hooves and wraps its hands around your " +
                liveData.player.cockDescript(liveData.player.biggestCockIndex()) +
                ".  Its tongue begins to trail all along the length of it as its small hands stroke it intensely.<br><br>");
            //<< Cor <50>>
            if (liveData.player.cor < 50) {
                GUI.outputText("You slowly undulate your " + liveData.player.cockDescript(liveData.player.biggestCockIndex()) + " against the creature's mouth, delighting in its eager tongue.  ");
                //<<GoTo I3 then return>>
                ImpScene.centaurOnImpResults(3);
                GUI.outputText("The sounds beneath you quickly take on a more intense note and you feel massive amounts of cum splashing liberally over your hooves, belly, and " +
                    liveData.player.cockDescript(liveData.player.biggestCockIndex()) +
                    ".  The hot sensation sends you over the edge as you begin spilling yourself into the creature's eager mouth.<br><br>");
                //<<GoTo I2>>
                ImpScene.centaurOnImpResults(2);
                //<<End>>
                liveData.player.orgasm();
                COMBAT.cleanupAfterCombat();
                return;
            }
            //Really big cock, high corruption
            else {
                GUI.outputText("With an evil smile you wait for the creature's mouth to touch one of your tentacles before the other two snake their way down and wrap themselves around the imp's thighs.  With a tug the creatures is pulled off of it's feet and upside down, its eyes widening in a mixture of fear and debased lust as it sees your " +
                    liveData.player.cockDescript(liveData.player.biggestCockIndex()) +
                    " undulating in front of it.  You slowly move the tentacle up as your other cocks forcefully tug its legs apart, and then playfully begin sliding yourself over the imp's small cheeks.<br><br>");
                //<<Cor 80+, has given birth to an imp>>Part of you wonders idly if this is one of the creatures that you spawned, and that left its spermy surprise on you after it came out of the womb<</Cor>>
                GUI.outputText("Licking your lips in anticipation you begin pushing your " +
                    liveData.player.cockDescript(liveData.player.biggestCockIndex()) +
                    " into the imp's " +
                    liveData.monster.assholeDescript() +
                    " while listening to the mewling sounds coming from beneath you.  You take your time as you push in, seeing no need to rush yourself as you feel the creature gaping more and more.  Once you bottom out you reach down and grab the creature's arms, securing it firmly against your belly as you break into a trot.  The sensation of the imp's " +
                    liveData.monster.assholeDescript() +
                    " bouncing around your " +
                    liveData.player.cockDescript(liveData.player.biggestCockIndex()) +
                    " is intense and you ride harder until you know you are close to the bring.  Quickly you slow down and drape the creature over a nearby boulder, using your hands and tentacles to pin it to the harsh surface, and then your mighty legs push you forward even deeper into the creature's bowels.  The shriek should be audible pretty far in this area, and you groan in debased pleasure thinking it might draw someone else for you to rape or be raped by.  Grunting slightly you begin pushing into the imp even harder just to generate more loud sex-noise.  ");
                //<<Breasts>>
                if (liveData.player.biggestTitSize() >= 0) {
                    GUI.outputText("One of your hands releases it and begins playing with your " + liveData.player.allBreastsDescript());
                    //<<nips have pussies>>
                    if (liveData.player.hasFuckableNipples())
                        GUI.outputText(" and fingering your " + liveData.player.nippleDescript(0) + "s");
                    GUI.outputText(" as you drool slightly in absolute pleasure.  ");
                }
                GUI.outputText("When the creature's noises lessen and all you can hear is the sloppy sounds of its ass being fucked you push yourself in a single mighty heave, grinding the creature into the rock and eliciting one last scream that pushes you over.<br><br>");
                //<<GoTo I1>>
                ImpScene.centaurOnImpResults(1);
                //<<End>>
                liveData.player.orgasm();
                COMBAT.cleanupAfterCombat();
                return;
            }
        }
        // Player has multicock, but not huge ones
        else if (liveData.player.cockTotal() == 2) {
            GUI.outputText("With an evil smile you wait for your " +
                liveData.player.cockDescript(liveData.player.smallestCockIndex()) +
                " to be at its lips before you slide it forward into its waiting mouth.  Giving it little more than a moment to catch its breath you slide your " +
                liveData.player.cockDescript(liveData.player.smallestCockIndex()) +
                " further and down the creature's throat.  Though you cannot see the obscene bulge it is making in the creature's mouth-pussy you delight in the intense tightness beneath you.  The throat muscles are massaging your " +
                liveData.player.cockDescript(liveData.player.smallestCockIndex()) +
                " as the imp desperately scrambles for air, pulling at the tentacles you have forced into it.  It cannot even begin to close its jaw as you thrust deeper and deeper, as you try to intensify the sensations.<br><br>");
            GUI.outputText("As the imp is focused on the tentacles cutting off its air, you position your " +
                liveData.player.cockDescript(liveData.player.biggestCockIndex()) +
                " against its " +
                liveData.monster.assholeDescript() +
                ".  Pausing only for a second for the pleasure of anticipation, you shove yourself deep inside the imp's " +
                liveData.monster.assholeDescript() +
                ", only making it a few inches before having to pull back and try again.  The creature's throat seems to be working overtime now as it tries to divide its attention between the two invaders.  Each thrust of your " +
                liveData.player.cockDescript(liveData.player.smallestCockIndex()) +
                " makes it a little bit deeper inside of the creature, and you wonder passionately if you can get the two to meet in the middle.<br><br>");
            GUI.outputText("It is not long before you begin to feel the creature's struggles slowing down.  ");
            //<<Cor <80 >>
            if (liveData.player.cor < 80) {
                GUI.outputText("Feeling merciful you extract yourself from the creature, flipping it unto a nearby rock as it begins to regain consciousness.  Before it realizes what you are doing your " +
                    liveData.player.cockDescript(liveData.player.biggestCockIndex()) +
                    " is prodding at its " +
                    liveData.monster.assholeDescript() +
                    ", then sliding quickly between its cheeks.  The amount of slobber over you is more than enough lubricant.  You groan in pleasure as it gives a slight squeal, then proceed to finish yourself off in the once-tight orifice.<br><br>");
                //<<Goto I1>>
                ImpScene.centaurOnImpResults(1);
                liveData.player.orgasm();
                COMBAT.cleanupAfterCombat();
                return;
            }
            //<<Cor 80+>>
            else {
                GUI.outputText("You groan in pleasure and slide your " + liveData.player.cockDescript(liveData.player.biggestCockIndex()) + " even deeper down the creature's throat, until you can feel its head against your ");
                //<<if balls>>
                if (liveData.player.balls > 0)
                    GUI.outputText(liveData.player.ballsDescriptLight() + ".<br><br>");
                else
                    GUI.outputText("groin.<br><br>");
                //<<GoTo I3 then return>>
                ImpScene.centaurOnImpResults(3);
                GUI.outputText("A guttural moan escapes your mouth as you realize the creature has completely passed out underneath you.  ");
                if (liveData.player.hasFuckableNipples())
                    GUI.outputText("Shoving your fingers deep into your " + liveData.player.nippleDescript(0) + "s");
                else
                    GUI.outputText("With a fierce tug on your " + liveData.player.nippleDescript(0) + "s");
                GUI.outputText("you begin to cum deep and directly into the imp's stomach and " + liveData.monster.assholeDescript() + ".  ");
                //<<cum multiplier: lots>>
                if (liveData.player.cumQ() > 250)
                    GUI.outputText("Beneath you the creature's belly is distending more and more, and you can feel some of the overflowing cum filling back out until it is pouring out of the creature's unconscious mouth and overstretched ass, forming a spermy pool beneath it.");
                GUI.outputText("With on last grunt you begin extracting the tentacles back out, almost cumming again from the tightness around them.  You give your " +
                    liveData.player.cockDescript(liveData.player.smallestCockIndex()) +
                    " one last shake over the creature's face before trotting away satisfied and already thinking about the next creature you might abuse.");
                liveData.player.orgasm();
                COMBAT.cleanupAfterCombat();
                return;
            }
        }
        // Normal cock
        else {
            GUI.outputText("As your shadow falls over the imp, it looks between your " + liveData.player.legs() + " with a hint of fear.  ");
            if (liveData.player.cockArea(x) <= 15) {
                GUI.outputText("Relief washes over it followed by intense lust as is throws itself onto a mossy rock and eagerly presents its " +
                    liveData.monster.assholeDescript() +
                    ".   The sound of your hooves moving on either side of its body seems to send the creature into a frenzy as it begins humping the air while small mewling sounds escape its lips.  ");
                //<<Cor <50>>
                if (liveData.player.cor < 50)
                    GUI.outputText("You slowly rub your " +
                        liveData.player.cockDescript(x) +
                        " between the creature's cheeks, letting your pre-cum oil the small hole, before slowly beginning the insertion.  Before you can get half-way the creatures drives its self back against you, impaling its " +
                        liveData.monster.assholeDescript() +
                        " around your " +
                        liveData.player.cockDescript(x) +
                        " and making inhuman sounds of ecstasy. The " +
                        liveData.monster.assholeDescript() +
                        " relaxes around your " +
                        liveData.player.cockDescript(x) +
                        ", taking it all in while its practiced muscles grip and jerk you off internally.<br><br>");
                //<<Cor 50+>>
                else
                    GUI.outputText("You position your " +
                        liveData.player.cockDescript(x) +
                        " against its dry anus and drive yourself inside of it using your powerful equine legs.  The creatures gives a loud shriek as its insides are forced open, and you feel the raw tightness trying to resist your intrusion.  Giving the creature no chance to relax you begin pistoning into it, grinning as the sounds of pain give way to grunts and yelps of pleasure. You cannot last long in the creature's hole, and soon spurts of cum begin shooting out and filling its bowels.<br><br>");
                //<<GoTo I1>>
                ImpScene.centaurOnImpResults(1);
                //<<End>>
                liveData.player.orgasm();
                COMBAT.cleanupAfterCombat();
                return;
            }
            else if (liveData.player.cor < 50) {
                //<<Cock: large, Cor <50>>
                GUI.outputText("The imp's eyes widen and you see its apprehension as it attempts to turn and flee.  You make soothing sounds as you approach the skittish creature, while easily keeping pace with it.  Seeing little chance for escape, the creature turns toward you again and carefully begins making its way between your " +
                    liveData.player.legs() +
                    ", eyes wide in supplication.  Your smile seems to relax it, and lust fills its eyes again as it slowly starts massaging your " +
                    liveData.player.cockDescript(x) +
                    ".  Getting more and more confident, the creature is soon using both of its hands on your " +
                    liveData.player.cockDescript(x) +
                    ", and its wet and serpentine tongue is moving all over the length of your erection.  There is little chance of your " +
                    liveData.player.cockDescript(x) +
                    " fitting into its small mouth, but it does its best to pleasure you as it goes more and more wild.  ");
                //<<Thick large>>
                if (liveData.player.cocks[0].cockThickness > 3) {
                    GUI.outputText("It is not long before you feel its tongue slipping into your urethra, and cum rushes from your ");
                    if (liveData.player.balls > 0)
                        GUI.outputText(liveData.player.ballsDescriptLight());
                    else
                        GUI.outputText("prostate");
                    GUI.outputText(" as you feel the foreign invader wiggling inside.  ");
                    //<</Thick>>
                }
                GUI.outputText("You cannot take the attention for long before your hooves are scraping at the ground and jets of sperm shoot out of your " + liveData.player.cockDescript(x) + " and down its waiting throat.<br><br>");
                //<<GoTo I2>>
                ImpScene.centaurOnImpResults(2);
                //<<End>>
                liveData.player.orgasm();
                COMBAT.cleanupAfterCombat();
                return;
            }
            //<<Cock: large, Cor 50+>>
            else {
                GUI.outputText("The imp's eyes widen and you see apprehension as it tries to turn around and get away.  It does not make it far before you run it down, knocking it over with your muscled flank.  Before it can try to run again you pin it down and position your " +
                    liveData.player.cockDescript(x) +
                    " against its " +
                    liveData.monster.assholeDescript() +
                    ".  It feels far too small to handle your girth but a push of your powerful legs gets you in with the first inches.  The imp squeals out in pain and you wince slightly in the vice-like grip.  Gritting your teeth you push in the remaining length, the sounds of pain only serving to drive you forward all the harder.  Soon your " +
                    liveData.player.cockDescript(x) +
                    " is moving in and out with more ease, though the imp's tender asshole is distending abnormally to accommodate the invading member.  As much as you long to extend your pleasure, the sensation and the unnatural sounds of the penetration prove too much for you to last long.<br><br>");
                //<<GoTo I1>>
                ImpScene.centaurOnImpResults(1);
                //<<End>>
                liveData.player.orgasm();
                COMBAT.cleanupAfterCombat();
                return;
            }
            // Catchall
        }
        // Failsafe
        GUI.outputText("Reached Catchall for ImpScene.centaurOnImpMale. Report it please.");
        liveData.player.orgasm();
        COMBAT.cleanupAfterCombat();
    }
    // FEMALE RAPE AS TAUR
    static centaurOnImpFemale(vape = false) {
        if (vape)
            GUI.clearOutput();
        //PREGGERS CHANCE HERE - unfinished
        //{{Player has a cunt}}
        liveData.player.slimeFeed(); // Check this function
        // liveData.player.knockUp(FLAG.PREGNANCY_IMP, FLAG.INCUBATION_IMP)
        GUI.outputText("As the imp lays beaten its hands stroke its " +
            liveData.monster.cockDescriptShort(0) +
            " as its eyes look over you in the hope that you might abuse it in some manner.  You lick your lips as you stare at the large member and you turn around to display your " +
            liveData.player.vaginaDescript(0) +
            ".  ");
        //Not gaping?
        if (liveData.player.vaginas[0].vaginalLooseness <= ENUM.VaginalLoosenessType.VAGINA_LOOSENESS_GAPING) {
            //Penetration for non-gape cases
            GUI.outputText("With a lascivious grin the imp hops forward, gripping your flanks as it drives its member forward into your " + liveData.player.vaginaDescript(0) + ".  ");
            //<<If Pussy Virgin>>
            if (liveData.player.vaginas[0].virgin) {
                GUI.outputText("You cry out as your virginal pussy is torn open by the massive member and the creature cries out in pleasure as it realizes what it has taken from you.  ");
                //[Lose Virginity] <</Virgin>>
            }
            //Not virgin fucking flavors
            else {
                if (liveData.player.vaginalCapacity() < liveData.monster.cockArea(0))
                    GUI.outputText("It groans in delight at your incredible tightness and shoves itself forward even harder.  ");
                //[Increase size as needed]
                //<<At Dicksize>>
                if (liveData.player.vaginalCapacity() >= liveData.monster.cockArea(0) && liveData.player.vaginalCapacity() <= liveData.monster.cockArea(0) * 1.25)
                    GUI.outputText("It makes a pleased sound as it slides deeply into your " + liveData.player.vaginaDescript(0) + ".  ");
                //<<Bigger than dicksize>>
                if (liveData.player.vaginalCapacity() >= liveData.monster.cockArea(0) * 1.25)
                    GUI.outputText("Its dick slides easily and slopping noises start sounding from your backside.  Part of you wishes that its large member was larger still, as your mind drifts to some of the monstrous cocks that have penetrated you in the past.  ");
            }
            //Ride around with him till he cums and falls off
            GUI.outputText("When the creature completely bottoms out inside of you, you begin trotting forward with a wicked grin.  The creature's hands grasp your flanks desperately, and its " +
                liveData.monster.cockDescriptShort(0) +
                " bounces inside your " +
                liveData.player.vaginaDescript(0) +
                ", adding to your sensation.  The movement is causing the imp to push himself even harder against you as it tries to not fall off, and it is all you can do to keep an eye on where you are going.  Soon you can feel the imp's sperm filling your " +
                liveData.player.vaginaDescript(0) +
                " and overflowing even as your cunt-muscles try to milk it of all of its seed. Unsatisfied you begin to speed up as you use its " +
                liveData.monster.cockDescriptShort(0) +
                " to bring about your own orgasm.  The small creature is unable to let go without hurting itself.  It hangs on desperately while you increase the pace and begin making short jumps to force it deeper into you.  The feeling of sperm dripping out and over your " +
                liveData.player.clitDescript() +
                " pushes you over and cry out in intense pleasure.  When you finally slow down and clear your head the imp is nowhere to be seen.  Trotting back along the trail of sperm you left behind you find only its small satchel.");
            liveData.player.cuntChange(liveData.monster.cockArea(0), true, true, false);
            liveData.player.orgasm();
            COMBAT.cleanupAfterCombat();
            return;
            //END OF NON GAPE CASE
        }
        //<<Gaping>>
        else {
            GUI.outputText("With a lascivious grin the imp hops forward, gripping your flanks as it drives its member forward into your " +
                liveData.player.vaginaDescript(0) +
                ".  While you might have considered him large before you came to this place, the sensation is now merely pleasant, and you can't help but groan in slight disappointment.  ");
            //<<Cor 50+>>
            if (liveData.player.cor >= 50)
                GUI.outputText("You take comfort in knowing that at least there is a cock inside of you, and that soon it will be filling you with its seed.  Perhaps it might even impregnate you!  ");
            GUI.outputText("The imp seems to have shared your initial annoyance, and suddenly you feel strange and harsh objects prodding your " +
                liveData.player.vaginaDescript(0) +
                " near where you are being penetrated.  Suddenly you feel yourself being forced open even wider, and you feel almost as if you are getting kicked inside of your pussy.  A second object touches near where the first had entered and you quickly brace yourself against a nearby tree.  The second jolt is even harder, feeling as if your cervix is getting stomped.  You howl out in pain as your pussy is virtually torn open, the imp using your tail to leverage not only his " +
                liveData.monster.cockDescriptShort(0) +
                " but also his legs inside your " +
                liveData.player.vaginaDescript(0) +
                ".  ");
            //<<Cor <80>>
            if (liveData.player.cor < 80)
                GUI.outputText("Tears pour out of your eyes and you are sure you must be bleeding slightly, ");
            //<<Cor <50>>
            if (liveData.player.cor < 50)
                GUI.outputText("and you hang on to the tree, afraid of the pain from even the slightest movement.  ");
            //<<Cor 50+>>
            else
                GUI.outputText("and you hang on to the tree, grunting like a rutting animal as you delight in the intense pain.  ");
            //<<Cor 80+>>
            if (liveData.player.cor >= 80)
                GUI.outputText("You howl out in pain and pleasure, bucking and hoping to intensify the sensation, hurling enticements and insults at the imp like a slut.  ");
            //<<Cor 50+, Breasts>>
            if (liveData.player.cor >= 50 && liveData.player.biggestTitSize() >= 2) {
                GUI.outputText("You release the tree as you begin playing with your " + liveData.player.allBreastsDescript());
                //<<w/ nip-pussies>>
                if (liveData.player.hasFuckableNipples())
                    GUI.outputText(" and shoving your fingers into your " + liveData.player.nippleDescript(0) + ".  ");
                else
                    GUI.outputText(".  ");
                //<</Breasts>>
            }
            GUI.outputText("The imp is pushing deeper and deeper and in moments you cry out again as you feel first its hooves and then its " + liveData.monster.cockDescriptShort(0) + " tearing open your cervix and bottoming out in your womb.  ");
            //<<Asshole large+>>
            if (liveData.player.analCapacity() >= 35) {
                GUI.outputText("When the imp realizes it cannot go any further you feel its hands against your asshole, and your eyes go wide in realization of what it is planning on doing.  Lubed up by your now drooling juices, the fist pushes hard into your " +
                    liveData.player.assholeDescript() +
                    ", shoving past your ring-muscles.  ");
                //<<Assole <gaping, Cor <80>>
                if (liveData.player.ass.analLooseness < 4 && liveData.player.cor < 80)
                    GUI.outputText("Your howl of pain leaves your throat raw.  ");
                else
                    GUI.outputText("Your howl of perverse pleasure leaves your throat raw.  ");
            }
            GUI.outputText("<br><br>It is a relief when you feel the creature's sperm filling your womb and lubricating your raw cervix, your own body is wrecked by an intense orgasm while it breeds you.  You pass out, waking up to find that the imp has slipped out of you and is lying unconscious and coated completely in a mixture of your juices and his own. After looking for anything you might be able to take away from him you limp away, you ");
            if (liveData.player.cor < 80)
                GUI.outputText("promise to yourself that you will not do that again.");
            else
                GUI.outputText("find your cunt juices already dripping down your legs in anticipation of doing this again.");
            liveData.player.orgasm();
            COMBAT.cleanupAfterCombat();
            return;
        }
        // Failsafe
        liveData.player.orgasm();
        COMBAT.cleanupAfterCombat();
    }
    // FEMALE RAPE AS TAUR, GROUP OF IMPS
    static centaurGirlOnImps() {
        GUI.clearOutput();
        GUI.outputText("You stand over the thoroughly defeated demon and get an amusing idea. The tiny creatures are far from a threat, but their features seem like they might be useful. You pick the imp up and place him in a tree with explicit orders to him to stay, much to his confusion. Once you're sure he won't move, you wolf whistle and wait.<br><br>");
        GUI.outputText("A goblin appears from the underbrush behind you, but a swift kick sends her flying; she's not what you're after. You're soon rewarded with a trio of imps, who fly up to you, cocks at the ready.  Grabbing the defeated imp by the head, you explain your need to the group and waft a bit of your scent over to them with your tail. They confer among themselves only briefly, clear on the decision, as you toss their weaker fellow underneath them. The larger of the three, evidently the leader, smiles lewdly at you and agrees to your 'demands'.<br><br>");
        //[Female:
        if (liveData.player.hasVagina()) {
            GUI.outputText("The imps approach you, their various genitalia glistening in the sun and drawing your attention. Their cocks swing lewdly with every flap of their wings, but you turn around, wanting their ministrations to be a surprise.<br><br>");
            GUI.outputText("Hands slide over you, stroking and patting your equine form. The roving fingers find their way to your rear quickly, and begin teasing around your " +
                liveData.player.vaginaDescript() +
                " and " +
                liveData.player.assholeDescript() +
                ". They probe around but don't penetrate and you stamp your hoof in frustration. There's a chuckle from behind you and all but a handful of the hands disappear.<br><br>");
            GUI.outputText("A slightly larger hand smacks your " +
                liveData.player.assDescript() +
                " then slides up and pops a thick finger inside. Your " +
                liveData.player.assholeDescript() +
                " tries to suck it in deeper, but loses the opportunity as it's extracted before doing anything. Instead, the hand returns to your flank and slides slowly forward to your torso.<br><br>");
            GUI.outputText("The 'head' imp comes around into your vision, hovering in front of you and letting you get a good look at his long member. He pulls on it, extracting a large bead of pre onto his other hand. Opening your mouth, he wipes the salty substance onto your tongue. You swallow it happily and feel your mouth watering and your " +
                liveData.player.vaginaDescript() +
                " pumping out fluid.<br><br>");
            GUI.outputText("The leader looks past you and gives a signal to someone you can't see, but you don't have time to turn as a huge dog cock is slipped into your slavering cunt and an even larger spined prick is inserted into your " +
                liveData.player.assholeDescript() +
                ". They begin pumping into you hard, and you whinny in satisfaction while the demon before you watches, jerking on himself.");
            liveData.player.cuntChange(liveData.monster.cockArea(0), true, true, false);
            liveData.player.buttChange(liveData.monster.cockArea(0), true, true, false);
            GUI.outputText("<br><br>");
            GUI.outputText('He disappears behind you and gives you a slap on the haunches, yelling, "<i>Giddyup!</i>" and laughing heartily. Whether he expected you to or not, you decide to go for it and push off the ground with your forelegs, kicking them about in the air and feeling the demons aboard you scrabble to stay attached, before setting off at as fast a run as you can. You tear about in the dirt, clumps of mud and weeds flung behind you.<br><br>');
            GUI.outputText("At the edge of the clearing is the leader, laughing as he watches you and still jerking himself. As if realizing that there's a better option available, he grabs the defeated imp and inserts himself into him, using him like a living cock sleeve who appears to not mind the position and cries out repeatedly as his ass is abused.<br><br>");
            GUI.outputText("Your unexpected running momentarily paused the cocks inside you as their owners groped for holds on your " +
                liveData.player.hipDescript() +
                " and " +
                liveData.player.assDescript() +
                ". With their positions relatively well established, they begin pounding at you again, causing you to nearly stumble in pleasure.<br><br>");
            GUI.outputText("Managing to steady yourself, you run faster, feeling the frenetic cocks inside you explode. The hot spunk sprays about inside and you scream in ecstasy.");
            //[Has breasts:
            if (liveData.player.biggestTitSize() > 1)
                GUI.outputText("  Your hands reflexively grab your " + liveData.player.chestDesc() + " and mash them about.");
            GUI.outputText("<br><br>");
            GUI.outputText("The owner of the dog-cock in your " +
                liveData.player.vaginaDescript() +
                " manages to insert his knot as his balls empty inside you, but the cat-cock's body has no such luck and his grip on you falters. He slides out of your " +
                liveData.player.assholeDescript() +
                " but manages to grasp the fur of your back and straddle you, all while his cock continues to spray you down with jism.<br><br>");
            //[Has breasts:
            if (liveData.player.biggestTitSize() > 1) {
                GUI.outputText("He slides up to your torso and grasps your wildly flailing " +
                    liveData.player.allBreastsDescript() +
                    ", massaging them harshly. His ministrations are surprisingly crude, and you wonder how many times he's attempted to pleasure a woman.");
                //[Has fuckable nipples:
                if (liveData.player.hasFuckableNipples())
                    GUI.outputText("  His fingers slide inside your " + liveData.player.nippleDescript(0) + "s and start spreading and squishing them. Your femcum leaks out over his hands and soon your front is slick and shiny.");
                //All other nipples:
                else
                    GUI.outputText("  His fingers grope and grab at your nipples, stretching them uncomfortably. Before you can complain he seems to realize his mistake and releases them.");
                //[Is lactating normally:
                if (liveData.player.biggestLactation() >= 1 && liveData.player.lactationQ() < 50)
                    GUI.outputText("  Milk dribbles and squirts from you as his desperate squishing continues, forming small puddles on the ground.");
                else if (liveData.player.biggestLactation() >= 1)
                    GUI.outputText("  Milk sprays from you as his desperate squishing continues, creating massive puddles of milk that you splash through as you continue moving.");
                GUI.outputText("<br><br>");
            }
            GUI.outputText("You stop running, spraying dirt in a massive fan and sending the imp on your back flying into a tree, where he crumples to the ground unceremoniously. The doggy-dicked imp collapses out of you and is sprayed down with your orgasm, coating him in femcum and his own semen.<br><br>");
            GUI.outputText("You trot over to the leader, still using the nearly unconscious imp as a cock sleeve, and pull the abused creature off of him. He looks shocked as you grab his cock and squeeze his balls, causing him to orgasm hard and spray you down in white hot seed. He collapses onto the ground, spent, as you wipe yourself down as best you can.");
            GUI.outputText("  Collecting your things, you give the assorted bodies one last look and stumble back to camp.");
            liveData.player.orgasm();
            liveData.player.modStats(["cor", 1]);
        }
        COMBAT.cleanupAfterCombat();
    }
    // TAUR RESULTS
    static centaurOnImpResults(iNum) {
        var x = liveData.player.cockThatFits(liveData.monster.analCapacity());
        if (x < 0)
            x = 0;
        //Result 1
        if (iNum == 1) {
            //<<cum multiplier: lots>>
            if (liveData.player.cumQ() >= 250) {
                //<<no knot>>
                if (liveData.player.cocks[x].cockType != ENUM.CockType.DOG)
                    GUI.outputText("Soon the amount is overflowing from the abused " + liveData.monster.assholeDescript() + ", dripping between you with no sign of stopping as you continue thrusting yourself into the imp.  ");
                //<<knot>>
                else
                    GUI.outputText("Soon the abused " +
                        liveData.monster.assholeDescript() +
                        " is full to the brim, though your knot keeps any from escaping while more and more pumps in.  Soon the creature's belly is distending and the imp is gasping wordlessly. ");
                GUI.outputText("When your " + liveData.player.cockDescript(x) + " finally emerges a torrent of cum follows out of the distended hole and covering the back of the creature's legs.  ");
                //<<I1_1>>
                //<<2 cocks>>
                if (liveData.player.cockTotal() == 2)
                    GUI.outputText("Your other cock drenches the imp's back with its own secretions that immediately start dripping down its sides.  ");
                //<<3+ cocks>>
                if (liveData.player.cockTotal() > 2)
                    GUI.outputText("Your other cocks release their cum all over the creature's back and sides, leaving it a glazed mess.  ");
                //<</I1_1>>
                GUI.outputText("You leave him panting and lapping at a pool of your semen.");
            } //<</multiplier>>
            //<<cum multiplier: little-normal>>
            else {
                GUI.outputText("With a last thrust into the cum receptacle you begin slowing down, even as its own " + liveData.monster.cockDescriptShort(0) + " spills its seed over the ground.  ");
                //<<I1_1>>
                //<<2 cocks>>
                if (liveData.player.cockTotal() == 2)
                    GUI.outputText("Your other cock drenches the imp's back with its own secretions that immediately start dripping down its sides.  ");
                //<<3+ cocks>>
                if (liveData.player.cockTotal() > 2)
                    GUI.outputText("Your other cocks release their cum all over the creature's back and sides, leaving it a glazed mess.  ");
                //<</I1_1>>
                GUI.outputText("You leave him panting and draped over the mossy boulder in a pool of your joint cum.");
            }
            return;
        }
        // Result 2
        if (iNum == 2) {
            //<<cum multiplier: lots>>
            if (liveData.player.cumQ() >= 250) {
                GUI.outputText("The imp's eyes widen in at the amount pouring in, and gobs of sperm begin overflowing down its chin.  ");
                //<<(lots cont.)  cum multiplier: excessive>>
                if (liveData.player.cumQ() >= 500)
                    GUI.outputText("No matter how fast it is swallowing it does not seem to be enough, and soon its belly is distended and its skin is covered in a thick coating of cum.  ");
                //<</multiplier>>
            }
            GUI.outputText("Sated you trot away and leave the creature licking its lips and fingers, its eyes following you with lustful cunning.");
            return;
        }
        // Result 3
        if (iNum == 3) {
            //<<Has Breasts>>
            if (liveData.player.biggestTitSize() >= 2) {
                GUI.outputText("As the sensations intensify you reach up and begin massaging your " + liveData.player.breastDescript(0) + " and playing with your " + liveData.player.nippleDescript(0) + "s.  ");
                //<<(breasts cont.) nips have pussies>>
                if (liveData.player.hasFuckableNipples()) {
                    //<<nip-pussies and milk>>
                    if (liveData.player.biggestLactation() >= 1)
                        GUI.outputText("Milk streams out from your " + liveData.player.nippleDescript(0) + "s as if they had been recently filled with dripping cum.  ");
                    else
                        GUI.outputText("Your fingers slide faster and faster into your " + liveData.player.nippleDescript(0) + "s even as the imp begins to stroke itself under you.  ");
                }
                //No pussies
                else {
                    //<<else no pussies, has milk>>
                    if (liveData.player.biggestLactation() > 0) {
                        //<<little milk>>
                        if (liveData.player.biggestLactation() <= 1)
                            GUI.outputText("Beads of milk begin to drip down your chest and occasionally spurt outward.  ");
                        //<<else>>
                        else
                            GUI.outputText("Milk pours out of your " + liveData.player.breastDescript(0) + " and streams down your body.  ");
                    } //<</milk>>
                }
            } //<</Breasts>>
            return;
        }
    }
    // NIPPLE RAPE
    static impNippleRape() {
        GUI.clearOutput();
        GUI.outputText("You slowly walk over to the masturbating imp, your " + liveData.player.hipDescript() + " and " + liveData.player.buttDescript() + " swaying suggestively with every step.<br><br>");
        GUI.outputText("Shedding your clothes you push the imp to the ground and straddle him, keeping his hands away from his twitching pecker while you quickly tie him up with his own loincloth.  The lust-addled demon utterly incapacitated, you start to use both of your hands to toy freely with your slimy nipple-holes, as well as your ");
        if (liveData.player.hasCock())
            GUI.outputText(liveData.player.cockDescript(0));
        if (liveData.player.hasCock() && liveData.player.hasVagina())
            GUI.outputText(" and ");
        if (liveData.player.hasVagina())
            GUI.outputText(liveData.player.vaginaDescript(0));
        else if (liveData.player.gender == 0)
            GUI.outputText(liveData.player.assholeDescript());
        GUI.outputText(".<br><br>");
        GUI.outputText("You gently insert a single digit into one of your nipple-cunts, ");
        if (liveData.player.lactationQ() >= 1000)
            GUI.outputText("unleashing a torrent of thick, creamy milk and ");
        //(if regular milky;
        else if (liveData.player.lactationQ() >= 50 && liveData.player.biggestLactation() >= 1)
            GUI.outputText("releasing a steady trickle of warm milk and ");
        GUI.outputText("lust-induced sex juice onto the imp's lap; your other hand instinctively moves down to stroke your ");
        //((if male/herm;
        if (liveData.player.hasCock()) {
            GUI.outputText("rock-hard cock");
            if (liveData.player.hasVagina())
                GUI.outputText(" and ");
        }
        if (liveData.player.hasVagina())
            GUI.outputText("dripping wet pussy");
        if (liveData.player.gender == 0)
            GUI.outputText(liveData.player.assholeDescript());
        GUI.outputText(", teasing him with a lewd moan as your head rolls back in sexual ecstasy.");
        if (liveData.silly)
            GUI.outputText("  The imp is sickened, but curious.");
        GUI.outputText("<br><br>");
        GUI.outputText("You continue finger-fucking your nipple, becoming more and more aroused as the imp gets harder and harder from watching the exotic display before him.  You soon tire of watching the imp squirm beneath you, desperate for sexual relief; you slowly move your hand away from your groin, reaching down towards his crotch, and start to toy with his apple-sized balls, fondling and squeezing them roughly.  You casually slip a second finger into your wet nipple-hole, stretch it out teasingly, and hold the gaping orifice in front of the imp's face, giving him a good view of the inside of your freakish, wet nipple-cunt.<br><br>");
        //(If corrupt:
        if (liveData.player.cor >= 66) {
            GUI.outputText("\"<i>Mmm, wouldn't you just love to stick your fat cock into this sopping wet hole, and cum deep inside my " +
                liveData.player.chestDesc() +
                '?</i>"  You whisper huskily into his ear, sliding your fingers away from his balls and up along the underside of his aching dick, teasing every inch of it until you reach his swollen head and start rubbing your finger around his glans in small circles.  The imp is panting heavily, his eyes firmly locked on your ');
            //(if normal)
            if (liveData.player.biggestLactation() < 1)
                GUI.outputText("wet");
            //(if lactating)
            else
                GUI.outputText("milky");
            GUI.outputText(", bucking his hips upwards in desperation.<br><br>");
        }
        GUI.outputText("Deciding that the poor bastard has suffered enough, you guide your stretched " +
            liveData.player.nippleDescript(0) +
            " down to his quivering member and hold it over the tip for a moment.  The imp groans in frustration, feeling the heat of your slutty juices dripping down onto his aching rod and overfull testes, making him even more desperate to drive deep into your waiting breast.  Without warning, you forcefully shove your breast onto his swollen fuckstick, ");
        if (liveData.player.biggestTitSize() <= 4)
            GUI.outputText("bottoming out halfway on his immense dick.");
        else
            GUI.outputText("only stopping when the flesh of your immense mammary bumps into his quaking ballsack.");
        GUI.outputText("<br><br>");
        GUI.outputText("You shudder in ecstasy as you rise off of his drenched girth; your nipple-hole is slick with arousal, making it easier for you to slide back down until ");
        //((if breast size below D)
        if (liveData.player.biggestTitSize() <= 4)
            GUI.outputText("you feel his swollen cock bottom out, your petite breast unable to swallow any more of his throbbing maleness");
        //((over D)
        else
            GUI.outputText("his swollen cock and desperately filled balls are entirely engulfed in tit-flesh");
        GUI.outputText(".  Eventually the imp starts timing his thrusts with your movements, and soon the two of you are working in a steady rhythm - thrust, retract, thrust, retract.  Minutes go by as the rhythm slowly builds towards a crescendo, with the only sounds being the lewd schlicking noise of your breast servicing the imp's rod, and the odd moan escaping your lips.  While one hand is furiously jilling off your vacant nipple-slit, the other one is furiously");
        //[(if male)
        if (liveData.player.hasCock())
            GUI.outputText(" pumping your " + liveData.player.cockDescript(0));
        //(if female)
        else if (liveData.player.hasVagina())
            GUI.outputText(" fingering your hungry baby tunnel");
        else
            GUI.outputText(" fingering your tingling anus");
        GUI.outputText(".<br><br>");
        GUI.outputText("Eventually the rhythm becomes more sporadic as you and the imp approach climax; your tongue rolls out of your open mouth and your toes curl as you feel the imp spasm violently inside you, letting an endless stream of his searing spunk pour directly into your " +
            liveData.player.chestDesc() +
            ".  The intense heat pushes you over the edge and ");
        //(if dick)
        if (liveData.player.hasCock()) {
            GUI.outputText("a ");
            //[(cum production < 500ml)
            if (liveData.player.cumQ() < 500)
                GUI.outputText("jet ");
            //(cum production 500-1000ml)
            else if (liveData.player.cumQ() < 1000)
                GUI.outputText("geyser ");
            //(cum production > 1000ml)
            else
                GUI.outputText("volcano ");
            GUI.outputText("of cum sprays from your " + liveData.player.cockDescript(0) + " and splatters over both you and the hapless imp");
            if (liveData.player.hasVagina())
                GUI.outputText(", while ");
        }
        if (liveData.player.hasVagina()) {
            GUI.outputText("your pussy juices spurt out as your " + liveData.player.vaginaDescript(0) + " twitches in orgasm");
        }
        if (liveData.player.gender == 0)
            GUI.outputText("your asshole clenches tight on your finger");
        GUI.outputText(".<br><br>");
        GUI.outputText("You collapse heavily on top of the imp, once again impaling your breast on his still-erect cock.  You lie like this for a few moments until you notice that the imp has dozed off, exhausted by the whole ordeal.  You stand up woozily as a mixture of ");
        //(if lactating)
        if (liveData.player.biggestLactation() >= 1 && liveData.player.lactationQ() < 40)
            GUI.outputText("milk, ");
        GUI.outputText("fem-spunk and hot demon cum leaks out from your gaping nipple-cunt.<br><br>");
        //(if corruption > 60)
        if (liveData.player.cor > 60)
            GUI.outputText("You thrust your digits into your " +
                liveData.player.nippleDescript(0) +
                " once more, scooping out as much imp jizz as you can reach.  You happily drink up the thick goo, savoring the cloying taste before quickly getting dressed and leaving the imp to slumber.");
        //(continue to non-corrupt text)
        //(if not)
        else
            GUI.outputText("You quickly get dressed and leave the imp to his slumbering, his hands still tied together by his loincloth.");
        //Gain xp and gems here
        liveData.player.orgasm();
        liveData.player.modStats(["sen", -3], ["cor", 1]);
        COMBAT.cleanupAfterCombat();
    }
    // FEEDER SCENE WITH IMP
    static areImpsLactoseIntolerant() {
        GUI.clearOutput();
        GUI.outputText("You advance on the masturbating imp, baring your " + liveData.player.allBreastsDescript() + " and swinging them from side to side. The little creature watches them, mesmerized as he masturbates his foot-long erection.<br><br>");
        GUI.outputText("You sit down in front of the little creature and grab ahold of his hair. The imp squeals slightly in pain before his cries are silenced with a " +
            liveData.player.nippleDescript(0) +
            ".  It fills his mouth as he yields, defeated. At once he starts to drink down as much of your milk as he can.<br><br>");
        GUI.outputText("After a moment, he takes one of his hands off his large member and puts it against your " +
            liveData.player.chestDesc() +
            ' to steady himself as he continues to nurse. You give a pleased sigh and simply bask in the sensations of pleasure that being nursed gives you.  You ruffle the little imp\'s hair affectionately. "<i>These creatures are so much nicer to be around when they just take their minds off their cocks,</i>" you think as you see his other hand relax and stop rubbing his swollen, demonic member.<br><br>');
        GUI.outputText("You feel the imp's mighty gulps start to slow down until he lets out a sigh of relief. While imps may be small, they're very hungry creatures. Your " +
            liveData.player.nippleDescript(0) +
            " slips out of the imp's mouth, and you gently lay it down on the ground. It gives a few gentle burps before dozing off; you can see that the imp's erection has retracted, and its belly has expanded significantly. You smile to yourself and, feeling fully satisfied, you stand up.");
        //set lust to 0, increase sensitivity slightly
        liveData.player.modStats(["lib", 0.2]);
        liveData.player.changeLust(-50);
        liveData.player.milked(); // Check this function
        COMBAT.cleanupAfterCombat();
    }
    // PUT BEE EGGS INTO IMP
    static putBeeEggsInAnImp() {
        GUI.clearOutput();
        //IMP EGGS
        //(functions for bipedal bee morphs.  At time of writing, unsure as to whether bee abdomen worked for centaur/naga/goo forms)
        //GUI.outputText(images.showImage("imp-egg"), false);
        GUI.outputText("You glance down at the masturbating imp, feeling a twitch in your swollen, insectile abdomen.  As the red-skinned homunculus writhes on the ground, beating his meat, you smile, feeling a globule of sweet nectar oozing out of your ovipositor.");
        GUI.outputText("<br><br>He's too busy humping the air and stroking himself to notice you hooking the tip of one of your [feet] under him.  You kick up one of your [legs], flipping the fapping imp over.  He gasps as he lands face-down on the ground, startled enough to stop jerking his tool.");
        GUI.outputText("<br><br>You grin, straddling his surprisingly perky ass, resting your [hips] on his small, round cheeks.  With your arms pinning down his shoulders, he can't stroke himself, and he whimpers at the restraint.");
        GUI.outputText('<br><br>"<i>Wait - what\'s going on?</i>" he gasps.');
        GUI.outputText("<br><br>You deign not to answer him, lost in the unique sensation of your abdomen curling behind you.  You toss your head back, luxuriating in the pleasure of your black ovipositor emerging against smooth, glossy skin of the imp's ass.");
        GUI.outputText('<br><br>"<i>No, nooooooo...</i>" whimpers the imp as you bite your lip, pushing the tip of your organ into his surprisingly pliant hole.');
        GUI.outputText("<br><br>You and the imp shudder in tandem as your sweet honey smears between his cheeks, oozing down his crack as you squeeze your throbbing ovipositor further and further into him.  Buried deep in his bowels, you feel the first of your eggs push through your rubbery organ, stretching out your tube along with his asshole.");
        GUI.outputText("<br><br>As you lay your first egg inside the imp, he gurgles, face-down against the ground, and you feel him tighten around your ovipositor.  The imp wriggles beneath your body and by the slowly-spreading pool of steaming cum; you guess that he just climaxed.");
        GUI.outputText("<br><br>The imp pants, trying to catch his breath as you twitch your abdomen, adjusting your ovipositor inside him.  Before he can recover, you push another egg down your tube, implanting it deep in the imp alongside the first egg.");
        GUI.outputText('<br><br>"<i>Suh-stop...</i>" groans the imp even as you push a third egg into his tiny body.  But you\'re beyond stopping.  Egg after egg, you fill his twitching body.  The pool of cum grows, and it oozes around your ');
        if (liveData.player.isGoo())
            GUI.outputText("rippled goo edges");
        else if (liveData.player.isNaga())
            GUI.outputText("trembling coils");
        else
            GUI.outputText("straddling knees");
        GUI.outputText(" as you turn the imp into your own, private incubator.");
        GUI.outputText("<br><br>After a handful of eggs, you grunt, realizing that you've run out of room inside the imp.  Tilting your head to one side, you consider that the imp is face-down, and that his stomach might need more room to stretch.  You rise halfway up and flip him over beneath you, careful to leave your ovipositor still buried inside him.");
        GUI.outputText("<br><br>The imp's eyes are almost completely rolled back in his head, his flat chest smothered with his own spunk.  His breathing is ragged, and his hard, massive cock is slathered with thick, white cum.  His belly already bulges slightly with your eggs and his small hands move to clutch at his stomach, giving him the look of a debased, pregnant mother.");
        GUI.outputText("<br><br>That realization is enough to stimulate your ovipositor again.  With a groan, you plant your hands on the ground to either side of his head, on your knees as your ovipositor pumps another egg into the imp's bowels.  The imp shudders as his belly swells, filling with your brood.");
        GUI.outputText('<br><br>"<i>More... more!</i>" moans the imp beneath you.  You oblige, and ');
        if (liveData.player.biggestTitSize() >= 1) {
            GUI.outputText("his tiny claws grab your ");
            if (liveData.player.bRows() > 1)
                GUI.outputText("first row of ");
            GUI.outputText(liveData.player.breastDescript(0) + ", squeezing your tits as you fuck him full.");
            if (liveData.player.lactationQ() >= 500)
                GUI.outputText("  Rivulets of your milk run down his forearms as he inexpertly milks you.");
        }
        //[If cock:
        else if (liveData.player.hasCock())
            GUI.outputText("the rise of his swollen belly soon presses against [oneCock] and the rhythm of your thrusts strokes his shiny red stomach against your sensitive organ.");
        else if (liveData.player.hasVagina())
            GUI.outputText("the imp's tiny, clawed feet scrabble against you as he flails in pleasure.  By mistake, one slips between the lips of your pussy, small toes wriggling against your inner walls, and you instinctively push down against the small limb, fucking yourself with his foot.");
        else
            GUI.outputText("you feel a firm pressure at your [asshole] as the tip of the imp's lashing tail prods frantically against you, manically shoving in and out of your [asshole].");
        GUI.outputText("<br><br>You groan, climaxing against the imp, just as he lets out another gout of hot seed from his cum-smeared dick.  He spatters your front, his spunk mingling with your fluids, shuddering as he takes the last of your eggs inside him, his belly swollen to the size of a beach ball.");
        GUI.outputText("<br><br>You pant heavily, and with a messy squelching, you pull yourself out of the imp, pushing yourself up from your crouched position.  A gush of honey pours from the imp's ass, cutting off quickly as an egg rolls into place from the inside, stopping up your imp-cubator.");
        GUI.outputText("<br><br>You hear a strange noise from the imp, one that sounds strangely like a giggle.  You glance down at him, instinctively evaluating him as a bearer of your eggs.  The imp is still panting, looking up at you from under his messy, black hair.  With a flushed, submissive expression and swollen, pregnant belly, the imp seems almost... cute?  He cradles his massive, egg-filled belly, caressing it, then looks back to you, blushing.");
        GUI.outputText("<br><br>You blink then stand up.  You shake your head as you walk away, chalking the odd thoughts up to your egg-laying instincts.  Some of these mutations have some weird effects, after all...");
        liveData.player.orgasm();
        liveData.player.modStats(["sen", -1]);
        liveData.player.dumpEggs();
        COMBAT.cleanupAfterCombat();
    }
    // KILL THE IMP
    static killImp() {
        GUI.clearOutput();
        liveData.gameFlags[FLAG.IMPS_KILLED]++;
        GUI.outputText("You make a quick work of the imp before dragging the corpse away. That's one less foul creature prowling the realms. ");
        if (liveData.player.cor < 25)
            liveData.player.modStats(["cor", -0.5]);
        GUI.menu();
        GUI.addButton(0, "Take Skull", ImpScene.takeSkull);
        GUI.addButton(1, "Leave", COMBAT.cleanupAfterCombat);
    }
    // TAKE THE IMP'S SKULL
    static takeSkull() {
        Inventory.takeItem(Items.Materials.ImpSkull, COMBAT.cleanupAfterCombat);
    }
    // LOSE TO IMP SCENES
    // STANDARD LOSS
    /* The imp rapes you, pretty much. The only special loss is a 50% chance for males with thick penises to have their urethra raped by the imp. */
    static impRapesYou() {
        GUI.clearOutput();
        //if (doSFWloss()) return; FIGURE OUT THIS FUNCTION
        if ((liveData.player.findPerk(PerkLib.BimboBrains) >= 0 || liveData.player.findPerk(PerkLib.FutaFaculties) >= 0) && !liveData.player.isTaur() && liveData.player.hasVagina()) {
            //GUI.outputText(images.showImage("imp-loss-female-fuck"), false);
            GUI.outputText("You sink to the ground, assuming a position that feels all too natural to you now, leaning forward to let your " +
                liveData.player.allBreastsDescript() +
                " hang down slightly. The imp looks you up and down, wickedly eyeing your ready, slightly open lips. He drops his loin-cloth to reveal a hardening cock. Your eyes bulge as it grows larger... and larger... and larger! The imp's cock finally bulges to a full twelve inches... and it's moving closer. You struggle to think... but you just can't! You want that in your mouth, like, so bad!<br><br>");
            GUI.outputText("Your " +
                liveData.player.vaginaDescript(0) +
                " drips in anticipation, and you find yourself involuntarily moving your knees farther apart to prepare yourself to be filled. He smiles and presses his cock against your " +
                liveData.player.vaginaDescript(0) +
                ", pushing you back to get a better angle. You try to make words, but your brain can only think of so much at once! Right now, it's thinking of cock, which, naturally, makes you open your mouth and let out a slutty moan.<br><br>");
            GUI.outputText("The imp pushes into you violently, ramming his cock in to the hilt, leaving you gasping in pain and surprise. He leaves it in your slutty pussy, giving you a second to... oh who is he kidding... he can tell by your air-headed look that you've done nothing but take cocks your whole life. He fucks you hard, slapping your " +
                liveData.player.buttDescript() +
                " to remind you who is in charge. You can't help but think about, like, how you just love it when a man takes charge. Less thinking!");
            liveData.player.cuntChange(12, true, true, false);
            GUI.outputText("<br><br>");
            GUI.outputText("The rough fucking becomes more and more pleasurable as time goes on. You moan air-headedly with each thrust, hips squeezing around the demon-cock- loving the feeling of his fullness. Before long you can't help but cum all over him, your vagina locking around his cock like a vice, muscles rippling, milking him for his cum. The imp's prick explodes inside you, pumping huge loads of hot demon-seed inside you with each eruption. You swoon, feeling it fill your womb and distend your belly as the imp's orgasm fills you with insane amounts of cum.<br><br>");
            GUI.outputText("With a sigh, he pulls his dick free, and you flop down, cum leaking out onto the ground from your well-fucked hole. If you could, like, focus at all, you'd totally be worrying about being, like, pregnant or whatever. But you lose consciousness.");
            // liveData.player.knockUp(FLAG.PREGNANCY_IMP, FLAG.INCUBATION_IMP - 14) //Bigger imp means faster pregnancy
            liveData.player.orgasm();
            liveData.player.modStats(["lib", 1], ["sen", 1], ["cor", 1]);
            COMBAT.cleanupAfterCombat();
            return;
        }
        //Lust loss
        if (liveData.player.lust >= liveData.player.maxLust()) {
            //50% chance of sprocket rape for super-thick people.
            if (liveData.player.cocks.length >= 1 && UTIL.rand(2) == 0) {
                if (liveData.player.cocks[0].cockThickness >= 4) {
                    ImpScene.sprocketImp();
                    return;
                }
            }
            //Female or Futa
            if (liveData.player.gender == 2 || liveData.player.gender == 3) {
                liveData.player.slimeFeed(); // Check this function
                //GUI.outputText(images.showImage("imp-loss-female-fuck"), false);
                GUI.outputText("You sink to the ground, too overcome by lust and desire to fight.  The imp smiles, a wicked look glinting in his eyes.  He drops his loincloth to reveal a hardening cock.  Your eyes bulge a bit as it grows...and grows...and grows!  That imp has a twelve inch cock..and he's walking towards you.   Your " +
                    liveData.player.vaginaDescript(0) +
                    " practically juices itself in anticipation, and you find yourself spreading your " +
                    liveData.player.legs() +
                    " in preparation.");
                GUI.outputText("<br><br>He smiles and presses his cock against your " + liveData.player.vaginaDescript(0) + ".  Your lust-driven mind is speechless, leaving you panting and moaning like a whore.");
                //If too big, only partly penetrate.
                if (liveData.player.vaginalCapacity() < liveData.monster.cockArea(0)) {
                    if (liveData.player.vaginas[0].virgin) {
                        GUI.outputText("  He plunges in hard, breaking your hymen and stealing your virginity.  A look of surprise crosses his face, chased away by ecstasy.  If you had a rational bit left in your mind, you'd notice he looks... stronger somehow, but you're too horny to care.");
                        liveData.player.vaginas[0].virgin = false;
                    }
                    else {
                        GUI.outputText("  He pushes against your tight little pussy, struggling to penetrate you.");
                    }
                    GUI.outputText("  His cock only sinks a few inches in, but he begins fucking you hard, each time claiming a bit more of your pussy for his demonic tool.  You feel a painful stretching as he gets half of it inside you, ruining your " +
                        liveData.player.vaginaDescript(0) +
                        " for most humans.  He fucks you like this for what seems like forever, never getting much further. ");
                    liveData.player.cuntChange(liveData.monster.cockArea(0), true);
                }
                else {
                    GUI.outputText("  He plunges in violently, ramming his " +
                        liveData.monster.cockDescriptShort(0) +
                        " in to the hilt, leaving you gasping in pain and surprise.  He leaves it there, giving you a second to get used to him, and then begins fucking you hard, slapping your ass every few thrusts to remind you who is in charge.");
                    liveData.player.cuntChange(12, true, true, false);
                }
                if (liveData.player.gender == 3)
                    GUI.outputText("<br><br>The rough fucking becomes more and more pleasurable as time passes, until you cannot help but stroke your " +
                        liveData.player.cockDescript(0) +
                        " along with each plunge he takes in your " +
                        liveData.player.vaginaDescript(0) +
                        ".  You feel yourself clench around him as your sexual organs release, erupting spurts of cum and milking the demon's cock like your life depended on it.");
                if (liveData.player.gender == 2)
                    GUI.outputText("<br><br>The rough fucking becomes more and more pleasurable as time passes.  You moan loudly and lewdly with each thrust, hips squeezing around the demon-cock, relishing the feeling of fullness.  Before long you cannot help but cum all over him, " +
                        liveData.player.vaginaDescript(0) +
                        " locking around his cock like a vice, muscles rippling, milking him for his cum.");
                GUI.outputText("  The imp's " +
                    liveData.monster.cockDescriptShort(0) +
                    " explodes inside you, pumping huge loads of hot demon-seed inside you with each eruption.  You swoon, feeling it fill your womb and distend your belly as the imp's orgasm fills you with an unnatural quantity of corrupted semen.<br><br>With a sigh, he pulls his dick free, and you flop back on your back, cum surging out onto the ground from your well-fucked hole.  ");
                if (liveData.player.pregnancyIncubation > 0 && liveData.player.pregnancyIncubation <= 216) {
                    GUI.outputText("You wonder what this will do to whatever is growing in your womb...  ");
                }
                else {
                    if (liveData.player.inHeat)
                        GUI.outputText("You find yourself hoping you're pregnant as you swiftly lose consciousness.");
                    else if (liveData.player.pregnancyIncubation <= 0) {
                        if (liveData.player.cor > 75)
                            GUI.outputText("With an appreciative moan, you bury your fingers in its slimy warmth, hoping you are pregnant with some fiendish offspring, and lose consciousness.");
                        else
                            GUI.outputText("You hope you don't become pregnant, but promptly lose consciousness before you can contemplate the prospect any further.");
                    }
                }
                // liveData.player.knockUp(FLAG.PREGNANCY_IMP, FLAG.INCUBATION_IMP - 14) //Bigger imp means faster pregnancy
                liveData.player.modStats(["lib", 1], ["sen", 1], ["lus", 1], ["cor", 1]);
            }
            //Male or genderless
            if (liveData.player.gender == 0 || liveData.player.gender == 1) {
                //Alternate male-only case
                if (liveData.player.gender == 1 && UTIL.rand(2) == 0) {
                    //GUI.outputText(images.showImage("imp-loss-male-fuck"), false);
                    GUI.outputText("Your eyes glaze over with lust as the imp's dark magic destroys your will to continue fighting. You sink to your ");
                    if (liveData.player.isTaur())
                        GUI.outputText("hocks and knees, your " +
                            liveData.player.cockDescript(0) +
                            " hurting from the massive blood pressure caused by your unbridled lust. He approaches you and stops about two feet in front of you, watching with delight your helpless state");
                    else
                        GUI.outputText("knees, pull out your " +
                            liveData.player.cockDescript(0) +
                            " and begin mindlessly stroking yourself as the imp approaches you, a wicked grin on his face. Your mind races with thoughts and images of sucking the imp's cock. He approaches you and stops about two feet in front of you, watching with delight as you succumb to your own lust");
                    GUI.outputText(". Your eyes glance down to his waist and see a massive bulge form under his loincloth, the sight of which causes your " + liveData.player.cockDescript(0) + " to twitch and begin leaking pre-cum.<br><br>");
                    GUI.outputText("The imp drops his loincloth, revealing his huge 12-inch penis, and then forcefully grabs your head and pulls you down on to his hard throbbing demon dick. He shoves his cock past your lips and deep down your throat in one slow, forceful push. You can barely accommodate his huge cock, and yet your lust makes you hunger for more. You cough and gag while the imp proceeds to fuck your mouth hard, slapping his hot balls against your chin, disregarding your need to breathe.  ");
                    if (liveData.player.isTaur())
                        GUI.outputText("Dropping down to the ground, your " + liveData.player.cockDescript(0) + " trembles against your body to the rhythm of the imp's thrusts, leaving your underbelly smeared with its own pre-cum.<br><br>");
                    else
                        GUI.outputText("On all fours now, your " + liveData.player.cockDescript(0) + " bounces up and down against you to the rhythm of the imp's thrusts, leaving your belly smeared in your own pre-cum.<br><br>");
                    if (liveData.player.ballSize >= 5)
                        GUI.outputText("Your huge " +
                            liveData.player.ballsDescriptLight() +
                            " swing heavily against you as well, responding to the force of the imp's thrusts, slapping your own ass and driving your " +
                            liveData.player.cockDescript(0) +
                            " even stiffer with lust, the pre-cum pulsing out of your cock in time with the slapping.<br><br>");
                    GUI.outputText("You begin to feel light-headed from lack of air just as the imp grips your head firmly and begins making rapid, shallow thrusts down your throat, nearing his orgasm. Suddenly he clenches tight, his claws digging into your head and thrusts down your throat as far as he can, holding his massive cock deep in your stomach. Your eyes go wide as you feel the imp's balls on your chin spasm violently.  His cock pulses in your mouth as the thick demon cum is pumped violently down your throat. It feels like an eternity as the imp continues to fill your guts with his hot cum, his orgasm lasting far longer than any human's. ");
                    liveData.player.refillHunger(40); // CHECK THIS
                    GUI.outputText("He slowly withdraws his still-pumping cock from you, coating your throat and then mouth with an almost continual spray of his unnaturally hot and sticky demon seed. The imp pulls out of your mouth just in time to splatter your face with his cum before his orgasm stops, coating your lips, nose, eyes, and hair with his incredibly thick and sticky cum.<br><br>");
                    GUI.outputText("You fall to the ground gasping, exhausted and unable to move, the demon cum on your face and inside you still burning with intense heat and corruption. You lose consciousness, your " +
                        liveData.player.cockDescript(0) +
                        " still firmly erect, your lust not sated.");
                    liveData.player.modStats(["cor", 2]);
                    liveData.player.changeLust(20);
                    COMBAT.cleanupAfterCombat();
                    liveData.player.slimeFeed(); // CHECK THIS
                    return;
                }
                else {
                    liveData.player.slimeFeed(); // CHECK THIS
                    GUI.outputText("You sink to the ground, too overcome by lust and desire to fight.  The imp smiles and circles you, dropping his loincloth as he goes.  You are roughly shoved to the ground, your backside slapped hard.  You're too horny to do anything but moan from the pain ");
                    if (!liveData.player.isTaur())
                        GUI.outputText("as you are disrobed");
                    GUI.outputText(".  As the imp presses a large bulk against your backside, you realize he has a massive penis!<br><br>The imp pushes his " +
                        liveData.monster.cockDescriptShort(0) +
                        " into your ass and fucks you hard, with little regard to your pleasure.  After a rough fucking, he cums, stuffing your ass full of hot demon cum.  His orgasm lasts far longer than any human's, leaving your belly slightly distended.");
                    liveData.player.buttChange(liveData.monster.cockArea(0), true, true, false);
                    liveData.player.modStats(["lib", 1], ["sen", 1], ["cor", 1]);
                    liveData.player.changeLust(1);
                    if (liveData.player.sens > 40) {
                        GUI.outputText("  You manage to orgasm from the feeling of being filled by hot cum.");
                        if (liveData.player.gender == 1)
                            GUI.outputText("  You jizz all over the ground in front of you, spraying cum in huge squirts in time with the demon's thrusts.");
                        liveData.player.modStats(["cor", 1]);
                    }
                    GUI.outputText("<br><br>You drop to the ground when he's done with you, cum spilling from your abused ass all over the ground, too exhausted to move.  Consciousness fades.  ");
                }
            }
            COMBAT.cleanupAfterCombat();
            liveData.player.orgasm();
        }
        //HP or insta-loss
        else {
            GUI.outputText("\n<b>You fall, defeated by the imp!</b>\nThe last thing you see before losing consciousness is the creature undoing its crude loincloth to reveal a rather disproportionately-sized member.");
            COMBAT.cleanupAfterCombat();
        }
    }
    // RARE LOSS SCENE FOR THICK MALES
    static sprocketImp() {
        liveData.player.slimeFeed();
        GUI.clearOutput();
        GUI.outputText("You fall to your knees, lost in thoughts of what you want the imp to do to you.  Your body burns with desire, ready for the anal assault to come.  At least that's what you think.  You reach a hand out to the imp, wanting to pull him to you, to make him take you the way you need to be taken.  But he doesn't, not this time.<br><br>");
        //New PG
        GUI.outputText("Much to your surprise, the imp flutters upward on his small leathery wings and rushes toward you.  ");
        if (liveData.player.hairLength > 0)
            GUI.outputText("His claws dig into your hair ");
        else
            GUI.outputText("His claws dig into your wrists ");
        GUI.outputText("and you find yourself dragged upward with him, soaring over the tops of the trees.  The cool rush of air does nothing to abate your arousal.  If anything, the cold shock only makes your body more aware of its own need.  After just a few seconds that feel like an eternity to your lust-filled being, the imp hurls you down into a tree.  You flail as you fall, barely catching yourself on the upper branches.  Your hands and " +
            liveData.player.legs() +
            " are tangled in the smooth wooden spiderweb below you, your mind torn between desire for the imp above and fear of the fall below.  You can see from the gleam in the horned creature's red eyes that he has you right where he wants you.<br><br>");
        //New PG
        GUI.outputText("The imp pulls the loincloth from his waist, revealing his red throbbing cock.  It is certainly large, even though it stands smaller than your own erection.  He tosses the cloth aside, and you see him fluttering down toward you just before the rough fabric lands on your face.  His clawed fingers grasp ");
        //Variable cocktext
        if (liveData.player.cocks[0].cockType == ENUM.CockType.HUMAN || liveData.player.cocks[0].cockType == ENUM.CockType.DEMON)
            GUI.outputText("your " + liveData.player.cockDescript(0) + ", rubbing the tip of his prick against your own, ");
        else if (liveData.player.hasKnot(0))
            GUI.outputText("your " + liveData.player.cockDescript(0) + ", rubbing the tip of his prick against your point, ");
        else if (liveData.player.cocks[0].cockType == ENUM.CockType.HORSE)
            GUI.outputText("your " + liveData.player.cockDescript(0) + ", rubbing the tip of his prick against your flared head, ");
        else if (liveData.player.cocks[0].cockType == ENUM.CockType.TENTACLE)
            GUI.outputText("your huge green dick, rubbing the tip of his prick against your purplish cock-head, ");
        GUI.outputText("smearing your pre-cum together.  You wonder if he is planning on just jerking both of you off as you shake the cloth from your face.  He flashes you an evil smile, making your eyes widen in terror as you realize what he is planning. Before you can even think to make a move to stop him, the imp ");
        if (liveData.player.cocks[0].cockType == ENUM.CockType.HUMAN || liveData.player.cocks[0].cockType == ENUM.CockType.DEMON)
            GUI.outputText("shoves his shaft deeply into the slit in the head of your dick.  ");
        else if (liveData.player.hasKnot(0))
            GUI.outputText("finds the hole in the pointed head of your cock and plunges his shaft deeply into it, literally fucking your urethra.  ");
        else if (liveData.player.cocks[0].cockType == ENUM.CockType.HORSE)
            GUI.outputText("seats his dick in the flared head of your prick, and then pushes farther. His shaft plunges into yours, filling your cock more than any cum load ever could.  ");
        else if (liveData.player.cocks[0].cockType == ENUM.CockType.TENTACLE)
            GUI.outputText("shoves his dick deeply into the slit in the head of your vine-like cock.  ");
        //New PG
        GUI.outputText("<br><br>");
        GUI.outputText("He grips your cock tightly as he fucks you, treating you like a ");
        //Differing cocksleeve texts
        if (liveData.player.skinDesc == "fur")
            GUI.outputText("furry cock-sleeve");
        else {
            if (liveData.player.skinTone == "purple" || liveData.player.skinTone == "blue" || liveData.player.skinTone == "shiny black")
                GUI.outputText("demonic cock-sleeve");
            else
                GUI.outputText("human cock-sleeve");
        }
        //Bonus boob shake or period if no boobs.
        if (liveData.player.breastRows.length > 0 && liveData.player.biggestTitSize() > 2)
            GUI.outputText(", fucking you so hard that your " + liveData.player.allBreastsDescript() + " bounce with each thrust.  ");
        else
            GUI.outputText(".  ");
        GUI.outputText("It briefly crosses your mind that this should be painful, but something about either his lubrication or yours makes it comfortable enough to have you writhing in pleasure.  ");
        GUI.outputText("He thrusts roughly into you for several minutes, your hips bucking upward to meet him, ");
        if (liveData.player.cocks.length == 2)
            GUI.outputText("your other cock finding pleasure in rubbing against his body ");
        if (liveData.player.cocks.length > 2)
            GUI.outputText("your other cocks finding pleasure in rubbing against his body ");
        //Cum
        GUI.outputText("while copious amounts of sweat runs off of both your exposed forms, before he shivers and sinks deeply into you.  He cums hard, the heat of his demon seed burning your loins. His orgasm lasts longer than you think possible, forcing your own climax. Your seed mixes within your body, becoming more than you can handle and spilling out from your urethra around his intruding member.  ");
        //Extra cum-texts
        if (liveData.player.cocks.length == 2)
            GUI.outputText("Your other cock cums at the same time, liberally splattering your spunk up his back.  ");
        if (liveData.player.cocks.length > 2)
            GUI.outputText("The rest of your " + liveData.player.multiCockDescriptLight() + " twitch and release their seed at the same time, creating a shower of spunk that rains down on both you and the imp, coating both of your bodies.  ");
        if (liveData.player.biggestLactation() >= 1)
            GUI.outputText("At the same time, milk bursts from your " + liveData.player.nippleDescript(0) + "s, splattering him in the face.  You feel a sick sort of triumph as you get him back for cumming inside you.  ");
        //Vagoooz
        if (liveData.player.vaginas.length > 0)
            GUI.outputText("Your pussy quivers, contracting furiously as your orgasm hits you - like it's trying to milk a phantom dick dry.  ");
        //new PG
        GUI.outputText("Satisfied, his dick slides from you and he flies away as mixed seed continues to spill from your abused body. Your limbs grow weak, and you fall from the tree with a hard thud before losing consciousness.  ");
        //Take some damage
        // mainView.statsView.showStatDown( 'hp' ); Don't know how to show this. Might do it automatically?
        // hpDown.visible = true;
        liveData.player.HP -= 10;
        if (liveData.player.HP < 1)
            liveData.player.HP = 1;
        COMBAT.cleanupAfterCombat();
    }
}
export { Imp, ImpScene };
//# sourceMappingURL=imp.js.map