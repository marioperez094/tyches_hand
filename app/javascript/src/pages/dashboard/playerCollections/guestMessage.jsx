//External Imports
import React, { useState } from "react";

//Components
import Notification from "@components/headers/notification/notification";
import Form from "@components/menuComponents/form";
import { StandardButton } from "@components/menuComponents/buttons/buttons";

//Functions
import { putRequest } from "@utils/fetchRequest";
import { capitalizeFirstWord } from "@utils/utils";

export default function GuestMessage({ fetchPlayerInformation }) {
  const [isVisible, setIsVisible] = useState(true);
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
    if (e) e.preventDefault();
    const { password, password_confirmation } = formData;

    if (password !== password_confirmation) {
      setSubmitting(false);
      return setErrorMessage("The passwords do not match.")
    };

    setSubmitting(true);
    setErrorMessage("");

    const payload = {
      player: formData,
    }

    putRequest("/api/players/convert_to_registered", payload)
      .then((data) => {
        console.log(data)
        setSubmitting(false);

        if (data.success) return fetchPlayerInformation();

        setErrorMessage("Unable to convert account.")
      })
      .catch(error => { 
        setSubmitting(false);
        setErrorMessage(capitalizeFirstWord(error.message))
      });
  };

  function toggleMessage() {
    setIsVisible(prev => !prev);
    setErrorMessage("");
  };
  
  return (
    //Background appears and disappears based on isVisible boolean
    <div className={ `overflow-y-scroll shadow-md rounded-b-lg text-center text-white ${ isVisible ? "guest-message-container" : "" }` }>
      <div className="text-right">
        <button 
          className="bg-red-600 font-bold py-2 px-4 rounded-lg my-3 mr-3 hover:bg-red-700 transition"
          onClick={ () => toggleMessage() }
        >
          { isVisible ? "▲" : "▼" }
        </button>
      </div>
      { isVisible && (
        <>
          { /* Toggles between the message and form */ }
          { showMessage ? (
            <>
              <p className="font-bold text-lg italic">Warning nameless shadow</p>
              <p className="text-sm">Your fate is bound by the hour, when the session fades, so too will all you've gained.
                To defy such oblivion, you need only... 
              </p>
              <StandardButton 
                buttonAction={ () => setShowMessage(false) }
              >
                Carve your name into the ledger.
              </StandardButton>
            </>
          ) : (
            <div className="mx-auto lg:w-1/2">
              <Notification>{ errorMessage }</Notification>
              <Form
                handleSubmit={ handleSubmit }
                formData={ formData }
                handleInputChange={ handleInputChange } 
                submitting={ submitting }
                buttonText={ submitting ? "Converting Account..." : "Convert To Registered" }
              />
            </div>
          )}
        </>
      )}
    </div>
  )
};