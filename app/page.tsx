"use client";
import { Hits, InstantSearch, SearchBox } from "react-instantsearch";
import algoliasearch from "algoliasearch";
import typesense from "typesense";
import TypesenseSearchClient from "typesense-instantsearch-adapter";
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
	server: {
		apiKey: "xyz", // Be sure to use the search-only-api-key
		nodes: [
			{
				host: "localhost",
				port: 8108,
				protocol: "http",
			},
		],
	},
	// The following parameters are directly passed to Typesense's search API endpoint.
	//  So you can pass any parameters supported by the search endpoint below.
	//  queryBy is required.
	additionalSearchParameters: {
		query_by: "title,authors",
	},
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

const search = instantsearch({
	searchClient,
	indexName: "books",
});

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<InstantSearch indexName="instant_search" searchClient={search}>
				<SearchBox />
				<Hits />
			</InstantSearch>
		</main>
	);
}
