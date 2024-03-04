
// React/Next------------------------------------------------------------------------
// Styles ---------------------------------------------------------------------------
import styles from "@/styles/game.module.css";
// Components------------------------------------------------------------------------
import { Panel, Temp } from "@/components/MicroComponents";
// Other-----------------------------------------------------------------------------
import { isObj } from "@/util";



//______________________________________________________________________________________
// ===== Constants  =====
const panelsObj = {
    // notifications: <Notifications/>,
    // mercs: <Mercs/>,
    // contracts: <Contracts/>
}



//______________________________________________________________________________________
// ===== Component  =====
export default function Mobile({ }){

    //______________________________________________________________________________________
    // ===== Component Return  =====
    return(
        <div className={`${styles.gameGrid} ${styles.mobile} hiddenOnDesktop hiddenOnTablet`}>
            <div className={`${styles.column} ${styles.columnCenter}`}>
                <Panel className={styles.fraction_2_3rd}>
                    <Temp/>
                </Panel>
                <div className={styles.panelSpacing}/>
                <Panel className={styles.fraction_1_3rd}>
                    <Temp/>
                </Panel>
            </div>
        </div>
    )
} 