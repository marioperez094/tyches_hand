//External Imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//Context 
import { useLoading } from "@context/loading";

//Components
import Notification from "@components/headers/notification/notification";
import UserEntryWidget from "./userEntryWidget";
import ActiveWidget from "./activeWidget";

//Functions
import { postRequest } from "@utils/fetchRequest";
import { capitalizeFirstWord } from "@utils/utils";

export default function Login() {
  const { startLoading } = useLoading();
  const navigate = useNavigate();

  const [activeWidget, setActiveWidget] = useState("Options");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function successfulLogin(link, payload = null) {
    postRequest(link, payload)
      .then((data) => {
        if (data.success) {
          startLoading();
          return navigate("/game");
        }
      })
      .catch(error => {
        setErrorMessage(capitalizeFirstWord(error.message));
        setSubmitting(false);
      })
  };

  return(
    <div className="w-full h-full border-t-4 textured-red-border widget-container">
      <div className="overflow-y-scroll w-full h-full">
        <Notification className="text-red-500 text-lg rounded-full bg-black bg-opacity-30">
          { errorMessage }
        </Notification>
        <ActiveWidget
          activeWidget={ activeWidget }
          submitting={ submitting }
          setErrorMessage={ setErrorMessage }
          setSubmitting={ setSubmitting }
          successfulLogin={ successfulLogin }
        />
        <UserEntryWidget
          activeWidget={ activeWidget }
          setActiveWidget={ setActiveWidget } 
          successfulLogin={ successfulLogin }
        />
      </div>
    </div>
  )
};