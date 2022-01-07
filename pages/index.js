import Head from "next/head";
import Journal from "../components/Journal";

export default function Home() {
  const show = {
    name: "The Sopranos",
    image:
      "https://static.tvmaze.com/uploads/images/medium_portrait/4/11341.jpg",
    id: 23,
  };

  const entries = [show, show, show, show];

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
      <Journal entries={entries} />
    </>
  );
}
