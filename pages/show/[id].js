import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import EpisodeList from "../../components/EpisodeList";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";

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
      <Row className="justify-content-center">
        <Col md="auto">
          {showData.image && showData.image.original && (
            <div className="show-page-image">
              <Image
                src={showData.image.original}
                width={256}
                height={376}
                layout="intrinsic"
                className="mx-auto"
                priority
              />
            </div>
          )}
        </Col>
        <Col md="6">
          <div>
            <h2 className="text-md-start text-center my-3">
              <span
                className="show-title"
                dangerouslySetInnerHTML={{ __html: showData.name }}
              />
            </h2>
            <p className="show-summary">
              <span dangerouslySetInnerHTML={{ __html: showData.summary }} />
            </p>
          </div>
        </Col>
      </Row>
      {showData.id && <EpisodeList showId={showData.id} />}
    </Container>
  );
};

export default ShowPage;
