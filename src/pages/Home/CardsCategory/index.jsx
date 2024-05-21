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
    <Navbar className="w-100">
      <Nav
        justify
        variant="underline"
        className="d-flex align-items-center justify-content-center w-75 mx-auto"
      >
        <Nav.Item className="p-2">
          <Nav.Link
            onClick={() => handleSelect("latest")}
            className={`d-flex flex-column ${
              activeCategory === "latest" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faHouse} size="lg" />
            <span>Latest</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="p-2">
          <Nav.Link
            onClick={() => handleSelect("wifi")}
            className={`d-flex flex-column ${
              activeCategory === "wifi" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faWifi} size="lg" />
            <span>Wifi</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="p-2">
          <Nav.Link
            onClick={() => handleSelect("breakfast")}
            className={`d-flex flex-column ${
              activeCategory === "breakfast" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faUtensils} size="lg" />
            <span>Breakfast</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="p-2">
          <Nav.Link
            onClick={() => handleSelect("animals")}
            className={`d-flex flex-column ${
              activeCategory === "animals" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faPaw} size="lg" />
            <span>Animals</span>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}

export default CardsCategory;
