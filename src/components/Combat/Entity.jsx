
// Packages------------------------------------------------------------------------
// Stores--------------------------------------------------------------------------
import { useCombatStore } from "@/stores/combat";
// Components ---------------------------------------------------------------------
import { Progress } from "@/components/shadcn/ui/progress";
// Styles -------------------------------------------------------------------------
import styles from "@/styles/components/Entity.module.css";
// Data ---------------------------------------------------------------------------
import { maxAdrenalinePoints } from "@/data/_config";
// Other --------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Constants =====

const apClass = "neonBackground neonBoxShadowGlow yellow";
const buttonClass = "hover:bg-accent hover:text-accent-foreground"



//______________________________________________________________________________________
// ===== Micro-Component =====

const EntityContent = ({ entityObj }) => {

    //______________________________________________________________________________________
    // ===== Functions =====

	const renderAdrenalinePoints = () => {
		let adrenalinePointsToRender = [];
		const ap = entityObj?.ap ? entityObj.ap : 0;
		for(let i = 0; i < maxAdrenalinePoints; i++){
			adrenalinePointsToRender.push(
				<div key={i} className={`${styles.adrenalinePoints} ${i < ap ? apClass : styles.adrenalinePointGrey}`}/>
			) 
		}
		return adrenalinePointsToRender;
	}



    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <div className="h-full w-full p-2">
            <h2 className="text-center text-md neonText neonTextGlow">{entityObj.display}</h2>
            <div className="flex">
                <p>AP:</p>
                {renderAdrenalinePoints()}
            </div>
            <p className="text-left">HP: {entityObj.hp}/{entityObj.hpMax}</p>
            <Progress 
                indicatorClassName="neonBackground neonBoxShadowGlow green" 
                value={(entityObj.hp/entityObj.hpMax)*100} 
            />
        </div>
    )
}



//______________________________________________________________________________________
// ===== Component =====

export default function Entity({ className, entityKey }){

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
    const classes = `${className} ${styles.entity} neonBorder neonBoxShadowGlow ${entityObj.isFriendly ? "blue" : "red"}`;



    //______________________________________________________________________________________
    // ===== Component Return =====

	if(attackSelected && isOpposingForce) return (
		<button 
            className={`${classes} ${buttonClass}`}
            onClick={() => setNextTurnState("attack", { targetEntityKey:entityKey })}
        >
            <EntityContent entityObj={entityObj} />
		</button>
	)

	return (
		<div className={classes}>
            <EntityContent entityObj={entityObj} />
		</div>
	)
}