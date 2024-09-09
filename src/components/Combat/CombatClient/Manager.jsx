"use client"

// Packages------------------------------------------------------------------------
import { useParams } from "next/navigation";
// rQuery----------------------------------------------------------------------------
import { useReadSaveFile } from "@/rQuery/hooks/saveFile";
// Context---------------------------------------------------------------------------
// Components------------------------------------------------------------------------
import CombatStarter from "./CombatStarter";
import Debugger from "./Debugger";
import InGameTime from "@/components/Game/GameClient/InGameTime";
import SaveGame from "@/components/Game/GameClient/SaveGame";
// Other-----------------------------------------------------------------------------
import { isObj } from "@/util";



//______________________________________________________________________________________
// ===== Component =====
export default function Manager(){

    //______________________________________________________________________________________
    // ===== URL Params  =====
    const params = useParams();
    const saveFileId = isObj(params, [ 'id' ]) ? params.id : null;



    //______________________________________________________________________________________
    // ===== Hooks =====
    const { data:saveFile } = useReadSaveFile(saveFileId);


    
    //______________________________________________________________________________________
    // ===== Component Return =====
    if(!isObj(saveFile, ["id"])) return;

    return (
        <Debugger saveFile={saveFile}>
            <CombatStarter saveFile={saveFile}/>
            <InGameTime propInGameTime={saveFile.inGameTime}/>
            <SaveGame propInGameTime={saveFile.inGameTime}/>
        </Debugger>
    )
        
}