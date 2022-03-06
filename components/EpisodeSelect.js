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
  const [loading, setLoading] = useState(true);

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
      setLoading(true);
      const epRes = await axios.get(
        `https://api.tvmaze.com/seasons/${seasons[seasonIndex].id}/episodes`
      );
      const epData = epRes.data.filter((ep) => ep.type === "regular");
      setEpisodes(epData);
      setLoading(false);
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
      <Form.Check
        type="switch"
        id="tag-switch"
        label="Tag Episode"
        value={open}
        onChange={() => setOpen((open) => !open)}
      />
      <Collapse in={open}>
        <div className="mt-2">
          <Dropdown
            onSelect={(e) => {
              setSeasonIndex(parseInt(e));
            }}
            className="d-md-inline me-2 mb-2"
          >
            {seasons.length === 0 ? (
              <Dropdown.Toggle
                variant="outline-secondary"
                id="tag-season-select"
                disabled
              >
                Loading Seasons...
              </Dropdown.Toggle>
            ) : (
              <Dropdown.Toggle
                variant="outline-secondary"
                id="tag-season-select"
              >
                {`Season ${seasons[seasonIndex]?.number}`}
              </Dropdown.Toggle>
            )}
            <Dropdown.Menu>
              {seasons.map((season, index) => (
                <Dropdown.Item eventKey={index} key={season.id}>
                  Season {season.number}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          {seasonIndex !== null && (
            <Dropdown
              onSelect={(episodeId) => handleTag(parseInt(episodeId))}
              className="d-inline"
            >
              {episodes.length === 0 || loading ? (
                <Dropdown.Toggle
                  variant="outline-secondary"
                  id="tag-episode-select"
                  disabled
                >
                  Loading Episodes...
                </Dropdown.Toggle>
              ) : (
                <Dropdown.Toggle
                  variant="outline-secondary"
                  id="tag-episode-select"
                >
                  {currentTag?.id
                    ? `Episode ${currentTag.number}`
                    : "Select Episode"}
                </Dropdown.Toggle>
              )}
              <Dropdown.Menu style={{ zIndex: "1021" }}>
                <div className="episode-select-menu">
                  {episodes.map((episode) => (
                    <Dropdown.Item eventKey={episode.id} key={episode.id}>
                      {episode.number}. {episode.name}
                    </Dropdown.Item>
                  ))}
                </div>
              </Dropdown.Menu>
            </Dropdown>
          )}
          {!loading && currentTag.id ? (
            <div className="text-muted">
              {`s${currentTag.season}e${currentTag.number} - ${currentTag.name}`}
            </div>
          ) : (
            <div className="text-muted">Loading...</div>
          )}
        </div>
      </Collapse>
    </div>
  );
};

export default EpisodeSelect;
