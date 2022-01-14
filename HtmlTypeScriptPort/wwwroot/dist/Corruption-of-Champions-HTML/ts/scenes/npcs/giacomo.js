import { liveData } from "../../globalVariables";
import { FLAG } from "../../flags/dataFlags";
import { UTIL } from "../../engine/utils";
import { GUI } from "../../engine/gui";
import { StatusEffects } from "../../statusEffectLib";
import { Data } from "../../engine/saves";
import { Camp } from "../camp";
import { Items } from "../../itemClass";
import { Inventory } from "../inventory";
import { KeyItems } from "../../keyItemLib";
/* License schmicense ahead!
 LICENSE

 This license grants Fenoxo, creator of this game usage of the works of
 Dxasmodeus in this product. Dxasmodeus grants Fenoxo and the coders assigned by him to this project permission to alter the text to conform with current and new game functions, only. Dxasmodeus retains exclusive rights to alter or change the core contents of the events and no other developer may alter, change or use the events without permission from dxasmodeus. Fenoxo agrees to include Dxasmodeus' name in the credits with indications to the specific contribution made to the licensor. This license must appear
 either at the beginning or the end of the primary file in the source code and cannot be deleted by a third party. This license is also retroactive to include all versions of the game code including events created by dxasmodeus.

 DECLARATION OF OWNERSHIP

 The following events are the creative works of dxasmodeus and are covered under this license.

 Tentacle Plant Event
 Giacomo the Travelling Merchant
 All item events relating to purchases from Giacomo the Travelling Merchant
 worm colony Infestation Events

 Tentacle Plant Event and Giacomo sub-events are copyright 2010 by Dxasmodeus.
 worm colony Events are copyright 2011 by dxasmodeus.

 THIRD PARTY USAGE

 As Fenoxo has made his game code open source, this license DOES NOT transfer to a third party developer. The events created by Dxasmodeus may not be used in whole or in part without permission and license from Dxasmodeus. Dxasmodeus reserves the sole and exclusive right to grant third party licenses of copyrighted scenarios.

 For further information and license requests, Dxasmodeus may be contacted through private message at the Futanari Palace. http://www.futanaripalace.com/forum.php. */
Data.addToGameFlags(FLAG.GIACOMO_MET, FLAG.GIACOMO_WORMS_OFFERED);
class GiacomoScene {
    static giacomoEncounter() {
        GUI.displaySprite("giacomo");
        GUI.clearOutput();
        if (liveData.gameFlags[FLAG.GIACOMO_MET] == 0) {
            this.firstEncounter();
        }
        else if (liveData.gameFlags[FLAG.GIACOMO_WORMS_OFFERED] == 0 && liveData.player.findStatusEffect(StatusEffects.Infested) >= 0) {
            //If infested && no worm offer yet
            GUI.outputText("Upon walking up to Giacomo's wagon, he turns to look at you and cocks an eyebrow in curiosity and mild amusement.<br><br>");
            GUI.outputText('"<i>Been playing with creatures best left alone, I see</i>," he chuckles. "<i>Infestations of any kind are annoying, yet your plight is quite challenging given the magnitude of corrupt creatures around here. It is not the first time I have seen one infested with THOSE worms.</i>"<br><br>');
            GUI.outputText("You ask how he knows of your change and the merchant giggles heartily.<br><br>");
            GUI.outputText('"<i>Do not look at me as if I am a mystic,</i>" Giacomo heckles lightly. "<i>Your crotch is squirming.</i>"<br><br>');
            GUI.outputText("Looking down, you realize how right he is and attempt to cover yourself in embarrassment.<br><br>");
            GUI.outputText('"<i>Fear not!</i>" the purveyor jingles. "<i>I have something that will cure you of those little bastards. Of course, there is also a chance that it will purge your system in general. This potion is not cheap. I will trade it for 175 gems.</i>"<br><br>');
            liveData.gameFlags[FLAG.GIACOMO_WORMS_OFFERED] = 1;
            if (liveData.player.gems < 175) {
                //Broke as a joke
                GUI.outputText("You realize you don't have enough gems for such a pricey potion, but perhaps there is something else in his inventory you can buy.");
            }
            else {
                //Can afford
                GUI.outputText("Do you purchase his cure?");
                //Remove/No
                GUI.doYesNo(this.wormRemoval, this.giacomoEncounter);
                return;
            }
        }
        else {
            //Normal greeting
            GUI.outputText("You spy the merchant Giacomo in the distance. He makes a beeline for you, setting up his shop in moments. ");
            GUI.outputText("Giacomo's grin is nothing short of creepy as he offers his wares to you. What are you interested in?");
        }
        GUI.menu();
        GUI.addButton(0, "Potions", this.potionMenu);
        GUI.addButton(1, "Books", this.bookMenu);
        GUI.addButton(2, "Erotica", this.eroticaMenu);
        GUI.addButton(3, "Worm Cure", this.wormRemovalOffer);
        GUI.addButton(4, "Leave", Camp.returnToCampUseOneHour);
    }
    static firstEncounter() {
        GUI.outputText("As you travel, you see another person on the road. He is tethered to a small cart that is overloaded with a hodgepodge of items. He is dressed in a very garish manner, having a broad, multicolored hat, brocaded coat and large, striped pantaloons. His appearance is almost comical and contrasts with his severe and hawkish facial features. The man sees you, smiles and stops his cart.<br>");
        GUI.outputText('"<i>Greetings, traveler! My name is Giacomo. I am, as you can see, a humble purveyor of items, curios and other accoutrements. While I am not in a position to show you my full wares as my shop is packed on this push-cart, I do offer some small trinkets for travelers I meet.</i>"<br><br>');
        GUI.outputText("The merchant looks at you sharply and cracks a wide, toothy smile you find... unnerving. The merchant twists his way around to access a sack he has around his back. After a moment, he swings the sack from his back to have better access to its contents. Inquisitively, the merchant turns back to you.<br>");
        GUI.outputText('"<i>So stranger, be you interested in some drafts to aid you in your travels, some quick pamphlets to warn you of dangers on journeys or...</i>"<br><br>');
        GUI.outputText("Giacomo pauses and turns his head in both directions in a mocking gesture of paranoid observation. His little bit of theatrics does make you wonder what he is about to offer.<br>");
        GUI.outputText('"<i>...maybe you would be interested in some items that enhance the pleasures of the flesh? Hmmm?</i>"<br><br>');
        GUI.outputText("Giacomo's grin is nothing short of creepy as he offers his wares to you. What are you interested in?");
        liveData.gameFlags[FLAG.GIACOMO_MET] = 1;
    }
    //------------
    // MENUS
    //------------
    static potionMenu() {
        GUI.clearOutput();
        GUI.outputText("Which potion or tincture will you examine?");
        GUI.menu();
        GUI.addButton(0, "Vitality T.", this.pitchVitailtyTincture);
        GUI.addButton(1, "Scholars T.", this.pitchScholarsTea);
        //GUI.addButton(2, "Cerulean P.", this.pitchCeruleanPotion);
        GUI.addButton(4, "Back", this.giacomoEncounter);
    }
    static bookMenu() {
        GUI.clearOutput();
        GUI.outputText("Which book are you interested in perusing?");
        GUI.menu();
        GUI.addButton(0, "Dangerous Plants", this.pitchDangerousPlantsBook);
        GUI.addButton(1, "Traveler's Guide", this.pitchTravellersGuide);
        GUI.addButton(2, "Hentai Comic", this.pitchHentaiComic);
        GUI.addButton(3, "Yoga Guide", this.pitchYogaGuide);
        GUI.addButton(4, "Back", this.giacomoEncounter);
    }
    static eroticaMenu() {
        GUI.clearOutput();
        GUI.outputText("Giacomo's grin is nothing short of creepy as he offers his wares to you. What are you interested in?");
        GUI.menu();
        GUI.addButton(0, "Dildo", this.pitchDildo);
        if (liveData.player.hasVagina())
            GUI.addButton(1, "Stim-Belt", this.pitchSelfStimulationBelt);
        if (liveData.player.hasVagina())
            GUI.addButton(2, "AN Stim-Belt", this.pitchAllNaturalSelfStimulationBelt);
        if (liveData.player.hasCock())
            GUI.addButton(3, "Onahole", this.pitchOnahole);
        if (liveData.player.hasCock())
            GUI.addButton(4, "D Onahole", this.pitchDeluxeOnahole);
        if (liveData.player.hasCock() && liveData.player.hasVagina())
            GUI.addButton(5, "Dual Belt", this.pitchDualStimulationBelt);
        if (liveData.player.hasCock() && liveData.player.hasVagina())
            GUI.addButton(6, "AN Onahole", this.pitchAllNaturalOnahole);
        GUI.addButton(7, "Condom", this.pitchCondom);
        GUI.addButton(14, "Back", this.giacomoEncounter);
    }
    //------------
    // CONSUMABLES
    //------------
    static pitchVitailtyTincture() {
        GUI.clearOutput();
        GUI.outputText("Giacomo holds up the item and says, \"<i>Ah, yes! The quintessential elixir for all travelers, this little bottle of distilled livelihood will aid you in restoring your energy on your journey and, should you be hurt or injured, will aid the body's ability to heal itself. Yes " +
            liveData.player.mf("sir", "madam") +
            ', this is liquid gold for pilgrim and adventurer alike. Interested? It is <b>15 gems</b></i>." ');
        GUI.doYesNo(this.buyVitailtyTincture, this.potionMenu);
    }
    static buyVitailtyTincture() {
        if (liveData.player.gems < 15) {
            GUI.clearOutput();
            GUI.outputText("<br><br>Giacomo sighs, indicating you need " + UTIL.num2Text(15 - liveData.player.gems) + " more gems to purchase this item.");
            GUI.doNext(this.potionMenu);
        }
        else {
            liveData.player.changeGems(-15);
            Inventory.takeItem(Items.Consumables.VitalityTincture, this.potionMenu);
        }
    }
    static pitchScholarsTea() {
        GUI.clearOutput();
        GUI.outputText('Giacomo holds up a pouch of dried, fragrant leaves and begins his spiel, "<i>Have you ever wondered how scholars and other smart folk keep up such a mental effort for so long? They make a tea out of this fine mixture of quality plants and herbs. Nothing but the best, this mysterious mixture of herbs in its Orange Pekoe base makes anyone, short of a lummox, as brainy as the finest minds of the land. All you do is steep the leaves in some water and drink up! Hot or cold, straight or sweetened with honey, your mind will run circles around itself once it has this for fuel. Buy it now and I will throw in the strainer for free! Interested? Only <b>15 gems</b>!</i>" ');
        GUI.doYesNo(this.buyScholarsTea, this.potionMenu);
    }
    static buyScholarsTea() {
        if (liveData.player.gems < 15) {
            GUI.clearOutput();
            GUI.outputText("<br><br>Giacomo sighs, indicating you need " + UTIL.num2Text(15 - liveData.player.gems) + " more gems to purchase this item. ");
            GUI.doNext(this.potionMenu);
        }
        else {
            liveData.player.changeGems(-15);
            Inventory.takeItem(Items.Consumables.ScholarsTea, this.potionMenu);
        }
    }
    // static pitchCeruleanPotion() {
    //     GUI.clearOutput()
    //     GUI.outputText(
    //         "Giacomo makes his comical over-the-shoulder search and holds up a sky-blue bottle. He grins widely as he begins his pitch, \"<i>My friend, you truly have a discerning eye. Even the most successful of men seek to attract more women for pleasure and status. This, my friend, will attract the most discerning and aroused of women. Women attracted by this fine unction will NEVER say no. I GUARANTEE that she will want pleasure every time you demand pleasure! A bit of a caution to you, brother. Some say this works TOO well. If you aren't man enough to handle the women this urn draws to you, you'd best say so now and I will offer something more to your liking. However, if you have the heart for it, I can sell you this little gem for <b>75 gems</b></i>!\" "
    //     )
    //     GUI.doYesNo(this.buyCeruleanPotion, this.potionMenu)
    // }
    // static buyCeruleanPotion() {
    //     if (liveData.player.gems < 75) {
    //         GUI.clearOutput()
    //         GUI.outputText("<br><br>Giacomo sighs, indicating you need " + UTIL.num2Text(75 - liveData.player.gems) + " more gems to purchase this item.")
    //         GUI.doNext(this.potionMenu)
    //     } else {
    //         liveData.player.changeGems(-75)
    //         Inventory.takeItem(Items.Consumables.CeruleanPotion, this.potionMenu)
    //     }
    // }
    static pitchCondom() {
        GUI.outputText('Giacomo holds up the packet and says, "<i>Ah, yes! This is a condom. Just slip it on any cocks and have it penetrate any holes. It\'s guaranteed to prevent the spread of STDs and it will help to prevent pregnancy. I must warn you that it does not completely prevent pregnancy. Rarely, it will fail. However, it will work most of the time. So, <b>two gems</b>. What do you say?</i>"');
        GUI.doYesNo(this.buyCondom, this.eroticaMenu);
    }
    static buyCondom() {
        if (liveData.player.gems < 2) {
            GUI.outputText("<br><br>Giacomo sighs, indicating you need " + UTIL.num2Text(5 - liveData.player.gems) + " more gems to purchase this item.");
            GUI.doNext(this.eroticaMenu);
        }
        else {
            liveData.player.changeGems(-2);
            Inventory.takeItem(Items.Consumables.Condom, this.eroticaMenu);
        }
    }
    //------------
    // BOOKS
    //------------
    static pitchDangerousPlantsBook() {
        GUI.clearOutput();
        if (liveData.player.hasKeyItem(KeyItems.BookDangerousPlants) >= 0) {
            GUI.outputText("<b>You already own the book 'Dangerous Plants'.</b>");
            GUI.doNext(this.bookMenu);
            return;
        }
        GUI.outputText('Giacomo proudly holds up a small text. The cover is plain and unadorned with artwork. "<i>According to the scholars,</i>" Giacomo begins, "<i>knowledge is power. It is one of the few things that scholars say that I agree with. You cannot survive in today\'s world without knowing something of it. Beasts and men are not your only problems. This book specializes in the dangerous plants of the realm. There exists flora the likes of which will chew you up and spit you out faster than any pack of wolves or gang of thieves. For the small price of 10 gems, you can benefit from this fine book on the nastiest blossoms in existence. Care to broaden your learning?</i>"');
        GUI.doYesNo(this.buyDangerousPlantsBook, this.bookMenu);
    }
    static buyDangerousPlantsBook() {
        GUI.clearOutput();
        if (liveData.player.gems < 10) {
            GUI.outputText("<br><br>Giacomo sighs, indicating you need " + UTIL.num2Text(10 - liveData.player.gems) + " more gems to purchase this item.");
        }
        else {
            GUI.outputText("<br><br>You consider yourself fortunate to be quite literate in this day and age. It certainly comes in handy with this book. Obviously written by well-informed, but women-starved men, the narrative drearily states the various types of poisonous and carnivorous plants in the world. One entry that really grabs you is the chapter on 'Violation Plants'. The chapter drones on about an entire classification of specially bred plants whose purpose is to torture or feed off a human being without permanently injuring and killing them. Most of these plants attempt to try breeding with humans and are insensitive to the intricacies of human reproduction to be of any value, save giving the person no end of hell. These plants range from massive shambling horrors to small plant-animal hybrids that attach themselves to people. As you finish the book, you cannot help but shiver at the many unnatural types of plants out there and wonder what sick bastard created such monstrosities. ");
            liveData.player.changeGems(-10);
            liveData.player.createKeyItem(KeyItems.BookDangerousPlants, 0, 0, 0, 0);
        }
        GUI.doNext(this.bookMenu);
    }
    static pitchTravellersGuide() {
        GUI.clearOutput();
        if (liveData.player.hasKeyItem(KeyItems.BookTravelGuide) >= 0) {
            GUI.outputText("<b>You already own the book 'Traveler's Guide'.</b>");
            GUI.doNext(this.bookMenu);
            return;
        }
        GUI.outputText('Giacomo holds up a humble pamphlet. "<i>While you may not find value in this as a seasoned traveler,</i>", Giacomo opens, "<i>you never know what you may learn from this handy, dandy information packet! Geared to the novice, this piece of work emphasizes the necessary items and some good rules of thumb for going out into the world. You may not need it, but you may know someone who does. Why waste your time when the answers could be in this handy pamphlet! I will offer the super-cheap price of 1 gem!</i>"');
        GUI.doYesNo(this.buyTravellersGuide, this.bookMenu);
    }
    static buyTravellersGuide() {
        GUI.clearOutput();
        if (liveData.player.gems < 1) {
            GUI.outputText("<br><br>Giacomo sighs, indicating you need 1 gem to purchase this item.");
        }
        else {
            GUI.outputText("The crazy merchant said you might not need this and he was right. Written at a simple level, this was obviously intended for a city-dweller who never left the confines of their walls. Littered with childish illustrations and silly phrases, the book is informative in the sense that it does tell a person what they need and what to do, but naively downplays the dangers of the forest and from bandits. Were it not so cheap, you would be pissed at the merchant. However, he is right in the fact that giving this to some idiot ignorant of the dangers of the road saves time from having to answer a bunch of stupid questions.");
            liveData.player.changeGems(-1);
            liveData.player.createKeyItem(KeyItems.BookTravelGuide, 0, 0, 0, 0);
        }
        GUI.doNext(this.bookMenu);
    }
    static pitchHentaiComic() {
        GUI.clearOutput();
        if (liveData.player.hasKeyItem(KeyItems.BookHentaiComic) >= 0) {
            GUI.outputText("<b>You already own a Hentai Comic!</b>");
            GUI.doNext(this.bookMenu);
            return;
        }
        GUI.outputText('Giacomo takes out a colorfully written magazine from his bag. The cover contains well-drawn, overly-endowed women in sexual poses. "<i>Perhaps your taste in reading is a bit more primal, my good ' +
            liveData.player.mfn("man", "lady", "...err, whatever you are") +
            '</i>," says Giacomo. "<i>Taken from the lands far to the east, this is a tawdry tale of a group of ladies seeking out endless pleasures. With a half a dozen pictures on every page to illustrate their peccadilloes, you will have your passions inflamed and wish to join these fantasy vixens in their adventures! Collectable and in high demand, and even if this is not to your tastes, you can easily turn a profit on it! Care to adventure into the realm of fantasy? It\'s only 10 gems and I am doing YOU a favor for such a price.</i>"');
        GUI.doYesNo(this.buyHentaiComic, this.bookMenu);
    }
    static buyHentaiComic() {
        GUI.clearOutput();
        if (liveData.player.gems < 10) {
            GUI.outputText("<br><br>Giacomo sighs, indicating you need " + UTIL.num2Text(10 - liveData.player.gems) + " more gems to purchase this item.");
        }
        else {
            GUI.outputText("You peruse the erotic book. The story is one of a group of sisters who are all impossibly heavy-chested and equally horny getting into constant misadventures trying to satisfy their lust. While the comic was entertaining and erotic to the highest degree, you cannot help but laugh at how over-the-top the story and all of the characters are. Were the world as it was in the book, nothing would get done as humanity would be fucking like jackrabbits in heat for the rest of their lives. While certainly a tempting proposition, everyone gets worn out sometime. You place the book in your sack, well entertained and with a head filled with wilder perversions than what you woke up with this morning. ");
            liveData.player.modStats(["lib", 2]);
            liveData.player.changeLust(20, true);
            liveData.player.changeGems(-10);
            liveData.player.createKeyItem(KeyItems.BookHentaiComic, 0, 0, 0, 0);
        }
        GUI.doNext(this.bookMenu);
    }
    static pitchYogaGuide() {
        GUI.clearOutput();
        if (liveData.player.hasKeyItem(KeyItems.BookYogaGuide) >= 0) {
            GUI.outputText("<b>You already own a yoga guide!</b>");
            GUI.doNext(this.bookMenu);
            return;
        }
        GUI.outputText('Giacomo holds up the book with a small degree of reverence. The cover is leather, with the lettering stitched in by hand. "<i>This, my friend,</i>" begins Giacomo, "<i>is a strange book indeed. I traded for it in the east, where they practice a form of exercise known as yoga. This volume in particular deals with those of, shall we say, unusual body shapes. Because of its rarity and usefulness, I simply cannot let it go for less than 100 gems and believe me, at this price I\'m practically cutting my own throat. Care to broaden your horizons?</i>"');
        GUI.doYesNo(this.buyYogaGuide, this.bookMenu);
    }
    static buyYogaGuide() {
        GUI.clearOutput();
        if (liveData.player.gems < 100) {
            GUI.outputText("<br><br>Giacomo sighs, indicating you need " + UTIL.num2Text(100 - liveData.player.gems) + " more gems to purchase this item.");
        }
        else {
            GUI.outputText("You exchange 100 gems for the tome.");
            liveData.player.changeGems(-100);
            liveData.player.createKeyItem(KeyItems.BookYogaGuide, 0, 0, 0, 0);
        }
        GUI.doNext(this.bookMenu);
    }
    //------------
    // TOYS
    //------------
    static pitchDildo() {
        GUI.clearOutput();
        if (liveData.player.hasKeyItem(KeyItems.ToyDildo) >= 0) {
            GUI.outputText("<b>You already own a Dildo!</b>");
            GUI.doNext(this.eroticaMenu);
            return;
        }
        GUI.outputText("Giacomo takes out a slender tube roughly over half a foot in length. \"<i>Since you seek pleasure, this is as simple and effective as it gets. This dildo is a healthy seven inches long and is suitable for most women and even adventurous men. Pick a hole, stick it in and work it to your heart's content or your partner's pleasure. The single-piece construction makes it solid, sturdy and straightforward. For 20 gems, you can take matters into your own hands. How about it?</i>\"");
        GUI.doYesNo(this.buyDildo, this.eroticaMenu);
    }
    static buyDildo() {
        GUI.clearOutput();
        if (liveData.player.gems < 20) {
            GUI.outputText("<br><br>Giacomo sighs, indicating you need " + UTIL.num2Text(20 - liveData.player.gems) + " more gems to purchase this item.");
        }
        else {
            GUI.outputText("After making the payment, Giacomo hands you the Dildo");
            liveData.player.changeGems(-20);
            liveData.player.createKeyItem(KeyItems.ToyDildo, 0, 0, 0, 0);
        }
        GUI.doNext(this.eroticaMenu);
    }
    static pitchSelfStimulationBelt() {
        GUI.clearOutput();
        if (liveData.player.hasKeyItem(KeyItems.ToyStimBelt) >= 0) {
            GUI.outputText("<b>You already own a Self-Stimulation Belt!</b>");
            GUI.doNext(this.eroticaMenu);
            return;
        }
        GUI.outputText('Giacomo holds up what appears to be a chastity belt. However, this device has a dildo attached to the inside. There is a small gearbox on the outside and a wind-up key is tethered to it. The crazed merchant holds the contraption up and begins his liturgy. "<i>Ah! Someone who both appreciates pleasure AND the wonders of artifice. This naughty little piece of jewelry is designed to pleasure any woman all at the push of a button! All you do is take this key, wind up the gear box...</i>" Giacomo takes the key and inserts it into the box and winds it like a watch. He then points to a switch. "<i>...you then press this button and enjoy yourself!</i>" Giacomo flips the switch and the dildo vibrates rapidly. The distinct hum from the toy and the whirring of gears stirs your imagination. Giacomo pipes up, breaking your train of thought. "<i>This belt is not cheap, but it is most certainly worth the investment of 30 gems!</i>"');
        GUI.doYesNo(this.buySelfStimulationBelt, this.eroticaMenu);
    }
    static buySelfStimulationBelt() {
        GUI.clearOutput();
        if (liveData.player.gems < 30) {
            GUI.outputText("<br><br>Giacomo sighs, indicating you need " + UTIL.num2Text(30 - liveData.player.gems) + " more gems to purchase this item.");
        }
        else {
            GUI.outputText("After making the payment, Giacomo hands you the Self-Stimulation Belt");
            liveData.player.changeGems(-30);
            liveData.player.createKeyItem(KeyItems.ToyStimBelt, 0, 0, 0, 0);
            GUI.doNext(this.eroticaMenu);
        }
        GUI.doNext(this.eroticaMenu);
    }
    static pitchAllNaturalSelfStimulationBelt() {
        GUI.clearOutput();
        if (liveData.player.hasKeyItem(KeyItems.ToyANBelt) >= 0) {
            GUI.outputText("<b>You already own an All-Natural Self-Stimulation Belt!</b>");
            GUI.doNext(this.eroticaMenu);
            return;
        }
        GUI.outputText("The merchant places his bag on the ground. He reaches into one of his purses and pulls out a pair of gloves. After putting them on, he reaches into his bag and pulls out what appears to be a chastity belt. The device has a clearly organic look to it. In the center of the front cover is a nodule. You have heard of similar devices. They normally have a dildo attached to them to pleasure women. ");
        GUI.outputText('"<i>This device is quite intriguing,</i>" Giacomo begins, "<i>This pleasure engine is NOT for the faint-of-heart. Being constructed of materials from the workshops of biomechanical artificers, this device outperforms its mechanical cousin in every way. Guaranteed to last longer than you do, this machine will give you as many mind-shattering orgasms as you can handle. Unlike the mechanical belt, you do not need to wind it up. It soaks up the power of the sun itself in an amazing feat of engineering. Four hours a day is all it needs! Keep in mind that if there is no sun for a couple of days, it will not work without a full day\'s sunshine. You may wonder why I am wearing gloves. Well, that is because of the pads on the belt.</i>" Giacomo points to a couple of small, amber pads on the belt. "<i>They are sensitive to human touch and activate the belt. This is all yours for 40 gems and you get the gloves for free! Again, this device offers ultimate pleasure. If you can\'t handle it, I will not be offended if you turn it down.</i>"');
        if (liveData.player.hasKeyItem(KeyItems.BookDangerousPlants) >= 0 && liveData.player.inte > 39) {
            GUI.outputText("<br><br>The nodule and the base of the stimulator look vaguely like some of the things you have seen in the Dangerous Plant book. You wonder if there is not something devious about this item. Giacomo is also sweating. It is too cool for that, this time of year.");
        }
        else {
            if (liveData.player.inte > 29) {
                GUI.outputText("<br><br>You notice a change in Giacomo's attitude. He REALLY wants to sell you this sex toy. Something this exotic should cost much more than what he is offering.");
            }
        }
        GUI.outputText("<br><br>Do you buy the All-Natural Self-Stimulation Belt?");
        GUI.doYesNo(this.buyAllNaturalSelfStimulationBelt, this.eroticaMenu);
    }
    static buyAllNaturalSelfStimulationBelt() {
        GUI.clearOutput();
        if (liveData.player.gems < 40) {
            GUI.outputText("<br><br>Giacomo sighs, indicating you need " + UTIL.num2Text(40 - liveData.player.gems) + " more gems to purchase this item.");
        }
        else {
            GUI.outputText("After making the payment, Giacomo hands you the All-Natural Self-Stimulation Belt");
            liveData.player.changeGems(-40);
            liveData.player.createKeyItem(KeyItems.ToyANBelt, 0, 0, 0, 0);
        }
        GUI.doNext(this.eroticaMenu);
    }
    static pitchOnahole() {
        GUI.clearOutput();
        if (liveData.player.hasKeyItem(KeyItems.ToyOnahole) >= 0) {
            GUI.outputText("<b>You already own a Plain Onahole!</b>");
            GUI.doNext(this.eroticaMenu);
            return;
        }
        GUI.outputText('Giacomo takes out a pink cylinder from his bag. It appears to be sealed at one end and the cap is topped with a piece of rubber that has a vertical slit. "<i>Friend</i>," Giacomo starts, "<i>when you do not want to go through all of the shit to bag a woman, this is the thing for you. It never says no, it never bitches and it never takes everything you own in a divorce. All you do is get hard, slip your cock in the slit, work it at your pace and unload. Simple is as simple does. Take the top off for easy clean up and there you go! As you can see it is portable and is much safer than risking some social disease from an errant barmaid. I have plenty of these in stock and I can let it go for 20 gems. What say you?</i>"');
        GUI.doYesNo(this.buyOnahole, this.eroticaMenu);
    }
    static buyOnahole() {
        GUI.clearOutput();
        if (liveData.player.gems < 20) {
            GUI.outputText("<br><br>Giacomo sighs, indicating you need " + UTIL.num2Text(20 - liveData.player.gems) + " more gems to purchase this item.");
        }
        else {
            GUI.outputText("After making the payment, Giacomo hands you the Plain Onahole");
            liveData.player.changeGems(-20);
            liveData.player.createKeyItem(KeyItems.ToyOnahole, 0, 0, 0, 0);
        }
        GUI.doNext(this.eroticaMenu);
    }
    static pitchDeluxeOnahole() {
        GUI.clearOutput();
        if (liveData.player.hasKeyItem(KeyItems.ToyDeluxeOnahole) >= 0) {
            GUI.outputText("<b>You already own a Deluxe Onahole!</b>");
            GUI.doNext(this.eroticaMenu);
            return;
        }
        GUI.outputText("Giacomo holds up a weirdly shaped lump of rubber. One end is shaped and contoured like a woman's genitalia while the rest stretches out to almost a foot long. \"<i>This thing right here is excellent! While a standard onahole will get you off, this has the look and feel of the real thing! As you can see, the outside orifice looks just like a woman's privates and,</i>\" Giacomo pauses to open the inside for you to view. You see the inner folds and curves that are typical to the inside of a woman's womb, \"<i>as you can see, great care has been taken to make the inside feel as much like a real pussy as possible. You hammer your cock with this thing a few times and you may never want the real thing again! If nothing else, it won't whine about you running out the door first thing in the morning. 50 gems is more than reasonable for all of the satisfaction this will bring.</i>\"");
        GUI.doYesNo(this.buyDeluxeOnahole, this.eroticaMenu);
    }
    static buyDeluxeOnahole() {
        GUI.clearOutput();
        if (liveData.player.gems < 50) {
            GUI.outputText("<br><br>Giacomo sighs, indicating you need " + UTIL.num2Text(50 - liveData.player.gems) + " more gems to purchase this item.");
        }
        else {
            GUI.outputText("After making the payment, Giacomo hands you the Deluxe Onahole");
            liveData.player.changeGems(-50);
            liveData.player.createKeyItem(KeyItems.ToyDeluxeOnahole, 0, 0, 0, 0);
        }
        GUI.doNext(this.eroticaMenu);
    }
    static pitchAllNaturalOnahole() {
        GUI.clearOutput();
        if (liveData.player.hasKeyItem(KeyItems.ToyANOnahole) >= 0) {
            GUI.outputText("<b>You already own an All-Natural Onahole!</b>");
            GUI.doNext(this.eroticaMenu);
            return;
        }
        GUI.outputText("Giacomo reaches into his bag and pulls out what looks like an oblong coconut. It is roughly seven inches in diameter. There is a distinctive opening in one end that is just large enough for an erect penis. Inside the opening you see what looks like two pink cushions. There are multiple symmetrical depressions surrounding the outside hole of the thing. Giacomo's smile fades and he takes on a much more serious attitude befitting his aquiline face. \"<i>" +
            liveData.player.mf("Sir", "Miss") +
            ',</i>" Giacomo states, "<i>without sounding too bold, it is no secret that members of the third gender are capable of sexual feats that force the other two genders into jealous fits. Having bigger cocks than men, cumming more than an elephant and a pussy with the strength and coordination of a human hand, regular toys do not last long for you folk. Hence, this little beasty. I will tell you straightaway, only the third sex can handle this toy. ');
        GUI.outputText("The other two genders simply do not have the stamina for it. This thing is all-natural, meaning that it powers itself and is made with the Artificers' organic methods. It will cease functioning if it is not used or you fail to give the opening a few drops of this fluid once every three days.</i>\" Giacomo pauses to hold up a small bottle. He places the bottle down and continues his sales pitch, \"<i>If you plan on not using this thing regularly, do not buy it. These items are very rare and this one will probably be the only one you'll ever see. Normally I pitch my products like crazy. However, with this I do not need to. This thing DOES work too well, and you WILL cum, period. It will work you until you do not want it to work anymore. It will not stop until IT decides to stop. However, for the extreme needs of a lovely example of the dual-sex, it may be the very thing you need. Again, this is for the ultimate hardcore pleasure seeker amongst the ultimate hardcore. It costs a humble 150 gems, but for superhuman thrills, who can put a price tag on that?</i>");
        if (liveData.player.hasKeyItem(KeyItems.BookDangerousPlants) >= 0 && liveData.player.inte > 35) {
            GUI.outputText('<br><br>While skillfully avoiding Giacomo\'s suspicion, you correctly surmise that the toy is not a toy at all. It is the outer shell for a hybrid animal-plant. The creature is very much alive. While the technical name for this beast is in the usual unpronounceable scholastic gibberish, the common nickname for this is the "All-Day Sucker". It gets its name due to the fact that its diet consists of high nutrient fluids, especially semen. It was used both as a torture device and as a pleasure pet of the snobbish elite because it would clamp down upon the member of a person and not release until it has stimulated the person enough to ejaculate sufficiently to feed. However, the All-Day Sucker swells up like fleas and ticks do, thus requiring hours of stimulation to have its fill. There was something else about these things, but you cannot remember exactly what it was.');
            if (liveData.player.inte > 65) {
                GUI.outputText('After a moment, you remember what it was you read. Unlike many simple beasts, this creature has a male and a female gender. The creature itself is similar to a tubeworm. While the males are considered reasonably "safe", the females have a nasty habit of injecting its young inside the sex organs of the person using the thing, leaving the hapless person to convulse in endless, painful orgasms as the beasties wriggle around their insides until they are ready for birth. The process takes about a week and recorded victims normally make full recoveries after a period of blindingly painful orgasms as they shoot out the young. It is not a surprise to have people\'s hearts give out at the endless stimulation from the young. The recovery time is quite long due to the stress on the body such overwhelming stimulus would generate. Some ultra-extreme pleasure seekers actively look for these things just for this experience.<br><br>However, the problem is there is NO WAY to tell if this is male or female by looking at it.');
            }
        }
        GUI.doYesNo(this.buyAllNaturalOnahole, this.eroticaMenu);
    }
    static buyAllNaturalOnahole() {
        GUI.clearOutput();
        if (liveData.player.gems < 150) {
            GUI.outputText("<br><br>Giacomo sighs, indicating you need " + UTIL.num2Text(150 - liveData.player.gems) + " more gems to purchase this item.");
        }
        else {
            GUI.outputText("After making the payment, Giacomo hands you the All-Natural Onahole");
            liveData.player.changeGems(-150);
            liveData.player.createKeyItem(KeyItems.ANOnahole, 0, 0, 0, 0);
        }
        GUI.doNext(this.eroticaMenu);
    }
    static pitchDualStimulationBelt() {
        GUI.clearOutput();
        if (liveData.player.hasKeyItem(KeyItems.ToyDualBelt) >= 0) {
            GUI.outputText("<b>You already own a Dual Belt!</b>");
            GUI.doNext(this.eroticaMenu);
            return;
        }
        GUI.outputText('Giacomo smiles widely as you look through his wares seeing a strange looking device sitting there. "<i>Ahh, I see you have spotted our latest piece of equipment. Members of the third gender had a hard time finding enough pleasure to suit their special needs. With this little device, you will never have to worry about satisfying your needs ever again.</i>" He grins widely at you. "<i>The deluxe dual belt will have you shaking in the throes of orgasm hours after a simple stim belt would leave you dry. You will cum in this thing, and it will leave you running back to it anytime you need sexual gratification. Everything else may as well be sandpaper on your skin. Simply flick this switch here on the side to start it up and send yourself to heaven. And you can have it for the low price of 50 gems.</i>" He smiles again at you. "<i>So, shall I hand it over to you?</i>" he asks.');
        GUI.doYesNo(this.buyDualStimulationBelt, this.eroticaMenu);
    }
    static buyDualStimulationBelt() {
        GUI.clearOutput();
        if (liveData.player.gems < 50) {
            GUI.outputText("<br><br>Giacomo sighs, indicating you need " + UTIL.num2Text(50 - liveData.player.gems) + " more gems to purchase this item.");
        }
        else {
            GUI.outputText('You are a bit dubious at the pleasure it could offer you, but it would be better than being raped by the creatures constantly... maybe to even work out some excess lusts... hesitantly, you reach into your bag and grab 50 gems, handing it to him. He greedily snatches it from your palm and hands you with the belt with a smile. "<i>I promise you won\'t be disappointed.</i>" He counts the gems and waves goodbye.<br><br>(<b>Dual Belt acquired!</b>)');
            liveData.player.changeGems(-150);
            liveData.player.createKeyItem(KeyItems.ToyDualBelt, 0, 0, 0, 0);
        }
        GUI.doNext(this.eroticaMenu);
    }
    static wormRemovalOffer() {
        GUI.clearOutput();
        GUI.outputText('<br><br>"<i>Been playing with creatures best left alone, I see</i>", he chuckles, "<i>Infestations of any kind are annoying, yet your plight is quite challenging given the magnitude of corrupt creatures around here. It is not the first time I have seen one infested with THOSE worms.</i>"<br><br>');
        GUI.outputText("You ask how he knows of your change and the merchant giggles heartily.<br><br>");
        GUI.outputText('"<i>Do not look at me as if I am a mystic.</i>", Giacomo heckles lightly. "<i>Your crotch is squirming.</i>"<br><br>');
        GUI.outputText("Looking down, you realize how right he is and attempt to cover yourself in embarrassment.<br><br>");
        GUI.outputText('"<i>Fear not!</i>", the purveyor jingles. "<i>I have something that will cure you of those little bastards. Of course, there is also a chance that it will purge your system in general. This potion is not cheap. I will trade it for 175 gems.</i>"<br><br>');
        //Broke as a joke
        if (liveData.player.gems < 175) {
            GUI.outputText("You realize you don't have enough gems for such a pricey potion, but perhaps there is something else in his inventory you can buy.");
            GUI.doNext(this.giacomoEncounter);
        }
        //Can afford
        else {
            GUI.outputText("Do you purchase his cure?");
            //Remove/No
            GUI.doYesNo(this.wormRemoval, this.giacomoEncounter);
        }
    }
    static wormRemoval() {
        GUI.clearOutput();
        GUI.outputText("You toss the gems at the merchant, who calmly hands you the bottle. Gulping down the liquid, your guts light up as if you swallowed fire. Pain overwhelms your body and you drop to your knees convulsing. You curse the merchant for poisoning you, yet you can only choke out gibberish through your groans. The pain quickly focuses from your stomach to your crotch as the worms inside you are clearly NOT happy with what you have done. You fall onto your back as the thrashing overwhelms you. With an unexpected climax, every worm in your body fights to escape your gonads. The fat worm that resided deep in your sex lazily pushes itself out last.<br><br>");
        GUI.outputText("Upon seeing the fat worm, Giacomo displays a freakish celerity by jumping off his cart, grabbing an empty container and collecting the fat worm. Regaining your senses, you look at him with inquisitive shock at what he just did.<br><br>");
        GUI.outputText('"<i>You have to realize that I AM a merchant, after all.</i>", he calmly replies. "<i>Hell for you is heaven for someone else. This bugger will easily fetch 10,000 gems to some noble looking for a quick buzz. Don\'t WE know better!</i>"<br><br>');
        GUI.outputText('The merchant puts away his prize and comes back to help you up. "<i>Here.</i>", he says as he shoves a couple of bottles into your hand. "<i>This is on the house. You probably need it after the shock of getting those things out.</i>"<br><br>');
        //Add 1 tincture of vitality to inventory
        //Infestation purged. Hit Points reduced to 10% of MAX. Corruption -20.
        if (liveData.player.HP > liveData.player.maxHP() * 0.15)
            liveData.player.changeHP(-(liveData.player.HP - liveData.player.maxHP() * 0.15), false);
        liveData.player.removeStatusEffect(StatusEffects.Infested);
        liveData.player.modStats(["lib", -1], ["cor", -8]);
        liveData.player.changeGems(-175);
        Inventory.takeItem(Items.Consumables.VitalityTincture, Camp.returnToCampUseOneHour);
    }
}
export { GiacomoScene };
//# sourceMappingURL=giacomo.js.map