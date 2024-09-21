/*
    Each component may have their own config objects or constants. 
    This is just a master one of either shared settings across multiple components, 
    or just easier to have here so I don't have to search multiple files to turn off random features.
*/

/** @constant {boolean} - this is just an example */
export const example = true;

/** @constant {number} - the amount of time to type each character in microseconds */
export const typingCharacterInterval = 25; 

/** @constant {number} - the amount of time before we do an auto save in seconds */ 
export const saveInterval = 300; 

/** @constant {number} - the amount of time before we auto run the the next narrative, if there are no choices in microseconds */
export const nextNarrativeInterval = 2500; 



//______________________________________________________________________________________
// ===== Save File Configuration =====

/** @constant {object} - the default ability levels a character has */
export const DEFAULT_ABILITY_LEVELS = {
    survival: 0,
    strength: 0,
    charisma: 0,
    dexterity: 0,
    intelligence: 0,
}

/** @constant {object} - the default saveData each safe file should have. */
export const DEFAULT_SAVE_DATA = {    

    crew: {
        player: {
            id: "player",
            abilities: { ...DEFAULT_ABILITY_LEVELS },
            proficiencies: [],
        },
    }, 

    party: [ "player" ],

    inventory: [],

    narrative: [],
}

/** @constant {object} - the default saveFile, AKA the DB entry (row). */
export const DEFAULT_SAVE_FILE = { name: "Player", saveData: DEFAULT_SAVE_DATA }



//______________________________________________________________________________________
// ===== Combat Configuration =====

export const COMBAT_DEFAULT_FRIENDLY = {
    isFriendly: true,
    isDead: false,
    isUnconscious: false,
    isHidden: true,
}

/** @constant {number} - how many adrenaline points one can have */
export const MAX_ADRENALINE_POINTS = 5;

/** @deprecated - use `MAX_ADRENALINE_POINTS` instead */
export const maxAdrenalinePoints = MAX_ADRENALINE_POINTS; 

/** @constant {number} - At level 0 how much of a chance you get to hit */
export const CHANCE_TO_HIT_BASE = 5;

/** @constant {number} - the percent to increase the chance to hit by for every miss */
export const CHANCE_TO_HIT_INCREASE_PER_MISS = 0.01;



//______________________________________________________________________________________
// ===== Character Configuration =====

/** @constant {number} - the level to use in some calculations if a character is at level 0 */
export const TECHNICAL_LEVEL_0 = 0.5;

/** @constant {number} - how many ability points a character has at level 0. */
export const ABILITY_POINTS_AT_LEVEL_0 = 5;

/** @constant {number} - the base hp a character has. */
export const HP_BASE = 10;

/** @constant {number} - the hp a character gains per total level. */
export const HP_PER_LEVEL = 5;

/** @constant {number} - the multiplier to use when calculating the bonus health one gets from their survival ability level. */
export const HP_SURVIVAL_MULTIPLIER = 0.2; 

/** @constant {number} - the base hp regenerated at the end of a characters turn. */
export const HP_REGEN_BASE = 0;

/** @constant {number} - the hp regenerated per total level at the end of a characters turn. */
export const HP_REGEN_PER_LEVEL = 1;

/** @constant {number} - the multiplier to use when calculating the bonus health regenerated one gets from their survival ability level. */
export const HP_REGEN_SURVIVAL_MULTIPLIER = 0.1; 

/** @constant {number} - the base adrenaline regenerated at the end of a characters turn. */
export const ADRENALINE_REGEN_BASE = 1;

/** @constant {number} - the multiplier to use when calculating the bonus adrenaline regenerated one gets from their survival ability level. */
export const ADRENALINE_REGEN_SURVIVAL_MULTIPLIER = 0.1; 

/** @constant {number} - the base damage an unarmed strike does. */
export const UNARMED_DAMAGE_BASE = 1;

/** @constant {number} - the damage that scales with a characters total level. */
export const UNARMED_DAMAGE_PER_LEVEL = 0.5;

/** @constant {number} - the multiplier to use when calculating the damage one gets from their strength ability level. */
export const DAMAGE_STRENGTH_MULTIPLIER = 0.1;

/** @constant {number} - the multiplier to use when calculating the damage one gets from their melee attack proficiency ability level. */
export const MELEE_ATTACK_PROFICIENCY_MULTIPLIER = 0.1;

/** @constant {number} - the base defense a character has. */
export const DEFENSE_BASE = 0;

/** @constant {number} - the defense per total level a character has. */
export const DEFENSE_PER_LEVEL = 0.25;

/** @constant {number} - the multiplier to use when calculating the bonus defense one gets from their strength ability level. */
export const DEFENSE_STRENGTH_MULTIPLIER = 0.1; 

/** @constant {number} - the multiplier to use when calculating the defense one gets from their defense proficiency ability level. */
export const DEFENSE_PROFICIENCY_MULTIPLIER = 0.1;

/** @constant {number} - the maximum defense a character has based off their stats. */
export const DEFENSE_STAT_BASED_MAX = 25;

/** @constant {number} - the maximum defense a character has based off their equipment. */
export const DEFENSE_EQUIPMENT_BASED_MAX = 25;

/** @constant {number} - the base critical damage percent a character has. */
export const CRITICAL_DAMAGE_BASE = 5;

/** @constant {number} - the critical damage percent per total level a character has. */
export const CRITICAL_DAMAGE_PER_LEVEL = 0.25;

/** @constant {number} - the multiplier to use when calculating the bonus critical damage percent one gets from their strength ability level. */
export const CRITICAL_DAMAGE_STRENGTH_MULTIPLIER = 0.45; 

/** @constant {number} - the multiplier to use when calculating the critical damage percent one gets from their critical damage proficiency ability level. */
export const CRITICAL_DAMAGE_PROFICIENCY_MULTIPLIER = 0.45;

/** @constant {number} - the maximum critical damage percent a character can have. */
export const CRITICAL_DAMAGE_MAX = 100;

/** @constant {number} - the base accuracy percent bonus a character has. */
export const ACCURACY_BASE = 0;

/** @constant {number} - the accuracy percent bonus per total level a character has. */
export const ACCURACY_PER_LEVEL = 0.25;

/** @constant {number} - the multiplier to use when calculating the accuracy percent bonus one gets from their dexterity ability level. */
export const ACCURACY_DEXTERITY_MULTIPLIER = 0.1; 

/** @constant {number} - the multiplier to use when calculating the accuracy percent bonus one gets from their accuracy proficiency ability level. */
export const ACCURACY_PROFICIENCY_MULTIPLIER = 0.1;

/** @constant {number} - the maximum accuracy percent bonus a character can have. */
export const ACCURACY_MAX = 25;

/** @constant {number} - the base evasion a character has. */
export const EVASION_BASE = 15;

/** @constant {number} - the evasion per total level a character has. */
export const EVASION_PER_LEVEL = 0.25;

/** @constant {number} - the multiplier to use when calculating the bonus evasion one gets from their dexterity ability level. */
export const EVASION_DEXTERITY_MULTIPLIER = 0.5; 

/** @constant {number} - the multiplier to use when calculating the bonus evasion one gets from their evasion proficiency ability level. */
export const EVASION_PROFICIENCY_MULTIPLIER = 0.25;

/** @constant {number} - the maximum evasion a character can have. */
export const EVASION_MAX = 90;