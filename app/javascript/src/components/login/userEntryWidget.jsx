//External Imports
import React, { useState } from "react";

//Components
import { StandardButton } from "@components/menuComponents/buttons/buttons";

export default function UserEntryWidget({ activeWidget, setActiveWidget, successfulLogin }) {
  const siteKey = process.env['REACT_APP_RECAPTCHA_SITE_KEY'];

  const [submitting, setSubmitting] = useState(false);
  const userEntryOptions = [
    { name: "Sign Up", buttonAction: () => setActiveWidget("Sign Up") }, 
    { name: "Log In", buttonAction: () => setActiveWidget("Log In") }, 
    { name: submitting ? "Creating Account..." : "Guest Mode", buttonAction: (e) => handleSubmit(e)},
  ];

  function handleSubmit(e) {
    if (e) e.preventDefault();
    setSubmitting(true);

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
    
    successfulLogin("/api/players", payload);
  };

  return (
    <>
      { userEntryOptions.map((option) =>
        activeWidget !== option.name ?
          <StandardButton
            key={ option.name }
            buttonAction={ option.buttonAction }
          >
            { option.name }
          </StandardButton>
        : null
      )}
    </>
  )
}