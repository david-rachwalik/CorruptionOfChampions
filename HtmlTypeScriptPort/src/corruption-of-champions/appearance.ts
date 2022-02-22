import * as UTIL from './engine/utils';
import * as ENUM from './flags/asset-enums';
import { liveData } from './main-context';
import { Creature } from './models/creature';

// Eventually, this should contain the entire char appearance.
// At the moment, it's pretty piecemeal.

// TODO remove when we have proper enums for this
// export function inverseMap(x) {
//     let result = {}
//     for (let i in x) {
//         result[String(x[i])] = i
//     }
//     return result
// }

export function hairOrFur(i_creature: Creature): string {
  if (i_creature.skinType == 1) {
    return 'fur';
  } else {
    return 'hair';
  }
}

export function hairDescription(i_creature: Creature): string {
  let description = '';
  let options;
  //
  // LENGTH ADJECTIVE!
  //
  if (i_creature.hairLength == 0) {
    options = ['shaved', 'bald', 'smooth', 'hairless', 'glabrous'];
    description = UTIL.randomChoice(options) + ' head';
    return description;
  }
  if (i_creature.hairLength < 1) {
    options = ['close-cropped, ', 'trim, ', 'very short, '];
    description += UTIL.randomChoice(options);
  }
  if (i_creature.hairLength >= 1 && i_creature.hairLength < 3) description += 'short, ';
  if (i_creature.hairLength >= 3 && i_creature.hairLength < 6) description += 'shaggy, ';
  if (i_creature.hairLength >= 6 && i_creature.hairLength < 10) description += 'moderately long, ';
  if (i_creature.hairLength >= 10 && i_creature.hairLength < 16) {
    if (UTIL.rand(2) == 0) {
      description += 'long, ';
    } else {
      description += 'shoulder-length, ';
    }
  }
  if (i_creature.hairLength >= 16 && i_creature.hairLength < 26) {
    if (UTIL.rand(2) == 0) {
      description += 'very long, ';
    } else {
      description += 'flowing locks of ';
    }
  }
  if (i_creature.hairLength >= 26 && i_creature.hairLength < 40) description += 'ass-length, ';
  if (i_creature.hairLength >= 40 && i_creature.hairLength < i_creature.tallness) description += 'obscenely long, ';
  else if (i_creature.hairLength >= i_creature.tallness) {
    if (UTIL.rand(2) == 0) {
      description += 'floor-length, ';
    } else {
      description += 'floor-dragging, ';
    }
  }
  //
  // COLORS
  //
  description += i_creature.hairColor + ' ';
  //
  // HAIR WORDS
  //
  //If furry and longish hair sometimes call it a mane (50%)
  if (i_creature.skinType == 1 && i_creature.hairLength > 3 && UTIL.rand(2) == 0) {
    if (i_creature.hairType == ENUM.HairType.Feather) description += 'feather-';
    else if (i_creature.hairType == ENUM.HairType.Ghost) description += 'transparent ';
    else if (i_creature.hairType == ENUM.HairType.Goo) description += 'goo-';
    else if (i_creature.hairType == ENUM.HairType.Anemone) description += 'tentacle-';
    else if (i_creature.hairType == ENUM.HairType.Quill) description += 'quill-';
    description += 'mane';
    return description;
  }
  //if medium length refer to as locks sometimes
  //CUT - locks is plural and screws up tense.
  /*if (creature.hairLength >= 3 && creature.hairLength < 16 && UTIL.rand(2) == 0) {
        descript += "locks of hair";
        return descript;
        }*/
  //If nothing else used, use hair!
  if (i_creature.hairType == ENUM.HairType.Feather) description += 'feather-';
  else if (i_creature.hairType == ENUM.HairType.Ghost) description += 'transparent ';
  else if (i_creature.hairType == ENUM.HairType.Goo) description += 'goo-';
  else if (i_creature.hairType == ENUM.HairType.Anemone) description += 'tentacle-';
  else if (i_creature.hairType == ENUM.HairType.Quill) description += 'quill-';
  description += 'hair';

  return description;
}

export function beardDescription(i_creature: Creature): string {
  let description = '';
  let options;
  //
  // LENGTH ADJECTIVE!
  //
  if (i_creature.beardLength == 0) {
    options = ['shaved', 'bald', 'smooth', 'hairless', 'glabrous'];
    description = UTIL.randomChoice(options) + ' chin and cheeks';
    return description;
  }
  if (i_creature.beardLength < 0.2) {
    options = ['close-cropped, ', 'trim, ', 'very short, '];
    description += UTIL.randomChoice(options);
  }
  if (i_creature.beardLength >= 0.2 && i_creature.beardLength < 0.5) description += 'short, ';
  if (i_creature.beardLength >= 0.5 && i_creature.beardLength < 1.5) description += 'medium, ';
  if (i_creature.beardLength >= 1.5 && i_creature.beardLength < 3) description += 'moderately long, ';
  if (i_creature.beardLength >= 3 && i_creature.beardLength < 6) {
    if (UTIL.rand(2) == 0) description += 'long, ';
    else description += 'neck-length, ';
  }
  if (i_creature.beardLength >= 6) {
    if (UTIL.rand(2) == 0) description += 'very long, ';
    description += 'chest-length, ';
  }
  //
  // COLORS
  //
  description += i_creature.hairColor + ' ';
  //
  // BEARD WORDS
  // Follows hair type.
  if (i_creature.hairType == 1) description += '';
  else if (i_creature.hairType == 2) description += 'transparent ';
  else if (i_creature.hairType == 3) description += 'gooey ';
  else if (i_creature.hairType == 4) description += 'tentacley ';

  if (i_creature.beardStyle == 0) description += 'beard';
  else if (i_creature.beardStyle == 1) description += 'goatee';
  else if (i_creature.beardStyle == 2) description += 'clean-cut beard';
  else if (i_creature.beardStyle == 3) description += 'mountain-man beard';

  return description;
}

/**
 * Describe tongue. Monsters don't have tongues, apparently.
 * @param    i_character Either Player or NonPlayer
 * @return    A beautiful description of a tongue.
 */
export function tongueDescription(i_character: Creature): string {
  if (i_character.tongueType == 1) return 'serpentine tongue';
  else if (i_character.tongueType == 2) return 'demonic tongue';
  else if (i_character.tongueType == 3) return 'draconic tongue';
  else return 'tongue';
}

export function breastDescript(size: number, lactation = 0): string {
  //Main function
  if (size < 1) return 'flat breasts';
  let descript = UTIL.rand(2) == 0 ? breastSize(size) : ''; //Add a description of the breast size 50% of the time
  switch (UTIL.rand(10)) {
    case 1:
      if (lactation > 2) return descript + 'milk-udders';
      break;
    case 2:
      if (lactation > 1.5) descript += 'milky ';
      if (size > 4) return descript + 'tits';
      break;
    case 4:
    case 5:
    case 6:
      return descript + 'tits';
    case 7:
      if (lactation >= 2.5) return descript + 'udders';
      if (lactation >= 1) descript += 'milk ';
      return descript + 'jugs';
    case 8:
      if (size > 6) return descript + 'love-pillows';
      return descript + 'boobs';
    case 9:
      if (size > 6) return descript + 'tits';
      break;
    default:
      break;
  }
  return descript + 'breasts';
}

export function nippleDescription(i_creature: Creature, i_rowNum: number): string {
  //DEBUG SHIT!
  if (i_rowNum > i_creature.breastRows.length - 1) {
    console.error('<B>Error: Invalid breastRows (' + i_rowNum + ') passed to nippleDescription()</b>');
    return '<B>Error: Invalid breastRows (' + i_rowNum + ') passed to nippleDescription()</b>';
  }
  if (i_rowNum < 0) {
    console.error('<B>Error: Invalid breastRows (' + i_rowNum + ') passed to nippleDescription()</b>');
    return '<B>Error: Invalid breastRows (' + i_rowNum + ') passed to nippleDescription()</b>';
  }
  let haveDescription = false;
  let description = '';
  let options;
  const rando = 0;
  const rollOne = UTIL.rand(4);
  const rollTwo = UTIL.rand(3);
  const rollThree = UTIL.rand(3);
  //Size descriptors 33% chance
  if (rollOne == 0) {
    //TINAHHHH
    if (i_creature.nippleLength < 0.25) {
      options = ['tiny ', 'itty-bitty ', 'teeny-tiny ', 'dainty '];
      description += UTIL.randomChoice(options);
    }
    //Prominant
    if (i_creature.nippleLength >= 0.4 && i_creature.nippleLength < 1) {
      options = ['prominent ', 'pencil eraser-sized ', 'eye-catching ', 'pronounced ', 'striking '];
      description += UTIL.randomChoice(options);
    }
    //Big 'uns
    if (i_creature.nippleLength >= 1 && i_creature.nippleLength < 2) {
      options = ['forwards-jutting ', 'over-sized ', 'fleshy ', 'large protruding '];
      description += UTIL.randomChoice(options);
    }
    //'Uge
    if (i_creature.nippleLength >= 2 && i_creature.nippleLength < 3.2) {
      options = ['elongated ', 'massive ', 'awkward ', 'lavish ', 'hefty '];
      description += UTIL.randomChoice(options);
    }
    //Massive
    if (i_creature.nippleLength >= 3.2) {
      options = ['bulky ', 'ponderous ', 'thumb-sized ', 'cock-sized ', 'cow-like '];
      description += UTIL.randomChoice(options);
    }
    haveDescription = true;
  }
  //Milkiness/Arousal/Wetness Descriptors 33% of the time
  if (rollTwo == 0 && !haveDescription) {
    //Fuckable chance first!
    if (i_creature.hasFuckableNipples()) {
      //Fuckable and lactating?
      if (i_creature.biggestLactation() > 1) {
        options = ['milk-lubricated ', 'lactating ', 'lactating ', 'milk-slicked ', 'milky '];
        description += UTIL.randomChoice(options);
      }
      //Just fuckable
      else {
        options = ['wet ', 'mutated ', 'slimy ', 'damp ', 'moist ', 'slippery ', 'oozing ', 'sloppy ', 'dewy '];
        description += UTIL.randomChoice(options);
      }
      haveDescription = true;
    }
    //Just lactating!
    else if (i_creature.biggestLactation() > 0) {
      //Light lactation
      if (i_creature.biggestLactation() <= 1) {
        options = ['milk moistened ', 'slightly lactating ', 'milk-dampened '];
        description += UTIL.randomChoice(options);
      }
      //Moderate lactation
      if (i_creature.biggestLactation() > 1 && i_creature.biggestLactation() <= 2) {
        options = ['lactating ', 'milky ', 'milk-seeping '];
        description += UTIL.randomChoice(options);
      }
      //Heavy lactation
      if (i_creature.biggestLactation() > 2) {
        options = ['dripping ', 'dribbling ', 'milk-leaking ', 'drooling '];
        description += UTIL.randomChoice(options);
      }
      haveDescription = true;
    }
  }
  //Possible arousal descriptors
  else if (rollThree == 0 && !haveDescription) {
    if (i_creature.lust > 50 && i_creature.lust < 75) {
      options = ['erect ', 'perky ', 'erect ', 'firm ', 'tender '];
      description += UTIL.randomChoice(options);
      haveDescription = true;
    }
    if (i_creature.lust >= 75) {
      options = ['throbbing ', 'trembling ', 'needy ', 'throbbing '];
      description += UTIL.randomChoice(options);
      haveDescription = true;
    }
  }
  if (!haveDescription && UTIL.rand(2) == 0 && i_creature.nipplesPierced > 0 && i_rowNum == 0) {
    if (i_creature.nipplesPierced >= 5) description += 'chained ';
    else description += 'pierced ';
    haveDescription = true;
  }
  if (!haveDescription && i_creature.skinType == 3) {
    options = ['slime-slick ', 'goopy ', 'slippery '];
    description += UTIL.randomChoice(options);
  }
  if (!haveDescription && i_creature.findStatusEffect(liveData.StatusEffects.BlackNipples) >= 0) {
    options = ['black ', 'ebony ', 'sable '];
    description += UTIL.randomChoice(options);
  }

  //Nounsssssssss*BOOM*
  let choice = 0;
  choice = UTIL.rand(5);
  if (choice == 0) description += 'nipple';
  if (choice == 1) {
    if (i_creature.nippleLength < 0.5) description += 'perky nipple';
    else description += 'cherry-like nub';
  }
  if (choice == 2) {
    if (i_creature.hasFuckableNipples()) description += 'fuckable nip';
    else {
      if (i_creature.biggestLactation() >= 1 && i_creature.nippleLength >= 1) description += 'teat';
      else description += 'nipple';
    }
  }
  if (choice == 3) {
    if (i_creature.hasFuckableNipples()) description += 'nipple-hole';
    else {
      if (i_creature.biggestLactation() >= 1 && i_creature.nippleLength >= 1) description += 'teat';
      else description += 'nipple';
    }
  }
  if (choice == 4) {
    if (i_creature.hasFuckableNipples()) description += 'nipple-cunt';
    else description += 'nipple';
  }
  return description;
}

export function hipDescription(i_character: Creature): string {
  let description = '';
  let options;
  if (i_character.hipRating <= 1) {
    options = ['tiny ', 'narrow ', 'boyish '];
    description = UTIL.randomChoice(options);
  } else if (i_character.hipRating > 1 && i_character.hipRating < 4) {
    options = ['slender ', 'narrow ', 'thin '];
    description = UTIL.randomChoice(options);
    if (i_character.thickness < 30) {
      if (UTIL.rand(2) == 0) description = 'slightly-flared ';
      else description = 'curved ';
    }
  } else if (i_character.hipRating >= 4 && i_character.hipRating < 6) {
    options = ['well-formed ', 'pleasant '];
    description = UTIL.randomChoice(options);
    if (i_character.thickness < 30) {
      if (UTIL.rand(2) == 0) description = 'flared ';
      else description = 'curvy ';
    }
  } else if (i_character.hipRating >= 6 && i_character.hipRating < 10) {
    options = ['ample ', 'noticeable ', 'girly '];
    description = UTIL.randomChoice(options);
    if (i_character.thickness < 30) {
      if (UTIL.rand(2) == 0) description = 'flared ';
      else description = 'waspish ';
    }
  } else if (i_character.hipRating >= 10 && i_character.hipRating < 15) {
    options = ['flared ', 'curvy ', 'wide '];
    description = UTIL.randomChoice(options);
    if (i_character.thickness < 30) {
      if (UTIL.rand(2) == 0) description = 'flared ';
      else description = 'waspish ';
    }
  } else if (i_character.hipRating >= 15 && i_character.hipRating < 20) {
    if (i_character.thickness < 40) {
      if (UTIL.rand(2) == 0) description = 'flared, ';
      else description = 'waspish, ';
    }
    options = ['fertile ', 'child-bearing ', 'voluptuous '];
    description += UTIL.randomChoice(options);
  } else if (i_character.hipRating >= 20) {
    if (i_character.thickness < 40) {
      if (UTIL.rand(2) == 0) description = 'flaring, ';
      else description = 'incredibly waspish, ';
    }
    options = ['broodmother-sized ', 'cow-like ', 'inhumanly-wide '];
    description += UTIL.randomChoice(options);
  }
  //Taurs
  if (i_character.isTaur() && UTIL.rand(3) == 0) description += 'flanks';
  //Nagas have sides, right?
  else if (i_character.isNaga() && UTIL.rand(3) == 0) description += 'sides';
  //Non taurs or taurs who didn't roll flanks
  else {
    options = ['hips', 'thighs'];
    description += UTIL.randomChoice(options);
  }

  return description;
}

export function cockDescript(creature: Creature, cockIndex = 0): string {
  if (creature.cocks.length == 0) return '<b>ERROR: CockDescript Called But No Cock Present</b>';
  let cockType = ENUM.CockType.HUMAN;
  if (cockIndex != 99) {
    //CockIndex 99 forces a human cock description
    if (creature.cocks.length <= cockIndex) return '<b>ERROR: CockDescript called with index of ' + cockIndex + ' - out of BOUNDS</b>';
    cockType = creature.cocks[cockIndex].cockType;
  }
  const isPierced = creature.cocks.length == 1 && creature.cocks[cockIndex].pierced; //Only describe as pierced or sock covered if the creature has just one cock
  const hasSock = creature.cocks.length == 1 && creature.cocks[cockIndex].sock != '';
  const isGooey = creature.skinType == ENUM.SkinType.Goo;
  return cockDescription(
    cockType,
    creature.cocks[cockIndex].cockLength,
    creature.cocks[cockIndex].cockThickness,
    creature.lust,
    creature.cumQ(),
    isPierced,
    hasSock,
    isGooey,
  );
}

//This takes all the variables independently so that a creature object is not required for a cockDescription.
//This allows a single cockDescription to produce output for both cockDescript and the old NPCCockDescript.
export function cockDescription(
  cockType: ENUM.CockType,
  length: number,
  girth: number,
  lust = 50,
  cumQ = 10,
  isPierced = false,
  hasSock = false,
  isGooey = false,
): string {
  if (UTIL.rand(2) == 0) {
    if (cockType == ENUM.CockType.HUMAN) return cockAdjective(cockType, length, girth, lust, cumQ, isPierced, hasSock, isGooey) + ' ' + cockNoun(cockType);
    else return cockAdjective(cockType, length, girth, lust, cumQ, isPierced, hasSock, isGooey) + ', ' + cockNoun(cockType);
  }
  return cockNoun(cockType);
}

export function cockNoun(cockType: number): string {
  /*
        if (cockType is int) {
        trace("Someone is still calling cockNoun with an integer cock type");
        trace("Fix this shit already, dammit!")
        cockType = ENUM.CockType.ParseConstantByIndex(cockType);
        }
        */
  if (cockType == ENUM.CockType.HUMAN) {
    // Yeah, this is kind of messy
    // there is no other easy way to preserve the weighting fenoxo did
    return UTIL.randomChoice('cock', 'cock', 'cock', 'cock', 'cock', 'prick', 'prick', 'pecker', 'shaft', 'shaft', 'shaft');
  } else if (cockType == ENUM.CockType.BEE) {
    return UTIL.randomChoice('bee prick', 'bee prick', 'bee prick', 'bee prick', 'insectoid cock', 'insectoid cock', 'furred monster');
  } else if (cockType == ENUM.CockType.DOG) {
    return UTIL.randomChoice(
      'dog-shaped dong',
      'canine shaft',
      'pointed prick',
      'knotty dog-shaft',
      'bestial cock',
      'animalistic puppy-pecker',
      'pointed dog-dick',
      'pointed shaft',
      'canine member',
      'canine cock',
      'knotted dog-cock',
    );
  } else if (cockType == ENUM.CockType.FOX) {
    return UTIL.randomChoice(
      'fox-shaped dong',
      'vulpine shaft',
      'pointed prick',
      'knotty fox-shaft',
      'bestial cock',
      'animalistic vixen-pricker',
      'pointed fox-dick',
      'pointed shaft',
      'vulpine member',
      'vulpine cock',
      'knotted fox-cock',
    );
  } else if (cockType == ENUM.CockType.HORSE) {
    return UTIL.randomChoice(
      'flared horse-cock',
      'equine prick',
      'bestial horse-shaft',
      'flat-tipped horse-member',
      'animalistic stallion-prick',
      'equine dong',
      'beast cock',
      'flared stallion-cock',
    );
  } else if (cockType == ENUM.CockType.DEMON) {
    return UTIL.randomChoice(
      'nub-covered demon-dick',
      'nubby shaft',
      'corrupted cock',
      'perverse pecker',
      'bumpy demon-dick',
      'demonic cock',
      'demonic dong',
      'cursed cock',
      'infernal prick',
      'unholy cock',
      'blighted cock',
    );
  } else if (cockType == ENUM.CockType.TENTACLE) {
    return UTIL.randomChoice(
      'twisting tentacle-prick',
      'wriggling plant-shaft',
      'sinuous tentacle-cock',
      'squirming cock-tendril',
      'writhing tentacle-pecker',
      'wriggling plant-prick',
      'penile flora',
      'smooth shaft',
      'undulating tentacle-dick',
      'slithering vine-prick',
      'vine-shaped cock',
    );
  } else if (cockType == ENUM.CockType.CAT) {
    return UTIL.randomChoice(
      'feline dick',
      'spined cat-cock',
      'pink kitty-cock',
      'spiny prick',
      'animalistic kitty-prick',
      'oddly-textured cat-penis',
      'feline member',
      'spined shaft',
      'feline shaft',
      'barbed dick',
      'nubby kitten-prick',
    );
  } else if (cockType == ENUM.CockType.LIZARD) {
    return UTIL.randomChoice(
      'reptilian dick',
      'purple cock',
      'inhuman cock',
      'reptilian prick',
      'purple prick',
      'purple member',
      'serpentine member',
      'serpentine shaft',
      'reptilian shaft',
      'bulbous snake-shaft',
      'bulging snake-dick',
    );
  } else if (cockType == ENUM.CockType.ANEMONE) {
    return UTIL.randomChoice(
      'anemone dick',
      'tentacle-ringed cock',
      'blue member',
      'stinger-laden shaft',
      'pulsating prick',
      'anemone prick',
      'stinger-coated member',
      'blue cock',
      'tentacle-ringed dick',
      'near-transparent shaft',
      'squirming shaft',
    );
  } else if (cockType == ENUM.CockType.KANGAROO) {
    return UTIL.randomChoice(
      'kangaroo-like dick',
      'pointed cock',
      'marsupial member',
      'tapered shaft',
      'curved pecker',
      'pointed prick',
      'squirming kangaroo-cock',
      'marsupial cock',
      'tapered kangaroo-dick',
      'curved kangaroo-cock',
      'squirming shaft',
    );
  } else if (cockType == ENUM.CockType.DRAGON) {
    return UTIL.randomChoice(
      'dragon-like dick',
      'segmented shaft',
      'pointed prick',
      'knotted dragon-cock',
      'mythical mast',
      'segmented tool',
      'draconic dick',
      'draconic cock',
      'tapered dick',
      'unusual endowment',
      'scaly shaft',
    );
  } else if (cockType == ENUM.CockType.DISPLACER) {
    return UTIL.randomChoice(
      'coerl cock',
      'tentacle-tipped phallus',
      'starfish-tipped shaft',
      'alien member',
      'almost-canine dick',
      'bizarre prick',
      'beastly cock',
      'cthulhu-tier cock',
      'coerl cock',
      'animal dong',
      'star-capped tool',
      'knotted erection',
    );
  } else if (cockType == ENUM.CockType.AVIAN) {
    return UTIL.randomChoice(
      'bird cock',
      'bird dick',
      'bird pecker',
      'avian cock',
      'avian dick',
      'avian penis',
      'avian prick',
      'avian pecker',
      'tapered cock',
      'tapered prick',
    );
  } else if (cockType == ENUM.CockType.PIG) {
    return UTIL.randomChoice(
      'pig cock',
      'pig dick',
      'pig penis',
      'pig-like cock',
      'pig-like dick',
      'swine cock',
      'swine penis',
      'corkscrew-tipped cock',
      'hoggish cock',
      'pink pig-cock',
      'pink pecker',
    );
  } else if (cockType == ENUM.CockType.RHINO) {
    return UTIL.randomChoice(
      'oblong cock',
      'oblong dick',
      'oblong prick',
      'rhino cock',
      'rhino dick',
      'rhino penis',
      'rhino pecker',
      'rhino prick',
      'bulged rhino cock',
      'bulged rhino dick',
    );
  } else if (cockType == ENUM.CockType.ECHIDNA) {
    return UTIL.randomChoice(
      'strange echidna dick',
      'strange echidna cock',
      'echidna dick',
      'echidna penis',
      'echidna cock',
      'exotic endowment',
      'four-headed prick',
      'four-headed penis',
      'four-headed cock',
      'four-headed dick',
    );
  }
  return UTIL.randomChoice('cock', 'prick', 'pecker', 'shaft');
}

//New cock adjectives.  The old one sucked dicks
//This handles all cockAdjectives. Previously there were separate functions for the player, monsters and NPCs.
export function cockAdjective(
  cockType: ENUM.CockType,
  length: number,
  girth: number,
  lust = 50,
  cumQ = 10,
  isPierced = false,
  hasSock = false,
  isGooey = false,
): string {
  //First, the three possible special cases
  if (isPierced && UTIL.rand(5) == 0) return 'pierced';
  if (hasSock && UTIL.rand(5) == 0)
    return UTIL.randomChoice('sock-sheathed', 'garment-wrapped', 'smartly dressed', 'cloth-shrouded', 'fabric swaddled', 'covered');
  if (isGooey && UTIL.rand(4) == 0) return UTIL.randomChoice('goopey', 'gooey', 'slimy');
  //Length 1/3 chance
  if (UTIL.rand(3) == 0) {
    if (length < 3) return UTIL.randomChoice('little', 'toy-sized', 'mini', 'budding', 'tiny');
    if (length < 5) return UTIL.randomChoice('short', 'small');
    if (length < 7) return UTIL.randomChoice('fair-sized', 'nice');
    if (length < 9) {
      if (cockType == ENUM.CockType.HORSE) return UTIL.randomChoice('sizable', 'pony-sized', 'colt-like');
      return UTIL.randomChoice('sizable', 'long', 'lengthy');
    }
    if (length < 13) {
      if (cockType == ENUM.CockType.DOG) return UTIL.randomChoice('huge', 'foot-long', 'mastiff-like');
      return UTIL.randomChoice('huge', 'foot-long', 'cucumber-length');
    }
    if (length < 18) return UTIL.randomChoice('massive', 'knee-length', 'forearm-length');
    if (length < 30) return UTIL.randomChoice('enormous', 'giant', 'arm-like');
    if (cockType == ENUM.CockType.TENTACLE && UTIL.rand(2) == 0) return 'coiled';
    return UTIL.randomChoice('towering', 'freakish', 'monstrous', 'massive');
  }
  //Hornyness 1/2
  else if (lust > 75 && UTIL.rand(2) == 0) {
    if (lust > 90) {
      //Uber horny like a baws!
      if (cumQ < 50) return UTIL.randomChoice('throbbing', 'pulsating'); //Weak as shit cum
      if (cumQ < 200) return UTIL.randomChoice('dribbling', 'leaking', 'drooling'); //lots of cum? drippy.
      return UTIL.randomChoice('very drippy', 'pre-gushing', 'cum-bubbling', 'pre-slicked', 'pre-drooling'); //Tons of cum
    } else {
      //A little less lusty, but still lusty.
      if (cumQ < 50) return UTIL.randomChoice('turgid', 'blood-engorged', 'rock-hard', 'stiff', 'eager'); //Weak as shit cum
      if (cumQ < 200) return UTIL.randomChoice('turgid', 'blood-engorged', 'rock-hard', 'stiff', 'eager', 'fluid-beading', 'slowly-oozing'); //A little drippy
      return UTIL.randomChoice('dribbling', 'drooling', 'fluid-leaking', 'leaking'); //uber drippy
    }
  }
  //Girth - fallback
  if (girth <= 0.75) return UTIL.randomChoice('thin', 'slender', 'narrow');
  if (girth <= 1.2) return 'ample';
  if (girth <= 1.4) return UTIL.randomChoice('ample', 'big');
  if (girth <= 2) return UTIL.randomChoice('broad', 'meaty', 'girthy');
  if (girth <= 3.5) return UTIL.randomChoice('fat', 'distended', 'wide');
  return UTIL.randomChoice('inhumanly distended', 'monstrously thick', 'bloated');
}

export function cockMultiNoun(cockType: ENUM.CockType): string {
  /*
        if (cockType is int) {
        trace("Someone is still calling cockNoun with an integer cock type");
        trace("Fix this shit already, dammit!");
        cockType = ENUM.CockType.ParseConstantByIndex(cockType);
        }
        */
  let options;
  let description = '';
  if (cockType == ENUM.CockType.HUMAN) {
    options = ['cock', 'cock', 'cock', 'cock', 'cock', 'prick', 'prick', 'pecker', 'shaft', 'shaft', 'shaft'];
    description += UTIL.randomChoice(options);
  } else if (cockType == ENUM.CockType.BEE) {
    options = ['bee prick', 'bee prick', 'bee prick', 'bee prick', 'insectoid cock', 'insectoid cock', 'furred monster'];
    description += UTIL.randomChoice(options);
  } else if (cockType == ENUM.CockType.DOG) {
    options = [
      'doggie dong',
      'canine shaft',
      'pointed prick',
      'dog-shaft',
      'dog-cock',
      'puppy-pecker',
      'dog-dick',
      'pointed shaft',
      'canine cock',
      'canine cock',
      'dog cock',
    ];
    description += UTIL.randomChoice(options);
  } else if (cockType == ENUM.CockType.HORSE) {
    options = ['horsecock', 'equine prick', 'horse-shaft', 'horse-prick', 'stallion-prick', 'equine dong'];
    description += UTIL.randomChoice(options);
  } else if (cockType == ENUM.CockType.DEMON) {
    options = [
      'demon-dick',
      'nubby shaft',
      'corrupted cock',
      'perverse pecker',
      'bumpy demon-dick',
      'demonic cock',
      'demonic dong',
      'cursed cock',
      'infernal prick',
      'unholy cock',
      'blighted cock',
    ];
    description += UTIL.randomChoice(options);
  } else if (cockType == ENUM.CockType.TENTACLE) {
    options = [
      'tentacle prick',
      'plant-like shaft',
      'tentacle cock',
      'cock-tendril',
      'tentacle pecker',
      'plant prick',
      'penile flora',
      'smooth inhuman shaft',
      'tentacle dick',
      'vine prick',
      'vine-like cock',
    ];
    description += UTIL.randomChoice(options);
  } else if (cockType == ENUM.CockType.CAT) {
    options = [
      'feline dick',
      'cat-cock',
      'kitty-cock',
      'spiny prick',
      'pussy-prick',
      'cat-penis',
      'feline member',
      'spined shaft',
      'feline shaft',
      "'barbed' dick",
      'kitten-prick',
    ];
    description += UTIL.randomChoice(options);
  } else if (cockType == ENUM.CockType.LIZARD) {
    options = [
      'reptile-dick',
      'purple cock',
      'inhuman cock',
      'reptilian prick',
      'purple prick',
      'purple member',
      'serpentine member',
      'serpentine shaft',
      'reptilian shaft',
      'snake-shaft',
      'snake dick',
    ];
    description += UTIL.randomChoice(options);
  } else if (cockType == ENUM.CockType.RHINO) {
    options = ['oblong cock', 'rhino dick', 'rhino cock', 'bulged rhino cock', 'rhino penis', 'rhink dong', 'oblong penis', 'oblong dong', 'oblong dick'];
    description += UTIL.randomChoice(options);
  } else {
    description += UTIL.randomChoice('cock', 'prick', 'pecker', 'shaft');
  }
  return description;
}

/**
 * Describe creatures balls.
 * @param    i_forcedSize    Force a description of the size of the balls
 * @param    i_plural        Show plural forms
 * @param    i_creature        Monster, Player or NonPlayer
 * @param    i_withArticle    Show description with article in front
 * @return    Full description of balls
 */
export function ballsDescription(i_forcedSize: boolean, i_plural: boolean, i_creature: Creature, i_withArticle = false): string {
  //Main function
  if (i_creature.balls == 0) return 'prostate';

  const haveDescription = false;
  const rando = 0;
  let description = '';
  let options;

  if (i_plural && i_creature.findStatusEffect(liveData.StatusEffects.Uniball) < 0) {
    if (i_creature.balls == 1) {
      if (i_withArticle) {
        options = ['a single', 'a solitary', 'a lone', 'an individual'];
      } else {
        options = ['single', 'solitary', 'lone', 'individual'];
      }
      description += UTIL.randomChoice(options);
    } else if (i_creature.balls == 2) {
      if (i_withArticle) {
        options = ['a pair of', 'two', 'a duo of'];
      } else {
        options = ['pair of', 'two', 'duo of'];
      }
      description += UTIL.randomChoice(options);
    } else if (i_creature.balls == 3) {
      options = ['three', 'triple'];
      i_withArticle ? options.push('a trio of') : options.push('trio of');
      description += UTIL.randomChoice(options);
    } else if (i_creature.balls == 4) {
      options = ['four', 'quadruple'];
      i_withArticle ? options.push('a quartette of') : options.push('quartette of');
      description += UTIL.randomChoice(options);
    } else {
      if (i_withArticle) {
        options = ['a multitude of', 'many', 'a large handful of'];
      } else {
        options = ['multitude of', 'many', 'large handful of'];
      }
      description += UTIL.randomChoice(options);
    }
  }
  //size!
  if (i_creature.ballSize > 1 && (UTIL.rand(3) <= 1 || i_forcedSize)) {
    if (description) description += ' ';

    if (i_creature.ballSize >= 18) description += 'hideously swollen and oversized';
    else if (i_creature.ballSize >= 15) description += 'beachball-sized';
    else if (i_creature.ballSize >= 12) description += 'watermelon-sized';
    else if (i_creature.ballSize >= 9) description += 'basketball-sized';
    else if (i_creature.ballSize >= 7) description += 'soccerball-sized';
    else if (i_creature.ballSize >= 5) description += 'cantaloupe-sized';
    else if (i_creature.ballSize >= 4) description += 'grapefruit-sized';
    else if (i_creature.ballSize >= 3) description += 'apple-sized';
    else if (i_creature.ballSize >= 2) description += 'baseball-sized';
    else if (i_creature.ballSize > 1) description += 'large';
  }
  //UNIBALL
  if (i_creature.findStatusEffect(liveData.StatusEffects.Uniball) >= 0) {
    if (description) description += ' ';
    options = ['tightly-compressed', 'snug', 'cute', 'pleasantly squeezed', 'compressed-together'];
    description += UTIL.randomChoice(options);
  }
  //Descriptive
  if (i_creature.hoursSinceCum >= 48 && UTIL.rand(2) == 0 && !i_forcedSize) {
    if (description) description += ' ';
    options = ['overflowing', 'swollen', 'cum-engorged'];
    description += UTIL.randomChoice(options);
  }
  //lusty
  if (i_creature.lust > 90 && description == '' && UTIL.rand(2) == 0 && !i_forcedSize) {
    options = ['eager', 'full', 'needy', 'desperate', 'throbbing', 'heated', 'trembling', 'quivering', 'quaking'];
    description += UTIL.randomChoice(options);
  }
  //Slimy skin
  if (i_creature.skinType == 3) {
    if (description) description += ' ';
    options = ['goopey', 'gooey', 'slimy'];
    description += UTIL.randomChoice(options);
  }
  if (description) description += ' ';

  options = ['nut', 'gonad', 'teste', 'testicle', 'testicle', 'ball', 'ball', 'ball'];

  // I don't know how this was ever supposed to work.
  //if (i_creature.balls == 4 && i_plural) options.push("quads", "quads", "quads");

  description += UTIL.randomChoice(options);
  if (i_plural) description += 's';

  if (i_creature.findStatusEffect(liveData.StatusEffects.Uniball) >= 0 && UTIL.rand(2) == 0) {
    if (UTIL.rand(3) == 0) description += ' merged into a cute, spherical package';
    else if (UTIL.rand(2) == 0) description += ' combined into a round, girlish shape';
    else description += ' squeezed together into a perky, rounded form';
  }
  return description;
}

//Returns random description of scrotum
export function sackDescript(i_creature: Creature): string {
  if (i_creature.balls == 0) return 'prostate';

  const options = ['scrotum', 'sack', 'nutsack', 'ballsack', 'beanbag', 'pouch'];
  let description = '';

  description += UTIL.randomChoice(options);

  return description;
}

export function vaginaDescript(i_creature: Creature, i_vaginaIndex = 0, forceDesc = false): string {
  //Main function
  if (i_vaginaIndex > i_creature.vaginas.length - 1) {
    //CoC_Settings.error("<B>Error: Invalid vagina number (" + i_vaginaIndex + ") passed to vaginaDescript()</b>");
    return '<B>Error: Invalid vagina number (' + i_vaginaIndex + ') passed to vaginaDescript()</b>';
  }
  if (i_vaginaIndex < 0) {
    //CoC_Settings.error("<B>Error: Invalid vaginaNum (" + i_vaginaIndex + ") passed to vaginaDescript()</b>");
    return '<B>Error: Invalid vaginaNum (' + i_vaginaIndex + ') passed to vaginaDescript()</b>';
  }
  if (i_creature.vaginas.length <= 0) {
    //CoC_Settings.error("ERROR: Called vaginaDescription with no vaginas");
    return 'ERROR: Called vaginaDescription with no vaginas';
  }

  let description = '';
  let weighting = 0;
  const haveDescription = false;
  let options;

  //Very confusing way to display values.
  if (i_creature.vaginas[i_vaginaIndex].vaginalLooseness == 0) weighting = 61;
  if (i_creature.vaginas[i_vaginaIndex].vaginalLooseness == 4 || i_creature.vaginas[i_vaginaIndex].vaginalLooseness == 5) weighting = 10;

  //tightness descript - 40% display rate
  if (forceDesc || UTIL.rand(100) + weighting > 60) {
    if (i_creature.vaginas[i_vaginaIndex].vaginalLooseness == 0) {
      if (i_creature.vaginas[i_vaginaIndex].virgin) description += 'virgin';
      else description += 'tight';
    }
    if (i_creature.vaginas[i_vaginaIndex].vaginalLooseness == 2) description += 'loose';
    if (i_creature.vaginas[i_vaginaIndex].vaginalLooseness == 3) description += 'very loose';
    if (i_creature.vaginas[i_vaginaIndex].vaginalLooseness == 4) description += 'gaping';
    if (i_creature.vaginas[i_vaginaIndex].vaginalLooseness == 5) description += 'gaping-wide';
  }
  //wetness descript - 30% display rate
  if (forceDesc || UTIL.rand(100) + weighting > 70) {
    if (description) description += ', ';
    if (i_creature.vaginas[i_vaginaIndex].vaginalWetness == 0) description += 'dry';
    if (i_creature.vaginas[i_vaginaIndex].vaginalWetness == 1) description += 'moist';
    if (i_creature.vaginas[i_vaginaIndex].vaginalWetness == 2) description += 'wet';
    if (i_creature.vaginas[i_vaginaIndex].vaginalWetness == 3) description += 'slick';
    if (i_creature.vaginas[i_vaginaIndex].vaginalWetness == 4) description += 'drooling';
    if (i_creature.vaginas[i_vaginaIndex].vaginalWetness == 5) description += 'slavering';
  }
  if (i_creature.vaginas[i_vaginaIndex].labiaPierced > 0 && (forceDesc || UTIL.rand(3) == 0)) {
    if (description) description += ', ';
    description += 'pierced';
  }
  if (i_creature.skinType == 3 && description == '') {
    // if (description) description += ", "
    if (UTIL.rand(2) == 0) description += 'gooey';
    else description += 'slimy';
  }
  if (i_creature.vaginaType() == 5 && (forceDesc || Math.floor(Math.random() * 2) == 0)) {
    if (description) description += ', ';
    options = ['black', 'onyx', 'ebony', 'dusky', 'sable', 'obsidian', 'midnight-hued', 'jet black'];
    description += UTIL.randomChoice(options);
  }

  if (description) description += ' ';

  if (liveData.SFWMode) {
    //Removes something that might offend sensitive people.
    options = ['cooter', 'entrance'];
  } else {
    options = ['vagina', 'pussy', 'cooter', 'twat', 'cunt', 'snatch', 'fuck-hole', 'muff'];
  }
  description += UTIL.randomChoice(options);
  //Something that would be nice to have but needs a variable in Creature or Character.
  //if (i_creature.bunnyScore() >= 3) description += "rabbit hole";

  return description;
}

export function clitDescription(i_creature: Creature): string {
  let description = '';
  let options;
  let haveDescription = false;
  //Length Adjective - 50% chance
  if (UTIL.rand(2) == 0) {
    //small clits!
    if (i_creature.clitLength <= 0.5) {
      options = ['tiny ', 'little ', 'petite ', 'diminutive ', 'miniature '];
      description += UTIL.randomChoice(options);
    }
    //"average".
    if (i_creature.clitLength > 0.5 && i_creature.clitLength < 1.5) {
      //no size comment
    }
    //Biggies!
    if (i_creature.clitLength >= 1.5 && i_creature.clitLength < 4) {
      options = ['large ', 'large ', 'substantial ', 'substantial ', 'considerable '];
      description += UTIL.randomChoice(options);
    }
    //'Uge
    if (i_creature.clitLength >= 4) {
      options = ['monster ', 'tremendous ', 'colossal ', 'enormous ', 'bulky '];
      description += UTIL.randomChoice(options);
    }
  }
  //Descriptive descriptions - 50% chance of being called
  if (UTIL.rand(2) == 0) {
    //Doggie descriptors - 50%
    //TODO Conditionals don't make sense, need to introduce a class variable to keep of "something" or move race or Creature/Character
    if (!haveDescription && i_creature.skinType == 1 && UTIL.rand(2) == 0) {
      description += 'bitch-';
      haveDescription = true;
    }
    /*Horse descriptors - 50%
            if (creature.skinType == 1 > 2 && !descripted && UTIL.rand(2) == 0) {
            descripted = true;
            descript += "mare-";
            }*/
    //Horny descriptors - 75% chance
    if (!haveDescription && i_creature.lust > 70 && UTIL.rand(4) < 3) {
      options = ['throbbing ', 'pulsating ', 'hard '];
      description += UTIL.randomChoice(options);
      haveDescription = true;
    }
    //High libido - always use if no other descript
    if (!haveDescription && i_creature.lib > 50 && UTIL.rand(2) == 0) {
      options = ['insatiable ', 'greedy ', 'demanding ', 'rapacious'];
      description += UTIL.randomChoice(options);
      haveDescription = true;
    }
  }
  if (i_creature.hasVagina()) {
    if (!haveDescription && i_creature.vaginas[0].clitPierced > 0) {
      description += 'pierced ';
      haveDescription = true;
    }
  } else {
    //CoC_Settings.error("ERROR: CLITDESCRIPT WITH NO CLIT");
    return 'ERROR: CLITDESCRIPT WITH NO CLIT';
  }

  //Clit nouns
  options = ['clit', 'clitty', 'button', 'pleasure-buzzer', 'clit', 'clitty', 'button', 'clit', 'clit', 'button'];
  if (liveData.SFWMode) {
    options = ['bump', 'button'];
  }
  description += UTIL.randomChoice(options);

  return description;
}

/**
 * Gives a full description of a Character's butt.
 * Be aware that it only supports Characters, not all Creatures.
 * @param    i_character
 * @return    A full description of a Character's butt.
 */
export function buttDescription(i_character: Creature): string {
  let description = '';
  let options;
  if (i_character.buttRating <= 1) {
    if (i_character.tone >= 60) description += 'incredibly tight, perky ';
    else {
      options = ['tiny', 'very small', 'dainty'];
      description = UTIL.randomChoice(options);
      //Soft PC's buns!
      if (i_character.tone <= 30 && UTIL.rand(3) == 0) description += ' yet soft';
      description += ' ';
    }
  }
  if (i_character.buttRating > 1 && i_character.buttRating < 4) {
    if (i_character.tone >= 65) {
      options = ['perky, muscular ', 'tight, toned ', 'compact, muscular ', 'tight ', 'muscular, toned '];
      description = UTIL.randomChoice(options);
    }
    //Nondescript
    else if (i_character.tone >= 30) {
      options = ['tight ', 'firm ', 'compact ', 'petite '];
      description = UTIL.randomChoice(options);
    }
    //FLABBAH
    else {
      options = ['small, heart-shaped ', 'soft, compact ', 'soft, heart-shaped ', 'small, cushy ', 'small ', 'petite ', 'snug '];
      description = UTIL.randomChoice(options);
    }
  }
  if (i_character.buttRating >= 4 && i_character.buttRating < 6) {
    //TOIGHT LIKE A TIGER
    if (i_character.tone >= 65) {
      options = ['nicely muscled ', 'nice, toned ', 'muscly ', 'nice toned ', 'toned ', 'fair '];
      description = UTIL.randomChoice(options);
    }
    //Nondescript
    else if (i_character.tone >= 30) {
      options = ['nice ', 'fair '];
      description = UTIL.randomChoice(options);
    }
    //FLABBAH
    else {
      options = ['nice, cushiony ', 'soft ', 'nicely-rounded, heart-shaped ', 'cushy ', 'soft, squeezable '];
      description = UTIL.randomChoice(options);
    }
  }
  if (i_character.buttRating >= 6 && i_character.buttRating < 8) {
    //TOIGHT LIKE A TIGER
    if (i_character.tone >= 65) {
      options = ['full, toned ', 'muscly handful of ', 'shapely, toned ', 'muscular, hand-filling ', 'shapely, chiseled ', 'full ', 'chiseled '];
      description = UTIL.randomChoice(options);
    }
    //Nondescript
    else if (i_character.tone >= 30) {
      options = ['handful of ', 'full ', 'shapely ', 'hand-filling '];
      description = UTIL.randomChoice(options);
    }
    //FLABBAH
    else {
      if (UTIL.rand(8) == 0) return 'supple, handful of ass';
      options = ['somewhat jiggly ', 'soft, hand-filling ', 'cushiony, full ', 'plush, shapely ', 'full ', 'soft, shapely ', 'rounded, spongy '];
      description = UTIL.randomChoice(options);
    }
  }
  if (i_character.buttRating >= 8 && i_character.buttRating < 10) {
    //TOIGHT LIKE A TIGER
    if (i_character.tone >= 65) {
      options = [
        'large, muscular ',
        'substantial, toned ',
        'big-but-tight ',
        'squeezable, toned ',
        'large, brawny ',
        'big-but-fit ',
        'powerful, squeezable ',
        'large ',
      ];
      description = UTIL.randomChoice(options);
    }
    //Nondescript
    else if (i_character.tone >= 30) {
      options = ['squeezable ', 'large ', 'substantial '];
      description = UTIL.randomChoice(options);
    }
    //FLABBAH
    else {
      options = [
        'large, bouncy ',
        'soft, eye-catching ',
        'big, slappable ',
        'soft, pinchable ',
        'large, plush ',
        'squeezable ',
        'cushiony ',
        'plush ',
        'pleasantly plump ',
      ];
      description = UTIL.randomChoice(options);
    }
  }
  if (i_character.buttRating >= 10 && i_character.buttRating < 13) {
    //TOIGHT LIKE A TIGER
    if (i_character.tone >= 65) {
      options = ['thick, muscular ', 'big, burly ', 'heavy, powerful ', 'spacious, muscular ', 'toned, cloth-straining ', 'thick ', 'thick, strong '];
      description = UTIL.randomChoice(options);
    }
    //Nondescript
    else if (i_character.tone >= 30) {
      options = ['jiggling ', 'spacious ', 'heavy ', 'cloth-straining '];
      description = UTIL.randomChoice(options);
    }
    //FLABBAH
    else {
      options = [
        'super-soft, jiggling ',
        'spacious, cushy ',
        'plush, cloth-straining ',
        'squeezable, over-sized ',
        'spacious ',
        'heavy, cushiony ',
        'slappable, thick ',
        'jiggling ',
        'spacious ',
        'soft, plump ',
      ];
      description = UTIL.randomChoice(options);
    }
  }
  if (i_character.buttRating >= 13 && i_character.buttRating < 16) {
    //TOIGHT LIKE A TIGER
    if (i_character.tone >= 65) {
      options = [
        'expansive, muscled ',
        'voluminous, rippling ',
        'generous, powerful ',
        'big, burly ',
        'well-built, voluminous ',
        'powerful ',
        'muscular ',
        'powerful, expansive ',
      ];
      description = UTIL.randomChoice(options);
    }
    //Nondescript
    else if (i_character.tone >= 30) {
      options = ['expansive ', 'generous ', 'voluminous ', 'wide '];
      description = UTIL.randomChoice(options);
    }
    //FLABBAH
    else {
      options = [
        'pillow-like ',
        'generous, cushiony ',
        'wide, plush ',
        'soft, generous ',
        'expansive, squeezable ',
        'slappable ',
        'thickly-padded ',
        'wide, jiggling ',
        'wide ',
        'voluminous ',
        'soft, padded ',
      ];
      description = UTIL.randomChoice(options);
    }
  }
  if (i_character.buttRating >= 16 && i_character.buttRating < 20) {
    if (i_character.tone >= 65) {
      options = ['huge, toned ', 'vast, muscular ', 'vast, well-built ', 'huge, muscular ', 'strong, immense ', 'muscle-bound '];
      description = UTIL.randomChoice(options);
    }
    //Nondescript
    else if (i_character.tone >= 30) {
      if (UTIL.rand(5) == 0) return 'jiggling expanse of ass';
      if (UTIL.rand(5) == 0) return 'copious ass-flesh';
      options = ['huge ', 'vast ', 'giant '];
      description = UTIL.randomChoice(options);
    }
    //FLABBAH
    else {
      options = [
        'vast, cushiony ',
        'huge, plump ',
        'expansive, jiggling ',
        'huge, cushiony ',
        'huge, slappable ',
        'seam-bursting ',
        'plush, vast ',
        'giant, slappable ',
        'giant ',
        'huge ',
        'swollen, pillow-like ',
      ];
      description = UTIL.randomChoice(options);
    }
  }
  if (i_character.buttRating >= 20) {
    if (i_character.tone >= 65) {
      if (UTIL.rand(7) == 0) return 'colossal, muscly ass';
      options = [
        'ginormous, muscle-bound ',
        'colossal yet toned ',
        'strong, tremdously large ',
        'tremendous, muscled ',
        'ginormous, toned ',
        'colossal, well-defined ',
      ];
      description = UTIL.randomChoice(options);
    }
    //Nondescript
    else if (i_character.tone >= 30) {
      options = ['ginormous ', 'colossal ', 'tremendous ', 'gigantic '];
      description = UTIL.randomChoice(options);
    }
    //FLABBAH
    else {
      options = [
        'ginormous, jiggly ',
        'plush, ginormous ',
        'seam-destroying ',
        'tremendous, rounded ',
        'bouncy, colossal ',
        'thong-devouring ',
        'tremendous, thickly padded ',
        'ginormous, slappable ',
        'gigantic, rippling ',
        'gigantic ',
        'ginormous ',
        'colossal ',
        'tremendous ',
      ];
      description = UTIL.randomChoice(options);
    }
  }
  options = ['butt', 'butt', 'butt', 'butt', 'ass', 'ass', 'ass', 'ass', 'backside', 'backside', 'derriere', 'rump', 'bottom'];

  description += UTIL.randomChoice(options);
  //if (rando == 2) desc += "cheeks";
  return description;
}

/**
 * Gives a short description of a creature's butt.
 * Different from buttDescription in that it supports all creatures, not just characters.
 * Warning, very judgemental.
 * @param  i_creature
 * @return Short description of a butt.
 */
export function buttDescriptionShort(i_creature: Creature): string {
  let description = '';
  let options;
  if (i_creature.buttRating <= 1) {
    options = ['insignificant ', 'very small '];
    description = UTIL.randomChoice(options);
  }
  if (i_creature.buttRating > 1 && i_creature.buttRating < 4) {
    options = ['tight ', 'firm ', 'compact '];
    description = UTIL.randomChoice(options);
  }
  if (i_creature.buttRating >= 4 && i_creature.buttRating < 6) {
    options = ['regular ', 'unremarkable '];
    description = UTIL.randomChoice(options);
  }
  if (i_creature.buttRating >= 6 && i_creature.buttRating < 8) {
    if (UTIL.rand(3) == 0) return 'handful of ass';
    options = ['full ', 'shapely '];
    description = UTIL.randomChoice(options);
  }
  if (i_creature.buttRating >= 8 && i_creature.buttRating < 10) {
    options = ['squeezable ', 'large ', 'substantial '];
    description = UTIL.randomChoice(options);
  }
  if (i_creature.buttRating >= 10 && i_creature.buttRating < 13) {
    options = ['jiggling ', 'spacious ', 'heavy '];
    description = UTIL.randomChoice(options);
  }
  if (i_creature.buttRating >= 13 && i_creature.buttRating < 16) {
    if (UTIL.rand(3) == 0) return 'generous amount of ass';
    options = ['expansive ', 'voluminous '];
    description = UTIL.randomChoice(options);
  }
  if (i_creature.buttRating >= 16 && i_creature.buttRating < 20) {
    if (UTIL.rand(3) == 2) return 'jiggling expanse of ass';
    options = ['huge ', 'vast '];
    description = UTIL.randomChoice(options);
  }
  if (i_creature.buttRating >= 20) {
    options = ['ginormous ', 'colossal ', 'tremendous '];
    description = UTIL.randomChoice(options);
  }
  options = ['butt ', 'ass '];
  description += UTIL.randomChoice(options);
  if (UTIL.rand(2) == 0) description += 'cheeks';
  return description;
}

export function assholeDescript(i_creature: Creature, forceDesc = false): string {
  //Main function
  let description = '';

  // The way this was setup didn't work. Trying to inline-define object key-values wasn't looking up the variable *VALUES* it was using the string representation
  // of the variable name as the key.
  // ie, querying ANAL_WETNESS_DESCRIPTORS[0] would actually return "undefined" rather than "".
  // This is just fucking awful but I'm just making things work in the face of bugs I'm running into.

  // 66% Wetness Descript
  const ANAL_WETNESS_DESCRIPTORS: string[] = [];
  ANAL_WETNESS_DESCRIPTORS[ENUM.AnalWetnessType.DRY] = '';
  ANAL_WETNESS_DESCRIPTORS[ENUM.AnalWetnessType.NORMAL] = '';
  ANAL_WETNESS_DESCRIPTORS[ENUM.AnalWetnessType.MOIST] = 'moist ';
  ANAL_WETNESS_DESCRIPTORS[ENUM.AnalWetnessType.SLIMY] = 'slimy ';
  ANAL_WETNESS_DESCRIPTORS[ENUM.AnalWetnessType.DROOLING] = 'drooling ';
  ANAL_WETNESS_DESCRIPTORS[ENUM.AnalWetnessType.SLIME_DROOLING] = 'slime-drooling ';

  if (forceDesc || UTIL.rand(3) <= 1) {
    description += ANAL_WETNESS_DESCRIPTORS[i_creature.ass.analWetness];
  }

  // let ANAL_TIGHTNESS_DESCRIPTORS: { [key: number]: string } = {}
  const ANAL_TIGHTNESS_DESCRIPTORS: string[] = [];
  ANAL_TIGHTNESS_DESCRIPTORS[ENUM.AnalLoosenessType.VIRGIN] = 'virgin ';
  ANAL_TIGHTNESS_DESCRIPTORS[ENUM.AnalLoosenessType.TIGHT] = 'tight ';
  ANAL_TIGHTNESS_DESCRIPTORS[ENUM.AnalLoosenessType.NORMAL] = 'loose ';
  ANAL_TIGHTNESS_DESCRIPTORS[ENUM.AnalLoosenessType.LOOSE] = 'roomy ';
  ANAL_TIGHTNESS_DESCRIPTORS[ENUM.AnalLoosenessType.STRETCHED] = 'stretched ';
  ANAL_TIGHTNESS_DESCRIPTORS[ENUM.AnalLoosenessType.GAPING] = 'gaping ';

  //25% tightness description
  if (forceDesc || UTIL.rand(4) == 0 || (i_creature.ass.analLooseness <= 1 && UTIL.rand(4) <= 2)) {
    description += ANAL_TIGHTNESS_DESCRIPTORS[i_creature.ass.analLooseness];
  }

  //asshole descriptor
  if (liveData.SFWMode) {
    description += UTIL.randomChoice('rear end', 'backdoor');
  } else {
    description += UTIL.randomChoice('ass', 'anus', 'pucker', 'backdoor', 'asshole', 'butthole');
  }
  return description;
}

export function wingsDescript(i_creature: Creature): string {
  const DEFAULT_WING_NAMES: [number, string][] = [
    [ENUM.WingType.NONE, 'non-existant'],
    [ENUM.WingType.BEE_LIKE_SMALL, 'small bee-like'],
    [ENUM.WingType.BEE_LIKE_LARGE, 'large bee-like'],
    [ENUM.WingType.HARPY, 'harpy'],
    [ENUM.WingType.IMP, 'imp'],
    [ENUM.WingType.BAT_LIKE_TINY, 'tiny bat-like'],
    [ENUM.WingType.BAT_LIKE_LARGE, 'large bat-like'],
    [ENUM.WingType.SHARK_FIN, 'shark fin'],
    [ENUM.WingType.FEATHERED_LARGE, 'large feathered'],
    [ENUM.WingType.DRACONIC_SMALL, 'small draconic'],
    [ENUM.WingType.DRACONIC_LARGE, 'large draconic'],
    [ENUM.WingType.GIANT_DRAGONFLY, 'giant dragonfly'],
  ];
  return DEFAULT_WING_NAMES[i_creature.wingType] + ' wings';
}

export const BREAST_CUP_NAMES = [
  'flat', //0
  //				1			2			3			4			5				6			7		8			9
  'A-cup',
  'B-cup',
  'C-cup',
  'D-cup',
  'DD-cup',
  'big DD-cup',
  'E-cup',
  'big E-cup',
  'EE-cup', // 1-9
  'big EE-cup',
  'F-cup',
  'big F-cup',
  'FF-cup',
  'big FF-cup',
  'G-cup',
  'big G-cup',
  'GG-cup',
  'big GG-cup',
  'H-cup', //10-19
  'big H-cup',
  'HH-cup',
  'big HH-cup',
  'HHH-cup',
  'I-cup',
  'big I-cup',
  'II-cup',
  'big II-cup',
  'J-cup',
  'big J-cup', //20-29
  'JJ-cup',
  'big JJ-cup',
  'K-cup',
  'big K-cup',
  'KK-cup',
  'big KK-cup',
  'L-cup',
  'big L-cup',
  'LL-cup',
  'big LL-cup', //30-39
  'M-cup',
  'big M-cup',
  'MM-cup',
  'big MM-cup',
  'MMM-cup',
  'large MMM-cup',
  'N-cup',
  'large N-cup',
  'NN-cup',
  'large NN-cup', //40-49
  'O-cup',
  'large O-cup',
  'OO-cup',
  'large OO-cup',
  'P-cup',
  'large P-cup',
  'PP-cup',
  'large PP-cup',
  'Q-cup',
  'large Q-cup', //50-59
  'QQ-cup',
  'large QQ-cup',
  'R-cup',
  'large R-cup',
  'RR-cup',
  'large RR-cup',
  'S-cup',
  'large S-cup',
  'SS-cup',
  'large SS-cup', //60-69
  'T-cup',
  'large T-cup',
  'TT-cup',
  'large TT-cup',
  'U-cup',
  'large U-cup',
  'UU-cup',
  'large UU-cup',
  'V-cup',
  'large V-cup', //70-79
  'VV-cup',
  'large VV-cup',
  'W-cup',
  'large W-cup',
  'WW-cup',
  'large WW-cup',
  'X-cup',
  'large X-cup',
  'XX-cup',
  'large XX-cup', //80-89
  'Y-cup',
  'large Y-cup',
  'YY-cup',
  'large YY-cup',
  'Z-cup',
  'large Z-cup',
  'ZZ-cup',
  'large ZZ-cup',
  'ZZZ-cup',
  'large ZZZ-cup', //90-99
];

export function breastCup(size: number): string {
  return BREAST_CUP_NAMES[Math.min(Math.floor(size), BREAST_CUP_NAMES.length - 1)];
}

/**
 * Returns breast size from cup name.
 * Acceptable input: "flat","A","B","C","D","DD","DD+",... "ZZZ","ZZZ+" or exact match from BREAST_CUP_NAMES array
 */
export function breastCupInverse(name: string, defaultValue = 0): number {
  //Main function
  if (name.length == 0) return defaultValue;
  if (name == 'flat') return 0;
  const big = name.charAt(name.length - 1) == '+';
  if (big) name = name.substr(0, name.length - 1);
  for (let i = 0; i < BREAST_CUP_NAMES.length; i++) {
    if (name == BREAST_CUP_NAMES[i]) return i;
    if (BREAST_CUP_NAMES[i].indexOf(name) == 0) return i + (big ? 1 : 0);
  }
  return defaultValue;
}

// export const DEFAULT_GENDER_NAMES: [number, string][] = [
//   [ENUM.GenderType.NONE, 'genderless'],
//   [ENUM.GenderType.Male, 'male'],
//   [ENUM.GenderType.Female, 'female'],
//   [ENUM.GenderType.Herm, 'hermaphrodite'],
// ];
// export const DEFAULT_SKIN_NAMES: [number, string][] = [
//   [ENUM.SkinType.Plain, 'skin'],
//   [ENUM.SkinType.Fur, 'fur'],
//   [ENUM.SkinType.Scales, 'scales'],
//   [ENUM.SkinType.Goo, 'goo'],
//   [ENUM.SkinType.Undefined, 'undefined flesh'],
// ];
// export const DEFAULT_SKIN_DESCS: [number, string][] = [
//   [ENUM.SkinType.Plain, 'skin'],
//   [ENUM.SkinType.Fur, 'fur'],
//   [ENUM.SkinType.Scales, 'scales'],
//   [ENUM.SkinType.Goo, 'skin'],
//   [ENUM.SkinType.Undefined, 'skin'],
// ];
// export const DEFAULT_HAIR_NAMES: [number, string][] = [
//   [ENUM.HairType.Normal, 'normal'],
//   [ENUM.HairType.Feather, 'feather'],
//   [ENUM.HairType.Ghost, 'transparent'],
//   [ENUM.HairType.Goo, 'goopy'],
//   [ENUM.HairType.Anemone, 'tentacle'],
//   [ENUM.HairType.Quill, 'quill'],
// ];
// export const DEFAULT_BEARD_NAMES: [number, string][] = [
//   [ENUM.BeardType.Normal, 'normal'],
//   [ENUM.BeardType.Goatee, 'goatee'],
// ];
// export const DEFAULT_FACE_NAMES: [number, string][] = [
//   [ENUM.FaceType.Human, 'human'],
//   [ENUM.FaceType.Horse, 'horse'],
//   [ENUM.FaceType.Dog, 'dog'],
//   [ENUM.FaceType.Minotaur, 'cow'],
//   [ENUM.FaceType.SharkTeeth, 'shark'],
//   [ENUM.FaceType.SnakeFangs, 'snake'],
//   [ENUM.FaceType.Cat, 'cat'],
//   [ENUM.FaceType.Lizard, 'lizard'],
//   [ENUM.FaceType.Bunny, 'bunny'],
//   [ENUM.FaceType.Kangaroo, 'kangaroo'],
//   [ENUM.FaceType.SpiderFangs, 'spider'],
//   [ENUM.FaceType.Fox, 'fox'],
//   [ENUM.FaceType.Dragon, 'dragon'],
//   [ENUM.FaceType.RaccoonMask, 'raccoon mask'],
//   [ENUM.FaceType.Raccoon, 'racoon'],
//   [ENUM.FaceType.Buckteeth, 'buckteeth'],
//   [ENUM.FaceType.Mouse, 'mouse'],
//   [ENUM.FaceType.FerretMask, 'ferret mask'],
//   [ENUM.FaceType.Ferret, 'ferret'],
//   [ENUM.FaceType.Pig, 'pig'],
//   [ENUM.FaceType.Boar, 'boar'],
//   [ENUM.FaceType.Rhino, 'rhino'],
//   [ENUM.FaceType.Echidna, 'echidna'],
//   [ENUM.FaceType.Deer, 'deer'],
// ];
// export const DEFAULT_TONGUE_NAMES: [number, string][] = [
//   [ENUM.TongueType.Human, 'human'],
//   [ENUM.TongueType.Snake, 'snake'],
//   [ENUM.TongueType.Demonic, 'demonic'],
//   [ENUM.TongueType.Draconic, 'draconic'],
//   [ENUM.TongueType.Echidna, 'echidna'],
// ];
// export const DEFAULT_EYES_NAMES: [number, string][] = [
//   [ENUM.EyeType.Human, 'human'],
//   [ENUM.EyeType.FourSpiderEyes, '4 spider'],
//   [ENUM.EyeType.BlackEyesSandTrap, 'sandtrap black'],
// ];
// export const DEFAULT_EARS_NAMES: [number, string][] = [
//   [ENUM.EarType.Human, 'human'],
//   [ENUM.EarType.Horse, 'horse'],
//   [ENUM.EarType.Dog, 'dog'],
//   [ENUM.EarType.Cow, 'cow'],
//   [ENUM.EarType.Elfin, 'elfin'],
//   [ENUM.EarType.Cat, 'cat'],
//   [ENUM.EarType.Lizard, 'lizard'],
//   [ENUM.EarType.Bunny, 'bunny'],
//   [ENUM.EarType.Kangaroo, 'kangaroo'],
//   [ENUM.EarType.Fox, 'fox'],
//   [ENUM.EarType.Dragon, 'dragon'],
//   [ENUM.EarType.Raccoon, 'raccoon'],
//   [ENUM.EarType.Mouse, 'mouse'],
//   [ENUM.EarType.Ferret, 'ferret'],
//   [ENUM.EarType.Pig, 'pig'],
//   [ENUM.EarType.Rhino, 'rhino'],
//   [ENUM.EarType.Echidna, 'echidna'],
//   [ENUM.EarType.Deer, 'deer'],
// ];
// export const DEFAULT_HORNS_NAMES: [number, string][] = [
//   [ENUM.HornType.NONE, 'non-existant'],
//   [ENUM.HornType.DEMON, 'demon'],
//   [ENUM.HornType.COW_MINOTAUR, 'cow'],
//   [ENUM.HornType.DRACONIC_X2, '2 draconic'],
//   [ENUM.HornType.DRACONIC_X4_12_INCH_LONG, 'four 12" long draconic'],
//   [ENUM.HornType.ANTLERS, 'deer'],
//   [ENUM.HornType.GOAT, 'goat'],
//   [ENUM.HornType.RHINO, 'rhino'],
// ];
// export const DEFAULT_ANTENNAE_NAMES: [number, string][] = [
//   [ENUM.AntennaeType.NONE, 'non-existant'],
//   [ENUM.AntennaeType.BEE, 'bee'],
// ];
// export const DEFAULT_ARM_NAMES: [number, string][] = [
//   [ENUM.ArmType.HUMAN, 'human'],
//   [ENUM.ArmType.HARPY, 'harpy'],
//   [ENUM.ArmType.SPIDER, 'spider'],
// ];
// export const DEFAULT_WING_DESCS: [number, string][] = [
//   [ENUM.WingType.NONE, 'non-existant'],
//   [ENUM.WingType.BEE_LIKE_SMALL, 'small bee-like'],
//   [ENUM.WingType.BEE_LIKE_LARGE, 'large bee-like'],
//   [ENUM.WingType.HARPY, 'large feathery'],
//   [ENUM.WingType.IMP, 'small'],
//   [ENUM.WingType.BAT_LIKE_TINY, 'tiny, bat-like'],
//   [ENUM.WingType.BAT_LIKE_LARGE, 'large, bat-like'],
//   [ENUM.WingType.SHARK_FIN, ''],
//   [ENUM.WingType.FEATHERED_LARGE, 'large, feathered'],
//   [ENUM.WingType.DRACONIC_SMALL, 'small, draconic'],
//   [ENUM.WingType.DRACONIC_LARGE, 'large, draconic'],
//   [ENUM.WingType.GIANT_DRAGONFLY, 'giant dragonfly'],
// ];
// export const DEFAULT_LOWER_BODY_NAMES: [number, string][] = [
//   [ENUM.LowerBodyType.HUMAN, 'human'],
//   [ENUM.LowerBodyType.HOOFED, 'hoofed'],
//   [ENUM.LowerBodyType.DOG, 'dog'],
//   [ENUM.LowerBodyType.NAGA, 'naga'],
//   [ENUM.LowerBodyType.CENTAUR, 'centaur'],
//   [ENUM.LowerBodyType.DEMONIC_HIGH_HEELS, 'demonic high-heels'],
//   [ENUM.LowerBodyType.DEMONIC_CLAWS, 'demonic claws'],
//   [ENUM.LowerBodyType.BEE, 'bee'],
//   [ENUM.LowerBodyType.GOO, 'goo'],
//   [ENUM.LowerBodyType.CAT, 'cat'],
//   [ENUM.LowerBodyType.LIZARD, 'lizard'],
//   [ENUM.LowerBodyType.PONY, 'pony'],
//   [ENUM.LowerBodyType.BUNNY, 'bunny'],
//   [ENUM.LowerBodyType.HARPY, 'harpy'],
//   [ENUM.LowerBodyType.KANGAROO, 'kangaroo'],
//   [ENUM.LowerBodyType.CHITINOUS_SPIDER_LEGS, 'chitinous spider legs'],
//   [ENUM.LowerBodyType.DRIDER_LOWER_BODY, 'drider'],
//   [ENUM.LowerBodyType.FOX, 'fox'],
//   [ENUM.LowerBodyType.DRAGON, 'dragon'],
//   [ENUM.LowerBodyType.RACCOON, 'raccoon'],
//   [ENUM.LowerBodyType.FERRET, 'ferret'],
//   [ENUM.LowerBodyType.CLOVEN_HOOFED, 'cloven-hoofed'],
//   [ENUM.LowerBodyType.ECHIDNA, 'echidna'],
//   [ENUM.LowerBodyType.ECHIDNA, 'deertaur'],
// ];
// export const DEFAULT_PIERCING_NAMES: [number, string][] = [
//   [ENUM.PiercingType.NONE, 'none'],
//   [ENUM.PiercingType.STUD, 'stud'],
//   [ENUM.PiercingType.RING, 'ring'],
//   [ENUM.PiercingType.LADDER, 'ladder'],
//   [ENUM.PiercingType.HOOP, 'hoop'],
//   [ENUM.PiercingType.CHAIN, 'chain'],
// ];
/*export const DEFAULT_VAGINA_TYPE_NAMES: [number, string][] = [
        [
            [VAGINA_TYPE_HUMAN, "human"],
            [VAGINA_TYPE_EQUINE, "equine"],
            [VAGINA_TYPE_BLACK_SAND_TRAP, "black sandtrap"]
        ]*/
// export const DEFAULT_VAGINA_WETNESS_SCALES: [number, string][] = [
//   [ENUM.VaginalWetnessType.DRY, 'dry'],
//   [ENUM.VaginalWetnessType.NORMAL, 'normal'],
//   [ENUM.VaginalWetnessType.WET, 'wet'],
//   [ENUM.VaginalWetnessType.SLICK, 'slick'],
//   [ENUM.VaginalWetnessType.DROOLING, 'drooling'],
//   [ENUM.VaginalWetnessType.SLAVERING, 'slavering'],
// ];
// export const DEFAULT_VAGINA_LOOSENESS_SCALES: [number, string][] = [
//   [ENUM.VaginalLoosenessType.TIGHT, 'tight'],
//   [ENUM.VaginalLoosenessType.NORMAL, 'normal'],
//   [ENUM.VaginalLoosenessType.LOOSE, 'loose'],
//   [ENUM.VaginalLoosenessType.GAPING, 'gaping'],
//   [ENUM.VaginalLoosenessType.GAPING_WIDE, 'gaping wide'],
//   [ENUM.VaginalLoosenessType.CLOWN_CAR, 'clown-car level'],
// ];
// export const DEFAULT_ANAL_WETNESS_SCALES: [number, string][] = [
//   [ENUM.AnalWetnessType.DRY, 'dry'],
//   [ENUM.AnalWetnessType.NORMAL, 'normal'],
//   [ENUM.AnalWetnessType.MOIST, 'moist'],
//   [ENUM.AnalWetnessType.SLIMY, 'slimym'],
//   [ENUM.AnalWetnessType.DROOLING, 'drooling'],
//   [ENUM.AnalWetnessType.SLIME_DROOLING, 'slime-drooling'],
// ];
// export const DEFAULT_ANAL_LOOSENESS_SCALES: [number, string][] = [
//   [ENUM.AnalLoosenessType.VIRGIN, 'virgin'],
//   [ENUM.AnalLoosenessType.TIGHT, 'tight'],
//   [ENUM.AnalLoosenessType.NORMAL, 'normal'],
//   [ENUM.AnalLoosenessType.LOOSE, 'loose'],
//   [ENUM.AnalLoosenessType.STRETCHED, 'stretched'],
//   [ENUM.AnalLoosenessType.GAPING, 'gaping'],
// ];
// export const DEFAULT_HIP_RATING_SCALES: [number, string][] = [
//   [ENUM.HipRatingType.BOYISH, 'boyish'],
//   [ENUM.HipRatingType.SLENDER, 'slender'],
//   [ENUM.HipRatingType.AVERAGE, 'average'],
//   [ENUM.HipRatingType.AMPLE, 'ample'],
//   [ENUM.HipRatingType.CURVY, 'curvy'],
//   [ENUM.HipRatingType.FERTILE, 'fertile'],
//   [ENUM.HipRatingType.INHUMANLY_WIDE, 'inhumanly wide'],
// ];
// export const DEFAULT_BUTT_RATING_SCALES: [number, string][] = [
//   [ENUM.ButtRatingType.BUTTLESS, 'buttless'],
//   [ENUM.ButtRatingType.TIGHT, 'tight'],
//   [ENUM.ButtRatingType.AVERAGE, 'average'],
//   [ENUM.ButtRatingType.NOTICEABLE, 'noticeable'],
//   [ENUM.ButtRatingType.LARGE, 'large'],
//   [ENUM.ButtRatingType.JIGGLY, 'jiggly'],
//   [ENUM.ButtRatingType.EXPANSIVE, 'expansive'],
//   [ENUM.ButtRatingType.HUGE, 'huge'],
//   [ENUM.ButtRatingType.INCONCEIVABLE, 'inconceivably big'],
// ];

/**
 * Assume scale = [[0,"small"],[5,"average"],[10,"big"]]
 *      value < 0   ->   "less than small"
 *      value = 0   ->   "small"
 *  0 < value < 5   ->   "between small and average"
 *      value = 5   ->   "average"
 *  5 < value < 10  ->   "between average and big"
 *      value = 10  ->   "big"
 *      value > 10  ->   "more than big"
 */
export function describeByScale(value: number, scale: [number, string][], lessThan = 'less than', moreThan = 'more than'): string {
  //Main function
  if (scale.length == 0) return 'undescribeale';
  if (scale.length == 1) return 'about ' + scale[0][1];
  if (value < scale[0][0]) return lessThan + ' ' + scale[0][1];
  if (value == scale[0][0]) return scale[0][1];
  for (let i = 1; i < scale.length; i++) {
    if (value < scale[i][0]) return 'between ' + scale[i - 1][1] + ' and ' + scale[i][1];
    if (value == scale[i][0]) return scale[i][1];
  }
  return moreThan + ' ' + scale[scale.length - 1][1];
}

/**
 * numberOfThings(0,"brain") = "no brains"
 * numberOfThings(1,"head") = "one head"
 * numberOfThings(2,"tail") = "2 tails"
 * numberOfThings(3,"hoof","hooves") = "3 hooves"
 */
export function numberOfThings(n: number, name: string, pluralForm = ''): string {
  //Main function
  pluralForm = pluralForm || name + 's';
  if (n == 0) return 'no ' + pluralForm;
  if (n == 1) return 'one ' + name;
  return n + ' ' + pluralForm;
}

/**
 * 13 -> 2'1"
 * 5.5 -> 5.5"
 * Positive only!
 */
export function feetsAndInches(n: number): string {
  const feet = Math.floor(n / 12);
  const inches = n - feet * 12;
  if (feet > 0) return feet + "'" + inches + '"';
  else return inches + '"';
}

/**
 * 13 -> 13" (2'1")
 */
export function inchesAndFeetsAndInches(n: number): string {
  if (n < 12) return n + '"';
  return n + '" (' + feetsAndInches(n) + ')';
}

export function allBreastsDescript(creature: Creature): string {
  let storage = '';
  if (creature.breastRows.length == 0) return 'unremarkable chest muscles ';
  if (creature.breastRows.length == 2) {
    //if (creature.totalBreasts() == 4) storage += "quartet of ";
    storage += 'two rows of ';
  }
  if (creature.breastRows.length == 3) {
    if (UTIL.rand(2) == 0) storage += 'three rows of ';
    else storage += 'multi-layered ';
  }
  if (creature.breastRows.length == 4) {
    if (UTIL.rand(2) == 0) storage += 'four rows of ';
    else storage += 'four-tiered ';
  }
  if (creature.breastRows.length == 5) {
    if (UTIL.rand(2) == 0) storage += 'five rows of ';
    else storage += 'five-tiered ';
  }
  storage += creature.chestDesc();
  return storage;
}

export function tailDescript(i_creature: Creature): string {
  const DEFAULT_TAIL_NAMES: [number, string][] = [
    [ENUM.TailType.NONE, 'non-existant'],
    [ENUM.TailType.HORSE, 'horse'],
    [ENUM.TailType.DOG, 'dog'],
    [ENUM.TailType.DEMONIC, 'demonic'],
    [ENUM.TailType.COW, 'cow'],
    [ENUM.TailType.SPIDER_ADBOMEN, 'spider abdomen'],
    [ENUM.TailType.BEE_ABDOMEN, 'bee abdomen'],
    [ENUM.TailType.SHARK, 'shark'],
    [ENUM.TailType.CAT, 'cat'],
    [ENUM.TailType.LIZARD, 'lizard'],
    [ENUM.TailType.RABBIT, 'rabbit'],
    [ENUM.TailType.HARPY, 'harpy'],
    [ENUM.TailType.KANGAROO, 'kangaroo'],
    [ENUM.TailType.FOX, 'fox'],
    [ENUM.TailType.DRACONIC, 'draconic'],
    [ENUM.TailType.RACCOON, 'raccoon'],
    [ENUM.TailType.MOUSE, 'mouse'],
    [ENUM.TailType.BEHEMOTH, 'behemoth'],
    [ENUM.TailType.PIG, 'pig'],
    [ENUM.TailType.SCORPION, 'scorpion'],
    [ENUM.TailType.GOAT, 'goat'],
    [ENUM.TailType.RHINO, 'rhino'],
    [ENUM.TailType.ECHIDNA, 'echidna'],
    [ENUM.TailType.DEER, 'deer'],
  ];

  if (i_creature.tailType == ENUM.TailType.NONE) {
    console.warn('WARNING: Creature has no tails to describe.');
    return '<b>!Creature has no tails to describe!</b>';
  }

  let descript = '';

  if (i_creature.tailType == ENUM.TailType.FOX && i_creature.tailVenom >= 1) {
    // Kitsune tails, we're using tailVenom to track tail count
    if (i_creature.tailVenom > 1) {
      if (i_creature.tailVenom == 2) descript += 'pair ';
      else if (i_creature.tailVenom == 3) descript += 'trio ';
      else if (i_creature.tailVenom == 4) descript += 'quartet ';
      else if (i_creature.tailVenom == 5) descript += 'quintet ';
      else if (i_creature.tailVenom > 5) descript += 'bundle ';

      descript += 'of kitsune tails';
    } else descript += 'kitsune tail';
  } else {
    descript += DEFAULT_TAIL_NAMES[i_creature.tailType];
    descript += ' tail';
  }

  return descript;
}

export function oneTailDescript(i_creature: Creature): string {
  const DEFAULT_TAIL_NAMES: [number, string][] = [
    [ENUM.TailType.NONE, 'non-existant'],
    [ENUM.TailType.HORSE, 'horse'],
    [ENUM.TailType.DOG, 'dog'],
    [ENUM.TailType.DEMONIC, 'demonic'],
    [ENUM.TailType.COW, 'cow'],
    [ENUM.TailType.SPIDER_ADBOMEN, 'spider abdomen'],
    [ENUM.TailType.BEE_ABDOMEN, 'bee abdomen'],
    [ENUM.TailType.SHARK, 'shark'],
    [ENUM.TailType.CAT, 'cat'],
    [ENUM.TailType.LIZARD, 'lizard'],
    [ENUM.TailType.RABBIT, 'rabbit'],
    [ENUM.TailType.HARPY, 'harpy'],
    [ENUM.TailType.KANGAROO, 'kangaroo'],
    [ENUM.TailType.FOX, 'fox'],
    [ENUM.TailType.DRACONIC, 'draconic'],
    [ENUM.TailType.RACCOON, 'raccoon'],
    [ENUM.TailType.MOUSE, 'mouse'],
    [ENUM.TailType.BEHEMOTH, 'behemoth'],
    [ENUM.TailType.PIG, 'pig'],
    [ENUM.TailType.SCORPION, 'scorpion'],
    [ENUM.TailType.GOAT, 'goat'],
    [ENUM.TailType.RHINO, 'rhino'],
    [ENUM.TailType.ECHIDNA, 'echidna'],
    [ENUM.TailType.DEER, 'deer'],
  ];

  if (i_creature.tailType == ENUM.TailType.NONE) {
    console.warn('WARNING: Creature has no tails to describe.');
    return '<b>!Creature has no tails to describe!</b>';
  }

  let descript = '';

  if (i_creature.tailType == ENUM.TailType.FOX && i_creature.tailVenom >= 1) {
    if (i_creature.tailVenom == 1) {
      descript += 'your kitsune tail';
    } else {
      descript += 'one of your kitsune tails';
    }
  } else {
    descript += 'your ' + DEFAULT_TAIL_NAMES[i_creature.tailType] + ' tail';
  }

  return descript;
}

export function biggestBreastSizeDescript(creature: Creature): string {
  let temp14 = Math.random() * 3;
  let descript = '';
  const temp142 = creature.biggestTitRow();
  //ERROR PREVENTION
  if (creature.breastRows.length - 1 < temp142) {
    return '<b>ERROR, biggestBreastSizeDescript() working with invalid breastRow</b>';
  } else if (temp142 < 0) {
    return 'ERROR SHIT SON!  BIGGESTBREASTSIZEDESCRIPT PASSED NEGATIVE!';
  }
  if (creature.breastRows[temp142].breastRating < 1) return 'flat breasts';
  //50% of the time size-descript them
  if (UTIL.rand(2) == 0) descript += breastSize(creature.breastRows[temp142].breastRating);
  //Nouns!
  temp14 = UTIL.rand(10);
  if (temp14 == 0) descript += 'breasts';
  if (temp14 == 1) {
    if (creature.breastRows[temp142].lactationMultiplier > 2) descript += 'milk-udders';
    else descript += 'breasts';
  }
  if (temp14 == 2) {
    if (creature.breastRows[temp142].lactationMultiplier > 1.5) descript += 'milky ';
    if (creature.breastRows[temp142].breastRating > 4) descript += 'tits';
    else descript += 'breasts';
  }
  if (temp14 == 3) {
    //if (creature.breastRows[temp142].breastRating > 6) descript += "rack";
    descript += 'breasts';
  }
  if (temp14 == 4) descript += 'tits';
  if (temp14 == 5) descript += 'tits';
  if (temp14 == 6) descript += 'tits';
  if (temp14 == 7) {
    if (creature.breastRows[temp142].lactationMultiplier >= 1 && creature.breastRows[temp142].lactationMultiplier < 2.5) descript += 'milk jugs';
    if (creature.breastRows[temp142].lactationMultiplier >= 2.5) descript += 'udders';
    if (creature.breastRows[temp142].lactationMultiplier < 1) descript += 'jugs';
  }
  if (temp14 == 8) {
    if (creature.breastRows[temp142].breastRating > 6) descript += 'love-pillows';
    else descript += 'boobs';
  }
  if (temp14 == 9) {
    if (creature.breastRows[temp142].breastRating > 6) descript += 'tits';
    else descript += 'breasts';
  }
  return descript;
}

export function breastSize(val: number): string {
  let descript = '';
  //Catch all for dudes.
  if (val < 1) return 'manly ';
  //Small - A->B
  if (val <= 2) {
    descript += UTIL.randomChoice('palmable ', 'tight ', 'perky ', 'baseball-sized ');
  }
  //C-D
  else if (val <= 4) {
    descript += UTIL.randomChoice('nice ', 'hand-filling ', 'well-rounded ', 'supple ', 'softball-sized ');
  }
  //DD->big EE
  else if (val < 11) {
    descript += UTIL.randomChoice('big ', 'large ', 'pillowy ', 'jiggly ', 'volleyball-sized ');
  }
  //F->big FF
  else if (val < 15) {
    descript += UTIL.randomChoice('soccerball-sized ', 'hand-overflowing ', 'generous ', 'jiggling ');
  }
  //G -> HHH
  else if (val < 24) {
    descript += UTIL.randomChoice('basketball-sized ', 'whorish ', 'cushiony ', 'wobbling ');
  }
  //I -> KK
  else if (val < 35) {
    descript += UTIL.randomChoice('massive motherly ', 'luscious ', 'smothering ', 'prodigious ');
  }
  //K- > MMM+
  else {
    descript += UTIL.randomChoice('mountainous ', 'monumental ', 'back-breaking ', 'exercise-ball-sized ', 'immense ');
  }
  return descript;
}

export function multiCockDescriptLight(creature: Creature): string {
  if (creature.cocks.length < 1) {
    return '<B>Error: multiCockDescriptLight() called with no penises present.</B>';
  }
  //Get cock counts
  let descript = '';
  let currCock = 0;
  const totCock = creature.cocks.length;
  let dogCocks = 0;
  let horseCocks = 0;
  let normalCocks = 0;
  let normalCockKey = 0;
  let dogCockKey = 0;
  let horseCockKey = 0;
  let averageLength = 0;
  let averageThickness = 0;
  let same = true;
  //For temp14 random values
  const rando = 0;
  let descripted = false;
  //If one, return normal cock descript
  if (totCock == 1) return creature.cockDescript(0);
  //Count cocks & Prep average totals
  while (currCock <= totCock - 1) {
    if (creature.cocks[currCock].cockType == ENUM.CockType.HUMAN) {
      normalCocks++;
      normalCockKey = currCock;
    }
    if (creature.cocks[currCock].cockType == ENUM.CockType.HORSE) {
      horseCocks++;
      horseCockKey = currCock;
    }
    if (creature.cocks[currCock].cockType == ENUM.CockType.DOG) {
      dogCocks++;
      dogCockKey = currCock;
    }
    averageLength += creature.cocks[currCock].cockLength;
    averageThickness += creature.cocks[currCock].cockThickness;
    //If cocks are matched make sure they still are
    if (same && currCock > 0 && creature.cocks[currCock].cockType != creature.cocks[currCock - 1].cockType) same = false;
    currCock++;
  }
  //Crunch averages
  averageLength /= currCock;
  averageThickness /= currCock;
  //Quantity descriptors
  if (creature.cockTotal() == 1) {
    if (dogCocks == 1) return cockNoun(ENUM.CockType.DOG);
    if (horseCocks == 1) return cockNoun(ENUM.CockType.HORSE);
    if (normalCocks == 1) return creature.cockDescript(0);
    //Failsafe
    return creature.cockDescript(0);
  }
  if (currCock == 2) {
    //For cocks that are the same
    if (same) {
      descript += UTIL.randomChoice('pair of ', 'two ', 'brace of ', 'matching ', 'twin ');
      descript += cockAdjective(creature.cocks[0].cockType, creature.cocks[0].cockLength, creature.cocks[0].cockThickness);
      if (normalCocks == 2) descript += ' ' + cockNoun(ENUM.CockType.HUMAN) + 's';
      if (horseCocks == 2) descript += ', ' + cockNoun(ENUM.CockType.HORSE) + 's';
      if (dogCocks == 2) descript += ', ' + cockNoun(ENUM.CockType.DOG) + 's';
      //Failsafe
      if (creature.cocks[0].cockType > 2) descript += ', ' + cockNoun(creature.cocks[0].cockType) + 's';
    }
    //Nonidentical
    else {
      descript += UTIL.randomChoice('pair of ', 'two ', 'brace of ');
      descript += cockAdjective(creature.cocks[0].cockType, creature.cocks[0].cockLength, creature.cocks[0].cockThickness) + ', ';
      descript += UTIL.randomChoice('mutated cocks', 'mutated dicks', 'mixed cocks', 'mismatched dicks');
    }
  }
  if (currCock == 3) {
    //For samecocks
    if (same) {
      descript += UTIL.randomChoice('three ', 'group of ', '<i>ménage à trois</i> of ', 'triad of ', 'triumvirate of ');
      descript += cockAdjective(creature.cocks[0].cockType, creature.cocks[0].cockLength, creature.cocks[0].cockThickness);
      if (normalCocks == 3) descript += ' ' + cockNoun(ENUM.CockType.HUMAN) + 's';
      if (horseCocks == 3) descript += ', ' + cockNoun(ENUM.CockType.HORSE) + 's';
      if (dogCocks == 3) descript += ', ' + cockNoun(ENUM.CockType.DOG) + 's';
      //Tentacles
      if (creature.cocks[0].cockType > 2) descript += ', ' + cockNoun(creature.cocks[0].cockType) + 's';
    } else {
      descript += UTIL.randomChoice('three ', 'group of ');
      descript += cockAdjective(creature.cocks[0].cockType, creature.cocks[0].cockLength, creature.cocks[0].cockThickness) + ', ';
      descript += UTIL.randomChoice('mutated cocks', 'mutated dicks', 'mixed cocks', 'mismatched dicks');
    }
  }
  //Large numbers of cocks!
  if (currCock > 3) {
    descript += UTIL.randomChoice('bundle of ', 'obscene group of ', 'cluster of ', 'wriggling bunch of ');
    //Cock adjectives and nouns
    descripted = false;
    //Same
    if (same) {
      if (currCock == normalCocks) {
        descript += cockAdjective(creature.cocks[0].cockType, creature.cocks[0].cockLength, creature.cocks[0].cockThickness) + ' ';
        descript += cockNoun(ENUM.CockType.HUMAN) + 's';
        descripted = true;
      }
      if (currCock == dogCocks) {
        descript += cockAdjective(creature.cocks[0].cockType, creature.cocks[0].cockLength, creature.cocks[0].cockThickness) + ', ';
        descript += cockNoun(ENUM.CockType.DOG) + 's';
        descripted = true;
      }
      if (currCock == horseCocks) {
        descript += cockAdjective(creature.cocks[0].cockType, creature.cocks[0].cockLength, creature.cocks[0].cockThickness) + ', ';
        descript += cockNoun(ENUM.CockType.HORSE) + 's';
        descripted = true;
      }
      if (creature.cocks[0].cockType > 2) {
        descript += cockAdjective(creature.cocks[0].cockType, creature.cocks[0].cockLength, creature.cocks[0].cockThickness) + ', ';
        descript += cockNoun(creature.cocks[0].cockType) + 's';
        descripted = true;
      }
    }
    //If mixed
    if (!descripted) {
      descript += cockAdjective(creature.cocks[0].cockType, creature.cocks[0].cockLength, creature.cocks[0].cockThickness) + ', ';
      descript += UTIL.randomChoice('mutated cocks', 'mutated dicks', 'mixed cocks', 'mismatched dicks');
    }
  }
  return descript;
}

// export { Appearance }
