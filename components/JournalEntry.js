import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";

export default function JournalEntry({
  entry,
  show,
  episode,
  handleEdit,
  handleDelete,
}) {
  const [editText, setEditText] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenEdit = () => {
    setEditText(entry.text);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setTimeout(() => setEditText(""), 150);
    setOpenEdit(false);
  };

  //Custom Toggle for dropdown
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      style={{ color: "black" }}
    >
      {children}
    </a>
  ));

  return (
    <>
      {entry && (
        <ListGroup.Item className="position-relative">
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
            <Dropdown className="entry-edit">
              <Dropdown.Toggle as={CustomToggle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-three-dots-vertical"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                </svg>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleOpenEdit}>Edit</Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setOpenDelete(true)}
                  className="text-danger"
                >
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Card.Body>
          <Modal centered show={openEdit} onHide={handleCloseEdit}>
            <Modal.Body>
              <Form
                onSubmit={(e) => {
                  editText
                    ? handleEdit(e, entry._id, editText)
                    : handleDelete(e, entry._id);
                  handleCloseEdit();
                }}
              >
                <Form.Group controlId="new-entry">
                  <Form.Control
                    as="textarea"
                    placeholder="Leave blank to delete entry"
                    rows={6}
                    value={editText}
                    onChange={(e) => {
                      setEditText(e.target.value);
                    }}
                    maxLength={4096}
                    className="mb-2"
                  />
                </Form.Group>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseEdit}>
                    Cancel
                  </Button>
                  {editText ? (
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
          <Modal centered show={openDelete} onHide={() => setOpenDelete(false)}>
            <Modal.Body>Are you sure you want to delete this entry?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setOpenDelete(false)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={(e) => {
                  handleDelete(e, entry._id);
                  setOpenDelete(false);
                }}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </ListGroup.Item>
      )}
    </>
  );
}
