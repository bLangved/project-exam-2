import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  return (
    <main className="d-flex justify-content-center align-items-center vh-100">
      <Container>
        <Row className="justify-content-md-center">
          <Col md={9} lg={7} xl={6}>
            <Form>
              <section className="text-center">
                <img
                  src="/logo/logo-holidaze.png"
                  alt="Holidaze logo"
                  height="75"
                  className="object-fit-contain mb-3"
                />
                <h1 className="display-4">Log in to your account</h1>
                <p className="lead fs-6">
                  Welcome back to Holidaze! Please enter your details.
                </p>
              </section>
              <FloatingLabel
                controlId="floatingInputEmail"
                label="Email"
                className="mb-3"
                aria-describedby="emailHelpBlock"
              >
                <Form.Control type="email" placeholder="Enter your email" />
                <Form.Text id="emailHelpBlock" className="text-danger">
                  Your email must be a valid Noroff email.
                </Form.Text>
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInputPassword"
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  aria-describedby="passwordHelpBlock"
                />
                <Form.Text id="passwordHelpBlock" className="text-danger">
                  Your password must be 8-20 characters long, contain letters
                  and numbers, and must not contain spaces, special characters,
                  or emoji.
                </Form.Text>
              </FloatingLabel>

              <div className="d-flex mb-3">
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>

                <Link to="/" className="ms-auto">
                  Forgot password
                </Link>
              </div>

              <Button variant="primary" type="submit" className="w-100 mb-3">
                Sign in
              </Button>

              <div className="d-flex flex-column align-items-center">
                <Form.Text className="text-body-secondary mb-3 fs-6">
                  Already have an account? <Link to="/register">Register</Link>
                </Form.Text>

                <Form.Text className="text-body-secondary fs-6">
                  <Link to="/">
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                      size="lg"
                      className="pe-2"
                    />
                    Go back
                  </Link>
                </Form.Text>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Login;
