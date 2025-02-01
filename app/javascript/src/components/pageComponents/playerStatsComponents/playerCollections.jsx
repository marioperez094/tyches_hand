//External Imports
import React, { useMemo } from "react";

//Components
import { LinkButton } from "@components/menuComponents/buttons/homeButton/homeButton";
import HealthBarWithName from "@components/playerComponents/healthBar/healthBarWithName";
import PlayerStatTitle from "@components/headers/playerStatTitle/playerStatTitle";
import DeckStats from "./deckStats";
import PlayerStatsLayout from "./playerStatsLayout";

export default function PlayerCollections({ player }) {
    const { username, blood_pool, deck } = player;

    //Memoizing deck info
    const deckDetails = useMemo(() => (
      <>
        <PlayerStatTitle isHeading>{ deck.name }</PlayerStatTitle>
        <ul className="grid grid-cols-2 md:block">
          <DeckStats deck={ deck } />
        </ul>
        <div className="mx-5 my-5 text-center link-buttons">
          <LinkButton link="/player/stats/edit/deck">Edit Deck</LinkButton>
        </div>
      </>
    ), [deck]);
  
  return(
    <PlayerStatsLayout title="Player Stats">

      { /* Player Health Bar */ }
      <div className="mx-auto my-3">
        <HealthBarWithName
          name={ username }
          health={ blood_pool } 
          isPlayer
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 py-2">
        <PlayerStatSection>{ deckDetails }</PlayerStatSection>
        <article className="mx-auto player-info-container">{ deck.name }</article>
        <article className="mx-auto player-info-container">{ deck.name }</article>
      </div>
    </PlayerStatsLayout>
  )
};

function PlayerStatSection({ children }) {
  return <section className="mx-auto w-full player-info-container">{children}</section>;
};