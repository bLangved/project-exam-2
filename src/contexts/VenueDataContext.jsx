import React, { createContext, useContext, useState } from "react";

// Create the context
const VenueDataContext = createContext();

// Create a Provider Component
export const VenueDataProvider = ({ children }) => {
  const [venueData, setVenueData] = useState([]);

  return (
    <VenueDataContext.Provider value={{ venueData, setVenueData }}>
      {children}
    </VenueDataContext.Provider>
  );
};

// Create a custom hook for using context
export const useVenueData = () => {
  const context = useContext(VenueDataContext);
  if (!context) {
    throw new Error("useVenueData must be used within a VenueDataProvider");
  }
  return context;
};
