import { Container } from "react-bootstrap";
import JournalEntry from "./JournalEntry";

//On mount, load all journal entries
//sort by last updated
//Infinite Scrolling

const Journal = ({ entries }) => {
  return (
    <Container>
      <h1>Your Journal</h1>
      {entries.length ? (
        entries.map((entry) => <JournalEntry show={entry} />)
      ) : (
        <h1>
          Your journal is empty. Search for a show to add to your journal.
        </h1>
      )}
    </Container>
  );
};

export default Journal;
