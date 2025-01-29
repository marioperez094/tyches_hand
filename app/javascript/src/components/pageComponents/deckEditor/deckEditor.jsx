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

export default function DeckEditor({ player }) {
  if (!player.deck) return;
  const { deck, deck_cards, non_deck_cards } = player;

  const [deckCards, setDeckCards] = useState(deck_cards);
  const [collectedCards, setCollectedCards] = useState(non_deck_cards);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    "Standard": true,
    "Blessed": true,
    "Bloodstained": true,
    "Charred": true,
    "Exhumed": true,
    "Fleshwoven": true,
    "High cards": false,
    "Low cards": false,
  });
  const filteredCollectionCards = filterGivenCards(collectedCards, filters);

  function moveCards(cards, targetStack) {
    const isMovingToCollection = targetStack === "Collection Cards";
    
    const updateDeckCards = isMovingToCollection
      ? deckCards.filter((prevCard) => !cards.some((card) => card.id === prevCard.id))
      : [...cards, ...deckCards];

    const updateCollectedCards = isMovingToCollection
      ? [...cards, ...collectedCards]
      : collectedCards.filter((prevCard) => !cards.some((card) => card.id === prevCard.id));
      
    if (updateDeckCards.length !== 52) setError(`You have ${ updateDeckCards.length }/52 cards in your deck.`)
    setDeckCards(updateDeckCards);
    setCollectedCards(updateCollectedCards);
  };

  function showError(message) {
    setError(message);

    setTimeout(() => {
      setError("");
    }, 3000);
  };

  function sortCardsByID() {
    const updateDeckCards = [...deckCards].sort((a, b) => a.id - b.id)
    const updateCollectedCards = [...collectedCards].sort((a, b) => a.id - b.id)

    setDeckCards(updateDeckCards);
    setCollectedCards(updateCollectedCards);
  }

  function clearDeck() {
    moveCards(deckCards, "Collection Cards");
  };

  function fillDeck() {
    moveCards(filteredCollectionCards, "Deck Cards");
  };

  function filterCards(e) {
    const updateFilters = {
      ...filters,
      [e.target.name]: !filters[e.target.name]
    };

    setFilters(updateFilters);
  };

  function submitDeck(e) {
    e.preventDefault();
    if (JSON.stringify(deckCards) === JSON.stringify(deck_cards)) return
    const payload = {
      deck: {
        cards: deckCards
      }  
    };

    putRequest(`/api/decks/update/cards`, payload)
      .then(data => {
        if (data.deck) return showError("Deck Saved!")
      })
      .catch(error => console.log(error))
  };

  return( 
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
            buttonAction={ fillDeck }
          >
            Fill Deck
          </HomeButton>
        </div>
        <ErrorMessage>{ error }</ErrorMessage>
      </div>
      <article className="mx-auto my-3 sm:my-5 lg:my-10">
        <DeckNamer deck={ deck } />
        <DeckContainer
          deck={ deck }
          filterCards={ filterCards }
          filters={ filters }
          deckCards={ deckCards }
          collectedCardsLength={ collectedCards.length }
          collectedCards={ filteredCollectionCards }
          moveCards={ moveCards }
          setError={ setError }
        />
      </article>
    </PlayerStatsLayout>
  )
};
