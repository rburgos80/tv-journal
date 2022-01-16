import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";

export default function JournalEntry({ entry, show, episode }) {
  return (
    <div>
      {entry && (
        <ListGroup.Item className="p-0">
          <Card.Header>
            {/* {console.log(episode)} */}
            <div className="d-flex align-items-baseline flex-wrap">
              <h5 className="me-3">{show && show.name}</h5>
              <p className="mb-1 me-2">
                {episode &&
                  `s${episode.season}e${episode.number} - ${episode.name}`}
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
    </div>
  );
}
