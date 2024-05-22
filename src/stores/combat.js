"use client"

import { convertObjToArray, isArray, isObj } from '@/util';
import { shuffleArray } from '@/util/shuffleArray';
import { create } from 'zustand'



const defaultEntityObj = {
    isDead: false,
    isHidden: true,
};



export const defaultCombatStore = {
    entities: {},
    initiativeOrder: [],
    startingEntityKey: null,
    roundCount: 0,
    turnCount: 0,
    backgroundTurnCount: 0,
}



export const useCombatStore = create((set) => ({
    ...defaultCombatStore,



    startCombat: (entities) => {
        const entityKeys = Object.keys(entities);
        const initiativeOrder = shuffleArray([ ...entityKeys ]);
        set(() => ({ ...defaultCombatStore, entities, initiativeOrder, startingEntityKey:initiativeOrder[0] }))
    },



    setNextTurnState: () => {

        const getNextInitiativeOrder = (entities, initiativeOrder, backgroundTurnCount=0, depth=0) => {
            if(!isArray(initiativeOrder)) return { initiativeOrder, backgroundTurnCount, error:"The `initiativeOrder` is not array in `getNextInitiativeOrder`!" };
            if(initiativeOrder.length < depth) return { initiativeOrder, backgroundTurnCount, error:"Depth limit excited in `getNextInitiativeOrder`!" };

            const newBackgroundTurnCount = backgroundTurnCount+1;
            let newInitiativeOrder = [...initiativeOrder];
            let removed = newInitiativeOrder.splice(0, 1);
            newInitiativeOrder.splice(newInitiativeOrder.length, 0, removed[0]);

            const currentEntityKey = newInitiativeOrder[0];
            const { isDead, isHidden } = isObj(entities[currentEntityKey]) ? entities[currentEntityKey] : defaultEntityObj
            if(isDead || isHidden) return getNextInitiativeOrder(newInitiativeOrder, newBackgroundTurnCount, depth+1);
            return { newInitiativeOrder, newBackgroundTurnCount };
        }
 
        set(({ entities, initiativeOrder, roundCount, turnCount, backgroundTurnCount }) => {
            const { newInitiativeOrder, newBackgroundTurnCount } = getNextInitiativeOrder(entities, initiativeOrder, backgroundTurnCount);
            return { 
                initiativeOrder: newInitiativeOrder,
                roundCount: Math.floor(backgroundTurnCount / initiativeOrder.length),
                turnCount: turnCount+1,
                backgroundTurnCount: newBackgroundTurnCount,
            }
        })
    }
}))