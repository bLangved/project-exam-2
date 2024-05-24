import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import useManageUser from "../../../hooks/useManageUser";
import { API_BASE_URL } from "../../../constants/apiUrls";
import ModalConfirmation from "../ModalConfirmation";

function ModalUserEdit({
  show,
  onHide,
  editType,
  refreshProfileData,
  setBookingData,
  bookingId,
  venueId,
  onVenueDelete,
  handleClose,
}) {
  const [inputValue, setInputValue] = useState("");
  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const { sendRequest: deleteRequest } = useManageUser("");

  useEffect(() => {
    if (editType === "deleteBooking") {
      setTitle("Delete booking?");
      setLabel("Are you sure you want to delete this booking?");
    }
    if (editType === "deleteVenue") {
      setTitle("Delete venue?");
      setLabel("Are you sure you want to delete this venue?");
    }
  }, [editType]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleCloseCanvas = () => {
    setErrorMessage("");
    setInputValue("");
    onHide();
  };

  const handleSubmit = async () => {
    const trimmedInput = inputValue.trim();

    if (trimmedInput === "") {
      setErrorMessage(
        'The field cannot be empty. Please enter "YES" to confirm.'
      );
      return;
    }

    if (trimmedInput !== "YES") {
      if (trimmedInput.toUpperCase() === "YES") {
        setErrorMessage('Please write "YES" in upper-case letters to confirm.');
      } else {
        setErrorMessage('Please enter "YES" to confirm.');
      }
      return;
    }

    let url = "";
    if (editType === "deleteBooking") {
      url = `${API_BASE_URL}bookings/${bookingId}`;
    } else if (editType === "deleteVenue") {
      url = `${API_BASE_URL}venues/${venueId}`;
    }

    try {
      const deleteResponse = await deleteRequest("DELETE", null, url);
      if (deleteResponse === 204) {
        if (editType === "deleteBooking") {
          setBookingData((prevBookingData) =>
            prevBookingData.filter((booking) => booking.id !== bookingId)
          );
          refreshProfileData();
          handleCloseCanvas();
          setConfirmationMessage(`Booking has been deleted.`);
        } else if (editType === "deleteVenue") {
          onVenueDelete(venueId);
          setConfirmationMessage(`Venue has been deleted.`);
        }
        handleClose();
        setShowConfirmationModal(true);
      }
      setInputValue("");
      handleChange;
    } catch (error) {
      if (editType === "deleteBooking") {
        console.error("Failed to delete booking:", error);
        setErrorMessage(
          "There was an error deleting your booking. Please try again."
        );
      } else if (editType === "deleteVenue") {
        console.error("Failed to delete venue:", error);
        setErrorMessage(
          "There was an error deleting your venue. Please try again."
        );
      }
    }
  };
  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={onHide}
      >
        <Modal.Header closeButton onClick={handleCloseCanvas}>
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formInput" className="mb-3">
              <Form.Label>{label}</Form.Label>

              <Form.Control
                type="text"
                placeholder={`Enter "YES" to confirm`}
                value={inputValue}
                onChange={handleChange}
              />
            </Form.Group>
            {errorMessage && (
              <Alert variant="danger" className="mt-3">
                {errorMessage}
              </Alert>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseCanvas}>Close</Button>
          {editType === "deleteBooking" && (
            <Button variant="primary" onClick={handleSubmit}>
              Delete booking
            </Button>
          )}
          {editType === "deleteVenue" && (
            <Button variant="primary" onClick={handleSubmit}>
              Delete venue
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      <ModalConfirmation
        title="Delete Successful"
        message={confirmationMessage}
        show={showConfirmationModal}
        handleClose={() => setShowConfirmationModal(false)}
      />
    </>
  );
}

export default ModalUserEdit;
