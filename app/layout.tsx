import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { PreviewProvider } from "@/context/preview-context";
import { ProjectInfoProvider } from "@/context/project-info-context";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Braze Template Preview",
    description: "Generating preview of Braze templates from Lokalise translation tasks.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={montserrat.className}>
                <ProjectInfoProvider>
                    <PreviewProvider>
                        {children}
                    </PreviewProvider>
                </ProjectInfoProvider>
            </body>
        </html>
    );
}
