import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import CardsCategory from "./CardsCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";
import { API_BASE_URL } from "../../constants/apiUrls";
import useApi from "../../hooks/useApi";

const sortCategory = (data, category) => {
  if (!data || !Array.isArray(data)) return [];
  return data.filter((item) => item.meta && item.meta[category]);
};

function Home() {
  const [category, setCategory] = useState("latest");
  const [latestVenues, setLatestVenues] = useState([]);
  const [wifiVenues, setWifiVenues] = useState([]);
  const [breakfastVenues, setBreakfastVenues] = useState([]);
  const [petsVenues, setPetsVenues] = useState([]);

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const requestLimit = 15;

  const url = `${API_BASE_URL}venues?limit=${requestLimit}&page=${page}&sort=created&sortOrder=desc`;

  const results = useApi(url);
  const data = results.data;

  useEffect(() => {
    let filteredData = [];

    if (data && data.length > 0) {
      if (category === "latest") {
        filteredData = data.filter(
          (newVenue) =>
            !latestVenues.some(
              (existingVenue) => existingVenue.id === newVenue.id
            )
        );
        if (filteredData.length > 0) {
          setLatestVenues((prevData) => [...prevData, ...filteredData]);
        }
      }

      if (category === "wifi") {
        filteredData = sortCategory(data, "wifi").filter(
          (newVenue) =>
            !wifiVenues.some(
              (existingVenue) => existingVenue.id === newVenue.id
            )
        );
        if (filteredData.length > 0) {
          setWifiVenues((prevData) => [...prevData, ...filteredData]);
        }
      }

      if (category === "breakfast") {
        filteredData = sortCategory(data, "breakfast").filter(
          (newVenue) =>
            !breakfastVenues.some(
              (existingVenue) => existingVenue.id === newVenue.id
            )
        );
        if (filteredData.length > 0) {
          setBreakfastVenues((prevData) => [...prevData, ...filteredData]);
        }
      }

      if (category === "pets") {
        filteredData = sortCategory(data, "pets").filter(
          (newVenue) =>
            !petsVenues.some(
              (existingVenue) => existingVenue.id === newVenue.id
            )
        );
        if (filteredData.length > 0) {
          setPetsVenues((prevData) => [...prevData, ...filteredData]);
        }
      }

      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [data, category]);

  const getFilteredVenues = () => {
    if (category === "latest") return latestVenues;
    if (category === "wifi") return wifiVenues;
    if (category === "breakfast") return breakfastVenues;
    if (category === "pets") return petsVenues;
    return [];
  };

  const filteredVenues = getFilteredVenues();

  const handleCategorySelect = (category) => {
    setCategory(category);
  };

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
    setIsLoadingMore(true);
  };

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <CardsCategory onSelectCategory={handleCategorySelect} />
      <Cards
        venueData={filteredVenues}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
      />
      <div className="w-100 d-flex my-5">
        <button
          className="show-more-btn btn btn-primary w-100 mx-auto p-2"
          onClick={handleShowMore}
        >
          Show More
        </button>
      </div>
      <div className="d-flex w-100 gap-2 my-3" onClick={goToTop}>
        <button className="btn ms-auto d-flex align-items-center gap-2">
          <span className="fs-5">To top</span>
          <FontAwesomeIcon icon={faArrowTurnUp} size="xl" />
        </button>
      </div>
    </>
  );
}

export default Home;
