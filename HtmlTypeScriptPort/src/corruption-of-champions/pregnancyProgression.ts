// import { liveData } from "./globalVariables"
// import { FLAG } from "./flags/dataFlags"
// import * as ENUM from "./appearanceEnums"
// import { GUI } from "./engine/gui"
// import { AmilyScene } from "./scenes/npcs/amily"
// import { UTIL } from "./engine/utils"

// /*
//  This file contains the detailed code for handling player pregnancy, heat, and other things. pregnancy.js will still count down the pregnancy, but this holds everything else. Check time.js for how it is called.

//  */

// class PregnancyProgression {
//     statControl: number
//     buttStatControl: number

//     constructor() {
//         this.statControl = 0 // This prevents huge stat freakouts while pregnant
//         this.buttStatControl = 0 // This prevents huge stat freakouts while anal pregnant
//     }

//     updatePregnancy() {
//         var displayedUpdate = false

//         //GUI.outputText("Reached Pregnancy Loop.<br><br>");
//         // Player is pregnant with mice messages and transformations.
//         if (liveData.player.pregnancyType == ENUM.PregnancyType.AMILY) {
//             switch (liveData.player.pregnancyEventNum) {
//                 case 1:
//                     GUI.outputText(
//                         "<b>You wake up feeling bloated, and your belly is actually looking a little puffy. At the same time, though, you have the oddest cravings... you could really go for some mixed nuts. And maybe a little cheese, too.</b><br><br>"
//                     )
//                     displayedUpdate = true
//                     break
//                 case 2:
//                     GUI.outputText("<b>Your belly is getting more noticeably distended and squirming around.  You are probably pregnant.</b><br><br>")
//                     displayedUpdate = true
//                     break
//                 case 3:
//                     GUI.outputText("<b>There is no question you're pregnant; your belly is already as big as that of any pregnant woman back home. ")
//                     if (liveData.gameFlags[FLAG.AMILY_FOLLOWER] == 1) GUI.outputText('  Amily smiles at you reassuringly. "<i>We do have litters, dear, this is normal.</i>"')
//                     GUI.outputText("</b><br><br>")
//                     if (this.statControl == 0) {
//                         liveData.player.modStats(["spe", -1])
//                         liveData.player.modStats(["lib", 1])
//                         liveData.player.modStats(["sen", 1])
//                         liveData.player.changeLust(2)
//                         this.statControl++
//                     }
//                     displayedUpdate = true
//                     break
//                 case 4:
//                     GUI.outputText("<b>The sudden impact of a tiny kick from inside your distended womb startles you.  Moments later it happens again, making you gasp.</b><br><br>")
//                     displayedUpdate = true
//                     break
//                 case 5:
//                     GUI.outputText("<b>You feel (and look) hugely pregnant, now, but you feel content. You know the, ah, 'father' of these children loves you, and they will love you in turn.</b><br><br>")
//                     displayedUpdate = true
//                     break
//                 case 6:
//                     GUI.outputText("<b>You jolt from the sensation of squirming inside your swollen stomach. Fortunately, it dies down quickly, but you know for a fact that you felt more than one baby kicking inside you.</b><br><br>")
//                     if (this.statControl == 1) {
//                         liveData.player.modStats(["spe", -3])
//                         liveData.player.modStats(["lib", 1])
//                         liveData.player.modStats(["sen", 1])
//                         liveData.player.changeLust(4)
//                         this.statControl++
//                     }
//                     displayedUpdate = true
//                     break
//                 case 7:
//                     GUI.outputText("<b>The children kick and squirm frequently. Your bladder, stomach and lungs all feel very squished. You're glad that they'll be coming out of you soon.</b><br><br>")
//                     break
//                 default:
//             }

//             // Fill player's breasts with milk when knocked up by Amily.
//             if (liveData.player.pregnancyEventNum >= 5 && liveData.player.pregnancyEventNum <= 8) {
//                 // GUI.outputText("<b>Reached Tit Growth Amily Loop</b><br><br>");
//                 if (liveData.player.biggestTitSize() >= 3 && liveData.player.mostBreastsPerRow() > 1 && liveData.player.biggestLactation() >= 1 && liveData.player.biggestLactation() < 2) {
//                     GUI.outputText("Your breasts feel swollen with all the extra milk they're accumulating.<br><br>")
//                     liveData.player.boostLactation(0.5)
//                 }
//                 if (liveData.player.biggestTitSize() >= 3 && liveData.player.mostBreastsPerRow() > 1 && liveData.player.biggestLactation() > 0 && liveData.player.biggestLactation() < 1) {
//                     GUI.outputText("Drops of breastmilk escape your nipples as your body prepares for the coming birth.<br><br>")
//                     liveData.player.boostLactation(0.5)
//                 }
//                 if (liveData.player.biggestTitSize() >= 3 && liveData.player.mostBreastsPerRow() > 1 && liveData.player.biggestLactation() == 0) {
//                     GUI.outputText("<b>You realize your breasts feel full, and occasionally lactate</b>.  It must be due to the pregnancy.<br><br>")
//                     liveData.player.boostLactation(1)
//                 }
//                 if (liveData.player.biggestTitSize() == 2 && liveData.player.mostBreastsPerRow() > 1) {
//                     GUI.outputText("<b>Your breasts have swollen to C-cups,</b> in light of your coming pregnancy.<br><br>")
//                     liveData.player.growTits(1, 1, false, 3)
//                 }
//                 if (liveData.player.biggestTitSize() == 1 && liveData.player.mostBreastsPerRow() > 1) {
//                     GUI.outputText("<b>Your breasts have grown to B-cups,</b> likely due to the hormonal changes of your pregnancy.<br>")
//                     liveData.player.growTits(1, 1, false, 3)
//                 }
//             }

//             // Player giving birth to Amily's babies
//             //Amily failsafes to convert pure Amily babies to mouse babies under certain circumstances.

//             // if (liveData.player.pregnancyIncubation == 0 && liveData.player.pregnancyType == ENUM.PregnancyType.AMILY) {
//             //     this.statControl = 0 // Reset stat controller
//             //     if (liveData.gameFlags[FLAG.AMILY_FOLLOWER] == 2 || liveData.gameFlags[FLAG.AMILY_CORRUPTION_PATH] > 0) liveData.player.knockUpForce(ENUM.PregnancyType.MOUSE, liveData.player.pregnancyIncubationFlag)
//             //     if (liveData.gameFlags[FLAG.AMILY_VISITING_URTA] == 1 || liveData.gameFlags[FLAG.AMILY_VISITING_URTA] == 2) liveData.player.knockUpForce(ENUM.PregnancyType.MOUSE, liveData.player.pregnancyIncubationFlag)
//             //     //if (prison.inPrison) player.knockUpForce(PregnancyStore.PREGNANCY_MOUSE, player.pregnancyIncubation);
//             // }

//             //Give birth to pure Amily's kids
//             if (liveData.player.pregnancyIncubation == 0 && liveData.player.pregnancyType == ENUM.PregnancyType.AMILY) {
//                 liveData.player.boostLactation(0.01)
//                 GUI.outputText("<br>")
//                 if (liveData.player.vaginas.length == 0) {
//                     GUI.outputText("You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  <b>You look down and behold a new vagina</b>.  ")
//                     liveData.player.createVagina()
//                     liveData.player.genderCheck()
//                 }

//                 AmilyScene.pcBirthsAmilysKidsQuestVersion()
//                 liveData.player.cuntChange(60, true, true, false)
//                 if (liveData.player.vaginas[0].vaginalWetness == ENUM.VaginalWetnessType.DRY) liveData.player.vaginas[0].vaginalWetness++
//                 liveData.player.orgasm()
//                 liveData.player.modStats(["str", -1], ["tou", -2], ["spe", 3], ["lib", 1], ["sen", 0.5])
//                 displayedUpdate = true
//                 GUI.outputText("<br><br>")
//                 liveData.player.knockUpForce(0, 0) //Clear Pregnancy
//                 displayedUpdate = true
//             }

//             //Give birth to generic mice and Jojo's / Joy's babies
//             /*
//             if (player.pregnancyIncubation == 1 && (player.pregnancyType == PregnancyStore.PREGNANCY_MOUSE || player.pregnancyType == PregnancyStore.PREGNANCY_JOJO)) {
//                 player.boostLactation(.01);
//                 GUI.outputText("<br>You wake up suddenly to strong pains and pressures in your gut. As your eyes shoot wide open, you look down to see your belly absurdly full and distended. You can feel movement underneath the skin, and watch as it is pushed out in many places, roiling and squirming in disturbing ways. The feelings you get from inside are just as disconcerting. You count not one, but many little things moving around inside you. There are so many, you can't keep track of them.<br><br>", false);
//                 if (player.vaginas.length == 0) {
//                     GUI.outputText("You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  <b>You look down and behold a new vagina</b>.  ", false);
//                     player.createVagina();
//                     player.genderCheck();
//                 }

//             //Main Text here
//             if (player.pregnancyType == PregnancyStore.PREGNANCY_JOJO && (getGame().monk < 0 || flags[kFLAGS.JOJO_BIMBO_STATE] >= 3) && !prison.inPrison) {
//             if (flags[kFLAGS.JOJO_BIMBO_STATE] >= 3) {
//             kGAMECLASS.joyScene.playerGivesBirthToJoyBabies();
//             return true;
//             }
//             else kGAMECLASS.jojoScene.giveBirthToPureJojoBabies();
//             }
//             else {
//             GUI.outputText("Pain shoots through you as they pull open your cervix forcefully. You grip the ground and pant and push as the pains of labor overwhelm you. You feel your hips being forceably widened by the collective mass of the creatures moving down your birth canal. You spread your legs wide, laying your head back with groans and cries of agony as little white figures begin to emerge from between the lips of your abused pussy. Large innocent eyes, even larger ears, cute little muzzles, long slender pink tails all appear as the figures emerge. Each could be no larger than six inches tall, but they seem as active and curious as if they were already developed children. <br><br>", false);
//             GUI.outputText("Two emerge, then four, eight... you lose track. They swarm your body, scrambling for your chest, and take turns suckling at your nipples. Milk does their bodies good, making them grow rapidly, defining their genders as the girls grow cute little breasts and get broader hips and the boys develop their little mouse cocks and feel their balls swell. Each stops suckling when they reach two feet tall, and once every last one of them has departed your sore, abused cunt and drunk their fill of your milk, they give you a few grateful nuzzles, then run off towards the forest, leaving you alone to recover.<br>", false);
//             }
//             player.knockUpForce(); //Clear Pregnancy
//             if (player.averageLactation() > 0 && player.averageLactation() < 5) {
//             GUI.outputText("Your [chest] won't seem to stop dribbling milk, lactating more heavily than before.", false);
//             player.boostLactation(.5);
//             }
//             player.cuntChange(60, true,true,false);
//             if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS_DRY) player.vaginas[0].vaginalWetness++;
//             if (player.gender == 1) player.gender = 3;
//             if (player.gender == 0) player.gender = 2;
//             player.orgasm();
//             dynStats("str", -1,"tou", -2, "spe", 3, "lib", 1, "sen", .5);
//             displayedUpdate = true;
//             //Butt increase
//             if (player.buttRating < 14 && UTIL.rand(2) == 0) {
//             if (player.buttRating < 10) {
//             player.buttRating++;
//             GUI.outputText("<br><br>You notice your " + player.buttDescript() + " feeling larger and plumper after the ordeal.", false);
//             }
//             //Big butts grow slower!
//             else if (player.buttRating < 14 && UTIL.rand(2) == 0) {
//             player.buttRating++;
//             GUI.outputText("<br><br>You notice your " + player.buttDescript() + " feeling larger and plumper after the ordeal.", false);
//             }
//             }
//             GUI.outputText("<br>", false);
//             }*/
//         }

//         //Imp Pregnancy!
//         if (liveData.player.pregnancyType == FLAG.PREGNANCY_IMP) {
//             var impStat1
//             var impStat2
//             if (liveData.player.pregnancyIncubation <= 336 * 60 && liveData.player.pregnancyIncubation >= 280 * 60) {
//                 GUI.outputText("<b>You realize your belly has gotten slightly larger.  Maybe you need to cut back on the strange food.</b><br><br>")
//                 displayedUpdate = true
//             }
//             if (liveData.player.pregnancyIncubation <= 280 * 60 && liveData.player.pregnancyIncubation >= 216 * 60) {
//                 GUI.outputText("<b>Your belly is getting more noticeably distended.   You are probably pregnant.</b><br><br>")
//                 displayedUpdate = true
//             }
//             if (liveData.player.pregnancyIncubation <= 216 * 60 && liveData.player.pregnancyIncubation >= 180 * 60) {
//                 GUI.outputText("<b>The unmistakable bulge of pregnancy is visible in your tummy.  ")
//                 if (liveData.player.cor < 40) GUI.outputText("You are distressed by your unwanted pregnancy, and your inability to force this thing out of you.</b><br><br>")
//                 if (liveData.player.cor >= 40 && liveData.player.cor < 75) GUI.outputText("Considering the size of the creatures you've fucked, you hope it doesn't hurt when it comes out.</b><br><br>")
//                 if (liveData.player.cor >= 75) GUI.outputText("You think dreamily about the monstrous cocks that have recently been fucking you, and hope that your offspring inherit such a pleasure tool.</b><br><br>")
//                 if (this.statControl == 0) {
//                     this.statControl = 1
//                     liveData.player.modStats(["spe", -1], ["lib", 1], ["sen", 1])
//                     liveData.player.changeLust(2)
//                     displayedUpdate = true
//                 }
//             }
//             if (liveData.player.pregnancyIncubation <= 180 * 60 && liveData.player.pregnancyIncubation >= 120 * 60) {
//                 GUI.outputText("<b>The sudden impact of a kick from inside your womb startles you.</b><br><br>")
//                 displayedUpdate = true
//             }
//             if (liveData.player.pregnancyIncubation <= 120 * 60 && liveData.player.pregnancyIncubation >= 72 * 60) {
//                 GUI.outputText("<b>Your ever-growing belly makes your pregnancy obvious for those around you.</b><br><br>")
//                 displayedUpdate = true
//             }
//             if (liveData.player.pregnancyIncubation <= 72 * 60 && liveData.player.pregnancyIncubation >= 48 * 60) {
//                 GUI.outputText("<b>Your belly is painfully distended, ")
//                 if (liveData.player.cor < 40) GUI.outputText("making it difficult to function.</b>")
//                 if (liveData.player.cor >= 40 && liveData.player.cor < 75) GUI.outputText("and you wonder how much longer you have to wait.</b>")
//                 if (liveData.player.cor >= 75) GUI.outputText("and you're eager to give birth, so you can get impregnated again by corrupted or monstrous cum filling out your eager womb.</b>")
//                 GUI.outputText("<br><br>")
//                 if (this.statControl == 1) {
//                     this.statControl = 2
//                     liveData.player.modStats(["spe", -3], ["lib", 1], ["sen", 1])
//                     liveData.player.changeLust(4)
//                     displayedUpdate = true
//                 }
//             }
//             if (liveData.player.pregnancyIncubation <= 48 * 60) {
//                 GUI.outputText("<b>You rub your hands over your bulging belly, lost in the sensations of motherhood.  ")
//                 if (liveData.player.cor < 40) GUI.outputText("Afterwards you feel somewhat disgusted with yourself.</b>")
//                 if (liveData.player.cor >= 40 && liveData.player.cor < 75) GUI.outputText("You estimate you'll give birth in the next few days.</b>")
//                 if (liveData.player.cor >= 75) GUI.outputText("You find yourself daydreaming about birthing demons repeatedly, each time being re-impregnated by your hordes of lusty adolescent children.</b>")
//                 GUI.outputText("<br><br>")
//                 displayedUpdate = true
//             }
//         }

//         //---------------
//         // IMP PREGNANCY
//         //--------------

//         if (liveData.player.pregnancyIncubation == 0 && liveData.player.pregnancyType == FLAG.PREGNANCY_IMP) {
//             this.statControl = 0
//             GUI.outputText("<br>")
//             //Add imp birth status - used to control frequency of night imp gangbag
//             //if (player.findStatusEffect(liveData.StatusEffects.BirthedImps) >= 0) player.addStatusValue(liveData.StatusEffects.BirthedImps,1,1);
//             //else player.createStatusEffect(liveData.StatusEffects.BirthedImps,1,0,0,0);
//             if (liveData.player.vaginas.length == 0) {
//                 GUI.outputText("You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  You look down and behold a vagina.  ")
//                 liveData.player.createVagina()
//                 liveData.player.genderCheck()
//             }
//             GUI.outputText("A sudden gush of fluids erupts from your vagina - your water just broke.  You grunt painfully as you feel wriggling and squirming inside your belly, muscle contractions forcing it downwards.  ")
//             if (liveData.player.cor < 50) GUI.outputText("You rue the day you encountered that hateful imp.  ")
//             GUI.outputText(
//                 "The pain begins to subside as your delivery continues... replaced with a building sensation of pleasure.  Arousal spikes through you as the contractions intensify, and as you feel something pass you have a tiny orgasm.<br><br>Yet you feel more within you, and the contractions spike again, pushing you to orgasm as you pass something else.  It repeats, over and over, nearly a dozen times you birth and orgasm.  After an eternity of procreation and pleasure, you sense your ordeal is over and collapse, unconscious."
//             )

//             if (liveData.player.vaginas[0].vaginalLooseness == ENUM.VaginalLoosenessType.TIGHT) liveData.player.vaginas[0].vaginalLooseness++
//             //50% chance
//             if (liveData.player.vaginas[0].vaginalLooseness < ENUM.VaginalLoosenessType.GAPING_WIDE && UTIL.rand(2) == 0) {
//                 liveData.player.vaginas[0].vaginalLooseness++
//                 GUI.outputText("<br><br><b>Your cunt is painfully stretched from the ordeal, permanently enlarged.</b>")
//             }

//             liveData.player.knockUpForce(0, 0) //Clear Pregnancy
//             GUI.outputText("<br><br>When you wake you find a large number of tiny imp tracks... and a spattering of cum on your clothes and body.  They must be born fully-formed.")
//             if (liveData.player.averageLactation() > 0 && liveData.player.averageLactation() < 5) {
//                 GUI.outputText("  Your breasts won't seem to stop dribbling milk, lactating more heavily than before.")
//                 liveData.player.boostLactation(0.5)
//             }
//             //Lactate if large && not lactating
//             if (liveData.player.biggestTitSize() >= 3 && liveData.player.mostBreastsPerRow() > 1 && liveData.player.averageLactation() == 0) {
//                 GUI.outputText("  As you ponder the implications, <b>you realize your breasts have been slowly lactating</b>.  You wonder how much longer it will be before they stop.")
//                 liveData.player.boostLactation(1)
//             }
//             liveData.player.boostLactation(0.01)
//             //Enlarge if too small for lactation
//             if (liveData.player.biggestTitSize() == 2 && liveData.player.mostBreastsPerRow() > 1) {
//                 GUI.outputText("  <b>Your breasts have grown to C-cups!</b>")
//                 liveData.player.growTits(1, 1, false, 3)
//             }
//             //Enlarge if really small!
//             if (liveData.player.biggestTitSize() == 1 && liveData.player.mostBreastsPerRow() > 1) {
//                 GUI.outputText("  <b>Your breasts have grown to B-cups!</b>")
//                 liveData.player.growTits(1, 1, false, 3)
//             }
//             if (liveData.player.vaginas[0].vaginalWetness == ENUM.VaginalWetnessType.DRY) liveData.player.vaginas[0].vaginalWetness++
//             if (liveData.player.gender == 1) liveData.player.gender = 3
//             if (liveData.player.gender == 0) liveData.player.gender = 2
//             liveData.player.orgasm()
//             liveData.player.modStats(["tou", -2], ["spe", 2], ["lib", 1], ["sen", 0.5], ["cor", 7])
//             if (liveData.player.buttRating < 10 && UTIL.rand(2) == 0) {
//                 liveData.player.buttRating++
//                 GUI.outputText("<br><br>You notice your " + liveData.player.buttDescript() + " feeling larger and plumper after the ordeal.")
//             } else if (liveData.player.hipRating < 10) {
//                 liveData.player.hipRating++
//                 GUI.outputText("<br><br>After the birth your " + liveData.player.armor.equipmentName + " fits a bit more snugly about your " + liveData.player.hipDescript() + ".")
//             }
//             GUI.outputText("<br>")
//             displayedUpdate = true
//         }

//         //-------------------
//         // BEE PREGNANCY
//         //-------------------
//         if (liveData.player.buttPregnancyType == FLAG.PREGNANCY_BEE_EGGS) {
//             if (liveData.player.buttPregnancyIncubation <= 36 * 60 && liveData.player.buttPregnancyIncubation >= 20 * 60) {
//                 GUI.outputText("<b><br>You feel bloated, your bowels shifting uncomfortably from time to time.</b><br><br>")
//                 displayedUpdate = true
//             }
//             if (liveData.player.buttPregnancyIncubation <= 20 * 60) {
//                 GUI.outputText("<b><br>A honey-scented fluid drips from your rectum.</b>  At first it worries you, but as the smell fills the air around you, you realize anything with such a beautiful scent must be good.  ")
//                 if (liveData.player.cockTotal() > 0) GUI.outputText("The aroma seems to permeate your very being, slowly congregating in your ")
//                 if (liveData.player.cockTotal() == 1) {
//                     GUI.outputText(liveData.player.cockDescript(0))
//                     if (liveData.player.countCocksOfType(ENUM.CockType.HORSE) == 1)
//                         GUI.outputText(", each inhalation making it bigger, harder, and firmer.  You suck in huge lungfuls of air, until your " + liveData.player.cockDescript(0) + " is twitching and dripping, the flare swollen and purple.  ")
//                     if (liveData.player.dogCocks() == 1)
//                         GUI.outputText(
//                             ", each inhalation making it thicker, harder, and firmer.  You suck in huge lungfuls of air, desperate for more, until your " + liveData.player.cockDescript(0) + " is twitching and dripping, its knot swollen to the max.  "
//                         )
//                     if (liveData.player.countCocksOfType(ENUM.CockType.HUMAN) == 1)
//                         GUI.outputText(", each inhalation making it bigger, harder, and firmer.  You suck in huge lungfuls of air, until your " + liveData.player.cockDescript(0) + " is twitching and dripping, the head swollen and purple.  ")
//                     //FAILSAFE FOR NEW COCKS
//                     if (liveData.player.countCocksOfType(ENUM.CockType.HUMAN) == 0 && liveData.player.dogCocks() == 0 && liveData.player.countCocksOfType(ENUM.CockType.HORSE) == 0)
//                         GUI.outputText(", each inhalation making it bigger, harder, and firmer.  You suck in huge lungfuls of air until your " + liveData.player.cockDescript(0) + " is twitching and dripping.  ")
//                 }
//                 if (liveData.player.cockTotal() > 1)
//                     GUI.outputText(
//                         "groin.  Your " +
//                             liveData.player.multiCockDescriptLight() +
//                             " fill and grow with every lungful of the stuff you breathe in.  You suck in great lungfuls of the tainted air, desperate for more, your cocks twitching and dripping with need.  "
//                     )
//                 GUI.outputText("You smile knowing you couldn't stop from masturbating if you wanted to.<br><br>")
//                 if (this.buttStatControl == 0) {
//                     this.buttStatControl = 1
//                     liveData.player.dynStats(["int", -0.5])
//                     liveData.player.changeLust(500)
//                 }
//                 displayedUpdate = true
//             }
//         }

//         if (liveData.player.buttPregnancyIncubation == 0 && liveData.player.buttPregnancyType == FLAG.PREGNANCY_BEE_EGGS) {
//             GUI.outputText("<br>")
//             GUI.outputText("There is a sudden gush of honey-colored fluids from your ass.  Before panic can set in, a wonderful scent overtakes you, making everything ok.  ")
//             if (liveData.player.cockTotal() > 0) GUI.outputText("The muzzy feeling that fills your head seems to seep downwards, making your equipment hard and tight.  ")
//             if (liveData.player.vaginas.length > 0) GUI.outputText("Your " + liveData.player.vaginaDescript(0) + " becomes engorged and sensitive.  ")
//             GUI.outputText(
//                 "Your hand darts down to the amber, scooping up a handful of the sticky stuff.  You wonder what your hand is doing as it brings it up to your mouth, which instinctively opens.  You shudder in revulsion as you swallow the sweet-tasting stuff, your mind briefly wondering why it would do that.  The stuff seems to radiate warmth, quickly pushing those nagging thoughts away as you scoop up more.<br><br>"
//             )
//             GUI.outputText(
//                 "A sudden slip from below surprises you; a white sphere escapes from your anus along with another squirt of honey.  Your drugged brain tries to understand what's happening, but it gives up, your hands idly slathering honey over your loins.  The next orb pops out moments later, forcing a startled moan from your mouth.  That felt GOOD.  You begin masturbating to the thought of laying more eggs... yes, that's what those are.  You nearly cum as egg number three squeezes out.  "
//             )
//             if (liveData.player.averageLactation() >= 1 && liveData.player.biggestTitSize() > 2)
//                 GUI.outputText(
//                     "Seeking even greater sensation, your hands gather the honey and massage it into your " +
//                         liveData.player.breastDescript(0) +
//                         ", slowly working up to your nipples.  Milk immediately begins pouring out from the attention, flooding your chest with warmth.  "
//                 )
//             GUI.outputText("Each egg seems to come out closer on the heels of the one before, and each time your conscious mind loses more of its ability to do anything but masturbate and wallow in honey.<br><br>")
//             GUI.outputText(
//                 "Some time later, your mind begins to return, brought to wakefulness by an incredibly loud buzzing...  You sit up and see a pile of dozens of eggs resting in a puddle of sticky honey.  Most are empty, but a few have hundreds of honey-bees emptying from them, joining the massive swarms above you.  "
//             )
//             if (liveData.player.cor < 35) GUI.outputText("You are disgusted, but glad you were not stung during the ordeal.  You stagger away and find a brook to wash out your mouth with.")
//             if (liveData.player.cor >= 35 && liveData.player.cor < 65) GUI.outputText("You are amazed you could lay so many eggs, and while the act was strange there was something definitely arousing about it.")
//             if (liveData.player.cor >= 65 && liveData.player.cor < 90) GUI.outputText("You stretch languidly, noting that most of the drugged honey is gone.  Maybe you can find the Bee again and remember to bottle it next time.")
//             if (liveData.player.cor >= 90) GUI.outputText("You lick your lips, savoring the honeyed residue on them as you admire your thousands of children.  If only every night could be like this...<br>")
//             this.buttStatControl = 0
//             liveData.player.buttKnockUpForce() //Clear Butt Pregnancy
//             liveData.player.orgasm()
//             liveData.player.dynStats(["int", 1], ["lib", 4], ["sen", 3])
//             if (liveData.player.buttChange(20, true)) GUI.outputText("<br>")
//             if (liveData.player.buttRating < 17) {
//                 //Guaranteed increase up to level 10
//                 if (liveData.player.buttRating < 13) {
//                     liveData.player.buttRating++
//                     GUI.outputText("<br>You notice your " + liveData.player.buttDescript() + " feeling larger and plumper after the ordeal.")
//                 }
//                 //Big butts only increase 50% of the time.
//                 else if (UTIL.rand(2) == 0) {
//                     liveData.player.buttRating++
//                     GUI.outputText("<br>You notice your " + liveData.player.buttDescript() + " feeling larger and plumper after the ordeal.")
//                 }
//             }
//             GUI.outputText("<br>")
//             displayedUpdate = true
//         }

//         //---------------
//         // GOO PREGNANCY
//         // --------------
//         if (liveData.player.pregnancyType == ENUM.PregnancyType.GOO_GIRL && liveData.player.pregnancyIncubation == 0) {
//             liveData.gameFlags[FLAG.GOOGIRL_BIRTHS]++
//             GUI.outputText("<br>")
//             if (liveData.player.vaginas.length == 0) {
//                 GUI.outputText("You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  You look down and behold a vagina.  ")
//                 liveData.player.createVagina()
//                 liveData.player.genderCheck()
//             }
//             GUI.outputText(
//                 "There is a lurching in your belly that steals the breath from you. As seconds pass, the quivering kicks increase and you're forced to the ground as your womb feels like it's been set aflame by the heat pouring from your stowaway goo-girl. You pant and spread your labia with two fingers, the chill of your hands on your inflamed sex so sweet that you almost cum from the mere touch. Your cervix clenches involuntarily and you try to relax as much as possible, but the slime inside of you hardly needs the help. Squishing and slurping in gouts of syrupy fluid, she trickles from your uterus, sliding out of your tunnel in spurting gouts. You sigh and let her force her seething warmth from within you, the small puddle of ooze growing larger as it pools together. Finally, the small, red heart pops out of your tunnel and you allow yourself a big gulp of chill air to resuscitate your seared lungs.<br><br>"
//             )
//             liveData.monster = new GooGirl() //because if we don't, the gooColor4() goes crazy.
//             GUI.outputText(
//                 "The small " +
//                     liveData.monster.gooColor4() +
//                     " sludge quivers, but seems unable to take a human shape. Extending pseudopods, it experimentally prods at your skin, trying to gets its bearings. You shiver as the goo slides over your flesh, poking you wetly from time to time. When it finds your breasts, the goo works up your mounds and slurps at your teats, milk filling the blob with a creamy tint that makes it larger and gives its membrane a firmer texture. It takes about ten minutes to flop its way across your entire body before sliding off of you and wriggling at your feet. It shifts again, but this time, manages to form a featureless head. Slowly, gradually, it adds more, morphing shoulders, arms, a waist, and even hips. Her body ripples and the blank slime morphs into a perfect miniature copy of you! It stares up at its mother with a happy expression before lurching away, toward the lake. Even though you were just her incubator and template, you can't help but feel a little pride at your goo child entering the wild world with a fearless sense of exploration."
//             )
//             liveData.player.changeLust(50)
//             liveData.player.knockUpForce(0, 0)
//         }

//         //---------------
//         // SANDTRAP PREGNANCY
//         //-------------

//         if (liveData.player.buttPregnancyIncubation <= 1 && liveData.player.buttPregnancyType == ENUM.PregnancyType.SANDTRAP_FERTILE) {
//             SandTrapScene.birfSandTarps()
//             liveData.player.buttKnockUpForce() //Clear Butt Pregnancy
//             if (liveData.player.buttRating < 17) {
//                 //Guaranteed increase up to level 10
//                 if (liveData.player.buttRating < 13) {
//                     liveData.player.buttRating++
//                     GUI.outputText("<br>You notice your " + liveData.player.buttDescript() + " feeling larger and plumper after the ordeal.<br>")
//                 }
//                 //Big butts only increase 50% of the time.
//                 else if (UTIL.rand(2) == 0) {
//                     liveData.player.buttRating++
//                     GUI.outputText("<br>You notice your " + liveData.player.buttDescript() + " feeling larger and plumper after the ordeal.<br>")
//                 }
//             }
//             //displayedUpdate = true;
//         }

//         GUI.doNext(liveData.playerMenu)
//         //GUI.doNext(Camp.doCamp);
//     }
// }

// export { PregnancyProgression }
