//External Imports
import React, { useState } from "react";

//Components
import Card from "./card";
import HoverText from "@components/headers/hoverText/hoverText";

//Stylesheets
import "./cards.scss";

export default function CardStack({ cards }) {

  return(
    <div className="flex justify-start items-center relative card-stack">
      { cards.map((card, index) => {
        return(
          <div 
            className="relative overlap-cards" 
            key={ card.id }
            style={{ animationDelay: `${ index * 0.05 }s` }}
          >
            <HoverText name={ card.name } description={ card.description }>
              <Card card={ card }/>
            </HoverText>
          </div>
        )
      })}
    </div>
  )
};