"use client"


// Packages--------------------------------------------------------------------------
import { useEffect } from "react";
import { useParams } from "next/navigation";
// Stores----------------------------------------------------------------------------
import { useCombatStore } from "@/stores/combat";
// Hooks-----------------------------------------------------------------------------
import useCombat from "@/hooks/useCombat";
// Data------------------------------------------------------------------------------
// Other-----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====
export default function CombatStarter({ saveFile }){

    //______________________________________________________________________________________
    // ===== Hooks =====
    const params = useParams();



    //______________________________________________________________________________________
    // ===== Stores =====
    const startingEntityKey = useCombatStore((state) => state.startingEntityKey);
    // const initiativeOrder = useCombatStore((state) => state.initiativeOrder);
    const actionSelected = useCombatStore((state) => state.actionSelected);
    const entitySelected = useCombatStore((state) => state.entitySelected);

    

    //______________________________________________________________________________________
    // ===== Hooks =====
    const { initializeCombat, startTurn } = useCombat();

    


    //______________________________________________________________________________________
    // ===== Use Effects =====
    useEffect(() => {
        if(startingEntityKey) return;
        initializeCombat()
    }, [params, startingEntityKey, saveFile])
    
    // useEffect(() => {
    //     startTurn()
    // }, [initiativeOrder])
    
    useEffect(() => {
        if(!(actionSelected && entitySelected)) return;
        console.log({ trace:"CombatStarter > useEffect", actionSelected, entitySelected })
    }, [actionSelected, entitySelected])

    
    //______________________________________________________________________________________
    // ===== Component Return =====
    return <p>combatId: {params?.combatId}</p>;
        
}