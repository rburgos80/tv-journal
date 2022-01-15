import axios from "axios";
import { useState, useEffect } from "react";
import { Card, Container, Dropdown, ListGroup } from "react-bootstrap";
import EpisodeCard from "./EpisodeCard.js";

const EpisodeList = ({ showId }) => {
  const [episodes, setEpisodes] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [seasonIndex, setSeasonIndex] = useState({});

  const fetchSeasonData = async () => {
    try {
      const seasonRes = await axios.get(
        `https://api.tvmaze.com/shows/${showId}/seasons`
      );
      const seasonData = seasonRes.data;
      setSeasons(seasonData);
    } catch (err) {
      throw new Error(
        `${err}\nSeason data api fetch failed: showID = ${showId}`
      );
    }
  };

  const fetchEpisodeData = async () => {
    try {
      const epRes = await axios.get(
        `https://api.tvmaze.com/seasons/${seasons[seasonIndex].id}/episodes`
      );
      const epData = epRes.data;

      setEpisodes(epData.filter((ep) => ep.type === "regular"));
    } catch (err) {
      throw new Error(
        `${err} \n Episode data api fetch failed: season: ${seasons[seasonIndex].id}`
      );
    }
  };

  useEffect(() => {
    if (showId) {
      fetchSeasonData();
    }
  }, []);

  useEffect(() => {
    if (seasons.length > 0) {
      setSeasonIndex(0);
    }
  }, [seasons]);

  useEffect(() => {
    if (seasons[seasonIndex]) {
      fetchEpisodeData();
    }
  }, [seasonIndex]);

  return (
    <Card className="border-0">
      {seasons[seasonIndex] && (
        <Dropdown onSelect={(e) => setSeasonIndex(e)} className="m-4">
          <Dropdown.Toggle variant="secondary" id="season-toggle">
            Season {seasons[seasonIndex].number}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {seasons.map((season, index) => (
              <Dropdown.Item eventKey={index} key={season.id}>
                Season {season.number}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      )}
      {seasonIndex != undefined ? (
        <>
          {episodes.map((episode) => (
            <EpisodeCard episode={episode} key={episode.id} />
          ))}
          <p className="top-of-list mt-3 text-center">
            <a href="#season-toggle">Top of list</a>
          </p>
        </>
      ) : null}
    </Card>
  );
};

export default EpisodeList;
