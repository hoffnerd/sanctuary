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