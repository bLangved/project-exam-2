import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import useManageUser from "../../hooks/useManageUser";
import { API_BASE_URL } from "../../constants/apiUrls";
import {
  capitalizeWords,
  replaceSpecialCharacters,
} from "../../utilities/TextHandling";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [venueData, setVenueData] = useState(null);
  const [bookingData, setBookingData] = useState(null);

  const userId = JSON.parse(localStorage.getItem("userName"));
  const profileUrl = `${API_BASE_URL}profiles/${userId}/`;
  const profileVenuesUrl = `${profileUrl}venues`;
  const profileBookingsUrl = `${profileUrl}bookings`;
  const { sendRequest: sendProfileRequest } = useManageUser(profileUrl);
  const { sendRequest: sendVenuesRequest } = useManageUser(profileVenuesUrl);
  const { sendRequest: sendBookingsRequest } =
    useManageUser(profileBookingsUrl);

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
    const fetchVenueData = async () => {
      try {
        const data = await sendVenuesRequest("GET");
        setBookingData(data);
        console.log("Booking Data:", data);
      } catch (error) {
        console.error("Failed to fetch booking data:", error);
      }
    };

    fetchVenueData();
  }, [sendBookingsRequest]);

  if (!userData) return <div>Loading...</div>;

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

  return (
    <article className="profile">
      <div>
        <Image src={bannerUrl} alt={bannerAlt} fluid />
      </div>
      <div className="profile-avatar mx-auto position-relative border border-primary-subtle border-4 rounded-circle shadow">
        <Image
          src={avatarUrl}
          alt={avatarAlt}
          roundedCircle
          className="object-fit-cover h-100"
        />
      </div>
      <section className="container profile-about mb-5">
        <h1 className="text-center mb-5 display-3">{userName}</h1>

        <h2 className="">About {userName}</h2>
        {bio ? (
          <>
            <p>{bio}</p>
            <button className="btn btn-primary w-100">Change bio</button>
          </>
        ) : (
          <>
            <p>{bio}</p>
            <button className="btn btn-primary w-100">Add a bio</button>
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
    </article>
  );
}

export default Profile;
