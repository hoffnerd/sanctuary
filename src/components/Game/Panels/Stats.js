"use client"
// Packages--------------------------------------------------------------------------
import { useParams } from "next/navigation";
// ReactQuery------------------------------------------------------------------------
import { useReadSaveFile } from "@/rQuery/hooks/saveFile";
// Styles----------------------------------------------------------------------------
import styles from "@/styles/game.module.css";
// Data------------------------------------------------------------------------------
import { crewData, partyLimitMax } from "@/data/game/crew";
// Components------------------------------------------------------------------------
import CrewDisplay from "./CrewDisplay";
// Other-----------------------------------------------------------------------------
import { isArray, isObj } from "@/util";
import AbilitiesDisplay from "./AbilitiesDisplay";
import PartyDisplay from "./PartyDisplay";
import { calculateAbilities } from "@/util/abilities";



//______________________________________________________________________________________
// ===== Component  =====
export default function Stats({}){

    //______________________________________________________________________________________
    // ===== URL Params =====
    const params = useParams();
    const saveFileId = isObj(params, [ 'id' ]) ? params.id : null;



    //______________________________________________________________________________________
    // ===== Hooks =====
    const { data:saveFile } = useReadSaveFile(saveFileId);
    if(!isObj(saveFile, [ "id", "saveData" ])) return;



    //______________________________________________________________________________________
    // ===== Constants =====
    const { id, name, saveData: { abilities, crew, party } } = saveFile;



    //______________________________________________________________________________________
    // ===== Render Functions =====

    const renderParty = () => {
        if(isArray(party)) return party.map(crewId => {
            const crewDisplay = crewId === "player" ? name : isObj(crewData, [crewId]) ? crewData[crewId].display : "Unknown";
            return <PartyDisplay key={crewId} crewId={crewId} crewDisplay={crewDisplay} />
        });
        return "No party members...";
    }



    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <div className={styles.crewGrid}>
            <div>
                <h2 className="text-xl flex justify-between">
                    <span>Party</span>
                    <span>{party.length}/{partyLimitMax}</span>
                </h2>
                <hr/>
                <div className="p-1"/>
                {renderParty()}
            </div>
            {isArray(party) && <AbilitiesDisplay abilities={calculateAbilities({abilities, crew, party})}/>}
        </div>
    )
} 