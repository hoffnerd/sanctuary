"use client"

// Packages--------------------------------------------------------------------------
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
// Styles----------------------------------------------------------------------------
import styles from "@/styles/hooks/useDrag.module.css";
// Stores----------------------------------------------------------------------------
import { useDebugModeStore } from "@/stores/game";
// Other-----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Hook =====
export function useDrag({ ref, calculateFor="topLeft" }){
    
    //______________________________________________________________________________________
    // ===== State =====
    const [dragInfo, setDragInfo] = useState();
    const [finalPosition, setFinalPosition] = useState({});
    const [isDragging, setIsDragging] = useState(false);



    //______________________________________________________________________________________
    // ===== Use Callback Functions =====
    
    const updateFinalPosition = useCallback((width, height, x, y) => {
        if (calculateFor === "bottomRight") {
            setFinalPosition({
                x: Math.max( Math.min( window.innerWidth - width, window.innerWidth - (x + width)), 0 ),
                y: Math.max( Math.min( window.innerHeight - height, window.innerHeight - (y + height)), 0),
            });
            return;
        }

        setFinalPosition({
            x: Math.min(Math.max(0, x), window.innerWidth - width),
            y: Math.min(Math.max(0, y), window.innerHeight - height)
        });
    }, [calculateFor]);

    const handleMouseMove = useCallback((e) => {
            const { current: draggableElement } = ref;

            if (!isDragging || !draggableElement) return;
            e.preventDefault();

            const { clientX, clientY } = e;
            const position = { x: dragInfo.startX - clientX, y: dragInfo.startY - clientY };

            const { top, left, width, height } = dragInfo;
            updateFinalPosition(width, height, left - position.x, top - position.y);
        },
        [isDragging, dragInfo, ref, updateFinalPosition]
    );



    //______________________________________________________________________________________
    // ===== Functions =====

    const handleMouseUp = (e) => {
        e.preventDefault();
        setIsDragging(false);
    }

    const handleMouseDown = (e) => {
        e.preventDefault();
        const { clientX, clientY } = e;
        const { current: draggableElement } = ref;

        if (!draggableElement) return;

        const { top, left, width, height } = draggableElement.getBoundingClientRect();
        setDragInfo({ startX:clientX, startY:clientY, top, left, width, height });
        setIsDragging(true);
    }

    const recalculate = (width, height) => {
        const { current: draggableElement } = ref;
        const { top, left, width:boundingWidth, height:boundingHeight } = draggableElement.getBoundingClientRect();
        updateFinalPosition( width ?? boundingWidth, height ?? boundingHeight, left, top );
    }



    //______________________________________________________________________________________
    // ===== Use Effects =====

    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [handleMouseMove]);



    //______________________________________________________________________________________
    // ===== Hook Return =====
    return {
        position: finalPosition,
        handleMouseDown,
        recalculate
    };
};



//______________________________________________________________________________________
// ===== Draggable Component =====
export function Draggable({children, title}){
    
    //______________________________________________________________________________________
    // ===== References =====
    const ref = useRef(null);

    //______________________________________________________________________________________
    // ===== Hooks =====
    const { position, handleMouseDown } = useDrag({ ref });

    //______________________________________________________________________________________
    // ===== Stores =====
    const debugMode = useDebugModeStore((state) => state.debugMode);

    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <div ref={ref} className={styles.draggable} style={{ top:position.y, left:position.x }}>
            <div className={styles.draggablePanel} onMouseDown={handleMouseDown}>
                {title ?  title : "Draggable panel"}
            </div>
           <div className={debugMode ? styles.draggableContent : "hidden"}>{children}</div>
        </div>
    )
}