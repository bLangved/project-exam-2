function StarRating({ rating }) {
  const totalStars = 5;
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    let starClass = "star-empty";
    const fullDifference = rating - (i - 1);
    const isFullStar = fullDifference >= 1;
    const fractionalPart = fullDifference % 1;

    if (isFullStar) {
      starClass = "star-full";
    } else if (fractionalPart >= 0.75) {
      starClass = "star-three-quarter";
    } else if (fractionalPart >= 0.5) {
      starClass = "star-half";
    } else if (fractionalPart >= 0.25) {
      starClass = "star-one-quarter";
    }
    stars.push(
      <div key={i} className={`star ${starClass}`}>
        <img src="/icons/star.svg" alt="star" />
      </div>
    );
  }
  return <div className="stars">{stars}</div>;
}
export default StarRating;
