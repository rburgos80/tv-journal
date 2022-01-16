import { Card, ListGroup } from "react-bootstrap";

export default function JournalEntry({ entry }) {
  return (
    <div>
      {entry && (
        <ListGroup.Item>
          <h6 style={{ color: "gray" }}>{entry.date}</h6>
          <p>{entry.text}</p>
        </ListGroup.Item>
      )}
    </div>
  );
}
