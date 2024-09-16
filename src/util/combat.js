

// Packages--------------------------------------------------------------------------
// Data------------------------------------------------------------------------------
import { defaultSaveData } from "@/data/defaultSaveData";
import { combatEncounterLibrary } from "@/data/combat/library";
import { friendlies } from "@/data/combat/friendlies";
// Other-----------------------------------------------------------------------------
import { convertObjToArray, isArray, isObj } from ".";
import { DEFAULT_SAVE_FILE } from "@/data/_config";



//______________________________________________________________________________________
// ===== Constants =====

/** @deprecated - use `DEFAULT_SAVE_FILE` instead */
const defaultSaveFile = DEFAULT_SAVE_FILE



//______________________________________________________________________________________
// ===== Functions =====

/**
 * Randomly reveals a hidden entity recursively from a list of entities based on certain options.
 * @param {object} entities - object, the entities you want to randomize.
 * @param {object} options - object, that contains configuration settings or flags that influence how the function operates.
 * @returns {object}
 */
export const randomizeEntities = (entities, options) => {
    const shownEntities = convertObjToArray({...entities}).filter(x => !x.isHidden)
    if(isArray(shownEntities, options.show, true)) return { ...entities };

    let newEntities = { ...entities }
    const hiddenEntities = convertObjToArray({...newEntities}).filter(x => x.isHidden)
    const hiddenEnemyIds = hiddenEntities.map(x => x.id);
    const numberOfHiddenEntities = hiddenEnemyIds.length;
    const randomIndex = Math.floor(Math.random() * numberOfHiddenEntities);
    
    newEntities[ hiddenEnemyIds[randomIndex] ].isHidden = false;
    return randomizeEntities(newEntities, options)
}

/**
 * @deprecated - use `randomizeEntities` instead
 */
const randomizeEnemies = (options, enemies) => randomizeEntities(enemies, options)

/**
 * @deprecated
 */
const configureEnemyEntities = (encounter) => {
    const { settings, enemies } = encounter;
    if(isObj(settings.randomize)) return randomizeEnemies(settings.randomize, enemies);
    return isObj(enemies) ? { ...enemies } : {};
}

/**
 * @deprecated
 */
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
 * @deprecated
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

    if(!(combatId && isObj(combatEncounterLibrary, [combatId]))) return;
    if(!isArray(party)) return;

    startCombat({ 
        ...configurePartyEntities(name, crew, party), 
        ...configureEnemyEntities(combatEncounterLibrary[combatId]),
    });
}