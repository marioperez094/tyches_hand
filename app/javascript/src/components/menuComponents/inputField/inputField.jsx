//External Imports
import React, { useMemo } from "react";

//Components
import { capitalizeFirstWord } from "@utils/utils";

//Stylesheet
import "./inputField.scss";

export default function InputField({ name, type, value,  changeEvent, required = true, ...props }) {
  const capitalizedName = useMemo(() => capitalizeFirstWord(name), [name]);
  return(
    <input 
      id={ name }
      name={ name }
      type={ type }
      value={ value }
      className="h-10 w-full input-field"
      placeholder={ capitalizedName }
      onChange={ changeEvent }
      required={ required }
      { ...props }
    />
  )
};

