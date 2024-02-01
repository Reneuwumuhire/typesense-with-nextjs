/*
 *  Our JavaScript client library works on both the server and the browser.
 *  When using the library on the browser, please be sure to use the
 *  search-only API Key rather than the master API key since the latter
 *  has write access to Typesense and you don't want to expose that.
 */

const fs = require("fs/promises");
const Typesense = require("typesense");

async function main() {
	let client = new Typesense.Client({
		nodes: [
			{
				host: "127.0.0.1", // For Typesense Cloud use xxx.a1.typesense.net
				port: 8108, // For Typesense Cloud use 443
				protocol: "http", // For Typesense Cloud use https
			},
		],
		apiKey: "xyz",
		connectionTimeoutSeconds: 2,
	});

	const booksSchema = {
		name: "books",
		fields: [
			{ name: "title", type: "string" },
			{ name: "authors", type: "string[]", facet: true },

			{ name: "publication_year", type: "int32", facet: true },
			{ name: "ratings_count", type: "int32" },
			{ name: "average_rating", type: "float" },
		],
		default_sorting_field: "ratings_count",
	};
	await client.collections("books").delete();
	client.collections().create(booksSchema);

	const documents = await fs.readFile("./books.jsonl");
	client.collections("books").documents().import(documents, { batch_size: 100 });
	let searchParameters = {
		q: "harry potter",
		query_by: "title",
		sort_by: "ratings_count:desc",
	};

	const searchs = await client.collections("books").documents().search(searchParameters);

	console.log(searchs);
}

main();
