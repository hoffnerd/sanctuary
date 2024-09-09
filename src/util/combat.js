

// Packages--------------------------------------------------------------------------
// Data------------------------------------------------------------------------------
import { defaultSaveData } from "@/data/defaultSaveData";
import { library } from "@/data/combat/library";
import { friendlies } from "@/data/combat/friendlies";
// Other-----------------------------------------------------------------------------
import { isArray, isObj } from ".";



//______________________________________________________________________________________
// ===== Constants =====

const defaultSaveFile = { name: "Player", saveData: null }



//______________________________________________________________________________________
// ===== Functions =====

/**
 * Assists in starting a combat scenario by preparing party entities based on save data and a specified combat ID.
 * @param {Function} startCombat - function, used to initiate a combat sequence in a game 
 * or application. Intended to be the `startCombat` function from the combat zustand store.
 * @param {String} combatId - string, used to identify which combat scenario from the `library` should be 
 * started. Essential for determining the specific set of enemies and other details for the combat encounter.
 * @param {{ name:String, saveData:Object }} saveFile - object, contains the saved data for the game.
 * @returns {void}
 */
export const assistStartCombat = (startCombat, combatId, saveFile) => {
    const { name, saveData } = isObj(saveFile) ? { ...defaultSaveFile, ...saveFile } : { ...defaultSaveFile };
    const { crew, party } = isObj(saveData) ? { ...defaultSaveData, ...saveData } : { ...defaultSaveData }

    if(!(combatId && isObj(library, [combatId]))) return;
    if(!isArray(party)) return;

    let partyEntities = {}
    party.forEach(id => {
        if(!isObj(friendlies, [ id ])) return;
        if(!isObj(crew, [ id ])) return;

        let partyEntityObj = { ...crew[id], ...friendlies[id], isHidden:false }
        if(id === "player") partyEntityObj.display = name;

        partyEntities[id] = partyEntityObj;
    });

    startCombat({ ...partyEntities, ...library[combatId] });
}