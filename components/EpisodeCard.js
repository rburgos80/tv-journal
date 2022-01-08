import Image from "next/image";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const EpisodeCard = ({ episode }) => {
  const [open, setOpen] = useState(false);
  return (
    <Container>
      <Row className="p-4">
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
      <Row></Row>
    </Container>
  );
};

export default EpisodeCard;
