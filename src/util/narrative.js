import useTypingText from "@/hooks/useTypingText";

export const typeText = (shouldTypeText, text) => {
    const [ renderTypingText ] = useTypingText(text, { shouldTypeText });
    return renderTypingText();
}