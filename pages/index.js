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
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

// Home page with user's journals if authenticated, welcome screen if unauthenticated
export default function Home() {
  const { data: session, status } = useSession();
  const [journals, setJournals] = useState([]);
  const [currentShowId, setCurrentShowId] = useState(null);
  const [currentJournal, setCurrentJournal] = useState({});
  const [showJournalList, setShowJournalList] = useState(false);
  const [windowWidth, setWindowWidth] = useState(null);
  const [loading, setLoading] = useState(false);

  // Window resize event listener used for responsive design
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load user's journals
  useEffect(() => {
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

    status === "authenticated" && getUserJournals();
  }, [status]);

  //Set the active journal when journals are loaded
  useEffect(() => {
    if (journals && journals.length > 0) {
      setCurrentShowId(journals[0].show.id);
    }
  }, [journals]);

  useEffect(() => {
    setCurrentJournal(
      journals.find((journal) => journal.show.id === currentShowId)
    );
  }, [currentShowId]);

  //Subcomponent listing the user's journals
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
            {journal.show.image ? (
              <Image
                src={journal.show.image}
                alt={`${journal.show.name} poster`}
                width={53}
                height={74}
                layout="intrinsic"
              />
            ) : (
              <div className="py-4" />
            )}
            <h4 className="fs-5 ms-2 text-truncate">{journal.show.name}</h4>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );

  return (
    <>
      <Head>
        <title>TV Journal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={windowWidth < 768 ? "mx-3" : undefined}>
        {status === "authenticated" ? (
          !loading && (
            <>
              {journals.length > 0 ? (
                <Row>
                  {windowWidth >= 768 ? (
                    <Col md={4}>
                      {/* Desktop layout */}
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
                      {/* Mobile layout */}
                      <Col>
                        <Button
                          variant="primary"
                          onClick={() => setShowJournalList(true)}
                          className=" w-100 my-4 mt-sm-0"
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
                    {/* Displays Journal component for selected journal */}
                    {currentJournal?.show && (
                      <div className="pb-4">
                        <div className="mb-2 d-flex align-items-center flex-wrap">
                          <h3 className="d-inline mb-0 me-auto">
                            {currentJournal.show.name}
                          </h3>
                          <Link
                            href={`show/${currentJournal.show.id}`}
                            passHref
                          >
                            <Button variant="outline-primary" size="sm">
                              Go to details page
                            </Button>
                          </Link>
                          <br />
                        </div>
                        <Journal
                          key={currentJournal.show.id}
                          show={currentJournal.show}
                        />
                      </div>
                    )}
                  </Col>
                </Row>
              ) : (
                <Container
                  fluid="sm"
                  className="d-flex justify-content-center"
                  style={{ marginTop: "5rem" }}
                >
                  {/* Displays when user has no journals */}
                  <Card className="d-flex flex-direction-column align-items-center p-4 p-md-5 my-4 shadow-sm text-center">
                    <h2 className="mb-4">Welcome to TV Journal!</h2>
                    <p className="fs-5">
                      Start by searching for a show in the menu bar and creating
                      a journal entry.
                    </p>
                    <p className="fs-5">
                      All of your activity will appear on this page afterwards.
                    </p>
                  </Card>
                </Container>
              )}
            </>
          )
        ) : status === "unauthenticated" ? (
          <div
            className="d-flex flex-column align-items-center text-center"
            style={{ marginTop: "5rem" }}
          >
            {/* Displays when user is unauthenticated */}
            <h1 className="fs-1">TV Journal</h1>
            <p className="fs-4 mb-5">
              Keep a journal on your viewing experiences.
            </p>
            <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
                href={"api/auth/signin"}
                className="px-4 fs-4 font-weight-bold shadow"
              >
                Sign In
              </Button>
              <Link href={"about"} passHref>
                <Button
                  variant="outline-secondary"
                  className="px-4 fs-4 font-weight-bold shadow"
                >
                  About This Website
                </Button>
              </Link>
            </div>
          </div>
        ) : null}
      </main>
    </>
  );
}
