//External Imports
import React, { useState } from "react";

//Components
import InputField from "@components/inputField/inputField";
import { HomeButton } from "@components/homeButton/homeButton";
import ErrorMessage from "@components/errorMessage/errorMessage";

//Functions
import { postRequest } from "@utils/fetchRequest";
import { capitalizeFirstWord } from "@utils/utils";

import { siteKey } from "@utils/constants";

export default function SignUpWidget() {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password_confirmation: "",
  });

  function handleFormData(e) {
    if (e) e.preventDefault();
    setFormData({ ...formData,
      [e.target.name]: e.target.value
    });
  };

  function handleSubmit(e) {
    if (e) e.preventDefault();
  
    window.grecaptcha.ready(() => {
      window.grecaptcha
      .execute(siteKey, { action: "submit"})
      .then((token) => {
        submitForm(token);
      })
      .catch((error) => {
        setError("reCAPTCHA error: " + error.message)
      })
    })
  };

  function submitForm(captchaToken) {
    const { password, password_confirmation } = formData;

    if (password !== password_confirmation) return setError("The passwords do not match.");

    const payload = {
      player: formData, 
      recaptcha_token: captchaToken,
    }

    postRequest("/api/players", payload)
      .then((data) => {
        if (data.player) return location.assign("/tutorial");
      })
      .catch(error => setError(capitalizeFirstWord(error.message)));
  };

  return(
    <form onSubmit={ handleSubmit }>
      <ErrorMessage error={ error } />
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
            Sign Up
          </HomeButton>
        </div>
      </div>
    </form>
  )
};