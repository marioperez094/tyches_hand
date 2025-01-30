//External Imports
import React, { useState, useEffect } from "react";

//Components
import Title from "@components/headers/title/title";
import UserEntryWidget from "@components/pageComponents/loginWidget/userEntryWidget";
import ActiveWidget from "@components/pageComponents/loginWidget/activeWidget";
import LoadingScreen from "@components/loadingComponents/loadingScreen";
import ErrorMessage from "@components/headers/errorMessage/errorMessage";
import OverFlowDiv from "@components/headers/overFlowDiv/overFlowDiv";

//Functions
import { getRequest } from "@utils/fetchRequest";

//Stylesheets
import "./login.scss";

export default function StartScreen() {
  //Controls which widget is currently active
  const [activeWidget, setActiveWidget] = useState("Options");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //Checks if the user is authenticated on mount
  useEffect(() => {
   checkAuthentication();
  }, [])

  function checkAuthentication() {
    getRequest("/api/authenticated")
      .then((data) => {
        if (data.authenticated) return location.assign("/player/stats")
      })
      .catch(error => console.log(error));
  }

  return (
    <OverFlowDiv>
      { isLoading ? 
        <LoadingScreen /> :
        <>
          { /* Title */ }
          <header>
            <div className="relative w-full blood-drop-container my-5">
              <div className="blood-drop"></div>
              <div className="blood-drop"></div>
              <div className="blood-drop"></div>
              <div className="w-full h-full blood-drop-content">
                <Title title="Tyche's Hand" />
              </div>
            </div>
          </header>

          { /* Main Menu */ }
          <main className="overflow-y-scroll slide-up-animation">
            <div className="mx-auto lg:mt-10 py-2 px-5 sm:w-full sm:max-w-xl relative rounded-b-3xl intricate-border textured-red-border widget-container">
              <ErrorMessage>{ errorMessage }</ErrorMessage>
              <ActiveWidget
                setErrorMessage={ setErrorMessage } 
                activeWidget={ activeWidget } 
                setIsLoading={ setIsLoading }
              />
              <UserEntryWidget 
                setErrorMessage={ setErrorMessage }
                activeWidget={ activeWidget }
                setActiveWidget={ setActiveWidget }
                setIsLoading={ setIsLoading }
              />
            </div>
          </main>
        </>
      }
    </OverFlowDiv>
  )
};

