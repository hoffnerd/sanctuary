import { enemies } from "./enemies";


const { hardyThug, strongThug, trickyThug, fastThug, smartThug } = enemies;


export const test = {
    settings: {
        randomize:  {
            show: 2
        }
    },
    enemies: {
        hardyThug,
        strongThug,
        trickyThug,
        fastThug,
        smartThug,
    },
}