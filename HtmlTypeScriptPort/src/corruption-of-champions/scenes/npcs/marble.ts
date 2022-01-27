import { liveData, FLAG, Data, PerkLib } from 'coc';

Data.addToGameFlags(
  FLAG.MARBLE_MET,
  FLAG.MARBLE_ADDICTION,
  FLAG.MARBLE_AFFECTION,
  FLAG.MARBLE_WARNING,
  FLAG.NO_MORE_MARBLE,
  FLAG.MARBLE_RAPE_ATTEMPTED,
  FLAG.MURBLE_FARM_TALK_LEVELS,
);

export function marbleStatusChange(affection: number, addiction: number, isAddicted = -1) {
  //Values only change if not brought to conclusion
  if (liveData.player.findPerk(PerkLib.MarblesMilk) < 0 && liveData.player.findPerk(PerkLib.MarbleResistant) < 0) {
    liveData.gameFlags[FLAG.MARBLE_AFFECTION] += affection;
    liveData.gameFlags[FLAG.MARBLE_ADDICTION] += addiction;
  }
  //if (isAddicted != -1) player.changeStatusValue(StatusEffects.Marble, 3, isAddicted);
}

export function applyMarblesMilk() {
  liveData.player.slimeFeed();
}
