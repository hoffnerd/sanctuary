"use client"

// Packages--------------------------------------------------------------------------
// Styles----------------------------------------------------------------------------
// Data------------------------------------------------------------------------------
// Components------------------------------------------------------------------------
// Other-----------------------------------------------------------------------------
import { isArray, isObj } from "@/util";



//______________________________________________________________________________________
// ===== Component  =====
export default function NarrativeDisplay({ narrativeObj, shouldTypeText }){
    if(!isObj(narrativeObj, [ "content" ])) return;

    //______________________________________________________________________________________
    // ===== Constants =====
    const { content } = narrativeObj;
    


    //______________________________________________________________________________________
    // ===== Component Return =====
    if(content instanceof Function){
        const { render } = content({ shouldDoHook:true, shouldTypeText });
        return render;
    }

    return content;
} 