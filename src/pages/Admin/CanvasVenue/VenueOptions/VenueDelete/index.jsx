import React, { useState } from "react";
import { API_BASE_URL } from "../../../../../constants/apiUrls";
import useManageUser from "../../../../../hooks/useManageUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalUserDelete from "../../../../../components/Modals/ModalUserDelete";

function VenueDelete({ venueId, onVenueDelete, handleClose }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editType, setEditType] = useState(null);
  const [thisVenueId, setThisVenueId] = useState(null);

  const handleDeleteClick = (venueId) => {
    setThisVenueId(venueId);
    setEditType("deleteVenue");
    setShowDeleteModal(true);
  };

  return (
    <>
      <button
        onClick={() => handleDeleteClick(venueId)}
        className="btn btn-light w-100 p-3 mb-4 d-flex gap-3 align-items-center"
      >
        <FontAwesomeIcon icon={faTrash} size="lg" className="text-danger" />
        <span>Delete venue</span>
      </button>
      <ModalUserDelete
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        editType={editType}
        venueId={thisVenueId}
        onVenueDelete={onVenueDelete}
        handleClose={handleClose}
      />
    </>
  );
}

export default VenueDelete;
