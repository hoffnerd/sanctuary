// React/Next------------------------------------------------------------------------
// Context---------------------------------------------------------------------------
// Components------------------------------------------------------------------------
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/shadcn/ui/dialog"
import NameForm from "./NameForm";
// Styles ---------------------------------------------------------------------------
import styles from "@/styles/components/SaveFile.module.css";
// Other-----------------------------------------------------------------------------


//______________________________________________________________________________________
// ===== Constants =====


//______________________________________________________________________________________
// ===== Component =====

export default function NewSaveFile({ }) {

    //______________________________________________________________________________________
    // ===== Component Return  =====

    return (
        <div className="py-5">
            <Dialog>
                <DialogTrigger asChild>
                    <button className={`${styles.saveFileLink} w-full`}>
                        <div className={`${styles.saveFile} neonBorder neonBoxShadowGlow purple`}>
                            <div className={`${styles.item} neonText neonTextGlow blue`}>
                                <div className="text-center text-[8.7rem]">+</div>
                            </div>
                        </div>
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] neonBorder neonText neonTextGlow neonBoxShadowGlow purple">
                    <DialogHeader>
                        <DialogTitle>New Save File</DialogTitle>
                        <DialogDescription>What is your name?</DialogDescription>
                    </DialogHeader>
                    <NameForm />
                </DialogContent>    
            </Dialog>
        </div>
    )
}
