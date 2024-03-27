"use client"

// Packages -------------------------------------------------------------------------
import { usePlane } from '@react-three/cannon'
// Components -----------------------------------------------------------------------
// Other ----------------------------------------------------------------------------
import { isArray } from '@/util'



//______________________________________________________________________________________
// ===== Component  =====
export default function Plain(props) {

    //______________________________________________________________________________________
    // ===== Constants =====
    const args = props && isArray(props.args) ? props.args : [0, 0]

    //______________________________________________________________________________________
    // ===== References =====
    const [ ref ] = usePlane(() => ({ type: 'Static', ...props }))

    //______________________________________________________________________________________
    // ===== Component Return  =====
    return (
        <mesh receiveShadow ref={ref}>
            <planeGeometry args={args} />
            <meshStandardMaterial color="#ffb385" />
        </mesh>
    )
} 