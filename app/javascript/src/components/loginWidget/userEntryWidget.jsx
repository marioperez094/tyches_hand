//External Imports
import React from "react";

//Components
import HomeButton from "@components/homeButton/homeButton";

//Functions
import { postRequest } from "@utils/fetchRequest";

export default function UserEntryWidget({ setCurrentWidgetState }) {
  const siteKey = "6LfwBr8qAAAAANOZNMJDzZiSckbsJ1brxyR-CsTq" //Google Recaptcha
  const userEntryOptions = [{
      name: "Sign Up",
      buttonAction: () => setCurrentWidgetState("signup"),
    }, {
      name: "Log In",
      buttonAction: () => setCurrentWidgetState("login"),
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
      { userEntryOptions.map((option, index) => {
        return <HomeButton buttonAction={ option.buttonAction } key={ index }>{ option.name }</HomeButton>
      })}
    </>
  )
};