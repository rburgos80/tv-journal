import { useState } from "react";
import Journal from "./Journal";
import Image from "next/image";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Link from "next/link";

const JournalCard = ({ journal }) => {
  const { showName, showPicture, showId, entryCount } = journal;
  const [open, setOpen] = useState(false);

  return (
    <Accordion>
      <Accordion.Item>
        <Accordion.Header
          className="border-top"
          onClick={
            !open
              ? () => setOpen(!open)
              : () => setTimeout(() => !open && setOpen(!open), 1000)
          }
        >
          <Card
            className="p-2 mt-4 shadow-sm border-0"
            bg="light"
            border="dark"
          >
            <Row>
              <Col>
                <Image
                  src={showPicture}
                  alt={`${showName} poster`}
                  width={210}
                  height={295}
                />
              </Col>
              <Col xs={9}>
                <Link href={`/show/${showId}`} passHref>
                  <Card.Title as="h2" className="d-inline">
                    {showName}
                  </Card.Title>
                </Link>
                <Card.Body className="px-0">Entries: {entryCount}</Card.Body>
              </Col>
            </Row>
          </Card>
        </Accordion.Header>
        <Accordion.Body>
          <div>
            {open && (
              <Row className="justify-content-center">
                <Col md={10} lg={8} className="mb-4">
                  <Journal show={show} />
                </Col>
              </Row>
            )}
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default JournalCard;
