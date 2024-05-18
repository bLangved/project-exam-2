import React, { createContext, useContext, useState } from "react";

export const UserProfileContext = createContext({
  userData: {},
  setUserData: () => {},
  clearUserData: () => {},
});

const normalizeUserData = (data) => {
  return data.data ? data.data : data;
};

export const UserProfileProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const storedUserData = sessionStorage.getItem("userData");
    return storedUserData ? normalizeUserData(JSON.parse(storedUserData)) : {};
  });

  const clearUserData = () => {
    setUserData({});
    sessionStorage.removeItem("userData");
  };

  const updateUserData = (data) => {
    const normalizedData = normalizeUserData(data);
    setUserData((prevUserData) => ({
      ...prevUserData,
      ...normalizedData,
      accessToken: prevUserData.accessToken || normalizedData.accessToken,
    }));
    sessionStorage.setItem(
      "userData",
      JSON.stringify({
        ...userData,
        ...normalizedData,
        accessToken: userData.accessToken || normalizedData.accessToken,
      })
    );
  };

  return (
    <UserProfileContext.Provider
      value={{
        userData,
        setUserData: updateUserData,
        clearUserData,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};
