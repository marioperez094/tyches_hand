//External Imports
import React from "react";

//Components
import SubHeaders from "@components/headers/subHeaders/subHeaders";
import FilterInputs from "./filterInputs";

export default function DeckContainer({ deckStats, filters, collectionCards }) {
  return (
    <>
      { /* Collection cards section */}
      <section className="w-full card-drop px-5">
        <SubHeaders>Cards Collected { collectionCards.length }</SubHeaders>
        <FilterInputs 
          filters={ filters }
          deckStats={ deckStats } 
        />
      </section>

      { /* Deck cards section */ }
      <section className="w-full card-drop px-5">
        <SubHeaders>Deck</SubHeaders>
      </section>
    </>
  )
};