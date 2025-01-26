//External Imports
import React from "react";
import { Link } from "react-router-dom";

//Stylesheets
import "./homeButton.scss";

export function HomeButton({ type="button", buttonAction=null, children }) {
  return(
    <button
      type={ type }
      onClick={ buttonAction }
      className="home-buttons"
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