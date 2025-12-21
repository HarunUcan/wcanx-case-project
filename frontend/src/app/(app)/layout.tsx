import "@/app/globals.css";
import PanelNavbar from "@/components/layout/PanelNavbar";
import { Protected } from "@/components/layout/Protected";

export default function PanelLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-white dark:bg-background min-h-screen transition-colors duration-300">
            <Protected>
                <PanelNavbar />
                {children}
            </Protected>
        </div>
    );
}