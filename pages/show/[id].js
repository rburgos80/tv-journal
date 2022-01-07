import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import EpisodeCard from "../../components/EpisodeCard";

const ShowPage = () => {
  const [showData, setShowData] = useState({});
  const router = useRouter();

  async function getData() {
    try {
      const res = await axios.get(
        `https://api.tvmaze.com/shows/${router.query.id}?embed=episodes`
      );
      const data = res.data;
      setShowData(data);
    } catch {
      throw new Error(
        `Show data api fetch failed. ID query: ${router.query.id}`
      );
    }
  }

  useEffect(() => {
    router.query.id && getData();
  }, [router.query.id]);

  return (
    <>
      <Head>
        <title>{`${showData.name} - TVbase`}</title>
      </Head>
      {console.log(showData)}

      {/* <h1>{showData.name}</h1> */}
      {showData._embedded &&
        showData._embedded.episodes.map((episode) => (
          <EpisodeCard episode={episode} key={episode.id} />
        ))}
      {/* 
      <div className="container" className={styles.container}>
        <h1 className={styles.title}>{showData.name}</h1>
        <div className={styles.showInfo}>
          <div className={styles.imgContainer}>
            {showData.image ? (
              <Image
                className={styles.image}
                src={showData.image.medium}
                width={210}
                height={295}
                alt="TV Show poster"
              />
            ) : (
              <Image
                src={noSignal}
                width={208}
                height={292}
                className={styles.image}
                alt="TV Show Poster"
              />
            )}
          </div>
          <div className={styles.info}>
            <p className={styles.rating}>
              <FontAwesomeIcon icon={faStar} />{" "}
              {showData.rating && showData.rating.average
                ? showData.rating.average
                : "?"}{" "}
              <span className={styles.ratingMax}>/10</span>
            </p>
            <p className={styles.years}>
              {showData.premiered ? showData.premiered.slice(0, 4) : "?"}-
              {showData.ended && showData.ended.slice(0, 4)}
            </p>
          </div>
          <div
            className={styles.summary}
            dangerouslySetInnerHTML={{ __html: showData.summary }}
          />
        </div>
        <div className="episodeGrid">
          {showData.id && <EpisodeList showId={showData.id} />}
        </div>
      </div> */}
    </>
  );
};

export default ShowPage;
