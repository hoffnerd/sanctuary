// Packages -------------------------------------------------------------------------
import Link from "next/link";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
// rQuery ---------------------------------------------------------------------------
import { prefetchSaveFilesByUserId } from "@/rQuery/prefetches/saveFile";
// Components -----------------------------------------------------------------------
import NewSaveFile from "@/components/SaveFile/NewSaveFile";
import SaveFiles from "@/components/SaveFile/SaveFiles";
// Other ----------------------------------------------------------------------------
import { readServerSession } from "@/lib/protector";
import { checkRoleAccessLevel } from "@/util";



//______________________________________________________________________________________
// ===== Component  =====
export default async function Page(){

    //______________________________________________________________________________________
    // ===== Constants =====
    const session = await readServerSession();

    
    
    //______________________________________________________________________________________
    // ===== Prefetch  =====
    const queryClient = checkRoleAccessLevel(session, "TESTER") ? await prefetchSaveFilesByUserId() : null;
    


    //______________________________________________________________________________________
    // ===== Functions =====

    const renderWaitList = () => <div className="text-center">
        <h1 className="text-5xl font-black pt-20 pb-10">You have joined the wait list!</h1>
        <p className="neonText neonTextGlow green py-5">You will be emailed when Chapter 1 is released</p>
        <p className="neonText neonTextGlow green py-5"><Link href="/about">Click Here to learn more about the game</Link></p>
        <p className="neonText neonTextGlow green py-5"><Link href="/about/how">Click Here to learn how to play</Link></p>
        <p className="text-center py-5">
            <span className="neonText neonTextGlow green">Still have questions? Reach out! I am </span>
            <a className="neonText neonTextGlow blue" href="https://nextgenscripts.vercel.app" target="_blank">@NextGenScripts</a>
            <span className="neonText neonTextGlow green"> on all major social platforms.</span>
        </p>
    </div>

    const renderSaves = () => <>
        <h1 className="text-5xl font-black pb-10">My Saves</h1>
        <NewSaveFile/>
        <HydrationBoundary state={dehydrate(queryClient)}>
            <SaveFiles/>
        </HydrationBoundary>
    </>



    //______________________________________________________________________________________
    // ===== Component Return  =====
    return (
        <div className="container">
            {checkRoleAccessLevel(session, "TESTER") ? renderSaves() : renderWaitList()}
        </div>
    )
} 