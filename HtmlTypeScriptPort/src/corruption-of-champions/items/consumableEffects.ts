import { liveData, ENUM, UTIL, GUI, FLAG, Data, Camp, COMBAT, ReductoMenu, Inventory } from 'coc';

Data.addToGameFlags(FLAG.TIMES_TRANSFORMED, FLAG.HAIR_GROWTH_STOPPED_BECAUSE_LIZARD);

abstract class ConsumableEffects {
  //Fish Fillet
  static fishFillet() {
    GUI.clearOutput();
    if (!COMBAT.inCombat)
      GUI.outputText(
        "You sit down and unwrap your fish fillet. It's perfectly flaky, allowing you to break it off in bite-sized chunks.  The salty meal disappears quickly, and your stomach gives an appreciative gurgle.",
      );
    //(In combat?)
    else
      GUI.outputText(
        'You produce the fish fillet from your bag.  Rather than unwrap it and savor the taste as you normally would, you take a large bite out of it, leaf wrapping and all.  In no time your salty meal is gone, your stomach giving an appreciative gurgle.  ',
      );
    //Blew up factory
    if (liveData.gameFlags[FLAG.FACTORY_SHUTDOWN] == 2) liveData.player.modStats(['cor', 0.5]);
    //Turned off factory
    else if (liveData.gameFlags[FLAG.FACTORY_SHUTDOWN] == 1) liveData.player.modStats(['cor', -0.1]);
    //Normal
    else liveData.player.modStats(['cor', 0.1]);
    //Increase HP by quite a bit!)
    liveData.player.changeHP(Math.round(liveData.player.maxHP() * 0.25), true);
    liveData.player.refillHunger(30);
  }

  //Lactaid
  static lactaid() {
    liveData.player.slimeFeed();
    let i = 0;
    GUI.outputText('You gulp down the bottle of lactaid, easily swallowing the creamy liquid.');
    //Bump up size!
    if (liveData.player.averageBreastSize() < 8) {
      GUI.outputText('<br><br>');
      if (liveData.player.breastRows.length == 1) liveData.player.growTits(1 + UTIL.rand(5), 1, true, 1);
      else liveData.player.growTits(1 + UTIL.rand(2), liveData.player.breastRows.length, true, 1);
    }
    //Player doesn't lactate
    if (liveData.player.biggestLactation() < 1) {
      GUI.outputText('<br><br>');
      GUI.outputText(
        'You feel your ' +
          liveData.player.nippleDescript(0) +
          's become tight and engorged.  A single droplet of milk escapes each, rolling down the curves of your breasts.  <b>You are now lactating!</b>',
      );
      for (i = 0; i < liveData.player.breastRows.length; i++) {
        liveData.player.breastRows[i].lactationMultiplier += 2;
      }
    }
    //Boost lactation
    else {
      GUI.outputText('<br><br>');
      GUI.outputText('Milk leaks from your ' + liveData.player.nippleDescript(0) + "s in thick streams.  You're lactating even more!");
      for (i = 0; i < liveData.player.breastRows.length; i++) {
        liveData.player.breastRows[i].lactationMultiplier += 1 + UTIL.rand(10) / 10;
      }
    }
    liveData.player.changeLust(10);
    if (UTIL.rand(3) == 0) {
      GUI.outputText(liveData.player.modFem(95, 1));
    }
  }

  //Lust Draft
  static lustDraft(fuck: boolean): void {
    liveData.player.slimeFeed();
    GUI.outputText('You drink the ');
    if (fuck) GUI.outputText('red');
    else GUI.outputText('pink');
    GUI.outputText(' potion, and its unnatural warmth immediately flows to your groin. ');
    liveData.player.changeLust(30 + UTIL.rand(liveData.player.lib / 10), true, false, false);

    //Heat/Rut for those that can have them if "fuck draft"
    // TODO: commented out below; verify if any way to implement
    // if (fuck) {
    //     //Try to go into intense heat.
    //     liveData.player.goIntoHeat(true, 2)
    //     //Males go into rut
    //     liveData.player.goIntoRut(true)
    // }
    //ORGAZMO
    if (liveData.player.lust >= liveData.player.maxLust() && !COMBAT.inCombat) {
      GUI.outputText(
        '<br><br>The arousal from the potion overwhelms your senses and causes you to spontaneously orgasm.  You rip off your ' +
          liveData.player.armor.equipmentName +
          ' and look down as your ',
      );
      if (liveData.player.cocks.length > 0) {
        GUI.outputText(liveData.player.multiCockDescriptLight() + ' erupts in front of you, liberally spraying the ground around you.  ');
      }
      if (liveData.player.cocks.length > 0 && liveData.player.vaginas.length > 0) {
        GUI.outputText('At the same time your ');
      }
      if (liveData.player.vaginas.length > 0) {
        GUI.outputText(liveData.player.vaginaDescript(0) + ' soaks your thighs.  ');
      }
      if (liveData.player.gender == 0) GUI.outputText('body begins to quiver with orgasmic bliss.  ');
      GUI.outputText(
        "Once you've had a chance to calm down, you notice that the explosion of pleasure you just experienced has rocked you to your core.  You are a little hornier than you were before.",
      );
      //increase player libido, and maybe sensitivity too?
      liveData.player.orgasm();
      liveData.player.modStats(['lib', 2], ['sen', 1]);
    }
    if (liveData.player.lust > liveData.player.maxLust()) liveData.player.lust = liveData.player.maxLust();
    GUI.outputText('<br><br>');
    liveData.player.refillHunger(5);
  }

  //Vitality Tincture
  static vitalityTincture() {
    liveData.player.slimeFeed();
    GUI.outputText(
      'You down the contents of the bottle. The liquid is thick and tastes remarkably like cherries. Within moments, you feel much more fit and healthy.',
    );
    //Strength changes
    let temp = UTIL.rand(3);
    liveData.player.modStats(['str', temp]);
    //Guaranteed toughness if no str
    if (temp == 0) {
      temp = UTIL.rand(3);
      if (temp == 0) temp = 1;
    } else temp = UTIL.rand(3);
    //tou change
    liveData.player.modStats(['tou', temp]);
    //Chance of fitness change
    if (liveData.player.HP < liveData.player.maxHP()) {
      liveData.player.changeHP(50, true);
      GUI.outputText(' Any aches, pains and bruises you have suffered no longer hurt and you feel much better.');
    }
    if (UTIL.rand(3) == 0) GUI.outputText(liveData.player.modTone(95, 3));
    liveData.player.refillHunger(10);
  }

  //Scholar's Tea
  static scholarsTea() {
    liveData.player.slimeFeed();
    GUI.outputText(
      "Following the merchant's instructions, you steep and drink the tea. Its sharp taste fires up your palate and in moments, you find yourself more alert and insightful. As your mind wanders, a creative, if somewhat sordid, story comes to mind. It is a shame that you do not have writing implements as you feel you could make a coin or two off what you have conceived. The strange seller was not lying about the power of the tea.",
    );
    if (UTIL.rand(3) == 0) GUI.outputText(liveData.player.modTone(15, 1));
    //Now NERFED!
    if (liveData.player.inte < 40) liveData.player.modStats(['int', 1.5 + UTIL.rand(4)]);
    else if (liveData.player.inte < 60) liveData.player.modStats(['int', 1 + UTIL.rand(3)]);
    else if (liveData.player.inte < 80) liveData.player.modStats(['int', 0.5 + UTIL.rand(2)]);
    else liveData.player.modStats(['int', 0.2 + UTIL.rand(2)]);
    liveData.player.refillHunger(10);
  }

  //Hair Dyes
  static hairDye(newColor: string) {
    if (liveData.player.hairLength == 0) {
      GUI.outputText('You rub the dye into your bald head, but it has no effect.');
    } else if (liveData.player.hairColor.indexOf('rubbery') != -1 || liveData.player.hairColor.indexOf('latex-textured') != -1) {
      GUI.outputText(
        'You massage the dye into your ' + liveData.player.hairDescript() + ' but the dye cannot penetrate the impermeable material your hair is composed of.',
      );
    } else {
      GUI.outputText(
        'You rub the dye into your ' + liveData.player.hairDescript() + ', then use a bucket of cool lakewater to rinse clean a few minutes later. ',
      );
      liveData.player.hairColor = newColor;
      GUI.outputText('You now have ' + liveData.player.hairDescript() + '.');
      if (liveData.player.lust > 50) {
        GUI.outputText('<br><br>The cool water calms your urges somewhat, letting you think more clearly. ');
        liveData.player.changeLust(-15, true);
      }
    }
  }

  //Skin Oils
  static skinOil(newColor: string) {
    if (liveData.player.skinTone == newColor) {
      GUI.outputText(
        'You ' +
          liveData.player.clothedOrNaked('take a second to disrobe before uncorking the bottle of oil and rubbing', 'uncork the bottle of oil and rub') +
          " the smooth liquid across your body. Once you've finished you feel rejuvenated. ",
      );
      liveData.player.changeFatigue(-10, true);
    } else {
      if (liveData.player.skinType != 3) liveData.player.skinTone = newColor;
      switch (liveData.player.skinType) {
        case 0: //Plain
          GUI.outputText(
            'You ' +
              liveData.player.clothedOrNaked('take a second to disrobe before uncorking the bottle of oil and rubbing', 'uncork the bottle of oil and rub') +
              " the smooth liquid across your body. Even before you've covered your arms and [chest] your skin begins to tingle pleasantly all over. After your skin darkens a little, it begins to change until you have " +
              newColor +
              ' skin.',
          );
          break;
        case 1: //Fur
          GUI.outputText(
            '' +
              liveData.player.clothedOrNaked("Once you've disrobed you take the oil and", 'You take the oil and') +
              " begin massaging it into your skin despite yourself being covered with fur. Once you've finished... nothing happens. Then your skin begins to tingle and soon you part your fur to reveal " +
              newColor +
              ' skin.',
          );
          break;
        case 2: //Scales
          GUI.outputText(
            'You ' +
              liveData.player.clothedOrNaked('take a second to disrobe before uncorking the bottle of oil and rubbing', 'uncork the bottle of oil and rub') +
              " the smooth liquid across your body. Even before you've covered your arms and [chest] your scaly skin begins to tingle pleasantly all over. After your skin darkens a little, it begins to change until you have " +
              newColor +
              ' skin.',
          );
          break;
        case 3: //Goo
          GUI.outputText(
            'You take the oil and pour the contents into your skin. The clear liquid dissolves, leaving your gooey skin unchanged. You do feel a little less thirsty though.',
          );
          liveData.player.slimeFeed();
          break;
        default:
          GUI.outputText(
            'You ' +
              liveData.player.clothedOrNaked('take a second to disrobe before uncorking the bottle of oil and rubbing', 'uncork the bottle of oil and rub') +
              " the smooth liquid across your body. Even before you've covered your arms and [chest] your skin begins to tingle pleasantly all over. After your skin darkens a little, it begins to change until you have " +
              newColor +
              ' skin.',
          );
      }
    }
  }

  //Body Lotions
  static bodyLotion(newAdj: string) {
    if (liveData.player.skinTone == newAdj) {
      GUI.outputText(
        'You ' +
          liveData.player.clothedOrNaked('take a second to disrobe before uncorking the flask of lotion and rubbing', 'uncork the flask of lotion and rub') +
          ' the ' +
          this.liquidDesc(newAdj) +
          " across your body. Once you've finished you feel reinvigorated. ",
      );
      liveData.player.changeHP(10, true);
    } else {
      if (liveData.player.skinType != 3) {
        //If skin is goo, don't change.
        if (newAdj != 'clear') liveData.player.skinAdj = newAdj;
        else liveData.player.skinAdj = '';
      }
      switch (liveData.player.skinType) {
        case 0: //Plain
          GUI.outputText(
            'You ' +
              liveData.player.clothedOrNaked(
                'take a second to disrobe before uncorking the flask of lotion and rubbing',
                'uncork the flask of lotion and rub',
              ) +
              ' the ' +
              this.liquidDesc(newAdj) +
              ' across your body. As you rub the mixture into your arms and [chest], your whole body begins to tingle pleasantly. ',
          );
          switch (newAdj) {
            case 'smooth':
              GUI.outputText('Soon your skin is smoother but in a natural healthy way.');
              break;
            case 'rough':
              GUI.outputText("Soon your skin is rougher as if you've just finished a long day's work.");
              break;
            case 'sexy':
              GUI.outputText('Soon your skin is so sexy you find it hard to keep your hands off yourself.');
              break;
            case 'clear':
              GUI.outputText('Soon the natural beauty of your ' + liveData.player.skinFurScales() + ' is revealed without anything extra or unnecessary.');
              break;
            default:
              //Failsafe
              GUI.outputText('<b>This text should not happen. Please let Kitteh6660 know.</b>');
          }
          break;
        case 1: //Fur
          GUI.outputText(
            '' +
              liveData.player.clothedOrNaked("Once you've disrobed you take the lotion and", 'You take the lotion and') +
              " begin massaging it into your skin despite yourself being covered with fur. It takes little effort but once you've finished... nothing happens. A few moments pass and then your skin begins to tingle. ",
          );
          switch (newAdj) {
            case 'smooth':
              GUI.outputText('Soon you part your fur to reveal smooth skin that still appears natural.');
              break;
            case 'rough':
              GUI.outputText('Soon you part your fur to reveal rough skin that still appears natural.');
              break;
            case 'sexy':
              GUI.outputText('Soon you part your fur to reveal sexy skin that makes you want to kiss yourself.');
              break;
            case 'clear':
              GUI.outputText('Soon you part your fur to reveal the natural beauty of your ' + liveData.player.skinFurScales() + ' skin.');
              break;
            default:
              //Failsafe
              GUI.outputText('<b>This text should not happen. Please let Kitteh6660 know.</b>');
          }
          break;
        case 2: //Scales
          GUI.outputText(
            'You ' +
              liveData.player.clothedOrNaked(
                'take a second to disrobe before uncorking the flask of lotion and rubbing',
                'uncork the flask of lotion and rub',
              ) +
              ' the ' +
              this.liquidDesc(newAdj) +
              ' across your body. As you rub the mixture into your arms and [chest], your whole body begins to tingle pleasantly.',
          );
          switch (newAdj) {
            case 'smooth':
              GUI.outputText('Soon you part your fur to reveal smooth skin that still appears natural.');
              break;
            case 'rough':
              GUI.outputText('Soon you part your fur to reveal rough skin that still appears natural.');
              break;
            case 'sexy':
              GUI.outputText('Soon you part your fur to reveal sexy skin that makes you want to kiss yourself.');
              break;
            case 'clear':
              GUI.outputText('Soon you part your fur to reveal the natural beauty of your ' + liveData.player.skinFurScales() + ' skin.');
              break;
            default:
              //Failsafe
              GUI.outputText('<b>This text should not happen. Please let Kitteh6660 know.</b>');
          }
          break;
        case 3: //Goo
          GUI.outputText(
            'You take the lotion and pour the ' +
              this.liquidDesc(newAdj) +
              ' into yourself. The concoction dissolves, leaving your gooey epidermis unchanged. As a matter of fact nothing happens at all. Except that you do feel a bit reinvigorated. ',
          );
          liveData.player.changeHP(10, true);
          break;
        default:
          GUI.outputText(
            'You ' +
              liveData.player.clothedOrNaked('take a second to disrobe before uncorking the bottle of oil and rubbing', 'uncork the bottle of oil and rub') +
              " the smooth liquid across your body. Even before you've covered your arms and [chest] your skin begins to tingle pleasantly all over. After your skin darkens a little, it begins to change until you have " +
              newAdj +
              ' skin.',
          );
      }
    }
  }

  //TODO: Move to a better place.
  static liquidDesc(_adj: string) {
    let liquidDesc = '';
    let liquidArrays: string[] = [];
    switch (_adj) {
      case 'smooth':
        liquidArrays = ['smooth liquid', 'thick cream'];
        break;
      case 'rough':
        liquidArrays = ['abrasive goop', 'rough textured goop'];
        break;
      case 'sexy':
        liquidArrays = ['smooth liquid', 'attractive cream', 'beautiful cream'];
        break;
      case 'clear':
        liquidArrays = ['smooth liquid', 'thick cream'];
        break;
      default:
        //Failsafe
        liquidArrays = ['liquid', 'cream'];
    }
    liquidDesc = liquidArrays[UTIL.rand(liquidArrays.length)];
    return liquidDesc;
  }

  //Tattered Scroll
  static tatteredScroll() {
    GUI.outputText(
      'Your wobbly ' +
        liveData.player.legs() +
        " give out underneath you as your body's willpower seems to evaporate, your mouth reading the words on the scroll with a backwards sounding sing-song voice.<br><br>",
    );

    if (liveData.player.hairColor == 'sandy blonde') {
      GUI.outputText('Your mouth forms a smile of its own volition, reading, "<i>Tresed eht retaw llahs klim ruoy.</i>"<br><br>');
      if (liveData.player.breastRows.length == 0 || liveData.player.biggestTitSize() == 0) {
        GUI.outputText('You grow a perfectly rounded pair of C-cup breasts!  ');
        if (liveData.player.breastRows.length == 0) liveData.player.createBreastRow();
        liveData.player.breastRows[0].breasts = 2;
        liveData.player.breastRows[0].breastRating = 3;
        if (liveData.player.breastRows[0].nipplesPerBreast < 1) liveData.player.breastRows[0].nipplesPerBreast = 1;
        liveData.player.dynStats(['sen', 2]);
        liveData.player.changeLust(1);
      }
      if (liveData.player.biggestTitSize() > 0 && liveData.player.biggestTitSize() < 3) {
        GUI.outputText('Your breasts suddenly balloon outwards, stopping as they reach a perfectly rounded C-cup.  ');
        liveData.player.breastRows[0].breastRating = 3;
        liveData.player.dynStats(['sen', 1]);
        liveData.player.changeLust(1);
      }
      if (liveData.player.averageNipplesPerBreast() < 1) {
        GUI.outputText('A dark spot appears on each breast, rapidly forming into a sensitive nipple.  ');
        let temp = liveData.player.breastRows.length;
        while (temp > 0) {
          temp--;
          //If that breast didnt have nipples reset length
          if (liveData.player.breastRows[0].nipplesPerBreast < 1) liveData.player.breastRows[0].nippleLength = 0.2;
          liveData.player.breastRows[0].nipplesPerBreast = 1;
        }
        liveData.player.dynStats(['sen', 2]);
        liveData.player.changeLust(1);
      }
      if (liveData.player.biggestLactation() > 0) {
        GUI.outputText('A strong pressure builds in your chest, painful in its intensity.  You yank down your top as ');
        if (liveData.player.biggestLactation() < 2)
          GUI.outputText(
            'powerful jets of milk spray from your nipples, spraying thick streams over the ground.  You moan at the sensation and squeeze your tits, hosing down the tainted earth with an offering of your milk.  You blush as the milk ends, quite embarassed with your increased milk production.  ',
          );
        if (liveData.player.biggestLactation() >= 2 && liveData.player.biggestLactation() <= 2.6)
          GUI.outputText(
            'eruptions of milk squirt from your nipples, hosing thick streams everywhere.  The feeling of the constant gush of fluids is very erotic, and you feel yourself getting more and more turned on.  You start squeezing your breasts as the flow diminishes, anxious to continue the pleasure, but eventually all good things come to an end.  ',
          );
        if (liveData.player.biggestLactation() > 2.6 && liveData.player.biggestLactation() < 3)
          GUI.outputText(
            "thick hoses of milk erupt from your aching nipples, forming puddles on the ground.  You smile at how well you're feeding the earth, your milk coating the ground faster than it can be absorbed.  The constant lactation is pleasurable... in a highly erotic way, and you find yourself moaning and pulling on your nipples, your hands completely out of control.  In time you realize the milk has stopped, and even had time to soak into the dirt.  You wonder at your strange thoughts and pull your hands from your sensitive nipples.  ",
          );

        if (liveData.player.biggestLactation() >= 3)
          GUI.outputText(
            "you drop to your knees and grab your nipples.  With a very sexual moan you begin milking yourself, hosing out huge quantities of milk.  You pant and grunt, offering as much of your milk as you can.  It cascades down a hill in a small stream, and you can't help but blush with pride... and lust.  The erotic pleasures build as you do your best to feed the ground all of your milk.  You ride the edge of orgasm for an eternity, milk everywhere.  When you come to, you realize you're kneeling there, tugging your dry nipples.  Embarrassed, you stop, but your arousal remains.  ",
          );
        if (liveData.player.biggestLactation() < 3) {
          liveData.player.boostLactation(0.7);
          GUI.outputText('Your breasts feel fuller... riper... like your next milking could be even bigger.  ');
        }
        liveData.player.dynStats(['lib', 1], ['sen', 4]);
        liveData.player.changeLust(15);
      }
      if (liveData.player.biggestLactation() == 0) {
        GUI.outputText(
          'A pleasurable release suddenly erupts from your nipples!  Twin streams of milk are spraying from your breasts, soaking into the ground immediately.  It stops all too soon, though a voice in your head assures you that you can lactate quite often now.  ',
        );
        liveData.player.boostLactation(1);
        liveData.player.dynStats(['lib', 0.5], ['sen', 1]);
        liveData.player.changeLust(10);
      }
      GUI.outputText('<br><br>Your mouth curls into a sick smile and, with a voice that isn\'t your own, speaks, "<i>I ALWAYS get what I want, dear...</i>"');
      GUI.doNext(Camp.returnToCampUseOneHour);
    } else {
      GUI.outputText(
        'Your mouth forms a smile of its own volition, reading, "<i>nuf erutuf rof riah ydnas, nus tresed eht sa ydnas.</i>"<br><br>You feel a tingling in your scalp, and realize your hair has become a sandy blonde!',
      );
      liveData.player.hairColor = 'sandy blonde';
      GUI.outputText('<br><br>Your mouth curls with a sick smile, speaking with a voice that isn\'t your own, "<i>I ALWAYS get what I want, dear...</i>"');
      GUI.doNext(Camp.returnToCampUseOneHour);
    }
    // Using Tattered Scroll in Combat
    /*
        if (!kGAMECLASS.COMBAT.inCombat) {
        //RAEP
        spriteSelect(50);
        GUI.outputText("<br><br>You hear the soft impact of clothes hitting the ground behind you, and turn to see that the sand witch has found you! You cannot resist a peek at your uninvited guest, beholding a curvy dark-skinned beauty, her form dominated by a quartet of lactating breasts.  Somewhere in your lust-fogged mind you register the top two as something close to double-Ds, and her lower pair to be about Cs.  She smiles and leans over you, pushing you to the ground violently.<br><br>She turns around and drops, planting her slick honey-pot firmly against your mouth.  Her scent is strong, overpowering in its intensity.  Your tongue darts out for a taste and finds a treasure trove of sticky sweetness.  Instinctively you tongue-fuck her, greedily devouring her cunny-juice, shoving your tongue in as far as possible while suckling her clit.  Dimly you feel the milk spattering over you, splashing off you and into the cracked earth.  Everywhere the milk touches feels silky smooth and sensitive, and your hands begin stroking your body, rubbing it in as the witch sprays more and more of it.  You lose track of time, orgasming many times, slick and sticky with sexual fluids.", false);
        liveData.player.orgasm();
        dynStats("lib", 1, "sen", 5);
        liveData.player.slimeFeed();
        }*/
  }

  // Black Book
  static blackSpellbook() {
    GUI.outputText(
      "You open the small black book, and discover it to be an instructional book on the use of black magic.  Most of it is filled with generic information about black magic - how it is drawn from emotions (typically lust), and how it has the power to affect bodies and emotions.  It also warns against using it on oneself, as it is difficult to draw on your emotions while meddling with your own body.  In no time at all you've read the whole thing, but it disappears into thin air before you can put it away.",
    );
    if (liveData.player.inte < 30) {
      GUI.outputText('<br><br>You feel greatly enlightened by your time spent reading.');
      liveData.player.dynStats(['int', 4]);
    } else if (liveData.player.inte < 60) {
      GUI.outputText('<br><br>Spending some time reading was probably good for you, and you definitely feel smarter for it.');
      liveData.player.dynStats(['int', 2]);
    } else if (liveData.player.inte < 80) {
      GUI.outputText('<br><br>After reading the small tome your already quick mind feels invigorated.');
      liveData.player.dynStats(['int', 1]);
    } else {
      GUI.outputText('<br><br>The contents of the book did little for your already considerable intellect.');
      liveData.player.dynStats(['int', 0.6]);
    }
    //Smart enough for arouse and doesnt have it
    if (liveData.player.inte >= 25 && !liveData.player.spells.arouse) {
      GUI.outputText('<br><br>You blink in surprise, assaulted by the knowledge of a <b>new spell: Arouse.</b>');
      liveData.player.spells.arouse = true;
      return;
    }
    //Smart enough for arouse and doesnt have it
    if (liveData.player.inte >= 30 && !liveData.player.spells.heal) {
      GUI.outputText('<br><br>You blink in surprise, assaulted by the knowledge of a <b>new spell: Heal.</b>');
      liveData.player.spells.heal = true;
      return;
    }
    //Smart enough for arouse and doesnt have it
    if (liveData.player.inte >= 40 && !liveData.player.spells.might) {
      GUI.outputText('<br><br>You blink in surprise, assaulted by the knowledge of a <b>new spell: Might.</b>');
      liveData.player.spells.might = true;
    }
  }

  // White Book
  static whiteSpellBook() {
    GUI.outputText(
      "You open the white tome, and discover it to be an instructional book on the use of white magic.  Most of it is filled with generic information about white magic - how it is drawn for mental focus, is difficult to use when tired or aroused, and can be used to create and control energy.  In no time at all you've read the whole thing, but it disappears into thin air before you can put it away.",
    );
    if (liveData.player.inte < 30) {
      GUI.outputText('<br><br>You feel greatly enlightened by your time spent reading.');
      liveData.player.dynStats(['int', 4]);
    } else if (liveData.player.inte < 60) {
      GUI.outputText('<br><br>Spending some time reading was probably good for you, and you definitely feel smarter for it.');
      liveData.player.dynStats(['int', 2]);
    } else if (liveData.player.inte < 80) {
      GUI.outputText('<br><br>After reading the small tome your already quick mind feels invigorated.');
      liveData.player.dynStats(['int', 1]);
    } else {
      GUI.outputText('<br><br>The contents of the book did little for your already considerable intellect.');
      liveData.player.dynStats(['int', 0.6]);
    }
    //Smart enough for arouse and doesnt have it
    if (liveData.player.inte >= 25 && !liveData.player.spells.chargeWeapon) {
      GUI.outputText('<br><br>You blink in surprise, assaulted by the knowledge of a <b>new spell: Charge Weapon.</b>');
      liveData.player.spells.chargeWeapon = true;
      return;
    }
    //Smart enough for arouse and doesnt have it
    if (liveData.player.inte >= 30 && !liveData.player.spells.chargeWeapon) {
      GUI.outputText('<br><br>You blink in surprise, assaulted by the knowledge of a <b>new spell: Blind.</b>');
      liveData.player.spells.blind = true;
      return;
    }
    //Smart enough for arouse and doesnt have it
    if (liveData.player.inte >= 40 && !liveData.player.spells.whitefire) {
      GUI.outputText('<br><br>You blink in surprise, assaulted by the knowledge of a <b>new spell: Whitefire.</b>');
      liveData.player.spells.whitefire = true;
    }
  }

  // Minotaur Cum
  static minotaurCum(purified: boolean): void {
    liveData.player.slimeFeed();
    GUI.clearOutput();
    //Minotaur cum addiction
    if (!purified) liveData.player.minoCumAddiction(7);
    else liveData.player.minoCumAddiction(-2);
    GUI.outputText('As soon as you crack the seal on the bottled white fluid, a ');
    if (liveData.gameFlags[FLAG.MINOTAUR_CUM_ADDICTION_STATE] == 0 && liveData.player.findPerk(liveData.PerkLib.MinotaurCumResistance) < 0)
      GUI.outputText('potent musk washes over you.');
    else GUI.outputText('heavenly scent fills your nostrils.');
    if (!purified) {
      if (liveData.gameFlags[FLAG.MINOTAUR_CUM_ADDICTION_TRACKER] < 50) GUI.outputText('  It makes you feel dizzy, ditzy, and placid.');
      else GUI.outputText('  It makes you feel euphoric, happy, and willing to do ANYTHING to keep feeling this way.');
    } else GUI.outputText("  You know that the bottle is purified and you're positive you won't get any addiction from this bottle.");
    GUI.outputText('  Unbidden, your hand brings the bottle to your lips, and the heady taste fills your mouth as you convulsively swallow the entire bottle.');
    //-Raises lust by 10.
    //-Raises sensitivity
    liveData.player.dynStats(['sen', 1]);
    liveData.player.changeLust(10);
    //-Raises corruption by 1 to 50, then by .5 to 75, then by .25 to 100.
    if (!purified) {
      if (liveData.player.cor < 50) liveData.player.dynStats(['cor', 1]);
      else if (liveData.player.cor < 75) liveData.player.dynStats(['cor', 0.5]);
      else liveData.player.dynStats(['cor', 0.25]);
    }
    GUI.outputText(
      '<br><br>Intermittent waves of numbness wash through your body, turning into a warm tingling that makes you feel sensitive all over.  The warmth flows through you, converging in your loins and bubbling up into lust.',
    );
    if (liveData.player.cocks.length > 0) {
      GUI.outputText('  ');
      if (liveData.player.cockTotal() == 1) GUI.outputText('Y');
      else GUI.outputText('Each of y');
      GUI.outputText('our ' + liveData.player.multiCockDescriptLight() + " aches, flooding with blood until it's bloating and trembling.");
    }
    if (liveData.player.hasVagina()) {
      GUI.outputText('  Your ' + liveData.player.clitDescript() + ' engorges, ');
      if (liveData.player.clitLength < 3) GUI.outputText('parting your lips.');
      else GUI.outputText('bursting free of your lips and bobbing under its own weight.');
      if (liveData.player.vaginas[0].vaginalWetness <= ENUM.VaginalWetnessType.NORMAL)
        GUI.outputText('  Wetness builds inside you as your ' + liveData.player.vaginaDescript(0) + ' tingles and aches to be filled.');
      else if (liveData.player.vaginas[0].vaginalWetness <= ENUM.VaginalWetnessType.SLICK)
        GUI.outputText('  A trickle of wetness escapes your ' + liveData.player.vaginaDescript(0) + ' as your body reacts to the desire burning inside you.');
      else if (liveData.player.vaginas[0].vaginalWetness <= ENUM.VaginalWetnessType.DROOLING)
        GUI.outputText('  Wet fluids leak down your thighs as your body reacts to this new stimulus.');
      else GUI.outputText('  Slick fluids soak your thighs as your body reacts to this new stimulus.');
    }
    //(Minotaur fantasy)
    if (!COMBAT.inCombat() == true && UTIL.rand(10) == 1 && !purified && liveData.player.findPerk(liveData.PerkLib.MinotaurCumResistance) < 0) {
      GUI.outputText(
        "<br><br>Your eyes flutter closed for a second as a fantasy violates your mind.  You're on your knees, prostrate before a minotaur.  Its narcotic scent fills the air around you, and you're swaying back and forth with your belly already sloshing and full of spunk.  Its equine-like member is rubbing over your face, and you submit to the beast, stretching your jaw wide to take its sweaty, glistening girth inside you.  Your tongue quivers happily as you begin sucking and slurping, swallowing each drop of pre-cum you entice from the beastly erection.  Gurgling happily, you give yourself to your inhuman master for a chance to swallow into unthinking bliss.",
      );
      liveData.player.dynStats(['lib', 1]);
      liveData.player.changeLust(UTIL.rand(5) + liveData.player.cor / 20 + liveData.gameFlags[FLAG.MINOTAUR_CUM_ADDICTION_TRACKER] / 5);
    }
    //(Healing – if hurt and uber-addicted (hasperk))
    if (liveData.player.HP < liveData.player.maxHP() && liveData.player.findPerk(liveData.PerkLib.MinotaurCumAddict) >= 0) {
      GUI.outputText('<br><br>The fire of your arousal consumes your body, leaving vitality in its wake.  You feel much better!');
      liveData.player.changeHP(liveData.player.maxHP() / 4, false);
    }
    //Uber-addicted status!
    if (liveData.player.findPerk(liveData.PerkLib.MinotaurCumAddict) >= 0 && liveData.gameFlags[FLAG.MINOTAUR_CUM_REALLY_ADDICTED_STATE] <= 0 && !purified) {
      liveData.gameFlags[FLAG.MINOTAUR_CUM_REALLY_ADDICTED_STATE] = 3 + UTIL.rand(2);
      GUI.outputText(
        '<br><br><b>Your body feels so amazing and sensitive.  Experimentally you pinch yourself and discover that even pain is turning you on!</b>',
      );
    }
    //Clear mind a bit
    if (purified && (liveData.player.findPerk(liveData.PerkLib.MinotaurCumAddict) >= 0 || liveData.gameFlags[FLAG.MINOTAUR_CUM_ADDICTION_TRACKER] >= 40)) {
      GUI.outputText(
        "<br><br>Your mind feels a bit clearer just from drinking the purified minotaur cum. Maybe if you drink more of these, you'll be able to rid yourself of your addiction?",
      );
      if (liveData.player.findPerk(liveData.PerkLib.MinotaurCumAddict) >= 0 && liveData.gameFlags[FLAG.MINOTAUR_CUM_ADDICTION_TRACKER] <= 50) {
        GUI.outputText(
          "  Suddenly, you black out and images flash in your mind about getting abducted by minotaurs and the abandonment of your quest that eventually leads to Lethice's success in taking over Mareth. No, it cannot be! You wake up and recover from the blackout, horrified to find out what would really happen if you spend the rest of your life with the Minotaurs! You shake your head and realize that you're no longer dependent on the cum.  ",
        );
        GUI.outputText('<br><b>(Lost Perk: Minotaur Cum Addict!)</b>');
        liveData.player.removePerk(liveData.PerkLib.MinotaurCumAddict);
      }
    }
    liveData.player.refillHunger(25);
  }

  static reductoMenu() {
    GUI.menu();
    if (liveData.player.balls > 0 && liveData.player.ballSize > 1) GUI.addButton(0, 'Balls', ReductoMenu.reductoBalls);
    if (liveData.player.breastRows.length > 0 && liveData.player.biggestTitSize() > 0) GUI.addButton(1, 'Breasts', ReductoMenu.reductoBreasts);
    if (liveData.player.buttRating > 1) GUI.addButton(2, 'Butt', ReductoMenu.reductoButt);
    if (liveData.player.vaginas.length > 0 && liveData.player.clitLength > 0.25) GUI.addButton(3, 'Clit', ReductoMenu.reductoClit);
    if (liveData.player.cockTotal() > 0 && liveData.player.biggestCockArea() > 6) GUI.addButton(4, 'Cock', ReductoMenu.reductoCock);
    if (liveData.player.hipRating > 2) GUI.addButton(5, 'Hips', ReductoMenu.reductoHips);
    if (liveData.player.nippleLength > 0.25) GUI.addButton(6, 'Nipples', ReductoMenu.reductoNipples);
    if (liveData.player.horns > 2) GUI.addButton(7, 'Horns', ReductoMenu.shrinkHorns);
    GUI.addButton(14, 'Nevermind', ReductoMenu.cancelReducto);
    GUI.clearOutput();
    GUI.outputText('You ponder the paste in your hand and wonder what part of your body you would like to shrink.  What will you use it on?');
  }

  static oviElixir() {
    if (liveData.player.hasVagina() == false) {
      GUI.outputText('You pop the cork and prepare to drink the stuff, but the smell nearly makes you gag.  You cork it hastily.<br><br>');
      Inventory.takeItem(liveData.Items.Consumables.OviElixir);
      return false;
    }
    //Oviposition Elixir!
    /* Notes on liveData.StatusEffects.Eggs
        v1 = egg type.
        v2 = size - 0 for normal, 1 for large
        v3 = quantity
        EGG TYPES-
        0 - brown - ass expansion
        1 - purple - hip expansion
        2 - blue - vaginal removal and/or growth of existing maleness
        3 - pink - dick removal and/or fertility increase.
        4 - white - breast growth.  If lactating increases lactation.
        5 - rubbery black
        */
    liveData.player.slimeFeed();
    GUI.outputText("You pop the cork and gulp down the thick greenish fluid.  The taste is unusual and unlike anything you've tasted before.");
    if (liveData.player.pregnancyType == ENUM.PregnancyType.GOO_STUFFED) {
      GUI.outputText(
        "<br><br>For a moment you feel even more bloated than you already are.  That feeling is soon replaced by a dull throbbing pain.  It seems that with Valeria's goo filling your womb the ovielixir is unable to work its magic on you.",
      );
      return false;
    }
    if (liveData.player.pregnancyType == ENUM.PregnancyType.WORM_STUFFED) {
      GUI.outputText(
        '<br><br>For a moment you feel even more bloated than you already are.  That feeling is soon replaced by a dull throbbing pain.  It seems that with the worms filling your womb the ovielixir is unable to work its magic on you.',
      );
      return false;
    }
    if (liveData.player.pregnancyIncubation == 0) {
      //If the player is not pregnant, get preggers with eggs!
      GUI.outputText(
        "<br><br>The elixir has an immediate effect on your belly, causing it to swell out slightly as if pregnant.  You guess you'll be laying eggs sometime soon!",
      );
      // liveData.player.knockUp(FLAG.PREGNANCY_OVIELIXIR_EGGS, ENUM.IncubationType.OVIELIXIR_EGGS, 1, 1)
      liveData.player.createStatusEffect(liveData.StatusEffects.Eggs, UTIL.rand(6), 0, UTIL.rand(3) + 5, 0);
      return false;
    }
    //Drinking multiple elixirs
    const changeOccurred = false;
    // TODO: (DMR) fix below after PREGNANCY_OVIELIXIR_EGGS is a proper number flag
    // if (liveData.player.pregnancyType == FLAG.PREGNANCY_OVIELIXIR_EGGS) {
    //     //If player already has eggs, chance of size increase!
    //     if (liveData.player.findStatusEffect(liveData.StatusEffects.Eggs) >= 0) {
    //         //If eggs are small, chance of increase!
    //         if (liveData.player.statusEffectValue(liveData.StatusEffects.Eggs, 2) == 0) {
    //             //1 in 2 chance!
    //             if (UTIL.rand(3) == 0) {
    //                 liveData.player.addStatusValue(liveData.StatusEffects.Eggs, 2, 1)
    //                 GUI.outputText("<br><br>Your pregnant belly suddenly feels heavier and more bloated than before.  You wonder what the elixir just did.")
    //                 changeOccurred = true
    //             }
    //         }
    //         //Chance of quantity increase!
    //         if (UTIL.rand(2) == 0) {
    //             GUI.outputText("<br><br>A rumble radiates from your uterus as it shifts uncomfortably and your belly gets a bit larger.")
    //             liveData.player.addStatusValue(liveData.StatusEffects.Eggs, 3, UTIL.rand(4) + 1)
    //             changeOccurred = true
    //         }
    //     }
    // }
    if (!changeOccurred && liveData.player.pregnancyIncubation > 20 && liveData.player.pregnancyType != ENUM.PregnancyType.BUNNY) {
      //If no changes, speed up pregnancy.
      GUI.outputText(
        '<br><br>You gasp as your pregnancy suddenly leaps forwards, your belly bulging outward a few inches as it gets closer to time for birthing.',
      );
      let newIncubation = liveData.player.pregnancyIncubation - (liveData.player.pregnancyIncubation * 0.3 + 10);
      if (newIncubation < 2) newIncubation = 2;
      liveData.player.knockUpForce(liveData.player.pregnancyType, newIncubation);
      //trace("Pregger Count New total:" + game.player.pregnancyIncubation);
    }
    return false;
  }
}

export { ConsumableEffects };
