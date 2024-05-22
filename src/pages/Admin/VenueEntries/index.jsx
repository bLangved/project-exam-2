import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

function VenueEntries({ handleShow, venues }) {
  return (
    <>
      <section className="card-container">
        <div className="row">
          {venues.map((venue, index) => (
            <div className="col-lg-6">
              <article
                className="card bg-body-tertiary border-0 mb-3 shadow"
                key={index}
                onClick={() => handleShow("Options", venue)}
              >
                <div className="row g-0">
                  <div className="col-3">
                    <img
                      className="card-image img-fluid h-100 rounded-start"
                      src={venue.media[0]?.url || "/images/placeholder.jpg"}
                      alt={venue.media[0]?.alt || "Venue main image"}
                    />
                  </div>
                  <div className="col-9">
                    <div className="card-body ms-1 h-100 p-2 d-flex flex-column ">
                      <div>
                        <h2 className="fw-semibold">{venue.name}</h2>
                        {venue.rating > 0 && (
                          <div className="card-rating d-flex align-items-center gap-1">
                            <img src="/icons/star.svg" alt="star rating" />
                            <span>{venue.rating}</span>
                          </div>
                        )}
                      </div>
                      <p className="card-text">
                        {venue.location.city}, {venue.location.country}
                      </p>
                      <div className="d-flex align-items-center justify-content-between">
                        {venue.price !== undefined && (
                          <div className="d-flex align-items-center gap-1">
                            <FontAwesomeIcon
                              icon={faDollarSign}
                              color="#efb41d"
                            />
                            <span className="fw-semibold">{venue.price},-</span>
                            <span>per night</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default VenueEntries;
