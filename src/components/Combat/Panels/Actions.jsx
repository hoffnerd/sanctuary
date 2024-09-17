"use client"

// Packages -------------------------------------------------------------------------
import { useEffect, useState } from "react";
// Stores ---------------------------------------------------------------------------
import { useCombatStore } from "@/stores/combat";
// Components -----------------------------------------------------------------------
import { Button } from "@/components/shadcn/ui/button";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList, } from '@/components/shadcn/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn/ui/popover';
// Data -----------------------------------------------------------------------------
import { attacksLibrary } from "@/data/game/attacks";
// Other ----------------------------------------------------------------------------
import { convertObjToArray, isArray, isObj } from "@/util";
import useCombat from "@/hooks/useCombat";



//______________________________________________________________________________________
// ===== Constants =====
const attacks = convertObjToArray(attacksLibrary)



//______________________________________________________________________________________
// ===== Component =====
export default function Actions(){

    //______________________________________________________________________________________
    // ===== Stores =====
	const entities = useCombatStore((state) => state.entities);
	const initiativeOrder = useCombatStore((state) => state.initiativeOrder);
    const actionSelected = useCombatStore((state) => state.actionSelected);
    const setActionSelected = useCombatStore((state) => state.setActionSelected);



    //______________________________________________________________________________________
    // ===== Hook =====
    const { getActionObj } = useCombat();

    

    //______________________________________________________________________________________
    // ===== State =====
    const [attacksOpen, setAttacksOpen] = useState(false)



    //______________________________________________________________________________________
    // ===== Constants =====
    const entityKey = initiativeOrder[0]
	const entityObj = entityKey ? entities[entityKey] : null;
    const actionObj = getActionObj(actionSelected)



    //______________________________________________________________________________________
    // ===== Component Return =====

    // if(!entityObj?.isFriendly) return (
    //     <div className="h-full flex items-center justify-center text-center">
    //         <p>... awaiting for friendly turn ...</p>
    //     </div>
    // )

    if(isObj(actionObj)) return (
        <div className="grid grid-cols-4 h-full">
            <div className="col-span-3 flex items-center justify-center text-center">
                <div>
                    <p className="text-lg">{actionObj.display}</p>
                    <p className="text-md">Targets: {actionObj.targets}</p>
                </div>
            </div>
            <Button className="h-full" isRounded={false} variant="neonRed" onClick={()=>setActionSelected(null)}>
                Cancel
            </Button>
        </div>
    )


    return (
        <div className="grid grid-cols-4 h-full">
            <Popover open={attacksOpen} onOpenChange={setAttacksOpen}>
                <PopoverTrigger asChild>
                    <Button className="h-full" isRounded={false} variant="neonRed">Attacks</Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandList>
                            <CommandEmpty>No Attacks Found.</CommandEmpty>
                            {attacks.map(({ id, display }) => ((
                                <CommandItem 
                                    key={id} 
                                    value={display}
                                    onSelect={()=>setActionSelected({ id, type:"attack" })}
                                >
                                    {display}
                                </CommandItem>
                            )))}
                        </CommandList>
                        <CommandInput placeholder="Search Attacks"/>
                    </Command>
                </PopoverContent>
            </Popover>
            <Button className="h-full" isRounded={false} variant="neonBlue">Items</Button>
            <Button className="h-full" isRounded={false} variant="neonGreen">Defend</Button>
            <Button className="h-full" isRounded={false} variant="neonOrange">Adrenaline Rush</Button>
        </div>
    )
}