import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import JournalEntry from "./JournalEntry";
import Alert from "react-bootstrap/Alert";

const Journal = ({ episode, show }) => {
  const { data: session, status } = useSession();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newEntryText, setNewEntryText] = useState("");

  //Get journal entries on component mount if user is signed in
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
    session && fetchData();
  }, [show]);

  //Post journal entry
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEntry = episode
      ? {
          date: new Date().toDateString(),
          text: newEntryText,
          show: {
            id: show.id,
            name: show.name,
            image: show.image?.medium,
          },
          episode: {
            id: episode.id,
            season: episode.season,
            number: episode.number,
            name: episode.name,
          },
        }
      : {
          date: new Date().toDateString(),
          text: newEntryText,
          show: {
            id: show.id,
            name: show.name,
            image: show.image?.medium,
          },
        };
    const res = await axios.post("/api/entries/", newEntry);
    setEntries((entries) => [...entries, res.data]);
    setNewEntryText("");
  };

  //Patch journal entry
  const handleEdit = async (e, entryId, text) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`/api/entries/${entryId}`, { text });
      const editedEntryIndex = entries.findIndex(
        (entry) => entry._id == entryId
      );
      setEntries((entries) => [
        ...entries.slice(0, editedEntryIndex),
        { ...entries[editedEntryIndex], text: res.data.text },
        ...entries.slice(editedEntryIndex + 1),
      ]);
    } catch (err) {
      throw new Error(err);
    }
  };

  //Delete journal entry
  const handleDelete = async (e, entryId) => {
    e.preventDefault();
    try {
      await axios.delete(`/api/entries/${entryId}`);
      setEntries((entries) => entries.filter((entry) => entry._id != entryId));
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <>
      {session ? (
        <Card className="border-0">
          {episode && (
            <Card.Title className="text-center mb-0">
              Entries for this episode
            </Card.Title>
          )}
          <Form className="m-3" onSubmit={handleSubmit}>
            <Form.Group controlId="new-entry">
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
            <Button variant="primary" type="submit">
              Compose
            </Button>
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
                .map((entry) => (
                  <JournalEntry
                    entry={entry}
                    show={show}
                    episode={episode}
                    key={entry._id}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                ))}
            </ListGroup>
          ) : null}
        </Card>
      ) : (
        <Alert className="mx-2 my-0 p-4" variant="secondary">
          Please sign in to create a journal.
        </Alert>
      )}
    </>
  );
};

export default Journal;
