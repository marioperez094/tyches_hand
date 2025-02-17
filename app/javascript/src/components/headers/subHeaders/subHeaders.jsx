//External Imports
import React from "react";

export default function SubHeaders({ children, isHeading = false }) {
  
  console.log("render subHeaders")
  
  return(
    <div className={ `mx-${ isHeading ? "5" : "10" } my-${ isHeading ? "5" : "3" }` }>
      <div className="w-full text-center player-stat border-b-4 textured-gray-border">
        <div className="text-white font-bold ">{ children }</div>
      </div>
    </div>
  )
};