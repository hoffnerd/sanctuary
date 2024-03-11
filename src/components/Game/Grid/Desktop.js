
// React/Next------------------------------------------------------------------------
// Styles ---------------------------------------------------------------------------
import styles from "@/styles/game.module.css";
// Components------------------------------------------------------------------------
import { Panel } from "@/components/MicroComponents";
import Narrative from "../Panels/Narrative";
import Choices from "../Panels/Choices";
import Inventory from "../Panels/Inventory";
import Crew from "../Panels/Crew";
// Other-----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component  =====
export default function Desktop({ }){

    //______________________________________________________________________________________
    // ===== Component Return  =====
    return(
        <div className={`${styles.gameGrid} ${styles.desktop} hiddenOnTablet hiddenOnMobile`}>
            <div className={`${styles.column} ${styles.r1x2_c1x2}`}>
                <Panel> 
                    <Narrative/>
                </Panel>
            </div>
            <div className={`${styles.column} ${styles.r1x1}`}>
                <Panel> 
                    <Choices/>
                </Panel>
            </div>
            <div className={`${styles.column} ${styles.r1x1}`}>
                <Panel>
                    <Inventory/>
                </Panel>
            </div>
            <div className={`${styles.column} ${styles.r2x1_c3x2}`}>
                <Panel>
                    <Crew/>
                </Panel>
            </div>
        </div>
    )
} 