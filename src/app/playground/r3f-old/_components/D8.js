"use client"

import { forwardRef, useEffect, useMemo, useRef } from "react";
import * as THREE from 'three'
import { useConvexPolyhedron} from '@react-three/cannon'
import { calculateTextureSize, createCanvas, createTextTexture, createUvs, toConvexProps } from '../_util'
import { Octahedron } from "@react-three/drei";
import { isArray } from "@/util";
import { useFrame } from "@react-three/fiber";


//______________________________________________________________________________________
// ===== Component  =====
const D8 = forwardRef((props, ref) => {

    //______________________________________________________________________________________
    // ===== Constants =====
    const textColor = 'white'
    const dieColor = 'red'
    const sides = 8
    const radius = 0.3
    const verticesPerFace = 3
    const size = 100;
    const textMargin = 1;
    const ts = calculateTextureSize(size / 2 + size * textMargin) * 2;

    // const canvasArray = [
    //     createCanvas(1, textColor, dieColor),
    //     createCanvas(2, textColor, dieColor),
    //     createCanvas(3, textColor, dieColor),
    //     createCanvas(4, textColor, dieColor),
    //     createCanvas(5, textColor, dieColor),
    //     createCanvas(6, textColor, dieColor),
    //     createCanvas(7, textColor, dieColor),
    //     createCanvas(8, textColor, dieColor),
    //     createCanvas(9, textColor, dieColor)
    // ];
    // console.log({canvasArray});

    const canvasRefArray = [...Array(sides).keys()].map(i => useRef(document.createElement('canvas')));
    canvasRefArray.forEach(canvasRef => {
        canvasRef.current.width = ts;
        canvasRef.current.height = ts;
    });
    const contextArray = canvasRefArray.map(canvasRef => canvasRef.current.getContext("2d"));
    contextArray.forEach((context, index) => {
        const canvas = canvasRefArray[index].current;
        context.font = ts / (1 + 2 * textMargin) + 'pt Arial';
        context.fillStyle = dieColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = textColor;
        context.fillText(index, canvas.width / 2, canvas.height / 2);
        if (index === 6 || index === 9) {
            context.fillText('  .', canvas.width / 2, canvas.height / 2);
        }
    });
    const textureRefArray = canvasRefArray.map(canvasRef => {
        const texture = new THREE.CanvasTexture(canvasRef.current);
        texture.needsUpdate = true;
        return useRef(texture);
    })

    //______________________________________________________________________________________
    // ===== Hooks =====

    // const numberCanvases = useMemo( () => [...Array(sides).keys()].map(i => createTextTexture(canvasArray[i])) );
    const geo = useMemo( () => toConvexProps(new THREE.OctahedronGeometry(radius)), [] );
    const [ref, api] = useConvexPolyhedron(() => ({ mass: 1, ...props, args: geo }));

    // useEffect(() => {
    //     isArray(numberCanvases) && numberCanvases.forEach(element => {
    //         console.log({element:element.magFilter})
    //     });
    // }, [numberCanvases])

    //______________________________________________________________________________________
    // ===== Use Effect =====

    // Defining groups allows us to use a material array for BufferGeometry
    useEffect(() => {
        if (!ref.current) return;
        for (let i = 0; i < sides; i++) {
            ref.current.geometry.addGroup(i * verticesPerFace, verticesPerFace, i)
        }
        ref.current.geometry.setAttribute('uv', new THREE.Float32BufferAttribute(createUvs(sides, verticesPerFace, 0, -Math.PI / 8), 2))
        console.log(ref.current)
    }, [])



    //______________________________________________________________________________________
    // ===== Render Functions  =====

    const renderMaterial = () => {
        let materials = [];
        for (let i = 0; i < 8; i++) {
            materials.push(<meshPhongMaterial key={i} attachArray="material" map={numberCanvases[i]} />)
        }
        return materials
    }


    //______________________________________________________________________________________
    // ===== Component Return  =====
    return (
        <Octahedron args={[radius]} ref={ref} onClick={() => api.applyImpulse([0, 20, 0], [0, 0, 0])} castShadow receiveShadow>
            {textureRefArray.map((textureRef, index) => (
                <meshBasicMaterial key={index}>
                    <canvasTexture ref={textureRef} attach="map" image={canvasRefArray[index].current} />
                </meshBasicMaterial>
            ))}
        </Octahedron>
    ) 
})
export default D8;