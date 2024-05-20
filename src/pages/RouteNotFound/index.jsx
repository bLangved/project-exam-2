import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

function RouteNotFound() {
  return (
    <div className="page-not-found m-5 text-center">
      <FontAwesomeIcon
        icon={faTriangleExclamation}
        size="2xl"
        className="m-5"
      />
      <h1>Whops!</h1>
      <p>Looks like the page you tried to access isn't working as expected.</p>
    </div>
  );
}

export default RouteNotFound;
