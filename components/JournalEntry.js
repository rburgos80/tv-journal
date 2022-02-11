import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";

export default function JournalEntry({ entry, show, episode }) {
  return (
    <>
      {entry && (
        <ListGroup.Item className="">
          <div className="fw-bold">{entry.date}</div>
          {!episode && entry.episode && (
            <div className="text-muted">
              {`s${entry.episode.season}e${entry.episode.number} - ${entry.episode.name}`}
            </div>
          )}
          <Card.Body>
            <span
              style={{ whiteSpace: "pre-wrap" }}
              className="mb-0"
            >{`${entry.text}`}</span>
          </Card.Body>
        </ListGroup.Item>
      )}
    </>
  );
}
