//External Imports
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Components
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