import React, { useState, useEffect } from "react";
import { Offcanvas, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpRightAndDownLeftFromCenter,
  faDownLeftAndUpRightToCenter,
} from "@fortawesome/free-solid-svg-icons";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";

const SearchResults = ({ show, onHide, venues, isLoading }) => {
  const navigate = useNavigate();
  const newVenues = venues?.data || [];
  const [isExpanded, setIsExpanded] = useState(true);
  const [height, setHeight] = useState("");

  const toggleHeight = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (isLoading) {
      setHeight("75vh");
      setIsExpanded(true);
    }
  }, [isLoading]);

  useEffect(() => {
    setHeight(isExpanded ? "75vh" : "8.15em");
  }, [isExpanded, show]);

  useEffect(() => {
    const updateHeight = () => {
      const isDesktop = window.matchMedia("(min-width: 992px)").matches;

      let newHeight;
      if (isExpanded) {
        newHeight = isDesktop ? "65vh" : "75vh";
      } else {
        newHeight = isDesktop ? "4em" : "8.15em";
      }

      setHeight(newHeight);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, [isExpanded, show]);

  const currentIcon = isExpanded
    ? faDownLeftAndUpRightToCenter
    : faUpRightAndDownLeftFromCenter;

  return (
    <Offcanvas
      className="search-queries-container shadow-lg z-1"
      show={show}
      onHide={onHide}
      placement="bottom"
      backdrop={false}
      scroll={true}
      style={{
        height: height,
      }}
    >
      <Offcanvas.Header
        className="bg-body-tertiary shadow-sm border-bottom"
        closeButton
      >
        <Offcanvas.Title>Results</Offcanvas.Title>
        <FontAwesomeIcon
          className="mx-auto w-50"
          icon={currentIcon}
          size="xl"
          onClick={toggleHeight}
        />
      </Offcanvas.Header>
      <Offcanvas.Body>
        {isLoading ? (
          <div className="d-flex w-100 h-100">
            <Spinner
              animation="border"
              variant="primary"
              className="m-auto z-3"
              role="status"
            ></Spinner>
          </div>
        ) : newVenues.length > 0 ? (
          <ListGroup className="card-container">
            {newVenues.map((venue) => (
              <ListGroup.Item
                key={venue.id}
                className="card bg-body-tertiary mb-2 p-0 shadow-sm"
                onClick={() => navigate(`/venue/${venue.id}`)}
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
