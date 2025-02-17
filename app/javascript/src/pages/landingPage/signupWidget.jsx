//External Imports
import React, { useState } from "react";

//Components
import Form from "@components/menuComponents/form";

export default function SignupWidget({ submitting, setErrorMessage, setSubmitting, successfulLogin }) {
  
  console.log("render signupWidget")

  const siteKey = process.env['REACT_APP_RECAPTCHA_SITE_KEY'];
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
    setSubmitting("Sign Up");
  
    window.grecaptcha.ready(() => {
      window.grecaptcha
      .execute(siteKey, { action: "submit"})
      .then((token) => {
        submitForm(token);
      })
      .catch((error) => {
        setErrorMessage("reCAPTCHA error: " + error.message);
        setSubmitting(null);

      })
    })
  };

  function submitForm(captchaToken) {
    const { password, password_confirmation } = formData;

    if (password !== password_confirmation) {
      setSubmitting(null);
      return setErrorMessage("The passwords do not match.") 
    };

    const payload = {
      player: formData, 
      recaptcha_token: captchaToken,
    };
    
    successfulLogin("/api/players", payload);
  };

  return(
    <Form
      handleSubmit={ handleSubmit }
      formData={ formData }
      handleInputChange={ handleInputChange } 
      submitting={ submitting === "Sign Up" }
      buttonText={ submitting === "Sign Up" ? "Signing Up..." : "Sign Up" }
    />
  )
};