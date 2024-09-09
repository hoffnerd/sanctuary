import { defaultAbilities } from "./game/crew";


export const defaultSaveData = {    

    crew: {
        player: {
            key: "player",
            abilities: { ...defaultAbilities },
            proficiencies: [],
        },
    }, 

    party: [ "player" ],

    inventory: [],

    narrative: [],
}