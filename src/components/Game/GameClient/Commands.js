"use client"

// Packages -------------------------------------------------------------------------
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronsUpDown } from "lucide-react"
// Hooks-----------------------------------------------------------------------------
import useSaveGame from '@/hooks/useSaveGame';
// Components -----------------------------------------------------------------------
import { Button } from '@/components/shadcn/ui/button';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList, } from '@/components/shadcn/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn/ui/popover';
// Data------------------------------------------------------------------------------
import { defaultSaveData } from '@/data/defaultSaveData';
import { crewData } from '@/data/game/crew';
// Other ----------------------------------------------------------------------------
import { isArray, isObj } from '@/util';
import { DEFAULT_SAVE_DATA } from '@/data/_config';



//______________________________________________________________________________________
// ===== Component =====
export default function Commands({ saveFile }){

    //______________________________________________________________________________________
    // ===== Constants =====
    const { saveData } = saveFile;


    //______________________________________________________________________________________
    // ===== State =====
    const [open, setOpen] = useState(false)



    //______________________________________________________________________________________
    // ===== Hooks =====
    const router = useRouter()
    const { saveGame } = useSaveGame();
    


    //______________________________________________________________________________________
    // ===== Commands =====
    const commands = [
        {
            key: "logSaveFile",
            display: "Log SaveFile",
            action: () => console.log(saveFile)
        },
        {
            key: "restart",
            display: "Restart Game",
            action: () => saveGame({ overrideSaveData: {...DEFAULT_SAVE_DATA}})
        },
        {
            key: "back",
            display: <div>"Go back a Narrative"</div>,
            action: () => {
                let newNarrative = [ ...saveData.narrative ];
                newNarrative.pop();
                saveGame({ overrideSaveData: { narrative:newNarrative }})
            }
        },
        {
            key: "testCombat",
            display: "Start Test Combat",
            action: () => router.push(`/play/${saveFile.id}/combat/test`)
        },
        {
            key: "addSimon",
            display: "Add Simon to Crew and Party",
            action: () => saveGame({ 
                overrideSaveData: { party: [ "player", "bartonSimon" ] },
                additionalSaveData: { crew: { bartonSimon: crewData.bartonSimon } } 
            })
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