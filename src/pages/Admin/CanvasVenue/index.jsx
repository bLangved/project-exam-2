import React, { useState, useEffect } from "react";
import { Offcanvas } from "react-bootstrap/";
import ModalConfirmation from "../../../components/Modals/ModalConfirmation";
import VenueCreate from "./VenueCreate";
import VenueOptions from "./VenueOptions";

function CanvasVenue({
  show,
  handleClose,
  action,
  venue,
  onVenueCreate,
  onVenueDelete,
  onVenueEdit,
}) {
  const [placement, setPlacement] = useState("start");
  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const updatePlacement = () => {
      if (window.innerWidth < 992) {
        setPlacement("bottom");
      } else {
        setPlacement("start");
      }
    };

    window.addEventListener("resize", updatePlacement);
    updatePlacement();

    return () => window.removeEventListener("resize", updatePlacement);
  }, []);

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
        placement={placement}
        className="canvas-venue"
      >
        <Offcanvas.Header
          className="bg-body-tertiary rounded-top-4"
          closeButton
        >
          <Offcanvas.Title>{action} venue</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {action === "Add" && (
            <VenueCreate
              handleClose={handleClose}
              handleSubmissionResult={handleSubmissionResult}
              onVenueCreate={onVenueCreate}
            />
          )}

          {action === "Options" && (
            <VenueOptions
              handleClose={handleClose}
              venue={venue}
              handleSubmissionResult={handleSubmissionResult}
              onVenueDelete={onVenueDelete}
              onVenueEdit={onVenueEdit}
            />
          )}
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
