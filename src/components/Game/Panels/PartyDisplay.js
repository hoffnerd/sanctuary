"use client"

// Packages--------------------------------------------------------------------------
// Styles----------------------------------------------------------------------------
// Data------------------------------------------------------------------------------
// Hooks-----------------------------------------------------------------------------
import { useFullScreenDialogStore } from "@/stores/game";
// Components------------------------------------------------------------------------
import CardButton from "@/components/shadcn/CardButton";
import CrewDialog from "@/components/CrewDialog";
// Other-----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component  =====
export default function ChoiceDisplay({ crewId, crewDisplay }){

    //______________________________________________________________________________________
    // ===== Stores =====
    const setDialog = useFullScreenDialogStore((state) => state.setDialog);
    


    //______________________________________________________________________________________
    // ===== On Click Functions =====
    const openDialog = () => setDialog({ 
        isOpen: true,
        title: "Crew",
        content: <CrewDialog initialActiveKey={crewId} />
    }); 


    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <div className="p-2">
            <CardButton
                description={crewDisplay}
                disabled={crewDisplay === "Unknown"}
                onClick={() => { crewDisplay !== "Unknown" && openDialog() }}
                className={`${crewDisplay === "Unknown" && "cursor-not-allowed"} neonBorder neonBoxShadowGlow glowIntensityLow purple`}
            />
        </div>
    )
} 