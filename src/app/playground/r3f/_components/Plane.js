"use client"

import { Plane as PlaneR3F } from "@react-three/drei";
import { useControls } from "leva";



export default function Plain({ size=[10,10,1] }){

    const { planeWidth, planeHeight, planeSegments, position } = useControls({ 
        planeWidth: size[0], 
        planeHeight: size[1], 
        planeSegments: size[2],
        position: { value:-0.5, max:3, min:-3 }
    })

    return(
        <PlaneR3F
            args={[planeWidth, planeHeight, planeSegments, planeSegments]}
            position-z={position}
            // rotation-x={-Math.PI / 2}
        >
            <meshStandardMaterial color="#ffb385"/>
        </PlaneR3F>
    )
}