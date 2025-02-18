//External Imports
import React, { useState } from "react";

//Components
import Form from "@components/menuComponents/form";

export default function LoginWidget({ submitting, setSubmitting, successfulLogin }) {
  
  console.log("render loginWidget")

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
    setSubmitting("Log In");

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
      submitting={ submitting === "Log In" }
      buttonText={ submitting === "Log In" ? "Logging In..." : "Log In"}
    />
  )
};