import React, { useState, useEffect, useContext } from "react";
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
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import BookingDesktop from "./BookingDesktop";
import BookingMobile from "./BookingMobile";
import { Offcanvas, Image } from "react-bootstrap";
import ModalImage from "../../components/Modals/ModalImage";
import {
  capitalizeWords,
  replaceSpecialCharacters,
} from "../../utilities/TextHandling";

function Venue() {
  const [showCanvas, setShowCanvas] = useState(false);
  const [placement, setPlacement] = useState("start");
  const [showModal, setShowModal] = useState(false);
  const [activeImageUrl, setActiveImageUrl] = useState("");

  const navigate = useNavigate();

  let { id } = useParams();
  const result = useApi(`${API_BASE_URL}venues/${id}?_owner=true`);
  const data = result.data[0];

  console.log(data);

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

  if (!data) {
    return <div>Loading...</div>;
  }
  const images = data.media;
  const offers = data.meta;

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
      <article className="venue">
        <div className="m-3 d-flex">
          <button className="btn outline-dark" onClick={goBack}>
            <FontAwesomeIcon icon={faArrowLeft} size="xl" />
          </button>
          <button className="btn outline-dark ms-auto ">
            <FontAwesomeIcon icon={faHeart} size="xl" />
          </button>
        </div>
        <ImageCarousel images={images} handleShow={handleShow} />
        <div className="row w-100">
          <div className="col-lg-8">
            <section className="venue-text px-3">
              <h1 className="fs-3 my-3">{data.name}</h1>
              {/* <p>{data.location.address}</p>
              <p>{data.location.city}</p> */}
              <h2 className="fs-4 mb-3">Rating</h2>

              {data.rating > 0 ? (
                <div className="card-rating d-flex align-items-center gap-1 mb-3">
                  <img src="/icons/star.svg" alt="star rating" />
                  <span>{data.rating}</span>
                </div>
              ) : (
                <div className="card-rating d-flex align-items-center gap-1 mb-3">
                  {/* <img src="/icons/star.svg" alt="star rating" /> */}
                  <span className="text-secondary">
                    No rating yet for this venue
                  </span>
                </div>
              )}

              <h2 className="fs-4 mb-3">Description</h2>
              <p className="fs-6 lead">{data.description}</p>
              <hr />
              <div className="host-container d-flex align-items-center p-2 ps-0">
                <Image src={data.owner.avatar.url} roundedCircle />
                <div className="ms-2">
                  <span>
                    {capitalizeWords(replaceSpecialCharacters(data.owner.name))}
                  </span>
                  <span className="ms-1">is your host</span>
                  <div className="mt-2">
                    <span>Email: </span>
                    <span>{data.owner.email}</span>
                  </div>
                </div>
              </div>
              <hr />
              <h2 className="fs-3 mb-3">This place offers</h2>
              <ul className="offers">{renderOfferItems()}</ul>
              <hr />
            </section>
            <figure className="px-3 px-md-4 mb-5 w-100">
              <picture className="">
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
              <figcaption className="">
                <address className="mb-1 fw-semibold fs-4">
                  {data.location.address}
                </address>
                <address className="mb-1 fst-italic fs-5">
                  {data.location.city}, {data.location.country}
                </address>
              </figcaption>
            </figure>
          </div>
          <BookingDesktop />
        </div>
        <BookingMobile />
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
