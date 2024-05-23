// Packages -------------------------------------------------------------------------
// Styles ---------------------------------------------------------------------------
import styles from "@/styles/combat.module.css";
// Components------------------------------------------------------------------------;
import Manager from "./CombatClient/Manager";
import { Panel } from "@/components/MicroComponents";
import InitiativeOrder from "./Panels/InitiativeOrder";
import Actions from "./Panels/Actions";
// Other-----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====
export default function CombatContainer(){

    //______________________________________________________________________________________
    // ===== Component Return =====
    return <>
        <Manager/>
        <div className={styles.combatGrid}>
            <div className={`${styles.section} ${styles.narrative}`}>
                <Panel/>
            </div>
            <div className={`${styles.section} ${styles.initiativeOrder}`}>
                <Panel innerClassName="h-[102%] text-nowrap overflow-x-auto overflow-y-hidden pt-3 px-2 flex" hasDefaultInnerClass={false}>
                    <InitiativeOrder/>
                </Panel>
            </div>
            <div className={`${styles.section} ${styles.colosseum}`}>
                <Panel/>
            </div>
            <div className={`${styles.section} ${styles.actions}`}>
                <Panel innerClassName="h-full" hasDefaultInnerClass={false}>
                    <Actions/>
                </Panel>
            </div>
        </div>
    </>
}