import HtmlPreview from "@/components/html-preview";
import SearchItem from "@/components/search-item";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center gap-4 p-24">
			<h1>Search for a preview</h1>
			<SearchItem />
			<HtmlPreview template={""} />
		</main>
    );
}
