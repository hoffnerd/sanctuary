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
import { defaultSaveData } from "@/data/defaultSaveData";
import { narrativeData } from "@/data/game/narrative";
// Other-----------------------------------------------------------------------------
import { checkRoleAccessLevel, isArray, isObj } from "@/util";



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

    const shouldDoThisNarrative = (chapterToCheck, narrativeIdToCheck) => {
        const prerequisites = isObj(narrativeData[narrativeIdToCheck], ["prerequisites"]) ? narrativeData[narrativeIdToCheck].prerequisites : [];
        let metPrerequisites = true;
        for (let i = 0; i < prerequisites.length; i++) {
            const prerequisite = prerequisites[i];
            if(narrative.includes(prerequisite)){
                metPrerequisites = false;
                break;
            }
        }
        return initialized && chapter === chapterToCheck && metPrerequisites && (!narrative.includes(narrativeIdToCheck))
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
        if(!shouldDoThisNarrative(0, "C0.1")) return;
        saveGame({ narrative: [ "C0.1" ] });
    }, [initialized, chapter, narrative])
    


    //______________________________________________________________________________________
    // ===== Component Return =====

    if(!(checkRoleAccessLevel(session, "ADMIN") && debugMode && initialized)) return;
    
    return <>
        <p>narrative: {isArray(narrative) && narrative[narrative.length-1]}</p>
    </>
        
}