//External Imports
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Components
import Main from "@components/main/main";
import PlayerCollections from "@components/playerStatsComponents/playerCollections";
import DeckEditor from "@components/playerStatsComponents/deckEditor";

//Context
import { PlayerProvider, usePlayer } from "@context/player";

//Functions
import { getRequest } from "@utils/fetchRequest";

//Stylesheets
import "./playerStats.scss";
import PlayerStatsLayout from "../../components/playerStatsComponents/playerStatsLayout";

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

  
  return(
    <Router>
      <Main>
        <div className="player-stat-screen h-7/8">
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