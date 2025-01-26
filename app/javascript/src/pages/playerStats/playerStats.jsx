//External Imports
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Components
import Main from "@components/headers/main/main";
import PlayerCollections from "@components/pageComponents/playerStatsComponents/playerCollections";
import DeckEditor from "@components/pageComponents/playerStatsComponents/deckEditor";
import PlayerStatsLayout, { LinkButtons } from "@components/pageComponents/playerStatsComponents/playerStatsLayout";

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

  function setOpenBoolean() {
    setOpen(prevState => !prevState)
  };

  
  return(
    <Router>
      <Main>
        <div className="player-stat-screen">
          <Routes>
            <Route
              exact path="/player/stats"
              element={ <PlayerCollections player={ player } /> }
            />
            <Route
              path="/player/stats/edit/deck"
              element={ <DeckEditor player={ player } /> }
            />
            <Route
              path="/player/stats/edit/tokens"
              element={ <Tokens title="Edit Tokens" /> }
            />
          </Routes>
        </div>
      </Main>
    </Router>
  )
};

function Tokens(title) {
  return (
    <PlayerStatsLayout title="Edit Tokens">
      <div>Hi</div>
    </PlayerStatsLayout>
  )
}