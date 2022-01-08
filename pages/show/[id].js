import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import EpisodeList from "../../components/EpisodeList";

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
    <>
      <Head>
        <title>
          {showData.name ? `${showData.name} - TVbase` : "Loading..."}
        </title>
      </Head>
      {/* <Container>
        <ListGroup>
          {showData._embedded &&
            showData._embedded.episodes.map((episode) => (
              <ListGroup.Item>
                <EpisodeCard episode={episode} key={episode.id} />
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Container> */}
      {showData.id && <EpisodeList showId={showData.id} />}
    </>
  );
};

export default ShowPage;
