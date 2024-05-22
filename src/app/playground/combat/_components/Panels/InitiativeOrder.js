"use client"

// Stores ---------------------------------------------------------------------------
import { useCombatStore } from "@/stores/combat";
import { Fragment } from "react";
// Components -----------------------------------------------------------------------
// Other ----------------------------------------------------------------------------


//______________________________________________________________________________________
// ===== Component =====
export default function InitiativeOrder() {

    //______________________________________________________________________________________
    // ===== Stores =====
    const entities = useCombatStore((state) => state.entities);
    const initiativeOrder = useCombatStore((state) => state.initiativeOrder);
    const startingEntityKey = useCombatStore((state) => state.startingEntityKey);

    //______________________________________________________________________________________
    // ===== Functions =====
    const getActiveInitiativeOrder = () => {
        let initiativeOrderDisplays = [];
        initiativeOrder.forEach((entityKey, index) => {
            if (entityKey === startingEntityKey && index !== 0) initiativeOrderDisplays.push("-");
            initiativeOrderDisplays.push(entityKey);
        })
        if (!initiativeOrderDisplays.includes("-")) initiativeOrderDisplays.push("-");
        return initiativeOrderDisplays;
    }

    //______________________________________________________________________________________
    // ===== Component Return =====
    const activeInitiativeOrder = getActiveInitiativeOrder();
    return activeInitiativeOrder.map((entityKey, index) => {
        const nextEntityKey = activeInitiativeOrder[index + 1];
        return (
            <Fragment key={entityKey}>
                {" "}
                {entityKey === "-"
                    ? <span key={entityKey}>---</span>
                    : <span key={entityKey}>
                        {entities[entityKey]?.display}
                        {nextEntityKey && nextEntityKey !== "-" ? " |" : ""}
                    </span>
                }
                {" "}
            </Fragment>
        )
    })
}