//External Imports
import React, { useMemo } from "react";

//Components
import { capitalizeFirstLetter } from "@utils/utils";

//Stylesheet
import "./inputFields.scss";

export default function InputField({ name, type, value,  changeEvent, required = true, ...props }) {
  const capitalizedName = useMemo(() => capitalizeFirstLetter(name), [name]);

  console.log("render inputField")
  
  return(
    <input 
      id={ name }
      name={ name }
      type={ type }
      value={ value }
      className="h-10 w-full px-4 text-field"
      placeholder={ capitalizedName }
      onChange={ changeEvent }
      required={ required }
      { ...props }
    />
  )
};