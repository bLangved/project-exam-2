import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseCircleCheck,
  faHouseCircleExclamation,
  faHouseCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import CanvasVenue from "../../components/OffCanvas/CanvasVenue";

function Admin() {
  const [showCanvas, setShowCanvas] = useState(false);
  const [action, setAction] = useState("");

  const handleShow = (actionType) => {
    setShowCanvas(true);
    setAction(actionType);
  };

  const handleClose = () => {
    setShowCanvas(false);
  };

  return (
    <div className="admin">
      <div className="container px-4 px-sm-0">
        <div className="button-group mx-auto row my-3 gap-sm-3 justify-content-between">
          <button
            type="button"
            className="btn btn-outline-success col-sm-3 mb-3 mb-sm-0"
            onClick={() => handleShow("Add")}
          >
            <FontAwesomeIcon icon={faHouseCircleCheck} size="2xl" />
            <div className="fs-5">Add</div>
          </button>
          <button
            type="button"
            className="btn btn-outline-info col-sm-3 mb-3 mb-sm-0"
            onClick={() => handleShow("Edit")}
          >
            <FontAwesomeIcon icon={faHouseCircleExclamation} size="2xl" />
            <div className="fs-5">Edit</div>
          </button>
          <button
            type="button"
            className="btn btn-outline-danger col-sm-3 mb-sm-0"
            onClick={() => handleShow("Delete")}
          >
            <FontAwesomeIcon icon={faHouseCircleXmark} size="2xl" />
            <div className="fs-5">Delete</div>
          </button>
        </div>
      </div>
      <CanvasVenue
        show={showCanvas}
        handleClose={handleClose}
        action={action}
      />
    </div>
  );
}

export default Admin;
