import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../../../constants/apiUrls";
import useManageUser from "../../../../hooks/useManageUser";
import { useNavigate } from "react-router-dom";

function VenueDelete() {
  const [venues, setVenues] = useState([]);
  const navigate = useNavigate();

  const userName = JSON.parse(localStorage.getItem("userName"));
  const { sendRequest } = useManageUser(
    `${API_BASE_URL}profiles/${userName}/venues/`
  );

  const fetchVenues = async () => {
    try {
      const response = await sendRequest("GET");
      console.log(response.data);
      setVenues(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  const handleNavigate = (venueId, event) => {
    event.stopPropagation();
    navigate(`/venue/${venueId}`);
  };

  //   const venueId = "";
  //   const { sendRequest } = useManageUser(`${API_BASE_URL}venues/${venueId}`);

  //   const handleSubmit = async (event) => {
  //     event.preventDefault();

  //     try {
  //       const data = await sendRequest("DELETE");
  //       handleClose();
  //       handleSubmissionResult(true, "Success", "Venue successfully deleted!");
  //     } catch (error) {
  //       console.log(error);
  //       setErrorMessage(error.status || "Unknown error occurred");
  //       handleSubmissionResult(
  //         false,
  //         "Error",
  //         "There was an error in deleting the Venue"
  //       );
  //     }
  //   };

  return (
    <>
      <section className="delete-avenue-card-container">
        {venues.map((venue, index) => (
          <article
            className="card bg-secondary-subtle border-0   mb-3"
            key={index}
            onClick={(e) => handleNavigate(venue.id, e)}
          >
            <div className="row g-0">
              <div className="col-4 col-sm-3">
                <img
                  className="img-fluid h-100 rounded-start"
                  src={venue.media[0]?.url || "/images/placeholder.jpg"}
                  alt={venue.media[0]?.alt || "Venue main image"}
                />
              </div>
              <div className="col-8 col-sm-9">
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
                    <button className="btn btn-danger ms-auto">X</button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

export default VenueDelete;
