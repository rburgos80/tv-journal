import Head from "next/head";
import Container from "react-bootstrap/Container";
import ShowCard from "../components/ShowCard";

export default function Home() {
  const shows = [
    {
      name: "The Sopranos",
      image:
        "https://static.tvmaze.com/uploads/images/medium_portrait/4/11341.jpg",
      id: 527,
    },
    {
      name: "Mr. Robot",
      image:
        "https://static.tvmaze.com/uploads/images/medium_portrait/211/528026.jpg",
      id: 1871,
    },
    {
      name: "Breaking Bad",
      image:
        "https://static.tvmaze.com/uploads/images/medium_portrait/0/2400.jpg",
      id: 169,
    },
    {
      name: "Better Call Saul",
      image:
        "https://static.tvmaze.com/uploads/images/medium_portrait/235/587815.jpg",
      id: 618,
    },
    {
      name: "Attack On Titan",
      image:
        "https://static.tvmaze.com/uploads/images/medium_portrait/311/779751.jpg",
      id: 919,
    },
  ];

  return (
    <>
      <Head>
        <title>TV Journal</title>
        <meta
          name="description"
          content="Keep a journal of your TV show viewing experiences"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        {shows.map((show, index) => (
          <ShowCard show={show} key={index} />
        ))}
      </section>
    </>
  );
}
