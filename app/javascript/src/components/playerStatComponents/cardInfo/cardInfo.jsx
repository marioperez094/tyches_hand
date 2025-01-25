//External Imports
import React from "react";

//Components
import { LinkButton } from "@components/homeButton/homeButton";
import PlayerStatTitle from "@components/headers/playerStatTitle/playerStatTitle";
import DeckStats from "./deckStats";

export default function CardInfo({ deck }) {
  return(
    <article className="w-full player-info-container overflow-hidden">
      <PlayerStatTitle 
        isHeading={ true }
      >
        { deck.name }
      </PlayerStatTitle>
      <ul className="grid grid-cols-2 md:block">
        <DeckStats deck={ deck } />
      </ul>
      <div className="mx-5 my-16">
        <LinkButton link="/player/stats/deck/edit">Edit Deck</LinkButton>
      </div>
    </article>
  )
};