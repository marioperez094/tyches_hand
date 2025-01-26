//External Imports
import React from "react";

//Stylesheets
import "./hoverText.scss";

export default function HoverText({ name, description= false, children }) {
  return (
    <div className="relative inline-block hover-container">
      <div className="hover-item">
        { children }
      </div>
      <div className="absolute text-white hover-box">
        <h3 className="hover-name text-center">
          { name }
        </h3>
        { description && <p className="hover-description">{ description }</p>}
      </div>
    </div>
  )
}