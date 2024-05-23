import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import ModalCentered from "../../components/Modals/ModalCentered";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import useRegisterLogin from "../../hooks/useRegisterLogin";
import { API_AUTH_ENDPOINT } from "../../constants/apiUrls";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { sendRequest } = useRegisterLogin(`${API_AUTH_ENDPOINT}register/`);
  const [loaderShow, setLoaderShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [statusCode, setStatusCode] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const [validated, setValidated] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [firstNameValid, setFirstNameValid] = useState(true);
  const [lastName, setLastName] = useState("");
  const [lastNameValid, setLastNameValid] = useState(true);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);

  const handleFirstNameChange = (e) => {
    const input = e.target.value;
    setFirstName(input);
    const isValid = /^[a-zA-ZæøåÆØÅöäüÖÄÜéÉâêîôûÂÊÎÔÛ]+$/.test(input);
    setFirstNameValid(isValid);
    e.target.setCustomValidity(isValid ? "" : "Invalid first name");
  };

  const handleLastNameChange = (e) => {
    const input = e.target.value;
    setLastName(input);
    const isValid = /^[a-zA-ZæøåÆØÅöäüÖÄÜéÉâêîôûÂÊÎÔÛ]+$/.test(input);
    setLastNameValid(isValid);
    e.target.setCustomValidity(isValid ? "" : "Invalid last name");
  };

  const handleEmailChange = (e) => {
    const input = e.target.value;
    setEmail(input);
    const isValid = /^[a-zA-Z0-9._-]+$/.test(input);
    setEmailValid(isValid);
    e.target.setCustomValidity(isValid ? "" : "Invalid email");
  };

  const handlePasswordChange = (e) => {
    const input = e.target.value;
    setPassword(input);
    const isValid = input.length >= 8;
    setPasswordValid(isValid);
    e.target.setCustomValidity(isValid ? "" : "Invalid Password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
    } else {
      setValidated(true);
      const userData = {
        name: `${firstName}_${lastName}`,
        email: `${email}@stud.noroff.no`,
        password: password,
      };

      try {
        setLoaderShow(true);
        const data = await sendRequest("POST", userData);
        if (data) {
          console.log(data);
          setStatusCode(data.data.status);
          setStatusMessage("Account creation successful");
          setModalShow(true);
        }
      } catch (error) {
        console.error("Registration error:", error);
      }
    }
    setValidated(true);
    setLoaderShow(false);
  };

  return (
    <main className="d-flex justify-content-center align-items-center vh-100">
      <Container>
        <Row className="justify-content-md-center">
          <Col md={9} lg={7} xl={6}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <section className="text-center">
                <img
                  src="/logo/logo-icon_holidaze.png"
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
                      required
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
                      required
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
              <InputGroup size="md" hasValidation>
                <FloatingLabel
                  controlId="floatingInputEmail"
                  label="Email"
                  className="d-flex"
                >
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    isInvalid={!emailValid}
                    className="rounded-end-0"
                  />
                </FloatingLabel>
                <InputGroup.Text className="rounded-start-0">
                  @stud.noroff.no
                </InputGroup.Text>
                {!emailValid && (
                  <Form.Control.Feedback
                    type="invalid w-100"
                    className="small text-danger mt-1"
                  >
                    Email can only include the first section of your email,
                    before @stud.noroff.no.
                  </Form.Control.Feedback>
                )}
              </InputGroup>

              <FloatingLabel
                controlId="floatingPassword"
                label="Password"
                className="my-3"
              >
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  isInvalid={!passwordValid}
                />
                {!passwordValid && (
                  <Form.Control.Feedback type="invalid">
                    Password must be at least 8 characters long.
                  </Form.Control.Feedback>
                )}
              </FloatingLabel>

              <Button variant="primary" type="submit" className="w-100 mb-3">
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
      {loaderShow && (
        <Spinner
          variant="primary"
          animation="border"
          role="status"
          className="position-fixed top-50 start-50"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      <ModalCentered
        show={modalShow}
        onHide={() => setModalShow(false)}
        statusCode={statusCode}
        statusMessage={statusMessage}
      />
    </main>
  );
};

export default Register;
