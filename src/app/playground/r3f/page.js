"use client"

import { useEffect, useState } from "react";
// Packages -------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import { Button } from "@/components/shadcn/ui/button";
import Main from "./_components/Main";
// Other ----------------------------------------------------------------------------




//______________________________________________________________________________________
// ===== Component  =====
export default function Page(){

    //______________________________________________________________________________________
    // ===== State =====
    const [load, setLoad] = useState(true);

    //______________________________________________________________________________________
    // ===== Use Effects =====
    useEffect(() => {
        if(load) return;
        setTimeout(() => setLoad(true), 100)
    }, [load])
    

    //______________________________________________________________________________________
    // ===== Component Return  =====
    return <>
        <Button
            className="absolute z-10"
            variant="neonPurpleWithGlow"
            onClick={()=>setLoad(false)}
        >
            Reload
        </Button>
        {load && <div className="w-[100vw] h-[95vh]"><Main/></div>}
    </>
} 