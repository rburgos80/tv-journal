import Link from "next/link";
import { useState, useContext, useRef } from "react";
import userContext from "../context/userContext";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Navbars = () => {
  const userData = useContext(userContext);
  const [open, setOpen] = useState(false);

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
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link href="/">
            <Navbar.Brand className="mx-3" style={{ cursor: "pointer" }}>
              TV Journal
            </Navbar.Brand>
          </Link>
          <Row
            className="justify-content-space-between"
            style={{ width: "60%" }}
          >
            <Form
              style={{ display: "flex" }}
              onSubmit={(e) => e.preventDefault()}
            >
              <Col xs={9}>
                <Form.Control
                  type="text"
                  variant="dark"
                  placeholder="Search"
                  className="rounded-0"
                />
              </Col>
              <Col>
                <Button
                  type="submit"
                  variant="outline-light"
                  className="rounded-0"
                >
                  Search
                </Button>
              </Col>
            </Form>
          </Row>
          <Nav activeKey={null} className="justify-content-end">
            <Nav.Item>
              <Link href="/login" passHref>
                <Nav.Link>Login/Register</Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href="/about" passHref>
                <Nav.Link>About</Nav.Link>
              </Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Navbars;
