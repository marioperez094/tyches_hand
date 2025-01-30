//External Imports
import React, { useState } from "react";

//Components
import Form from "./form";

//Functions
import { postRequest } from "@utils/fetchRequest";
import { capitalizeFirstWord } from "@utils/utils";

import { siteKey } from "@utils/constants";

export default function SignUpWidget({ setIsLoading, setErrorMessage }) {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password_confirmation: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => 
      ({ ...prevData, [name]: value })
    );
  };

  function handleSubmit(e) {
    if (e) e.preventDefault();
    setSubmitting(true);
  
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
        if (data.player) { 
          setIsLoading(true);
          location.assign("/tutorial"); 
        }
      })
      .catch(error => {
        setErrorMessage(capitalizeFirstWord(error.message));
        setSubmitting(false);
        setIsLoading(false);
      });
  };

  return(
    <Form
      handleSubmit={ handleSubmit }
      formData={ formData }
      handleInputChange={ handleInputChange } 
      submitting={ submitting }
    >
      { submitting ? "Signing up..." : "Sign Up"}
    </Form>
  )
};