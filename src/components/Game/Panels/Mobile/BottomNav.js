"use client"

// Packages--------------------------------------------------------------------------
import { useEffect } from "react";
// Stores----------------------------------------------------------------------------
import { useMobileStore } from "@/stores/game";
// Components------------------------------------------------------------------------
import NavButton from "./NavButton";
import NavButtonMore from "./NavButtonMore";



//______________________________________________________________________________________
// ===== Component =====
export default function BottomNav(){

    //______________________________________________________________________________________
    // ===== Stores =====
    const mobileStore = useMobileStore((state) => state);



    //______________________________________________________________________________________
    // ===== Use Effects =====

    /**
     * Use Effect that checks if a badge value exists for a specific game panel and resets it to 0 if it does.
     * @dependency panelOpen
     */
    useEffect(() => {

        // make sure we have `panelOpen` set to something
        if(!mobileStore.panelOpen) return;

        // make sure there is an existing value for that badge
        if(!mobileStore[`navBadge_${mobileStore.panelOpen}`]) return;

        // run the set function to reset that badge
        mobileStore[`setNavBadge_${mobileStore.panelOpen}`](0);
    }, [mobileStore.panelOpen])



    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <div className="sticky top-[100vh] hiddenOnDesktop hiddenOnTablet">
            <div className="grid grid-cols-4">
                <NavButton panelKey="main" iconKey="faBell" />
                <NavButton panelKey="stats" iconKey="faUsers" />
                <NavButton panelKey="inventory" iconKey="faFile" />
                <NavButtonMore/>
            </div>
        </div>
    )
}