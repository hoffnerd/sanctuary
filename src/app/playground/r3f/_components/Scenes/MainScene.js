"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import Plain from "@/app/playground/r3f/_components/Plane";




//______________________________________________________________________________________
// ===== Component =====
export default function MainScene() {

    //______________________________________________________________________________________
    // ===== Constants =====
    const multiplier = 10;
    



    //______________________________________________________________________________________
    // ===== References =====

    const diceRef = useRef();

    const deltaPreBounceRef = useRef(0);
    const isPreBounceRef = useRef(true);
    
    const deltaBouncingRef = useRef(0);
    const isReadyToBounceRef = useRef(false);
    const bounceDirectionRef = useRef("up");
    const bounceCountRef = useRef(0);

    const deltaRollingRef = useRef(0);
    const directionRef = useRef(0);
    const isRollingRef = useRef(false);
    const rollingSpeedMultiplierRef = useRef(5);

    const isDoneRef = useRef(false);




    //______________________________________________________________________________________
    // ===== Use Frames =====

    useFrame((state, delta) => {
        if(isDoneRef.current) return;
        if(!isPreBounceRef.current) return;
        if(isReadyToBounceRef.current) return;
        if(deltaPreBounceRef.current > 1){ // Wait to start bouncing
            isReadyToBounceRef.current = true;
            isPreBounceRef.current = false;
            return;
        }
        deltaPreBounceRef.current += delta;
    })

    useFrame((state, delta) => {
        if(isDoneRef.current) return;
        if(!isReadyToBounceRef.current) return;
        if(bounceCountRef.current > 0){ // Stop bouncing after this many bounces
            isRollingRef.current = true
            return;
        }
        deltaBouncingRef.current += delta;

        let { position } = diceRef.current;

        if(bounceDirectionRef.current === "up"){
            position.z += delta * 10;
            if(position.z > 10) bounceDirectionRef.current = "down";
        }

        if(bounceDirectionRef.current === "down"){
            position.z -= delta * 10;
            if(position.z < 0){
                bounceDirectionRef.current = "up";
                bounceCountRef.current++;
            }
        }
    })

    useFrame((state, delta) => {
        if(isDoneRef.current) return;
        if(!isRollingRef.current) return;

        deltaRollingRef.current += delta;
        
        let { rotation, position } = diceRef.current;

        rotation.x += delta * (multiplier + Math.floor(Math.random() * (multiplier/2)));
        rotation.y += delta * (multiplier + Math.floor(Math.random() * (multiplier/2)));

        switch (directionRef.current) {
            case 0:
                position.y -= (delta * 1) * rollingSpeedMultiplierRef.current;
                position.x -= (delta * 2) * rollingSpeedMultiplierRef.current;
                if(position.y < -2.15) directionRef.current++;
                break;
            case 1:
                position.y -= (delta * 2) * rollingSpeedMultiplierRef.current;
                position.x += (delta * 2) * rollingSpeedMultiplierRef.current;
                if(position.x > -2.15) directionRef.current++;
                break;
            case 2:
                position.y += (delta * 1.25) * rollingSpeedMultiplierRef.current;
                position.x += (delta * 2) * rollingSpeedMultiplierRef.current;
                if(position.x > 4.15) directionRef.current++;
                break;
            case 3:
                position.y += (delta * 2) * rollingSpeedMultiplierRef.current;
                position.x -= (delta * 2) * rollingSpeedMultiplierRef.current;
                if(position.y > 4.15) directionRef.current++;
                break;
            case 4:
                position.y -= (delta * 2) * rollingSpeedMultiplierRef.current;
                position.x -= (delta * 2) * rollingSpeedMultiplierRef.current;
                if(position.x < -2.15) directionRef.current++;
                break;
            case 5:
                position.y -= (delta * 2) * rollingSpeedMultiplierRef.current;
                position.x += (delta * 2) * rollingSpeedMultiplierRef.current;
                if(position.x > 0 || position.y < 0) directionRef.current++;
                break;
            case 6:
                position.y = 0;
                position.x = 0;
                rotation.y = 0;
                rotation.x = 0;
                isDoneRef.current = true;
            default: break;
        }
        rollingSpeedMultiplierRef.current -= delta;
    });




    //______________________________________________________________________________________
    // ===== Component Return =====
    return <>
        <Plain />
        <mesh position={[0,0,0]} ref={diceRef}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color="red"/>
        </mesh>
    </>
}
