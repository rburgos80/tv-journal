import { useState } from "react";
import Journal from "./Journal";
import Image from "next/image";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import { ListGroup } from "react-bootstrap";

const JournalCard = ({ journal }) => {
  const { show, entryCount } = journal;
  const [open, setOpen] = useState(false);

  return (
    <>
      <Row className="align-items-center">
        <Col xs={2}>
          <Image
            src={show.image}
            alt={`${show.name} poster`}
            width={53}
            height={74}
            layout="fixed"
          />
        </Col>
        <Col xs={10}>
          <Card.Body className="d-flex align-items-baseline">
            {show.name}
          </Card.Body>
        </Col>
      </Row>
    </>
  );
};

export default JournalCard;
