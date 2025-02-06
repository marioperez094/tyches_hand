//External Imports
import React from "react";

//Components
import { StandardButton } from "@components/menuComponents/buttons/buttons";

export default function UserEntryWidget({ activeWidget, setActiveWidget, setErrorMessage }) {
  const userEntryOptions = [
    { name: "Sign Up", buttonAction: () => setActiveWidget("Sign Up") }, 
    { name: "Log In", buttonAction: () => setActiveWidget("Log In") }, 
    { name: "Guest Mode", buttonAction: (e) => handleSubmit(e)},
  ];

  return (
    <>
      { userEntryOptions.map((option) =>
        activeWidget !== option.name ?
          <StandardButton
            key={ option.name }
            buttonAction={ option.buttonAction }
          >
            { option.name }
          </StandardButton>
        : null
      )}
    </>
  )
}