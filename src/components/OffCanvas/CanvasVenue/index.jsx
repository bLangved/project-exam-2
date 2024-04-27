import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap/";
import ModalConfirmation from "../../Modals/ModalConfirmation";
import VenueCreate from "./VenueCreate";
import VenueDelete from "./VenueDelete";

function CanvasVenue({ show, handleClose, action }) {
  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmissionResult = (success, title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalShow(true);
  };

  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="bottom"
        className="canvas-venue "
      >
        <Offcanvas.Header
          className="bg-body-tertiary rounded-top-4"
          closeButton
        >
          <Offcanvas.Title>{action} Venue</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {action === "Add" && (
            <VenueCreate
              handleClose={handleClose}
              handleSubmissionResult={handleSubmissionResult}
            />
          )}

          {action === "Edit" && <div>Edit venue form goes here.</div>}
          {action === "Delete" && <VenueDelete />}
        </Offcanvas.Body>
      </Offcanvas>
      <ModalConfirmation
        show={modalShow}
        title={modalTitle}
        message={modalMessage}
        handleClose={() => setModalShow(false)}
      />
    </>
  );
}

export default CanvasVenue;
