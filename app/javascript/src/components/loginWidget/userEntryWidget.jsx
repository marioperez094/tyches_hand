//External Imports
import React from "react";

//Components
import HomeButton from "@components/homeButton/homeButton";

//Functions
import { postRequest } from "@utils/fetchRequest";

export default function UserEntryWidget({ setCurrentWidgetState }) {
  const userEntryOptions = [{
      name: "Sign Up",
      buttonAction: () => setCurrentWidgetState("signup"),
    }, {
      name: "Log In",
      buttonAction: () => setCurrentWidgetState("login"),
    }, {
      name: "Guest Mode",
      buttonAction: (e) => submitGuestMode(e),
  }]

  function submitGuestMode(e) {
    if (e) e.preventDefault();
    postRequest("/api/players", { player: { guest: true } })
      .then((data) => {
        if (data.player) return location.assign("/tutorial")
      })
      .catch(error => console.log(error))
  };

  return(
    <>
      { userEntryOptions.map((option, index) => {
        return <HomeButton buttonAction={ option.buttonAction } key={ index }>{ option.name }</HomeButton>
      })}
    </>
  )
};