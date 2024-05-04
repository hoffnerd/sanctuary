"use client"

import { useEffect } from "react";
import * as THREE from 'three'
import { useConvexPolyhedron} from '@react-three/cannon'
import { createTextTexture, createUvs } from '../_util'
import { Octahedron } from "@react-three/drei";


//______________________________________________________________________________________
// ===== Component  =====
export default function D8 (props){

    //______________________________________________________________________________________
    // ===== Constants =====
    const textColor = 'white'
    const dieColor = 'indigo'
    const sides = 8
    const radius = 2
    const verticesPerFace = 3
    const octahedronGeometry = new THREE.OctahedronGeometry(radius)



    //______________________________________________________________________________________
    // ===== Hooks =====
    const [ref, api] = useConvexPolyhedron(() => {
        return {
            args: octahedronGeometry,
            mass: 1,
            ...props
        }
    })



    //______________________________________________________________________________________
    // ===== Use Effect =====

    // Defining groups allows us to use a material array for BufferGeometry
    useEffect(() => {
        if (ref.current) {
            for (let i = 0; i < sides; i++) {
                ref.current.geometry.addGroup(i * verticesPerFace, verticesPerFace, i)
            }
            ref.current.geometry.setAttribute('uv', new THREE.Float32BufferAttribute(createUvs(sides, verticesPerFace, 0, -Math.PI / 8), 2))
            console.log(ref.current)
        }
    }, [])



    //______________________________________________________________________________________
    // ===== Component Return  =====
    return (
        <Octahedron args={radius} ref={ref} onClick={() => api.applyImpulse([0, 20, 0], [0, 0, 0])} castShadow receiveShadow>
            {Array.from(Array(sides)).map((_, i) => (
                <meshPhongMaterial attachArray="material" map={createTextTexture(i + 1, textColor, dieColor)} key={i} />
            ))}
        </Octahedron>
    )
}