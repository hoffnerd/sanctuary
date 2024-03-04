"use client"

// Stores----------------------------------------------------------------------------
import { useMobileStore } from '@/stores/game';
// Styles ---------------------------------------------------------------------------
import styles from "@/styles/game.module.css";
// Other ----------------------------------------------------------------------------
import { isObj } from '@/util';


//______________________________________________________________________________________
// ===== Component =====
export default function Main({ panels }){

    //______________________________________________________________________________________
    // ===== Stores =====
    const panelOpen = useMobileStore((state) => state.panelOpen);

    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <div className={`${styles.panel} ${styles.mobileMain} neonScrollBar neonBorder neonBoxShadowGlow yellow`}>
            <div className={styles.content}>
                {isObj(panels, [panelOpen]) && panels[panelOpen]}
            </div>
        </div>
    )
}