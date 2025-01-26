//External Imports
import React from "react";

//Components
import LoginWidget from "./loginWidget";
import SignUpWidget from "./signupWidget";
import RecaptchaText from "./recaptchaText";

export default function ActiveWidget({ currentWidget }) {
  return (
  <>
    { currentWidget === "Sign Up" && <SignUpWidget /> }
    { currentWidget === "Log In" && <LoginWidget /> }
    { currentWidget !== "Options" && <RecaptchaText /> }
  </>
  )
};