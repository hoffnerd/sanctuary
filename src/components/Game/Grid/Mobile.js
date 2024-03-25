"use client"

// React/Next------------------------------------------------------------------------
// Styles ---------------------------------------------------------------------------
import styles from "@/styles/game.module.css";
// Stores----------------------------------------------------------------------------
import { useMobileStore } from "@/stores/game";
// Components------------------------------------------------------------------------
import { Panel, Temp } from "@/components/MicroComponents";
// Other-----------------------------------------------------------------------------
import { isObj } from "@/util";
import Stats from "../Panels/Stats";
import Inventory from "../Panels/Inventory";
import Narrative from "../Panels/Narrative";
import Choices from "../Panels/Choices";



//______________________________________________________________________________________
// ===== Micro Component  =====
const Column = ({ children, className=styles.r1x3 }) => (
    <div className={`${styles.column} ${className}`}>
        <Panel>{children}</Panel>
    </div>
)


//______________________________________________________________________________________
// ===== Component  =====
export default function Mobile({ }){

    //______________________________________________________________________________________
    // ===== Stores =====
    const panelOpen = useMobileStore((state) => state.panelOpen);



    //______________________________________________________________________________________
    // ===== Component Return  =====

    const renderGrid = () => {
        switch (panelOpen) {
            case "main": return <>
                <Column className={styles.r1x2}><Narrative/></Column>
                <Column className={styles.r3x1}><Choices/></Column>
            </>
            case "stats": return <Column><Stats/></Column>
            case "inventory": return <Column><Inventory/></Column>
            default: return <Column><Temp/></Column>
        }
    }


    //______________________________________________________________________________________
    // ===== Component Return  =====
    return(
        <div className={`${styles.gameGrid} ${styles.mobile} hiddenOnDesktop hiddenOnTablet`}>
            {renderGrid()}
        </div>
    )
} 