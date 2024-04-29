import React, { useRef } from "react";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

function Desktop({ handleShow }) {
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  const handleSearchIconClick = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleWishlistIconClick = () => {
    navigate("/wishlist");
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
      <div className="input-group">
        <div className="form-floating d-flex position-relative">
          <input
            type="text"
            className="form-control rounded-pill ps-4"
            id="searchbarInput"
            ref={searchInputRef}
            placeholder="Search for venues"
          />
          <label className="text-muted ps-4" htmlFor="searchbarInput">
            Search for venues
          </label>
          <button className="btn btn-white pe-4 h-100 end-0 rounded-pill border-0 position-absolute">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size="lg"
              onClick={handleSearchIconClick}
            />
          </button>
        </div>
      </div>
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
