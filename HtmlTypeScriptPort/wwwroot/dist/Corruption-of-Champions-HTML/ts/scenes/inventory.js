import { clearOutput, outputText } from "../engine/text";
import { GUI } from "../engine/gui";
import { UTIL } from "../engine/utils";
import { Items, ITEM_TYPE_ARMOUR, ITEM_TYPE_SHIELD, ITEM_TYPE_WEAPON } from "../itemClass";
import { liveData } from "../globalVariables";
import { COMBAT } from "./combat";
import { Camp } from "./camp";
class Inventory {
    // Call the inventory menu
    static inventoryMenu() {
        GUI.hideMenus();
        clearOutput();
        outputText("<b><u>Equipment:</u></b><br>");
        outputText("<b>Weapon:</b> " + liveData.player.weapon.equipmentName + " (Attack: " + liveData.player.weapon.attack + ")<br>");
        //outputText("<b>Shield:</b> " + liveData.player.shield.name + " (Block Rating: " + liveData.player.shieldBlock + ")<br>");
        outputText("<b>Armour:</b> " + liveData.player.armor.equipmentName + " (Defense: " + liveData.player.armor.defense + ")<br><br>");
        //outputText("<b>Upper underwear:</b> " + liveData.player.upperGarment.name + "<br>");
        //outputText("<b>Lower underwear:</b> " + liveData.player.lowerGarment.name + "<br>");
        //outputText("<b>Accessory:</b> " + liveData.player.jewelryName + "<br>");
        if (liveData.player.keyItems.length > 0)
            outputText("<b><u>Key Items:</u></b><br>");
        for (let x = 0; x < liveData.player.keyItems.length; x++)
            outputText(liveData.player.keyItems[x].ktype.id + "<br>");
        outputText("<br>To discard unwanted items, hold Shift then click any of the items.");
        if (COMBAT.inCombat()) {
            liveData.callNext = this.inventoryCombatHandler;
        }
        else {
            liveData.callNext = this.inventoryMenu;
        }
        GUI.menu();
        for (let i = 0; i < 10; i++) {
            //Supports up to 10 items. You begin with 3 slots.
            if (liveData.player.itemSlots[i].quantity > 0 && i < liveData.player.getMaxSlots()) {
                GUI.addButton(i, liveData.player.itemSlots[i].itype.shortName + " x" + liveData.player.itemSlots[i].quantity, this.useItemInInventory, i, null, null, liveData.player.itemSlots[i].itype.getTooltipDescription(), UTIL.capitalize(liveData.player.itemSlots[i].itype.longName));
            }
        }
        GUI.addButton(10, "Unequip", this.unequipMenu);
        GUI.addButton(14, "Back", liveData.playerMenu);
    }
    // Call the unequip menu
    static unequipMenu() {
        clearOutput();
        outputText("Which would you like to unequip?<br><br>");
        GUI.menu();
        if (liveData.player.weapon.id != "Nothing") {
            GUI.addButton(0, "Weapon", this.unequipWeapon, null, null, null, liveData.player.weapon.getTooltipDescription(), UTIL.capitalizeFirstLetter(liveData.player.weapon.equipmentName));
        }
        /*if (liveData.player.shield != ShieldLib.NOTHING) {
            GUI.addButton(1, "Shield", unequipShield, null, null, null, liveData.player.shield.description, UTIL.capitalizeFirstLetter(liveData.player.shield.name));
        }
        if (liveData.player.jewelry != JewelryLib.NOTHING) {
            GUI.addButton(2, "Accessory", unequipJewel, null, null, null, liveData.player.jewelry.description, UTIL.capitalizeFirstLetter(liveData.player.jewelry.name));
        }*/
        if (liveData.player.armor.id != "Nothing") {
            GUI.addButton(5, "Armour", this.unequipArmor, null, null, null, liveData.player.armor.getTooltipDescription(), UTIL.capitalizeFirstLetter(liveData.player.armor.equipmentName));
        }
        /*if (liveData.player.upperGarment != UndergarmentLib.NOTHING) {
            GUI.addButton(6, "Upperwear", unequipUpperwear, null, null, null, liveData.player.upperGarment.description, UTIL.capitalizeFirstLetter(liveData.player.upperGarment.name));
        }
        if (liveData.player.lowerGarment != UndergarmentLib.NOTHING) {
            GUI.addButton(7, "Lowerwear", unequipLowerwear, null, null, null, liveData.player.lowerGarment.description, UTIL.capitalizeFirstLetter(liveData.player.lowerGarment.name));
        }*/
        GUI.addButton(14, "Back", this.inventoryMenu);
    }
    // Performs unequipping of the relevant item type
    static unequipWeapon() {
        clearOutput();
        let oldWeapon = UTIL.lookupItem(liveData.player.weapon.id);
        liveData.player.weapon = Items.NOTHING;
        this.takeItem(oldWeapon, this.unequipMenu);
    }
    static unequipArmor() {
        clearOutput();
        let oldArmor = UTIL.lookupItem(liveData.player.armor.id);
        liveData.player.armor = Items.NOTHING;
        this.takeItem(oldArmor, this.unequipMenu);
    }
    // Puts item into inventory
    static takeItem(itype, nextAction, overrideAbandon, source) {
        if (overrideAbandon == undefined) {
            overrideAbandon = nextAction;
        }
        /*if (itype == null) {
            CoC_Settings.error("takeItem(null)");
            return;
        }*/
        if (itype == Items.NOTHING)
            return;
        if (nextAction != null)
            liveData.callNext = nextAction;
        else
            liveData.callNext = liveData.playerMenu;
        //Check for an existing stack with room in the inventory and return the value for it.
        let temp = liveData.player.roomInExistingStack(itype);
        if (temp >= 0) {
            //First slot go!
            liveData.player.itemSlots[temp].quantity++;
            outputText("You place " + itype.longName + " in your " + this.inventorySlotName[temp] + " pouch, giving you " + liveData.player.itemSlots[temp].quantity + " of them.");
            this.itemGoNext();
            return;
        }
        //If not done, then put it in an empty spot!
        //Throw in slot 1 if there is room
        temp = liveData.player.emptySlot();
        if (temp >= 0) {
            liveData.player.itemSlots[temp].setItemAndQty(itype, 1);
            outputText("You place " + itype.longName + " in your " + this.inventorySlotName[temp] + " pouch.");
            this.itemGoNext();
            return;
        }
        //callOnAbandon only becomes important if the inventory is full
        liveData.callOnAbandon = overrideAbandon ? overrideAbandon : liveData.callNext;
        //OH NOES! No room! Call replacer functions!
        if (source) {
            this.takeItemFull(itype, true, source);
        }
    }
    // Uses an item from the inventory
    static useItemInInventory(slotNum) {
        clearOutput();
        //if (liveData.player.itemSlots[slotNum].itype.type == ITEM_TYPE_CONSUMABLE) {
        let item = liveData.player.itemSlots[slotNum].itype;
        if (liveData.shiftKeyDown) {
            this.deleteItemPrompt(item, slotNum);
            return;
        }
        if (item.canUse()) {
            //If an item cannot be used then canUse should provide a description of why the item cannot be used
            liveData.player.itemSlots[slotNum].removeOneItem();
            this.useItem(item, liveData.player.itemSlots[slotNum]);
            return;
        }
        //}
        //else {
        //    outputText("You cannot use " + liveData.player.itemSlots[slotNum].itype.longName + "!\n\n");
        //}
        this.itemGoNext(); //Normally returns to the inventory menu. In combat it goes to the inventoryCombatHandler function
    }
    // Handles a bit of inventory cleanup from combat
    static inventoryCombatHandler() {
        outputText("<br><br>");
        COMBAT.combatRoundOver();
    }
    // Prompts to destroys an item
    static deleteItemPrompt(item, slotNum) {
        clearOutput();
        outputText("Are you sure you want to destroy " + liveData.player.itemSlots[slotNum].quantity + "x " + item.shortName + "?  You won't be able to retrieve " + (liveData.player.itemSlots[slotNum].quantity == 1 ? "it" : "them") + "!");
        GUI.menu();
        GUI.addButton(0, "Yes", this.deleteItem, item, slotNum);
        GUI.addButton(1, "No", this.inventoryMenu);
        //doYesNo(deleteItem, inventoryMenu);
    }
    // Deletes an item
    static deleteItem(item, slotNum) {
        clearOutput();
        outputText(liveData.player.itemSlots[slotNum].quantity + "x " + item.shortName + " " + (liveData.player.itemSlots[slotNum].quantity == 1 ? "has" : "have") + " been destroyed.");
        liveData.player.destroyItems(item, liveData.player.itemSlots[slotNum].quantity);
        GUI.doNext(this.inventoryMenu);
    }
    // Use an item
    static useItem(item, fromSlot) {
        item.useText();
        /*if (item) {
            liveData.player.armor.removeText();
            item = liveData.player.setArmor(item as Armor); //Item is now the player's old armor
            if (item == null)
                itemGoNext();
            else takeItem(item, liveData.callNext);
        }
        else if (item is Weapon) {
            liveData.player.weapon.removeText();
            item = liveData.player.setWeapon(item as Weapon); //Item is now the player's old weapon
            if (item == null)
                itemGoNext();
            else takeItem(item, liveData.callNext);
        }
        else if (item is Jewelry) {
            liveData.player.jewelry.removeText();
            item = liveData.player.setJewelry(item as Jewelry); //Item is now the player's old jewelry
            if (item == null)
                itemGoNext();
            else takeItem(item, liveData.callNext);
        }
        else if (item is Shield) {
            liveData.player.shield.removeText();
            item = liveData.player.setShield(item as Shield); //Item is now the player's old shield
            if (item == null)
                itemGoNext();
            else takeItem(item, liveData.callNext);
        }
        else if (item is Undergarment) {
            if (item["type"] == 0) liveData.player.upperGarment.removeText();
            else liveData.player.lowerGarment.removeText();
            item = liveData.player.setUndergarment(item as Undergarment, item["type"]); //Item is now the player's old shield
            if (item == null)
                itemGoNext();
            else takeItem(item, liveData.callNext);
        }
        else {*/
        liveData.currentItemSlot = fromSlot;
        if (!item.useItem())
            this.itemGoNext(); //Items should return true if they have provided some form of sub-menu.
        //This is used for Reducto and GroPlus (which always present the player with a sub-menu)
        //and for the Kitsune Gift (which may show a sub-menu if the player has a full inventory)
        //				if (!item.hasSubMenu()) itemGoNext(); //Don't call itemGoNext if there's a sub menu, otherwise it would never be displayed
        //}
    }
    // Try to take an item when the slot is full
    static takeItemFull(itype, showUseNow, source) {
        outputText("There is no room for " + itype.longName + " in your inventory.  You may replace the contents of a pouch with " + itype.longName + " or abandon it.");
        GUI.menu();
        for (let x = 0; x < 10; x++) {
            if (liveData.player.itemSlots[x].itype != Items.NOTHING && x < liveData.player.getMaxSlots())
                GUI.addButton(x, liveData.player.itemSlots[x].itype.shortName + " x" + liveData.player.itemSlots[x].quantity, this.replaceItem, itype, x);
        }
        if (source != null) {
            liveData.currentItemSlot = source;
            GUI.addButton(12, "Put Back", UTIL.createCallBackFunction(this.returnItemToInventory, itype, false));
        }
        if (showUseNow)
            GUI.addButton(13, "Use Now", this.useItemNow, itype, source);
        GUI.addButton(14, "Abandon", liveData.callOnAbandon); //Does not GUI.doNext - immediately executes the callOnAbandon function
    }
    // Returns an item to the inventory if necessary
    static returnItemToInventory(item, showNext) {
        //Used only by items that have a sub menu if the player cancels
        //Return item to inventory
        if (liveData.currentItemSlot == null) {
            this.takeItem(item, liveData.callNext, liveData.callNext); //Give player another chance to put item in inventory
        }
        else if (liveData.currentItemSlot.quantity > 0) {
            //Add it back to the existing stack
            liveData.currentItemSlot.quantity++;
        }
        else {
            //Put it back in the slot it came from
            liveData.currentItemSlot.setItemAndQty(item, 1);
        }
        //Post-process
        if (COMBAT.inCombat()) {
            outputText("<br><br>");
            COMBAT.combatRoundOver();
            return;
        }
        if (showNext)
            GUI.doNext(liveData.callNext);
        //Items with sub menus should return to the inventory screen if the player decides not to use them
        else
            liveData.callNext(); //When putting items back in your stash we should skip to the take from stash menu
    }
    // Using items before they go into the inventory, like after combat.
    static useItemNow(item, source) {
        clearOutput();
        if (item.canUse()) {
            //If an item cannot be used then canUse should provide a description of why the item cannot be used
            this.useItem(item, source);
        }
        else {
            this.takeItemFull(item, false, source); //Give the player another chance to take this item
        }
    }
    // Replacing one item with another
    static replaceItem(itype, slotNum) {
        clearOutput();
        if (liveData.player.itemSlots[slotNum].itype == itype)
            //If it is the same as what's in the slot...just throw away the new item
            outputText("You discard " + itype.longName + " from the stack to make room for the new one.");
        else {
            //If they are different...
            if (liveData.player.itemSlots[slotNum].quantity == 1)
                outputText("You throw away " + liveData.player.itemSlots[slotNum].itype.longName + " and replace it with " + itype.longName + ".");
            else
                outputText("You throw away " + liveData.player.itemSlots[slotNum].itype.longName + "(x" + liveData.player.itemSlots[slotNum].quantity + ") and replace it with " + itype.longName + ".");
            liveData.player.itemSlots[slotNum].setItemAndQty(itype, 1);
        }
        this.itemGoNext();
    }
    // Uncertain
    static itemGoNext() {
        if (liveData.callNext != null) {
            /*if (COMBAT.inCombat())
                liveData.callNext();
            else*/
            GUI.doNext(liveData.callNext);
        }
    }
    // Probably don't need this code anymore with new keyItems methods
    /*
    newKeyItemAdd(name, var1, var2, var3, var4) {
        keyItemList.push({keyName: name,
                        value1: var1,
                        value2: var2,
                        value3: var3,
                        value4: var4});
        let keySlot = keyItemList.length;
        //outputText("<br><br> DEBUGGING CODE: NEW KEYITEM FOR PLAYER is " + keyItemList[keySlot-1].keyName);
    };

    // New function to replace bad code. This goes through the Key Items array and returns the index if there's a match.

    hasKeyItem(name) {
        if (name == undefined)
            return -1;
        for (let counter = 0; counter < keyItemList.length; counter++)
            {
                outputText(counter);
                if (keyItemList[counter].keyName == ktype.value)
                    return counter;
            }
        return -1;
    };
    */
    //-----------
    // Stash Code
    //-----------
    /* An explanation of the inventory storage array.

    Player storage array is defined and initialized in liveData.player.js. Currently, it has 55 slots (0-54). The slots are divided up as follows:

    0-9 - Normal player inventory (10 slots)
    10-18 - Weapon rack inventory (9 slots)
    19-27 - Armor rack inventory (9 slots)
    28-36 - Shield rack inventory (9 slots)

    Additional slots are for extra inventory spaces that will be added once items are equipped. If you want to create more
    space for inventory slots, go into liveData.player.js and increase the number.

    Adding things this way could make it possible to use the standard take/put inventory functions, but that's a job for
    a later refactoring.
    */
    // Used to decide whether to show the stash button or not.
    static showStash() {
        // Code in Anemone Barrel, Jewelry Box, Storage Chests, and Dresser when we get that far. full code from original is:
        // return liveData.player.hasKeyItem("Equipment Rack - Weapons") >= 0 || liveData.player.hasKeyItem("Equipment Rack - Armor") >= 0 || itemStorage.length > 0 || flags[kFLAGS.ANEMONE_KID] > 0 || liveData.player.hasKeyItem("Equipment Storage - Jewelry Box") >= 0 || flags[kFLAGS.CAMP_CABIN_FURNITURE_DRESSER] > 0;
        if (liveData.gameFlags[HAS_ARMOR_RACK] == 1 || liveData.gameFlags[HAS_WEAPON_RACK] == 1 || liveData.gameFlags[HAS_EQUIPMENT_RACK] == 1) {
            return true;
        }
        else {
            return false;
        }
    }
    // Stash menu, crazy crazy stash menu
    static stashMenu() {
        GUI.hideMenus();
        clearOutput();
        //spriteSelect(-1);
        GUI.menu();
        /* Anemone Kid stuff
        if (flags[kFLAGS.ANEMONE_KID] > 0) {
            kGAMECLASS.anemoneScene.anemoneBarrelDescription();
            if (model.time.hours >= 6) GUI.addButton(4, "Anemone", kGAMECLASS.anemoneScene.approachAnemoneBarrel);
        }
        */
        /* Camp Chest Stuff
        if (liveData.player.hasKeyItem("Camp - Chest") >= 0 || liveData.player.hasKeyItem("Camp - Murky Chest") >= 0 || liveData.player.hasKeyItem("Camp - Ornate Chest") >= 0) {
            let chestArray:Array = [];
            if (liveData.player.hasKeyItem("Camp - Chest") >= 0) chestArray.push("a large wood and iron chest");
            if (liveData.player.hasKeyItem("Camp - Murky Chest") >= 0) chestArray.push("a medium damp chest");
            if (liveData.player.hasKeyItem("Camp - Ornate Chest") >= 0) chestArray.push("a medium gilded chest");
            outputText("You have " + UTIL.formatStringArray(chestArray) + " to help store excess items located ");
            if (camp.homeDesc() == "cabin") outputText("inside your cabin");
            else outputText("near the portal entrance");
            outputText(".\n\n");
            GUI.addButton(0, "Chest Store", pickItemToPlaceInCampStorage);
            if (hasItemsInStorage()) GUI.addButton(1, "Chest Take", pickItemToTakeFromCampStorage);
        }
        */
        // Weapon Rack
        if (liveData.gameFlags[HAS_WEAPON_RACK] == 1) {
            outputText("There's a weapon rack set up here, set up to hold up to nine various weapons.<br><br>");
            GUI.addButton(2, "W.Rack Put", this.pickItemWeaponRack);
            if (this.weaponRackFilled())
                GUI.addButton(3, "W.Rack Take", this.takeFromWeaponRack);
        }
        //Armor Rack
        if (liveData.gameFlags[HAS_ARMOR_RACK] == 1) {
            outputText("Your camp has an armor rack set up to hold your various sets of gear.  It appears to be able to hold nine different types of armor.<br><br>");
            GUI.addButton(5, "A.Rack Put", this.pickItemArmorRack);
            if (this.armorRackFilled())
                GUI.addButton(6, "A.Rack Take", this.takeFromArmorRack);
        }
        //Shield Rack
        if (liveData.gameFlags[HAS_EQUIPMENT_RACK] == 1) {
            outputText("There's a shield rack set up here, set up to hold up to nine various shields.<br><br>");
            GUI.addButton(7, "S.Rack Put", this.pickItemShieldRack);
            if (this.shieldRackFilled())
                GUI.addButton(8, "S.Rack Take", this.takeFromShieldRack);
        }
        /* Jewelry Box Code
                if (liveData.player.hasKeyItem("Equipment Storage - Jewelry Box") >= 0) {
                    outputText("Your jewelry box is located ");
                    if (flags[kFLAGS.CAMP_BUILT_CABIN] > 0 && flags[kFLAGS.CAMP_CABIN_FURNITURE_BED])
                    {
                        if (flags[kFLAGS.CAMP_CABIN_FURNITURE_DRESSER]) outputText("on your dresser inside your cabin.");
                        else
                        {
                            if (flags[kFLAGS.CAMP_CABIN_FURNITURE_NIGHTSTAND]) outputText("on your nightstand inside your cabin.");
                            else  outputText("under your bed inside your cabin.");
                        }
                    }
                    else outputText("next to your bedroll.");
                    GUI.addButton(10, "J.Box Put", inventory.pickItemToPlaceInJewelryBox);
                    if (inventory.jewelryBoxDescription()) GUI.addButton(11, "J.Box Take", inventory.pickItemToTakeFromJewelryBox);
                    outputText("\n\n", false);
                }*/
        /* Dresser Code
                if (flags[kFLAGS.CAMP_CABIN_FURNITURE_DRESSER] > 0) {
                    outputText("You have a dresser inside your cabin to store nine different types of undergarments.");
                    GUI.addButton(12, "Dresser Put", inventory.pickItemToPlaceInDresser);
                    if (inventory.dresserDescription()) GUI.addButton(13, "Dresser Take", inventory.pickItemToTakeFromDresser);
                    outputText("\n\n");
                }*/
        GUI.addButton(14, "Back", Camp.doCamp); //check out liveData.playerMenu too
    }
    // These next functions are used to check if things are in the stash already to make the removal buttons appear in the menu.
    // Eventually will need to add in functions for chest, jewelry box, etc.
    // TODO Test these once put code is complete
    static weaponRackFilled() {
        if (this.itemAnyInStorage(10, 18)) {
            let itemList = [];
            for (let x = 10; x < 19; x++) {
                if (liveData.player.itemSlots[x].quantity > 0)
                    itemList[itemList.length] = liveData.player.itemSlots[x].itype.longName;
                outputText("  It currently holds " + UTIL.formatStringArray(itemList) + ".");
                return true;
            }
            return false;
        }
    }
    static armorRackFilled() {
        if (this.itemAnyInStorage(19, 27)) {
            let itemList = [];
            for (let x = 19; x < 28; x++) {
                if (liveData.player.itemSlots[x].quantity > 0)
                    itemList[itemList.length] = liveData.player.itemSlots[x].itype.longName;
                outputText("  It currently holds " + UTIL.formatStringArray(itemList) + ".");
                return true;
            }
            return false;
        }
    }
    static shieldRackFilled() {
        if (this.itemAnyInStorage(28, 36)) {
            let itemList = [];
            for (let x = 28; x < 37; x++) {
                if (liveData.player.itemSlots[x].quantity > 0)
                    itemList[itemList.length] = liveData.player.itemSlots[x].itype.longName;
                outputText("  It currently holds " + UTIL.formatStringArray(itemList) + ".");
                return true;
            }
            return false;
        }
    }
    // These are used to pick an item from storage to put back into inventory
    static takeFromWeaponRack() {
        liveData.callNext = this.takeFromWeaponRack;
        this.takeFromStorage(9, 18, "rack");
    }
    static takeFromArmorRack() {
        liveData.callNext = this.takeFromArmorRack;
        this.takeFromStorage(19, 27, "rack");
    }
    static takeFromShieldRack() {
        liveData.callNext = this.takeFromShieldRack;
        this.takeFromStorage(28, 36, "rack");
    }
    // The following functions pass necessary information to this.placeInStorage for menu display.
    static pickItemWeaponRack() {
        this.placeInStorage(this.placeInWeaponRack, this.weaponAcceptable, "weapon rack", true);
    }
    static pickItemShieldRack() {
        this.placeInStorage(this.placeInShieldRack, this.shieldAcceptable, "shield rack", true);
    }
    static pickItemArmorRack() {
        this.placeInStorage(this.placeInArmorRack, this.armorAcceptable, "armor rack", true);
    }
    //function pickItemToPlaceInCampStorage() { pickItemToPlaceInStorage(placeInCampStorage, allAcceptable, "storage containers", false); };
    //function pickItemToPlaceInJewelryBox() { pickItemToPlaceInStorage(placeInJewelryBox, jewelryAcceptable, "jewelry box", true); };
    //function pickItemToPlaceInDresser() { pickItemToPlaceInStorage(placeInDresser, undergarmentAcceptable, "dresser", true); };
    // These functions test to see if the right item type is being put into the right stash.
    static allAcceptable(itype) {
        return true;
    }
    static armorAcceptable(type) {
        if (type == ITEM_TYPE_ARMOUR)
            return true;
        return false;
    }
    static weaponAcceptable(type) {
        if (type == ITEM_TYPE_WEAPON)
            return true;
        return false;
    }
    static shieldAcceptable(type) {
        if (type == ITEM_TYPE_SHIELD)
            return true;
        return false;
    }
    //function jewelryAcceptable(itype) { return itype is Jewelry; };
    //function undergarmentAcceptable(itype) { return itype is Undergarment; };
    // This function displays the menu for placing items into storage and checks player item types for storage type compatibilty.
    static placeInStorage(placeInStorageFunction, typeAcceptableFunction, text, showEmptyWarning) {
        clearOutput();
        GUI.hideUpDown();
        outputText("Which item slot do you wish to empty into your " + text + "?<br><br>");
        GUI.menu();
        let foundItem = false;
        for (let x = 0; x < 10; x++) {
            if (typeAcceptableFunction(liveData.player.itemSlots[x].itype.type) == true) {
                GUI.addButton(x, liveData.player.itemSlots[x].itype.shortName + " x" + liveData.player.itemSlots[x].quantity, placeInStorageFunction, x);
                foundItem = true;
            }
        }
        if (showEmptyWarning && !foundItem)
            outputText("\n<b>You have no appropriate items to put in your " + text + ".</b>");
        GUI.addButton(14, "Back", this.stashMenu);
    }
    /* For storage chests
    placeInCampStorage(slotNum) {
        placeIn(itemStorage, 0, itemStorage.length, slotNum);
        GUI.doNext(pickItemToPlaceInCampStorage);
    };
    */
    // For weapon rack
    static placeInWeaponRack(slotNum) {
        this.placeIn(10, 18, slotNum);
        GUI.doNext(this.pickItemWeaponRack);
    }
    // For armor rack
    static placeInArmorRack(slotNum) {
        this.placeIn(19, 27, slotNum);
        GUI.doNext(this.pickItemArmorRack);
    }
    // For shield rack
    static placeInShieldRack(slotNum) {
        this.placeIn(28, 36, slotNum);
        GUI.doNext(this.pickItemShieldRack);
    }
    /* For jewelry box
    function placeInJewelryBox(slotNum) {
        placeIn(liveData.player.Itemslots, 18, 27, slotNum);
        GUI.doNext(pickItemToPlaceInJewelryBox);
    };
    */
    /* For dresser
    function placeInDresser(slotNum) {
        placeIn(liveData.player.Itemslots, 27, 36, slotNum);
        GUI.doNext(pickItemToPlaceInDresser);
    }
    */
    // This function put the stash item into the liveData.player.itemSlots array for later retrieval
    static placeIn(startSlot, endSlot, slotNum) {
        clearOutput(); // Clear the output
        let x = startSlot; // Get the starting slot in the liveData.player.Itemslots array for our loop
        //liveData.player.itemSlots[slotNum].emptySlot(); // Empty the slot TODO Check this with multiple items
        //First, do we have that item already within the right range of liveData.player.itemSlots?
        for (x = startSlot; x < endSlot; x++) {
            //Find any slots which already hold the item that is being stored
            if (liveData.player.itemSlots[x].itype == liveData.player.itemSlots[slotNum].itype && liveData.player.itemSlots[x].quantity < 5) {
                // If there is an item of the same kind and there is less than five...
                liveData.player.itemSlots[x].quantity += 1; // Increase the quantity in the slot
                outputText("You add " + liveData.player.itemSlots[slotNum].itype.shortName + " into storage slot " + UTIL.num2Text(x + 1 - startSlot) + ".<br>"); //TODO Take out storage slot number after stash code is complete.
                liveData.player.itemSlots[slotNum].removeOneItem();
                return;
            }
        }
        //If not, let's slap it into an empty slot
        for (x = startSlot; x < endSlot; x++) {
            //Find any empty slots and put the item(s) there
            if (liveData.player.itemSlots[x].quantity == 0) {
                liveData.player.itemSlots[x].setItemAndQty(liveData.player.itemSlots[slotNum].itype, 1);
                outputText("You place " + liveData.player.itemSlots[slotNum].itype.shortName + " into storage slot " + UTIL.num2Text(x + 1 - startSlot) + ".<br>"); //TODO Take out storage slot number after stash code is complete.
                liveData.player.itemSlots[slotNum].removeOneItem();
                return;
            }
        }
        //Else, say that we are full
        outputText("There is no room for " + liveData.player.itemSlots[slotNum].itype.shortName + ". You leave it in your inventory.<br>");
        //let temp = 5 - storage[x].quantity; // Used for multiple quanties of the same item in the same slot
    }
    // This function takes an item out of storage
    static takeFromStorage(startSlot, endSlot, text = "") {
        clearOutput();
        GUI.hideUpDown();
        if (!this.itemAnyInStorage(startSlot, endSlot)) {
            //If no items are left then return to the camp menu. Can only happen if the player removes the last item.
            liveData.playerMenu();
            return;
        }
        outputText("What " + text + " slot do you wish to take an item from?");
        let button = 0;
        GUI.menu();
        for (let x = startSlot; x < endSlot; x++, button++) {
            if (liveData.player.itemSlots[x].quantity > 0)
                GUI.addButton(button, liveData.player.itemSlots[x].itype.shortName + " x" + liveData.player.itemSlots[x].quantity, this.pickFrom, x);
        }
        GUI.addButton(14, "Back", this.stashMenu);
    }
    static pickFrom(slotNum) {
        clearOutput();
        let itype = liveData.player.itemSlots[slotNum].itype;
        liveData.player.itemSlots[slotNum].removeOneItem();
        this.takeItem(itype, liveData.callNext, liveData.callNext, liveData.player.itemSlots[slotNum]);
    }
    static itemAnyInStorage(startSlot, endSlot) {
        for (let x = startSlot; x < endSlot; x++) {
            if (liveData.player.itemSlots[x].itype != Items.NOTHING)
                if (liveData.player.itemSlots[x].quantity > 0)
                    return true;
        }
        return false;
    }
}
Inventory.inventorySlotName = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"];
export { Inventory };
//# sourceMappingURL=inventory.js.map