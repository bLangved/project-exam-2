import React, { createContext, useContext, useState, useEffect } from "react";

export const UserProfileContext = createContext({
  userData: null,
  setUserData: () => {},
  clearUserData: () => {},
});

export const UserProfileProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  // Function to clear user data upon logout
  const clearUserData = () => {
    setUserData(null);
  };

  useEffect(() => {
    console.log("Current User Data:", userData);
  }, [userData]);

  return (
    <UserProfileContext.Provider
      value={{ userData, setUserData, clearUserData }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};
