//External Imports
import React, { useState } from "react";

//Context
import { usePlayer } from "@context/player";

//Components
import Notification from "@components/headers/notification/notification";
import Form from "@components/menuComponents/form";

//Functions
import { putRequest } from "@utils/fetchRequest";
import { capitalizeFirstWord } from "@utils/utils";

export default function GuestMessage() {
  const { fetchPlayer } = usePlayer();
  const [showMessage, setShowMessage] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
    const { password, password_confirmation } = formData;

    if (e) e.preventDefault();
    setSubmitting(true);

    if (password !== password_confirmation) {
      setSubmitting(false);
      return setErrorMessage("The passwords do not match.")
    };

    const payload = {
      player: formData,
    }

    putRequest("/api/players/convert_to_registered", payload)
      .then((data) => {
        console.log(data)
        setSubmitting(false);

        if (data.success) return fetchPlayer();
      })
      .catch(error => { 
        setSubmitting(false);
        setErrorMessage(capitalizeFirstWord(error.message))
      });
  }
  
  return (
      <div className="h-full flex text-xl mx-5 flex-col justify-center items-center text-white">
        { showMessage ? (
          <p>Though Tyche permits phantoms to wager at her table, their existence is fleeting.
            Your fate is bound to the hour; when the session fades, so too will all you've gained.
            To defy such oblivion, 
            <button onClick={ () => setShowMessage(prev => !prev) }className="text-red-500">YOU NEED ONLY CARVE YOUR NAME INTO THE LEDGER</button>
          </p>
        ) : (
          <>
            <Notification>{ errorMessage }</Notification>
            <Form
              handleSubmit={ handleSubmit }
              formData={ formData }
              handleInputChange={ handleInputChange } 
              submitting={ submitting }
              buttonText={ submitting ? "Converting Account..." : "Convert To Registered" }
            />
          </>
        )}
      </div>
  )
};