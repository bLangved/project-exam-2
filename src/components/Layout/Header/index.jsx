import { useState, useContext } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Mobile from "./Mobile";
import Desktop from "./Desktop";
import { Link } from "react-router-dom";
import logout from "../../../utilities/Logout";
import {
  replaceSpecialCharacters,
  capitalizeWords,
} from "../../../utilities/TextHandling";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faArrowRightToBracket,
  faArrowRightFromBracket,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { UserProfileContext } from "../../../contexts/ProfileDataContext";

function Header() {
  const { userData, setUserData } = useContext(UserProfileContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isSignedIn = userData && Object.keys(userData).length > 0;
  const userName = userData.name
    ? capitalizeWords(replaceSpecialCharacters(userData.name))
    : "User";

  return (
    <header className="banner bg-body-tertiary border-bottom shadow-sm">
      <Mobile handleShow={handleShow} />
      <Desktop handleShow={handleShow} />

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header className="bg-body-tertiary" closeButton>
          {isSignedIn ? (
            <Offcanvas.Title className="fs-6">
              <span>Signed in as: </span>
              <span>{userName}</span>
            </Offcanvas.Title>
          ) : (
            <Offcanvas.Title className="fs-6">Not signed in</Offcanvas.Title>
          )}
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex flex-column h-100 fs-4">
            {isSignedIn ? (
              <>
                <Link
                  to="/profile"
                  onClick={handleClose}
                  className="mb-3 d-flex align-items-center gap-2"
                >
                  <FontAwesomeIcon
                    className="col-1"
                    icon={faUserCircle}
                    size="lg"
                  />
                  <span>Profile</span>
                </Link>
                <Link
                  to="/admin"
                  onClick={handleClose}
                  className="mb-3 d-flex align-items-center gap-2"
                >
                  <FontAwesomeIcon className="col-1" icon={faHouse} size="lg" />
                  <span>Administrate venues</span>
                </Link>
                <hr className="mt-auto" />
                <button className="btn btn-primary" onClick={logout}>
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  onClick={handleClose}
                  to="/login"
                  className="mb-4 d-flex align-items-center gap-2"
                >
                  <FontAwesomeIcon
                    className="col-1"
                    icon={faArrowRightToBracket}
                    size="lg"
                  />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  onClick={handleClose}
                  className="mb-4 d-flex align-items-center gap-2"
                >
                  <FontAwesomeIcon
                    className="col-1"
                    icon={faArrowRightFromBracket}
                    size="lg"
                  />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
}

export default Header;
