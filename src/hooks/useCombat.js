"use client"

// Packages -----------------------------------------------------------------------
import { useParams } from "next/navigation";
// rQuery -------------------------------------------------------------------------
import { useReadSaveFile } from "@/rQuery/hooks/saveFile";
// Stores--------------------------------------------------------------------------
import { DEFAULT_COMBAT_STORE, useCombatStore } from "@/stores/combat";
// Data ---------------------------------------------------------------------------
import { combatEncounterLibrary } from "@/data/combat/library";
import { CHANCE_TO_HIT_BASE, CHANCE_TO_HIT_INCREASE_PER_MISS, COMBAT_DEFAULT_FRIENDLY, DEFAULT_SAVE_DATA, DEFAULT_SAVE_FILE, MAX_ADRENALINE_POINTS } from "@/data/_config";
// Other --------------------------------------------------------------------------
import { isArray, isObj } from "@/util";
import { randomizeEntities } from "@/util/combat"
import { shuffleArray } from "@/util/shuffleArray";
import { calculateCharacterBuild, calculateMeleeAttackDamage } from "@/util/character";
import { attacksLibrary } from "@/data/game/attacks";




//______________________________________________________________________________________
// ===== Hook =====

/**
 * 
 * @returns {{
 *  initializeCombat: () => void;
 *  startTurn: () => void;
 *  getActionObj: () => object | null;
 * }}
 */
export default function useCombat(){

    //______________________________________________________________________________________
    // ===== Store Functions =====
	const set = useCombatStore((state) => state.set);
	const setError = useCombatStore((state) => state.setError);
	const resetError = useCombatStore((state) => state.resetError);



    //______________________________________________________________________________________
    // ===== Hooks =====
    const { id:saveFileId, combatId } = useParams()
    const { data:saveFileQueried } = useReadSaveFile(saveFileId);



    //______________________________________________________________________________________
    // ===== Constants =====

    const saveFile = isObj(saveFileQueried) ? { ...DEFAULT_SAVE_FILE, ...saveFileQueried } : { ...DEFAULT_SAVE_FILE };
    const { name:playerName, saveData:saveFileSaveData } = saveFile;
    const saveData = isObj(saveFileSaveData) ? { ...DEFAULT_SAVE_DATA, ...saveFileSaveData } : { ...DEFAULT_SAVE_DATA };
    const { crew, party } = saveData;

    const encounterData = combatId && combatEncounterLibrary?.[combatId]
    


    //______________________________________________________________________________________
    // ===== Initialize Combat =====

    const configureEnemyEntities = () => {
        if(isObj(encounterData?.settings?.randomize)) return randomizeEntities(encounterData.enemies, encounterData.settings.randomize);
        return isObj(enemies) ? { ...enemies } : {};
    }

    const configurePartyEntities = () => {
        let partyEntities = {}
        party.forEach(id => {
            if(!isObj(crew, [ id ])) return;
    
            partyEntities[id] = { 
                ...crew[id], 
                ...COMBAT_DEFAULT_FRIENDLY, 
                display: (crew[id].display) || (id === "player" && playerName),
                isHidden:false 
            }
        });
        return partyEntities;
    }

    /**
     * Sets up a combat encounter by combining party and enemy entities, calculating their stats, 
     * determining initiative order, and initializing combat state.
     * @returns {void}
     */
    const initializeCombat = () => {
        if(!encounterData?.enemies) return setError("Missing encounter data in the `initializeCombat` function!");
        if(!isArray(party)) return setError("Missing party in the `initializeCombat` function!");

        if(false) return; // TODO: Replace with check to see if player should be able to play this encounter yet

        // combine party and enemy entities then calculate all their stats
        let entities = structuredClone({ ...configurePartyEntities(), ...configureEnemyEntities() });
        Object.keys(entities).forEach((key) => {
            entities[key] = calculateCharacterBuild({ ...entities[key] });
        });
    
        // Get all the keys within the `entities` object then shuffle that array
        // TODO: figure out how I want to handle initiative
        const initiativeOrder = shuffleArray([ ...Object.keys(entities) ])
        
        // Go into our zustand `set` function and set up the start of combat
        set(() => ({ 
            ...DEFAULT_COMBAT_STORE, 
            entities, 
            initiativeOrder, 
            startingEntityKey: initiativeOrder[0],
            actionHistory: [{ id: 0, content: <div>{encounterData?.startingNarrative || "The battle starts!"}</div> }]
        }))
    }

    

    //______________________________________________________________________________________
    // ===== Combat Phase: Action Select =====

    const startTurnBuffs = (initiativeOrder, entities) => {
        const turnTakerEntityId = initiativeOrder[0]
        const turnTakerEntity = entities[turnTakerEntityId]
        console.log({ trace:"startTurn", turnTakerEntityId, turnTakerEntity })

        // Natural Health
        const hpRegen = turnTakerEntity.hpRegen + 10;
        const newHp = turnTakerEntity.hp + hpRegen;

        // Natural Adrenaline
        const adrenalineRegen = turnTakerEntity.adrenalineRegen + 5;
        const newAp = turnTakerEntity.ap + adrenalineRegen;

        // This is probably where text will go 
        
        return {
            entities: { 
                ...entities,
                [turnTakerEntityId]: {
                    ...turnTakerEntity,
                    hp: newHp > turnTakerEntity.hpMax ? turnTakerEntity.hpMax : newHp,
                    ap: newAp > MAX_ADRENALINE_POINTS ? MAX_ADRENALINE_POINTS : newAp,
                }
            },
        }
    }

    /**
     * Starts the turn of the entity at the 0 index of `initiativeOrder`
     * @returns {void}
     */
    const startTurn = () => set(({ entities, initiativeOrder }) => {
        const stateAfterBuffs = startTurnBuffs(initiativeOrder, entities);
        return {
            ...stateAfterBuffs
        }
    })


    const getActionObj = (actionSelected) => {
        if(!actionSelected?.id) return null;
        switch (actionSelected?.type) {
            case "attack": return attacksLibrary[actionSelected.id]
            default: return null;
        }
    }


    
    //______________________________________________________________________________________
    // ===== Combat Phase: Execute Action =====

    const calculateHitOrMiss = (actionObj, actionTakerEntity, numberOfMisses, targetEntity) => {
        const chanceToHit = (
            (CHANCE_TO_HIT_BASE + actionTakerEntity.level) // 5-25
            + Math.floor(Math.random() * 26) // 0-25
            + actionTakerEntity.accuracy
            + (actionObj?.accuracy || 0)
            + (CHANCE_TO_HIT_INCREASE_PER_MISS * numberOfMisses)
        )
    
        // true = hit | false = miss
        return chanceToHit > targetEntity.evasion
    }
    

    const executeAction = () => set(
        ({ entities, initiativeOrder, actionSelected, entitySelected, actionMisses }) => {
            if(!(actionSelected && entitySelected)) return;

            const actionObj = getActionObj(actionSelected);
            const actionTakerEntity = entities[ initiativeOrder[0] ];
            const numberOfMisses = (actionTakerEntity.isFriendly && actionMisses[ initiativeOrder[0] ]) || 0;
            const targetEntity = entities[ entitySelected ];
            const damage = calculateMeleeAttackDamage(
                actionObj.damageBase, 
                actionObj.damagePerLevel, 
                actionObj.damageStrengthMultiplier, 
                { character:actionTakerEntity }
            )
            let newEntities = structuredClone(entities);

            if(actionSelected?.type === "attack"){
                if(calculateHitOrMiss(actionObj, actionTakerEntity, numberOfMisses, targetEntity)){
                    // Hit
                    newEntities[entitySelected].hp = newEntities[entitySelected].hp - damage;

                    // TODO: Multi-Target attacks

                    return {
                        
                    }
                } 

                // Miss
                
            }

        }
    )


    
    //______________________________________________________________________________________
    // ===== Combat Phase: End Turn =====



    
    //______________________________________________________________________________________
    // ===== Hook Return =====
    return {
        initializeCombat,
        startTurn,
        getActionObj,
    }
}








/*

## Initialize Combat

- [x] Gather save file data
- [x] Gather encounter data
- [] Check if player should be able to play this encounter yet
- [x] configurePartyEntities
- [x] configureEnemyEntities
- [x] actually Initialize Combat
- [x] render 



## Combat Loop Phases

1. [] Action Select - Select what this entity is going to do this turn.
    - [x] Read entity's healing side effects or conditions
    - [x] Execute the healing code of those side effect(s) or condition(s), like hp regen.
        - [] Add the text to the narrative panel. For example: "Simon healed 4 health points!"
    - [] Is entity controlled or AI
        - [x] Controlled: Handled by the `Actions` panel, because this hook is only considered with what has happened, not possibilities.
        - [] AI: calculate best move (*)
2. [x] Entity Select - Select which entity(s) for this action to target.
    - [] Should be handled by the `Actions` and `Battlefield` panels, because this hook is only considered with what has happened, not possibilities.
        - [x] Read the selected action's data
        - [x] If entity is controlled, render the action's data and cancel button in the action panel
        - [x] Render the buttons based on who can be targeted by the action
        - [] Is entity controlled or AI
            - [] Controlled: wait for player input
            - [] AI: based on calculated best move, select target
3. [] Execute Action
    - [] Execute the code that makes the action actually do something.
    - [] Add the text to the narrative panel
    - [] Add any side effects or conditions to the entity(s)
        - [] Add the text to the narrative panel. For example: "Simon is burning!"
4. [] End Turn - Execute code that needs to run at the end of turns
    - [] Read entity's damaging side effects or conditions
    - [] Execute the damaging code of the side effect(s) or condition(s), like burning damage.
        - [] Add the text to the narrative panel. For example: "Simon took 4 burning damage!"
-



* AI: calculate best move
    - Read all entities' health and equipment 
    - Read all non-opposingForce entities' ...?...
    - TODO




*/