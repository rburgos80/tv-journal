import Link from "next/link";
import { useState, useContext, useRef } from "react";
import userContext from "../context/userContext";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Container } from "react-bootstrap";

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
          <Container className="justify-content-end">
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
        </Container>
      </Navbar>
    </header>
  );
};

export default Navbars;
