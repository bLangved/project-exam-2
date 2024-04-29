import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

function VenueSee({ venueId }) {
  const navigate = useNavigate();

  const handleNavigate = (venueId, event) => {
    event.stopPropagation();
    navigate(`/venue/${venueId}`);
  };

  return (
    <button
      onClick={(e) => handleNavigate(venueId, e)}
      className="btn btn-light w-100 p-3 mb-4 d-flex gap-3 align-items-center"
    >
      <FontAwesomeIcon icon={faEye} size="lg" className="text-primary" />
      <span>See venue</span>
    </button>
  );
}

export default VenueSee;
