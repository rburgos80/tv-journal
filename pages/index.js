import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Journal from "../components/Journal";
import JournalCard from "../components/JournalCard";
import axios from "axios";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

export default function Home() {
  const { data: session, status } = useSession();
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentShowId, setCurrentShowId] = useState(null);
  const [currentJournal, setCurrentJournal] = useState({});

  const getUserJournals = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/journals/");
      setJournals(res.data);
      setLoading(false);
    } catch (err) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    session && getUserJournals();
  }, [session]);

  useEffect(() => {
    if (journals && journals.length > 0) setCurrentShowId(journals[0].show.id);
  }, [journals]);

  useEffect(() => {
    setCurrentJournal(
      journals.find((journal) => journal.show.id === currentShowId)
    );
  }, [currentShowId]);

  return (
    <>
      <Head>
        <title>TV Journal</title>
        <meta
          name="description"
          content="Keep a journal of your viewing experiences"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        {status === "authenticated" ? (
          !loading && (
            <>
              {journals.length > 0 ? (
                <Row>
                  <Col md={4}>
                    <h3>Select Journal</h3>
                    <ListGroup>
                      {journals.map((journal) => (
                        <ListGroup.Item
                          action
                          key={journal.show.id}
                          eventKey={journal.show.id}
                          onClick={() => setCurrentShowId(journal.show.id)}
                          active={journal.show.id === currentShowId}
                        >
                          <JournalCard journal={journal} />
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Col>
                  <Col md={8}>
                    {currentJournal?.show && (
                      <>
                        <div className="mb-2">
                          <h3 className="d-inline me-2">
                            {currentJournal.show.name}
                          </h3>
                          <Link href={`show/${currentJournal.show.id}`}>
                            Go to details page
                          </Link>
                          <br />
                        </div>
                        <Journal
                          key={currentJournal.show.id}
                          show={currentJournal.show}
                        />
                      </>
                    )}
                  </Col>
                </Row>
              ) : (
                <div className="d-flex flex-column align-items-center">
                  <h1>Welcome to TV Journal!</h1>
                  <p>
                    Start by searching for a show and making a journal entry.
                    You will be able to see it here afterwards.
                  </p>
                </div>
              )}
            </>
          )
        ) : status === "unauthenticated" ? (
          <div className=" mt-2 d-flex flex-column align-items-center">
            <h1>TV Journal</h1>
            <h6>Sign in to keep a journal on your favorite shows.</h6>
            <Button
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
              href={"api/auth/signin"}
            >
              Sign In
            </Button>
          </div>
        ) : null}
      </section>
    </>
  );
}
