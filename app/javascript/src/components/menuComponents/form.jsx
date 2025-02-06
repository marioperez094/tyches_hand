//External Imports
import React from "react";

//Components
import InputField from "@components/menuComponents/inputFields/inputFields";
import { StandardButton } from "@components/menuComponents/buttons/buttons";

export default function Form({ handleSubmit, formData, handleInputChange, submitting, buttonText }) {
  return (
    <form onSubmit={ handleSubmit }>
      <div className="py-2 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
        { /* Generate input fields dynamically */}
        { Object.entries(formData).map(([fieldName, value]) => {
          return (
            <InputField
              key={ fieldName }
              name={ fieldName }
              type={ fieldName === "username" ? "text" : "password" }
              value={ value }
              changeEvent={ handleInputChange }
              autoComplete={fieldName === "password" ? "current-password" : "off"} 
            />
          )
        })}
        <div className="px-10">
          <StandardButton
            type="submit"
            disabled={ submitting }
          >
            { buttonText }
          </StandardButton>
        </div>
      </div>
    </form>
  )
};