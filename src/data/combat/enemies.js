import { DEFAULT_ABILITY_LEVELS } from "../_config";



const SHARED_DEFAULTS = {
    abilities: { ...DEFAULT_ABILITY_LEVELS },
    proficiencies: [],
    equipment: {},
    isHidden: true,
}



export const enemies = {
    hardyThug: {
        ...SHARED_DEFAULTS,
        id: "hardyThug",
        display: "Hardy Thug",
        abilities: {
            ...DEFAULT_ABILITY_LEVELS,
            survival: 5,
        },
        proficiencies: [ "vitality", "adrenaline" ],
    },
    strongThug: {
        ...SHARED_DEFAULTS,
        id: "strongThug",
        display: "Strong Thug",
        abilities: {
            ...DEFAULT_ABILITY_LEVELS,
            strength: 5,
        },
        proficiencies: [ "meleeAttack", "defense" ],
    },
    trickyThug: {
        ...SHARED_DEFAULTS,
        id: "trickyThug",
        display: "Tricky Thug",
        abilities: {
            ...DEFAULT_ABILITY_LEVELS,
            charisma: 5,
        },
        proficiencies: [ "deception", "intimidation", "persuasion" ],
    },
    fastThug: {
        ...SHARED_DEFAULTS,
        id: "fastThug",
        display: "Fast Thug",
        abilities: {
            ...DEFAULT_ABILITY_LEVELS,
            dexterity: 5,
        },
        proficiencies: [ "accuracy", "evasion" ],
    },
    smartThug: {
        ...SHARED_DEFAULTS,
        id: "smartThug",
        display: "Smart Thug",
        abilities: {
            ...DEFAULT_ABILITY_LEVELS,
            intelligence: 5,
        },
        proficiencies: [ "medicine", "weaponry" ],
    },
}