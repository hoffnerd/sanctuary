
// Packages--------------------------------------------------------------------------
// Data------------------------------------------------------------------------------
import { 
    TECHNICAL_LEVEL_0,
    ABILITY_POINTS_AT_LEVEL_0,
    HP_BASE, 
    HP_PER_LEVEL,
    HP_REGEN_BASE,
    HP_REGEN_PER_LEVEL,
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
    ACCURACY_BASE,
    ACCURACY_PER_LEVEL,
    ACCURACY_DEXTERITY_MULTIPLIER,
    ACCURACY_PROFICIENCY_MULTIPLIER,
    ACCURACY_MAX,
    EVASION_BASE,
    EVASION_PER_LEVEL,
    EVASION_DEXTERITY_MULTIPLIER,
    EVASION_PROFICIENCY_MULTIPLIER,
} from "@/data/_config";
import { defaultAbilities } from "@/data/game/crew";
// Other-----------------------------------------------------------------------------
import { isArray, isObj } from ".";



//______________________________________________________________________________________
// ===== Utility Functions =====

const EXAMPLE_calculateHitOrMiss = (actionTakerObj, weaponObj, targetObj, numberOfMisses, { BASE, RANDOM_RANGE, INCREASE_PER_MISS }) => {
    const chanceToHit = (
        (BASE + actionTakerObj.level) // 5-25
        + RANDOM_RANGE // 0-25
        + actionTakerObj.accuracy
        + (weaponObj?.accuracy || 0)
        + (INCREASE_PER_MISS * numberOfMisses)
    )

    // true = hit | false = miss
    return chanceToHit > targetObj.evasion
}

/**
 * Gets the technical level to use in some calculations if a character is at level 0. Basically, check if we are at 
 * level zero BUT the character already has ability levels. If so, then get the technical level we should use for 
 * calculations, instead of the total level.
 * @param {number | 0} [level] - int, default is `0`. Represents the total level of the character. If a number is over
 * `0` is provided, it will be returned as the technical level. Otherwise, the function will return the `TECHNICAL_LEVEL_0`.
 * @returns {number}
 */
const getTechnicalLevel = (abilityLevel=0, level=0) => {
    if(!(abilityLevel)) return level;
    if(level >= 1) return level;
    return TECHNICAL_LEVEL_0;
}

/**
 * Calculates the total level by summing up the levels of all abilities in the `character` object.
 * @param {object | null} [character] - optional object containing an `abilities` object with their corresponding levels. 
 * @param {number | null} [level] - optional int, represents the total level of the character. If a valid number is 
 * provided, it will be returned as the total level. Otherwise, the function will attempt to retrieve the total level 
 * based on the character's `abilities` and their corresponding levels.
 * @returns {number}
 */
const getTotalLevel = (character=null, level=null) => {
    if((!isNaN(level)) && level > 0) return level;
    if(!(character && isObj(character.abilities))) return 0;

    let totalLevel = 0 - ABILITY_POINTS_AT_LEVEL_0;
    Object.keys(character.abilities).forEach(abilityKey => {
        const abilityLevel = character.abilities[abilityKey];
        if(!isNaN(abilityLevel)) totalLevel += parseInt(abilityLevel);
    });
    return Math.floor(totalLevel > 0 ? totalLevel : 0);
}

/**
 * Returns the level of a specified ability for a given character, with an optional default level if not found.
 * @param {object | null} [character] - optional object containing an `abilities` object with their corresponding levels. 
 * @param {string | null} [abilityKey] - optional string used to specify which ability level to retrieve from the character's abilities object.
 * @param {number | null} [level] - optional int, represents the level of a specific ability. If a valid number is provided, it will be returned 
 * as the ability level. Otherwise, the function will attempt to retrieve the ability level based on the `abilityKey` and `character` parameters
 * @returns {number}
 */
const getAbilityLevel = (character=null, abilityKey=null, level=null) => {
    if(!isNaN(level)) return level;
    if(abilityKey) return character?.abilities?.[abilityKey] || defaultAbilities[abilityKey];
    return 0;
}


/**
 * Checks if a character has proficiency in a given stat based on their proficiencies array.
 * @param {object | null} [character] - optional object containing an `proficiencies` array of strings. 
 * @param {string | null} [statKey] - optional string used to specify which stat to retrieve from the character's proficiencies array.
 * @param {boolean | null}[proficiency] - optional bool, used to check if a proficiency value has been explicitly provided. 
 * If a proficiency value is provided (i.e., not `null`), the function will return that value. Otherwise, it will proceed to check the character.
 * @returns {boolean}
 */
const getStatProficiency = (character=null, statKey=null, proficiency=null) => {
    if(proficiency !== null) return proficiency;
    return (statKey && character && isArray(character.proficiencies) && character.proficiencies.includes(statKey));
}



//______________________________________________________________________________________
// ===== Intelligence Ability Functions =====

const calculateWeaponry = ({ character=null, totalLevel=null, abilityLevel=null, proficiency=null }) => {
    return 1;

    // Get the levels and proficiencies of this character
    const totalLevelToUse = getTotalLevel(character, totalLevel);
    const abilityLevelToUse = getAbilityLevel(character, "intelligence", abilityLevel);
    const hasProficiency = getStatProficiency(character, "weaponry", proficiency);
    const levelMultiplier = getTechnicalLevel(abilityLevelToUse, totalLevelToUse);

    // Return early with the base weaponry bonus if they do not have the weaponry proficiency
    if(!hasProficiency) return 1;

    // Calculate the characters weaponry bonus
    return Math.floor(
        1
    )
}

const calculateMedicine = ({ character=null, totalLevel=null, abilityLevel=null, proficiency=null }) => {
    return 1;

    // Get the levels and proficiencies of this character
    const totalLevelToUse = getTotalLevel(character, totalLevel);
    const abilityLevelToUse = getAbilityLevel(character, "intelligence", abilityLevel);
    const hasProficiency = getStatProficiency(character, "medicine", proficiency);
    const levelMultiplier = getTechnicalLevel(abilityLevelToUse, totalLevelToUse);

    // Return early with the base medicine bonus if they do not have the medicine proficiency
    if(!hasProficiency) return 1;

    // Calculate the characters medicine bonus
    return Math.floor(
        1
    )
}

const calculateHistory = ({ character=null, totalLevel=null, abilityLevel=null, proficiency=null }) => {
    return 1;

    // Get the levels and proficiencies of this character
    const totalLevelToUse = getTotalLevel(character, totalLevel);
    const abilityLevelToUse = getAbilityLevel(character, "intelligence", abilityLevel);
    const hasProficiency = getStatProficiency(character, "history", proficiency);
    const levelMultiplier = getTechnicalLevel(abilityLevelToUse, totalLevelToUse);

    // Return early with the base history bonus if they do not have the history proficiency
    if(!hasProficiency) return 1;

    // Calculate the characters history bonus
    return Math.floor(
        1
    )
}

const calculateInvestigation = ({ character=null, totalLevel=null, abilityLevel=null, proficiency=null }) => {
    return 1;

    // Get the levels and proficiencies of this character
    const totalLevelToUse = getTotalLevel(character, totalLevel);
    const abilityLevelToUse = getAbilityLevel(character, "intelligence", abilityLevel);
    const hasProficiency = getStatProficiency(character, "investigation", proficiency);
    const levelMultiplier = getTechnicalLevel(abilityLevelToUse, totalLevelToUse);

    // Return early with the base investigation bonus if they do not have the investigation proficiency
    if(!hasProficiency) return 1;

    // Calculate the characters investigation bonus
    return Math.floor(
        1
    )
}



//______________________________________________________________________________________
// ===== Dexterity Ability Functions =====

const calculateStealth = ({ character=null, totalLevel=null, abilityLevel=null, proficiency=null }) => {
    return 1;

    // Get the levels and proficiencies of this character
    const totalLevelToUse = getTotalLevel(character, totalLevel);
    const abilityLevelToUse = getAbilityLevel(character, "dexterity", abilityLevel);
    const hasProficiency = getStatProficiency(character, "stealth", proficiency);
    const levelMultiplier = getTechnicalLevel(abilityLevelToUse, totalLevelToUse);

    // Return early with the base stealth bonus if they do not have the stealth proficiency
    if(!hasProficiency) return 1;

    // Calculate the characters stealth bonus
    return Math.floor(
        1
    )
}

/**
 * Calculates a character's evasion percentage based on their total level, dexterity level, and evasion proficiency.
 * @param {object} props
 * @param {object | null} [props.character] - optional object containing an `abilities` object with their corresponding levels. 
 * @param {number | null} [props.totalLevel] - optional int, default is `null`. Represents the total level of the character. If 
 * not provided, will calculate the total level within this function from the given `character`.
 * @param {number | null} [props.abilityLevel] - optional int, default is `null`. Represents the dexterity ability level of the 
 * character. If not provided, will get the dexterity ability level from the given `character`.
 * @param {boolean | null} [props.proficiency] - optional bool, whether or not this character has the proficiency needed.
 * If not provided, will get from the given `character`.
 * @returns {number}
 */
const calculateEvasion = ({ character=null, totalLevel=null, abilityLevel=null, proficiency=null }) => {

    // Get the levels and proficiencies of this character
    const totalLevelToUse = getTotalLevel(character, totalLevel);
    const abilityLevelToUse = getAbilityLevel(character, "dexterity", abilityLevel);
    const hasProficiency = getStatProficiency(character, "evasion", proficiency);
    const levelMultiplier = getTechnicalLevel(abilityLevelToUse, totalLevelToUse);

    // Calculate the characters evasion percent, based on...
    const evasionMultiplier = (
        // the default `EVASION_DEXTERITY_MULTIPLIER`, plus...
        EVASION_DEXTERITY_MULTIPLIER + 

        // if this character has the evasion proficiency, add that multiplier
        (hasProficiency ? EVASION_PROFICIENCY_MULTIPLIER : 0)
    )

    // Calculate the characters evasion percent with given stats
    const evasion = (

        // Starting base evasion percent, plus...
        EVASION_BASE + (

            // evasion percent statically gained as a character levels up, multiplied by...
            (EVASION_PER_LEVEL * levelMultiplier) *

            // A multiplier based on how many dexterity levels one has
            (1 + (evasionMultiplier * abilityLevelToUse))
        )
    )

    // Make sure we don't go over the max
    if(evasion > ACCURACY_MAX) return ACCURACY_MAX;
    return evasion;
}

/**
 * Calculates a character's accuracy percentage based on their total level, dexterity level, and accuracy proficiency.
 * @param {object} props
 * @param {object | null} [props.character] - optional object containing an `abilities` object with their corresponding levels. 
 * @param {number | null} [props.totalLevel] - optional int, default is `null`. Represents the total level of the character. If 
 * not provided, will calculate the total level within this function from the given `character`.
 * @param {number | null} [props.abilityLevel] - optional int, default is `null`. Represents the dexterity ability level of the 
 * character. If not provided, will get the dexterity ability level from the given `character`.
 * @param {boolean | null} [props.proficiency] - optional bool, whether or not this character has the proficiency needed.
 * If not provided, will get from the given `character`.
 * @returns {number}
 */
const calculateAccuracy = ({ character=null, totalLevel=null, abilityLevel=null, proficiency=null }) => {

    // Get the levels and proficiencies of this character
    const totalLevelToUse = getTotalLevel(character, totalLevel);
    const abilityLevelToUse = getAbilityLevel(character, "dexterity", abilityLevel);
    const hasProficiency = getStatProficiency(character, "accuracy", proficiency);

    // Calculate the characters bonus accuracy percent, based on...
    const accuracyMultiplier = (
        // the default `ACCURACY_DEXTERITY_MULTIPLIER`, plus...
        ACCURACY_DEXTERITY_MULTIPLIER + 

        // if this character has the bonus accuracy proficiency, add that multiplier
        (hasProficiency ? ACCURACY_PROFICIENCY_MULTIPLIER : 0)
    )

    // Calculate the characters bonus accuracy percent with given stats
    const accuracyBonus = (

        // Starting base bonus accuracy percent, plus...
        ACCURACY_BASE + (

            // bonus accuracy percent statically gained as a character levels up, multiplied by...
            (ACCURACY_PER_LEVEL * totalLevelToUse) *

            // A multiplier based on how many strength levels one has
            (1 + (accuracyMultiplier * abilityLevelToUse))
        )
    )

    // Make sure we don't go over the max
    if(accuracyBonus > ACCURACY_MAX) return ACCURACY_MAX;
    return accuracyBonus;
}



//______________________________________________________________________________________
// ===== Charisma Ability Functions =====

const calculatePersuasion = ({ character=null, totalLevel=null, abilityLevel=null, proficiency=null }) => {
    return 1;

    // Get the levels and proficiencies of this character
    const totalLevelToUse = getTotalLevel(character, totalLevel);
    const abilityLevelToUse = getAbilityLevel(character, "charisma", abilityLevel);
    const hasProficiency = getStatProficiency(character, "persuasion", proficiency);
    const levelMultiplier = getTechnicalLevel(abilityLevelToUse, totalLevelToUse);

    // Return early with the base persuasion bonus if they do not have the persuasion proficiency
    if(!hasProficiency) return 1;

    // Calculate the characters persuasion bonus
    return Math.floor(
        1
    )
}

const calculateIntimidation = ({ character=null, totalLevel=null, abilityLevel=null, proficiency=null }) => {
    return 1;

    // Get the levels and proficiencies of this character
    const totalLevelToUse = getTotalLevel(character, totalLevel);
    const abilityLevelToUse = getAbilityLevel(character, "charisma", abilityLevel);
    const hasProficiency = getStatProficiency(character, "intimidation", proficiency);
    const levelMultiplier = getTechnicalLevel(abilityLevelToUse, totalLevelToUse);

    // Return early with the base intimidation bonus if they do not have the intimidation proficiency
    if(!hasProficiency) return 1;

    // Calculate the characters intimidation bonus
    return Math.floor(
        1
    )
}

const calculateDeception = ({ character=null, totalLevel=null, abilityLevel=null, proficiency=null }) => {
    return 1;

    // Get the levels and proficiencies of this character
    const totalLevelToUse = getTotalLevel(character, totalLevel);
    const abilityLevelToUse = getAbilityLevel(character, "charisma", abilityLevel);
    const hasProficiency = getStatProficiency(character, "deception", proficiency);
    const levelMultiplier = getTechnicalLevel(abilityLevelToUse, totalLevelToUse);

    // Return early with the base deception bonus if they do not have the deception proficiency
    if(!hasProficiency) return 1;

    // Calculate the characters deception bonus
    return Math.floor(
        1
    )
}



//______________________________________________________________________________________
// ===== Strength Ability Functions =====

/**
 * Calculates a character's critical damage percentage based on their total level, strength level, and critical damage proficiency.
 * @param {object} props
 * @param {object | null} [props.character] - optional object containing an `abilities` object with their corresponding levels. 
 * @param {number | null} [props.totalLevel] - optional int, default is `null`. Represents the total level of the character. If 
 * not provided, will calculate the total level within this function from the given `character`.
 * @param {number | null} [props.abilityLevel] - optional int, default is `null`. Represents the strength ability level of the 
 * character. If not provided, will get the strength ability level from the given `character`.
 * @param {boolean | null} [props.proficiency] - optional bool, whether or not this character has the criticalDamage proficiency.
 * If not provided, will get from the given `character`.
 * @returns {number}
 */
const calculateCriticalDamage = ({ character=null, totalLevel=null, abilityLevel=null, proficiency=null }) => {

    // Get the levels and proficiencies of this character
    const totalLevelToUse = getTotalLevel(character, totalLevel);
    const abilityLevelToUse = getAbilityLevel(character, "strength", abilityLevel);
    const hasProficiency = getStatProficiency(character, "criticalDamage", proficiency);
    const levelMultiplier = getTechnicalLevel(abilityLevelToUse, totalLevelToUse);

    // Calculate the characters critical damage percent, based on...
    const criticalDamageMultiplier = (
        // the default `CRITICAL_DAMAGE_STRENGTH_MULTIPLIER`, plus...
        CRITICAL_DAMAGE_STRENGTH_MULTIPLIER + 

        // if this character has the critical damage proficiency, add that multiplier
        (hasProficiency ? CRITICAL_DAMAGE_PROFICIENCY_MULTIPLIER : 0)
    )

    // Calculate the characters critical damage percent with given stats
    const criticalDamage = (

        // Starting base critical damage percent, plus...
        CRITICAL_DAMAGE_BASE + (

            // critical damage percent statically gained as a character levels up, multiplied by...
            (CRITICAL_DAMAGE_PER_LEVEL * levelMultiplier) *

            // A multiplier based on how many strength levels one has
            (1 + (criticalDamageMultiplier * abilityLevelToUse))
        )
    )

    // Make sure we don't go over the max
    if(criticalDamage > CRITICAL_DAMAGE_MAX) return CRITICAL_DAMAGE_MAX;
    return criticalDamage;
}

/**
 * Calculates a character's defense based on their total level, strength level, and defense proficiency.
 * @param {object} props
 * @param {object | null} [props.character] - optional object containing an `abilities` object with their corresponding levels. 
 * @param {number | null} [props.totalLevel] - optional int, default is `null`. Represents the total level of the character. If 
 * not provided, will calculate the total level within this function from the given `character`.
 * @param {number | null} [props.abilityLevel] - optional int, default is `null`. Represents the strength ability level of the 
 * character. If not provided, will get the strength ability level from the given `character`.
 * @param {boolean | null} [props.proficiency] - optional bool, whether or not this character has the defense proficiency.
 * If not provided, will get from the given `character`.
 * @returns {number}
 */
const calculateDefense = ({ character=null, totalLevel=null, abilityLevel=null, proficiency=null }) => {

    // Get the levels and proficiencies of this character
    const totalLevelToUse = getTotalLevel(character, totalLevel);
    const abilityLevelToUse = getAbilityLevel(character, "strength", abilityLevel);
    const hasProficiency = getStatProficiency(character, "defense", proficiency);

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
            (1 + (statDefenseMultiplier * abilityLevelToUse))
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
 * @param {number | null} [data.abilityLevel] - optional int, default is `null`. Represents the strength ability level of the 
 * character. If not provided, will get the strength ability level from the given `character`.
 * @param {boolean | null} [data.proficiency] - optional bool, whether or not this character has the meleeAttack proficiency.
 * If not provided, will get from the given `character`.
 * @returns {number}
 */
const calculateMeleeAttackDamage = (
    baseDamage, 
    damagePerLevel, 
    damageStrengthMultiplier=null, 
    { character=null, totalLevel=null, abilityLevel=null, proficiency=null }
) => {

    // Get the levels of this character
    const totalLevelToUse = getTotalLevel(character, totalLevel);
    const abilityLevelToUse = getAbilityLevel(character, "strength", abilityLevel);
    const hasProficiency = getStatProficiency(character, "meleeAttack", proficiency);
    const levelMultiplier = getTechnicalLevel(abilityLevelToUse, totalLevelToUse);

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
            (damagePerLevel * levelMultiplier) *

            // A multiplier based on how many strength levels one has
            (1 + (damageMultiplier * abilityLevelToUse))
        )
    )
}



//______________________________________________________________________________________
// ===== Survival Ability Functions =====

const calculatePerception = ({ character=null, totalLevel=null, abilityLevel=null, proficiency=null }) => {
    return 1;

    // Get the levels and proficiencies of this character
    const totalLevelToUse = getTotalLevel(character, totalLevel);
    const abilityLevelToUse = getAbilityLevel(character, "survival", abilityLevel);
    const hasProficiency = getStatProficiency(character, "perception", proficiency);
    const levelMultiplier = getTechnicalLevel(abilityLevelToUse, totalLevelToUse);

    // Return early with the base perception bonus if they do not have the perception proficiency
    if(!hasProficiency) return 1;

    // Calculate the characters perception bonus
    return Math.floor(
        1
    )
}

const calculateNature = ({ character=null, totalLevel=null, abilityLevel=null, proficiency=null }) => {
    return 1;

    // Get the levels and proficiencies of this character
    const totalLevelToUse = getTotalLevel(character, totalLevel);
    const abilityLevelToUse = getAbilityLevel(character, "survival", abilityLevel);
    const hasProficiency = getStatProficiency(character, "nature", proficiency);
    const levelMultiplier = getTechnicalLevel(abilityLevelToUse, totalLevelToUse);

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
 * `abilityLevel` and `proficiency` are given, those are used while the fallback is the calculations 
 * based off the `character` object given.
 * @param {object} props
 * @param {object | null} [props.character] - optional object containing an `abilities` object with their corresponding levels. 
 * @param {number | null} [props.abilityLevel] - optional int, default is `null`. Represents the survival ability level of the 
 * character. If not provided, will get the survival ability level from the given `character`.
 * @param {boolean | null} [props.proficiency] - optional bool, whether or not this character has the adrenaline proficiency.
 * If not provided, will get from the given `character`.
 * @returns {number}
 */
const calculateAdrenalineRegen = ({ character=null, abilityLevel=null, proficiency=null }) => {

    // Get the levels and proficiencies of this character
    const abilityLevelToUse = getAbilityLevel(character, "survival", abilityLevel);
    const hasProficiency = getStatProficiency(character, "adrenaline", proficiency)

    // Return early with the base regen if they do not have the adrenaline proficiency
    if(!hasProficiency) return ADRENALINE_REGEN_BASE;

    // Calculate the characters adrenaline regen
    return Math.floor(
        // Starting base regen, multiplied by...
        ADRENALINE_REGEN_BASE * 
        
        // A multiplier based on how many survival levels one has
        (1 + (ADRENALINE_REGEN_SURVIVAL_MULTIPLIER * abilityLevelToUse))
    )
}

/**
 * Calculates a character's health point regeneration based on their total level, survival level, and vitality proficiency.
 * You can simply give this function the `character` object and it will calculate everything it needs. Alteratively, if
 * `totalLevel`, `abilityLevel`, and `proficiency` are given, those are used while the fallback is the calculations 
 * based off the `character` object given.
 * @param {object} props
 * @param {object | null} [props.character] - optional object containing an `abilities` object with their corresponding levels. 
 * @param {number | null} [props.totalLevel] - optional int, default is `null`. Represents the total level of the character. If 
 * not provided, will calculate the total level within this function from the given `character`.
 * @param {number | null} [props.abilityLevel] - optional int, default is `null`. Represents the survival ability level of the 
 * character. If not provided, will get the survival ability level from the given `character`.
 * @param {boolean | null} [props.proficiency] - optional bool, whether or not this character has the vitality proficiency.
 * If not provided, will get from the given `character`.
 * @returns {number}
 */
const calculateHpRegen = ({ character=null, totalLevel=null, abilityLevel=null, proficiency=null }) => {

    // Get the levels and proficiencies of this character
    const totalLevelToUse = getTotalLevel(character, totalLevel);
    const abilityLevelToUse = getAbilityLevel(character, "survival", abilityLevel);
    const hasProficiency = getStatProficiency(character, "vitality", proficiency);

    // Return early with the base regen if they do not have the vitality proficiency
    if(!hasProficiency) return HP_REGEN_BASE;

    // Calculate the characters health point regen
    return Math.floor(
        // Starting base regen, plus...
        HP_REGEN_BASE + (
            
            // Health statically regened as a character levels up, multiplied by...
            (HP_REGEN_PER_LEVEL * totalLevelToUse) *

            // A multiplier based on how many survival levels one has
            (1 + (HP_REGEN_SURVIVAL_MULTIPLIER * abilityLevelToUse))
        )
    )
}


/**
 * Calculates a character's maximum health points based on their total level and survival ability level. You can simply give
 * this function the `character` object and it will calculate everything it needs. Alteratively, if `totalLevel` and 
 * `abilityLevel` are given, those are used while the fallback is the calculations based off the `character` object given.
 * @param {object} props
 * @param {object | null} [props.character] - optional object containing an `abilities` object with their corresponding levels. 
 * @param {number | null} [props.totalLevel] - optional int, default is `null`. Represents the total level of the character. If 
 * not provided, will calculate the total level within this function from the given `character`.
 * @param {number | null} [props.abilityLevel] - optional int, default is `null`. Represents the survival ability level of the 
 * character. If not provided, will get the survival ability level from the given `character`.
 * @returns {number}
 */
const calculateHpMax = ({character=null, totalLevel=null, abilityLevel=null}) => {

    // Get the levels of this character
    const totalLevelToUse = getTotalLevel(character, totalLevel);
    const abilityLevelToUse = getAbilityLevel(character, "survival", abilityLevel);
    const levelMultiplier = getTechnicalLevel(abilityLevelToUse, totalLevelToUse);

    // Calculate the characters health points 
    return Math.floor(
        // Starting base health, plus...
        HP_BASE + (

            // Health statically gained as a character levels up, multiplied by...
            (HP_PER_LEVEL * levelMultiplier) *

            // A multiplier based on how many survival levels one has
            (1 +(HP_SURVIVAL_MULTIPLIER * abilityLevelToUse))
        )
    )
}


//______________________________________________________________________________________
// ===== Main =====

export const calculateCharacterBuild = (character) => {

    // Return early with the givin `character` if it is not an object and its `abilities` is not an object. 
    if(!(character && isObj(character.abilities))) return character;

    // Deconstruct the ability levels for easier access
    const { survival, strength, charisma, dexterity, intelligence } = character.abilities;

    // Get the total level of this character
    const totalLevel = getTotalLevel(character);

    const hpMax = calculateHpMax({ character, totalLevel, abilityLevel:survival })

    return {
        ...character,
        level: totalLevel,
        hpMax,
        hp: hpMax,
        // hpRegen: calculateHpRegen({ character, totalLevel, abilityLevel:survival }),
        hpRegen: 10,
        adrenalineRegen: calculateAdrenalineRegen({ character, abilityLevel:survival }),
        unarmedDamage: calculateMeleeAttackDamage(UNARMED_DAMAGE_BASE, UNARMED_DAMAGE_PER_LEVEL, null, { character, totalLevel, abilityLevel:strength }),
        defense: calculateDefense({ character, totalLevel, abilityLevel:strength }),
        criticalDamage: calculateCriticalDamage({ character, totalLevel, abilityLevel:strength }),
        accuracy: calculateAccuracy({ character, totalLevel, abilityLevel:dexterity }),
        evasion: calculateEvasion({ character, totalLevel, abilityLevel:dexterity }),
        statBonuses:{
            nature: calculateNature({ character, totalLevel, abilityLevel:survival }),
            perception: calculatePerception({ character, totalLevel, abilityLevel:survival }),
            deception: calculateDeception({ character, totalLevel, abilityLevel:charisma }),
            intimidation: calculateIntimidation({ character, totalLevel, abilityLevel:charisma }),
            persuasion: calculatePersuasion({ character, totalLevel, abilityLevel:charisma }),
            stealth: calculatePersuasion({ character, totalLevel, abilityLevel:dexterity }),
            investigation: calculateInvestigation({ character, totalLevel, abilityLevel:intelligence }),
            history: calculateHistory({ character, totalLevel, abilityLevel:intelligence }),
            medicine: calculateMedicine({ character, totalLevel, abilityLevel:intelligence }),
            weaponry: calculateWeaponry({ character, totalLevel, abilityLevel:intelligence }),
        }
    }

}