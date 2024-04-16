import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Mobile from "./Mobile";
import Desktop from "./Desktop";
import { Link } from "react-router-dom";

function Header() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <header className="banner bg-body-tertiary">
      <Mobile handleShow={handleShow} />
      <Desktop handleShow={handleShow} />

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            Signed in as: <a href="#login">Bjørnar Langved</a>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex flex-column">
            <Link to="/login" className="mb-3">
              Login
            </Link>
            <Link to="/register">Register</Link>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
}

export default Header;
