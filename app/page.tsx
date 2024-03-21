import HtmlPreview from "@/components/html-preview";
import PreviewWrapper from "@/components/preview-wrapper";
import Sidebar from "@/components/sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// TODO: Add dynamic page title that contains monday item name

export default function Home() {
    return (
        <>
            <Sidebar />
            <main className="flex w-full min-h-screen flex-col items-center sm:pl-[320px] pl-0">
                <PreviewWrapper />
            </main>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={true} />
        </>
    );
}
