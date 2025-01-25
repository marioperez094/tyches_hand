//External Imports
import React from "react";

//Components
import PlayerStatTitle from "@components/headers/playerStatTitle/playerStatTitle";

//Functions
import { capitalizeFirstWord } from "@utils/utils";

export default function DeckStats({ deck }) {
  const deckTypes = ["total", "standard", "blessed", "bloodstained", "charred", "exhumed", "fleshwoven"]
  return (
    <>
      { deckTypes.map((deckType) => {
        if (deck[deckType] > 0) return (
          <PlayerStatTitle isHeading={ false }>
            <li className={ `${ deckType }-text` } key={ deckType }>
              { capitalizeFirstWord(deckType) }
              <span className="hidden sm:inline">:</span> { deck[deckType] } 
            </li>
          </PlayerStatTitle>
        )

        return (
          
          <PlayerStatTitle isHeading={ false }>
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