//External Imports
import React from "react";

//Stylesheets
import "./hoverText.scss";

export default function HoverText({ name, description= false }) {
  return (
    <div className="absolute text-white hover-info">
      <h3 className="hover-name text-center">
        { name }
      </h3>
      { description && <p className="hover-description">{ description }</p>}
    </div>
  )
}