import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";

export default function JournalEntry({
  entry,
  show,
  episode,
  handleOpenEdit,
  handleOpenDelete,
}) {
  //Custom Toggle for dropdown
  const CustomToggle = React.forwardRef(function custom(
    { children, onClick },
    ref
  ) {
    return (
      <a
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
        style={{ color: "black", cursor: "pointer" }}
      >
        {children}
      </a>
    );
  });

  return (
    <>
      {entry && (
        <ListGroup.Item className="position-relative">
          {/* Entry information and text */}
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

            {/* Dropdown for edit and delete modals */}
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
                <Dropdown.Item
                  onClick={() => handleOpenEdit(entry._id, entry.text)}
                >
                  Edit
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleOpenDelete(entry._id)}
                  className="text-danger"
                >
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Card.Body>
        </ListGroup.Item>
      )}
    </>
  );
}
