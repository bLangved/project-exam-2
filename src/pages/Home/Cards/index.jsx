import React from "react";
import { API_BASE_URL } from "../../../constants/apiUrls";
import useApi from "../../../hooks/useApi";
import { useNavigate } from "react-router-dom";

function Cards() {
  const endpoint = "venues/";
  const result = useApi(`${API_BASE_URL}${endpoint}`);
  const data = result.data;
  const navigate = useNavigate();

  const handleNavigate = (venueId, event) => {
    event.stopPropagation();
    navigate(`/venue/${venueId}`);
    console.log(`/venue/${venueId}`);
  };

  return (
    <section className="card-container container-fluid">
      <div className="row g-4">
        {data.map((venue) => {
          return (
            <div
              className="col-sm-6 col-md-4 col-lg-3"
              key={venue.id}
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
                    <h2 className="card-title">{venue.name}</h2>
                    {venue.rating > 0 && (
                      <div className="card-rating d-flex align-items-center gap-1">
                        <img src="/icons/star.svg" alt="star rating" />
                        <span>{venue.rating}</span>
                      </div>
                    )}
                  </div>
                  <p className="card-subtitle text-muted">
                    {venue.location.address}
                  </p>
                  <p className="card-text">
                    {venue.location.city}, {venue.location.country}
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
    </section>
  );
}

export default Cards;
