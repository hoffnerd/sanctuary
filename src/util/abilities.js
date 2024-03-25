import { crewData, defaultAbilities } from "@/data/game/crew"
import { isArray, isObj } from "."

const applySkill = (skillObj, abilities, calculatedAbilities) => {
    const { type, ability, percent } = skillObj;
    let newCalculatedAbilities = { ...calculatedAbilities }
    
    switch (type) {
        case "percentIncrease":
            if(!(ability && percent)) break;
            newCalculatedAbilities[ability] = calculatedAbilities[ability] + (abilities[ability] * percent);
            break;
        default: break;
    }

    return newCalculatedAbilities;
}

const checkSkills = (crewId, crewMemberPoints, abilities, calculatedAbilities, shouldBePassive=false) => {
    const crewObj = isObj(crewData, [crewId]) ? crewData[crewId] : null;
    let newCalculatedAbilities = { ...calculatedAbilities }
    
    crewObj && isArray(crewObj.skills) && crewObj.skills.forEach(skillObj => {
        const pointsRequired = skillObj.pointsRequired ? skillObj.pointsRequired : 0;
        if(crewMemberPoints < pointsRequired) return;
        if((!shouldBePassive) && skillObj.isPassive) return;
        if(shouldBePassive && (!skillObj.isPassive)) return;
        newCalculatedAbilities = { ...applySkill(skillObj, abilities, newCalculatedAbilities) };
    });
    return newCalculatedAbilities;
}

/**
 * Takes save data containing abilities, crew, and party information, calculates abilities 
 * based on crew and party members' skills, and returns the final calculated abilities.
 * @param {{ abilities:{}, crew:{}, party:[] }} saveData - object, deconstructed that contains information about abilities, crew
 * members, and party members. The following properties are needed:
 * - `abilities` - object that represents the base abilities in the save data. If no abilities are provided, 
 * the function will use default abilities defined in `defaultAbilities`.
 * - `crew` - object representing a collection of crew members with their corresponding points. Iterates over 
 * the crew members and calculates the abilities based on certain conditions.
 * - `party` - array of strings that contains the IDs of crew members who are currently in the party. 
 * The function iterates over this array to calculate the skill of each crew member based on their points.
 * @returns an object with the calculated abilities after processing the crew and party data from the provided saveData object.
 */
export const calculateAbilities = ({ abilities, crew, party }) => {
    const baseAbilities = isObj(abilities) ? { ...defaultAbilities, ...abilities } : defaultAbilities;
    let calculatedAbilities = { ...baseAbilities }
    
    // Search for passives
    isObj(crew) && Object.keys(crew).forEach(crewId => {
        const crewMemberPoints = isObj(crew, [crewId]) ? crew[crewId] : 0;
        calculatedAbilities = { ...checkSkills(crewId, crewMemberPoints, baseAbilities, calculatedAbilities, true) };
    });

    // Search for actives
    isArray(party) && party.forEach(crewId => {
        if(!isObj(crew, [crewId])) return;
        const crewMemberPoints = isObj(crew, [crewId]) ? crew[crewId] : 0;
        calculatedAbilities = { ...checkSkills(crewId, crewMemberPoints, baseAbilities, calculatedAbilities,) };
    });

    return calculatedAbilities;
}