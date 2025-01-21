//External Imports
import React from "react";

//Components
import { capitalizeFirstWord } from "@utils/utils";

//Stylesheet
import "./inputField.scss";

export default function InputField({ name, type, changeEvent, required = true }) {
  const capitalizedName = capitalizeFirstWord(name)
  return(
    <>
      <input 
        id={ name }
        name={ name }
        type={ type }
        className="h-15 md:h-10 w-full input-field"
        placeholder={ capitalizedName }
        onChange={ (e) => changeEvent(e) }
        required={ required }
      />
    </>
  )
};

