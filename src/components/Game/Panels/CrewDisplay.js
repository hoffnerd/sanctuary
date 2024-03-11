"use client"
// Packages--------------------------------------------------------------------------
// Styles----------------------------------------------------------------------------
import styles from "@/styles/game.module.css";
// Data------------------------------------------------------------------------------
import { defaultAbilities } from "@/data/game/crew";
// Components------------------------------------------------------------------------
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn/ui/card"
import DataChart from "@/components/DataChart";
// Other-----------------------------------------------------------------------------
import { convertObjToArray, isObj } from "@/util";



//______________________________________________________________________________________
// ===== Constants =====

const labels = [ 'Charisma', 'Dexterity', 'Intelligence', 'Survival', 'Strength', 'Weaponry' ];
const defaultDataset = {
    label: 'My First Dataset',
    fill: true,
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    pointBackgroundColor: 'rgb(255, 99, 132)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 99, 132)'
    // todo: change color based on highest stat
}

const defaultOptions = {
    elements: {
        line: { borderWidth: 3 }
    },
    scales: {
        r: { suggestedMax: 50 }
    }
}



//______________________________________________________________________________________
// ===== Component =====
export default function CrewDisplay({ display, abilities }) {

    //______________________________________________________________________________________
    // ===== Constants =====
    const abilitiesToUse = isObj(abilities) ? { ...defaultAbilities, ...abilities } : defaultAbilities;
    const data = [ 
        abilitiesToUse.charisma, 
        abilitiesToUse.dexterity,
        abilitiesToUse.intelligence,
        abilitiesToUse.survival,
        abilitiesToUse.strength,
        abilitiesToUse.weaponry,
    ];

    const config = { 
        type: 'radar',
        options: { 
            ...defaultOptions, 
            scales: { 
                ...defaultOptions.scales, 
                r: { 
                    ...defaultOptions.scales.r,
                    suggestedMax: Math.max(...data) >= 25 ? 50 : Math.max(...data) >= 10 ? 25 : Math.max(...data) >= 5 ? 10 : 5
                }
            } 
        },
        data: { 
            labels, 
            datasets: [{ ...defaultDataset, data }]
        } 
    }


    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <div className="p-2">
            <Card className="w-full">
                <CardContent className={styles.crewGrid}>
                    <CardHeader>
                        <CardTitle>{display}</CardTitle>
                    </CardHeader>
                    <DataChart config={config} />
                </CardContent>
            </Card>
        </div>
    )
} 