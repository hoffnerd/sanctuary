import useTypingText from "@/hooks/useTypingText";
 


const chapterNames = {
    C00: "Chapter 00: I Am Who Am",
    C0: "Chapter 0: Again"
}



const chapterContent = (shouldTypeText, chapterName) => {
    const [ renderTypingText ] = useTypingText([ 
        { component:"h2", className:"text-xl font-bold", text:chapterName } 
    ], { shouldTypeText });
    return renderTypingText();
}



export const chapters = {
    "C00": {
        id: "C00",
        title: chapterNames.C00,
        content: ({ shouldTypeText }) => chapterContent(shouldTypeText, chapterNames.C00),
        contentCharacters: chapterNames.C00.length,
        nextNarrative: "C00.1",
    },
    "C0": {
        id: "C0",
        title: chapterNames.C0,
        content: ({ shouldTypeText }) => chapterContent(shouldTypeText, chapterNames.C0),
        contentCharacters: chapterNames.C0.length,
        nextNarrative: "C0.1",
    },
}