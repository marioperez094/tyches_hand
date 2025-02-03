//External Imports
import React, { useState, useEffect } from "react";

//Constants
import loadingScreenText from "@utils/loadingScreenText.json";

//Stylesheets
import "./loadingScreen.scss";

export default function LoadingScreen() {
  //Selects a random number from loadingScreenText length
  const [randomLine] = useState(() =>
    Math.floor(Math.random() * loadingScreenText.loadingScreenText.length)
  );
  const selectedLoadingLines = loadingScreenText.loadingScreenText[randomLine];

  return (
    <main className="h-screen">
      <div className=" w-full h-full flex flex-col justify-center items-center">
        { selectedLoadingLines.map((line, index) => 
          <LoadingLine key={ index } animationDelay={ index } loadingLine={ line } />
        )}
      </div>
    </main>
  )
};

// LoadingLine Component: Pre-renders all lines and fades in text when ready
function LoadingLine({ animationDelay, loadingLine }) {
  return (
    <div 
      className="text-white flex loading-line-container"
      style={{
        animationDelay: `${ animationDelay * 3 }s`
      }}
    >
      { loadingLine.split("").map((letter, index) => (
        <React.Fragment
          key={ index }
        >
          <p
            className={ `${ letter === " " ? "mx-3" : "mx-1" } loading-text`}
            style={{
              animationDelay: `${ index * 0.3 }s`
            }}
          >
            { letter }
          </p>
        </React.Fragment>
      ))}
    </div>
  )
}