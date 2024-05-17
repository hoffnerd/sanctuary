// Packages -------------------------------------------------------------------------
import Link from 'next/link';
// Styles ---------------------------------------------------------------------------
import styles from "@/styles/components/SaveFile.module.css";
import classicStyles from "@/styles/Classic.module.css";
// Components -----------------------------------------------------------------------
import { readAllMarkdownFiles } from '@/actions/markdown';
import { format } from "date-fns";
// Data -----------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Page Meta Data =====
export const metadata = {
    title: `Change Log | Sanctuary`,
    description: 'All the changes that have been made to the site.',
}

//______________________________________________________________________________________
// ===== Component =====
export default async function Page() {

    //______________________________________________________________________________________
    // ===== Server Actions =====
    const logs = await readAllMarkdownFiles("change-log");

    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <div className="container">
            <h1 className="text-5xl font-black pb-10">Change Logs</h1>
            {logs.map(({ id, date, title, html, }) => (
                <div key={id} className="py-5">
                    <div className={`${styles.saveFile} neonBorder neonBoxShadowGlow purple`}>
                        <div className="p-10">
                            <h2 className="text-2xl font-black">{title}</h2>
                            <h3 className="text-lg font-black pb-5">{format(date, "MMMM do, yyyy")}</h3>
                            <div className={classicStyles.classic} dangerouslySetInnerHTML={{ __html: html }} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}