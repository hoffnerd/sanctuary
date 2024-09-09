export const stats = {
    vitality: {
        key: "vitality",
        display: "Vitality",
        shortDescription: "Health Regen",
        description: "Your body is experienced in taking hits. It has learned to heal it's wounds quickly.",
        techDescription: "With this proficiency, starting at level 1, you regenerate health points after each of your turns in combat. The number of health points regenerated is based off of your level and survival level.",
        ability: "survival"
    },
    adrenaline: {
        key: "adrenaline",
        display: "Adrenaline",
        shortDescription: "",
        description: "",
        techDescription: "With this proficiency, you can regenerate even more adrenaline after each turn in combat. The number of adrenaline points regenerated is based off of your level and survival level.",
        ability: "survival"
    },
    nature: {
        key: "nature",
        display: "Perception",
        shortDescription: "",
        description: "",
        techDescription: "",
        ability: "survival"
    },
    perception: {
        key: "perception",
        display: "Perception",
        shortDescription: "",
        description: "",
        techDescription: "",
        ability: "survival"
    },
    meleeAttack: {
        key: "meleeAttack",
        display: "Melee Atk.",
        shortDescription: "",
        description: "Deal more melee damage to your targets.",
        techDescription: "Melee weapon attack damage is based on a weapon's damage, your level, and your strength level. Even more damage is output with gaining this proficiency.",
        ability: "strength"
    },
    defense: {
        key: "defense",
        display: "Defense",
        shortDescription: "",
        description: "",
        techDescription: "The percentage that incoming damage is decreased by. Defense percent is based on your level and strength level. Even more defense is gained with obtaining this proficiency.",
        ability: "strength"
    },
    criticalDamage: {
        key: "criticalDamage",
        display: "Critical Damage",
        shortDescription: "",
        description: "",
        techDescription: "The percentage that damage is increased by when landing a critical hit. Critical Damage percent is based on your level and strength level. Even more critical damage percentage is gained with obtaining this proficiency.",
        ability: "strength"
    },
    deception: {
        key: "deception",
        display: "Deception",
        shortDescription: "",
        description: "",
        techDescription: "",
        ability: "charisma"
    },
    intimidation: {
        key: "intimidation",
        display: "Intimidation",
        shortDescription: "",
        description: "",
        techDescription: "",
        ability: "charisma"
    },
    persuasion: {
        key: "persuasion",
        display: "Persuasion",
        shortDescription: "",
        description: "",
        techDescription: "",
        ability: "charisma"
    },
    accuracy: {
        key: "accuracy",
        display: "Accuracy",
        shortDescription: "",
        description: "",
        techDescription: "",
        ability: "dexterity"
    },
    evasion: {
        key: "evasion",
        display: "Evasion",
        shortDescription: "",
        description: "",
        techDescription: "",
        ability: "dexterity"
    },
    stealth: {
        key: "stealth",
        display: "Stealth",
        shortDescription: "",
        description: "",
        techDescription: "",
        ability: "dexterity"
    },
    investigation: {
        key: "investigation",
        display: "Investigation",
        shortDescription: "",
        description: "",
        techDescription: "",
        ability: "intelligence"
    },
    history: {
        key: "history",
        display: "History",
        shortDescription: "",
        description: "",
        techDescription: "",
        ability: "intelligence"
    },
    medicine: {
        key: "medicine",
        display: "Medicine",
        shortDescription: "",
        description: "",
        techDescription: "",
        ability: "intelligence"
    },
    weaponry: {
        key: "weaponry",
        display: "Weaponry",
        shortDescription: "",
        description: "",
        techDescription: "",
        ability: "intelligence"
    },

}

export const abilities = {
    survival: {
        key: "survival",
        display: "Survival",
        shortDescription: "Endurance & Health",
        description: "",
        stats: {
            vitality: stats.vitality,
            adrenaline: stats.adrenaline,
            nature: stats.nature,
            perception: stats.perception,
        },
    },
    strength: {
        key: "strength",
        display: "Strength",
        shortDescription: "Physical Power",
        description: "",
        stats: {
            meleeAttack: stats.meleeAttack,
            defense: stats.defense,
            criticalDamage: stats.criticalDamage,
        },
    },
    charisma: {
        key: "charisma",
        display: "Charisma",
        shortDescription: "Force of Personality",
        description: "",
        stats: {
            deception: stats.deception,
            intimidation: stats.intimidation,
            persuasion: stats.persuasion,
        },
    },
    dexterity: {
        key: "dexterity",
        display: "Dexterity",
        shortDescription: "Agility & Accuracy",
        description: "",
        stats: {
            accuracy: stats.accuracy,
            evasion: stats.evasion,
            stealth: stats.stealth,
        },
    },
    intelligence: {
        key: "intelligence",
        display: "Intelligence",
        shortDescription: "Reasoning & Memory",
        description: "",
        stats: {
            investigation: stats.investigation,
            history: stats.history,
            medicine: stats.medicine,
            weaponry: stats.weaponry,
        },
    },
}