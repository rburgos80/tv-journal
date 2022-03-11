import Head from "next/head";
import Card from "react-bootstrap/Card";

const about = () => {
  return (
    <>
      <Head>
        <title>About - TV Journal</title>
      </Head>
      <Card className="p-3 shadow">
        <h4>About TV Journal</h4>
        <p>
          TV Journal is a tool that lets users write down their thoughts during
          their viewings of shows in order for them to later self-reflect on
          their viewing experiences. It can also be used as a way for them to
          note down smaller things, such as possible foreshadowing and subtle
          storyline events.
        </p>
        <p>
          All information on shows is retrieved from the{" "}
          <a href="https://tvmaze.com" target="_blank" rel="noreferrer">
            TVmaze
          </a>{" "}
          API.
        </p>
        <h5>Github Repository</h5>
        <p>
          <a
            href="https://github.com/rburgos80/tv-journal"
            target="_blank"
            rel="noreferrer"
          >
            github.com/rburgos80/tv-journal
          </a>
        </p>
        <h5>Stack</h5>
        <ul>
          <li>React</li>
          <li>Next.js</li>
          <li>React-Bootstrap</li>
          <li>MongoDB</li>
          <li>NextAuth.js</li>
          <li>Node</li>
        </ul>
        <h5>Development Process</h5>
        <p>
          I came up with the idea for this website after building a project
          similar to IMDB with the focus on looking up shows to see their
          ratings per episode. It was entertaining to see the general consensus
          on shows I was watching, but I developed a bad habit of just waiting
          for episodes with particularly high ratings and not paying much
          attention to other episodes, reducing my overall enjoyment of shows as
          a whole.
        </p>
        <p>
          I wanted to create something that would encourage deeper engagement
          with shows, so I gave this previous project a more personal spin and
          made it all about the user&apos;s opinions. As the name suggests, I
          created this website to be digital journal with an emphasis on
          simplicity and ease of use.
        </p>
        <p>
          This entire development was a huge learning process for me as I had to
          pick up numerous technologies to make this possible. My biggest
          roadblock was figuring out a database design that works with the
          design of this website since I have more experience working with the
          frontend rather than the backend. In the end, the most important thing
          I took away from this process was that I have to recognize my limits
          as a web developer and understand that nothing is perfect, so I
          shouldn&apos;t obsess over how I can completely optimize everything.
        </p>
        <h5>Contact</h5>
        <p>
          If you encounter a bug or have a suggestion to make this website
          better, feel free to contact me at:{" "}
          <strong>rburgos80@gmail.com</strong>
        </p>
      </Card>
    </>
  );
};

export default about;
