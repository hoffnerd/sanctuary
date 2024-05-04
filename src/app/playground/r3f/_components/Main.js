"use client"

// Packages -------------------------------------------------------------------------
import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Leva, useControls } from "leva";
// Components -----------------------------------------------------------------------
import MainLighting from './Lighting/MainLighting';
import MainScene from './Scenes/MainScene';
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component  =====
export default function Main() {



    //______________________________________________________________________________________
    // ===== Leva =====

    const { scene } = useControls({ 
        scene:{ value:1, min:0, max:1, step:1 },
    });



    //______________________________________________________________________________________
    // ===== Leva =====

    const renderScene = () => {
        switch (scene) {
            case 1: return <MainScene/>;
            // case 2: return <TextureScene/>;
            // case 3: return <CampingScene/>;
            default: return;
        }
    }



    //______________________________________________________________________________________
    // ===== Component Return  =====
    return <>
        <Leva/>
        <Canvas shadows camera={{ position:[0,0,16], fov:40 }}>
            <MainLighting />
            {renderScene()}
            <OrbitControls />
        </Canvas>
    </>
} 