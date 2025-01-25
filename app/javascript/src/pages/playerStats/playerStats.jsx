//External Imports
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Components
import Main from "@components/main/main";
import Headers from "@components/headers/headers/headers";
import HealthBarWithName from "@components/playerComponents/healthBar/healthBarWithName";
import CardInfo from "@components/playerStatComponents/cardInfo/cardInfo";

//Context
import { PlayerProvider, usePlayer } from "@context/player";

//Functions
import { getRequest } from "@utils/fetchRequest";

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

  
  if (!player) return;

  const { username, blood_pool, deck } = player;
  
  return(
    <Router>
      <Main>
        <div className="player-stat-screen h-7/8">
          <div className="ml-5 mt-5">
            <Headers>
              Stats
            </Headers>
          </div>
          <section className="mx-3 mb-5 overflow-hidden player-info intricate-border textured-gray-border">
            <div className="mx-auto my-3 sm:my-5 lg: my-10">
              <HealthBarWithName
                name={ username }
                health={ blood_pool } 
                isPlayer={ true }
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 h-full py-2">
              <Routes>
                <Route
                  exact path="/player/stats"
                  element={ <CardInfo deck={ deck } /> }
                />
                <Route
                  path="/player/stats/deck/edit"
                  element={ <div>Hi</div>}
                />
              </Routes>
          
              <article className="mx-auto player-info-container">{ username }</article>
          
              <article className="mx-auto player-info-container">{ username }</article>
            </div>
          </section>
        </div>
      </Main>
    </Router>
  )
};