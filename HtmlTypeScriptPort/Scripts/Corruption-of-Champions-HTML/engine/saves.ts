import { liveData, GameContext, GUI, UTIL, Player, ItemSlot, StatusEffect, MAIN, Perk, KeyItem, Camp } from 'coc';

// This code handles saving and loading of games. (Save State)
export const totalSlots = 14;

//Save Menu
export function saveScreen(): void {
  GUI.clearOutput();
  GUI.outputText('Please make sure to use a modern browser capable of local storage to be able to save.<br><br>');
  GUI.menu();
  for (let i = 0; i < totalSlots; i++) {
    GUI.outputText('Slot ' + (i + 1) + ': ' + loadSaveDisplay('CoC_' + (i + 1)) + '<br>');
    GUI.addButton(i, 'Slot ' + (i + 1), saveGame, 'CoC_' + (i + 1));
  }
  GUI.addButton(14, 'Back', dataScreen);
}

//Load Menu
export function loadScreen(): void {
  GUI.clearOutput();
  GUI.menu();
  for (let i = 0; i < totalSlots; i++) {
    const saveSlot = 'CoC_' + (i + 1);
    GUI.outputText('Slot ' + (i + 1) + ': ' + loadSaveDisplay(saveSlot) + '<br>');
    // if (localStorage[saveSlot] != undefined) {
    if (liveData.storage.get(saveSlot)) {
      GUI.addButton(i, 'Slot ' + (i + 1), loadGame, saveSlot);
    }
  }
  GUI.addButton(14, 'Back', dataScreen);
}

//Delete Save Menu
export function deleteScreen(): void {
  GUI.clearOutput();
  GUI.outputText("Once you delete a save file, it's gone forever. So please be sure if you REALLY want to do it.<br><br>");
  GUI.menu();
  for (let i = 0; i < totalSlots; i++) {
    const saveSlot = 'CoC_' + (i + 1);
    GUI.outputText('Slot ' + (i + 1) + ': ' + loadSaveDisplay(saveSlot) + '<br>');
    // if (localStorage[saveSlot] != undefined) {
    if (liveData.storage.get(saveSlot)) {
      GUI.addButton(i, 'Slot ' + (i + 1), deletePrompt, saveSlot);
    }
  }
  GUI.addButton(14, 'Back', dataScreen);
}

//Starts save process and shows whether it succeeded or not.
export function saveGame(slot: string): void {
  GUI.clearOutput();
  if (saveGameObject(slot)) {
    GUI.outputText('Successfully saved!');
  } else {
    GUI.outputText('Failed to save!');
  }
  GUI.doNext(liveData.playerMenu);
}

// Starts the actual save process
export function saveGameObject(slot: string): boolean {
  //Let's try to save! Beginning with initial variables.
  let success = false;
  const saveData = new GameContext();
  try {
    //Player Data
    // saveData.player = {}
    // for (let i in liveData.player) {
    //     if (liveData.player[i] != undefined && (typeof liveData.player[i] == "string" || typeof liveData.player[i] == "number" || typeof liveData.player[i] == "boolean")) {
    //         saveData.player[i] = liveData.player[i]
    //     }
    // }
    saveData.player = liveData.player;

    //Cocks
    saveData.player.cocks = [];
    if (liveData.player.cocks.length > 0) {
      for (let i = 0; i < liveData.player.cocks.length; i++) {
        saveData.player.cocks[i] = liveData.player.cocks[i];
      }
    }
    //Vaginas
    saveData.player.vaginas = [];
    if (liveData.player.vaginas.length > 0) {
      for (let i = 0; i < liveData.player.vaginas.length; i++) {
        saveData.player.vaginas[i] = liveData.player.vaginas[i];
      }
    }
    //Ass
    saveData.player.ass = liveData.player.ass;
    //Breasts
    saveData.player.breastRows = [];
    for (let i = 0; i < liveData.player.breastRows.length; i++) {
      saveData.player.breastRows[i] = liveData.player.breastRows[i];
      /*player.breastRows[i] = unfuckBreastRow(player.breastRows[i]);
            saveData.player.breastRows[i].breasts = liveData.player.breastRows[i].breasts;
            saveData.player.breastRows[i].breastSize = liveData.player.breastRows[i].breastSize;
            saveData.player.breastRows[i].lactationMultiplier = liveData.player.breastRows[i].lactationMultiplier;
            saveData.player.breastRows[i].milkFullness = liveData.player.breastRows[i].milkFullness;
            saveData.player.breastRows[i].fuckable = liveData.player.breastRows[i].fuckable;
            saveData.player.breastRows[i].nipplesPerBreast = liveData.player.breastRows[i].nipplesPerBreast;
            saveData.player.breastRows[i].nippleLength = liveData.player.breastRows[i].nippleLength;*/
    }

    // Equipped weapons and armor
    saveData.player.weapon = liveData.player.weapon;
    saveData.player.armor = liveData.player.armor;

    //Inventory
    saveData.player.itemSlots = [];
    for (let i = 0; i < liveData.player.itemSlots.length; i++) {
      saveData.player.itemSlots.push(new ItemSlot());
      if (liveData.player.itemSlots[i].itype != undefined) saveData.player.itemSlots[i].itype.id = liveData.player.itemSlots[i].itype.id;
      else saveData.player.itemSlots[i].itype.id = 'Nothing';
      saveData.player.itemSlots[i].quantity = liveData.player.itemSlots[i].quantity;
    }

    //Perks
    saveData.player.perks = [];
    if (liveData.player.perks.length > 0) {
      // for (let i = 0; i < liveData.player.perks.length; i++) {
      //     saveData.player.perks.push(new Perk())
      //     saveData.player.perks[i].ptype.id = liveData.player.perks[i].ptype.id
      //     saveData.player.perks[i].value1 = liveData.player.perks[i].value1
      //     saveData.player.perks[i].value2 = liveData.player.perks[i].value2
      //     saveData.player.perks[i].value3 = liveData.player.perks[i].value3
      //     saveData.player.perks[i].value4 = liveData.player.perks[i].value4
      // }
      for (const perk of liveData.player.perks) {
        saveData.player.perks.push(new Perk(perk.ptype, perk.value1, perk.value2, perk.value3, perk.value4));
      }
    }

    //Status Effects
    saveData.player.statusEffects = [];
    if (liveData.player.statusEffects.length > 0) {
      // for (let i = 0; i < liveData.player.statusEffects.length; i++) {
      //     saveData.player.statusEffects.push(new StatusEffect())
      //     saveData.player.statusEffects[i].stype.id = liveData.player.statusEffects[i].stype.id
      //     saveData.player.statusEffects[i].value1 = liveData.player.statusEffects[i].value1
      //     saveData.player.statusEffects[i].value2 = liveData.player.statusEffects[i].value2
      //     saveData.player.statusEffects[i].value3 = liveData.player.statusEffects[i].value3
      //     saveData.player.statusEffects[i].value4 = liveData.player.statusEffects[i].value4
      // }
      for (const statusEffect of liveData.player.statusEffects) {
        saveData.player.statusEffects.push(
          new StatusEffect(statusEffect.stype, statusEffect.value1, statusEffect.value2, statusEffect.value3, statusEffect.value4),
        );
      }
    }

    //Key Items
    saveData.player.keyItems = [];
    if (liveData.player.keyItems.length > 0) {
      // for (let i = 0; i < liveData.player.keyItems.length; i++) {
      //     saveData.player.keyItems.push(new KeyItem())
      //     saveData.player.keyItems[i].ktype.id = liveData.player.keyItems[i].ktype.id
      //     saveData.player.keyItems[i].value1 = liveData.player.keyItems[i].value1
      //     saveData.player.keyItems[i].value2 = liveData.player.keyItems[i].value2
      //     saveData.player.keyItems[i].value3 = liveData.player.keyItems[i].value3
      //     saveData.player.keyItems[i].value4 = liveData.player.keyItems[i].value4
      // }
      for (const keyItem of liveData.player.keyItems) {
        saveData.player.keyItems.push(new KeyItem(keyItem.ktype, keyItem.value1, keyItem.value2, keyItem.value3, keyItem.value4));
      }
    }

    //Player Pregnancy
    saveData.player.pregnancyIncubation = liveData.player.pregnancyIncubation;
    saveData.player.pregnancyType = liveData.player.pregnancyType;
    saveData.player.pregnancyEventArr = liveData.player.pregnancyEventArr;
    saveData.player.buttPregnancyIncubation = liveData.player.buttPregnancyIncubation;
    saveData.player.buttPregnancyType = liveData.player.buttPregnancyType;
    saveData.player.pregnancyEventNum = liveData.player.pregnancyEventNum;

    //Amily Pregnancy - This may need to go into an array for better saving?
    // saveData.amilypregnancyIncubation = amily.pregnancyIncubation
    // saveData.amilypregnancyType = amily.pregnancyType
    // saveData.amilypregnancyEventArr = amily.pregnancyEventArr
    // saveData.amilybuttPregnancyIncubation = amily.buttPregnancyIncubation
    // saveData.amilybuttPregnancyType = amily.buttPregnancyType
    // saveData.amilypregnancyEventNum = amily.pregnancyEventNum

    //Spells
    // saveData.player.spells = {}
    saveData.player.spells.chargeWeapon = liveData.player.spells.chargeWeapon;
    saveData.player.spells.blind = liveData.player.spells.blind;
    saveData.player.spells.whitefire = liveData.player.spells.whitefire;
    saveData.player.spells.arouse = liveData.player.spells.arouse;
    saveData.player.spells.heal = liveData.player.spells.heal;
    saveData.player.spells.might = liveData.player.spells.might;

    //Exploration
    // saveData.exploration = {}
    saveData.exploration.explored = liveData.exploration.explored;
    saveData.exploration.exploredForest = liveData.exploration.exploredForest;
    saveData.exploration.exploredLake = liveData.exploration.exploredLake;
    saveData.exploration.exploredDesert = liveData.exploration.exploredDesert;
    saveData.exploration.exploredMountain = liveData.exploration.exploredMountain;

    //Other Data
    // saveData.time = {}
    saveData.time.days = liveData.time.days;
    saveData.time.hours = liveData.time.hours;
    saveData.time.minutes = liveData.time.minutes;

    //Game Flags
    // liveData.gameFlags = {}
    for (const i in liveData.gameFlags) {
      saveData.gameFlags[i] = liveData.gameFlags[i];
    }

    //Amily Save Test
    //if (AmilyScene.pregnancy.pregnancyTypeFlag != 0) {
    //    liveData.gameFlags[AMILY_PREGNANCY_TYPE] = AmilyScene.pregnancy.pregnancyTypeFlag;
    //    liveData.gameFlags[AMILY_INCUBATION] = AmilyScene.pregnancy.pregnancyIncubationFlag;
    //}

    //Assign Save Version
    saveData.saveVersion = liveData.saveVersion;
    // localStorage[slot] = JSON.stringify(saveData)
    liveData.storage.set(slot, JSON.stringify(saveData));

    //Set to successful and return
    success = true;
  } catch (error) {
    //Set to failed
    GUI.outputText(error + '<br><br>');
    console.error(error);
    success = false;
  }

  return success;
}

//Attempt to load a game and show if it fails or not.
export function loadGame(slot: string): void {
  GUI.clearOutput();
  if (loadGameObject(slot)) {
    GUI.outputText('Successfully loaded!');
    GUI.doNext(liveData.playerMenu);
  } else {
    GUI.outputText('Failed to load!');
    GUI.doNext(loadScreen);
  }
}

// Loads a game
export function loadGameObject(slot: string): boolean {
  //Let's try to load!
  let success = false;
  const saveData = JSON.parse(localStorage[slot]);
  try {
    const player = new Player();
    //Iterate through player data
    // for (let i in saveData.player) {
    //     liveData.player[i] = saveData.player[i]
    // }
    liveData.player = saveData.player;
    //Manually set equipment
    if (saveData.player.weapon != undefined) liveData.player.weapon = UTIL.lookupItem(saveData.player.weapon.id);
    if (saveData.player.armor != undefined) liveData.player.armor = UTIL.lookupItem(saveData.player.armor.id);

    //Set items
    liveData.player.itemSlots = [];
    for (let i = 0; i < 56; i++) {
      liveData.player.itemSlots.push(new ItemSlot());
    }
    for (let i = 0; i < saveData.player.itemSlots.length; i++) {
      liveData.player.itemSlots[i].setItemAndQty(UTIL.lookupItem(saveData.player.itemSlots[i].id), saveData.player.itemSlots[i].quantity);
    }

    //Perks
    liveData.player.perks = [];
    for (let i = 0; i < saveData.player.perks.length; i++) {
      if (UTIL.lookupPerk(saveData.player.perks[i].id) == undefined) continue;
      liveData.player.createPerk(
        UTIL.lookupPerk(saveData.player.perks[i].id),
        saveData.player.perks[i].value1,
        saveData.player.perks[i].value2,
        saveData.player.perks[i].value3,
        saveData.player.perks[i].value4,
      );
    }

    //Status Effects
    liveData.player.statusEffects = [];
    for (let i = 0; i < saveData.player.statusEffects.length; i++) {
      liveData.player.createStatusEffect(
        UTIL.lookupStatusEffects(saveData.player.statusEffects[i].id),
        saveData.player.statusEffects[i].value1,
        saveData.player.statusEffects[i].value2,
        saveData.player.statusEffects[i].value3,
        saveData.player.statusEffects[i].value4,
      );
    }

    //Key Items
    liveData.player.keyItems = [];
    for (let i = 0; i < saveData.player.keyItems.length; i++) {
      liveData.player.createKeyItem(
        saveData.player.keyItems[i].id,
        saveData.player.keyItems[i].value1,
        saveData.player.keyItems[i].value2,
        saveData.player.keyItems[i].value3,
        saveData.player.keyItems[i].value4,
      );
      //player.createKeyItem(lookupKeyItem(saveData.player.keyItems[i].id), saveData.player.keyItems[i].value1, saveData.player.keyItems[i].value2, saveData.player.keyItems[i].value3, saveData.player.keyItems[i].value4);
    }

    //Player Pregnancy Load
    liveData.player.pregnancyIncubation = saveData.player.pregnancyIncubation;
    liveData.player.pregnancyType = saveData.player.pregnancyType;
    liveData.player.pregnancyEventArr = saveData.player.pregnancyEventArr;
    liveData.player.buttPregnancyIncubation = saveData.player.buttPregnancyIncubation;
    liveData.player.buttPregnancyType = saveData.player.buttPregnancyType;
    liveData.player.pregnancyEventNum = saveData.player.pregnancyEventNum;

    //Amily Pregnancy Load
    if (saveData.amilypregnancyIncubation == undefined) {
      liveData.amily.pregnancyIncubation = 0;
    } else liveData.amily.pregnancyIncubation = saveData.amilypregnancyIncubation;

    if (saveData.amilypregnancyType == undefined) {
      liveData.amily.pregnancyType = 0;
    } else liveData.amily.pregnancyType = saveData.amilypregnancyType;

    if (saveData.amilypregnancyEventArr == undefined) {
      liveData.amily.pregnancyEventArr = [];
    } else liveData.amily.pregnancyEventArr = saveData.amilypregnancyEventArr;

    if (saveData.amilybuttPregnancyIncubation == undefined) {
      liveData.amily.buttPregnancyIncubation = 0;
    } else liveData.amily.buttPregnancyIncubation = saveData.amilybuttPregnancyIncubation;

    if (saveData.amilybuttPregnancyType == undefined) {
      liveData.amily.buttPregnancyType = 0;
    } else liveData.amily.buttPregnancyType = saveData.amilybuttPregnancyType;

    if (saveData.amilypregnancyEventNum == undefined) {
      liveData.amily.pregnancyEventNum = 0;
    } else liveData.amily.pregnancyEventNum = saveData.amilypregnancyEventNum;

    //Spells
    if (saveData.player.spells != undefined) {
      // liveData.player.spells = []
      liveData.player.spells.chargeWeapon = saveData.player.spells.chargeWeapon;
      liveData.player.spells.blind = saveData.player.spells.blind;
      liveData.player.spells.whitefire = saveData.player.spells.whitefire;
      liveData.player.spells.arouse = saveData.player.spells.arouse;
      liveData.player.spells.heal = saveData.player.spells.heal;
      liveData.player.spells.might = saveData.player.spells.might;
    }

    //Exploration
    if (saveData.exploration != undefined) {
      // liveData.exploration = []
      liveData.exploration.explored = saveData.exploration.explored;
      liveData.exploration.exploredForest = saveData.exploration.exploredForest;
      liveData.exploration.exploredLake = saveData.exploration.exploredLake;
      liveData.exploration.exploredDesert = saveData.exploration.exploredDesert;
      liveData.exploration.exploredMountain = saveData.exploration.exploredMountain;
    }

    //Other data
    liveData.playerMenu = Camp.doCamp;
    if (saveData.time != undefined) {
      liveData.time.days = saveData.time.days;
      liveData.time.hours = saveData.time.hours;
      liveData.time.minutes = saveData.time.minutes;
    }
    if (liveData.gameFlags != undefined) {
      for (const i in liveData.gameFlags) {
        if (liveData.gameFlags[i] == undefined || liveData.gameFlags[i] == null) liveData.gameFlags[i] = 0;
        else liveData.gameFlags[i] = saveData.gameFlags[i];
      }
    }

    /*
        //Amily Test Load
        if (saveData.amilyPregType != 0) {
            AmilyScene.pregnancy.pregnancyTypeFlag = liveData.gameFlags[saveData.amilyPregType];
            AmilyScene.pregnancy.pregnancyIncubationFlag = liveData.gameFlags[saveData.amilyPregDur];
        };
        */

    fixSave();

    //Set to successful and return
    success = true;
  } catch (error) {
    //If something's wrong, tell failure.
    GUI.outputText(error + '<br><br>');
    console.error(error);
    success = false;
  }
  return success;
}

export function loadSaveDisplay(slot: string) {
  // if (localStorage[slot] == undefined) {
  if (liveData.storage.get(slot) == undefined) {
    return 'EMPTY<br>';
  }
  // let saveData = JSON.parse(localStorage[slot])
  const saveData = JSON.parse(liveData.storage.get(slot));
  let holding = '';
  holding += saveData.player.name + ', Level ' + saveData.player.level + '<br>'; //Get player name and level
  holding += '&nbsp;Day: ' + saveData.time.days + ', Gender: '; //Get day and gender
  if (saveData.player.gender == 0) holding += 'U';
  if (saveData.player.gender == 1) holding += 'M';
  if (saveData.player.gender == 2) holding += 'F';
  if (saveData.player.gender == 3) holding += 'H';
  return holding;
}

export function fixSave() {
  let i;
  //Fix body parts
  // if (liveData.player.race != undefined) delete liveData.player.race //Reset variable
  // if (liveData.player.weapon.getTooltipDescription == undefined) delete liveData.player.weapon.getTooltipDescription
  // if (liveData.player.armor.getTooltipDescription == undefined) delete liveData.player.armor.getTooltipDescription
  for (const cock of liveData.player.cocks) {
    cock.fixCock();
  }
  for (const vagina of liveData.player.vaginas) {
    vagina.fixVagina();
  }
  for (const breastRow of liveData.player.breastRows) {
    breastRow.unfuckBreastRow();
  }
}

//DELETE SAVE
export function deletePrompt(slot: string) {
  GUI.clearOutput();
  GUI.outputText("Are you sure you want to delete this save file? You won't be able to retrieve it!");
  GUI.menu();
  GUI.addButton(0, "Yes, I'm sure!", deleteSave, slot);
  GUI.addButton(1, 'No, wait!', deleteScreen);
}
export function deleteSave(slot: string) {
  GUI.clearOutput();
  GUI.outputText(slot + ' has been deleted.');
  // delete localStorage[slot]
  liveData.storage.clearItem(slot);
  GUI.doNext(deleteScreen);
}
//SETTINGS DATA SAVE/LOAD
export function saveSettings() {
  let success = false;
  // let saveData = {}
  const saveData = new GameContext();
  try {
    saveData.silly = liveData.silly;
    saveData.use12Hours = liveData.use12Hours;

    //saveData.buttonFont = buttonFont;
    saveData.mainFont = liveData.mainFont;
    saveData.mainFontSizeIndex = liveData.mainFontSizeIndex;

    //Set save to successful
    // localStorage["CoC_Main"] = JSON.stringify(saveData)
    liveData.storage.set('CoC_Main', JSON.stringify(saveData));
    success = true;
  } catch (error) {
    //If errors occur, set save to failed
    console.error(error);
    success = false;
  }
  return success;
}
export function loadSettings() {
  let success = false;
  if (MAIN.GetIEVersion() == 0) {
    // if (localStorage["CoC_Main"] == undefined) return success
    if (liveData.storage.get('CoC_Main') == undefined) return success;
  } else {
    return false;
  }
  // let saveData = JSON.parse(localStorage["CoC_Main"])
  const saveData = JSON.parse(liveData.storage.get('CoC_Main'));
  try {
    liveData.silly = saveData.silly;
    liveData.use12Hours = saveData.use12Hours;

    liveData.mainFont = saveData.mainFont;
    liveData.mainFontSizeIndex = saveData.mainFontSizeIndex;
    MAIN.applyFontSettings();
    //Set load to successful
    success = true;
  } catch (error) {
    console.error(error);
    success = false;
  }
  return success;
}

//Main Data Menu
export function dataScreen() {
  GUI.clearOutput();
  GUI.outputText('Here, you can save or load data.');
  GUI.menu();
  if (liveData.gameStarted) GUI.addButton(0, 'Save', saveScreen);
  GUI.addButton(1, 'Load', loadScreen);
  GUI.addButton(2, 'Delete', deleteScreen);

  GUI.addButton(14, 'Back', liveData.playerMenu);
}

//Add to Data Flags
export function addToGameFlags(...args: any[]) {
  for (const i in args) {
    liveData.gameFlags[args[i]] = 0;
  }
}

// TODO: JSON to Object class conversion (to eventually replace loadGameObject)
// https://github.com/typestack/class-transformer

// export { Data }
