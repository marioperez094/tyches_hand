//External Imports
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Components
import Main from "@components/main/main";
import { HomeButton } from "@components/homeButton/homeButton";
import Headers from "@components/headers/headers/headers";
import HealthBarWithName from "@components/playerComponents/healthBar/healthBarWithName";
import PlayerCollections from "@components/playerStatComponents/playerCollections";
import DeckEditor from "@components/playerStatComponents/deckEditor";

//Context
import { PlayerProvider, usePlayer } from "@context/player";

//Functions
import { getRequest, deleteRequest } from "@utils/fetchRequest";

//Stylesheets
import "./playerStats.scss";

export default function PlayerStatsScreen() {
  return (
    <PlayerProvider>
      <PlayerStats />
    </PlayerProvider>
  )
};

function PlayerStats() {
  const { player, setPlayer } = usePlayer();
  
  useEffect(() => {
    getRequest("/api/players/show?deck=true&deck_cards=true")
      .then(data => setPlayer(data.player))
      .catch(error => console.log(error.message))
    }, []);
  
  function logOut() {
    deleteRequest("/api/sessions")
      .then(data => {if (data.success) return location.assign("/")})
      .catch(error => alert(capitalizeFirstWord(error.message)));
  };

  
  if (!player) return;

  const { username, blood_pool, deck } = player;
  
  return(
    <Router>
      <Main>
        <div className="player-stat-screen h-7/8">
          <div className="ml-5 mt-5 flex justify-between items-end">
            <Headers>
              Stats
            </Headers>
            <div className="w-1/8 mr-5">
              <HomeButton
                buttonAction={ logOut }
              >
                Log Out
              </HomeButton>
            </div>
          </div>
          <section className="mx-3 mb-5 player-info intricate-border textured-gray-border">
            <div className="mx-auto my-3 sm:my-5 lg:my-8">
              <HealthBarWithName
                name={ username }
                health={ blood_pool } 
                isPlayer={ true }
              />
            </div>
              <Routes>
                <Route
                  exact path="/player/stats/edit/deck"
                  element={ <PlayerCollections deck={ deck } /> }
                />
                <Route
                  path="/player/stats"
                  element={ <DeckEditor /> }
                />
              </Routes>
          </section>
        </div>
      </Main>
    </Router>
  )
};