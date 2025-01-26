//External Imports
import React from "react";

//Components
import PlayerStatTitle from "@components/headers/playerStatTitle/playerStatTitle";

//Functions
import { capitalizeFirstWord } from "@utils/utils";
import HoverText from "../hoverText/hoverText";

//Constants
import { deckTypes } from "@utils/constants";

export default function DeckStats({ deck }) {
  return (
    <>
      { deckTypes.map((deckType) => {
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
  const title = `${ capitalizeFirstWord(deckType.name) }: ${ deck[deckType.name] }`
  console.log(title)
  return(
    <li className="relative flex flex-col justify-between deck-type-container">
      <PlayerStatTitle isHeading={ false }>
        <span className={ `${ deckType.name }-text` }>{ title }</span>
      </PlayerStatTitle>
      
      <HoverText name={ title } description={ deckType.description } />
    </li>
  )
}