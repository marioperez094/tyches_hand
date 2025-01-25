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
      <div className="pt-6 sm:px-5">
      <Title title="Tyche's Hand" />
      <section className="mx-auto mt-12 lg:mt-10 py-2 px-5 sm:w-full sm:max-w-xl relative rounded-b-3xl intricate-border textured-red-border widget-container">
        <ActiveWidget currentWidget={ currentWidget } />
        <UserEntryWidget currentWidget={ currentWidget } setCurrentWidgetState={ setCurrentWidgetState } />
      </section>
      </div>
    </Main>
  )
};

