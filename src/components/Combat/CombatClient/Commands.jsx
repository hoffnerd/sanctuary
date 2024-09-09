"use client"

// Packages -------------------------------------------------------------------------
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChevronsUpDown } from "lucide-react"
// Stores----------------------------------------------------------------------------
import { useCombatStore } from '@/stores/combat';
// Components -----------------------------------------------------------------------
import { Button } from '@/components/shadcn/ui/button';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList, } from '@/components/shadcn/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn/ui/popover';
// Data------------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------
import { assistStartCombat } from '@/util/combat';



//______________________________________________________________________________________
// ===== Component =====
export default function Commands({ saveFile }){

    //______________________________________________________________________________________
    // ===== Hooks =====
    const router = useRouter()
    const params = useParams();



    //______________________________________________________________________________________
    // ===== Stores =====
    const combatStore = useCombatStore((state) => state);
    const {
        entities,
        initiativeOrder,
        startingEntityKey,
        roundCount,
        turnCount,
        backgroundTurnCount,
        startCombat,
        setNextTurnState,
    } = combatStore;
    


    //______________________________________________________________________________________
    // ===== State =====
    const [open, setOpen] = useState(false)
    


    //______________________________________________________________________________________
    // ===== Commands =====
    const commands = [
        {
            key: "logCombatData",
            display: "Log Combat Data",
            action: () => console.log(combatStore)
        },
        {
            key: "logSaveFile",
            display: "Log SaveFile",
            action: () => console.log(saveFile)
        },
        {
            key: "playPage",
            display: "Go Back To Play Page",
            action: () => router.push(`/play/${saveFile.id}`)
        },
        {
            key: "restart",
            display: "Restart Combat",
            action: () => assistStartCombat(startCombat, params?.combatId, saveFile)
        },
        {
            key: "skipTurn",
            display: "Skip Turn",
            action: () => setNextTurnState()
        },
    ]



    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    Run a Command...
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search Commands"/>
                    <CommandList>
                        <CommandEmpty>No Commands Found.</CommandEmpty>
                        {commands.map(({ key, display, action }) => ((
                            <CommandItem key={key} value={display} onSelect={()=>action()}>
                                {display}
                            </CommandItem>
                        )))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}