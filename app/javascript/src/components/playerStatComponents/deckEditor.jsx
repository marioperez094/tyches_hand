//External Imports
import React, { useState } from "react";

//Components
import PlayerStatTitle from "@components/headers/playerStatTitle/playerStatTitle";
import CardStack from "@components/cards/cardStack";

//Context
import { usePlayer } from "@context/player";

import DeckNamer from "./deckNamer";

export default function DeckEditor() {
  const { player } = usePlayer();

  if (!player.deck) return;
  const { deck, deck_cards, non_deck_cards } = player;

  

  return(
    <article className="mx-auto my-3 sm:my-5 lg:my-10">
      <DeckNamer deck={ deck }/>
      <PlayerStatTitle>Cards Collected</PlayerStatTitle>
      <div className="cards-collection">
        <CardStack cards={ non_deck_cards } />
      </div>
      <PlayerStatTitle>Cards in Deck</PlayerStatTitle>
      <CardStack cards={ deck_cards } />
    </article>
  )
};
