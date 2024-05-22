// Components -----------------------------------------------------------------------
import { Button } from "@/components/shadcn/ui/button";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====
export default function Actions(){
    
    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <div className="grid grid-cols-4 h-full">
            <Button className="h-full" isRounded={false} variant="neonRed">Attacks</Button>
            <Button className="h-full" isRounded={false} variant="neonBlue">Items</Button>
            <Button className="h-full" isRounded={false} variant="neonGreen">Defend</Button>
            <Button className="h-full" isRounded={false} variant="neonOrange">Adrenaline Rush</Button>
        </div>
    )
}