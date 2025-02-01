//External Imports
import React, { useState } from "react";

//Components
import Form from "./form";

//Functions
import { postRequest } from "@utils/fetchRequest";
import { capitalizeFirstWord } from "@utils/utils";

export default function LoginWidget({ setIsLoading, setErrorMessage }) {
  const [submitting, setSubmitting] = useState(false);
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
    }

    postRequest("/api/sessions", payload)
      .then((data) => {
        if (data.success) {
          setIsLoading(true);
          location.assign("/player/stats"); 
        }
      })
      .catch(error => {
        setErrorMessage(capitalizeFirstWord(error.message));
        setSubmitting(false);
      });
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