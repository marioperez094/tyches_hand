//External Imports
import React, { useState } from "react";

//Components
import InputField from "@components/menuComponents/inputField/inputField";
import { HomeButton } from "@components/menuComponents/buttons/homeButton/homeButton";
import ErrorMessage from "@components/headers/errorMessage/errorMessage";

//Functions
import { postRequest } from "@utils/fetchRequest";
import { capitalizeFirstWord } from "@utils/utils";

export default function LoginWidget() {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function handleFormData(e) {
    if (e) e.preventDefault();
    setFormData({ ...formData,
      [e.target.name]: e.target.value
    });
  };

  function submitForm(e) {
    if (e) e.preventDefault();

    postRequest("/api/sessions", { player: formData })
      .then((data) => {
        if (data.success) return location.assign("/player/stats");
      })
      .catch(error => setError(capitalizeFirstWord(error.message)));
  };

  return (
    <form onSubmit={ submitForm}>
      <ErrorMessage>{ error }</ErrorMessage>
      <div className="py-2 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
        { Object.keys(formData).map((field) => {
          return (
            <InputField
              name={ field }
              type={ field === "username" ? "text" : "password" }
              value={ formData[field] }
              changeEvent={ handleFormData }
              key={ field }
            />
          )
        })}
        <div className="px-10">
          <HomeButton
          type="submit"
          >
            Log In
          </HomeButton>
        </div>
      </div>
    </form>
  )
};