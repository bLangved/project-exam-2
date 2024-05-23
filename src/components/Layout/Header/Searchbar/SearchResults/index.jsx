import React, { useState, useEffect } from "react";
import { Offcanvas, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpRightAndDownLeftFromCenter,
  faDownLeftAndUpRightToCenter,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import sliceText from "../../../../../utilities/TextSlicing";

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
        className="search-queries-header bg-body-tertiary shadow-sm border-bottom d-flex align-items-center justify-content-between"
        closeButton
      >
        <Offcanvas.Title className="me-auto">Results</Offcanvas.Title>
        <FontAwesomeIcon
          className="mx-auto"
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
          <ListGroup className="card-container mb-5">
            <div className="row g-0">
              {newVenues.map((venue) => (
                <ListGroup.Item
                  key={venue.id}
                  className="p-0 col-lg-6 col-xl-4 border-0"
                  onClick={() => {
                    navigate(`/venue/${venue.id}`);
                    toggleHeight();
                  }}
                >
                  <div className="card border-0 mb-3 m-lg-3 bg-body-tertiary">
                    <div className="row g-0">
                      <div className="col-3 col-lg-4">
                        <img
                          className="card-image img-fluid h-100 rounded-start"
                          src={venue.media[0]?.url || "/images/placeholder.jpg"}
                          alt={venue.media[0]?.alt || "Venue main image"}
                        />
                      </div>
                      <div className="col-9 col-lg-8">
                        <div className="card-body h-100 p-2 ms-1 d-flex flex-column justify-content-between">
                          <span className="fw-semibold">
                            {sliceText(venue.name, 20)}
                          </span>
                          {(venue.location.city || venue.location.country) && (
                            <p className="card-text mb-auto">
                              {venue.location.city &&
                                sliceText(venue.location.city, 10)}
                              {venue.location.city &&
                                venue.location.country &&
                                ", "}
                              {venue.location.country &&
                                sliceText(venue.location.country, 10)}
                            </p>
                          )}
                          <div className="d-flex align-items-center justify-content-between">
                            {venue.price !== undefined && (
                              <div className="d-flex align-items-center gap-1">
                                <FontAwesomeIcon
                                  icon={faDollarSign}
                                  color="#efb41d"
                                />
                                <span className="fw-semibold">
                                  {venue.price},-
                                </span>
                                <span>per night</span>
                              </div>
                            )}
                            {venue.rating > 0 && (
                              <div className="card-rating d-flex align-items-center gap-1">
                                <img src="/icons/star.svg" alt="star rating" />
                                <span>{venue.rating}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </div>
          </ListGroup>
        ) : (
          <p>No venues found.</p>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SearchResults;
