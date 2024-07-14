"use client"

// Packages--------------------------------------------------------------------------
// Stores----------------------------------------------------------------------------
import { useDebugModeStore } from "@/stores/game";
// Hooks-----------------------------------------------------------------------------
import { Draggable } from "@/hooks/useDrag";
// Components------------------------------------------------------------------------
import { Button } from "@/components/shadcn/ui/button";
import Commands from "./Commands";
// Other-----------------------------------------------------------------------------
import { renderFontAwesomeIcons } from "@/util/icons";


//______________________________________________________________________________________
// ===== Component =====
export default function Debugger({ children }){

    //______________________________________________________________________________________
    // ===== Stores =====
    const toggleDebugMode = useDebugModeStore((state) => state.toggleDebugMode);



    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <div className="absolute z-10">
            <Draggable 
                title={
                    <div className="flex w-full">
                        <Button variant="ghost" className="float-right" onClick={toggleDebugMode}>
                            {renderFontAwesomeIcons({ key:"faScrewdriverWrench", className:"h-5" })}
                        </Button>
                    </div>
                }
            >
                <Commands/>
                {children}
            </Draggable>
        </div>
    )   
}