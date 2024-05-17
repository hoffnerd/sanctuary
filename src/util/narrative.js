import useTypingText from "@/hooks/useTypingText";
import { isArray, isObj } from ".";



const getContentTextLength = (content) => {
    if(typeof content === "string") return content.length;

    let totalTextLength = 0;
    if(isArray(content)){
        for (let i = 0; i < content.length; i++) {
            const contentObj = content[i];
            const text = isObj(contentObj, ["text"]) ? contentObj.text : contentObj;
            if(typeof text === "string") totalTextLength += text.length;
        }
    } 
    return totalTextLength;
}

export const typeText = (shouldTypeText, content) => {
    const [ renderTypingText ] = useTypingText(content, { shouldTypeText });
    return renderTypingText();
}

export const generateContent = (shouldDoHook=false, shouldTypeText=false, content) => ({
    render: shouldDoHook ? typeText(shouldTypeText, content) : null,
    contentTextLength: getContentTextLength(content)
})