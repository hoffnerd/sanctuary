"use client"

// Packages--------------------------------------------------------------------------
import { useParams } from "next/navigation";
// Styles----------------------------------------------------------------------------
import { useReadSaveFile } from "@/rQuery/hooks/saveFile";
// Data------------------------------------------------------------------------------
import { items } from "@/data/game/items";
// Components------------------------------------------------------------------------
// Other-----------------------------------------------------------------------------
import { isArray, isObj } from "@/util";



//______________________________________________________________________________________
// ===== Component  =====
export default function Inventory({}){

    //______________________________________________________________________________________
    // ===== URL Params =====
    const params = useParams();
    const saveFileId = isObj(params, [ 'id' ]) ? params.id : null;



    //______________________________________________________________________________________
    // ===== Hooks =====
    const { data:saveFile } = useReadSaveFile(saveFileId);
    if(!isObj(saveFile, [ "id", "saveData" ])) return;



    //______________________________________________________________________________________
    // ===== Constants =====
    const { saveData: { inventory } } = saveFile;



    //______________________________________________________________________________________
    // ===== Render Functions =====
    const renderItems = () => {
        if(isArray(inventory)) return inventory.map(itemId => {
            const item = items[itemId];
            return <p key={itemId}>{item.title}</p>
        });
        return "Nothing in your inventory...";
    }



    //______________________________________________________________________________________
    // ===== Component Return =====
    return <>
        <h2 className="text-xl">Inventory</h2>
        <hr/>
        <div className="p-1"/>
        {renderItems()}
    </>
} 