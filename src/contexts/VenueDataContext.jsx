import React, { createContext, useContext, useState } from "react";

const VenueDataContext = createContext();

export const VenueDataProvider = ({ children }) => {
  const [venueData, setVenueData] = useState([]);

  return (
    <VenueDataContext.Provider value={{ venueData, setVenueData }}>
      {children}
    </VenueDataContext.Provider>
  );
};

export const useVenueData = () => {
  const context = useContext(VenueDataContext);
  if (!context) {
    throw new Error("useVenueData must be used within a VenueDataProvider");
  }
  return context;
};
