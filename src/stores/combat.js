"use client"

// Packages------------------------------------------------------------------------
import { create } from 'zustand'
// Other---------------------------------------------------------------------------
import { convertObjToArray, isArray, isObj } from '@/util';
import { shuffleArray } from '@/util/shuffleArray';
import { maxAdrenalinePoints } from '@/data/_config';



//______________________________________________________________________________________
// ===== Constants =====

/** Default object for a battle entity */
const defaultEntityObj = {
    hpMax: 20,
    isFriendly: false,
    isDead: false,
    isUnconscious: false,
    isHidden: true,
};

/** Default object for the zustand store */
export const defaultCombatStore = {
    entities: {},
    initiativeOrder: [],
    startingEntityKey: null,
    roundCount: 0,
    turnCount: 0,
    backgroundTurnCount: 0,
}



//______________________________________________________________________________________
// ===== Functions =====



//______________________________________________________________________________________
// ===== Store =====

export const useCombatStore = create((set) => ({

    //______________________________________________________________________________________
    // ===== Store Data =====

    ...defaultCombatStore,



    //______________________________________________________________________________________
    // ===== Store Functions =====

    /** 
     * Function to start a combat encounter 
     */
    startCombat: (entitiesToSet) => {

        // Combine each entity within `entitiesToSet` with the `defaultEntityObj`
        let entities = { ...entitiesToSet }
        Object.keys(entities).forEach((key, index) => {
            entities[key] = { ...defaultEntityObj, ...entities[key] };
            entities[key].hp = entities[key].hpMax - index;
        });

        // Get all the keys within the `entities` object then shuffle that array
        const entityKeys = Object.keys(entities);
        const initiativeOrder = shuffleArray([ ...entityKeys ])
        
        // Go into our zustand `set` function and set up the start of combat
        set(() => ({ ...defaultCombatStore, entities, initiativeOrder, startingEntityKey:initiativeOrder[0] }))
    },

    /** 
     * Function to go to the next turn
     */
    setNextTurnState: () => {

        /** Internal Function to find the next initiativeOrder */
        const getNextInitiativeOrder = (entities, initiativeOrder, backgroundTurnCount=0, depth=0) => {

            // Error guard clauses to make sure we have the data we need
            if(!isArray(initiativeOrder)) return { initiativeOrder, backgroundTurnCount, error:"The `initiativeOrder` is not array in `getNextInitiativeOrder`!" };
            if(initiativeOrder.length < depth) return { initiativeOrder, backgroundTurnCount, error:"Depth limit excited in `getNextInitiativeOrder`!" };

            // count up the backgroundTurnCount to keep round count in order
            const newBackgroundTurnCount = backgroundTurnCount+1;

            // Put the entity at the top, at the bottom
            let newInitiativeOrder = [...initiativeOrder];
            let removed = newInitiativeOrder.splice(0, 1);
            newInitiativeOrder.splice(newInitiativeOrder.length, 0, removed[0]);

            // Check if this entity is dead, unconscious, or hidden and if so call this function recursively.
            const currentEntityKey = newInitiativeOrder[0];
            const { isDead, isUnconscious, isHidden } = entities[currentEntityKey];
            if(isDead || isUnconscious || isHidden) return getNextInitiativeOrder(entities, newInitiativeOrder, newBackgroundTurnCount, depth+1);

            // We have found the `newInitiativeOrder` and `newBackgroundTurnCount` so return it
            return { newInitiativeOrder, newBackgroundTurnCount };
        }
 
        // Go into our zustand `set` function and set the next the next turn
        set(({ entities, initiativeOrder, roundCount, turnCount, backgroundTurnCount }) => {
            
            // Get the updated initiative order and turn count
            const { newInitiativeOrder, newBackgroundTurnCount } = getNextInitiativeOrder(entities, initiativeOrder, backgroundTurnCount);

            // Get the entity that just finished and started their turns
            const entityKeyThatJustFinished = initiativeOrder[0];
            const entityKeyThatJustStarted = newInitiativeOrder[0];

            // Set up `newEntities` so that we can alter them
            const newEntities = { ...entities };

            // Add Adrenaline Points to the entity that just finished their turn
            newEntities[entityKeyThatJustFinished].ap = newEntities[entityKeyThatJustFinished]?.ap 
                ? newEntities[entityKeyThatJustFinished].ap >= maxAdrenalinePoints 
                    ? maxAdrenalinePoints
                    : newEntities[entityKeyThatJustFinished].ap + 1 
                : 1;
            
            // Set this to the state below
            return { 
                entities: newEntities,
                initiativeOrder: newInitiativeOrder,
                roundCount: Math.floor(newBackgroundTurnCount / initiativeOrder.length),
                turnCount: turnCount+1,
                backgroundTurnCount: newBackgroundTurnCount,
            }
        })
    }
}))