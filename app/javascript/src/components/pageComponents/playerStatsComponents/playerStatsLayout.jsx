//External Imports
import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

//Components
import Headers from "@components/headers/headers/headers";
import { HomeButton, LinkButton } from "@components/menuComponents/buttons/homeButton/homeButton";
import HoverButtons from "@components/menuComponents/buttons/hoverButtons/hoverButtons";

//Functions
import { deleteRequest } from "@utils/fetchRequest";
import { capitalizeFirstWord } from "@utils/utils";

//Navigation structure
const playerStatOptions = {
  "/player/stats": [
    { name: "Edit Deck", link: "/player/stats/edit/deck", isLink: true },
    { name: "Edit Tokens", link: "/player/stats/edit/tokens", isLink: true },
  ],
  "/player/stats/edit/deck": [
    { name: "Player Stats", link: "/player/stats", isLink: true },
    { name: "Edit Tokens", link: "/player/stats/edit/tokens", isLink: true },
  ],
  "/player/stats/edit/tokens": [
    { name: "Player Stats", link: "/player/stats", isLink: true },
    { name: "Edit Cards", link: "/player/stats/edit/deck", isLink: true },
  ],
};

export default function PlayerStatsLayout({ title, children }) { 
  const currentLocation = useLocation().pathname;

  function logOut() {
    deleteRequest("/api/sessions")
      .then(data => {
        if (data.success) return location.assign("/")
      })
      .catch(error => alert(capitalizeFirstWord(error.message)));
    };

    const buttons = useMemo(() => [
      { name: "Play" },
      ...playerStatOptions[currentLocation],
      { name: "Log Out", buttonAction: logOut },
    ], [currentLocation]);

  return (
    <>
      { /* Mobile Navigation */ }
      <div className="md:hidden">
        <HoverButtons buttonOptions={ buttons } />
      </div>

      { /* Header & Buttons */ }
      <div className="mx-5 mt-5 flex justify-between items-end">
        <Headers>
          { title }
        </Headers>

        <div className="hidden md:inline header-buttons">
          <LinkButtons buttonOptions={ buttons }/>
        </div>
      </div>

      { /* Content */ }
      <main className="h-full mx-3 mb-5 overflow-y-scroll overflow-x-hidden player-info intricate-border textured-gray-border">
        { children }
      </main>
    </>
  )
};

export function LinkButtons({ buttonOptions }) { 
  return(
    <>
      { buttonOptions.map((button, index) => 
        button.isLink ? (
          <LinkButton key={ index } link={ button.link }>{ button.name }</LinkButton>
        ) : (
          <HomeButton key={ index } buttonAction={ button.buttonAction }>{ button.name }</HomeButton>
        )
      )}
    </>
  )
};