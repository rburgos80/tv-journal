import Carousel from "react-bootstrap/Carousel";
import Image from "next/image";
import Card from "react-bootstrap/Card";
import { Col, Row, Button, Dropdown, DropdownButton } from "react-bootstrap";
import { useRef, useState } from "react";
import Link from "next/link";

const JournalEntry = ({ show, openDefault = false }) => {
  const [open, setOpen] = useState(openDefault);
  const [displaySeason, setDisplaySeason] = useState("1");
  const [displayEpisode, setDisplayEpisode] = useState(0);
  const carouselRef = useRef(null);
  const seasons = ["1", "2", "3", "4", "5", "6"];
  const episodes = {
    1: [1, 2, 3, 4],
    2: [5, 6, 7, 8],
    3: [9, 10, 11, 12],
    4: [13, 14, 15, 16],
    5: [17, 18, 19, 20],
    6: [21, 22, 23, 24],
  };

  const handleSelect = (index) => {
    setDisplayEpisode(index);
  };

  return (
    <Card className="p-2 mt-4 shadow border-0" bg="light" border="dark">
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
          <Link href={`/show/${show.id}`} passHref>
            <Card.Title as="h2" className="d-inline">
              {show.name}
            </Card.Title>
          </Link>
          <Card.Body className="px-0">Last Watched:</Card.Body>
          <Card.Body className="px-0">Episodes Watched:</Card.Body>
        </Col>
      </Row>
      <Button
        variant="outline-secondary"
        onClick={() => setOpen((open) => !open)}
      >
        {open ? "Hide Episodes" : "Show Episodes"}
      </Button>
      {open ? (
        <>
          <hr />
          <DropdownButton
            title={`Season ${displaySeason} `}
            onSelect={(value) => {
              handleSelect(0);
              setDisplaySeason(value);
            }}
            variant="secondary"
          >
            {seasons.map((season) => (
              <Dropdown.Item key={season} eventKey={season}>
                Season {season}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <Carousel
            ref={carouselRef}
            variant="dark"
            interval={null}
            wrap={false}
            slide={false}
            className="my-5"
            indicators={false}
            activeIndex={displayEpisode}
            onSelect={handleSelect}
          >
            {episodes[displaySeason]
              ? episodes[displaySeason].map((episode) => (
                  <Carousel.Item key={episode} as="h5" className="text-center">
                    Episode {episode}
                  </Carousel.Item>
                ))
              : null}
          </Carousel>
        </>
      ) : null}
    </Card>
  );
};

export default JournalEntry;
