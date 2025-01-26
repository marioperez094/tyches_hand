//External Imports
import React, { useState } from "react";

//Components
import Headers from "@components/headers/headers/headers";
import { HomeButton, LinkButton } from "@components/homeButton/homeButton";
import { deleteRequest } from "@utils/fetchRequest";

export default function PlayerStatsLayout({ title, children}) {
  function logOut() {
    deleteRequest("/api/sessions")
      .then(data => {if (data.success) return location.assign("/")})
      .catch(error => alert(capitalizeFirstWord(error.message)));
  };
  
  return (
    <>
      <div className="mx-5 mt-5 flex justify-between items-end">
        <Headers>
          { title }
        </Headers>
        <div className="header-buttons">
          <LinkButton
            link="/player/stats/edit/deck"
          >
            Edit Deck
          </LinkButton>
          <LinkButton
            link="/player/stats/edit/tokens"
          >
            Edit Tokens
          </LinkButton>
          <HomeButton
            buttonAction={ logOut }
          >
            Log Out
          </HomeButton>
        </div>
      </div>
      <section className="mx-3 mb-5 player-info intricate-border textured-gray-border">
        { children }
      </section>
    </>
  )
};