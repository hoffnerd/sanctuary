
// Packages------------------------------------------------------------------------
import { motion } from "framer-motion";
// Stores--------------------------------------------------------------------------
import { useCombatStore } from "@/stores/combat";
// Components ---------------------------------------------------------------------
import { Button } from "@/components/shadcn/ui/button";
// Styles -------------------------------------------------------------------------
// Other --------------------------------------------------------------------------
import { renderFontAwesomeIcons } from "@/util/icons";



//______________________________________________________________________________________
// ===== Constants =====
const faHandPointLeft = { key:"faHandPointLeft", className: "h-10" };
const faHandPointRight = { key:"faHandPointRight", className: "h-10" };


//______________________________________________________________________________________
// ===== Component =====

export default function SelectEntityButton({ className, entityKey, isFriendly }) {

    //______________________________________________________________________________________
    // ===== Store =====
	const entities = useCombatStore((state) => state.entities);
	const initiativeOrder = useCombatStore((state) => state.initiativeOrder);
    const attackSelected = useCombatStore((state) => state.attackSelected);
    const setNextTurnState = useCombatStore((state) => state.setNextTurnState);



    //______________________________________________________________________________________
    // ===== Constants =====
	const entityObj = entities[entityKey];
    const currentTurnEntityKey = initiativeOrder[0]
	const currentTurnEntityObj = currentTurnEntityKey ? entities[currentTurnEntityKey] : null;
    // const attackObj = attackSelected ? attacksLibrary[attackSelected] : null;
    const isOpposingForce = (entityObj.isFriendly && (!currentTurnEntityObj.isFriendly)) || ((!entityObj.isFriendly) && currentTurnEntityObj.isFriendly);



    //______________________________________________________________________________________
    // ===== Component Return =====

    if(!(attackSelected && isOpposingForce)) return;

    return (
        <div className={`${className} flex items-center ${isFriendly ? "justify-start" : "justify-end"}`}>
            <Button
                variant="ghost"
                className="text-2xl w-1/2"
                onClick={() => setNextTurnState("attack", { targetEntityKey:entityKey })}
            >
                <motion.div
                    layout
                    animate={{ x: isFriendly ? [ "-50%", "50%" ] :  [ "50%", "-50%" ] }}
                    transition={{
                        duration: 0.5,
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "reverse",
                        repeatDelay: 0
                    }}
                >
                    {renderFontAwesomeIcons(isFriendly ? faHandPointLeft : faHandPointRight)}
                </motion.div>
            </Button>
        </div>
    )
}