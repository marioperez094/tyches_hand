//External Imports
import React from "react";

export default function RecaptchaText() {
  return(
    <div className="text-red-500 text-center">This site is protected by reCAPTCHA and the Google
      <a className="underline" href="https://policies.google.com/privacy"> Privacy Policy</a> and
      <a className="underline" href="https://policies.google.com/terms"> Terms of Service</a> apply.
    </div>
  )
};