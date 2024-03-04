"use client"

// Packages--------------------------------------------------------------------------
import { useParams } from "next/navigation";
// Styles----------------------------------------------------------------------------
import { useReadSaveFile } from "@/rQuery/hooks/saveFile";
// Data------------------------------------------------------------------------------
import { narrativeData } from "@/data/game/narrative"
// Components------------------------------------------------------------------------
import NarrativeDisplay from "./NarrativeDisplay";
// Other-----------------------------------------------------------------------------
import { isArray, isObj } from "@/util";
import { Fragment } from "react";



//______________________________________________________________________________________
// ===== Component  =====
export default function Narrative({ }){

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



    //______________________________________________________________________________________
    // ===== Component Return  =====
    if(isArray(narrative)){ 
        const reversedNarrative = [...narrative].reverse();
        return reversedNarrative.map((narrativeId, index) => {
            const narrativeObj = narrativeData[narrativeId];
            const shouldTypeText = narrativeObj.id === latestNarrativeId;
            return <Fragment key={narrativeId} >
                {index !== 0 && <><hr/><br/></>}
                <NarrativeDisplay 
                    narrativeObj={narrativeObj} 
                    shouldTypeText={shouldTypeText} 
                />
            </Fragment>
        })
    }
} 