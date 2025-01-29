//External Imports
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Components
import Main from "@components/headers/main/main";
import PlayerCollections from "@components/pageComponents/playerStatsComponents/playerCollections";
import DeckEditor from "@components/pageComponents/deckEditor/deckEditor";
import PlayerStatsLayout from "@components/pageComponents/playerStatsComponents/playerStatsLayout";

//Context
import { PlayerProvider, usePlayer } from "@context/player";

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
  const { player } = usePlayer();
    
  if (!player) return;
  
  return(
    <Router>
      <Main>
        <div className="player-stat-screen">
          <Routes>
            <Route
              exact path="/player/stats/edit/deck"
              element={ <PlayerCollections player={ player } /> }
            />
            <Route
              path="/player/stats"
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