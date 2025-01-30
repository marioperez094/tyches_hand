//External Imports
import React from "react";

//Components
import LoginWidget from "./loginWidget";
import SignUpWidget from "./signupWidget";
import RecaptchaText from "./recaptchaText";

export default function ActiveWidget({ activeWidget, setIsLoading, setErrorMessage }) {
  return (
    <>
      { getActiveWidget(activeWidget, setIsLoading, setErrorMessage)}
      { activeWidget !== "Options" && <RecaptchaText setLoading={ setIsLoading } /> }
    </>
  )
};

function getActiveWidget(widget, setIsLoading, setErrorMessage) {
  switch (widget) {
    case "Sign Up":
      return <SignUpWidget setIsLoading={ setIsLoading } setErrorMessage={ setErrorMessage } />;
    case "Log In":
      return <LoginWidget setIsLoading={ setIsLoading } setErrorMessage={ setErrorMessage } />;
  }
};