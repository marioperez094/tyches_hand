//External Imports
import React, { useMemo, useState, useEffect } from "react";

//Components
import Card from "./card";
import HoverText from "@components/headers/hoverText/hoverText";

//Stylesheets
import "./cards.scss";

export default function CardStack({ cards, selectedCard, handleCardTap, handleDeckTap }) {
  //Memoized 
  const cardElements = useMemo(() => 
    cards.map((card, index) => {
      const isSelected = selectedCard?.id === card.id;

      return (
        <div
          className={ `relative overlap-cards ${ isSelected ? "selected-card" : "" }` } 
          key={ card.id }
          onClick={ () => handleCardTap(card) }
          style={{ animationDelay: `${ index * 0.05 }s` }}
        >
          <HoverText name={ card.name } description={ card.description } isFlipped={ isFlipped }>
            <Card card={ card } isFlipped={ isFlipped } />
          </HoverText>
        </div>
      )
    }), 
    [cards, selectedCard, handleCardTap, isFlipped]
  );

  return(
    <div 
      className="w-full flex justify-start overflow-x-scroll overflow-y-visible items-center mx-auto relative card-stack"
      onClick={ handleDeckTap }
    >
      { cardElements }
    </div>
  )
};