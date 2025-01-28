//External Imports
import React from "react";

export default function ErrorMessage({ children }) {
  return(
    <p className="text-red-500 text-center error-message">{ children }</p>
  )
};