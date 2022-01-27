import { liveData, ENUM, GUI, FLAG, Creature, Data, UTIL, Items, PerkLib, Camp, COMBAT } from 'coc';

// Merging Oasis and Demon Pack code into one file

Data.addToGameFlags(FLAG.OASIS_DEMONS_ACCEPT);

export class DemonPack extends Creature {
  constructor() {
    super();

    //Name and references
    this.a = 'the ';
    this.name = 'demons';
    this.refName = this.name;
    this.isAre = 'are';
    this.heShe = 'they';
    this.himHer = 'them';
    this.hisHer = 'their';
    this.plural = true;
    this.battleDesc =
      'The group is composed of roughly twenty tan-skinned demons, mostly humanoid in shape with many and varied corruptions across the mob. You see demonic high heels, twisting horns and swinging cocks of all shapes and sizes. There even seems to be a bull head in there somewhere. You also make out plenty of breasts ranging from tiny ones to a pair that requires a second person to carry them, and with those breasts a wide range of pussies, dripping and dry, sometimes nestled below some form of demonic dick.  The small tribe carries no weapons and what little clothing they wear is well-shredded, except for one hefty male wearing a cloak of what appears to be snakeskin across his broad shoulders.';
    // TODO Silly Code to add later + (liveData.silly ? "  You spot an odd patch that reads, \"<i>41st Engineer Company: Vaginal Clearance</i>\" on his shoulder." : "");";
    //Core stats
    this.str = 80;
    this.tou = 10;
    this.spe = 10;
    this.inte = 5;
    this.lib = 50;
    this.sens = 60;
    this.cor = 80;
    //Combat stats
    this.HP = this.maxHP();
    this.lust = 30;
    this.fatigue = 0;
    //Advancement
    this.level = 6;
    this.XP = 0;
    this.gems = UTIL.rand(25) + 10;
    //Battle variables
    this.weapon = Items.NOTHING;
    this.shield = Items.NOTHING;
    this.armor = Items.NOTHING;
    this.upperGarment = Items.NOTHING;
    this.lowerGarment = Items.NOTHING;
    this.accessory1 = Items.NOTHING;
    this.accessory2 = Items.NOTHING;
    this.weapon.equipmentName = 'claws';
    this.weapon.verb = 'claw';
    this.armor.equipmentName = 'demonic skin';
    this.bonusHP = 200;
    this.additionalXP = 0;
    this.lustVuln = 1;
    //this.temperment = TEMPERMENT_LOVE_GRAPPLES; TODO Temperment System

    this.drops = [];
    this.dropThresholds = [];

    //Appearance
    this.gender = 0; //0 genderless, 1 male, 2 female, 3 hermaphrodite
    this.tallness = UTIL.rand(8) + 70;
    this.skinTone = 'red';
    this.skinType = 0;
    this.skinAdj = '';
    this.skinDesc = 'skin';
    this.hairType = 0;
    this.hairColor = 'black';
    this.hairLength = 15;
    this.beardStyle = 0;
    this.beardLength = 0;
    this.furColor = '';

    //Head
    this.earType = 0;
    this.eyeType = 0;
    this.faceType = 0;
    this.tongueType = 0;
    //Body (This code section may be removed)
    this.lowerBody = 0;
    this.legCount = 2;
    this.armType = 0;
    //Extra parts (This code section may be removed)
    this.antennae = 0;
    this.hornType = ENUM.HornType.HORNS_DEMON;
    this.horns = 2;
    this.gills = false;
    this.tailType = ENUM.TailType.TAIL_TYPE_DEMONIC;
    this.tailVenom = 0;
    this.tailRecharge = 0;
    this.wingType = 0;

    this.femininity = 50;
    this.tone = 0;
    this.thickness = 0;
    this.hipRating = ENUM.HipRatingType.HIP_RATING_AMPLE + 2;
    this.buttRating = ENUM.ButtRatingType.BUTT_RATING_LARGE;

    //Sexual Characteristics
    //Cocks
    this.createCock(18, 2);
    this.createCock(18, 2, ENUM.CockType.DEMON);
    this.balls = 2;
    this.ballSize = 1;
    this.cumMultiplier = 3;
    //Vaginas
    this.createVagina(false, ENUM.VaginalWetnessType.VAGINA_WETNESS_SLICK, ENUM.VaginalLoosenessType.VAGINA_LOOSENESS_LOOSE);
    //Ass
    // this.ass = new Ass()
    this.ass.analLooseness = ENUM.AnalLoosenessType.ANAL_LOOSENESS_STRETCHED;
    this.ass.analWetness = ENUM.AnalWetnessType.ANAL_WETNESS_SLIME_DROOLING;
    //Breasts
    this.createBreastRow(0, 0);

    //Drops
    this.clearDrops(); //Need to be called before populating the item arrays.
    this.addDrop(Items.Consumables.SuccubiMilk, 25);
    this.addDrop(Items.Consumables.IncubiDraft, 25);
    this.addDrop(Items.Consumables.OviElixir, 25);
    this.addDrop(Items.Consumables.BlackBook, 25);

    //Victory/defeat
    this.victory = demonWin;
    this.defeat = demonLose;
  }

  override doAI() {
    if (UTIL.rand(2) == 0) this.packAttack();
    else this.lustAttack();
  }

  // PackAttack taken from Combat.as. Need to see if this is used elsewhere and see if it's worth it to generalize the function
  packAttack() {
    //Determine if dodged!
    if (liveData.player.spe - liveData.monster.spe > 0 && Math.random() * ((liveData.player.spe - liveData.monster.spe) / 4 + 80) > 80) {
      GUI.outputText('You duck, weave, and dodge.  Despite their best efforts, the throng of demons only hit the air and each other.');
    }
    //Determine if evaded
    else if (liveData.player.findPerk(PerkLib.Evade) >= 0 && UTIL.rand(100) < 10) {
      GUI.outputText('Using your skills at evading attacks, you anticipate and sidestep ' + liveData.monster.a + liveData.monster.name + "' attacks.");
    }
    //("Misdirection"
    else if (
      liveData.player.findPerk(PerkLib.Misdirection) >= 0 &&
      UTIL.rand(100) < 15 &&
      liveData.player.armor.equipmentName == 'red, high-society bodysuit'
    ) {
      GUI.outputText("Using Raphael's teachings, you anticipate and sidestep " + liveData.monster.a + liveData.monster.name + "' attacks.");
    }
    //Determine if cat'ed
    else if (liveData.player.findPerk(PerkLib.Flexibility) >= 0 && UTIL.rand(100) < 6) {
      GUI.outputText('With your incredible flexibility, you squeeze out of the way of ' + liveData.monster.a + liveData.monster.name + "' attacks.");
    } else {
      let temp = (liveData.monster.str + liveData.monster.weapon.attack) * (liveData.player.damagePercent() / 100); //Determine damage - str modified by enemy toughness!
      if (temp <= 0) {
        temp = 0;
        if (!liveData.monster.plural)
          GUI.outputText('You deflect and block every ' + liveData.monster.weapon.verb + ' ' + liveData.monster.a + liveData.monster.name + ' throw at you.');
        else GUI.outputText('You deflect ' + liveData.monster.a + liveData.monster.name + ' ' + liveData.monster.weapon.verb + '.');
      } else {
        if (temp <= 5) GUI.outputText('You are struck a glancing blow by ' + liveData.monster.a + liveData.monster.name + '! ');
        else if (temp <= 10) GUI.outputText(liveData.monster.a + liveData.monster.name + ' wound you! ');
        // else if (temp <= 20) GUI.outputText(liveData.monster.a + liveData.monster.name + " stagger you with the force of " + liveData.monster.pronoun3 + " " + liveData.monster.weapon.verb + "s! ")
        else
          GUI.outputText(liveData.monster.a + liveData.monster.name + ' <b>mutilates</b> you with powerful fists and ' + liveData.monster.weapon.verb + 's! ');
        liveData.player.changeHP(-temp, true);
      }
      //statScreenRefresh();
      GUI.outputText('<br>');
    }
    COMBAT.combatRoundOver();
  }

  lustAttack() {
    if (liveData.player.lust < 35) {
      GUI.outputText(
        'The ' +
          liveData.monster.name +
          ' press in close against you and although they fail to hit you with an attack, the sensation of their skin rubbing against yours feels highly erotic.',
      );
    } else if (liveData.player.lust < 65) {
      GUI.outputText('The push of the ' + liveData.monster.name + "' sweaty, seductive bodies sliding over yours is deliciously arousing and you feel your ");
      if (liveData.player.cocks.length > 0) GUI.outputText(liveData.player.multiCockDescriptLight() + ' hardening ');
      else if (liveData.player.vaginas.length > 0) GUI.outputText(liveData.player.vaginaDescript(0) + ' get wetter ');
      GUI.outputText('in response to all the friction.');
    } else {
      GUI.outputText(
        'As the ' +
          liveData.monster.name +
          ' mill around you, their bodies rub constantly over yours, and it becomes harder and harder to keep your thoughts on the fight or resist reaching out to touch a well lubricated cock or pussy as it slips past.  You keep subconsciously moving your ',
      );
      if (liveData.player.gender == 1) GUI.outputText(liveData.player.multiCockDescriptLight() + ' towards the nearest inviting hole.');
      if (liveData.player.gender == 2) GUI.outputText(liveData.player.vaginaDescript(0) + ' towards the nearest swinging cock.');
      if (liveData.player.gender == 3) GUI.outputText('aching cock and thirsty pussy towards the nearest thing willing to fuck it.');
      if (liveData.player.gender == 0) GUI.outputText('groin, before remember there is nothing there to caress.');
    }
    liveData.player.changeLust(10 + liveData.player.sens / 10);
    COMBAT.combatRoundOver();
  }
}

//------------
// SCENES
//------------

// Oasis Encounters Start
export function oasisEncounter() {
  // TODO spriteSelect(46);
  //Find oasis, sit there.
  GUI.outputText(
    'You wander in the desert for what seems like hours, sweating profusely in the sweltering heat. Eventually you come across a small watering hole surrounded by scrappy trees and shrubs. It would be foolish not to take this opportunity to drink, freshen up and paddle your ' +
      liveData.player.legs() +
      ' in the cooling water, so you settle into what little shade you can find for a quick break.<br><br>',
  );
  //Demons approach!
  GUI.outputText(
    'After a while sitting in the sparse shade provided by one of the bushes around the oasis you see figures shimmering into view across the desert sands.  As you watch the figures they grow more defined and more numerous until finally a group of vaguely humanoid shapes emerges from the heat haze.  The closer these figures become the more detail they take on, and as they near the edge of your small oasis you are able to make out most of their features.<br><br>',
  );
  //Describe the demonic group in detail
  GUI.outputText(
    "The group is composed of roughly twenty tan skinned demons, mostly humanoid in shape with many and varied corruptions across the group. You see demonic high heels, twisting horns and swinging cocks of all shapes and sizes. There even seems to be a bull head in there somewhere. You also make out plenty of breasts ranging from tiny ones to a pair that require a second person to carry them, and with those breasts a wide range of pussies, dripping and dry, sometimes nestled below some form of demonic dick. The small tribe carry no weapons and what little clothing they wear is well shredded, except for one hefty male wearing a cloak of what appears to be snakeskin across his broad shoulders. You assume from his clothing and the size of his equipment that this male is the leader. He, along with the others, is in good spirits and they all look fairly non-threatening, although you've learned not to trust anything that looks non-threatening in this place. Especially if it can carry its cock over its shoulder.<br><br>",
  );
  //OH noes! Cheese it!
  GUI.outputText(
    "The demons don't notice you until they are quite close, the glare of the surrounding sand making you very difficult to see in the shade of your scrappy bush. They ignore you, intent on the refreshing waters of the oasis, but you can't stay hidden forever. A small keen eyed demon eventually spots you and lets out a  cry of alarm, pointing you out to the others. More eyes than twenty heads should really possess are now pointed straight at you.<br><br><b>What do you do?</b>",
  );
  GUI.menu();
  GUI.addButton(0, 'Talk', oasisTalk);
  GUI.addButton(1, 'Fight', oasisFight);
  GUI.addButton(2, 'Run Away', oasisRunAway);
}

// Choose to fight the demons
export function oasisFight() {
  COMBAT.startCombat(new DemonPack());
  // TODO spriteSelect(46);
  liveData.playerMenu(); // TODO CHECK THIS
}

// Choose to run from the demons
export function oasisRunAway() {
  //TODO spriteSelect(46);
  //Run away successfully if fast enough.  80 speed = autosuccess.
  if (liveData.player.spe > 15 && liveData.player.spe / 2 > UTIL.rand(40)) {
    GUI.outputText(
      'You bolt out from under your bush and scramble away over the sand. Before long the swishing sounds of pursuit fade away and looking back you see the few demons with the gusto to follow you tramping back to the oasis.',
    );
    GUI.doNext(Camp.returnToCampUseOneHour);
  } else {
    GUI.outputText(
      'You scramble away from the demons, but are too late. A swift demon with canine features tackles you to the ground.  Luckily he loses his grip as you tumble onto the sand and you slither free, stand up and wheel to face the host of leering demons which begin to advance with malicious intent.',
    );
    COMBAT.startCombat(new DemonPack());
    GUI.doNext(liveData.playerMenu);
  }
}

//Talk with the Demons
export function oasisTalk() {
  //TODO spriteSelect(46);
  //Nice weather...
  GUI.outputText(
    "You rise cautiously from the shade of your scraggly little bush and look over the demons arrayed before you. Briefly you wonder how exactly conversations start in a desert oasis, before settling on 'nice weather we're having.' The reaction is mixed. Some laugh, some stare in utter confusion. The ludicrously endowed leader in the snakeskin cloak throws his head back and produces a deep, thundering laugh. When he regains his composure he brings his head back around to level a deadly smile full of sharp teeth in your direction. 'Yes,' he says '...nice.'<br><br>",
  );
  //Offer...
  GUI.outputText(
    "At this your repertoire of desert conversation topics is exhausted and it occurs to you that it may be easier to break the ice somewhere it is possible for ice to form. At the edge of slipping over into awkward silence the leader speaks. 'It is quite the strike of fortune that you would come to us just as we were to rest and feast. Perhaps you wish to partake with us?' A flash of panic runs over your mind, and you turn over the phrase a few times in your head. After a few seconds you conclude that 'partake with us' really cannot mean 'be a delicious entree' and entertain the thought of staying to feast.  As if sensing your hesitation the leader speaks again. \"<i>We have not feasted in a long time, and we do hunger for it so.  This one promises to be a feast of grand proportions, and it should be a shame for you to miss such an opportunity.</i>\"<br><br>",
  );
  GUI.outputText('<b>Do you stay or try to leave?</b>');
  GUI.menu();
  GUI.addButton(0, 'Stay', oasisTalkAccept);
  GUI.addButton(1, 'Leave', oasisTalkDecline);
}

// Decline Demon invitation
export function oasisTalkDecline() {
  //TODO spriteSelect(46);
  GUI.outputText(
    "You consider the invitation, but do your best to politely decline. The little giggle this produces in a small implike creature in the back of the group send chills down your spine and you turn to go, but as you do so you catch the eye of the leader. His grin has widened, as if he knows something that you do not. With a deliberate slowness he starts to chuckle, and your worst fears are confirmed when you hear the words 'Silly creature. The offer to feast is never denied. Take it alive and kicking.'<br><br>",
  );
  //MORTAL KOMBAAAAAT
  GUI.outputText('The demons begin to circle menacingly, and you can do nothing but prepare to defend yourself.');
  COMBAT.startCombat(new DemonPack());
  GUI.doNext(liveData.playerMenu);
}

//Accept Demon invitation
export function oasisTalkAccept() {
  //TODO spriteSelect(46);
  //You slut!
  GUI.outputText(
    "The leader smiles in genuine delight and excited chatter rises up from the group of demons. 'This is excellent. It has been so long since we last had one of your kind join us.' Behind him the demons begin to slide free of their tattered rags, hardening, dampening and licking their lips. As the leader steps forward to caress the curves and angles of your body you begin to suspect that the hunger this feast is to satisfy is not for food, but all that is forgotten as the demons swarm silently around you and you stumble back onto the hot sand, ",
  );
  if (liveData.player.isTaur()) GUI.outputText('your rear legs losing their balance and sending you crashing on your flank.  ');
  else GUI.outputText('legs falling open in the process.  ');
  GUI.outputText(
    'Suddenly the silence is broken by a shrill screeching laugh, then a howl and the movement of the demons begins to accelerate. The deep bass laugh of the demon leader breaks over you like a crashing wave and the demons shriek with frenzied lust as they take you on the sand of the oasis.',
  );
  //Count voluntary submissions
  liveData.gameFlags[FLAG.OASIS_DEMONS_ACCEPT]++;
  GUI.doNext(oasisSexing);
}

// Oasis Sex Scenes
export function oasisSexing() {
  //TODO spriteSelect(46);
  liveData.player.slimeFeed();
  //New screen
  GUI.clearOutput();
  //For manpartz
  if (liveData.player.cocks.length > 0) {
    GUI.outputText('You feel clawed hands grasp at ');
    if (liveData.player.cockTotal() > 1) GUI.outputText('each of ');
    GUI.outputText(
      'your ' + liveData.player.multiCockDescriptLight() + ' and begin to slide up and down before another demon pushes them out of the way and you ',
    );
    if (liveData.player.cocks[0].cockLength > 25)
      GUI.outputText(
        'feel your ' +
          liveData.player.cockDescript(0) +
          " slide into a hell-girl's sloppy cunt. The demoness moans and pants in pleasure as your " +
          liveData.player.cockDescript(0) +
          ' bottoms out in her gaping pussy and she begins to ride you like the motionless whore you momentarily are, her gigantic breasts threatening to concuss you as she slides the huge distance up and down your cock in her thirst to fill her cavelike cunt.  ',
      );
    else {
      GUI.outputText(
        'see a smaller and younger demon lowering her very tight pussy onto your ' +
          liveData.player.cockDescript(0) +
          ". It's a tight fit, but her almost-virginal pussy is dripping wet. She bottoms her pussy out ",
      );
      if (liveData.player.cocks[0].cockLength > 17) GUI.outputText('with hardly any of you inside her ');
      else if (liveData.player.cocks[0].cockLength > 12) GUI.outputText('about halfway down your ' + liveData.player.cockDescript(0) + ' ');
      else if (liveData.player.cocks[0].cockLength > 6) GUI.outputText('with almost all of you inside of her ');
      else if (liveData.player.cocks[0].cockLength <= 6) GUI.outputText('as her pussy lips touch the base of your ' + liveData.player.cockDescript(0) + ' ');
      GUI.outputText(
        'and begins to slide herself up and down your shaft in complete ecstasy, moaning like a cheap whore. She seems relatively uncorrupted for a denizen of this realm and is firm, tight and free of fur. Only a pair of horns betrays her taint. The thought that you are perhaps one of her first cocks sends tingles down your spine.  ',
      );
      if (liveData.player.cocks[0].cockLength > 6) {
        GUI.outputText(
          'The realisation that her pussy is slowly stretching over your ' +
            liveData.player.cockDescript(0) +
            ' gives you a thrill that can only be described as positively evil.  ',
        );
        liveData.player.dynStats(['cor', 1]);
      }
      GUI.outputText(
        'Soon the slender cock-whore begins to cum and she starts on what is about to be the first of several shuddering orgasms. You smile evilly as she cums around your ' +
          liveData.player.cockDescript(0) +
          ' and when her eyes roll back to the front of her head you know that there is more to come.  ',
      );
    }
    //Orgasmzzzzzzz
    GUI.outputText(
      "Soon you're shaking and pumping your seed deep into her pussy as she screams out one of her many orgasms and you cum deep inside her for the first time.  ",
    );
    //Multizz
    if (liveData.player.cocks.length > 1) {
      GUI.outputText('As you lie there under the needy demon your other ');
      if (liveData.player.cocks.length == 2) GUI.outputText(liveData.player.cockDescript(1) + ' is');
      else GUI.outputText('cocks are');
      GUI.outputText(' taken by other hands and other eager pussies ranging from painfully, childishly tight to freakishly huge!');
    }
    //IZ OVER FOR MENZ
    GUI.outputText('<br><br>');
  }
  //Girly bitz funtimes!
  if (liveData.player.vaginas.length > 0) {
    //Herms only!
    if (liveData.player.gender == 3)
      GUI.outputText('From your cock it is only a tiny trip downward between your legs before the demons discover something new to play with.  ');
    //Girlies only!
    else
      GUI.outputText(
        'The demons quickly find your ' +
          liveData.player.vaginaDescript(0) +
          ' and tussle eagerly for position at your entrance, first with hands and then with a wide range of demonic dicks.  ',
      );
    //gaping cunners!
    if (liveData.player.vaginas[0].vaginalLooseness >= ENUM.VaginalLoosenessType.VAGINA_LOOSENESS_CLOWN_CAR)
      GUI.outputText(
        'However all of this fighting for place is in vain, as the leader with the huge cock has already marked you for his own. The broad demon shoves the smaller ones roughly to the side at the sight of your freakishly large pussy and carefully lowers his gigantic dick to the entrance of your gargantuan fuck hole. Without pause or ceremony the leader plunges his enormous phallus into you and although it takes all the muscles in his body he begins to drive it back and forth, filling every possible inch of your ' +
          liveData.player.vaginaDescript(0) +
          ". You feel a curious pain that you've not felt in a long time and realize that your " +
          liveData.player.vaginaDescript(0) +
          ' is stretching around his frankly frightening tool. As he withdraws the walls spring back with a curious elasticity, and it occurs to you that it may not actually be possible to stretch further with any permanence. Before long the huge demon begins to shudder and shake and he cums. His trio of heavy balls pump load after load into your waiting cunt until your belly bulges and spunk begins to spurt back out of your pussy from the sheer amount of cum being loaded into you.',
      );
    //Not gaping!
    else {
      GUI.outputText(
        'Eventually one of the demons wins out and sets the tip of his hefty dog-cock at the entrance to your pussy. He rams his member into your ' +
          liveData.player.vaginaDescript(0) +
          ' with one swift thrust and begins to pump himself in and out of your cunt. However, the other demons will not be denied. You feel a pressure at your lips and without warning a second slightly smaller dick shoves itself into your already-stuffed ' +
          liveData.player.vaginaDescript(0) +
          '.  ',
      );
      //vaginal streeeetch
      liveData.player.cuntChange(40, true);
      GUI.outputText(
        'The two cocks pump you hard until you feel one of them shooting your ' +
          liveData.player.vaginaDescript(0) +
          ' full of hot demon cum. Eventually both the dicks release inside you and slip out one after the other, but each time another takes their place so that your pussy is never empty.',
      );
    }
    //Orgasmzzzzz
    GUI.outputText(
      '<br><br>The feeling of immense fullness gets better and better as the cum surging into your ' +
        liveData.player.vaginaDescript(0) +
        " fills any conceivable crevice not taken up by cock. Far beyond your own control now you come a hair's breadth from passing out as you feel the muscles of your " +
        liveData.player.vaginaDescript(0) +
        ' begin to clamp down again and again on the mass inside you.  Eventually the world begins to solidify again and it is with a sense of immense delight that upon your return from the borders of unconsciousness you find yourself still completely full of demonic dick, heralding many more orgasms of that quality to come.',
    );
    //IZ OVER! NEWLINE BITCH
    GUI.outputText('<br><br>');
    //Preggers chance!
    // liveData.player.knockUp(FLAG.PREGNANCY_IMP, FLAG.INCUBATION_IMP, 90) // TODO Check this. May be time to implement rest of pregnancy.
  }
  //Buttbutt buuuuuttt
  if (liveData.player.gender > 0) GUI.outputText('However, the demons are interested in every part of you, not just your crotch.  ');
  GUI.outputText(
    'Soon you feel hands and dicks grabbing and jabbing at your ' +
      liveData.player.buttDescript() +
      ', edging inwards bit by bit and jostling for position as a slippery cock positions itself at the opening of your ' +
      liveData.player.assholeDescript() +
      '. It pauses for a second and then dives straight into your waiting asshole.  ',
  );
  if (liveData.player.vaginas.length > 0)
    GUI.outputText(
      'You feel the cocks in your ass and pussy rubbing into each other as your lower body becomes a temple of friction. The feeling of so much demon stuffing you as full as possible is almost unbearable, and you are inches away from blacking out as you come again.  ',
    );
  GUI.outputText(
    "The cock fucks you hard and fast for a dozen strokes and then you feel it begin to pump its cum into your stuffed ass until it can't come any more. It slips out of your " +
      liveData.player.buttDescript() +
      ' and is quickly replaced by another which comes and then is itself replaced in what becomes a seemingly endless cycle.  ',
  );
  liveData.player.buttChange(liveData.monster.cockArea(0), true);
  //More fucking!
  GUI.outputText(
    "Around you you see the demons wrapped up in the frenzy of fucking that they've fallen into. No hole is unfilled and not a single cock isn't sunk into some being's flesh. The moans and screams are almost contagious and you feel them clouding your brain making you want more, harder.",
  );
  liveData.player.dynStats(['int', -1], ['lib', 1]);
  //Titzen!
  if (liveData.player.breastRows.length > 0) {
    if (liveData.player.biggestTitSize() > 1) {
      GUI.outputText(
        '  Demonic hands grab and squeeze at your ' +
          liveData.player.allBreastsDescript() +
          ' and lips fasten around your ' +
          liveData.player.nippleDescript(0) +
          " and begin to lick and suck like there's no tomorrow.",
      );
    }
  }
  //Newline for oral!
  GUI.outputText(
    "<br><br>Soon even your mouth is taken by a demoness lowering her slick honeypot down onto your lips. You lick and suck as she moans like a whore atop your head. It's impossible to count how many times she comes and so you just relax into a rhythm of licking and sucking, interrupted only by your own bone-creaking orgasms as the demonic attentions to the rest of your body drive you over the edge time and time again.",
  );
  //Non-preggers text!
  if (liveData.player.pregnancyIncubation == 0 && liveData.player.gender > 1) {
    //Newline for potential preggers?
    GUI.outputText('<br><br>');
    GUI.outputText(
      'You do your best to keep a vague mental catalogue of what has been in where, but eventually it becomes impossible to remember the type or number of demonic dicks that have filled you with their cum. The sand below your ass is wet with seed that has spilled out of your overflowing ' +
        liveData.player.vaginaDescript(0) +
        ' and there is every indication of more to come.<br><br>',
    );
  }
  //If you got here by winning combat!
  // if ((liveData.monster.HP < 1 || liveData.monster.lust >= liveData.monster.eMaxLust()) && COMBAT.inCombat()) {
  //     GUI.outputText(
  //         "You fuck and fuck until not a single demon is capable of servicing your needs. They lie moaning and panting at the edge of the oasis, unable to move. You survey the fallen fiends with just a touch of pride and a whole lot of satisfaction, your body feeling stronger for the endurance exercise."
  //     )
  //     COMBAT.cleanupAfterCombat()
  //     liveData.player.orgasm()
  //     liveData.player.dynStats(["cor", 1.5])
  //     return
  // }
  //If you got here by losing combat!
  else if ((liveData.player.HP < 1 || liveData.player.lust >= liveData.player.maxLust()) && COMBAT.inCombat()) {
    //►Oasis Demons Defeat PC as part of antm
    //Antmorph stuff //TODO Phylla Additional Stuff
    /*
            if (monster.findStatusEffect(StatusEffects.phyllafight) >= 0) {
            GUI.outputText("You sought to save the ant-girl from being raped, and looking around, you don't see her anywhere.  She must have gotten away safely.  Mission... accomplished?  Wait, that ungrateful little bitch just left you to suffer in her place!  Your ass is gonna be sore for a while, but not as sore as your pride...  ");
            flags[kFLAGS.ANTS_PC_FAILED_PHYLLA] = 1;
            }*/
    GUI.outputText(
      "The demons fuck you like animals until you can't come any more. Every one of your orifices is filled and you pump out orgasm after orgasm until you black out from the abuse.",
    );
    COMBAT.cleanupAfterCombat();
    liveData.player.orgasm();
    liveData.player.dynStats(['tou', 0.5], ['cor', 3]);
    return;
  }
  //If you submitted willingly - chance of bad end
  if (liveData.gameFlags[FLAG.OASIS_DEMONS_ACCEPT] >= 6 && liveData.player.hasVagina()) {
    GUI.doNext(oasisBadEnd);
    return;
  }
  GUI.outputText(
    "You fuck for hours; 'feasting' with the demons. Pain, pleasure and exhaustion intermingle and no matter how hard you try to cling to consciousness you are in no state to concentrate. You dangle over the edge for what seems like eternity before another orgasm, stronger than any other, hits you like a solid wall and you black out. For a little while you drift in and out of conscious reality to find your body still the object of demonic attentions until eventually you wake to find that the seemingly endless string of orgasms has stopped. Looking around you see what demons remain awake engaged solely in fucking each other. Tender and sore from the abuse and still finding it hard to concentrate you gather your clothes and steal away, leaving them to the tail end of their orgy. In the aftermath you feel like you've just run an endurance race, but the rubbed raw sensitivity of your brutally fucked body tells another tale.",
  );
  liveData.player.dynStats(['tou', 0.5], ['sen', 0.5], ['cor', 4]);
  if (COMBAT.inCombat()) {
    COMBAT.cleanupAfterCombat();
    liveData.player.orgasm();
  } else {
    liveData.player.orgasm();
    GUI.doNext(liveData.playerMenu);
  }
}

//Desert Tribe Bad End
export function oasisBadEnd() {
  // TODO spriteSelect(46);
  //You get this ending if you are a fully corrupt female/herm/centaur with low intelligence and had over 5-10 'Feast' encounters with the Desert Tribe, once the leader starts laying a claim on you because of your large clit
  GUI.outputText(
    "You fuck for hours, 'feasting' with the demons. Pain, pleasure and exhaustion intermingle; no matter how hard you try to cling to consciousness, you are in no state to concentrate enough to succeed. You dangle over the edge for what seems like eternity before an orgasm stronger than any other hits you like a solid wall. You black out...<br><br>",
  );
  //[If female/herm]

  GUI.outputText('After passing out from your latest orgy with the desert tribe, you wake up to find yourself still naked and laying on your back. ');
  //[If female/herm]
  if (!liveData.player.isTaur())
    GUI.outputText('Your feet are locked up in shackles, though with a chain long enough to leave you room to move or walk without problems. ');
  if (liveData.player.isTaur())
    GUI.outputText('Your four legs are locked up in shackles, though with a chain long enough to leave you room to move or walk without problems. ');
  GUI.outputText(
    'Your arms are also tied up behind your back, resting uncomfortably in the hot desert sand. You can see the tribe is packing up to get ready to move on, and you struggle to sit up against your bindings.<br><br>',
  );
  GUI.outputText(
    '"<i>I see that you are awake, slave,</i>" the leader says after watching you get up, walking closer to you with a wicked smirk on his lips. He stares down at you with a look of satisfaction on his face. "<i>Thought you would wake up in time to sneak off on us again, did you? Well, that won\'t be happening anymore.</i>"<br><br>',
  );
  GUI.outputText(
    "\"<i>What the hell are you talking about? I'm no one's slave!</i>\" you yell in indignation, only to cry out in pain as the tribe leader's hand comes down and smacks you across the face. Your head jerks back from the force of the blow, successfully silencing you.<br><br>",
  );
  GUI.outputText(
    '"<i>There will no longer be any of that back talk, slave. As for what I\'m talking about... After all of our encounters with you, my tribesmen and I have made a decision.</i>" The leader\'s smirk widens as he reaches down and grips your face tightly, forcing you to look up at him. His eyes look you over appraisingly as he pulls out a black collar with a long chain attached and fastens it to your neck. His other hand reaches down to one of your ' +
      liveData.player.nippleDescript(0) +
      's and grabs it roughly, giving it a hard squeeze and causing you to let out a small moan of pain and pleasure. He relinquishes his grip and walks around you, continually looking you over and scrutinizing your body from every angle. "<i>We have decided that you would make an excellent addition to our group, and have laid claim to you as our sex slave... to be used in any way that we want.</i>" He stops in front of you and continues, "<i>We were lucky to catch you while you were still unconscious, before you could sneak off on us. I will personally enjoy using you for my own purposes. Maybe I\'ll even use you to carry my children once you\'re properly broken in.</i>"<br><br>',
  );
  //[If herm]
  if (liveData.player.gender == 3) {
    if (liveData.player.isTaur())
      GUI.outputText(
        '"<i>Everyone will have a great time playing with you,</i>" the leader says, smirking wider still as he stares at your centaur body. He reaches out and gives your ' +
          liveData.player.buttDescript() +
          ' a hard smack, causing you to yelp and quickly stand to your feet. You stagger a bit as your legs strain against the shackles as you stand. Without warning, he sticks his fingers inside of your ' +
          liveData.player.assholeDescript() +
          ' and stretches it out as his free hand reaches between your legs to play with both your ' +
          liveData.player.vaginaDescript(0) +
          ' and ' +
          liveData.player.cockDescript(0) +
          '. You gasp and moan in pleasure as your cock becomes erect in his hand. He laughs as he lets go and moves back in front of you. "<i>Plus we could use you to carry our heavy loads like a pack animal. You have the perfect body for it.</i>"<br><br>',
      );
    else
      GUI.outputText(
        'His smirk widens even more as he stares down at your uncovered ' +
          liveData.player.cockDescript(0) +
          ' laying flaccidly between your legs against the hot desert sand. You gasp in surprise as he suddenly reaches down and takes a firm hold of your ' +
          liveData.player.cockDescript(0) +
          '. He strokes it and gives it a rough squeeze, making you whimper sensually as it becomes fully erect in his hand. He laughs as he lets it go, "<i>Our girls will definitely be having fun with you, slave.</i>"<br><br>',
      );
  }
  GUI.outputText(
    "You stare up at the leader with dread, realizing that there is nothing you could do for the moment. You cannot run away because you are chained up, and fighting isn't possible considering you don't see your weapons anywhere in sight. With all of the demons here, you wouldn't be able to get very far anyway. But even as you consider your method of escape, a small part of you feels excited about staying with the tribe, being used and abused by them for as long as possible.<br><br>",
  );
  GUI.outputText(
    '"<i>Get up and start walking, we\'re leaving now. Don\'t look so unhappy about your situation, slave,</i>" the leader says, deepening his smirk as he stares down at you. ',
  );
  //[If female/herm]
  if (liveData.player.gender >= 2)
    GUI.outputText('He reaches down to grab a hold of your hair and lifts you to your feet, causing you to yelp out in pain from the sharp pull.  ');
  GUI.outputText(
    'He gives the chain attached to your neck an extra sharp tug and forces you to start walking behind him. As the tribe starts to move on to their next destination with you in tow, the leader turns to you. "<i>You might just find becoming a slave is better than you think. Why else would you keep returning to us and joining our Feast if you didn\'t crave more of what we had to offer?</i>"<br><br>',
  );
  GUI.outputText(
    "Flushing red in embarrassment at his words, you reluctantly follow after the leader and the rest of the tribe in obedience. You mull over what the leader had just said in your mind, and can't help but wonder what your future would be like if you remained with them.",
  );
  GUI.doNext(oasisBadEndEpilogue);
}

// Oasis Bad End Two
export function oasisBadEndEpilogue() {
  //TODO spriteSelect(46);
  GUI.outputText('After one year');
  if (liveData.player.gender <= 1) GUI.outputText(' and a few doses of fermented succubi milk');
  GUI.outputText('...<br><br>');
  GUI.outputText(
    "A year has gone by since the day you became a slave. You find yourself sitting at the feet of your master wearing nothing but a black collar around your neck. Your belly extends out in front of you, filled to the brim with your master's baby. You smile, happy to be here to please your master and carry his young as memories of your past and your mission fade deep into the depths of your mind. Your only mission in life now is to service your master and the other members of the tribe in whatever they ask, without question or hesitation. As the tribe prepares for the next 'Feast', a commotion at the other side of the encampment catches your attention. The guards bring forth a human captive they found wandering in the oasis, and you smile dimly as you watch master invite the stranger to join them all in the Feast...",
  );
  COMBAT.gameOver();
}

// TODO - Custom Teased responses. Don't know what  needs to be overridden to make this go:
/*
        override public function teased(lustDelta:Number):void
        {
            GUI.outputText("<br>", false);
            if (lustDelta == 0) GUI.outputText("<br>" + capitalA + short + " seems unimpressed.");
            else if (lustDelta > 0 && lustDelta < 5) GUI.outputText("The demons lessen somewhat in the intensity of their attack, and some even eye up your assets as they strike at you.", false);
            else if (lustDelta >= 5 && lustDelta < 10) GUI.outputText("The demons are obviously steering clear from damaging anything you might use to fuck and they're starting to leave their hands on you just a little longer after each blow. Some are starting to cop quick feels with their other hands and you can smell the demonic lust of a dozen bodies on the air.", false);
            else if (lustDelta >= 10) GUI.outputText("The demons are less and less willing to hit you and more and more willing to just stroke their hands sensuously over you. The smell of demonic lust is thick on the air and part of the group just stands there stroking themselves openly.", false);
            applyTease(lustDelta);
        }
    */

export function demonWin() {
  if (liveData.monster.HP <= 0) {
    GUI.outputText(
      'You strike out and the last of the demons tumbles to the ground with a thud. You stand there for a second surrounded by dead or unconscious demons feeling like a god of battle. Then you realize that if a god of battle does exist he lives on a demonic plane like this, so to avoid insulting him you take your hands off your hips and your ' +
        liveData.player.legs() +
        ' off the head of the demon leader before you start to search the bodies.',
    );
    liveData.player.dynStats(['lus', 1]);
  } else {
    GUI.outputText(
      "The demons stop attacking, and reach out to touch your body. Some are already masturbating like it's the only thing in the world and you know that right now, if you wanted to, you could make each and every one of them fuck you.",
    );
  }
  // TODO Phylla and SFW Mode
  /*
        if (findStatusEffect(StatusEffects.phyllafight) >= 0) {
            GUI.doNext(game.desert.antsScene.consolePhylla);
        } else if (hpVictory || flags[kFLAGS.SFW_MODE] > 0){
            COMBAT.cleanupAfterCombat();
        } else {
        */
  GUI.outputText('  Do you rape them?');
  GUI.doYesNo(rapeDemons, COMBAT.cleanupAfterCombat);
}

export function rapeDemons() {
  GUI.outputText(
    "You open your arms and step into the throng of eager demons. They jump eagerly to touch you, becoming more and more lust-frenzied every second. You take the nearest demon and throw it to the ground and without a moment's thought the rest of the group leap to join you in a thoughtless madness of lust...",
  );
  GUI.doNext(oasisSexing);
}

export function demonLose() {
  if (liveData.player.gender == 0) {
    if (liveData.player.HP <= 0) {
      GUI.outputText('You collapse before the demons, who laugh at your utter lack of male or female endowments, beating you until you pass out.');
    } else {
      GUI.outputText(
        'You offer yourself to the demons, who promptly begin laughing at your lack of endowments.  They fall on you as one, beating you into unconsciousness.',
      );
    }
    COMBAT.cleanupAfterCombat();
  } else if (liveData.player.HP <= 0) {
    GUI.outputText(
      'The demons finally beat you down and you collapse onto the sand of the oasis. Almost immediately you feel demonic hands pressing and probing your prone form. You hear the leader of the group say something in a strange tongue but you have a feeling you know what it means. The demons dive onto your inert body with intent and begin to press themselves against you...',
    );
    GUI.doNext(oasisSexing);
  } else {
    GUI.outputText('You struggle to keep your mind on the fight and fail to do so. ');
    if (liveData.gameFlags[FLAG.INFESTED] == 1) {
      GUI.outputText('<br><br>The demons joke and smile, obviously unconcerned with your state.<br><br>');
    }
    if (liveData.player.cocks.length > 0) {
      if (liveData.player.cockTotal() > 1) GUI.outputText('Each of y');
      else GUI.outputText('Y');
      GUI.outputText('our ' + liveData.player.multiCockDescriptLight() + ' throbs ');
      if (liveData.player.hasVagina()) GUI.outputText(' and your ');
    }
    if (liveData.player.vaginas.length > 0) {
      if (!liveData.player.hasCock()) GUI.outputText('Your ');
      GUI.outputText(liveData.player.vaginaDescript(0) + ' burns ');
    }
    GUI.outputText(
      'with arousal.  You make a grab for the nearest demon and catch a handful of jiggly breast. You try desperately to use your other arm to pull her closer to slake your thirst but you both go tumbling to the ground. The demonic leader laughs out loud and the rest of the tribe falls on you, grabbing for anything it can find.',
    );
    GUI.doNext(oasisSexing);
  }
}

// export { DemonPack, OasisScene };
