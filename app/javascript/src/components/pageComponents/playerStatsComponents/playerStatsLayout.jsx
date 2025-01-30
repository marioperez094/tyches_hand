//External Imports
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

//Components
import Headers from "@components/headers/headers/headers";
import { HomeButton, LinkButton } from "@components/menuComponents/buttons/homeButton/homeButton";
import HoverButtons from "@components/menuComponents/buttons/hoverButtons/hoverButtons";

//Functions
import { deleteRequest } from "@utils/fetchRequest";
import { capitalizeFirstWord } from "@utils/utils";

export default function PlayerStatsLayout({ title, children}) { 
  const currentLocation = useLocation().pathname;

  const editDeckLink = "/player/stats/edit/deck";
  const editTokensLink = "/player/stats/edit/tokens"
  const playerStatsLink = "/player/stats"

  const playerStatsLinks = {
    "/player/stats": {
      firstButton: {
        name: "Edit Deck",
        link: editDeckLink,
        isLink: true
      },
      secondButton: {
        name: "Edit Tokens",
        link: editTokensLink,
        isLink: true
      }
    },
    "/player/stats/edit/deck": {
      firstButton: {
        name: "Player Stats",
        link: playerStatsLink,
        isLink: true
      },
      secondButton: {
        name: "Edit Tokens",
        link: editTokensLink,
        isLink: true
      }
    },
    "/player/stats/edit/tokens": {
      firstButton: {
        name: "Player Stats",
        link: playerStatsLink,
        isLink: true
      },
      secondButton: {
        name: "Edit Cards",
        link: editDeckLink,
        isLink: true
      }
    }
  };
  
  const playButton = {
    name: "Play"
  };
  
  const logOutButton = {
    name: "Log Out",
    buttonAction: () => logOut(),
  };
  
  const buttons = [ playButton, playerStatsLinks[currentLocation].firstButton, playerStatsLinks[currentLocation].secondButton, logOutButton];
  function logOut() {
    deleteRequest("/api/sessions")
      .then(data => {
        if (data.success) return location.assign("/")})
      .catch(error => alert(capitalizeFirstWord(error.message)));
    };

  return (
    <>
      <div className="md:hidden">
        <HoverButtons buttonOptions={ buttons } />
      </div>
      <div className="mx-5 mt-5 flex justify-between items-end">
        <Headers>
          { title }
        </Headers>

        <div className="hidden md:inline header-buttons">
          <LinkButtons buttonOptions={ buttons }/>
        </div>
      </div>
      <section className="relative h-7/8 mx-3 mb-5 overflow-y-scroll overflow-x-hidden player-info intricate-border textured-gray-border">
        { children }
      </section>
    </>
  )
};

export function LinkButtons({ buttonOptions }) { 
  return(
    <>
      { buttonOptions.map((button, index) => {
        if (button.isLink) return (
          <LinkButton
            key={ index }
            link={ button.link }
          >
            { button.name }
          </LinkButton>
        )

        return (
          <HomeButton
            key={ index }
            buttonAction={ button.buttonAction }
          >
            { button.name }
          </HomeButton>
        )
      })}
    </>
  )
};