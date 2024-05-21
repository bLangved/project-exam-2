import React, { useRef } from "react";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import Searchbar from "../Searchbar";

function Desktop({ handleShow }) {
  const searchInputRef = useRef(null);

  const focusSearchInput = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <>
      <Navbar className="banner-container justify-content-center d-none d-lg-flex pb-0">
        <Link
          className="top-banner-desktop d-flex align-items-center gap-1 ms-4 me-auto"
          to="/"
        >
          <img
            src="/logo/logo-icon_holidaze.png"
            alt="website logo"
            className="logo-icon-banner fit-content"
          />
          <img
            src="/logo/logo-text_holidaze.png"
            alt="website logo text"
            className="logo-text-banner ms-n1"
          />
        </Link>
        <FontAwesomeIcon
          icon={faCircleUser}
          size="2xl"
          onClick={handleShow}
          color="black"
          className="ms-auto me-4"
        />
      </Navbar>
      <div className="searchbar-desktop-container d-none d-lg-flex w-50 mb-3 mx-auto">
        <Searchbar ref={searchInputRef} />
      </div>
    </>
  );
}

export default Desktop;
