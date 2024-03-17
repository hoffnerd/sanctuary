"use client"

// Packages -------------------------------------------------------------------------
// rQuery ---------------------------------------------------------------------------
import { useReadSaveFilesByUserId } from "@/rQuery/hooks/saveFile";
// Components -----------------------------------------------------------------------
import Alert from "../Alert";
import Loading from "../Loading";
import SaveFile from "@/components/SaveFile/SaveFile";
// Server----------------------------------------------------------------------------
import { readSaveFilesByUserId } from "@/actions/saveFile";
// Other-----------------------------------------------------------------------------
import { isArray, isObj } from "@/util";

//______________________________________________________________________________________
// ===== Component  =====
export default function SaveFiles(){

    //______________________________________________________________________________________
    // ===== Hooks  =====
    const { data:saveFiles, isLoading } = useReadSaveFilesByUserId();



    //______________________________________________________________________________________
    // ===== Component Return  =====

    if(isObj(saveFiles, ["error"])) return (
        <Alert variant="neonRedWithGlow" title="Error!">
            {saveFiles.message || "An unexpected error has occurred!"}
        </Alert>
    )

    if(isLoading) return <Loading/>;

    if(isArray(saveFiles)) return saveFiles.map((saveFile) => <SaveFile key={saveFile.id} saveFile={saveFile} />)
    
    return;
} 