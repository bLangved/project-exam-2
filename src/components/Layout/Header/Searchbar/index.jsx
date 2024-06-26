import React, { useState, forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SearchResults from "./SearchResults";
import useFetchSearchQueries from "../../../../hooks/useFetchSearchQueries";
import { API_BASE_URL } from "../../../../constants/apiUrls";
import debounce from "../../../../utilities/debounce";

const Searchbar = forwardRef((props, ref) => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const { fetchData } = useFetchSearchQueries(`${API_BASE_URL}venues/search?`);

  const handleSearchInputChange = debounce(async () => {
    setLoading(true);
    const query = ref.current?.value;
    if (query && query.length > 0) {
      const data = await fetchData(query);
      setVenues(data);
      setShowOffcanvas(true);
      setLoading(false);
    }
  }, 500);

  const handleSearchIconClick = () => {
    ref.current?.focus();
    handleSearchInputChange();
  };
  return (
    <>
      <div className="input-group">
        <div className="form-floating d-flex position-relative">
          <input
            type="text"
            className="form-control rounded-pill ps-4 shadow-sm"
            id="searchbarInput"
            ref={ref}
            placeholder="Search for venues"
            onChange={handleSearchInputChange}
            onKeyDown={(e) => e.key === "Enter" && handleSearchIconClick()}
          />
          <label className="text-muted ps-4" htmlFor="searchbarInput">
            Search for venues
          </label>
          <button
            className="btn btn-white pe-4 h-100 end-0 rounded-pill border-0 position-absolute"
            onClick={handleSearchIconClick}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
          </button>
        </div>
      </div>
      <SearchResults
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        venues={venues}
        isLoading={loading}
      />
    </>
  );
});

export default Searchbar;
