//External Imports
import React from "react";

//Components
import PlayerStatTitle from "@components/headers/playerStatTitle/playerStatTitle";
import HoverText from "@components/headers/hoverText/hoverText";

//Functions
import { capitalizeFirstWord } from "@utils/utils";

//Constants
import { deckTypes } from "@utils/constants";

//Stylesheets

export default function DeckStats({ deck }) {
  return (
    <>
      { deckTypes.map((deckType) => {
        console.log(deck)
        if (deck[deckType.name] > 0) return <DeckTypes  key={ deckType.name } deck={ deck } deckType={ deckType } />

        return (
          <PlayerStatTitle key={ deckType } isHeading={ false }>
            <li className="redacted">
              <div className="redacted-animation">
                <div className="question-mark">?</div>
                <div className="question-mark">?</div>
                <div className="question-mark">?</div>
                <div className="question-mark">?</div>
              </div>
            </li>
          </PlayerStatTitle>
        )
      })
      }
    </>
  )
};

function DeckTypes({ deck, deckType }) {
  const title = `${ deckType.name }: ${ deck[deckType.name] }`
  
  return(
    <li className="relative flex flex-col justify-between deck-type-container">
      <PlayerStatTitle isHeading={ false }>
        <HoverText name={ title } description={ deckType.description }>
          <p className={ `${ deckType.name }-text` }>{ title }</p>
        </HoverText>
      </PlayerStatTitle>
    </li>
  )
}