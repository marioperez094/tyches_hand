//External Imports
import React, { useState, useEffect, useContext, createContext } from "react";

//Functions
import { getRequest } from "@utils/fetchRequest";

const PlayerContext = createContext(null);

function PlayerProvider({ children }) {
  const [player, setPlayerState] = useState(null);
  const [deck, setCardsInDeck] = useState();

  function fetchPlayer({ deck_stats = false, deck_cards = false, collection_cards = false } = {}) {
    const queryParams = new URLSearchParams();
    if (deck_stats) queryParams.append("deck_stats", "true");
    if (deck_cards) queryParams.append("deck_cards", "true");
    if (collection_cards) queryParams.append("collection_cards", "true");

    const url = `/api/players/show?${ queryParams.toString() }`;

    return getRequest(url)
      .then(data => {
        if (!data.player) {
          return null;
        }

        const { deck_cards, ...playerStats} = data.player;

        setPlayerState(playerStats);
        if (deck_cards) setDeck(deck_cards);

        return data.player;
      })
      .catch(error => {
        console.error("Fetch Player Error: ", error.message);
        return null;
      })
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