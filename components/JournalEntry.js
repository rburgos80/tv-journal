import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";

export default function JournalEntry({ entry, show, episode }) {
  return (
    <>
      {entry && (
        <ListGroup.Item className="p-0">
          <Card.Header>
            <div className="d-flex align-items-baseline flex-wrap">
              {!show && <h5 className="me-3">{entry.showName}</h5>}
              <p className="mb-1 me-2">
                {!episode &&
                  entry.episodeId &&
                  `s${entry.episodeSeason}e${entry.episodeNumber} - ${entry.episodeName}`}
              </p>
              <p className="font-italic font-weight-normal mb-1 ms-auto">
                {entry.date}
              </p>
            </div>
          </Card.Header>
          <Card.Body>
            <p className="mb-0">{entry.text}</p>
          </Card.Body>
        </ListGroup.Item>
      )}
    </>
  );
}
