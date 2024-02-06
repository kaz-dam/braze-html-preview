import HtmlPreview from "@/components/html-preview";
import Sidebar from "@/components/sidebar";

// TODO: Add dynamic page title that contains monday item name
// TODO: implement toaster messages for error and success

export default function Home() {
    return (
        <>
            <Sidebar />
            <main className="flex w-full min-h-screen flex-col items-center sm:pl-[320px] pl-0">
                <HtmlPreview />
            </main>
        </>
    );
}
