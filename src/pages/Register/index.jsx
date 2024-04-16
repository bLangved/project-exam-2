import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <main className="d-flex justify-content-center align-items-center vh-100">
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Form>
              <h3>Create an account</h3>
              <p>Start your journey at Holidaze!</p>

              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Get started
              </Button>

              <Form.Text className="text-muted">
                Already have an account? <Link to="/login">Login</Link>
              </Form.Text>
              <br />
              <Form.Text>
                Go back <Link to="/">Here</Link>
              </Form.Text>
            </Form>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Register;
