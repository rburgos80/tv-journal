import Link from "next/link";
import { useState, useContext, useRef } from "react";
import userContext from "../context/userContext";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

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
      <Navbar bg="light" variant="primary">
        <Navbar.Brand as={Link} variant="primary" href="/">
          TVjournal
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link as={Link} href="/login">
            Login / Register
          </Nav.Link>
          <Nav.Link as={Link} href="/login">
            Login
          </Nav.Link>
        </Nav>
      </Navbar>
    </header>
  );
};

export default Navbars;
