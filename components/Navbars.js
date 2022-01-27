import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import userContext from "../context/userContext";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react"

const Navbars = () => {
  const router = useRouter();
  const userData = useContext(userContext);
  const [open, setOpen] = useState(false);
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

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/");
  };

  return (
    <header>
      <Navbar expand="md" bg="dark" variant="dark" className="mb-0 mb-sm-3">
        <Container>
          <Link href="/">
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
              <Nav.Item onClick={signIn}>
                <Nav.Link>Login/Register</Nav.Link>
              </Nav.Item>
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
