import { useRouter } from "next/router";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Head from "next/head";
import axios from "axios";
import EpisodeList from "../../components/EpisodeList";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Image from "next/image";
import Journal from "../../components/Journal";

const ShowPage = () => {
  const [showData, setShowData] = useState({});
  const [activeTab, setActiveTab] = useState("episodes");
  const [entries, setEntries] = useState([]);
  const router = useRouter();
  const episodeListRef = useRef();

  useEffect(() => {
    if (!router.query.id) {
      return;
    }

    const getData = async () => {
      try {
        const showRes = await axios.get(
          `https://api.tvmaze.com/shows/${router.query.id}`
        );
        setShowData(showRes.data);
      } catch {
        throw new Error(
          `Show data api fetch failed. ID query: ${router.query.id}`
        );
      }
    };
    getData();
  }, [router.query.id]);

  useEffect(() => {
    if (!episodeListRef.current) {
      return;
    }
    if (activeTab === "episodes") {
      episodeListRef.current.className = "";
    } else {
      episodeListRef.current.className = "d-none";
    }
  }, [activeTab]);

  return (
    <>
      <Head>
        <title>
          {showData.name ? `${showData.name} - TV Journal` : "Loading..."}
        </title>
      </Head>
      {showData.id && (
        <Card className="shadow-lg mb-md-4">
          <Row className="justify-content-center m-3">
            <Col md="auto">
              {showData.image && showData.image.original && (
                <div className="show-page-image">
                  <Image
                    src={showData.image.original}
                    alt={`${showData.name} poster`}
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
                <h2 className="text-md-start text-center mb-3">
                  <span
                    className="show-title"
                    dangerouslySetInnerHTML={{ __html: showData.name }}
                  />
                </h2>
                <p className="show-summary">
                  <span
                    dangerouslySetInnerHTML={{ __html: showData.summary }}
                  />
                </p>
              </div>
            </Col>
          </Row>
          <Nav
            fill
            variant="tabs"
            defaultActiveKey="episodes"
            onSelect={(e) => setActiveTab(e)}
          >
            <Nav.Item>
              <Nav.Link eventKey="episodes">Episodes</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="journal">Journal</Nav.Link>
            </Nav.Item>
          </Nav>
          <div ref={episodeListRef}>
            <EpisodeList entries={entries} show={showData} />
          </div>
          {activeTab === "journal" && (
            <div className="p-3">
              <Row className="justify-content-center">
                <Col md={10} lg={8} className="m-4">
                  <Journal show={showData} />
                </Col>
              </Row>
            </div>
          )}
        </Card>
      )}
    </>
  );
};

export default ShowPage;
