//External Imports
import React from "react";

//Functions
import { capitalizeFirstLetter } from "@utils/utils";

export default function FilterInputs({ filters, deckStats, filterCards }) {
  return (
    <div className="flex justify-between overflow-x-scroll filter-container">
      { Object.entries(filters).map(([filterName, value]) => {
        if (deckStats[filterName] === 0) return;
        
        return (
          <label 
            key={ filterName }
            htmlFor={ filterName }
            className="relative block mx-5 filter-checkbox-container"
          >
            { capitalizeFirstLetter(filterName) }
            <input
              type="checkbox"
              id={ filterName }
              name={ filterName }
              className="absolute filter-checkboxes"
              checked={ value }
              onChange={ (e) => filterCards(e) }
            />
            <span className="absolute flex justify-center items-center rounded-full filter-checkmark" />
          </label>
        )
      })}
    </div>
  )
};