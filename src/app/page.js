
import Link from "next/link";
import { Button } from "@/components/shadcn/ui/button";

export default function Page() {
    return (
        <main className="flex flex-row min-h-[90vh] justify-center items-center">
            <div className="text-center">
                <h1 className="text-2xl">Some kind of Home Page</h1>
                <Button variant="neonGreenWithGlow" asChild>
                    <Link href="/play">Play</Link>
                </Button>
            </div>
        </main>
    );
}
