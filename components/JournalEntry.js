import { Card } from "react-bootstrap";

export default function JournalEntry({ entry }) {
  return (
    <div>
      {entry && (
        <>
          <h3>{entry.date}</h3>
          <p>{entry.text}</p>
        </>
      )}
    </div>
  );
}
