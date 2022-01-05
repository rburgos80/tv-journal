import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Card, Col, Row } from "react-bootstrap";

const SearchResult = ({ show }) => {
  const trimmedSummary = useRef(show.summary);
  if (trimmedSummary.current.length > 450) {
    trimmedSummary.current = `${trimmedSummary.current.slice(0, 449)}... `;
  }
  return (
    <div>
      <Card className="p-2 my-4" variant="light" border="light">
        <Row>
          <Col>
            {show.image && (
              <Image
                src={show.image.medium}
                alt={`${show.name} poster`}
                width={210}
                height={295}
              />
            )}
          </Col>
          <Col xs={9}>
            <Link href={`show/${show.id}`} passHref>
              <Card.Title as="a">{show.name}</Card.Title>
            </Link>
            <Card.Body className="px-0">
              {show.premiered && show.premiered.slice(0, 4)} -{" "}
              {show.ended ? show.ended.slice(0, 4) : "now"}
            </Card.Body>
            <Card.Body className="px-0">
              <div
                dangerouslySetInnerHTML={{ __html: trimmedSummary.current }}
                style={{ textOverflow: "ellipsis" }}
              />
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default SearchResult;
