import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../constants/apiUrls";
import useApi from "../../hooks/useApi";
import ImageCarousel from "../../components/ImageCarousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faPaw,
  faUtensils,
  faCar,
  faArrowLeft,
  faEnvelope,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import BookingDesktop from "./BookingDesktop";
import BookingMobile from "./BookingMobile";
import { Offcanvas, Image } from "react-bootstrap";
import ModalImage from "../../components/Modals/ModalImage";
import {
  capitalizeWords,
  replaceSpecialCharacters,
} from "../../utilities/TextHandling";
import sliceText from "../../utilities/TextSlicing";

function Venue() {
  const [showCanvas, setShowCanvas] = useState(false);
  const [placement, setPlacement] = useState("start");
  const [showModal, setShowModal] = useState(false);
  const [activeImageUrl, setActiveImageUrl] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [venueData, setVenueData] = useState(null);

  const navigate = useNavigate();

  let { id } = useParams();
  const result = useApi(
    `${API_BASE_URL}venues/${id}?_owner=true&_bookings=true`
  );
  const data = result.data ? result.data[0] : null;

  useEffect(() => {
    if (data) {
      setVenueData(data);
      console.log(data);
    }
  }, [data]);

  const handleBookingSuccess = (newBooking) => {
    setVenueData((prevVenueData) => ({
      ...prevVenueData,
      bookings: [...prevVenueData.bookings, newBooking.data],
    }));
  };

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    const updatePlacement = () => {
      setPlacement(window.innerWidth < 992 ? "bottom" : "start");
    };
    window.addEventListener("resize", updatePlacement);
    updatePlacement();
    return () => window.removeEventListener("resize", updatePlacement);
  }, []);

  const handleShow = () => {
    setShowCanvas(true);
  };

  const handleClose = () => {
    setShowCanvas(false);
  };

  const openModalWithImage = (url) => {
    setActiveImageUrl(url);
    setShowModal(true);
  };

  if (!venueData) {
    return <div>Loading...</div>;
  }
  const images = venueData.media;
  const offers = venueData.meta;

  const offerIcons = {
    wifi: faWifi,
    pets: faPaw,
    breakfast: faUtensils,
    parking: faCar,
  };

  const renderOfferItems = () => {
    return Object.entries(offers).map(([key, value]) => {
      if (value) {
        const Icon = offerIcons[key];
        return (
          <li key={key} className="mb-4">
            <FontAwesomeIcon icon={Icon} size="xl" />{" "}
            <span className="fs-5">{capitalizeFirstLetter(key)}</span>
          </li>
        );
      }
      return null;
    });
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function goBack() {
    navigate(-1);
  }

  return (
    <>
      <article className="venue mb-3">
        <div className="venue-header-container m-2 d-flex align-items-center">
          <button className="go-back-btn btn outline-dark p-1" onClick={goBack}>
            <FontAwesomeIcon icon={faArrowLeft} size="xl" />
          </button>
          <BookingMobile
            venue={venueData}
            onDateChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            onBookingSuccess={handleBookingSuccess}
          />
        </div>
        <ImageCarousel images={images} handleShow={handleShow} />
        <div className="row m-0 container-fluid px-sm-3">
          <div className="col-lg-8 p-0">
            <section className="venue-text">
              <h1 className="fs-3 my-3">{venueData.name}</h1>
              <div className="d-flex align-items-center gap-2 mb-3 text-secondary">
                <div className="d-flex align-items-center gap-1">
                  <span className="fw-semibold">{venueData.maxGuests}</span>
                  <span>Guests</span>
                </div>
                <FontAwesomeIcon icon={faCircle} size="2xs" />
                <div className="d-flex align-items-center gap-1">
                  <FontAwesomeIcon icon={faDollarSign} color="#efb41d" />
                  <span className="fw-semibold">{venueData.price},-</span>
                  <span>per night</span>
                </div>
              </div>
              <h2 className="fs-4 mb-3">Rating</h2>

              {venueData.rating > 0 ? (
                <div className="card-rating d-flex align-items-center gap-1 mb-3">
                  <img src="/icons/star.svg" alt="star rating" />
                  <span>{venueData.rating}</span>
                </div>
              ) : (
                <div className="card-rating d-flex align-items-center gap-1 mb-3">
                  <span className="text-secondary">
                    No rating yet for this venue
                  </span>
                </div>
              )}

              <h2 className="fs-4 mb-3">Description</h2>
              <p className="venue-description fs-6 lead">
                {venueData.description}
              </p>
              <hr />
              <div className="host-container d-flex align-items-center p-2 ps-0">
                <Image src={venueData.owner.avatar.url} roundedCircle />
                <div className="host-name ms-2">
                  <span>
                    {capitalizeWords(
                      replaceSpecialCharacters(venueData.owner.name)
                    )}{" "}
                    is your host
                  </span>
                  <div className="host-email mt-2 d-flex d-sm-none">
                    <span>{venueData.owner.email}</span>
                  </div>
                  <div className="host-email mt-2 d-none d-sm-flex align-items-center gap-1">
                    <FontAwesomeIcon icon={faEnvelope} size="lg" />
                    <span>{venueData.owner.email}</span>
                  </div>
                </div>
              </div>
              <hr />
              <h2 className="fs-3 mb-3">This place offers</h2>
              <ul className="offers">{renderOfferItems()}</ul>
              <hr />
            </section>
            <figure className="mb-5 w-100">
              <picture>
                <source
                  media="(min-width:768px)"
                  srcSet="/images/map-placeholder-desktop.jpg"
                />
                <source
                  media="(max-width:768px)"
                  srcSet="/images/map-placeholder-mobile.jpg"
                />
                <img
                  src="images/map-placeholder-desktop.jpg"
                  alt="Venue location on a map"
                  className="h-100 rounded-4"
                />
              </picture>
              {(venueData.location.city || venueData.location.country) && (
                <figcaption>
                  <address className="mb-1 fw-semibold fs-4">
                    {sliceText(venueData.location.address, 50)}
                  </address>
                  <address className="fst-italic fs-5">
                    {sliceText(venueData.location.city, 30)},{" "}
                    {sliceText(venueData.location.country, 30)}
                  </address>
                </figcaption>
              )}
            </figure>
          </div>
          <BookingDesktop
            venue={venueData}
            onDateChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            onBookingSuccess={handleBookingSuccess}
          />
        </div>
      </article>
      <Offcanvas
        className="canvas-venue"
        show={showCanvas}
        onHide={handleClose}
        placement={placement}
      >
        <Offcanvas.Header closeButton onHide={handleClose}>
          <Offcanvas.Title>All Images</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="container-fluid">
            <div className="row">
              {images.map((image, idx) => (
                <div
                  key={idx}
                  className="venue-offcanvas-img-container col-12 col-sm-6 col-md-4 mb-3"
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="img-fluid rounded-3"
                    onClick={() => openModalWithImage(image.url)}
                  />
                </div>
              ))}
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <ModalImage
        show={showModal}
        imageUrl={activeImageUrl}
        onHide={() => setShowModal(false)}
      />
    </>
  );
}

export default Venue;
