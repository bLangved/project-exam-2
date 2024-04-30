import React, { useRef } from "react";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faHeart } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Searchbar from "../Searchbar";

function Desktop({ handleShow }) {
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  const handleWishlistIconClick = () => {
    navigate("/wishlist");
  };
  const focusSearchInput = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <Navbar className="banner-container desktop-banner d-none d-lg-flex">
      <Link to="/">
        {" "}
        <img
          src="/logo/logo-holidaze.png"
          alt="website logo"
          className="mx-3"
        />
      </Link>
      <Searchbar ref={searchInputRef} />
      <ul className="icon-tabs d-flex justify-content-between my-auto mx-3 p-0">
        <FontAwesomeIcon
          icon={faHeart}
          size="2xl"
          onClick={handleWishlistIconClick}
          color="deeppink"
        />
        <FontAwesomeIcon
          icon={faCircleUser}
          size="2xl"
          onClick={handleShow}
          color="#0d6efd"
        />
      </ul>
    </Navbar>
  );
}

export default Desktop;
