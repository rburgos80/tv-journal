import Image from "next/image";
import { useState } from "react";
import Journal from "./Journal";
import { Accordion, Col, Row } from "react-bootstrap";

const EpisodeCard = ({ episode }) => {
  return (
    <div className="episode-card">
      <Accordion className="mt-0">
        <Accordion.Item className="rounded-0 border-0" eventKey="0">
          <Accordion.Header className="border-top">
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
                    <span
                      className="episode-title"
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
            <Journal data={[]} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default EpisodeCard;
