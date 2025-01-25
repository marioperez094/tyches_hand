//External Imports
import React from "react";

//Stylesheets
import "./title.scss";

export default function Title({ title }) {
  return(
    <header className="sm:mx-auto sm:w-full sm:max-w-4xl">
      <h1 className="mt-6 text-center text-6xl sm:text-8xl font-extrabold title-text">
        { title }
      </h1>
      <IntricateBorder />
    </header>
  )
};

export function IntricateBorder() {
  const suits = ["&#9829", "&#9830", "&#9827", "&#9824"]
  return (
    <>
      <div className="intricate-border textured-red-border">
        <span className="text-4xl four-suits">
          &#9829;
          &#9830;
          &#9827;
          &#9824;
        </span>
      </div>
    </>
  )
};