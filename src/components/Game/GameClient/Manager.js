"use client"


// React/Next------------------------------------------------------------------------
import { useParams } from "next/navigation";
// rQuery----------------------------------------------------------------------------
import { useReadSaveFile } from "@/rQuery/hooks/saveFile";
// Context---------------------------------------------------------------------------
// Components------------------------------------------------------------------------
import Debugger from "./Debugger";
import Gizmo from "./Gizmo";
import InGameTime from "./InGameTime";
import SaveGame from "./SaveGame";
import Dialog from "./Dialog";
// Other-----------------------------------------------------------------------------
import { isObj } from "@/util";
import Narrative from "./Narrative";

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
            <Dialog/>
            <InGameTime propInGameTime={saveFile.inGameTime}/>
            <SaveGame propInGameTime={saveFile.inGameTime}/>
            <Narrative saveData={saveFile?.saveData}/>
        </Debugger>
    )
        
}