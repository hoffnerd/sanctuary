
import { generateContent } from "@/util/narrative";
 


export const chapterNames = {
    C00: "Chapter 00: I Am Who Am",
    C0: "Chapter 0: Again"
}



export const chapters = {
    "C00": {
        id: "C00",
        title: chapterNames.C00,
        content: ({ shouldDoHook=false, shouldTypeText }) => generateContent(shouldDoHook, shouldTypeText, [
            { component:"h2", className:"text-xl font-bold", text:chapterNames.C00 }
        ]),
        nextNarrative: "C00.1",
    },
    "C0": {
        id: "C0",
        title: chapterNames.C0,
        content: ({ shouldDoHook=false, shouldTypeText }) => generateContent(shouldDoHook, shouldTypeText, [
            { component:"h2", className:"text-xl font-bold", text:chapterNames.C0 }
        ]),
        nextNarrative: "C0.1",
    },
}