import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import EpisodeList from "../../components/EpisodeList";
import { Container } from "react-bootstrap";

const ShowPage = () => {
  const [showData, setShowData] = useState({});
  const router = useRouter();

  async function getData() {
    try {
      const res = await axios.get(
        `https://api.tvmaze.com/shows/${router.query.id}`
      );
      const data = res.data;
      setShowData(data);
    } catch {
      throw new Error(
        `Show data api fetch failed. ID query: ${router.query.id}`
      );
    }
  }

  useEffect(() => {
    if (!router.query.id) {
      return;
    }

    getData();
  }, [router.query.id]);

  return (
    <Container>
      <Head>
        <title>
          {showData.name ? `${showData.name} - TVbase` : "Loading..."}
        </title>
      </Head>
      {showData.id && <EpisodeList showId={showData.id} />}
    </Container>
  );
};

export default ShowPage;
