import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../constants/apiUrls";
import useManageUser from "../../hooks/useManageUser";
import CanvasVenue from "./CanvasVenue";
import VenueEntries from "./VenueEntries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseCircleCheck } from "@fortawesome/free-solid-svg-icons";

function Admin() {
  const [showCanvas, setShowCanvas] = useState(false);
  const [action, setAction] = useState("");
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);

  const userName = JSON.parse(localStorage.getItem("userName"));
  const { sendRequest } = useManageUser(
    `${API_BASE_URL}profiles/${userName}/venues/`
  );

  const handleShow = (actionType, venue) => {
    setShowCanvas(true);
    setAction(actionType);
    setSelectedVenue(venue);
  };

  const handleClose = () => {
    setShowCanvas(false);
  };

  const handleVenueCreate = (newVenue) => {
    setVenues((prevVenues) => [...prevVenues, newVenue.data]);
  };

  const handleVenueEdit = (editedVenue) => {
    setVenues((prevVenues) => [...prevVenues, editedVenue.data]);
  };

  const handleVenueDelete = (venueId) => {
    setVenues(venues.filter((v) => v.id !== venueId));
  };

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await sendRequest("GET");
        setVenues(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchVenues();
  }, [showCanvas]);

  return (
    <div className="admin">
      <div className="container px-4 px-sm-0">
        <button
          type="button"
          className="btn btn-outline-success w-100 p-3 my-3"
          onClick={() => handleShow("Add")}
        >
          <FontAwesomeIcon icon={faHouseCircleCheck} size="2xl" />
          <div className="fs-5">Add new venue</div>
        </button>
        <VenueEntries handleShow={handleShow} venues={venues} />
      </div>
      <CanvasVenue
        show={showCanvas}
        handleClose={handleClose}
        action={action}
        venue={selectedVenue}
        onVenueCreate={handleVenueCreate}
        onVenueDelete={handleVenueDelete}
        onVenueEdit={handleVenueEdit}
      />
    </div>
  );
}

export default Admin;
