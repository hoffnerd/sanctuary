

export const defaultAbilities = {
    charisma: 1,
    dexterity: 1,
    intelligence: 1,
    survival: 1,
    strength: 1,
    weaponry: 1,
}

export const crewData = {
    bartonSimon: {
        id: "bartonSimon",
        display: "Simon Barton",
        abilities: {
            strength: 3,
            weaponry: 2,
        },
    },

    copy: {
        id: "copy",
        display: "Copy",
        abilities: {
            charisma: 1,
            dexterity: 1,
            intelligence: 1,
            survival: 1,
            strength: 1,
            weaponry: 1,
        },
        journal: [
            {
                display: "Copy",
                content: "Copy",
                prerequisite: {}
            }
        ]
    },
}