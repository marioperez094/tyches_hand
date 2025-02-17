//External Imports
import React, { useMemo } from "react";

//Functions 
import { capitalizeFirstLetter } from "@utils/utils";

//Stylesheets
import "./notification.scss";

export default function Notification({ text, className="text-red-500" }) {
  const capitalizedText = useMemo(() => capitalizeFirstLetter(text), [text])
  console.log("render notification")

  return (
    <div className={ `${ className } text-lg notification`}>
      <p className="text-center">
        { capitalizedText }
      </p>
    </div>
  )
};