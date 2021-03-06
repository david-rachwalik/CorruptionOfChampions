import { liveData, ENUM, FLAG, UTIL, GUI, Creature, Data, Items, Appearance, COMBAT, Camp, StatusEffects, Inventory, PerkLib } from 'coc';

Data.addToGameFlags(FLAG.MINOTAUR_TF2, FLAG.MINOTAUR_AND_COWGIRL);

//TODO Mino Cum Addiction Implementation and Testing

export class Minotaur extends Creature {
  hasAxe: boolean;

  constructor(axe = false) {
    super();

    //Name and references
    this.a = 'the ';
    this.name = 'minotaur';
    this.refName = this.name;
    this.isAre = 'is';
    this.heShe = 'he';
    this.himHer = 'him';
    this.hisHer = 'his';

    //TODO Add whether or not minotaur has axe. Remainder of description in comment below
    this.battleDesc =
      'An angry-looking minotaur looms over you. Covered in shaggy ' +
      this.furColor +
      ' fur, the beast is an imposing sight. Wearing little but an obviously distended loincloth, he is clearly already plotting his method of punishment. Like most minotaurs he has hooves, a cow-like tail and face, prominent horns, and impressive musculature. ';
    //ballSize > 4?("  Barely visible below the tattered shreds of loincloth are " + Appearance.ballsDescription(true, true, this) + ", swollen with the minotaur's long pent-up need."):"") +
    // (hasAxe?"<b>This minotaur seems to have found a deadly looking axe somewhere!</b>":"");

    //Stats
    this.str = 50; // TODO Change strength to 75 if the minotaur has an axe.
    this.tou = 60;
    this.spe = 30;
    this.inte = 20;
    this.lib = 40 + this.ballSize * 2;
    this.sens = 15 + this.ballSize * 2;
    this.cor = 35;
    //Combat stats
    this.HP = this.maxHP();
    this.bonusHP = 20 + UTIL.rand(this.ballSize * 2);
    this.lust = 20 + UTIL.rand(40);
    this.fatigue = 0;
    //Advancement
    this.level = 5;
    this.gems = 5 + UTIL.rand(5);
    //Battle variables TODO Axe stuff
    this.hasAxe = axe || UTIL.rand(3) == 0;
    this.weapon.equipmentName = 'fists';
    this.weapon.verb = 'punch';
    this.armor.equipmentName = 'thick fur';
    this.lustVuln = 0.87;
    this.temperment = 3; // LUSTY GRAPPLES

    //Appearance
    this.tallness = UTIL.rand(37) + 84;
    this.hipRating = ENUM.HipRatingType.HIP_RATING_AVERAGE;
    this.buttRating = ENUM.ButtRatingType.BUTT_RATING_AVERAGE;
    this.lowerBody = ENUM.LowerBodyType.LOWER_BODY_TYPE_HOOFED;
    this.furColor = UTIL.randomChoice('black', 'brown');
    this.skinDesc = 'shaggy fur';
    this.skinType = ENUM.SkinType.SKIN_TYPE_FUR;
    this.skinTone = this.furColor;
    this.hairColor = this.furColor;
    this.hairLength = 3;
    this.faceType = ENUM.FaceType.FACE_COW_MINOTAUR;
    this.tailType = ENUM.TailType.TAIL_TYPE_COW;
    //Sexual characteristics
    this.createBreastRow();
    this.createCock(UTIL.rand(13) + 24, 2 + UTIL.rand(3), ENUM.CockType.HORSE);
    this.balls = 2;
    this.ballSize = 2 + UTIL.rand(9);
    this.cumMultiplier = 1.5;
    this.hoursSinceCum = this.ballSize * 10;

    this.ass.analLooseness = ENUM.AnalLoosenessType.ANAL_LOOSENESS_STRETCHED;
    this.ass.analWetness = ENUM.AnalWetnessType.ANAL_WETNESS_NORMAL;
    this.createStatusEffect(StatusEffects.BonusACapacity, 30, 0, 0, 0);

    //Drops
    this.clearDrops(); //Need to be called before populating the item arrays.
    this.addDrop(Items.Consumables.MinotaurBlood, 50);
    this.addDrop(Items.Consumables.MinoCum, 20);

    if (this.ballSize > 4) {
      this.battleDesc +=
        ' Barely visible below the tattered shreds of loincloth are ' +
        Appearance.ballsDescription(true, true, this) +
        ", swollen with the minotaur's long pent-up need.";
    }

    // TODO Axe Stuff
    if (this.hasAxe) {
      this.battleDesc += ' <b>This minotaur seems to have found a deadly looking axe somewhere!</b>';
      //this.weapon = Items.Weapons.LargeAxe;
      this.weapon.equipmentName = 'axe';
      this.weapon.verb = 'cleave';
      this.weapon.attack = 15;
      this.bonusHP += 20;
      this.lustVuln -= 0.03;
      this.level++;
      //this.addDrop(Items.Weapons.LargeAxe, 25);
    }

    //Victory/defeat
    this.victory = minotaurWin;
    this.defeat = minotaurLose;
  }

  //------------
  // COMBAT
  //------------
  override doAI() {
    switch (UTIL.rand(4)) {
      case 0:
        this.minoPheromones();
        break;
      default:
        this.attack();
    }
    COMBAT.combatRoundOver();
  }

  minoPheromones() {
    let lustDamage = 0;
    GUI.outputText('The minotaur smiles at you and lifts his loincloth, flicking it at you. Thick ropes of pre-cum fly through the air, ');
    //sometimes get hit with the pre for stronger effect!
    if (UTIL.rand(3) == 0) {
      GUI.outputText('slapping into your face before you can react!  You wipe the slick snot-like stuff out of your eyes and nose, ');
      if (liveData.player.lust > 75) {
        GUI.outputText('swallowing it into your mouth without thinking. ');
        lustDamage += 10 + liveData.player.lib / 10;
      } else {
        GUI.outputText('feeling your heart beat with desire as your tongue licks the residue from your lips. ');
        lustDamage += 5 + liveData.player.lib / 20;
      }
    } else GUI.outputText('right past your head. ');
    GUI.outputText('The animalistic scent of it seems to get inside you, the musky aroma burning a path of liquid heat to your groin. ');
    lustDamage += 10 + liveData.player.lib / 20;
    if (liveData.gameFlags[FLAG.MINOTAUR_CUM_ADDICT] > 0 || liveData.gameFlags[FLAG.MINOTAUR_CUM_ADDICTION_STATE] == 2) {
      if (UTIL.rand(2) == 0)
        GUI.outputText(
          '<br><b>You shiver with need, wanting nothing more than to bury your face under that loincloth and slurp out every drop of goopey goodness.</b> ',
        );
      else GUI.outputText('<br><b>You groan and lick your lips over and over, craving the taste of him in your mouth.</b> ');
      lustDamage += 5 + UTIL.rand(5);
    }
    liveData.player.changeLust(lustDamage, true);
  }
}

//------------
// SCENES
//------------

export function encounterMinotaur() {
  GUI.clearOutput();
  GUI.displaySprite('minotaur');
  // Is the player too weak for the mountains?
  if (liveData.gameFlags[FLAG.MINOTAUR_TF2] == 0 && liveData.player.level <= 1 && liveData.player.str <= 40) {
    if (liveData.silly) {
      //(Ideally, this should occur the first time the player would normally get an auto-rape encounter with the minotaur. The idea is to give a breather encounter to serve as a warning of how dangerous the mountain is)
      GUI.outputText(
        "Crossing over the treacherous mountain paths, you walk past an ominous cave. The bones and the smell of death convince you to hasten your pace. However, as you walk by, you hear a deep bellow and a snort as a monstrous man with a bull's head steps out. With hell in his eyes and a giant ax in his hand, he begins to approach you in clear rage. As he comes out into the light, you see that he is completely naked and sports a monstrous erection as angry as the minotaur himself, freely leaking a steady stream of pre-cum as he stalks you.<br><br>",
      );
      GUI.outputText(
        'You stumble in your attempt to escape and realize that you are completely helpless. The minotaur towers over you and heaves his ax for a <i>coup de grace</i>. As he readies the blow, a monstrous explosion rocks the entire mountainside, causing the bull-man to stumble before he can finish you off. You look around, bewildered, trying to understand this strange new turn of events, and notice a group of maybe half a dozen people approaching from further up the path. They appear to be a motley crew clad in blue and carrying monstrous weapons. The tallest man holds a weapon made of multiple rotating tubes, and begins spinning the barrels. A second later, while screaming in a language you do not understand, a rain of lead begins shredding the minotaur into a cloud of blood and flesh.<br><br>',
      );
      GUI.outputText(
        'An equally imposing black man with a patch over one eye begins firing canisters at the beast, which explode violently. "<i>Ya ragged-arsed beast man!</i>" he taunts. "<i>Ye should pick on someone yer own size, BOY-O! HEHEHE!</i>"<br><br>',
      );
      GUI.outputText(
        'Coming up the path next is a freak of a person clad in a contained shiny suit with a weapon that burns with flame. He freely walks into the explosions and gunfire and begins igniting the beast.<br><br>',
      );
      GUI.outputText('"<i>MRPHHUMFHRUFH!!!!! HUMFHUFMMRUF!</i>" the freak mumbles through his mask.<br><br>');
      GUI.outputText('"<i>I like me steak well done, ye crazy bugger!</i>" yells the black man.<br><br>');
      GUI.outputText(
        'The beast collapses in a charred and bloody heap. As you stand back up, you hear a strange noise behind you. You turn around to find a well-dressed man wearing a ski mask and smoking a cigarette. "<i>Don\'t you know ze mountains are dangereuse,</i>" the man says with a thick accent. "<i>You will get FUCKED up here if you are not careful.</i>"<br><br>',
      );
      GUI.outputText(
        'You thank the man and his team, but they brush off your gratitude. "<i>Non, non!</i>" the man with the accent says. "<i>As zey say, everyone gets ONE.</i>" With that, he touches the watch on his wrist and disappears. The rest of the group continues on their way.<br><br>',
      );
      GUI.outputText(
        'As they leave, the giant with the chain gun yells in a horribly accented manner, "<i>YOU LEAVE SANDVICH ALONE! SANDVICH IS MINE!</i>"<br><br>',
      );
      GUI.outputText(
        'With that, another hail of bullets break the scene as they walk away, leaving you safe from the minotaur, but utterly baffled as to what in hell just happened.',
      );
    } else {
      GUI.outputText(
        "Crossing over the treacherous mountain paths, you walk past an ominous cave. The bones and the smell of death convince you to hasten your pace. However, as you walk by, you hear a deep bellow and a snort as a monstrous man with a bull's head steps out. With hell in his eyes and a giant ax in his hand, he begins to approach you in clear rage. As he comes out into the light, you see that he is completely naked and sports a monstrous erection as angry as the minotaur himself, freely leaking a steady stream of pre-cum as he stalks you.<br><br>",
      );
      GUI.outputText(
        'You stumble in your attempt to escape and realize that you are completely helpless. The minotaur towers over you and heaves his ax for a <i>coup de grace</i>. As he readies the blow, another beast-man slams into him from the side. The two of them begin to fight for the honor of raping you, giving you the opening you need to escape. You quietly sneak away while they fight - perhaps you should avoid the mountains for now?<br><br>',
      );
    }
    liveData.gameFlags[FLAG.MINOTAUR_TF2] = 1;
    GUI.doNext(Camp.returnToCampUseOneHour);
    return;
  }
  //Very rare mino scene. Many requirements!
  //Mino gangbang
  if (liveData.gameFlags[FLAG.MINOTAUR_AND_COWGIRL] == 0 || UTIL.rand(10) == 0) {
    if (
      liveData.gameFlags[FLAG.HAS_SEEN_MINO_AND_COWGIRL] == 1 &&
      liveData.player.cowScore() >= 4 &&
      liveData.player.lactationQ() >= 200 &&
      liveData.player.biggestTitSize() >= 3 &&
      liveData.player.minotaurAddicted()
    ) {
      //PC must be a cowmorph (horns, legs, ears, tail, lactating, breasts at least C-cup)
      //Must be addicted to minocum
      GUI.outputText(
        "As you pass a shadowy cleft in the mountainside, you hear the now-familiar call of a cowgirl echoing from within. Knowing what's in store, you carefully inch closer and peek around the corner.<br><br>",
      );
      GUI.outputText(
        'Two humanoid shapes come into view, both with pronounced bovine features - tails, horns and hooves instead of feet. Their genders are immediately apparent due to their stark nudity. The first is the epitome of primal femininity, with a pair of massive, udder-like breasts and wide child-bearing hips. The other is the pinnacle of masculinity, with a broad, muscular chest, a huge horse-like penis and a heavy set of balls more appropriate on a breeding stud than a person. You have once again stumbled upon a cow-girl engaging in a not-so-secret rendezvous with her minotaur lover.<br><br>',
      );
      if (liveData.gameFlags[FLAG.CODEX_ENTRY_MINOTAURS] <= 0) {
        liveData.gameFlags[FLAG.CODEX_ENTRY_MINOTAURS] = 1;
        GUI.outputText('<b>New codex entry unlocked: Minotaurs!</b><br><br>');
      }
      if (liveData.gameFlags[FLAG.CODEX_ENTRY_LABOVINES] <= 0) {
        liveData.gameFlags[FLAG.CODEX_ENTRY_LABOVINES] = 1;
        GUI.outputText('<b>New codex entry unlocked: Lacta Bovines/Cowgirl!</b><br><br>');
      }
      GUI.outputText(
        "<br><br>You settle in behind an outcropping, predicting what comes next. You see the stark silhouettes of imps and goblins take up similar positions around this makeshift theatre, this circular clearing surrounded on the edge by boulders and nooks where all manner of creatures might hide. You wonder if they're as eager for the upcoming show as you are. The heady scent of impending sex rises in the air... and with it comes something masculine, something that makes your stomach rumble in anticipation. The mouth-watering aroma of fresh minotaur cum wafts up to your nose, making your whole body quiver in need. Your [vagOrAss] immediately ",
      );
      if (liveData.player.hasVagina()) GUI.outputText('dampens');
      else GUI.outputText('twinges');
      GUI.outputText(', aching to be filled');
      if (liveData.player.hasCock()) GUI.outputText(', while [eachCock] rises to attention, straining at your [armor]');
      GUI.outputText('.');

      GUI.outputText(
        "<br><br>You can barely see it from your vantage point, but you can imagine it: the semi-transparent pre-cum dribbling from the minotaur's cumslit, oozing down onto your tongue. Your entire body shivers at the thought, whether from disgust or desire you aren't sure. You imagine your lips wrapping around that large equine cock, milking it for all of its delicious cum. Your body burns hot like the noonday sun at the thought, hot with need, with envy at the cow-girl, but most of all with arousal.",
      );

      GUI.outputText(
        '<br><br>Snapping out of your imaginative reverie, you turn your attention back to the show. You wonder if you could make your way over there and join them, or if you should simply remain here and watch, as you have in the past.',
      );
      GUI.menu();
      //[Join] [Watch]
      GUI.addButton(0, 'Join', joinBeingAMinoCumSlut);
      GUI.addButton(1, 'Watch', watchAMinoCumSlut);
      return;
    }
    liveData.gameFlags[FLAG.HAS_SEEN_MINO_AND_COWGIRL] = 1;
    liveData.gameFlags[FLAG.MINOTAUR_AND_COWGIRL]++;
    GUI.outputText(
      "As you pass a shadowy cleft in the mountainside, you hear the sounds of a cow coming out from it. Wondering how a cow got up here, but mindful of this land's dangers, you cautiously sneak closer and peek around the corner.<br><br>",
    );
    GUI.outputText(
      "What you see is not a cow, but two large human-shaped creatures with pronounced bovine features -- tails, horns, muzzles, and hooves instead of feet. They're still biped, however, and their genders are obvious due to their stark nudity. One has massive, udder-like breasts and wide hips, the other a gigantic, horse-like dong and a heavy set of balls more appropriate to a breeding stud than a person. You've stumbled upon a cow-girl and a minotaur.<br><br>",
    );
    if (liveData.gameFlags[FLAG.CODEX_ENTRY_MINOTAURS] <= 0) {
      liveData.gameFlags[FLAG.CODEX_ENTRY_MINOTAURS] = 1;
      GUI.outputText('<b>New codex entry unlocked: Minotaurs!</b><br><br>');
    }
    if (liveData.gameFlags[FLAG.CODEX_ENTRY_LABOVINES] <= 0) {
      liveData.gameFlags[FLAG.CODEX_ENTRY_LABOVINES] = 1;
      GUI.outputText('<b>New codex entry unlocked: Lacta Bovines/Cowgirl!</b><br><br>');
    }
    GUI.outputText(
      'A part of your mind registers bits of clothing tossed aside and the heady scent of impending sex in the air, but your attention is riveted on the actions of the pair. The cow-girl turns and places her hands on a low ledge, causing her to bend over, her ample ass facing the minotaur. The minotaur closes the distance between them in a single step.<br><br>',
    );
    GUI.outputText(
      "She bellows, almost moaning, as the minotaur grabs her cushiony ass-cheeks with both massive hands. Her tail raises to expose a glistening wet snatch, its lips already parted with desire. She moos again as his rapidly hardening bull-cock brushes her crotch. You can't tear your eyes away as he positions himself, his flaring, mushroom-like cock-head eliciting another moan as it pushes against her nether lips.<br><br>",
    );
    GUI.outputText(
      "With a hearty thrust, the minotaur plunges into the cow-girl's eager fuck-hole, burying himself past one -- two of his oversized cock's three ridge rings. She screams in half pain, half ecstasy and pushes back, hungry for his full length. After pulling back only slightly, he pushes deeper, driving every inch of his gigantic dick into his willing partner who writhes in pleasure, impaled exactly as she wanted.<br><br>",
    );
    GUI.outputText(
      "The pair quickly settles into a rhythm, punctuated with numerous grunts, groans, and moans of sexual excess. To you it's almost a violent assault sure to leave both of them bruised and sore, but the cow-girl's lolling tongue and expression of overwhelming desire tells you otherwise. She's enjoying every thrust as well as the strokes, gropes, and seemingly painful squeezes the minotaur's powerful hands deliver to her jiggling ass and ponderous tits. He's little better, his eyes glazed over with lust as he continues banging the fuck-hole he found and all but mauling its owner.",
    );
    GUI.doNext(continueMinoVoyeurism);
    return;
  }
  //Withdrawl auto-fuck!
  if (liveData.gameFlags[FLAG.MINOTAUR_CUM_ADDICTION_STATE] == 3 && UTIL.rand(2) == 0 && liveData.player.inte / 10 + UTIL.rand(20) < 15) {
    minoAddictionFuck();
    return;
  }
  //TODO MinotaurLord Encounter
  //Rare Minotaur Lord
  /*if (UTIL.rand(5) == 0 && player.level >= 10) {
            GUI.outputText("Minding your own business, you walk along the winding paths.  You take your time to enjoy the view until you see a shadow approaching you.  You turn around to see a minotaur!  However, he is much bigger than the other minotaurs you've seen.  You estimate him to be eleven feet tall and he's wielding a chain-whip.  He's intent on raping you!");
            COMBAT.startCombat(new MinotaurLord());
            return;
        }*/
  //Regular Minotaur Encounter
  GUI.outputText(
    'As you take the winding path up through the rocky trail, you come upon the opening to a cave. Peering inside, the stench of an overpowering musk washes over you. The primal scent excites you, causing you to become aroused almost immediately. Not thinking as clearly as you normally might, you slowly sneak your way into the cave. Signs of life litter the cave floor.<br><br>',
  );
  if (liveData.gameFlags[FLAG.CODEX_ENTRY_MINOTAURS] <= 0) {
    liveData.gameFlags[FLAG.CODEX_ENTRY_MINOTAURS] = 1;
    GUI.outputText('<br><br><b>New codex entry unlocked: Minotaurs!</b>');
  }
  liveData.player.changeLust(10 + liveData.player.lib / 5, false);
  if (UTIL.rand(30) + liveData.player.inte / 5 > 18 || liveData.gameFlags[FLAG.SFW_MODE] > 0) {
    GUI.outputText('You spot a shadow moving and spin around to see a minotaur lumbering after you from the back of the cave!');
    COMBAT.startCombat(new Minotaur());
    return;
  }
  GUI.outputText(
    "Suddenly you're grabbed from behind, your arms held together by a single massive, furry hand. A heavy, snorting breath brushes the top of your head. You turn your neck to see a massive bull-man. His impressive dick presses ",
  );
  if (liveData.player.isTaur()) GUI.outputText('against your buttocks');
  else GUI.outputText('into the small of your back');
  GUI.outputText(' as it grows larger and harder, smearing its pre-cum into your skin and making you shiver. ');
  //High str escape
  // if (UTIL.rand(20) + liveData.player.str / 3 > 18 || liveData.gameFlags[FLAG.SFW_MODE] || true) {
  if (UTIL.rand(20) + liveData.player.str / 3 > 18 || liveData.gameFlags[FLAG.SFW_MODE]) {
    GUI.outputText('<br><br>You twist around using the additional lubrication and squirm free! Rolling away, you come up in a crouch, ready to fight!');
    COMBAT.startCombat(new Minotaur());
  }
}

export function joinBeingAMinoCumSlut() {
  GUI.clearOutput();
  GUI.outputText(
    "The prospect of getting a huge dose of that fresh minotaur cum is just too much to bear. Before you realize what's happening, you're moving out of your rocky hiding spot and making your way down to the two bovine creatures, stripping your [armor] as you go. By the time you reach the two figures, you're as naked as they are. You shiver softly, whether due to some chill in the air or desperate anticipation, you can't say.",
  );
  GUI.outputText(
    '<br><br>The cow-girl is bent over, her hands on a low ledge with the minotaurs hands on either side of her ample ass. She moans, more like a moo than a human groan, as the minotaur plunges into her quaking depths. As you step forward, suddenly unsure of yourself, both the bull and the cow turn their sharp gazes on to you. You feel very small',
  );
  if (liveData.player.tallness <= 96) GUI.outputText(' despite your immense height');
  GUI.outputText(
    ' as they look you up and down. The entire area goes silent, even the goblins and the imps that are no doubt watching seem to be holding their breath, wondering what will happen to you.',
  );
  GUI.outputText(
    "<br><br>The minotaur grunts, finally, as if he finds you acceptable, and turns back to the plush ass before him, plowing into it once more. The cow-girl, however, motions for you to move forward, and latches onto a [nipple] when you do. Her soft lips encircle your areola, while her tongue dances over the rapidly hardening flesh of your teat. Your breasts tingle with the slightest bit of suction, making you gasp as small droplets of milk escape your nipple and roll over the cow-girl's tongue. She sucks more and more, eagerly gulping down your refreshing lactic beverage.",
  );

  GUI.outputText(
    "<br><br>All the while the minotaur continues grunting, thrusting his massive member into the woman's hungry cunt. The two rock back and forth, pushing her face right into your breast before pulling back again. The cow-girl's legs tremble and you suddenly find her arm grasping your shoulder for support. Her other hand drifts down between your own naked legs, ",
  );
  if (liveData.player.hasCock()) {
    GUI.outputText('ignoring your cock');
    if (liveData.player.cockTotal() > 1) GUI.outputText('s');
    GUI.outputText(' entirely, ');
  }
  GUI.outputText('slipping a finger into your moistening ');
  if (liveData.player.hasVagina()) GUI.outputText('pussy');
  else GUI.outputText('asshole');
  GUI.outputText(". A low moan escapes your lips as a second finger slips in while the busty bovine woman's thumb ");
  if (liveData.player.hasVagina()) GUI.outputText('swirls around your clitoris');
  else GUI.outputText('presses against your perineum');
  GUI.outputText('.');

  GUI.outputText(
    "<br><br>The broad-shouldered minotaur urges his mate onto her knees while he does the same, his dick never leaving its temporary home. The cow-girl pulls you along, bringing you to your knees and then onto your back. You have a moment of sudden modesty as you fold your legs, trying to block your crotch from view. The bovine woman simply chuckles in between moans and lightly presses your knees apart. Your legs spread wide, lewdly showing off your nether region to the cow-girl, and anyone else that's watching.",
  );

  GUI.outputText('<br><br>Without wasting any time, the girl leans down and');
  if (liveData.player.hasCock()) GUI.outputText(', once again ignoring your manhood completely');
  GUI.outputText(', dives tongue first into your wet ');
  if (liveData.player.hasVagina()) GUI.outputText('quim');
  else GUI.outputText('back door');
  GUI.outputText(
    ". The movement is so quick that you can't even suppress the sudden, perverted moan that leaves your lips... a moan that sounds shockingly like a cow's moo. The surprise at your sudden bovine outburst quickly dissipates as the cow-girl's large tongue dips in and out of your ",
  );
  if (liveData.player.hasVagina()) GUI.outputText('sodden box');
  else GUI.outputText('moist butthole');
  GUI.outputText(". Any remaining fears of joining this very public sex show are gone, and you wonder why you didn't join in sooner.");

  GUI.outputText(
    "<br><br>The tongue lavishes your hole, paying homage to your crotch in the only way it knows how. Your breath comes shorter while your arms and legs tingle, fingers and toes curling against your will. The cow-girl laps and licks, her broad mouth muscle slipping in and out, curving in and around to hit every tender part of your insides. You run your fingers through the woman's long red hair, forcing her head even deeper into your crotch. With her head down like this, you have an easy view of her ass high up in the air, getting fucked senseless by the minotaur. Every thrust makes the cow-girl moan into your lap, the added vibrations causing you to squirm even more.",
  );

  GUI.outputText(
    '<br><br>The bull thrusts in to the hilt, letting out one final bellow of pleasure. The cow-girl brings her head up, her mouth and chin slick and dripping with your juices. She lets out a moo-like bellow along with the minotaur, whose balls churn, no doubt depositing a heavy load of that delicious cum directly into her waiting womb. You lick your lips, wishing you could just wrap them around that cock right now, to get your fix and feel the blissful sensations of relief run across your body.',
  );

  GUI.outputText(
    "<br><br>The girl gibbers incoherently as she slides off the minotaur's still-rigid cock, a small spurt of pearly white spunk running down her thighs. The minotaur smirks, smacking the cow's ass and casually pushing her to the side. A goofy grin is plastered on her face, eyes rolled up into their sockets like she's just experienced the most divine fuck imaginable. He then looks you dead in the eyes and says, in a deep, masculine and very dominant voice, \"<i>You get to ride my cock next, cow.</i>\"",
  );

  GUI.outputText(
    "<br><br>His rough, strong hands grasp your legs and draw you closer. You squirm half-heartedly, not really trying to get away. Though your mind tries to fight it, you know all you really want is that warm, sticky cum inside you one way or another. You want to be just like the half-unconscious girl beside you, stuffed with cock and turned into this rugged man's breeding bitch.",
  );

  GUI.outputText(
    '<br><br>"<i>Eager for a fucking, huh slut?</i>" he taunts, his turgid member resting along your stomach. You nod slowly. You feel a deep burning in your core. You want that cock inside you. You want to be filled to bursting with this bull\'s seed, to feel it churn ',
  );
  if (liveData.player.hasVagina()) GUI.outputText('within your womb, knocked up by this manly beast');
  else GUI.outputText('within your bowels');
  GUI.outputText(
    '. "<i>That\'s a good slut,</i>" he grunts, pulling his cock off your belly and rubbing the slick, flat head against your awaiting [vagOrAss]. He teases you with the slight contact until you open your mouth to voice your complaints, then he suddenly thrusts inside. Any words forming on your tongue fly away, replaced by a whine of relief as your hole gets stretched wide by the invading member.',
  );
  if (liveData.player.hasVagina()) liveData.player.cuntChange(36, true, true, false);
  else liveData.player.buttChange(36, true, true, false);

  GUI.outputText('<br><br>"<i>Ahh, yeah. That\'s some good ');
  if (liveData.player.hasVagina()) GUI.outputText('cow-pussy');
  else GUI.outputText('ass');
  GUI.outputText(
    ' right there,</i>" he groans, more of his bombastic cock slipping deep inside you. The minotaur hooks an arm under each of your knees, lifting up your lower body, pressing even deeper. Powerful sensations drift up from your ',
  );
  if (liveData.player.hasVagina()) GUI.outputText('g-spot');
  else GUI.outputText('prostate');
  GUI.outputText(" as the minotaur's wide flare strokes it through your ");
  if (liveData.player.hasVagina()) GUI.outputText('vaginal');
  else GUI.outputText('anal');
  GUI.outputText(
    " walls. Biting your lip with barely contained pleasure, you bring your hands to your breasts, playing with your milk-sodden nipples in between each orgasmic thrust of the bull's hips.",
  );

  GUI.outputText(
    "<br><br>A giggle comes from your side, as you see the cow-girl is back up onto her knees, having recovered from her exalted orgasm. She crawls forward, kneeling just over your head and leaning in to kiss her minotaur lover. The two whisper sweet nothings to each other, too vague and indistinct to hear, but it doesn't matter. All you can focus on is the dick lodged firmly inside of you... that, and the soaking cunt of the cow-girl just inches from your face. Alabaster droplets drip down her legs, one even landing on your lips. Before you can stop yourself, you lick them clean, savoring the taste of the second-hand cum.",
  );

  GUI.outputText(
    "<br><br>Some part of your mind voices a complaint at what comes next, a voice that's quickly squelched inside the addiction-fueled haze of your brain. You pull your head upwards and extend your tongue, slurping a large glob of cum from the cow-girl's snatch. There's a surprised yelp from above you, followed by a coo of pleasure. To your surprise, the cow-girl actually lowers her cunt down onto your face, giggling madly, filling your nostrils with the scent of her muff, with the scent of recent sex. Not letting this opportunity go to waste, you repay her actions from earlier, slipping your ",
  );
  if (liveData.player.tongueType == ENUM.TongueType.TONGUE_SNAKE) GUI.outputText('serpentine ');
  else if (liveData.player.tongueType == ENUM.TongueType.TONGUE_DEMONIC) GUI.outputText('demonic ');
  else if (liveData.player.tongueType == ENUM.TongueType.TONGUE_DRACONIC) GUI.outputText('draconic ');
  else if (liveData.player.hasLongTongue()) GUI.outputText('inhumanly long ');
  GUI.outputText("tongue inside her, eagerly licking out and guzzling down the remnants of the minotaur's present.");

  GUI.outputText(
    "<br><br>The minotaur, for his part, is in no rush to give you a cream pie of your own. His thrusts are slow and deliberate, with a rhythm that has you writhing with pleasure. The three of you moan together like some kind of erotic pyramid. The bull's assault on your ",
  );
  if (liveData.player.hasVagina()) GUI.outputText('womb');
  else GUI.outputText('back door');
  GUI.outputText(' increases slowly, and you can feel your limbs tingling at the prospect of your mino-cum-induced orgasm.');

  GUI.outputText(
    "<br><br>It starts in your fingers, where your nerves seethe, gathering up fistfuls of grass like one might grab a sheet. The heat continues down your arms and strikes your body like a lightning bolt, your belly suddenly spiking up, back arching as the orgasmic thunderstorm rolls over you. The flames don't stop there, however. They travel down into your crotch, suddenly lighting up every nerve in your ",
  );
  if (liveData.player.hasVagina()) GUI.outputText('[vagina]');
  else GUI.outputText('[asshole]');
  GUI.outputText(
    " like a Christmas tree. You're acutely aware of every single movement, every pulse, every little bit of contact between you and the huge cock living inside you.",
  );

  GUI.outputText(
    '<br><br>Your muscles spasm and clench as the minotaur lets loose a powerful roar. His own member twitches, suddenly releasing a flood of hot cum into your awaiting ',
  );
  if (liveData.player.hasVagina()) GUI.outputText('womb');
  else GUI.outputText('bowels');
  GUI.outputText(
    '. The moment that long-awaited jism hits your walls, it\'s like another lightning bolt hits. It travels up your spine and sets your entire brain aglow. Ecstasy wrapped in bliss with a side of euphoric rapture consumes your thoughts. Your vision goes white, pearly white like the seed filling your body, and your lips part as a primal "<i>moo</i>" slips out.',
  );

  GUI.outputText(
    '<br><br>For the longest time, the only thing your cum-addled mind can think about is cocks and cunts, of pregnant bellies and stomachs filled to capacity. You mind fills itself with visions of yourself on your knees, servicing this minotaur daily, hoping to please him enough that he might grace your ',
  );
  if (!liveData.player.hasVagina()) GUI.outputText('new ');
  GUI.outputText('womb with his divine dick.');

  GUI.outputText(
    "<br><br>It takes several minutes for you to come down from this orgasmic high, and when you do, you see your minotaur lover has yet to recover from his. He lays on his back in the midst of this clearing, his still-rock-hard cock jutting upwards, coating in a mixture of various juices. The cow-girl sits beside him, carefully licking the towering pillar of cock clean. You sit up, wobbly and clutch your stomach. Filled with cum in two ends, you can't help but feel oddly unsatisfied. Perhaps guzzling down some second-hand cum isn't quite enough to sate your hunger. Perhaps you need it straight from the tap, as it were.",
  );

  GUI.outputText(
    "<br><br>You gingerly sit up, your body still quaking with pleasure. Every movement sends another luxurious aftershock rippling through your body. You crawl over to the splayed out minotaur, opposite your cow-girl partner, and join her in licking the man's cock clean. It takes some work, but soon it glistens in the light of the red sky above you.",
  );

  GUI.outputText('<br><br>As if you both possess some kind of bovine telepathy, you both lean forward, wrapping your ');
  if (liveData.player.bRows() > 1) GUI.outputText('uppermost ');
  GUI.outputText(
    "breasts around his monolithic shaft. Your faces meet and her soft lips press against yours, each of you earnestly pressing your tongues into the other's mouths, swapping the juices you've collected over the past hour or so. The bull beneath you groans, awakening to the feeling of four breasts surrounding his love muscle.",
  );

  GUI.outputText(
    "<br><br>The two of your pump your breasts up and down, your lips barely leaving each other long enough to give his member the occasional kiss, lick or slurp. Up and down you go, and this time it's the minotaur's body that's wracked with bliss, writhing on the ground. Milk dribbles from your breasts, coating you, the cow-girl and the minotaur in a fine white sheen and creating a sweet-smelling aroma that permeates the air.",
  );

  GUI.outputText(
    "<br><br>The bull groans, biting his lip as a third, and likely final, orgasm rips through him. His hips buck upwards, his cock flaring up and out of your mammaries. Ropes of immaculate silver seed jet from his cumslit, arcing up into the air several feet before splattering down on your heads. Wasting no time, you slip your lips around the flare, gulping down mouthful after mouthful of the sweet man-milk. Even though it's his third load of the hour, it's just as big as the others, and soon your find you can't swallow any more; your cum-laden belly just won't allow it.",
  );

  GUI.outputText(
    '<br><br>Sadly, you relinquish your hold on his cock and sit back, watching the cow-girl opposite you pick up where you left off, slurping up whatever you missed with a dedicated fervor.',
  );

  GUI.outputText(
    '<br><br><b>Now</b> you feel satisfied. Filled with that precious, precious minotaur spunk in both ends, fresh from the source. You slump onto your back and drift off into a hazy, bull-filled dream world.',
  );

  GUI.outputText('...');

  GUI.outputText(
    '<br><br>You awaken several hours later. The minotaur and the cow-girl are nowhere to be seen, but your [armor] is left neatly folded next to you, along with a small bottle filled with some white liquid, most likely a gift from your "bull".',
  );

  GUI.outputText(
    '<br><br>You quickly re-dress and head back to camp, spying the occassional goblin or imp scurrying from its hiding spot, no doubt recovering from their own self-inflicted orgasms.',
  );
  liveData.player.orgasm();
  liveData.player.modStats(['lib', 0.5], ['sen', -3], ['cor', 1]);
  if (liveData.gameFlags[FLAG.PC_FETISH] > 0) {
    GUI.outputText(
      ' A thrill runs through you. Even though you were brought to such a satisfying climax, the whole thought that goblins and imps were watching you and getting off on it... it just makes you hornier than you were before.',
    );
    liveData.player.changeLust(liveData.player.maxLust(), false);
  }
  //Chance to impregnate PC, get mino-fix, and maybe relief from feeder perk.
  liveData.player.minoCumAddiction(10);
  liveData.player.knockUp(ENUM.PregnancyType.PREGNANCY_MINOTAUR, ENUM.IncubationType.INCUBATION_MINOTAUR);
  if (liveData.player.findStatusEffect(StatusEffects.Feeder) >= 0) {
    //You've now been milked, reset the timer for that
    liveData.player.addStatusValue(StatusEffects.Feeder, 1, 1);
    liveData.player.changeStatusValue(StatusEffects.Feeder, 2, 0);
  }
  //(Acquired minotaur cum!)
  Inventory.takeItem(Items.Consumables.MinoCum, Camp.returnToCampUseOneHour);
}

export function watchAMinoCumSlut() {
  GUI.clearOutput();
  GUI.outputText(
    'Deciding not to risk it, you settle back into your nook in the rocks and watch on eagerly. The cow-girl turns and places her hands on a low ledge, causing her to bend over, her ample ass facing the minotaur. The minotaur closes the distance between them in a single step.<br><br>',
  );
  GUI.outputText(
    "She bellows, almost moaning, as the minotaur grabs her cushiony ass-cheeks with both massive hands. Her tail raises to expose a glistening wet snatch, its lips already parted with desire. She moos again as his rapidly hardening bull-cock brushes her crotch. You can't tear your eyes away as he positions himself, his flaring, mushroom-like cock-head eliciting another moan as it pushes against her nether lips.<br><br>",
  );
  GUI.outputText(
    "With a hearty thrust, the minotaur plunges into the cow-girl's eager fuck-hole, burying himself past one -- two of his oversized cock's three ridge rings. She screams in half pain, half ecstasy and pushes back, hungry for his full length. After pulling back only slightly, he pushes deeper, driving every inch of his gigantic dick into his willing partner who writhes in pleasure, impaled exactly as she wanted.<br><br>",
  );
  GUI.outputText(
    "The pair quickly settles into a rhythm, punctuated with numerous grunts, groans, and moans of sexual excess. To you it's almost a violent assault sure to leave both of them bruised and sore, but the cow-girl's lolling tongue and expression of overwhelming desire tells you otherwise. She's enjoying every thrust as well as the strokes, gropes, and seemingly painful squeezes the minotaur's powerful hands deliver to her jiggling ass and ponderous tits. He's little better, his eyes glazed over with lust as he continues banging the fuck-hole he found and all but mauling its owner.<br><br>",
  );
  liveData.player.changeLust(10, false);
  // GUI.doNext(0, "Next", continueMinoVoyeurism)
  GUI.addButton(0, 'Next', continueMinoVoyeurism);
}

export function continueMinoVoyeurism() {
  GUI.clearOutput();
  GUI.outputText(
    "They go at it for nearly an hour, oblivious to you watching them, before their intensity heightens as they near orgasm. The results are almost explosive, both of them crying out as they begin twitching uncontrollably. Clinging desperately to the cow-girl's ass, the minotaur pumps so much cum into her depths that it begins spurting out. This accidental lubrication releases his grip and the pair collapse to the ground. Yet the minotaur isn't finished, his man-milk spraying into the air almost like his still-erect dick is a hose and splattering down onto both of them.<br><br>",
  );
  GUI.outputText(
    "As you look at the two cum-covered creatures laying their in their exhausted sex-induced stupors, the minotaur's thick horse-cock now slowly deflating, you realize that you've been touching yourself. You make yourself stop ",
  );
  if (liveData.player.cor < 33) GUI.outputText('in disgust.');
  else if (liveData.player.cor < 66) GUI.outputText('in confusion.');
  else GUI.outputText('reluctantly.');
  GUI.outputText(
    '<br><br>Only now do you notice other faces peeking over ledges and ridges. You count at least two goblins and one imp who quickly pull back. From the sounds, they were busy getting themselves off.',
  );
  if (liveData.gameFlags[FLAG.MINOTAUR_AND_COWGIRL] == 0) GUI.outputText(" Apparently this isn't an uncommon show, and the locals enjoy it immensely. ");
  //Lust!
  liveData.player.changeLust(5 + liveData.player.lib / 20 + liveData.player.minoScore() + liveData.player.cowScore(), true);
  GUI.doNext(Camp.returnToCampUseOneHour);
}

//If you're addicted, it's like an automatic loss in battle.
export function minoAddictionFuck() {
  //spriteSelect(44);
  GUI.clearOutput();
  GUI.outputText(
    "While exploring the mountains, a familiar musky scent works its way into your nostrils.   Sniffing hungrily, you begin shaking, nearly convulsing with need.   You don't think, you act, sprinting heedlessly around the rock obstructions that litter the jagged mountain-side, chasing down your need.  Rounding a sharp bend, you sigh happily as the smell noticably increases in strength.  A few feet away is a minotaur, covered in shaggy fur and snacking on fruit.  Ecstatic, you scrabble forwards, sending tiny rocks everywhere.   The minotaur looks up, at first with a frown, then with a gradually widening grin as he recognizes the look in your eyes.<br><br>",
  );

  GUI.outputText(
    "He tosses aside the fruit, forgotten as his veiny shaft forces aside his loincloth, proud and dripping.   You NEED him, and you drop to your knees and masturbate, knowing that soon he'll be filling you full of what you need.   The blatant sexual show does the trick, and you shudder as the drooling horse-cock gets closer and closer to you.   At the last moment the minotaur picks you up, and tosses you backwards, into a cave.  Your hope sinks, but then he starts to advance upon you again, and you know the time for waiting is over...",
  );

  //(Max lust, load minotaur dicks & balls into monster stats and throw to rape-scenes.)
  liveData.player.changeLust(100);
  liveData.monster = new Minotaur();
  GUI.doNext(getRapedByMinotaur);
}

//------------
// WIN/LOSS SCENES
//------------

// Win TODO Phyllafight!
export function minotaurWin() {
  /*
        if (player.findStatusEffect(StatusEffects.PhyllaFight) >= 0) {
            player.removeStatusEffect(StatusEffects.PhyllaFight);
            GUI.outputText("You defeat a minotaur!  ", true);
            phyllaBeatAMino();
        } else {
            game.mountain.minotaurScene.minoVictoryRapeChoices();
        }
        */
  minoVictoryRapeChoices();
}

export function minoVictoryRapeChoices() {
  //spriteSelect(44);
  //Determine if PC can rape with a dick!
  const x = liveData.player.cockThatFits(liveData.monster.analCapacity());

  // Lusty options

  if (liveData.player.lust >= 33) {
    // Checking for general cock use
    if (liveData.player.hasCock() && x >= 0) GUI.addButton(0, 'Use Cock', bumRapeaMinotaur);

    // Checking for vaginal fuck
    if (liveData.player.hasVagina()) GUI.addButton(1, 'Use Vagina', girlRapeAMinotaur);

    // Checking for herm scene. Centaurs can't do the herm scene
    if (liveData.player.gender == 3 && x >= 0 && !liveData.player.isTaur()) GUI.addButton(2, 'Use Both', minotaurGetsRapedByHerms);

    // Checking for tentacle fuck
    if (x >= 0 && liveData.player.cockTotal() > 1 && liveData.player.countCocksOfType(ENUM.CockType.TENTACLE) > 0)
      GUI.addButton(3, 'TentacleDick', rapeMinotaurTentacles);

    //Checking to see if can urethral pen
    if (liveData.player.hasCock()) {
      let counter = 0;
      //Loop through to see if any dicks qualify, and if so enable it.
      while (counter < liveData.player.cockTotal()) {
        if (liveData.player.cocks[counter].cockThickness <= 4 && liveData.player.cocks[counter].cockLength >= 14) {
          GUI.addButton(4, 'UrethraFuck', minoUrethralPen);
        }
        counter++;
      }
    }
    // Checking for minotaur blowjob
    if (liveData.player.hasCock()) {
      if (liveData.player.cockThatFits(80) >= 0) GUI.addButton(7, 'MakeHimSuck', minotaurBlowjob);
    }
  }

  // Non lusty options

  // Are you an addict?
  if (liveData.gameFlags[FLAG.MINOTAUR_CUM_ADDICTION_STATE] >= 1 || liveData.gameFlags[FLAG.MINOTAUR_CUM_ADDICT] > 0) {
    GUI.addButton(5, 'Get Filled', takeMinoCumDirectly);
    if (liveData.player.biggestTitSize() >= 5 && !liveData.player.isNaga()) {
      GUI.addButton(6, 'Titfuck Him', minoGetsTitFucked);
    } else if (liveData.player.isNaga()) {
      GUI.addButton(6, 'ProstateMilk', minoGetsTitFucked);
    }
  }

  // Are you a feeder?
  if (liveData.player.findPerk(PerkLib.Feeder) >= 0) GUI.addButton(8, 'Breastfeed', minotaurDrinksMilkNewsAtEleven);

  //We have more buttons now! No longer overlaps feeder.
  // Are you going to oviposit the poor critter?
  if (liveData.player.canOvipositSpider() || (liveData.player.canOvipositBee() && liveData.player.gender > 0)) {
    GUI.addButton(9, 'Lay Eggs', layEggsInAMinotaurSpiderLike);
  }

  //Does the player have the lusty maiden's armor?
  if (UTIL.rand(2) == 0 && liveData.player.hasVagina() && liveData.player.biggestTitSize() >= 4 && liveData.player.armor == Items.Armor.LustyMaidenArmor) {
    //GUI.addButton(10, "B.Titfuck", lustyMaidenPaizuri); //TODO Add Lusty Maiden Armor Scene
  }

  GUI.addButton(11, 'Leave', COMBAT.cleanupAfterCombat);

  // Text display!
  //Hungry for cum?  Grab a snickers.
  if (liveData.gameFlags[FLAG.MINOTAUR_CUM_ADDICTION_STATE] >= 1) {
    GUI.outputText('Smiling down at your vanquished foe, you feel a familiar hunger growing within you.  What do you do?');
  }
  //Not an addict
  else if (liveData.player.lust >= 33 && liveData.player.gender > 0 && liveData.gameFlags[FLAG.SFW_MODE] != 1) {
    if (liveData.monster.lust >= liveData.monster.maxLust())
      GUI.outputText(
        'You smile in satisfaction as the ' +
          liveData.monster.name +
          ' drops down on all fours and begins masturbating feverishly.  Sadly you realize your own needs have not been met.  Of course you could always fuck the eager bull...<br><br>What do you do?',
      );
    else
      GUI.outputText(
        'You smile in satisfaction as the ' +
          liveData.monster.name +
          ' collapses, unable to continue fighting.  Sadly you realize your own needs have not been met.  Of course you could always rape the poor thing...<br><br>What do you do?',
      );
  }
  //Not able to rape but a feeder
  else if (liveData.player.findStatusEffect(StatusEffects.Feeder) >= 0 && liveData.gameFlags[FLAG.SFW_MODE] == 0) {
    if (liveData.monster.lust >= liveData.monster.maxLust())
      GUI.outputText(
        'You smile in satisfaction as the ' +
          liveData.monster.name +
          ' collapses, unable to continue fighting.  Sadly you realize your own need to breastfeed has not been met.  You could always let the poor thing have a drink...<br><br>Do you?',
      );
    else
      GUI.outputText(
        'You smile in satisfaction as the ' +
          liveData.monster.name +
          ' collapses, unable to continue fighting.  Sadly you realize your own need to breastfeed has not been met.  You could always let the poor thing have a drink...<br><br>What do you do?',
      );
  }
  //No rape, no feeder
  else {
    if (liveData.monster.lust >= liveData.monster.maxLust())
      GUI.outputText('You smile in satisfaction as the ' + liveData.monster.name + ' drops down on all fours and begins masturbating feverishly.');
    else GUI.outputText('You smile in satisfaction as the ' + liveData.monster.name + ' collapses, unable to continue fighting.');
    COMBAT.cleanupAfterCombat();
  }

  if (x < 0 && liveData.player.hasCock()) GUI.outputText("<br>Sadly, you're too well endowed to penetrate the minotaur.");
  if (liveData.player.gender == 3 && liveData.player.isTaur())
    GUI.outputText("<br>If you had a different body type you might be able to penetrate him while taking him, but as a centaur that's not an option.");
}

// Introduction to many mino rape scenes.
export function minoRapeIntro() {
  //spriteSelect(44);
  GUI.clearOutput();
  //Monster got ass whupped
  if (liveData.monster.HP <= 0) {
    GUI.outputText(
      "You roll the barely conscious beast over, lifting his ass up above his knees.  The loincloth flops open, giving you a perfect view of his hardening member.  In most ways it looks like a horse's dick, though it seems to be textured with multiple rings of prepuce along its length.  The scent boiling off that marvelously thickening endowment is pleasant yet musky, and overpoweringly strong.",
    );
    //Vagina or not flavor texts
    if (liveData.player.vaginas.length > 0)
      GUI.outputText(
        "  Glancing back at you with hope in his eyes, the minotaur's " +
          liveData.monster.cockDescriptShort(0) +
          ' twitches as he lays his gaze upon your ' +
          liveData.player.vaginaDescript(0) +
          '.',
      );
    else
      GUI.outputText(
        "  Glancing back at you with eyes full of despair, the minotaur seems to realize you won't be helping the predicament his " +
          liveData.monster.ballsDescriptLight() +
          ' are in.',
      );
  }
  //Monster lost to lust
  else {
    GUI.outputText(
      "You rip off the minotaur's loincloth with a savage grin, slapping his ass and admiring the jiggle of his " +
        liveData.monster.ballsDescriptLight() +
        ' as they wobble from the force of your blow.  The cow-man moos softly with desire, ropes of pre splattering the ground from his arousal.   The musk pouring off him and his puddle of slick pre-cum is overpowering, making it difficult to think as you feel your blood rush to your groin ',
    );
    //NIPPULAR ENJOYMENT
    if (liveData.player.totalNipples() > 1) GUI.outputText(' and nipples');
    GUI.outputText('.');
    //Vagina or not flavor texts
    if (liveData.player.vaginas.length > 0)
      GUI.outputText(
        "  Glancing back at you with hope in its eyes, the minotaur's " +
          liveData.monster.cockDescriptShort(0) +
          ' twitches as he lays his gaze upon your ' +
          liveData.player.vaginaDescript(0) +
          '.',
      );
    else
      GUI.outputText(
        "  Glancing back at you with eyes full of despair, the minotaur doubts you'll help relieve the predicament his " +
          liveData.monster.ballsDescriptLight() +
          ' are in.',
      );
  }
}

//Male Rape
export function bumRapeaMinotaur() {
  //spriteSelect(44);
  const x = liveData.player.cockThatFits(liveData.monster.analCapacity());
  minoRapeIntro();
  GUI.outputText('<br><br>You droop your ');
  //Regular or multi...
  if (liveData.player.cockTotal() == 1) GUI.outputText(liveData.player.cockDescript(x));
  else GUI.outputText(liveData.player.multiCockDescriptLight());
  GUI.outputText(' across his upraised backside, ');
  //pre-cum descriptions
  if (liveData.player.cumQ() < 25) GUI.outputText('dribbling a bit of slick pre-cum into his fur.  ');
  if (liveData.player.cumQ() >= 25 && liveData.player.cumQ() < 250) GUI.outputText('leaking thin ropes of pre-cum over his muscular ass.  ');
  if (liveData.player.cumQ() >= 250 && liveData.player.cumQ() < 500) {
    GUI.outputText('drizzling his ass with thick ropes of pre-cum.  You make sure to coat his tailhole liberally, ensuring plenty of lubrication.  ');
    liveData.monster.ass.analWetness++;
  }
  if (liveData.player.cumQ() > 500) {
    liveData.monster.ass.analWetness += 2;
    GUI.outputText(
      'hosing him down with the constant flow of pre-cum produced by your over-sexed maleness.  Thick runners of the stuff coat his asshole, some dripping down his thighs, and the rest slicking the tumescent monster between his legs.  ',
    );
  }
  //Unfinished minotaur cum addiction hook goes here?
  GUI.outputText(
    'You gently squeeze his swollen balls as you align yourself with his pucker, breathing deeply as his musk intensifies, feeling dizzy and giddy.',
  );
  //New paragraph for penetration.
  GUI.outputText('<br><br>');
  GUI.outputText(
    'With little warning, you push inside, amazed to feel his sphincter relax completely.  Pushing forward with ease, you slide all ' +
      UTIL.num2Text(Math.round(liveData.player.cocks[0].cockLength)) +
      " inches into him, bottoming out completely, feeling each beat of your victim's heart massage your " +
      liveData.player.cockDescript(x) +
      " inside his rectum.  Each beat sends a rhythmic contraction through the minotaur's backside, working forwards and with arousing intensity.  Between the sensations squeezing your " +
      liveData.player.cockDescript(x) +
      ' and the intoxicating musk filling your head, you lose control, your hips pistoning rapidly of their own accord, pumping harder and harder with every thrust, exhausting your body as you overexert yourself.<br><br>',
  );
  GUI.outputText(
    "At last you feel the pressure of your climax approaching, spurring you on to jackhammer the mino's poor abused tail-hole even more brutally. ",
  );
  if (liveData.player.cumQ() <= 25) {
    GUI.outputText(
      'With long deep strokes you bury your ' +
        liveData.player.cockDescript(x) +
        ' inside him, jizz spurting into his backside.  The bull-man moans in helpless pleasure and pain as he continues jerking himself, unable to cum.  Eventually you pull away with a satisfied sigh.  The minotaur is a mess, still masturbating furiously and helpless with desire to orgasm.',
    );
  }
  if (liveData.player.cumQ() > 25 && liveData.player.cumQ() <= 250) {
    GUI.outputText(
      'With long deep strokes you bury your ' +
        liveData.player.cockDescript(x) +
        ' inside him, pumping thick globs of cum into his deep monstrous rectum.  You feel the slick hotness around your ' +
        liveData.player.cockDescript(x) +
        ' as you finish pumping a few long last blasts into him.  The minotaur is a mess, masturbating furiously and dripping with pre-cum, on the edge of orgasm.  It looks like he might even manage to get himself off with enough time.',
    );
  }
  if (liveData.player.cumQ() > 250 && liveData.player.cumQ() <= 500) {
    GUI.outputText(
      'With long deep strokes you bury your ' +
        liveData.player.cockDescript(x) +
        ' inside him, groaning as your own pressure releases, violent muscular contractions forcing out long blasts of seed.   By the second or third squeeze you can feel the slick hotness begin to fill back around your still-orgasming cock.  A few more pleasurable squeezes later you feel cum squirt out of the minotaur with every pulse of your manhood.  The beast twitches beneath you, gripping you like a vice as his own orgasm is unleashed.  His ass seems to milk your ' +
        liveData.player.cockDescript(x) +
        ' of any remaining seed as he squirms, explosively orgasming against the ground. You feel the stuff splatter against your legs as his ' +
        liveData.monster.ballsDescriptLight() +
        " empty, the strong scent making you swoon dizzily, euphoric with the minotaur's drug-like cum-musk and your own orgasm.<br><br>Eventually you pull free, giggling in pleasure as your victim falls unconscious in a small lake of his own spooge. ",
    );
    liveData.player.changeLust(10 + liveData.player.lib / 10);
  }
  if (liveData.player.cumQ() > 500) {
    GUI.outputText(
      'With long deep strokes you bury your ' +
        liveData.player.cockDescript(x) +
        ' inside him, your body trembling as the building pressure of your orgasm peaks, at last allowing you erupt a thick river of jism inside your victim.  You feel it back-flow around your ' +
        liveData.player.cockDescript(x) +
        ' with the first spurt, lubricating the passage as your first blast finally tapers off.  A moment later you begin the next, filling his rectum as your cum begins to drool out and down his thighs and ' +
        liveData.monster.ballsDescriptLight() +
        '.  Each successive blast makes more and more of your spunk squirt free from his backside, distending his belly slightly from the quantity and pressure.  You squeeze your eyes closed from the pleasure, tongue hanging out of your mouth in a dopey, pleasure-filled haze, as you feel him tense underneath you.  His ass clamps down hard on your ' +
        liveData.player.cockDescript(x) +
        ' squeezing out an even thicker flow from you, even as you feel his balls tremble with the beginnings of his own orgasm.  With an explosive splattering sound, you hear him begin cumming, his ' +
        liveData.monster.ballsDescriptLight() +
        " shrinking as they empty out on the ground, splattering everywhere, and coating the minotaur and your bottom half with seed.  The scent of the minotaur's musk seems to triple in the air, making it difficult to stand, but easier to keep cumming, distending the minotaur's belly until he looks very pregnant.<br><br>With an ecstatic sigh you pull free, stumbling away as the minotaur passes out in a lake of his own spooge.  You attempt to clean yourself up, licking your fingers and swooning from the heavenly taste as it fills your mind with a fog of lust.",
    );
    liveData.player.changeLust(15 + liveData.player.lib / 7);
  }
  COMBAT.cleanupAfterCombat();
  liveData.player.orgasm();
}

//Female Rape
export function girlRapeAMinotaur() {
  //spriteSelect(44);
  minoRapeIntro();
  liveData.player.slimeFeed();
  liveData.player.minoCumAddiction(5);
  GUI.outputText(
    '<br><br>With a quick shove, you roll the panting minotaur onto his back, exposing his pulsing ' +
      liveData.monster.cockDescriptShort(0) +
      ' to the open air.  A simple flourish later, you peel back your ' +
      liveData.player.armorName +
      ' to expose your ' +
      liveData.player.vaginaDescript(0) +
      ', already wetter than usual from the scent in the air.   You walk forward, straddling the oblivious minotaur as he masturbates furiously, muscles bulging with exertion and covered in sweat.  Your eyes zero in as a dollop of pre escapes his ribbed horse-like member, locating the source of the scent.<br><br>',
  );
  //Too small
  if (liveData.player.vaginalCapacity() < liveData.monster.cockArea(0)) {
    GUI.outputText(
      'Restraint evaporates as you lower yourself, your aching ' +
        liveData.player.vaginaDescript(0) +
        ' desperate for contact.  Your thighs quiver as you touch his wobbling column of maleness, the slick pre-cum soaking into your engorged clitty, filling it with tingling warmth.  Oblivious to the apparent size difference, your body pushes downwards, your knees giving out, forcing his flared head against your ' +
        liveData.player.vaginaDescript(0) +
        " roughly.  The need to be speared on the beast's meat is overwhelming urged on by constantly leaking pre-cum currently pumping into your love-canal.  With strength born of unnatural lust, you grip his flanks and drive yourself downwards, feeling yourself stretch painfully as you take in his length.  ",
    );
  }
  //Good match
  if (liveData.player.vaginalCapacity() >= liveData.monster.cockArea(0) && liveData.player.vaginalCapacity() < liveData.monster.cockArea(0) * 1.5) {
    GUI.outputText(
      'Restraint evaporates as you lower yourself, your aching ' +
        liveData.player.vaginaDescript(0) +
        ' desperate for contact.  Your thighs quiver as you touch his wobbling column of maleness, the slick pre-cum soaking into your engorged clitty, filling it with tingling warmth.  You push downwards eagerly, happily noting that you should be able to accommodate his length and girth.  The overly wide head slips inside, easily lubricated with his copious fluids, musky pre-spunk lubricating your passage with its intoxicating sensation.  With deliberate slowness, you sink down along his shaft, shuddering once, twice, then three times as you pass each of the thick fleshy rings along his length.  Eventually, you bottom on him.  ',
    );
  }
  //Bigger than he is
  if (liveData.player.vaginalCapacity() >= liveData.monster.cockArea(0) * 1.5) {
    GUI.outputText(
      'Restraint evaporates as you lower yourself, your aching ' +
        liveData.player.vaginaDescript(0) +
        ' desperate for contact.  Your thighs quiver as you touch his wobbling column of maleness, the slick pre-cum soaking into your engorged clitty, filling it with tingling warmth.  With a lusty giggle you slip his head inside your ' +
        liveData.player.vaginaDescript(0) +
        ', allowing him to drool his musky pre-seed deep inside your wide love-canal.  Sinking down slowly, your easily encompass all of his equine-like member, enjoying the feeling of his three thick cock-ridges as they slip through your lips.  Eventually you take all of him, wishing he was just a bit bigger...',
    );
  }
  //Resume sexings, p2
  GUI.outputText("<br><br>At last you feel the minotaur's meaty hands grab you by the ");
  if (liveData.player.isTaur()) GUI.outputText('hindquarters, forcefully grinding your vagina along his length like a toy.  ');
  else GUI.outputText(liveData.player.hipDescript() + ', forcefully grinding up and down along his length like a cheap sex-toy.  ');
  //Size variants
  //Too small
  if (liveData.player.vaginalCapacity() < liveData.monster.cockArea(0))
    GUI.outputText(
      'Every ridge of his ' +
        liveData.monster.cockDescriptShort(0) +
        ' presses tightly against your walls, smearing more of his wondrous pre-seed into your body with every stroke.  ',
    );
  //Just right
  if (liveData.player.vaginalCapacity() >= liveData.monster.cockArea(0) && liveData.player.vaginalCapacity() * 1.5 < liveData.monster.cockArea(0))
    GUI.outputText(
      'Every stroke of his ' +
        liveData.monster.cockDescriptShort(0) +
        ' deposits a bit more of his wondrous preseed into your body, spreading a relaxing warmth throughout your groin.  ',
    );
  //Too big
  if (liveData.player.vaginalCapacity() * 1.5 >= liveData.monster.cockArea(0))
    GUI.outputText(
      'Every stroke of his ' +
        liveData.monster.cockDescriptShort(0) +
        ' slides easily into your ' +
        liveData.player.vaginaDescript(0) +
        ', allowing him to slowly build up a puddle of his wondrous druggy pre-seed into your aching womb.  ',
    );
  //Resume!
  GUI.outputText(
    'The minotaur picks up the pace, heartbeat thudding through his rigid meat, making it convulse and vibrate as he slams you down on it over and over again.  You feel his balls twitching against your ass as his cock visibly thickens, bulging out at the base and slowly fattening inside you until it feels fit to burst.  With a throaty roar he cums at last, fountaining seed directly into your womb.  Your eyes roll back as it fills you, swooning as you feel the liquid pleasure seeping into you.  Your ' +
      liveData.player.vaginaDescript(0) +
      ' clamps down, trapping his seed inside, his orgasm dragging on as his balls begin to shrink.  The copious fluid fills your womb, distending your belly painfully.  The minotaur gives one last powerful spurt, the force pushing you off his ' +
      liveData.monster.cockDescriptShort(0) +
      ', just as you both reach total sexual satisfaction.<br><br>',
  );
  //Check for stetchiness!
  liveData.player.cuntChange(liveData.monster.cockArea(0), true);

  //ITS OVER
  GUI.outputText(
    'He passes out with a contented sigh, balls shrunk down to the size of baseballs and his cock still dribbling cum.  You pull yourself to your feet unsteadily, drunk with pleasure as you stagger away, clamping your ' +
      liveData.player.vaginaDescript(0) +
      ' down unconsciously to hold in his wonderful seed.',
  );
  if (liveData.player.vaginalCapacity() < liveData.monster.cockArea(0))
    GUI.outputText(
      '<br><br>Mixed with the sheer sexual pleasure, you feel a diffuse pain and numbness coming from your much-abused ' +
        liveData.player.vaginaDescript(0) +
        ', but decide with a smile that it was well worth it as his cum numbs away the last of the pain.',
    );

  liveData.player.dynStats(['spe', -0.5], ['int', -0.5], ['sen', 1.5], ['cor', 1]);
  //Preggers chance!
  liveData.player.knockUp(ENUM.PregnancyType.PREGNANCY_MINOTAUR, ENUM.IncubationType.INCUBATION_MINOTAUR); //TODO Add in player pregnancy progression for mino pregnancy.
  COMBAT.cleanupAfterCombat();
  liveData.player.orgasm();
}

//Herm Rape
export function minotaurGetsRapedByHerms() {
  //spriteSelect(44);
  minoRapeIntro();
  liveData.player.minoCumAddiction(5);
  liveData.player.slimeFeed();
  GUI.outputText(
    "<br><br>With little care for the beast's feelings, you grip his cock with both hands, pulling it towards yourself, bending it up at an awkward angle that makes him give a trembling moo of pain.   You edge closer, your own " +
      liveData.player.cockDescript(0) +
      ' bumping into his pucker, his obscene equine-like cock dripping that wonderfully scented spunk as you pull it to your ' +
      liveData.player.vaginaDescript(0) +
      ', smearing it against your cunt-lips.<br><br>',
  );
  GUI.outputText(
    'With a twisted grin and a grunt of pain, you push forward, slipping his ' +
      liveData.monster.cockDescriptShort(0) +
      ' into your ' +
      liveData.player.vaginaDescript(0) +
      ' as your ' +
      liveData.player.cockDescript(0) +
      ' penetrates his tight but accommodating back-door.  You immediately feel a surge of his pre-cum squirt into you as you push forward, forcefully spearing yourself AND him at the same time.  The slick fluids spread warmth through your groin, making you feel light-headed and horny at the same time, spurring you to force the last of both cock-lengths into their respective holes.<br><br>',
  );
  // let temp = liveData.player.vaginas[0].vaginalLooseness
  liveData.player.cuntChange(liveData.monster.cockArea(0), true);
  if (liveData.player.vaginas[0].vaginalLooseness < ENUM.VaginalLoosenessType.VAGINA_LOOSENESS_GAPING)
    GUI.outputText(
      'A small suppressed part of your mind dimly registers that this should be fairly painful, but the lust and drug-like pre-cum wash that thought away with waves of pleasure.  ',
    );
  if (liveData.player.vaginas[0].vaginalLooseness >= ENUM.VaginalLoosenessType.VAGINA_LOOSENESS_GAPING)
    GUI.outputText(
      'The intense feelings seem to grow more and more powerful as he stays inside you, his drug-like pre-cum making your ' +
        liveData.player.vaginaDescript(0) +
        ' tingle from the inside-out.',
    );
  GUI.outputText(
    'Your ' +
      liveData.player.cockDescript(0) +
      " quivers from his tightness, each beat of his powerful heart squeezing you tightly in his rear passage.   Through your foggy mind, you come to realize that your hips are pistoning against him with disturbing speed, burning away what's left of your reason with white-hot lust and minotaur spunk.  You slap his ass as you fuck him, humiliating the beast, leering down at him as he moos and moans hopelessly.   At last the pleasure overwhelms you, and you fire your spunk into him like a cannon, your hips still fucking him with unthinking determination.   Jizz sputters from his tail-hole with each thrust, splattering over his ass-cheeks.  A sudden blast of inhuman warmth fills you as the beast begins to cum, huge blasts pouring directly into your womb with every thrust of monstrous meat into your " +
      liveData.player.vaginaDescript(0) +
      '.<br><br>',
  );
  GUI.outputText(
    'Your orgasms drag on, until at last your belly is distended with the stuff and his ass is full of your cum.  With a lurch and a pop, you stagger free of him, barely able to walk with so much of his heavenly spunk inside you.  Even now your body tingles with unnatural pleasure and warmth.  Giggling, you realize the beast is passed out at your feet, his balls half as big as before. ',
  );

  liveData.player.dynStats(['spe', -0.5], ['int', -0.5], ['sen', 1.5], ['cor', 1]);
  //Preggers chance!
  liveData.player.knockUp(ENUM.PregnancyType.PREGNANCY_MINOTAUR, ENUM.IncubationType.INCUBATION_MINOTAUR);
  COMBAT.cleanupAfterCombat();
  liveData.player.orgasm();
}

//Tentacle Rape Scenes - multi tentacle
export function rapeMinotaurTentacles() {
  //spriteSelect(44);
  //multicock but single tentalce rape scene
  if (liveData.player.cocks.length > 1 && liveData.player.countCocksOfType(ENUM.CockType.TENTACLE) == 1) {
    rapeMinotaurTentacle();
    return;
  }
  minoRapeIntro();
  let x = 0;
  let counter = 0;
  while (counter < liveData.player.cockTotal()) {
    if (liveData.player.cocks[counter].cockType == ENUM.CockType.TENTACLE) {
      x = counter;
      break;
    }
    counter++;
  }
  let mismatched = false;
  let temp2 = 0;
  GUI.clearOutput();
  if (liveData.monster.HP <= 0)
    GUI.outputText('The minotaur collapses backwards after your last blow. Defeated and tired, he can barely stand up as you approach.  ');
  else {
    GUI.outputText('The minotaur drops his arm');
    if (liveData.monster.weapon.equipmentName == 'axe') GUI.outputText(', letting his axe clatter to the floor');
    GUI.outputText('. Transfixed by your ' + liveData.player.multiCockDescript() + ' in front of his face, he barely notices as you walk closer.  ');
  }
  GUI.outputText(
    'You grab his arm firmly, making certain there will be no retaliation during the pleasure. By the look on his face, and the state of his torn, rolled up loincloth, though, you doubt that will be a problem.  ',
  );
  if (liveData.player.cor < 25)
    GUI.outputText(
      'You cry, petting his hair, smoothing it across his horns, justifying to yourself that you are raping this beast because this is how this world works as you maneuver your ' +
        liveData.player.multiCockDescript() +
        ' towards his tailhole.  ',
    );
  if (liveData.player.cor >= 25 && liveData.player.cor < 50)
    GUI.outputText('You smoothly guide your ' + liveData.player.multiCockDescript() + ' toward his tailhole.  ');
  if (liveData.player.cor >= 50 && liveData.player.cor < 80)
    GUI.outputText('You roughly grab him, slamming him close to your ' + liveData.player.multiCockDescript() + ' - just how this beast likes it.  ');
  if (liveData.player.cor >= 80)
    GUI.outputText('You grin and roughly pull his horns towards your ' + liveData.player.multiCockDescript() + ', ready to roughly ride this beast.  ');
  //Mixed dix
  if (liveData.player.cockTotal() != liveData.player.countCocksOfType(ENUM.CockType.TENTACLE)) {
    mismatched = true;
    let temp = liveData.player.cocks.length;
    temp2 = -1;
    //Find the first non-tentacle dick for a point of comparison
    while (temp > 0 && temp2 == -1) {
      temp--;
      if (liveData.player.cocks[temp].cockType != ENUM.CockType.TENTACLE) temp2 = temp;
    }
    //failsafe
    if (temp2 == -1) temp2 = 0;
    //Find the longest non-tentace dick
    temp = liveData.player.cocks.length;
    while (temp > 0) {
      temp--;
      //Check to see if this cock is longer than the saved one.
      if (liveData.player.cocks[temp].cockLength > liveData.player.cocks[temp2].cockLength && liveData.player.cocks[temp].cockType != ENUM.CockType.TENTACLE) {
        temp2 = temp;
      }
    }
    GUI.outputText(
      'Your ' +
        liveData.player.cockDescript(temp2) +
        ' slams into his tailhole, spreading it wider as you thrust in and out of the opening, relishing in the feeling of the rough, yet lubricated insides of the minotaur.  ',
    );
  }
  //Not mismatched
  else {
    temp2 = 0;
    GUI.outputText(
      "One of your prehensile dicks coils in on itself as it nears the minotaur's tailhole, readying itself. It then suddenly springs itself into his fleshy orifice, wiggling and writhing in deeper and deeper until all " +
        liveData.player.cocks[0].cockLength +
        ' inches of it have submerged itself inside his intestines. You and he both shudder as your cock starts weaving from side to side, making slithering motions inside him.  ',
    );
  }
  //Vaginassss
  if (liveData.player.vaginas.length >= 1) {
    GUI.outputText(
      'With your ' +
        liveData.player.cockDescript(temp2) +
        ' successfully embedded in the minotaur, you twist around, positioning your ' +
        liveData.player.vaginaDescript(0) +
        " to take the minotaur's enormous length into yourself.  You feel his member deliciously slide in, and feel the beast's hot breath radiate as he starts panting in lust.  ",
    );
    liveData.player.cuntChange(liveData.monster.cockArea(0), true, false, true);
  }
  //Multivaginas...wtf
  if (liveData.player.vaginas.length > 1 && !mismatched && liveData.player.cocks.length > 2)
    GUI.outputText(
      'Your tentacle cocks writhe upon themselves, each turning to an unattended ' +
        liveData.player.vaginaDescript(1) +
        ' on your body, and quickly filling up the cavernous depths. You groan in ecstasy at the self-fucking you are receiving as all your pussies start leaking their wonderful fluids.  ',
    );
  //more dicks than available holes
  if (liveData.player.countCocksOfType(ENUM.CockType.TENTACLE) == 2 || liveData.player.countCocksOfType(ENUM.CockType.TENTACLE) == 3)
    GUI.outputText(
      "Your next tentacle dick, saddened by not having anything to writhe around, turns to the minotaurs protruding member. It darts out from your crotch, wrapping around his monstrous meat and constricting, like a snake might around its prey. Your tongue lolls out as you feel that cock twist and grab his dick, pulsing with both your blood and the beast's twitching member.  ",
    );
  if (liveData.player.countCocksOfType(ENUM.CockType.TENTACLE) > 3)
    GUI.outputText(
      'Your remaining tentacle dicks wave around the minotaur, tending to his balls, weaving around his limbs, and generally rubbing and throbbing all over him, spreading pre-cum around and through him, leaving both of you moaning in pleasure.  ',
    );
  //Cum
  GUI.outputText(
    'Your tentacles throb and pulse, quickening in pace as you can feel the cum swelling in your prostate. They wave madly, and then, just as their motion makes you dizzy, you feel them stiffen suddenly, and start spewing their load all in and across the minotaur. You gasp and pause, collapsing on the strong back of the minotaur, basking in the afterglow.',
  );

  COMBAT.cleanupAfterCombat();
  liveData.player.orgasm();
}

//Tentacle Rape Scenes - single tentacle
export function rapeMinotaurTentacle() {
  //spriteSelect(44);
  minoRapeIntro();
  let x = 0;
  let counter = 0;
  while (counter < liveData.player.cockTotal()) {
    if (liveData.player.cocks[counter].cockType == ENUM.CockType.TENTACLE) {
      x = counter;
      break;
    }
    counter++;
  }
  GUI.clearOutput();
  GUI.outputText(
    'You stand before the defeated minotaur and your tentacle dick begins to lash back and forth quickly, showing your excitement.  You see the hardness of his dick, and decide to do something about it... for both of you.  ',
  );
  GUI.outputText(
    "You come up behind him and wrap your tentacle dick around his huge member, squeezing him tightly at his dick's base pump even more blood to it.  Then you wrap yourself around his massive erection a few more times and you're ready. You jerk him up and down, varying the pace, place, and strength of your grip, milking his dick for all he is worth.  ",
  );
  GUI.outputText(
    "The minotaur's balls begin to spasm, so you wrap the base of your tentacle around him tightly, preventing his " +
      liveData.monster.cockDescriptShort(0) +
      ' from cumming, driving the minotaur mad with desire.  Your own ' +
      liveData.player.cockDescript(x) +
      ' delights in the feeling of the fur of his balls and the hardness of his ' +
      liveData.monster.cockDescriptShort(0) +
      '.  ',
  );
  //Reset for upcoming stuff
  let temp = 0;
  //if multi with pony dick!
  if (liveData.player.countCocksOfType(ENUM.CockType.HORSE) == 1) {
    GUI.outputText(
      "But it isn't enough for you. You take your pony prick, and with your hands, pull his anus wide. The flare at your tip takes some effort to get in, but once it's inside, you ram right to the hilt, knocking the wind from the minotaur with a solid grunt.  ",
    );
    temp = 1;
  }
  //if multi with dogdick
  if (liveData.player.dogCocks() == 1 && temp != 1) {
    temp = 1;
    GUI.outputText(
      "But it isn't enough for you. You take your bitch knotter, and with your hands, pull his anus wide. You slide in easily, right up to your knot, but he's too tight for you to slip that in.  ",
    );
  }
  //If single leftover dick
  if (liveData.player.cocks.length == 2 && temp != 1) {
    temp = 1;
    GUI.outputText("But you avail yourself of his free rear end, to further your own delights. A quick push, and you're in, buried to your hilt.  ");
  }
  if (liveData.player.cocks.length > 2 && temp != 1) {
    temp = 1;
    GUI.outputText(
      "It's not enough! Your other dicks demand attention too! Fortunately, he has a large hole for you to abuse... you stuff as many of your " +
        liveData.player.multiCockDescript() +
        ' as you can, the rest hanging underneath him, slapping against his sack. ',
    );
  }
  if (liveData.player.clitLength > 6) {
    GUI.outputText(
      "Eager for more stimulation, you muse that your clit's big enough to fuck with, so why not!? You take your fingers, spit on them, and slide them into place, opening him up wider to accept your " +
        liveData.player.clitDescript() +
        ". It's so sensitive, sliding into that tight hole, and the sensations are driving you wild as you hump against him with your dick-like clit.  ",
    );
  }
  //Free pussy!
  if (liveData.player.vaginas.length > 0) {
    temp = 2;
    GUI.outputText(
      "You're a woman, and it's about time you got some pussy action too!  You slide your " +
        liveData.player.vaginaDescript(0) +
        ' onto ' +
        liveData.player.cockDescript(x) +
        "-wrapped minotaur-prick, further driving the beast mad with lust.  He plaintatively groans, struggling to get his dick free or to cum, you aren't quite sure.  ",
    );
    GUI.outputText(
      'Eventually, the moment is right.  You smile as you feel a boiling heat building in your groin, surging through your ' +
        liveData.player.multiCockDescript() +
        ' in a tide of white-hot pleasure.  You groan and shiver, lost in the pleasure until you begin to calm down.  ',
    );
    if (liveData.player.cumQ() < 50)
      GUI.outputText(
        'Your cock made quite a mess of things, and when you pull him out, your ' + liveData.player.vaginaDescript(0) + ' makes a wet sucking sound.  ',
      );
    if (liveData.player.cumQ() >= 50 && liveData.player.cumQ() < 400)
      GUI.outputText(
        'Your cock made quite a mess of things inside your ' +
          liveData.player.vaginaDescript(0) +
          '.  As you pull free, cum drips freely down your thighs.  The heavenly scent of minotaur spunk fills your nose, and begin scooping the mixed jizz up to sample.  ',
      );
    if (liveData.player.cumQ() >= 400)
      GUI.outputText(
        'Your cock made quite a mess of things inside your ' +
          liveData.player.vaginaDescript(0) +
          '.  As you pull free, a river of cum pours from betwixt your thighs.  The heavenly scent of minotaur spunk fills your nose, and you begin scooping the mixed jizz up to sample.  ',
      );
  }
  //Free ass!
  else {
    temp = 2;
    GUI.outputText(
      "You're feeling a little kinky so you step in front of him, offering him a little bit more, pushing yourself down onto his meaty dick.  You slowly push down, enjoying every inch as it travels down your " +
        liveData.player.assholeDescript() +
        ', the pre leaking from it acting as a lubricant as his tentacle-wrapped cock works its way inside you.  ',
    );
    //Ass cum
    GUI.outputText(
      'Eventually, the moment is right.  You smile as you feel a boiling heat building in your groin, surging through your ' +
        liveData.player.multiCockDescript() +
        ' in a tide of white-hot pleasure.  You groan and shiver, lost in the pleasure until you begin to calm down.  ',
    );
    if (liveData.player.cumQ() < 50)
      GUI.outputText('Your cock in his ass made a mess of things, and when you pull out, it makes a wet sucking sound, trying to keep you inside.  ');
    if (liveData.player.cumQ() >= 50 && liveData.player.cumQ() < 400)
      GUI.outputText('Your cock in his ass spills forth, creating a puddle which will mat his fur later.  ');
    if (liveData.player.cumQ() >= 400)
      GUI.outputText(
        'Your cock is blasted free from his ass by the force of your ejaculation, splattering rivers of spoo over the ground.  A river of the stickiness pours from his violated asshole, sticking in the fur of his thighs.  ',
      );
  }
  //Cum time
  if (temp < 2) {
    if (liveData.player.cumQ() < 25)
      GUI.outputText(
        "Eventually, the moment is right... you position yourself accordingly to do what you have in mind.  Your needs are both at their peak, and release will be soon!  Once you're properly set up behind him, you shove his head forward, making him take both your, and his own, dick into his mouth. His tongue trying to shove you out, slipping in between his and your own dick pushes you over the edge, and you release his balls, causing both of your dicks to fill his mouth with cum.",
      );
    //Big Cum
    if (liveData.player.cumQ() >= 25 && liveData.player.cumQ() < 250)
      GUI.outputText(
        "Eventually, the moment is right... you position yourself accordingly to do what you have in mind. Your needs are both at their peak, and release will be soon! Once you're properly set up behind him, you shove his head forward, making him take both your and his own dick into his mouth. His tongue tries to shove you out, slipping in between his and your own dick.  It pushes you over the edge, and you release his balls, causing both of your dicks to flood his mouth with cum, which dribbles out around his lips, and splatters onto his chest.",
      );
    if (liveData.player.cumQ() >= 250 && liveData.player.cumQ() < 500)
      GUI.outputText(
        "Eventually, the moment is right... you position yourself accordingly to do what you have in mind. Your needs are both at their peak, and release will be soon! Once you're properly set up behind him, you shove his head forward, making him take both your and his own dick into his mouth. His tongue tries to shove you out, slipping in between his and your own dick.  It pushes you over the edge, and you release his balls, causing both of your dicks to overflow his mouth with cum, spraying out his nose, forcing him to swallow from sheer volume.",
      );
    if (liveData.player.cumQ() >= 500)
      GUI.outputText(
        "Eventually, the moment is right... you position yourself accordingly to do what you have in mind. Your needs are both at their peak, and release will be soon! Once you're properly set up behind him, you shove his head forward, making him take both your, and his own dick into his mouth. His tongue tries to shove you out, slipping in between his and your own dick.  It pushes you over the edge, and you release his balls, allowing him to cum. However, your own cum dwarfs his pathetic volume... forcing him to swallow load after load of your hot sticky jizz. Even so, the volume exceeds his ability to down it, and cum sprays out of his mouth, an arc shooting out of his nose every now and again further commenting on the capacity of your massive ejaculation.",
      );
  }

  COMBAT.cleanupAfterCombat();
  liveData.player.orgasm();
}

//Urethral Penetration Scene
export function minoUrethralPen() {
  //spriteSelect(44);
  minoRapeIntro();
  let counter = 0;
  let x = 0;
  //Find which dick to use!
  while (counter < liveData.player.cockTotal()) {
    if (liveData.player.cocks[counter].cockThickness <= 4 && liveData.player.cocks[counter].cockLength >= 14) {
      x = counter;
      break;
    }
    counter++;
  }
  //Infested version!
  if (liveData.gameFlags[FLAG.INFESTED] == 5) {
    //TODO Change Infested Status Effect to GameFlag
    GUI.outputText(
      'Grinning maliciously, you shove the minotaur onto his back, his massive equine dong slapping him in the chest as he lands with a grunt. Fondling your ' +
        liveData.player.cockDescript(x) +
        ' as you gaze upon his splendid rod, you suddenly shudder with pleasure as the worms in your ' +
        liveData.player.sackDescript() +
        " wriggle around deliciously, a few of them escaping from your tip along with a copious dollop of pre.  The meager group of wiggling parasites crawling lamely towards the fallen brute gives you a wicked idea, flushing your entire body with arousal as you step over the minotaur and grab his prick firmly. Recognizing your plan, your parasitic pets begin to churn happily in your balls as you smear your pre over the minotaur's urethra.<br><br>",
    );

    GUI.outputText(
      'The brute breaks out of his defeated daze with a look of abject horror as he feels unnatural squirming on his flare, bolting upright and loosing a terrified "<i>MOO!!</i>" as he scrambles to distance himself from your infested semen. You cackle with sick delight at his meager attempts to escape and grasp the head of his cock firmly, causing him to grunt with pain as you yank him back over to you by his flared rod and line the head of your ' +
        liveData.player.cockDescript(x) +
        ' up with his urethra. His eyes lock with yours, a pleading, desperate look in them as your balls surge from the anticipation. Unable to hold back against the unholy squirming of your infested cum, you grin evilly and ram your throbbing, infested prick deep into his shaft.<br><br>',
    );

    GUI.outputText(
      'The minotaur writhes and moans, openly panicking but too weak to resist, as you saw your ' +
        liveData.player.cockDescript(x) +
        ' back and forth into his cock-hole, relishing the helpless look the once-mighty beast is displaying as you feel your worms steadily making their way down your cock. He must feel how the worms bulge your tool as they work their way down, nearing the end of your length as he shudders and shakes his head in denial. You give a tiny spasm of delight, tongue lolling out of your ' +
        liveData.player.face() +
        " as the first of your worms pour out of your tip and directly into the beast's urethra.<br><br>",
    );

    GUI.outputText(
      'Upon contact with his cum, your parasites go into overdrive, the musky narcotic cum of the minotaur exciting them as they suddenly begin surging out of your balls. Holding your orgasm back becomes impossible as you roar and buck your hips, ramming yourself fully into his shaft while the pulses of squirming jism shoot straight into his prostate and balls. You grip him with both hands, feeling the wonderfully perverse wriggling of your pets throughout his urethra and your own, truly relishing the thought of securing your pets a new home to infest as your mind nearly blanks from the release. Drooling with sick delight at infesting such a mighty beast, you suddenly feel the sensation of a large worm bulging your urethra as it shoots down into the minotaur, making you shudder with pleasure and making the poor mino lock his muscles in a sudden orgasm. Your surging cum and worms push his cum straight back into him, and he yells out in anguish, tears streaming from his eyes from the unbearable pressure that he must be feeling, aside from the obscene amounts of pleasure, that is...<br><br>',
    );

    GUI.outputText(
      'The minotaur shivers, eyes wide and mouth open with breathless screams as his scrotum begins to visibly squirm, then bloat, swelling with the churning parasites. Without having to waste their effort on pinning the brute down, your worms get right down to business doing what they were made for, turning this minotaur into a constantly-cumming, worm infested, puddle of fuck - a slave to the endless orgasms your pets provide, just like you. The thought makes you cum one last time, a huge spurt of wormy jism making his balls swell obscenely before you finally pull out. Sated but exhausted, you flop down on your ' +
        liveData.player.buttDescript() +
        ' and fondle yourself in a daze, feeling the large worms in your ' +
        liveData.player.sackDescript() +
        ' wriggle happily while you watch the squirming, newly infested minotaur writhe in the dirt of the cave, bringing a wicked smile to your face.<br><br>',
    );

    GUI.outputText(
      'Mooing and groaning, the beast succumbs to the obscene ministrations of his new "<i>friends</i>" and begins jacking himself off, a dull, glazed look of bliss on his face as his huge horse dong visibly worms in his grasp.  ',
    );

    //- [Normal (with worms...) semen production]:
    if (liveData.player.cumQ() < 1000)
      GUI.outputText(
        'His obscenely wriggling sack bounces against his ass with his thrusts as pre and worms flow down the sides of his dick, his enhanced balls not hindering his desperation to cum for the worms as he jacks himself harder and harder. The cum you pumped into them has swollen them to the size of large watermelons, the squirming parasites turning his balls into worm-factories as you watch him with a dazed sense of pride. His pre leaks out slowly, dropping the occasional worm or two onto his chest as the beast eagerly picks up the pace, and the dribbles turn into a steady stream as the minotaur grits his teeth, his sack tightening against his groin.<br><br>',
      );
    //- [High semen production( messy orgasms perk, large balls, whatever)]:
    else if (liveData.player.cumQ() < 5000)
      GUI.outputText(
        "His hugely bloated balls drape over his asshole, their sheer size spreading his legs apart and forcing him to lie on his back to masturbate. The mammoth balls in his outstretched sack are bigger than his head, about the size of beach balls as they pump a steady stream of worms and cum down the minotaur's horse-shaft, dribbling on his muscled chest lewdly as he brings himself back to his peak.<br><br>",
      );
    //- [Maximum/enhanced cum production(marae's gift: stud, elven bounty, spamming a shitload of succubus dream on debug mode, etc.)]:
    else
      GUI.outputText(
        "the beast's obscenely bloated balls actually lift his legs into the air as he jacks off, each nut almost as big as the minotaur's entire torso! You chuckle to yourself, impressed with your massive load and the additional swelling your pets provide as you watch his balls churn deliciously with their infested cargo, working to turn this bull into a worm-producing, cum-spraying, hyper-productive sex factory. Cum and worms pour out of the beast's cum-nozzle in what you assume to be his orgasm, splattering his chest and face obscenely with the squirming white goop. But you realize that this must just be a mere spurt of \"<i>pre-cum</i>\" as the beast soon arches his back and jacks harder and faster, his real orgasm fast approaching.<br><br>",
      );

    //scene finishers:
    //(normal and high cum production finish):
    if (liveData.player.cumQ() < 5000)
      GUI.outputText(
        "The beast cums, spraying a thick stream of infested jizz straight up into the roof of the cavern, causing wormy cum to rain down all over the both of you. The stream continues for several minutes, turning the entire interior of the cave white with worms and cum until the minotaur's eyes roll back into his skull.  He pants and drools as his new friends coat every inch of him. You shudder in arousal as some of his worms work their way back inside your own " +
          liveData.player.cockDescript(x) +
          ' and travel down to your ' +
          liveData.player.ballsDescriptLight() +
          ' re-filling your spent reserves while you rise and walk over to the infested beast, who is barely conscious, utterly insensate from the constant stream of bliss coming from his cock.  It finally dies down and slows to a trickle. Planting a kiss upon his worm-covered forehead, you chuckle and leave him to his fate as a horny and insatiable parasite-spreading animal.<br><br>',
      );
    //(maximum/enhanced cum production finish):
    else {
      GUI.outputText(
        "The beast roars as his hideously swollen nuts churn, an absolute deluge of infested jism blasting from his squirming horse-cock and actually pushing the minotaur forward from the massive nut-pressure. Every muscle in the bull-man's body seizes as the endless stream literally begins flooding the cave, inch after inch of squirmy cum pooling on the floor until it's up to your ankles and pouring out of the cave's entrance like an obscene river. As his flow tapers off, the minotaur suddenly bucks his hips into the air as a second spurt begins, his sack beginning to shrink a bit as gallons and gallons pour from the cave down the side of the mountain. Watching your infested toy launch blast after blast against the cave walls is satisfying beyond measure, and you feel the worms build back up in your own " +
          liveData.player.ballsDescriptLight() +
          ', readying your perverted anatomy to spread the infestation once more. The bull\'s last shot tapers down to a drizzle, his balls shrunken to the point where he can at least walk with his new "<i>friends</i>" without tripping over his enhanced cum-factories. Laying in a three-inch cum flood, the infested minotaur promptly passes out in the wake of his gargantuan orgasm.<br><br>',
      );

      GUI.outputText(
        "You walk over and pull him up against the wall, not wanting your sex beast to drown in his own jizz in his exhausted slumber. Chuckling slightly, you leave him and walk to the mouth of the cave, before a sudden noise from down the mountain catches your attention. The entire slope of the mountain below the minotaur's cave is glazed white with wormy cum, and you can't help the hysterical laughter that bellows from your lungs as you look down to see a couple of imps and a hellhound struggling fruitlessly against the newly released colony of worms, their dicks and balls bulging and swelling as the multitudes of parasites force their way into them. As you walk back to camp, you hear their terrified squeals turn into ecstatic howls and glance over your shoulder, seeing geysers of thick cum shoot into the air far behind you. You smile and pat your infested nuts, proud of the work of your vile symbiotic pets and resolving to let them loose on some unsuspecting prey again sometime...",
      );
    }
  } else {
    //--MINOTAUR URETHRAL PENETRATION--
    //(If your cock is 4 inches or less in width, but 2 or more feet long)
    GUI.outputText(
      'Overcome with lust and fatigue, the minotaur falls to the ground as you unhurriedly remove your ' +
        liveData.player.armorName +
        ". The minotaur's eyes roam all over your body, his massive cock hard and throbbing. You slowly begin to stroke your own hard cock, pre-cum beginning to drool thickly from the head and over your hand. You slide your hand up and down your long shaft, lubing it with your juices as you decide what to do with the fallen brute before you. An idea forms in your mind and your cock throbs with anticipation, your imagination already working out the entertaining details.<br><br>",
    );
    GUI.outputText(
      'With a hand covered in pre-cum, you roughly grab his fat prick and you smear it onto his flared cockhead, feeling it throb in your hand from the sensation. You press the head of your ' +
        liveData.player.cockDescript(x) +
        ' against his and start rubbing it slowly in circles, spreading your sweet pre all over its flared tip while your other hand slowly strokes his tool. The minotaur closes his eyes, enjoying the feeling of your hand and ' +
        liveData.player.cockDescript(x) +
        " rubbing against his own. It's then you make your move. You suddenly shove your " +
        liveData.player.cockDescript(x) +
        ' hard against the wide head of his equine-like prick. Naturally finding the only hole available, your ' +
        liveData.player.cockDescript(x) +
        " slides straight into his urethra fully on the first rough thrust. The minotaur's eyes open wide in surprise and he moos loudly at the abrupt stretching of his cock-hole. His moos quickly turn to grunts as you thrust into him, but you remain unconcerned whether or not he is in pleasure or pain, only interested in the tight hole wrapped firmly around your " +
        liveData.player.cockDescript(x) +
        '.<br><br>',
    );
    GUI.outputText(
      "The minotaur's grunts slowly turn into moans of pleasure as his body gives in to the stretching you're giving him, even making occasional thrusts towards you in an attempt to fit more of you into him. You smirk at the way you've managed to make this mighty beast into just another fuck toy for you to enjoy. As he thrusts at you again, you decide to oblige him. You firmly grasp the flared head of his cock with both hands and yank his cock onto yours even further. It presses into your groin and you feel a tight pressure at the tip of your " +
        liveData.player.cockDescript(x) +
        '. You shove once more, only to feel a hot liquid coat the head of your ' +
        liveData.player.cockDescript(x) +
        '. Looking down, you realize your entire length has filled and even surpassed his own - the warm liquid splashing your head with each hard thrust as thick cum boils up from inside him! You continue to pound your ' +
        liveData.player.cockDescript(x) +
        ' into his and with aid from his hot sperm covering its head, your orgasm quickly approaches. You eagerly double your speed and before long, you slam your ' +
        liveData.player.cockDescript(x) +
        " as deep as you can into him and unleash your seed directly into his urethra. You realize with a smile (and a groan from the minotaur) that his watermelon-sized balls and prostate could get quite a stretching, but the thought is quickly pushed aside as loads of cum pour out of you in mighty spurts. With each consecutive outpouring of jizz, you feel his balls swelling bigger and bigger until you've unloaded your last drop.<br><br>",
    );
    GUI.outputText(
      "You survey the results of your orgasm, quite pleased and more than a little bit proud. His balls have swollen grotesquely, now so large that he will have difficulty moving. The minotaur groans in pain and it occurs to you that in his current state he can't manage to cum either. As you pull your spunk covered cock free from his now gaping urethra, another wicked thought comes to your mind. You shove the minotaur so he lands on his chest. His ass sticks out in the air and his legs are spread wide, hips held high from the beach ball sized balls underneath him. You reach underneath him and pull his cock back towards you, leaving it pressed snug against the ground with his heavy balls pinning it down. The cock-hole still gapes lewdly from the pounding you gave it, a slow oozing of your cum flowing back out. You run your hand over your cock to gather up the cum coating it then reach down and smear it over his tight asshole, feeling it pucker and clench against your fingertips. You continue smearing it until your semen has coated it liberally. You smack his ass hard, then turn around and holler as loud as you can, knowing it will interest every horny creature within earshot. You look back once at the minotaur and see his eyes wide with fear as he starts mooing, desperate to get out of the predicament he is in. You hesitate, seeing such an inviting target, but you tire from your performance and you leave the struggling creature to the inhabitants of the mountain.<br><br>",
    );
    GUI.outputText(
      "You know that he won't be able to leave or put up much of a struggle until he's managed to cum, but with his balls pinning his cock down, that could be a while. Meanwhile, his raised ass and stretched urethra invite everyone around to take a turn.",
    );
  }

  COMBAT.cleanupAfterCombat();
  liveData.player.orgasm();
}

//Minotaur Blowjob
export function minotaurBlowjob() {
  //spriteSelect(44);
  GUI.clearOutput();
  const x = liveData.player.cockThatFits(80);
  GUI.outputText('You step towards the minotaur, ');
  if (!liveData.player.isTaur()) GUI.outputText('peeling away your ' + liveData.player.armorName + ' and ');
  GUI.outputText(
    'revealing your ' +
      liveData.player.multiCockDescriptLight() +
      ' to the defeated bull.  The beast looks to you in both arousal and shock, mouth parting slightly at the idea of another creature taking charge.  Within the musky stench of its dripping shaft you nearly lose yourself, and ',
  );
  if (!liveData.player.isTaur()) GUI.outputText('taking the bull by the horns');
  else GUI.outputText('pinning his horns in the crook of your forelegs');
  GUI.outputText(
    ', you guide its mouth closer to your member as if on autopilot.  "<i>Let\'s see just how good you are at milking,</i>" you blurt; the minotaur moos in defiance but is soon silenced when the head of your ' +
      Appearance.cockNoun(liveData.player.cocks[x].cockType) +
      ' presses into its bovine mouth.<br><br>',
  );

  GUI.outputText(
    "You grimace at the awkward feeling of the beast's snout against you, but soon regain confidence in your choice as the monster begins to take your prick into his mouth.  His eyes grow wide as his lips wrap around you, with ",
  );
  if (liveData.monster.lust >= liveData.monster.maxLust()) GUI.outputText('his own burning lusts');
  else if (liveData.player.findPerk(PerkLib.ArousingAura) >= 0) GUI.outputText('the power of your corruption');
  else GUI.outputText('the salty taste of your pre-cum');
  GUI.outputText(' leaving him hungry for more.<br><br>');

  GUI.outputText(
    "At this realization he attempts to pull away, to save himself from the ordeal, but in his debilitated state his efforts are as weak as a kitten's. Held firmly by the horns, the bull-man slowly succumbs.  Unable to control himself in his lust, he licks at the cock within his mouth wildly, his thick cow-like tongue roughly wrapping around your length as you move yourself further within his sucking mouth.  From the combined effects of the creature's musk and maw you start to lose yourself as well, ",
  );
  if (!liveData.player.isTaur()) GUI.outputText('finding your hands leaving his horns for the back of his head ');
  GUI.outputText(
    'as your hips begin to thrust into his face.  In your daze you glance down, to see the minotaur roughly and futilely stroking his shaft, his eyes full of shame and desperation - full of wanting to not only release his pent-up arousal, but to taste your thick cum as well.<br><br>',
  );

  GUI.outputText(
    "You soon oblige the bull; your effort to fuck his face and the rapid bobbing of his head along your member quickly pass what little restraint you care to exercise on the monster's behalf.  Slamming the muzzle into your groin and leaning over his back, you begin layering the minotaur's tongue and tonsils with bursts of your seed.  Reaching down with ",
  );
  if (!liveData.player.isTaur()) GUI.outputText('your hand');
  else GUI.outputText('a forehoof');
  GUI.outputText(
    ', you quickly put a stop to his unimportant attempts to pleasure himself by knocking his hand from his meaty cock.  The bull moos over your prick in response, leaving you to shudder while he swallows every last drop of your cum.  You are unable to tell if the beast is blushing from arousal or being reminded of his submission, but it does not matter.<br><br>',
  );

  GUI.outputText(
    "Pulling yourself free from the thing's mouth, you let the abused creature fall flat onto its chest and then gather your armor to leave.  Once, you turn back, only to catch sight of the minotaur lost with himself, desperatly trying to fuck the ground beneath him and mooing in overstimulated agony from the experience.",
  );

  COMBAT.cleanupAfterCombat();
  liveData.player.orgasm();
}

//Steal Minotaur Cum
export function takeMinoCumDirectly() {
  //spriteSelect(44);
  GUI.clearOutput();
  GUI.outputText('Relishing your victory, you breathe deeply, shivering and stretching.  ');
  if (liveData.monster.HP < 1)
    GUI.outputText('The beast-man has fallen on his back, comatose and insensate, though his shaft has risen to full erectness, displacing his loincloth.');
  else
    GUI.outputText(
      "The beast-man is on his back with his legs splayed, masturbating hopelessly.  His anguished moans tell you all you need to know - he'll never get off alone.",
    );
  GUI.outputText('  You smile, blushing in anticipation, readying yourself for the coming bliss.<br><br>');

  GUI.outputText(
    'You shed your ' +
      liveData.player.armorName +
      ' and step over its waist, trembling slightly with anticipation of your next fix.  Taking his flared drug-nozzle in hand, you hold it steady and lower yourself down, feeling his slippery narcotic pre-cum smearing over your hole.  ',
  );
  //Too tight!
  if (liveData.player.analCapacity() < liveData.monster.cockArea(0)) {
    GUI.outputText(
      "You have to push harder and harder to get it inside you, even with the copious lube's drug-like affects relaxing your sphincter.  The penetration is slow, but inch by inch you force it inside you.",
    );
  } else {
    GUI.outputText('Your muscles instantly relax on contact with the pre, and you feel the massive tool sliding up your spacious asshole with ease.');
  }
  if (!liveData.player.buttChange(liveData.monster.cockArea(0), true)) GUI.outputText('  ');
  GUI.outputText(
    "The minotaur's eyes open wide as he lets out a lustful '<i>Moooooo</i>'.  He doesn't struggle or even move - you're giving him exactly what he wants, after all.<br><br>",
  );

  GUI.outputText(
    'You bottom out, sighing happily as you feel his hot fluids leaking inside you, radiating pure pleasure out from your core.   Bestial hands grab your ' +
      liveData.player.nippleDescript(0) +
      's and begin gently twisting them, taking surprising care for all their strength.  Spurred on by the feelings radiating from your ',
  );
  if (liveData.player.biggestTitSize() < 1) GUI.outputText('chest');
  else GUI.outputText(liveData.player.breastDescript(0));
  GUI.outputText(
    ' and hungry for even more bliss, you begin bouncing atop the defeated beast, repeatedly squeezing and relaxing yourself around him, trying to wring out the maximum possible amount of fluid.<br><br>',
  );

  GUI.outputText(
    "A flood of heated liquid pumps into you all at once as the minotaur caves in to your full-body stroking and squeezing of his massive shaft.   It swells inside you, pulsating a moment just before the next jet unloads into you.  You giggle uncontrollably as the effects of the ever-increasing spooge-load spread to your brain.  It feels as if your thoughts are struggling through cotton-candy, a pleasant pink fuzz that makes it hard to do anything but drool happily as you're pumped full of the drug you crave.<br><br>",
  );

  GUI.outputText(
    'You zone out, dimly aware of your hands roaming over your body in a wave of orgiastic sensations.  The uncomfortable feeling of being packed so full is completely masked by the artificial drug that fills every pore of your body, and you keep bouncing not realizing that the minotaur has finished cumming.  You find yourself wishing life could be like this for every moment of every day, blissful and pleasure-filled.<br><br>',
  );

  GUI.outputText(
    'An hour or so later, you pick yourself up out of a puddle of mud that reeks of sex.  Still feeling groggy and euphoric, you get dressed, not bothering to clean up.  You have to work to keep your ' +
      liveData.player.assholeDescript() +
      ' clenched, lest you lose some of the drug making you so happy.',
  );
  //(-80 lust, then + 25, +(1-5 sensitivity based on current level), +corruption)
  liveData.player.dynStats(['sen', 1], ['cor', 1]);
  liveData.player.changeLust(-55);
  //bonus sensitivity if unsensitive.
  if (liveData.player.sens < 80) liveData.player.dynStats(['sen', 1]);
  if (liveData.player.sens < 60) liveData.player.dynStats(['sen', 1]);
  if (liveData.player.sens < 40) liveData.player.dynStats(['sen', 1]);
  if (liveData.player.sens < 20) liveData.player.dynStats(['sen', 1]);
  //+15 addiction
  liveData.player.minoCumAddiction(15);
  COMBAT.cleanupAfterCombat();
}

//Mino Tit Fuck
export function minoGetsTitFucked() {
  //spriteSelect(44);
  liveData.player.slimeFeed();
  if (liveData.player.isNaga()) {
    AddictNagaOnMinotaur();
    return;
  }
  //(Rape ??? titfuck) Requires F+ cup breasts or DD+ breasts on top two rows.
  GUI.clearOutput();
  GUI.outputText('The helpless minotaur lays in the dirt, ');
  if (liveData.monster.HP < 1) GUI.outputText('defeated.  ');
  else GUI.outputText('masturbating uncontrollably.  ');
  GUI.outputText(
    "He's yours for the moment, and for right now, you want to see if that throbbing horse-cock will splatter its heavenly spunk all over your " +
      liveData.player.allBreastsDescript() +
      ' and ' +
      liveData.player.face() +
      ".  You really could use a fix, just enough to fuzz over all the worry and stress you've had to deal with.<br><br>",
  );
  if (liveData.monster.lust >= liveData.monster.maxLust()) GUI.outputText('You push his hands away and y');
  else GUI.outputText('Y');
  GUI.outputText(
    'ou lean over him, feeling your generous breast-flesh jiggle, your ' +
      liveData.player.nippleDescript(0) +
      "s tingling with desire as they rub across the horse-like minotaur dong.   The beast's pre starts forming into large drops along his flared head, and you waste no time smearing it through your cleavage, lubricating the space between your tits and breathing deeply of its perfect scent.",
  );
  if (liveData.player.totalCocks() > 0)
    GUI.outputText('  Your ' + liveData.player.cockDescript(0) + ' grows harder and more aroused than ever before while your ');
  else GUI.outputText('  Your body aches with arousal while your ');
  if (liveData.player.hasVagina()) GUI.outputText(liveData.player.vaginaDescript(0) + ' grows hotter and hotter, begging to be taken.');
  else GUI.outputText(liveData.player.assholeDescript() + ' puckers slightly, as if begging to be taken by another monstrous beast.');
  GUI.outputText('<br><br>');
  GUI.outputText("He moos out pitifully, clearly understanding what you're up to and frustrated he won't get to sate his desire in a tight mortal ");
  if (liveData.player.hasVagina()) GUI.outputText('cunt.  ');
  else GUI.outputText('ass.  ');
  GUI.outputText(
    'Out to prove him wrong by letting him release all over your face, you wrap your ' +
      liveData.player.allBreastsDescript() +
      ' tightly around him and begin sliding your body along his length.  The constant drizzling pre-cum easily lubricates you, and soon your orbs are shiny and slick with his drug-like fluid.<br><br>',
  );
  GUI.outputText(
    'As you begin shaking your breasts up and down, stroking his length, you feel the skin of his three rings of prepuce sliding the soaked skin of your tits.   You lick around the edge of his crown when it presents itself to your lips, making sure to take in a nice fat dollop of his thick cream.  It makes you dizzy for a moment, and you nearly slide off, but the sensation passes.  You need more.  You squeeze your ' +
      liveData.player.allBreastsDescript() +
      " tighter around him, squeezing out a few more drops as you feel the manhood begin to swell, growing harder and larger as the minotaur's orgasm approaches.<br><br>",
  );
  GUI.outputText(
    'The minotaur\'s balls clench tightly as the bull-man throws his head back and screams out in pleasure and relief, "<i>MooooOOOOOOooooOOOOO!</i>"<br><br>',
  );
  GUI.outputText(
    'You squeeze tightly and press down, watching his dick-head flare out, nearly doubling size before it unloads, drenching your face and hair with his thick narcotic cream.   You manage to get your lips against it in time for the next blast, and nearly drown when it overfills your mouth.  You pull back, coughing, starting to get high, and swaying woozily as more and more cream spatters your body, continuing to be squeezed out by your slick heaving breasts.<br><br>',
  );
  GUI.outputText(
    'The bull-man relaxes at last, drenching you with one last wave before he passes out.  You stagger up and nearly trip over your legs, giggling and drunk on cow-spunk as you noisily slurp down the fluids drenching your face and hair.  You black out for a while...<br><br>',
  );
  GUI.outputText(
    "You wake up an hour later, unsure how you made it back to your camp, light-headed and euphoric with the lingering after-affects.  You also find a bottle on the ground next to you, filled to the brim with the fluid.  You don't remember filling it up, but you're already itching to pop it open and guzzle it down.  You manage to resist the urge.  Besides, you're still feeling GREAT from your last 'sample'.",
  );
  liveData.player.minoCumAddiction(10);
  liveData.monster.name = 'tit-fucked Minotaur';
  liveData.player.dynStats(['sen', 0.5], ['cor', 0.7]);
  COMBAT.cleanupAfterCombat();
  liveData.player.orgasm();
}

//Naga Cum Addict Scene
export function AddictNagaOnMinotaur() {
  //spriteSelect(44);
  GUI.clearOutput();
  //[if (monster.lust >= 99)
  if (liveData.monster.lust >= liveData.monster.maxLust())
    GUI.outputText(
      "You slither towards the fallen monster, wishing to taste his addictive semen.  He's currently engaged in stroking his enormous shaft up and down with both of his hands, but offers little resistance when you push him over to a sitting position.  You pull his hands away and replace them with yours, running your fingers up and down along his thickness, working yourself up with anticipation.  He leans back and exhales loudly, clearly appreciative.<br><br>",
    );
  else
    GUI.outputText(
      'You slither towards the fallen monster, wishing to taste his addictive semen.  You notice that, despite the beating you just gave him, his huge cock is fully erect.  Delighted, you gently run both of your hands up and down its long shaft.  He exhales loudly, signaling his appreciation.<br><br>',
    );

  GUI.outputText(
    "A bit of gooey pre-cum begins to gather at the tip of his thick, horse-like cock.  Your tongue flits out instinctively, and you taste its scent in the air.  It's too much for you to handle, and you are overcome with an absolute need to fill yourself with his nectar.  You throw yourself onto his crotch, grabbing his thighs and rubbing his cock along your torso as you position your mouth over his length, taking care to keep your long fangs out of the way.  You violently pull yourself to him, forcing more of him than you thought you could handle down your throat.  You feel his pre lubricating your insides, numbing you to the pain and allowing you to take him deeper.  You take one hand from his leg and place it on the still exposed bit of his shaft, stroking what you could not take in your mouth. His animal grunting grows louder as you take just a bit more of him with each thrust downwards.  Mad with lust, you remove your other hand from his thigh, balancing on your lengthy tail and his cock, and use it to ",
  );

  //if (player.cocks.length > 0)
  if (liveData.player.hasCock())
    GUI.outputText(
      'furiously stroke your own ' + liveData.player.multiCockDescriptLight() + '. Your muffled vocalizations of pleaure weakly join his own.<br><br>',
    );
  else
    GUI.outputText(
      'part the folds of your ' +
        liveData.player.vaginaDescript(0) +
        ', sliding it inside and masturbating with a furious vigor. Your muffled vocalizations of pleaure weakly join his own.<br><br>',
    );

  GUI.outputText(
    "As your lungs pain for breath, you realize that you will need to finish him off quicker than   The tip of your tail darts towards him and slides under his rear.  You find his anus and slip the tip inside.  An abrupt change in his rythmic grunting and panting signals his surprise, but he makes no move to remove your intrusion.  Thankful for this, you slowly pass it deeper into him even as you try to push him deeper into you.  You can feel the orgasm rising in the minotaur's huge prick, and before it hits, you begin to rub what you judge to be his prostate in an effort to milk him of his semen.  This is clearly successful, as you feel an enormous load of his cum pass through his cock, swelling it inside your throat. As the first ropes of the hot goodness shoot into you, your mind is overwhelmed, and you join him in orgasm, your eyes rolling back into your head and your cries gurgling as they are pushed back before they can even begin by the thick semen pooling inside you.  Dizzy from the lack of oxygen and the aphrodisiac nature of his cum, you continue to rub his prostate, and he continues to cum and cum into you, filling your belly and throat, the excess spilling out of your mouth.  You're in perfect bliss, but though the pleasure has numbed you to the pain, you realize that your body will give out soon.  Just as you feel that you cannot go on, the fountain of semen gushing into you begins to slow, and the minotaur's cock begins to soften.  You slide off of him and remove your tail from him, noticing that he passed out at some point during his marathon orgasm.<br><br>",
  );

  GUI.outputText(
    "You start to wipe some off the cum off of your face, but you're so drenched that the efforts are futile.  Drunk from the pleasure, you giggle quietly and meander back to your camp in a dreamy haze, almost left unable to think by the pleasurable sensations that the minotaur's semen still gives you.  At camp you curl up, smiling as you think of the huge load inside you, and drift off into a satisfied sleep.",
  );
  //(satisfy or progress mino addiction)
  liveData.player.minoCumAddiction(10);
  liveData.monster.name = 'tit-fucked Minotaur';
  COMBAT.cleanupAfterCombat();
}

//Mino Feeder Scene
export function minotaurDrinksMilkNewsAtEleven() {
  //spriteSelect(44);
  GUI.clearOutput();
  GUI.outputText(
    'You kneel next to the exhausted minotaur, lifting his head up to your ' +
      liveData.player.breastDescript(0) +
      '. He turns his muzzle away from them, still trying to defy you. You force his head back toward your chest and push your ' +
      liveData.player.nippleDescript(0) +
      " against his mouth, but he keeps his lips tightly shut. You pound your fist on his stomach, forcing a gasp of air out of his mouth as you cram your nipple inside. The minotaur is trying to shake his head to free up his mouth but you're holding his fur too firmly for him to wriggle free. His struggling only causes sips of milk to trickle down into his mouth. You squeeze your breast and send streams of milk down his throat. He soon stops fighting and just starts nursing. He's sucking hard, pulling the milk out of you, and stopping every few minutes to take a deep breath. He soon empties that teat and you put the other one up to his mouth. He obediently begins to nurse on that one, but he's a bit winded from the other, so his suckling is gentle and soothing. It takes him a bit longer for him to empty this nipple, but having such a strong minotaur reduced to a weak, suckling calf pleases you greatly for some reason.<br><br>",
  );

  GUI.outputText(
    'You pop your ' + liveData.player.nippleDescript(0) + " from the dazed minotaur's mouth and leave him there to enjoy the afteraffects of his meal.",
  );
  //set lust to 0, increase sensitivity slightly
  liveData.player.dynStats(['lib', 0.2]);
  liveData.player.changeLust(-50);
  //You've now been milked, reset the timer for that
  liveData.player.addStatusValue(StatusEffects.Feeder, 1, 1);
  liveData.player.changeStatusValue(StatusEffects.Feeder, 2, 0);
  COMBAT.cleanupAfterCombat();
}

//Mino Spider Oviposit Scene
export function layEggsInAMinotaurSpiderLike() {
  GUI.clearOutput();
  if (liveData.player.canOvipositBee()) {
    layBeeEggsInCowbutt();
    return;
  }
  GUI.outputText(
    'The defeated minotaur turns and tries to flee.  You quickly fling a cord of sticky webbing that wraps around his massive horns, hauling him up short.  With a panicked moo, he begins to thrash his head, desperately trying to free himself.  You scurry forward and tackle the man-bull, forcing him onto his back.  Extruding more webbing, you wrap his wrists and bind them to his horns, then force his muscular legs upward, bending him almost double before lashing his legs to his horns as well.',
  );

  GUI.outputText(
    '<br><br>Now helpless and hog-tied, the minotaur gazes up at you with wide eyes.  His throbbing, flared cock indicates that not all of him finds the situation as objectionable as he wants you to believe.  Gathering up his musky pre with your fingertips, you hold them beneath his nose before forcing your fingers into his mouth.  "<i>Arrogant little cow,</i>" you growl throatily, "<i>I have a special gift for you.</i>"',
  );

  GUI.outputText('<br><br>Gathering the silk binding his limbs with one hand, you position your ovipositor at ');
  if (!liveData.silly) GUI.outputText('his bovine rosebud.');
  else GUI.outputText('the entrance to his O.K. Corral.');
  GUI.outputText(
    '  Grinning, you lift your abdomen high behind you, then snap it forward, forcing more than half of your long ovipositor deep into your beef-bitch.',
  );

  if (liveData.player.gender > 0) {
    GUI.outputText('<br><br>');
    if (liveData.player.hasCock())
      GUI.outputText(
        'Forcing [oneCock] between his bound thighs, you frot his flared bull-cock, your mixed pre soaking into the fur of his belly as you thrust against him.',
      );
    if (liveData.player.hasVagina())
      GUI.outputText(
        'Grasping his bull-cock, you pull it against your pussy, rubbing your juices up and down his impressive length as your lips and clit grind on him, adding to your pleasure.',
      );
  }

  //(If male or herm:
  GUI.outputText('<br><br>');
  if (liveData.player.hasCock()) {
    GUI.outputText('As your orgasm washes over you, you spray your cum, ');
    if (liveData.player.cumQ() < 100) GUI.outputText('spattering');
    else if (liveData.player.cumQ() < 500) GUI.outputText('drenching');
    else GUI.outputText('nearly drowning');
    GUI.outputText(' your helpless prey.  ');
  }
  if (liveData.player.hasVagina()) GUI.outputText('Your femcum sprays across his cock.  ');
  GUI.outputText('Simultaneously, your ovipositor pulses and throbs, forcing egg after egg between his beefy buns and deep into him.  The ');
  if (liveData.player.gender > 0) GUI.outputText('combination of the scent of your fluids and the ');
  GUI.outputText(
    'sensation of eggs forcing their way past his sphincter proves too much for your bovine bitch to resist, and he helplessly sprays his musky cum, stream after stream jetting up his chest and across his face as his eyes roll back in his head.',
  );
  //[(mino addict)
  if (liveData.gameFlags[FLAG.MINOTAUR_CUM_ADDICTION_STATE] >= 1) {
    GUI.outputText(
      '  The smell is too much for you as well, and as you come a second time, you point his flare at your mouth, gulping as much of his seed as you can get.',
    );
    liveData.player.minoCumAddiction(3);
  }

  if (liveData.player.cor < 50) GUI.outputText('<br><br>You carefully unwrap his limbs, then pull his snout around to force him to look at you.');
  else
    GUI.outputText(
      '<br><br>Chuckling at the thought of the fun the other mountain denizens will have with your well-trussed side of beef, you grab his snout and force him to look you in the eyes.',
    );
  GUI.outputText('<br><br>"<i>We\'ll have to do this again.  In fact, every time you cross my path, we will do this again, my little cow-poke.</i>"');
  liveData.player.dumpEggs();

  COMBAT.cleanupAfterCombat();
  liveData.player.orgasm();
  //satisfy mino cum addiction if addicted
}

export function layBeeEggsInCowbutt() {
  GUI.clearOutput();
  GUI.outputText('Looking down at the defeated minotaur');
  if (liveData.monster.lust >= liveData.monster.maxLust()) GUI.outputText(', stroking his flared cock desperately');
  GUI.outputText(
    ' you feel a throbbing sensation in your apiary appendage.  A leering grin spreads across your face as you force the minotaur onto his stomach, trapping his musky manhood beneath him.',
  );
  if (!liveData.player.isTaur()) GUI.outputText('  Wrapping his tail around one hand, you lift his furred flanks up');
  else GUI.outputText('  Straddling him with all four legs, you slide forward');
  GUI.outputText(' while aiming your ovipositor.');

  GUI.outputText(
    '<br><br>As your egg-phallus slides home, a confused moan escapes from the defeated man-bull.  For a moment, you are reminded of a lost calf calling for its mother.  ',
  );
  if (liveData.player.cor < 50)
    GUI.outputText(
      'You hesitate, feeling a surge of pity for the once-mighty creature, but your new instincts drive your egg-layer further into his prone body.  ',
    );
  else
    GUI.outputText(
      'Grinning cruelly, you grasp him by the horns and haul back with both hands until the minotaur is forced to look you in the eye.  You lean in close to his snout and buzz mockingly, "<i>Whoz the bitch now?  Iz it you?  Yezz, it izz!</i>"  ',
    );
  GUI.outputText('You begin to thrust back and forth, your strong forward strokes punctuated by grunting moos from your huge but helpless brood-bull.');

  GUI.outputText('<br><br>Your body, long-ready to lay, quickly achieves a climax; ');
  //(if male or herm:
  if (liveData.player.hasCock()) {
    GUI.outputText('you thrust your cock');
    if (liveData.player.cockTotal() > 1) GUI.outputText('s');
    GUI.outputText(' through the air harder and faster, drenching his ');
    //(if cum volume low:
    if (liveData.player.cumQ() < 250) GUI.outputText('backside with your cum');
    else if (liveData.player.cumQ() < 500) GUI.outputText('back with your cum, with ropes dripping slowly off his horns and down his face');
    else GUI.outputText('back with your cum, before it covers him and spreads across the floor of his cave.');
  }
  //(if female:
  else if (liveData.player.hasVagina())
    GUI.outputText("you rub your pussy hard against the minotaur's muscular ass, marking him with the scent of your fem-cum.");

  GUI.outputText(
    "<br><br>Finally, you feel powerful pulses moving through your bee-like abdomen as your eggs move down your ovipositor into their bovine incubator, each one feeling like a mini-climax of its own.  You're beginning to understand why the bee girls are so keen on laying eggs in you when you pass through the forest.  You could definitely get used to ",
  );

  //(If Silly mode:
  if (liveData.silly)
    GUI.outputText(
      '<br><br>Looking down at the mass of bull-meat filled with eggs, you lean down and whisper into his ear, "<i>And that\'s how you make Scotch Eggs, cowboy.</i>"',
    );
  liveData.player.dumpEggs();
  COMBAT.cleanupAfterCombat();
  liveData.player.orgasm();
}

// Loss TODO Phyllafight and Worms
export function minotaurLose() {
  /*
        if (findStatusEffect(StatusEffects.PhyllaFight) >= 0) {
            removeStatusEffect(StatusEffects.PhyllaFight);
            game.desert.antsScene.phyllaPCLostToMino();
        } else if (pcCameWorms){
            GUI.outputText("<br><br>The minotaur picks you up and forcibly tosses you from his cave, grunting in displeasure.", false);
            game.combat.COMBAT.cleanupAfterCombat();
        } else
        */
  getRapedByMinotaur();
}

// Loss Selector //TODO Test  This function seems very strange. Appears to be both non-combat and combat encounters in here. Split this code.
export function getRapedByMinotaur(autoRape = false) {
  //spriteSelect(44);
  liveData.player.slimeFeed();
  GUI.clearOutput();
  //BY BUTTS MCGEE
  //====================================================================
  //((This would be a Minotaur Loss Rape if the PC fulfills either of the following conditions.))
  //{CHECK: If male PC with big butt (Over... I have no idea what butt numbers are), use this}
  //{CHECK: If female or herm PC with big butt and vagina too small to fit minotaur cock, use this}
  if (!autoRape) {
    if (liveData.gameFlags[FLAG.SFW_MODE]) {
      //No rape in SFW mode.
      COMBAT.cleanupAfterCombat();
      return;
    }
    if (
      UTIL.rand(2) == 0 &&
      liveData.player.buttRating >= 15 &&
      liveData.player.vaginalCapacity() < liveData.monster.biggestCockArea() &&
      liveData.player.tone < 60
    ) {
      getMinoHawtDawged();
      return;
    }
    //Oral rape chance
    if (UTIL.rand(2) == 0 && !liveData.player.isTaur()) {
      getOralRapedByMinotaur();
      return;
    }
  } else {
    GUI.outputText(
      'As you take the winding path up through the rocky trail, you come upon the opening to a cave. Peering inside, the stench of an overpowering musk washes over you. The primal scent excites you, causing you to become aroused almost immediately.  Not thinking as clearly as you normally might, you slowly sneak your way into the cave. Signs of life litter the cave floor.<br><br>',
    );
    liveData.player.changeLust(10 + liveData.player.lib / 5);

    //Detect minotaur coming
    if (UTIL.rand(30) + liveData.player.inte / 5 > 18 || liveData.gameFlags[FLAG.SFW_MODE] > 0) {
      GUI.outputText('You spot a shadow moving and spin around to see a minotaur lumbering after you from the back of the cave!');
      if (liveData.gameFlags[FLAG.CODEX_ENTRY_MINOTAURS] <= 0) {
        liveData.gameFlags[FLAG.CODEX_ENTRY_MINOTAURS] = 1;
        GUI.outputText('<br><br><b>New codex entry unlocked: Minotaurs!</b>');
      }
      COMBAT.startCombat(new Minotaur());
      return;
    }

    GUI.outputText(
      "Suddenly you're grabbed from behind, your arms held together by a single massive, furry hand. A heavy, snorting breath brushes the top of your head. You turn your neck to see a massive bull-man. His impressive dick presses ",
    );

    if (liveData.player.isTaur()) {
      GUI.outputText('against your buttocks');
    } else {
      GUI.outputText('into the small of your back');
    }

    GUI.outputText(' as it grows larger and harder, smearing its pre-cum into your skin and making you shiver.  ');
    //High str escape
    // if (/*UTIL.rand(20) + player.str / 3 > 18*/ true || liveData.gameFlags[FLAG.SFW_MODE]) {
    if (/*UTIL.rand(20) + player.str / 3 > 18*/ liveData.gameFlags[FLAG.SFW_MODE]) {
      GUI.outputText('<br><br>You twist around using the additional lubrication and squirm free!  Rolling away, you come up in a crouch, ready to fight!');
      COMBAT.startCombat(new Minotaur());
      return;
    }
  }

  if (liveData.gameFlags[FLAG.SFW_MODE]) {
    //No rape in SFW mode.
    COMBAT.cleanupAfterCombat();
    return;
  }
  //Normal RAEP
  if (liveData.player.vaginas.length > 0) {
    GUI.outputText(
      'The bull-man roughly grabs your hair and begins rubbing the flared head of his penis along your ' + liveData.player.vaginaDescript(0) + '.  ',
    );
    if (liveData.player.averageVaginalWetness() < 2)
      GUI.outputText("You aren't very wet, and fear the damage this beast will inflict on your " + liveData.player.vaginaDescript(0) + '.  ');
    else GUI.outputText("You're shamefully wet by this point, and your knees are ready to buckle.  ");
    liveData.player.minoCumAddiction(5);
  }
  //BUTTSECKS!
  else {
    GUI.outputText(
      'The bull-man roughly grabs your hair and repositions himself to press against your asshole, slowly building the pressure until suddenly, the flared head pops into you.  ',
    );
    liveData.player.buttChange(liveData.monster.cockArea(0), true);
    liveData.player.minoCumAddiction(15);
  }
  if (liveData.player.isTaur())
    GUI.outputText(
      '<br><br>He positions himself behind your rear legs, and roughly impales you onto his shaft, forcing himself as far into you as he can manage. You cry out, and you feel your stomach distending to accommodate his incredible size. Grabbing your ass, he begins to violently pound your backside with his massive member.  ',
    );
  else
    GUI.outputText(
      '<br><br>He lifts you into the air, hefting your insignificant weight with little effort, and roughly impales you onto his shaft, forcing himself as far into you as he can manage. You cry out, and looking down you can see your stomach distending to accommodate his incredible size. Using you like a human cock-sleeve, he simply holds you by the torso and begins lifting you up and down.  ',
    );

  //Vag stretch texts
  if (liveData.player.hasVagina()) liveData.player.cuntChange(24 * 3, true, false, true);

  //Continue
  if (liveData.player.biggestTitSize() > 0 && liveData.player.mostBreastsPerRow() > 1 && liveData.player.breastRows.length > 0) {
    GUI.outputText('He manhandles your tits as he does so, almost violently squeezing and stretching them to his enjoyment.  ');
    if (liveData.player.biggestLactation() > 1.5)
      GUI.outputText(
        'He then gives a grunt in what you take to be approval as your milk begins to squirt out. He licks a milk-coated finger in satisfaction.  ',
      );
  }
  if (liveData.player.cockTotal() == 1)
    GUI.outputText(
      'The bull-man bends forward a little, and grabs your ' +
        liveData.player.cockDescript(0) +
        ' in a crushing grip. He makes short jerking motions as he keeps thrusting into you.',
    );
  if (liveData.player.cockTotal() > 1)
    GUI.outputText(
      'The bull-man bends forward a little, and grabs one of your ' +
        liveData.player.cockDescript(0) +
        's in a crushing grip. He makes short jerking motions as he keeps thrusting into you.',
    );
  if (liveData.player.vaginas.length > 0) {
    if (liveData.player.vaginalCapacity() < liveData.monster.cockArea(0))
      GUI.outputText(
        "<br><br>You clench your teeth in pain as his thick ribbed cock ravages your tight pussy. After a while, a kind of numbness sets in, and you start to feel dim waves of pleasure piercing through the curtain of pain. You hear grunts of pleasure and satisfaction coming from the beast's mouth.",
      );
    if (liveData.player.vaginalCapacity() >= liveData.monster.cockArea(0) && liveData.player.vaginalCapacity() < liveData.monster.cockArea(0) * 1.5)
      GUI.outputText(
        '<br><br>You feel his monstrous ribbed cock deliciously rubbing against your love-canal, sending maddening waves of pleasure to your brain as the beast keeps shoving into you. Oblivious to anything but your own enjoyment, you moan loudly like a whore, as the beast chuckles and grunts from his own pleasure.',
      );
    if (liveData.player.vaginalCapacity() >= liveData.monster.cockArea(0) * 1.5)
      GUI.outputText(
        "<br><br>You feel his monstrous cock sliding easily in and out of your wide fuck-hole, hearing the beast grunt in dissatisfaction. He suddenly clouts your left buttock, which makes you tense your muscles, including your vagina's, and you start to feel the ribs on his cock rubbing against your wall. The pleasure it procures you makes you tense your muscles harder, causing the pleasure to swell again. The minotaur grunts in approval, and continues his violent pounding as you start moaning.",
      );
  }
  GUI.outputText(
    "<br><br>Finally, you can feel he's ready to cum. His thrusts become shorter and faster, and just when you think you can't stand it anymore he starts shooting his sperm into you. Your stomach begins to round out from the sheer amount of bull seed being pumped into your belly.  ",
  );
  liveData.player.dynStats(['lib', 1], ['sen', -0.5], ['cor', 1]);
  if (liveData.player.vaginas.length > 0) {
    if (liveData.player.averageVaginalWetness() >= 2) {
      if (liveData.player.averageVaginalWetness() < 4) GUI.outputText("You squirm and quiver, orgasming from the beast's rough usage.  ");
      if (liveData.player.averageVaginalWetness() == 4)
        GUI.outputText("You squirm and quiver, orgasming from the beast's rough usage, soaking him with your " + liveData.player.vaginaDescript(0) + '.  ');
      if (liveData.player.averageVaginalWetness() == 5) GUI.outputText('You orgasm on his massive rod, splattering the beast with girlcum.  ');
      liveData.player.dynStats(['lib', 0.5], ['sen', 1], ['cor', 1]);
    }
    if (liveData.player.averageVaginalWetness() < 2) {
      GUI.outputText('You gasp in pain, your cunt rubbed raw by the rough and violent penetration.  ');
      liveData.player.dynStats(['tou', -0.5], ['sen', 1], ['lus', -5], ['cor', 1]);
    }
    //Preggers chance!
    liveData.player.knockUp(ENUM.PregnancyType.PREGNANCY_MINOTAUR, ENUM.IncubationType.INCUBATION_MINOTAUR);
  }
  if (liveData.player.cockTotal() > 0 && liveData.player.sens + UTIL.rand(40) > 50) {
    GUI.outputText('You orgasm, ');
    if (liveData.player.cumQ() < 25) GUI.outputText('spurting your seed helplessly from the brutal rape.  ');
    if (liveData.player.cumQ() >= 25 && liveData.player.cumQ() < 250) GUI.outputText('squirting thick ropes of cum over the cave.  ');
    if (liveData.player.cumQ() >= 250 && liveData.player.cumQ() < 500)
      GUI.outputText('erupting potent ropes of seed in thick bursts, splattering the cave walls and floors.  ');
    if (liveData.player.cumQ() >= 500)
      GUI.outputText(
        'erupting a thick torrent of seed that seems to go on forever, spurred by the constant pressure of the huge minotaur cock.  You paint the cave wall with cum, the beast egging you on as it roughly jacks your ' +
          liveData.player.cockDescript(0) +
          '.  You are vaguely aware of your orgasm dragging on and on, until eventually your orgasm stops, leaving a sizable puddle of cum on the floor.  ',
      );
    liveData.player.dynStats(['lib', 0.5], ['sen', 1], ['cor', 1]);
  }
  GUI.outputText(
    'The bull-man relaxes for a moment, then shoves you off of him and to the cold ground. You pass out as a strange sense of euphoria washes over you while copious quantities of monstrous cum escape your distended ',
  );
  if (liveData.player.hasVagina()) GUI.outputText('pussy.');
  else GUI.outputText('asshole.');
  COMBAT.cleanupAfterCombat();
  liveData.player.orgasm();
  //GUI.doNext(Camp.returnToCampUseFourHours);
}

export function getMinoHawtDawged() {
  GUI.clearOutput();
  if (liveData.player.lust >= liveData.player.maxLust()) {
    GUI.outputText('You collapse to your knees, hands racing to your crotch and your ');
    //(If Male or Herm:
    if (liveData.player.hasCock())
      GUI.outputText('[cock biggest], which you frantically try to stroke and rub through your [armor], its throbbing arousal clearly evident.');
    //If Herm:
    if (liveData.player.gender == 3) GUI.outputText('  Your other hand races to your ');
    //(If Female or Herm:
    if (liveData.player.hasVagina())
      GUI.outputText(
        '[vagina], which is dripping and drooling your arousal down the insides of your [armor].  You manage to apply some pressure to your [clit] through your [armor], which sends a shock of pleasure through you.',
      );
  }
  //If PC lost by damage, and Minotaur has axe:
  else if (liveData.monster.weapon.equipmentName == 'axe')
    GUI.outputText(
      "The last great blow from the Minotaur's giant, man-slaughtering axe is just a little off, thankfully - the flat of the axe, rather than the blade, hits you upside the flat of your head, sending you tumbling into the dirt.",
    );
  //(If PC lost by damage, and Minotaur does not:
  else
    GUI.outputText(
      "The last great blow from the Minotaur's giant, beefy fist hits you upside your head, the blow strong enough to send you tumbling into the dirt.",
    );

  GUI.outputText(
    "<br><br>The clopping sounds of the Minotaur's footsteps barely register in your mind as you sit there, too broken to properly care, and its massive bull-cock grows harder and harder as it eyes you up, snorting.  The brown-furred beastman hauls you up by the neck, his grip forcing your hands to grab onto his arm lest he choke you, and he quickly strips you of your [armor], baring more and more of your naked flesh and vulnerable holes.",
  );
  GUI.outputText(
    "<br><br>The Minotaur's enormous cockhead spews a thick load of pre onto your crotch as he finally strips you bare, and the warm, slick wetness of his juices on your genitals sends a shiver through your spine.  The minotaur turns you over like a common trollop, eager to take his prize, and adjusts his grip so that one of his burly hands is wrapped around your waist instead of your neck.",
  );
  if (liveData.player.hasVagina()) {
    GUI.outputText(
      '<br><br>He lines up his cock with your drooling cunt, your body betraying you as it gets turned on by the rough treatment, and his hips slowly but surely arch forward as his cockhead presses up against your drippy little snatch, making you bite your lip.  The feeling of his fat head rubbing up against your [vagina] is almost too much to bear, and it sends your toes curling underneath of you in pure pleasure.',
    );
    GUI.outputText(
      "<br><br>Fortunately or unfortunately, just as it seems he's about to crown his way into the depths of your [vagina] - he is rebuffed by your tightness, unable to advance any further.  The Minotaur lines up and tries again, making you bite your lip as he forcefully pushes against your slit... but it's no good.  He grunts in frustration, stamping a hoofed foot into the dirt - and then he pauses, getting a look at your [butt] for the first time.",
    );
  }
  GUI.outputText(
    "<br><br>You can hear the slurping of the Minotaur's tongue crossing his lips as he eyes up your [butt], and his free hand quickly reaches out to maul one of your fat, squishy cheeks.  His fingers sink in to the tender, jiggly buttcheek, drawing the surface of it inward as his hand makes a print, and you can physically feel his fingers digging around and playing with the sensitive, slutty flank.",
  );
  GUI.outputText(
    '<br><br>You bite back a moan as, [if (corruption < 50) much to your horror, ][if (corruption => 50) much to your carnal delight, ]his perverse groping actually starts to turn you on, and you find yourself pressing your hips against his squeezes and firm, exploring grip.  The Minotaur himself is quite enamored with your butt, it seems - or at least with fat butts in general - and so he lets go of your waist... only to haul you further up by the hips instead, bringing your [butt] to his face.',
  );
  GUI.outputText(
    "<br><br>The minotaur's muzzle eagerly digs into the crack between your bulbous ass-cheeks as you yelp, surprised, and you feel his tongue flicking out a moment later, searching around inside your tightly-sandwiched asscrack for your [asshole].  It slathers a good portion of your ass with saliva before it darts further inward, licking along your taint - and then skips right over your [asshole].",
  );
  GUI.outputText(
    "<br><br>You let out a frustrated moan, fairly into the licking by this point, and try to wiggle your hips encouragingly as his tongue continues to search and slather your tight rear with spit.  His tongue withdraws back into his mouth, making you jump from the sudden motion, but then a second later it's back out again, poking and prodding and licking up every bit it can - until finally, he finds your asshole.",
  );
  GUI.outputText(
    "<br><br>The minotaur's broad tongue licks and laps at your [butthole] as you writhe and moan, each lick twice as pleasant as the last, and you feel ",
  );
  if (liveData.player.hasCock()) GUI.outputText('[eachCock] twitching beneath you, painting the floor with dribbles of your pre.');
  if (liveData.player.gender == 3) GUI.outputText('  You also feel ');
  if (liveData.player.hasVagina())
    GUI.outputText(
      "your [vagina] clenching and unclenching as your entire hips try to push against the Minotaur's searching tongue, dripping with his spit - along with your own juices.",
    );

  GUI.outputText(
    "<br><br>Your body starts to shiver as he keeps up the anal attention, your asshole quite slick with his saliva as he lets out a approving, rumbling moo - and then he stops, withdrawing his muzzle from your [butt] and its oversized cheeks - which slap wetly back together, your crack still wet with his spit.  A moment later you're hauled back down again, the minotaur's hand wrapping once more around your waist, and it isn't long before his flared head starts to push against the crack between your cheeks, the thick cock demanding entry.",
  );
  GUI.outputText(
    "<br><br>His spittling and licking has lubed your fat butt up, treating you to the sound of a wet 'slorp' as his cock dives into your [butt], and you can feel his cock pressing deeper and deeper into you.  Any second now he'll hit your [asshole], and you'll be wrapping your insides around that monster cock of his, moaning like a whore for him.  You feel a gush of his pre splatter all over the flesh at the 'bottom' of your ass-crack, dripping onto your asshole, and you bite your lip in preparation.",
  );
  GUI.outputText(
    '<br><br>...Only to feel his cock bump you just below your tailbone.  You let out a frustrated moan and wiggle impatiently as the minotaur tries to line up again, and as a result his cock hits the taint between your asshole and your crotch instead.  With a frustrated moo, the minotaur brings his free hand down on one of your jiggling cheeks - and a ringing <b><i>SLAP</i></b> echoes out as the strike sends an arc of pain through your [butt].  You settle down, obliging the powerful creature, and it tries to line up with your asshole again.',
  );
  GUI.outputText(
    "<br><br>This time, you feel his cock angle upward as he tries to push in... until the head pops out the top of your butt, neatly hotdogged between your cheeks.  You sigh, thinking you're going to be here for a while, and then he pulls back, only to hump your cheeks again in the exact same way.  You're confused, for a moment, as he uses his free hand to squish your cheeks together around his dick, but you let it slide as the strangely-pleasant feeling of him fucking your asscrack runs through you.",
  );
  GUI.outputText(
    "<br><br>Again and again his strong, masculine hips surge forward as he fucks your girly rump, your [butt] bouncing and jiggling every time his hips collide with it, and his pre-drooling flare erupts out the top of your crack to taste the air.  With each withdraw, his head sheaths inside of your crack again, trailing his tingle-inducing pre all the way, and the Minotaur's thrusts slowly speed up as he starts to moo.",
  );
  GUI.outputText(
    "<br><br>The bouncing of your captor's thrusts becomes increasingly violent as he uses your ass like just another hole for him to get off with, and you find yourself writhing in his grip for an entirely different reason, now; need.  While his fucking is turning you on like little else, the pleasurable strokes of his bull-cock in your [ass] aren't enough to get you off.  He, however, doesn't seem to care; his moos and grunts have turned into a panting rut as he fucks your ass-crack at full blast, the bouncing of your cheeks a constant, unending motion now.",
  );
  GUI.outputText(
    "<br><br>You let out a low whine as you try, helplessly, to grab for your crotch, but between the constant fucking and the minotaur's big arm blocking the way, you can't grab on long enough to masturbate.  Thankfully, it doesn't take the minotaur long to cum after that; there's a few more shuddering, insistent thrusts...",
  );
  GUI.outputText(
    '<br><br>...and then his head pushes out the top of your ass again, fountaining with his spunk. Gout after gout of it rains down on you, painting your butt, ',
  );
  //[if (hasTail = true)
  if (liveData.player.tailType > ENUM.TailType.TAIL_TYPE_NONE) GUI.outputText('your tail, ');
  GUI.outputText(
    "your back, and even your hair with gushes of his sticky, musk-smothered seed. Your entire backside flushes with the heat of his orgasm as it starts to die down, a few last drools of the hot stuff spilling out of his cock, and he withdraws from your butt, leaving you one last gift of a single spurt lodged between your fat cheeks and slowly dripping out. The Minotaur's cum seems to make your head swim, and everything starts to go foggy...",
  );
  //{Loss message 'when you wake up you'll be missing gems' blah blah}
  liveData.player.changeLust(15 + UTIL.rand(liveData.player.lib / 2));
  liveData.player.slimeFeed();
  liveData.player.minoCumAddiction(5);
  COMBAT.cleanupAfterCombat();
}

//TODO Another one that needs splitting
export function getOralRapedByMinotaur() {
  //spriteSelect(44);
  GUI.clearOutput();
  GUI.outputText(
    'The huge bull-man grabs you around the waist with one hand and flips you over. You hang upside down in his grip, your ' +
      liveData.player.legs() +
      " splayed in the air.  The minotaur rubs your face across his sweat-slick balls, smearing his musk into your skin. Each of the minotaur's testicles is bigger than a man's head, and the skin of his sack is pulled taut over his cum-filled balls.<br><br>",
  );
  GUI.outputText(
    'The minotaur traps your ' +
      liveData.player.legs() +
      ' in one hand and slams your back against the cold cave wall. You gasp, spraying drops of musky sweat from your lips. Dragging you against the rough stone, the minotaur lifts you higher and bends your ' +
      liveData.player.legs() +
      ' back over a rock ledge. You are pinned against the cave wall, ' +
      liveData.player.legs() +
      " held in one of the minotaur's hands while his other roughly gropes your stretched-out body.",
  );
  if (liveData.player.hasBreasts())
    GUI.outputText('  The bull-man grabs your ' + liveData.player.chestDesc() + ', squeezing and mauling them with his calloused hand.');
  if (liveData.player.cockTotal() >= 1) {
    GUI.outputText('  Your ' + liveData.player.multiCockDescriptLight() + ' slap');
    if (liveData.player.cockTotal() == 1) GUI.outputText('s');
    GUI.outputText(' painfully against your belly as the minotaur drags you along the wall.');
  }
  GUI.outputText(
    "  All you can see is the minotaur's huge shaft, the tip grinding against your mouth. The minotaur slaps his cock-head against your face, rubbing his musk and pre-cum into your cheeks and hair.<br><br>",
  );
  //new pg
  GUI.outputText(
    "The minotaur reaches down and grabs your jaw, yanking it open. You know what's coming next but decide not to fight it. Submitting to this beast is the safest choice. You spread your jaws as wide as you can and bend your mouth towards the minotaur's monstrous cock-head...<br><br>",
  );
  //new pg
  GUI.outputText(
    'Wasting no time, the minotaur grinds his glans past your lips and tries to force the tip of his ' +
      liveData.monster.cockDescriptShort(0) +
      " into your mouth. Snorting and grunting, he pushes your head against the cave wall as he shoves the tip past your teeth. The minotaur's pre-cum pools in your mouth and dribbles out the corners, leaving trails of slime down your face.  You breathe through your nose, inhaling the minotaur's musk, as the brute forces another fraction of an inch of bull-cock into your mouth. Taking yet another quarter-inch of slimy meat, you wonder if it wouldn't be better to let yourself pass out while the minotaur uses you.<br><br>",
  );
  //new pg
  GUI.outputText(
    "You hear a <i>POP</i> and feel a sharp pain in your jaw as the minotaur forces its full cock-head into your mouth.  The head slides past your jaws and into your mouth, pinning your tongue down and jabbing against the opening of your throat. The flared end of the shaft wedges itself behind your teeth. The minotaur moans, a sound somewhere between a bull calling to its herd and a man groaning in ecstasy. You grab the bull-man's shaft in both hands and brace yourself, trying to pull your head away from the cave wall. The minotaur starts grinding its hips, and with one hand grabs your head and twists it from side to side, rubbing its huge tip around in your mouth.<br><br>",
  );
  //new pg
  GUI.outputText(
    "You arch your back off the wall, resting your weight on the minotaur's " +
      liveData.monster.cockDescriptShort(0) +
      ". Your chest and belly rub against the minotaur's massive torso",
  );
  if (liveData.player.hasBreasts()) GUI.outputText(', painfully grinding your ' + liveData.player.nippleDescript(0) + ' against his wiry fur');
  if (liveData.player.balls > 0) GUI.outputText(", and you can feel the minotaur's hot breath on your " + liveData.player.ballsDescriptLight());
  GUI.outputText(
    '. The bull-man snorts and jerks his hips as you twist your hands around his shaft, hoping to make him cum sooner. You tickle your tongue against his cock-head and start sucking as hard as you can. You bend your neck as the minotaur grinds itself in your mouth, hoping to make the tip easier to take. The minotaur jerks his hips in short spasms and you can hear its grunts coming closer and closer together. You take a deep breath through your nose, filling your lungs with air before the beast floods your throat with its cum...<br><br>',
  );
  //new pg
  GUI.outputText(
    'With no warning the minotaur yanks your ' +
      liveData.player.legs() +
      " off of the ledge and grabs your waist. He shoves you down hard on his shaft while slamming his hips foward. Your eyes go wide in shock as the minotaur rams the massive tip of its cock past your mouth and into your throat. Grunting and moaning the minotaur forces its cock into your throat, inch by inch as it grinds you around its shaft. Your throat bulges as the first ridge around the minotaur's cock approaches your lips.<br><br>",
  );
  //new pg
  GUI.outputText(
    "The minotaur bellows and slams its hips forward, forcing the ridge past your lips. You're almost out of air and the edges of your vision are starting to fade. All you can see is the minotaur's belly. Its " +
      liveData.monster.ballsDescriptLight() +
      ' spasm just below your head, pumping hot come through its ' +
      liveData.monster.cockDescriptShort(0) +
      ". The first wave of minotaur cum swells his cock and pushes past your teeth. The bull-man cums deep in your throat, inflating your stomach with hot seed. All you can feel is the minotaur's bloated shaft rammed deep into your throat, blast after blast of thick cum forcing its way down his cock and into your belly.<br><br>",
  );
  liveData.player.refillHunger(50);
  //last pg
  GUI.outputText(
    'The minotaur grunts a few last times.  Finished with you, it lifts your ' +
      liveData.player.leg() +
      ' and pulls you off its ' +
      liveData.monster.cockDescriptShort(0) +
      '. The huge cock-head slides through your throat, gets jammed behind your teeth, and finally pulls free with a loud sucking sound. Cum pours from your throat and over your face, and the minotaur sprays a few final loads across your bloated stomach. The minotaur drops you in the cum-pool and walks away, leaving you to cradle your distended belly and swoon as his drug-like sperm addles your mind.  You pass out with a blissful smile.',
  );

  liveData.player.dynStats(['sen', 1]);
  liveData.player.minoCumAddiction(10);
  COMBAT.cleanupAfterCombat();
  liveData.player.orgasm();
  //else GUI.doNext(camp.returnToCampUseFourHours);
}

// export { Minotaur, MinotaurScene }
