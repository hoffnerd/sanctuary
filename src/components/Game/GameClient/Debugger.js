"use client"

// Packages--------------------------------------------------------------------------
import { useSession } from "next-auth/react";
// Stores----------------------------------------------------------------------------
import { useDebugModeStore, useGameSavingStore } from "@/stores/game";
// Hooks-----------------------------------------------------------------------------
import { Draggable } from "@/hooks/useDrag";
// Components------------------------------------------------------------------------
import { Button } from "@/components/shadcn/ui/button";
// Other-----------------------------------------------------------------------------
import { checkRoleAccessLevel } from "@/util";
import { renderFontAwesomeIcons } from "@/util/icons";
import Commands from "./Commands";


//______________________________________________________________________________________
// ===== Component =====
export default function Debugger({ children, saveFile }){

    //______________________________________________________________________________________
    // ===== Context =====
    const { data:session, status} = useSession();



    //______________________________________________________________________________________
    // ===== Stores =====
    const { debugMode, toggleDebugMode } = useDebugModeStore((state) => state);
    const gameSaving = useGameSavingStore((state) => state.gameSaving);
    


    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <div className="absolute z-10">
            {gameSaving && renderFontAwesomeIcons({ key:"faFloppyDisk", className:"h-10" })}
            {checkRoleAccessLevel(session, "ADMIN") ? (
                <Draggable 
                    title={
                        <div className="flex w-full">
                            <Button variant="ghost" className="float-right" onClick={toggleDebugMode}>
                                {renderFontAwesomeIcons({ key:"faScrewdriverWrench", className:"h-5" })}
                            </Button>
                        </div>
                    }
                >
                    <Commands saveFile={saveFile}/>
                    {children}
                </Draggable>
            ) : children}
        </div>
    )
    return (
        <div className="absolute z-10">
            <div className={checkRoleAccessLevel(session, "ADMIN") && debugMode ? "bg-background p-5" : ""}>
                {children}
            </div>
        </div>
    )
        
}