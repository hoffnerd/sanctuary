
// Packages------------------------------------------------------------------------
// Stores--------------------------------------------------------------------------
// Components ---------------------------------------------------------------------
import { Button } from "@/components/shadcn/ui/button";
// Styles -------------------------------------------------------------------------
// Other --------------------------------------------------------------------------
import { renderFontAwesomeIcons } from "@/util/icons";



//______________________________________________________________________________________
// ===== Component =====

export default function SelectEntityButton({ className, entityKey, isFriendly }){

    //______________________________________________________________________________________
    // ===== Component Return =====
	return (
        <div className={`${className} flexItemsEvenly`}>
            {(!isFriendly) && <div/>}
            <Button 
                variant="secondary" 
                className="text-2xl" 
                onClick={()=>console.log({ trace:"SelectEntityButton", entityKey })}
            >
                {renderFontAwesomeIcons(isFriendly ? "faHandPointLeft" : "faHandPointRight")}
            </Button>
            {isFriendly && <div/>}
        </div>
	)
}