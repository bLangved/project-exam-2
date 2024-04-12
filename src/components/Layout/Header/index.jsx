import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Mobile from "./Mobile";
import Desktop from "./Desktop";

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
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
}

export default Header;
