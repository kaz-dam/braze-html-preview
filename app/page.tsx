import HtmlPreview from "@/components/html-preview";
import SearchItem from "@/components/search-item";
import ViewSelector from "@/components/view-selector";

export default function Home() {
    return (
        <>
            <aside className="fixed top-0 left-0 z-50 w-[320px] h-full bg-white border-r-2 border-blue-400 px-6 py-10">
                <h1>Max</h1>
                <h2>Template preview</h2>
                <SearchItem />
                <ViewSelector />
            </aside>
            <main className="flex w-full min-h-screen flex-col items-center pl-[320px]">
                <HtmlPreview />
            </main>
        </>
    );
}
