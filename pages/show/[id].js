import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import EpisodeList from "../../components/EpisodeList";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Image from "next/image";
import Journal from "../../components/Journal";

// Show details page
const ShowPage = () => {
  const [showData, setShowData] = useState({});
  const [activeTab, setActiveTab] = useState("episodes");
  const router = useRouter();

  // Fetch show information from the TVmaze API
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

  return (
    <>
      <Head>
        <title>
          {showData.name ? `${showData.name} - TV Journal` : "Loading..."}
        </title>
      </Head>
      {showData.id && (
        <Card className="shadow-lg mb-md-4 show-card">
          {/* Show Information */}
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
          {/* Episode list and show Journal */}
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

          {activeTab === "episodes" && <EpisodeList show={showData} />}
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
