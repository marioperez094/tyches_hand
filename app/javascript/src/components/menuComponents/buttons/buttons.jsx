//External Imports
import React from "react";
import { Link } from "react-router-dom";

//Stylesheets
import "./buttons.scss";

//Reusable Button Component
export function StandardButton({ type ="button", buttonAction = () => {}, disabled = false, children, ...props }) {

  console.log("render StandardButton")

  return(
    <button
      type={ type }
      onClick={ buttonAction }
      className={ `text-white uppercase font-bold ${ disabled ? "disabled-button" : "standard-button"}` }
      { ...props }
    >
      { children }
    </button>
  )
};

//Reusable Link Button Component
export function LinkButton({ link , children, ...props }) {

  console.log("render linkButton")

  return(
    <Link
      to={ link }
      className="text-white uppercase font-bold standard-button"
      { ...props }
    >
      { children }
    </Link>
  )
};