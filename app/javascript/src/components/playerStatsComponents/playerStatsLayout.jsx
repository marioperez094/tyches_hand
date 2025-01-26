//External Imports
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

//Components
import Headers from "@components/headers/headers/headers";
import { HomeButton, LinkButton } from "@components/homeButton/homeButton";

//Functions
import { deleteRequest } from "@utils/fetchRequest";
import { capitalizeFirstWord } from "@utils/utils";

export default function PlayerStatsLayout({ title, children}) { 
  return (
    <>
      <div className="mx-5 mt-5 flex justify-between items-end">
        <Headers>
          { title }
        </Headers>
        
        <div className="hidden sm:inline header-buttons">
          <LinkButtons />
        </div>
      </div>
      <section className="h-full mx-3 mb-5 overflow-y-scroll overflow-x-hidden player-info intricate-border textured-gray-border">
        { children }
      </section>
    </>
  )
};

export function LinkButtons({ }) { 
  const currentLocation = useLocation().pathname;

  //Lists All Routes and Possible Button Combinations
  const buttons = {
    "/player/stats": {
      firstButton: {
        name: "Edit Deck",
        link: "/player/stats/edit/deck"
      },
      secondButton: {
        name: "Edit Tokens",
        link: "/player/stats/edit/tokens"
      }
    },
    "/player/stats/edit/deck": {
      firstButton: {
        name: "Player Stats",
        link: "/player/stats"
      },
      secondButton: {
        name: "Edit Tokens",
        link: "/player/stats/edit/tokens"
      }
    },
    "/player/stats/edit/tokens": {
      firstButton: {
        name: "Player Stats",
        link: "/player/stats"
      },
      secondButton: {
        name: "Edit Cards",
        link: "/player/stats/edit/cards"
      }
    }
  };

  function logOut() {
    deleteRequest("/api/sessions")
      .then(data => {
        console.log(data)
        if (data.success) return location.assign("/")})
      .catch(error => alert(capitalizeFirstWord(error.message)));
  };

  return(
    <>
      <LinkButton>Play</LinkButton>
      <LinkButton
        link={ buttons[currentLocation].firstButton.link }
      >
        { buttons[currentLocation].firstButton.name }
      </LinkButton>
      <LinkButton
        link={ buttons[currentLocation].secondButton.link }
      >
        { buttons[currentLocation].secondButton.name }
      </LinkButton>
      <HomeButton
        buttonAction={ logOut }
      >
        Log Out
      </HomeButton>
    </>
  )
}