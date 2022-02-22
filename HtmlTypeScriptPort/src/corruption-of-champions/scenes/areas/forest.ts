import * as GUI from '../../engine/gui';
import * as UTIL from '../../engine/utils';
import * as FLAG from '../../flags/dataFlags';
import { liveData } from '../../main-context';
import * as BeeGirlScene from '../../scenes/areas/forest/beeGirl';
import * as TamaniScene from '../../scenes/areas/forest/tamani';
import * as TentacleBeastScene from '../../scenes/areas/forest/tentacleBeast';
import * as Camp from '../../scenes/camp';
import * as AreasGenericExploration from '../../scenes/exploration';

export function explore() {
  GUI.clearOutput();
  liveData.exploration.exploredForest++; //Increment counter
  const choice: number[] = [];
  choice[choice.length] = 0; //Goblin/imp encounter
  if (
    (liveData.player.cor >= 25 || liveData.player.level >= 4 || liveData.gameFlags[FLAG.JOJO_CORRUPTION_STAGE] != 0) &&
    liveData.gameFlags[FLAG.JOJO_CAMP] == 0 /* && flags[JOJO_DEAD_OR_GONE] == 0*/
  )
    choice[choice.length] = 1; //Jojo
  if (liveData.player.level >= 2) choice[choice.length] = 2; //Tentacle beast
  //choice[choice.length] = 3; //Corrupted Glade
  choice[choice.length] = 4; //Root
  choice[choice.length] = 5; //Bee-girl
  choice[choice.length] = 8; //Peaceful walk
  const select = choice[UTIL.rand(choice.length)];
  switch (select) {
    case 0: //25% chance of Tamani/Daughter's. Otherwise, goblin and imp encounters. Trying a tweak of the encounter rate...
      if (
        UTIL.rand(100) <= 25 &&
        liveData.gameFlags[FLAG.TAMANI_TIME_OUT] == 0 &&
        liveData.player.gender > 0 &&
        liveData.gameFlags[FLAG.TAMANI_BAD_ENDED] == 0 &&
        (liveData.player.totalCocks() > 0 || liveData.player.hasKeyItem(liveData.KeyItems.DeluxeDildo) < 0)
      ) {
        if (
          liveData.player.totalCocks() > 0 &&
          liveData.gameFlags[FLAG.TAMANI_DAUGHTER_PREGGO_COUNTDOWN] == 0 &&
          liveData.gameFlags[FLAG.TAMANI_NUMBER_OF_DAUGHTERS] >= 24
        ) {
          GUI.outputText("You've reached Tamani Daughter's Scene. Placeholder. Will come in a later version!");
          //tamaniDaughtersScene.encounterTamanisDaughters();
        } else TamaniScene.encounterTamani();
        return;
      }
      AreasGenericExploration.genericGobImpEncounters();
      break;
    // case 1: //Jojo
    //     JojoScene.routeJojoEncounter()
    //     break
    case 2: //Tentacle Beasts (Not yet implemented)
      // TODO Track down this legacy flag if (player.gender > 0) flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00247] = 0;
      //Tentacle avoidance chance due to dangerous plants
      if (liveData.player.hasKeyItem(liveData.KeyItems.DangerousPlants) >= 0 && liveData.player.inte / 2 > UTIL.rand(50)) {
        //trace("TENTACLE'S AVOIDED DUE TO BOOK!");
        GUI.outputText(
          "Using the knowledge contained in your 'Dangerous Plants' book, you determine a tentacle beast's lair is nearby, do you continue?  If not you could return to camp.\n\n",
        );
        GUI.menu();
        GUI.addButton(0, 'Continue', TentacleBeastScene.encounter);
        GUI.addButton(1, 'Leave', Camp.returnToCampUseOneHour);
        return;
      } else {
        TentacleBeastScene.encounter();
        return;
      }
    case 3: //Corrupted Glade (Not yet implemented)
      break;
    case 4: //Trip on a Root
      GUI.outputText('You trip on an exposed root, scraping yourself somewhat, but otherwise the hour is uneventful. ');
      liveData.player.changeHP(-10, true);
      GUI.doNext(Camp.returnToCampUseOneHour);
      break;
    case 5: //Bee-girl
      BeeGirlScene.beeEncounter();
      break;
    default:
      if (liveData.player.cor < 80) {
        GUI.outputText('You enjoy a peaceful walk in the woods, it gives you time to think.');
        //Mod toughness
        if (liveData.player.tou < 50) liveData.player.modStats(['tou', 0.5]);
        //Mod intelligence
        if (liveData.player.inte < 50) liveData.player.modStats(['int', 1]);
        else if (liveData.player.inte < 75) liveData.player.modStats(['int', 0.5]);
      } else {
        GUI.outputText('As you wander in the forest, you keep ');
        if (liveData.player.gender == 1)
          GUI.outputText(
            'stroking your half-erect ' +
              liveData.player.multiCockDescriptLight() +
              ' as you daydream about fucking all kinds of women, from weeping tight virgins to lustful succubi with gaping, drooling fuck-holes.',
          );
        if (liveData.player.gender == 2)
          GUI.outputText(
            'idly toying with your ' +
              liveData.player.vaginaDescript(0) +
              " as you daydream about getting fucked by all kinds of monstrous cocks, from minotaurs' thick, smelly dongs to demons' towering, bumpy pleasure-rods.",
          );
        if (liveData.player.gender == 3)
          GUI.outputText(
            'stroking alternatively your ' +
              liveData.player.multiCockDescriptLight() +
              ' and your ' +
              liveData.player.vaginaDescript(0) +
              " as you daydream about fucking all kinds of women, from weeping tight virgins to lustful succubi with gaping, drooling fuck-holes, before, or while, getting fucked by various monstrous cocks, from minotaurs' thick, smelly dongs to demons' towering, bumpy pleasure-rods.",
          );
        if (liveData.player.gender == 0) GUI.outputText('daydreaming about sex-demons with huge sexual attributes, and how you could please them.');
        GUI.outputText(' ');
        if (liveData.player.tou < 50) liveData.player.modStats(['tou', 0.5]);
        if (liveData.player.lib < 60) liveData.player.modStats(['lib', 0.25]);
        liveData.player.changeLust(liveData.player.lib / 5, true);
      }
      GUI.doNext(Camp.returnToCampUseOneHour);
  }
}
