
// React/Next------------------------------------------------------------------------
// Styles ---------------------------------------------------------------------------
import styles from "@/styles/game.module.css";
// Components------------------------------------------------------------------------
import { Panel, Temp } from "@/components/MicroComponents";
import Narrative from "../Panels/Narrative";
import Choices from "../Panels/Choices";
import Inventory from "../Panels/Inventory";
// Other-----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component  =====
export default function Desktop({ }){

    //______________________________________________________________________________________
    // ===== Component Return  =====
    return(
        <div className={`${styles.gameGrid} ${styles.desktop} hiddenOnTablet hiddenOnMobile`}>
            <div className={`${styles.column} ${styles.columnLeft}`}>
                <Panel> <Narrative/> </Panel>
            </div>
            <div className={`${styles.column} ${styles.columnCenter}`}>
                <Panel> <Choices/> </Panel>
            </div>
            <div className={`${styles.column} ${styles.columnRight}`}>
                <Panel className={styles.half}>
                    <Inventory/>
                </Panel>
                <div className={styles.panelSpacing}/>
                <Panel className={styles.half}>
                    <Temp/>
                </Panel>
            </div>
        </div>
    )
} 