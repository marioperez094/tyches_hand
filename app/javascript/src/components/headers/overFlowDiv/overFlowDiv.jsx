//External Imports
import React from "react";

//Stylesheet
import "./overFlowDiv.scss";

export default function OverFlowDiv({ children }) {
  return (
    <main className="overflow-hidden h-screen flex flex-col">
      { children }
    </main>
  )
};