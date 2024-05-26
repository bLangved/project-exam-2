import React, { useState, useEffect, useContext } from "react";
import { format, differenceInDays, startOfDay } from "date-fns";
import Calendar from "./Calendar";
import useManageUser from "../../hooks/useManageUser";
import { API_BASE_URL } from "../../constants/apiUrls";
import ModalConfirmation from "../Modals/ModalConfirmation";
import { UserProfileContext } from "../../contexts/ProfileDataContext";
import { useNavigate } from "react-router-dom";

const DateRangePicker = ({
  venue,
  onDateChange,
  handleClose,
  startDate,
  endDate,
  onBookingSuccess,
  handleSubmit,
}) => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserProfileContext);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [priceChange, setPriceChange] = useState(null);
  const [guests, setGuests] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const toDateString = (date) =>
    date ? format(startOfDay(date), "dd.MMMM.yyyy") : "";

  useEffect(() => {
    if (startDate && endDate) {
      setSelectedStartDate(startDate);
      setSelectedEndDate(endDate);
      calculateTotalPrice(startDate, endDate);
    }
  }, [startDate, endDate]);

  const handleDateSelection = (startDate, endDate) => {
    if (startDate !== selectedStartDate || endDate !== selectedEndDate) {
      setSelectedStartDate(startDate);
      setSelectedEndDate(endDate);
      onDateChange(startDate, endDate);
      calculateTotalPrice(startDate, endDate);
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

  const handleSubmitLocal = async (event) => {
    event.preventDefault();
    if (selectedStartDate && selectedEndDate) {
      const bookingData = {
        dateFrom: toDateString(selectedStartDate),
        dateTo: toDateString(selectedEndDate),
        guests: guests,
        venueId: venue.id,
      };
      try {
        const data = await sendRequest("POST", bookingData);
        if (onBookingSuccess) {
          onBookingSuccess(data);
          setModalTitle("Booking registered");
          setModalMessage(
            `Booking successful. This venue is now booked from ${bookingData.dateFrom} to ${bookingData.dateTo}.`
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

  const formatDate = (date) => {
    if (date) {
      return format(date, "d. MMMM");
    }
    return "";
  };

  const handleClick = (location) => {
    navigate(`/${location}`);
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
                <span>{formatDate(selectedStartDate)}</span>
                <span className="mx-1">-</span>
                <span>{formatDate(selectedEndDate)}</span>
              </div>
            </div>
          ) : (
            <div>
              <span>{formatDate(selectedStartDate)}</span>
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
      {userData && userData.name && (
        <button
          type="button"
          className="btn btn-secondary w-100 d-lg-none"
          onClick={handleClose}
        >
          Save
        </button>
      )}
      <hr className="d-none d-lg-block" />
      {userData && userData.name ? (
        <button
          id="dateRangePickerSubmitButton"
          type="submit"
          className="btn btn-primary w-100 mt-3 d-none d-lg-block"
          onClick={handleSubmitLocal}
          disabled={!selectedStartDate || !selectedEndDate}
        >
          Book venue
        </button>
      ) : (
        <>
          <div>
            <div>You need to be logged in to book a venue.</div>
            <button
              className="btn btn-link p-0"
              onClick={() => handleClick("login")}
            >
              Log in here
            </button>
          </div>
        </>
      )}
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
