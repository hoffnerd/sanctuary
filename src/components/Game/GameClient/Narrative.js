"use client"


// React/Next------------------------------------------------------------------------
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
// Context---------------------------------------------------------------------------
// Stores----------------------------------------------------------------------------
import { useDebugModeStore, useFullScreenDialogStore } from "@/stores/game";
// Hooks-----------------------------------------------------------------------------
import useSaveGame from "@/hooks/useSaveGame";
// Components------------------------------------------------------------------------
// Data------------------------------------------------------------------------------
import { nextNarrativeInterval, typingCharacterInterval } from "@/data/_config";
import { defaultSaveData } from "@/data/defaultSaveData";
import { narrativeData } from "@/data/game/narrative";
// Other-----------------------------------------------------------------------------
import { checkRoleAccessLevel, isArray, isObj } from "@/util";



//______________________________________________________________________________________
// ===== Constants =====

const defaultNarrativeObj = { prerequisites:[], contentCharacters:40, waitTime:nextNarrativeInterval }



//______________________________________________________________________________________
// ===== Component =====
export default function Narrative({ saveData }){

    //______________________________________________________________________________________
    // ===== URL Params  =====
    const params = useParams();
    const saveFileId = isObj(params, [ 'id' ]) ? params.id : null;



    //______________________________________________________________________________________
    // ===== Context =====
    const { data: session, status} = useSession();



    //______________________________________________________________________________________
    // ===== Constants =====
    const { chapter, narrative } = isObj(saveData) ? { ...defaultSaveData, ...saveData } : defaultSaveData;



    //______________________________________________________________________________________
    // ===== Stores =====
    const debugMode = useDebugModeStore((state) => state.debugMode);
    const setDialog = useFullScreenDialogStore((state) => state.setDialog);



    //______________________________________________________________________________________
    // ===== Hooks =====
    const { saveGame } = useSaveGame();


    //______________________________________________________________________________________
    // ===== State =====
    const [initialized, setInitialized] = useState(false);



    //______________________________________________________________________________________
    // ===== Functions for Use Effects =====

    const findChapter = (id) => {
        let regString = "C(.+)";
        const nestedAmount = id && id.split(".").length-1
        for (let i = 1; i < nestedAmount; i++){ regString += ".(.+)" }

        const reg = new RegExp(regString);
        const extracted = reg.exec(id);
        if(isArray(extracted, 1) && extracted[1]) return parseInt(extracted[1]);
        return null
    }

    const shouldDoThisNarrative = (narrativeIdToCheck) => {
        const chapterToCheck = findChapter(narrativeIdToCheck);
        const prerequisites = isObj(narrativeData[narrativeIdToCheck], ["prerequisites"]) ? narrativeData[narrativeIdToCheck].prerequisites : [];
        let metPrerequisites = true;
        for (let i = 0; i < prerequisites.length; i++) {
            const prerequisite = prerequisites[i];
            if(!narrative.includes(prerequisite)){
                metPrerequisites = false;
                break;
            }
        }
        return initialized && chapter === chapterToCheck && metPrerequisites && (!narrative.includes(narrativeIdToCheck))
    }

    const shouldDoNextNarrative = () => {
        if(!(isArray(narrative) && isObj(narrativeData, [ narrative[narrative.length-1] ]))) return { shouldDo:false };
        const { id:mostRecentNarrativeId, nextNarrative, contentCharacters, waitTime  } = { ...defaultNarrativeObj, ...narrativeData[narrative[narrative.length-1]] };
        if(!(mostRecentNarrativeId && nextNarrative)) return { shouldDo:false };
        const nextNarrativeObj = isObj(narrativeData, [nextNarrative]) ? narrativeData[nextNarrative] : null;
        if(!isObj(nextNarrativeObj, ["id"])) return { shouldDo:false };
        const { id } = { ...defaultNarrativeObj, ...nextNarrativeObj };
        return { 
            id,
            shouldDo: shouldDoThisNarrative(id), 
            timeoutTime: (contentCharacters * typingCharacterInterval) + waitTime 
        }
    }


    //______________________________________________________________________________________
    // ===== Use Effects =====

    useEffect(() => {
        if(initialized) return;
        if(!saveFileId) return;
        if(!(narrative && Array.isArray(narrative))) return;
        setInitialized(true);
    }, [initialized, saveFileId])

    useEffect(() => {
        if(!shouldDoThisNarrative("C0")) return;
        saveGame({ narrativeToAdd: "C0" });
    }, [initialized, chapter, narrative])

    useEffect(() => {
        const { id, shouldDo, timeoutTime } = shouldDoNextNarrative();
        if(!shouldDo) return;
        setTimeout(() => {
            saveGame({ narrativeToAdd: id });
        }, timeoutTime);
    }, [initialized, chapter, narrative])
    


    //______________________________________________________________________________________
    // ===== Component Return =====

    if(!(checkRoleAccessLevel(session, "ADMIN") && debugMode && initialized)) return;
    
    return <>
        <p>narrative: {isArray(narrative) && narrative[narrative.length-1]}</p>
    </>
        
}