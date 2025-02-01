//External Imports
import React, { useMemo } from "react";

//Components
import PlayerStatTitle from "@components/headers/playerStatTitle/playerStatTitle";
import HoverText from "@components/headers/hoverText/hoverText";

//Constants
import { deckTypes } from "@utils/constants";

//Stylesheets

export default function DeckStats({ deck }) {
  //Undiscovered deck type names stay hidden
  const revealedDecks = useMemo(() => deckTypes.filter(deckType => deck[deckType.name] > 0), [deck]);
  const missingDecks = deckTypes.length - revealedDecks.length;

  return (
    <>
      { /* Only shows revealed decks */ }
      { revealedDecks.map((deckType) =>
        <DeckTypes  key={ deckType.name } deck={ deck } deckType={ deckType } />
      )}

      { /* Renders missing decks as question marks */ }
      {[...Array(missingDecks)].map((_, index) => (
        <RedactedDeck key={ index } /> 
      ))}
    </>
  )
};

//Counted deck types
function DeckTypes({ deck, deckType }) {
  const title = `${ deckType.name }: ${ deck[deckType.name] }`
  
  return(
    <li className="relative flex flex-col justify-between deck-type-container w-full">
      <PlayerStatTitle isHeading={ false }>
        <HoverText name={ title } description={ deckType.description }>
          <p className={ `${ deckType.name }-text` }>{ title }</p>
        </HoverText>
      </PlayerStatTitle>
    </li>
  )
}

//Redacted deck 
function RedactedDeck() {
  return (
    <PlayerStatTitle isHeading={false}>
      <li className="relative overflow-hidden redacted">
        <div className="flex justify-center items-center h-full redacted-animation">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="question-mark">?</div>
          ))}
        </div>
      </li>
    </PlayerStatTitle>
  );
}