import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [firstNameValid, setFirstNameValid] = useState(true);
  const [lastName, setLastName] = useState("");
  const [lastNameValid, setLastNameValid] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstNameInvalid, setFirstNameInvalid] = useState(false);
  const [lastNameInvalid, setLastNameInvalid] = useState(false);

  const handleFirstNameChange = (e) => {
    const input = e.target.value;
    setFirstName(input);
    setFirstNameValid(/^[a-zA-ZæøåÆØÅöäüÖÄÜéÉâêîôûÂÊÎÔÛ]*$/.test(input));
  };

  const handleLastNameChange = (e) => {
    const input = e.target.value;
    setLastName(input);
    setLastNameValid(/^[a-zA-ZæøåÆØÅöäüÖÄÜéÉâêîôûÂÊÎÔÛ]*$/.test(input));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullEmail = email + "@stud.noroff.no";
    const fullName = firstName + " " + lastName;
    console.log(firstName);
    console.log(lastName);
    console.log(fullName);
    console.log(fullEmail);
    console.log(password);
  };

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
                <h1 className="display-4">Create an account</h1>
                <p className="lead fs-6">Start your journey at Holidaze!</p>
              </section>
              <Row>
                <Col sm={6}>
                  <FloatingLabel
                    controlId="floatingInputName"
                    label="First name"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Enter your first name"
                      value={firstName}
                      onChange={handleFirstNameChange}
                      isInvalid={!firstNameValid}
                    />
                    {!firstNameValid && (
                      <Form.Control.Feedback type="invalid">
                        Please only use letters, and no spaces.
                      </Form.Control.Feedback>
                    )}
                  </FloatingLabel>
                </Col>
                <Col sm={6}>
                  <FloatingLabel
                    controlId="floatingInputName"
                    label="Last name"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Enter your last name"
                      value={lastName}
                      onChange={handleLastNameChange}
                      isInvalid={!lastNameValid}
                    />
                    {!lastNameValid && (
                      <Form.Control.Feedback type="invalid">
                        Please only use letters, and no spaces.
                      </Form.Control.Feedback>
                    )}
                  </FloatingLabel>
                </Col>
              </Row>
              <InputGroup size="lg">
                <FloatingLabel
                  controlId="floatingInputEmail"
                  label="Email"
                  className="d-flex"
                >
                  <Form.Control
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    className="rounded-end-0"
                  />
                  <InputGroup.Text className="rounded-start-0">
                    @stud.noroff.no
                  </InputGroup.Text>
                </FloatingLabel>
              </InputGroup>
              <Form.Text id="emailHelpBlock" className="text-danger">
                Only write the first section of your email, before
                @stud.noroff.no.
              </Form.Text>

              <FloatingLabel
                controlId="floatingPassword"
                label="Password"
                className="my-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <Form.Text id="passwordHelpBlock" className="text-danger">
                  Your password must be at least 8 characters long and must not
                  contain spaces.
                </Form.Text>
              </FloatingLabel>

              <Button
                variant="primary"
                // type="submit"
                className="w-100 mb-3"
                onClick={handleSubmit}
              >
                Get started
              </Button>

              <div className="d-flex flex-column align-items-center">
                <Form.Text className="text-body-secondary mb-3 fs-6">
                  Already have an account? <Link to="/login">Login</Link>
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

export default Register;
