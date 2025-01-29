//External Imports
import React, { useState } from "react";
import ReactDOM from "react-dom/client";

//Components
import PlayerStatTitle from "@components/headers/playerStatTitle/playerStatTitle";
import HoverText from "@components/headers/hoverText/hoverText";
import Card from "@components/gameAssets/cards/card";
import CardStack from "@components/gameAssets/cards/cardStack";
import { deckTypes } from "@utils/constants";

//Functions
import { capitalizeFirstWord } from "@utils/utils";

export default function DeckContainer({
  filters, 
  filterCards,
  deck,
  deckCards, 
  collectedCards, 
  collectedCardsLength,
  moveCards
}) {
  const [draggingCard, setDraggingCard] = useState(null);
  const [cardSource, setCardSource] = useState("");
  

  const hoverText = { 
    name: "52 Cards", 
    description: "The hand of Tyche demands balance. Your deck must consist of precisely 52 cards - no more, no less. To defy this rule is to defy Tyche and such insulence would lead to unimaginable consequences." 
  };

  function handleDragStart(e, card, cardSource) {
    setDraggingCard(card);
    setCardSource(cardSource);
        
    const dragPreviewContainer = document.createElement("div");
    dragPreviewContainer.style.position = "absolute";
    dragPreviewContainer.style.top = "-9999px";
    dragPreviewContainer.style.left = "-9999px";
    
    document.body.appendChild(dragPreviewContainer);
    
    const root = ReactDOM.createRoot(dragPreviewContainer);
    root.render(<Card card={ card } />);
    
    e.dataTransfer.setDragImage(dragPreviewContainer, 75, 100);
    
    setTimeout(() => {
      root.unmount();
      document.body.removeChild(dragPreviewContainer);
    }, 0);
  };

  function handleCardDrop(e, targetStack) {
    e.preventDefault();
    if (!draggingCard || cardSource === targetStack) return setDraggingCard(null);
  
    moveCards([draggingCard], targetStack);
  
    setDraggingCard(null);
  };

  return (
    <>
      <div
        className="w-full card-drop px-5"
        onDragOver={ (e) => e.preventDefault() }
        onDrop={ (e) => handleCardDrop(e, "Collection Cards") }
      >
        <PlayerStatTitle>Cards Collected { collectedCardsLength }</PlayerStatTitle>
        <FilterInputs 
          filterCards={ filterCards }
          filters={ filters } 
          deck={ deck } 
        />
        <CardStack
          cards={ collectedCards }
          dragStart={ (e, card) => handleDragStart(e, card, "Collection Cards") }
        />
      </div>
      <div
        className="w-full card-drop px-5"
        onDragOver={ (e) => e.preventDefault() }
        onDrop={ (e) => handleCardDrop(e, "Deck Cards") }
      >
        <PlayerStatTitle>
          <HoverText
            name={ hoverText.name }
            description={ hoverText.description }
          >
            <span className={ `${ deckCards.length !== 52 && "text-red-300" }` } >
              Cards in Deck: { deckCards.length }/52
              { deckCards.length !== 52 && "!"}
            </span>
          </HoverText>
        </PlayerStatTitle>
        <CardStack
          cards={ deckCards }
          dragStart={ (e, card) => handleDragStart(e, card, "Deck Cards") }
        />
      </div>
    </>
  )
};

function FilterInputs({ filters, deck, filterCards }) {
  return (
    <div className="flex justify-between overflow-x-scroll filter-container ">
      { Object.keys(filters).map((filter, index) => {
        if (filter !== "High cards" && filter !== "Low cards" && deck[filter] === 0) return;
        
        return (
          <div 
            key={ index }
            className="flex flex-nowrap items-center mx-3"
          >
            <input
              id={ filter } 
              name={ filter }
              type="checkbox"
              checked={ filters[filter] }
              onChange={ (e) => filterCards(e) }
            />
            <label 
              htmlFor={ filter }
              className="filter-label ml-2"
            >
              { capitalizeFirstWord(filter) }
            </label>
          </div>
        )
      })}
    </div>
  )
}