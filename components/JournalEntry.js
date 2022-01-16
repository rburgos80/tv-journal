import { Card, ListGroup } from "react-bootstrap";

export default function JournalEntry({ entry, show, episode }) {
  return (
    <div>
      {entry && (
        <ListGroup.Item className="p-0">
          <Card.Header>
            {/* {console.log(episode)} */}
            <div className="d-flex align-items-baseline flex-wrap">
              <h5 className="me-3">{show && show.name}</h5>
              <p className="mb-1" style={{ color: "gray" }}>
                {episode &&
                  `s${episode.season}e${episode.number} - ${episode.name}`}
              </p>
            </div>

            <p className="font-italic font-weight-normal mb-1">{entry.date}</p>
          </Card.Header>
          <Card.Body>
            <p>{entry.text}</p>
          </Card.Body>
        </ListGroup.Item>
      )}
    </div>
  );
}
