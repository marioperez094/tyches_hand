//External Imports
import React from "react";

export default function Notification({ children, className }) {
  return(
    <div className={ `${ className }` }>
      <p className="text-center">{ children }</p>
    </div>
  )
};