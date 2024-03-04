
// React/Next------------------------------------------------------------------------
// Styles ---------------------------------------------------------------------------
import styles from "@/styles/game.module.css";
// Components------------------------------------------------------------------------
import { Panel, Temp } from "@/components/MicroComponents";
// Other-----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component  =====
export default function Tablet({ }){

    //______________________________________________________________________________________
    // ===== Component Return  =====
    return(
        <div className={`${styles.gameGrid} ${styles.tablet} hiddenOnDesktop hiddenOnMobile`}>
            <div className={`${styles.column} ${styles.columnLeft}`}>
                <Panel className={styles.fraction_2_3rd}>
                    <Temp/>
                </Panel>
                <div className={styles.panelSpacing}/>
                <Panel className={styles.fraction_1_3rd}>
                    <Temp/>
                </Panel>
            </div>
            <div className={`${styles.column} ${styles.columnRight}`}>
                <Panel className={styles.half}>
                    <Temp/>
                </Panel>
                <div className={styles.panelSpacing}/>
                <Panel className={styles.half}>
                    <Temp/>
                </Panel>
            </div>
        </div>
    )
} 