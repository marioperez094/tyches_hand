//External Imports
import React from "react";
import { Link } from "react-router-dom";

//Stylesheets
import "./standardButton.scss";

//Reusable Button Component
export function StandardButton({ type ="button", buttonAction = () => {}, disabled = false, children, ...props }) {
  return(
    <button
      type={ type }
      onClick={ buttonAction }
      className={ `text-white uppercase font-bold ${disabled ? "disabled-button" : "standard-button"}` }
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
      className="standard-button"
      { ...props }
    >
      { children }
    </Link>
  )
};