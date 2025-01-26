//External Imports
import React, { useState } from "react";

//Components
import Main from "@components/main/main";
import Title from "@components/headers/title/title";
import UserEntryWidget from "@components/loginWidget/userEntryWidget";
import ActiveWidget from "@components/loginWidget/activeWidget";

//Stylesheets
import "./login.scss";

export default function StartScreen() {
  const [currentWidget, setCurrentWidget] = useState("Options");

  function setCurrentWidgetState(widget) {
    setCurrentWidget(widget)
  };

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

