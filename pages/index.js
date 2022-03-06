import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Journal from "../components/Journal";
import axios from "axios";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "next/image";

export default function Home() {
  const { data: session, status } = useSession();
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentShowId, setCurrentShowId] = useState(null);
  const [currentJournal, setCurrentJournal] = useState({});
  const [showJournalList, setShowJournalList] = useState(false);
  const [windowWidth, setWindowWidth] = useState(null);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const journalList = (
    <ListGroup
      className={`${windowWidth < 768 ? "rounded-0 overflow-auto" : undefined}`}
    >
      {journals.map((journal) => (
        <ListGroup.Item
          action
          key={journal.show.id}
          eventKey={journal.show.id}
          onClick={() => {
            setCurrentShowId(journal.show.id);
            setShowJournalList(false);
          }}
          active={journal.show.id === currentShowId}
        >
          <div className="d-flex align-items-center">
            <Image
              src={journal.show.image}
              alt={`${journal.show.name} poster`}
              width={53}
              height={74}
              layout="intrinsic"
            />
            <h5 className="ms-2 text-truncate">{journal.show.name}</h5>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );

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
      <section className={windowWidth < 768 ? "mx-3" : undefined}>
        {status === "authenticated" ? (
          !loading && (
            <>
              {journals.length > 0 ? (
                <Row>
                  {windowWidth >= 768 ? (
                    <Col md={4}>
                      <h3 className="sticky-top">Select Journal</h3>
                      <div
                        className="sticky-top overflow-auto"
                        style={{ top: "2.5rem", maxHeight: "85vh" }}
                      >
                        {journalList}
                      </div>
                    </Col>
                  ) : (
                    <>
                      <Col>
                        <Button
                          variant="primary"
                          onClick={() => setShowJournalList(true)}
                          className=" w-100 my-4"
                        >
                          Select Journal
                        </Button>
                      </Col>
                      <Offcanvas
                        show={showJournalList}
                        onHide={() => setShowJournalList(false)}
                      >
                        <div className="d-flex justify-content-between align-items-baseline">
                          <h5 className="ms-2 mb-0">Your Journals</h5>
                          <CloseButton
                            className="m-2"
                            aria-label="Hide"
                            onClick={() => setShowJournalList(false)}
                          />
                        </div>
                        {journalList}
                      </Offcanvas>
                    </>
                  )}
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
