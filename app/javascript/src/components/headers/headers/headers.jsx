//External Imports
import React from "react";

//Stylesheets
import "./headers.scss"

export default function Headers({ children }) {
  return(
    <header className="text-md md:text-3xl flex items-center header-container intricate-border textured-gray-border">
      <h1 className="ml-3 mr-16 py-5">{ children }</h1>
    </header>
  )
};