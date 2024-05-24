import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Image, Alert } from "react-bootstrap/";
import { countries, continents } from "countries-list";
import ModalImage from "../../../../components/Modals/ModalImage";
import { sortedCountries } from "../../../../utilities/SortedLocations";
import useManageUser from "../../../../hooks/useManageUser";
import { API_BASE_URL } from "../../../../constants/apiUrls";

function VenueCreate({ handleClose, handleSubmissionResult, onVenueCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [guests, setGuests] = useState("");
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
  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);

  const handleCheckboxChange = (setter) => (e) => setter(e.target.checked);

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

  const handleGuestsChange = (e) => {
    setGuests(e.target.value);
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
      setContinent("");
    }
  }, [country]);

  const { sendRequest } = useManageUser(`${API_BASE_URL}venues/`);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (parseInt(guests, 10) < 1) {
      setErrorMessage("Guests must be at least 1");
      return;
    }
    if (parseInt(guests, 10) > 99) {
      setErrorMessage("Maximum number of guests are 99");
      return;
    }

    if (parseFloat(price) <= 0) {
      setErrorMessage("Price must be higher then 0");
      return;
    }

    if (parseFloat(price) > 9999) {
      setErrorMessage("Price can not be higher then 9999");
      return;
    }

    const venueData = {
      name: title,
      description: description,
      media: imageUrls
        .filter((url) => url !== "")
        .map((url) => ({ url, alt: "Venue image" })),
      price: parseFloat(price),
      maxGuests: parseInt(guests, 10),
      rating: 0,
      meta: {
        wifi,
        parking,
        breakfast,
        pets,
      },
      location: {
        address,
        city,
        zip,
        country,
        continent,
        lat: 0,
        lng: 0,
      },
    };

    try {
      const data = await sendRequest("POST", venueData);
      onVenueCreate(data);
      handleClose();
      handleSubmissionResult(true, "Success", "Venue successfully created!");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.status || "Unknown error occurred");
      handleSubmissionResult(
        false,
        "Error",
        "There was an error in creating the Venue"
      );
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formInput" className="mb-3">
          <Form.Label className="fw-semibold">Title of your venue</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
            required
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
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">
            How many guests are allowed?
          </Form.Label>
          <Form.Control
            type="number"
            placeholder="Amount"
            value={guests}
            min={1}
            onChange={handleGuestsChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formInput" className="mb-3">
          <Form.Label className="fw-semibold">Price of renting</Form.Label>
          <Form.Control
            type="number"
            placeholder="Price"
            value={price}
            onChange={handlePriceChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold d-flex flex-column">
            Add venue images
          </Form.Label>
          {imageUrls.map((url, index) => (
            <Form.Group
              key={index}
              controlId={`formInputImage${index}`}
              className="mb-3"
            >
              <div className="d-flex justify-content-between align-items-end mb-1">
                <Form.Label className="mb-0">Image URL {index + 1}</Form.Label>
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
          <Form.Label className="fw-semibold">This venue offers</Form.Label>

          <Row>
            <Col sm={6} md={3}>
              <Form.Check
                className="custom-checkbox d-flex gap-2 align-items-end mb-2"
                type="checkbox"
                id="wifi-checkbox"
                label="Wifi"
                checked={wifi}
                onChange={handleCheckboxChange(setWifi)}
              />
            </Col>
            <Col sm={6} md={3}>
              <Form.Check
                className="custom-checkbox d-flex gap-2 align-items-end mb-2"
                type="checkbox"
                id="parking-checkbox"
                label="Parking"
                checked={parking}
                onChange={handleCheckboxChange(setParking)}
              />
            </Col>
            <Col sm={6} md={3}>
              <Form.Check
                className="custom-checkbox d-flex gap-2 align-items-end mb-2"
                type="checkbox"
                id="breakfast-checkbox"
                label="Breakfast"
                checked={breakfast}
                onChange={handleCheckboxChange(setBreakfast)}
              />
            </Col>
            <Col sm={6} md={3}>
              <Form.Check
                className="custom-checkbox d-flex gap-2 align-items-end mb-2"
                type="checkbox"
                id="pets-checkbox"
                label="Pets"
                checked={pets}
                onChange={handleCheckboxChange(setPets)}
              />
            </Col>
          </Row>
        </Form.Group>

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
                  placeholder="Zip code"
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
                <Form.Select value={country} onChange={handleCountryChange}>
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
      <ModalImage
        show={showModal}
        imageUrl={activeImageUrl}
        onHide={() => setShowModal(false)}
      />
    </>
  );
}

export default VenueCreate;
