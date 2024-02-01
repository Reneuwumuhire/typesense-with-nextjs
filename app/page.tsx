"use client";
import { Hits, InstantSearch, SearchBox } from "react-instantsearch";
import algoliasearch from "algoliasearch";

const client = algoliasearch("latency", "6be0576ff61c053d5f9a3225e2a90f76");

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<InstantSearch indexName="instant_search" searchClient={client}>
				<SearchBox />
				<Hits />
			</InstantSearch>
		</main>
	);
}
