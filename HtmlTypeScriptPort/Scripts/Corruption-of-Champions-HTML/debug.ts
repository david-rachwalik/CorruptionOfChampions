import { liveData, ENUM, GUI, FLAG, Camp, COMBAT, TentacleBeastScene, Inventory, Items } from 'coc';

// DEBUGGING MENU

export function doDebug() {
  GUI.clearOutput();
  GUI.outputText('CoC HTML Debug Menu.<br><br>');
  GUI.outputText(
    'Be warned that using this can cause very strange behavior. Saving while using this menu can cause a corrupted save. Back up your saves and use at your own risk.<br><br>',
  );
  GUI.outputText('<b>Player Variables</b><br>');
  GUI.outputText('Player Gender: ' + liveData.player.gender + '<br>');
  GUI.outputText('Player Pregnant by: ' + liveData.player.pregnancyType + '<br>');
  GUI.outputText('Player Anal Pregnant by: ' + liveData.player.buttPregnancyType + '<br>');
  GUI.outputText('Player Anal Pregnancy Duration: ' + liveData.player.buttPregnancyIncubation + '<br>');
  GUI.outputText('Have an armor rack? ' + liveData.gameFlags[FLAG.HAS_ARMOR_RACK] + '<br>');
  GUI.outputText('Have a weapon rack? ' + liveData.gameFlags[FLAG.HAS_WEAPON_RACK] + '<br>');
  GUI.outputText('Have a shield rack? ' + liveData.gameFlags[FLAG.HAS_EQUIPMENT_RACK] + '<br>');
  GUI.outputText('Tamani Pregnancy Type Flag is: ' + liveData.tamanipreg.pregnancyType + '<br>');
  GUI.outputText('Tamani Pregnancy Incubation Flag is: ' + liveData.tamanipreg.pregnancyIncubation + '<br>');
  GUI.outputText('Tamani Pregnancy Event Number is: ' + liveData.tamanipreg.pregnancyEventNum);
  GUI.menu();
  GUI.addButton(0, 'Gender', genderChange, null, null, null, "Change the Player's Gender.");
  GUI.addButton(1, 'Fight', fightCreature, null, null, null, 'Fight a creature.');
  GUI.addButton(2, 'StatChange', statChange, null, null, null, 'Change a Stat for testing.');
  GUI.addButton(3, 'PregTest', pregTest, null, null, null, 'Start a Pregnancy in the Player.');
  GUI.addButton(4, 'RackTest', rackTest, null, null, null, 'Put items in your inventory for rack checking.');
  GUI.addButton(14, 'Leave', Camp.doCamp, null, null, null, 'Return to Camp.');
}

//----------
// CHANGE THE GENDER OF THE PLAYER
//----------

export function genderChange() {
  GUI.clearOutput();
  GUI.outputText("Change the player's gender to...");
  GUI.addButton(0, 'Male', genderChangeMale, null, null, null, 'Change to Male.');
  GUI.addButton(1, 'Female', genderChangeFemale, null, null, null, 'Change to Female.');
  GUI.addButton(2, 'Herm', genderChangeHerm, null, null, null, 'Change to Herm.');
  GUI.addButton(3, 'Genderless', genderChangeNone, null, null, null, 'Change to Genderless.');
  GUI.addButton(14, 'Back', doDebug, null, null, null, 'Go Back to Debug Menu.');
}

export function genderChangeMale() {
  GUI.clearOutput();
  GUI.outputText('Player gender changed to MALE.');
  liveData.player.gender = 1;
  GUI.doNext(doDebug);
}

export function genderChangeFemale() {
  GUI.clearOutput();
  GUI.outputText('Player gender changed to FEMALE.');
  liveData.player.gender = 2;
  GUI.doNext(doDebug);
}

export function genderChangeHerm() {
  GUI.clearOutput();
  GUI.outputText('Player gender changed to HERM.');
  liveData.player.gender = 3;
  GUI.doNext(doDebug);
}

export function genderChangeNone() {
  GUI.clearOutput();
  GUI.outputText('Player gender changed to GENDERLESS.');
  liveData.player.gender = 0;
  GUI.doNext(doDebug);
}

//----------
// Fight a creature
//----------

export function fightCreature() {
  GUI.clearOutput();
  COMBAT.startCombat(new TentacleBeastScene.TentacleBeast());
}

//-------
// Change a Stat
//-------

export function statChange() {
  GUI.clearOutput();
  GUI.outputText('Which Stat do you want to change?');
  GUI.addButton(0, 'HP BOOST', changeHP);
  GUI.addButton(1, 'Main Stats', changeStats);
  GUI.addButton(14, 'Back', doDebug);
}

export function changeHP() {
  GUI.outputText('Changing HP');
  liveData.player.HP = 999;
}

export function changeStats() {
  GUI.clearOutput();
  GUI.outputText('Becoming a Beast!');
  liveData.player.modStats(['str', 99], ['tou', 99], ['spe', 99]);
}

//----------
// PregTest
//----------
export function pregTest() {
  GUI.clearOutput();
  GUI.outputText('Knocking up Tamani<br>');
  liveData.tamanipreg.knockUpForce(ENUM.PregnancyType.PREGNANCY_PLAYER, 216, FLAG.INCUBATION_TAMANI_EVENT);
  liveData.tamanipreg.eventFill(FLAG.INCUBATION_TAMANI_EVENT);
  GUI.outputText('Pregnancy Type Flag is: ' + liveData.tamanipreg.pregnancyType + '<br>');
  GUI.outputText('Pregnancy Incubation Flag is: ' + liveData.tamanipreg.pregnancyIncubation + '<br>');
  GUI.doNext(doDebug);
}

//---------
// RackTest
//---------
export function rackTest() {
  GUI.clearOutput;
  GUI.outputText('Putting Weapon and Armor into Inventory for testing racks<br><br>');
  Inventory.takeItem(Items.Weapons.Pipe);
  Inventory.takeItem(Items.Armor.BeeArmor);
}

// export { Debug }
