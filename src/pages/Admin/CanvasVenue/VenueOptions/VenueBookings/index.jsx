import React from "react";
import { ListGroup, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { formatDate, totalDays } from "../../../../../utilities/FormatDate";

function VenueBookings({ toggleBooking, venue, isLoading }) {
  const navigate = useNavigate();
  const bookings = venue.bookings;

  return (
    <div className="admin-bookings-container">
      <button
        type="button"
        onClick={toggleBooking}
        className="btn btn-outline-dark w-100 p-3 mb-4 d-flex gap-3 align-items-center"
      >
        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
        <span>Go back</span>
      </button>
      {isLoading ? (
        <div className="d-flex w-100 h-100">
          <Spinner
            animation="border"
            variant="primary"
            className="m-auto z-3"
            role="status"
          ></Spinner>
        </div>
      ) : bookings.length > 0 ? (
        <ListGroup className="card-container">
          {bookings.map((booking) => (
            <ListGroup.Item
              key={booking.id}
              className="card bg-body-tertiary mb-3 p-0 "
              onClick={() => navigate(`/venue/${booking.id}`)}
            >
              <div className="row g-0">
                <div className="col-2 d-flex">
                  <Image
                    src={booking.customer.avatar.url}
                    alt={booking.customer.avatar.alt}
                    className="card-img object-fit-cover border m-auto"
                    roundedCircle
                  />
                </div>
                <div className="col-10">
                  <div className="card-body">
                    <div className="bio d-flex flex-column">
                      <span className="card-title">
                        {booking.customer?.name || "No name"}
                      </span>
                      <span className="card-subtitle">
                        {booking.customer?.email || "No email"}
                      </span>
                    </div>
                    <div className="date d-flex gap-1">
                      <span className="">{formatDate(booking.dateFrom)}</span>
                      <span>-</span>
                      <span className="">{formatDate(booking.dateTo)}</span>
                      <span>
                        ({totalDays(booking.dateFrom, booking.dateTo)} days)
                      </span>
                    </div>
                    <div className="guests d-flex gap-1">
                      <span className="">
                        Number of guests: {booking.guests}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>Your venue has no bookings</p>
      )}
    </div>
  );
}

export default VenueBookings;
