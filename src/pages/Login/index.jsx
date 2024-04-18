import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import useRegisterLogin from "../../hooks/useRegisterLogin";
import { API_AUTH_ENDPOINT } from "../../constants/apiUrls";
import ModalCentered from "../../components/Modals/ModalCentered";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { sendRequest } = useRegisterLogin(`${API_AUTH_ENDPOINT}login/`);
  const [loaderShow, setLoaderShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [statusCode, setStatusCode] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);

  const handleEmailChange = (e) => {
    const input = e.target.value;
    setEmail(input);
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
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
        email: email,
        password: password,
      };

      try {
        setLoaderShow(true);
        const data = await sendRequest("POST", userData);
        if (data) {
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem(
            "accessToken",
            JSON.stringify(data.data.accessToken)
          );
          navigate("/");
        }
      } catch (error) {
        setStatusCode(error.status);
        if (error.status === 401) {
          setStatusMessage(`Wrong login credentials`);
        } else {
          setStatusMessage(`Something went wrong during login. Try again`);
        }
        setModalShow(true);
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
              >
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  isInvalid={!emailValid}
                />
                {!emailValid && (
                  <Form.Control.Feedback type="invalid">
                    Must be a valid @stud.noroff.no email.
                  </Form.Control.Feedback>
                )}
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInputPassword"
                label="Password"
                className="mb-3"
              >
                <Form.Control
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

export default Login;
