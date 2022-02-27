const about = () => {
  return (
    <section className="p-2">
      <h3>TV Journal</h3>
      <p>
        A place designed for users to document their thoughts on shows as they
        watch them.
      </p>
      <p>
        All information on shows is retrieved from the{" "}
        <a href="https://tvmaze.com" target="_blank">
          TVmaze
        </a>{" "}
        API.
      </p>
      <h5>Github Repository</h5>
      <p>
        <a href="https://github.com/rburgos80/tv-journal" target="_blank">
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
        similar to IMDB with the focus on looking up shows to see their ratings
        per episode. It was entertaining to see the general consensus on shows
        I'm watching, but I developed a bad habit of just waiting for episodes
        with particularly high ratings and not paying much attention to other
        episodes, reducing my overall enjoyment of shows as a whole.
      </p>
      <p>
        I decided to give this project a more personal spin and make it all
        about the user's opinion. There aren't any outside opinions to possibly
        influence what you would think of a particular show or episode as there
        are already plenty of websites offering individual reviews. I also
        decided to forgo adding a rating functionality as it wouldn't capture an
        opinion as well as text.
      </p>
      <p>
        This entire development was a huge learning process for me as I had to
        learn numerous technologies to make this possible. My biggest roadblock
        was figuring out a database design that works with the design of this
        website since I have more experience working with the frontend rather
        than the backend. In the end, the most important thing I took away from
        this process was that I have to recognize my limits as a web developer
        and understand that nothing is perfect, so I shouldn't obsess over how I
        can completely optimize everything.
      </p>
      <h5>Contact</h5>
      <p>
        If you encounter a bug or have a suggestion to make this website better,
        feel free to contact me at: <strong>rburgos80@gmail.com</strong>
      </p>
    </section>
  );
};

export default about;
