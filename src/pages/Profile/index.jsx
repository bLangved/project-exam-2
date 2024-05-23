import React, { useEffect, useState, useContext } from "react";
import { UserProfileContext } from "../../contexts/ProfileDataContext";
import { Image } from "react-bootstrap";
import useManageUser from "../../hooks/useManageUser";
import { API_BASE_URL } from "../../constants/apiUrls";
import {
  capitalizeWords,
  replaceSpecialCharacters,
} from "../../utilities/TextHandling";
import ModalUserEdit from "../../components/Modals/ModalUserEdit";
import ModalUserDelete from "../../components/Modals/ModalUserDelete";
import ModalConfirmation from "../../components/Modals/ModalConfirmation";
import { Spinner } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faCalendarDays,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import sliceText from "../../utilities/TextSlicing";

function Profile() {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserProfileContext);
  const [venueData, setVenueData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [editType, setEditType] = useState(null);
  const [avatarError, setAvatarError] = useState(false);
  const [bannerError, setBannerError] = useState(false);
  const [loaderShow, setLoaderShow] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [bookingId, setBookingId] = useState(null);

  const profileUrl = `${API_BASE_URL}profiles/${userData.name}/`;
  const venuesUrl = `${profileUrl}venues?_bookings=true&_venues=true`;
  const bookingsUrl = `${profileUrl}bookings?_venue=true&_customer=true`;

  const { sendRequest: sendProfileRequest } = useManageUser(profileUrl);
  const { sendRequest: sendVenuesRequest } = useManageUser(venuesUrl);
  const { sendRequest: sendBookingsRequest } = useManageUser(bookingsUrl);

  function refreshProfileData() {
    const fetchData = async () => {
      try {
        setLoaderShow(true);
        const data = await sendProfileRequest("GET");
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      } finally {
        setLoaderShow(false);
      }
    };

    fetchData();
  }

  const onAvatarError = () => {
    setAvatarError(true);
  };

  const onBannerError = () => {
    setBannerError(true);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoaderShow(true);
        const data = await sendProfileRequest("GET");
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      } finally {
        setLoaderShow(false);
      }
    };

    fetchProfileData();
  }, [sendProfileRequest]);

  useEffect(() => {
    const fetchVenueData = async () => {
      try {
        setLoaderShow(true);
        const data = await sendVenuesRequest("GET");
        setVenueData(data.data || []);
      } catch (error) {
        console.error("Failed to fetch venue data:", error);
      } finally {
        setLoaderShow(false);
      }
    };

    fetchVenueData();
  }, [sendVenuesRequest]);

  useEffect(() => {
    const fetchBookingsData = async () => {
      try {
        setLoaderShow(true);
        const data = await sendBookingsRequest("GET");
        setBookingData(data.data || []);
      } catch (error) {
        console.error("Failed to fetch booking data:", error);
      } finally {
        setLoaderShow(false);
      }
    };

    fetchBookingsData();
  }, [sendBookingsRequest]);

  const userName = userData.name
    ? capitalizeWords(replaceSpecialCharacters(userData.name))
    : "User";

  const handleBannerClick = () => {
    setEditType("banner");
    setModalShow(true);
  };

  const handleAvatarClick = () => {
    setEditType("avatar");
    setModalShow(true);
  };

  const handleVenueManagerClick = () => {
    setEditType("venueManager");
    setModalShow(true);
  };

  const handleBioClick = () => {
    setEditType("bio");
    setModalShow(true);
  };
  const handleDeleteBookingClick = (bookingId) => {
    setEditType("deleteBooking");
    setBookingId(bookingId);
    setModalShow(true);
  };

  const handleNavigate = (location, event) => {
    event.stopPropagation();
    navigate(`${location}`);
  };

  return (
    <article className="profile">
      <div className="profile-banner">
        <Image
          src={
            bannerError
              ? "/images/banner-placeholder.jpg"
              : userData.banner?.url
          }
          alt={userData.banner?.alt || "Banner image"}
          onError={onBannerError}
          fluid
          onClick={handleBannerClick}
        />
      </div>
      <div className="profile-avatar mx-auto position-relative border border-primary-subtle border-4 rounded-circle shadow">
        <Image
          src={avatarError ? "/images/placeholder.jpg" : userData.avatar?.url}
          alt={userData.avatar?.alt || "Avatar image"}
          onError={onAvatarError}
          roundedCircle
          className="object-fit-cover h-100"
          onClick={handleAvatarClick}
        />
      </div>

      <section className="container profile-about mb-5">
        <h1 className="text-center mb-5 display-3">{userName}</h1>
        {userData.venueManager === false && (
          <div className="d-flex flex-column text-center my-3">
            <span>You are not a venue manager</span>
            <button
              className="btn btn-link mx-auto"
              onClick={handleVenueManagerClick}
            >
              Want to become one?
            </button>
          </div>
        )}
        <h2 className="">About {userName}</h2>
        {userData.bio ? (
          <>
            <p>{userData.bio}</p>
            <button
              className="change-bio-btn btn btn-primary w-100"
              onClick={handleBioClick}
            >
              Change bio
            </button>
          </>
        ) : (
          <>
            <p>{userData.bio}</p>
            <button
              className="change-bio-btn btn btn-primary w-100"
              onClick={handleBioClick}
            >
              Add a bio
            </button>
          </>
        )}
      </section>
      <div className="profile-venues-booking-container container-fluid mx-auto">
        {userData.venueManager === true && (
          <>
            <section className="d-flex align-items-center">
              <h2>Your venues</h2>
              <Link className="ms-auto" to={`/admin`}>
                Manage venues
              </Link>
            </section>

            <div className="card-container container-fluid">
              <div className="row mb-5">
                {venueData.length > 0 ? (
                  venueData.map((venue, index) => (
                    <div className="col-12 col-lg-6 mb-3 p-0" key={index}>
                      <article
                        className="profile-venues card bg-body-tertiary border-0 mx-lg-2"
                        onClick={(e) => handleNavigate(`/venue/${venue.id}`, e)}
                      >
                        <div className="row g-0">
                          <div className="col-3">
                            <img
                              className="venue-image img-fluid h-100 rounded-start"
                              src={
                                venue.media[0]?.url || "/images/placeholder.jpg"
                              }
                              alt={venue.media[0]?.alt || "Venue main image"}
                            />
                          </div>
                          <div className="col-9">
                            <div className="card-body h-100 p-2 ms-1 d-flex flex-column justify-content-between">
                              <span className="fw-semibold">
                                {sliceText(venue.name, 20)}
                              </span>
                              {(venue.location.city ||
                                venue.location.country) && (
                                <p className="card-text mb-auto">
                                  {venue.location.city &&
                                    sliceText(venue.location.city, 10)}
                                  {venue.location.city &&
                                    venue.location.country &&
                                    ", "}
                                  {venue.location.country &&
                                    sliceText(venue.location.country, 10)}
                                </p>
                              )}
                              <div className="d-flex align-items-center justify-content-between">
                                {venue.price !== undefined && (
                                  <div className="d-flex align-items-center gap-1">
                                    <FontAwesomeIcon
                                      icon={faDollarSign}
                                      color="#efb41d"
                                    />
                                    <span className="fw-semibold">
                                      {venue.price},-
                                    </span>
                                    <span>per night</span>
                                  </div>
                                )}
                                {venue.rating > 0 && (
                                  <div className="card-rating d-flex align-items-center gap-1">
                                    <img
                                      src="/icons/star.svg"
                                      alt="star rating"
                                    />
                                    <span>{venue.rating}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                  ))
                ) : (
                  <p className="">You have not created any venues yet</p>
                )}
              </div>
            </div>
          </>
        )}
        <section>
          <h2>Your bookings</h2>
        </section>
        <div className="card-container container-fluid">
          <div className="row mb-5">
            {bookingData.length > 0 ? (
              bookingData.map((booking, index) => (
                <div className="col-12 col-lg-6 mb-3 p-0" key={index}>
                  <article
                    className="profile-bookings card bg-body-tertiary border-0 p-0 h-100 mx-lg-2"
                    onClick={(e) =>
                      handleNavigate(`/venue/${booking.venue.id}`, e)
                    }
                  >
                    <div className="row g-0 w-100">
                      <div className="col-3">
                        <img
                          className="booking-image img-fluid h-100 rounded-start"
                          src={
                            booking.venue.media[0]?.url ||
                            "/images/placeholder.jpg"
                          }
                          alt={
                            booking.venue.media[0]?.alt || "Venue main image"
                          }
                        />
                      </div>
                      <div className="card-body col-8 p-2 ms-1  d-flex flex-column justify-content-between">
                        <span className="fw-semibold">
                          {sliceText(booking.venue.name, 20)}
                        </span>
                        <div className="d-flex align-items-center gap-1">
                          <FontAwesomeIcon
                            icon={faCalendarDays}
                            color="black"
                          />
                          <span>
                            {new Date(booking.dateFrom).toLocaleDateString()}
                          </span>
                          <span>{"-"}</span>
                          <span>
                            {new Date(booking.dateTo).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <div>
                            <span className="fw-semibold">Guests: </span>
                            <span>{booking.guests}</span>
                          </div>
                          <button
                            className="btn btn-danger ms-auto"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteBookingClick(booking.id);
                            }}
                          >
                            <FontAwesomeIcon icon={faXmark} color="white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              ))
            ) : (
              <p className="p-0">You have not booked any venues yet</p>
            )}
          </div>
        </div>
      </div>
      <ModalUserEdit
        show={modalShow}
        onHide={() => setModalShow(false)}
        editType={editType}
        onUpdateSuccess={refreshProfileData}
      />
      <ModalUserDelete
        show={modalShow}
        onHide={() => setModalShow(false)}
        editType={editType}
        refreshProfileData={refreshProfileData}
        setBookingData={setBookingData}
        bookingId={bookingId}
      />
      <ModalConfirmation
        title={modalTitle}
        message={modalMessage}
        show={showModal}
        handleClose={() => setShowModal(false)}
      />
      {loaderShow && (
        <Spinner
          variant="primary"
          animation="border"
          role="status"
          className="position-fixed top-50 start-50"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </article>
  );
}

export default Profile;
