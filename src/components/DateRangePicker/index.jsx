import React, { useState } from "react";
import { format, parseISO } from "date-fns";
import "bootstrap/dist/css/bootstrap.min.css";

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const formatDate = (dateString) => {
    if (dateString) {
      return format(parseISO(dateString), "d. MMMM");
    }
    return "";
  };

  return (
    <div className="container my-3">
      <div className="d-flex justify-content-center my-2 fw-semibold">
        {startDate || endDate ? (
          <>
            <span>{formatDate(startDate)}</span>
            <span className="mx-1">-</span>
            <span>{formatDate(endDate)}</span>
          </>
        ) : (
          <span>Enter a date</span>
        )}
      </div>
      <form className="row">
        <div className="form-group p-0 pe-1 col-6">
          <label htmlFor="start-date">Start Date</label>
          <input
            type="date"
            className="form-control"
            id="start-date"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>
        <div className="form-group p-0 ps-1 col-6">
          <label htmlFor="end-date">End Date</label>
          <input
            type="date"
            className="form-control"
            id="end-date"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Book avenue
        </button>
      </form>
    </div>
  );
};

export default DateRangePicker;
