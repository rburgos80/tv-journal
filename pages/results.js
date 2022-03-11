import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import SearchResult from "../components/SearchResult";

// Displays search results
export default function Results() {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);

  // Fetch search result data from TVmaze API
  useEffect(() => {
    if (!router.query.q) {
      return;
    }

    const fetchSearchResults = async () => {
      if (!router.query.q) {
        return null;
      }
      try {
        const response = await axios.get(
          `https://api.tvmaze.com/search/shows?q=${router.query.q}`
        );
        const data = response.data;
        setSearchResults(data);
      } catch (err) {
        throw new Error(err);
      }
    };
    fetchSearchResults();
  }, [router.query.q]);

  return (
    <>
      <Head>
        <title>Search - TV Journal</title>
      </Head>
      <main className="pb-3">
        <h4 className="search-results text-center py-4 pt-sm-0">
          {searchResults.length > 0 &&
            `Found ${searchResults.length} result${
              searchResults.length !== 1 ? "s" : ""
            } for "${router.query.q}"`}
        </h4>
        <div>
          {searchResults &&
            searchResults.map((result, index) => (
              <SearchResult show={result.show} key={index} />
            ))}
        </div>
      </main>
    </>
  );
}
