
// Packages--------------------------------------------------------------------------
// Data------------------------------------------------------------------------------
import { 
    ABILITY_POINTS_AT_LEVEL_0,
    HP_BASE, 
    HP_PER_LEVEL,
    HP_REGEN_BASE,
    HP_REGEN_PER_SURVIVAL_LEVEL,
    HP_REGEN_SURVIVAL_MULTIPLIER,
    HP_SURVIVAL_MULTIPLIER,
    ADRENALINE_REGEN_BASE,
    ADRENALINE_REGEN_SURVIVAL_MULTIPLIER,
    UNARMED_DAMAGE_BASE,
    UNARMED_DAMAGE_PER_LEVEL,
    DAMAGE_STRENGTH_MULTIPLIER,
    MELEE_ATTACK_PROFICIENCY_MULTIPLIER,
    DEFENSE_BASE,
    DEFENSE_PER_LEVEL,
    DEFENSE_STRENGTH_MULTIPLIER,
    DEFENSE_PROFICIENCY_MULTIPLIER,
    DEFENSE_STAT_BASED_MAX,
    DEFENSE_EQUIPMENT_BASED_MAX,
    CRITICAL_DAMAGE_BASE,
    CRITICAL_DAMAGE_PER_LEVEL,
    CRITICAL_DAMAGE_STRENGTH_MULTIPLIER,
    CRITICAL_DAMAGE_PROFICIENCY_MULTIPLIER,
    CRITICAL_DAMAGE_MAX,
} from "@/data/_config";
import { defaultAbilities } from "@/data/game/crew";
// Other-----------------------------------------------------------------------------
import { isArray, isObj } from ".";



//______________________________________________________________________________________
// ===== Utility Functions =====

/**
 * Calculates the total level by summing up the levels of all abilities in the `character` object.
 * @param {object | null} [character] - optional object containing an `abilities` object with their corresponding levels. 
 * @param {number | null} [givenLevel] - optional int, represents the total level of the character. If a valid number is 
 * provided, it will be returned as the total level. Otherwise, the function will attempt to retrieve the total level 
 * based on the character's `abilities` and their corresponding levels.
 * @returns {number}
 */
const getTotalLevel = (character=null, givenLevel=null) => {
    if((!isNaN(givenLevel)) && givenLevel > 0) return givenLevel;
    if(!(character && isObj(character.abilities))) return 0;

    let totalLevel = 0 - ABILITY_POINTS_AT_LEVEL_0;
    Object.keys(character.abilities).forEach(abilityKey => {
        const abilityLevel = character.abilities[abilityKey];
        if(!isNaN(abilityLevel)) totalLevel += parseInt(abilityLevel);
    });
    return totalLevel > 0.5 ? totalLevel : 0.5;
}

/**
 * Returns the level of a specified ability for a given character, with an optional default level if not found.
 * @param {object | null} [character] - optional object containing an `abilities` object with their corresponding levels. 
 * @param {string | null} [abilityKey] - optional string used to specify which ability level to retrieve from the character's abilities object.
 * @param {number | null} [givenLevel] - optional int, represents the level of a specific ability. If a valid number is provided, it will be returned 
 * as the ability level. Otherwise, the function will attempt to retrieve the ability level based on the `abilityKey` and `character` parameters
 * @returns {number}
 */
const getAbilityLevel = (character=null, abilityKey=null, givenLevel=null) => {
    if(!isNaN(givenLevel)) return givenLevel;
    if(abilityKey) return character?.abilities?.[abilityKey] || defaultAbilities[abilityKey];
    return 0;
}


/**
 * Checks if a character has proficiency in a given stat based on their proficiencies array.
 * @param {object | null} [character] - optional object containing an `proficiencies` array of strings. 
 * @param {string | null} [statKey] - optional string used to specify which stat to retrieve from the character's proficiencies array.
 * @param {boolean | null}[givenProficiency=null] - optional bool, used to check if a proficiency value has been explicitly provided. 
 * If a proficiency value is provided (i.e., not `null`), the function will return that value. Otherwise, it will proceed to check the character.
 * @returns {boolean}
 */
const getStatProficiency = (character=null, statKey=null, givenProficiency=null) => {
    if(givenProficiency !== null) return givenProficiency;
    return (statKey && character && isArray(character.proficiencies) && character.proficiencies.includes(statKey));
}



//______________________________________________________________________________________
// ===== Strength Ability Functions =====

/**
 * Calculates a character's critical damage percentage based on their total level, strength level, and critical damage proficiency.
 * @param {object} props
 * @param {object | null} [props.character] - optional object containing an `abilities` object with their corresponding levels. 
 * @param {number | null} [props.totalLevel] - optional int, default is `null`. Represents the total level of the character. If 
 * not provided, will calculate the total level within this function from the given `character`.
 * @param {number | null} [props.strengthLevel] - optional int, default is `null`. Represents the strength ability level of the 
 * character. If not provided, will get the strength ability level from the given `character`.
 * @param {boolean | null} [props.criticalDamageProficiency] - optional bool, whether or not this character has the criticalDamage proficiency.
 * If not provided, will get from the given `character`.
 * @returns {number}
 */
const calculateCriticalDamage = ({ character=null, totalLevel=null, strengthLevel=null, criticalDamageProficiency=null }) => {

    // Get the levels and proficiencies of this character
    const totalLevelToUse = getTotalLevel(character, totalLevel);
    const strengthLevelToUse = getAbilityLevel(character, "strength", strengthLevel);
    const hasProficiency = getStatProficiency(character, "criticalDamage", criticalDamageProficiency)

    // Calculate the characters critical damage percent, based on...
    const criticalDamageMultiplier = (
        // the default `CRITICAL_DAMAGE_STRENGTH_MULTIPLIER`, plus...
        CRITICAL_DAMAGE_STRENGTH_MULTIPLIER + 

        // if this character has the critical damage proficiency, add that multiplier
        (hasProficiency ? CRITICAL_DAMAGE_PROFICIENCY_MULTIPLIER : 0)
    )

    // Calculate the characters critical damage percent with given stats
    let criticalDamage = (

        // Starting base critical damage percent, plus...
        CRITICAL_DAMAGE_BASE + (

            // critical damage percent statically gained as a character levels up, multiplied by...
            (CRITICAL_DAMAGE_PER_LEVEL * totalLevelToUse) *

            // A multiplier based on how many strength levels one has
            (1 + (criticalDamageMultiplier * strengthLevelToUse))
        )
    )

    // Make sure we don't go over the max
    if(criticalDamage > CRITICAL_DAMAGE_MAX) criticalDamage = CRITICAL_DAMAGE_MAX;

    return criticalDamage;
}

/**
 * Calculates a character's defense based on their total level, strength level, and defense proficiency.
 * @param {object} props
 * @param {object | null} [props.character] - optional object containing an `abilities` object with their corresponding levels. 
 * @param {number | null} [props.totalLevel] - optional int, default is `null`. Represents the total level of the character. If 
 * not provided, will calculate the total level within this function from the given `character`.
 * @param {number | null} [props.strengthLevel] - optional int, default is `null`. Represents the strength ability level of the 
 * character. If not provided, will get the strength ability level from the given `character`.
 * @param {boolean | null} [props.defenseProficiency] - optional bool, whether or not this character has the defense proficiency.
 * If not provided, will get from the given `character`.
 * @returns {number}
 */
const calculateDefense = ({ character=null, totalLevel=null, strengthLevel=null, defenseProficiency=null }) => {

    // Get the levels and proficiencies of this character
    const totalLevelToUse = getTotalLevel(character, totalLevel);
    const strengthLevelToUse = getAbilityLevel(character, "strength", strengthLevel);
    const hasProficiency = getStatProficiency(character, "defense", defenseProficiency)

    // Calculate the characters defense, based on...
    const statDefenseMultiplier = (
        // the default `DEFENSE_STRENGTH_MULTIPLIER`, plus...
        DEFENSE_STRENGTH_MULTIPLIER + 

        // if this character has the defense proficiency, add that multiplier
        (hasProficiency ? DEFENSE_PROFICIENCY_MULTIPLIER : 0)
    )

    // Calculate the characters defense with given stats
    let statDefense = (

        // Starting base defense, plus...
        DEFENSE_BASE + (

            // Health statically gained as a character levels up, multiplied by...
            (DEFENSE_PER_LEVEL * totalLevelToUse) *

            // A multiplier based on how many strength levels one has
            (1 + (statDefenseMultiplier * strengthLevelToUse))
        )
    )
    // Make sure we don't go over the max
    if(statDefense > DEFENSE_STAT_BASED_MAX) statDefense = DEFENSE_STAT_BASED_MAX;

    let equipmentDefense = 0;
    if(equipmentDefense > DEFENSE_EQUIPMENT_BASED_MAX) equipmentDefense = DEFENSE_EQUIPMENT_BASED_MAX;

    const totalDefense = statDefense + equipmentDefense;
    const totalMaxDefense = DEFENSE_STAT_BASED_MAX + DEFENSE_EQUIPMENT_BASED_MAX;

    return totalDefense > totalMaxDefense ? totalMaxDefense : totalDefense;
}

/**
 * Calculates melee attack damage based on base damage, damage per level, strength multiplier, and character stats.
 * @param {number} baseDamage - int, represents the base amount of damage that the melee attack will deal. This value 
 * is added to the calculated damage based on the character's stats and level.
 * @param {number} damagePerLevel - int or float, represents the amount of damage that increases per level for the character. 
 * This value is multiplied by the character's total level to calculate the additional damage gained as the character levels up.
 * @param {number | null} [damageStrengthMultiplier] - optional int or float, default is `null`. Represents a multiplier that is applied 
 * to the character's damage based on their strength level. This multiplier can be provided as an argument when calling the
 * function, and if not provided, it will default to a constant value `DAMAGE_STRENGTH_MULTIPLIER` found in `@/data/_config.js`
 * @param {object} data
 * @param {object | null} [data.character] - optional object containing an `abilities` object with their corresponding levels. 
 * @param {number | null} [data.totalLevel] - optional int, default is `null`. Represents the total level of the character. If 
 * not provided, will calculate the total level within this function from the given `character`.
 * @param {number | null} [data.strengthLevel] - optional int, default is `null`. Represents the strength ability level of the 
 * character. If not provided, will get the strength ability level from the given `character`.
 * @param {boolean | null} [data.meleeAttackProficiency] - optional bool, whether or not this character has the meleeAttack proficiency.
 * If not provided, will get from the given `character`.
 * @returns {number}
 */
const calculateMeleeAttackDamage = (
    baseDamage, 
    damagePerLevel, 
    damageStrengthMultiplier=null, 
    { character=null, totalLevel=null, strengthLevel=null, meleeAttackProficiency=null }
) => {

    // Get the levels of this character
    const totalLevelToUse = getTotalLevel(character, totalLevel);
    const strengthLevelToUse = getAbilityLevel(character, "strength", strengthLevel);
    const hasProficiency = getStatProficiency(character, "meleeAttack", meleeAttackProficiency)

    // Calculate the characters damage multiplier, based on...
    const damageMultiplier = (
        // a weapon's given `damageStrengthMultiplier` or the default `DAMAGE_STRENGTH_MULTIPLIER`, plus...
        (damageStrengthMultiplier || DAMAGE_STRENGTH_MULTIPLIER) + 

        // if this character has the melee attack proficiency, add that multiplier
        (hasProficiency ? MELEE_ATTACK_PROFICIENCY_MULTIPLIER : 0)
    )

    // Calculate the characters damage with given stats
    return Math.floor(
        // Starting base damage, plus...
        baseDamage + (

            // damage statically gained as a character levels up, multiplied by...
            (damagePerLevel * totalLevelToUse) *

            // A multiplier based on how many strength levels one has
            (1 + (damageMultiplier * strengthLevelToUse))
        )
    )
}



//______________________________________________________________________________________
// ===== Survival Ability Functions =====

const calculatePerceptionBonus = ({ character=null, totalLevel=null, survivalLevel=null, perceptionProficiency=null }) => {
    return 1;

    // Get the levels and proficiencies of this character
    const totalLevelToUse = getTotalLevel(character, totalLevel);
    const survivalLevelToUse = getAbilityLevel(character, "survival", survivalLevel);
    const hasProficiency = getStatProficiency(character, "perception", perceptionProficiency)

    // Return early with the base perception bonus if they do not have the perception proficiency
    if(!hasProficiency) return 1;

    // Calculate the characters perception bonus
    return Math.floor(
        1
    )

}

const calculateNatureBonus = ({ character=null, totalLevel=null, survivalLevel=null, natureProficiency=null }) => {
    return 1;

    // Get the levels and proficiencies of this character
    const totalLevelToUse = getTotalLevel(character, totalLevel);
    const survivalLevelToUse = getAbilityLevel(character, "survival", survivalLevel);
    const hasProficiency = getStatProficiency(character, "nature", natureProficiency)

    // Return early with the base nature bonus if they do not have the nature proficiency
    if(!hasProficiency) return 1;

    // Calculate the characters nature bonus
    return Math.floor(
        1
    )

}

/**
 * Calculates a character's adrenaline regeneration based on their survival level, and adrenaline proficiency.
 * You can simply give this function the `character` object and it will calculate everything it needs. Alteratively, if
 * `survivalLevel` and `adrenalineProficiency` are given, those are used while the fallback is the calculations 
 * based off the `character` object given.
 * @param {object} props
 * @param {object | null} [props.character] - optional object containing an `abilities` object with their corresponding levels. 
 * @param {number | null} [props.survivalLevel] - optional int, default is `null`. Represents the survival ability level of the 
 * character. If not provided, will get the survival ability level from the given `character`.
 * @param {boolean | null} [props.adrenalineProficiency] - optional bool, whether or not this character has the adrenaline proficiency.
 * If not provided, will get from the given `character`.
 * @returns {number}
 */
const calculateAdrenalineRegen = ({ character=null, survivalLevel=null, adrenalineProficiency=null }) => {

    // Get the levels and proficiencies of this character
    const survivalLevelToUse = getAbilityLevel(character, "survival", survivalLevel);
    const hasProficiency = getStatProficiency(character, "adrenaline", adrenalineProficiency)

    // Return early with the base regen if they do not have the adrenaline proficiency
    if(!hasProficiency) return ADRENALINE_REGEN_BASE;

    // Calculate the characters adrenaline regen
    return Math.floor(
        // Starting base regen, multiplied by...
        ADRENALINE_REGEN_BASE * 
        
        // A multiplier based on how many survival levels one has
        (1 + (ADRENALINE_REGEN_SURVIVAL_MULTIPLIER * survivalLevelToUse))
    )
}

/**
 * Calculates a character's health point regeneration based on their total level, survival level, and vitality proficiency.
 * You can simply give this function the `character` object and it will calculate everything it needs. Alteratively, if
 * `totalLevel`, `survivalLevel`, and `vitalityProficiency` are given, those are used while the fallback is the calculations 
 * based off the `character` object given.
 * @param {object} props
 * @param {object | null} [props.character] - optional object containing an `abilities` object with their corresponding levels. 
 * @param {number | null} [props.totalLevel] - optional int, default is `null`. Represents the total level of the character. If 
 * not provided, will calculate the total level within this function from the given `character`.
 * @param {number | null} [props.survivalLevel] - optional int, default is `null`. Represents the survival ability level of the 
 * character. If not provided, will get the survival ability level from the given `character`.
 * @param {boolean | null} [props.vitalityProficiency] - optional bool, whether or not this character has the vitality proficiency.
 * If not provided, will get from the given `character`.
 * @returns {number}
 */
const calculateHpRegen = ({ character=null, totalLevel=null, survivalLevel=null, vitalityProficiency=null }) => {

    // Get the levels and proficiencies of this character
    const totalLevelToUse = getTotalLevel(character, totalLevel);
    const survivalLevelToUse = getAbilityLevel(character, "survival", survivalLevel);
    const hasProficiency = getStatProficiency(character, "vitality", vitalityProficiency)

    // Return early with the base regen if they do not have the vitality proficiency
    if(!hasProficiency) return HP_REGEN_BASE;

    // Calculate the characters health point regen
    return Math.floor(
        // Starting base regen, plus...
        HP_REGEN_BASE + (
            
            // Health statically regened as a character levels up, multiplied by...
            (HP_REGEN_PER_SURVIVAL_LEVEL * totalLevelToUse) *

            // A multiplier based on how many survival levels one has
            (1 + (HP_REGEN_SURVIVAL_MULTIPLIER * survivalLevelToUse))
        )
    )
}


/**
 * Calculates a character's maximum health points based on their total level and survival ability level. You can simply give
 * this function the `character` object and it will calculate everything it needs. Alteratively, if `totalLevel` and 
 * `survivalLevel` are given, those are used while the fallback is the calculations based off the `character` object given.
 * @param {object} props
 * @param {object | null} [props.character] - optional object containing an `abilities` object with their corresponding levels. 
 * @param {number | null} [props.totalLevel] - optional int, default is `null`. Represents the total level of the character. If 
 * not provided, will calculate the total level within this function from the given `character`.
 * @param {number | null} [props.survivalLevel] - optional int, default is `null`. Represents the survival ability level of the 
 * character. If not provided, will get the survival ability level from the given `character`.
 * @returns {number}
 */
const calculateHpMax = ({character=null, totalLevel=null, survivalLevel=null}) => {

    // Get the levels of this character
    const totalLevelToUse = getTotalLevel(character, totalLevel);
    const survivalLevelToUse = getAbilityLevel(character, "survival", survivalLevel);

    // Calculate the characters health points
    return Math.floor(
        // Starting base health, plus...
        HP_BASE + (

            // Health statically gained as a character levels up, multiplied by...
            (HP_PER_LEVEL * totalLevelToUse) *

            // A multiplier based on how many survival levels one has
            (1 + (HP_SURVIVAL_MULTIPLIER * survivalLevelToUse))
        )
    )
}


//______________________________________________________________________________________
// ===== Main =====

export const calculateCharacterBuild = (character) => {

    // Return early with the givin `character` if it is not an object and its `abilities` is not an object. 
    if(!(character && isObj(character.abilities))) return character;

    // Deconstruct the ability levels for easier access
    const { 
        survival: survivalLevel, 
        strength: strengthLevel, 
        charisma: charismaLevel, 
        dexterity: dexterityLevel, 
        intelligence: intelligenceLevel,
    } = character.abilities;

    // Get the total level of this character
    const totalLevel = getTotalLevel(character);

    return {
        ...character,
        hpMax: calculateHpMax({ totalLevel, survivalLevel }),
        hpRegen: calculateHpRegen({ character, totalLevel, survivalLevel }),
        adrenalineRegen: calculateAdrenalineRegen({ character, survivalLevel }),
        unarmedDamage: calculateMeleeAttackDamage(UNARMED_DAMAGE_BASE, UNARMED_DAMAGE_PER_LEVEL, null, { character, totalLevel, strengthLevel }),
        defense: calculateDefense({ character, totalLevel, strengthLevel }),
        criticalDamage: calculateCriticalDamage({ character, totalLevel, strengthLevel }),
        statBonuses:{
            nature: calculateNatureBonus({ character, totalLevel, survivalLevel }),
            perception: calculatePerceptionBonus({ character, totalLevel, survivalLevel })
        }
    }

}