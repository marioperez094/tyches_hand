//External Imports
import React, { useState, useContext, createContext } from "react";

const PlayerContext = createContext(false);

function PlayerProvider({ children }) {
  const [player, changePlayer] = useState(false);

  function setPlayer(player) {
    changePlayer(player);
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