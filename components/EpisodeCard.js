import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";

const EpisodeCard = ({ episode }) => {
  return (
    <div>
      {console.log(episode)}
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            {episode.image && (
              <div className="test">
                <Image
                  src={episode.image.medium}
                  width={250}
                  height={140}
                  layout="intrinsic"
                  alt="Episode poster"
                  className=""
                />
              </div>
            )}
          </Col>
          <Col className="text-left">
            <div>
              <h2>{episode.name}</h2>
              <p dangerouslySetInnerHTML={{ __html: episode.summary }} />
            </div>
          </Col>
        </Row>
      </Container>
      {/* <div>
        {episode.image && (
          <Image
            src={episode.image.medium}
            width={250}
            height={140}
            layout="fixed"
            alt="Episode poster"
          />
        )}
      </div>
      <div>
        <h3>{episode.name}</h3>
        <p dangerouslySetInnerHTML={{ __html: episode.summary }} />
        <p>{episode.airdate}</p>
        <p>{`s${episode.season}e${episode.number ? episode.number : "?"}`}</p>
      </div>
    */}
    </div>
  );
};

export default EpisodeCard;
