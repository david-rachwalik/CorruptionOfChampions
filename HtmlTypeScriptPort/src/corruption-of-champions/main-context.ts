import { Data, GameContext, MAIN, PlayerInfo } from 'coc';

//Start the game!
console.log('--- Preparing to initialize GameContext ---');
const liveData = new GameContext();
// MAIN.mainMenu();
console.log('--- GameContext has been initialized ---');

// Setup game event listeners on initial page load
const buttonMainEl = document.getElementById('buttonMain');
const buttonDataEl = document.getElementById('buttonData');
const buttonLevelEl = document.getElementById('buttonLevel');
const buttonStatsEl = document.getElementById('buttonStats');
const buttonPerksEl = document.getElementById('buttonPerks');
const buttonAppearanceEl = document.getElementById('buttonAppearance');
if (buttonMainEl) buttonMainEl.addEventListener('click', MAIN.mainMenu);
if (buttonDataEl) buttonDataEl.addEventListener('click', Data.dataScreen);
if (buttonLevelEl) buttonLevelEl.addEventListener('click', PlayerInfo.levelScreen);
if (buttonStatsEl) buttonStatsEl.addEventListener('click', PlayerInfo.statsScreen);
if (buttonPerksEl) buttonPerksEl.addEventListener('click', PlayerInfo.perksScreen);
if (buttonAppearanceEl) buttonAppearanceEl.addEventListener('click', PlayerInfo.appearanceScreen);

export { liveData };
