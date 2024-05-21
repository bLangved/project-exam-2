import React, { useRef } from "react";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Searchbar from "../Searchbar";

function Mobile({ handleShow }) {
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  const focusSearchInput = () => {
    searchInputRef.current?.focus();
  };

  return (
    <Navbar className="banner-container mobile-banner z-3 d-flex d-lg-none mx-2">
      <Link className="d-none d-md-flex align-items-center gap-1" to="/">
        <img
          src="/logo/logo-icon_holidaze.png"
          alt="website logo"
          className="logo-icon-banner"
        />
        <img
          src="/logo/logo-text_holidaze.png"
          alt="website logo text"
          className="logo-text-banner me-2"
        />
      </Link>
      <Searchbar ref={searchInputRef} />

      <nav className="mobile-banner-bottom bg-body-tertiary border-top w-100 z-3 position-fixed bottom-0 start-0">
        <ul className="h-100 d-flex justify-content-around align-items-center">
          <li onClick={focusSearchInput}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size="xl"
              color="black"
              className="ms-1"
            />
          </li>
          <li
            onClick={() => navigate("/")}
            className="bg-body-tertiary border-top"
          >
            <img src="/logo/logo-icon_holidaze.png" />
          </li>
          <li onClick={handleShow}>
            <FontAwesomeIcon
              icon={faCircleUser}
              size="xl"
              color="black"
              className="me-1"
            />
          </li>
        </ul>
      </nav>
    </Navbar>
  );
}

export default Mobile;
