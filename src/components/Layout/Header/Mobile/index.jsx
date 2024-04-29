import React, { useRef } from "react";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

function Mobile({ handleShow }) {
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
    <Navbar className="banner-container mobile-banner z-3 d-flex d-lg-none">
      <Link to="/">
        {" "}
        <img
          src="/logo/logo-holidaze.png"
          alt="website logo"
          className="mx-2"
        />
      </Link>
      <div className="input-group">
        <div className="form-floating d-flex position-relative me-2">
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

      <nav className="mobile-banner-bottom bg-body-tertiary border-top w-100 z-3 position-fixed bottom-0">
        <ul className="h-100 d-flex justify-content-around align-items-center">
          <li>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size="xl"
              onClick={handleSearchIconClick}
              color="orange"
            />
          </li>
          <li>
            <FontAwesomeIcon
              icon={faHeart}
              size="xl"
              onClick={handleWishlistIconClick}
              color="deeppink"
            />
          </li>
          <li>
            <FontAwesomeIcon
              icon={faCircleUser}
              size="xl"
              onClick={handleShow}
              color="#0d6efd"
            />
          </li>
        </ul>
      </nav>
    </Navbar>
  );
}

export default Mobile;
