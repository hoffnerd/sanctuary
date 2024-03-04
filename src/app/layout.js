// Packages -------------------------------------------------------------------------
import { Inter } from "next/font/google";
// Providers ------------------------------------------------------------------------
import AuthContext from "@/context/AuthContext";
import ClientProvider from "@/rQuery/ClientProvider";
// Components -----------------------------------------------------------------------
import Navigation from "@/components/Navigation";
// Styles ---------------------------------------------------------------------------
import "@/styles/globals.css";
// Others ---------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Constants  =====

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Sanctuary",
    description: "",
};



//______________________________________________________________________________________
// ===== Component  =====

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.className} dark bg-background text-foreground`}>
                <AuthContext>
                    <ClientProvider>
                        <Navigation/>
                        {children}
                    </ClientProvider>
                </AuthContext>
            </body>
        </html>
    );
}
