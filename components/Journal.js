import { useState } from "react";
import { Button, Card, Container, Form, ListGroup } from "react-bootstrap";

const Journal = ({ data }) => {
  const [entries, setEntries] = useState(data);
  const [newEntryText, setNewEntryText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = { date: new Date().toDateString(), text: newEntryText };
    setEntries((entries) => [...entries, newEntry]);
    setNewEntryText("");
  };

  return (
    <Card className="p-3">
      <Form className="m-3" onSubmit={handleSubmit}>
        <Form.Group controlId="new-entry">
          <Form.Label>New Entry</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Write down your thoughts"
            rows={2}
            value={newEntryText}
            onChange={(e) => setNewEntryText(e.target.value)}
            required
            className="mb-2"
          />
        </Form.Group>
        <Button type="submit">Compose</Button>
      </Form>
      <ListGroup>
        {entries.length ? (
          entries
            .slice()
            .reverse()
            .map((entry, index) => (
              <ListGroup.Item key={index}>
                <h6 style={{ color: "gray" }}>{entry.date}</h6>
                <p>{entry.text} </p>
              </ListGroup.Item>
            ))
        ) : (
          <h3>
            Your journal is empty. Search for a show to add to your journal.
          </h3>
        )}
      </ListGroup>
    </Card>
  );
};

export default Journal;
