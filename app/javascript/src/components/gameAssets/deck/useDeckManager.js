//External Imports
import { useState } from "react";

//Context 
import { usePlayer } from "@context/player";

export default function useDeckManager() {
  const { player } = usePlayer();
  const initialDeckCards = player.deck_cards || [];
  const initialCollectedCards = player.non_deck_cards || [];
  
  const [deckCards, setDeckCards] = useState(initialDeckCards);
  const [collectedCards, setCollectedCards] = useState(initialCollectedCards);
  const [error, setError] = useState("");

  function moveCards(cards, targetStack) {
    const isMovingToCollection = targetStack === "Collection Cards";

    const updatedDeckCards = isMovingToCollection
      ? deckCards.filter((card) => !cards.some((c) => c.id === card.id))
      : [...cards, ...deckCards];

    const updatedCollectedCards = isMovingToCollection
      ? [...cards, ...collectedCards]
      : collectedCards.filter((card) => !cards.some((c) => c.id === card.id));

    if (updatedDeckCards.length !== 52) setError(`You have ${updatedDeckCards.length}/52 cards in your deck.`);
    else setError("");

    setDeckCards(updatedDeckCards);
    setCollectedCards(updatedCollectedCards);
  }

  function sortCardsByID() {
    setDeckCards((prev) => [...prev].sort((a, b) => a.id - b.id));
    setCollectedCards((prev) => [...prev].sort((a, b) => a.id - b.id));
  }

  function clearDeck() {
    moveCards(deckCards, "Collection Cards");
  }

  function fillDeck(filteredCollectionCards) {
    const missingCards = 52 - deckCards.length;
    const fillingCards = filteredCollectionCards.slice(0, missingCards);
    moveCards(fillingCards, "Deck Cards");
  }

  return { deckCards, collectedCards, moveCards, sortCardsByID, clearDeck, fillDeck, error, setError };
}