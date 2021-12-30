import Carousel from "react-bootstrap/Carousel";
import Image from "next/image";
import Card from "react-bootstrap/Card";
import {
  Col,
  Row,
  Container,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { useState } from "react";

const JournalEntry = ({ show, openDefault = false }) => {
  const [open, setOpen] = useState(openDefault);
  const [displaySeason, setDisplaySeason] = useState(1);
  const seasons = [1, 2, 3, 4, 5, 6];
  const episodes = [
    "episode 1",
    "episode 2",
    "episode 3",
    "episode 4",
    "episode 5",
  ];
  return (
    <Container>
      <Card className="p-2" bg="light" border="dark">
        <Row>
          <Col>
            <Image
              src={show.image}
              alt={`${show.name} poster`}
              width={210}
              height={295}
            />
          </Col>
          <Col xs={9}>
            <Card.Title as="h2">{show.name}</Card.Title>
            <Card.Body className="px-0">Last Watched:</Card.Body>
            <Card.Body className="px-0">Episodes Watched:</Card.Body>
            <Card.Link>Go to details page</Card.Link>
          </Col>
        </Row>
        <Button variant="primary" onClick={() => setOpen((open) => !open)}>
          Toggle Episodes
        </Button>
        {open ? (
          <>
            <hr />
            <DropdownButton
              title={`Season ${displaySeason}`}
              onSelect={(value) => setDisplaySeason(value)}
            >
              {seasons.map((season) => (
                <Dropdown.Item key={season} eventKey={season}>
                  Season {season}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <Carousel
              variant="dark"
              interval={null}
              wrap={false}
              className="my-3"
            >
              <Carousel.Item>Episode 1</Carousel.Item>
              <Carousel.Item>hello</Carousel.Item>
              <Carousel.Item>hello</Carousel.Item>
            </Carousel>
          </>
        ) : null}
      </Card>
    </Container>
  );
};

export default JournalEntry;
