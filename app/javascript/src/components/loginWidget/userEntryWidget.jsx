//External Imports
import React from "react";

//Components
import HomeButton from "@components/homeButton/homeButton";

//Functions
import { postRequest } from "@utils/fetchRequest";

import { siteKey } from "@utils/constants";

export default function UserEntryWidget({ currentWidget, setCurrentWidgetState }) {
  const userEntryOptions = [{
      name: "Sign Up",
      buttonAction: () => setCurrentWidgetState("Sign Up"),
    }, {
      name: "Log In",
      buttonAction: () => setCurrentWidgetState("Log In"),
    }, {
      name: "Guest Mode",
      buttonAction: (e) => handleSubmit(e),
  }]

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
    const payload = {
      player: {
        guest: true
      },
      recaptcha_token: captchaToken,
    };

    postRequest("/api/players", payload)
      .then((data) => {
        if (data.player) return location.assign("/tutorial")
      })
      .catch(error => console.log(error))
  }

  return(
    <>
      { userEntryOptions.map((option) => {     
        if (currentWidget === option.name ) return 
        return <HomeButton buttonAction={ option.buttonAction } key={ option.name }>{ option.name }</HomeButton>
      })}
    </>
  )
};