"use client"

import { useRef } from "react";
import { useHelper } from "@react-three/drei";
import { DirectionalLightHelper, PointLightHelper } from "three";
import { useControls } from "leva";

export default function MainLighting() {

    const directionalLightRef = useRef();
    const pointLightRef = useRef();

    const { lightType, lightColor, lightIntensity, lightPosition } = useControls({ 
        lightType:{ value:1, min:0, max:2, step:1 },
        lightColor:"white", 
        lightIntensity:{ value:2.5, min:0.5, max:5, step:0.1 },
        lightPosition: { x:0, y:2, z:2 }
    })

    useHelper(directionalLightRef, DirectionalLightHelper, 1, "white");
    useHelper(pointLightRef, PointLightHelper, 1, "white");

    const renderLight = (type=1, Comp="directionalLight", ref=directionalLightRef) => (
        <Comp
            ref={ref} 
            position={[ lightPosition.x, lightPosition.y, lightPosition.z ]} 
            color={lightColor} 
            intensity={type === lightType ? lightIntensity * type: 0}
        />
    )

    return <>
        <ambientLight/>
        {renderLight()}
        {renderLight(2, "pointLight", pointLightRef)}
    </>
}
