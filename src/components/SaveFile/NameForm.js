"use client"

// React/Next------------------------------------------------------------------------
import { useEffect, useState } from "react";
// Actions---------------------------------------------------------------------------
import { createSaveFile } from "@/actions/saveFile";
// Components------------------------------------------------------------------------
import { Button } from "@/components/shadcn/ui/button"
import { DialogFooter } from "@/components/shadcn/ui/dialog"
import { Input } from "@/components/shadcn/ui/input"
// Styles ---------------------------------------------------------------------------
// Other-----------------------------------------------------------------------------
import { isObj } from "@/util";



//______________________________________________________________________________________
// ===== Component =====

export default function NameForm({ }) {

    //______________________________________________________________________________________
    // ===== State =====
    const [name, setName] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    

    //______________________________________________________________________________________
    // ===== Use Effects =====

    useEffect(() => {
 
        if(!submitting) return;

        if(!name){
            setErrorMessage("You must name yourself!");
            setSubmitting(false);
            return;
        }

        const cleanedName = name.trim().replace( /\s\s+/g, ' ' );
        if(!cleanedName){
            setErrorMessage("Did you really just try to enter all spaces?");
            setSubmitting(false);
            return;
        }
        if(cleanedName.length > 40){
            setErrorMessage("Does your name really need to be greater than 40 characters? It's a name, not a sentence.");
            setSubmitting(false);
            return;
        }

        // declare that we are subscribed and want the async function below to happen
        let isSubscribed = true;

        // create an async function that fetches the data so that this `useEffect` may call it below
        const submitName = async () => {

            // return early if an unexpected render happened so that the code below does not run twice
            if(!isSubscribed) return;

            // create our save file and take us there or wait for a response
            const response = await createSaveFile(name);

            // if there is no error within the response then we assume we are getting taken to the next page,
            // therefore, we should stop any further execution of this code as we have unmounted this component.
            if(!isObj(response, ["error"])) return;

            // assume there is an error that we need to display to the user
            setErrorMessage(response.message || "Something went wrong creating your save file!");
            setSubmitting(false);
        }

        // execute the async function defined above
        submitName();

        // cancel any future `fetchData` functions
        return () => isSubscribed = false;
    }, [submitting])



    //______________________________________________________________________________________
    // ===== On Change Functions  =====

    const onChangeName = (e) => {
        if(errorMessage) setErrorMessage(null);
        setName(e.target.value);
    }



    //______________________________________________________________________________________
    // ===== Component Return  =====

    return <>
        <div className="py-4">
            <Input id="name" className="col-span-4 neonText white" placeholder="Wakako Okada" value={name} onChange={(e)=>onChangeName(e)} />
            {errorMessage && <p className="pt-4 text-sm neonText neonTextGlow red">{errorMessage}</p>}
        </div>
        <DialogFooter>
            <Button variant="neonBlueWithGlow" type="submit" onClick={()=>setSubmitting(true)} disabled={submitting}>
                {submitting ? "...Starting Game..." : "Start Game"}
            </Button>
        </DialogFooter>
    </>
}
