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

/**
 * The `Debugger` function in JavaScript is a component that renders different elements based on the
 * user's session and role access level.
 * @param {object} props
 * @param {React.JSX.Element} [props.children] - any valid jsx, used as the main content of the debugger
 * @param {object} props.saveFile - object, the save data of the loaded game the user is playing.
 * @returns The `Debugger` function is returning a JSX element that contains a `div` with the className
 * "absolute z-10". Inside this `div`, there are conditional renderings based on the `gameSaving` state
 * and the user's role access level.
 */
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
            {checkRoleAccessLevel(session, "ADMIN") 
                ? (
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
                ) 
                : children
            }
        </div>
    )   
}