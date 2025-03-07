//External Imports
import React from "react";

//Context
import { usePlayer } from "@context/player";

//Components
import GuestMessage from "./guestMessage";
import { HealthBarWithName } from "@components/gameAssets/healthBar/healthBar";
import SubHeaders from "@components/headers/subHeaders/subHeaders";
import DeckStats from "./deckStats";

export default function PlayerCollections() {
  const { player } = usePlayer();

  console.log("render playerCollections")

  const { username, blood_pool, guest, deck } = player;

  return(
    <>
      { guest && <GuestMessage />}
      <div className="mx-auto my-3">
        <HealthBarWithName
          name={ username }
          health={ blood_pool }
          isPlayer
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 py-2">
        <PlayerStatSection>
          <CollectionDetails name={ deck.name }>
            <DeckStats cardStats={ deck } />
          </CollectionDetails>
        </PlayerStatSection>
      </div>
    </>
  )
};

function PlayerStatSection({ children }) {
  
  console.log("render playerStatSection")

  return <section className="mx-auto w-full player-info-container">{children}</section>;
};

function CollectionDetails({ name, children }) {

  console.log("render collectionDetails")
  
  return (
    <>
      <SubHeaders isHeading>{ name }</SubHeaders>
      <ul className="grid grid-cols-2 md:block">
        { children }
      </ul>
    </>
  )
};