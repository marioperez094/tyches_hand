//External Imports
import React, { useState, useEffect, useContext, createContext } from "react";

//Functions
import { getRequest } from "@utils/fetchRequest";

const PlayerContext = createContext(false);

function PlayerProvider({ children }) {
  const [player, setPlayerState] = useState(null);

  useEffect(() => {
    getRequest("/api/players/show?deck=true&deck_cards=true")
      .then(data => setPlayerState(data.player))
      .catch(error => console.log(error.message));
  }, []);

  function setPlayer(player) {
    setPlayerState(player);
  };

  return (
    <PlayerContext.Provider value={{ player, setPlayer }}>
      { children }
    </PlayerContext.Provider>
  )
};

function usePlayer() {
  return useContext(PlayerContext);
};

export { PlayerProvider, usePlayer }

/*useEffect(() => {
    getRequest("/api/players/show?deck=true&deck_cards=true")
      .then(data => setPlayer(data.player))
      .catch(error => console.log(error.message))
    }, []); */