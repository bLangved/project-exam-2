import React from "react";
import DateRangePicker from "../../../components/DateRangePicker";

function BookingDesktop() {
  return (
    <section className="booking-desktop position-relative d-none d-lg-block col-lg-4">
      <div className="booking-desktop-content position-sticky bg-body-tertiary text-dark rounded-3 shadow">
        <div className="w-100 d-flex flex-column p-3">
          <span className="fs-5 fw-bolder">Order details</span>
          <DateRangePicker />
          <hr />
          <div className="d-flex gap-2 fs-4">
            <span className="fw-bolder">Total:</span>
            <span>1099,-</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookingDesktop;