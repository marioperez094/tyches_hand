//External Imports
import React from "react";
import { Link } from "react-router-dom";

//Stylesheets
import "./homeButton.scss";

export function HomeButton({ type="button", buttonAction=null, children, disabled }) {
  return(
    <button
      type={ type }
      onClick={ buttonAction }
      className={ `${ disabled && "disabled-button" } home-buttons` }
      disabled={ disabled }
    >
      { children }
    </button>
  )
};

export function LinkButton({ link , children }) {
  return(
    <Link
      to={ link }
      className="home-buttons"
    >
      { children }
    </Link>
  )
};