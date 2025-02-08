//External Imports
import React from "react";

//Components
import LoginWidget from "./loginWidget";
import SignUpWidget from "./signupWidget";
import RecaptchaText from "./recaptchaText";

export default function ActiveWidget({ activeWidget, submitting, setErrorMessage, setSubmitting, successfulLogin }) {
  return (
    <>
      { getActiveWidget(activeWidget, submitting, setErrorMessage, setSubmitting, successfulLogin)}
      { activeWidget !== "Options" && <RecaptchaText /> }
    </>
  )
};

function getActiveWidget(widget, submitting, setErrorMessage, setSubmitting, successfulLogin) {
  switch (widget) {
    case "Sign Up":
      return <SignUpWidget submitting={ submitting } setErrorMessage={ setErrorMessage } setSubmitting={ setSubmitting } successfulLogin={ successfulLogin } />;
    case "Log In":
      return <LoginWidget submitting={ submitting } setSubmitting={ setSubmitting } successfulLogin={ successfulLogin } />;
  }
};