import React, { useState } from "react";
import { format, parseISO, differenceInDays } from "date-fns";

const DateRangePicker = ({ onDateChange, handleClose }) => {
  const [startDate, setStartDate] = useState(
    () => sessionStorage.getItem("startDate") || ""
  );
  const [endDate, setEndDate] = useState(
    () => sessionStorage.getItem("endDate") || ""
  );

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    sessionStorage.setItem("startDate", newStartDate);
    setStartDate(newStartDate);
    onDateChange(newStartDate, endDate);
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    sessionStorage.setItem("endDate", newEndDate);
    setEndDate(newEndDate);
    onDateChange(startDate, newEndDate);
  };

  const formatDate = (dateString) => {
    if (dateString) {
      return format(parseISO(dateString), "d. MMMM");
    }
    return "";
  };

  const getDaysDifference = (start, end) => {
    if (start && end) {
      const startParsed = parseISO(start);
      const endParsed = parseISO(end);
      return differenceInDays(endParsed, startParsed);
    }
    return 0;
  };

  return (
    <div className="my-3">
      <div className="d-flex my-2 fw-semibold">
        {startDate || endDate ? (
          <div>
            <span className="fs-4 ">
              {getDaysDifference(startDate, endDate)} days
            </span>
            <div>
              <span>{formatDate(startDate)}</span>
              <span className="mx-1">-</span>
              <span>{formatDate(endDate)}</span>
            </div>
          </div>
        ) : (
          <span>Enter a date</span>
        )}
      </div>
      <form className="d-flex flex-column">
        <div className="form-group pe-lg-1 mb-4">
          <label htmlFor="start-date">Start Date</label>
          <input
            type="date"
            className="form-control"
            id="start-date"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>
        <div className="form-group pe-lg-1 mb-4">
          <label htmlFor="end-date">End Date</label>
          <input
            type="date"
            className="form-control"
            id="end-date"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-3 d-none d-lg-block"
        >
          Book avenue
        </button>
      </form>
      <button
        type="submit"
        className="btn btn-primary w-100 mt-3 d-lg-none"
        onClick={handleClose}
      >
        Save
      </button>
      <hr />
      <div className="d-flex gap-2 fs-4">
        <span className="fw-bolder">Total:</span>
        <span>1099,-</span>
      </div>
    </div>
  );
};

export default DateRangePicker;
