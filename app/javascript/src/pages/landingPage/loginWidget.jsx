//External Imports
import React, { useState } from "react";

//Components
import Form from "@components/menuComponents/form";

export default function LoginWidget({ submitting, setSubmitting, successfulLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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

    const payload = {
      player: formData
    };
    
    successfulLogin("/api/sessions", payload);
  };

  return (
    <Form
      handleSubmit={ handleSubmit }
      formData={ formData }
      handleInputChange={ handleInputChange }
      submitting={ submitting }
      buttonText={ submitting ? "Logging In..." : "Log In"}
    />
  )
};