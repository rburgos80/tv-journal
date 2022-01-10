import axios from "axios";
import React, { useEffect, useState } from "react";
import { Accordion, Container } from "react-bootstrap";
import EpisodeCard from "../components/EpisodeCard";

const test = () => {
  const [episodeData, setEpisodeData] = useState({});

  useEffect(() => {
    fetchEpisodeData();
  }, []);

  const fetchEpisodeData = async () => {
    try {
      const res = await axios.get("https://api.tvmaze.com/episodes/2");
      setEpisodeData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <EpisodeCard episode={episodeData} />
    </Container>
  );
};

export default test;
