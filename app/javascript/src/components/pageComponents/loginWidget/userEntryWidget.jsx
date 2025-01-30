//External Imports
import React from "react";

//Components
import { HomeButton } from "@components/menuComponents/buttons/homeButton/homeButton";

//Functions
import { postRequest } from "@utils/fetchRequest";

import { siteKey } from "@utils/constants";

export default function UserEntryWidget({ activeWidget, setActiveWidget, setIsLoading, setErrorMessage }) {  
  const userEntryOptions = [
    { name: "Sign Up", buttonAction: () => setActiveWidget("Sign Up") }, 
    { name: "Log In", buttonAction: () => setActiveWidget("Log In") }, 
    { name: "Guest Mode", buttonAction: (e) => handleSubmit(e)},
  ];

  //Handles reCAPTCHA and submits guest mode
  function handleSubmit(e) {
    if (e) e.preventDefault();

    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(siteKey, { action: "submit"})
        .then((token) => {
          submitGuestMode(token);
        })
        .catch((error) => {
          alert("reCAPTCHA error: " + error.message)
        })
    })
  };  

  function submitGuestMode(captchaToken) {
    setIsLoading(true);
    
    const payload = {
      player: {
        guest: true
      },
      recaptcha_token: captchaToken,
    };

    postRequest("/api/players", payload)
      .then((data) => {
        if (data.player) location.assign("/tutorial")
      })
      .catch(error => setErrorMessage(capitalizeFirstWord(error.message)))
  };

  return(
    <>
      { userEntryOptions.map((option) => 
        activeWidget !== option.name ? (
          <HomeButton 
            key={ option.name }
            buttonAction={ option.buttonAction }
          >
            { option.name }
          </HomeButton>
        ) : null
      )}
    </>
  )
};