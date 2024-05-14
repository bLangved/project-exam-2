import React, { useState } from "react";
import { format, parseISO, differenceInDays } from "date-fns";
import Calendar from "./Calendar";
import useManageUser from "../../hooks/useManageUser";
import { API_BASE_URL } from "../../constants/apiUrls";

const DateRangePicker = ({
  venue,
  onDateChange,
  handleClose,
  startDate,
  endDate,
}) => {
  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate);
  const [priceChange, setPriceChange] = useState(null);
  const [guests, setGuests] = useState(1);

  const handleDateSelection = (startDate, endDate) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
    onDateChange(startDate, endDate);
    calculateTotalPrice(startDate, endDate);
  };

  const calculateTotalPrice = (startDate, endDate) => {
    if (startDate && endDate) {
      const days = differenceInDays(parseISO(endDate), parseISO(startDate)) + 1;
      const price = venue.price * days;
      setPriceChange(price);
    } else {
      setPriceChange(null);
    }
  };

  const { sendRequest } = useManageUser(`${API_BASE_URL}bookings/`);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedStartDate && selectedEndDate) {
      const bookingData = {
        startDate: selectedStartDate,
        endDate: selectedEndDate,
        guests: guests,
        venueId: venue.id,
      };
      try {
        const data = await sendRequest("POST", bookingData);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please select both start and end dates.");
    }
  };

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
                {differenceInDays(
                  parseISO(selectedEndDate),
                  parseISO(selectedStartDate)
                )}{" "}
                days
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
        onPriceChange={priceChange}
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
    </div>
  );
};

export default DateRangePicker;
