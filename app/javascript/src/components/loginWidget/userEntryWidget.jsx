//External Imports
import React from "react";

//Components
import HomeButton from "@components/homeButton/homeButton";
import SignUpWidget from "@components/loginWidget/signupWidget";
import LoginWidget from "@components/loginWidget/loginWidget";

//Functions
import { postRequest } from "@utils/fetchRequest";

import { siteKey } from "@utils/constants";

export default function UserEntryWidget({ currentWidget, setCurrentWidgetState }) {
  const userEntryOptions = [{
      name: "Sign Up",
      comparison: "signup",
      buttonAction: () => setCurrentWidgetState("signup"),
      widget: <SignUpWidget />
    }, {
      name: "Log In",
      comparison: "login",
      buttonAction: () => setCurrentWidgetState("login"),
      widget: <LoginWidget />
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
        return (
          <UserEntryOption option={ option } currentWidget={ currentWidget } key={ option.name } />
        )
      })}
    </>
  )
};

function UserEntryOption({option, currentWidget}) {
  if (currentWidget === option.comparison) return option.widget
  return <HomeButton buttonAction={ option.buttonAction }>{ option.name }</HomeButton>
};