//External Imports
import React from "react";

//Stylesheets
import "./hoverText.scss";

export default function HoverText({ name = null , description= null, isFlipped, children }) {
  const isBorderVisible = !name || !description;

  return (
    <div className="relative inline-block hover-container">
      <div className="hover-item">
        { children }
      </div>
      <div className={ `absolute text-white hover-box ${ isFlipped ? "hide-hover-box" : ""}` }>
        <h3 className={ `${ isBorderVisible ? "" : "include-bottom-border" } text-center hover-name` }>
          { name }
        </h3>
        { description && <p className="hover-description">{ description }</p>}
      </div>
    </div>
  )
}