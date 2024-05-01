import React, { useState, useEffect } from "react";
import VenueSee from "./VenueSee";
import VenueEdit from "./VenueEdit";
import VenueDelete from "./VenueDelete";
import VenueBookings from "./VenueBookings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faList } from "@fortawesome/free-solid-svg-icons";
import { formatDate, daysSince } from "../../../../utilities/FormatDate";

function VenueOptions({
  handleClose,
  venue,
  onVenueDelete,
  onVenueEdit,
  onVenueBooking,
  handleSubmissionResult,
  isloading,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  const toggleEdit = () => setIsEditing(!isEditing);
  const toggleBooking = () => setIsBooking(!isBooking);
  return (
    <>
      {!isEditing && !isBooking ? (
        <>
          <article className="card bg-secondary-subtle border-0 mb-2">
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
          <div className="mb-4">
            <div className="fs-6 mb-2">
              Created: {formatDate(venue.created)} ({daysSince(venue.created)}{" "}
              days ago)
            </div>
            <div className="fs-6">
              You have {venue._count.bookings} bookings on this venue
            </div>
          </div>
          <button
            onClick={toggleBooking}
            className="btn btn-light w-100 p-3 mb-4 d-flex gap-3 align-items-center"
          >
            <FontAwesomeIcon icon={faList} size="lg" className="text-dark" />
            <span>Manage bookings</span>
          </button>
          <VenueSee venueId={venue.id} />
          <button
            onClick={toggleEdit}
            className="btn btn-light w-100 p-3 mb-4 d-flex gap-3 align-items-center"
          >
            <FontAwesomeIcon
              icon={faPenToSquare}
              size="lg"
              className="text-info"
            />
            <span>Edit venue</span>
          </button>
          <VenueDelete
            venueId={venue.id}
            onVenueDelete={onVenueDelete}
            handleSubmissionResult={handleSubmissionResult}
            handleClose={handleClose}
          />
        </>
      ) : isEditing ? (
        <VenueEdit
          toggleEdit={toggleEdit}
          handleClose={handleClose}
          venue={venue}
          onVenueEdit={onVenueEdit}
          handleSubmissionResult={handleSubmissionResult}
        />
      ) : (
        <VenueBookings
          toggleBooking={toggleBooking}
          handleClose={handleClose}
          venue={venue}
          onVenueBooking={onVenueBooking}
          isloading={isloading}
        />
      )}
    </>
  );
}

export default VenueOptions;
