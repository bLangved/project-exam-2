import React, { useRef } from "react";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Searchbar from "../Searchbar";

function Mobile({ handleShow }) {
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  const handleWishlistIconClick = () => {
    navigate("/wishlist");
  };

  const focusSearchInput = () => {
    searchInputRef.current?.focus();
  };

  return (
    <Navbar className="banner-container mobile-banner z-3 d-flex d-lg-none">
      <Link to="/">
        {" "}
        <img
          src="/logo/logo-holidaze.png"
          alt="website logo"
          className="mx-2"
        />
      </Link>
      <Searchbar ref={searchInputRef} />

      <nav className="mobile-banner-bottom bg-body-tertiary border-top w-100 z-3 position-fixed bottom-0">
        <ul className="h-100 d-flex justify-content-around align-items-center">
          <li onClick={focusSearchInput}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size="xl"
              color="orange"
            />
          </li>
          <li onClick={handleWishlistIconClick}>
            <FontAwesomeIcon icon={faHeart} size="xl" color="deeppink" />
          </li>
          <li onClick={handleShow}>
            <FontAwesomeIcon icon={faCircleUser} size="xl" color="#0d6efd" />
          </li>
        </ul>
      </nav>
    </Navbar>
  );
}

export default Mobile;
