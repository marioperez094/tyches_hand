//External Imports
import React from "react";

//Stylesheet
import "./main.scss";

export default function Main({ children }) {
  return (
    <main className="h-screen flex flex-col">
      { children }
    </main>
  )
};