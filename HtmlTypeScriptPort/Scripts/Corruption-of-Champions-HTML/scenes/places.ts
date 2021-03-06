import { liveData, GUI, FLAG, Camp, PlacesFarm, TownRuins } from 'coc';

export function placesMenu() {
  GUI.hideMenus();
  GUI.clearOutput();
  GUI.outputText('Which place would you like to visit?');
  GUI.menu();
  //	if (flags[kFLAGS.BAZAAR_ENTERED] > 0) GUI.addButton(0, "Bazaar", kGAMECLASS.bazaar.enterTheBazaar, null, null, null, "Visit the Bizarre Bazaar where the demons and corrupted beings hang out.");
  //if (player.findStatusEffect(StatusEffects.BoatDiscovery) >= 0) GUI.addButton(1, "Boat", kGAMECLASS.boat.boatExplore, null, null, null, "Get on the boat and explore the lake. \n\nRecommended level: 4");
  //if (flags[kFLAGS.FOUND_CATHEDRAL] > 0) {
  //	if (flags[kFLAGS.GAR_NAME] == 0) GUI.addButton(2, "Cathedral", kGAMECLASS.gargoyle.gargoylesTheShowNowOnWBNetwork, null, null, null, "Visit the ruined cathedral you've recently discovered.");
  //	else GUI.addButton(2, "Cathedral", kGAMECLASS.gargoyle.returnToCathedral, null, null, null, "Visit the ruined cathedral where " + flags[kFLAGS.GAR_NAME] + " resides.");
  //}
  //if (dungeonFound()) GUI.addButton(3, "Dungeons", dungeons, null, null, null, "Delve into dungeons.");

  if (liveData.gameFlags[FLAG.MET_WHITNEY] >= 2) GUI.addButton(5, 'Farm', PlacesFarm.farmExploreEncounter, null, null, null, "Visit Whitney's farm.");
  //if (flags[kFLAGS.OWCA_UNLOCKED] == 1) GUI.addButton(6, "Owca", kGAMECLASS.owca.gangbangVillageStuff, null, null, null, "Visit the sheep village of Owca, known for its pit where a person is hung on the pole weekly to be gang-raped by the demons.");
  //if (flags[kFLAGS.MET_MINERVA] >= 4) GUI.addButton(7, "Oasis Tower", kGAMECLASS.highMountains.minervaScene.encounterMinerva, null, null, null, "Visit the ruined tower in the high mountains where Minerva resides.");
  //if (player.findStatusEffect(StatusEffects.HairdresserMeeting) >= 0) GUI.addButton(8, "Salon", kGAMECLASS.mountain.salon.salonGreeting, null, null, null, "Visit the salon for hair services.");

  //if (player.statusEffectv1(StatusEffects.TelAdre) >= 1) GUI.addButton(10, "Tel'Adre", kGAMECLASS.telAdre.telAdreMenu, null, null, null, "Visit the city of Tel'Adre in desert, easily recognized by the massive tower.");
  if (liveData.gameFlags[FLAG.AMILY_VILLAGE_ACCESSIBLE] == 1) {
    GUI.addButton(11, 'Town Ruins', TownRuins.exploreVillageRuin, null, null, null, 'Visit the village ruins.');
  }
  GUI.addButton(14, 'Back', Camp.doCamp);
  //if (flags[kFLAGS.PRISON_CAPTURE_COUNTER] > 0) GUI.addButton(12, "Prison", kGAMECLASS.prison.prisonIntro, false, null, null, "Return to the prison and continue your life as Elly's slave.");
  //if (debug) GUI.addButton(13, "Ingnam", kGAMECLASS.ingnam.returnToIngnam, null, null, null, "Return to Ingnam for debugging purposes. Night-time event weirdness might occur. You have been warned!");
}
