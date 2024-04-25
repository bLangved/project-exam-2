import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Image, Alert } from "react-bootstrap";
import useManageUser from "../../../hooks/useManageUser";
import { API_BASE_URL } from "../../../constants/apiUrls";

function ModalUserEdit({ show, onHide, editType, onUpdateSuccess }) {
  const [inputValue, setInputValue] = useState("");
  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const userId = JSON.parse(localStorage.getItem("userName"));
  const profileUrl = `${API_BASE_URL}profiles/${userId}/`;
  const { sendRequest: sendProfileUpdate } = useManageUser(profileUrl);

  useEffect(() => {
    // Set specific titles and labels based on the edit type
    if (editType === "avatar") {
      setTitle("Edit Avatar");
      setLabel("New Avatar URL");
    } else if (editType === "banner") {
      setTitle("Edit Banner");
      setLabel("New Banner URL");
    } else if (editType === "bio") {
      setTitle("Edit Bio");
      setLabel("New bio");
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
    const updateData = {};

    if (editType === "bio") {
      updateData.bio = inputValue || "";
    } else if (editType === "avatar") {
      updateData.avatar = { url: inputValue || "", alt: "User avatar" };
    } else if (editType === "banner") {
      updateData.banner = { url: inputValue || "", alt: "User banner" };
    }

    try {
      const updatedUserData = await sendProfileUpdate("PUT", updateData);
      setInputValue("");
      onHide();
      if (onUpdateSuccess) {
        onUpdateSuccess();
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      if (error.status === 400) {
        setErrorMessage("Please enter a valid URL.");
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
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
            {editType === "bio" ? (
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter new bio"
                value={inputValue}
                onChange={handleChange}
              />
            ) : (
              <Form.Control
                type="text"
                placeholder={`Enter ${editType} URL`}
                value={inputValue}
                onChange={handleChange}
              />
            )}
          </Form.Group>
          {inputValue && editType !== "bio" && (
            <Image src={inputValue} alt="Preview" fluid />
          )}
          {errorMessage && (
            <Alert variant="danger" className="mt-3">
              {errorMessage}
            </Alert>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleSubmit}>
          Update {editType}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalUserEdit;
