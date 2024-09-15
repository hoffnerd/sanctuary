import { DEFAULT_ABILITY_LEVELS } from "../_config"


export const partyLimitMax = 4


/** @deprecated - use DEFAULT_ABILITY_LEVELS */
export const defaultAbilities = DEFAULT_ABILITY_LEVELS


export const crewData = {
    bartonSimon: {
        id: "bartonSimon",
        display: "Simon",
        fullName: "Simon Barton",
        unspentLevels: 0,
        abilities: {
            ...DEFAULT_ABILITY_LEVELS,
            survival: 2,
            strength: 3,
        },
        proficiencies: [ "adrenaline", "meleeAttack" ],
        equipment: {},
    },

    copy: {
        id: "copy",
        display: "Copy",
        fullName: "Copy",
        unspentLevels: 0,
        abilities: {
            ...DEFAULT_ABILITY_LEVELS,
        },
        proficiencies: [ "", "" ],
        equipment: {},
        journal: [
            {
                display: "Copy",
                content: "Copy",
                prerequisite: {}
            }
        ]
    },
}