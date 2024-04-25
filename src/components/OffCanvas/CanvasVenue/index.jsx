import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";

function CanvasVenue({ show, handleClose, action }) {
  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="bottom"
      className="canvas-venue rounded-top-4"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{action} Venue</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {/* Content based on the action */}
        {action === "Add" && <div>Add new venue form goes here.</div>}
        {action === "Edit" && <div>Edit venue form goes here.</div>}
        {action === "Delete" && <div>Confirm venue deletion here.</div>}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default CanvasVenue;
