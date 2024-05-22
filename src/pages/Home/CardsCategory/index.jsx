import React, { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faWifi,
  faUtensils,
  faPaw,
} from "@fortawesome/free-solid-svg-icons";

function CardsCategory({ onSelectCategory }) {
  const [activeCategory, setActiveCategory] = useState("latest");

  const handleSelect = (category) => {
    setActiveCategory(category);
    onSelectCategory(category);
  };

  return (
    <Navbar className="homepage-category-nav w-100 mt-1">
      <Nav
        justify
        variant="underline"
        className="d-flex align-items-center justify-content-center mx-auto gap-1 gap-sm-3"
      >
        <Nav.Item>
          <Nav.Link
            onClick={() => handleSelect("latest")}
            className={`d-flex flex-column align-items-center ${
              activeCategory === "latest" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faHouse} size="lg" className="mb-1" />
            <span>Latest</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => handleSelect("wifi")}
            className={`d-flex flex-column align-items-center ${
              activeCategory === "wifi" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faWifi} size="lg" className="mb-1" />
            <span>Wifi</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => handleSelect("breakfast")}
            className={`d-flex flex-column align-items-center ${
              activeCategory === "breakfast" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faUtensils} size="lg" className="mb-1" />
            <span>Breakfast</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => handleSelect("pets")}
            className={`d-flex flex-column align-items-center ${
              activeCategory === "pets" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faPaw} size="lg" className="mb-1" />
            <span>Pets</span>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}

export default CardsCategory;
