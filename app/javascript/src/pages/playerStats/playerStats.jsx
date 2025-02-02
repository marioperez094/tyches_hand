//External Imports
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Components
import PlayerCollections from "@components/pageComponents/playerStatsComponents/playerCollections";
import DeckEditor from "@components/pageComponents/deckEditor/deckEditor";
import PlayerStatsLayout from "@components/pageComponents/playerStatsComponents/playerStatsLayout";
import OverFlowDiv from "@components/headers/overFlowDiv/overFlowDiv";

//Context
import { PlayerProvider, usePlayer } from "@context/player";

//Stylesheets
import "./playerStats.scss";

export default function PlayerStatsScreen() {
  return (
    <PlayerProvider>
      <Router>
        <OverFlowDiv>
          <div className="relative player-stat-screen">
            <PlayerStats />
          </div>
        </OverFlowDiv>
      </Router>
    </PlayerProvider>
  )
};

function PlayerStats() {
  const { player } = usePlayer();
    
  if (!player) return null; //Doesn't render if player not found
  
  return(
    <Routes>
      <Route
        exact path="/player/stats"
        element={ <PlayerCollections player={ player } /> } //All player stats
      />
      <Route
        path="/player/stats/edit/deck"
        element={ <DeckEditor player={ player } /> } //Edit deck
      />
      <Route
        path="/player/stats/edit/tokens"
        element={ <Tokens title="Edit Tokens" /> }//Edit tokens
      />
    </Routes>
  )
};

function Tokens(title) {
  return (
    <PlayerStatsLayout title="Edit Tokens">
      <div>Hi</div>
    </PlayerStatsLayout>
  )
}