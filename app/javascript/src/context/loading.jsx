//External Imports
import React, { useState, useContext, createContext } from "react";

const LoadingContext = createContext(null);

function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  //Takes a boolean and a delay for length of ending animation
  function setLoadingState(state, delay) {
    setIsLoading(state);

    if (state) return setShowLoading(true);

    return setTimeout(() => setShowLoading(false), delay);
  };

  function startLoading() {
    setLoadingState(true);
  }

  function stopLoading(delay = 1000) {
    setLoadingState(false, delay);
  }

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, startLoading, stopLoading }}>
      { children }
    </LoadingContext.Provider>
  )
};

function useLoading() {
  return useContext(LoadingContext);
};

export { LoadingProvider, useLoading };
