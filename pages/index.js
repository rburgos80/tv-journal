import Head from "next/head";
import Image from "next/image";
import JournalEntry from "../components/JournalEntry";
import Navbar from "../components/Navbars";
import Showcard from "../components/Showcard";

export default function Home() {
  const show = {
    name: "The Sopranos",
    image:
      "https://static.tvmaze.com/uploads/images/medium_portrait/4/11341.jpg",
  };

  return (
    <div>
      <Head>
        <title>TV Journal</title>
        <meta
          name="description"
          content="Keep a journal of your TV show viewing experiences"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Showcard show={show} />
      <JournalEntry show={show} openDefault />
    </div>
  );
}
