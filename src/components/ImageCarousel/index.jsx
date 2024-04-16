import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

function ImageCarousel({ images }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
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
            {images.map((image) => (
              <Carousel.Item key={image.url}>
                <img src={image.url} alt={image.alt} />
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
            {images.slice(1).map((image, idx) => (
              <img key={idx} src={image.url} alt={image.alt} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageCarousel;
