//External Imports
import React from "react";

//Components
import { LinkButton } from "@components/homeButton/homeButton";
import PlayerStatTitle from "@components/headers/playerStatTitle/playerStatTitle";
import DeckStats from "./deckStats";

export default function PlayerCollections({ deck }) {
  return(
    <div className="grid grid-cols-1 lg:grid-cols-3 py-2">
      <article className="w-full player-info-container">
        <PlayerStatTitle 
          isHeading={ true }
        >
          { deck.name }
        </PlayerStatTitle>
        <ul className="grid grid-cols-2 md:block">
          <DeckStats deck={ deck } />
        </ul>
        <div className="mx-5 my-10">
          <LinkButton link="/player/stats/edit/deck">Edit Deck</LinkButton>
        </div>
      </article>
      <article className="mx-auto player-info-container">{ deck.name }</article>
      <article className="mx-auto player-info-container">{ deck.name }</article>
    </div>
  )
};