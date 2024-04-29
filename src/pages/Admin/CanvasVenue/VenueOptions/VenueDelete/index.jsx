import React from "react";
import { API_BASE_URL } from "../../../../../constants/apiUrls";
import useManageUser from "../../../../../hooks/useManageUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function VenueDelete({
  handleClose,
  venueId,
  onVenueDelete,
  handleSubmissionResult,
}) {
  const { sendRequest } = useManageUser(`${API_BASE_URL}venues/${venueId}`);

  const deleteRequest = async (event) => {
    event.preventDefault();

    if (
      !confirm(
        "Are you sure you want to delete this venue? This action is irreversible."
      )
    ) {
      return;
    }

    try {
      const deleteResponse = await sendRequest("DELETE");
      if (deleteResponse === 204) {
        onVenueDelete(venueId);
        handleClose();
        handleSubmissionResult(true, "Success", "Venue successfully deleted!");
      }
    } catch (error) {
      console.error(error);
      handleSubmissionResult(
        false,
        "Error",
        "There was an error in deleting the venue."
      );
    }
  };

  return (
    <button
      onClick={deleteRequest}
      className="btn btn-light w-100 p-3 mb-4 d-flex gap-3 align-items-center"
    >
      <FontAwesomeIcon icon={faTrash} size="lg" className="text-danger" />
      <span>Delete venue</span>
    </button>
  );
}

export default VenueDelete;
