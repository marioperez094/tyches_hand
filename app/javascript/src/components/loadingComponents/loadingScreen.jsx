//External Imports
import React, { useState, useEffect } from "react";

//Constants
import loadingScreenText from "@utils/loadingScreenText.json";

//Stylesheets
import "./loadingScreen.scss";

export default function LoadingScreen() {

  //Select a random number from the length of loading screen text
  const [randomLineIndex] = useState(() => 
    Math.floor(Math.random() * loadingScreenText.loadingScreenText.length)
  );
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  //Retrieves selected loading lines
  const selectedLoadingLines = loadingScreenText.loadingScreenText[randomLineIndex];


  useEffect(() => {
    const addLineTimer = setInterval(() => {
      setCurrentLineIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;

        //Stops the interval when all lines are displayed
        if (nextIndex >= selectedLoadingLines.length) {
          clearInterval(addLineTimer);
          return prevIndex;
        }
        
        return nextIndex;
      });
    }, 2000);

    return () => clearInterval(addLineTimer);
  }, []);

  return (
    <main className="h-screen">
      <div className="w-full h-full flex flex-col justify-center items-center">
        { selectedLoadingLines.map((line, index) => (
          <LoadingLine key={ index } loadingLine={ line } isVisible={ index <= currentLineIndex } />
        ))}
      </div>
    </main>
  )
};

// LoadingLine Component: Pre-renders all lines and fades in text when ready
function LoadingLine({ loadingLine, isVisible }) {
  return (
    <div className="text-white flex loading-line-container">
      { loadingLine.split("").map((letter, index) => (
        <React.Fragment
          key={ index }
        >
        { isVisible &&
          <p
            className={ `loading-text ${ letter === " " ? "mx-3" : "mx-1" }` }
            style={{
              animationDelay: `${ index * 0.5 }s`
            }}
          >
            { letter }
          </p>  
        }
        </React.Fragment>
      ))}
    </div>
  );
}