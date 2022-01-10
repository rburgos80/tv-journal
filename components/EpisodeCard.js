import Image from "next/image";
import { useState } from "react";
import {
  Accordion,
  Col,
  Container,
  Row,
  useAccordionButton,
} from "react-bootstrap";

const EpisodeCard = ({ episode }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="episode-card">
      <Accordion className="shadow-sm mt-2">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
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
            Ipsum velit ex laboris sit laborum. Reprehenderit reprehenderit
            dolore laborum labore excepteur sit Lorem aliqua cillum incididunt.
            Nostrud et minim laborum veniam esse voluptate. Reprehenderit aute
            nisi ut mollit eiusmod ad aliqua.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default EpisodeCard;
