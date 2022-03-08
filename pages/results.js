import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import SearchResult from "../components/SearchResult";

export default function Results() {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);

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
        <meta
          name="description"
          content="Keep a journal on your favorite TV Shows."
        />
      </Head>
      <section>
        <h4 className="search-results">
          {searchResults.length > 0 &&
            `Found ${searchResults.length} result${
              searchResults.length !== 1 ? "s" : ""
            } for "${router.query.q}"`}
        </h4>
        <div className="homeGrid">
          {searchResults &&
            searchResults.map((result, index) => (
              <SearchResult show={result.show} key={index} />
            ))}
        </div>
      </section>
    </>
  );
}
