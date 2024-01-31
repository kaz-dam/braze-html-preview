import SearchItem from "@/components/search-item";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center gap-4 p-24">
			<h1 className="text-4xl mb-5">Braze Template Preview</h1>
			<SearchItem />
		</main>
    );
}
