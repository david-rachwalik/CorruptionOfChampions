import { liveData, PerkType, PerkLib } from 'coc';

export function buildPerkList(): PerkType[] {
  const perksAvailable: PerkType[] = [];
  //Strength Perks
  if (liveData.player.str >= 25) addPerkToDropdown(perksAvailable, PerkLib.StrongBack);
  if (liveData.player.str >= 50 && liveData.player.findPerk(PerkLib.StrongBack) >= 0) addPerkToDropdown(perksAvailable, PerkLib.StrongBack2);
  //Toughness Perks
  if (liveData.player.tou >= 25) addPerkToDropdown(perksAvailable, PerkLib.Tank);
  if (liveData.player.tou >= 50 && liveData.player.findPerk(PerkLib.Tank) >= 0) addPerkToDropdown(perksAvailable, PerkLib.Tank2);
  //Speed Perks
  if (liveData.player.spe >= 25) addPerkToDropdown(perksAvailable, PerkLib.Evade);
  if (liveData.player.spe >= 25) addPerkToDropdown(perksAvailable, PerkLib.Runner);
  //Intelligence Perks
  if (liveData.player.inte >= 25) addPerkToDropdown(perksAvailable, PerkLib.Precision);
  if (liveData.player.inte >= 25) addPerkToDropdown(perksAvailable, PerkLib.Spellpower);
  //Libido Perks

  //Corruption Perks

  return perksAvailable;
}

export function addPerkToDropdown(perksAvailable: PerkType[], perk: PerkType): void {
  if (liveData.player.findPerk(perk) >= 0) return; //Already have perk? Don't add.
  perksAvailable.push(perk);
}
