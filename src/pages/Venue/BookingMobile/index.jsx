import React from "react";

function BookingMobile() {
  return (
    <section className="booking-mobile position-fixed d-lg-none w-100 bg-body-tertiary text-dark rounded-top-5 shadow-lg">
      <div className="mx-4 h-100 d-flex align-items-center">
        <div className="fs-6 col-6 d-flex flex-column">
          <span className="fw-bolder">Information</span>
          <span className="fst-italic">2.-7.June</span>
        </div>
        <button className="btn btn-primary ms-auto col-6">Book avenue</button>
      </div>
    </section>
  );
}

export default BookingMobile;
