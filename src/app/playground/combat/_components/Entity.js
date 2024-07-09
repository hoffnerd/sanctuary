
// Packages------------------------------------------------------------------------
// Stores--------------------------------------------------------------------------
import { useCombatStore } from "@/stores/combat";
// Components ---------------------------------------------------------------------
import { Progress } from "@/components/shadcn/ui/progress";
// Styles -------------------------------------------------------------------------
import styles from "@/styles/components/Entity.module.css";
import { maxAdrenalinePoints } from "@/data/_config";



//______________________________________________________________________________________
// ===== Constants =====

const apClass = "neonBackground neonBoxShadowGlow yellow";



//______________________________________________________________________________________
// ===== Component =====

export default function Entity({ className, entityKey }){

    //______________________________________________________________________________________
    // ===== Store =====
	const entities = useCombatStore((state) => state.entities);



    //______________________________________________________________________________________
    // ===== Constants =====
	const entityObj = entities[entityKey];



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
		<div className={`${className} ${styles.entity} neonBorder neonBoxShadowGlow ${entityObj.isFriendly ? "blue" : "red"}`}>
            <div className="p-2">
                <h2 className="text-center text-md neonText neonTextGlow">{entityObj.display}</h2>
                <div className="flex">
                    <p>AP:</p>
                    {renderAdrenalinePoints()}
                </div>
                <p>HP: {entityObj.hp}/{entityObj.hpMax}</p>
                <Progress 
                    indicatorClassName="neonBackground neonBoxShadowGlow green" 
                    value={(entityObj.hp/entityObj.hpMax)*100} 
                />
            </div>
		</div>
	)
}