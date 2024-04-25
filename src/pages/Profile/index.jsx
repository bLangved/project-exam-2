import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import useManageUser from "../../hooks/useManageUser";
import { API_BASE_URL } from "../../constants/apiUrls";
import {
  capitalizeWords,
  replaceSpecialCharacters,
} from "../../utilities/TextHandling";
import ModalUserEdit from "../../components/Modals/ModalUserEdit";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [venueData, setVenueData] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [editType, setEditType] = useState(null);

  const userId = JSON.parse(localStorage.getItem("userName"));
  const profileUrl = `${API_BASE_URL}profiles/${userId}/`;
  const profileVenuesUrl = `${profileUrl}venues`;
  const profileBookingsUrl = `${profileUrl}bookings`;
  const { sendRequest: sendProfileRequest } = useManageUser(profileUrl);
  const { sendRequest: sendVenuesRequest } = useManageUser(profileVenuesUrl);
  const { sendRequest: sendBookingsRequest } =
    useManageUser(profileBookingsUrl);

  function refreshProfileData() {
    const fetchData = async () => {
      try {
        const data = await sendProfileRequest("GET");
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    };

    fetchData();
  }

  // Profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await sendProfileRequest("GET");
        setUserData(data);
        console.log("Profile Data:", data);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    };

    fetchProfileData();
  }, [sendProfileRequest]);

  // Profile venue data
  useEffect(() => {
    const fetchVenueData = async () => {
      try {
        const data = await sendVenuesRequest("GET");
        setVenueData(data);
        console.log("Venue Data:", data);
      } catch (error) {
        console.error("Failed to fetch venue data:", error);
      }
    };

    fetchVenueData();
  }, [sendVenuesRequest]);

  // Profile bookings data
  useEffect(() => {
    const fetchBookingsData = async () => {
      try {
        const data = await sendBookingsRequest("GET");
        setBookingData(data);
        console.log("Booking Data:", data);
      } catch (error) {
        console.error("Failed to fetch booking data:", error);
      }
    };

    fetchBookingsData();
  }, [sendBookingsRequest]);

  if (!userData) return <div>Loading...</div>;

  // User data
  const {
    avatar = {},
    banner = {},
    bio = "",
    name: apiName = "Username",
  } = userData.data;
  const bannerUrl = banner.url || "/images/banner-placeholder.jpg";
  const bannerAlt = banner.alt || "Profile banner";
  const avatarUrl = avatar.url || "/images/placeholder.jpg";
  const avatarAlt = avatar.alt || "Profile image";
  const userName = capitalizeWords(replaceSpecialCharacters(apiName));

  // // Venue data
  // const {
  //   avatar = {},
  //   banner = {},
  // } = venueData.data;
  // const bannerUrl = banner.url || "/images/banner-placeholder.jpg";
  // const bannerAlt = banner.alt || "Profile banner";

  // // Booking data
  // const {
  //   avatar = {},
  //   banner = {},
  // } = bookingData.data;
  // const bannerUrl = banner.url || "/images/banner-placeholder.jpg";
  // const bannerAlt = banner.alt || "Profile banner";

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
          src={bannerUrl}
          alt={bannerAlt}
          fluid
          onClick={handleBannerClick}
        />
      </div>
      <div className="profile-avatar mx-auto position-relative border border-primary-subtle border-4 rounded-circle shadow">
        <Image
          src={avatarUrl}
          alt={avatarAlt}
          roundedCircle
          className="object-fit-cover h-100"
          onClick={handleAvatarClick}
        />
      </div>
      <section className="container profile-about mb-5">
        <h1 className="text-center mb-5 display-3">{userName}</h1>

        <h2 className="">About {userName}</h2>
        {bio ? (
          <>
            <p>{bio}</p>
            <button className="btn btn-primary w-100" onClick={handleBioClick}>
              Change bio
            </button>
          </>
        ) : (
          <>
            <p>{bio}</p>
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
            <div className="profile-venues">
              <Image
                src="/images/banner-placeholder.jpg"
                alt="Banner for profile"
                fluid
              />
              <div className="d-flex flex-column">
                <span>Title</span>
                <span>Location</span>
                <span>Price</span>
              </div>
            </div>
          </section>
          <section className="mb-5 col-lg-6">
            <h2>Your bookings</h2>
            <div className="profile-bookings">
              <Image
                src="/images/banner-placeholder.jpg"
                alt="Banner for profile"
                fluid
              />
              <div className="d-flex flex-column">
                <span>Title</span>
                <span>Location</span>
                <span>Price</span>
              </div>
            </div>
          </section>
        </div>
      </div>
      <ModalUserEdit
        show={modalShow}
        onHide={() => setModalShow(false)}
        editType={editType}
        onUpdateSuccess={refreshProfileData}
      />
    </article>
  );
}

export default Profile;
