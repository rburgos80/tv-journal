import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Collapse from "react-bootstrap/Collapse";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";

// Component used in Journals that allows user to tag episode to entry
const EpisodeSelect = ({ show, setTag }) => {
  const [open, setOpen] = useState(false);
  const [temporaryTag, setTemporaryTag] = useState({
    id: null,
    season: null,
    number: null,
    name: "",
  });
  const [episodes, setEpisodes] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [seasonIndex, setSeasonIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const recentRef = useRef({});
  const newlyOpenedRef = useRef(true);

  //On component mount, fetch season data and get user's latest episode from localStorage
  useEffect(() => {
    let isMounted = true;
    recentRef.current = JSON.parse(localStorage.getItem("recents")).find(
      (recent) => recent.showId === show.id
    );
    const fetchSeasonData = async () => {
      try {
        const seasonRes = await axios.get(
          `https://api.tvmaze.com/shows/${show.id}/seasons`
        );
        const seasonData = seasonRes.data;
        if (isMounted) setSeasons(seasonData);
      } catch (err) {
        console.log(
          "The was a problem fetching season data or the request was cancelled."
        );
      }
    };
    fetchSeasonData();
    return () => {
      isMounted = false;
    };
  }, []);

  //Set selected season to localStorage data or the first season if that data is not available
  useEffect(() => {
    if (seasons.length > 0) {
      if (recentRef.current?.season) {
        const recentSeasonIndex = seasons.findIndex(
          (season) => season.number === recentRef.current.season
        );
        setSeasonIndex(recentSeasonIndex);
      } else {
        setSeasonIndex(0);
      }
    }
  }, [seasons]);

  //On season change, fetch episode data for that season
  useEffect(() => {
    let isMounted = true;

    const fetchEpisodeData = async () => {
      try {
        setLoading(true);
        const epRes = await axios.get(
          `https://api.tvmaze.com/seasons/${seasons[seasonIndex].id}/episodes`
        );
        const epData = epRes.data.filter((ep) => ep.type === "regular");
        if (isMounted) {
          setEpisodes(epData);
          setLoading(false);
        }
      } catch (err) {
        console.log(
          "The was a problem fetching episode data or the request was cancelled."
        );
      }
    };

    if (seasons[seasonIndex]) {
      fetchEpisodeData();
    }

    return () => {
      isMounted = false;
    };
  }, [seasonIndex]);

  //When episodes for a season are loaded, select and tag episode from localStorage or the first episode if that data is not available
  useEffect(() => {
    if (recentRef.current?.number) {
      const recentEpisode = episodes.find(
        (episode) => episode.number === recentRef.current.number
      );
      if (newlyOpenedRef.current && recentEpisode?.id) {
        handleTag(recentEpisode.id);
        newlyOpenedRef.current = false;
      } else {
        handleTag(episodes[0]?.id);
      }
    } else {
      handleTag(episodes[0]?.id);
    }
  }, [episodes]);

  //Tag or untag episode when episode select menu is toggled
  useEffect(() => {
    if (open) {
      temporaryTag?.id && setTag(temporaryTag);
    } else {
      setTag({
        id: null,
        season: null,
        number: null,
        name: "",
      });
    }
  }, [open]);

  //Tags episode to journal entry on episode select
  const handleTag = (episodeId) => {
    if (!episodeId) {
      setTemporaryTag({ id: null, season: null, number: null, name: "" });
      setTag({ id: null, season: null, number: null, name: "" });
      return;
    }
    const taggedEpisode = episodes.find((episode) => episode.id === episodeId);
    setTemporaryTag({
      id: taggedEpisode.id,
      season: taggedEpisode.season,
      number: taggedEpisode.number,
      name: taggedEpisode.name,
    });
    if (open) {
      setTag({
        id: taggedEpisode.id,
        season: taggedEpisode.season,
        number: taggedEpisode.number,
        name: taggedEpisode.name,
      });
    }
  };

  return (
    <div>
      <Form.Check
        type="switch"
        id="tag-switch"
        label="Tag Episode"
        value={open}
        onChange={() => setOpen((open) => !open)}
      />
      {/* Season Select */}
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
          {/* Episode Select */}
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
                  {temporaryTag?.id
                    ? `Episode ${temporaryTag.number}`
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
          {!loading && temporaryTag.id ? (
            <div className="text-muted">
              {`s${temporaryTag.season}e${temporaryTag.number} - ${temporaryTag.name}`}
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
