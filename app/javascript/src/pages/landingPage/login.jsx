//External Imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//Context
import { useLoading } from "@context/loading";

//Components
import { StandardButton } from "@components/menuComponents/buttons/buttons";
import UserEntryWidget from "./userEntryWidget";
import Notification from "@components/headers/notification/notification";

//Functions
import { postRequest } from "@utils/fetchRequest";

export default function Login({ setIsAuthenticated }) {
  
  console.log("render login")
  
  const siteKey = process.env['REACT_APP_RECAPTCHA_SITE_KEY'];
  const navigate = useNavigate();
  const { startLoading } = useLoading();
  const [submitting, setSubmitting] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  //All login options
  const userEntryOptions = [
    { name: "Sign Up" }, 
    { name: "Log In" }, 
  ];

  async function submitGuest(e) {
    if (e) e.preventDefault();
    setSubmitting("Guest");

    //Google recaptcha
    try {
      await new Promise ((resolve) => window.grecaptcha.ready(resolve));
      const token = await window.grecaptcha.execute(siteKey, { action: "submit" });

      const payload = {
        player: { guest: true },
        recaptcha_token: token,
      }

      successfulLogin("/api/players", payload);
    } catch (error) {
      setSubmitting(false);
      console.error(`Recaptcha error: ${ error.message }`)
    };
  };

  function successfulLogin(link, payload) {
    postRequest(link, payload)
      .then((data) => {          
        if (data.success) {
          setIsAuthenticated(true)
          startLoading();

          //If new account redirects to tutorial, otherwise redirects to dashboad
          const redirectTo = link === "/api/players" ? "/game" : "/dashboard";
          navigate(redirectTo);
        }
      })
      .catch(error => {
        setErrorMessage(error.message)
        console.error(`Guest Error: ${ error.message }`)
        setSubmitting(false);
      })
  };

  return (
    <div className="w-full h-full border-t-4 textured-red-border widget-container">
      <div className="overflow-y-scroll w-full h-full">
        { errorMessage && <Notification text={ errorMessage }/> }
        <UserEntryWidget 
          options={ userEntryOptions }
          submitting={ submitting }
          setSubmitting={ setSubmitting }
          successfulLogin={ successfulLogin }
        />   
        <StandardButton
          buttonAction={ submitGuest }
          disabled={ submitting === "Guest" }
        >
          { submitting === "Guest" ? "Creating Account..." : "Guest" }
        </StandardButton>
      </div>
    </div>
  )
};

