// React/Next------------------------------------------------------------------------
import Link from "next/link";
import { format } from "date-fns";
// Context---------------------------------------------------------------------------
// Components------------------------------------------------------------------------
import { CenterVertically } from "../MicroComponents";
import { Badge } from "../shadcn/ui/badge";
import ReadableTime from "./ReadableTime";
// Styles ---------------------------------------------------------------------------
import styles from "@/styles/components/SaveFile.module.css";
// Data------------------------------------------------------------------------------
import { chapterNames } from "@/data/game/narrative/chapters";
import { defaultSaveData } from "@/data/defaultSaveData";
// Other-----------------------------------------------------------------------------
import { findChapter, isArray, isObj } from "@/util";



//______________________________________________________________________________________
// ===== Constants =====
const defaultSaveFile = { id:null, userId:null, name:null, type:null, saveData:null, inGameTime:null, createdAt:null, updatedAt:null };



//______________________________________________________________________________________
// ===== Micro Components =====

const Item = ({ children, col=null }) => (
    <div className={`${styles.item} ${col ? styles[col] : ""}`}>
        <CenterVertically>{children}</CenterVertically>
    </div>
);

const TypeBadge = ({ children, type }) => {
    if(type === "Story") return <Badge className="text-lg" variant="neonGreenWithGlow">{children}</Badge>
    else if(type === "Unlimited") return <Badge className="text-lg" variant="neonPinkWithGlow">{children}</Badge>
    return <Badge className="text-lg">{children}</Badge>
}



//______________________________________________________________________________________
// ===== Component =====

export default function SaveFile({ saveFile }) {

    //______________________________________________________________________________________
    // ===== Component Constants =====
    const { id, userId, name, type, saveData, inGameTime, createdAt, updatedAt } = isObj(saveFile) ? { ...defaultSaveFile, ...saveFile } : defaultSaveFile;
    const { resources, narrative } = isObj(saveData) ? { ...defaultSaveData, ...saveData } : defaultSaveData;


    //______________________________________________________________________________________
    // ===== Render Functions  =====

    const renderInGameTime = () => <ReadableTime timeInSeconds={inGameTime}/>

    const renderNameAndChapter = () => {
        const mostRecentNarrativeId = isArray(narrative) && narrative[narrative.length-1];
        const chapterId = mostRecentNarrativeId ? findChapter(mostRecentNarrativeId) : null;
        const chapterName = chapterId && chapterNames[`C${chapterId}`] ? chapterNames[`C${chapterId}`] : "How did you get here?";
        return <>{name} | {chapterName}</>
    }

    const renderStartedDate = () => <>Started: {format(createdAt, "MMM dd, yyyy")}</>

    const renderLastSavedTime = () => <>Last Saved:<br />{format(updatedAt, "MMM dd, yyyy hh:mm a")}</>

    const renderResource = ( key, display ) => <>⚙{display}: {isObj(resources, [key]) ? resources[key] : 0}</>



    //______________________________________________________________________________________
    // ===== Render Functions for different Content Mode =====

    const renderContentSmall = () => (
        <div className={`${styles.content} ${styles.small}`}>
            <Item col="firstCol"></Item>
            <Item col="secondCol">
                <div className="flex flex-row-reverse">{renderInGameTime()}</div>
            </Item>

            <Item col="regularCol">
                <div className="text-center">{renderNameAndChapter()}</div>
            </Item>
            <Item col="regularCol">
                <div className="text-center"></div>
            </Item>

            <Item col="regularCol"><hr/></Item>
            <Item col="regularCol">
                <div className="text-center"></div>
            </Item>
            <Item col="regularCol">
                <div className="text-center"></div>
            </Item>
            <Item col="regularCol">
                <div className="text-center"></div>
            </Item>
            <Item col="regularCol"><hr/></Item>

            <Item col="regularCol">
                <div className="text-center">{renderStartedDate()}</div>
            </Item>
            <Item col="regularCol">
                <div className="text-center">{renderLastSavedTime()}</div>
            </Item>
        </div>
    )

    const renderContentMedium = () => (
        <div className={`${styles.content} ${styles.medium}`}>
            <Item col="firstCol"></Item>
            <Item col="secondCol">
                <div className="flex flex-row-reverse">{renderInGameTime()}</div>
            </Item>
            
            <Item col="firstCol">{renderNameAndChapter()}</Item>
            <Item col="secondCol">
                <div className="flex flex-row-reverse"></div>
            </Item>

            <Item col="firstColComponents">
                <div className="text-center"></div>
            </Item>
            <Item col="secondColComponents">
                <div className="text-center"></div>
            </Item>
            <Item col="thirdColComponents">
                <div className="text-center"></div>
            </Item>

            <Item col="firstCol">{renderStartedDate()}</Item>
            <Item col="secondCol">
                <div className="flex flex-row-reverse">{renderLastSavedTime()}</div>
            </Item>
        </div>
    )

    const renderContentLarge = () => (
        <div className={`${styles.content} ${styles.large}`}>
            <Item col="firstCol"></Item>
            <Item><div className="text-center"></div></Item>
            <Item col="thirdCol"><div className="flex flex-row-reverse">{renderInGameTime()}</div></Item>
            
            <Item col="firstCol">{renderNameAndChapter()}</Item>
            <Item><p className="text-center"></p></Item>
            <Item col="thirdCol"><div className="flex flex-row-reverse">{renderStartedDate()}</div></Item>
            
            <Item col="firstCol"></Item>
            <Item><div className="text-center"></div></Item>
            <Item col="thirdCol"><div className="flex flex-row-reverse">{renderLastSavedTime()}</div></Item>
        </div>
    )



    //______________________________________________________________________________________
    // ===== Component Return  =====

    if (!(id && name && type)) return console.error("SaveFile Invalid!", { saveFile, save: { id, userId, name, type, createdAt, updatedAt } });
    
    return (
        <div className="py-5">
            <Link href={`/play/${id}`} className={styles.saveFileLink}>
                <div className={`${styles.saveFile} neonBorder neonBoxShadowGlow purple`}>
                    <div className="neonText neonTextGlow blue">
                        {renderContentLarge()}
                        {renderContentMedium()}
                        {renderContentSmall()}
                    </div>
                </div>
            </Link>
        </div>
    )
}
