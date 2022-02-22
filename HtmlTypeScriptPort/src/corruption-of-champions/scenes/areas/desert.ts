import * as GUI from '../../engine/gui';
import * as UTIL from '../../engine/utils';
import { liveData } from '../../main-context';
import * as WandererScene from '../../scenes/areas/desert/marcusLucia';
import * as NagaScene from '../../scenes/areas/desert/naga';
import * as OasisScene from '../../scenes/areas/desert/oasis';
import * as SandTrapScene from '../../scenes/areas/desert/sandTrap';
import * as SandWitchScene from '../../scenes/areas/desert/sandWitch';
import * as Camp from '../../scenes/camp';

export function explore() {
  GUI.clearOutput();
  liveData.exploration.exploredDesert++; //Increment counter
  const choice: number[] = [];
  choice[choice.length] = 0; //Sand Witch
  choice[choice.length] = 1; //Naga
  choice[choice.length] = 2; //Marcus and Lucia
  if (UTIL.rand(2) == 0) choice[choice.length] = 3; //Sand Trap
  choice[choice.length] = 4; // Oasis Demons or Mirage
  choice[choice.length] = 99; //Nothing out of the ordinary, possibly find mirage
  const select = choice[UTIL.rand(choice.length)];
  switch (select) {
    case 0: //Sand Witch
      // Check for birthing scene. Sand Witch must be in second half of pregnancy and hit a 1/4 chance.

      if (liveData.sandWitch.pregnancyEventNum == 2 && UTIL.rand(4) == 0) {
        // if ((liveData.sandWitch.pregnancyType = "Drider_Eggs")) SandWitchScene.sammitchBirthsDriders() else
        SandWitchScene.witchBirfsSomeBees();
        break;
      }
      // Otherwise, do normal encounter
      else {
        SandWitchScene.encounter();
        break;
      }
    case 1: //Naga and Sand Trap
      NagaScene.nagaEncounter();
      break;
    case 2: //Marcus and Lucia
      WandererScene.wandererRouter();
      break;
    case 3: // Sandtrap
      SandTrapScene.encounterASandTrap();
      break;
    case 4: // Oasis Demons or Mirage
      if (UTIL.rand(4) == 0 && liveData.player.level >= 2) {
        OasisScene.oasisEncounter();
        break;
      } else {
        GUI.outputText(
          'While exploring the desert, you see a shimmering tower in the distance. As you rush towards it, it vanishes completely. It was a mirage!  You sigh, depressed at wasting your time.',
        );
        liveData.player.changeLust(-15, false);
        GUI.doNext(Camp.returnToCampUseOneHour);
        break;
      }
    default:
      if (UTIL.rand(4) > 0) {
        //Find nothing.
        GUI.outputText('You walk through the shifting sands for an hour, finding nothing.<br><br>');
        //Chance of boost == 50%
        if (UTIL.rand(2) == 0) {
          //50/50 strength/toughness
          if (UTIL.rand(2) == 0 && liveData.player.str < 50) {
            GUI.outputText('The effort of struggling with the uncertain footing has made you stronger.');
            liveData.player.modStats(['str', 0.5]);
          }
          //Toughness
          else if (liveData.player.tou < 50) {
            GUI.outputText('The effort of struggling with the uncertain footing has made you tougher.');
            liveData.player.modStats(['tou', 0.5]);
          }
        }
      } else {
        //Mirage in the desert.
        GUI.outputText(
          'While exploring the desert, you see a shimmering tower in the distance. As you rush towards it, it vanishes completely. It was a mirage!  You sigh, depressed at wasting your time.',
        );
      }
      liveData.player.changeLust(-15, false);
      GUI.doNext(Camp.returnToCampUseOneHour);
  }
}
