import axios from "axios";
import { useState, useEffect } from "react";
import Collapse from "react-bootstrap/Collapse";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";

const EpisodeSelect = ({ show, setTag }) => {
  const [open, setOpen] = useState(false);
  const [currentTag, setCurrentTag] = useState({
    id: null,
    season: null,
    number: null,
    name: "",
  });
  const [episodes, setEpisodes] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [seasonIndex, setSeasonIndex] = useState(null);

  useEffect(() => {
    if (open) {
      seasons.length === 0 && fetchSeasonData();
      currentTag?.id && setTag(currentTag);
    } else {
      setTag({
        id: null,
        season: null,
        number: null,
        name: "",
      });
    }
  }, [open]);

  const handleTag = (episodeId) => {
    if (!episodeId) {
      setCurrentTag({ id: null, season: null, number: null, name: "" });
      setTag({ id: null, season: null, number: null, name: "" });
      return;
    }
    const taggedEpisode = episodes.find((episode) => episode.id === episodeId);
    setCurrentTag({
      id: taggedEpisode.id,
      season: taggedEpisode.season,
      number: taggedEpisode.number,
      name: taggedEpisode.name,
    });
    setTag({
      id: taggedEpisode.id,
      season: taggedEpisode.season,
      number: taggedEpisode.number,
      name: taggedEpisode.name,
    });
  };

  const fetchSeasonData = async () => {
    try {
      const seasonRes = await axios.get(
        `https://api.tvmaze.com/shows/${show.id}/seasons`
      );
      const seasonData = seasonRes.data;
      setSeasons(seasonData);
    } catch (err) {
      throw new Error(
        `${err}\nSeason data api fetch failed: showID = ${show.id}`
      );
    }
  };

  const fetchEpisodeData = async () => {
    try {
      const epRes = await axios.get(
        `https://api.tvmaze.com/seasons/${seasons[seasonIndex].id}/episodes`
      );
      const epData = epRes.data.filter((ep) => ep.type === "regular");
      setEpisodes(epData);
    } catch (err) {
      throw new Error(
        `${err} \n Episode data api fetch failed: episode: ${episodes[0].id}`
      );
    }
  };

  useEffect(() => {
    if (seasons && seasons.length > 0) {
      setSeasonIndex(0);
    }
  }, [seasons]);

  useEffect(() => {
    if (seasons[seasonIndex]) {
      fetchEpisodeData();
    }
  }, [seasonIndex]);

  useEffect(() => {
    handleTag(episodes[0]?.id);
  }, [episodes]);

  return (
    <div>
      <br />
      <Form.Check
        type="switch"
        id="tag-switch"
        label="Tag Episode"
        value={open}
        onChange={() => setOpen((open) => !open)}
      />
      <Collapse in={open}>
        <div>
          <Dropdown
            onSelect={(e) => {
              setSeasonIndex(parseInt(e));
            }}
          >
            <Dropdown.Toggle variant="outline-secondary" id="tag-season-select">
              {seasons ? `Season ${seasons[seasonIndex]?.number}` : ""}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {seasons.map((season, index) => (
                <Dropdown.Item eventKey={index} key={season.id}>
                  Season {season.number}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown onSelect={(episodeId) => handleTag(parseInt(episodeId))}>
            <Dropdown.Toggle
              variant="outline-secondary"
              id="tag-episode-select"
            >
              {currentTag?.id
                ? `${currentTag.number}. ${currentTag.name}`
                : "Select Episode"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <div className="episode-select-menu">
                {episodes.map((episode) => (
                  <Dropdown.Item eventKey={episode.id} key={episode.id}>
                    {episode.number}. {episode.name}
                  </Dropdown.Item>
                ))}
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Collapse>
    </div>
  );
};

export default EpisodeSelect;
