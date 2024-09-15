

// Packages--------------------------------------------------------------------------
// Data------------------------------------------------------------------------------
import { defaultSaveData } from "@/data/defaultSaveData";
import { library } from "@/data/combat/library";
import { friendlies } from "@/data/combat/friendlies";
// Other-----------------------------------------------------------------------------
import { convertObjToArray, isArray, isObj } from ".";



//______________________________________________________________________________________
// ===== Constants =====

const defaultSaveFile = { name: "Player", saveData: null }



//______________________________________________________________________________________
// ===== Functions =====

const randomizeEnemies = (options, enemies) => {
    const shownEnemies = convertObjToArray({...enemies}).filter(x => !x.isHidden)
    if(isArray(shownEnemies, options.show, true)) return { ...enemies };

    let newEnemies = { ...enemies }
    const hiddenEnemies = convertObjToArray({...newEnemies}).filter(x => x.isHidden)
    const hiddenEnemyIds = hiddenEnemies.map(x => x.id);
    const numberOfHiddenEnemies = hiddenEnemyIds.length;
    const randomIndex = Math.floor(Math.random() * numberOfHiddenEnemies);
    
    newEnemies[ hiddenEnemyIds[randomIndex] ].isHidden = false;
    return randomizeEnemies(options, newEnemies)
}

const configureEnemyEntities = (encounter) => {
    const { settings, enemies } = encounter;
    if(isObj(settings.randomize)) return randomizeEnemies(settings.randomize, enemies);
    return isObj(enemies) ? { ...enemies } : {};
}

const configurePartyEntities = (playerName, crew, party) => {
    let partyEntities = {}
    party.forEach(id => {
        if(!isObj(friendlies, [ id ])) return;
        if(!isObj(crew, [ id ])) return;

        let partyEntityObj = { ...crew[id], ...friendlies[id], isHidden:false }
        if(id === "player") partyEntityObj.display = playerName;

        partyEntities[id] = partyEntityObj;
    });
    return partyEntities;
}

/**
 * Assists in starting a combat scenario by preparing party entities based on save data and a specified combat ID.
 * @param {Function} startCombat - function, used to initiate a combat sequence in the game 
 * Intended to be the `startCombat` function from the zustand combat store.
 * @param {string} combatId - string, used to identify which combat scenario from the `library` should be 
 * started. Essential for determining the specific set of enemies and other details for the combat encounter.
 * @param {{ name:string, saveData:object }} saveFile - object, contains the saved data for the game.
 * @returns {void}
 */
export const assistStartCombat = (startCombat, combatId, saveFile) => {
    const { name, saveData } = isObj(saveFile) ? { ...defaultSaveFile, ...saveFile } : { ...defaultSaveFile };
    const { crew, party } = isObj(saveData) ? { ...defaultSaveData, ...saveData } : { ...defaultSaveData }

    if(!(combatId && isObj(library, [combatId]))) return;
    if(!isArray(party)) return;

    startCombat({ 
        ...configurePartyEntities(name, crew, party), 
        ...configureEnemyEntities(library[combatId]),
    });
}