
"use client"

// Packages--------------------------------------------------------------------------
import { useState, useEffect } from "react";
// Styles----------------------------------------------------------------------------
// Data------------------------------------------------------------------------------
// Components------------------------------------------------------------------------
// Other-----------------------------------------------------------------------------
import { isArray, isObj } from "@/util";



//______________________________________________________________________________________
// ===== Constants =====

/** @constant {Object} - object, the default options of the hook */
const defaultOptions = { shouldTypeText:true, autoStart:true }


//______________________________________________________________________________________
// ===== Pure Functions =====

const delay = () => new Promise(res => setTimeout(() => res(), 25));



//______________________________________________________________________________________
// ===== Hook =====
export default function useTypingText(content, options=null){

    //______________________________________________________________________________________
    // ===== Constants =====
    const { shouldTypeText, autoStart } = isObj(options) ? { ...defaultOptions, ...options } : defaultOptions;



    //______________________________________________________________________________________
    // ===== State =====
    const [status, setStatus] = useState(false);
    const [contentToDisplay, setContentToDisplay] = useState( isArray(content) ? {} : [] );



    //______________________________________________________________________________________
    // ===== Functions for Use Effects =====

    const updateTextAsArray = async (text, key=null) => {
        for (let i = 0; i < text.length; i++) {
            const character = text[i];
            await delay();
            if(key){ 
                setContentToDisplay((prevContentToDisplay)=>({ 
                    ...prevContentToDisplay, 
                    [key]: isArray(prevContentToDisplay[key]) ? [...prevContentToDisplay[key], character] : [ character ]
                }));
            } else {
                setContentToDisplay((prevContentToDisplay)=>([ ...prevContentToDisplay, character]));
            }
        }
    }



    //______________________________________________________________________________________
    // ===== Use Effects =====

    useEffect(() => {
        if(status) return;
        if(!autoStart) return;
        if(!shouldTypeText) {
            setStatus("completed");
            return;
        }
        setStatus("running");
    }, [autoStart, shouldTypeText, status]);

    useEffect(() => {
        if(status !== "running") return;

        // declare that we are subscribed and want the async function below to happen
        let isSubscribed = true;

        // create an async function that fetches the data so that this `useEffect` may call it below
        const addToTextAsArray = async () => {

            // return early if an unexpected render happened so that the code below does not run twice
            if(!isSubscribed) return;

            if(isArray(content)){
                for (let i = 0; i < content.length; i++) {
                    const contentObj = content[i];
                    const key = isObj(contentObj, ["key"]) ? contentObj.key : `t${i}`;
                    const text = isObj(contentObj, ["text"]) ? contentObj.text : contentObj;
                    await updateTextAsArray(text, key);
                }
            } else {
                await updateTextAsArray(content);
            }

            setStatus("completed");
        }

        // execute the async function defined above
        addToTextAsArray();

        // cancel any future `fetchData` functions
        return () => isSubscribed = false;
    }, [status]);
    


    //______________________________________________________________________________________
    // ===== Render Functions =====

    const renderContent = (shouldUseState) => content.map((contentObj, index) => {
        const key = isObj(contentObj, ["key"]) ? contentObj.key : `t${index}`;
        const Comp = isObj(contentObj, ["component"]) ? contentObj.component : `span`;
        const className = isObj(contentObj, ["className"]) ? contentObj.className : "";
        const text = isObj(contentObj, ["text"]) ? contentObj.text : contentObj;
        const textToDisplay = shouldUseState ? isObj(contentToDisplay, [key]) ? contentToDisplay[key] : "" : text;

        switch (Comp) {
            case "br": return <br key={key}/>;
            case "hr": return <hr key={key}/>;
            default: return (
                <Comp
                    key={key} 
                    className={`${(!shouldUseState) && status !== "completed" ? "invisibleText" : ""} ${className}`}
                >
                    {textToDisplay}
                </Comp>
            );
        }
    })

    const renderTypingText = () => {
        if((!shouldTypeText) || status === "completed") return <div>{isArray(content) ? renderContent(false) : content}</div>;
        
        return <>
            <div className="relative">
                <div className="absolute">{isArray(content) ? renderContent(true) : contentToDisplay}</div>
                <div className="invisibleText" aria-hidden="true">{isArray(content) ? renderContent(false) : content}</div>
            </div>
        </>
    }



    //______________________________________________________________________________________
    // ===== Hook Return =====
    return [ renderTypingText, status ];
}