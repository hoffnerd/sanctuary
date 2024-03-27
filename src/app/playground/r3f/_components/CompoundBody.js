"use client"

// Packages -------------------------------------------------------------------------
import { useCompoundBody } from '@react-three/cannon'
// Components -----------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component  =====
export default function CompoundBody(props) {

    //______________________________________________________________________________________
    // ===== References =====
    const [ref] = useCompoundBody(() => ({
        mass: 12,
        ...props,
        shapes: [
            { type: 'Box', position: [0, 0, 0], rotation: [0, 0, 0], args: [1, 1, 1] },
            { type: 'Sphere', position: [1, 0, 0], rotation: [0, 0, 0], args: [0.65] }
        ]
    }));

    //______________________________________________________________________________________
    // ===== Component Return  =====
    return (
        <group ref={ref}>
            <mesh receiveShadow castShadow>
                <boxGeometry args={[1, 1, 1]} />
                <meshNormalMaterial />
            </mesh>
            <mesh receiveShadow castShadow position={[1, 0, 0]}>
                <sphereGeometry args={[0.65, 16, 16]} />
                <meshNormalMaterial />
            </mesh>
        </group>
    )
} 