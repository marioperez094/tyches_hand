//External Imports
import React from "react";

// LoadingLine Component: Pre-renders all lines and fades in text when ready
export default function LoadingLine({ animationDelay, loadingLine, isLoading }) {

  console.log("render loadingLine")

  return (
    <li
      className={ `text-white flex ${ isLoading ? "loading-line-container" : "height-container" }` }
      style={{
        animationDelay: `${ animationDelay * 2.5 }s`
      }}
    >
      { loadingLine.split("").map((letter, index) => (
        <span 
          key={ index } 
          className={isLoading ? "loading-text" : "loading-text-exit" }
          style={{ "--delay": `${ index * 0.3 }s` }}
          data-text={ letter }
        >
          { letter }
        </span>
      ))}
    </li>
  )
}