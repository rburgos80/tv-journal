import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

import JournalEntry from "./JournalEntry";

const Journal = ({ data, episode, show }) => {
  const [entries, setEntries] = useState(data);
  const [newEntryText, setNewEntryText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      date: new Date().toDateString(),
      text: newEntryText,
      show: show,
      episode: episode,
    };
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
      {entries && entries.length ? (
        <ListGroup>
          {entries
            .slice()
            .reverse()
            .map((entry, index) => (
              <JournalEntry
                entry={entry}
                show={show}
                episode={episode}
                key={index}
              />
            ))}
        </ListGroup>
      ) : null}
    </Card>
  );
};

export default Journal;
