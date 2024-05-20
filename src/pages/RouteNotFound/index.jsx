import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function RouteNotFound() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <>
      <div className="m-3 d-flex">
        <button className="btn outline-dark" onClick={goBack}>
          <FontAwesomeIcon icon={faArrowLeft} size="xl" />
        </button>
      </div>
      <div className="page-not-found m-5 text-center">
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          size="2xl"
          className="m-5"
        />
        <h1>Whops!</h1>
        <p>
          Looks like the page you tried to access isn't working as expected.
        </p>
      </div>
    </>
  );
}

export default RouteNotFound;
