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
import { Spinner } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

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

  const profileUrl = `${API_BASE_URL}profiles/${userData.name}/`;
  const profileVenuesUrl = `${profileUrl}venues?_bookings=true&_venues=true`;
  const profileBookingsUrl = `${profileUrl}bookings?_venue=true&_customer=true`;

  const { sendRequest: sendProfileRequest } = useManageUser(profileUrl);
  const { sendRequest: sendVenuesRequest } = useManageUser(profileVenuesUrl);
  const { sendRequest: sendBookingsRequest } =
    useManageUser(profileBookingsUrl);

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

  // Fetch profile data
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

  // Fetch profile venue data
  useEffect(() => {
    const fetchVenueData = async () => {
      try {
        setLoaderShow(true);
        const data = await sendVenuesRequest("GET");
        setVenueData(data.data || []); // Ensure venueData is an array
      } catch (error) {
        console.error("Failed to fetch venue data:", error);
      } finally {
        setLoaderShow(false);
      }
    };

    fetchVenueData();
  }, [sendVenuesRequest]);

  // Fetch profile bookings data
  useEffect(() => {
    const fetchBookingsData = async () => {
      try {
        setLoaderShow(true);
        const data = await sendBookingsRequest("GET");
        console.log(data);
        setBookingData(data.data || []); // Ensure bookingData is an array
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

  const handleAvatarClick = () => {
    setEditType("avatar");
    setModalShow(true);
  };

  const handleBannerClick = () => {
    setEditType("banner");
    setModalShow(true);
  };

  const handleBioClick = () => {
    setEditType("bio");
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
        <h2 className="">About {userName}</h2>
        {userData.bio ? (
          <>
            <p>{userData.bio}</p>
            <button className="btn btn-primary w-100" onClick={handleBioClick}>
              Change bio
            </button>
          </>
        ) : (
          <>
            <p>{userData.bio}</p>
            <button className="btn btn-primary w-100" onClick={handleBioClick}>
              Add a bio
            </button>
          </>
        )}
      </section>
      <div className="container-fluid">
        <div className="row">
          <section className="mb-5 col-lg-6">
            <div className="d-flex align-items-center">
              <h2>Your venues</h2>
              <Link className="ms-auto" to={`/admin`}>
                Manage venues
              </Link>
            </div>
            {venueData.length > 0 ? (
              venueData.map((venue, index) => (
                <article
                  className="profile-venues card bg-secondary-subtle border-0 mb-3"
                  key={index}
                  onClick={(e) => handleNavigate(`/venue/${venue.id}`, e)}
                >
                  <div className="row g-0">
                    <div className="col-3">
                      <img
                        className="img-fluid h-100 rounded-start"
                        src={venue.media[0]?.url || "/images/placeholder.jpg"}
                        alt={venue.media[0]?.alt || "Venue main image"}
                      />
                    </div>
                    <div className="col-9">
                      <div className="card-body h-100 p-2 d-flex flex-column ">
                        <div>
                          <h2 className="fs-5">{venue.name}</h2>
                          {venue.rating > 0 && (
                            <div className="card-rating d-flex align-items-center gap-1">
                              <img src="/icons/star.svg" alt="star rating" />
                              <span>{venue.rating}</span>
                            </div>
                          )}
                        </div>
                        <p className="card-text">
                          {venue.location.city}, {venue.location.country}
                        </p>
                        <div className="d-flex mt-auto">
                          <div className="mt-auto">
                            <span>Price: </span>
                            <span>{venue.price},-</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <p>You have not created any venues</p>
            )}
          </section>
          <section className="mb-5 col-lg-6">
            <div className="d-flex align-items-center">
              <h2>Your bookings</h2>
              <Link className="ms-auto" to={`/bookings`}>
                Manage bookings
              </Link>
            </div>
            {bookingData.length > 0 ? (
              bookingData.map((booking) => (
                <article
                  key={booking.id}
                  className="profile-bookings card bg-secondary-subtle border-0 mb-3"
                  onClick={(e) =>
                    handleNavigate(`/venue/${booking.venue.id}`, e)
                  }
                >
                  <div className="row g-0">
                    <div className="col-3">
                      <img
                        className="booking-image img-fluid h-100 rounded-start"
                        src={
                          booking.venue.media[0]?.url ||
                          "/images/placeholder.jpg"
                        }
                        alt={booking.venue.media[0]?.alt || "Venue main image"}
                      />
                    </div>
                    <div className="col-9 col-md-7 p-2">
                      <div className="display-6 fs-4">{booking.venue.name}</div>
                      <div>
                        <span className="fw-semibold">Guests: </span>
                        <span>{booking.guests}</span>
                      </div>
                      <div className="d-flex gap-1">
                        <span className="fw-semibold">Dates:</span>
                        <span>
                          {new Date(booking.dateFrom).toLocaleDateString()}
                        </span>
                        <span>{"-"}</span>
                        <span>
                          {new Date(booking.dateTo).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="col-0 col-md-2 d-flex flex-column p-2">
                      <button
                        className="btn btn-warning"
                        onClick={(e) =>
                          handleNavigate(`/venue/${booking.venue.id}`, e)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger mt-md-auto"
                        onClick={(e) =>
                          handleNavigate(`/venue/${booking.venue.id}`, e)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <p>You have not booked any venues</p>
            )}
          </section>
        </div>
      </div>
      <ModalUserEdit
        show={modalShow}
        onHide={() => setModalShow(false)}
        editType={editType}
        onUpdateSuccess={refreshProfileData}
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
