"use client"


// React/Next------------------------------------------------------------------------
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
// ReactQuery------------------------------------------------------------------------
import { useReadSaveFile } from "@/rQuery/hooks/saveFile";
// Context---------------------------------------------------------------------------
// Stores----------------------------------------------------------------------------
import { useFullScreenDialogStore } from "@/stores/game";
// Hooks-----------------------------------------------------------------------------
import useSaveGame from "@/hooks/useSaveGame";
// Components------------------------------------------------------------------------
import CardButton from "./shadcn/CardButton";
import { CenterVertically } from "./MicroComponents";
import ComboBox from "./shadcn/ComboBox";
// Data------------------------------------------------------------------------------
import { defaultSaveData } from "@/data/defaultSaveData";
// Styles ---------------------------------------------------------------------------
import styles from "@/styles/components/InnerDialog.module.css";
// Other-----------------------------------------------------------------------------
import { convertObjToArray, isArray, isObj } from "@/util";
import { crewData } from "@/data/game/crew";
import { Button } from "./shadcn/ui/button";

//______________________________________________________________________________________
// ===== Component =====
export default function CrewDialog({ initialActiveKey=null }){

    //______________________________________________________________________________________
    // ===== URL Params  =====
    const params = useParams();
    const saveFileId = isObj(params, [ 'id' ]) ? params.id : null;





    //______________________________________________________________________________________
    // ===== Hooks =====
    const { saveGame } = useSaveGame();
    const { data:saveFile } = useReadSaveFile(saveFileId);
    const { name, saveData } = isObj(saveFile) ? saveFile : { saveData:null };
    const { crew, party } = isObj(saveData) ? { ...defaultSaveData, ...saveData } : defaultSaveData;



    //______________________________________________________________________________________
    // ===== State =====
    const [activeKey, setActiveKey] = useState(initialActiveKey);



    //______________________________________________________________________________________
    // ===== On Click Functions =====

    const alterParty = (toRemove=true) => {
        let newParty = [];
        toRemove && isArray(party) && party.forEach(crewId => {
            crewId !== activeKey && newParty.push(crewId);
        });
        if(!toRemove) newParty = [ ...party, activeKey ];
        saveGame({ additionalSaveData: { party:newParty } });
    }


    //______________________________________________________________________________________
    // ===== Creation Functions =====

    const createMobileData = () => {
        let data = [];

        isArray(party) && party.forEach(crewId => {
            const display = crewId === "player" ? name : isObj(crewData, [crewId]) ? crewData[crewId].display : "Unknown";
            data.push({key:crewId, display});
        });

        isObj(crew) && Object.keys(crew).forEach(crewId => {
            if(party.includes(crewId)) return;
            const display = isObj(crewData, [crewId]) ? crewData[crewId].display : "Unknown";
            data.push({key:crewId, display});
        });

        return data
    }
    
    

    //______________________________________________________________________________________
    // ===== Render Functions =====

    const renderSkills = (skills, crewMemberPoints) => isArray(skills) && skills.map((skillObj, index) => {
        const { display, type, ability, pointsRequired, percent, isPassive } = skillObj;
        switch (type) {
            case "percentIncrease": return (
                <p key={index} className={crewMemberPoints < pointsRequired || ((!isPassive) && (!party.includes(activeKey))) ? "text-slate-500" : ""}>
                    {display} of <span className="capitalize">{ability}</span>{isPassive && " (passive)"}: {percent * 100}%
                </p>
            )
            default: return;
        }
    })

    const renderContent = () => {
        if(!activeKey) return (
            <CenterVertically className="text-center">
                <p>Select a character to read about.</p>
            </CenterVertically>
        )
        
        const isInParty = party.includes(activeKey);
        const crewMemberPoints = isObj(crew, [activeKey]) ? crew[activeKey] : 0;
        const { display, skills } = isObj(crewData, [activeKey]) ? crewData[activeKey] : { display:"Unknown", skills:[] };
        return <>
            <div className="sticky top-[-1px] bg-background p-2 flex justify-between">
                <h3 className="text-xl hiddenOnMobile">{display}</h3>
                {activeKey !== "player" && (
                    <Button 
                        variant={isInParty ? "neonRed" : "neonBlue"}
                        onClick={()=>alterParty(isInParty)}
                    >
                        {isInParty ? "Remove from Party" : "Add to Party"}
                    </Button>
                )}
            </div>
            <br className="hiddenOnMobile"/>
            <div className={styles.main}>
                <h4 className="text-lg">Skills</h4>
                {renderSkills(skills, crewMemberPoints)}
            </div>
        </>
    }

    const renderCardButton = (key, title) => (
        <div key={key} className="p-2">
            <CardButton
                title={title}
                className={key === activeKey ? "bg-slate-700" : ""}
                onClick={() => setActiveKey(key === activeKey ? null : key)}
            />
        </div>
    )

    const renderCardButtons = () => {
        let arrayOfPartyButtons = [];
        let arrayOfCrewButtons = [];

        isArray(party) && arrayOfPartyButtons.push(<h2 key="party" className="p-2 text-xl">Party</h2>)
        isArray(party) && party.forEach(crewId => {
            const display = crewId === "player" ? name : isObj(crewData, [crewId]) ? crewData[crewId].display : "Unknown";
            arrayOfPartyButtons.push(renderCardButton(crewId, display));
        });

        isObj(crew) && Object.keys(crew).forEach(crewId => {
            if(party.includes(crewId)) return;
            const display = isObj(crewData, [crewId]) ? crewData[crewId].display : "Unknown";
            arrayOfCrewButtons.push(renderCardButton(crewId, display));
        });
        if(isArray(arrayOfCrewButtons)) arrayOfCrewButtons = [ <h2 key="crew" className="p-2 text-xl">Crew</h2>, ...arrayOfCrewButtons ];

        return [ ...arrayOfPartyButtons, ...arrayOfCrewButtons ];
    }


    //______________________________________________________________________________________
    // ===== Component Return =====
    return(
        <div className={styles.container}>
            <aside>
                <div className="hiddenOnMobile">{renderCardButtons()}</div>
                <div className="hiddenOnTablet hiddenOnDesktop">
                    <ComboBox data={createMobileData()} active={activeKey} setActive={setActiveKey}/>
                </div>
            </aside>
            <div className={`${styles.content} neonScrollBar blue`}>
                {renderContent()}
            </div>
        </div>
    )
        
}