'use server'

import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import { readServerSession } from '@/lib/protector';
import { defaultSaveData } from '@/data/defaultSaveData';
import { isArray, isObj } from '@/util';
import { narrativeData } from '@/data/game/narrative';
import { defaultAbilities } from '@/data/game/crew';




//______________________________________________________________________________________
// ===== Read Actions =====

const requiredRole = "TESTER";



//______________________________________________________________________________________
// ===== Read Actions =====

/**
 * Reads save files from the database for a specific user.
 * @returns array of objects where each object is a save file
 */
export const readSaveFilesByUserId = async () => {
    const session = await readServerSession({ trace:"readSaveFilesByUserId", requiredRole });
    if(isObj(session, ["error"])) return session;
    
    try {
        return await prisma.saveFile.findMany({
            select: { id:true, name:true, type:true, saveData:true, inGameTime:true, createdAt:true, updatedAt:true },
            where: { userId:session.user.id },
            orderBy: [ { updatedAt: 'desc' } ]  
        });
    } catch (error) {
        const message = "Unexpected error reading save files!"
        console.error(message, { trace:"readSaveFilesByUserId", error, session });
        return { error:true, message }
    }
}

/**
 * Reads save file from the database for a specific user.
 * @returns object that represents the saveFile
 */
export const readSaveFile = async (id) => {
    const session = await readServerSession({ trace:"readSaveFile", requiredRole });
    if(isObj(session, ["error"])) return session;

    try {
        return await prisma.saveFile.findUnique({ where: { id, userId:session.user.id } });
    } catch (error) {
        const message = "Unexpected error reading save file!"
        console.error(message, { trace:"readSaveFile", error, session });
        return { error:true, message }
    }
}



//______________________________________________________________________________________
// ===== Create Action =====

/**
 * Creates a save file with a given name and saves it to the server.
 * @param name - string, represents the name of the save file to be created.
 * @returns a redirect or an obj with an error bool and error message
 */
export const createSaveFile = async (name) => {

    const session = await readServerSession({ trace:"createSaveFile", requiredRole });
    if(isObj(session, ["error"])) return session;

    const cleanedName = name.trim().replace( /\s\s+/g, ' ' ).replace(/(<([^>]+)>)/gi, "");
    if(!cleanedName) return { error:true, message:"Hmmmmm, I wonder why you are seeing this message? 🤔 Try not to use < > and limit your spaces." }

    let saveFile = null;
    try {
        saveFile = await prisma.saveFile.create({
            data:{ userId:session.user.id, name:cleanedName, saveData:defaultSaveData }
        })
    } catch (error) {
        console.error("Unexpected error creating save file!", { trace:"createSaveFile", error });
        return { error:true, message:"Unexpected error creating save file!" }
    }

    // revalidatePath("/play");
    redirect(`/play/${saveFile.id}`);
}



//______________________________________________________________________________________
// ===== Update Action =====

const calculateAbility = (playerAbilities, abilityKey, valueToAdd) => {
    const abilities = isObj(playerAbilities) ? { ...defaultAbilities, ...playerAbilities } : { ...defaultAbilities };
    return abilities[abilityKey] + valueToAdd;
}

const handleRewards = (saveData, narrativeToAdd) => {
    const narrativeObj = narrativeData[narrativeToAdd];

    let playerAbilities = isObj(saveData.abilities) ? saveData.abilities : {}
    let editedSaveData = { ...saveData };

    isObj(narrativeObj.rewards) && Object.keys(narrativeObj.rewards).forEach(rewardType => {
        switch (rewardType) {
            case "items":
                editedSaveData.inventory = isArray(saveData.inventory) ? [ ...saveData.inventory, ...narrativeObj.rewards.items ] : [ ...narrativeObj.rewards.items ];
                break;
            case "abilities":
                isObj(narrativeObj.rewards) && Object.keys(narrativeObj.rewards.abilities).forEach((abilityKey => {
                    let keyToUse = abilityKey
                    let playerValue = narrativeObj.rewards.abilities[keyToUse];
                    if(abilityKey === "random"){
                        const randomKeys = Object.keys(narrativeObj.rewards.abilities.random);
                        keyToUse = randomKeys[Math.floor(Math.random() * randomKeys.length)];
                        playerValue = narrativeObj.rewards.abilities.random[keyToUse];
                    }
                    playerAbilities[keyToUse] = calculateAbility(playerAbilities, keyToUse, playerValue);
                }));
                if(isObj(playerAbilities)) editedSaveData.abilities = playerAbilities;
                break;
            default: break;
        }
    });

    return editedSaveData;
}

const checkAllowedToAddNarrative = (narrative, narrativeToAdd) => {
    if(!isArray(narrative)) return true;

    let narrativesBlocked = [ ...narrative ];
    narrative.forEach(narrativeId => {
        const narrativeObj = narrativeData[narrativeId];
        narrativeObj && isArray(narrativeObj.blocked) && narrativeObj.blocked.forEach(
            (blockedNarrativeId) => narrativesBlocked.push(blockedNarrativeId)
        );
    });
    if(narrativesBlocked.includes(narrativeToAdd)) return false;

    const latestNarrativeObj = narrativeData[narrative[narrative.length-1]];
    if(isObj(latestNarrativeObj, ["nextNarrative"]) && latestNarrativeObj.nextNarrative === narrativeToAdd) return true;
    if(latestNarrativeObj && isArray(latestNarrativeObj.choices)){
        let choiceAllowed = false;
        for (let i = 0; i < latestNarrativeObj.choices.length; i++) {
            const choice = latestNarrativeObj.choices[i];
            if(choice === narrativeToAdd || (isObj(choice, ["id"]) && choice.id === narrativeToAdd)){
                choiceAllowed = true;
                break;
            }
        }
        return choiceAllowed;
    }

    return false;
} 

/**
 * Updates the in-game time and the save date of a save file in a database.
 * @param id - string, unique identifier of the save file that you want to update.
 * @param inGameTime - int, represents the in-game time that needs to be saved in the database.
 * @param additionalSaveData - obj, represents the save data to be saved in the database.
 * @returns obj, the full saveFile from the database or an object with an error bool and error message
 */
export const updateSaveFile = async ({id, inGameTime, additionalSaveData, narrativeToAdd}) => {
    
    const session = await readServerSession({ trace:"updateSaveFile", requiredRole });
    if(isObj(session, ["error"])) return session;

    try {
        const saveFile = await prisma.saveFile.findUnique({ 
            select: { saveData:true },
            where: { id, userId:session.user.id }
        });

        let saveData = { ...defaultSaveData };
        if(isObj(saveFile.saveData) && isObj(additionalSaveData)) saveData = { ...defaultSaveData, ...saveFile.saveData, ...additionalSaveData };
        else if(isObj(saveFile.saveData)) saveData = { ...defaultSaveData, ...saveFile.saveData };


        if(narrativeToAdd && checkAllowedToAddNarrative(saveData.narrative, narrativeToAdd)){
            saveData.narrative.push(narrativeToAdd);

            const editedSaveData = handleRewards(saveData, narrativeToAdd);
            saveData = { ...editedSaveData };
        }

        return await prisma.saveFile.update({
            where: { id, userId:session.user.id },
            data:{ saveData, inGameTime, updatedAt: new Date(), }
        })
    } catch (error) {
        console.error("Unexpected error updating save file!", { trace:"updateSaveFile", error });
        return { error:true, message:"Unexpected error creating save file!" }
    }
}