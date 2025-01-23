//External Imports
import React, { useState, useEffect } from "react";

//Components
import Main from "@components/main/main";
import HomeButton from "@components/homeButton/homeButton";
import HealthBar from "@components/playerComponents/healthBar/healthBar";
import CardsInfo from "@components/playerComponents/cardsInfo/cardsInfo";


//Functions
import { getRequest, deleteRequest } from "@utils/fetchRequest";

import { playerMaxHealth } from "@utils/constants";

export default function PlayerStats() {
  const [player, setPlayer] = useState({});

  useEffect(() => {
    getRequest("/api/players/show?deck=true&deck_cards=true")
      .then(data => setPlayer(data.player))
      .catch(error => console.log(error.message))
  }, []);

  function logOut(e) {
    deleteRequest("/api/sessions")
      .then(data => {
        if (data.success) return location.assign("/"); 
      })
      .catch(error => console.log(error));
  }

  if (!player.username) return <Main />
  const { username, blood_pool, deck } = player;
  console.log(deck)

  return (
    <Main>
      <header className="md:flex flex-wrap justify-between p-4">
        <div className="mx-8 mb-5 md:order-2">
          <HomeButton buttonAction={ logOut }>Log Out</HomeButton>
        </div>
        <div className="w-3/4 md:w-3/5 md:mt-16">
          <HealthBar
            name={ username } 
            health={ blood_pool }
            maxHealth={ playerMaxHealth }
            player={ true }
          />
        </div>
      </header>
      <section className="py-10">
        <CardsInfo deck={ deck } />
      </section>
    </Main>
  )
};