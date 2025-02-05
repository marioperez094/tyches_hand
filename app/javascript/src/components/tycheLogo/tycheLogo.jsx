//External Imports
import React from "react";

//Stylesheets
import "./tycheLogo.scss";

export default function TycheLogo() {
  return (
    <header className="sm:mx-auto sm:w-full sm:max-w-4xl text-center" id="tyche-logo">
      <h1 className="mt-6 text-center text-6xl sm:text-8xl font-extrabold title-text">
        Tyche's Hand
      </h1>
        <div className="mx-auto border-container">
          <div className="border-t-8 textured-red-border">
          </div>
          <span className="text-4xl four-suits textured-red-background">
            &#9829;
          </span>
          <span className="text-4xl four-suits textured-red-background">
            &#9830;
          </span>
          <span className="text-4xl four-suits textured-red-background">
            &#9827;
          </span>
          <span className="text-4xl four-suits textured-red-background">
            &#9824;
          </span>
        </div>
    </header>
  )
};
