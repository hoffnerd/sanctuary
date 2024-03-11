"use client"
// Packages--------------------------------------------------------------------------
import { useParams } from "next/navigation";
// ReactQuery------------------------------------------------------------------------
import { useReadSaveFile } from "@/rQuery/hooks/saveFile";
// Data------------------------------------------------------------------------------
import { crewData } from "@/data/game/crew";
// Components------------------------------------------------------------------------
import CrewDisplay from "./CrewDisplay";
// Other-----------------------------------------------------------------------------
import { isArray, isObj } from "@/util";



//______________________________________________________________________________________
// ===== Component  =====
export default function Crew({}){

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
    const { id, name, saveData: { crew } } = saveFile;



    //______________________________________________________________________________________
    // ===== Render Functions =====

    const renderCrew = () => {
        if(isArray(crew)) return crew.map(crewMember => {
            const isPlayer = crewMember?.id && crewMember.id === "player";
            const playerObj = isPlayer ? { ...crewMember, display:name } : null;
            if(isPlayer) return <CrewDisplay key="player" {...playerObj} />;

            const defaultCrewMemberObj = isObj(crewMember, ["id"]) ? crewData[crewMember.id] : crewData[crewMember];
            const saveFileCrewMemberObj = isObj(crewMember, ["id"]) ? crewMember : null;
            const crewMemberObj = {
                ...defaultCrewMemberObj,
                abilities: saveFileCrewMemberObj && isObj(saveFileCrewMemberObj.abilities) ? {
                    ...defaultCrewMemberObj.abilities, 
                    ...saveFileCrewMemberObj.abilities,
                } : defaultCrewMemberObj.abilities,
            }
            return <CrewDisplay key={defaultCrewMemberObj.id} {...crewMemberObj} />
        });
        return "No Crew Members... Even yourself is gone beyond...";
    }



    //______________________________________________________________________________________
    // ===== Component Return =====
    return <>
        <h2 className="text-xl">Crew</h2>
        <hr/>
        <div className="p-1"/>
        {renderCrew()}
    </>
} 