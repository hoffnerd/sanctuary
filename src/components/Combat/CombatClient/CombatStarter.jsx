"use client"


// Packages--------------------------------------------------------------------------
import { useEffect } from "react";
import { useParams } from "next/navigation";
// Stores----------------------------------------------------------------------------
import { useCombatStore } from "@/stores/combat";
// Context---------------------------------------------------------------------------
// Data------------------------------------------------------------------------------
// Other-----------------------------------------------------------------------------
import { assistStartCombat } from "@/util/combat";



//______________________________________________________________________________________
// ===== Component =====
export default function CombatStarter({ saveFile }){

    //______________________________________________________________________________________
    // ===== Hooks =====
    const params = useParams();



    //______________________________________________________________________________________
    // ===== Stores =====
    const startingEntityKey = useCombatStore((state) => state.startingEntityKey);
    const startCombat = useCombatStore((state) => state.startCombat);
    


    //______________________________________________________________________________________
    // ===== Use Effects =====
    useEffect(() => {
        if(startingEntityKey) return;
        assistStartCombat(startCombat, params?.combatId, saveFile)
    }, [params, startingEntityKey, saveFile])
    

    
    //______________________________________________________________________________________
    // ===== Component Return =====
    return <p>combatId: {params?.combatId}</p>;
        
}