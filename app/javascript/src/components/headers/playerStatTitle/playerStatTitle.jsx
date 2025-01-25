//External Imports
import React from "react";

export default function PlayerStatTitle({ children, isHeading = false }) {
  return(
    <div className={ `mx-${ isHeading ? "5" : "10" } my-${ isHeading ? "5" : "3" }` }>
      <div className="w-full text-center player-stat intricate-border textured-gray-border">
        <div className="text-white font-bold ">{ children }</div>
      </div>
    </div>
  )
};