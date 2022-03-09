import Image from "next/image";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const SearchResult = ({ show }) => {
  return (
    <Link href={`show/${show.id}`} passHref>
      <Card
        className="p-2 m-3 mx-md-0 mt-0 shadow-sm search-result"
        style={{ cursor: "pointer" }}
        variant="light"
      >
        <Row className="px-0 py-2 m-auto m-lg-0">
          <Col lg="auto" className="d-flex justify-content-center">
            {show.image && (
              <Image
                src={show.image.medium}
                alt={`${show.name} poster`}
                width={210}
                height={295}
              />
            )}
          </Col>
          <Col className="align-self-center">
            <Card.Title className="text-lg-start text-center fs-2 mb-2">
              {show.name}
            </Card.Title>
            <Card.Subtitle className="text-lg-start text-center mb-2">
              {show.premiered && show.premiered.slice(0, 4)} -{" "}
              {show.ended ? show.ended.slice(0, 4) : "now"}
            </Card.Subtitle>
            {show.summary && (
              <Card.Body className="px-0">
                <p dangerouslySetInnerHTML={{ __html: show.summary }}></p>
              </Card.Body>
            )}
          </Col>
        </Row>
      </Card>
    </Link>
  );
};

export default SearchResult;
