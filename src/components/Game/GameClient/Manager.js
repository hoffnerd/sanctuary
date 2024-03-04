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
import Resources from "./Resources";
import Dialog from "./Dialog";
import Events from "./Events";
import Notifications from "./Notifications";
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
        <Debugger>
            <Dialog/>
            <Gizmo saveFile={saveFile} />

            <InGameTime propInGameTime={saveFile.inGameTime}/>
            <SaveGame propInGameTime={saveFile.inGameTime}/>
            {/* <Resources resources={saveFile?.saveData?.resources}/> */}

            {/* <Events saveData={saveFile?.saveData}/>
            <Notifications saveData={saveFile?.saveData}/> */}
            <Narrative saveData={saveFile?.saveData}/>

        </Debugger>
    )
        
}