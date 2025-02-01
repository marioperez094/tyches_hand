//External Imports
import React from "react";

//Components
import PlayerStatTitle from "@components/headers/playerStatTitle/playerStatTitle";
import HoverText from "@components/headers/hoverText/hoverText";
import CardStack from "@components/gameAssets/cards/cardStack";
import FilterInputs from "./filterInputs";
import Card from "@components/gameAssets/cards/card";

import { useDragPreview } from "@components/gameAssets/deck/useDragPreview.js";

export default function DeckContainer({
  deck,
  filters,
  filterCards,
  deckCards,
  collectedCards,
  collectedCardsLength,
  moveCards
}) {
  const { draggingItem, source, setDraggingItem, handleDragStart, handleTouchStart } = useDragPreview();

  const hoverText = { 
    name: "52 Cards", 
    description: "The hand of Tyche demands balance. Your deck must consist of precisely 52 cards - no more, no less. To defy this rule is to defy Tyche and such insolence would lead to unimaginable consequences." 
  };

  function handleCardDrop(e, targetStack) {
    e.preventDefault();
    if (!draggingItem || source === targetStack) return setDraggingItem(null);
    
    moveCards([draggingItem], targetStack);
    setDraggingItem(null);
  }

  return (
    <>
      <div
        className="w-full card-drop px-5"
        onDragOver={ (e) => e.preventDefault() }
        onDrop={ (e) => handleCardDrop(e, "Collection Cards") }
      >
        <PlayerStatTitle>Cards Collected { collectedCards.length } / { collectedCardsLength }</PlayerStatTitle>
        <FilterInputs filters={ filters } deck={ deck } filterCards={ filterCards } />
        <CardStack
          cards={ collectedCards }
          handleDragStart={ (e, card) => handleDragStart(e, card, "Collection Cards", <Card card={ card } />) }
          handleTouchStart={ (e, card) => handleTouchStart(e, card, "Collection Cards", <Card card={ card } />) }
        />
      </div>

      <div
        className="w-full card-drop px-5"
        onDragOver={ (e) => e.preventDefault() }
        onDrop={ (e) => handleCardDrop(e, "Deck Cards") }
      >
        <PlayerStatTitle>
          <HoverText name={ hoverText.name } description={ hoverText.description }>
            <span className={ `${ deckCards.length !== 52 && "text-red-300" }` }>
              Cards in Deck: { deckCards.length } / 52
              { deckCards.length !== 52 && "!" }
            </span>
          </HoverText>
        </PlayerStatTitle>
        <CardStack
          cards={ deckCards }
          handleDragStart={ (e, card) => handleDragStart(e, card, "Deck Cards", <Card card={ card } />) }
          handleTouchStart={ (e, card) => handleTouchStart(e, card, "Deck Cards", <Card card={ card } />) }
        />
      </div>
    </>
  );
}
