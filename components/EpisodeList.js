import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import EpisodeCard from "./EpisodeCard.js";

const EpisodeList = ({ show }) => {
  const [episodes, setEpisodes] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [seasonIndex, setSeasonIndex] = useState(null);
  const { status } = useSession();
  const recentRef = useRef({});

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
      const epData = epRes.data;

      setEpisodes(epData.filter((ep) => ep.type === "regular"));
    } catch (err) {
      throw new Error(
        `${err} \n Episode data api fetch failed: season: ${seasons[seasonIndex].id}`
      );
    }
  };

  useEffect(() => {
    recentRef.current = JSON.parse(localStorage.getItem("recents")).find(
      (recent) => recent.showId === show.id
    );
    if (show && show.id) {
      fetchSeasonData();
    }
  }, []);

  useEffect(() => {
    if (seasons && seasons.length > 0) {
      if (status !== "unauthenticated" && recentRef.current?.season) {
        const recentSeasonIndex = seasons.findIndex(
          (season) => season.number === recentRef.current.season
        );
        setSeasonIndex(recentSeasonIndex);
      } else {
        setSeasonIndex(0);
      }
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
        <Dropdown onSelect={(e) => setSeasonIndex(parseInt(e))} className="m-4">
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
            <EpisodeCard show={show} episode={episode} key={episode.id} />
          ))}
          <p className="top-of-list pt-3 text-center border-top">
            <Nav.Link href="#season-toggle">Top of list</Nav.Link>
          </p>
        </>
      ) : null}
    </Card>
  );
};

export default EpisodeList;
