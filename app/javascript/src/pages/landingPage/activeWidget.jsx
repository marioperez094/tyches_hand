//External Imports
import React, { useState } from "react";

//Components
import LoginWidget from "./loginWidget";
import SignUpWidget from "./signupWidget";
import RecaptchaText from "./recaptchaText";

export default function ActiveWidget({ 
  activeWidget, 
  submitting, 
  setSubmitting, 
  successfulLogin 
}) {
  
  return (
    <>
      { getActiveWidget(activeWidget, submitting, setSubmitting, successfulLogin)}
      { activeWidget !== "Options" && <RecaptchaText /> }
    </>
  )
};

function getActiveWidget(widget, submitting, setSubmitting, successfulLogin) {
  switch (widget) {
    case "Sign Up":
      return <SignUpWidget submitting={ submitting } setSubmitting={ setSubmitting } successfulLogin={ successfulLogin } />;
    case "Log In":
      return <LoginWidget submitting={ submitting } setSubmitting={ setSubmitting } successfulLogin={ successfulLogin } />;
  }
};