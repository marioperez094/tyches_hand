//External Imports
import React, { useState, useContext, createContext } from "react";

//Functions
import useItemManager from "@utils/useItemManager";

const CardContext = createContext(null);

function CardProvider({ children }) {
  const [deck, setDeck] = useState([]);
  const [collectionCards, setCollectionCards] = useState([]);

  console.log("render cardContext")
  console.log("deck: " + deck.length)
  console.log("collectionCards: " + collectionCards.length)

  const { moveItems, sortItemsByID, clearLoadout } = useItemManager();

  function handleMoveCards(items, isMovingToCollections) {
    //Source and target based on moving to collection boolean
    const [source, target, setSource, setTarget] = isMovingToCollections
      ? [deck, collectionCards, setDeck, setCollectionCards] 
      : [collectionCards, deck, setCollectionCards, setDeck]

      //Updates array after cards are moved
      const { updatedSource, updatedTarget } = moveItems(source, target, items);

      setSource(updatedSource);
      setTarget(updatedTarget);
  };

  function sortCardsByID() {
    const { updatedLoadout, updatedCollection } = sortItemsByID(deck, collectionCards);

    setDeck(updatedLoadout);
    setCollectionCards(updatedCollection);
  }

  function clearDeck() {
    const { updatedSource, updatedTarget } = clearLoadout(deck, collectionCards);

    setDeck(updatedSource);
    setCollectionCards(updatedTarget);
  }

  function fillDeck(filteredCollectionCards) {
    const missingCards = 52 - deck.length;
    const fillingCards = filteredCollectionCards.slice(0, missingCards);

    return handleMoveCards(fillingCards, false);
  };

  return (
    <CardContext.Provider value={{ deck, collectionCards, handleMoveCards, sortCardsByID, clearDeck, fillDeck, setDeck, setCollectionCards }}>
      { children }
    </CardContext.Provider>
  )
};

function useCard() {
  return useContext(CardContext);
};

export { CardProvider, useCard };