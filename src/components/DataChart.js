"use client";

// Packages -------------------------------------------------------------------------
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
// Styles ---------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====
export default function DataChart ({ config }) {
    
    //______________________________________________________________________________________
    // ===== References =====
    const chartCanvas = useRef();



    //______________________________________________________________________________________
    // ===== Use Effects =====
    useEffect(() => {
        const chart = new Chart(chartCanvas.current, config);
        return () => chart.destroy();
    }, [config]);



    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <div style={{ position:"relative", width:"100%", height:"100%" }}>
            <canvas ref={chartCanvas} />
        </div>
    );
};