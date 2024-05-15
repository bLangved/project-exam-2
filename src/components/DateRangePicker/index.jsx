import React, { useState, useEffect } from "react";
import { format, parseISO, differenceInDays, startOfDay } from "date-fns";
import Calendar from "./Calendar";
import useManageUser from "../../hooks/useManageUser";
import { API_BASE_URL } from "../../constants/apiUrls";
import ModalConfirmation from "../Modals/ModalConfirmation";

const DateRangePicker = ({
  venue,
  onDateChange,
  handleClose,
  startDate,
  endDate,
  onBookingSuccess,
}) => {
  const [selectedStartDate, setSelectedStartDate] = useState(
    startDate ? startOfDay(parseISO(startDate)) : null
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    endDate ? startOfDay(parseISO(endDate)) : null
  );
  const [priceChange, setPriceChange] = useState(null);
  const [guests, setGuests] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (startDate && endDate) {
      setSelectedStartDate(startOfDay(parseISO(startDate)));
      setSelectedEndDate(startOfDay(parseISO(endDate)));
      calculateTotalPrice(
        startOfDay(parseISO(startDate)),
        startOfDay(parseISO(endDate))
      );
    }
  }, [startDate, endDate]);

  const handleDateSelection = (startDate, endDate) => {
    const parsedStartDate = startOfDay(parseISO(startDate));
    const parsedEndDate = startOfDay(parseISO(endDate));
    if (
      parsedStartDate !== selectedStartDate ||
      parsedEndDate !== selectedEndDate
    ) {
      setSelectedStartDate(parsedStartDate);
      setSelectedEndDate(parsedEndDate);
      onDateChange(parsedStartDate.toISOString(), parsedEndDate.toISOString());
      calculateTotalPrice(parsedStartDate, parsedEndDate);
    }
  };

  const calculateTotalPrice = (startDate, endDate) => {
    if (startDate && endDate) {
      const days = differenceInDays(endDate, startDate) + 1;
      const price = venue.price * days;
      setPriceChange(price);
    } else {
      setPriceChange(null);
    }
  };

  const { sendRequest } = useManageUser(`${API_BASE_URL}bookings`);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedStartDate && selectedEndDate) {
      const bookingData = {
        dateFrom: selectedStartDate.toISOString(),
        dateTo: selectedEndDate.toISOString(),
        guests: guests,
        venueId: venue.id,
      };
      console.log(bookingData);
      try {
        const data = await sendRequest("POST", bookingData);
        console.log(data);
        if (onBookingSuccess) {
          onBookingSuccess(data);
          setModalTitle("Booking registered");
          setModalMessage(
            `Booking successful. This venue is now booked from ${selectedStartDate.toISOString()} to ${selectedEndDate.toISOString()}.`
          );
          setShowModal(true);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("error");
    }
  };
  const handleCloseModal = () => setShowModal(false);

  const formatDate = (dateString) => {
    if (dateString) {
      return format(parseISO(dateString), "d. MMMM");
    }
    return "";
  };

  return (
    <div className="my-3">
      <div className="d-flex my-2 fw-semibold">
        {selectedStartDate ? (
          selectedEndDate ? (
            <div>
              <span className="fs-4 ">
                {differenceInDays(selectedEndDate, selectedStartDate)} days
              </span>
              <div>
                <span>{formatDate(selectedStartDate.toISOString())}</span>
                <span className="mx-1">-</span>
                <span>{formatDate(selectedEndDate.toISOString())}</span>
              </div>
            </div>
          ) : (
            <div>
              <span>{formatDate(selectedStartDate.toISOString())}</span>
              <span className="mx-1">-</span>
            </div>
          )
        ) : (
          <span className="fs-5 fw-semibold">Choose your dates</span>
        )}
      </div>
      <Calendar
        bookings={venue.bookings}
        onDateChange={handleDateSelection}
        priceChange={priceChange}
        maxGuests={venue.maxGuests}
        guests={guests}
        setGuests={setGuests}
      />
      <hr className="d-lg-none" />
      <button
        type="button"
        className="btn btn-secondary w-100 d-lg-none"
        onClick={handleClose}
      >
        Save
      </button>
      <hr className="d-none d-lg-block" />
      <button
        type="submit"
        className="btn btn-primary w-100 mt-3 d-none d-lg-block"
        onClick={handleSubmit}
        disabled={!selectedStartDate || !selectedEndDate}
      >
        Book venue
      </button>
      <ModalConfirmation
        title={modalTitle}
        message={modalMessage}
        show={showModal}
        handleClose={handleCloseModal}
      />
    </div>
  );
};

export default DateRangePicker;
