
export const partyLimitMax = 4

export const defaultAbilities = {
    charisma: 1,
    dexterity: 1,
    intelligence: 1,
    survival: 1,
    strength: 1,
    weaponry: 1,
}

const defaultSkills = {
    percentIncrease:{
        display: "Percent Increase",
        type: "percentIncrease",
        pointsRequired: 0,
        percent: 0.01,
        isPassive: false,
    }
}

export const crewData = {
    bartonSimon: {
        id: "bartonSimon",
        display: "Simon Barton",
        skills:[
            { ...defaultSkills.percentIncrease, ability:"strength", isPassive:true },
            { ...defaultSkills.percentIncrease, ability:"strength", pointsRequired:3, percent: 0.05 },
            { ...defaultSkills.percentIncrease, ability:"strength", pointsRequired:10, percent: 0.05, isPassive:true },
        ]
    },

    copy: {
        id: "copy",
        display: "Copy",
        skills:[
            { ...defaultSkills.percentIncrease, ability: "" }
        ],
        journal: [
            {
                display: "Copy",
                content: "Copy",
                prerequisite: {}
            }
        ]
    },
}