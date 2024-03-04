"use client"

import { Card, CardBtn, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn/ui/card"



//______________________________________________________________________________________
// ===== Constants =====
const hoverEffects = "hover:bg-accent hover:text-accent-foreground hover:cursor-pointer"



//______________________________________________________________________________________
// ===== Component =====
export default function CardButton({children, className="", title=null, description=null, onClick, disabled=false}) {

    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <CardBtn 
            onClick={() => onClick ? onClick() : console.error("No onClick function given.")}
            className={`w-full ${!disabled ? hoverEffects : ""} ${className}`}
            disabled={disabled}
        >
            <CardHeader>
                {title && <CardTitle className="text-lg">{title}</CardTitle>}
                {description && <CardDescription textMuted={title}>{description}</CardDescription>}
            </CardHeader>
            {children && <CardContent>{children}</CardContent>}
        </CardBtn>
    )
}