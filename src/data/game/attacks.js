export const attacksLibrary = {
    testAttack: {
        id: "testAttack",
        display: "Test Attack",
        targets: 1,
        damage: 4,
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
        damage: 2,
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