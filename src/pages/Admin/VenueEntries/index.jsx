import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import sliceText from "../../../utilities/TextSlicing";

function VenueEntries({ handleShow, venues }) {
  return (
    <>
      <section className="card-container">
        <div className="row">
          {venues.length > 0 ? (
            venues.map((venue, index) => (
              <div
                className="col-lg-6"
                key={index}
                onClick={() => handleShow("Options", venue)}
              >
                <article className="card border-0 mb-3 bg-body-tertiary">
                  <div className="row g-0">
                    <div className="col-3">
                      <img
                        className="card-image img-fluid h-100 rounded-start"
                        src={venue.media[0]?.url || "/images/placeholder.jpg"}
                        alt={venue.media[0]?.alt || "Venue main image"}
                      />
                    </div>
                    <div className="col-9">
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
                </article>
              </div>
            ))
          ) : (
            <div className="text-center mt-1">
              <p>
                You got no venues at the moment. Why not add a new one and get
                started?
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default VenueEntries;
