import useTypingText from "@/hooks/useTypingText";
import { chapters } from "./narrative/chapters";
import { C00 } from "./narrative/C00";




export const narrativeData = {
    ...chapters,
    ...C00,

    unknown: {
        id:"unknown",
        title: "Unknown Path",
        content: <div>Unknown Path</div>,
    },
    end:{
        id: "C00.end",
        title: "End",
        content: <div>You have reached the end of the playable content.</div>,
    },

    "C0.1": {
        id: "C0.1",
        title: "Wake Up",
        prerequisites: [ "C0", ],
        content: ({ shouldTypeText }) => {
            const [ renderTypingText ] = useTypingText([ 
                `You wake up in a forest, cold and alone. For some reason, you are having trouble remembering how you even got here. You look around and notice that your in a small abandoned camp site. A tent still standing with the zipper of the door flaps hitting the poles in the wind. Basic camping supplies lie on the ground, scattered as if the place had been ransacked. You look to the sky, it's hard to tell with the tree tops blocking most of it, you determine sunrise will be here shortly.`,
                { component:"br" },
                { component:"br" },
                "What do you do?"
            ], { shouldTypeText });
            return renderTypingText();
        },
        choices: [
            { id: "C0.1.a", display: "Search the camp site" },
            { id: "C0.1.b", display: "Venture into the forest" },
        ],
    },
    "C0.1.a":{
        id: "C0.1.a",
        title: "Camp Site",
        prerequisites: [ "C0.1", ],
        rewards: {
            items: [ "w1" ],
        },
        content: ({ shouldTypeText }) => {
            const [ renderTypingText ] = useTypingText([
                `You take some time to look over the camp. The first thing you notice is that the fire pit has not been lit in a long while, with sunrise approaching looks like there is no `,
                { component:"em", className:"neonText neonTextGlow red",  text:"Dark Room" },
                ` here. You gather up some of the supplies scattered about and find an old rusty kitchen knife. Taking a peak into the tent, you see a cream colored, elongated, oval shaped cocoon on the ground. Seems to be the size of an adult human.`,
            ], { shouldTypeText });
            return renderTypingText();
        },
        choices: [
            "C0.1.a.i",
            "C0.1.a.ii",
            { id: "C0.1.a.iii", display: "Back away from the tent" },
        ],
    },
    "C0.1.b":{
        id: "C0.1.b",
        title: "Forest",
        prerequisites: [ "C0.1", ],
        rewards: {
            abilities: {
                random: { intelligence: 1, dexterity: 1 }
            }
        },
        content: ({ shouldTypeText }) => {
            const [ renderTypingText ] = useTypingText(
                `You wonder into the forest not knowing where to go. It's quiet, so quiet you can hear all of nature, birds chirping, squirrels foraging, trees moving in the wind. Not know what's out here, you try to remain silent as you traverse the forest.`,
                { shouldTypeText }
            );
            return renderTypingText();
        },
        nextNarrative: "C0.2-V3"
    },

    "Copy":{
        id: "",
        title: "",
        prerequisites: [ "", ],
        rewards: {},
        content: <></>,
        choices: [
            { id: "", display: "" },
        ],
    },
}