//External Imports
import React, { useState } from "react";

//Components
import Form from "@components/menuComponents/form";

//Functions
import { postRequest } from "@utils/fetchRequest";
import { capitalizeFirstWord } from "@utils/utils";

//Context 
import { useLoading } from "@context/loading";

export default function SignupWidget({ setErrorMessage }) {
  const siteKey = process.env['REACT_APP_RECAPTCHA_SITE_KEY'];
  const { startLoading } = useLoading();
  
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
        setErrorMessage("reCAPTCHA error: " + error.message);
        setSubmitting(false);

      })
    })
  };

  function submitForm(captchaToken) {
    const { password, password_confirmation } = formData;

    if (password !== password_confirmation) return setErrorMessage("The passwords do not match.");

    const payload = {
      player: formData, 
      recaptcha_token: captchaToken,
    }

    postRequest("/api/players", payload)
      .then((data) => {
        if (data.player) { 
          startLoading();
        }
      })
      .catch(error => {
        setErrorMessage(capitalizeFirstWord(error.message));
        setSubmitting(false);
      });
  };

  return(
    <Form
      handleSubmit={ handleSubmit }
      formData={ formData }
      handleInputChange={ handleInputChange } 
      submitting={ submitting }
      buttonText={ submitting ? "Signing Up..." : "Sign Up" }
    />
  )
};