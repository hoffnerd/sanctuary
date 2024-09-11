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
import { calculateCharacterBuild } from '@/util/character';



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
 * @param {function} set - function that is used to update the state in the Zustand store.
 * @param {object} entitiesToSet - object, containing entities that will participate in the combat.
 * @param {string} startingNarrative - string of what to display to the player in the narrative panel
 * when combat starts. If not given, will use the default text of "The battle starts!"
 * @returns {void}
 */
const startCombat = (set, entitiesToSet, startingNarrative=null) => {

    // Combine each entity within `entitiesToSet` with the `defaultEntityObj`
    let entities = structuredClone({ ...entitiesToSet });
    Object.keys(entities).forEach((key, index) => {
        entities[key] = calculateCharacterBuild({ ...defaultEntityObj, ...entities[key] });
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
 * Updates the status of entities based on their health points and statuses.
 * @param {object} entities - object of objects where which object represents an entity in combat.
 * @returns {object} object of objects that is the new `entities` to be added to the Zustand store.
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


/**
 * Generates narrative text for different actions in a game, with an option to type out the text gradually.
 * @param {object} actionNarrativeObj
 * @param {boolean | false} [actionNarrativeObj.shouldTypeText] - optional boolean, default is `false`. 
 * Determines whether the text should be displayed all at once or with a typing effect. 
 * @param {object} actionNarrativeObj.actionTakerObj - object, the entity that is taking the action. It could be a player 
 * character, an enemy, or any other entity in the game that is performing an action. At the very least,
 * this object should have the following properties:
 * @param {object} [actionNarrativeObj.targetObj] - optional object, the entity that is targeted by the action.
 * @param {string | "skip"} [actionNarrativeObj.type] - optional string, default is "skip". Determines the type of the action being performed.
 * @param {object} [actionNarrativeObj.actionObj] - optional object, that contains information about the action being taken. 
 * It should have a property called `narrative` which is a function that generates the narrative text for the action.
 * @param {number} [actionNarrativeObj.damage] - optional int, default is `0`. Represents the amount of damage caused by the action being narrated.
 * @returns {{
 *  render: React.JSX.Element | null
 *  contentTextLength: number
 * }}
 */
const actionNarrative = ({shouldTypeText=false, actionTakerObj, targetObj=null, type="skip", actionObj=null, damage=0}) => {

    // return early with default text if either no `actionObj`was given or if the `actionObj` does not have a `narrative`
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
 * @param {object} zustandState
 * @param {object} zustandState.entities - object, contains information about all the entities in the
 * game. Each entity is identified by a unique `key` and has properties such as `hp` (health points),
 * `isFriendly` (whether it belongs to the player's team), `isDead` (whether it is dead), `isUnconscious`
 * (whether it is unconscious) and any other entity related data.
 * @param {Array<string>} zustandState.initiativeOrder - array of strings, where each string is an entity's key.
 * Determines the order in which entities will take their turns in combat. The first key in the array represents the entity
 * that is currently taking their turn, the second element represents the entity that will take its turn next, and so on.
 * @param {string} zustandState.attackSelected - string that is the key of an attack from the `attacksLibrary`. Represents 
 * the specific attack that the entity wants to execute.
 * @param {object} data
 * @param {string} data.targetEntityKey - string, represents the key of the entity that is being targeted by the attack. 
 * This key is used to identify the specific entity within the `entities` object that will be affected by the attack.
 * @returns {{
 *  entities: object;
 *  damage: number | undefined;
 * }}
 */
const executeAttack = ({ entities, initiativeOrder, attackSelected }, { targetEntityKey }) => {

    // Constants
    const entityKey = initiativeOrder[0]
	const entityObj = entityKey ? entities[entityKey] : null;
    const attackObj = attackSelected ? attacksLibrary[attackSelected] : null;
    if(!isObj(attackObj, [ "targets" ])) return { entities };

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
 * Reorders a list of entities based on initiative order, skipping over entities that are dead, unconscious, or hidden.
 * @param {object} entities - object, contains information about all the entities in the game. Each entity is identified 
 * by a unique `key` and has properties such as `hp` (health points),`isFriendly` (whether it belongs to the player's 
 * team), `isDead` (whether it is dead), `isUnconscious` (whether it is unconscious) and any other entity related data.
 * @param {Array<string>} initiativeOrder - array of strings, where each string is an entity's key. Determines the order 
 * in which entities will take their turns in combat. The first key in the array represents the entity that is currently 
 * taking their turn, the second element represents the entity that will take its turn next, and so on.
 * @param {number | 0} [backgroundTurnCount] - optional int, default is `0`. Used to keep track of the turn count that 
 * includes skips over entities that are dead, unconscious, or hidden.
 * @param {number | 0} [depth] - optional int, default is `0`. Represents the current depth level of recursion. It is
 * used to keep track of how many times the function has recursively called itself.
 * @returns {{
 *  newInitiativeOrder: Array<string>;
 *  newBackgroundTurnCount: number;
 * }}
 */
const getNextInitiativeOrder = (entities, initiativeOrder, backgroundTurnCount=0, depth=0) => {

    // Error guard clauses to make sure we have the data we need
    if(!isArray(initiativeOrder)) return { initiativeOrder, backgroundTurnCount, error:"The `initiativeOrder` is not array in `getNextInitiativeOrder`!" };
    if(initiativeOrder.length < depth) return { initiativeOrder, backgroundTurnCount, error:"Depth limit excited in `getNextInitiativeOrder`!" };

    // count up the backgroundTurnCount to keep round count in order
    const newBackgroundTurnCount = backgroundTurnCount+1;

    // Put the entity that is at the top, at the bottom
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

/**
 * Updates the zustand state based on the current turn, including handling entity actions like adding Adrenaline Points and executing attacks.
 * @param {function} set - function that is used to update the state in the Zustand store.
 * @param {string | null} [type] - optional string, determines the type of action being performed.
 * @param {object | null} [neededData] - optional object, used to pass any additional data that may be required for the specific 
 * type of action being performed. This data could include information about the target entity for an attack, for example. 
 * @returns {void}
 */
const setNextTurnState = (set, type=null, neededData=null) => {

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
    startCombat: (entitiesToSet, startingNarrative) => startCombat(set, entitiesToSet, startingNarrative),
    setNextTurnState: (type, neededData) => setNextTurnState(set, type, neededData)
}))