// Packages--------------------------------------------------------------------------
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
// Actions---------------------------------------------------------------------------
import { readSaveFile } from "@/actions/saveFile"
// Prefetches------------------------------------------------------------------------
import { prefetchSaveFile } from "@/rQuery/prefetches/saveFile";
// Components------------------------------------------------------------------------
import Alert from "@/components/Alert";
import CombatContainer from "@/components/Combat/CombatContainer";
// Other-----------------------------------------------------------------------------
import { isObj } from "@/util";





//______________________________________________________________________________________
// ===== Component  =====
export default async function Page({ params }){

    //______________________________________________________________________________________
    // ===== Constants  =====
    const id = isObj(params, [ 'id' ]) ? params.id : null;
    const saveFile = id ? await readSaveFile(id) : null;

    
    
    //______________________________________________________________________________________
    // ===== Prefetch  =====
    const queryClient = id ? await prefetchSaveFile(id) : null;
    

    
    //______________________________________________________________________________________
    // ===== Component Return  =====

    if(isObj(saveFile, ["error"]) || (!isObj(saveFile, ["id"]))) return (
        <Alert variant="neonRedWithGlow" title="Error!">
            {(saveFile && saveFile.message) || "An unexpected error has occurred!"}
        </Alert>
    )

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CombatContainer/>
        </HydrationBoundary>
    )
}