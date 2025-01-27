//External Imports
import React, { useState } from "react";

//Components
import Card from "./card";
import HoverText from "@components/headers/hoverText/hoverText";

//Stylesheets
import "./cards.scss";

export default function CardStack({ cards, dragStart = null }) {

  return(
    <div 
      className="w-full flex justify-start overflow-x-scroll overflow-y-visible items-center mx-auto relative card-stack"
    >
      { cards.map((card, index) => {
        return(
          <div 
            className="relative overlap-cards" 
            key={ card.id }
            draggable
            onDragStart={ (e) => dragStart(e, card) }
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