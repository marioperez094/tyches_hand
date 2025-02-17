//External Imports
import React from "react";

//Components
import PlayerStatTitle from "@components/headers/playerStatTitle/playerStatTitle";
import HoverText from "@components/headers/hoverText/hoverText";
import CardStack from "@components/gameAssets/cards/cardStack";
import FilterInputs from "./filterInputs";
import { useSelectItem } from "@components/gameAssets/deck/useSelectItem";

const hoverText = { 
  name: "52 Cards", 
  description: "The hand of Tyche demands balance. Your deck must consist of precisely 52 cards - no more, no less. To defy this rule is to defy Tyche and such insolence would lead to unimaginable consequences." 
};

export default function DeckContainer({
  deck,
  filters,
  filterCards,
  deckCards,
  collectedCards,
  moveCards
}) {
  const { selectedItem, setSelectedItem, source, setSource, handleItemTap } = useSelectItem();

  function handleDeckTap(target) {
    if (!selectedItem || target === source) return;

    moveCards([selectedItem], target === "Collection");
    setSelectedItem(null);
    setSource(null);
  };

  return (
    <>
      { /* Collected Cards Section */ }
      <section className="w-full card-drop px-5">
        <PlayerStatTitle>Cards Collected { collectedCards.length } / { collectedCards.length + deckCards.length }</PlayerStatTitle>
        <FilterInputs filters={ filters } deck={ deck } filterCards={ filterCards } />
        <CardStack
          cards={ collectedCards }
          selectedCard={ selectedItem }
          handleDeckTap={ () => handleDeckTap("Collection") }
          handleCardTap={ (card) => handleItemTap(card, "Collection") }
        />
      </section>

      { /* Deck Cards Section */ }
      <section className="w-full card-drop px-5">
        <PlayerStatTitle>
          <HoverText name={ hoverText.name } description={ hoverText.description }>
            <span className={ `${ deckCards.length !== 52 ? "text-red-300" : "" }` }>
              Cards in Deck: { deckCards.length } / 52
              { deckCards.length !== 52 && "!" }
            </span>
          </HoverText>
        </PlayerStatTitle>
        <CardStack
          cards={ deckCards }
          selectedCard={ selectedItem }
          handleDeckTap={ () => handleDeckTap("Deck") }
          handleCardTap={ (card) => handleItemTap(card, "Deck") }
        />
      </section>
    </>
  );
}