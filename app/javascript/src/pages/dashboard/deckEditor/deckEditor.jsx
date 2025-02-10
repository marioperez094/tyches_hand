//External Imports
import React, { useState } from "react";

//Context
import { usePlayer } from "@context/player.jsx"

//Components
import { StandardButton } from "@components/menuComponents/buttons/buttons";
import Notification from "@components/headers/notification/notification";
import DeckNamer from "./deckNamer";

export default function DeckEditor() {
  const { player } = usePlayer();
  
  const [message, setMessage] = useState("Deck Saved!");

  if (!player) return <p>Loading player...</p>;

  const { deck } = player;

  return(
    <>
      { /* Deck editing buttons */ }
      <nav className="sticky top-0 deck-buttons-container">
        <div className="flex justify-center deck-buttons overflow-x-scroll w-full">
          <StandardButton
          >
            Save Deck
          </StandardButton>
          <StandardButton
          >
            Sort Cards
          </StandardButton>
          <StandardButton
          >
            Clear Deck
          </StandardButton>
          <StandardButton
          >
            Fill Deck
          </StandardButton>
        </div>

        { message && (
          <div className="absolute deck-saved-message-container w-full">
            <Notification className={`${ message === "Deck Saved!" ? "text-green-500" : "text-red-500" } text-lg`}>{ message }</Notification>
          </div>
        )}
      </nav>

      <section className="mx-auto my-3 sm:my-5 lg:my-10">
        <DeckNamer name={ deck.name } />
      </section>
    </>
  )
};