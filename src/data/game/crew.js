

export const partyLimitMax = 4

export const defaultAbilities = {
    survival: 0,
    strength: 0,
    charisma: 0,
    dexterity: 0,
    intelligence: 0,
}


export const crewData = {
    bartonSimon: {
        id: "bartonSimon",
        display: "Simon",
        fullName: "Simon Barton",
        unspentLevels: 0,
        abilities: {
            ...defaultAbilities,
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
            ...defaultAbilities,
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