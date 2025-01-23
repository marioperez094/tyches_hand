//External Imports
import React, { useState } from "react";

//Components
import Main from "@components/main/main";
import Title from "@components/title/title";
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
      <Title title="Tyche's Hand" />
      <section className="mx-auto  lg:mt-4 py-2 px-5 sm:w-full sm:max-w-xl relative intricate-border">
        <ActiveWidget currentWidget={ currentWidget } />
        <UserEntryWidget currentWidget={ currentWidget } setCurrentWidgetState={ setCurrentWidgetState } />
      </section>
    </Main>
  )
};

