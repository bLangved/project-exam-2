import React from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../constants/apiUrls";
import useApi from "../../hooks/useApi";
import StarRating from "../../components/StarRating";
import ImageCarousel from "../../components/ImageCarousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faPaw,
  faUtensils,
  faCar,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import BookingDesktop from "./BookingDesktop";
import BookingMobile from "./BookingMobile";

function Venue() {
  let { id } = useParams();
  const endpoint = "venues/";
  const result = useApi(`${API_BASE_URL}${endpoint}${id}`);
  const data = result.data[0];
  console.log(data);

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
            <FontAwesomeIcon icon={Icon} size="2xl" />{" "}
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

  return (
    <article className="venue">
      <ImageCarousel images={images} />
      <div className="row w-100">
        <div className="col-lg-8">
          <section className="venue-text px-3">
            <h1 className="my-3">{data.name}</h1>
            <p>{data.location.address}</p>
            <p>{data.location.city}</p>
            <h2 className="mb-3">Rating</h2>
            <div className="star-rating mb-3">
              <StarRating rating={data.rating} />
            </div>
            <h2 className="mb-3">Description</h2>
            <p className="lead">{data.description}</p>
            <hr />
            <div className="d-flex align-items-center p-2 ps-0">
              <FontAwesomeIcon icon={faCircleUser} size="2xl" />
              <div className="ms-2">
                <span>Username</span>
                <span className="ms-1">is your host</span>
              </div>
            </div>
            <hr />
            <h2 className="mb-3">This place offers</h2>
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
  );
}

export default Venue;
