import axios from "axios";
import React, { useEffect, useState } from "react";
import EpisodeCard from "../components/EpisodeCard";

const test = () => {
  const [episodeData, setEpisodeData] = useState({});

  useEffect(() => {
    fetchEpisodeData();
  }, []);

  const fetchEpisodeData = async () => {
    try {
      const res = await axios.get("https://api.tvmaze.com/episodes/22");
      setEpisodeData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <EpisodeCard episode={episodeData} />
    </div>
  );
};

export default test;
