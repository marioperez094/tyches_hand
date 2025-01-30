//External Imports
import React, { useState } from "react";

//Components
import PlayerStatsLayout from "../playerStatsComponents/playerStatsLayout";
import { HomeButton } from "@components/menuComponents/buttons/homeButton/homeButton";
import ErrorMessage from "@components/headers/errorMessage/errorMessage";
import DeckNamer from "./deckNamer";
import DeckContainer from "./deckContainer";

//Functions
import { putRequest } from "@utils/fetchRequest";
import { filterGivenCards } from "@utils/utils";

import useDeckManager from "./useDeckManager.js";

export default function DeckEditor({ player }) {
  if (!player.deck) return null; // Prevent rendering if no deck

  const { deck, deck_cards } = player;
  const { deckCards, collectedCards, moveCards, sortCardsByID, clearDeck, fillDeck, error, setError } = useDeckManager();
  const [deckSaved, setDeckSaved] = useState(false);
  const [filters, setFilters] = useState({
    "High cards": true,
    "Low cards": true,
    Standard: false,
    Blessed: false,
    Bloodstained: false,
    Charred: false,
    Exhumed: false,
    Fleshwoven: false,
  });

  const filteredCollectionCards = filterGivenCards(collectedCards, filters);

  function showDeckSaved() {
    setDeckSaved(true);

    setTimeout(() => {
      setDeckSaved(false);
    }, 5000)
  };

  function filterCards(e) {
    const { name } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  }

  function submitDeck(e) {
    e.preventDefault();
    if (JSON.stringify(deckCards) === JSON.stringify(deck_cards)) return;

    const payload = { deck: { cards: deckCards } };

    putRequest("/api/decks/update/cards", payload)
      .then((data) => {
        if (data.deck) showDeckSaved();
      })
      .catch(error => setError(error.message));
  }

  return (
    <PlayerStatsLayout title="Edit Deck">
      <div className="sticky top-0 deck-buttons-container">
        <div className="flex justify-center deck-buttons overflow-x-scroll w-full">
          <HomeButton 
            buttonAction={ submitDeck }
          >
            Save Deck
          </HomeButton>
          <HomeButton 
            buttonAction={ sortCardsByID }
          >
            Sort Decks
          </HomeButton>
          <HomeButton 
            buttonAction={ clearDeck }
          >
            Clear Deck
          </HomeButton>
          <HomeButton 
            buttonAction={ () => fillDeck(filteredCollectionCards) }
          >
            Fill Deck
          </HomeButton>
        </div>
        <ErrorMessage>{ error }</ErrorMessage>
        <div className="absolute deck-saved-message-container w-full">
          { deckSaved && <p className="text-center text-green-500 deck-saved-message">Deck Saved!</p> }
        </div>
      </div>

      <article className="mx-auto my-3 sm:my-5 lg:my-10">
        <DeckNamer deck={ deck } />
        <DeckContainer
          deck={ deck }
          filters={ filters }
          filterCards={ filterCards }
          deckCards={ deckCards }
          collectedCards={ filteredCollectionCards }
          collectedCardsLength={ collectedCards.length }
          moveCards={ moveCards }
        />
      </article>
    </PlayerStatsLayout>
  );
}
