"use client"

// Packages -------------------------------------------------------------------------
// Stores--------------------------------------------------------------------------
// Data ---------------------------------------------------------------------------
// Other --------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Hook =====

export default function useCombat(){

    //______________________________________________________________________________________
    // ===== Store =====




    //______________________________________________________________________________________
    // ===== Initialize Combat =====

    const initializeCombat = () => {

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

    

    //______________________________________________________________________________________
    // ===== Combat Phase: Action Select =====




    //______________________________________________________________________________________
    // ===== Combat Phase: Entity Select =====



    
    //______________________________________________________________________________________
    // ===== Combat Phase: Execute Action =====



    
    //______________________________________________________________________________________
    // ===== Combat Phase: End Turn =====



    
    //______________________________________________________________________________________
    // ===== Hook Return =====
    return {

    }
}








/*

## Initialize Combat

- Gather save file data
- Gather encounter data
- Check if player should be able to play this encounter yet
- configurePartyEntities
- configureEnemyEntities
- render



## Combat Loop Phases

1. Action Select - Select what this entity is going to do this turn.
    - Read entity's healing side effects or conditions
    - Execute the healing code of those side effect(s) or condition(s), like hp regen.
        - Add the text to the narrative panel. For example: "Simon healed 4 health points!"
    - Read entity's primary, secondary, and other special attacks
    - Read entity's inventory for any items to that can be used in combat
    - Read entity's Adrenaline Rush options
    - Is entity controlled or AI
        - Controlled: Make those all those options available in their respective action panel then wait for player input
        - AI: calculate best move (*)
2. Entity Select - Select which entity(s) for this action to target.
    - Read the selected action's data
    - If entity is controlled, render the action's data and cancel button in the action panel
    - Render the buttons based on who can be targeted by the action
    - Is entity controlled or AI
        - Controlled: wait for player input
        - AI: based on calculated best move, select target
3. Execute Action
    - Execute the code that makes the action actually do something.
    - Add the text to the narrative panel
    - Add any side effects or conditions to the entity(s)
        - Add the text to the narrative panel. For example: "Simon is burning!"
4. End Turn - Execute code that needs to run at the end of turns
    - Read entity's damaging side effects or conditions
    - Execute the damaging code of the side effect(s) or condition(s), like burning damage.
        - Add the text to the narrative panel. For example: "Simon took 4 burning damage!"
-



* AI: calculate best move
    - Read all entities' health and equipment 
    - Read all non-opposingForce entities' ...?...
    - TODO




*/