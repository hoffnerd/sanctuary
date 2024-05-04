"use client"

// Packages -------------------------------------------------------------------------
import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics, Debug, usePlane, useBox, useConvexPolyhedron} from '@react-three/cannon'
// Components -----------------------------------------------------------------------
import Plane from "./Plane";
import CompoundBody from './CompoundBody';
import D10 from './D10';
import D8 from './D8';
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component  =====
export default function Main() {

    //______________________________________________________________________________________
    // ===== State =====
    const [flag, setFlag] = useState(false);

    //______________________________________________________________________________________
    // ===== Use Effect =====
    useEffect(() => void setTimeout(() => setFlag(true), 2000), [])

    //______________________________________________________________________________________
    // ===== Component Return  =====
    return (
        <Canvas dpr={[1, 2]} shadows gl={{ alpha: false }} camera={{ position: [0, 5, 5], fov: 70 }}>
            <color attach="background" args={['#020817']} />
            <hemisphereLight intensity={1} />
            <spotLight position={[5, 5, 5]} angle={0.75} penumbra={1} intensity={1} castShadow shadow-mapSize-width={1028} shadow-mapSize-height={1028} />
            <Physics iterations={6}>
                <Debug scale={1.1} color="white">
                    <Plane position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} />
                    <D8 position={[1.5, 5, 0.5]} rotation={[1.25, 0, 0]} />
                    {/* <D8 position={[2.5, 3, 0.25]} rotation={[1.25, -1.25, 0]} />
                    {flag && <D8 position={[2.5, 4, 0.25]} rotation={[1.25, -1.25, 0]} />} */}
                </Debug>
            </Physics>
        </Canvas>
    )
} 