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
      <div className="d-flex align-items-center">
        <Image
          src={show.image}
          alt={`${show.name} poster`}
          width={53}
          height={74}
          layout="intrinsic"
        />
        <h5 className="ms-2 text-truncate">{show.name}</h5>
      </div>
    </>
  );
};

export default JournalCard;
