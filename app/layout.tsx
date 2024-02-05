import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { PreviewProvider } from "@/context/preview-context";

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
                <PreviewProvider>
                    {children}
                </PreviewProvider>
            </body>
        </html>
    );
}
