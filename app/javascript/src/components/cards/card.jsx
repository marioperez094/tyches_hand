//External Imports
import React from "react";

//Stylesheets
import "./card.scss"

export default function Card({ card }) {
  const { suit, rank, effect_type } = card;
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
    <div className={ `card ${ isBlackSuit && "black" } ${ effect_type }-card` }>
      <div className="card-header">
        <div className="card-suit">{ cardRankObject[rank] }</div>
        <div className="card-rank">{ cardSuit[suit] }</div>
      </div>
      <div className="card-content">
        <div className="card-value">{ cardRankObject[rank] }</div>
      </div>
      <div className="card-footer text-right">
        <div className="card-value">{ cardRankObject[rank] }</div>
        <div className="card-suit">{ cardSuit[suit] }</div>
      </div>

      { /*<div className="card-info">
        <h3 className="card-name text-center">{ card.name }</h3>
        <p className="card-description">{ card.description }</p>
      </div> */}
    </div>
  )
};