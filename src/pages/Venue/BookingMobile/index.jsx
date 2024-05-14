import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { format, parseISO, differenceInDays } from "date-fns";
import DateRangePicker from "../../../components/DateRangePicker";

function BookingMobile({ venue, onDateChange, startDate, endDate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getDaysDifference = (start, end) => {
    if (start && end) {
      const startParsed = parseISO(start);
      const endParsed = parseISO(end);
      return differenceInDays(endParsed, startParsed);
    }
    return 0;
  };

  return (
    <section className="booking-mobile position-fixed d-lg-none w-100 bg-body-tertiary text-dark rounded-top-5 shadow-lg">
      <div className="mx-4 h-100 d-flex align-items-center">
        <div className="fs-6 col-7 d-flex flex-column">
          <button
            className="btn p-0"
            onClick={handleShow}
            aria-controls="Open date selector"
            aria-expanded={show}
          >
            {startDate && endDate ? (
              <div className="d-flex flex-column">
                <span className="fw-semibold me-auto">
                  {getDaysDifference(startDate, endDate)} days
                </span>
                <span className="me-auto">
                  {format(parseISO(startDate), "d. MMM")}
                  <span className="mx-1">-</span>
                  {format(parseISO(endDate), "d. MMM")}
                </span>
              </div>
            ) : (
              <span>Select dates</span>
            )}
          </button>
        </div>
        <button className="btn btn-primary px-1 ms-auto col-5">
          Book venue
        </button>
      </div>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          {/* <Offcanvas.Title>
          </Offcanvas.Title> */}
        </Offcanvas.Header>
        <Offcanvas.Body>
          <DateRangePicker
            venue={venue}
            onDateChange={onDateChange}
            handleClose={handleClose}
            startDate={startDate}
            endDate={endDate}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </section>
  );
}

export default BookingMobile;
