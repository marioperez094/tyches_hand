//External Imports
import React, { useState, useEffect } from "react";

//Components
import TycheLogo from "@components/headers/tycheLogo/tycheLogo";
import Notification from "@components/headers/notification/notification";
import UserEntryWidget from "./userEntryWidget";
import ActiveWidget from "./activeWidget";

//Context 
import { useLoading } from "@context/loading";

//Functions
import { getRequest } from "@utils/fetchRequest";

//Stylesheets
import "./login.scss";

export default function Login() {
  const { startLoading } = useLoading();
  const [activeWidget, setActiveWidget] = useState("Options");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    checkAuthenticated();
  }, []);

  function checkAuthenticated() {
    getRequest("/api/authenticated")
      .then((data) => {
        if (data.authenticated) {
          startLoading();
        };
      })
      .catch(error => console.log(error));
  }

  return(
    <div className="flex flex-col items-center h-full" id="login">
      <TycheLogo />

      { /*Main Menu*/ }
      <main className="overflow-y-scroll main-menu-container border-t-4 textured-red-border ">
        <div className="mx-auto py-5 px-8 sm:w-full sm:max-w-xl relative widget-container">
          <Notification 
            className="text-red-500 text-lg rounded-full bg-black bg-opacity-30"
          >
            { errorMessage }
          </Notification>
          <ActiveWidget
            activeWidget={ activeWidget }
            setErrorMessage={ setErrorMessage }
          />
          <UserEntryWidget
            activeWidget={ activeWidget }
            setActiveWidget={ setActiveWidget } 
          />
        </div>
      </main>
    </div>
  )
};