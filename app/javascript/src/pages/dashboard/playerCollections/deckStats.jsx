//External Imports
import React, { useMemo } from "react";

//Components
import SubHeaders from "@components/headers/subHeaders/subHeaders";
import HoverText from "../../../components/headers/hoverText/hoverText";

export default function DeckStats({ cardStats }) {
  const revealedDecks = useMemo(() => { 
    return Object.entries(cardStats)
      .filter(([_, stat]) => stat > 0)
  }, [cardStats]);

  //Undiscovered decks calculated from card stats. Subtract -1 for deck name from Object.keys
  const missingDecks = (Object.keys(cardStats).length - 1) - revealedDecks.length; 
  
  return(
    <> 
      { /* Only shows revealed decks */ }
      { revealedDecks.map(([name, stat]) => 
        <DeckType key={ name } name={ name } stat={ stat } />
      )}

      
      { /* Renders missing decks as question marks */ }
      {[...Array(missingDecks)].map((_, index) => (
        <RedactedDeck key={ index } /> 
      ))}
    </>
  )
};

function DeckType({ name, stat }) {
  const descriptions = {
    Exhumed: "Cards ripped from a corpse's stiff grip. INCREASED BLOOD POOL WINNING WITH WINNING HAND",
    Charred: "The embers on these cards can still cauterize wounds. REDUCES BLOOD LOSS.",
    Fleshwoven: "These cards appear to have a leathery texture and an odd familiarity. GREATER BLOOD POOL WINNINGS IF THE HAND ENDS IN A PUSH.",
    Blessed: "The cards are blinding, and sizzles to the touch. MULTIPLIES WAGER.",
    Bloodstained: "The cards are matted together by blood, filling the room with their foul odor. DAIMON'S MINIMUM WAGER INCREASES."
  };

  return (
    <li className="w-full flex flex-col justify-between deck-type-container">
      <SubHeaders isHeading={ false }>
        <HoverText name={ name } description={ descriptions[name] } isFlipped={ name === "Total" }>
          <p className={ `${ name }-text` }>{ name }: { stat }</p>
        </HoverText>
      </SubHeaders>
    </li>
  )
};

//Redacted deck 
function RedactedDeck() {
  return (
      <li className="relative overflow-hidden redacted">
        
    <SubHeaders isHeading={false}>
        <div className="flex justify-center items-center h-full redacted-animation">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="question-mark">?</div>
          ))}
        </div>
        </SubHeaders>
      </li>
  )
};