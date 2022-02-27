import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import axios from "axios";
import JournalEntry from "./JournalEntry";
import EpisodeSelect from "./EpisodeSelect";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";

const Journal = ({ episode, show }) => {
  const { data: session, status } = useSession();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newEntryText, setNewEntryText] = useState("");
  const [tag, setTag] = useState({
    id: null,
    season: null,
    number: null,
    name: "",
  });
  const [openEdit, setOpenEdit] = useState(false);
  const [editEntry, setEditEntry] = useState({ id: null, text: "" });
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteEntryId, setDeleteEntryId] = useState(null);

  //Get journal entries on component mount if user is signed in
  useEffect(() => {
    const fetchData = async () => {
      setEntries([]);
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

  //Submit journal entry
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
      : tag.id
      ? {
          date: new Date().toDateString(),
          text: newEntryText,
          show: {
            id: show.id,
            name: show.name,
            image: show.image?.medium,
          },
          episode: {
            id: tag.id,
            season: tag.season,
            number: tag.number,
            name: tag.name,
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

  //Control edit modal
  const handleOpenEdit = (entryId, entryText) => {
    setEditEntry({ id: entryId, text: entryText });
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setTimeout(() => setEditEntry({ id: null, text: "" }), 150);
    setOpenEdit(false);
  };

  //Edit journal entry
  const handleEdit = async (e, entryId, entryText) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`/api/entries/${entryId}`, {
        text: entryText,
      });
      const editEntryIndex = entries.findIndex((entry) => entry._id == entryId);
      setEntries((entries) => [
        ...entries.slice(0, editEntryIndex),
        { ...entries[editEntryIndex], text: res.data.text },
        ...entries.slice(editEntryIndex + 1),
      ]);
    } catch (err) {
      throw new Error(err);
    }
  };

  //Control delete modal
  const handleOpenDelete = (entryId) => {
    setDeleteEntryId(entryId);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setDeleteEntryId(null);
    setOpenDelete(false);
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
        <>
          <Card className="border-0">
            {episode && (
              <Card.Title className="text-center mb-0">
                Entries for this episode
              </Card.Title>
            )}

            {/* Entry submission form */}
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
                />
              </Form.Group>
              {!episode && <EpisodeSelect show={show} setTag={setTag} />}
              <div className="d-flex justify-content-end">
                {loading && <p className="me-auto mb-0">Loading entries...</p>}
                <Button variant="primary" type="submit">
                  Compose
                </Button>
              </div>
            </Form>

            {/* List of journal entries */}

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
                      handleOpenEdit={handleOpenEdit}
                      handleOpenDelete={handleOpenDelete}
                    />
                  ))}
              </ListGroup>
            ) : null}
          </Card>

          {/* Edit modal */}
          <Modal centered show={openEdit} onHide={handleCloseEdit}>
            <Modal.Body>
              <Form
                onSubmit={(e) => {
                  editEntry.text
                    ? handleEdit(e, editEntry.id, editEntry.text)
                    : handleDelete(e, editEntry.id);
                  handleCloseEdit();
                }}
              >
                <Form.Group controlId="new-entry">
                  <Form.Control
                    as="textarea"
                    placeholder="Leave blank to delete entry"
                    rows={6}
                    value={editEntry.text}
                    onChange={(e) => {
                      setEditEntry((editEntry) => ({
                        ...editEntry,
                        text: e.target.value,
                      }));
                    }}
                    maxLength={4096}
                    className="mb-2"
                  />
                </Form.Group>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseEdit}>
                    Cancel
                  </Button>
                  {editEntry.text ? (
                    <Button variant="primary" type="submit">
                      Save Changes
                    </Button>
                  ) : (
                    <Button variant="danger" type="submit">
                      Delete
                    </Button>
                  )}
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>

          {/* Delete modal */}
          <Modal centered show={openDelete} onHide={handleCloseDelete}>
            <Modal.Body>Are you sure you want to delete this entry?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDelete}>
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={(e) => {
                  handleDelete(e, deleteEntryId);
                  handleCloseDelete();
                }}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <Alert className="mx-2 my-0 p-4" variant="secondary">
          Please{" "}
          <Alert.Link
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
            href={"api/auth/signin"}
          >
            sign in
          </Alert.Link>{" "}
          to create a journal.
        </Alert>
      )}
    </>
  );
};

export default Journal;
