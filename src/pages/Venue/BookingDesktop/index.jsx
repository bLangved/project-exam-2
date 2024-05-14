import React from "react";
import DateRangePicker from "../../../components/DateRangePicker";

function BookingDesktop({ venue, onDateChange, startDate, endDate }) {
  return (
    <section className="booking-desktop position-relative d-none d-lg-block col-lg-4 mb-3 pe-0">
      <div className="booking-desktop-content position-sticky bg-body-tertiary text-dark rounded-3 shadow">
        <div className="w-100 d-flex flex-column p-3">
          <DateRangePicker
            venue={venue}
            onDateChange={onDateChange}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
      </div>
    </section>
  );
}

export default BookingDesktop;
