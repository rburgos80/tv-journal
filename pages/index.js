import Head from "next/head";
import Container from "react-bootstrap/Container";
import ShowCard from "../components/ShowCard.js";

export default function Home() {
  const show = {
    name: "The Sopranos",
    image:
      "https://static.tvmaze.com/uploads/images/medium_portrait/4/11341.jpg",
    id: 527,
  };

  const shows = [show, show, show, show];

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
      <Container>
        {shows.map((show, index) => (
          <ShowCard show={show} key={index} />
        ))}
      </Container>
    </>
  );
}
