//External Imports
import React from "react";

//Components
import PlayerStatTitle from "@components/headers/playerStatTitle/playerStatTitle";
import HoverText from "@components/headers/hoverText/hoverText";
import CardStack from "@components/gameAssets/cards/cardStack";
import FilterInputs from "./filterInputs"; // Moved to a separate file

import { useDragPreview } from "./useDragPreview.js";

export default function DeckContainer({
  deck,
  filters,
  filterCards,
  deckCards,
  collectedCards,
  collectedCardsLength,
  moveCards
}) {
  const { draggingCard, cardSource, setDraggingCard, handleDragStart } = useDragPreview();

  const hoverText = { 
    name: "52 Cards", 
    description: "The hand of Tyche demands balance. Your deck must consist of precisely 52 cards - no more, no less. To defy this rule is to defy Tyche and such insolence would lead to unimaginable consequences." 
  };

  function handleCardDrop(e, targetStack) {
    e.preventDefault();
    if (!draggingCard || cardSource === targetStack) return setDraggingCard(null);
    
    moveCards([draggingCard], targetStack);
    setDraggingCard(null);
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
          dragStart={ (e, card) => handleDragStart(e, card, "Collection Cards") }
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
          dragStart={ (e, card) => handleDragStart(e, card, "Deck Cards") }
        />
      </div>
    </>
  );
}
