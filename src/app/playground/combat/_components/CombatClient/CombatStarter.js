"use client"


// Packages--------------------------------------------------------------------------
import { useEffect } from "react";
// Stores----------------------------------------------------------------------------
import { useCombatStore } from "@/stores/combat";
// Context---------------------------------------------------------------------------
// Data------------------------------------------------------------------------------
import { entities } from "../../_data/test";
// Other-----------------------------------------------------------------------------
import { isObj } from "@/util";



//______________________________________________________________________________________
// ===== Component =====
export default function CombatStarter(){

    //______________________________________________________________________________________
    // ===== Stores =====
    const startingEntityKey = useCombatStore((state) => state.startingEntityKey);
    const startCombat = useCombatStore((state) => state.startCombat);


    
    //______________________________________________________________________________________
    // ===== Use Effects =====
    useEffect(() => {
        if(startingEntityKey) return;
        startCombat(entities);
    }, [startingEntityKey])
    

    
    //______________________________________________________________________________________
    // ===== Component Return =====
    return;
        
}