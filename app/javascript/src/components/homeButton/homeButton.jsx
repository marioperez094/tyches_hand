//External Imports
import React from "react";

//Stylesheets
import "./homeButton.scss";

export default function HomeButton({ type="button", buttonAction=null, children }) {
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