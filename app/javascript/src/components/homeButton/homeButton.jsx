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
      className="login-buttons w-full my-2"
    >
      { children }
    </button>
  )
};

export function LinkButton({ link , children }) {
  return(
    <Link
      to={ link }
      className="block login-buttons w-full text-center my-2"
    >
      { children }
    </Link>
  )
};