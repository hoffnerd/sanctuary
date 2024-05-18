"use client"

// Packages--------------------------------------------------------------------------
// Styles----------------------------------------------------------------------------
// Data------------------------------------------------------------------------------
import { narrativeData } from "@/data/game/narrative"
// Components------------------------------------------------------------------------
import CardButton from "@/components/shadcn/CardButton";
// Other-----------------------------------------------------------------------------
import { isArray, isObj } from "@/util";
import useSaveGame from "@/hooks/useSaveGame";



//______________________________________________________________________________________
// ===== Component  =====
export default function ChoiceDisplay({ choice }){

    //______________________________________________________________________________________
    // ===== Hooks =====
    const { saveGame } = useSaveGame();



    //______________________________________________________________________________________
    // ===== Render Functions =====
    const renderCardButton = (id, description) => (
        <div className="p-2">
            <CardButton
                description={description}
                disabled={id === "unknown"}
                onClick={() => { id !== "unknown" && saveGame({ narrativeToAdd: id }); }}
                className={`${id === "unknown" && "cursor-not-allowed"} neonBorder neonBoxShadowGlow glowIntensityLow purple`}
            />
        </div>
    )
    


    //______________________________________________________________________________________
    // ===== Component Return =====
    if(isObj(choice, [ "id", "display" ]) && narrativeData[choice.id]) return renderCardButton(choice.id, choice.display);

    const narrativeObj = narrativeData[choice];
    if(isObj(narrativeObj, [ "id", "title" ])) return renderCardButton(narrativeObj.id, narrativeObj.title);

    const unknownNarrativeObj = narrativeData.unknown;
    return renderCardButton(unknownNarrativeObj.id, unknownNarrativeObj.title);
} 