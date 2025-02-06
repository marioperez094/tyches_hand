//External Imports
import React from "react";

//Components
import LoginWidget from "./loginWidget";
import SignUpWidget from "./signupWidget";
import RecaptchaText from "./recaptchaText";

export default function ActiveWidget({ activeWidget, setErrorMessage }) {
  return (
    <>
      { getActiveWidget(activeWidget, setErrorMessage)}
      { activeWidget !== "Options" && <RecaptchaText /> }
    </>
  )
};

function getActiveWidget(widget, setErrorMessage) {
  switch (widget) {
    case "Sign Up":
      return <SignUpWidget setErrorMessage={ setErrorMessage } />;
    case "Log In":
      return <LoginWidget setErrorMessage={ setErrorMessage } />;
  }
};