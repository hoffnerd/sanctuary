
// Packages--------------------------------------------------------------------------
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
// Actions---------------------------------------------------------------------------
import { readSaveFile } from "@/actions/saveFile"
// Prefetches------------------------------------------------------------------------
import { prefetchSaveFile } from "@/rQuery/prefetches/saveFile";
// Styles ---------------------------------------------------------------------------
import styles from "@/styles/game.module.css";
// Components------------------------------------------------------------------------
import Alert from "@/components/Alert";
import Manager from "@/components/Game/GameClient/Manager";
import Desktop from "@/components/Game/Grid/Desktop";
import Tablet from "@/components/Game/Grid/Tablet";
import Mobile from "@/components/Game/Grid/Mobile";
import BottomNav from "@/components/Game/Panels/Mobile/BottomNav";
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

    return  (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Manager/>
            <div className={styles.game}>
                <Desktop/>
                <Tablet/>
                <Mobile/>
            </div>
            <BottomNav/>
        </HydrationBoundary>
    )
} 