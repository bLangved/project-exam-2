import React, { useState, useRef } from "react";
import { Offcanvas, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpRightAndDownLeftFromCenter,
  faDownLeftAndUpRightToCenter,
} from "@fortawesome/free-solid-svg-icons";

const SearchResults = ({ show, onHide, venues }) => {
  const newVenues = venues?.data || [];

  const [height, setHeight] = useState("75vh");
  const [zIndex, setZIndex] = useState("2");

  const increaseHeight = () => {
    setHeight("75vh");
    setZIndex("2");
  };

  const reduceHeight = () => {
    setHeight("8.15em");
    setZIndex("2");
  };

  return (
    <Offcanvas
      className="search-queries-container shadow-lg"
      show={show}
      onHide={onHide}
      placement="bottom"
      backdrop={false}
      scroll={true}
      style={{ height, zIndex, transition: "height 0.4s ease" }}
    >
      <Offcanvas.Header className="bg-body-tertiary" closeButton>
        <Offcanvas.Title>Search Results</Offcanvas.Title>
        <div className=" d-flex align-items-center justify-content-between w-25 mx-auto">
          <FontAwesomeIcon
            icon={faDownLeftAndUpRightToCenter}
            size="lg"
            onClick={reduceHeight}
          />
          <FontAwesomeIcon
            icon={faUpRightAndDownLeftFromCenter}
            size="lg"
            onClick={increaseHeight}
          />
        </div>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {newVenues.length > 0 ? (
          <ListGroup className="card-container">
            {newVenues.map((venue) => (
              <ListGroup.Item
                key={venue.id}
                className="card bg-body-tertiary mb-2 p-0 shadow-sm"
              >
                <div className="row g-0">
                  <div className="col-4 col-sm-3">
                    <img
                      className="card-image img-fluid h-100 rounded-start"
                      src={venue.media[0]?.url || "/images/placeholder.jpg"}
                      alt={venue.media[0]?.alt || "Venue main image"}
                    />
                  </div>
                  <div className="col-8 col-sm-9">
                    <div className="card-body h-100 p-2 d-flex flex-column justify-content-between">
                      <div className="d-flex align-items-center justify-content-between">
                        <span>{venue.name}</span>
                        {venue.rating > 0 && (
                          <div className="card-rating d-flex align-items-center gap-1">
                            <img src="/icons/star.svg" alt="star rating" />
                            <span>{venue.rating}</span>
                          </div>
                        )}
                      </div>
                      <p className="card-subtitle">
                        {venue.location.city}, {venue.location.country}
                      </p>
                      <div>
                        <span>Price: </span>
                        <span>{venue.price},-</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>No venues found.</p>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SearchResults;
