import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <main className="d-flex justify-content-center align-items-center vh-100">
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Form>
              <h3>Log in to your account</h3>
              <p>Welcome back to Holidaze! Please enter your details.</p>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Sign in
              </Button>

              <Form.Text className="text-muted">
                Already have an account? <Link to="/register">Register</Link>
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

export default Login;
