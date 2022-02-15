import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import EpisodeCard from "../components/EpisodeCard";
import Journal from "../components/Journal";
import JournalCard from "../components/JournalCard";

const Test = () => {
  const [testData, setTestData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get("/api/journals/");
        setTestData(res.data);
      } catch (err) {
        throw new Error(err);
      }
    }
    getData();
  }, []);

  return (
    <Container>
      {testData.length > 0 &&
        testData.map((journal) => (
          <JournalCard key={journal._id} journal={journal} />
        ))}
    </Container>
  );
};

export default Test;
