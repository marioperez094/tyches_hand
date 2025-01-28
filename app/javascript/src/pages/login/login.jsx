//External Imports
import React, { useState, useEffect } from "react";

//Components
import Main from "@components/headers/main/main";
import Title from "@components/headers/title/title";
import UserEntryWidget from "@components/pageComponents/loginWidget/userEntryWidget";
import ActiveWidget from "@components/pageComponents/loginWidget/activeWidget";
import { getRequest } from "@utils/fetchRequest";

//Stylesheets
import "./login.scss";

export default function StartScreen() {
  const [currentWidget, setCurrentWidget] = useState("Options");

  useEffect(() => {
    getAuthenticated();
  }, [])

  function setCurrentWidgetState(widget) {
    setCurrentWidget(widget)
  };

  function getAuthenticated() {
    getRequest("/api/authenticated")
      .then((data) => {
        if (data.authenticated) return location.assign("/player/stats")
      })
      .catch(error => console.log(error));
  }

  return (
    <Main>
      <div className="relative w-full blood-drop-container my-5">
        <div className="blood-drop"></div>
        <div className="blood-drop"></div>
        <div className="blood-drop"></div>
        <div className="w-full h-full blood-drop-content">
          <Title title="Tyche's Hand" />
        </div>
      </div>
      <section className="overflow-y-scroll slide-up-animation">
        <div className="mx-auto lg:mt-10 py-2 px-5 sm:w-full sm:max-w-xl relative rounded-b-3xl intricate-border textured-red-border widget-container">
        <ActiveWidget currentWidget={ currentWidget } />
        <UserEntryWidget currentWidget={ currentWidget } setCurrentWidgetState={ setCurrentWidgetState } />
        </div>
      </section>
    </Main>
  )
};

