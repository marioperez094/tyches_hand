//External Imports
import React, { useState, useMemo } from "react";

//Context 
import { usePlayer } from "@context/player";
import { useCard } from "@context/card";

//Components
import { StandardButton } from "@components/menuComponents/buttons/buttons";
import Notification from "@components/headers/notification/notification";
import CardStack from "./cardStack";
import DeckNamer from "./deckNamer";
import DeckContainer from "./deckContainer";
import FilterInputs from "./filterInputs";

//Functions 
import { putRequest } from "@utils/fetchRequest";
import { filterGivenCards } from "@utils/utils";
import { useSelectItem } from "@utils/useSelectItem";

export default function DeckEditor() {
  console.log("render deckEditor")

  const { player } = usePlayer();
  const { deck, collectionCards, handleMoveCards, sortCardsByID, clearDeck, fillDeck } = useCard();
  const { selectedItem, setSelectedItem, source, setSource, handleItemTap } = useSelectItem();
  const [message, setMessage] = useState("")
  const [filters, setFilters] = useState({
    "High cards": true,
    "Low cards": true,
    Exhumed: true,
    Charred: true,
    Fleshwoven: true,
    Blessed: true,
    Bloodstained: true,
    Standard: true,
  });
    
  const filteredCollectionCards = useMemo(() => filterGivenCards(collectionCards, filters), [collectionCards, filters]);

  function showMessage(message) {
    setMessage(message);

    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  function filterCards(e) {
    const { name } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  function handleDeckTap(target) {
    if (!selectedItem || target === source) return;
    const isMovingToCollection = target === "Collection";

    handleMoveCards([selectedItem], isMovingToCollection); //Check if isMovingToCollection
    setSelectedItem(null);
    setSource(null);
  };

  function submitDeck(e) {
    if (e) e.preventDefault();

    const payload = { deck: { cards: deck }};

    putRequest("/api/decks/update/cards", payload)
      .then(data => {
        console.log(data)
        if (data.success) return showMessage("Deck Saved!");
      })
      .catch(error => setMessage(error.message))
  }

  return (
    <>
      { /* Deck editing buttons */ }
      <div className="sticky top-0 deck-buttons-container">
        <div className="flex justify-center deck-buttons overflow-x-scroll w-full">
          <StandardButton
            buttonAction={ submitDeck }
          >
            Save Deck
          </StandardButton>
          <StandardButton
            buttonAction={ sortCardsByID }
          >
            Sort Decks
          </StandardButton>
          <StandardButton
            buttonAction={ clearDeck }
          >
            Clear Deck
          </StandardButton>
          <StandardButton
            buttonAction={ () => fillDeck(filteredCollectionCards) }
          >
            Fill Deck
          </StandardButton>
        </div>

        { message && 
          <Notification 
            text={ message } 
            className={ `absolute w-full ${ message === "Deck Saved!" ? "text-green-500" : "text-red-500" }` } 
          />
        }
      </div>

      <section className="mx-auto my-3 sm:my-5 lg:my-10">
        <DeckNamer name={ player.deck.name } />
        <DeckContainer
          title={ `Collection ${ filteredCollectionCards.length } / ${ collectionCards.length }` }
        >
          <FilterInputs filters={ filters } deckStats={ player.deck } filterCards={ filterCards } />
          <CardStack
            cards={ filteredCollectionCards } 
            selectedCard={ selectedItem }
            handleDeckTap={ () => handleDeckTap("Collection") }
            handleCardTap={ (card) => handleItemTap(card, "Collection") }
          />
        </DeckContainer>
        <DeckContainer
          title={ `Deck ${ deck.length } / 52` }
          redText={ deck.length !== 52 }
          hoverText={{
            description: "The hand of Tyche demands balance. Your deck must consist of precisely 52 cards - no more, no less. To defy this rule is to defy Tyche and such insolence would lead to unimaginable consequences."
          }}
        >
          <CardStack
            cards={ deck } 
            selectedCard={ selectedItem }
            handleDeckTap={ () => handleDeckTap("Deck") }
            handleCardTap={ (card) => handleItemTap(card, "Deck") }
          />
        </DeckContainer>
      </section>
    </>
  )
};