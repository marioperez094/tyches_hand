//External Imports
import React from "react";

//Components
import InputField from "@components/menuComponents/inputField/inputField";
import { HomeButton } from "@components/menuComponents/buttons/homeButton/homeButton";

export default function Form({ handleSubmit, formData, handleInputChange, submitting, children }) {
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
            />
          )
        })}
        <div className="px-10">
          <HomeButton
            type="submit"
            disabled={ submitting }
          >
            { children }
          </HomeButton>
        </div>
      </div>
    </form>
  )
};