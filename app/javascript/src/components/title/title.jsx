//External Imports
import React from "react";

//Stylesheets
import "./title.scss";

export default function Title({ title }) {
  return(
    <header className="sm:mx-auto sm:w-full sm:max-w-4xl">
      <h1 className="text-center text-8xl font-extrabold title-text intricate-border">
        { title }
      </h1>
      <p className="text-center text-xl four-suits">
        &#9829;
        &#9830;
        &#9827;
        &#9824;
      </p>
    </header>
  )
};