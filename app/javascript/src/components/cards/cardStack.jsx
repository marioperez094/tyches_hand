//External Imports
import React, { useState } from "react";

//Components
import Card from "@components/cards/card";

//Stylesheets
import "./card.scss";

export default function CardStack({ cards }) {

  return(
    <div className="card-stack">
      { cards.map((card, index) => {
        return(
          <div 
            className="overlap-cards" 
            key={ card.id }
            style={{ animationDelay: `${ index * 0.05 }s` }}
          >
            <Card card={ card }/>
          </div>
        )
      })}
    </div>
  )
};