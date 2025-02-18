//External Imports
import React, { useState } from "react";

//Components
import { StandardButton } from "@components/menuComponents/buttons/buttons";
import ActiveWidget from "./activeWidget";

export default function UserEntryWidget({ 
  options, 
  submitting, 
  setSubmitting, 
  successfulLogin 
}) {
  
  console.log("render userEntryWidget")
  
  const [activeWidget, setActiveWidget] = useState("Options")

  return (
    <>
      <ActiveWidget
        activeWidget={ activeWidget }
        submitting={ submitting }
        setSubmitting={ setSubmitting }
        successfulLogin={ successfulLogin }
      />
      { options.map((option) =>
        activeWidget !== option.name ?
          <StandardButton
            key={ option.name }
            buttonAction={ () => setActiveWidget(option.name) }
          >
            { option.name }
          </StandardButton>
        : null
      )}
    </>
  )
};