import { useState } from "react";
import { Button, Card, Container, Form, ListGroup } from "react-bootstrap";
import JournalEntry from "./JournalEntry";

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
    <Card className="p-3 border-0">
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
            maxLength={10000}
            className="mb-2"
          />
        </Form.Group>
        <Button type="submit">Compose</Button>
      </Form>
      {entries.length ? (
        <ListGroup>
          {entries
            .slice()
            .reverse()
            .map((entry, index) => (
              <JournalEntry entry={entry} key={index} />
            ))}
        </ListGroup>
      ) : null}
    </Card>
  );
};

export default Journal;
