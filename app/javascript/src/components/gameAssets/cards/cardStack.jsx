//External Imports
import React, { useMemo, useState, useEffect } from "react";

//Components
import Card from "./card";

//Stylesheets
import "./cards.scss";

export default function CardStack({ cards, selectedCard, handleCardTap, handleDeckTap }) {
  //Memoized 
  const cardElements = useMemo(() => 
    cards.map((card, index) => {
      const isSelected = selectedCard?.id === card.id;

      return (
        <div
          className={ `overlap-cards ${ isSelected ? "selected-card" : "" }` } 
          key={ card.id }
          onClick={ () => handleCardTap(card) }
          style={{ animationDelay: `${ index * 0.05 }s` }}
        >
            <Card card={ card } />
        </div>
      )
    }), 
    [cards, selectedCard, handleCardTap]
  );

  return(
    <div 
      className="w-full flex items-center justify-start overflow-x-scroll card-stack"
      onClick={ handleDeckTap }
    >
      { cardElements }
    </div>
  )
};