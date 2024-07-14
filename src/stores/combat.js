"use client"

// Packages------------------------------------------------------------------------
import { create } from 'zustand'
import { generateContent } from "@/util/narrative";
// Data----------------------------------------------------------------------------
import { maxAdrenalinePoints } from '@/data/_config';
import { attacksLibrary } from '@/data/game/attacks';
// Other---------------------------------------------------------------------------
import { convertObjToArray, isArray, isObj } from '@/util';
import { shuffleArray } from '@/util/shuffleArray';



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
    actionHistory: [],
    attackSelected: null
}



//______________________________________________________________________________________
// ===== Functions =====

/**
 * Initializes a combat scenario by combining entities with default properties, setting 
 * their HP to maximum, shuffling the turn order, and updating the combat state.
 * @param set - function that is used to update the state in the Zustand store.
 * @param entitiesToSet - `entitiesToSet` is an object containing entities that will participate in the combat.
 */
const startCombat = (set, entitiesToSet, startingNarrative=null) => {

    // Combine each entity within `entitiesToSet` with the `defaultEntityObj`
    let entities = structuredClone({ ...entitiesToSet });
    Object.keys(entities).forEach((key, index) => {
        entities[key] = { ...defaultEntityObj, ...entities[key] };
        entities[key].hp = entities[key].hpMax;
    });

    // Get all the keys within the `entities` object then shuffle that array
    const entityKeys = Object.keys(entities);
    const initiativeOrder = shuffleArray([ ...entityKeys ])
    
    // Go into our zustand `set` function and set up the start of combat
    set(() => ({ 
        ...defaultCombatStore, 
        entities, 
        initiativeOrder, 
        startingEntityKey: initiativeOrder[0],
        actionHistory: [{ id: 0, content: <div>{startingNarrative ? startingNarrative : "The battle starts!"}</div> }]
    }))
}

/**
 * Updates the status of entities based on their health points.
 * @param entities - object of objects where which object represents an entity in combat.
 * @returns object of objects that is the new `entities` to be added to the Zustand store.
 */
const checkEntitiesStatuses = (entities) => {

    // Set up `newEntities` so that we can alter them
    const newEntities = structuredClone({ ...entities });

    // Check every entity
    for (const [key, entity] of Object.entries(newEntities)){
        if(entity.hp <= 0){
            entity.hp = 0;
            if(!entity.isFriendly) entity.isDead = true;
            else {
                entity.ap = 0;
                entity.isUnconscious = true;
            }
        }
    }

    return newEntities;
}

const actionNarrative = ({shouldTypeText=false, actionTakerObj, targetObj=null, type="skip", actionObj=null, damage=0}) => {
    if(!isObj(actionObj, ["narrative"])) return generateContent(true, shouldTypeText, [
        `For whatever reason, `,
        { 
            className: `neonText neonTextGlow ${actionTakerObj.isFriendly ? "blue" : "red"}`, 
            text: actionTakerObj.display 
        },
        ` decided to skip their turn.`
    ]);

    let narrativeArray = [];
    switch (type) {
        case "attack":
            narrativeArray = actionObj.narrative({actionTakerObj, targetObj, damage})
            break;
        default: break;
    }

    return generateContent(true, shouldTypeText, narrativeArray)
}

/**
 * Processes an attack action on entities based on the selected attack and target, applying damage accordingly.
 * @returns Object of objects that is `entities` object after applying damage to the target(s) based on the attack selected.
 */
const executeAttack = ({ entities, initiativeOrder, attackSelected }, { targetEntityKey }) => {

    // Constants
    const entityKey = initiativeOrder[0]
	const entityObj = entityKey ? entities[entityKey] : null;
    const attackObj = attackSelected ? attacksLibrary[attackSelected] : null;
    if(!isObj(attackObj, [ "targets" ])) return entities;

    // TODO: Calculate damage based off stats
    const damage = attackObj.damage

    // Set up `newEntities` so that we can alter them
    const newEntities = structuredClone({ ...entities });

    // Damage target(s)
    if(attackObj.targets === 1){
        newEntities[targetEntityKey].hp = newEntities[targetEntityKey].hp - damage;
    }
    else if(attackObj.targets === 4){
        for (const [key, entity] of Object.entries(newEntities)){
            const { isFriendly, isDead, isUnconscious, isHidden } = entity;
            const isOpposingForce = (entityObj.isFriendly && (!isFriendly)) || ((!entityObj.isFriendly) && isFriendly);
            if(isOpposingForce && (!isDead) && (!isUnconscious) && (!isHidden)){
                entity.hp = entity.hp - damage;
            }
        }
    }

    return { entities:newEntities, damage };
}

/** 
 * Function to go to the next turn
 */
const setNextTurnState = (set, type=null, neededData=null) => {

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
    set(({ entities, initiativeOrder, roundCount, turnCount, backgroundTurnCount, actionHistory, attackSelected }) => {
        
        // Get the updated initiative order and turn count
        const { newInitiativeOrder, newBackgroundTurnCount } = getNextInitiativeOrder(entities, initiativeOrder, backgroundTurnCount);

        // Get the entity that just finished and started their turns
        const entityKeyThatJustFinished = initiativeOrder[0];
        const entityKeyThatJustStarted = newInitiativeOrder[0];

        // Set up `newEntities` so that we can alter them
        let newEntities = { ...entities };
        let damage = 0;

        // Add Adrenaline Points to the entity that just finished their turn
        newEntities[entityKeyThatJustFinished].ap = newEntities[entityKeyThatJustFinished]?.ap 
            ? newEntities[entityKeyThatJustFinished].ap >= maxAdrenalinePoints 
                ? maxAdrenalinePoints
                : newEntities[entityKeyThatJustFinished].ap + 1 
            : 1;

        // Execute Attack
        if(type === "attack"){
            const attackResult = executeAttack({ entities:newEntities, initiativeOrder, attackSelected }, neededData);
            newEntities = attackResult.entities;
            damage = attackResult.damage;
        }

        // check on any status an entity may have
        newEntities = checkEntitiesStatuses(newEntities);

        const actionHistoryObj = {
            id: isArray(actionHistory) ? actionHistory.length : 0,
            type,
            damage,
            actionTakerObj: newEntities[entityKeyThatJustFinished],
            targetObj: neededData?.targetEntityKey ? newEntities[neededData.targetEntityKey] : null,
            actionObj: attackSelected ? attacksLibrary[attackSelected] : null,
        }
        const newActionHistory = [ 
            ...actionHistory, 
            { 
                ...actionHistoryObj,
                content: ({shouldTypeText}) => actionNarrative({ shouldTypeText, ...actionHistoryObj })
            } 
        ]
        
        // Set this to the state below
        return { 
            entities: newEntities,
            initiativeOrder: newInitiativeOrder,
            roundCount: Math.floor(newBackgroundTurnCount / initiativeOrder.length),
            turnCount: turnCount+1,
            backgroundTurnCount: newBackgroundTurnCount,
            attackSelected: null,
            actionHistory: newActionHistory
        }
    })
}



//______________________________________________________________________________________
// ===== Store =====

export const useCombatStore = create((set) => ({

    //______________________________________________________________________________________
    // ===== Store Data =====

    ...defaultCombatStore,



    //______________________________________________________________________________________
    // ===== Store Functions =====
    setEntities: (entities) => set(() => ({ entities })),
    setAttackSelected: (attackSelected) => set(() => ({ attackSelected })),
    startCombat: (entitiesToSet) => startCombat(set, entitiesToSet),
    setNextTurnState: (type, neededData) => setNextTurnState(set, type, neededData)
}))