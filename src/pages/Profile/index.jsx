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

function Profile() {
  const { userData, setUserData } = useContext(UserProfileContext);
  const [venueData, setVenueData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [editType, setEditType] = useState(null);
  const [avatarError, setAvatarError] = useState(false);
  const [bannerError, setBannerError] = useState(false);
  const [loaderShow, setLoaderShow] = useState(true); // Initially true to show loader while fetching initial data

  const profileUrl = `${API_BASE_URL}profiles/${userData.name}/`;
  const profileVenuesUrl = `${profileUrl}venues?_bookings=true&_venues=true`;
  const profileBookingsUrl = `${profileUrl}bookings?_bookings=true&_venues=true`;

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
      <div className="container">
        <div className="row">
          <section className="mb-5 col-lg-6">
            <h2>Your venues</h2>
            {venueData.length > 0 ? (
              venueData.map((venue) => (
                <div key={venue.id} className="profile-venues">
                  <Image
                    src={
                      venue.media[0]?.url || "/images/banner-placeholder.jpg"
                    }
                    alt={venue.media[0]?.alt || "Venue image"}
                    fluid
                  />
                  <div className="d-flex flex-column">
                    <span>Title: {venue.name}</span>
                    <span>
                      Location: {venue.location.city}, {venue.location.country}
                    </span>
                    <span>Price: ${venue.price}</span>
                  </div>
                </div>
              ))
            ) : (
              <p>No venues found</p>
            )}
          </section>
          <section className="mb-5 col-lg-6">
            <h2>Your bookings</h2>
            {bookingData.length > 0 ? (
              bookingData.map((booking) => (
                <div key={booking.id} className="profile-bookings">
                  <div className="d-flex flex-column">
                    <span>
                      From: {new Date(booking.dateFrom).toLocaleDateString()}
                    </span>
                    <span>
                      To: {new Date(booking.dateTo).toLocaleDateString()}
                    </span>
                    <span>Guests: {booking.guests}</span>
                  </div>
                </div>
              ))
            ) : (
              <p>No bookings found</p>
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
