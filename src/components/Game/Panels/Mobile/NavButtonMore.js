"use client"

// Packages--------------------------------------------------------------------------
import { PopoverClose } from '@radix-ui/react-popover';
// Stores----------------------------------------------------------------------------
import { useMobileStore } from '@/stores/game';
// Components------------------------------------------------------------------------
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/ui/popover";
// Other-----------------------------------------------------------------------------
import { renderFontAwesomeIcons } from "@/util/icons";



//______________________________________________________________________________________
// ===== Constants =====
const panelKeys = [ "news", "texts", "journal" ];
const defaultButtonClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
const inactiveButtonClasses = "hover:bg-accent hover:text-accent-foreground px-4 py-2 h-14 w-full";
const activeButtonClasses = "bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 h-14 w-full";



//______________________________________________________________________________________
// ===== Micro Component =====
const NavButtonPopoverClose = ({panelKey, children}) => {

    //______________________________________________________________________________________
    // ===== Stores =====
    const panelOpen = useMobileStore((state) => state.panelOpen);
    const setPanelOpen = useMobileStore((state) => state.setPanelOpen);

    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <PopoverClose
            className={`${defaultButtonClasses} ${panelOpen === panelKey ? activeButtonClasses : inactiveButtonClasses}`}
            onClick={()=>setPanelOpen(panelKey)}
        >
            {children}
        </PopoverClose>
    )
}



//______________________________________________________________________________________
// ===== Component =====
export default function NavButtonMore({}){

    //______________________________________________________________________________________
    // ===== Stores =====
    const panelOpen = useMobileStore((state) => state.panelOpen);

    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <Popover>
            <PopoverTrigger className={`${defaultButtonClasses} ${panelKeys.includes(panelOpen) ? activeButtonClasses : inactiveButtonClasses}`}>
                {renderFontAwesomeIcons({ key:"faBars", className:"h-10" })}
            </PopoverTrigger>
            <PopoverContent>
                <NavButtonPopoverClose panelKey="news">{renderFontAwesomeIcons({ key:"faNewspaper", className:"h-5" })}&nbsp;News</NavButtonPopoverClose>
                <NavButtonPopoverClose panelKey="texts">{renderFontAwesomeIcons({ key:"faComment", className:"h-5" })}&nbsp;Texts</NavButtonPopoverClose>
                <NavButtonPopoverClose panelKey="journal">{renderFontAwesomeIcons({ key:"faBook", className:"h-5" })}&nbsp;Journal</NavButtonPopoverClose>
            </PopoverContent>
        </Popover>
    )
}