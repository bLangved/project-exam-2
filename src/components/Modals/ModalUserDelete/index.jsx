import React, { useState, useEffect, useContext } from "react";
// import { UserProfileContext } from "../../../contexts/ProfileDataContext";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import useManageUser from "../../../hooks/useManageUser";
import { API_BASE_URL } from "../../../constants/apiUrls";

function ModalUserEdit({
  show,
  onHide,
  editType,
  refreshProfileData,
  setBookingData,
  bookingId,
}) {
  //   const { userData } = useContext(UserProfileContext);
  const [inputValue, setInputValue] = useState("");
  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { sendRequest: deleteRequest } = useManageUser("");

  useEffect(() => {
    if (editType === "deleteBooking") {
      setTitle("Delete booking?");
      setLabel("Are you sure you want to delete this booking?");
    }
  }, [editType]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleClose = () => {
    setErrorMessage("");
    setInputValue("");
    onHide();
  };

  const handleSubmit = async () => {
    if (editType === "deleteBooking") {
      if (inputValue.trim().toUpperCase() !== "YES") {
        setErrorMessage('Please enter "YES" to confirm.');
        return;
      }
    }

    try {
      const deleteResponse = await deleteRequest(
        "DELETE",
        null,
        `${API_BASE_URL}bookings/${bookingId}`
      );
      if (deleteResponse.status === 204) {
        setBookingData((prevBookingData) =>
          prevBookingData.filter((booking) => booking.id !== bookingId)
        );
        handleClose();
        refreshProfileData();
      }
    } catch (error) {
      console.error("Failed to delete booking:", error);
      setErrorMessage(
        "There was an error deleting your booking. Please try again."
      );
    }
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
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
        <Button onClick={handleClose}>Close</Button>
        {editType === "deleteBooking" && (
          <Button variant="primary" onClick={handleSubmit}>
            Delete booking
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default ModalUserEdit;
