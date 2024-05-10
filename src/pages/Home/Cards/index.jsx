import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../../constants/apiUrls";
import useApi from "../../../hooks/useApi";
import { useNavigate } from "react-router-dom";
import sliceText from "../../../utilities/TextSlicing";
import { useVenueData } from "../../../contexts/VenueDataContext";

function Cards() {
  const navigate = useNavigate();
  const { venueData, setVenueData } = useVenueData();
  const [page, setPage] = useState(1);
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
    }
  }, [data, setVenueData]);

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleNavigate = (venueId, event) => {
    event.stopPropagation();
    navigate(`/venue/${venueId}`);
    console.log(`/venue/${venueId}`);
  };

  return (
    <section className="card-container container-fluid my-3">
      <div className="row g-4">
        {venueData.map((venue, index) => {
          return (
            <div
              className="col-sm-6 col-md-4 col-mdlg-4th col-lg-5th" // Custom 4 and 5 col layout larger views
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
          );
        })}
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
