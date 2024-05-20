import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../../constants/apiUrls";
import useApi from "../../../hooks/useApi";
import { useNavigate } from "react-router-dom";
import sliceText from "../../../utilities/TextSlicing";
import { useVenueData } from "../../../contexts/VenueDataContext";
import { Card, Placeholder } from "react-bootstrap";

function PlaceholderCard() {
  return (
    <div className="col-sm-6 col-md-4 col-mdlg-4th col-lg-5th">
      <Card className="h-100 p-0 border-0">
        <Placeholder
          as="div"
          animation="glow"
          className="card-img rounded-4"
          style={{ height: "180px", width: "100%", backgroundColor: "#e0e0e0" }}
        >
          <Placeholder xs={12} style={{ height: "180px", width: "100%" }} />
        </Placeholder>
        <Card.Body className="d-flex flex-column p-0 my-2">
          <div className="d-flex align-items-center justify-content-between">
            <Placeholder as={Card.Title} animation="glow" className="w-75">
              <Placeholder xs={6} />
            </Placeholder>
            <div className="card-rating d-flex align-items-center gap-1">
              <Placeholder as="div" animation="glow">
                <Placeholder
                  xs={3}
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    borderRadius: "50%",
                    backgroundColor: "#e0e0e0",
                  }}
                />
                <Placeholder xs={3} />
              </Placeholder>
            </div>
          </div>
          <Placeholder as={Card.Text} animation="glow" className="text-muted">
            <Placeholder xs={7} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={4} /> <Placeholder xs={4} />
          </Placeholder>
          <div className="mt-auto d-flex align-items-center">
            <Placeholder as={Card.Text} animation="glow" className="me-2">
              <Placeholder xs={3} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={2} />
            </Placeholder>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

function Cards() {
  const navigate = useNavigate();
  const { venueData, setVenueData } = useVenueData();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const requestLimit = 15;
  const endpoint = "venues/";
  const url = `${API_BASE_URL}${endpoint}?limit=${requestLimit}&page=${page}`;

  const results = useApi(url);
  const data = results.data;

  useEffect(() => {
    if (data && data.length > 0) {
      const newVenues = data.filter(
        (newVenue) =>
          !venueData.some((existingVenue) => existingVenue.id === newVenue.id)
      );
      if (newVenues.length > 0) {
        setVenueData((prevData) => [...prevData, ...newVenues]);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 10000);
    }
  }, [data, setVenueData]);

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
    setIsLoading(true);
  };

  const handleNavigate = (venueId, event) => {
    event.stopPropagation();
    navigate(`/venue/${venueId}`);
  };

  return (
    <section className="card-container container-fluid my-3">
      <div className="row g-4">
        {isLoading
          ? Array.from({ length: requestLimit }).map((_, index) => (
              <PlaceholderCard key={index} />
            ))
          : venueData.map((venue, index) => (
              <div
                className="col-sm-6 col-md-4 col-mdlg-4th col-lg-5th"
                key={venue.id + index}
                onClick={(e) => handleNavigate(venue.id, e)}
              >
                <article className="card h-100 p-0 border-0">
                  <img
                    className="card-img rounded-4"
                    src={venue.media[0]?.url || "/images/placeholder.jpg"}
                    alt={venue.media[0]?.alt || "Venue main image"}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/placeholder.jpg";
                      e.target.alt = "placeholder image";
                    }}
                  />
                  <div className="card-body d-flex flex-column p-0 my-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <h2 className="card-title w-75">
                        {sliceText(venue.name, 20)}
                      </h2>
                      {venue.rating > 0 && (
                        <div className="card-rating d-flex align-items-center gap-1">
                          <img src="/icons/star.svg" alt="star rating" />
                          <span>{venue.rating}</span>
                        </div>
                      )}
                    </div>
                    <p className="card-subtitle text-muted">
                      {sliceText(venue.location.address, 20)}
                    </p>
                    <p className="card-text">
                      {sliceText(venue.location.city, 20)},{" "}
                      {sliceText(venue.location.country, 20)}
                    </p>
                    <div className="mt-auto">
                      <span>Price: </span>
                      <span>{venue.price},-</span>
                    </div>
                  </div>
                </article>
              </div>
            ))}
      </div>
      <div className="w-100 d-flex my-5">
        <button
          className="show-more-btn btn btn-primary w-100 mx-auto p-2"
          onClick={handleShowMore}
        >
          Show More
        </button>
      </div>
    </section>
  );
}

export default Cards;
