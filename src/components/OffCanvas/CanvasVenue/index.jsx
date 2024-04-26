import React, { useState, useRef, useEffect } from "react";
import {
  Offcanvas,
  Form,
  Row,
  Col,
  Button,
  Image,
  Alert,
} from "react-bootstrap/";
import ModalImage from "../../Modals/ModalImage";
import { sortedCountries } from "../../../utilities/SortedLocations";
import { countries, continents } from "countries-list";

function CanvasVenue({ show, handleClose, action }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [imageUrls, setImageUrls] = useState([""]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [activeImageUrl, setActiveImageUrl] = useState("");
  const [country, setCountry] = useState("");
  const [continent, setContinent] = useState("");

  const openModalWithImage = (url) => {
    setActiveImageUrl(url);
    setShowModal(true);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleZipChange = (e) => {
    setZip(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleUrlChange = (index, event) => {
    const newUrls = [...imageUrls];
    newUrls[index] = event.target.value;
    setImageUrls(newUrls);
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const addImageUrl = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const removeImageUrl = (index) => {
    const newUrls = [...imageUrls];
    newUrls.splice(index, 1);
    setImageUrls(newUrls);
  };

  const handleCountryChange = (e) => {
    const selectedCountryCode = e.target.value;
    setCountry(selectedCountryCode);
    const selectedCountryData = countries[selectedCountryCode];
    if (selectedCountryData) {
      setContinent(selectedCountryData.continent);
    }
  };

  useEffect(() => {
    if (country) {
      const selectedCountryData = countries[country];
      if (selectedCountryData && selectedCountryData.continent) {
        const continentCode = selectedCountryData.continent;
        const continentName = continents[continentCode];
        setContinent(continentName);
      } else {
        setContinent("");
      }
    } else {
      setContinent(""); // Reset when no country is selected
    }
  }, [country]);

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="bottom"
      className="canvas-venue "
    >
      <Offcanvas.Header className="bg-body-tertiary rounded-top-4" closeButton>
        <Offcanvas.Title>{action} Venue</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {action === "Add" && (
          <>
            <Form>
              <Form.Group controlId="formInput" className="mb-3">
                <Form.Label className="fw-semibold">
                  Title of your Venue
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder={`Title`}
                  value={title}
                  onChange={handleTitleChange}
                />
              </Form.Group>

              <Form.Group controlId="formInput" className="mb-3">
                <Form.Label className="fw-semibold">
                  Write a description of the venue
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Description"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </Form.Group>

              <Form.Group controlId="formInput" className="mb-3">
                <Form.Label className="fw-semibold">Price of avenue</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={handlePriceChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">
                  Add venue images
                </Form.Label>
                {imageUrls.map((url, index) => (
                  <Form.Group
                    key={index}
                    controlId={`formInputImage${index}`}
                    className="mb-3"
                  >
                    <div className="d-flex justify-content-between align-items-end mb-1">
                      <Form.Label className="mb-0">
                        Image URL {index + 1}
                      </Form.Label>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeImageUrl(index)}
                      >
                        X
                      </Button>
                    </div>
                    <Form.Control
                      type="text"
                      placeholder="Image URL"
                      value={url}
                      onChange={(e) => handleUrlChange(index, e)}
                    />
                  </Form.Group>
                ))}
                <Button onClick={addImageUrl}>Add another image</Button>
              </Form.Group>
              <div className="add-img-prev-container d-flex flex-wrap mb-3">
                {imageUrls.map(
                  (url, index) =>
                    url && (
                      <div
                        className="col-6 col-sm-4 col-md-3 img-prev p-1"
                        key={index}
                        onClick={() => openModalWithImage(url)}
                      >
                        <div className="index-container position-relative">
                          <div className="position-absolute text-center rounded-circle bg-white shadow">
                            {index + 1}
                          </div>
                          <Image
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="img-fluid rounded-3"
                          />
                        </div>
                      </div>
                    )
                )}
              </div>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Location</Form.Label>

                <Row>
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-1">Street address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="123 Main street"
                      value={address}
                      onChange={handleAddressChange}
                    />
                  </Form.Group>

                  <Col md={6}>
                    <Form.Group controlId="formGridZip" className="mb-3">
                      <Form.Label className="mb-1">Zip</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Digits"
                        value={zip}
                        onChange={handleZipChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formGridCity" className="mb-3">
                      <Form.Label className="mb-1">City</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="City name"
                        value={city}
                        onChange={handleCityChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="countrySelector" className="mb-3">
                      <Form.Label className="mb-1">Country</Form.Label>
                      <Form.Select
                        value={country}
                        onChange={handleCountryChange}
                      >
                        <option value="">Choose...</option>
                        {sortedCountries.map(([countryCode, countryData]) => (
                          <option key={countryCode} value={countryCode}>
                            {countryData.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="continentDisplay" className="mb-3">
                      <Form.Label className="mb-1">Continent</Form.Label>
                      <Form.Control
                        type="text"
                        value={continent || "Select a country first"}
                        readOnly
                        disabled={true}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form.Group>
              {errorMessage && (
                <Alert variant="danger" className="mt-5">
                  {errorMessage}
                </Alert>
              )}
              <Button type="submit" className="w-100">
                Submit
              </Button>
            </Form>
          </>
        )}

        {action === "Edit" && <div>Edit venue form goes here.</div>}
        {action === "Delete" && <div>Confirm venue deletion here.</div>}
      </Offcanvas.Body>
      <ModalImage
        show={showModal}
        imageUrl={activeImageUrl}
        onHide={() => setShowModal(false)}
      />
    </Offcanvas>
  );
}

export default CanvasVenue;
