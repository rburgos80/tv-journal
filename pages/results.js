import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SearchResult from "../components/SearchResult";
import axios from "axios";

export default function Results() {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(async () => {
    router.query.q && fetchSearchResults(router.query.q);
  }, [router.query.q]);

  const fetchSearchResults = async (query) => {
    try {
      const response = await axios.get(
        `https://api.tvmaze.com/search/shows?q=${query}`
      );
      const data = response.data;
      setSearchResults(data);
    } catch (err) {
      console.log(err);
    }
  };

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
          {searchResults &&
            `Found ${searchResults.length} results for "${router.query.q}"`}
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
