//External Imports
import React from "react";

//Function
import { capitalizeFirstWord } from "@utils/utils";

export default function CardsInfo({ deck }) {
  const { name } = deck;
  const decks = ["total", "standard", "blessed", "bloodstained", "charred", "exhumed", "fleshwoven"];

  return (
    <div className="container px-4">
      <h2 className="text-red-800 font-extrabold text-lg">{ name }</h2>
      <div className="py-4">
        { decks.map((deckType) => {
          return <DeckInfo name={ capitalizeFirstWord(deckType) } total={ deck[deckType] } />
        })}
      </div>
    </div>
  )
};

function DeckInfo({ name, total }) {
  return(
    <>
      <h3 className="text-red-800">{ name }: { total }</h3>
    </>
  )
};