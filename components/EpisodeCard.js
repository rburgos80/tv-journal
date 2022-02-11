import Image from "next/image";
import { useState } from "react";
import Journal from "./Journal";
import Accordion from "react-bootstrap/Accordion";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const EpisodeCard = ({ show, episode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="episode-card">
      <Accordion className="mt-0">
        <Accordion.Item className="rounded-0 border-0" eventKey="0">
          <Accordion.Header
            className="border-top"
            onClick={
              !open
                ? () => setOpen(!open)
                : () => setTimeout(() => !open && setOpen(!open), 1000)
            }
          >
            <Row className="px-0 py-2 m-auto m-lg-0">
              <Col lg="auto">
                <div className="episode-card-image">
                  {episode.image && (
                    <Image
                      src={episode.image.medium}
                      width={250}
                      height={140}
                      layout="intrinsic"
                      alt="Episode poster"
                    />
                  )}
                </div>
              </Col>
              <Col className="align-self-center">
                <div>
                  <h4 className="text-lg-start text-center mb-2">
                    {episode.number && `${episode.number}. `}
                    <span
                      className="episode-title d-inline"
                      dangerouslySetInnerHTML={{ __html: episode.name }}
                    />
                  </h4>
                  <p className="episode-summary">
                    <span
                      dangerouslySetInnerHTML={{ __html: episode.summary }}
                    />
                  </p>
                </div>
              </Col>
            </Row>
          </Accordion.Header>
          <Accordion.Body>
            <div>
              {open && (
                <Row className="justify-content-center">
                  <Col md={10} lg={8} className="my-4">
                    <Journal show={show} episode={episode} />
                  </Col>
                </Row>
              )}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default EpisodeCard;
