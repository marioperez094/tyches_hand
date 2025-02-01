//External Imports
import React, { useMemo } from "react";

//Stylesheets
import "./cards.scss"

export default function Card({ card, isFlipped = false }) {
  const { suit, rank, effect_type } = card;

  const isBlackSuit = suit === "Clubs" || suit === "Spades";

  const cardRankObject = useMemo(() => ({
    Ace: "A",
    King: "K",
    Queen: "Q",
    Jack: "J"
  }), []);

  const cardSuit = useMemo(() => ({
    Hearts: "♥",
    Diamonds: "♦",
    Clubs: "♣",
    Spades: "♠"
  }), []);

  const displayRank = cardRankObject[rank] || rank;
  const displaySuit = cardSuit[suit] || "";

  return(
    <div className={ `card-container ${ isBlackSuit ? "black" : "" }` }>
      <div className={`card-inner ${isFlipped ? "flipped" : ""}`}>
        {/* Front (Face-Up) */}
        <div className={ `card-face card-front ${effect_type}-card` }>
          <FaceUpCard card={{ displayRank, displaySuit }} />
        </div>

        {/* Back (Face-Down) */}
        <div className="card-face card-back">
          <FaceDownCard />
        </div>
      </div>
    </div>
  )
};

function FaceUpCard({ card }) {
  const { displayRank, displaySuit } = card;

  return(
    <>
      { /* Top Left Corner */ }
      <div className="card-header">
        <div className="card-suit">{ displayRank }</div>
        <div className="card-rank">{ displaySuit }</div>
      </div>

      { /* Center */ }
      <div className="flex justify-center items-center card-content">
        <div className="card-value">{ displayRank }</div>
      </div>

      { /* Bottom Right Corner */ }
      <div className="card-footer text-right">
        <div className="card-value">{ displayRank }</div>
        <div className="card-suit">{ displaySuit }</div>
      </div>
    </>
  )

};

function FaceDownCard() {
  return <div className="flex justify-center items-center" />;
}