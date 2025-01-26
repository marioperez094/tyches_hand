//External Imports
import React from "react";

//Components
import HoverText from "@components/hoverText/hoverText";

//Stylesheets
import "./card.scss"

export default function Card({ card }) {
  const { name, description, suit, rank, effect_type } = card;
  const isBlackSuit = suit === "Clubs" || suit === "Spades" && true;
  const cardRankObject = {
    Ace: "A",
    King: "K",
    Queen: "Q",
    Jack: "J",
    10: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3, 
    2: 2,
  };

  const cardSuit = {
    Hearts: "♥",
    Diamonds: "♦",
    Clubs: "♣",
    Spades: "♠"
  }
  
  return(
    <div 
      className={ `relative flex flex-col justify-between items-center card ${ isBlackSuit && "black" } ${ effect_type }-card` }
    >
      <div className="card-header">
        <div className="card-suit">{ cardRankObject[rank] }</div>
        <div className="card-rank">{ cardSuit[suit] }</div>
      </div>
      <div className="flex justify-center items-center card-content">
        <div className="card-value">{ cardRankObject[rank] }</div>
      </div>
      <div className="card-footer text-right">
        <div className="card-value">{ cardRankObject[rank] }</div>
        <div className="card-suit">{ cardSuit[suit] }</div>
      </div>

      <HoverText name={ name } description={ description } />
    </div>
  )
};