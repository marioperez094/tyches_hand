//External Imports
import React, { useState, useEffect, useContext, createContext } from "react";

//Functions
import { getRequest } from "@utils/fetchRequest";

const PlayerContext = createContext(null);

function PlayerProvider({ children }) {
  const [player, setPlayerState] = useState(null);
  const [deck, setCardsInDeck] = useState()

  function fetchPlayer() {
    return getRequest("/api/players/show?deck_cards=true")
      .then(data => {
        if (data.player) {
          const { deck_cards, ...playerStats } = data.player;
          
          setPlayerState(playerStats)
          return setDeck(deck_cards)

        }
        return setPlayerState(false);
      })
      .catch(error => { 
        console.log(error.message) 
        setPlayerState(false);
      });
  };

  function setPlayer(player) {
    setPlayerState(player);
  };

  function setDeck(deck) {
    setCardsInDeck(deck);
  };

  return (
    <PlayerContext.Provider value={{ player, deck, fetchPlayer, setDeck, setPlayer }}>
      { children }
    </PlayerContext.Provider>
  )
};

function usePlayer() {
  return useContext(PlayerContext);
};

export { PlayerProvider, usePlayer }