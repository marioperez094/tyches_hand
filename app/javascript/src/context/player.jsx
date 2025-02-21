//External Imports
import React, { useState, useContext, createContext } from "react";

//Functions
import { getRequest } from "@utils/fetchRequest";
import { useCard } from "@context/card";

const PlayerContext = createContext(false);

function PlayerProvider({ children }) {
  console.log("render playerProvider")
  
  const { setDeck, setCollectionCards } = useCard();
  const [player, setPlayer] = useState(null);

  console.log("player: " + player)

  function fetchPlayer({ 
    deck_stats = false,
    deck_cards = false,
    collection_cards = false,
    collection_tokens = false,
  } = {}) {
    const queryParams = new URLSearchParams();
    if (deck_stats) queryParams.append("deck_stats", "true");
    if (deck_cards) queryParams.append("deck_cards", "true");
    if (collection_cards) queryParams.append("collection_cards", "true");
    if (collection_tokens) queryParams.append("collection_tokens", "true");

    const url = `/api/players/show?${ queryParams.toString() }`;
    
    getRequest(url)
      .then(data => {
        console.log(data)
        const { deck_cards, collection_cards, ...playerStats } = data.player;
        setPlayer(playerStats)
        if (deck_cards) setDeck(deck_cards);
        if (collection_cards) setCollectionCards(collection_cards);
      })
      .catch(error => console.error(error.message));
  };

  return (
    <PlayerContext.Provider value={{ player, fetchPlayer }}>
      { children }
    </PlayerContext.Provider>
  )
};

function usePlayer() {
  return useContext(PlayerContext);
};

export { PlayerProvider, usePlayer }