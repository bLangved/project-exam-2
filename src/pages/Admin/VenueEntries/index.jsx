import React from "react";

function VenueEntries({ handleShow, venues }) {
  return (
    <>
      <section className="delete-avenue-card-container">
        {venues.map((venue, index) => (
          <article
            className="card bg-secondary-subtle border-0 mb-3"
            key={index}
            onClick={() => handleShow("Options", venue)}
          >
            <div className="row g-0">
              <div className="col-4 col-sm-3">
                <img
                  className="img-fluid h-100 rounded-start"
                  src={venue.media[0]?.url || "/images/placeholder.jpg"}
                  alt={venue.media[0]?.alt || "Venue main image"}
                />
              </div>
              <div className="col-8 col-sm-9">
                <div className="card-body h-100 p-2 d-flex flex-column ">
                  <div>
                    <h2 className="fs-5">{venue.name}</h2>
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
                  <div className="d-flex mt-auto">
                    <div className="mt-auto">
                      <span>Price: </span>
                      <span>{venue.price},-</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

export default VenueEntries;
