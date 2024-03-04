"use client"

// Packages--------------------------------------------------------------------------
import { useEffect } from "react";
// Stores----------------------------------------------------------------------------
import { useMobileStore } from "@/stores/game";
// Components------------------------------------------------------------------------
import { Button } from "@/components/shadcn/ui/button";
import { Badge } from '@/components/shadcn/ui/badge';
// Other-----------------------------------------------------------------------------
import { renderFontAwesomeIcons } from "@/util/icons";



//______________________________________________________________________________________
// ===== Component =====
export default function NavButton({ panelKey, iconKey="", children }){

    //______________________________________________________________________________________
    // ===== Stores =====
    const mobileStore = useMobileStore((state) => state);



    //______________________________________________________________________________________
    // ===== Render Functions =====

    const renderBadge = () => {
        if(!mobileStore[`navBadge_${panelKey}`]) return;

        return (
            <Badge 
                variant="neonRedWithGlow"
                className="absolute top-0 left-7 max-[310px]:left-5"
            >
                {mobileStore[`navBadge_${panelKey}`]}
            </Badge>
        )
    }


    //______________________________________________________________________________________
    // ===== Component Return =====

    if(!panelKey) return;

    return (
        <Button variant={mobileStore.panelOpen === panelKey ? "" : "ghost"} className="h-14 w-full" onClick={()=>mobileStore.setPanelOpen(panelKey)}>
            <div className="relative">
                {iconKey ? renderFontAwesomeIcons({ key:iconKey, className:"h-10" }) : children}
                {renderBadge()}
            </div>
        </Button>
    )
}