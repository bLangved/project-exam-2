import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

function ImageCarousel({ images, handleShow }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const getColumnClass = (idx) => {
    let cols = "";
    if (images.length === 2) {
      cols = "col-12";
    } else if (images.length === 3) {
      cols = idx < 2 ? "col-6" : "col-12";
    } else {
      cols = "col-6";
    }
    return `${cols} side-img-wrapper`;
  };

  return (
    <>
      <div className="m-lg-3">
        <div className="row g-0">
          <div
            className={`col-12 ${
              images.length === 1
                ? ""
                : images.length <= 3
                ? "col-lg-8 pe-lg-3"
                : "col-lg-6 pe-lg-3"
            }`}
          >
            <Carousel activeIndex={index} onSelect={handleSelect}>
              {images.slice(0, 6).map((image, index) => (
                <Carousel.Item key={`${image.url}-${index}`}>
                  <img src={image.url} alt={image.alt} onClick={handleShow} />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          {images.length > 1 && (
            <div
              className={`col-lg-${
                images.length <= 3 ? "4" : "6"
              } d-none d-lg-block`}
            >
              <div className="row g-3">
                {images.slice(0, 4).map((image, idx) => (
                  <div className={getColumnClass(idx)} key={idx}>
                    <img
                      src={image.url}
                      alt={image.alt}
                      onClick={handleShow}
                      className="img-fluid rounded-3"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ImageCarousel;
