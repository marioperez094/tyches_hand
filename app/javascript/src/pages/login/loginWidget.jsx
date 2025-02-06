//External Imports
import React, { useState } from "react";

//Components
import Form from "@components/menuComponents/form";

//Context 
import { useLoading } from "@context/loading";

//Functions
import { postRequest } from "@utils/fetchRequest";
import { capitalizeFirstWord } from "@utils/utils";

export default function LoginWidget({ setErrorMessage }) {
  const { startLoading } = useLoading();

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
          startLoading();
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