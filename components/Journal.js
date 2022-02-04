import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import JournalEntry from "./JournalEntry";

const Journal = ({ episode, show }) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newEntryText, setNewEntryText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEntry = episode
      ? {
          date: new Date().toDateString(),
          text: newEntryText,
          showId: show.id,
          showName: show.name,
          episodeId: episode.id,
          episodeSeason: episode.season,
          episodeNumber: episode.number,
          episodeName: episode.name,
        }
      : {
          date: new Date().toDateString(),
          text: newEntryText,
          showId: show.id,
          showName: show.name,
        };
    const res = await axios.post("/api/entries/", newEntry);
    setEntries((entries) => [...entries, newEntry]);
    setNewEntryText("");
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = null;
        if (episode) {
          res = await axios.get(`/api/entries/episode/${episode.id}`);
        } else if (show) {
          res = await axios.get(`/api/entries/show/${show.id}`);
        } else {
          res = await axios.get("/api/entries");
        }
        setEntries(res.data);
      } catch (err) {
        throw new Error(`Journal data fetch failed. ${err}`);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

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
            maxLength={4096}
            className="mb-2"
          />
        </Form.Group>
        <Button type="submit">Compose</Button>
      </Form>
      {loading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status" className="p-absolute">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
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
