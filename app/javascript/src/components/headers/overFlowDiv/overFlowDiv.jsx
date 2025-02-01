//External Imports
import React from "react";

//Stylesheet
import "./overFlowDiv.scss";

export default function OverFlowDiv({ children, className = "" }) {
  return (
    <div className={`overflow-hidden h-screen flex flex-col overflow-div ${ className }`}>
      {children}
    </div>
  );
}