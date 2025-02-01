//External Imports
import React from "react";
import { Link } from "react-router-dom";

//Stylesheets
import "./homeButton.scss";

//Reusable Button Component
export function HomeButton({ type ="button", buttonAction = () => {}, children, disabled, ...props}) {
  return(
    <button
      type={ type }
      onClick={ buttonAction }
      className={ `${ disabled ? "disabled-button" : "" } home-buttons` }
      disabled={ disabled }
      { ...props }
    >
      { children }
    </button>
  )
};

//Reusable Link Button Component
export function LinkButton({ link , children, ...props }) {
  return(
    <Link
      to={ link }
      className="home-buttons"
      { ...props }
    >
      { children }
    </Link>
  )
};