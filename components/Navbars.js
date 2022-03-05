import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { NavDropdown } from "react-bootstrap";

const Navbars = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (router.query && router.query.q) {
      setSearchQuery(router.query.q);
    }
  }, [router.query]);

  function handleSearch(e) {
    e.preventDefault();
    router.push({
      pathname: `/results`,
      query: { q: searchQuery },
    });
  }

  return (
    <header>
      <Navbar expand="md" bg="dark" variant="dark" className="mb-0">
        <Container className="p-md-0">
          <Link href="/" passHref>
            <Navbar.Brand className="" style={{ cursor: "pointer" }}>
              TV Journal
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              activeKey={null}
              className="justify-content-end me-auto my-2 my-md-0"
            >
              {!session && (
                <Nav.Item>
                  <Nav.Link
                    onClick={(e) => {
                      e.preventDefault();
                      signIn();
                    }}
                    href={"api/auth/signin"}
                  >
                    Sign in
                  </Nav.Link>
                </Nav.Item>
              )}
              {session && (
                <>
                  <NavDropdown title="Account" style={{ zIndex: "1021" }}>
                    <NavDropdown.Header>
                      Signed in as: <strong>{session.user?.email}</strong>
                    </NavDropdown.Header>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={(e) => {
                        e.preventDefault();
                        signOut();
                      }}
                      href={"api/auth/signout"}
                    >
                      Signout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
              <Nav.Item>
                <Link href="/about" passHref>
                  <Nav.Link>About</Nav.Link>
                </Link>
              </Nav.Item>
            </Nav>
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                type="text"
                variant="dark"
                placeholder="Search for a show"
                className="rounded-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                required
              />
              <Button
                type="submit"
                variant="outline-light"
                className="rounded-0 pb-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                  aria-label="Search"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Navbars;
