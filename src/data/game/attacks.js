export const attacksLibrary = {
    bat: {
        id: "bat",
        display: "Bat",
        targets: 1,
        damageBase: 5,
        damagePerLevel: 1,
        damageStrengthMultiplier: 0.5,
        narrative: ({actionTakerObj, targetObj, damage}) => [
            { 
                className: `neonText neonTextGlow ${actionTakerObj.isFriendly ? "blue" : "red"}`, 
                text: actionTakerObj.display 
            },
            ` made a `,
            { className: `neonText neonTextGlow yellow`, text:"Test Attack" },
            ` against `,
            { 
                className: `neonText neonTextGlow ${targetObj.isFriendly ? "blue" : "red"}`, 
                text: targetObj.display 
            },
            ` for `,
            { className: `neonText neonTextGlow yellow`, text:damage },
            ` damage.`
        ]
    },
    testMultiAttack: {
        id: "testMultiAttack",
        display: "Test Multi-Attack",
        targets: 4,
        damageBase: 4,
        damagePerLevel: 0.25,
        damageStrengthMultiplier: 0.5,
        narrative: ({actionTakerObj, targetObj, damage}) => [
            { 
                className: `neonText neonTextGlow ${actionTakerObj.isFriendly ? "blue" : "red"}`, 
                text: actionTakerObj.display 
            },
            ` made a `,
            { className: `neonText neonTextGlow yellow`, text:"Test Multi-Attack" },
            ` against `,
            { 
                className: `neonText neonTextGlow ${targetObj.isFriendly ? "blue" : "red"}`, 
                text: `all ${targetObj.isFriendly ? "friendlies" : "enemies"}`
            },
            ` for `,
            { className: `neonText neonTextGlow yellow`, text:damage },
            ` damage.`
        ]
    }
}