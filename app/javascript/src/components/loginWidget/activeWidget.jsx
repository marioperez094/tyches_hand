//External Imports
import React from "react";

//Components
import LoginWidget from "@components/loginWidget/loginWidget";
import SignUpWidget from "@components/loginWidget/signupWidget";
import RecaptchaText from "@components/loginWidget/recaptchaText";

export default function ActiveWidget({ currentWidget }) {
  return (
  <>
    { currentWidget === "Sign Up" && <SignUpWidget /> }
    { currentWidget === "Log In" && <LoginWidget /> }
    { currentWidget !== "Options" && <RecaptchaText /> }
  </>
  )
};