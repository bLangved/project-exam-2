import styled, { css } from "styled-components";

const StarsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Star = styled.div`
  position: relative;
  display: grid;
  place-content: center;
  padding: 0;
  width: 20px;
  height: 20px;

  img {
    width: 100%;
    height: 100%;
    opacity: ${(props) => (props.isFull ? 1 : 0.3)};
  }

  ${(props) =>
    props.fractional &&
    css`
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: ${props.fractional * 100}%;
        background: orange;
        mask: url("/icons/star.svg");
        mask-size: cover;
        opacity: 1;
      }
    `}
`;

function StarRating({ rating }) {
  const totalStars = 5;
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    const fullDifference = rating - (i - 1);
    const isFullStar = fullDifference >= 1;
    const fractionalPart = fullDifference % 1;

    let fractionalWidth = 0;
    if (fractionalPart >= 0.75) {
      fractionalWidth = 0.75;
    } else if (fractionalPart >= 0.5) {
      fractionalWidth = 0.5;
    } else if (fractionalPart >= 0.25) {
      fractionalWidth = 0.25;
    }

    stars.push(
      <Star key={i} isFull={isFullStar} fractional={fractionalWidth}>
        <img src="/icons/star.svg" alt="star" />
      </Star>
    );
  }

  return <StarsContainer>{stars}</StarsContainer>;
}

export default StarRating;
