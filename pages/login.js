import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const login = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    console.log(e);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <>
      <Card className="p-4">
        <h4 className="text-center mb-4">
          Login to keep a journal on your favorite shows
        </h4>
        <Row xs={8} className="justify-content-evenly">
          <Col xs={10} sm={10} md={4}>
            <Card.Title>Login</Card.Title>
            <Form
              autoComplete="off"
              className="mb-4"
              onSubmit={(e) => handleLogin(e)}
            >
              <FloatingLabel
                controlId="username"
                label="Username"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="Username" required />
              </FloatingLabel>

              <FloatingLabel
                controlId="password"
                label="Password"
                className="mb-3"
              >
                <Form.Control type="password" placeholder="Password" required />
              </FloatingLabel>

              <Button variant="outline-primary" type="submit">
                Login
              </Button>
            </Form>
          </Col>
          <Col xs={10} sm={10} md={4}>
            <Card.Title>Create your account</Card.Title>
            <Form autoComplete="off" onSubmit={(e) => handleRegister(e)}>
              <FloatingLabel
                controlId="registerUsername"
                label="Username"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="Username" required />
              </FloatingLabel>

              <FloatingLabel
                controlId="registerPassword"
                label="Password"
                className="mb-3"
              >
                <Form.Control type="password" placeholder="Password" required />
              </FloatingLabel>
              <FloatingLabel
                controlId="registerConfirmPassword"
                label="Confirm Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  required
                />
              </FloatingLabel>
              <Button variant="outline-primary" type="submit">
                Register
              </Button>
            </Form>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default login;
