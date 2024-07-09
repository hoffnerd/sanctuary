"use client"

// Packages -------------------------------------------------------------------------
import { useRef } from "react";
// Stores ---------------------------------------------------------------------------
import { useCombatStore } from "@/stores/combat";
// Components -----------------------------------------------------------------------
import Entity from "../Entity";
// Styles ---------------------------------------------------------------------------
import styles from "@/styles/components/Entity.module.css";
// Other ----------------------------------------------------------------------------
import { isObj } from "@/util";
import SelectEntityButton from "../SelectEntityButton";



//______________________________________________________________________________________
// ===== Component =====
export default function BattleField(){

    //______________________________________________________________________________________
    // ===== Store =====
	const entities = useCombatStore((state) => state.entities);


    
    //______________________________________________________________________________________
    // ===== Render Functions =====
    
    const renderEntitiesSelectButtons = () => {
        let cellsToRender = [];

        for (let i = 1; i <= 4; i++) {
            cellsToRender.push(
                <div key={i} className={`${styles[`selection_${i}`]} flexItemsEvenly`}>
                    <div>f_{i}</div>
                    <div>e_{i}</div>
                </div>
            )
        }

        return cellsToRender
    }

    const renderEntities = () => {
        let friendlyCount = 0;
        let enemyCount = 0;
        let entitiesToRender = [];

        // return early if there are no `entities`
        if(!isObj(entities)) return entitiesToRender;

        // Loop over all of our `entities` we may want to render
        Object.keys(entities).forEach(entityKey => {

            // Get the current entity
            const entityObj = entities[entityKey]
            const { isFriendly, isDead, isUnconscious, isHidden } = entityObj;

            // Return early if this entity is dead or hidden. Notice how we are looking at `isUnconscious`.
            // This is because unconscious entities can be healed and allowed to join the fight again.
            if(isDead || isHidden) return;

            // increase our counters
            isFriendly ? friendlyCount++ : enemyCount++;

            // Render this entity
            entitiesToRender.push(
                <Entity 
                    key={`${entityKey}_${isFriendly ? friendlyCount : enemyCount }`} 
                    entityKey={entityKey} 
                    className={styles[`${isFriendly ? `friendly_${friendlyCount}` : `enemy_${enemyCount}` }`]} 
                />
            )

            const position = `r${isFriendly ? friendlyCount : enemyCount}_c${isFriendly ? 2 : 3}`;
            entitiesToRender.push(
                <SelectEntityButton
                    key={position}
                    entityKey={entityKey}
                    isFriendly={isFriendly}
                    className={styles[`selection_${position}`]}
                />
            )
        })

        // Return the entities we want to render
        return entitiesToRender;
    }


    
    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <div className={styles.battleFieldGrid}>
            {renderEntities()}
        </div>
    )
}