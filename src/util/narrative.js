import useTypingText from "@/hooks/useTypingText";
import { isArray, isObj } from ".";



/**
 * Calculates the total length of text content within a given input, which can be a string or an array of objects containing text properties.
 * @param {string | Array<string | object>} content - string or an array of strings or objects. 
 * If theres an object in the array, should have a `text` property that contains a string. 
 * @returns {number}
 */
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

/**
 * Uses the `useTypingText` hook to render typing effect for the given content based on the `shouldTypeText` flag.
 * @param {boolean} shouldTypeText - boolean, determines whether the text should be typed out or displayed instantly. 
 * If `shouldTypeText` is `true`, the text will be typed out character by character as if someone is typing it.
 * @param {string | Array<string | object>} content - string or an array of strings or objects, the text that you want to be
 * typed out. It is the actual content that will be displayed as if it is being typed on the screen.
 * @returns {React.JSX.Element}
 */
export const typeText = (shouldTypeText, content) => {
    const [ renderTypingText ] = useTypingText(content, { shouldTypeText });
    return renderTypingText();
}

/**
 * Determines if a hook should be executed and if text should be typed, then returns an 
 * object with the rendered content and the length of the content text.
 * @param {boolean | false} [shouldDoHook] - boolean, default is `false`. Determines whether a hook
 * should be executed or not. If `shouldDoHook` is `true`, the `typeText` function will be called with
 * the specified `shouldTypeText` and `content` parameters. 
 * @param {boolean | false} [shouldTypeText=false] - boolean, default is `false`. Determines whether 
 * the text should be typed out or displayed instantly. If `shouldTypeText` is `true`, the text will 
 * be typed out character by character as if someone is typing it.
 * @param {string | Array<string | object>} content - string or an array of strings or objects, the text that you want to be
 * typed out. It is the actual content that will be displayed as if it is being typed on the screen.
 * @returns {{
 *  render: React.JSX.Element | null
 *  contentTextLength: number
 * }}
 */
export const generateContent = (shouldDoHook=false, shouldTypeText=false, content) => ({
    render: shouldDoHook ? typeText(shouldTypeText, content) : null,
    contentTextLength: getContentTextLength(content)
})