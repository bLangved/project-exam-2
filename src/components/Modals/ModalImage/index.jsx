import React from "react";
import { Modal, Image } from "react-bootstrap";

function ModalImage({ show, imageUrl, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Image Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <Image src={imageUrl} alt="Large preview" className="img-fluid" />
      </Modal.Body>
    </Modal>
  );
}

export default ModalImage;
