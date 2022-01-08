import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Dropdown, ListGroup } from "react-bootstrap";
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

      setEpisodes(epData);
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
    <Container>
      <h2 className="py-4">Episodes</h2>
      {/* <select
        name="seasons"
        id="seasons"
        className="season-select"
        onChange={(e) => setDisplaySeason(e.target.value)}
        {seasons.map((s) => (
          <option key={s.id} value={s.id}>
            Season {s.number}
          </option>
        ))}
      </select>
      > */}
      {seasons[seasonIndex] && (
        <Dropdown onSelect={(e) => setSeasonIndex(e)}>
          <Dropdown.Toggle variant="primary" id="season-toggle">
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
      <ListGroup>
        {seasonIndex != undefined
          ? episodes.map((episode) => (
              <ListGroup.Item key={episode.id}>
                <EpisodeCard episode={episode} />
              </ListGroup.Item>
            ))
          : null}
      </ListGroup>
      <a className="top-of-list" href="#season-toggle">
        Top of list
      </a>
    </Container>
  );
};

export default EpisodeList;
