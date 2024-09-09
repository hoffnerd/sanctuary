"use client"

// Stores----------------------------------------------------------------------------
import { useCombatStore } from "@/stores/combat";
// Components------------------------------------------------------------------------
import NarrativeDisplay from "@/components/Game/Panels/NarrativeDisplay";
// Other-----------------------------------------------------------------------------
import { isArray, isObj } from "@/util";



//______________________________________________________________________________________
// ===== Component  =====
export default function Narrative({ }){

    //______________________________________________________________________________________
    // ===== Store =====
	const actionHistory = useCombatStore((state) => state.actionHistory);



    //______________________________________________________________________________________
    // ===== Constants =====
    const latestActionHistoryId = isArray(actionHistory) && actionHistory[actionHistory.length-1]?.id ? actionHistory[actionHistory.length-1].id : 0;



    //______________________________________________________________________________________
    // ===== Component Return  =====
    if(isArray(actionHistory)){ 
        const reversedActionHistory = [...actionHistory].reverse();
        return reversedActionHistory.map((actionHistoryObj, index) => {
            const shouldTypeText = latestActionHistoryId === actionHistoryObj.id;
            
            // Key is `index` AND `narrativeId` here because if it is just the `narrativeId` then it 
            // does not update the `shouldTypeText` within the content functions of the `narrativeData`
            return (
                <div key={`${index}_${actionHistoryObj.id}`}>
                    {index !== 0 && <><hr/><br/></>}
                    <NarrativeDisplay
                        narrativeObj={actionHistoryObj}
                        shouldTypeText={shouldTypeText}
                    />
                    <br/>
                </div>
            )
        })
    }
} 