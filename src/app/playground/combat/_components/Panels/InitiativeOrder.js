"use client"

// Stores ---------------------------------------------------------------------------
import { useCombatStore } from "@/stores/combat";
import { Fragment } from "react";
import { motion } from "framer-motion";
// Components -----------------------------------------------------------------------
// Styles ---------------------------------------------------------------------------
import styles from "@/styles/combat.module.css";
// Other ----------------------------------------------------------------------------
import { isArray, isObj } from "@/util";



//______________________________________________________________________________________
// ===== Micro Components =====

const MotionDiv = ({ children, className="" }) => (
    <motion.div layout transition={{ ease: "linear", stiffness: 100 }} className={className}>
        {children}
    </motion.div>
)



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
        isArray(initiativeOrder) && initiativeOrder.forEach((entityKey, index) => {
            if (entityKey === startingEntityKey && index !== 0) initiativeOrderDisplays.push("-");
            initiativeOrderDisplays.push(entityKey);
        })
        if (!initiativeOrderDisplays.includes("-")) initiativeOrderDisplays.push("-");
        return initiativeOrderDisplays;
    }



    //______________________________________________________________________________________
    // ===== Render Functions =====

    const renderEntity = ({ display, isFriendly }, nextEntityKey) => <>
        <MotionDiv className={`neonText ${isFriendly ? "blue" : "red"}`}>{display}</MotionDiv>
        <MotionDiv>{nextEntityKey && nextEntityKey !== "-" ? <>&nbsp;|&nbsp;</> : ""}</MotionDiv>
    </>

    const renderDash = () => (
        <MotionDiv className="relative">
            <div className="px-[8px] w-[116px]">
                <div className={`${styles.dash} w-[100px]`}/>
            </div>
        </MotionDiv>
    )

    const renderInitiativeOrder = () => {
        const activeInitiativeOrder = getActiveInitiativeOrder();
        let initiativeOrderToRender = [];
        activeInitiativeOrder.forEach((entityKey, index) => {
            const entityObj = entities[entityKey];
            if(isObj(entityObj, ["isHidden", "isDead"], false)) return;
            initiativeOrderToRender.push(
                <Fragment key={entityKey}>
                    {entityKey !== "-" 
                        ? renderEntity(entityObj, activeInitiativeOrder[index+1])
                        : renderDash() 
                    }
                </Fragment>
            )
        })
        return initiativeOrderToRender;
    }

    //______________________________________________________________________________________
    // ===== Component Return =====
    return renderInitiativeOrder()
}