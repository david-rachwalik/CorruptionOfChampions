import { liveData } from "./globalVariables.js";
import { PerkLib } from "./perkLib.js";
class PerkMenuBuilder {
    static buildPerkList() {
        let perksAvailable = [];
        //Strength Perks
        if (liveData.player.str >= 25)
            this.addPerkToDropdown(perksAvailable, PerkLib.StrongBack);
        if (liveData.player.str >= 50 && liveData.player.findPerk(PerkLib.StrongBack) >= 0)
            this.addPerkToDropdown(perksAvailable, PerkLib.StrongBack2);
        //Toughness Perks
        if (liveData.player.tou >= 25)
            this.addPerkToDropdown(perksAvailable, PerkLib.Tank);
        if (liveData.player.tou >= 50 && liveData.player.findPerk(PerkLib.Tank) >= 0)
            this.addPerkToDropdown(perksAvailable, PerkLib.Tank2);
        //Speed Perks
        if (liveData.player.spe >= 25)
            this.addPerkToDropdown(perksAvailable, PerkLib.Evade);
        if (liveData.player.spe >= 25)
            this.addPerkToDropdown(perksAvailable, PerkLib.Runner);
        //Intelligence Perks
        if (liveData.player.inte >= 25)
            this.addPerkToDropdown(perksAvailable, PerkLib.Precision);
        if (liveData.player.inte >= 25)
            this.addPerkToDropdown(perksAvailable, PerkLib.Spellpower);
        //Libido Perks
        //Corruption Perks
        return perksAvailable;
    }
    static addPerkToDropdown(perksAvailable, perk) {
        if (liveData.player.findPerk(perk) >= 0)
            return; //Already have perk? Don't add.
        perksAvailable.push(perk);
    }
}
export { PerkMenuBuilder };
//# sourceMappingURL=perkBuildMenu.js.map