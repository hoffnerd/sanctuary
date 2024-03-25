"use client"
// Packages--------------------------------------------------------------------------
// Styles----------------------------------------------------------------------------
// Data------------------------------------------------------------------------------
import { defaultAbilities } from "@/data/game/crew";
// Components------------------------------------------------------------------------
import DataChart from "@/components/DataChart";
// Other-----------------------------------------------------------------------------
import { isObj } from "@/util";



//______________________________________________________________________________________
// ===== Constants =====

const labels = [ 'Charisma', 'Dexterity', 'Intelligence', 'Survival', 'Strength', 'Weaponry' ];
const defaultDataset = {
    label: "Points",
    fill: false,
    backgroundColor: 'rgb(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    pointBackgroundColor: ['rgb(0, 254, 155)', 'rgb(45, 217, 254)', 'rgb(148, 97, 253)', 'rgb(255, 81, 97)', 'rgb(255, 178, 78)', 'rgb(255, 219, 78)'],
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 99, 132)',
    tooltip: { callbacks:{ label: ()=>false } }
}

const defaultOptions = {
    plugins: { legend: { display:false } },
    elements: {
        point: { radius:8, hoverRadius:6 },
        line: { borderWidth: 2 }
    },
    scales: {
        r: { 
            suggestedMin: 0, 
            suggestedMax: 5,
            grid: { color: "indigo" },
            ticks: { stepSize: 1 }
        }
    },
}



//______________________________________________________________________________________
// ===== Pure Functions =====

const generateScaleDetails = (data) => {
    const max = Math.max(...data);
    if(max >= 25) return { suggestedMax: 50, stepSize: 10 };
    else if(max >= 10) return { suggestedMax: 25, stepSize: 5 };
    else if(max >= 5) return { suggestedMax: 10, stepSize: 2 };
    return { suggestedMax: 5, stepSize: 1 };
}



//______________________________________________________________________________________
// ===== Component =====
export default function AbilitiesDisplay({ abilities }) {

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
    const datasets = [
        { ...defaultDataset, borderColor:'rgb(0, 254, 155)', data:[ abilitiesToUse.charisma, abilitiesToUse.dexterity, null, null, null, null, ] },
        { ...defaultDataset, borderColor:'rgb(45, 217, 254)', data:[ null, abilitiesToUse.dexterity, abilitiesToUse.intelligence, null, null, null ] },
        { ...defaultDataset, borderColor:'rgb(148, 97, 253)', data:[ null, null, abilitiesToUse.intelligence, abilitiesToUse.survival, null, null ] },
        { ...defaultDataset, borderColor:'rgb(255, 81, 97)', data:[ null, null, null, abilitiesToUse.survival, abilitiesToUse.strength, null ] },
        { ...defaultDataset, borderColor:'rgb(255, 178, 78)', data:[ null, null, null, null, abilitiesToUse.strength, abilitiesToUse.weaponry ] },
        { ...defaultDataset, borderColor:'rgb(255, 219, 78)', data:[ abilitiesToUse.charisma, null, null, null, null, abilitiesToUse.weaponry ] },
        { ...defaultDataset, fill:true, tooltip:{}, data },
    ]
    const { suggestedMax, stepSize } = generateScaleDetails(data);

    let config = { type: 'radar', options: defaultOptions , data: { labels, datasets } }
    config.options.scales.r.suggestedMax = suggestedMax;
    config.options.scales.r.ticks.stepSize = stepSize;

    //______________________________________________________________________________________
    // ===== Component Return =====
    return <DataChart config={config} />
} 