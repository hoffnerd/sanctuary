"use client"

// Packages--------------------------------------------------------------------------
import { Fragment } from "react";
import { useParams } from "next/navigation";
// Styles----------------------------------------------------------------------------
import { useReadSaveFile } from "@/rQuery/hooks/saveFile";
// Data------------------------------------------------------------------------------
import { narrativeData } from "@/data/game/narrative"
// Components------------------------------------------------------------------------
import NarrativeDisplay from "./NarrativeDisplay";
// Other-----------------------------------------------------------------------------
import { isArray, isObj } from "@/util";
import ChoiceDisplay from "./ChoiceDisplay";


const defaultNarrativeObj = { 
    choices: [], 
    nextNarrative: null, 
    shouldShowContinueBtn: true,
}


//______________________________________________________________________________________
// ===== Component  =====
export default function Choices({}){

    //______________________________________________________________________________________
    // ===== URL Params =====
    const params = useParams();
    const saveFileId = isObj(params, [ 'id' ]) ? params.id : null;



    //______________________________________________________________________________________
    // ===== Hooks =====
    const { data:saveFile } = useReadSaveFile(saveFileId);
    if(!isObj(saveFile, [ "id", "saveData" ])) return;



    //______________________________________________________________________________________
    // ===== Constants =====
    const { saveData: { narrative } } = saveFile;
    const latestNarrativeId = isArray(narrative) ? narrative[narrative.length-1] : null;
    const { 
        choices, 
        nextNarrative, 
        shouldShowContinueBtn 
    } = latestNarrativeId && isObj(narrativeData[latestNarrativeId]) 
        ? { ...defaultNarrativeObj, ...narrativeData[latestNarrativeId] } 
        : { ...defaultNarrativeObj };




    //______________________________________________________________________________________
    // ===== Render Functions =====
    const renderChoices = () => {
        let choiceDisplays = [];
        isArray(choices) && choices.forEach(choice => {
            const id = isObj(choice, [ "id" ]) ? choice.id : choice;
            if(isArray(narrative) && narrative.includes(id)) return;
            choiceDisplays.push( <ChoiceDisplay key={id} choice={choice} /> );
        });

        if(isArray(choiceDisplays)) return choiceDisplays;
        if(nextNarrative && shouldShowContinueBtn) return (
            <ChoiceDisplay key={nextNarrative} choice={{ id:nextNarrative, display:"Continue" }} />
        )
        return "No choices to make right now...";
    }



    //______________________________________________________________________________________
    // ===== Component Return =====
    return <>
        <h2 className="text-xl">Choices</h2>
        <hr/>
        <div className="p-1"/>
        {renderChoices()}
    </>
} 