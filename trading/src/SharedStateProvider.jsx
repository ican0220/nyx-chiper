// SharedStateContext.js
import React, { createContext, useContext, useState } from "react";

const SharedStateContext = createContext();

export function SharedStateProvider({ children }) {
  const [navbarValue, setNavbarValue] = useState("");
  const [searchbarValue, setSearchbarValue] = useState("");

  const updateNavbarValue = (newValue) => {
    setNavbarValue(newValue);
  };

  const updateSearchbarValue = (newValue) => {
    setSearchbarValue(newValue);
  };

  const sharedState = {
    navbarValue,
    searchbarValue,
    updateNavbarValue,
    updateSearchbarValue,
  };

  return (
    <SharedStateContext.Provider value={sharedState}>
      {children}
    </SharedStateContext.Provider>
  );
}

export function useSharedState() {
  return useContext(SharedStateContext);
}
