import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import sliceText from "../../../utilities/TextSlicing";
import PlaceholderCards from "./PlaceholderCards";
// import { useVenueData } from "../../../contexts/VenueDataContext";

function Cards({ category, venueData, isLoading, isLoadingMore }) {
  const navigate = useNavigate();
  // const { venueData, setVenueData } = useVenueData();

  const handleNavigate = (venueId, event) => {
    event.stopPropagation();
    navigate(`/venue/${venueId}`);
  };

  return (
    <section className="card-container container-fluid my-3">
      <div className="row g-4">
        {isLoading
          ? Array.from({ length: 15 }).map((_, index) => (
              <PlaceholderCards key={index} />
            ))
          : venueData.map((venue, index) => (
              <div
                className="col-sm-6 col-md-4 col-mdlg-4th col-lg-5th col-xl-2"
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
                    {venue.location.address && (
                      <p className="card-subtitle text-muted">
                        {sliceText(venue.location.address, 20)}
                      </p>
                    )}
                    {(venue.location.city || venue.location.country) && (
                      <p className="card-text">
                        {venue.location.city &&
                          sliceText(venue.location.city, 20)}
                        {venue.location.city && venue.location.country && ", "}
                        {venue.location.country &&
                          sliceText(venue.location.country, 20)}
                      </p>
                    )}
                    {venue.price !== undefined && (
                      <div className="mt-auto d-flex gap-1">
                        <span className="fw-semibold">{venue.price},-</span>
                        <span>per night</span>
                      </div>
                    )}
                  </div>
                </article>
              </div>
            ))}
        {isLoadingMore &&
          Array.from({ length: 15 }).map((_, index) => (
            <PlaceholderCards key={index} />
          ))}
      </div>
    </section>
  );
}

export default Cards;
