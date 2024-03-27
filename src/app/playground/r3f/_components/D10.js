"use client"

// Packages -------------------------------------------------------------------------
import { useCompoundBody } from '@react-three/cannon'
// Components -----------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component  =====
export default function D10(props) {

    //______________________________________________________________________________________
    // ===== References =====
    const [ref] = useCompoundBody(() => ({
        mass: 12,
        ...props,
        shapes: [
            { type: 'Sphere', position: [1, 0, 0], rotation: [0, 0, 0], args: [0.65, 6, 2] }
        ]
    }));

    //______________________________________________________________________________________
    // ===== Component Return  =====
    return (
        <group ref={ref}>
            <mesh receiveShadow castShadow position={[1, 0, 0]}>
                <sphereGeometry args={[0.65, 6, 2]} />
                <meshNormalMaterial />
            </mesh>
        </group>
    )
} 