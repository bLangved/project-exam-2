import React, { useState, useEffect, useContext } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { format, differenceInDays, startOfDay } from "date-fns";
import DateRangePicker from "../../../components/DateRangePicker";
import { UserProfileContext } from "../../../contexts/ProfileDataContext";

function BookingMobile({
  venue,
  onDateChange,
  startDate,
  endDate,
  onBookingSuccess,
}) {
  const { userData, setUserData } = useContext(UserProfileContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getDaysDifference = (start, end) => {
    if (start && end) {
      const startParsed = startOfDay(new Date(start));
      const endParsed = startOfDay(new Date(end));
      return differenceInDays(endParsed, startParsed);
    }
    return 0;
  };

  const formatDate = (date) => {
    if (date) {
      return format(startOfDay(new Date(date)), "d. MMM");
    }
    return "";
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        handleClose();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubmit = () => {
    const event = { preventDefault: () => {} };
    document.querySelector("#dateRangePickerSubmitButton").click();
  };

  return (
    <section className="booking-mobile d-lg-none ms-auto">
      <div className="booking-mobile-content d-flex w-100 gap-2">
        <div className="d-flex">
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
                  {formatDate(startDate)}
                  <span className="mx-1">-</span>
                  {formatDate(endDate)}
                </span>
              </div>
            ) : (
              <span className="text-primary">Select dates</span>
            )}
          </button>
        </div>
        {userData && userData.name && (
          <button
            type="submit"
            className="btn btn-primary px-2 d-flex flex-column justify-content-center ms-auto"
            onClick={handleSubmit}
            disabled={!startDate || !endDate}
          >
            Book venue
          </button>
        )}
      </div>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body className="p-2 p-sm-3">
          <DateRangePicker
            venue={venue}
            onDateChange={onDateChange}
            handleClose={handleClose}
            startDate={startDate}
            endDate={endDate}
            onBookingSuccess={onBookingSuccess}
            handleSubmit={handleSubmit}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </section>
  );
}

export default BookingMobile;
