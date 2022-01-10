import Image from "next/image";
import { useState } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";

const EpisodeCard = ({ episode }) => {
  const [open, setOpen] = useState(false);
  return (
    <Container>
      <Accordion className="shadow-sm mt-2">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <Row className="p-3">
              <Col lg="auto">
                <div className="episode-card-image">
                  {episode.image && (
                    <Image
                      src={episode.image.medium}
                      width={250}
                      height={140}
                      layout="intrinsic"
                      alt="Episode poster"
                      className=""
                    />
                  )}
                </div>
              </Col>
              <Col>
                <div className="text-left">
                  <h4 dangerouslySetInnerHTML={{ __html: episode.name }} />
                  <p dangerouslySetInnerHTML={{ __html: episode.summary }} />
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
    </Container>
  );
};

export default EpisodeCard;
